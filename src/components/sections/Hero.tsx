"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useWebglSupport } from "@/hooks/useWebglSupport";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { editions } from "@/lib/editions";

const BookScene = dynamic(() => import("@/components/three/BookScene").then((m) => m.BookScene), {
  ssr: false,
});

export function Hero() {
  const webglSupported = useWebglSupport();
  const shouldReduceMotion = useReducedMotion();
  const full = editions.find((e) => e.id === "full")!;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black px-6 pt-32 pb-16 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,240,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,90,31,0.10),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="hero-copy-in">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
            FORMSERO
          </p>
          <h1 className="mt-4 font-display text-[13vw] font-black leading-[0.92] tracking-tight text-ivory sm:text-6xl md:text-[4.4vw] lg:text-[4vw]">
            BEYOND
            <br />
            THE <span className="text-signal">PROMPT</span>
          </h1>
          <p className="mt-6 max-w-md text-balance font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
            The Professional Claude Code System for Building Exceptional Websites
          </p>
          <p className="mt-6 max-w-md text-lg text-ivory/80">
            Claude can code. The question is what you&apos;ve built around it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CheckoutButton edition="full" label={`Get the Full System — ${full.currency}${full.price}`} />
            <a
              href="#the-book"
              className="font-mono text-xs uppercase tracking-[0.15em] text-ivory/70 underline decoration-ivory/30 underline-offset-4 transition-colors hover:text-ivory"
              data-cursor="interactive"
            >
              Explore the Book
            </a>
          </div>
        </div>

        <div className="relative order-first h-[46vh] md:order-none md:h-[70vh]" data-cursor="large">
          {webglSupported === false ? (
            <div className="relative mx-auto h-full max-w-[320px]">
              <Image
                src="/images/book/full/cover.webp"
                alt="Beyond the Prompt — Full Edition cover"
                fill
                sizes="320px"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          ) : (
            <BookScene />
          )}
        </div>
      </div>

      <motion.a
        href="#the-problem"
        className="relative z-10 mx-auto mt-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
        data-cursor="interactive"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
