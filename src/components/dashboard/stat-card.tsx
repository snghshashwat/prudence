import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
        <div
          className={cn(
            "hidden size-8 shrink-0 items-center justify-center rounded-lg sm:flex",
            accent ? "bg-navy/10 text-navy" : "bg-secondary text-navy"
          )}
        >
          <Icon className="size-4" />
        </div>
      </div>
      <p className="mt-2 font-heading text-2xl text-navy sm:mt-3 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}
