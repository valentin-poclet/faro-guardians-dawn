import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { HOME } from "@/content/i18n";
import { useLang } from "@/i18n/LanguageContext";

type AlertState = { stage: number; active: boolean };

export function AlertStatus() {
  const { t } = useLang();
  const [alert, setAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<AlertState>).detail;
      setAlert(detail.active ? detail : null);
    };
    window.addEventListener("faro:alert-stage", update);
    return () => window.removeEventListener("faro:alert-stage", update);
  }, []);

  if (!alert) return null;
  const step = HOME.interactive.steps[Math.min(alert.stage, HOME.interactive.steps.length - 1)];

  return (
    <>
      <div className="pointer-events-none fixed inset-2 z-[55] rounded-xl border border-accent/35 shadow-[inset_0_0_45px_hsl(var(--accent)/0.08)]" />
      <div role="status" aria-live="polite" className="fixed right-4 top-20 z-[65] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-accent/50 bg-background/95 px-4 py-3 shadow-ember backdrop-blur-xl md:right-8 md:top-24">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <AlertTriangle className="h-4 w-4" />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/30" />
        </span>
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent">{t(HOME.interactive.alertLabel)}</p>
          <p className="mt-0.5 text-sm font-medium">{t(step.title)} - {t(step.detail)}</p>
        </div>
        <div className="ml-2 hidden gap-1.5 sm:flex" aria-hidden="true">
          {HOME.interactive.steps.map((_, index) => (
            <span key={index} className={`h-1.5 w-1.5 rounded-full ${index <= alert.stage ? "bg-accent" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </>
  );
}
