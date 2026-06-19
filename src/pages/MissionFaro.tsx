import { useEffect, useMemo, useState } from "react";
import { Flame, Gamepad2, Play, RadioTower, RotateCcw, ShieldCheck, Trophy } from "lucide-react";
import { PageHero, PageLayout } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const GRID_SIZE = 8;
const SENSOR_LIMIT = 4;
const MAX_TURNS = 8;
const BASE_CELL = GRID_SIZE * GRID_SIZE - 1;
const SCORE_KEY = "faro.mission.best-score";

type GameStatus = "setup" | "running" | "detected" | "lost";

const copy = {
  eyebrow: { fr: "Simulation interactive", en: "Interactive simulation" },
  title: { fr: "Mission FARO", en: "FARO Mission" },
  subtitle: {
    fr: "Placez quatre capteurs pour détecter un départ de feu avant qu'il ne se propage.",
    en: "Place four sensors to detect an emerging fire before it spreads.",
  },
  mission: { fr: "Votre mission", en: "Your mission" },
  instructions: {
    fr: "Touchez la forêt pour placer les nœuds. Chaque capteur surveille sa case et les huit cases voisines. Lancez ensuite la simulation.",
    en: "Tap the forest to place nodes. Each sensor monitors its cell and the eight surrounding cells. Then launch the simulation.",
  },
  sensors: { fr: "Capteurs", en: "Sensors" },
  turn: { fr: "Propagation", en: "Spread" },
  best: { fr: "Meilleur score", en: "Best score" },
  coverage: { fr: "Couverture du terrain", en: "Field coverage" },
  start: { fr: "Lancer l'incendie", en: "Start the fire" },
  reset: { fr: "Nouvelle mission", en: "New mission" },
  setupHint: { fr: "Placez encore des capteurs.", en: "Place more sensors." },
  running: { fr: "Analyse du terrain en cours…", en: "Analysing the field…" },
  detected: { fr: "Alerte transmise !", en: "Alert transmitted!" },
  detectedText: {
    fr: "Un nœud FARO a détecté l'anomalie et relayé l'alerte par LoRa.",
    en: "A FARO node detected the anomaly and relayed the alert through LoRa.",
  },
  lost: { fr: "Détection trop tardive", en: "Detection came too late" },
  lostText: {
    fr: "Le feu a trop progressé. Essayez une couverture plus régulière du terrain.",
    en: "The fire spread too far. Try covering the field more evenly.",
  },
  score: { fr: "Score", en: "Score" },
  base: { fr: "Base LoRa", en: "LoRa base" },
  sensorLabel: { fr: "Capteur FARO", en: "FARO sensor" },
  forestLabel: { fr: "Zone forestière", en: "Forest area" },
  burningLabel: { fr: "Zone en feu", en: "Burning area" },
  legendForest: { fr: "Forêt", en: "Forest" },
  legendSensor: { fr: "Capteur", en: "Sensor" },
  legendFire: { fr: "Feu", en: "Fire" },
};

function coordinates(cell: number) {
  return { row: Math.floor(cell / GRID_SIZE), col: cell % GRID_SIZE };
}

function neighbours(cell: number) {
  const { row, col } = coordinates(cell);
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]
    .filter(([nextRow, nextCol]) => nextRow >= 0 && nextRow < GRID_SIZE && nextCol >= 0 && nextCol < GRID_SIZE)
    .map(([nextRow, nextCol]) => nextRow * GRID_SIZE + nextCol);
}

function isCovered(cell: number, sensors: number[]) {
  const point = coordinates(cell);
  return sensors.some((sensor) => {
    const node = coordinates(sensor);
    return Math.abs(point.row - node.row) <= 1 && Math.abs(point.col - node.col) <= 1;
  });
}

function coverage(sensors: number[]) {
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, cell) => cell)
    .filter((cell) => cell !== BASE_CELL && isCovered(cell, sensors)).length;
}

export default function MissionFaro() {
  const { t } = useLang();
  const [sensors, setSensors] = useState<number[]>([]);
  const [fireCells, setFireCells] = useState<number[]>([]);
  const [turn, setTurn] = useState(0);
  const [status, setStatus] = useState<GameStatus>("setup");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const stored = Number(localStorage.getItem(SCORE_KEY) ?? 0);
      return Number.isFinite(stored) ? stored : 0;
    } catch {
      return 0;
    }
  });

  const coveredCells = useMemo(() => coverage(sensors), [sensors]);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setTimeout(() => {
      const burning = new Set(fireCells);
      fireCells.forEach((cell, index) => {
        const options = neighbours(cell).filter((candidate) => candidate !== BASE_CELL && !burning.has(candidate));
        if (!options.length) return;
        burning.add(options[(cell + turn + index) % options.length]);
        if ((turn + index) % 3 === 2 && options.length > 1) burning.add(options[(cell + turn + index + 1) % options.length]);
      });

      const nextFire = Array.from(burning);
      const detected = nextFire.some((cell) => isCovered(cell, sensors));
      const nextTurn = turn + 1;
      setFireCells(nextFire);
      setTurn(nextTurn);

      if (detected) {
        const nextScore = Math.max(100, 1200 - nextTurn * 115 + coveredCells * 5);
        setScore(nextScore);
        setStatus("detected");
        if (nextScore > bestScore) {
          setBestScore(nextScore);
          try {
            localStorage.setItem(SCORE_KEY, String(nextScore));
          } catch {
            // The score simply remains session-only if storage is unavailable.
          }
        }
      } else if (nextTurn >= MAX_TURNS) {
        setStatus("lost");
      }
    }, 680);
    return () => window.clearTimeout(timer);
  }, [bestScore, coveredCells, fireCells, sensors, status, turn]);

  const toggleSensor = (cell: number) => {
    if (status !== "setup" || cell === BASE_CELL) return;
    setSensors((current) => {
      if (current.includes(cell)) return current.filter((sensor) => sensor !== cell);
      if (current.length >= SENSOR_LIMIT) return current;
      return [...current, cell];
    });
  };

  const start = () => {
    if (sensors.length !== SENSOR_LIMIT) return;
    const candidates = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, cell) => cell)
      .filter((cell) => cell !== BASE_CELL && !sensors.includes(cell));
    const source = candidates[Math.floor(Math.random() * candidates.length)];
    setFireCells([source]);
    setTurn(0);
    setScore(0);
    setStatus("running");
  };

  const reset = () => {
    setSensors([]);
    setFireCells([]);
    setTurn(0);
    setScore(0);
    setStatus("setup");
  };

  return (
    <PageLayout>
      <PageHero eyebrow={t(copy.eyebrow)} title={t(copy.title)} subtitle={t(copy.subtitle)} />

      <section className="container py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card p-3 shadow-deep sm:p-5">
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{t(copy.sensors)}</p>
                <p className="mt-1 font-display text-xl font-bold text-accent">{sensors.length}/{SENSOR_LIMIT}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{t(copy.turn)}</p>
                <p className="mt-1 font-display text-xl font-bold">{turn}/{MAX_TURNS}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{t(copy.best)}</p>
                <p className="mt-1 font-display text-xl font-bold text-primary-glow">{bestScore}</p>
              </div>
            </div>

            <div role="grid" aria-label={t(copy.forestLabel)} className="mission-grid grid grid-cols-8 gap-1 rounded-xl border border-primary/30 bg-gradient-forest p-2 sm:gap-1.5 sm:p-3">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, cell) => {
                const sensor = sensors.includes(cell);
                const fire = fireCells.includes(cell);
                const base = cell === BASE_CELL;
                const covered = status === "setup" && isCovered(cell, sensors);
                const label = base ? t(copy.base) : fire ? t(copy.burningLabel) : sensor ? t(copy.sensorLabel) : t(copy.forestLabel);
                return (
                  <button
                    key={cell}
                    type="button"
                    role="gridcell"
                    aria-label={`${label} ${Math.floor(cell / GRID_SIZE) + 1}-${(cell % GRID_SIZE) + 1}`}
                    onClick={() => toggleSensor(cell)}
                    disabled={status !== "setup" || base}
                    className={cn(
                      "mission-cell relative aspect-square overflow-hidden rounded-[0.35rem] border transition-all duration-300",
                      "border-primary/20 bg-primary/10 hover:border-primary-glow/60 hover:bg-primary/20",
                      covered && "bg-primary/25",
                      sensor && "border-primary-glow bg-primary/40 shadow-[0_0_18px_hsl(var(--primary-glow)/0.3)]",
                      fire && "fire-cell border-accent bg-accent/30",
                      base && "border-accent/60 bg-background/80",
                    )}
                  >
                    <span className="absolute inset-0 z-[1] opacity-30 [background:radial-gradient(circle_at_35%_25%,hsl(var(--primary-glow)),transparent_45%)]" />
                    {sensor && <RadioTower className="absolute inset-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary-glow sm:h-5 sm:w-5" />}
                    {fire && <Flame className="absolute inset-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent-glow sm:h-6 sm:w-6" />}
                    {base && <ShieldCheck className="absolute inset-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm border border-primary/40 bg-primary/10" />{t(copy.legendForest)}</span>
              <span className="flex items-center gap-2"><RadioTower className="h-3.5 w-3.5 text-primary-glow" />{t(copy.legendSensor)}</span>
              <span className="flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-accent" />{t(copy.legendFire)}</span>
            </div>
          </div>

          <aside className="rounded-2xl border border-border/70 bg-card p-6 shadow-card lg:sticky lg:top-28">
            <Gamepad2 className="h-7 w-7 text-accent" />
            <h2 className="mt-5 font-display text-2xl font-semibold">{t(copy.mission)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(copy.instructions)}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                <span>{t(copy.coverage)}</span>
                <span className="text-primary-glow">{Math.round((coveredCells / (GRID_SIZE * GRID_SIZE - 1)) * 100)}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full bg-primary-glow transition-[width] duration-500" style={{ width: `${(coveredCells / (GRID_SIZE * GRID_SIZE - 1)) * 100}%` }} />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border/70 bg-background/60 p-4" aria-live="polite">
              {status === "setup" && <p className="text-sm text-muted-foreground">{sensors.length === SENSOR_LIMIT ? t(copy.start) : t(copy.setupHint)}</p>}
              {status === "running" && <p className="ember-pulse text-sm text-accent">{t(copy.running)}</p>}
              {status === "detected" && (
                <div>
                  <Trophy className="h-7 w-7 text-accent" />
                  <h3 className="mt-3 font-display text-xl font-semibold">{t(copy.detected)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(copy.detectedText)}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-accent">{t(copy.score)} · {score}</p>
                </div>
              )}
              {status === "lost" && (
                <div>
                  <Flame className="h-7 w-7 text-destructive" />
                  <h3 className="mt-3 font-display text-xl font-semibold">{t(copy.lost)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(copy.lostText)}</p>
                </div>
              )}
            </div>

            {status === "setup" ? (
              <Button type="button" onClick={start} disabled={sensors.length !== SENSOR_LIMIT} variant="ember" size="lg" className="mt-5 w-full">
                <Play /> {t(copy.start)}
              </Button>
            ) : status === "running" ? (
              <Button type="button" disabled variant="forest" size="lg" className="mt-5 w-full"><Flame /> {t(copy.running)}</Button>
            ) : (
              <Button type="button" onClick={reset} variant="ember" size="lg" className="mt-5 w-full">
                <RotateCcw /> {t(copy.reset)}
              </Button>
            )}
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
