// Central place for brand copy and company details.
// TODO: replace every [Bracketed] placeholder with the real value before launch.
export const siteConfig = {
  name: "Prudence Advisory",
  legalName: "Prudence Advisory LLP",
  brochureLabel: "Client Brochure · 2026",
  positioning: "Family Office | NRI Services | Global Perspective",
  tagline:
    "Trusted advisory for NRIs, family enterprises, and growing businesses, across borders and generations.",
  quote:
    "Prudence is not the avoidance of risk. It is the discipline of managing it well, on your behalf.",
  contact: {
    email: "[Email Address]",
    phone: "[Phone Number]",
    website: "[Website]",
    officeAddress: "[Office Address]",
    hours: "Mon to Fri, 9:30am to 6:30pm IST",
  },
  social: {
    linkedin: "[LinkedIn URL]",
    twitter: "[X / Twitter URL]",
  },
  /**
   * Real, attributable client quotes only. The Testimonials section stays
   * hidden while this is empty. Do not seed it with invented examples.
   * Get written consent before publishing a client's name.
   *
   * Shape: { quote, attribution, context? }
   */
  testimonials: [] as {
    quote: string;
    attribution: string;
    context?: string;
  }[],

  /**
   * Shown in the footer. Have this reviewed by counsel before launch;
   * advisory and tax marketing carry disclosure obligations.
   */
  disclaimer:
    "The content on this site is general information about Prudence Advisory's services and does not constitute tax, legal, investment, or financial advice, nor an offer or solicitation to provide such services. Outcomes depend on individual facts and applicable law, which change over time. Please obtain formal, engagement-specific advice before acting. [Placeholder: to be reviewed and finalised by legal counsel.]",

  registrations: [
    "Registered with the Institute of Chartered Accountants of India",
    "Empanelled legal & company-secretarial partners",
  ],
  footerNav: {
    services: [
      { label: "NRI Services", href: "/#nri" },
      { label: "Family Business Services", href: "/#family_business" },
      { label: "Accounting, CFO & Advisory", href: "/#accounting_cfo" },
    ],
    company: [
      { label: "Why Prudence", href: "/#welcome" },
      { label: "How We Work", href: "/#how-we-work" },
      { label: "Contact", href: "/#enquire" },
    ],
    client: [
      { label: "Client Login", href: "/login" },
      { label: "Create Account", href: "/signup" },
    ],
  },
};
