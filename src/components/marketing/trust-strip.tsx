import { ShieldCheck, Scale, Globe2, FileCheck } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/marketing/motion-primitives";

// Credential/trust bar. Every claim here is drawn from the brochure, keep
// it that way. Regulated-industry marketing shouldn't carry a capability
// claim the firm can't evidence.
const credentials = [
  {
    icon: ShieldCheck,
    title: "Practising Chartered Accountants",
    body: "Deliverables signed off by qualified CAs, not generalists.",
  },
  {
    icon: Scale,
    title: "Empanelled legal & CS partners",
    body: "Drafting and filings executed by licensed professionals.",
  },
  {
    icon: Globe2,
    title: "FEMA, DTAA & cross-border",
    body: "Current expertise in the India-global corridor.",
  },
  {
    icon: FileCheck,
    title: "Private-office confidentiality",
    body: "Family and financial matters handled with discretion.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background py-12">
      <RevealGroup
        className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
        stagger={0.07}
      >
        {credentials.map((c) => (
          <RevealItem key={c.title}>
            <div className="flex gap-3">
              <c.icon className="mt-0.5 size-5 shrink-0 text-navy" />
              <div>
                <p className="text-sm font-medium text-navy">{c.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
