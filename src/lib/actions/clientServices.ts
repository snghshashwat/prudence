"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole } from "@/lib/demo/session";
import {
  assignDemoService,
  removeDemoService,
  updateDemoServiceStatus,
} from "@/lib/demo/store";
import type { ServiceStatus } from "@/lib/types/domain";

export async function assignService(formData: FormData) {
  const clientId = String(formData.get("client_id"));
  const serviceId = String(formData.get("service_id"));
  const status = String(formData.get("status") ?? "not_started") as ServiceStatus;

  if (await getDemoRole()) {
    assignDemoService(clientId, serviceId, status);
    revalidatePath(`/admin/clients/${clientId}`);
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { error } = await supabase.from("client_services").insert({
    client_id: clientId,
    service_id: serviceId,
    status,
    assigned_by: user.id,
    started_at: status !== "not_started" ? new Date().toISOString() : null,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clients/${clientId}`);
}

export async function updateServiceStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const clientId = String(formData.get("client_id"));
  const status = String(formData.get("status")) as ServiceStatus;
  const notes = String(formData.get("notes") ?? "") || null;

  if (await getDemoRole()) {
    updateDemoServiceStatus(id, status, notes);
    revalidatePath(`/admin/clients/${clientId}`);
    return;
  }

  const supabase = await createClient();

  const patch: {
    status: ServiceStatus;
    notes: string | null;
    completed_at?: string;
    started_at?: string;
  } = { status, notes };
  if (status === "completed") patch.completed_at = new Date().toISOString();
  if (status === "in_progress") patch.started_at = new Date().toISOString();

  const { error } = await supabase
    .from("client_services")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clients/${clientId}`);
}

export async function removeService(formData: FormData) {
  const id = String(formData.get("id"));
  const clientId = String(formData.get("client_id"));

  if (await getDemoRole()) {
    removeDemoService(id);
    revalidatePath(`/admin/clients/${clientId}`);
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("client_services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/clients/${clientId}`);
}
