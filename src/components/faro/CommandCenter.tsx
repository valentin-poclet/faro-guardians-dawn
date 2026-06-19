import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Command,
  Compass,
  Home,
  Layers3,
  RadioTower,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const copy = {
  open: { fr: "Ouvrir le centre de contrôle", en: "Open command centre" },
  title: { fr: "Centre de contrôle", en: "Command centre" },
  subtitle: {
    fr: "Accès rapide au projet et parcours guidé pour le jury.",
    en: "Quick access to the project and a guided jury tour.",
  },
  jury: { fr: "Parcours jury", en: "Jury tour" },
  juryText: {
    fr: "Une visite guidée en 5 étapes pour présenter FARO clairement en quelques minutes.",
    en: "A five-step guided tour to present FARO clearly in a few minutes.",
  },
  start: { fr: "Démarrer le parcours", en: "Start the tour" },
  shortcuts: { fr: "Navigation rapide", en: "Quick navigation" },
  restart: { fr: "Revoir l'introduction", en: "Replay introduction" },
  close: { fr: "Fermer", en: "Close" },
  previous: { fr: "Précédent", en: "Previous" },
  next: { fr: "Étape suivante", en: "Next step" },
  finish: { fr: "Terminer", en: "Finish" },
  tourLabel: { fr: "Mode jury", en: "Jury mode" },
};

const steps = [
  {
    path: "/",
    icon: Home,
    label: { fr: "Vision", en: "Vision" },
    pitch: {
      fr: "FARO vise à détecter les signaux faibles d'un départ de feu avant qu'il ne soit clairement visible.",
      en: "FARO aims to detect the weak signals of an emerging fire before it becomes clearly visible.",
    },
  },
  {
    path: "/projet",
    icon: RadioTower,
    label: { fr: "Fonctionnement", en: "How it works" },
    pitch: {
      fr: "Du capteur à la carte, cinq couches techniques transforment une anomalie en information exploitable.",
      en: "From sensor to map, five technical layers turn an anomaly into actionable information.",
    },
  },
  {
    path: "/architecture",
    icon: Layers3,
    label: { fr: "Prototype", en: "Prototype" },
    pitch: {
      fr: "Découvrez le schéma complet, le boîtier et chaque composant avec sa modélisation 3D.",
      en: "Explore the complete diagram, enclosure and every component with its 3D visualisation.",
    },
  },
  {
    path: "/equipe",
    icon: Users,
    label: { fr: "Équipe", en: "Team" },
    pitch: {
      fr: "Six étudiants ingénieurs ont réuni électronique, réseau, IA, simulation et développement web.",
      en: "Six engineering students brought together electronics, networking, AI, simulation and web development.",
    },
  },
  {
    path: "/ressources",
    icon: Compass,
    label: { fr: "Preuves", en: "Evidence" },
    pitch: {
      fr: "Les livrables, la BOM, l'analyse éthique et les dépôts techniques documentent le travail réalisé.",
      en: "Deliverables, the BOM, ethical review and technical repositories document the work completed.",
    },
  },
];

export function CommandCenter() {
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const index = steps.findIndex((step) => step.path === location.pathname);
    if (index >= 0) setTourStep((currentStep) => (currentStep === null ? null : index));
  }, [location.pathname]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const startTour = () => {
    setOpen(false);
    setTourStep(0);
    navigate(steps[0].path);
  };

  const moveTour = (direction: -1 | 1) => {
    if (tourStep === null) return;
    const next = tourStep + direction;
    if (next < 0 || next >= steps.length) {
      setTourStep(null);
      return;
    }
    setTourStep(next);
    navigate(steps[next].path);
  };

  const replayIntro = () => {
    try {
      sessionStorage.removeItem("faro.intro.seen");
    } catch {
      // The intro remains optional if storage is unavailable.
    }
    window.location.assign("/");
  };

  const current = tourStep === null ? null : steps[tourStep];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-trigger fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full border border-accent/40 bg-background/85 px-4 text-sm font-medium text-foreground shadow-ember backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent md:bottom-7 md:right-7"
        aria-label={t(copy.open)}
      >
        <Command className="h-4 w-4 text-accent" />
        <span className="hidden sm:inline">FARO</span>
        <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground md:inline">⌘K</kbd>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[80] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm transition md:items-center md:p-6",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        aria-hidden={!open}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="command-title"
          className={cn(
            "relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/80 bg-card p-5 shadow-deep transition duration-300 md:p-7",
            open ? "translate-y-0 scale-100" : "translate-y-5 scale-[0.98]",
          )}
        >
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label={t(copy.close)}>
            <X className="h-5 w-5" />
          </button>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">FARO / Control</p>
          <h2 id="command-title" className="mt-3 pr-10 font-display text-3xl font-bold">{t(copy.title)}</h2>
          <p className="mt-2 text-muted-foreground">{t(copy.subtitle)}</p>

          <div className="mt-7 overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Compass className="h-5 w-5" /></span>
              <div>
                <h3 className="font-display text-xl font-semibold">{t(copy.jury)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(copy.juryText)}</p>
              </div>
            </div>
            <Button type="button" onClick={startTour} variant="ember" className="mt-5 w-full sm:w-auto">
              {t(copy.start)} <ArrowRight />
            </Button>
          </div>

          <p className="mb-3 mt-7 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground">{t(copy.shortcuts)}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <button key={step.path} type="button" onClick={() => go(step.path)} className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-left transition hover:border-accent/50 hover:bg-accent/5">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="font-medium">{t(step.label)}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
            <button type="button" onClick={replayIntro} className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-left transition hover:border-accent/50 hover:bg-accent/5">
              <RotateCcw className="h-4 w-4 text-accent" />
              <span className="font-medium">{t(copy.restart)}</span>
            </button>
          </div>
        </section>
      </div>

      {current && tourStep !== null && (
        <aside className="fixed bottom-20 left-3 right-3 z-50 rounded-2xl border border-accent/40 bg-background/95 p-4 shadow-ember backdrop-blur-xl sm:left-5 sm:right-auto sm:w-[390px] md:bottom-7 md:left-7" aria-live="polite">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">{t(copy.tourLabel)} · {tourStep + 1}/{steps.length}</p>
            <button type="button" onClick={() => setTourStep(null)} className="text-muted-foreground hover:text-foreground" aria-label={t(copy.close)}><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${((tourStep + 1) / steps.length) * 100}%` }} />
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold">{t(current.label)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(current.pitch)}</p>
          <div className="mt-4 flex justify-between gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => moveTour(-1)} disabled={tourStep === 0}>{t(copy.previous)}</Button>
            <Button type="button" variant="ember" size="sm" onClick={() => moveTour(1)}>{tourStep === steps.length - 1 ? t(copy.finish) : t(copy.next)} <ArrowRight /></Button>
          </div>
        </aside>
      )}
    </>
  );
}
