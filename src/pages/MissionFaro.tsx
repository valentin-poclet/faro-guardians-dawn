import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Gauge,
  Gamepad2,
  Leaf,
  Mountain,
  Pause,
  Play,
  RadioTower,
  RotateCcw,
  Trophy,
  Waves,
  Wind,
} from "lucide-react";
import { PageHero, PageLayout } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const GRID_SIZE = 9;
const SCORE_KEY = "faro.mission.v13.scores";

type GameStatus = "setup" | "running" | "detected" | "lost";
type Difficulty = "easy" | "normal" | "hard";
type Terrain = "forest" | "brush" | "rock" | "water";
type Direction = "N" | "E" | "S" | "W";

const DIFFICULTIES = {
  easy: { sensors: 6, turns: 9, multiplier: 1 },
  normal: { sensors: 5, turns: 8, multiplier: 1.45 },
  hard: { sensors: 4, turns: 7, multiplier: 2 },
} as const;

const directionArrows: Record<Direction, string> = { N: "↑", E: "→", S: "↓", W: "←" };
const directionNames = {
  N: { fr: "Nord", en: "North" }, E: { fr: "Est", en: "East" },
  S: { fr: "Sud", en: "South" }, W: { fr: "Ouest", en: "West" },
};

const copy = {
  eyebrow: { fr: "Simulation stratégique", en: "Strategic simulation" },
  title: { fr: "Mission FARO", en: "FARO Mission" },
  subtitle: {
    fr: "Analysez le terrain et le vent, puis placez vos capteurs avant le départ du feu.",
    en: "Analyse the terrain and wind, then place your sensors before the fire starts.",
  },
  mission: { fr: "Centre de mission", en: "Mission centre" },
  instructions: {
    fr: "Chaque capteur surveille sa case et quatre voisines. Placez-les librement en tenant compte du terrain et du vent.",
    en: "Each sensor monitors its cell and four neighbours. Place them freely while considering terrain and wind.",
  },
  sensors: { fr: "Capteurs", en: "Sensors" },
  turn: { fr: "Propagation", en: "Spread" },
  best: { fr: "Record local", en: "Local best" },
  coverage: { fr: "Couverture", en: "Coverage" },
  wind: { fr: "Vent", en: "Wind" },
  difficulty: { fr: "Difficulté", en: "Difficulty" },
  easy: { fr: "Exploration", en: "Explore" },
  normal: { fr: "Opération", en: "Operation" },
  hard: { fr: "Urgence", en: "Emergency" },
  start: { fr: "Déclencher la simulation", en: "Start simulation" },
  reset: { fr: "Nouvelle carte", en: "New map" },
  pause: { fr: "Pause", en: "Pause" },
  resume: { fr: "Reprendre", en: "Resume" },
  speed: { fr: "Vitesse", en: "Speed" },
  setupHint: { fr: "Placez tous les capteurs pour commencer.", en: "Place every sensor to begin." },
  ready: { fr: "Placement terminé. La simulation est prête.", en: "Placement complete. The simulation is ready." },
  running: { fr: "Le feu se propage…", en: "The fire is spreading…" },
  detected: { fr: "Alerte transmise !", en: "Alert transmitted!" },
  detectedText: {
    fr: "Un capteur a repéré l'anomalie et le réseau LoRa a relayé l'alerte.",
    en: "A sensor detected the anomaly and the LoRa network relayed the alert.",
  },
  lost: { fr: "Détection trop tardive", en: "Detection came too late" },
  lostText: {
    fr: "Le feu a dépassé la fenêtre d'intervention. Étudiez les zones non couvertes et le sens du vent.",
    en: "The fire exceeded the response window. Review uncovered areas and wind direction.",
  },
  score: { fr: "Score", en: "Score" },
  stars: { fr: "Évaluation", en: "Rating" },
  burned: { fr: "Cases touchées", en: "Cells affected" },
  localTop: { fr: "Meilleurs scores sur cet appareil", en: "Best scores on this device" },
  sensorLabel: { fr: "Capteur FARO", en: "FARO sensor" },
  forestLabel: { fr: "Forêt dense", en: "Dense forest" },
  brushLabel: { fr: "Végétation légère", en: "Light vegetation" },
  rockLabel: { fr: "Zone rocheuse", en: "Rocky area" },
  waterLabel: { fr: "Point d'eau", en: "Water" },
  burningLabel: { fr: "Zone en feu", en: "Burning area" },
  legendForest: { fr: "Forêt", en: "Forest" },
  legendBrush: { fr: "Végétation", en: "Brush" },
  legendRock: { fr: "Roche", en: "Rock" },
  legendWater: { fr: "Eau", en: "Water" },
};

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createTerrain(seed: number): Terrain[] {
  const random = seededRandom(seed);
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, () => {
    const value = random();
    if (value < 0.09) return "water";
    if (value < 0.19) return "rock";
    if (value < 0.48) return "brush";
    return "forest";
  });
}

function coordinates(cell: number) {
  return { row: Math.floor(cell / GRID_SIZE), col: cell % GRID_SIZE };
}

function neighbourDetails(cell: number) {
  const { row, col } = coordinates(cell);
  const candidates: Array<[number, number, Direction]> = [
    [row - 1, col, "N"], [row, col + 1, "E"],
    [row + 1, col, "S"], [row, col - 1, "W"],
  ];
  return candidates
    .filter(([nextRow, nextCol]) => nextRow >= 0 && nextRow < GRID_SIZE && nextCol >= 0 && nextCol < GRID_SIZE)
    .map(([nextRow, nextCol, direction]) => ({ cell: nextRow * GRID_SIZE + nextCol, direction }));
}

function isCovered(cell: number, sensors: number[]) {
  const point = coordinates(cell);
  return sensors.some((sensor) => {
    const node = coordinates(sensor);
    return Math.abs(point.row - node.row) + Math.abs(point.col - node.col) <= 1;
  });
}

function coverage(sensors: number[]) {
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, cell) => cell)
    .filter((cell) => isCovered(cell, sensors)).length;
}

function terrainLabel(terrain: Terrain) {
  if (terrain === "water") return copy.waterLabel;
  if (terrain === "rock") return copy.rockLabel;
  if (terrain === "brush") return copy.brushLabel;
  return copy.forestLabel;
}

export default function MissionFaro() {
  const { t } = useLang();
  const [seed, setSeed] = useState(() => Date.now() % 1000000);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [sensors, setSensors] = useState<number[]>([]);
  const [fireCells, setFireCells] = useState<number[]>([]);
  const [turn, setTurn] = useState(0);
  const [status, setStatus] = useState<GameStatus>("setup");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [scores, setScores] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = JSON.parse(localStorage.getItem(SCORE_KEY) ?? "[]");
      return Array.isArray(stored) ? stored.filter(Number.isFinite).slice(0, 5) : [];
    } catch {
      return [];
    }
  });

  const config = DIFFICULTIES[difficulty];
  const terrain = useMemo(() => createTerrain(seed), [seed]);
  const wind = useMemo<Direction>(() => (["N", "E", "S", "W"] as Direction[])[seed % 4], [seed]);
  const activeWind = useMemo<Direction>(() => {
    const directions = ["N", "E", "S", "W"] as Direction[];
    const initial = directions.indexOf(wind);
    const shift = difficulty === "easy" ? 0 : Math.floor(turn / 3);
    return directions[(initial + shift) % directions.length];
  }, [difficulty, turn, wind]);
  const coveredCells = useMemo(() => coverage(sensors), [sensors]);
  const bestScore = scores[0] ?? 0;

  useEffect(() => {
    if (status !== "running" || paused) return;
    const timer = window.setTimeout(() => {
      const burning = new Set(fireCells);
      fireCells.forEach((cell, index) => {
        const options = neighbourDetails(cell)
          .filter((candidate) => terrain[candidate.cell] !== "water" && !burning.has(candidate.cell))
          .sort((a, b) => {
            const windA = a.direction === activeWind ? -3 : 0;
            const windB = b.direction === activeWind ? -3 : 0;
            const terrainA = terrain[a.cell] === "brush" ? -1 : terrain[a.cell] === "rock" ? 2 : 0;
            const terrainB = terrain[b.cell] === "brush" ? -1 : terrain[b.cell] === "rock" ? 2 : 0;
            return windA + terrainA - (windB + terrainB);
          });
        if (!options.length) return;

        const additions = difficulty === "hard" ? 2 : difficulty === "normal" && (turn + index) % 3 === 2 ? 2 : 1;
        options.slice(0, additions).forEach((candidate) => {
          if (terrain[candidate.cell] === "rock" && (turn + candidate.cell) % 2 === 0) return;
          burning.add(candidate.cell);
        });
      });

      const nextFire = Array.from(burning);
      const detected = nextFire.some((cell) => isCovered(cell, sensors));
      const nextTurn = turn + 1;
      setFireCells(nextFire);
      setTurn(nextTurn);

      if (detected) {
        const rawScore = 1350 - nextTurn * 120 - nextFire.length * 7 + coveredCells * 4;
        const nextScore = Math.max(100, Math.round(rawScore * config.multiplier));
        const nextStars = nextTurn <= 2 && nextFire.length <= 5 ? 3 : nextTurn <= 4 && nextFire.length <= 12 ? 2 : 1;
        setScore(nextScore);
        setStars(nextStars);
        setStatus("detected");
        const nextScores = [...scores, nextScore].sort((a, b) => b - a).slice(0, 5);
        setScores(nextScores);
        try {
          localStorage.setItem(SCORE_KEY, JSON.stringify(nextScores));
        } catch {
          // Scores remain available until the page closes if storage is blocked.
        }
      } else if (nextTurn >= config.turns) {
        setStatus("lost");
      }
    }, 720 / speed);
    return () => window.clearTimeout(timer);
  }, [activeWind, config, coveredCells, difficulty, fireCells, paused, scores, sensors, speed, status, terrain, turn]);

  const toggleSensor = (cell: number) => {
    if (status !== "setup") return;
    setSensors((current) => {
      if (current.includes(cell)) return current.filter((sensor) => sensor !== cell);
      if (current.length >= config.sensors) return current;
      return [...current, cell];
    });
  };

  const changeDifficulty = (nextDifficulty: Difficulty) => {
    if (status !== "setup") return;
    setDifficulty(nextDifficulty);
    setSensors([]);
  };

  const start = () => {
    if (sensors.length !== config.sensors) return;
    const candidates = terrain
      .map((kind, cell) => ({ kind, cell }))
      .filter(({ kind, cell }) => kind !== "water" && kind !== "rock" && !isCovered(cell, sensors));
    const source = candidates[Math.floor(seededRandom(seed + 97)() * candidates.length)]?.cell ?? 0;
    setFireCells([source]);
    setTurn(0);
    setScore(0);
    setStars(0);
    setPaused(false);
    setStatus("running");
  };

  const reset = () => {
    setSeed((Date.now() + Math.floor(Math.random() * 10000)) % 1000000);
    setSensors([]);
    setFireCells([]);
    setTurn(0);
    setScore(0);
    setStars(0);
    setPaused(false);
    setSpeed(1);
    setStatus("setup");
  };

  const controls = (mobile = false) => (
    <div className={cn("gap-2", mobile ? "mt-4 grid lg:hidden" : "mt-5 hidden lg:grid")}>
      {status === "setup" && (
        <Button type="button" onClick={start} disabled={sensors.length !== config.sensors} variant="ember" size="lg" className="w-full">
          <Play /> {t(copy.start)}
        </Button>
      )}
      {status === "running" && (
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" onClick={() => setPaused((value) => !value)} variant="forest" size="lg">
            {paused ? <Play /> : <Pause />} {paused ? t(copy.resume) : t(copy.pause)}
          </Button>
          <Button type="button" onClick={() => setSpeed((value) => value === 1 ? 2 : 1)} variant="forest" size="lg">
            <Gauge /> {speed}×
          </Button>
        </div>
      )}
      {(status === "detected" || status === "lost") && (
        <Button type="button" onClick={reset} variant="ember" size="lg" className="w-full">
          <RotateCcw /> {t(copy.reset)}
        </Button>
      )}
    </div>
  );

  return (
    <PageLayout>
      <PageHero eyebrow={t(copy.eyebrow)} title={t(copy.title)} subtitle={t(copy.subtitle)} />

      <section className="container py-10 sm:py-14 md:py-20">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card p-2.5 shadow-deep sm:p-5">
            <div className="mb-3 grid grid-cols-3 gap-1.5 sm:mb-4 sm:gap-2">
              {[
                [t(copy.sensors), `${sensors.length}/${config.sensors}`, "text-accent"],
                [t(copy.turn), `${turn}/${config.turns}`, "text-foreground"],
                [t(copy.best), String(bestScore), "text-primary-glow"],
              ].map(([label, value, color]) => (
                <div key={label} className="min-w-0 rounded-lg border border-border/70 bg-background/60 p-2 sm:rounded-xl sm:p-3">
                  <p className="truncate font-mono text-[0.5rem] uppercase tracking-wide text-muted-foreground sm:text-[0.6rem]">{label}</p>
                  <p className={cn("mt-1 truncate font-display text-lg font-bold sm:text-xl", color)}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/50 px-3 py-2 text-xs sm:mb-4 sm:rounded-xl sm:text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Wind className="h-4 w-4 text-primary-glow" />{t(copy.wind)}</span>
              <strong className="font-mono text-accent">{directionArrows[activeWind]} {t(directionNames[activeWind])}</strong>
              <span className="font-mono text-[0.65rem] text-muted-foreground">{t(copy.coverage)} {Math.round((coveredCells / (GRID_SIZE * GRID_SIZE)) * 100)}%</span>
            </div>

            <div role="grid" aria-label={t(copy.forestLabel)} className="mission-grid grid grid-cols-9 gap-0.5 rounded-xl border border-primary/30 bg-gradient-forest p-1 sm:gap-1 sm:p-2">
              {terrain.map((kind, cell) => {
                const sensor = sensors.includes(cell);
                const fire = fireCells.includes(cell);
                const covered = status === "setup" && isCovered(cell, sensors);
                const label = fire ? t(copy.burningLabel) : sensor ? t(copy.sensorLabel) : t(terrainLabel(kind));
                return (
                  <button
                    key={cell}
                    type="button"
                    role="gridcell"
                    aria-label={`${label} ${Math.floor(cell / GRID_SIZE) + 1}-${(cell % GRID_SIZE) + 1}`}
                    onClick={() => toggleSensor(cell)}
                    disabled={status !== "setup"}
                    className={cn(
                      "mission-cell relative aspect-square overflow-hidden rounded-[0.3rem] border transition-all duration-300",
                      kind === "forest" && "border-primary/20 bg-primary/20",
                      kind === "brush" && "border-accent/20 bg-accent/10",
                      kind === "rock" && "border-muted-foreground/25 bg-muted",
                      kind === "water" && "border-primary-glow/30 bg-primary-glow/10",
                      covered && "ring-1 ring-inset ring-primary-glow/40",
                      sensor && "border-primary-glow bg-primary/50 shadow-[0_0_18px_hsl(var(--primary-glow)/0.3)]",
                      fire && "fire-cell border-accent bg-accent/30",
                    )}
                  >
                    {kind === "water" && <Waves className="absolute inset-1/2 z-[2] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-primary-glow/60 sm:h-4 sm:w-4" />}
                    {kind === "rock" && <Mountain className="absolute inset-1/2 z-[2] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/60 sm:h-4 sm:w-4" />}
                    {kind === "brush" && <Leaf className="absolute inset-1/2 z-[2] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-accent/50 sm:h-4 sm:w-4" />}
                    {sensor && <RadioTower className="absolute inset-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary-glow sm:h-5 sm:w-5" />}
                    {fire && <Flame className="absolute inset-1/2 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent-glow sm:h-6 sm:w-6" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[0.58rem] uppercase tracking-wide text-muted-foreground sm:mt-4 sm:gap-4 sm:text-[0.65rem]">
              <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-primary/40" />{t(copy.legendForest)}</span>
              <span className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-accent/70" />{t(copy.legendBrush)}</span>
              <span className="flex items-center gap-1.5"><Mountain className="h-3 w-3" />{t(copy.legendRock)}</span>
              <span className="flex items-center gap-1.5"><Waves className="h-3 w-3 text-primary-glow" />{t(copy.legendWater)}</span>
            </div>
            {controls(true)}
          </div>

          <aside className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6 lg:sticky lg:top-28">
            <Gamepad2 className="h-7 w-7 text-accent" />
            <h2 className="mt-4 font-display text-2xl font-semibold">{t(copy.mission)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(copy.instructions)}</p>

            <p className="mb-2 mt-5 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">{t(copy.difficulty)}</p>
            <div className="grid grid-cols-3 gap-1.5">
              {(["easy", "normal", "hard"] as Difficulty[]).map((level) => (
                <button key={level} type="button" onClick={() => changeDifficulty(level)} disabled={status !== "setup"} className={cn("min-h-11 rounded-lg border px-1.5 text-xs font-medium transition", difficulty === level ? "border-accent bg-accent/10 text-foreground" : "border-border bg-background/50 text-muted-foreground")}>
                  {t(copy[level])}
                </button>
              ))}
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <span className="block h-full rounded-full bg-primary-glow transition-[width] duration-500" style={{ width: `${(coveredCells / (GRID_SIZE * GRID_SIZE)) * 100}%` }} />
            </div>

            <div className="mt-5 rounded-xl border border-border/70 bg-background/60 p-4" aria-live="polite">
              {status === "setup" && <p className="text-sm text-muted-foreground">{sensors.length === config.sensors ? t(copy.ready) : t(copy.setupHint)}</p>}
              {status === "running" && <p className="ember-pulse text-sm text-accent">{paused ? t(copy.pause) : t(copy.running)}</p>}
              {status === "detected" && (
                <div>
                  <Trophy className="h-7 w-7 text-accent" />
                  <h3 className="mt-3 font-display text-xl font-semibold">{t(copy.detected)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(copy.detectedText)}</p>
                  <div className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-accent"><span>{t(copy.score)}</span><strong>{score}</strong></div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>{t(copy.stars)}</span><strong className="tracking-widest text-accent">{"★".repeat(stars)}{"☆".repeat(3 - stars)}</strong></div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>{t(copy.burned)}</span><strong>{fireCells.length}</strong></div>
                </div>
              )}
              {status === "lost" && (
                <div>
                  <Flame className="h-7 w-7 text-destructive" />
                  <h3 className="mt-3 font-display text-xl font-semibold">{t(copy.lost)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(copy.lostText)}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>{t(copy.burned)}</span><strong>{fireCells.length}</strong></div>
                </div>
              )}
            </div>
            {controls()}

            {scores.length > 0 && (
              <div className="mt-6 border-t border-border/70 pt-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">{t(copy.localTop)}</p>
                <ol className="mt-3 space-y-2">
                  {scores.map((value, index) => (
                    <li key={`${value}-${index}`} className="flex items-center justify-between rounded-lg bg-background/50 px-3 py-2 text-sm"><span className="text-muted-foreground">#{index + 1}</span><strong>{value}</strong></li>
                  ))}
                </ol>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
