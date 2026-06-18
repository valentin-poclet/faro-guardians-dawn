import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { UI } from "@/content/i18n";
import { useLang } from "@/i18n/LanguageContext";

export function OfflineStatus() {
  const { t } = useLang();
  const [offline, setOffline] = useState(() => typeof navigator !== "undefined" && !navigator.onLine);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] flex items-center gap-3 rounded-lg border border-accent/40 bg-background/95 px-4 py-3 text-sm shadow-deep backdrop-blur-xl sm:left-auto sm:max-w-md">
      <WifiOff className="h-4 w-4 shrink-0 text-accent" />
      <span>{t(UI.offline)}</span>
    </div>
  );
}
