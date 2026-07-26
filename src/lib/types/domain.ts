export type Role = "admin" | "customer";

export type ClientType = "nri" | "family_business" | "sme" | "individual";

export type Pillar = "nri" | "family_business" | "accounting_cfo";

export type ServiceStatus = "not_started" | "in_progress" | "completed";

export const PILLAR_LABELS: Record<Pillar, string> = {
  nri: "NRI Services",
  family_business: "Family Business Services",
  accounting_cfo: "Accounting, CFO & Advisory",
};

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  nri: "NRI / OCI",
  family_business: "Family Business",
  sme: "Growing Business",
  individual: "Individual",
};

export const STATUS_LABELS: Record<ServiceStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
};
