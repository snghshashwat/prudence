import { Check } from "lucide-react";
import type { PillarContent } from "@/lib/content/services";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  HoverLift,
} from "@/components/marketing/motion-primitives";
import { GlobalNetworkIllustration } from "@/components/marketing/illustrations/global-network";
import { SuccessionPillarsIllustration } from "@/components/marketing/illustrations/succession-pillars";
import { GrowthChartIllustration } from "@/components/marketing/illustrations/growth-chart";
import type { Pillar } from "@/lib/types/domain";

// Custom illustration per pillar in place of stock photography, see the
// components for why: a real photo shoot isn't available, and stock
// photos of "diverse people in a boardroom" would be filler, not signal.
const ILLUSTRATIONS: Record<Pillar, React.ComponentType<{ className?: string }>> = {
  nri: GlobalNetworkIllustration,
  family_business: SuccessionPillarsIllustration,
  accounting_cfo: GrowthChartIllustration,
};

export function ServicePillarSection({ pillar }: { pillar: PillarContent }) {
  const Illustration = ILLUSTRATIONS[pillar.pillar];

  return (
    <div id={pillar.pillar} className="scroll-mt-24 border-t border-border py-16 first:border-t-0">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            {pillar.eyebrow}
          </p>
          <h3 className="mt-2 font-heading text-3xl font-medium text-navy sm:text-4xl">
            {pillar.title}
          </h3>
          {/* Pain point first, then how we resolve it, before any service
              list. Addepar/iNRI's framing: name the problem the reader
              recognizes before presenting the fix. */}
          <p className="mt-4 max-w-2xl text-lg leading-relaxed font-medium text-foreground">
            {pillar.painPoint}
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {pillar.description}
          </p>
        </Reveal>

        <Reveal delay={100} className="text-navy">
          <div className="aspect-[4/3] w-full max-w-md rounded-2xl border border-border bg-secondary/60 p-6 lg:mx-0 lg:ml-auto">
            <Illustration />
          </div>
        </Reveal>
      </div>

      <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
        {pillar.categories.map((cat, i) => (
          <RevealItem key={cat.category}>
            <HoverLift>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-navy/25 hover:shadow-lg">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-2xl text-muted-foreground transition-colors group-hover:text-navy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-heading text-lg font-medium text-navy">
                    {cat.category}
                  </h4>
                </div>
                <ul className="mt-4 space-y-2.5">
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
            </HoverLift>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal
        delay={100}
        className="mt-8 rounded-xl border-l-4 border-navy/30 bg-cream p-6"
      >
        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          Why It Matters
        </p>
        <p className="mt-2 leading-relaxed text-foreground/90">
          {pillar.stat.label}
        </p>
        <p className="mt-3 text-xs text-muted-foreground italic">
          {pillar.stat.source}
        </p>
      </Reveal>
    </div>
  );
}
