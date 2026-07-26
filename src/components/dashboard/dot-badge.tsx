import { cn } from "@/lib/utils";

// Generic version of the dot + label + low-opacity-tint pattern used by
// StatusBadge, for statuses that aren't ServiceStatus (e.g. enquiry
// new/contacted/closed). Keep the two in visual sync.
export function DotBadge({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "active" | "positive";
}) {
  const styles: Record<typeof tone, string> = {
    neutral: "bg-secondary text-muted-foreground",
    active: "bg-status-in-progress/10 text-foreground",
    positive: "bg-status-completed/10 text-foreground",
  };
  const dot: Record<typeof tone, string> = {
    neutral: "bg-status-not-started",
    active: "bg-status-in-progress",
    positive: "bg-status-completed",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize",
        styles[tone]
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot[tone])} />
      {label}
    </span>
  );
}
