import { IntroSplash } from "@/components/marketing/intro-splash";
import { Hero } from "@/components/marketing/hero";
import { ProblemAccordion } from "@/components/marketing/problem-accordion";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { WhoWeServe } from "@/components/marketing/who-we-serve";
import { ValueProps } from "@/components/marketing/value-props";
import { ServicesShowcase } from "@/components/marketing/services-showcase";
import { StatementBreak } from "@/components/marketing/statement-break";
import { HowWeWork } from "@/components/marketing/how-we-work";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { ContactSection } from "@/components/marketing/contact-section";

/**
 * Section order, restructured to follow the Titan Wealth NRI-page pattern:
 * light two-column hero → problem cards → credentials → audience picker →
 * why-us photo block → alternating service rows → DARK statement break →
 * how-it-works accordion → testimonials → FAQ → contact.
 */
export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <Hero />
      <ProblemAccordion />
      <TrustStrip />
      <WhoWeServe />
      <ValueProps />
      <ServicesShowcase />
      <StatementBreak />
      <HowWeWork />
      <Testimonials />
      <Faq />
      <ContactSection />
    </>
  );
}
