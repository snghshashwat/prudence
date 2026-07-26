"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * False during SSR and the first client render, true afterwards.
 *
 * Used to defer rendering anything that depends on browser-only state (e.g.
 * the resolved theme) until after hydration, without calling setState inside
 * an effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
