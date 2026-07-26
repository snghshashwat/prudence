import Link from "next/link";
import { Megaphone, Plus, Trash2 } from "lucide-react";
import { listAllUpdates } from "@/lib/data/updates";
import { deleteUpdate } from "@/lib/actions/updates";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/section-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminUpdatesPage() {
  const updates = await listAllUpdates();
  const broadcasts = updates.filter((u) => !u.target_client_id).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Updates"
        description={`${updates.length} sent · ${broadcasts} broadcast · ${
          updates.length - broadcasts
        } client-specific`}
        action={
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/admin/updates/new">
              <Plus className="size-4" />
              New Update
            </Link>
          </Button>
        }
      />

      <div className="space-y-3">
        {updates.length === 0 ? (
          <EmptyState
            icon={Megaphone}
            title="No updates sent yet"
            description="Compose your first update to keep clients informed."
          />
        ) : (
          updates.map((u) => (
            <div
              key={u.id}
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-navy/25"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {u.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={u.target_client_id ? "outline" : "secondary"}>
                    {u.target_client_id
                      ? (u.profiles?.full_name ?? "Client")
                      : "Broadcast"}
                  </Badge>
                  <form action={deleteUpdate}>
                    <input type="hidden" name="id" value={u.id} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete update: ${u.title}`}
                      className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </form>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {new Date(u.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
