"use client";

import { motion } from "motion/react";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered echo of the intro splash: the pillar mark scales and
 * fades in, the wordmark text follows a beat later, the same choreography
 * as intro-splash.tsx, replayed at footer scale when it scrolls into view.
 * Unlike the splash this can retrigger (no session gate), it's a small,
 * welcome flourish rather than a one-time takeover, so there's no reason to
 * suppress it on a second visit to the footer.
 */
export function FooterLogoReveal({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <motion.span
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <LogoMark className="h-8 w-auto text-white" />
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="font-heading text-lg font-medium tracking-[0.08em] text-white"
      >
        PRUDENCE
      </motion.span>
    </span>
  );
}
