import { useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Flame, Brain, MapPinned, AlertTriangle, ShieldCheck, Target, Cpu } from "lucide-react";
import { PageLayout } from "@/components/faro/PageLayout";
import { SignalDemo } from "@/components/faro/SignalDemo";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { BRAND, HOME, LINKS } from "@/content/i18n";
import heroImg from "@/assets/hero-forest.jpg";
import { updatePointerGlow } from "@/lib/pointer-glow";
import { AnimatedMetric } from "@/components/faro/AnimatedMetric";

const pillarIcons = [Flame, Brain, MapPinned];
const promiseIcons = [AlertTriangle, ShieldCheck, Target];

export default function Index() {
  const { t } = useLang();
  const [scannerActive, setScannerActive] = useState(false);

  const updateScanner = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--scan-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--scan-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  const scanMask = {
    WebkitMaskImage: "radial-gradient(circle 180px at var(--scan-x, 62%) var(--scan-y, 48%), black 0%, black 48%, transparent 72%)",
    maskImage: "radial-gradient(circle 180px at var(--scan-x, 62%) var(--scan-y, 48%), black 0%, black 48%, transparent 72%)",
  } as CSSProperties;

  return (
    <PageLayout>
      {/* HERO */}
      <section
        onPointerMove={updateScanner}
        onPointerEnter={() => setScannerActive(true)}
        onPointerLeave={() => setScannerActive(false)}
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        <img
          data-parallax
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="parallax-media absolute -inset-y-8 inset-x-0 -z-20 h-[calc(100%+4rem)] w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero-fade" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_70%,hsl(15_90%_45%/0.18),transparent_60%)]" />

        <div
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${scannerActive ? "opacity-100" : "opacity-0"}`}
          style={scanMask}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/10 backdrop-brightness-125" />
          <svg viewBox="0 0 1000 700" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-primary-glow">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 9" opacity="0.72">
              <path d="M160 470 L350 330 L560 430 L780 260 L880 480" />
              <path d="M350 330 L455 205 L780 260" />
            </g>
            <g fill="currentColor">
              {[[160, 470], [350, 330], [560, 430], [780, 260], [880, 480], [455, 205]].map(([cx, cy], index) => (
                <g key={index}>
                  <circle cx={cx} cy={cy} r="7" />
                  <circle cx={cx} cy={cy} r="18" fill="none" stroke="currentColor" opacity="0.35" />
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div
          className={`pointer-events-none absolute z-20 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-glow/60 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-primary-glow shadow-[0_0_35px_hsl(var(--primary-glow)/0.22)] transition-opacity duration-300 md:flex ${scannerActive ? "opacity-100" : "opacity-0"}`}
          style={{ left: "var(--scan-x, 62%)", top: "var(--scan-y, 48%)" }}
          aria-hidden="true"
        >
          {t(HOME.hero.scanLabel)}
        </div>

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-32">
          <div className="max-w-3xl reveal">
            <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {t(HOME.hero.eyebrow)}
            </p>
            <h1 className="font-display text-[2.55rem] font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
              {t(HOME.hero.title)}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-6 md:text-xl">
              {t(HOME.hero.subtitle)}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-foreground/20 bg-background/40 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/75 backdrop-blur-sm">
              {t(HOME.hero.status)}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="ember" size="xl" className="w-full sm:w-auto">
                <Link to="/projet">
                  {t(HOME.hero.ctaPrimary)} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="forest" size="xl" className="w-full sm:w-auto">
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
                  onPointerMove={updatePointerGlow}
                  className="pointer-glow group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
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
        <div className="container grid gap-px overflow-hidden md:grid-cols-3">
          {HOME.metrics.map((m, i) => (
            <div
              key={i}
              className="relative px-2 py-12 md:px-10 md:py-16"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold text-gradient-ember md:text-6xl">
                  <AnimatedMetric value={m.value} />
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
            {t(HOME.how.eyebrow)}
          </p>
        </div>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOME.how.steps.map((s) => (
            <li
              key={s.n}
              onPointerMove={updatePointerGlow}
              className="pointer-glow group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
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
                  onPointerMove={updatePointerGlow}
                  className="pointer-glow relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 shadow-card transition-transform duration-500 hover:-translate-y-1"
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

      <SignalDemo />

      {/* PROJECT VIDEO */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t(HOME.video.eyebrow)}
          </p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{t(HOME.video.title)}</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
            {t(HOME.video.text)}
          </p>
        </div>
        <figure className="mt-10 overflow-hidden rounded-xl border border-border/70 bg-card shadow-card">
          <video
            controls
            playsInline
            preload="none"
            poster="/media/project/faro-presentation-poster.jpg"
            className="aspect-video w-full bg-black object-contain"
          >
            <source src="/media/project/faro-presentation.mp4" type="video/mp4" />
          </video>
          <figcaption className="border-t border-border/70 px-5 py-3 text-center text-sm text-muted-foreground">
            {t(HOME.video.caption)}
          </figcaption>
        </figure>
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
