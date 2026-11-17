// Pre-generates smaller copies of the site photos for next/image.
//
// Cloudflare Workers doesn't run Next's on-the-fly image optimizer (that needs
// the paid Cloudflare Images binding), so /_next/image would serve the full
// 300–800 KB originals to every phone. Instead we commit resized copies and a
// manifest; src/lib/image-loader.ts picks the right one per srcset width.
//
// Run after adding or replacing a photo in public/ or public/gallery/:
//   npm run images
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [640, 828, 1080];
const QUALITY = 78;
const SOURCES = [
  "public/grande-pavers-gray-cappuccino-obsidian.webp",
  ...readdirSync("public/gallery")
    .filter((f) => f.endsWith(".webp"))
    .map((f) => `public/gallery/${f}`),
];

const manifest = {};

for (const file of SOURCES) {
  const src = "/" + path.relative("public", file).replaceAll("\\", "/");
  const { width } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < width);
  for (const w of widths) {
    const out = path.join("public/sized", variantPath(src, w));
    mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width: w }).webp({ quality: QUALITY, effort: 6 }).toFile(out);
  }
  manifest[src] = widths;
  console.log(`${src}: ${widths.join(", ")} (original ${width}px)`);
}

writeFileSync("src/lib/image-variants.json", JSON.stringify(manifest, null, 2) + "\n");

/** Must match variantUrl() in src/lib/image-loader.ts. */
function variantPath(src, width) {
  return src.replace(/\.webp$/, `-w${width}.webp`);
}
