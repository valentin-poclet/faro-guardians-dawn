import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Command,
  Compass,
  Home,
  Gamepad2,
  Layers3,
  RadioTower,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const copy = {
  open: { fr: "Ouvrir le centre de contrôle", en: "Open command centre" },
  title: { fr: "Centre de contrôle", en: "Command centre" },
  subtitle: {
    fr: "Accès rapide aux différentes parties du projet.",
    en: "Quick access to every part of the project.",
  },
  shortcuts: { fr: "Navigation rapide", en: "Quick navigation" },
  experience: { fr: "Expérience interactive", en: "Interactive experience" },
  game: { fr: "Mission FARO", en: "FARO Mission" },
  gameText: { fr: "Placez les capteurs et détectez le feu à temps.", en: "Place the sensors and detect the fire in time." },
  restart: { fr: "Revoir l'introduction", en: "Replay introduction" },
  close: { fr: "Fermer", en: "Close" },
};

const links = [
  {
    path: "/",
    icon: Home,
    label: { fr: "Vision", en: "Vision" },
  },
  {
    path: "/projet",
    icon: RadioTower,
    label: { fr: "Fonctionnement", en: "How it works" },
  },
  {
    path: "/architecture",
    icon: Layers3,
    label: { fr: "Prototype", en: "Prototype" },
  },
  {
    path: "/equipe",
    icon: Users,
    label: { fr: "Équipe", en: "Team" },
  },
  {
    path: "/ressources",
    icon: Compass,
    label: { fr: "Preuves", en: "Evidence" },
  },
];

export function CommandCenter() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const replayIntro = () => {
    try {
      sessionStorage.removeItem("faro.intro.seen");
    } catch {
      // The intro remains optional if storage is unavailable.
    }
    window.location.assign("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-trigger fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full border border-accent/40 bg-background/80 px-4 text-sm font-medium text-foreground shadow-ember backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent md:bottom-7 md:right-7"
        aria-label={t(copy.open)}
      >
        <Command className="h-4 w-4 text-accent" />
        <span className="hidden sm:inline">FARO</span>
        <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground md:inline">⌘K</kbd>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm transition md:items-center md:p-6",
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

          <p className="mb-3 mt-7 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground">{t(copy.shortcuts)}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button key={link.path} type="button" onClick={() => go(link.path)} className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-left transition hover:border-accent/50 hover:bg-accent/5">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="font-medium">{t(link.label)}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
            <button type="button" onClick={replayIntro} className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-left transition hover:border-accent/50 hover:bg-accent/5">
              <RotateCcw className="h-4 w-4 text-accent" />
              <span className="font-medium">{t(copy.restart)}</span>
            </button>
          </div>

          <p className="mb-3 mt-7 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground">{t(copy.experience)}</p>
          <button type="button" onClick={() => go("/mission-faro")} className="group flex w-full items-center gap-4 overflow-hidden rounded-xl border border-accent/40 bg-accent/5 p-4 text-left transition hover:border-accent/70 hover:bg-accent/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-ember"><Gamepad2 className="h-5 w-5" /></span>
            <span>
              <strong className="block font-display text-lg">{t(copy.game)}</strong>
              <span className="mt-1 block text-sm text-muted-foreground">{t(copy.gameText)}</span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </button>
        </section>
      </div>

    </>
  );
}
