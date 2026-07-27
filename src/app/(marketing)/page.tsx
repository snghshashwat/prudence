import { IntroSplash } from "@/components/marketing/intro-splash";
import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { WhoWeServe } from "@/components/marketing/who-we-serve";
import { ValueProps } from "@/components/marketing/value-props";
import { StickyServices } from "@/components/marketing/sticky-services";
import { StatementBreak } from "@/components/marketing/statement-break";
import { HowWeWork } from "@/components/marketing/how-we-work";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { ContactSection } from "@/components/marketing/contact-section";
import { servicePillars } from "@/lib/content/services";

/**
 * Section order is deliberate. The old version was nine blocks with the
 * same rhythm (centred heading, card grid, equal padding), which reads as
 * a document rather than a designed page. This alternates surface and
 * layout so the eye gets a change every screen or two:
 *
 *   dark hero → light grid → cream cards → light editorial → sticky scroll
 *   → DARK break → cream steps → light FAQ → cream contact
 */
export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <Hero />
      <TrustStrip />
      <WhoWeServe />
      <ValueProps />
      <StickyServices pillars={servicePillars} />
      <StatementBreak />
      <HowWeWork />
      <Testimonials />
      <Faq />
      <ContactSection />
    </>
  );
}
