"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import AppleStickers from "./AppleStickers";

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
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/experience", label: "experience" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 bg-sidebar text-sidebar-foreground md:w-80 md:min-h-screen md:sticky md:top-0">
      <div className="flex flex-col gap-8 px-8 py-10">
        <div>
          <Image
            src="/images/name-rhinestone.png"
            alt="Mila Scholz"
            width={1679}
            height={298}
            priority
            className="w-full max-w-[260px] h-auto -ml-1"
          />
          <p className="font-script text-2xl text-ruby-dark italic mt-1">
            created to create
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 font-nav text-lg tracking-wide"
              >
                <span
                  className={`relative flex h-4 w-4 items-center justify-center shrink-0 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src="/images/gemstone.png"
                    alt=""
                    width={40}
                    height={40}
                    className="h-4 w-4 object-contain"
                  />
                </span>
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-ruby font-semibold"
                      : "text-sidebar-foreground/70 group-hover:text-ruby-dark"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4">
          <AppleStickers />

          <div className="flex items-center gap-4 pl-1">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-sidebar-foreground/70 hover:text-ruby transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:milacscholz@gmail.com"
              aria-label="Email"
              className="text-sidebar-foreground/70 hover:text-ruby transition-colors"
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
