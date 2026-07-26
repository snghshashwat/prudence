import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { listDemoServiceCatalog } from "@/lib/demo/store";

export async function listServiceCatalog() {
  if (await getDemoRole()) return listDemoServiceCatalog();

  const supabase = await createClient();
  const { data } = await supabase
    .from("service_catalog")
    .select("*")
    .order("pillar")
    .order("sort_order");

  return data ?? [];
}
