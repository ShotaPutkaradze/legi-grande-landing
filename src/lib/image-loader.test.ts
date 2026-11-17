import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import imageLoader, { variantUrl } from "./image-loader";
import variants from "./image-variants.json";

const HERO = "/grande-pavers-gray-cappuccino-obsidian.webp";

describe("imageLoader", () => {
  it("picks the smallest pre-resized copy that is wide enough", () => {
    expect(imageLoader({ src: HERO, width: 384 })).toBe(
      "/sized/grande-pavers-gray-cappuccino-obsidian-w640.webp",
    );
    expect(imageLoader({ src: HERO, width: 640 })).toBe(
      "/sized/grande-pavers-gray-cappuccino-obsidian-w640.webp",
    );
    expect(imageLoader({ src: HERO, width: 828 })).toBe(
      "/sized/grande-pavers-gray-cappuccino-obsidian-w1080.webp",
    );
  });

  it("falls back to the original when no copy is wide enough", () => {
    expect(imageLoader({ src: HERO, width: 1920 })).toBe(HERO);
  });

  it("returns images without copies unchanged", () => {
    expect(imageLoader({ src: "/legi-logo.webp", width: 256 })).toBe("/legi-logo.webp");
  });

  it("has every file listed in the manifest on disk", () => {
    const missing = Object.entries(variants as Record<string, number[]>).flatMap(
      ([src, widths]) => [
        ...(existsSync(`public${src}`) ? [] : [`public${src}`]),
        ...widths.map((w) => `public${variantUrl(src, w)}`).filter((f) => !existsSync(f)),
      ],
    );
    expect(missing).toEqual([]);
  });
});
