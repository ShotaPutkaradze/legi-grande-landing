// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { storageGet, storageRemoveMatching, storageSet } from "./storage";

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
    for (const method of ["getItem", "setItem", "removeItem"] as const) {
      vi.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new DOMException("blocked", "SecurityError");
      });
    }
    expect(() => storageSet("local", "a", "1")).not.toThrow();
    expect(storageGet("local", "a")).toBeNull();
    expect(() => storageRemoveMatching("a")).not.toThrow();
  });

  it("removes only keys containing the fragment, in both areas", () => {
    localStorage.setItem("df-messenger-x", "1");
    sessionStorage.setItem("df-messenger-y", "1");
    localStorage.setItem("legi-lang", "ka");

    storageRemoveMatching("df-messenger");

    expect(localStorage.getItem("df-messenger-x")).toBeNull();
    expect(sessionStorage.getItem("df-messenger-y")).toBeNull();
    expect(localStorage.getItem("legi-lang")).toBe("ka");
  });
});
