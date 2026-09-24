"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useRegisterProjectNav } from "@/context/ProjectNavContext";

const TAGS = ["Personal Project", "Shipped 2026"];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "design-process", label: "Design Process" },
  { id: "design-decisions", label: "Design Decisions" },
  { id: "exploring-placement", label: "Exploring Placement" },
  { id: "core-flows", label: "Core Flows" },
  { id: "building-it", label: "Building It" },
  { id: "outcome", label: "Outcome" },
  { id: "reflection", label: "Reflection" },
];

const ROLE_DETAILS = [
  { label: "Role", value: "Product Designer + Developer" },
  { label: "Team", value: "Solo" },
  { label: "Timeline", value: "September 2026" },
  { label: "Skills", value: "Product & Interaction Design, Product Scoping, AI-Assisted Development" },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
      {children}
    </p>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-4 max-w-[700px] space-y-4 leading-relaxed text-foreground/70">{children}</div>;
}

function MediaPlaceholder({ type, label }: { type: "Visual" | "Video"; label: string }) {
  return (
    <figure className="mt-6 w-full">
      <div className="flex min-h-[200px] w-full items-center justify-center border border-black/15 bg-black/[0.035] p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/30">
          {type} placeholder
        </span>
      </div>
      <figcaption className="mt-2 text-xs uppercase tracking-widest text-foreground/45">{label}</figcaption>
    </figure>
  );
}

function CaptionPlaceholder({ label }: { label: string }) {
  return (
    <p className="mt-2 max-w-[700px] text-xs italic leading-relaxed text-foreground/40">
      Caption placeholder — {label}
    </p>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[700px] border-l-2 border-black pl-4">
      <p className="leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

function SectionDivider() {
  return <hr className="mt-16 border-t border-black/10" />;
}

type Decision = {
  title: string;
  decision: string;
  why: string;
  rejected?: string;
};

const DECISIONS: Decision[] = [
  {
    title: "Completion threshold: 90% per track",
    decision:
      "A track counts once 90% of it is played. An album completes when every track clears that bar.",
    why: "100% is unrealistic, since songs cut off and outros get skipped. Anything lower lets people skip to the end.",
    rejected:
      "A 100% requirement, and a single threshold for the whole album that would let you skip entire songs.",
  },
  {
    title: "No discs for singles",
    decision: "Only albums earn discs.",
    why: "Singles originally earned discs too, which meant playing one song got you the same badge as sitting through a full record. That made discs easy to collect and cheapened the ones that took real listening. It also missed the point. A single has no sequencing or transitions to appreciate. Limiting discs to albums keeps every disc tied to listening to a full body of work.",
  },
  {
    title: "“In progress” = 3 tracks, not a percentage",
    decision:
      "An album shows as in progress after 3 tracks, capped at the album's length for shorter releases.",
    why: "I started with 30% of tracks listened, but a percentage treats albums unevenly. 30% of a 20-track album is 6 songs, a real commitment. 30% of a 7-track album is 2. Short albums landed on the shelf almost by accident, while long ones took an hour to show up. A fixed count means the same effort gets any album on the shelf, no matter its length.",
    rejected: "Showing every album you've played one song from, since it would clutter the shelf.",
  },
  {
    title: "Discs are private, not social",
    decision: "Friends can't see your discs.",
    why: "Public badges would push people to listen for the badge instead of the music. That's disingenuous for the user and for the artist. It also doesn't match Spotify's core product. Followers exist, but Spotify is built around individual listening, not an audience.",
    rejected: "Shareable disc collections on public profiles.",
  },
  {
    title: "Progress wipe holds at 80%",
    decision:
      "The disc fills clockwise from grayscale to color, but holds at 80% until every track is complete.",
    why: "The wipe originally filled continuously, so an album at 95% looked finished. At a glance, you couldn't tell a nearly done disc from a complete one, and the payoff of finishing disappeared. Holding at 80% leaves a visible gap until the last track is done. The final fill becomes its own moment, and a full disc always means a finished album.",
  },
  {
    title: "One object for every state",
    decision: "No separate loading state. The grayscale disc doubles as “not started.”",
    why: "The same object represents every stage, so nothing swaps in and out and the UI stays calm.",
  },
  {
    title: "Native layouts over custom UI",
    decision:
      "The profile shelves reuse Spotify's existing grid and “Show more” pattern, the same as “Top artists this month” and “Public Playlists.”",
    why: "The feature should read as part of Spotify, not bolted on.",
  },
  {
    title: "Native navigation on “Show all”",
    decision: "“Show all” works as its own page within Spotify.",
    why: "Back and forward still work, which matches how the rest of the app behaves.",
  },
  {
    title: "Filter between in-progress and complete",
    decision: "Filter pills on the “Show all” view.",
    why: "At first, every disc sat on one shelf. As it grew, finished and in-progress albums blurred together, and the collection stopped feeling like a collection. The one thing worth seeing, what you've actually finished, was buried. Filters let you view completed discs on their own, or check what's still in progress when you're picking what to listen to next.",
  },
];

function DecisionCard({ index, decision }: { index: number; decision: Decision }) {
  return (
    <div className="mt-6 w-full max-w-[820px] border border-black bg-white">
      <div className="border-b border-black bg-black px-5 py-3">
        <p className="text-sm font-semibold text-white">
          {String(index + 1).padStart(2, "0")} — {decision.title}
        </p>
      </div>
      <div className="divide-y divide-black/10 px-5">
        <div className="py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Decision</p>
          <p className="mt-1.5 text-base font-medium leading-relaxed text-foreground">{decision.decision}</p>
        </div>
        <div className="py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Why</p>
          <p className="mt-1.5 leading-relaxed text-foreground/70">{decision.why}</p>
        </div>
        {decision.rejected ? (
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/30">Rejected</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/40">{decision.rejected}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type ProcessStep = {
  title: string;
  visualLabel: string;
  captionLabel: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "1. Sketches",
    visualLabel: "Hand sketches",
    captionLabel: "what you were figuring out on paper, e.g. badge placement, disc shape",
  },
  {
    title: "2. Functional MVP",
    visualLabel: "Barebones build",
    captionLabel:
      "completion tracking working, no visual design yet. Proved the core rule before styling it.",
  },
  {
    title: "3. Designed",
    visualLabel: "First styled version",
    captionLabel: "what you added, e.g. the CD with album art, the wipe, native layouts",
  },
  {
    title: "4. Final",
    visualLabel: "Final version",
    captionLabel: "what changed after daily use. Point to the decisions below.",
  },
];

type PlacementOption = {
  title: string;
  verdict: "Chosen" | "Rejected";
  body: string;
};

const PLACEMENT_OPTIONS: PlacementOption[] = [
  {
    title: "Search results",
    verdict: "Rejected",
    body: "A disc beside every album was too messy on a screen built for finding music.",
  },
  {
    title: "Library lists",
    verdict: "Rejected",
    body: "Same problem. The signal gets diluted when it's everywhere the album appears.",
  },
  {
    title: "Album page, beside the play button",
    verdict: "Chosen",
    body: "This ties the badge to the moment of listening, and it sits where your eye already goes when you open a record.",
  },
];

function PlacementCard({ option }: { option: PlacementOption }) {
  const isChosen = option.verdict === "Chosen";
  return (
    <div
      className={`mt-4 max-w-[700px] border p-4 ${
        isChosen ? "border-black bg-white" : "border-black/15 bg-black/[0.015]"
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-2">
        <p className={isChosen ? "font-medium text-foreground" : "text-sm font-medium text-foreground/45"}>
          {option.title}
        </p>
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            isChosen ? "text-foreground" : "text-foreground/35"
          }`}
        >
          {option.verdict}
        </span>
      </div>
      <p className={`mt-1.5 leading-relaxed ${isChosen ? "text-foreground/70" : "text-sm text-foreground/40"}`}>
        {option.body}
      </p>
    </div>
  );
}

export default function DiscifyPage() {
  useRegisterProjectNav("discify", SECTIONS);

  return (
    <div>
      <video
        className="aspect-[40/9] w-full border border-black object-cover"
        src={`${BASE_PATH}/videos/discify-showcase.mp4`}
        poster={`${BASE_PATH}/images/discify-poster.jpg`}
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

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">discify</h1>
        <p className="mt-3 max-w-[700px] leading-relaxed text-foreground/70">
          Spotify extension gamifying album listens
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
            A Spicetify extension that rewards listening to a full Spotify album.
          </h2>
          <Prose>
            <p>
              Listen to an album start to finish and you earn a CD badge with the album art on it. Badges
              live on the album page and on your profile, and progress updates in real time as you listen.
            </p>
          </Prose>
        </section>

        <SectionDivider />

        {/* Problem */}
        <section id="problem" className="mt-16 scroll-mt-8">
          <Eyebrow>Problem</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Spotify has no concept of finishing an album.
          </h2>
          <Prose>
            <p>
              Skip through half a tracklist and it counts the same as a full listen. Spotify keeps no
              record of the difference between background noise and sitting with a record.
            </p>
          </Prose>

          <h2 className="mt-10 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Most listeners never hear an album the way the artist sequenced it.
          </h2>
          <Prose>
            <p>
              I noticed I only finished albums on car rides with a friend, playing new releases from
              Ariana Grande and Gracie Abrams. On my own, I shuffled and skipped. That means missing
              deliberate transitions, recurring themes, and the craft that goes into ordering a tracklist.
            </p>
          </Prose>

          <div className="mt-6">
            <Callout>
              <span className="font-semibold">Goal:</span> give people a reason to listen to full albums,
              for their own sake, not for engagement.
            </Callout>
          </div>
        </section>

        <SectionDivider />

        {/* Solution */}
        <section id="solution" className="mt-16 scroll-mt-8">
          <Eyebrow>Solution</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Collectible discs, earned by actually listening.
          </h2>
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>Every album gets a disc that fills with color as you listen</li>
              <li>It completes only when every track is actually played</li>
              <li>Discs are collected on a private shelf on your profile</li>
              <li>In-progress albums show up once you've made a real start</li>
            </ul>
          </Prose>
          <MediaPlaceholder type="Visual" label="Album page disc + profile shelf" />
        </section>

        <SectionDivider />

        {/* Design Process */}
        <section id="design-process" className="mt-16 scroll-mt-8">
          <Eyebrow>Design Process</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            From paper sketch to working MVP to designed product.
          </h2>
          <Prose>
            <p>
              The concept was clear early, so I sketched the key screens by hand and went straight to
              building. I got the core logic working first, then designed on top of it. The working
              extension became my prototype. I used it daily and changed anything that didn't hold up in
              real use.
            </p>
          </Prose>

          {PROCESS_STEPS.map((step) => (
            <div key={step.title}>
              <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
                {step.title}
              </h3>
              <MediaPlaceholder type="Visual" label={step.visualLabel} />
              <CaptionPlaceholder label={step.captionLabel} />
            </div>
          ))}
        </section>

        <SectionDivider />

        {/* Design Decisions */}
        <section id="design-decisions" className="mt-16 scroll-mt-8">
          <Eyebrow>Design Decisions</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Every rule is a choice about what counts as really listening.
          </h2>
          {DECISIONS.map((decision, index) => (
            <div key={decision.title}>
              <DecisionCard index={index} decision={decision} />
              {index === 4 ? (
                <MediaPlaceholder type="Visual" label="Old vs. new wipe at ~95%" />
              ) : null}
            </div>
          ))}
        </section>

        <SectionDivider />

        {/* Exploring Placement */}
        <section id="exploring-placement" className="mt-16 scroll-mt-8">
          <Eyebrow>Exploring Placement</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Where should a disc appear?
          </h2>
          <div className="mt-2">
            {PLACEMENT_OPTIONS.map((option) => (
              <PlacementCard key={option.title} option={option} />
            ))}
          </div>
          <MediaPlaceholder type="Visual" label="Search mockup (rejected) vs. album page (chosen)" />
        </section>

        <SectionDivider />

        {/* Core Flows */}
        <section id="core-flows" className="mt-16 scroll-mt-8">
          <Eyebrow>Core Flows</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Three places discs show up.
          </h2>

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Album page
          </h3>
          <Prose>
            <p>
              A mini disc sits beside the play button. Hover and it spins, and a toast shows the percent
              listened. Click and a breakdown shows which tracks you've heard and which you haven't.
            </p>
          </Prose>
          <MediaPlaceholder type="Video" label="Album page hover + click breakdown" />

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">Profile</h3>
          <Prose>
            <p>
              Two new sections sit near the follower count and beneath Public Playlists, with one shared
              shelf captioned "X collected · X in progress."
            </p>
          </Prose>
          <MediaPlaceholder type="Video" label="Profile shelf" />

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Show all
          </h3>
          <Prose>
            <p>A dedicated view with filter pills to switch between in-progress and complete discs.</p>
          </Prose>
          <MediaPlaceholder type="Video" label="Show all + filters" />
        </section>

        <SectionDivider />

        {/* Building It */}
        <section id="building-it" className="mt-16 scroll-mt-8">
          <Eyebrow>Building It</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Built with Claude Code, on a product I don't control.
          </h2>
          <Prose>
            <p>
              I directed the build with Claude Code, testing each step before moving on. Spicetify only
              lets you modify Spotify's existing UI, so every addition had to survive Spotify's own
              updates and still feel native.
            </p>
          </Prose>
        </section>

        <SectionDivider />

        {/* Outcome */}
        <section id="outcome" className="mt-16 scroll-mt-8">
          <Eyebrow>Outcome</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Shipped and in daily use.
          </h2>
          <Prose>
            <p>
              <span className="font-semibold text-foreground">Shipped:</span> completion tracking, the
              album page badge with hover and click detail, and profile shelves with filtering.
            </p>
            <p>
              <span className="font-semibold text-foreground">Next:</span> a Wrapped-style yearly recap of
              completed albums.
            </p>
          </Prose>
        </section>

        <SectionDivider />

        {/* Reflection */}
        <section id="reflection" className="mt-16 scroll-mt-8">
          <Eyebrow>Reflection</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            What I learned
          </h2>

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Designing inside someone else's product means designing to disappear.
          </h3>
          <Prose>
            <p>
              The best compliment for discify is that it looks like Spotify made it. That meant reusing
              their patterns instead of inventing my own.
            </p>
          </Prose>

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Knowing what the product is for makes the hard calls easy.
          </h3>
          <Prose>
            <p>Making discs social would have boosted engagement and hurt the point of the product.</p>
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
