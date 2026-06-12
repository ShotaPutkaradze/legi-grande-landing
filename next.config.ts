import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app (several lockfiles exist on the machine).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
