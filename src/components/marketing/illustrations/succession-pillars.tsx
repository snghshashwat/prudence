"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const PILLARS = [
  { x: 62, height: 62 },
  { x: 152, height: 90 },
  { x: 242, height: 118 },
];
const BASE_Y = 198;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Three pillars of ascending height (generations) joined by one unbroken
 * arc, echoing the swoop in the brand mark. Each pillar grows from its
 * base as it enters view, then the arc draws across the tops, continuity
 * arriving only once the generations are standing.
 */
export function SuccessionPillarsIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pillar-floor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line
        x1="20"
        y1={BASE_Y + 14}
        x2="300"
        y2={BASE_Y + 14}
        stroke="url(#pillar-floor)"
        strokeWidth="1.5"
      />

      {PILLARS.map((p, i) => {
        const top = BASE_Y - p.height;
        return (
          <motion.g
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.45 + i * 0.22 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.16, ease: EASE }}
            // Grow upward from the base, not from the centre.
            style={{ transformOrigin: `${p.x}px ${BASE_Y + 8}px` }}
          >
            <rect x={p.x - 16} y={top - 9} width="32" height="9" rx="1.5" fill="currentColor" />
            <rect x={p.x - 16} y={BASE_Y} width="32" height="9" rx="1.5" fill="currentColor" />
            <rect x={p.x - 9} y={top} width="3.5" height={p.height} fill="currentColor" />
            <rect x={p.x - 1.75} y={top} width="3.5" height={p.height} fill="currentColor" />
            <rect x={p.x + 5.5} y={top} width="3.5" height={p.height} fill="currentColor" />
          </motion.g>
        );
      })}

      <motion.path
        d={`M ${PILLARS[0].x} ${BASE_Y - PILLARS[0].height - 20} Q 160 26, ${PILLARS[2].x} ${BASE_Y - PILLARS[2].height - 20}`}
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
      />
    </svg>
  );
}
