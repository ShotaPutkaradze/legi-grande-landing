import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Static-first landing page: no ISR/data cache needed, so the default
  // (no incremental cache) keeps the Worker lean. Add an R2/KV cache here
  // later if the site grows server-rendered, revalidated content.
});
