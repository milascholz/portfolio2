export type Sticker = {
  id: string;
  label: string;
  hoverText: string;
  color: string;
  textColor: string;
  top: string;
  left: string;
  rotate: string;
  shape: "circle" | "badge" | "star" | "blob";
  size: number;
};

export const stickers: Sticker[] = [
  {
    id: "design",
    label: "UI/UX",
    hoverText: "Obsessed with clean, playful interfaces",
    color: "#14b8a6",
    textColor: "#ffffff",
    top: "6%",
    left: "8%",
    rotate: "-8deg",
    shape: "badge",
    size: 64,
  },
  {
    id: "code",
    label: "</>",
    hoverText: "Currently deep in React & Next.js",
    color: "#ef4444",
    textColor: "#ffffff",
    top: "2%",
    left: "58%",
    rotate: "10deg",
    shape: "star",
    size: 68,
  },
  {
    id: "coffee",
    label: "☕",
    hoverText: "Fueled by iced coffee and good playlists",
    color: "#f472b6",
    textColor: "#3a1230",
    top: "32%",
    left: "-6%",
    rotate: "-6deg",
    shape: "circle",
    size: 56,
  },
  {
    id: "sparkle",
    label: "✨",
    hoverText: "Creating things that spark joy",
    color: "#facc15",
    textColor: "#3a2c00",
    top: "34%",
    left: "78%",
    rotate: "8deg",
    shape: "blob",
    size: 60,
  },
  {
    id: "learning",
    label: "grow",
    hoverText: "Always learning something new",
    color: "#38bdf8",
    textColor: "#062a3d",
    top: "68%",
    left: "-4%",
    rotate: "-4deg",
    shape: "badge",
    size: 58,
  },
  {
    id: "gem",
    label: "★",
    hoverText: "Sweating the tiny details",
    color: "#a855f7",
    textColor: "#ffffff",
    top: "72%",
    left: "70%",
    rotate: "6deg",
    shape: "circle",
    size: 52,
  },
];
