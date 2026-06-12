// Cloudflare deploy safety net.
//
// Some Cloudflare Workers Builds setups run only the *deploy* command
// (`npx wrangler deploy`) with no build command configured. Wrangler then
// delegates to `opennextjs-cloudflare deploy`, which fails with
// "Could not find compiled Open Next config" because `.open-next/` was never
// built.
//
// To make the deploy work regardless of dashboard build settings, we build the
// OpenNext worker output here, during `npm install`, but ONLY in a CI build
// environment (so local `npm install` is never slowed down) and only when the
// output isn't already present (so a configured build command isn't doubled).
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const inCI =
  process.env.CI ||
  process.env.WORKERS_CI ||
  process.env.CF_PAGES ||
  process.env.CLOUDFLARE_ACCOUNT_ID;

if (!inCI) {
  process.exit(0); // local install — do nothing
}

if (existsSync(".open-next/worker.js")) {
  console.log("[cf-postinstall] .open-next already built — skipping.");
  process.exit(0);
}

console.log("[cf-postinstall] CI detected — building OpenNext worker output...");
execSync("npx --no-install opennextjs-cloudflare build", { stdio: "inherit" });
