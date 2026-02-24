import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure Turbopack resolves the correct project root when running from
  // project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
