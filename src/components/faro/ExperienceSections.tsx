import { useEffect, useState } from "react";
import { Activity, CloudSun, RadioTower, ShieldAlert, Timer, Wifi } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const copy = {
  liveEyebrow: { fr: "Nœud FARO / Simulation", en: "FARO node / Simulation" },
  liveTitle: { fr: "Le terrain devient lisible en temps réel.", en: "The field becomes readable in real time." },
  liveText: {
    fr: "Cette télémétrie simulée montre comment un nœud transforme des mesures dispersées en un état de surveillance compréhensible.",
    en: "This simulated telemetry shows how a node turns scattered readings into a clear monitoring status.",
  },
  operational: { fr: "Réseau opérationnel", en: "Network operational" },
  temperature: { fr: "Température", en: "Temperature" },
  temperatureHelp: { fr: "Mesure de l'air ambiant", en: "Ambient air reading" },
  humidity: { fr: "Humidité", en: "Humidity" },
  humidityHelp: { fr: "Humidité relative mesurée", en: "Measured relative humidity" },
  anomaly: { fr: "Niveau d'anomalie", en: "Anomaly level" },
  anomalyLow: { fr: "Faible", en: "Low" },
  anomalyHelp: { fr: "Écart par rapport au comportement environnemental normal", en: "Difference from normal environmental behaviour" },
  score: { fr: "Score technique", en: "Technical score" },
  signal: { fr: "Qualité de la liaison radio", en: "Radio link quality" },
  signalGood: { fr: "Bonne", en: "Good" },
  signalHelp: { fr: "Communication LoRa entre les capteurs, sans Internet", en: "LoRa communication between sensors, without Internet" },
  compareEyebrow: { fr: "Pourquoi FARO ?", en: "Why FARO?" },
  compareTitle: { fr: "Réduire le temps entre le signal faible et la décision.", en: "Reduce the time between a weak signal and a decision." },
  without: { fr: "Sans réseau terrain", en: "Without a field network" },
  withoutText: {
    fr: "L'alerte dépend d'une fumée visible, d'une observation humaine ou d'un passage satellite.",
    en: "Warning depends on visible smoke, human observation or a satellite pass.",
  },
  with: { fr: "Avec l'approche FARO", en: "With the FARO approach" },
  withText: {
    fr: "Les variations sont analysées sur place, relayées par LoRa puis contextualisées sur une carte.",
    en: "Variations are analysed locally, relayed through LoRa and contextualised on a map.",
  },
  reactive: { fr: "Détection réactive", en: "Reactive detection" },
  proactive: { fr: "Alerte précoce visée", en: "Early warning target" },
};

export function LiveTelemetry() {
  const { t } = useLang();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1800);
    return () => window.clearInterval(timer);
  }, []);

  const anomalyScore = 0.12 + (tick % 5) * 0.01;
  const signalDbm = -82 - (tick % 4);
  const values = [
    { icon: CloudSun, label: t(copy.temperature), value: `${(27.1 + (tick % 4) * 0.2).toFixed(1)} °C`, help: t(copy.temperatureHelp), kind: "standard" },
    { icon: Activity, label: t(copy.humidity), value: `${42 - (tick % 3)} %`, help: t(copy.humidityHelp), kind: "standard" },
    { icon: ShieldAlert, label: t(copy.anomaly), value: t(copy.anomalyLow), help: t(copy.anomalyHelp), technical: `${t(copy.score)} · ${anomalyScore.toFixed(2)}`, progress: anomalyScore * 100, kind: "anomaly" },
    { icon: Wifi, label: t(copy.signal), value: t(copy.signalGood), help: t(copy.signalHelp), technical: `${signalDbm} dBm`, kind: "signal" },
  ];

  return (
    <section className="border-y border-border/60 bg-secondary/20">
      <div className="container grid gap-10 py-20 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{t(copy.liveEyebrow)}</p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{t(copy.liveTitle)}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground md:text-lg">{t(copy.liveText)}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-primary-glow/30 bg-card shadow-deep">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
            <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-primary-glow"><i className="h-2 w-2 rounded-full bg-primary-glow shadow-[0_0_12px_hsl(var(--primary-glow))]" />{t(copy.operational)}</span>
            <RadioTower className="h-4 w-4 text-accent" />
          </div>
          <div className="grid grid-cols-1 gap-px bg-border/70 sm:grid-cols-2">
            {values.map(({ icon: Icon, label, value, help, technical, progress, kind }) => (
              <div key={label} className="bg-card p-4 sm:p-6">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-4 text-xs text-muted-foreground">{label}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className={`font-mono text-lg font-semibold sm:text-xl ${kind === "anomaly" || kind === "signal" ? "text-primary-glow" : ""}`}>{value}</p>
                  {technical && <span className="text-right font-mono text-[0.58rem] text-muted-foreground sm:text-[0.65rem]">{technical}</span>}
                </div>
                {kind === "anomaly" && (
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-primary-glow transition-[width] duration-700" style={{ width: `${progress}%` }} /></div>
                )}
                {kind === "signal" && (
                  <div className="mt-3 flex h-4 items-end gap-1" aria-hidden="true">
                    {[35, 55, 75, 100].map((height, index) => <i key={height} className={`w-1.5 rounded-sm ${index < 3 ? "bg-primary-glow" : "bg-secondary"}`} style={{ height: `${height}%` }} />)}
                  </div>
                )}
                <p className="mt-3 text-[0.68rem] leading-relaxed text-muted-foreground sm:text-xs">{help}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaroComparison() {
  const { t } = useLang();
  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{t(copy.compareEyebrow)}</p>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{t(copy.compareTitle)}</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
          <Timer className="h-7 w-7 text-muted-foreground" />
          <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">{t(copy.reactive)}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{t(copy.without)}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t(copy.withoutText)}</p>
          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-secondary"><span className="block h-full w-4/5 rounded-full bg-muted-foreground/40" /></div>
        </article>
        <article className="relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/5 p-6 shadow-ember sm:p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-glow" />
          <RadioTower className="relative h-7 w-7 text-accent" />
          <p className="relative mt-5 font-mono text-[0.65rem] uppercase tracking-wider text-accent">{t(copy.proactive)}</p>
          <h3 className="relative mt-2 font-display text-2xl font-semibold">{t(copy.with)}</h3>
          <p className="relative mt-4 leading-relaxed text-muted-foreground">{t(copy.withText)}</p>
          <div className="relative mt-7 h-1.5 overflow-hidden rounded-full bg-secondary"><span className="block h-full w-1/3 rounded-full bg-accent" /></div>
        </article>
      </div>
    </section>
  );
}
