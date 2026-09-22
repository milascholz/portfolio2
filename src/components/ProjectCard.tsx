import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden border border-black bg-white"
    >
      {project.video ? (
        <video
          className="aspect-video w-full object-cover"
          src={project.video}
          poster={project.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="aspect-video" style={{ backgroundImage: project.gradient }} />
      )}
      <div className="flex flex-col gap-0.5 border-t border-black px-4 py-3">
        <h3 className="font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm text-foreground/55">{project.subheading}</p>
      </div>
    </a>
  );
}
