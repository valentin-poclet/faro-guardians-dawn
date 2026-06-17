import { Github, ExternalLink, Film } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/faro/MediaPlaceholder";
import { useLang } from "@/i18n/LanguageContext";
import { RESOURCES } from "@/content/i18n";

export default function Ressources() {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero eyebrow="04 — Ressources" title={t(RESOURCES.title)} subtitle={t(RESOURCES.intro)} />

      <section className="container py-20 md:py-28">
        <div className="grid gap-6">
          {RESOURCES.blocks.map((b, i) => (
            <article
              key={i}
              className="grid items-center gap-8 rounded-2xl border border-border/70 bg-card p-8 shadow-card md:grid-cols-[1fr_auto] md:p-12"
            >
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {String(i + 1).padStart(2, "0")} / {RESOURCES.blocks.length.toString().padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {t(b.title)}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(b.desc)}</p>

                {b.kind === "video" && (
                  <div className="mt-6">
                    <MediaPlaceholder
                      label={t(b.videoPlaceholder)}
                      variant="video"
                      aspect="video"
                    />
                  </div>
                )}
              </div>

              {b.kind !== "video" && (
                <Button asChild variant="ember" size="lg">
                  <a href={b.href} target="_blank" rel="noreferrer">
                    {b.kind === "github" ? <Github /> : <ExternalLink />}
                    {t(b.cta)}
                  </a>
                </Button>
              )}
              {b.kind === "video" && (
                <div className="hidden md:block">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent shadow-ember">
                    <Film className="h-6 w-6" />
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}