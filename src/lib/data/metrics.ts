import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { getDemoAdminMetrics } from "@/lib/demo/store";

export async function getAdminMetrics() {
  if (await getDemoRole()) return getDemoAdminMetrics();

  const supabase = await createClient();

  const [{ count: totalClients }, { data: profiles }, { data: clientServices }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "customer"),
      supabase.from("profiles").select("client_type").eq("role", "customer"),
      supabase.from("client_services").select("status"),
    ]);

  const byPillar: Record<string, number> = {
    nri: 0,
    family_business: 0,
    sme: 0,
    individual: 0,
  };
  (profiles ?? []).forEach((p) => {
    if (p.client_type) byPillar[p.client_type] = (byPillar[p.client_type] ?? 0) + 1;
  });

  const byStatus = { not_started: 0, in_progress: 0, completed: 0 };
  (clientServices ?? []).forEach((cs) => {
    byStatus[cs.status] = (byStatus[cs.status] ?? 0) + 1;
  });

  return {
    totalClients: totalClients ?? 0,
    byPillar,
    byStatus,
    totalServicesAssigned: clientServices?.length ?? 0,
  };
}
