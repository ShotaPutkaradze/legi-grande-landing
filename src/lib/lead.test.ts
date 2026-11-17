import { describe, expect, it } from "vitest";
import { NAME_MAX, PHONE_PATTERN, isValidName, isValidPhone } from "./lead";

// Browsers compile an input's `pattern` as /^(?:pattern)$/v — the strictest mode.
const browserPattern = new RegExp(`^(?:${PHONE_PATTERN})$`, "v");

describe("lead rules", () => {
  it.each(["+995 577 10 16 10", "577101610", "(+995) 577 10 16 10", "577-10-16-10"])(
    "accepts %s in the browser and on the server",
    (phone) => {
      expect(browserPattern.test(phone)).toBe(true);
      expect(isValidPhone(phone)).toBe(true);
    },
  );

  it.each(["abc", "5XX XX XX", "12345", "+995 577 10 16 10 ext 5"])("rejects %s", (phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });

  it("needs at least 6 digits even when the characters are allowed", () => {
    expect(browserPattern.test("------")).toBe(true);
    expect(isValidPhone("------")).toBe(false);
  });

  it("limits the name length", () => {
    expect(isValidName("ნინო")).toBe(true);
    expect(isValidName("")).toBe(false);
    expect(isValidName("a".repeat(NAME_MAX + 1))).toBe(false);
  });
});
