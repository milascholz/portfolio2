export type Project = {
  id: string;
  title: string;
  badge: string;
  tags: string[];
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "discify",
    badge: "Case Study Draft",
    tags: ["JavaScript", "Spicetify", "UI Design"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #c084fc 55%, #f0abfc 100%)",
  },
  {
    id: "project-two",
    title: "Project Two",
    badge: "Placeholder Badge",
    tags: ["Tag One", "Tag Two"],
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #60a5fa 60%, #bfdbfe 100%)",
  },
  {
    id: "project-three",
    title: "Project Three",
    badge: "Placeholder Badge",
    tags: ["Tag One", "Tag Two"],
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 55%, #a7f3d0 100%)",
  },
  {
    id: "project-four",
    title: "Project Four",
    badge: "Placeholder Badge",
    tags: ["Tag One", "Tag Two"],
    gradient: "linear-gradient(135deg, #ea580c 0%, #fb923c 55%, #fed7aa 100%)",
  },
];
