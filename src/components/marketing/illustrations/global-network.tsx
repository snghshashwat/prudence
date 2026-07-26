import { cn } from "@/lib/utils";

/**
 * Abstract globe + connection arcs, standing in for a photo on the NRI
 * Services pillar. Not a literal map (accuracy would be misleading at this
 * scale), just the idea of one home base connected to several cities.
 * Monochrome navy, matching the rest of the site.
 */
export function GlobalNetworkIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <circle
        cx="150"
        cy="120"
        r="80"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <ellipse
        cx="150"
        cy="120"
        rx="80"
        ry="28"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />
      <ellipse
        cx="150"
        cy="120"
        rx="34"
        ry="80"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />
      <line
        x1="70"
        y1="120"
        x2="230"
        y2="120"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />

      {/* Home base (India) */}
      <circle cx="150" cy="120" r="5.5" fill="currentColor" />

      {/* Destination cities, each with an arc back to home base */}
      {[
        { x: 262, y: 84 },
        { x: 268, y: 150 },
        { x: 44, y: 70 },
        { x: 40, y: 158 },
        { x: 190, y: 40 },
      ].map((c, i) => (
        <g key={i}>
          <path
            d={`M150 120 Q ${(150 + c.x) / 2} ${Math.min(120, c.y) - 34}, ${c.x} ${c.y}`}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.3"
            fill="none"
          />
          <circle cx={c.x} cy={c.y} r="3.5" stroke="currentColor" strokeWidth="1.4" fill="var(--card)" />
        </g>
      ))}
    </svg>
  );
}
