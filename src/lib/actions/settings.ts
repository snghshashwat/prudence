"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import {
  DEMO_ADMIN_ID,
  DEMO_CUSTOMER_ID,
  updateDemoProfile,
} from "@/lib/demo/store";

export type SettingsActionState = { error: string | null; success?: boolean };

export async function updateNotificationPrefs(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const prefs = {
    notify_service_updates: formData.get("notify_service_updates") === "on",
    notify_announcements: formData.get("notify_announcements") === "on",
    notify_email: formData.get("notify_email") === "on",
  };

  const demoRole = await getDemoRole();
  if (demoRole) {
    updateDemoProfile(
      demoRole === "admin" ? DEMO_ADMIN_ID : DEMO_CUSTOMER_ID,
      prefs
    );
    revalidatePath("/dashboard/settings");
    revalidatePath("/admin/settings");
    return { error: null, success: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .update(prefs)
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/settings");
  revalidatePath("/admin/settings");
  return { error: null, success: true };
}

export async function changePassword(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  if (await getDemoRole()) {
    return {
      error:
        "Password changes are disabled in demo mode, connect Supabase to enable this.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  return { error: null, success: true };
}
