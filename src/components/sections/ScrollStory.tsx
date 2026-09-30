"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollNetwork } from "./ScrollNetwork";

const stages = [
  { key: "prompt", label: "PROMPT", sub: "Where everyone starts." },
  { key: "context", label: "CONTEXT", sub: "What the project actually needs." },
  { key: "design", label: "DESIGN", sub: "Hierarchy, type, color, rhythm." },
  { key: "research", label: "RESEARCH", sub: "Reference-driven direction, not guesswork." },
  { key: "motion", label: "MOTION", sub: "Choreography with a reason." },
  { key: "system", label: "SYSTEM", sub: "Every layer, working together." },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const clusterRefs = useRef<(SVGGElement | null)[]>([]);
  const completionRefs = useRef<(SVGLineElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // stage 0 (PROMPT) starts in focus; every other word waits offstage,
      // scaled up and blurred as if hovering close to the camera.
      gsap.set(stageRefs.current.slice(1), {
        opacity: 0,
        scale: 1.35,
        filter: "blur(16px)",
        rotateX: -18,
      });
      gsap.set(finalRef.current, { opacity: 0, y: 40 });
      gsap.set(bookRef.current, { opacity: 0, scale: 0.85, rotateY: -12 });

      // network: first cluster visible from the start, the rest wait
      gsap.set(clusterRefs.current.slice(1), { opacity: 0 });
      clusterRefs.current.forEach((group) => {
        if (!group) return;
        gsap.set(group.querySelectorAll("[data-network-node]"), {
          opacity: 0,
          scale: 0,
          transformOrigin: "center",
        });
      });
      gsap.set(completionRefs.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=550%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      stages.forEach((_, i) => {
        const isLast = i === stages.length - 1;
        const cluster = clusterRefs.current[i];
        const lines = cluster?.querySelectorAll("[data-network-line]") ?? [];
        const nodes = cluster?.querySelectorAll("[data-network-node]") ?? [];
        const label = `stage-${i}`;

        tl.addLabel(label);

        // outgoing word: sinks back and dissolves toward the lower-left,
        // as if settling into the system rather than just disappearing.
        tl.to(
          stageRefs.current[i],
          {
            opacity: 0,
            scale: 0.55,
            x: -180,
            y: 140,
            rotateX: 16,
            filter: "blur(8px)",
            duration: 0.6,
            ease: "power1.in",
          },
          label
        );

        if (cluster) {
          tl.to(cluster, { opacity: 1, duration: 0.3 }, label)
            .to(lines, { strokeDashoffset: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, label)
            .to(nodes, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(3)" }, `${label}+=0.25`);
        }

        if (!isLast) {
          // incoming word: tilts and zooms in from a close, blurred haze
          // into sharp focus — a "materializing" entrance instead of a flat fade.
          tl.to(
            stageRefs.current[i + 1],
            { opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
            `${label}+=0.1`
          );
        } else {
          tl.to(bookRef.current, { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: "power2.out" }, `${label}+=0.1`)
            .to(
              completionRefs.current,
              { opacity: 1, strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.inOut" },
              `${label}+=0.3`
            )
            .to(finalRef.current, { opacity: 1, y: 0, duration: 0.6 }, `${label}+=0.6`);
        }
      });
    }, containerRef);

    // The book cover <Image> and web fonts can finish loading/reflowing
    // after ScrollTrigger first measures the pin distance, leaving a stale
    // pin-spacer height (symptoms: content stuck floating after unpinning).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="bg-black px-6 py-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionLabel index="02" label="Prompt to System" />
          <div className="mt-10 flex flex-wrap gap-3">
            {stages.map((s) => (
              <span
                key={s.key}
                className="rounded-full border border-ivory/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ivory/70"
              >
                {s.label}
              </span>
            ))}
          </div>
          <p className="mt-10 text-balance font-display text-4xl font-black text-ivory md:text-6xl">
            BEYOND <span className="text-signal">THE PROMPT</span>
          </p>
          <a
            href="#editions"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.15em] text-signal underline underline-offset-4"
          >
            See the Editions →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative bg-black">
      <div className="relative flex h-[100svh] items-center justify-center overflow-hidden px-6">
        <ScrollNetwork
          registerCluster={(i, el) => {
            clusterRefs.current[i] = el;
          }}
          registerCompletion={(i, el) => {
            completionRefs.current[i] = el;
          }}
        />

        <div className="absolute left-6 top-10 md:left-10 md:top-14">
          <SectionLabel index="02" label="Prompt to System" />
        </div>

        <div
          className="relative flex h-full w-full max-w-4xl flex-col items-center justify-center text-center"
          style={{ perspective: "1400px" }}
        >
          {stages.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
            >
              <span className="font-display text-[16vw] font-black leading-none tracking-tight text-ivory md:text-[9vw]">
                {s.label}
              </span>
              <span className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {s.sub}
              </span>
            </div>
          ))}

          <div
            ref={(el) => {
              stageRefs.current[stages.length] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 will-change-transform"
          >
            <div ref={bookRef} className="relative h-[38vh] w-[26vh] [perspective:1200px] md:h-[46vh] md:w-[32vh]">
              <Image
                src="/images/book/full/cover.webp"
                alt="Beyond the Prompt — Full Edition"
                fill
                sizes="320px"
                className="rounded-sm object-contain shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div ref={finalRef} className="flex flex-col items-center gap-6">
              <span className="font-display text-[10vw] font-black leading-none tracking-tight text-ivory md:text-6xl">
                BEYOND <span className="text-signal">THE PROMPT</span>
              </span>
              <Reveal>
                <a
                  href="#editions"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-signal underline underline-offset-4"
                  data-cursor="interactive"
                >
                  See the Editions →
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
