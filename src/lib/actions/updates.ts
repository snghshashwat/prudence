"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { composeDemoUpdate, removeDemoUpdate } from "@/lib/demo/store";

export type ComposeUpdateState = { error: string | null };

export async function composeUpdate(
  _prevState: ComposeUpdateState,
  formData: FormData
): Promise<ComposeUpdateState> {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const targetClientId = String(formData.get("target_client_id") ?? "");

  if (!title || !body) return { error: "Title and message are required." };

  if (await getDemoRole()) {
    composeDemoUpdate(title, body, targetClientId === "all" ? null : targetClientId);
    revalidatePath("/admin/updates");
    redirect("/admin/updates");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("updates").insert({
    title,
    body,
    created_by: user.id,
    target_client_id: targetClientId === "all" ? null : targetClientId,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/updates");
  redirect("/admin/updates");
}

export async function deleteUpdate(formData: FormData) {
  const id = String(formData.get("id"));

  if (await getDemoRole()) {
    removeDemoUpdate(id);
    revalidatePath("/admin/updates");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("updates").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/updates");
}
