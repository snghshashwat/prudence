"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes Motion drop transform animations for users
 * who ask for reduced motion, while still allowing opacity fades.
 *
 * Crucially this is decided inside Motion at animation time, not by
 * branching the rendered markup, branching on `useReducedMotion()` would
 * produce different server and client output and break hydration.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
