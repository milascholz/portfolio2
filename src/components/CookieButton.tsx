"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";

type Bite = { cx: number; cy: number; r: number };

const MAX_BITES = 4;
const COOKIE_RADIUS = 41; // the cookie's edge, as a % of the container
const BITE_RADIUS = 17; // % of the container
const BITE_DEPTH = 0.92; // how far inside the edge the bite center sits

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
  const imageRef = useRef<HTMLDivElement>(null);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      if (popTimeout.current) clearTimeout(popTimeout.current);
    };
  }, []);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setIsPopping(true);
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
    !isFullyEaten && bites.length > 0
      ? bites
          .map(
            (b) =>
              `radial-gradient(circle at ${b.cx}% ${b.cy}%, transparent 0, transparent ${b.r}%, black ${b.r}%)`
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
          ...(bites.length > 1
            ? { maskComposite: "intersect", WebkitMaskComposite: "intersect" }
            : {}),
        }
      : {}),
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="A cookie — click to take a bite"
      className="block w-20 shrink-0 focus:outline-none"
    >
      <div ref={imageRef} className="relative aspect-square" style={style}>
        <Image
          src={cookieSrc}
          alt="A cookie"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>
    </button>
  );
}
