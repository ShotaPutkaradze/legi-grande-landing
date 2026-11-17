import type { NextConfig } from "next";

// Baseline security headers. Deliberately no script/connect CSP: the page loads
// Meta Pixel and the Dialogflow messenger from third-party origins, and a strict
// policy would need to track every host they use. `frame-ancestors` only stops
// other sites from embedding this page (clickjacking).
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  // Pin the workspace root to this app (several lockfiles exist on the machine).
  turbopack: {
    root: __dirname,
  },
  // Cloudflare Workers has no built-in image optimizer; serve pre-resized
  // copies instead (scripts/resize-images.mjs).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

// Cloudflare (OpenNext) dev bindings for `next dev`. Skipped for builds, where
// it would start a local workerd process for nothing.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") initOpenNextCloudflareForDev();
