# Grande — LEGI product landing page

A single-page landing page for **Grande**, LEGI's large-format concrete paving slab.
Built for a Facebook ad campaign: feature highlights, photo gallery, price table,
a lead-capture form that sends each submission into Zoho CRM, and an AI chat
assistant (Dialogflow CX).

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
- **Hosting:** Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`)
- **Languages:** Georgian (default) + English toggle in the header
- **Leads:** posted to a same-origin `/api/lead` route that forwards into **Zoho CRM** (Web-to-Lead)
- **Chat:** Dialogflow CX Messenger, LEGI-branded, with funnel telemetry

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000 — Next dev server (fast iteration)
npm run preview   # build with OpenNext + run on the Cloudflare Workers runtime locally
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm test          # Vitest: /api/lead validation + Zoho forwarding, content consistency
```

GitHub Actions (`.github/workflows/ci.yml`) runs these plus `next build` on every
push and pull request.

## Where things live

| What | File | How |
|------|------|-----|
| **Gallery photos** | `src/components/Gallery.tsx` | Real Grande photos in `public/gallery/`. Each `shots` item has `src`, bilingual `alt`, and `label`. |
| **Hero photo** | `src/components/Hero.tsx` | `public/grande-pavers-gray-cappuccino-obsidian.webp` (all three colours). |
| **Prices / colours** | `src/lib/content.ts` → `PRODUCTS` | The single place to change a price, swatch colour, colour name (KA + EN) or the `popular` flag; both languages' price tables are built from it. The meta description in `src/app/layout.tsx` also quotes the 41–48 ₾/m² range — update it when prices change. |
| **All copy / translations** | `src/lib/content.ts` | One file holds every Georgian + English string. |
| **Phone number** | `src/lib/content.ts` → `PHONE` / `PHONE_HREF` | |
| **SEO title / description** | `src/app/layout.tsx` → `META_TITLE` / `META_DESCRIPTION` | Also used for Open Graph (Facebook previews). |
| **Chat widget** | `src/lib/chat/config.ts`, `src/components/chat/` | Agent IDs, teaser timing, telemetry endpoint; texts in `ChatTeaser.tsx` / `ChatWidget.tsx`; colours in `chat.css`. |
| **Logo / favicon** | `public/legi-logo.webp`, `src/app/icon.svg` | Real Legi logo + brick favicon. |

### Regenerating images from source

Original photos and logo files live in `Photos/` (git-ignored, not deployed). To
re-process them into web-optimised WebP (using `sharp`, which ships with Next), run
the conversion snippet — see the `node -e` script used to build `public/gallery/*`,
`public/legi-logo.webp`, the app icons, and `public/og-grande.jpg`. Source images are
8064×6048 (~25 MB); outputs are ~0.5 MB WebP. Names are SEO-friendly
(`grande-<colour>-<context>.webp`).

## Leads → Zoho CRM

The lead form (`src/components/LeadForm.tsx`) posts JSON **same-origin** to the
`src/app/api/lead/route.ts` route, which forwards the submission to **Zoho CRM**
Web-to-Lead **server-side** — the browser can't post to Zoho directly (it rejects
cross-origin requests). The route validates name + phone, silently drops bots via a
honeypot, and returns a real success/failure so the page shows its inline success
state without navigating. No env vars: the Zoho tokens are public webform tokens.

Leads map `name → Last Name`, `phone → Mobile`, and are tagged
`Lead Source: "Grande Landing"` (add that as a Lead Source picklist option under
Zoho → Setup → Modules → Leads so it populates; until then the lead still saves).

To repoint at a different Zoho org/form: regenerate the webform in
**Zoho CRM → Setup → Developer Hub → Webforms** (Leads module), then replace the
`ZOHO_*` constants at the top of `src/app/api/lead/route.ts` (action URL, `xnQsjsdp`,
`xmIwtLD`). Keep reCAPTCHA off on the webform; the route relies on the honeypot.

## Tracking & analytics

- **Meta Pixel** — installed in `src/app/layout.tsx` (`META_PIXEL_ID`), fires
  `PageView` for the Facebook ad campaign. Change the ID there to repoint it.
- **Chat funnel telemetry** — `src/lib/chat/telemetry.ts` posts `page_view`,
  `chat_opened` and `message_sent` (with session id, IP, city, country) to the
  `copilot-api` Cloud Function. `src/lib/chat/session.ts` also passes UTM tags,
  referrer, returning-visitor flag and geo (from `/api/geo`, which uses
  Cloudflare's own geolocation) into the Dialogflow session. The `ai_*` gtag
  events only fire if Google Analytics is installed, which it currently is not.
- **Visitor analytics** — none installed yet. Since the site runs on Cloudflare,
  enable **Cloudflare Web Analytics** (Dashboard → Analytics & Logs → Web Analytics):
  code-free if the domain is proxied through Cloudflare, otherwise drop the beacon
  snippet next to the Meta Pixel in `layout.tsx`.

## Deploy

Hosted on **Cloudflare Workers** via OpenNext. Config lives in `wrangler.jsonc`
(worker `legi-grande-landing`) and `open-next.config.ts`.

```bash
npm run preview   # build with OpenNext + run on the Workers runtime locally
npm run deploy    # build + deploy to Cloudflare (opennextjs-cloudflare deploy)
```

`npm run build` produces the OpenNext worker bundle in `.open-next/`; plain
`next build` is available as `npm run build:next` for Next/type checks.
