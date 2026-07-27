"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check } from "lucide-react";
import type { PillarContent } from "@/lib/content/services";
import type { Pillar } from "@/lib/types/domain";
import { GlobalNetworkIllustration } from "@/components/marketing/illustrations/global-network";
import { SuccessionPillarsIllustration } from "@/components/marketing/illustrations/succession-pillars";
import { GrowthChartIllustration } from "@/components/marketing/illustrations/growth-chart";
import { cn } from "@/lib/utils";

const ILLUSTRATIONS: Record<
  Pillar,
  React.ComponentType<{ className?: string }>
> = {
  nri: GlobalNetworkIllustration,
  family_business: SuccessionPillarsIllustration,
  accounting_cfo: GrowthChartIllustration,
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sticky-scroll services section: the visual column pins to the viewport
 * while the three practices scroll past it, swapping the illustration and
 * a progress rail as each becomes active.
 *
 * This is the single biggest departure from the old layout, which was
 * three near-identical stacked blocks. Pinning one side turns a list into
 * a sequence.
 *
 * Degrades cleanly: below `lg` the sticky column is hidden entirely and
 * each practice renders its own inline illustration, so small screens get
 * a normal stacked layout instead of a broken pin. Without JS the sticky
 * column simply shows the first illustration and the content still reads
 * top to bottom.
 */
export function StickyServices({ pillars }: { pillars: PillarContent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Split the scrollable range evenly across the practices.
    const next = Math.min(pillars.length - 1, Math.floor(v * pillars.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  const ActiveIllustration = ILLUSTRATIONS[pillars[active].pillar];

  return (
    <section id="services" className="scroll-mt-24 bg-background">
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Sticky visual column, desktop only. */}
          <div className="hidden lg:block">
            <div className="sticky top-28 flex h-[calc(100vh-14rem)] flex-col justify-center">
              <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                What We Do
              </p>
              <h2 className="mt-3 font-heading text-4xl leading-tight font-medium text-navy">
                Three practices,
                <br />
                one relationship
              </h2>

              <div className="relative mt-10 aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-secondary/50 p-8 text-navy">
                <motion.div
                  key={pillars[active].pillar}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-full w-full"
                >
                  <ActiveIllustration />
                </motion.div>
              </div>

              {/* Progress rail: which practice you're reading. */}
              <ol className="mt-8 space-y-3">
                {pillars.map((p, i) => (
                  <li key={p.pillar} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-px transition-all duration-500",
                        i === active
                          ? "w-10 bg-navy"
                          : "w-5 bg-border"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm transition-colors duration-500",
                        i === active
                          ? "font-medium text-navy"
                          : "text-muted-foreground"
                      )}
                    >
                      {p.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Scrolling content column. */}
          <div className="py-16 lg:py-28">
            {/* Mobile-only heading, since the sticky column is hidden there. */}
            <div className="lg:hidden">
              <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                What We Do
              </p>
              <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
                Three practices, one relationship
              </h2>
            </div>

            <div className="space-y-24 lg:space-y-40">
              {pillars.map((pillar, i) => {
                const Inline = ILLUSTRATIONS[pillar.pillar];
                return (
                  <div
                    key={pillar.pillar}
                    id={pillar.pillar}
                    className="scroll-mt-28 pt-10 lg:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-5xl text-border">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                          {pillar.eyebrow}
                        </p>
                        <h3 className="mt-1 font-heading text-2xl font-medium text-navy sm:text-3xl">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    {/* Inline illustration on small screens only. */}
                    <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-secondary/50 p-6 text-navy lg:hidden">
                      <Inline />
                    </div>

                    <p className="mt-6 text-lg leading-relaxed font-medium text-foreground">
                      {pillar.painPoint}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>

                    <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      {pillar.categories.map((cat) => (
                        <div key={cat.category}>
                          <h4 className="font-heading text-base font-medium text-navy">
                            {cat.category}
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {cat.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                              >
                                <Check className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-l-2 border-navy/25 pl-5">
                      <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                        Why It Matters
                      </p>
                      <p className="mt-2 leading-relaxed text-foreground/90">
                        {pillar.stat.label}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground italic">
                        {pillar.stat.source}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
