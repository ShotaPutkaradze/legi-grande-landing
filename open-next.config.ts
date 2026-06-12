import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({
  // Static-first landing page: no ISR/data cache needed, so the default
  // (no incremental cache) keeps the Worker lean. Add an R2/KV cache here
  // later if the site grows server-rendered, revalidated content.
});

// `npm run build` is wired to `opennextjs-cloudflare build` so Cloudflare's
// default build command produces `.open-next/`. Override the inner framework
// build to call Next directly — otherwise OpenNext would re-invoke
// `npm run build` and recurse infinitely.
config.buildCommand = "npx next build";

export default config;
