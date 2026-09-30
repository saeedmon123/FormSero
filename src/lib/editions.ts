export type Edition = {
  id: "light" | "full";
  eyebrow: string;
  name: string;
  tagline: string;
  /** Crossed-out original price. Omit when this edition isn't discounted. */
  priceOld?: number;
  price: number;
  currency: string;
  description: string;
  capabilities: string[];
  cover: string;
  recommended: boolean;
  ctaLabel: string;
  resultName: string;
  resultUrl: string;
};

export const editions: Edition[] = [
  {
    id: "light",
    eyebrow: "LIGHT",
    name: "The Foundation",
    tagline: "The original system — a straight-line path to a professional first result.",
    price: 29,
    currency: "€",
    description:
      "The first version of the FORMSERO system: a complete, professional Claude Code foundation without the advanced motion and spatial layers.",
    capabilities: [
      "Professional Claude Code foundation",
      "Design-system intelligence",
      "Component and pattern research",
      "Production-quality motion basics",
      "A repeatable build workflow",
    ],
    cover: "/images/book/light/cover.webp",
    recommended: false,
    ctaLabel: "Get Light",
    resultName: "Aether Atlas — Lite",
    resultUrl: "https://liteversion-atheratlas.netlify.app/",
  },
  {
    id: "full",
    eyebrow: "FULL",
    name: "The Complete System",
    tagline: "The complete, professional Claude Code system — every layer, one workflow.",
    priceOld: 59,
    price: 40,
    currency: "€",
    description:
      "The expanded system: reference-driven creative direction, advanced motion architecture, immersive 3D and GPU work, and a production audit workflow.",
    capabilities: [
      "Everything in Light",
      "Reference-driven creative direction",
      "Advanced motion architecture & scroll storytelling",
      "Immersive 3D and GPU-driven experiences",
      "Browser-based QA and production audit workflow",
      "The complete, repeatable FORMSERO system",
    ],
    cover: "/images/book/full/cover.webp",
    recommended: true,
    ctaLabel: "Get Full",
    resultName: "Aether Atlas — Full Edition",
    resultUrl: "https://fullversion-atheratlas.netlify.app/",
  },
];
