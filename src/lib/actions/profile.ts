"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { DEMO_CUSTOMER_ID, updateDemoProfile } from "@/lib/demo/store";

export type ProfileActionState = { error: string | null; success?: boolean };

export async function updateProfile(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const full_name = String(formData.get("full_name") ?? "");
  const phone = String(formData.get("phone") ?? "") || null;
  const company_name = String(formData.get("company_name") ?? "") || null;

  if (!full_name.trim()) return { error: "Name is required." };

  if (await getDemoRole()) {
    updateDemoProfile(DEMO_CUSTOMER_ID, { full_name, phone, company_name });
    revalidatePath("/dashboard/profile");
    return { error: null, success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone, company_name })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/profile");
  return { error: null, success: true };
}
