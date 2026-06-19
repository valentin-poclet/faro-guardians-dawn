import { useEffect, useRef, useState } from "react";

export function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value.replace(/\d+(?:[.,]\d+)?/, "0"));

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/\d+(?:[.,]\d+)?/);
    if (!node || !match) return;

    const target = Number(match[0].replace(",", "."));
    const decimals = match[0].includes(".") || match[0].includes(",") ? 1 : 0;
    let frame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / 1100, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const number = (target * eased).toFixed(decimals).replace(".", match[0].includes(",") ? "," : ".");
          setDisplay(value.replace(match[0], number));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
