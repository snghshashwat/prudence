import { listClientProfiles } from "@/lib/data/profiles";
import { getServiceCountsByClient } from "@/lib/data/clientServices";
import { ClientTable } from "@/components/admin/client-table";
import { PageHeader } from "@/components/dashboard/section-card";

export default async function AdminClientsPage() {
  const [clients, counts] = await Promise.all([
    listClientProfiles(),
    getServiceCountsByClient(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="All customer accounts on Prudence Advisory."
      />
      <ClientTable
        clients={clients.map((c) => ({
          id: c.id,
          full_name: c.full_name,
          email: c.email,
          company_name: c.company_name,
          client_type: c.client_type,
          created_at: c.created_at,
          service_count: counts[c.id] ?? 0,
        }))}
      />
    </div>
  );
}
