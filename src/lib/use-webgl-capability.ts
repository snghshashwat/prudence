"use client";

import { useSyncExternalStore } from "react";

type Nav = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";
const SMALL_SCREEN = "(max-width: 900px)";

// Hardware facts don't change for the life of the page, so probe once.
let staticCapability: boolean | null = null;

function probeStaticCapability() {
  if (staticCapability !== null) return staticCapability;

  const nav = navigator as Nav;

  if (nav.connection?.saveData) return (staticCapability = false);
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4)
    return (staticCapability = false);
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return (staticCapability = false);

  // Confirm a context can actually be created before committing to it.
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    staticCapability = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    staticCapability = false;
  }

  return staticCapability;
}

function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia(REDUCE_MOTION),
    window.matchMedia(SMALL_SCREEN),
  ];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getSnapshot() {
  if (window.matchMedia(REDUCE_MOTION).matches) return false;
  // Phones/small tablets: keep the static gradient instead (battery, thermals).
  if (window.matchMedia(SMALL_SCREEN).matches) return false;
  return probeStaticCapability();
}

/**
 * Whether it's appropriate to run a decorative WebGL animation on this
 * device. False during SSR and the first client render, so the static
 * fallback is always what gets served and hydrated. Re-evaluates when the
 * viewport crosses the small-screen breakpoint or reduced-motion changes.
 */
export function useWebGLCapability() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
