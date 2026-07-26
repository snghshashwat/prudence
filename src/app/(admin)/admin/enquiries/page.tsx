import { Inbox, Mail, Phone } from "lucide-react";
import { listEnquiries } from "@/lib/data/enquiries";
import { updateEnquiryStatus } from "@/lib/actions/enquiryStatus";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/section-card";
import { Badge } from "@/components/ui/badge";
import { DotBadge } from "@/components/dashboard/dot-badge";
import { Button } from "@/components/ui/button";
import { PILLAR_LABELS, type Pillar } from "@/lib/types/domain";

const STATUS_TONE: Record<string, "neutral" | "active" | "positive"> = {
  new: "active",
  contacted: "neutral",
  closed: "positive",
};

const NEXT_STATUS: Record<string, { value: string; label: string }> = {
  new: { value: "contacted", label: "Mark contacted" },
  contacted: { value: "closed", label: "Mark closed" },
  closed: { value: "new", label: "Reopen" },
};

export default async function AdminEnquiriesPage() {
  const enquiries = await listEnquiries();
  const open = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiries"
        description={`${enquiries.length} received, ${open} awaiting a first response.`}
      />

      <div className="space-y-3">
        {enquiries.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No enquiries yet"
            description="Submissions from the contact form on the landing page will appear here."
          />
        ) : (
          enquiries.map((e) => {
            const next = NEXT_STATUS[e.status];
            return (
              <article
                key={e.id}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-medium text-navy">{e.full_name}</h2>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <a
                        href={`mailto:${e.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-navy"
                      >
                        <Mail className="size-3.5" />
                        {e.email}
                      </a>
                      {e.phone && (
                        <a
                          href={`tel:${e.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-navy"
                        >
                          <Phone className="size-3.5" />
                          {e.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {e.interest && e.interest !== "other" && (
                      <Badge variant="secondary">
                        {PILLAR_LABELS[e.interest as Pillar]}
                      </Badge>
                    )}
                    <DotBadge label={e.status} tone={STATUS_TONE[e.status]} />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {e.message}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.created_at).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <form action={updateEnquiryStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="status" value={next.value} />
                    <Button type="submit" variant="outline" size="sm">
                      {next.label}
                    </Button>
                  </form>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
