"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

/**
 * Counts up to `value` when scrolled into view, then holds.
 *
 * Two details worth keeping:
 *
 * 1. The number is written straight to the DOM from the spring rather than
 *    through React state. Server-rendering the final value means it is
 *    correct with no JS, correct before hydration, and correct for
 *    reduced-motion users, all without a client/server render branch.
 *
 * 2. `useInView` is given a generous root margin so the count begins while
 *    the element is still below the fold. The spring necessarily starts at
 *    zero, and without this you would see the real number for one frame,
 *    then a jump back to zero. Starting early hides that reset off-screen.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Begin well before the element is actually visible.
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px 25% 0px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      const node = numberRef.current;
      if (node) node.textContent = latest.toFixed(decimals);
    });
  }, [spring, decimals]);

  return (
    <span ref={wrapRef} className={className}>
      {prefix}
      <span ref={numberRef}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
