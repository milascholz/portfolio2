"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BASE_PATH } from "@/lib/base-path";
import { useRegisterProjectNav } from "@/context/ProjectNavContext";
import ArmModelViewer from "@/components/ArmModelViewer";

const TAGS = ["Engineering Design & Manufacturing", "2026"];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "3d-model", label: "3D Model" },
  { id: "constraints", label: "Constraints" },
  { id: "shoulder", label: "Shoulder" },
  { id: "elbow", label: "Elbow" },
  { id: "hands", label: "Hands" },
  { id: "reflection", label: "Reflection" },
];

const ROLE_DETAILS = [
  { label: "Role", value: "Arm Subsystem: Shoulder, Hands, Elbow Motor Selection" },
  { label: "Team", value: "16 students, 6 subsystems" },
  { label: "Timeline", value: "March – September 2026" },
  { label: "Skills", value: "Mechanical Design · CAD · Design for 3D Printing" },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">{children}</p>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-4 max-w-[960px] space-y-4 leading-relaxed text-foreground/70">{children}</div>;
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

function MediaVideo({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="mt-6 w-full border border-black/15 bg-black/[0.035] p-6">
      <video
        className="w-full"
        src={`${BASE_PATH}${src}`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <figcaption className="mt-2 text-xs text-foreground/50">{caption}</figcaption>
    </figure>
  );
}

type Decision = {
  title: string;
  decision: string;
  why: string;
  rejected?: string;
};

const SHOULDER_DECISIONS: Decision[] = [
  {
    title: "One bolt as axle and load path",
    decision: "A standard ½\" bolt handles fastening, rotation, and load-bearing in one part.",
    why: "Nothing to machine, and it's replaceable from any hardware store. The thickness is what lets it do all three jobs: it's stiff enough to carry the whole arm cantilevered off the torso without bending, and the wide shank spreads that load across more of the printed housing, so the hole doesn't wear oval over time.",
  },
  {
    title: "Set once, not motorized",
    decision: "The shoulder is locked by hand before class.",
    why: "The robot sits at a desk of fixed height, so the shoulder angle only needs setting once. During the lecture, the elbow does all the moving. Locking the shoulder by hand cut a motor, a driver, and their weight from each arm, and moved that budget to the elbow, where motion actually matters.",
    rejected: "A motorized shoulder.",
  },
  {
    title: "An indexing plunger for a positive lock",
    decision: "A spring-loaded plunger drops into one of five holes.",
    why: "A clamp can hit any angle, but it can slip under load. Holes lock solid and repeat exactly, so position 3 is the same every time. The plunger is built into the shoulder, so there's no loose part to lose.",
    rejected:
      "Friction and clamp joints, which slip. Quick-release pins, which are separate parts and easy to lose.",
  },
];

const ELBOW_DECISION: Decision = {
  title: "A worm-gear motor that holds without power",
  decision: "A 12V worm-gear DC motor drives each elbow.",
  why: "The robot spends most of a lecture holding a gesture. A worm drive can't be back-driven, so the arm stays put with the motor off: no power draw, no heat, no drift. That meant a small, cheap motor could do the job, since it only has to move the arm, not fight gravity all class.",
  rejected: "Hobby servos, which draw current to hold position. A spur gearbox, which back-drives under load.",
};

const HANDS_DECISIONS: Decision[] = [
  {
    title: "Swappable hands instead of moving fingers",
    decision: "Fixed, posed hands on a quick-swap bayonet mount.",
    why: "Posed hands get most of the expressiveness of moving fingers at a fraction of the cost and complexity. The shared mount also means new hands can be designed and added later without touching the arm.",
    rejected: "Actuated fingers.",
  },
  {
    title: "Magnets as a backup lock",
    decision: "A magnet pair holds the bayonet in its locked position.",
    why: "A bayonet can slowly rotate loose under vibration, and this robot rides a bike twice a day. Two magnets add a second lock with no tools and no extra step when swapping hands.",
  },
  {
    title: "Designed for the printer, not just the render",
    decision: "Chamfered bottom edges, teardrop holes, and chamfered heat-set insert holes on every part.",
    why: "So parts come off the printer ready to assemble, with no failed prints or rework.",
  },
];

function DecisionCard({
  index,
  decision,
  media,
}: {
  index: number;
  decision: Decision;
  media?: ReactNode;
}) {
  return (
    <div className="mt-6 w-full border border-black bg-white">
      <div className="border-b border-black bg-black px-5 py-3">
        <p className="text-sm font-semibold text-white">
          {String(index).padStart(2, "0")} — {decision.title}
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
        {media ? <div className="py-5">{media}</div> : null}
      </div>
    </div>
  );
}

function MotorSizing() {
  return (
    <div className="border border-black/15 bg-black/[0.035] p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Sizing the motor</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        The forearm and hand hang off the elbow like a diving board, so the worst case is holding them
        straight out.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/70">
        <li>Carbon fiber forearm: [X g] over [L mm]</li>
        <li>Printed hand: [Y g] at the end</li>
        <li>Holding moment: [Z N·m]</li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        Motor rating: [W N·m], a [~Nx] safety margin
      </p>
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
    body: "A part can be correct in CAD and still fail on the printer. The first layer of an FDM print flares outward (elephant's foot), so a small chamfer on the bottom edges keeps parts flat and fitting. Horizontal holes sag under the layers printed above them, so modelling them as teardrops keeps them round. None of this shows up in a render, and all of it decides whether the part works.",
  },
  {
    title: "Validate before you print.",
    body: "For part of this project I was working remotely, so I couldn't check a part in person once it was printed. Each design had to be right before it went to the printer: checking clearances and interference in CAD, thinking through overhangs, first-layer flare, and hole sag, and walking through assembly step by step. I learned this after an 11-hour print had already finished, and it stuck: find out you're wrong while it's still cheap. The same goes for product work, where testing assumptions early costs far less than rebuilding after launch.",
  },
  {
    title: "Building my first locking mechanism.",
    body: "I'd never designed a printed lock before the bayonet. Getting it to hold the hand securely and still twist off by hand took several iterations, and each round of print feedback shaped the next.",
  },
  {
    title: "Designing for someone else to build.",
    body: "This was the first project where I took a part from a requirement (“hold the arm, rotate, lock, stay cheap”) to a design someone else could print and assemble without me in the room. My CAD had to carry everything: the fits, the print settings baked into the geometry, and the assembly logic. That kind of handoff is what I want to keep getting better at, whether the product is physical or digital.",
  },
];

export default function HumanoidRobotArmAssemblyPage() {
  useRegisterProjectNav("Baker Bot: Humanoid Robot Arms", SECTIONS);

  return (
    <div>
      <div className="mx-auto w-full max-w-[1120px]">
        <video
          className="aspect-[40/9] w-full border border-black object-cover"
          src={`${BASE_PATH}/videos/humanoid-robot-arm-assembly.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>

      <div className="mx-auto w-full max-w-[1120px] p-6 md:p-10 lg:p-12">
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
        <p className="mt-3 max-w-[960px] leading-relaxed text-foreground/70">
          A life-size humanoid robot that co-teaches first-year physics. I designed its shoulders and
          swappable hands, and sized its elbow motors.
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
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            A robot TA for first-year physics.
          </h2>
          <Prose>
            <p>
              Baker Bot is a life-size, waist-up humanoid robot commissioned by Dr. Mark Baker, a physics
              professor at Western, to teach alongside him in first-year lectures. It listens and engages
              in conversation with the professor, and moves its head, eyes, jaw, arms, and hands while it
              talks. Sixteen students built it across six subsystems for under $2,000.
            </p>
            <p>
              I worked on the arms with one teammate. I designed the shoulder and the swappable hands, and
              ran the torque math and motor comparison for the elbow.
            </p>
          </Prose>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mt-16 scroll-mt-8">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            Six subsystems, one robot.
          </h2>
          <Prose>
            <p>
              The build was split into software, electrical, arms, head, neck, and torso. An onboard
              computer handles speech and sends each question to an AI model, which returns an answer
              tagged with an emotion. The robot speaks the answer while the arms play a gesture matched to
              that emotion, so interactions feel humanized.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Full robot" />
          <Prose>
            <p className="font-medium text-foreground">Each arm has three components.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-foreground">Shoulder:</span> sets the arm&apos;s
                working angle
              </li>
              <li>
                <span className="font-semibold text-foreground">Elbow:</span> a worm-gear motor that
                drives the gestures
              </li>
              <li>
                <span className="font-semibold text-foreground">Hand:</span> swappable printed hands on a
                carbon fiber forearm
              </li>
            </ul>
          </Prose>
          <MediaVideo
            src="/videos/humanoid-robot-arm-assembly.mp4"
            caption="The arm subsystem in action: shoulder repositioning, elbow gestures, and a hand swap."
          />
        </section>

        {/* 3D Model */}
        <section id="3d-model" className="mt-16 scroll-mt-8">
          <Eyebrow>3D Model</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            The full arm assembly, live.
          </h2>
          <Prose>
            <p>
              Every part below, shoulder to fingertips, assembled the way it bolts together on the robot.
            </p>
          </Prose>
          <ArmModelViewer />
        </section>

        {/* Constraints */}
        <section id="constraints" className="mt-16 scroll-mt-8">
          <Eyebrow>Constraints</Eyebrow>
          <Prose>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-foreground">It sits at a desk.</span> The table height
                is fixed, so the arm only needs to gesture within reach of it.
              </li>
              <li>
                <span className="font-semibold text-foreground">It rides a bike.</span> Dr. Baker carries
                the robot to lectures as a backpack, so every joint has to survive bouncing and vibration.
              </li>
              <li>
                <span className="font-semibold text-foreground">It&apos;s on a student budget.</span>{" "}
                Every motor and part had to earn its place.
              </li>
            </ul>
          </Prose>
        </section>

        {/* Shoulder */}
        <section id="shoulder" className="mt-16 scroll-mt-8">
          <Eyebrow>Component Design</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            Shoulder
          </h2>
          <Prose>
            <p>
              The shoulder pivots on one large bolt fixed to the torso. An aluminum plate on the arm has
              five holes, and a spring-loaded indexing plunger in the shoulder drops into the selected
              hole, locking the arm at one of five angles. Because the robot works seated at a desk, each
              arm&apos;s height can be set to match the table before a lecture, leaving the powered elbow
              free to handle the expressive motion. Two cut-and-drilled aluminum plates per arm transfer the
              load into the pivot.
            </p>
            <p>
              Manually setting the shoulder angle keeps the design intuitive, reliable, and unpowered,
              saving the budget for the elbow, where independent motion matters more.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Shoulder, transparent view" />
          <MediaPlaceholder type="Visual" label="Printed shoulder housing with plunger" />

          {SHOULDER_DECISIONS.map((decision, index) => (
            <DecisionCard key={decision.title} index={index + 1} decision={decision} />
          ))}
        </section>

        {/* Elbow */}
        <section id="elbow" className="mt-16 scroll-mt-8">
          <Eyebrow>Component Design</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            Elbow
          </h2>
          <Prose>
            <p>
              The elbow is the only powered joint in the arm. A 12V worm-gear motor swings the forearm up
              and down to gesture, and holds any angle with the power off.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Elbow motor / assembled elbow" />

          <DecisionCard index={1} decision={ELBOW_DECISION} media={<MotorSizing />} />
        </section>

        {/* Hands */}
        <section id="hands" className="mt-16 scroll-mt-8">
          <Eyebrow>Component Design</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            Hands
          </h2>
          <Prose>
            <p>
              Each hand attaches to the forearm with a bayonet locking mechanism: push in, then twist to
              lock. A magnet in the wrist and one in the hand hold the mechanism pieces together, so it
              can&apos;t twist back out, which is especially important with the vibrations the robot
              experiences by travelling by bike. The set includes a right-hand-rule hand for
              electromagnetism demos, thumbs up, thumbs down, and fists that hold props.
            </p>
          </Prose>
          <MediaPlaceholder type="Visual" label="Bayonet mount" />
          <MediaPlaceholder type="Visual" label="Hand set" />
          <MediaPlaceholder type="Visual" label="Interactive CAD: hand + mount" />

          {HANDS_DECISIONS.map((decision, index) => (
            <DecisionCard
              key={decision.title}
              index={index + 1}
              decision={decision}
              media={
                index === 2 ? (
                  <MediaPlaceholder type="Visual" label="Chamfer, teardrop hole, insert hole" />
                ) : undefined
              }
            />
          ))}
        </section>

        {/* Reflection */}
        <section id="reflection" className="mt-16 scroll-mt-8">
          <Eyebrow>Reflection</Eyebrow>
          <h2 className="mt-2 max-w-[960px] text-3xl font-semibold leading-tight text-foreground">
            What I learned
          </h2>

          {REFLECTION_POINTS.map((point) => (
            <div key={point.title}>
              <h3 className="mt-10 max-w-[960px] text-xl font-semibold leading-snug text-foreground">
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
