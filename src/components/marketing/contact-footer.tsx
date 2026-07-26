import Link from "next/link";
import { Mail, Phone, Globe, MapPin, Clock } from "lucide-react";
import { FooterLogoReveal } from "@/components/marketing/footer-logo-reveal";
import { siteConfig } from "@/lib/site-config";

const contactItems = [
  { icon: Mail, label: "Email", value: siteConfig.contact.email },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
  { icon: Globe, label: "Website", value: siteConfig.contact.website },
  { icon: MapPin, label: "Office", value: siteConfig.contact.officeAddress },
];

export function ContactFooter() {
  return (
    <footer id="contact" className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <FooterLogoReveal />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 space-y-2">
              {siteConfig.registrations.map((r) => (
                <p key={r} className="text-xs text-white/45">
                  {r}
                </p>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.social.linkedin}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                aria-label="LinkedIn"
              >
                {/* lucide-react v1 dropped brand icons, so this is inline. */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Services" links={siteConfig.footerNav.services} />
            <FooterColumn title="Company" links={siteConfig.footerNav.company} />
            <FooterColumn title="Client Portal" links={siteConfig.footerNav.client} />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-sm font-semibold tracking-[0.15em] text-white/70 uppercase">
            Get In Touch
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex gap-3">
                <item.icon className="mt-0.5 size-4 shrink-0 text-white/70" />
                <div>
                  <p className="text-xs tracking-[0.1em] text-white/45 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-white/90">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <Clock className="size-4 text-white/70" />
            {siteConfig.contact.hours}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/40">
            {siteConfig.disclaimer}
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights
              reserved.
            </p>
            <p className="text-xs text-white/45">{siteConfig.brochureLabel}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.15em] text-white/70 uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
