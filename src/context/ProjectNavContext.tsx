"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ProjectNavSection = { id: string; label: string };
export type ProjectNavData = { title: string; sections: ProjectNavSection[] };

type ProjectNavContextValue = {
  projectNav: ProjectNavData | null;
  setProjectNav: (data: ProjectNavData | null) => void;
};

const ProjectNavContext = createContext<ProjectNavContextValue | null>(null);

export function ProjectNavProvider({ children }: { children: ReactNode }) {
  const [projectNav, setProjectNav] = useState<ProjectNavData | null>(null);
  const value = useMemo(() => ({ projectNav, setProjectNav }), [projectNav]);

  return <ProjectNavContext.Provider value={value}>{children}</ProjectNavContext.Provider>;
}

function useProjectNavContext() {
  const ctx = useContext(ProjectNavContext);
  if (!ctx) {
    throw new Error("useProjectNavContext must be used within a ProjectNavProvider");
  }
  return ctx;
}

/** Read the currently registered project nav (used by the sidebar). */
export function useProjectNav() {
  return useProjectNavContext().projectNav;
}

/** Case-study pages call this to put their title/sections into the sidebar. */
export function useRegisterProjectNav(title: string, sections: ProjectNavSection[]) {
  const { setProjectNav } = useProjectNavContext();
  const sectionsKey = sections.map((s) => `${s.id}:${s.label}`).join("|");

  useEffect(() => {
    setProjectNav({ title, sections });
    return () => setProjectNav(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, sectionsKey, setProjectNav]);
}
