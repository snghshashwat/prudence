import { Users, ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { CLIENT_TYPE_LABELS, type ClientType } from "@/lib/types/domain";

export function MetricsGrid({
  totalClients,
  byPillar,
  byStatus,
  totalServicesAssigned,
}: {
  totalClients: number;
  byPillar: Record<string, number>;
  byStatus: { not_started: number; in_progress: number; completed: number };
  totalServicesAssigned: number;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Clients" value={totalClients} icon={Users} />
        <StatCard
          label="Services Assigned"
          value={totalServicesAssigned}
          icon={ClipboardList}
        />
        <StatCard label="In Progress" value={byStatus.in_progress} icon={Clock} accent />
        <StatCard label="Completed" value={byStatus.completed} icon={CheckCircle2} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading text-base font-medium text-navy">
          Clients by Category
        </h3>
        <div className="mt-4 space-y-3">
          {(Object.keys(CLIENT_TYPE_LABELS) as ClientType[]).map((type) => {
            const value = byPillar[type] ?? 0;
            const pct = totalClients ? Math.round((value / totalClients) * 100) : 0;
            return (
              <div key={type}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{CLIENT_TYPE_LABELS[type]}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-secondary">
                  <div
                    className="h-1.5 rounded-full bg-navy"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
