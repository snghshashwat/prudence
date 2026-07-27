"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Every award-winning finance site uses one
 * somewhere: it introduces horizontal motion into a page that is otherwise
 * a vertical stack, which is most of what makes those pages feel designed
 * rather than assembled.
 *
 * The children are rendered twice and the track translates exactly -50%,
 * so the second copy lands precisely where the first began and the loop is
 * seamless rather than snapping.
 */
export function Marquee({
  items,
  className,
  speed = 40,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        // Fade the edges so items enter and leave rather than getting cut.
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {track.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-border"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
