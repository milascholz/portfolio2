"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useRegisterProjectNav } from "@/context/ProjectNavContext";

const TAGS = ["Engineering Design & Manufacturing", "2026"];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "robot-at-a-glance", label: "The Robot" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "design-decisions", label: "Design Decisions" },
  { id: "reflection", label: "Reflection" },
];

const ROLE_DETAILS = [
  { label: "Role", value: "Arm Subsystem — Shoulder & Hands" },
  { label: "Team", value: "16 students, 6 subsystems" },
  { label: "Timeline", value: "March – September 2026" },
  { label: "Skills", value: "SolidWorks, FDM 3D Printing (PLA → PETG)" },
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

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[700px] border-l-2 border-black pl-4">
      <p className="leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
type Decision = {
  title: string;
  decision: string;
  why: string;
};

const DECISIONS: Decision[] = [
  {
    title: "One off-the-shelf bolt instead of a custom axle",
    decision:
      "A standard half-inch bolt handles fastening, rotation, and load-bearing in a single part.",
    why: "There's nothing to machine, and it's cheap and easy to replace.",
  },
  {
    title: "Set once, not motorized",
    decision: "The shoulder locks by hand before class instead of being motorized.",
    why: "The shoulder only needs adjusting before class, not during it. Locking it by hand removed a motor, driver, and control code from every arm, and left the budget for the elbow, where students actually see the motion.",
  },
  {
    title: "An indexing plunger for a positive lock",
    decision: "A spring-loaded indexing plunger drops into one of five holes to set the angle.",
    why: "A friction or clamp joint could hit any angle, but it can slip under load. Discrete holes lock solidly and repeatably, so “position 3” means the same thing every time.",
  },
  {
    title: "Swappable hands instead of actuated ones",
    decision:
      "Fixed, posed hands attach through a quick-swap bayonet mount instead of actuated fingers.",
    why: "Fixed, posed hands on a quick-swap mount get most of the expressive value of moving fingers at a fraction of the cost and complexity. The shared interface also means new hands can be designed and added later.",
  },
  {
    title: "Designed for the printer, not just the render",
    decision:
      "Chamfered bottom edges, teardrop-shaped holes, and chamfered heat-set insert holes, baked into every part.",
    why: "So parts could come off the printer ready to assemble, without failed prints or rework.",
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
      </div>
    </div>
  );
}

type ReflectionPoint = {
  title: string;
  body: string;
};

const REFLECTION_POINTS: ReflectionPoint[] = [
  {
    title: "Design for how it's made, not just how it works.",
    body: "A part can be correct in CAD and still fail on the printer. The first layer of an FDM print flares outward (elephant's foot), so a small chamfer on the bottom edges keeps parts flat and fitting. Horizontal holes sag under the weight of the layers printed above them, so modelling them as teardrops keeps them round. None of this shows up in a render, and all of it decides whether the part actually works.",
  },
  {
    title: "Validate before you print.",
    body: "For part of this project I was working remotely, so I couldn't check a part in person once it was printed. Each design had to be right before it went to the printer, which meant checking clearances and interference in CAD, reasoning through how the part would print (overhangs, first-layer flare, hole sag), and thinking through assembly step by step. It was frustrating to learn this after an 11-hour print had already finished, but the lesson stuck: find out you're wrong while it's still cheap. The same applies to product work, where testing assumptions early costs far less than rebuilding after launch.",
  },
  {
    title: "Building my first locking mechanism.",
    body: "I'd never designed a printed locking mechanism before the bayonet. Getting it to hold the hand securely and still twist on and off by hand took several design iterations, and each round of print feedback shaped the next version.",
  },
  {
    title: "Designing for someone else to build.",
    body: "This was the first project where I took a part from a mechanical requirement (“hold the arm, rotate, lock, stay cheap”) to a design someone else could print and assemble without me in the room. That meant my CAD had to carry everything: the fits, the print settings baked into the geometry, and the assembly logic. That kind of handoff is what I want to keep getting better at, whether the product is physical or digital.",
  },
];

export default function HumanoidRobotArmAssemblyPage() {
  useRegisterProjectNav("Baker Bot: Humanoid Robot Arms", SECTIONS);

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
          Baker Bot: Humanoid Robot Arms
        </h1>
        <p className="mt-3 max-w-[700px] leading-relaxed text-foreground/70">
          A commissioned humanoid AI teaching assistant robot, built by 16 students across 6
          subsystems. I designed the shoulder and interchangeable hands for the arm subsystem.
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
            I designed the shoulder and hands for a commissioned humanoid robot.
          </h2>
          <Prose>
            <p>
              Baker Bot is a life-size, waist-up humanoid robot commissioned by Dr. Mark Baker, a physics
              professor at Western, to work as an AI teaching assistant. It sits at a desk, listens to
              student questions, and answers them out loud while turning its head and gesturing with its
              arms. The whole build came in under $2,000.
            </p>
            <p>
              I took on the arms with one other teammate, out of 16 students working across 6 subsystems.
              I designed the shoulder, which connects the arm to the torso, and the hands, which swap out
              depending on what's being taught. Baker Bot now runs in his classroom, teaching physics to
              engineering students at Western.
            </p>
          </Prose>
        </section>

        {/* The Robot at a Glance */}
        <section id="robot-at-a-glance" className="mt-16 scroll-mt-8">
          <Eyebrow>The Robot at a Glance</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Six subsystems, one robot.
          </h2>
          <Prose>
            <p>
              The build was split into six subsystems: software, electrical, arms, head, neck, and torso.
              An onboard computer handles speech and sends each question to an AI model, which returns an
              answer along with an emotion tag. The robot speaks the answer while the arms play a gesture
              matched to that emotion.
            </p>
            <p className="font-medium text-foreground">Each arm has three stages:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-foreground">Shoulder:</span> sets the arm&apos;s
                working angle
              </li>
              <li>
                <span className="font-semibold text-foreground">Elbow:</span> a worm-gear motor that
                drives the gestures and holds position without drawing power
              </li>
              <li>
                <span className="font-semibold text-foreground">Hand:</span> interchangeable printed hands
                on a carbon fiber forearm
              </li>
            </ul>
          </Prose>
        </section>

        {/* Problem */}
        <section id="problem" className="mt-16 scroll-mt-8">
          <Eyebrow>Problem</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            The shoulder had to do three jobs at once.
          </h2>
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-foreground">Carry the weight</span> of the entire arm
                into the torso
              </li>
              <li>
                <span className="font-semibold text-foreground">Rotate smoothly</span> so the arm could be
                repositioned
              </li>
              <li>
                <span className="font-semibold text-foreground">Lock firmly</span> at a set angle so it
                wouldn&apos;t drift mid-lecture
              </li>
            </ul>
            <p>It also had to do all of that on a student-team budget.</p>
          </Prose>

          <h2 className="mt-10 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            The hands needed variety on a hobbyist budget.
          </h2>
          <Prose>
            <p>
              A physics TA needs different gestures for different lessons, but actuated fingers were well
              out of budget.
            </p>
          </Prose>

          <div className="mt-6">
            <Callout>
              <span className="font-semibold">Goal:</span> a shoulder that carries, rotates, and locks the
              arm on a hobbyist budget — and hands expressive enough for a lecture without actuated
              fingers.
            </Callout>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="mt-16 scroll-mt-8">
          <Eyebrow>Solution</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Two mechanisms, both simple enough to print and assemble by hand.
          </h2>

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Shoulder: a bolt that does two jobs
          </h3>
          <Prose>
            <p>
              The shoulder rotates around a half-inch bolt. The threaded end fastens into the torso, and
              the smooth shaft acts as the axle, so the arm spins freely on it while the bolt carries the
              arm&apos;s weight.
            </p>
            <p>
              To lock the angle, an aluminum plate on the arm has five holes, and a spring-loaded indexing
              plunger drops into whichever one you choose. You pull the plunger, swing the arm, and it
              snaps into place.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Shoulder CAD, transparent view" />
          <MediaPlaceholder type="Visual" label="Printed shoulder housing with plunger" />

          <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
            Hands: bayonet quick-swap
          </h3>
          <Prose>
            <p>
              Each hand attaches to the forearm with a bayonet lock: push it in, twist, and it&apos;s
              seated. That makes the hands interchangeable. There&apos;s a right-hand-rule hand for
              electromagnetism demos, thumbs up and thumbs down, and fists that can hold props.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Bayonet mount" />
          <MediaPlaceholder type="Visual" label="Hand set" />
        </section>

        {/* Design Decisions */}
        <section id="design-decisions" className="mt-16 scroll-mt-8">
          <Eyebrow>Design Decisions</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            Every part traded capability for cost and simplicity.
          </h2>
          {DECISIONS.map((decision, index) => (
            <DecisionCard key={decision.title} index={index} decision={decision} />
          ))}
        </section>

        {/* Reflection */}
        <section id="reflection" className="mt-16 scroll-mt-8">
          <Eyebrow>Reflection</Eyebrow>
          <h2 className="mt-2 max-w-[700px] text-3xl font-semibold leading-tight text-foreground">
            What I learned
          </h2>

          {REFLECTION_POINTS.map((point) => (
            <div key={point.title}>
              <h3 className="mt-10 max-w-[700px] text-xl font-semibold leading-snug text-foreground">
                {point.title}
              </h3>
              <Prose>
                <p>{point.body}</p>
              </Prose>
            </div>
          ))}
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
