import { useEffect, useRef, useState } from "react";
import { Power, Radio, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "faro.intro.seen";

const copy = {
  status: { fr: "Réseau FARO en veille", en: "FARO network on standby" },
  title: { fr: "Le terrain est silencieux.", en: "The field is quiet." },
  text: {
    fr: "Activez le réseau pour commencer la surveillance.",
    en: "Activate the network to begin monitoring.",
  },
  activate: { fr: "Activer le réseau", en: "Activate the network" },
  activating: { fr: "Connexion des nœuds...", en: "Connecting nodes..." },
  ready: { fr: "Réseau opérationnel", en: "Network operational" },
  skip: { fr: "Passer l'introduction", en: "Skip introduction" },
};

export function IntroSequence() {
  const { t } = useLang();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [phase, setPhase] = useState<"idle" | "activating" | "ready" | "opening">("idle");
  const timers = useRef<number[]>([]);

  const finish = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Session storage is optional; the introduction still works without it.
    }
    setVisible(false);
    setPhase("idle");
  };

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  const activate = () => {
    if (phase !== "idle") return;
    setPhase("activating");
    timers.current.push(window.setTimeout(() => setPhase("ready"), 1500));
    timers.current.push(window.setTimeout(() => setPhase("opening"), 2050));
    timers.current.push(window.setTimeout(finish, 3150));
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="faro-intro-title" className={cn("fixed inset-0 z-[100] overflow-hidden bg-background", phase === "opening" && "intro-is-opening")}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.22),transparent_62%)]" />

      <div className={cn("intro-network absolute inset-0", phase !== "idle" && "is-active")} aria-hidden="true">
        <span className="intro-link left-[18%] top-[28%] w-[32%] rotate-[18deg]" />
        <span className="intro-link left-[49%] top-[39%] w-[30%] -rotate-[22deg]" />
        <span className="intro-link left-[22%] top-[67%] w-[29%] -rotate-[14deg]" />
        <span className="intro-link left-[50%] top-[58%] w-[27%] rotate-[16deg]" />
        {[
          ["18%", "27%"], ["49%", "38%"], ["79%", "27%"],
          ["22%", "68%"], ["51%", "57%"], ["78%", "69%"],
        ].map(([left, top], index) => (
          <span key={index} className="intro-node" style={{ left, top, animationDelay: `${index * 140}ms` }} />
        ))}
      </div>

      <div className="intro-screen-fill pointer-events-none absolute inset-0 z-30" aria-hidden="true">
        <span className="intro-wave" />
        <span className="intro-scanline" />
        <div className="intro-final-mark">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2 shadow-ember md:h-28 md:w-28">
            <img src="/faro-logo.png" alt="" className="h-full w-full object-contain" />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-white">{t(copy.ready)}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground md:right-8 md:top-8"
      >
        <SkipForward className="h-4 w-4" /> {t(copy.skip)}
      </button>

      <div className="safe-bottom safe-top relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-12 text-center sm:px-5 sm:py-16">
        <div className="max-w-xl">
          <div className={cn("mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border bg-white p-2 transition-all duration-700 sm:h-28 sm:w-28", phase === "idle" ? "border-border shadow-deep" : "scale-105 border-accent shadow-ember")}>
            <img src="/faro-logo.png" alt="FARO" className="h-full w-full object-contain" />
          </div>
          <p aria-live="polite" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <Radio className={cn("h-4 w-4", phase !== "idle" && "animate-pulse")} />
            {phase === "idle" ? t(copy.status) : phase === "activating" ? t(copy.activating) : t(copy.ready)}
          </p>
          <h1 id="faro-intro-title" className="mt-5 font-display text-3xl font-bold sm:text-4xl md:text-6xl">{t(copy.title)}</h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground md:text-lg">{t(copy.text)}</p>
          <Button autoFocus onClick={activate} disabled={phase !== "idle"} variant="ember" size="xl" className="mt-8 w-full min-w-0 sm:mt-9 sm:w-auto sm:min-w-56">
            <Power /> {phase === "idle" ? t(copy.activate) : phase === "activating" ? t(copy.activating) : t(copy.ready)}
          </Button>
        </div>
      </div>
    </div>
  );
}
