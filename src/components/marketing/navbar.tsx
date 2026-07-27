"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#welcome", label: "Why Prudence" },
  { href: "/#services", label: "Services" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#enquire", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-40">
      {/* Thin utility bar, scrolls away on inner pages on the reference
          site; here it just sits above the sticky main nav. */}
      <div className="hidden bg-secondary sm:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-end gap-6 px-4 text-xs font-medium text-navy/80 sm:px-6 lg:px-8">
          <Link href="/login" className="transition-colors hover:text-navy">
            Client Login
          </Link>
        </div>
      </div>

      <header className="border-b border-white/10 bg-deep">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" onClick={() => setOpen(false)}>
            <Wordmark className="text-white" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="text-white hover:bg-white/10 hover:text-white" />
            <Button
              size="sm"
              className="hidden rounded-full bg-white px-4 text-deep hover:bg-white/90 sm:inline-flex"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className={cn("border-t border-white/10 bg-deep md:hidden")}>
            <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 pt-3">
                <Button
                  variant="outline"
                  className="flex-1 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button
                  className="flex-1 rounded-full bg-white text-deep hover:bg-white/90"
                  asChild
                >
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
