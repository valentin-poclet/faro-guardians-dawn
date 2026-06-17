import { Cpu, Radio, Activity, Monitor, BatteryCharging, Network, AlertTriangle } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { MediaPlaceholder } from "@/components/faro/MediaPlaceholder";
import { useLang } from "@/i18n/LanguageContext";
import { ARCH } from "@/content/i18n";

const componentIcons = [Activity, Radio, Cpu, Monitor, BatteryCharging, Network];

export default function Architecture() {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero
        eyebrow="02 — Architecture"
        title={t(ARCH.title)}
        subtitle={t(ARCH.intro)}
      />

      <section className="container py-20 md:py-24">
        <MediaPlaceholder label={t(ARCH.diagram)} variant="diagram" aspect="wide" />
      </section>

      <section className="container pb-20">
        <MediaPlaceholder label={t(ARCH.showcase)} variant="image" aspect="video" />
      </section>

      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container py-20 md:py-28">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ARCH.components.map((c, i) => {
              const Icon = componentIcons[i] ?? Cpu;
              const isLora = i === 1;
              return (
                <article
                  key={i}
                  className="relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{t(c.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(c.text)}</p>
                  {isLora && (
                    <p className="mt-1 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{t(ARCH.antennaWarning)}</span>
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <MediaPlaceholder label={t(ARCH.deployVideo)} variant="video" aspect="video" />
      </section>
    </PageLayout>
  );
}
