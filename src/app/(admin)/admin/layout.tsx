import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/data/profiles";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { signOut } from "@/lib/actions/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "admin") redirect("/dashboard");

  return (
    <DashboardShell
      variant="admin"
      homeHref="/admin"
      roleLabel={profile.id.startsWith("demo-") ? "Admin · Demo" : "Admin"}
      userName={profile.full_name}
      userEmail={profile.email}
      signOutAction={signOut}
    >
      {children}
    </DashboardShell>
  );
}
