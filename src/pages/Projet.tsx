import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { PROJECT, LINKS, UI } from "@/content/i18n";

export default function Projet() {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero
        eyebrow="01 — Projet"
        title={t(PROJECT.title)}
        subtitle={t(PROJECT.intro)}
      />

      <section className="border-b border-border/60 bg-secondary/20">
        <div className="container py-12 md:py-16">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              {t(PROJECT.chain.title)}
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t(PROJECT.chain.eyebrow)}
            </p>
          </div>
          <ol className="grid gap-3 md:grid-cols-5">
            {PROJECT.chain.items.map((item, i) => (
              <li
                key={i}
                className="relative rounded-xl border border-border/70 bg-card p-4 shadow-card"
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-display text-lg font-semibold">{t(item)}</p>
                {i < PROJECT.chain.items.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-accent md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <ol className="space-y-12 md:space-y-20">
          {PROJECT.layers.map((layer, idx) => (
            <li
              key={layer.n}
              className="grid gap-8 border-t border-border/60 pt-10 md:grid-cols-[180px_1fr] md:gap-12 md:pt-14"
            >
              <div className="flex flex-col gap-2 md:sticky md:top-28 md:self-start">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {t(UI.layer)} {layer.n}
                </span>
                <span className="font-mono text-5xl font-bold text-gradient-ember md:text-7xl">
                  {layer.n}
                </span>
              </div>
              <div className="max-w-3xl">
                <h2 className="font-display text-2xl font-semibold md:text-3xl">
                  {t(layer.title)}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                  {t(layer.text)}
                </p>
                {idx === 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {["BME688", "OLED", "LoRa SX1262", "ESP32"].map((chip) => (
                      <div
                        key={chip}
                        className="rounded-lg border border-border/70 bg-card px-3 py-2 text-center font-mono text-xs tracking-wider text-foreground/80"
                      >
                        {chip}
                      </div>
                    ))}
                  </div>
                )}
                {idx === 3 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["t+5 min", "t+15 min", "t+30 min"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border/60 bg-secondary/30">
        <div className="container py-20">
          <h2 className="mb-8 font-display text-2xl font-semibold md:text-3xl">
            {t(PROJECT.resources.title)}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="ember" size="lg">
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                <Github /> {t(PROJECT.resources.github)}
              </a>
            </Button>
            <Button asChild variant="forest" size="lg">
              <a href={LINKS.drive} target="_blank" rel="noreferrer">
                <ExternalLink /> {t(PROJECT.resources.drive)}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
