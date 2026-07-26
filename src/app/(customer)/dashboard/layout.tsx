import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/data/profiles";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { signOut } from "@/lib/actions/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role === "admin") redirect("/admin");

  return (
    <DashboardShell
      variant="customer"
      homeHref="/dashboard"
      roleLabel={profile.id.startsWith("demo-") ? "Client Portal · Demo" : "Client Portal"}
      userName={profile.full_name}
      userEmail={profile.email}
      signOutAction={signOut}
    >
      {children}
    </DashboardShell>
  );
}
