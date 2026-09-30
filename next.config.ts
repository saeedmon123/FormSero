import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // The Stripe webhook reads these PDFs with fs at runtime rather than
  // importing them, so the build's file tracer needs to be told explicitly
  // to bundle them into that route's serverless function.
  outputFileTracingIncludes: {
    "/api/webhooks/stripe": ["./private/pdfs/**"],
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
