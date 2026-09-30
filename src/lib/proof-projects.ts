export type ProofProject = {
  id: string;
  edition: "light" | "full";
  name: string;
  tagline: string;
  url: string;
  tags: string[];
};

export const proofProjects: ProofProject[] = [
  {
    id: "aether-atlas-lite",
    edition: "light",
    name: "Aether Atlas — Lite",
    tagline: "An editorial survey of Earth's motion, built with the original Light workflow.",
    url: "https://liteversion-atheratlas.netlify.app/",
    tags: ["Editorial", "Scroll-driven", "Foundation system"],
  },
  {
    id: "aether-atlas-full",
    edition: "full",
    name: "Aether Atlas — Full Edition",
    tagline: "The same publication, expanded: richer data, deeper chapters, built with the complete Full system.",
    url: "https://fullversion-atheratlas.netlify.app/",
    tags: ["Data-rich", "Scroll storytelling", "Complete system"],
  },
];
