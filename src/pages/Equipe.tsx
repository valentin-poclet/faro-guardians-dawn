import { PageLayout, PageHero } from "@/components/faro/PageLayout";
import { useLang } from "@/i18n/LanguageContext";
import { TEAM } from "@/content/i18n";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function Equipe() {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero eyebrow={t({ fr: "03 — Équipe", en: "03 — Team" })} title={t(TEAM.title)} subtitle={t(TEAM.subtitle)} />

      <section className="container py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.members.map((m) => (
            <article
              key={m.name}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/60"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-secondary">
                  <span className="font-display text-lg font-bold text-accent">
                    {initials(m.name)}
                  </span>
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-accent">{t(m.role)}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(m.bio)}</p>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
