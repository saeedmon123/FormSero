"use client";

import { useEffect, useRef } from "react";
import { useIsCoarsePointer } from "@/hooks/useIsCoarsePointer";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]';
const LARGE_SELECTOR = '[data-cursor="large"]';

/**
 * Renders nothing until the first real pointermove, so it never flashes at
 * (0,0) before the user has actually moved a mouse (see FORMSERO field notes
 * on custom-cursor behavior). Disabled entirely on coarse/touch pointers.
 */
export function CustomCursor() {
  const isCoarse = useIsCoarsePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (isCoarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const render = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!hasMoved.current) {
        hasMoved.current = true;
        ringX = targetX;
        ringY = targetY;
        document.documentElement.classList.add("cursor-ready");
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        raf = requestAnimationFrame(render);
      }

      const el = document.elementFromPoint(targetX, targetY);
      const isInteractive = !!el?.closest(INTERACTIVE_SELECTOR);
      const isLarge = !!el?.closest(LARGE_SELECTOR);
      ring.dataset.state = isLarge ? "large" : isInteractive ? "interactive" : "default";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      if (hasMoved.current) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-signal opacity-0 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-state="default"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-signal/60 opacity-0 transition-[width,height,border-color] duration-200 ease-out will-change-transform data-[state=interactive]:h-10 data-[state=interactive]:w-10 data-[state=interactive]:border-ivory data-[state=large]:h-20 data-[state=large]:w-20 data-[state=large]:border-signal"
      />
    </>
  );
}
