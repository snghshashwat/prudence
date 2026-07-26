import type { Pillar } from "@/lib/types/domain";

export type ServiceCategory = {
  category: string;
  items: string[];
};

export type PillarContent = {
  pillar: Pillar;
  eyebrow: string;
  title: string;
  /** Pain-point framing shown as the lead line, before `description`. */
  painPoint: string;
  description: string;
  stat: { label: string; source: string };
  categories: ServiceCategory[];
};

export const servicePillars: PillarContent[] = [
  {
    pillar: "nri",
    eyebrow: "For Non-Resident Indians & OCIs",
    title: "NRI Services",
    painPoint:
      "Managing life from a different time zone is manageable, until a property sale, a lapsed KYC, or an inheritance needs a signature only you can give.",
    description:
      "We bring tax, regulatory, and personal support together into a single relationship, so nothing about a life split across two countries falls through the cracks.",
    stat: {
      label:
        "India received a record $135.5 billion in remittances in FY 2024-25, and NRI investment in Indian real estate is growing an estimated 20% year-on-year. Each transaction carries its own FEMA, TDS, and capital-gains obligations that are easy to get wrong from a distance.",
      source: "Source: RBI; industry NRI real-estate investment research, 2025",
    },
    categories: [
      {
        category: "Taxation & Compliance",
        items: [
          "Income tax return filing for NRIs",
          "DTAA advisory and tax relief claims",
          "Lower / nil TDS certificates (Form 13)",
          "Capital gains tax planning on property sale",
        ],
      },
      {
        category: "Banking, FEMA & Repatriation",
        items: [
          "FEMA and RBI compliance advisory",
          "NRO / NRE / FCNR account advisory",
          "Repatriation of funds (Form 15CA / 15CB)",
        ],
      },
      {
        category: "Investments, Property & Business",
        items: [
          "Investment advisory across equity, mutual funds, and real estate",
          "NRI property management and compliance",
          "Setting up a business, liaison office, branch office, or subsidiary in India",
        ],
      },
      {
        category: "Personal, Estate & Concierge",
        items: [
          "PAN, Aadhaar, and OCI assistance",
          "Inheritance and succession planning; repatriation of inherited assets",
          "Power of attorney drafting and execution",
          "Premium concierge: elder care coordination, medical support, and event organization for family in India",
        ],
      },
    ],
  },
  {
    pillar: "family_business",
    eyebrow: "For Family Enterprises",
    title: "Family Business Services",
    painPoint:
      "Most family businesses run for decades without a single documented succession conversation, until the day one becomes unavoidable.",
    description:
      "Structure is the difference between a legacy that compounds and one that fractures. We help family enterprises govern, transfer, and grow with intention.",
    stat: {
      label:
        "The number of family offices in India has grown from roughly 45 in 2018 to nearly 300 today, with combined assets exceeding $30 billion. Yet most family businesses still operate without a documented governance or succession plan.",
      source: "Source: Industry family office research, 2025",
    },
    categories: [
      {
        category: "Governance",
        items: [
          "Family constitution and charter drafting",
          "Family governance framework design",
          "Conflict resolution and mediation",
        ],
      },
      {
        category: "Succession & Estate",
        items: [
          "Succession and estate planning",
          "Will drafting and execution support",
          "Private family trust formation",
          "Inter-generational wealth transfer",
        ],
      },
      {
        category: "Wealth & Family Office",
        items: [
          "Family office set-up and management",
          "Wealth structuring and asset protection",
          "Philanthropy and CSR advisory",
        ],
      },
      {
        category: "Business Structuring",
        items: [
          "Business restructuring and demerger",
          "Holding company structuring",
          "Family business valuation",
          "Next-generation mentoring and onboarding",
        ],
      },
    ],
  },
  {
    pillar: "accounting_cfo",
    eyebrow: "For Growing Businesses",
    title: "Accounting, CFO & Advisory Services",
    painPoint:
      "Growing fast is the easy part. GST filings, TDS deadlines, and board-ready numbers are usually what starts slipping first.",
    description:
      "We function as your finance department, as much or as little of it as you need, so leadership can focus on the business rather than the back office.",
    stat: {
      label:
        "Rising GST complexity, mandatory e-invoicing, and evolving TDS rules are pushing India's fastest-growing businesses toward outsourced finance leadership well before they can justify a full-time CFO hire.",
      source: "Source: Indian SME advisory market research, 2025",
    },
    categories: [
      {
        category: "Accounting & Bookkeeping",
        items: [
          "Bookkeeping and accounting services",
          "Payroll processing and compliance",
          "MIS reporting and financial analysis",
        ],
      },
      {
        category: "Audit & Assurance",
        items: [
          "Statutory audit and assurance",
          "Internal and management audit",
          "Tax audit under Section 44AB",
        ],
      },
      {
        category: "Tax & Regulatory",
        items: [
          "Direct tax advisory and compliance",
          "GST registration, returns, and advisory",
          "TDS compliance and filing",
          "Transfer pricing advisory",
        ],
      },
      {
        category: "Corporate, CFO & Transactions",
        items: [
          "ROC and secretarial compliance; company / LLP incorporation",
          "Virtual and fractional CFO services",
          "Due diligence and transaction advisory",
          "Procurement outsourcing; policy and process design",
        ],
      },
    ],
  },
];

export const valueProps = [
  {
    title: "One Relationship, Every Need",
    description:
      "From an annual tax return to full family governance, one team follows you as your needs grow. No juggling separate accountants, lawyers, and wealth managers who don't talk to each other.",
  },
  {
    title: "Licensed, Credentialed Execution",
    description:
      "Every deliverable is backed by practising Chartered Accountants and empanelled legal and company-secretarial partners. Advice you can act on, not just guidance.",
  },
  {
    title: "Discretion by Design",
    description:
      "Financial and family matters are handled with the confidentiality and care of a private office, because trust, once given, is not to be treated casually.",
  },
  {
    title: "Fluent in the India-Global Corridor",
    description:
      "Deep, current expertise in FEMA, DTAA, and cross-border structuring. This is the exact terrain most local advisors, on either side, rarely have to navigate.",
  },
];

export const engagementSteps = [
  {
    step: "01",
    title: "Discovery Conversation",
    description:
      "A confidential conversation to understand your situation, priorities, and where you are today.",
  },
  {
    step: "02",
    title: "Tailored Scope & Proposal",
    description:
      "A clear, fixed or retainer-based proposal. You know what is covered and what it costs before we begin.",
  },
  {
    step: "03",
    title: "Onboarding & Documentation",
    description:
      "Secure document exchange and a documented handover, so nothing depends on memory or a single point of contact.",
  },
  {
    step: "04",
    title: "Ongoing Relationship",
    description:
      "Regular reviews and a single point of accountability as your needs evolve, from a single filing to a full family office.",
  },
];
