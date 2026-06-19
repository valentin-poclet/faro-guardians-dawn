import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const routes: Record<string, { to: string; eyebrow: { fr: string; en: string }; title: { fr: string; en: string } }> = {
  "/": { to: "/projet", eyebrow: { fr: "Continuer", en: "Continue" }, title: { fr: "Comprendre le fonctionnement", en: "Understand how it works" } },
  "/projet": { to: "/architecture", eyebrow: { fr: "Étape suivante", en: "Next step" }, title: { fr: "Explorer le prototype", en: "Explore the prototype" } },
  "/architecture": { to: "/equipe", eyebrow: { fr: "Derrière FARO", en: "Behind FARO" }, title: { fr: "Rencontrer l'équipe", en: "Meet the team" } },
  "/equipe": { to: "/ressources", eyebrow: { fr: "Aller plus loin", en: "Go further" }, title: { fr: "Consulter les preuves et livrables", en: "View evidence and deliverables" } },
  "/ressources": { to: "/mission-faro", eyebrow: { fr: "Passer à l'action", en: "Take action" }, title: { fr: "Tester Mission FARO", en: "Play FARO Mission" } },
  "/mission-faro": { to: "/", eyebrow: { fr: "Revenir au projet", en: "Back to the project" }, title: { fr: "Retourner à l'accueil", en: "Return home" } },
};

export function NextExperience() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const next = routes[pathname];
  if (!next) return null;
  return (
    <section className="border-t border-border/60 bg-secondary/20">
      <div className="container py-10 sm:py-12">
        <Link to={next.to} className="group flex min-h-24 items-center justify-between gap-5 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition hover:border-accent/60 hover:bg-accent/5 sm:p-7">
          <span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">{t(next.eyebrow)}</span>
            <strong className="mt-2 block font-display text-xl sm:text-2xl">{t(next.title)}</strong>
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-transform group-hover:translate-x-1"><ArrowRight className="h-5 w-5" /></span>
        </Link>
      </div>
    </section>
  );
}
