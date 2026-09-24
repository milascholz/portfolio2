import type { ReactNode } from "react";

// A dropdown-style callout drawn as a single SVG path (box + pointer tail),
// so the border is continuous instead of two overlapping shapes with a seam
// where the tail meets the box.
export default function CalloutBox({
  width,
  height,
  tailCenterX,
  tailWidth = 14,
  tailHeight = 8,
  padding = 8,
  className = "",
  contentClassName = "",
  children,
}: {
  width: number;
  height: number;
  tailCenterX: number;
  tailWidth?: number;
  tailHeight?: number;
  padding?: number;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  const totalHeight = height + tailHeight;
  const half = tailWidth / 2;
  const d = `M1 ${tailHeight + 1} L${tailCenterX - half} ${tailHeight + 1} L${tailCenterX} 1 L${
    tailCenterX + half
  } ${tailHeight + 1} H${width - 1} V${totalHeight - 1} H1 Z`;

  return (
    <div className={`relative ${className}`} style={{ width, height: totalHeight }}>
      <svg
        className="absolute inset-0 drop-shadow-sm"
        width={width}
        height={totalHeight}
        viewBox={`0 0 ${width} ${totalHeight}`}
        aria-hidden="true"
      >
        <path d={d} fill="white" stroke="black" strokeWidth={1} strokeLinejoin="round" />
      </svg>
      <div
        className={`relative flex ${contentClassName}`}
        style={{ paddingTop: tailHeight + padding, paddingBottom: padding, paddingLeft: padding, paddingRight: padding }}
      >
        {children}
      </div>
    </div>
  );
}
