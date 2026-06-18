import { Github, ExternalLink, FileText, Package, CirclePlay } from "lucide-react";
import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { RESOURCES } from "@/content/i18n";

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

              </div>

              <Button asChild variant="ember" size="lg">
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
