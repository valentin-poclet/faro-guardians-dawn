import { Film, ImageIcon, Network } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "video" | "image" | "diagram";

const ICONS = { video: Film, image: ImageIcon, diagram: Network };

export function MediaPlaceholder({
  label,
  caption,
  variant = "video",
  aspect = "video",
  className,
}: {
  label: string;
  caption?: string;
  variant?: Variant;
  aspect?: "video" | "wide" | "square";
  className?: string;
}) {
  const Icon = ICONS[variant];
  const aspectClass =
    aspect === "video" ? "aspect-video" : aspect === "wide" ? "aspect-[21/9]" : "aspect-square";
  return (
    <figure className={cn("space-y-3", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card",
          aspectClass,
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent shadow-ember">
            <Icon className="h-6 w-6" />
          </span>
          <p className="font-display text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}