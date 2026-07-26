"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { toggleDemoServiceActive } from "@/lib/demo/store";

export async function toggleServiceActive(formData: FormData) {
  const id = String(formData.get("id"));
  const isActive = formData.get("is_active") === "true";

  if (await getDemoRole()) {
    toggleDemoServiceActive(id, isActive);
    revalidatePath("/admin/services");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("service_catalog")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/services");
}
