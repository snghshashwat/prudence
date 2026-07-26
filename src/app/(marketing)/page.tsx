import { IntroSplash } from "@/components/marketing/intro-splash";
import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { WhoWeServe } from "@/components/marketing/who-we-serve";
import { ValueProps } from "@/components/marketing/value-props";
import { ServicePillarSection } from "@/components/marketing/service-pillar-section";
import { HowWeWork } from "@/components/marketing/how-we-work";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { QuoteBlock } from "@/components/marketing/quote-block";
import { ContactSection } from "@/components/marketing/contact-section";
import { Reveal } from "@/components/marketing/motion-primitives";
import { servicePillars } from "@/lib/content/services";

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <Hero />
      <TrustStrip />
      <WhoWeServe />
      <ValueProps />

      <section
        id="services"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl pb-4 text-center">
          <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            What We Do
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-navy sm:text-4xl">
            Three practices, one relationship
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Whether your needs sit in one practice or span all three, you work
            with a single accountable team.
          </p>
        </Reveal>

        {servicePillars.map((pillar) => (
          <ServicePillarSection key={pillar.pillar} pillar={pillar} />
        ))}
      </section>

      <HowWeWork />
      <Testimonials />
      <QuoteBlock />
      <Faq />
      <ContactSection />
    </>
  );
}
