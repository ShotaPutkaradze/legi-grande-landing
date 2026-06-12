// Cloudflare deploy safety net.
//
// Some Cloudflare Workers Builds setups run only the *deploy* command
// (`npx wrangler deploy`) with no build command configured. Wrangler then
// delegates to `opennextjs-cloudflare deploy`, which fails with
// "Could not find compiled Open Next config" because `.open-next/` was never
// built.
//
// To make the deploy work regardless of dashboard build settings, we build the
// OpenNext worker output here, during `npm install`:
//   - Inside Cloudflare's build environment: always rebuild, so deploys are
//     never stale (Cloudflare may restore a cached `.open-next`).
//   - Locally: build only when `.open-next` is missing, so repeated installs
//     stay fast. Set SKIP_OPENNEXT_POSTINSTALL=1 to opt out entirely.
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

if (process.env.SKIP_OPENNEXT_POSTINSTALL) {
  process.exit(0);
}

// Cloudflare Workers Builds / Pages run under /opt/buildhome.
const inCloudflareBuild =
  existsSync("/opt/buildhome") ||
  (process.env.HOME ?? "").includes("buildhome") ||
  Boolean(process.env.WORKERS_CI) ||
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.CLOUDFLARE_ACCOUNT_ID);

const alreadyBuilt = existsSync(".open-next/worker.js");

if (alreadyBuilt && !inCloudflareBuild) {
  console.log("[cf-postinstall] .open-next already built — skipping (local).");
  process.exit(0);
}

console.log("[cf-postinstall] building OpenNext worker output (.open-next)...");
execSync("npx --no-install opennextjs-cloudflare build", { stdio: "inherit" });
