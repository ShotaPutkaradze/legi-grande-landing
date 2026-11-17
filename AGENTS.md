<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

- All visitor-facing text (Georgian + English) lives in `src/lib/content.ts`; prices only in `PRODUCTS` there.
- Lead validation rules are shared via `src/lib/lead.ts` (form and `/api/lead`).
- Photos: after adding or replacing one in `public/` or `public/gallery/`, run `npm run images` (Cloudflare does not resize images; `src/lib/image-loader.ts` serves `public/sized/` copies).
- Before committing: `npm run lint`, `npm run format:check`, `npx tsc --noEmit`, `npm test`. CI runs the same plus `next build`.
- `npm run preview` runs the site on the real Cloudflare Workers runtime (port 8787) — use it to check headers, images and API routes as production runs them.
