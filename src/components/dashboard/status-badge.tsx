import { cn } from "@/lib/utils";
import { STATUS_LABELS, type ServiceStatus } from "@/lib/types/domain";

// Dot + label on a low-opacity tint, not a solid saturated pill. The dot
// carries the status color (gray/navy/green, no accent hue); the label
// stays neutral text so it never competes with the one or two things per
// screen that should actually draw the eye.
const styles: Record<ServiceStatus, string> = {
  not_started: "bg-secondary text-muted-foreground",
  in_progress: "bg-status-in-progress/10 text-foreground",
  completed: "bg-status-completed/10 text-foreground",
};

const dotStyles: Record<ServiceStatus, string> = {
  not_started: "bg-status-not-started",
  in_progress: "bg-status-in-progress",
  completed: "bg-status-completed",
};

export function StatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        styles[status]
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyles[status])} />
      {STATUS_LABELS[status]}
    </span>
  );
}
