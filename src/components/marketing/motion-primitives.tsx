"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// Reduced motion is handled globally by <MotionConfig reducedMotion="user">
// (see components/motion-provider.tsx), which strips transform animations
// for those users. These components therefore render identical markup on
// server and client, never branch them on `useReducedMotion()`, that
// desyncs hydration.

const EASE = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -60px 0px",
} as const;

/** Fade + rise, triggered once when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent that staggers its `RevealItem` children as the group enters view 
 * one observer for the whole grid rather than one per card.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div data-reveal="" variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/** Subtle lift on hover. No-ops on touch devices, which have no hover. */
export function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("h-full", className)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Small tracked-caps label used above section headings. The oxblood rule
 * is the one recurring accent mark on the site, deliberately not a filled
 * badge or pill, so it reads as an editorial mark rather than a UI chip.
 */
export function Eyebrow({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "white";
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.15em] uppercase",
        tone === "white" ? "text-white/70" : "text-muted-foreground",
        className
      )}
    >
      <span className="h-px w-6 bg-oxblood" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Hero entrance, plays on mount rather than on scroll. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
