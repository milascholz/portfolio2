import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        className="relative flex-1 min-h-[220px] p-4"
        style={{ backgroundImage: project.gradient }}
      >
        <span className="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.badge}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-5 py-4">
        <h3 className="font-nav text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground/55">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
