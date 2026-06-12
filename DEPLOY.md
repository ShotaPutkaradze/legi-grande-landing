# Deploying Grande to Cloudflare (grande.legi.ge)

This is a **Next.js 16** app that runs on **Cloudflare Workers** via the
[OpenNext](https://opennext.js.org/cloudflare) adapter. This guide gets it live
on `grande.legi.ge` and covers the recurring deploy gotcha.

---

## 1. One-time setup on Cloudflare

Because `grande.legi.ge` is a subdomain of `legi.ge`, deploy the Worker on the
**Cloudflare account that owns the `legi.ge` DNS zone** — then the custom domain
+ HTTPS cert are created automatically.

1. **Workers & Pages → Create → Import a Git repository** → pick this repo.
2. Build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy`
   - (Framework preset / output dir: leave default — `wrangler.jsonc` handles it.)
3. Save & deploy. First build gives a `*.workers.dev` URL — open it to confirm.

> **Note:** even if the build command is left blank, the repo has a `postinstall`
> safety net (`scripts/cf-postinstall.mjs`) that builds the Worker output during
> `npm install` inside Cloudflare's build environment. So deploys work either way.

## 2. Custom domain

In the Worker → **Settings → Domains & Routes → Add → Custom Domain** →
`grande.legi.ge`. Cloudflare adds the DNS record and TLS automatically (the zone
is on this account). Done.

## 3. Environment variables

**None are required.** Leads go straight to Zoho CRM (see below), and there's no
database or email backend.

Optional: `NEXT_PUBLIC_SITE_URL=https://grande.legi.ge` — used only to make the
social-share (Open Graph) image URL absolute.

---

## Editing the site

A push to the connected branch auto-redeploys. Almost everything lives in one file:

| What | Where |
|------|-------|
| All text (Georgian + English), prices, colours | `src/lib/content.ts` |
| Phone number | `src/lib/content.ts` (`PHONE` / `PHONE_HREF`) |
| Photos | `public/` and `public/gallery/` |
| Lead form / Zoho wiring | `src/components/LeadForm.tsx`, `src/app/api/lead/route.ts` |

## Where leads go

The form posts to `/api/lead`, which forwards each lead into **Zoho CRM** (Leads
module) server-side: `name → Last Name`, `phone → Mobile`, and
`Lead Source = "Grande Landing"`.

- For the **Lead Source** to show up, add **"Grande Landing"** as an option on the
  Leads → *Lead Source* picklist (Zoho: Setup → Modules and Fields → Leads →
  Lead Source). Until then leads still save, just with a blank source.
- The Zoho webform tokens are constants at the top of `src/app/api/lead/route.ts`.
  To point at a different Zoho org/form, regenerate the webform in Zoho CRM
  (Setup → Developer Hub → Webforms, Leads module) and replace them. Keep
  reCAPTCHA off on that webform.

## Local development

```bash
npm install        # builds the Worker output once (safety net); skip with SKIP_OPENNEXT_POSTINSTALL=1
npm run dev        # http://localhost:3000 — normal Next.js dev
npm run lint
```

`npm run build` runs the full OpenNext build (what Cloudflare runs). For a plain
Next build use `npm run build:next`.

---

## Troubleshooting

**Deploy fails: `Could not find compiled Open Next config, did you run the build
command?`**
The deploy ran without building the Worker output. Fix the **Build command** to
`npx opennextjs-cloudflare build` (step 1). The `postinstall` safety net normally
prevents this, but an explicit build command is the clean fix.

**Deploy fails: `Service binding 'WORKER_SELF_REFERENCE' references Worker 'X'
which was not found`**
A name mismatch — make sure `name` in `wrangler.jsonc` matches the Worker's name
in Cloudflare.

**A content change isn't showing up**
Confirm the latest commit actually deployed (Workers → the project → latest
build is green), then hard-refresh (⌘/Ctrl+Shift+R) to bust the browser cache.
