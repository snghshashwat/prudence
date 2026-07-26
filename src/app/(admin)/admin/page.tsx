import { getAdminMetrics } from "@/lib/data/metrics";
import { listAllClientServices } from "@/lib/data/clientServices";
import { MetricsGrid } from "@/components/admin/metrics-grid";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Activity } from "lucide-react";

export default async function AdminOverviewPage() {
  const [metrics, recent] = await Promise.all([
    getAdminMetrics(),
    listAllClientServices(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of the Prudence Advisory client book.
        </p>
      </div>

      <MetricsGrid {...metrics} />

      <div>
        <h2 className="font-heading text-lg font-medium text-navy">
          Recent Activity
        </h2>
        <div className="mt-3 space-y-2">
          {recent.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No activity yet"
              description="Service assignments and status changes will show up here."
            />
          ) : (
            recent.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {r.profiles?.full_name} · {r.service_catalog?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Updated {new Date(r.updated_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
