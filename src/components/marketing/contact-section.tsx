import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { Eyebrow, Reveal } from "@/components/marketing/motion-primitives";
import { siteConfig } from "@/lib/site-config";
import { engagementSteps } from "@/lib/content/services";

const details = [
  { icon: Mail, label: "Email", value: siteConfig.contact.email },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
  { icon: MapPin, label: "Office", value: siteConfig.contact.officeAddress },
  { icon: Clock, label: "Hours", value: siteConfig.contact.hours },
];

export function ContactSection() {
  return (
    <section id="enquire" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            Let&apos;s start with a conversation
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Confidential and no obligation. Tell us where you are today and
            we&apos;ll outline how we can help, and what it would cost.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/photos/calendar-booking.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent"
              />
              <div className="absolute right-5 bottom-5 left-5 text-white">
                <p className="font-heading text-lg font-medium">
                  Book a Discovery Call
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Find out how we can help, in a confidential first
                  conversation.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                    <d.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {d.label}
                    </p>
                    <p className="mt-0.5 text-sm text-foreground">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-navy">
                <ShieldCheck className="size-4 text-navy" />
                What happens next
              </p>
              <ol className="mt-3 space-y-2">
                {engagementSteps.slice(0, 3).map((s) => (
                  <li
                    key={s.step}
                    className="flex gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="font-heading text-xs text-navy">
                      {s.step}
                    </span>
                    {s.title}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
