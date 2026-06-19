import { useEffect, useRef, useState } from "react";
import { Activity, BrainCircuit, Map, Play, RadioTower, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME } from "@/content/i18n";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { updatePointerGlow } from "@/lib/pointer-glow";

const icons = [Activity, BrainCircuit, RadioTower, Map];

export function SignalDemo() {
  const { t } = useLang();
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  const broadcastStage = (stage: number, active: boolean) => {
    document.documentElement.classList.toggle("faro-alert-active", active);
    window.dispatchEvent(new CustomEvent("faro:alert-stage", { detail: { stage, active } }));
  };

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
      document.documentElement.classList.remove("faro-alert-active");
    },
    [],
  );

  const run = () => {
    clearTimers();
    setRunning(true);
    setCompleted(false);
    setActiveStep(0);
    broadcastStage(0, true);

    HOME.interactive.steps.slice(1).forEach((_, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setActiveStep(index + 1);
          broadcastStage(index + 1, true);
        }, (index + 1) * 850),
      );
    });

    timers.current.push(
      window.setTimeout(() => {
        setRunning(false);
        setCompleted(true);
      }, HOME.interactive.steps.length * 850),
    );
    timers.current.push(window.setTimeout(() => broadcastStage(3, false), HOME.interactive.steps.length * 850 + 1800));
  };

  return (
    <section id="demonstration" className="scroll-mt-20 border-t border-border/60 bg-secondary/20">
      <div className="container py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(HOME.interactive.eyebrow)}
            </p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">{t(HOME.interactive.title)}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">{t(HOME.interactive.text)}</p>
          </div>
          <Button onClick={run} disabled={running} variant="ember" size="lg">
            {completed ? <RotateCcw /> : <Play />}
            {running
              ? t(HOME.interactive.running)
              : completed
                ? t(HOME.interactive.replay)
                : t(HOME.interactive.start)}
          </Button>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-border md:block" />
          <div
            className="absolute left-[12.5%] top-10 hidden h-px bg-accent transition-[width] duration-700 md:block"
            style={{ width: activeStep < 1 ? "0%" : `${Math.min(activeStep, 3) * 25}%` }}
          />

          {HOME.interactive.steps.map((step, index) => {
            const Icon = icons[index];
            const active = index <= activeStep;
            const current = index === activeStep;
            return (
              <article
                key={index}
                tabIndex={0}
                onPointerMove={updatePointerGlow}
                onPointerEnter={() => !running && setActiveStep(index)}
                onPointerLeave={() => !running && setActiveStep(completed ? 3 : -1)}
                onFocus={() => !running && setActiveStep(index)}
                onBlur={() => !running && setActiveStep(completed ? 3 : -1)}
                className={cn(
                  "pointer-glow relative overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-all duration-500",
                  active ? "border-accent/60" : "border-border/70",
                  current && "-translate-y-1 shadow-ember",
                )}
              >
                <div className="relative z-10">
                  <span
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500",
                      active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-secondary text-muted-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {current && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40" />}
                  </span>
                  <p className="mt-5 font-mono text-xs text-accent">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{t(step.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.detail)}</p>
                  {index === 3 && active && (
                    <div className="mt-4 flex gap-2">
                      {["t+5", "t+15", "t+30"].map((time, circleIndex) => (
                        <span
                          key={time}
                          className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] text-accent"
                          style={{ animationDelay: `${circleIndex * 140}ms` }}
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">{t(HOME.interactive.hint)}</p>
      </div>
    </section>
  );
}
