"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useRegisterProjectNav } from "@/context/ProjectNavContext";

const TAGS = ["Independent Review", "2026"];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "key-findings", label: "Key Findings" },
  { id: "framing-feedback", label: "Framing Feedback" },
  { id: "outcome", label: "Outcome" },
  { id: "reflection", label: "Reflection" },
];

const ROLE_DETAILS = [
  { label: "Role", value: "Independent Reviewer" },
  { label: "Team", value: "Solo" },
  { label: "Timeline", value: "July 2026" },
  { label: "Skills", value: "Heuristic Review" },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">{children}</p>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-4 max-w-[700px] space-y-4 leading-relaxed text-foreground/70">{children}</div>;
}

function MediaPlaceholder({ type, label }: { type: "Visual" | "Video"; label: string }) {
  return (
    <figure className="mt-6 flex min-h-[200px] w-full flex-col items-center justify-center gap-2 border border-black/15 bg-black/[0.035] p-8 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/30">
        {type} placeholder
      </span>
      <figcaption className="text-xs uppercase tracking-widest text-foreground/45">{label}</figcaption>
    </figure>
  );
}

function SectionDivider() {
  return <hr className="mt-16 border-t border-black/10" />;
}

type Finding = {
  title: string;
  body: string;
  fix: string;
  visual: string;
};

const FINDINGS: Finding[] = [
  {
    title: "False affordances",
    body: "The “Submit” button on the home page and the “Export” button on the product page have shadows, hover states, and click animations, but neither does anything. I tried to click both. Every other graphic on the page is static, so these two set an expectation the site doesn't meet.",
    fix: "Remove the interactive states from demo UI, or make it actually work.",
    visual: "Submit / Export buttons with hover states, neither functional",
  },
  {
    title: "Hidden interactions on mobile",
    body: "I first visited on my phone and couldn't tell the product tables scrolled sideways. The tables were also cut off at the bottom of their cards. This matters most on the home page, where those tables are the product demo.",
    fix: "Add a scrollbar or other visual cue, and adjust card spacing.",
    visual: "Mobile product table cut off, no scroll cue",
  },
  {
    title: "Content that's hard to scan",
    body: "Every “Mesh vs X” blog post uses the same blue gradient banner, so you can't tell the posts apart at a glance. On the unfiltered blog page, the same posts appear twice: once under “All” and again under “How Mesh Compares.”",
    fix: "Give each banner the competitor's actual logo (I mocked one up). Hide the “How Mesh Compares” section on the unfiltered view but keep it on the filtered ones, where it still does its marketing job.",
    visual: "Blog banner redesign mockup with competitor logo",
  },
  {
    title: "Inconsistency and polish",
    body: "The blog's table of contents highlights where you are in the post, but the privacy policy's doesn't. The sticky filter bar on the blog is see-through on desktop. The mobile header jumps on first scroll. And some mobile components wrap unevenly: squished integration cards, stat labels, a two-line “Save & continue” button.",
    fix: "Reuse the blog's table of contents everywhere, make the filter bar opaque, and tighten mobile copy and layout.",
    visual: "Mobile polish issues — transparent filter bar, header jump, squished cards",
  },
];

function FindingCard({ index, finding }: { index: number; finding: Finding }) {
  return (
    <div className="mt-6 w-full max-w-[820px] border border-black bg-white">
      <div className="border-b border-black bg-black px-5 py-3">
        <p className="text-sm font-semibold text-white">
          {String(index + 1).padStart(2, "0")} — {finding.title}
        </p>
      </div>
      <div className="divide-y divide-black/10 px-5">
        <div className="py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Finding</p>
          <p className="mt-1.5 leading-relaxed text-foreground/70">{finding.body}</p>
        </div>
        <div className="py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Fix</p>
          <p className="mt-1.5 text-base font-medium leading-relaxed text-foreground">{finding.fix}</p>
        </div>
      </div>
    </div>
  );
}

type ApproachStep = { label: string };

const APPROACH_STEPS: ApproachStep[] = [
  { label: "Walked every page (yes, even the privacy policies!) on desktop, then again on an iPhone" },
  { label: "Screenshotted and annotated each issue at the moment I hit it" },
  { label: "For each issue, named the problem, why it mattered, and a specific fix" },
  { label: "Called out what was working, so the team knew what to keep" },
];

type FramingPoint = {
  title: string;
  body: string;
};

const FRAMING_POINTS: FramingPoint[] = [
  {
    title: "Led with what worked.",
    body: "The first point is praise for the hero: the rotating blue text, the animated product preview, and the cursor revealing the grid. Specific praise shows you actually used the product. It also tells the team what not to break.",
  },
  {
    title: "Showed every issue.",
    body: "Each point has an annotated screenshot, and the banner redesign has a mockup. A founder can check any claim in seconds without reproducing it.",
  },
  {
    title: "Understood the intent before critiquing.",
    body: "I didn't just call the duplicate blog section redundant. I recognized that “How Mesh Compares” is there to market the product on filtered pages, and scoped my fix so it keeps that job.",
  },
  {
    title: "Tested where users actually are.",
    body: "Half the findings only show up on mobile. A desktop-only review would have missed the most important one.",
  },
];

export default function MeshPage() {
  useRegisterProjectNav("Mesh UI/UX Website Review", SECTIONS);

  return (
    <div>
      <video
        className="aspect-[40/9] w-full border border-black object-cover"
        src={`${BASE_PATH}/videos/mesh.mp4`}
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
          Mesh UI/UX Website Review
        </h1>
        <p className="mt-3 max-w-[700px] leading-relaxed text-foreground/70">
          An unsolicited UI/UX review of Mesh&apos;s (YC W25) new website, submitted for an open LinkedIn
          feedback call.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 border border-black bg-black p-6 text-white sm:grid-cols-4">
          {ROLE_DETAILS.map((detail) => (
            <div key={detail.label}>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">{detail.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section id="overview" className="mt-16 scroll-mt-8">
          <Eyebrow>Overview</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Mesh automates month-end accruals for finance teams.
          </h2>
          <Prose>
            <p>
              It collects the missing vendor data, runs the team&apos;s existing accrual policies, and
              generates journal entries with a full audit trail. When they launched a new website,
              co-founder and CEO Erin Kim posted on LinkedIn asking for feedback. I sent a 12-point
              annotated review as a PDF.
            </p>
          </Prose>
          <div className="mt-6 overflow-hidden border border-black/15 bg-black/[0.035] px-8 pt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/images/mesh-linkedin-call.png`}
              alt="Erin Kim's LinkedIn post announcing Mesh's new website and asking for feedback"
              className="mx-auto w-full max-w-[560px] rounded-t-xl border border-b-0 border-black/10 shadow-sm"
            />
          </div>
        </section>

        <SectionDivider />

        {/* Problem */}
        <section id="problem" className="mt-16 scroll-mt-8">
          <Eyebrow>Problem</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Mesh sells trust.
          </h2>
          <Prose>
            <p>
              Its pitch to controllers is that every number is traceable and nothing happens without
              review. So the website has to feel precise too. A button that looks clickable but does
              nothing, or a table that&apos;s cut off on mobile, works against that pitch before anyone
              books a demo.
            </p>
          </Prose>
        </section>

        <SectionDivider />

        {/* Approach */}
        <section id="approach" className="mt-16 scroll-mt-8">
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            I went through the site as a first-time visitor on both desktop and mobile.
          </h2>
          <Prose>
            <p>
              I noted every spot where I hesitated, misread something, or had to work out what to do
              next.
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              {APPROACH_STEPS.map((step) => (
                <li key={step.label}>{step.label}</li>
              ))}
            </ol>
          </Prose>
          <MediaPlaceholder type="Visual" label="Example annotated screenshot from the PDF review" />
        </section>

        <SectionDivider />

        {/* Key Findings */}
        <section id="key-findings" className="mt-16 scroll-mt-8">
          <Eyebrow>Key Findings</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            I grouped the 12 points into four themes.
          </h2>
          {FINDINGS.map((finding, index) => (
            <div key={finding.title}>
              <FindingCard index={index} finding={finding} />
              <MediaPlaceholder type="Visual" label={finding.visual} />
            </div>
          ))}
        </section>

        <SectionDivider />

        {/* Framing Feedback */}
        <section id="framing-feedback" className="mt-16 scroll-mt-8">
          <Eyebrow>Framing Feedback</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Framing Feedback
          </h2>

          {FRAMING_POINTS.map((point, index) => (
            <div key={point.title}>
              <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
                {point.title}
              </h3>
              <Prose>
                <p>{point.body}</p>
              </Prose>
              {index === 0 ? (
                <MediaPlaceholder type="Visual" label="Annotated hero screenshot with praise callout" />
              ) : null}
            </div>
          ))}

          <div className="mt-10 w-full max-w-[700px] border border-black/15 bg-black/[0.035] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
              Full Annotated Review (PDF)
            </p>
            <iframe
              src={`${BASE_PATH}/files/mesh-website-feedback.pdf#page=2&toolbar=0&navpanes=0`}
              title="Mesh website feedback — full annotated PDF review"
              className="mt-4 aspect-[4/3] w-full border border-black/10"
            />
          </div>
        </section>

        <SectionDivider />

        {/* Outcome */}
        <section id="outcome" className="mt-16 scroll-mt-8">
          <Eyebrow>Outcome</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Erin replied: “This is the best feedback I&apos;ve received in a long time.”
          </h2>
          <Prose>
            <p>[Swag / follow-up / any changes shipped]</p>
          </Prose>
        </section>

        <SectionDivider />

        {/* Reflection */}
        <section id="reflection" className="mt-16 scroll-mt-8">
          <Eyebrow>Reflection</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            I organized the PDF by page because that&apos;s how I moved through the site.
          </h2>
          <Prose>
            <p>
              Looking back, I&apos;d order it by severity. The false affordances and mobile scrolling
              affect whether someone understands the product, while the button heights are just polish. A
              founder reading top to bottom should hit the biggest problems first. [Next time I&apos;d
              also…]
            </p>
          </Prose>
        </section>

        <Link
          href="/"
          className="mt-16 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/55 hover:text-foreground"
        >
          ← back to projects
        </Link>
      </div>
    </div>
  );
}
