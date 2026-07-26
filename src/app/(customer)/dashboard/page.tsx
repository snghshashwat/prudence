import Link from "next/link";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profiles";
import { listClientServicesFor } from "@/lib/data/clientServices";
import { listUpdatesForClient } from "@/lib/data/updates";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { UpdateFeed } from "@/components/dashboard/update-feed";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { CLIENT_TYPE_LABELS } from "@/lib/types/domain";

export default async function CustomerOverviewPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const [services, updates] = await Promise.all([
    listClientServicesFor(profile.id),
    listUpdatesForClient(profile.id, 4),
  ]);

  const total = services.length;
  const inProgress = services.filter((s) => s.status === "in_progress").length;
  const completed = services.filter((s) => s.status === "completed").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-navy">
          Welcome back, {profile.full_name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.client_type
            ? CLIENT_TYPE_LABELS[profile.client_type]
            : "Your Prudence Advisory relationship at a glance."}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Total Services" value={total} icon={ClipboardList} />
        <StatCard label="In Progress" value={inProgress} icon={Clock} accent />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-medium text-navy">
              Your Services
            </h2>
            <Button variant="link" className="text-navy" asChild>
              <Link href="/dashboard/services">View all</Link>
            </Button>
          </div>
          <div className="mt-3 space-y-2">
            {services.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No services yet"
                description="Once your Prudence team assigns services, they'll appear here with live status."
              />
            ) : (
              services.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {s.service_catalog?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.service_catalog?.category}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-medium text-navy">
              Latest Updates
            </h2>
            <Button variant="link" className="text-navy" asChild>
              <Link href="/dashboard/updates">View all</Link>
            </Button>
          </div>
          <div className="mt-3">
            <UpdateFeed
              updates={updates.map((u) => ({
                ...u,
                targeted: u.target_client_id !== null,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
