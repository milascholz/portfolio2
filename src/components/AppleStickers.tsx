"use client";

import { useState } from "react";
import Image from "next/image";
import { stickers } from "@/data/stickers";

const SHAPE_CLASS: Record<string, string> = {
  circle: "rounded-full",
  badge: "rounded-2xl",
  blob: "rounded-[45%_55%_60%_40%/45%_40%_60%_55%]",
  star: "",
};

const STAR_CLIP =
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

export default function AppleStickers() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[220px] aspect-square">
      <Image
        src="/images/apple.png"
        alt="A red apple decorated with sticker badges"
        fill
        sizes="220px"
        className="object-contain drop-shadow-md"
      />

      {stickers.map((sticker) => {
        const isActive = activeId === sticker.id;
        return (
          <div
            key={sticker.id}
            className={`absolute ${isActive ? "z-30" : "z-10"}`}
            style={{ top: sticker.top, left: sticker.left }}
          >
            <button
              type="button"
              onMouseEnter={() => setActiveId(sticker.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(sticker.id)}
              onBlur={() => setActiveId(null)}
              className={`flex items-center justify-center font-nav font-bold shadow-md ring-2 ring-white/80 transition-transform hover:scale-110 focus:scale-110 focus:outline-none ${
                SHAPE_CLASS[sticker.shape]
              }`}
              style={{
                width: sticker.size,
                height: sticker.size,
                background: sticker.color,
                color: sticker.textColor,
                transform: `rotate(${sticker.rotate})`,
                clipPath: sticker.shape === "star" ? STAR_CLIP : undefined,
                fontSize: sticker.size * 0.26,
              }}
              aria-label={sticker.hoverText}
            >
              {sticker.label}
            </button>

            <div
              role="tooltip"
              className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[160px] -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1.5 text-center text-xs font-medium text-background shadow-lg transition-all duration-150 ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}
            >
              {sticker.hoverText}
            </div>
          </div>
        );
      })}
    </div>
  );
}
