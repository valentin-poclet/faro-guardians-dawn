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
  humidity: { fr: "Humidité", en: "Humidity" },
  anomaly: { fr: "Anomalie", en: "Anomaly" },
  signal: { fr: "Signal LoRa", en: "LoRa signal" },
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

  const values = [
    { icon: CloudSun, label: t(copy.temperature), value: `${(27.1 + (tick % 4) * 0.2).toFixed(1)} °C` },
    { icon: Activity, label: t(copy.humidity), value: `${42 - (tick % 3)} %` },
    { icon: ShieldAlert, label: t(copy.anomaly), value: (0.12 + (tick % 5) * 0.01).toFixed(2) },
    { icon: Wifi, label: t(copy.signal), value: `${-82 - (tick % 4)} dBm` },
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
          <div className="grid grid-cols-2 gap-px bg-border/70">
            {values.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card p-4 sm:p-6">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-4 text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 font-mono text-lg font-semibold sm:text-xl">{value}</p>
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
