import { Megaphone, User } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

export type UpdateItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  targeted: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function UpdateCard({ update }: { update: UpdateItem }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className={
              update.targeted
                ? "flex size-7 items-center justify-center rounded-full bg-navy/10 text-navy"
                : "flex size-7 items-center justify-center rounded-full bg-secondary text-navy"
            }
          >
            {update.targeted ? (
              <User className="size-3.5" />
            ) : (
              <Megaphone className="size-3.5" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {update.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {update.targeted ? "For You" : "Announcement"} ·{" "}
              {formatDate(update.created_at)}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{update.body}</p>
    </div>
  );
}

export function UpdateFeed({ updates }: { updates: UpdateItem[] }) {
  if (updates.length === 0) {
    return (
      <EmptyState
        icon={Megaphone}
        title="No updates yet"
        description="Announcements and updates from your Prudence team will appear here."
      />
    );
  }
  return (
    <div className="space-y-3">
      {updates.map((u) => (
        <UpdateCard key={u.id} update={u} />
      ))}
    </div>
  );
}
