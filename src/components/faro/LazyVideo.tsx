import { useState } from "react";
import { Play } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const copy = {
  load: { fr: "Charger la vidéo 3D", en: "Load 3D video" },
  data: { fr: "Chargée uniquement à la demande", en: "Loaded only on demand" },
};

export function LazyVideo({ src, poster, ariaLabel }: { src: string; poster: string; ariaLabel: string }) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <video
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
        className="h-full w-full object-contain"
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <button type="button" onClick={() => setLoaded(true)} className="group relative h-full w-full overflow-hidden bg-white" aria-label={`${t(copy.load)} — ${ariaLabel}`}>
      <img src={poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
      <span className="absolute inset-0 flex flex-col items-center justify-center bg-background/25 transition group-hover:bg-background/35">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-background/85 text-accent shadow-ember backdrop-blur-sm">
          <Play className="ml-0.5 h-6 w-6" />
        </span>
        <strong className="mt-3 rounded-full bg-background/85 px-3 py-1.5 text-sm text-foreground backdrop-blur-sm">{t(copy.load)}</strong>
        <small className="mt-2 rounded-full bg-background/70 px-2.5 py-1 text-[0.62rem] text-muted-foreground backdrop-blur-sm">{t(copy.data)}</small>
      </span>
    </button>
  );
}
