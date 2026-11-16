import { describe, expect, it } from "vitest";
import { content, PRODUCTS } from "./content";

/** Shape of a value with strings/numbers/booleans erased, so ka and en can be compared. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)]),
    );
  }
  return typeof value;
}

describe("content", () => {
  it("has the same keys and list lengths in Georgian and English", () => {
    expect(shape(content.en)).toEqual(shape(content.ka));
  });

  it("has no empty strings", () => {
    const empty: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === "string" && !value.trim()) empty.push(path);
      else if (value && typeof value === "object")
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
    };
    walk(content, "content");
    expect(empty).toEqual([]);
  });

  it("shows the same prices in both languages, taken from PRODUCTS", () => {
    for (const lang of ["ka", "en"] as const) {
      const rows = content[lang].pricing.rows;
      expect(rows).toHaveLength(PRODUCTS.length);
      rows.forEach((row, i) => {
        expect(row.pricePiece).toBe(String(PRODUCTS[i].pricePiece));
        expect(row.priceSqm).toBe(String(PRODUCTS[i].priceSqm));
        expect(row.swatch).toBe(PRODUCTS[i].swatch);
      });
    }
  });

  it("has exactly one popular product", () => {
    expect(PRODUCTS.filter((p) => p.popular)).toHaveLength(1);
  });
});
