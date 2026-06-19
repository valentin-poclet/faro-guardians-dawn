import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, ExternalLink, UserCheck, ScanSearch, RadioTower, AlertCircle } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { PROJECT, LINKS, UI } from "@/content/i18n";
import { updatePointerGlow } from "@/lib/pointer-glow";

const ethicsIcons = [UserCheck, ScanSearch, RadioTower];

export default function Projet() {
  const { t } = useLang();
  const [activeLayer, setActiveLayer] = useState(0);
  const layerRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (visible) setActiveLayer(Number((visible.target as HTMLElement).dataset.layerIndex ?? 0));
      },
      { threshold: [0.25, 0.55], rootMargin: "-18% 0px -46% 0px" },
    );
    layerRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const focusLayer = (index: number) => {
    layerRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow={t({ fr: "01 — Projet", en: "01 — Project" })}
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
                onPointerMove={updatePointerGlow}
                className="pointer-glow relative overflow-hidden rounded-xl border border-border/70 bg-card p-4 shadow-card transition-transform duration-300 hover:-translate-y-1"
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
        <nav aria-label={t(PROJECT.chain.title)} className="sticky top-16 z-30 mb-12 overflow-hidden rounded-xl border border-border/70 bg-background/90 p-2 shadow-deep backdrop-blur-xl md:top-20 md:mb-16">
          <div className="absolute inset-x-3 bottom-0 h-px bg-border">
            <span className="block h-full bg-accent transition-[width] duration-700" style={{ width: `${((activeLayer + 1) / PROJECT.layers.length) * 100}%` }} />
          </div>
          <div className="grid grid-cols-5 gap-1">
            {PROJECT.chain.items.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => focusLayer(index)}
                aria-current={index === activeLayer ? "step" : undefined}
                className={`rounded-lg px-2 py-2.5 text-center transition-colors ${index === activeLayer ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <span className="block font-mono text-[0.6rem] text-accent">0{index + 1}</span>
                <span className="mt-1 hidden text-xs font-medium sm:block md:text-sm">{t(item)}</span>
              </button>
            ))}
          </div>
        </nav>
        <ol className="space-y-12 md:space-y-20">
          {PROJECT.layers.map((layer, idx) => (
            <li
              key={layer.n}
              ref={(element) => { layerRefs.current[idx] = element; }}
              data-layer-index={idx}
              className={`grid gap-8 border-t pt-10 transition-colors duration-700 md:grid-cols-[180px_1fr] md:gap-12 md:pt-14 ${idx === activeLayer ? "border-accent/50" : "border-border/60"}`}
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

      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(PROJECT.ethics.eyebrow)}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {t(PROJECT.ethics.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
              {t(PROJECT.ethics.intro)}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROJECT.ethics.principles.map((principle, index) => {
              const Icon = ethicsIcons[index] ?? UserCheck;
              return (
                <article key={index} onPointerMove={updatePointerGlow} className="pointer-glow overflow-hidden rounded-xl border border-border/70 bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{t(principle.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(principle.text)}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-accent/30 bg-accent/10 p-5 md:p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-display text-lg font-semibold">{t(PROJECT.ethics.limitTitle)}</h3>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(PROJECT.ethics.limitText)}
              </p>
            </div>
          </div>
        </div>
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
