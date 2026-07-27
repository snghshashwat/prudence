"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { AnimatedCounter } from "@/components/marketing/animated-counter";

/**
 * Full-bleed dark break between the light sections above and below.
 *
 * Two jobs: give the eye somewhere to rest after a dense services section,
 * and stop the page reading as one continuous cream scroll. The parallax
 * on the inner content is subtle on purpose, a few percent of travel, so
 * it registers as depth rather than as an effect.
 */
export function StatementBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Content drifts slightly slower than the page, reading as depth.
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.4, 1, 1, 0.4]
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-deep py-28 text-white sm:py-36"
    >
      <Image
        src="/photos/skyline-growth.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
        aria-hidden="true"
      />

      {/* Layered depth: soft radial wash plus a fine dot grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 0%, color-mix(in srgb, white 9%, transparent) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto h-px w-14 bg-oxblood/60" />
        <p className="mt-10 font-heading text-2xl leading-relaxed italic sm:text-3xl lg:text-4xl">
          &ldquo;{siteConfig.quote}&rdquo;
        </p>
        <div className="mx-auto mt-10 h-px w-14 bg-oxblood/60" />

        <dl className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { value: 35, suffix: "M+", label: "Indians living abroad" },
            { value: 135, prefix: "$", suffix: "B", label: "Remitted to India, FY 2024-25" },
            { value: 300, prefix: "~", label: "Family offices in India" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="block font-heading text-4xl text-white sm:text-5xl"
                />
                <span className="mt-2 block text-sm text-white/55">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
