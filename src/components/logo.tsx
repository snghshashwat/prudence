import { cn } from "@/lib/utils";

// Fluted pillar column resolving into the "P" swoop, with a diagonal sash
// crossing it, the brand mark in full. Monochrome only (currentColor): no
// gold sash, consistent with the rest of the site. Viewbox is taller than
// wide to match the mark's real proportions, so callers should size by
// height ("h-8 w-auto") rather than force a square box, or the mark renders
// smaller than intended inside empty letterboxing.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      className={cn("h-8 w-auto", className)}
      aria-hidden="true"
    >
      <rect x="32" y="24" width="30" height="8" rx="1.5" fill="currentColor" />
      <rect x="32" y="96" width="30" height="8" rx="1.5" fill="currentColor" />
      <rect x="37" y="32" width="4" height="64" fill="currentColor" />
      <rect x="45" y="32" width="4" height="64" fill="currentColor" />
      <rect x="53" y="32" width="4" height="64" fill="currentColor" />
      <path
        d="M46 18 C 60 16, 80 22, 80 42 C 80 60, 60 64, 49 56"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="12"
        y1="94"
        x2="82"
        y2="34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span className="font-heading text-lg font-medium tracking-[0.08em]">
        PRUDENCE
      </span>
    </span>
  );
}
