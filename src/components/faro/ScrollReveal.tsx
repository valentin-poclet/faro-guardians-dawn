import { useLayoutEffect, type RefObject } from "react";

export function useScrollReveal(rootRef: RefObject<HTMLElement>, routeKey: string) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ":scope > section:not(:first-child), :scope > section article, :scope > section figure, :scope > section ol > li",
      ),
    );

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const cleanupTimers: number[] = [];

    targets.forEach((element) => {
      element.classList.add("scroll-reveal");
      const siblings = Array.from(element.parentElement?.children ?? []);
      const siblingIndex = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex * 70, 210)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          cleanupTimers.push(
            window.setTimeout(() => {
              const element = entry.target as HTMLElement;
              element.classList.remove("scroll-reveal", "is-visible");
              element.style.removeProperty("--reveal-delay");
            }, 1300),
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      cleanupTimers.forEach(window.clearTimeout);
    };
  }, [rootRef, routeKey]);
}
