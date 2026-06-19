import { useEffect, useLayoutEffect, type RefObject } from "react";

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
    const architectureMobileFallback = routeKey === "/architecture" && window.innerWidth < 768
      ? window.setTimeout(() => {
          targets.forEach((element) => {
            element.classList.add("is-visible");
            observer.unobserve(element);
          });
        }, 700)
      : 0;
    return () => {
      observer.disconnect();
      cleanupTimers.forEach(window.clearTimeout);
      if (architectureMobileFallback) window.clearTimeout(architectureMobileFallback);
    };
  }, [rootRef, routeKey]);
}

export function useParallax(rootRef: RefObject<HTMLElement>, routeKey: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!elements.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      elements.forEach((element) => {
        const rect = element.parentElement?.getBoundingClientRect();
        if (!rect) return;
        const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight;
        element.style.setProperty("--parallax-y", `${Math.max(-28, Math.min(28, progress * 32))}px`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef, routeKey]);
}
