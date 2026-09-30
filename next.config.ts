import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: path.resolve(__dirname, "node_modules/three/build/three.module.js"),
    };
    return config;
  },
};

export default nextConfig;
