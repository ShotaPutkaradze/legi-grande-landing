# Grande — LEGI product landing page

A single-page landing page for **Grande**, LEGI's large-format concrete paving slab.
Built for a Facebook ad campaign: video showcase, feature highlights, photo gallery,
price table, and a lead-capture form that emails each submission to sales.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
- **Languages:** Georgian (default) + English toggle in the header
- **Leads:** submitted straight into **Zoho CRM** via Web-to-Lead (no backend)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Where to put the real content

Everything below ships with polished **placeholders** — swap them for the real thing:

| What | File | How |
|------|------|-----|
| **Video** ⏳ | `src/components/VideoSection.tsx` | Still a placeholder. Set `VIDEO_EMBED_URL` to a YouTube/Vimeo *embed* URL (e.g. `https://www.youtube.com/embed/ID`). |
| **Gallery photos** ✅ | `src/components/Gallery.tsx` | Real Grande photos in `public/gallery/`. Each `shots` item has `src`, bilingual `alt`, and `label`. |
| **Hero photo** ✅ | `src/components/Hero.tsx` | `public/grande-pavers-gray-cappuccino-obsidian.webp` (all three colours). |
| **Prices / colours** ✅ | `src/lib/content.ts` → `pricing.rows` | Real colours (Gray, Cappuccino, Obsidian). Edit name, size, thickness, price, `popular`. Swatch hexes in `Pricing.tsx`. |
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

The lead form submits straight into **Zoho CRM** via Web-to-Lead — no backend, no env
vars. The styled form posts to Zoho (`name → Last Name`, `phone → Mobile`) through a
hidden iframe, so the page never navigates and the visitor sees the inline success state.

To repoint leads at a different Zoho org/form: regenerate the webform in
**Zoho CRM → Setup → Developer Hub → Webforms** (Leads module), then replace the
`ZOHO_*` constants at the top of `src/components/LeadForm.tsx` (action URL, `xnQsjsdp`,
`xmIwtLD`, and the analytics src). Keep reCAPTCHA off on the webform; the form includes
Zoho's honeypot field instead.

## Deploy

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```
