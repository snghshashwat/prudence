import { ClipboardList } from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profiles";
import { listClientServicesFor } from "@/lib/data/clientServices";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PILLAR_LABELS } from "@/lib/types/domain";

export default async function CustomerServicesPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const services = await listClientServicesFor(profile.id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium text-navy">
        My Services
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every service Prudence Advisory is handling on your behalf, and where
        it stands.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card">
        {services.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={ClipboardList}
              title="No services yet"
              description="Once your Prudence team assigns services, they'll appear here with live status."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pillar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">
                    {s.service_catalog?.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.service_catalog?.category}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.service_catalog?.pillar &&
                      PILLAR_LABELS[s.service_catalog.pillar]}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={s.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.notes || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
