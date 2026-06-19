import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const copy = {
  close: { fr: "Fermer l'image", en: "Close image" },
  hint: { fr: "Cliquez sur une image pour l'agrandir", en: "Click an image to enlarge it" },
};

type Preview = { src: string; alt: string };

export function MediaLightbox() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!target.matches("main figure img, main a img, main img[data-lightbox]")) return;
      event.preventDefault();
      setPreview({ src: target.currentSrc || target.src, alt: target.alt });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [preview]);

  return (
    <>
      {pathname === "/architecture" && (
        <div className="pointer-events-none fixed bottom-7 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground backdrop-blur-lg lg:flex">
          <Maximize2 className="h-3 w-3 text-accent" /> {t(copy.hint)}
        </div>
      )}
      {preview && (
        <div role="dialog" aria-modal="true" aria-label={preview.alt || t(copy.close)} className="lightbox-enter fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md md:p-10" onMouseDown={(event) => event.target === event.currentTarget && setPreview(null)}>
          <button type="button" onClick={() => setPreview(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-accent hover:text-accent md:right-8 md:top-8" aria-label={t(copy.close)}>
            <X className="h-5 w-5" />
          </button>
          <figure className="flex max-h-full max-w-7xl flex-col items-center gap-4">
            <img src={preview.src} alt={preview.alt} className="max-h-[82svh] max-w-full rounded-lg object-contain shadow-deep" />
            {preview.alt && <figcaption className="max-w-3xl text-center text-sm text-white/75">{preview.alt}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
