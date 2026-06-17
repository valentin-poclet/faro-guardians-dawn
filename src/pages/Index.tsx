import { Link } from "react-router-dom";
import { ArrowRight, Github, Flame, Brain, MapPinned, AlertTriangle, ShieldCheck, Target, Cpu } from "lucide-react";
import { PageLayout } from "@/components/faro/PageLayout";
import { MediaPlaceholder } from "@/components/faro/MediaPlaceholder";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, HOME, LINKS } from "@/content/i18n";
import heroImg from "@/assets/hero-forest.jpg";

const pillarIcons = [Flame, Brain, MapPinned];
const promiseIcons = [AlertTriangle, ShieldCheck, Target];

export default function Index() {
  const { t } = useLang();
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero-fade" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_70%,hsl(15_90%_45%/0.18),transparent_60%)]" />

        <div className="container relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-32">
          <div className="max-w-3xl reveal">
            <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {t(HOME.hero.eyebrow)}
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              {t(HOME.hero.title)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t(HOME.hero.subtitle)}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="ember" size="xl">
                <Link to="/projet">
                  {t(HOME.hero.ctaPrimary)} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="forest" size="xl">
                <a href={LINKS.github} target="_blank" rel="noreferrer">
                  <Github /> {t(HOME.hero.ctaSecondary)}
                </a>
              </Button>
            </div>
            <p className="mt-10 font-display text-sm italic text-accent/90">
              "{t(BRAND.slogan)}"
            </p>
          </div>
        </div>

        {/* floating embers */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent"
              style={{
                left: `${(i * 73) % 100}%`,
                bottom: `-${(i * 11) % 30}px`,
                opacity: 0,
                animation: `float-particle ${10 + (i % 6)}s linear ${i * 0.7}s infinite`,
              }}
            />
          ))}
        </div>
      </section>

      {/* PROMISE */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="container grid gap-10 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-28">
          <div className="reveal">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(HOME.promise.eyebrow)}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {t(HOME.promise.title)}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground md:text-lg">
              {t(HOME.promise.text)}
            </p>
          </div>

          <div className="grid gap-4">
            {HOME.promise.cards.map((card, i) => {
              const Icon = promiseIcons[i] ?? Target;
              return (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:border-accent/50"
                >
                  <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-gradient-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{t(card.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {t(card.text)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="container grid gap-px overflow-hidden md:grid-cols-2">
          {HOME.metrics.map((m, i) => (
            <div
              key={i}
              className="relative px-2 py-12 md:px-10 md:py-16"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold text-gradient-ember md:text-6xl">
                  {m.value}
                </span>
                <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  {t(m.unit)}
                </span>
              </div>
              <p className="mt-3 max-w-md text-lg text-foreground/85">{t(m.label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-3xl font-bold md:text-5xl">
            {t(HOME.how.title)}
          </h2>
          <p className="max-w-md font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Mesurer / Analyser / Transmettre / Simuler
          </p>
        </div>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOME.how.steps.map((s) => (
            <li
              key={s.n}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="font-mono text-xs tracking-widest text-accent">{s.n}</span>
              <h3 className="font-display text-xl font-semibold">{t(s.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(s.text)}</p>
              <div className="mt-auto h-px w-12 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full" />
            </li>
          ))}
        </ol>
      </section>

      {/* PILLARS */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container py-24 md:py-32">
          <h2 className="mb-14 max-w-2xl font-display text-3xl font-bold md:text-5xl">
            {t(HOME.pillars.title)}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {HOME.pillars.items.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <article
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 shadow-card"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-glow opacity-50" />
                  <Icon className="mb-6 h-7 w-7 text-accent" />
                  <h3 className="font-display text-2xl font-semibold">{t(p.title)}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{t(p.text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEMO CHAIN */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container grid gap-10 py-24 md:grid-cols-[1fr_0.9fr] md:items-center md:py-32">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(HOME.demo.eyebrow)}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold md:text-5xl">
              {t(HOME.demo.title)}
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
              {t(HOME.demo.text)}
            </p>
          </div>

          <div className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-card">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative grid gap-3">
              {HOME.demo.items.map((item, i) => (
                <div
                  key={item.value}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/60 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <span className="font-display font-semibold">{item.value}</span>
                  </div>
                  <span className="text-right text-sm text-muted-foreground">{t(item.label)}</span>
                  {i < HOME.demo.items.length - 1 && (
                    <span className="absolute left-[2.35rem] mt-16 h-3 w-px bg-accent/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="container py-24 md:py-32">
        <MediaPlaceholder
          label={t(HOME.video.placeholder)}
          caption={t(HOME.video.caption)}
          variant="video"
          aspect="wide"
        />
      </section>

      {/* TEAM TEASER */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="container flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between md:py-28">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {t(HOME.teamTeaser.title)}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">{t(HOME.teamTeaser.text)}</p>
          </div>
          <Button asChild variant="ember" size="lg">
            <Link to="/equipe">
              {t(HOME.teamTeaser.cta)} <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
