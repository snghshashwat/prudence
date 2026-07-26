import { notFound } from "next/navigation";
import { getClientProfile } from "@/lib/data/profiles";
import {
  listClientServicesFor,
  listUnassignedServicesFor,
} from "@/lib/data/clientServices";
import { AssignServiceDialog } from "@/components/admin/assign-service-dialog";
import { ServiceStatusRow } from "@/components/admin/service-status-row";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ClipboardList } from "lucide-react";
import { CLIENT_TYPE_LABELS } from "@/lib/types/domain";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = await getClientProfile(clientId);
  if (!client) notFound();

  const [services, unassigned] = await Promise.all([
    listClientServicesFor(clientId),
    listUnassignedServicesFor(clientId),
  ]);

  const initials = client.full_name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarFallback className="bg-deep text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-heading text-2xl font-medium text-navy">
              {client.full_name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {client.email}
              {client.client_type &&
                ` · ${CLIENT_TYPE_LABELS[client.client_type]}`}
              {client.company_name && ` · ${client.company_name}`}
            </p>
          </div>
        </div>
        <AssignServiceDialog clientId={clientId} services={unassigned} />
      </div>

      <div className="rounded-xl border border-border bg-card">
        {services.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={ClipboardList}
              title="No services assigned"
              description="Use “Assign Service” to add the first service for this client."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead colSpan={2}>Status & Notes</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <ServiceStatusRow
                  key={s.id}
                  id={s.id}
                  clientId={clientId}
                  serviceName={s.service_catalog?.name ?? ""}
                  category={s.service_catalog?.category ?? ""}
                  status={s.status}
                  notes={s.notes}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
