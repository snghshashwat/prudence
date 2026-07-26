import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import {
  listDemoAllClientServices,
  listDemoAllClientServicesRaw,
  listDemoClientServicesFor,
  listDemoUnassignedServicesFor,
} from "@/lib/demo/store";

export async function listClientServicesFor(clientId: string) {
  if (await getDemoRole()) return listDemoClientServicesFor(clientId);

  const supabase = await createClient();
  const { data } = await supabase
    .from("client_services")
    .select("*, service_catalog(*)")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function listUnassignedServicesFor(clientId: string) {
  if (await getDemoRole()) return listDemoUnassignedServicesFor(clientId);

  const supabase = await createClient();
  const [{ data: allServices }, { data: assigned }] = await Promise.all([
    supabase.from("service_catalog").select("*").eq("is_active", true),
    supabase
      .from("client_services")
      .select("service_id")
      .eq("client_id", clientId),
  ]);

  const assignedIds = new Set((assigned ?? []).map((a) => a.service_id));
  return (allServices ?? []).filter((s) => !assignedIds.has(s.id));
}

/** Map of client_id -> number of services assigned. */
export async function getServiceCountsByClient(): Promise<
  Record<string, number>
> {
  const counts: Record<string, number> = {};

  if (await getDemoRole()) {
    listDemoAllClientServicesRaw().forEach((cs) => {
      counts[cs.client_id] = (counts[cs.client_id] ?? 0) + 1;
    });
    return counts;
  }

  const supabase = await createClient();
  const { data } = await supabase.from("client_services").select("client_id");
  (data ?? []).forEach((cs) => {
    counts[cs.client_id] = (counts[cs.client_id] ?? 0) + 1;
  });
  return counts;
}

export async function listAllClientServices() {
  if (await getDemoRole()) return listDemoAllClientServices();

  const supabase = await createClient();
  const { data } = await supabase
    .from("client_services")
    .select("*, service_catalog(*), profiles!client_services_client_id_fkey(*)")
    .order("updated_at", { ascending: false })
    .limit(10);

  return data ?? [];
}
