import { Handshake, BadgeCheck, Lock, Globe2 } from "lucide-react";
import { valueProps } from "@/lib/content/services";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  HoverLift,
} from "@/components/marketing/motion-primitives";

const icons = [Handshake, BadgeCheck, Lock, Globe2];

export function ValueProps() {
  return (
    <section
      id="welcome"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          Welcome
        </p>
        <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
          Wherever you call home, your ties to India carry weight
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Property, parents, businesses, inheritance, ambition. Prudence
          Advisory exists to carry that weight with you, as one team across
          tax, compliance, wealth, and governance, so you never have to
          explain your situation to a new advisor twice.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
        {valueProps.map((v, i) => {
          const Icon = icons[i];
          return (
            <RevealItem key={v.title}>
              <HoverLift>
                <div className="group h-full rounded-xl border border-border border-l-4 border-l-navy/30 bg-cream p-6 transition-shadow duration-300 hover:shadow-lg">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-navy transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-medium text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </HoverLift>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal
        delay={120}
        className="mt-8 rounded-xl border-l-4 border-navy/30 bg-cream p-6"
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
