import type { PointerEvent } from "react";

export function updatePointerGlow(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
}
