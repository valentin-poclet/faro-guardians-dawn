import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-0.5">
        <img
          src="/faro-logo.png"
          alt=""
          className="h-full w-full object-contain"
          aria-hidden="true"
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-[0.18em] text-foreground">
          FARO
        </span>
      )}
    </div>
  );
}
