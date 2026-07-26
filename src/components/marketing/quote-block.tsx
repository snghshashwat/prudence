import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/marketing/motion-primitives";

export function QuoteBlock() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto h-px w-16 bg-navy" />
        <p className="mt-8 font-heading text-2xl leading-relaxed text-navy italic sm:text-3xl">
          &ldquo;{siteConfig.quote}&rdquo;
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-navy" />
      </Reveal>
    </section>
  );
}
