"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Book } from "./Book";
import { SystemNodes } from "./SystemNodes";
import { ResizeSync } from "./ResizeSync";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsCoarsePointer } from "@/hooks/useIsCoarsePointer";

export function BookScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isCoarse = useIsCoarsePointer();
  const animate = !reducedMotion;
  const interactive = !reducedMotion && !isCoarse;

  return (
    <Canvas
      className="book-canvas"
      dpr={[1, isCoarse ? 1.5 : 2]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ResizeSync />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#FFF3E8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#FF5A1F" />
      <pointLight position={[-2, 1, 2]} intensity={0.6} color="#FF5A1F" />

      <Suspense fallback={null}>
        <Book
          coverUrl="/images/book/full/cover.webp"
          backUrl="/images/book/full/back.webp"
          interactive={interactive}
        />
      </Suspense>

      <SystemNodes animate={animate} density={isCoarse ? "reduced" : "full"} />
    </Canvas>
  );
}
