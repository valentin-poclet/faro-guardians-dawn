import { Cpu, Radio, Activity, Monitor, BatteryCharging, Network, AlertTriangle, ExternalLink } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { useLang } from "@/i18n/LanguageContext";
import { ARCH } from "@/content/i18n";
import { updatePointerGlow } from "@/lib/pointer-glow";

const componentIcons = [Activity, Radio, Cpu, Monitor, BatteryCharging, Network];

const mediaItems = [
  {
    image: "/media/components/bme688.png",
    video: "/media/components/bme688-3d.mp4",
    poster: "/media/components/bme688-3d-poster.jpg",
  },
  {
    image: "/media/components/dfr1195.png",
    video: "/media/components/dfr1195-3d.mp4",
    poster: "/media/components/dfr1195-3d-poster.jpg",
  },
  {
    image: "/media/components/lipo-3000mah.png",
    video: "/media/components/lipo-3000mah-3d.mp4",
    poster: "/media/components/lipo-3000mah-3d-poster.jpg",
  },
  {
    image: "/media/components/sol3w.png",
    video: "/media/components/sol3w-3d.mp4",
    poster: "/media/components/sol3w-3d-poster.jpg",
  },
  {
    image: "/media/components/sunflower-dfr0559.png",
    video: "/media/components/sunflower-dfr0559-3d.mp4",
    poster: "/media/components/sunflower-dfr0559-3d-poster.jpg",
  },
  {
    image: "/media/components/boitier-exterieur.jpg",
    secondaryImage: "/media/components/boitier-interieur.jpg",
    video: "/media/components/boitier-3d.mp4",
    poster: "/media/components/boitier-3d-poster.jpg",
    cover: true,
  },
];

export default function Architecture() {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero
        eyebrow="02 — Architecture"
        title={t(ARCH.title)}
        subtitle={t(ARCH.intro)}
      />

      <section className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t(ARCH.diagram.eyebrow)}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {t(ARCH.diagram.title)}
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{t(ARCH.diagram.intro)}</p>
        </div>
        <a
          href="/media/architecture/schema-faro.png"
          target="_blank"
          rel="noreferrer"
          className="group mt-10 block overflow-hidden rounded-xl border border-border/70 bg-white p-3 shadow-card md:p-6"
        >
          <img
            src="/media/architecture/schema-faro.png"
            alt={t(ARCH.diagram.caption)}
            width="1402"
            height="376"
            className="h-auto w-full"
          />
          <span className="mt-4 flex items-center justify-center gap-2 text-sm text-background/70 transition-colors group-hover:text-background">
            {t(ARCH.diagram.caption)} <ExternalLink className="h-4 w-4" />
          </span>
        </a>
      </section>

      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(ARCH.media.eyebrow)}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {t(ARCH.media.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{t(ARCH.media.intro)}</p>
          </div>

          <div className="mt-14 space-y-16">
            {ARCH.media.items.map((item, index) => {
              const media = mediaItems[index];
              return (
                <article key={index} className="border-t border-border/70 pt-10">
                  <div className="mb-7 grid gap-4 md:grid-cols-[80px_1fr]">
                    <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <div className="max-w-3xl">
                      <h3 className="font-display text-2xl font-semibold md:text-3xl">{t(item.title)}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{t(item.text)}</p>
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <figure onPointerMove={updatePointerGlow} className="pointer-glow overflow-hidden rounded-xl border border-border/70 bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
                      <figcaption className="border-b border-border/70 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {t(ARCH.media.photoLabel)}
                      </figcaption>
                      {media.secondaryImage ? (
                        <div className="grid gap-px bg-border sm:grid-cols-2">
                          <div className="relative aspect-[4/3] bg-card">
                            <img src={media.image} alt={`${t(item.title)} - ${t(ARCH.media.exteriorLabel)}`} loading="lazy" className="h-full w-full object-cover" />
                            <span className="absolute bottom-3 left-3 rounded-md bg-background/85 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm">{t(ARCH.media.exteriorLabel)}</span>
                          </div>
                          <div className="relative aspect-[4/3] bg-card">
                            <img src={media.secondaryImage} alt={`${t(item.title)} - ${t(ARCH.media.interiorLabel)}`} loading="lazy" className="h-full w-full object-cover" />
                            <span className="absolute bottom-3 left-3 rounded-md bg-background/85 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm">{t(ARCH.media.interiorLabel)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-white p-6 md:p-10">
                          <img src={media.image} alt={`${t(item.title)} - ${t(ARCH.media.photoLabel)}`} loading="lazy" className="h-full w-full object-contain" />
                        </div>
                      )}
                    </figure>

                    <figure onPointerMove={updatePointerGlow} className="pointer-glow overflow-hidden rounded-xl border border-border/70 bg-card shadow-card transition-transform duration-500 hover:-translate-y-1">
                      <figcaption className="border-b border-border/70 px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {t(ARCH.media.videoLabel)}
                      </figcaption>
                      <div className="aspect-[4/3] bg-white">
                        <video
                          controls
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={media.poster}
                          aria-label={`${t(item.title)} - ${t(ARCH.media.videoLabel)}`}
                          className="h-full w-full object-contain"
                        >
                          <source src={media.video} type="video/mp4" />
                        </video>
                      </div>
                    </figure>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container grid gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-start md:py-28">
          <div className="md:sticky md:top-28">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(ARCH.inventory.eyebrow)}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {t(ARCH.inventory.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t(ARCH.inventory.intro)}</p>
            <p className="mt-6 inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-accent">
              {t(ARCH.inventory.total)}
            </p>
          </div>

          <ol className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card shadow-card">
            {ARCH.inventory.items.map((item) => (
              <li key={item.name} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 p-5 md:grid-cols-[56px_180px_1fr] md:items-center md:p-6">
                <span className="font-mono text-sm font-semibold text-accent">{item.qty}</span>
                <strong className="font-display text-base md:text-lg">{item.name}</strong>
                <span className="col-start-2 text-sm text-muted-foreground md:col-start-3">{t(item.detail)}</span>
              </li>
            ))}
          </ol>
        </div>
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
                  onPointerMove={updatePointerGlow}
                  className="pointer-glow relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
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

    </PageLayout>
  );
}
