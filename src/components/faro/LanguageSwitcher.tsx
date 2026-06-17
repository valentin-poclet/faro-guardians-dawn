import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-background/40 p-0.5 text-xs font-medium backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1 uppercase tracking-wider transition-colors",
            lang === l
              ? "bg-accent text-accent-foreground shadow-ember"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}