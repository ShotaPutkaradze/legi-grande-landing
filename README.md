# Grande — LEGI product landing page

A single-page landing page for **Grande**, LEGI's large-format concrete paving slab.
Built for a Facebook ad campaign: video showcase, feature highlights, photo gallery,
price table, and a lead-capture form that sends each submission into Zoho CRM.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
- **Hosting:** Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`)
- **Languages:** Georgian (default) + English toggle in the header
- **Leads:** posted to a same-origin `/api/lead` route that forwards into **Zoho CRM** (Web-to-Lead)

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000 — Next dev server (fast iteration)
npm run preview   # build with OpenNext + run on the Cloudflare Workers runtime locally
```

## Where to put the real content

Everything below ships with polished **placeholders** — swap them for the real thing:

| What | File | How |
|------|------|-----|
| **Video** ⏳ | `src/components/VideoSection.tsx` | Still a placeholder. Set `VIDEO_EMBED_URL` to a YouTube/Vimeo *embed* URL (e.g. `https://www.youtube.com/embed/ID`). |
| **Gallery photos** ✅ | `src/components/Gallery.tsx` | Real Grande photos in `public/gallery/`. Each `shots` item has `src`, bilingual `alt`, and `label`. |
| **Hero photo** ✅ | `src/components/Hero.tsx` | `public/grande-pavers-gray-cappuccino-obsidian.webp` (all three colours). |
| **Prices / colours** ✅ | `src/lib/content.ts` → `pricing.rows` | Real colours (Gray, Cappuccino, Obsidian) — Latin on the EN page, Georgian script on the KA page (გრეი / კაპუჩინო / ობსიდიანი). Edit name, size, thickness, price, `popular`. Swatch hexes in `Pricing.tsx`. |
| **All copy / translations** | `src/lib/content.ts` | One file holds every Georgian + English string. |
| **Phone number** | `src/lib/content.ts` → `PHONE` / `PHONE_HREF` | |
| **Logo / favicon** ✅ | `public/legi-logo.webp`, `src/app/icon.svg` | Real Legi logo + brick favicon. |

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
