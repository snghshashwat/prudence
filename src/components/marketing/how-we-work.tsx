import { ChevronDown } from "lucide-react";
import { engagementSteps } from "@/lib/content/services";
import { FadeImage } from "@/components/marketing/fade-image";
import {
  Eyebrow,
  Reveal,
} from "@/components/marketing/motion-primitives";

export function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">Engagement</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            How We Work
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
            <FadeImage
              src="/photos/skyline-growth.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={80}>
            {engagementSteps.map((s, i) => (
              <details
                key={s.step}
                className="group border-b border-navy/15 py-5 first:border-t"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                  <span className="flex items-baseline gap-4">
                    <span className="font-heading text-sm text-oxblood">
                      {s.step}
                    </span>
                    <span className="font-heading text-lg font-medium text-navy sm:text-xl">
                      {s.title}
                    </span>
                  </span>
                  <ChevronDown className="size-5 shrink-0 text-navy/50 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 pl-9 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
