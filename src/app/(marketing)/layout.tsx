import { Navbar } from "@/components/marketing/navbar";
import { ContactFooter } from "@/components/marketing/contact-footer";
import { ScrollProgress } from "@/components/marketing/scroll-progress";
import { StickyCta } from "@/components/marketing/sticky-cta";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <ContactFooter />
      <StickyCta />
    </div>
  );
}
