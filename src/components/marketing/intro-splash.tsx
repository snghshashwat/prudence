"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "@/components/logo";
import { siteConfig } from "@/lib/site-config";

const SESSION_KEY = "prudence-intro-seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_MS = 2600;

/**
 * One-time brand moment on first visit: the full lockup from the brochure
 * cover assembles piece by piece (mark, PRUDENCE, ADVISORY, the
 * family-office/NRI/global-perspective line), then the whole overlay lifts
 * to reveal the hero underneath. Plays once per browser tab (sessionStorage),
 * not on every page load or client-side navigation.
 *
 * Renders nothing until a client effect opts in, so this never appears
 * without JS and never plays for prefers-reduced-motion, it isn't detuned,
 * it's skipped outright, since a decorative sequence a user has asked to
 * avoid shouldn't run at a lower intensity, it shouldn't run.
 */
export function IntroSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    // Deliberate: this is a one-time, mount-triggered reveal, not derived
    // state, so there's no render-phase equivalent. Rewriting this via
    // useSyncExternalStore (as elsewhere in this codebase) would actually
    // break it: getSnapshot would re-read the sessionStorage flag this same
    // effect just set, flip back to false on any incidental re-render, and
    // hide the splash mid-animation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    const timer = setTimeout(() => setShow(false), TOTAL_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden="true"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-deep px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <LogoMark className="h-16 w-auto text-white" />
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                className="font-heading text-2xl font-medium tracking-[0.3em] text-white sm:text-3xl"
              >
                PRUDENCE
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-6 bg-white/25 sm:w-10" />
                <span className="font-heading text-sm tracking-[0.35em] text-white/70 sm:text-base">
                  ADVISORY
                </span>
                <span className="h-px w-6 bg-white/25 sm:w-10" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
              className="max-w-xs text-[0.65rem] tracking-[0.2em] text-white/50 uppercase sm:max-w-none sm:text-xs"
            >
              {siteConfig.positioning}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
