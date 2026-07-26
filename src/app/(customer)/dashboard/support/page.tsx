import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SectionCard, PageHeader } from "@/components/dashboard/section-card";
import { siteConfig } from "@/lib/site-config";
import { engagementSteps } from "@/lib/content/services";

const faqs = [
  {
    q: "How do I see what Prudence is working on for me?",
    a: "Your My Services page lists every service assigned to you with its current status (Not Started, In Progress, or Completed), plus any notes your advisor has added.",
  },
  {
    q: "How will I hear about progress?",
    a: "Your team posts updates to the Updates page. Firm-wide notices appear as Announcements; anything specific to your matters is tagged For You. You can control notifications under Settings.",
  },
  {
    q: "Can I add a new service to my engagement?",
    a: "Yes. Contact your advisor using the details on this page and we'll scope it, confirm the fee, and add it to your dashboard.",
  },
  {
    q: "How is my information kept confidential?",
    a: "Financial and family matters are handled with the confidentiality and care of a private office. Access is restricted to your engagement team.",
  },
];

const contactItems = [
  { icon: Mail, label: "Email", value: siteConfig.contact.email },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
  { icon: MapPin, label: "Office", value: siteConfig.contact.officeAddress },
  { icon: Clock, label: "Hours", value: siteConfig.contact.hours },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Support"
        description="Reach your engagement team, or find a quick answer below."
      />

      <SectionCard
        title="Contact your team"
        description="A single point of accountability, not a call centre."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {contactItems.map((item) => (
            <div key={item.label} className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                <item.icon className="size-4" />
              </div>
              <div>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="How an engagement runs"
        description="What to expect at each stage."
      >
        <ol className="space-y-4">
          {engagementSteps.map((s) => (
            <li key={s.step} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-navy/25 font-heading text-xs text-navy">
                {s.step}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{s.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Frequently asked questions">
        <div className="divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-3 first:pt-0 last:pb-0">
              <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
