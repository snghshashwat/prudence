import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Prudence Advisory | Family Office, NRI & Business Advisory",
    template: "%s | Prudence Advisory",
  },
  description:
    "Trusted advisory for NRIs, family enterprises, and growing businesses, across borders and generations. Tax, FEMA, succession, and CFO services from practising Chartered Accountants.",
  keywords: [
    "NRI tax advisory",
    "FEMA compliance",
    "DTAA",
    "family office India",
    "succession planning",
    "virtual CFO",
    "chartered accountants",
  ],
  openGraph: {
    type: "website",
    siteName: "Prudence Advisory",
    title: "Prudence Advisory | Family Office, NRI & Business Advisory",
    description:
      "Trusted advisory for NRIs, family enterprises, and growing businesses, across borders and generations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prudence Advisory",
    description:
      "Trusted advisory for NRIs, family enterprises, and growing businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Motion server-renders `opacity:0` inline for scroll reveals, so
            without JS the page would render blank. Force everything visible
            when scripting is unavailable, the animation is decoration, the
            content is not. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <ThemeProvider>
          <MotionProvider>
            {children}
            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
