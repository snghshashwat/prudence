import { Plus } from "lucide-react";
import { servicePillars } from "@/lib/content/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion-primitives";

// Problem-first framing: lead with the pain point in the client's own
// words before naming the service. Three independently expandable cards,
// one per pillar, each linking to its detail section further down.
export function ProblemAccordion() {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-medium text-navy sm:text-4xl">
            Solving the key financial challenges you actually face
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-3">
          {servicePillars.map((p) => (
            <RevealItem key={p.pillar}>
              <details className="group h-full rounded-xl bg-secondary p-6">
                <summary className="flex cursor-pointer list-none flex-col gap-8 text-left marker:content-none">
                  <span className="font-heading text-lg font-medium text-navy">
                    {p.painPoint}
                  </span>
                  <Plus className="size-5 shrink-0 self-end text-oxblood transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <a
                  href={`#${p.pillar}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy underline underline-offset-4 hover:text-oxblood"
                >
                  See how we help
                </a>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
