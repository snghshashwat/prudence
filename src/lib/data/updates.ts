import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { listDemoAllUpdates, listDemoUpdatesForClient } from "@/lib/demo/store";

export async function listUpdatesForClient(clientId: string, limit?: number) {
  if (await getDemoRole()) return listDemoUpdatesForClient(clientId, limit);

  const supabase = await createClient();
  let query = supabase
    .from("updates")
    .select("*")
    .or(`target_client_id.is.null,target_client_id.eq.${clientId}`)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query;
  return data ?? [];
}

export async function listAllUpdates() {
  if (await getDemoRole()) return listDemoAllUpdates();

  const supabase = await createClient();
  const { data } = await supabase
    .from("updates")
    .select("*, profiles!updates_target_client_id_fkey(full_name)")
    .order("created_at", { ascending: false });

  return data ?? [];
}
