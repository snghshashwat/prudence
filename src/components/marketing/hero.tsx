import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/marketing/motion-primitives";
import { siteConfig } from "@/lib/site-config";

// Light, two-column hero: text left with an accent bar on the heading,
// a contained (not full-bleed) photo right. Diaspora/remittance stats
// live in the Statement Break section further down, no need to repeat
// them here.
export function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24 xl:px-8">
        <div>
          <FadeUp>
            <p className="text-sm font-medium text-muted-foreground">
              {siteConfig.positioning}
            </p>
          </FadeUp>

          <FadeUp delay={120}>
            <h1 className="mt-3 border-l-4 border-oxblood pl-5 font-heading text-4xl leading-[1.1] font-medium text-navy sm:text-5xl lg:text-6xl">
              One Trusted Advisor, Every Chapter of Your Financial Life
            </h1>
          </FadeUp>

          <FadeUp delay={240}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={360}>
            <div className="mt-8">
              <Button
                size="lg"
                className="group h-12 rounded-full bg-deep px-7 text-base text-white hover:bg-deep/90"
                asChild
              >
                <Link href="/signup">
                  Book Your Free Consultation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={200} className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[3/2]">
          <Image
            src="/photos/hero-advisor.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </FadeUp>
      </div>
    </section>
  );
}
