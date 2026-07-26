import "server-only";
import { servicePillars } from "@/lib/content/services";
import type { ClientType, Pillar, ServiceStatus } from "@/lib/types/domain";

// In-memory fixture data backing the two demo logins (see
// lib/demo/session.ts). Lets the whole frontend, landing page, auth,
// both dashboards, be tested with zero Supabase setup. State is a
// module-level singleton: it persists across requests within one running
// dev server process, but resets on restart/redeploy. Not a substitute for
// the real Supabase-backed data layer in lib/data and lib/actions.

export type DemoProfile = {
  id: string;
  role: "admin" | "customer";
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  client_type: ClientType | null;
  notify_service_updates: boolean;
  notify_announcements: boolean;
  notify_email: boolean;
  created_at: string;
  updated_at: string;
};

export type DemoService = {
  id: string;
  pillar: Pillar;
  category: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type DemoClientService = {
  id: string;
  client_id: string;
  service_id: string;
  status: ServiceStatus;
  notes: string | null;
  assigned_by: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DemoEnquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  interest: "nri" | "family_business" | "accounting_cfo" | "other" | null;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

export type DemoUpdate = {
  id: string;
  title: string;
  body: string;
  target_client_id: string | null;
  created_by: string;
  created_at: string;
};

const now = () => new Date().toISOString();
const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString();

export const DEMO_ADMIN_ID = "demo-admin";
export const DEMO_CUSTOMER_ID = "demo-customer-priya";
const SECONDARY_CUSTOMER_ID = "demo-customer-arjun";

const DEMO_ADMIN: DemoProfile = {
  id: DEMO_ADMIN_ID,
  role: "admin",
  full_name: "Prudence Admin",
  email: "admin@prudenceadvisory.com",
  phone: null,
  company_name: null,
  client_type: null,
  notify_service_updates: true,
  notify_announcements: true,
  notify_email: true,
  created_at: daysAgo(120),
  updated_at: daysAgo(120),
};

const DEMO_CUSTOMER: DemoProfile = {
  id: DEMO_CUSTOMER_ID,
  role: "customer",
  full_name: "Priya Nair",
  email: "priya.nair@example.com",
  phone: "+971 50 123 4567",
  company_name: null,
  client_type: "nri",
  notify_service_updates: true,
  notify_announcements: true,
  notify_email: true,
  created_at: daysAgo(60),
  updated_at: daysAgo(60),
};

const SECONDARY_CUSTOMER: DemoProfile = {
  id: SECONDARY_CUSTOMER_ID,
  role: "customer",
  full_name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  phone: "+91 98200 12345",
  company_name: "Mehta Textiles Pvt. Ltd.",
  client_type: "family_business",
  notify_service_updates: true,
  notify_announcements: true,
  notify_email: true,
  created_at: daysAgo(45),
  updated_at: daysAgo(45),
};

const profiles: DemoProfile[] = [DEMO_ADMIN, DEMO_CUSTOMER, SECONDARY_CUSTOMER];

let nextId = 1;
const genId = (prefix: string) => `${prefix}-${nextId++}`;

const serviceCatalog: DemoService[] = servicePillars.flatMap((pillar) =>
  pillar.categories.flatMap((cat, catIdx) =>
    cat.items.map((name, itemIdx) => ({
      id: `svc-${pillar.pillar}-${catIdx}-${itemIdx}`,
      pillar: pillar.pillar,
      category: cat.category,
      name,
      description: null,
      sort_order: catIdx * 10 + itemIdx,
      is_active: true,
      created_at: daysAgo(120),
    }))
  )
);

const findService = (predicate: (s: DemoService) => boolean) =>
  serviceCatalog.find(predicate)!;

const clientServices: DemoClientService[] = [
  {
    id: genId("cs"),
    client_id: DEMO_CUSTOMER_ID,
    service_id: findService((s) => s.name === "Income tax return filing for NRIs").id,
    status: "completed",
    notes: "Filed and acknowledged for AY 2025-26.",
    assigned_by: DEMO_ADMIN_ID,
    started_at: daysAgo(50),
    completed_at: daysAgo(20),
    created_at: daysAgo(55),
    updated_at: daysAgo(20),
  },
  {
    id: genId("cs"),
    client_id: DEMO_CUSTOMER_ID,
    service_id: findService((s) => s.name.startsWith("Lower / nil TDS")).id,
    status: "in_progress",
    notes: "Form 13 submitted, awaiting department processing.",
    assigned_by: DEMO_ADMIN_ID,
    started_at: daysAgo(10),
    completed_at: null,
    created_at: daysAgo(12),
    updated_at: daysAgo(3),
  },
  {
    id: genId("cs"),
    client_id: DEMO_CUSTOMER_ID,
    service_id: findService((s) => s.name === "NRI property management and compliance").id,
    status: "not_started",
    notes: null,
    assigned_by: DEMO_ADMIN_ID,
    started_at: null,
    completed_at: null,
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },
  {
    id: genId("cs"),
    client_id: DEMO_CUSTOMER_ID,
    service_id: findService((s) => s.name.startsWith("Repatriation of funds")).id,
    status: "in_progress",
    notes: null,
    assigned_by: DEMO_ADMIN_ID,
    started_at: daysAgo(7),
    completed_at: null,
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
  },
  {
    id: genId("cs"),
    client_id: SECONDARY_CUSTOMER_ID,
    service_id: findService((s) => s.name === "Family constitution and charter drafting").id,
    status: "in_progress",
    notes: "First draft shared for review.",
    assigned_by: DEMO_ADMIN_ID,
    started_at: daysAgo(15),
    completed_at: null,
    created_at: daysAgo(20),
    updated_at: daysAgo(2),
  },
  {
    id: genId("cs"),
    client_id: SECONDARY_CUSTOMER_ID,
    service_id: findService((s) => s.name === "Family business valuation").id,
    status: "not_started",
    notes: null,
    assigned_by: DEMO_ADMIN_ID,
    started_at: null,
    completed_at: null,
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
];

const updates: DemoUpdate[] = [
  {
    id: genId("upd"),
    title: "Welcome to your Prudence Advisory portal",
    body: "You can track every service we're handling for you here, and we'll post updates as things progress.",
    target_client_id: null,
    created_by: DEMO_ADMIN_ID,
    created_at: daysAgo(30),
  },
  {
    id: genId("upd"),
    title: "FY 2025-26 filing season reminder",
    body: "We'll be reaching out over the next few weeks to collect documents for this year's filings. No action needed yet.",
    target_client_id: null,
    created_by: DEMO_ADMIN_ID,
    created_at: daysAgo(6),
  },
  {
    id: genId("upd"),
    title: "Form 13 application submitted",
    body: "We've filed your lower/nil TDS certificate application with the department. Typical processing time is 2-4 weeks.",
    target_client_id: DEMO_CUSTOMER_ID,
    created_by: DEMO_ADMIN_ID,
    created_at: daysAgo(3),
  },
  {
    id: genId("upd"),
    title: "Draft family constitution ready for review",
    body: "The first draft of your family constitution is ready. We'll schedule a call this week to walk through it together.",
    target_client_id: SECONDARY_CUSTOMER_ID,
    created_by: DEMO_ADMIN_ID,
    created_at: daysAgo(2),
  },
];

const enquiries: DemoEnquiry[] = [
  {
    id: genId("enq"),
    full_name: "Sample Enquiry (demo data)",
    email: "sample@example.com",
    phone: null,
    interest: "nri",
    message:
      "Selling a flat in Pune while resident in Singapore. Need help with capital gains and repatriation.",
    status: "new",
    created_at: daysAgo(1),
  },
];

// --- Reads -----------------------------------------------------------

export function listDemoEnquiries() {
  return [...enquiries].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
}

export function getDemoProfile(id: string) {
  return profiles.find((p) => p.id === id) ?? null;
}

export function listDemoCustomerProfiles() {
  return profiles.filter((p) => p.role === "customer");
}

export function listDemoServiceCatalog() {
  return [...serviceCatalog].sort(
    (a, b) => a.pillar.localeCompare(b.pillar) || a.sort_order - b.sort_order
  );
}

export function listDemoClientServicesFor(clientId: string) {
  return clientServices
    .filter((cs) => cs.client_id === clientId)
    .map((cs) => ({ ...cs, service_catalog: findService((s) => s.id === cs.service_id) }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function listDemoUnassignedServicesFor(clientId: string) {
  const assigned = new Set(
    clientServices.filter((cs) => cs.client_id === clientId).map((cs) => cs.service_id)
  );
  return serviceCatalog.filter((s) => s.is_active && !assigned.has(s.id));
}

/** Unjoined rows, used for aggregate counts. */
export function listDemoAllClientServicesRaw() {
  return clientServices;
}

export function listDemoAllClientServices() {
  return [...clientServices]
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 10)
    .map((cs) => ({
      ...cs,
      service_catalog: findService((s) => s.id === cs.service_id),
      profiles: getDemoProfile(cs.client_id),
    }));
}

export function listDemoUpdatesForClient(clientId: string, limit?: number) {
  const list = updates
    .filter((u) => u.target_client_id === null || u.target_client_id === clientId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  return limit ? list.slice(0, limit) : list;
}

export function listDemoAllUpdates() {
  return [...updates]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((u) => ({
      ...u,
      profiles: u.target_client_id ? getDemoProfile(u.target_client_id) : null,
    }));
}

export function getDemoAdminMetrics() {
  const customers = listDemoCustomerProfiles();
  const byPillar: Record<string, number> = {
    nri: 0,
    family_business: 0,
    sme: 0,
    individual: 0,
  };
  customers.forEach((p) => {
    if (p.client_type) byPillar[p.client_type] = (byPillar[p.client_type] ?? 0) + 1;
  });

  const byStatus = { not_started: 0, in_progress: 0, completed: 0 };
  clientServices.forEach((cs) => {
    byStatus[cs.status] += 1;
  });

  return {
    totalClients: customers.length,
    byPillar,
    byStatus,
    totalServicesAssigned: clientServices.length,
  };
}

// --- Writes ------------------------------------------------------------

export function assignDemoService(
  clientId: string,
  serviceId: string,
  status: ServiceStatus
) {
  clientServices.push({
    id: genId("cs"),
    client_id: clientId,
    service_id: serviceId,
    status,
    notes: null,
    assigned_by: DEMO_ADMIN_ID,
    started_at: status !== "not_started" ? now() : null,
    completed_at: null,
    created_at: now(),
    updated_at: now(),
  });
}

export function updateDemoServiceStatus(
  id: string,
  status: ServiceStatus,
  notes: string | null
) {
  const row = clientServices.find((cs) => cs.id === id);
  if (!row) return;
  row.status = status;
  row.notes = notes;
  row.updated_at = now();
  if (status === "completed") row.completed_at = now();
  if (status === "in_progress") row.started_at = row.started_at ?? now();
}

export function removeDemoService(id: string) {
  const idx = clientServices.findIndex((cs) => cs.id === id);
  if (idx !== -1) clientServices.splice(idx, 1);
}

export function toggleDemoServiceActive(id: string, isActive: boolean) {
  const row = serviceCatalog.find((s) => s.id === id);
  if (row) row.is_active = isActive;
}

export function composeDemoUpdate(
  title: string,
  body: string,
  targetClientId: string | null
) {
  updates.push({
    id: genId("upd"),
    title,
    body,
    target_client_id: targetClientId,
    created_by: DEMO_ADMIN_ID,
    created_at: now(),
  });
}

export function addDemoEnquiry(row: {
  full_name: string;
  email: string;
  phone: string | null;
  interest: DemoEnquiry["interest"];
  message: string;
}) {
  enquiries.push({
    id: genId("enq"),
    ...row,
    status: "new",
    created_at: now(),
  });
}

export function setDemoEnquiryStatus(id: string, status: DemoEnquiry["status"]) {
  const row = enquiries.find((e) => e.id === id);
  if (row) row.status = status;
}

export function removeDemoUpdate(id: string) {
  const idx = updates.findIndex((u) => u.id === id);
  if (idx !== -1) updates.splice(idx, 1);
}

export function updateDemoProfile(
  id: string,
  patch: Partial<Omit<DemoProfile, "id" | "role" | "created_at" | "updated_at">>
) {
  const row = profiles.find((p) => p.id === id);
  if (!row) return;
  Object.assign(row, patch, { updated_at: now() });
}
