import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvas } from "@/components/marketing/hero-canvas";
import { FadeUp } from "@/components/marketing/motion-primitives";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { value: "35M+", label: "Indians in the global diaspora" },
  { value: "$135B", label: "Remitted to India in FY 2024-25" },
  { value: "~300", label: "Family offices in India today" },
];

// Genuine navigation, not decoration: jumps straight to the matching
// service pillar. Aspora's live converter is the inspiration here, but a
// calculator would need a real, maintained data source (exchange or tax
// rates) to be honest; this is the same "help me self-identify fast"
// function without inventing a number we can't stand behind.
const audiences = [
  { label: "NRI or OCI", href: "#nri" },
  { label: "Family Business", href: "#family_business" },
  { label: "Growing Business", href: "#accounting_cfo" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      {/* Base layer, always rendered, and the only layer on phones,
          low-end devices, and reduced-motion. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 20%, color-mix(in srgb, white 10%, transparent) 0%, transparent 55%), radial-gradient(90% 80% at 15% 80%, color-mix(in srgb, white 6%, transparent) 0%, transparent 60%)",
        }}
      />
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <FadeUp>
          <span className="inline-block rounded-full border border-white/20 px-3 py-1 text-[0.65rem] font-medium tracking-[0.15em] text-white/70 uppercase sm:px-4 sm:text-xs">
            {siteConfig.positioning}
          </span>
        </FadeUp>

        <FadeUp delay={120}>
          <h1 className="mt-6 font-heading text-[2rem] leading-[1.15] font-medium sm:text-5xl lg:text-6xl">
            One Trusted Advisor, Every Chapter of Your Financial Life
          </h1>
        </FadeUp>

        <FadeUp delay={240}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
            {siteConfig.tagline}
          </p>
        </FadeUp>

        <FadeUp delay={360}>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="group h-11 bg-white px-6 text-deep hover:bg-white/90"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={420}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <span className="text-xs text-white/45">I am a...</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {audiences.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="rounded-full border border-white/15 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={500}>
          {/* Real numbers as bordered KPI tiles, not adjectival trust copy
              ("industry-leading", "trusted by many"). Every figure here is
              sourced below. */}
          <dl className="mt-16 grid grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-left backdrop-blur-sm sm:text-center"
              >
                <dt className="text-xs text-white/55">{s.label}</dt>
                <dd className="mt-1.5 font-heading text-3xl text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-white/40">
            Source: RBI FY 2024-25 remittance data; Pravasi Setu Foundation /
            MEA diaspora estimates; industry family office research, 2025
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
