import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { servicePillars } from "@/lib/content/services";
import { Button } from "@/components/ui/button";
import { FadeImage } from "@/components/marketing/fade-image";
import { Eyebrow, Reveal } from "@/components/marketing/motion-primitives";

const photos: Record<string, string> = {
  nri: "/photos/phone-review.jpg",
  family_business: "/photos/advisory-meeting.jpg",
  accounting_cfo: "/photos/laptop-typing.jpg",
};

// Alternating image/text rows, one per pillar, each with a short list of
// its categories as scannable links. The zig-zag image side is what turns
// three long service lists into something with visual rhythm.
export function ServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            Popular services, by relationship
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24">
          {servicePillars.map((pillar, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <div
                key={pillar.pillar}
                id={pillar.pillar}
                className="scroll-mt-28 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <Reveal
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <FadeImage
                    src={photos[pillar.pillar]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>

                <Reveal className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <h3 className="border-l-4 border-oxblood pl-4 font-heading text-2xl font-medium text-navy sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {pillar.painPoint}
                  </p>

                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {pillar.categories.map((cat) => (
                      <li key={cat.category} className="border-b border-border pb-3">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                          <ArrowRight className="size-3.5 shrink-0 text-oxblood" />
                          {cat.category}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-7 h-11 rounded-full bg-deep px-6 text-white hover:bg-deep/90"
                    asChild
                  >
                    <Link href="/signup">
                      Book Your Free Consultation
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
