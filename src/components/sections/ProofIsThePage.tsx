"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const layers = ["DESIGN", "MOTION", "RESEARCH", "3D", "INTERACTION", "QA", "SYSTEM"];

export function ProofIsThePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 md:px-10 md:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,90,31,0.08),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel index="09" label="The Proof Is The Page" className="justify-center" />

        <div className="relative mt-16 flex h-40 items-center justify-center md:h-56">
          {layers.map((layer, i) => (
            <motion.span
              key={layer}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30, scale: 0.9 }}
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0, 0.9, 0], y: [30, 0, -20], scale: [0.9, 1, 1.05] }
              }
              viewport={{ once: true }}
              transition={{
                duration: 2.2,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute font-display text-3xl font-black tracking-tight text-ivory/70 md:text-5xl"
              style={{ zIndex: i }}
            >
              {layer}
            </motion.span>
          ))}

          <motion.span
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: layers.length * 0.18 + 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-balance font-display text-4xl font-black tracking-tight text-ivory md:text-6xl"
          >
            BEYOND <span className="text-signal">THE PROMPT</span>
          </motion.span>
        </div>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: layers.length * 0.18 + 1.2 }}
          className="mx-auto mt-8 max-w-xl text-lg text-ivory/70"
        >
          Everything you&apos;ve experienced on this website was built using the
          same system taught inside the book. The page is the testimonial.
        </motion.p>
      </div>
    </section>
  );
}
