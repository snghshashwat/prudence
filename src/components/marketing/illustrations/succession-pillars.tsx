import { cn } from "@/lib/utils";

/**
 * Three pillars of ascending height (generations), joined by a single
 * unbroken arc, echoing the swoop in the brand mark. Stands in for a photo
 * on the Family Business pillar: continuity across generations, not a
 * literal illustration of a family.
 */
export function SuccessionPillarsIllustration({
  className,
}: {
  className?: string;
}) {
  const pillars = [
    { x: 60, height: 60 },
    { x: 150, height: 88 },
    { x: 240, height: 116 },
  ];
  const baseY = 200;

  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <line
        x1="30"
        y1={baseY + 14}
        x2="290"
        y2={baseY + 14}
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />

      <path
        d={`M ${pillars[0].x} ${baseY - pillars[0].height - 10} Q 160 20, ${pillars[2].x} ${baseY - pillars[2].height - 10}`}
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {pillars.map((p, i) => {
        const top = baseY - p.height;
        return (
          <g key={i} opacity={0.55 + i * 0.22}>
            <rect x={p.x - 15} y={top - 8} width="30" height="8" rx="1.5" fill="currentColor" />
            <rect x={p.x - 15} y={baseY} width="30" height="8" rx="1.5" fill="currentColor" />
            <rect x={p.x - 8} y={top} width="3.5" height={p.height} fill="currentColor" />
            <rect x={p.x - 1.75} y={top} width="3.5" height={p.height} fill="currentColor" />
            <rect x={p.x + 4.5} y={top} width="3.5" height={p.height} fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}
