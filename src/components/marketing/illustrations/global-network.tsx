"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Destination cities orbiting the home base. Positions are composed for
// balance, not geographic accuracy; a real map at this scale would imply
// precision the drawing doesn't have.
const NODES = [
  { x: 262, y: 84, r: 4 },
  { x: 268, y: 150, r: 3 },
  { x: 44, y: 70, r: 3.5 },
  { x: 40, y: 158, r: 3 },
  { x: 190, y: 38, r: 3.5 },
  { x: 96, y: 196, r: 3 },
];

/**
 * Globe with connection arcs for the NRI pillar: one home base tied to
 * several cities. Layered rather than flat line-art, a soft glow behind
 * the globe, meridians, then arcs that draw themselves in and nodes that
 * pulse once as they land.
 */
export function GlobalNetworkIllustration({
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
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="120" r="96" fill="url(#globe-glow)" />

      {/* Globe: outline plus meridians for volume. */}
      <g stroke="currentColor" fill="none">
        <circle cx="150" cy="120" r="80" strokeOpacity="0.3" strokeWidth="1.5" />
        <ellipse cx="150" cy="120" rx="80" ry="30" strokeOpacity="0.16" strokeWidth="1.1" />
        <ellipse cx="150" cy="120" rx="80" ry="58" strokeOpacity="0.1" strokeWidth="1" />
        <ellipse cx="150" cy="120" rx="34" ry="80" strokeOpacity="0.16" strokeWidth="1.1" />
        <ellipse cx="150" cy="120" rx="62" ry="80" strokeOpacity="0.1" strokeWidth="1" />
        <line x1="70" y1="120" x2="230" y2="120" strokeOpacity="0.16" strokeWidth="1.1" />
      </g>

      {/* Arcs draw outward from the home base. */}
      {NODES.map((c, i) => (
        <motion.path
          key={`arc-${i}`}
          d={`M150 120 Q ${(150 + c.x) / 2} ${Math.min(120, c.y) - 38}, ${c.x} ${c.y}`}
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            delay: 0.15 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Destination nodes land as their arc completes. */}
      {NODES.map((c, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={c.x}
          cy={c.y}
          r={c.r}
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="1.6"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.4,
            delay: 0.75 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
        />
      ))}

      {/* Home base, with a halo to distinguish it from destinations. */}
      <circle cx="150" cy="120" r="12" fill="currentColor" fillOpacity="0.12" />
      <circle cx="150" cy="120" r="5.5" fill="currentColor" />
    </svg>
  );
}
