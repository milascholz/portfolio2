"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import CookieButton from "./CookieButton";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/experience", label: "experience" },
];

const SELECTOR_OPTIONS = [1, 7, 38, 13];
const SELECTOR_STORAGE_KEY = "mila-portfolio:selector-cookie";

export default function Sidebar() {
  const pathname = usePathname();
  const [selectorCookie, setSelectorCookie] = useState(SELECTOR_OPTIONS[0]);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const customizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(SELECTOR_STORAGE_KEY);
    const parsed = stored ? parseInt(stored, 10) : NaN;
    if (SELECTOR_OPTIONS.includes(parsed)) {
      setSelectorCookie(parsed);
    }
  }, []);

  useEffect(() => {
    if (!customizeOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (customizeRef.current && !customizeRef.current.contains(event.target as Node)) {
        setCustomizeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [customizeOpen]);

  function selectCookie(n: number) {
    setSelectorCookie(n);
    window.localStorage.setItem(SELECTOR_STORAGE_KEY, String(n));
    setCustomizeOpen(false);
  }

  return (
    <aside className="w-full shrink-0 border border-black bg-white md:w-72 md:sticky md:top-6 md:h-[calc(100vh-3rem)]">
      <div className="flex h-full flex-col justify-between px-7 py-8">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">mila scholz</h1>
            <p className="italic text-black mt-0.5">created to create</p>
          </div>

          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2.5 text-[15px]"
                >
                  <span
                    className={`relative flex h-3.5 w-3.5 items-center justify-center shrink-0 transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  >
                    <Image
                      src={`/images/cookies/cookie-${selectorCookie}.png`}
                      alt=""
                      width={64}
                      height={64}
                      className="h-3.5 w-3.5 object-contain"
                    />
                  </span>
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "font-semibold text-foreground"
                        : "text-foreground/60 group-hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <div ref={customizeRef} className="relative">
              <button
                type="button"
                onClick={() => setCustomizeOpen((v) => !v)}
                className="group flex w-full items-center gap-2.5 text-[15px]"
              >
                <span className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span
                  className={`transition-colors ${
                    customizeOpen
                      ? "text-foreground"
                      : "text-foreground/60 group-hover:text-foreground"
                  }`}
                >
                  customize
                </span>
              </button>

              {customizeOpen && (
                <div className="absolute left-0 top-full z-10 mt-2 flex gap-2 border border-black bg-white p-2 shadow-sm">
                  {SELECTOR_OPTIONS.map((n) => {
                    const isSelected = selectorCookie === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => selectCookie(n)}
                        aria-label={`Use cookie ${n} as the page selector`}
                        aria-pressed={isSelected}
                        className={`relative h-11 w-11 shrink-0 overflow-hidden bg-white transition-colors ${
                          isSelected
                            ? "border-2 border-black"
                            : "border border-black/20 hover:border-black/50"
                        }`}
                      >
                        <Image
                          src={`/images/cookies/cookie-${n}.png`}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-end justify-between">
          <CookieButton />

          <div className="flex items-center gap-4 pb-1">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:milacscholz@gmail.com"
              aria-label="Email"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
