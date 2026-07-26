// Creates a demo admin + two demo customers with sample services/updates.
// Run with: npm run seed:demo
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/lib/types/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const admin = createClient<Database>(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_PASSWORD = "PrudenceDemo123!";

async function createUser(
  email: string,
  fullName: string,
  role: "admin" | "customer",
  clientType?: "nri" | "family_business" | "sme"
) {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      console.log(`Skipping ${email} (already exists)`);
      const { data: list } = await admin.auth.admin.listUsers();
      const existing = list.users.find((u) => u.email === email);
      return existing?.id ?? null;
    }
    throw error;
  }

  const userId = data.user!.id;

  await admin
    .from("profiles")
    .update({ role, client_type: clientType ?? null })
    .eq("id", userId);

  console.log(`Created ${role}: ${email} / ${DEMO_PASSWORD}`);
  return userId;
}

async function main() {
  const adminId = await createUser(
    "admin@prudenceadvisory.com",
    "Prudence Admin",
    "admin"
  );

  const nriClientId = await createUser(
    "priya.nair@example.com",
    "Priya Nair",
    "customer",
    "nri"
  );

  const familyClientId = await createUser(
    "arjun.mehta@example.com",
    "Arjun Mehta",
    "customer",
    "family_business"
  );

  if (!adminId || !nriClientId || !familyClientId) {
    console.log("Missing user ids, skipping service/update seed.");
    return;
  }

  const { data: services } = await admin.from("service_catalog").select("id, pillar, name");

  const nriServices = (services ?? []).filter((s) => s.pillar === "nri").slice(0, 4);
  const familyServices = (services ?? [])
    .filter((s) => s.pillar === "family_business")
    .slice(0, 3);

  const statuses: ("not_started" | "in_progress" | "completed")[] = [
    "completed",
    "in_progress",
    "not_started",
    "in_progress",
  ];

  for (const [i, s] of nriServices.entries()) {
    await admin.from("client_services").upsert(
      {
        client_id: nriClientId,
        service_id: s.id,
        status: statuses[i % statuses.length],
        assigned_by: adminId,
      },
      { onConflict: "client_id,service_id" }
    );
  }

  for (const [i, s] of familyServices.entries()) {
    await admin.from("client_services").upsert(
      {
        client_id: familyClientId,
        service_id: s.id,
        status: statuses[i % statuses.length],
        assigned_by: adminId,
      },
      { onConflict: "client_id,service_id" }
    );
  }

  await admin.from("updates").insert([
    {
      title: "Welcome to your Prudence Advisory portal",
      body: "You can track every service we're handling for you here, and we'll post updates as things progress.",
      created_by: adminId,
      target_client_id: null,
    },
    {
      title: "FY 2025-26 filing season reminder",
      body: "We'll be reaching out over the next few weeks to collect documents for this year's filings. No action needed yet.",
      created_by: adminId,
      target_client_id: null,
    },
    {
      title: "Form 13 application submitted",
      body: "We've filed your lower/nil TDS certificate application with the department. Typical processing time is 2-4 weeks.",
      created_by: adminId,
      target_client_id: nriClientId,
    },
    {
      title: "Draft family constitution ready for review",
      body: "The first draft of your family constitution is ready. We'll schedule a call this week to walk through it together.",
      created_by: adminId,
      target_client_id: familyClientId,
    },
  ]);

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
