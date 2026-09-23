"use client";

import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useRegisterProjectNav } from "@/context/ProjectNavContext";

const TAGS = ["Robotics"];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "approach", label: "Approach" },
  { id: "highlights", label: "Highlights" },
];

const ROLE_DETAILS = [
  { label: "Role", value: "Coming soon" },
  { label: "Team", value: "Coming soon" },
  { label: "Timeline", value: "Coming soon" },
  { label: "Skills", value: "Coming soon" },
];

export default function HumanoidRobotArmAssemblyPage() {
  useRegisterProjectNav("Humanoid Robot Arm Assembly", SECTIONS);

  return (
    <div>
      <video
        className="aspect-[40/9] w-full border border-black object-cover"
        src={`${BASE_PATH}/videos/humanoid-robot-arm-assembly.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      <div className="mx-auto w-full p-6 md:p-10 lg:p-12">
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="border border-black px-2 py-1 text-xs font-medium uppercase tracking-wide text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          Humanoid Robot Arm Assembly
        </h1>
        <p className="mt-3 leading-relaxed text-foreground/70">
          This case study is coming soon.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 border border-black bg-black p-6 text-white sm:grid-cols-4">
          {ROLE_DETAILS.map((detail) => (
            <div key={detail.label}>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                {detail.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white">{detail.value}</p>
            </div>
          ))}
        </div>

        <section id="overview" className="mt-14 scroll-mt-8">
          <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
          <p className="mt-3 leading-relaxed text-foreground/70">
            This is a placeholder for the project overview. Summarize the
            problem, goals, and approach here.
          </p>
        </section>

        <section id="approach" className="mt-14 scroll-mt-8">
          <h2 className="text-2xl font-semibold text-foreground">Approach</h2>
          <p className="mt-3 leading-relaxed text-foreground/70">
            This is a placeholder for the approach section. Walk through the
            design, engineering, and build process here.
          </p>
        </section>

        <section id="highlights" className="mt-14 scroll-mt-8">
          <h2 className="text-2xl font-semibold text-foreground">Highlights</h2>
          <p className="mt-3 leading-relaxed text-foreground/70">
            This is a placeholder for highlights. Show off key moments,
            results, or standout details here.
          </p>
        </section>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/55 hover:text-foreground"
        >
          ← back to projects
        </Link>
      </div>
    </div>
  );
}
