import { Github, ExternalLink, FileText, Package, CirclePlay } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { RESOURCES } from "@/content/i18n";
import { updatePointerGlow } from "@/lib/pointer-glow";

export default function Ressources() {
  const { t } = useLang();
  const resourceIcon = (kind: string) => {
    if (kind === "github") return <Github />;
    if (kind === "report" || kind === "poster") return <FileText />;
    if (kind === "bom") return <Package />;
    if (kind === "projectVideo") return <CirclePlay />;
    return <ExternalLink />;
  };
  return (
    <PageLayout>
      <PageHero eyebrow={t({ fr: "04 — Ressources", en: "04 — Resources" })} title={t(RESOURCES.title)} subtitle={t(RESOURCES.intro)} />

      <section className="container py-16 md:py-28">
        <div className="grid gap-6">
          {RESOURCES.blocks.map((b, i) => (
            <article
              key={i}
              onPointerMove={updatePointerGlow}
              className="pointer-glow grid items-center gap-6 overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-8 md:grid-cols-[1fr_auto] md:gap-8 md:p-12"
            >
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {String(i + 1).padStart(2, "0")} / {RESOURCES.blocks.length.toString().padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {t(b.title)}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(b.desc)}</p>

              </div>

              <Button asChild variant="ember" size="lg" className="w-full md:w-auto">
                <a href={b.href} target="_blank" rel="noreferrer">
                  {resourceIcon(b.kind)}
                  {t(b.cta)}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
