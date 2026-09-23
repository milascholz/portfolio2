"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { incrementCookieClicks } from "@/lib/cookie-counter";
import CalloutTail from "./CalloutTail";

type Bite = { cx: number; cy: number; r: number };
type BiteCircle = { cx: number; cy: number; r: number };

const MAX_BITES = 4;
const COOKIE_RADIUS = 41; // the cookie's edge, as a % of the container
const BITE_RADIUS = 24; // % of the container
const BITE_DEPTH = 0.92; // how far inside the edge the bite center sits
const CLICK_HINT_DELAY_MS = 10000;

// A bite is rendered as a cluster of overlapping circles (a core plus
// bumps around it) instead of one smooth circle, so its edge reads as a
// ragged, bitten-into shape rather than a perfect hole.
const BITE_LOBES = 9;
const BITE_CORE_RATIO = 0.62;
const BITE_LOBE_RATIO = 0.48;
const BITE_LOBE_DISTANCE_RATIO = 0.68;

function biteCircles(bite: Bite): BiteCircle[] {
  const circles: BiteCircle[] = [
    { cx: bite.cx, cy: bite.cy, r: bite.r * BITE_CORE_RATIO },
  ];
  for (let i = 0; i < BITE_LOBES; i++) {
    const angle = (i / BITE_LOBES) * Math.PI * 2 + bite.cx * 0.13;
    const wobble = 0.85 + 0.3 * Math.sin(i * 2.4 + bite.cy);
    circles.push({
      cx: bite.cx + Math.cos(angle) * bite.r * BITE_LOBE_DISTANCE_RATIO,
      cy: bite.cy + Math.sin(angle) * bite.r * BITE_LOBE_DISTANCE_RATIO,
      r: bite.r * BITE_LOBE_RATIO * wobble,
    });
  }
  return circles;
}

// Only the cookie numbers that actually exist in public/images/cookies —
// keep this in sync if images are added or removed there.
const COOKIE_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 31, 32, 33, 34, 36, 37,
  38, 39, 40, 42, 43, 44, 45,
];

const COOKIE_IMAGES = COOKIE_NUMBERS.map((n) => `/images/cookies/cookie-${n}.png`);

function nextRandomCookie(current: string) {
  if (COOKIE_IMAGES.length <= 1) return current;
  let next = current;
  while (next === current) {
    next = COOKIE_IMAGES[Math.floor(Math.random() * COOKIE_IMAGES.length)];
  }
  return next;
}

export default function CookieButton() {
  const [cookieSrc, setCookieSrc] = useState(COOKIE_IMAGES[0]);
  const [bites, setBites] = useState<Bite[]>([]);
  const [isPopping, setIsPopping] = useState(false);
  const [showClickHint, setShowClickHint] = useState(false);
  const [clickCount, setClickCount] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasClickedRef = useRef(false);

  useEffect(() => {
    const hintTimeout = setTimeout(() => {
      if (!hasClickedRef.current) setShowClickHint(true);
    }, CLICK_HINT_DELAY_MS);
    return () => clearTimeout(hintTimeout);
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      if (popTimeout.current) clearTimeout(popTimeout.current);
    };
  }, []);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    hasClickedRef.current = true;
    setShowClickHint(false);
    setIsPopping(true);
    incrementCookieClicks()
      .then((count) => setClickCount(count))
      .catch(() => {});
    if (popTimeout.current) clearTimeout(popTimeout.current);
    popTimeout.current = setTimeout(() => setIsPopping(false), 180);

    const rect = imageRef.current?.getBoundingClientRect();
    let ux = 1;
    let uy = 0;
    if (rect && rect.width > 0 && rect.height > 0) {
      const clickXPct = ((event.clientX - rect.left) / rect.width) * 100;
      const clickYPct = ((event.clientY - rect.top) / rect.height) * 100;
      const dx = clickXPct - 50;
      const dy = clickYPct - 50;
      const len = Math.hypot(dx, dy);
      if (len > 2) {
        ux = dx / len;
        uy = dy / len;
      }
    }

    const newBite: Bite = {
      cx: 50 + ux * COOKIE_RADIUS * BITE_DEPTH,
      cy: 50 + uy * COOKIE_RADIUS * BITE_DEPTH,
      r: BITE_RADIUS,
    };

    setBites((prev) => {
      const next = [...prev, newBite].slice(0, MAX_BITES);
      if (next.length >= MAX_BITES) {
        if (resetTimeout.current) clearTimeout(resetTimeout.current);
        resetTimeout.current = setTimeout(() => {
          setCookieSrc((current) => nextRandomCookie(current));
          setBites([]);
        }, 500);
      }
      return next;
    });
  }

  const isFullyEaten = bites.length >= MAX_BITES;

  const maskImage =
    bites.length > 0
      ? bites
          .flatMap(biteCircles)
          .map(
            (c) =>
              `radial-gradient(circle at ${c.cx}% ${c.cy}%, transparent 0, transparent ${c.r}%, black ${c.r}%)`
          )
          .join(", ")
      : undefined;

  const style: CSSProperties = {
    transform: `scale(${isPopping ? 0.97 : 1})`,
    opacity: isFullyEaten ? 0 : 1,
    transition: "transform 180ms ease-out, opacity 200ms ease-out",
    ...(maskImage
      ? {
          maskImage,
          WebkitMaskImage: maskImage,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskComposite: "intersect",
          WebkitMaskComposite: "intersect",
        }
      : {}),
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="A cookie — click to take a bite"
      className="relative block w-20 shrink-0 focus:outline-none"
    >
      <div ref={imageRef} className="relative aspect-square" style={style}>
        <Image
          src={`${BASE_PATH}${cookieSrc}`}
          alt="A cookie"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      <div
        className={`mt-1 h-[14px] whitespace-nowrap text-left text-[10px] leading-[14px] text-black/60 ${
          clickCount !== null ? "visible" : "invisible"
        }`}
      >
        {clickCount !== null ? `${clickCount.toLocaleString()} all time cookie clicks` : null}
      </div>

      <div
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 flex -translate-x-1/2 flex-col items-center pb-2 transition-opacity duration-300 ${
          showClickHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="-mb-px whitespace-nowrap border border-black bg-white px-2 py-1 text-xs shadow-sm">
          click me!
        </div>
        <CalloutTail direction="down" />
      </div>
    </button>
  );
}
