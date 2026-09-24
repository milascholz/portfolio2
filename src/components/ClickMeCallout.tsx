// A speech-bubble-style callout drawn as a single SVG path, so the box and
// its pointer tail share one continuous fill and stroke instead of being
// two overlapping shapes with a seam between them.
export default function ClickMeCallout({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 84 34"
      width={84}
      height={34}
      className={`block drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 2 H82 V25 H50 L42 33 L34 25 H2 Z"
        fill="white"
        stroke="black"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <text
        x={42}
        y={14.5}
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-sans text-xs"
        fill="black"
      >
        click me!
      </text>
    </svg>
  );
}
