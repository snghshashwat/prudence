"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const BARS = [
  { x: 62, height: 42 },
  { x: 112, height: 64 },
  { x: 162, height: 54 },
  { x: 212, height: 90 },
  { x: 262, height: 120 },
];
const BASE_Y = 190;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Ascending bars with a trend line for the Accounting/CFO pillar. A
 * generic growth motif on purpose: a chart with invented revenue figures
 * would read as a real claim about real clients.
 *
 * Bars grow from the axis, then the trend line draws across their tops.
 */
export function GrowthChartIllustration({
  className,
}: {
  className?: string;
}) {
  const linePoints = BARS.map(
    (b) => `${b.x},${BASE_Y - b.height - 18}`
  ).join(" ");

  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bar-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Faint gridlines give the bars something to sit against. */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="30"
          y1={BASE_Y - i * 42}
          x2="292"
          y2={BASE_Y - i * 42}
          stroke="currentColor"
          strokeOpacity={i === 0 ? 0.22 : 0.07}
          strokeWidth="1"
        />
      ))}

      {BARS.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x - 17}
          y={BASE_Y - b.height}
          width="34"
          height={b.height}
          rx="3"
          fill="url(#bar-fade)"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
          style={{ transformOrigin: `${b.x}px ${BASE_Y}px` }}
        />
      ))}

      <motion.polyline
        points={linePoints}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.45, ease: EASE }}
      />

      {BARS.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={BASE_Y - b.height - 18}
          r="4"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.6 + i * 0.09, ease: EASE }}
          style={{ transformOrigin: `${b.x}px ${BASE_Y - b.height - 18}px` }}
        />
      ))}
    </svg>
  );
}
