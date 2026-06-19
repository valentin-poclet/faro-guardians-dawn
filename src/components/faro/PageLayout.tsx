import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { OfflineStatus } from "./OfflineStatus";
import { ScrollProgress } from "./ScrollProgress";
import { IntroSequence } from "./IntroSequence";
import { AlertStatus } from "./AlertStatus";
import { CommandCenter } from "./CommandCenter";
import { useScrollReveal } from "./ScrollReveal";

export function PageLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef, pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <IntroSequence />
      <AlertStatus />
      <ScrollProgress />
      <Navbar />
      <main ref={mainRef} key={pathname} className="page-enter flex-1">{children}</main>
      <Footer />
      <OfflineStatus />
      <CommandCenter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 bg-gradient-glow" />
      <div className="container max-w-4xl reveal">
        {eyebrow && (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
