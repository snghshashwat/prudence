import { cn } from "@/lib/utils";

/**
 * Ascending bars with a trend line, standing in for a photo on the
 * Accounting, CFO & Advisory pillar. A generic growth motif, deliberately
 * not a fabricated performance chart with invented numbers.
 */
export function GrowthChartIllustration({
  className,
}: {
  className?: string;
}) {
  const bars = [
    { x: 60, height: 40 },
    { x: 110, height: 62 },
    { x: 160, height: 52 },
    { x: 210, height: 88 },
    { x: 260, height: 118 },
  ];
  const baseY = 190;

  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <line
        x1="30"
        y1={baseY}
        x2="290"
        y2={baseY}
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />

      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x - 16}
          y={baseY - b.height}
          width="32"
          height={b.height}
          rx="3"
          fill="currentColor"
          opacity={0.28 + i * 0.13}
        />
      ))}

      <path
        d={`M ${bars[0].x} ${baseY - bars[0].height - 16}
            L ${bars[1].x} ${baseY - bars[1].height - 16}
            L ${bars[2].x} ${baseY - bars[2].height - 16}
            L ${bars[3].x} ${baseY - bars[3].height - 16}
            L ${bars[4].x} ${baseY - bars[4].height - 16}`}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {bars.map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={baseY - b.height - 16}
          r="4"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
