import { engagementSteps } from "@/lib/content/services";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/marketing/motion-primitives";

export function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Engagement
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            How We Work
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            A clear, documented path from first conversation to an ongoing
            relationship, so you always know what happens next.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* Connector line across the four steps on large screens */}
          <div
            className="absolute top-5 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent lg:block"
            aria-hidden="true"
          />
          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((s) => (
              <RevealItem key={s.step} className="relative">
                <div className="flex size-10 items-center justify-center rounded-full border border-navy/25 bg-background font-heading text-sm text-navy">
                  {s.step}
                </div>
                <h3 className="mt-4 font-heading text-lg font-medium text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
