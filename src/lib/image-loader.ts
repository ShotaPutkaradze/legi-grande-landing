"use client";

import variants from "./image-variants.json";

/**
 * next/image loader backed by pre-generated copies (see scripts/resize-images.mjs).
 * For each srcset width it returns the smallest copy that is at least that wide,
 * or the original file. Images without copies (e.g. the logo) load unchanged.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const widths: number[] = (variants as Record<string, number[]>)[src] ?? [];
  const best = widths.find((w) => w >= width);
  return best ? variantUrl(src, best) : src;
}

export function variantUrl(src: string, width: number) {
  return "/sized" + src.replace(/\.webp$/, `-w${width}.webp`);
}
