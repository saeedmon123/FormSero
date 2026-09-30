"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span";
};

const transition: Transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ ...transition, delay }}
    >
      {children}
    </Component>
  );
}
