"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";

/**
 * Some embedding contexts (notably certain automated/headless browser
 * shells, confirmed here: ResizeObserver never invokes its callback at all)
 * never fire the ResizeObserver that @react-three/fiber's <Canvas> relies on
 * internally, so the WebGL drawing buffer stays pinned at its default
 * 300x150. This drives gl.setSize/camera aspect from our own measurement
 * loop as a defensive fallback — a no-op once the size already matches.
 */
export function ResizeSync() {
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    let lastWidth = -1;
    let lastHeight = -1;

    const apply = () => {
      const rect = parent.getBoundingClientRect();
      const { width, height } = rect;
      if (width <= 0 || height <= 0) return;
      if (width === lastWidth && height === lastHeight) return;
      lastWidth = width;
      lastHeight = height;

      // three.js cameras/renderers are imperative, mutable objects by
      // design; useThree() intentionally returns live references to them.
      /* eslint-disable react-hooks/immutability */
      gl.setSize(width, height, false);
      if ("aspect" in camera) {
        (camera as PerspectiveCamera).aspect = width / height;
        camera.updateProjectionMatrix();
      }
      /* eslint-enable react-hooks/immutability */
      invalidate();
    };

    apply();

    let observerFired = false;
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            observerFired = true;
            apply();
          })
        : null;
    observer?.observe(parent);

    window.addEventListener("resize", apply);

    // Defensive polling fallback for environments where ResizeObserver
    // silently never invokes (confirmed in some automated browser shells).
    let frame = 0;
    let ticks = 0;
    const poll = () => {
      ticks += 1;
      if (!observerFired) apply();
      if (ticks < 180) frame = requestAnimationFrame(poll);
    };
    frame = requestAnimationFrame(poll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(frame);
    };
  }, [gl, camera, invalidate]);

  return null;
}
