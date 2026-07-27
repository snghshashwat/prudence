import Link from "next/link";
import { Plane, Users2, TrendingUp, ArrowRight } from "lucide-react";
import {
  Eyebrow,
  Reveal,
  RevealGroup,
  RevealItem,
  HoverLift,
} from "@/components/marketing/motion-primitives";

// Audience self-selection, the pattern every major advisory firm opens with
// (Individuals / Families / Institutions). Each card routes to the matching
// pillar section further down the page.
const audiences = [
  {
    icon: Plane,
    title: "NRIs & OCIs",
    lead: "Life across two countries",
    body: "Property, parents, filings, and inheritance back home, handled from wherever you are, with FEMA and DTAA done properly.",
    href: "#nri",
    cta: "NRI Services",
  },
  {
    icon: Users2,
    title: "Family Enterprises",
    lead: "Wealth that must outlast its founders",
    body: "Governance, succession, and structure, so the transition between generations compounds the business instead of fracturing it.",
    href: "#family_business",
    cta: "Family Business Services",
  },
  {
    icon: TrendingUp,
    title: "Growing Businesses",
    lead: "A finance function that scales",
    body: "Books, audit, GST and TDS, and CFO-level judgement. As much or as little as you need, well before a full-time hire makes sense.",
    href: "#accounting_cfo",
    cta: "Accounting & CFO Services",
  },
];

export function WhoWeServe() {
  return (
    <section className="border-y border-border bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Who We Serve</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            Start where you are
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Most of our clients arrive with one pressing question and stay for
            everything that follows. Find the closest fit below.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <RevealItem key={a.title}>
              <HoverLift>
                <a
                  href={a.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-navy/30 hover:shadow-lg"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-navy">
                    <a.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-medium text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-navy">{a.lead}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                    {a.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </HoverLift>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={120} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which applies?{" "}
            <Link
              href="/signup"
              className="font-medium text-navy underline underline-offset-4 hover:text-foreground"
            >
              Start a confidential conversation
            </Link>{" "}
            and we&apos;ll point you the right way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
