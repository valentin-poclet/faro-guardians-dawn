import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/content/i18n";

type Bilingual = { fr: string; en: string };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (b: Bilingual) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "faro.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Lang | null) : null;
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (b) => b[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}