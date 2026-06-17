import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * FARO logo — geometric mesh ring with a central flame.
 * Pure SVG so it scales crisply at any size.
 */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        {/* mesh ring */}
        <g stroke="hsl(var(--primary-glow))" strokeWidth="1.1" opacity="0.85">
          <polygon points="24,4 41,14 41,34 24,44 7,34 7,14" />
          <polygon points="24,10 36,17 36,31 24,38 12,31 12,17" opacity="0.55" />
          <line x1="24" y1="4" x2="24" y2="10" />
          <line x1="41" y1="14" x2="36" y2="17" />
          <line x1="41" y1="34" x2="36" y2="31" />
          <line x1="24" y1="44" x2="24" y2="38" />
          <line x1="7" y1="34" x2="12" y2="31" />
          <line x1="7" y1="14" x2="12" y2="17" />
        </g>
        {/* nodes */}
        <g fill="hsl(var(--primary-glow))">
          <circle cx="24" cy="4" r="1.4" />
          <circle cx="41" cy="14" r="1.4" />
          <circle cx="41" cy="34" r="1.4" />
          <circle cx="24" cy="44" r="1.4" />
          <circle cx="7" cy="34" r="1.4" />
          <circle cx="7" cy="14" r="1.4" />
        </g>
        {/* flame */}
        <path
          d="M24 17c2.6 2.8 4.5 5.3 4.5 8.4 0 2.9-2 5.1-4.5 5.1s-4.5-2.2-4.5-5.1c0-3.1 1.9-5.6 4.5-8.4z"
          fill="url(#flameGrad)"
        />
        <defs>
          <linearGradient id="flameGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="hsl(45 100% 65%)" />
            <stop offset="1" stopColor="hsl(15 95% 50%)" />
          </linearGradient>
        </defs>
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-[0.18em] text-foreground">
          FARO
        </span>
      )}
    </div>
  );
}