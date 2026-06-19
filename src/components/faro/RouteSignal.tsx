import { useEffect, useState } from "react";

let hasLoadedInitialRoute = false;

export function RouteSignal({ routeKey }: { routeKey: string }) {
  const [active, setActive] = useState(() => hasLoadedInitialRoute);

  useEffect(() => {
    if (!hasLoadedInitialRoute) {
      hasLoadedInitialRoute = true;
      return;
    }
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), 720);
    return () => window.clearTimeout(timer);
  }, [routeKey]);

  return active ? (
    <div className="route-signal fixed inset-0 z-[70] pointer-events-none" aria-hidden="true">
      <span className="route-signal-line" />
    </div>
  ) : null;
}
