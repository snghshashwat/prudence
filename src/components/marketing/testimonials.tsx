import { Quote } from "lucide-react";
import {
  Eyebrow,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/marketing/motion-primitives";
import { siteConfig } from "@/lib/site-config";

/**
 * Renders nothing until real, attributable client quotes are added to
 * `siteConfig.testimonials`.
 *
 * Deliberately not seeded with sample quotes: invented testimonials on a
 * regulated financial services site are misleading if they ship, and
 * placeholder text has a way of shipping. An absent section is safe; a
 * fake one is not.
 */
export function Testimonials() {
  const items = siteConfig.testimonials;
  if (items.length === 0) return null;

  return (
    <section className="border-y border-border bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>In Their Words</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            What clients say
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <RevealItem key={t.attribution}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <Quote className="size-5 text-navy" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block text-sm font-medium text-navy">
                    {t.attribution}
                  </span>
                  {t.context && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {t.context}
                    </span>
                  )}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
