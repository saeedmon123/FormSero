"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqItems } from "@/lib/faq";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ivory px-6 py-28 text-charcoal md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel index="10" label="FAQ" tone="light" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] md:text-5xl">
            Questions, answered plainly.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-charcoal/15 border-y border-charcoal/15">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  data-cursor="interactive"
                >
                  <span className="font-display text-lg font-bold md:text-xl">
                    {item.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-signal transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-charcoal/70">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
