// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { storageGet, storageSet } from "./storage";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

describe("storage helpers", () => {
  it("reads and writes both storage areas", () => {
    storageSet("local", "a", "1");
    storageSet("session", "b", "2");
    expect(storageGet("local", "a")).toBe("1");
    expect(storageGet("session", "b")).toBe("2");
    expect(storageGet("local", "missing")).toBeNull();
  });

  it("never throws when storage is blocked", () => {
    for (const method of ["getItem", "setItem"] as const) {
      vi.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new DOMException("blocked", "SecurityError");
      });
    }
    expect(() => storageSet("local", "a", "1")).not.toThrow();
    expect(storageGet("local", "a")).toBeNull();
  });
});
