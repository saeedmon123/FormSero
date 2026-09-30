"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  animate: boolean;
  density?: "full" | "reduced";
};

/** Deterministic pseudo-random so server/client + reduced/full stay stable. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNodeSystem(count: number, radius: number, seed: number) {
  const rand = mulberry32(seed);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = radius * (0.55 + rand() * 0.45);
    points.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      )
    );
  }

  // connect each point to its nearest few neighbors for a network look
  const segments: number[] = [];
  points.forEach((p, i) => {
    const distances = points
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    distances.forEach(({ j, d }) => {
      if (d < radius * 0.8) {
        segments.push(p.x, p.y, p.z, points[j].x, points[j].y, points[j].z);
      }
    });
  });

  return { points, segments: new Float32Array(segments) };
}

export function SystemNodes({ animate, density = "full" }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const count = density === "full" ? 34 : 18;

  const { points, segments } = useMemo(() => buildNodeSystem(count, 3.4, 7), [count]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  useFrame((state, delta) => {
    if (!animate || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.045;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[segments, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#FF5A1F" transparent opacity={0.28} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FF5A1F" size={0.045} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}
