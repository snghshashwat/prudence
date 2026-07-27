import Image from "next/image";
import { Handshake, BadgeCheck, Lock, Globe2 } from "lucide-react";
import { valueProps } from "@/lib/content/services";
import {
  Eyebrow,
  Reveal,
  RevealGroup,
  RevealItem,
  HoverLift,
} from "@/components/marketing/motion-primitives";

const icons = [Handshake, BadgeCheck, Lock, Globe2];

// Bento grid instead of four equal cards: one dark cell breaks the light
// section for contrast, and the asymmetric spans (2/1/1/2 across two rows)
// give the eye a shape to read instead of a uniform grid.
const spans = [
  "sm:col-span-2",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-2",
];

export function ValueProps() {
  return (
    <section
      id="welcome"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl lg:order-1">
          <Image
            src="/photos/family-home.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
          />
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <Eyebrow>Welcome</Eyebrow>
          <h2 className="mt-3 font-heading text-4xl font-medium text-navy sm:text-5xl">
            Wherever you call home, your ties to India carry weight
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Property, parents, businesses, inheritance, ambition. Prudence
            Advisory exists to carry that weight with you, as one team across
            tax, compliance, wealth, and governance, so you never have to
            explain your situation to a new advisor twice.
          </p>
          <a
            href="#services"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy underline underline-offset-4 hover:text-oxblood"
          >
            See what one relationship covers
          </a>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-3">
        {valueProps.map((v, i) => {
          const Icon = icons[i];
          const dark = i === 0;
          return (
            <RevealItem key={v.title} className={spans[i]}>
              <HoverLift>
                <div
                  className={`group flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-xl ${
                    dark
                      ? "bg-deep text-white"
                      : "border border-border bg-cream text-navy"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className={`size-6 transition-transform duration-300 group-hover:scale-110 ${
                        dark ? "text-oxblood" : "text-oxblood/80"
                      }`}
                    />
                    <span
                      className={`font-heading text-3xl ${
                        dark ? "text-white/20" : "text-navy/15"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3
                      className={`font-heading text-xl font-medium ${dark ? "text-white" : "text-navy"}`}
                    >
                      {v.title}
                    </h3>
                    <span className="mt-3 block h-px w-8 bg-oxblood/40" />
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        dark ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {v.description}
                    </p>
                  </div>
                </div>
              </HoverLift>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal
        delay={120}
        className="mt-4 rounded-2xl border-l-4 border-navy/30 bg-cream p-6"
      >
        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          In Context
        </p>
        <p className="mt-2 leading-relaxed text-foreground/90">
          You are part of the world&apos;s largest diaspora, more than 35
          million Indians living abroad, who together sent home a record
          $135 billion last year. Few advisors are built to serve that scale
          of relationship with real depth, on both ends of the journey.
        </p>
        <p className="mt-3 text-xs text-muted-foreground italic">
          Source: RBI (FY 2024-25 remittance data); Pravasi Setu Foundation /
          MEA diaspora estimates
        </p>
      </Reveal>

      <Reveal delay={180} className="mt-10 text-center">
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground italic">
          Whether you are an NRI managing life across two countries, a family
          business preparing to pass the baton, or a growing company that has
          outgrown its back office, the sections that follow outline how we
          help.
        </p>
      </Reveal>
    </section>
  );
}
