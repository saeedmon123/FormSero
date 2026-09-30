"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  coverUrl: string;
  backUrl: string;
  interactive: boolean;
};

const WIDTH = 1.4;
const HEIGHT = 2.0;
const DEPTH = 0.16;

function useSpineTexture(label: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#171715";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#F4F0E8";
      ctx.font = "600 34px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "6px";
      ctx.fillText(label, 0, -8);
      ctx.fillStyle = "#FF5A1F";
      ctx.font = "600 22px Arial";
      ctx.fillText("FORMSERO", 0, 34);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [label]);
}

export function Book({ coverUrl, backUrl, interactive }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [coverTex, backTex] = useTexture([coverUrl, backUrl]);

  // three.js Texture objects are mutable by design; @react-three/drei's
  // useTexture intentionally returns live references for exactly this setup.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    coverTex.colorSpace = THREE.SRGBColorSpace;
    backTex.colorSpace = THREE.SRGBColorSpace;
    coverTex.needsUpdate = true;
    backTex.needsUpdate = true;
  }, [coverTex, backTex]);
  /* eslint-enable react-hooks/immutability */

  const spineTex = useSpineTexture("BEYOND THE PROMPT");
  const pageEdgeColor = "#EAE4D6";

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.9 }), // +x pages
      new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.6 }), // -x spine
      new THREE.MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.9 }), // +y top
      new THREE.MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.9 }), // -y bottom
      new THREE.MeshStandardMaterial({ map: coverTex, roughness: 0.45, metalness: 0.05 }), // +z front
      new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.55 }), // -z back
    ],
    [coverTex, backTex, spineTex]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.getElapsedTime();
    const idleY = Math.sin(t * 0.22) * 0.16;
    const idleX = Math.sin(t * 0.15) * 0.03;

    if (interactive) {
      const pointer = state.pointer;
      targetRotation.current.y = idleY + pointer.x * 0.28;
      targetRotation.current.x = idleX - pointer.y * 0.14;
    } else {
      targetRotation.current.y = idleY;
      targetRotation.current.x = idleX;
    }

    const damp = 1 - Math.pow(0.001, delta);
    group.rotation.y += (targetRotation.current.y - group.rotation.y) * damp;
    group.rotation.x += (targetRotation.current.x - group.rotation.x) * damp;
  });

  const scale = Math.min(1, viewport.width / 4.2);

  return (
    <group ref={groupRef} rotation={[0, -0.35, 0]} scale={scale}>
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      </mesh>
    </group>
  );
}
