import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { listDemoEnquiries } from "@/lib/demo/store";

export async function listEnquiries() {
  if (await getDemoRole()) return listDemoEnquiries();

  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}
