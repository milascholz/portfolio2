// A small chevron pointer ("^" / "v") for speech-bubble-style callouts —
// two open lines meeting at a point, no base line closing them off.
// `direction` controls which way the point faces: "up" for a callout
// sitting below its anchor, "down" for one sitting above it.
export default function CalloutTail({
  direction,
  className = "",
}: {
  direction: "up" | "down";
  className?: string;
}) {
  const isUp = direction === "up";
  return (
    <div className={`relative h-[7px] w-[14px] ${className}`}>
      {/* Erases the segment of the anchored box's border directly behind
          the tail, so the box's border reads as two pieces that the
          tail's own strokes seamlessly continue, instead of the border
          showing through the open gap between the two strokes. */}
      <div className={`absolute inset-x-0 h-[3px] bg-white ${isUp ? "-bottom-px" : "-top-px"}`} />
      <div
        className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-black ${
          isUp ? "top-[2px] border-l border-t" : "bottom-[2px] border-b border-r"
        }`}
      />
    </div>
  );
}
