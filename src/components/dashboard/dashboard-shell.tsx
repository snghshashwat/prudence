"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Megaphone,
  UserCircle,
  Users,
  ListChecks,
  Inbox,
  Settings,
  Menu,
  X,
  LifeBuoy,
  ChevronsUpDown,
} from "lucide-react";
import { Wordmark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Icons can't be passed as props from a Server Component layout into this
// Client Component (functions aren't serializable across that boundary),
// so nav configs live here, keyed by a plain string `variant`.
//
// Kept shallow on purpose (Linear's pattern): Profile and Settings are not
// repeated here, they already live one click away in the account menu at
// the bottom of the sidebar and in the topbar avatar. A long flat list of
// every route is what makes a sidebar feel like generic enterprise CRM.
const NAV_CONFIG = {
  customer: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Services", href: "/dashboard/services", icon: ClipboardList },
    { label: "Updates", href: "/dashboard/updates", icon: Megaphone },
    { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
  ],
  admin: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Clients", href: "/admin/clients", icon: Users },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Updates", href: "/admin/updates", icon: Megaphone },
    { label: "Service Catalog", href: "/admin/services", icon: ListChecks },
  ],
} as const;

export type DashboardVariant = keyof typeof NAV_CONFIG;

export function DashboardShell({
  variant,
  homeHref,
  roleLabel,
  userName,
  userEmail,
  signOutAction,
  children,
}: {
  variant: DashboardVariant;
  homeHref: string;
  roleLabel: string;
  userName: string;
  userEmail: string;
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const navItems = NAV_CONFIG[variant];
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const isActive = (href: string) =>
    pathname === href || (href !== homeHref && pathname.startsWith(href));

  const navLinks = (onNavigate?: () => void) =>
    navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive(item.href) ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive(item.href)
            ? "bg-white/10 text-white"
            : "text-white/65 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon className="size-4" />
        {item.label}
      </Link>
    ));

  // Account menu, grouped so Profile / Settings / Log out live together
  // rather than logout sitting on its own.
  const accountMenu = (onNavigate?: () => void) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors outline-none hover:bg-white/5">
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-white/10 text-xs text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-white">
            {userName}
          </span>
          <span className="block truncate text-xs text-white/50">
            {userEmail}
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-white/50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`${homeHref}/profile`} onClick={onNavigate}>
            <UserCircle className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`${homeHref}/settings`} onClick={onNavigate}>
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <button type="submit" className="w-full">
            <DropdownMenuItem asChild={false}>
              <span className="flex items-center gap-2">
                <LogOut className="size-4" />
                Log out
              </span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const sidebarInner = (onNavigate?: () => void) => (
    <>
      <div className="px-6 pb-4">
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium tracking-wide text-white/70 uppercase">
          {roleLabel}
        </span>
      </div>
      {/* Only the link list scrolls, so the brand and account block stay put. */}
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
        {navLinks(onNavigate)}
      </nav>
      <div className="border-t border-white/10 p-3">{accountMenu(onNavigate)}</div>
    </>
  );

  return (
    <div className="min-h-screen bg-secondary">
      {/* Desktop sidebar, fixed to the viewport so it never scrolls away. */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-deep text-sidebar-foreground md:flex">
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link href={homeHref}>
            <Wordmark className="text-white" markClassName="text-white" />
          </Link>
        </div>
        {sidebarInner()}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-deep text-sidebar-foreground">
            <div className="flex h-16 shrink-0 items-center justify-between px-6">
              <Wordmark className="text-white" markClassName="text-white" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-white/70 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebarInner(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      {/* Offset by the fixed sidebar's width on desktop. */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <Link href={homeHref} className="md:hidden">
              <Wordmark markClassName="text-navy" />
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-deep text-xs text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  {userName}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`${homeHref}/profile`}>
                    <UserCircle className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${homeHref}/settings`}>
                    <Settings className="size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                  <button type="submit" className="w-full">
                    <DropdownMenuItem asChild={false}>
                      <span className="flex items-center gap-2">
                        <LogOut className="size-4" />
                        Log out
                      </span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
