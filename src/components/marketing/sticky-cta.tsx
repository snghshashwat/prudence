"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Mobile-only conversion bar. Appears once the hero is behind you and
 * hides again near the footer, so it never covers the contact details or
 * the closing CTA.
 */
export function StickyCta() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.08 && v < 0.88);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-3">
            <p className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground">
              Confidential first conversation, no obligation.
            </p>
            <Button
              size="sm"
              className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/#enquire">Enquire</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
