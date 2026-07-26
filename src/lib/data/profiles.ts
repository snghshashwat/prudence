import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import {
  DEMO_ADMIN_ID,
  DEMO_CUSTOMER_ID,
  getDemoProfile,
  listDemoCustomerProfiles,
} from "@/lib/demo/store";

export async function getCurrentProfile() {
  const demoRole = await getDemoRole();
  if (demoRole) {
    return getDemoProfile(demoRole === "admin" ? DEMO_ADMIN_ID : DEMO_CUSTOMER_ID);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function listClientProfiles() {
  if (await getDemoRole()) return listDemoCustomerProfiles();

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getClientProfile(clientId: string) {
  if (await getDemoRole()) return getDemoProfile(clientId);

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", clientId)
    .single();

  return data;
}
