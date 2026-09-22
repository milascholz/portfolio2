export type Project = {
  id: string;
  title: string;
  subheading: string;
  gradient: string;
  video?: string;
  poster?: string;
};

export const projects: Project[] = [
  {
    id: "discify",
    title: "discify",
    subheading: "Custom Spicetify theme & UI design system",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #c084fc 55%, #f0abfc 100%)",
    video: "/videos/discify-showcase.mp4",
    poster: "/images/discify-poster.jpg",
  },
  {
    id: "project-two",
    title: "project two",
    subheading: "Case study coming soon",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #60a5fa 60%, #bfdbfe 100%)",
  },
  {
    id: "project-three",
    title: "project three",
    subheading: "Case study coming soon",
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 55%, #a7f3d0 100%)",
  },
  {
    id: "project-four",
    title: "project four",
    subheading: "Case study coming soon",
    gradient: "linear-gradient(135deg, #ea580c 0%, #fb923c 55%, #fed7aa 100%)",
  },
];
