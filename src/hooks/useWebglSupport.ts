"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | null = null;

function detect(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = !!gl;
  } catch {
    cached = false;
  }
  return cached;
}

function subscribe() {
  // WebGL support cannot change over the life of a session.
  return () => {};
}

function getServerSnapshot(): boolean | null {
  return null;
}

export function useWebglSupport(): boolean | null {
  return useSyncExternalStore(subscribe, detect, getServerSnapshot);
}
