import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="p-6 md:p-10 lg:p-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
