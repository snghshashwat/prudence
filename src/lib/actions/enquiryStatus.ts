"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import { setDemoEnquiryStatus } from "@/lib/demo/store";

export async function updateEnquiryStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | "new"
    | "contacted"
    | "closed";

  if (await getDemoRole()) {
    setDemoEnquiryStatus(id, status);
    revalidatePath("/admin/enquiries");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_enquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/enquiries");
}
