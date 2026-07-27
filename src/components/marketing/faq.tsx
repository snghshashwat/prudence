import { Plus } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/marketing/motion-primitives";
import { siteConfig } from "@/lib/site-config";

// Answers are grounded in the brochure (engagement model, service scope,
// confidentiality stance). Don't add claims about jurisdictions, turnaround
// times, or fee amounts that the firm hasn't stated.
const faqs = [
  {
    q: "Do I need to be in India to work with you?",
    a: "No. Most of our NRI clients handle everything remotely. Where a physical signature or presence is required, we draft and execute a power of attorney so matters can proceed without you travelling.",
  },
  {
    q: "How are your fees structured?",
    a: "After a discovery conversation we issue a clear proposal, either fixed-fee or retainer-based, depending on the work. You know what is covered and what it costs before anything begins.",
  },
  {
    q: "Can you work alongside my existing accountant or lawyer?",
    a: "Yes. We frequently coordinate with advisors clients already trust. Where execution needs a licensed specialist we don't have in-house, we bring in our empanelled legal and company-secretarial partners.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Financial and family matters are handled with the confidentiality and care of a private office. Access is limited to your engagement team, and your client dashboard shows only your own records.",
  },
  {
    q: "What does getting started actually involve?",
    a: "Four steps: a confidential discovery conversation, a tailored scope and proposal, onboarding with documented handover, and then an ongoing relationship with a single point of accountability.",
  },
  {
    q: "Can the engagement grow over time?",
    a: "That's the intent. Clients often begin with a single filing and expand into property, succession, or full family-office support. One team follows you as your needs grow.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">Questions</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            Before you reach out
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left marker:content-none">
                  <span className="font-medium text-navy">{f.q}</span>
                  <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Still have a question? Ask us directly using the form below, or write to{" "}
            <span className="font-medium text-navy">
              {siteConfig.contact.email}
            </span>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
