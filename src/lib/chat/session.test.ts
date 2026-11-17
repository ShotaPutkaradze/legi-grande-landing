// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CHAT_TTL_MS } from "./config";

// session.ts caches the session id in module state, so each test gets a fresh copy.
async function loadSession() {
  vi.resetModules();
  return import("./session");
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("expireOldChat", () => {
  it("clears stored df-messenger conversation after the TTL", async () => {
    const { expireOldChat } = await loadSession();
    vi.useFakeTimers({ now: 1_000_000_000_000 });
    localStorage.setItem("legi_chat_last_active", String(Date.now() - CHAT_TTL_MS - 1));
    localStorage.setItem("df-messenger-chat-history", "old");
    sessionStorage.setItem("df-messenger-session", "old");
    localStorage.setItem("legi-lang", "en");

    expireOldChat();

    expect(localStorage.getItem("df-messenger-chat-history")).toBeNull();
    expect(sessionStorage.getItem("df-messenger-session")).toBeNull();
    expect(localStorage.getItem("legi-lang")).toBe("en");
    expect(localStorage.getItem("legi_chat_last_active")).toBe(String(Date.now()));
  });

  it("keeps a recent conversation", async () => {
    const { expireOldChat } = await loadSession();
    localStorage.setItem("legi_chat_last_active", String(Date.now() - 1000));
    localStorage.setItem("df-messenger-chat-history", "recent");

    expireOldChat();

    expect(localStorage.getItem("df-messenger-chat-history")).toBe("recent");
  });
});

describe("getSessionId", () => {
  it("is stable within a session and stored in sessionStorage", async () => {
    const { getSessionId } = await loadSession();
    const id = getSessionId();
    expect(id).toMatch(/^sess_\d+_[a-z0-9]+$/);
    expect(getSessionId()).toBe(id);
    expect(sessionStorage.getItem("legi_ai_sid")).toBe(id);
  });

  it("stays stable even when storage is blocked", async () => {
    const { getSessionId } = await loadSession();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getSessionId()).toBe(getSessionId());
    vi.restoreAllMocks();
  });
});

describe("opened flag", () => {
  it("round-trips through sessionStorage", async () => {
    const { markOpened, wasOpened } = await loadSession();
    expect(wasOpened()).toBe(false);
    markOpened();
    expect(wasOpened()).toBe(true);
  });
});

describe("enrichSession", () => {
  // Stand-in for <df-messenger>, recording what the widget would receive.
  async function mountMessenger() {
    const setQueryParameters = vi.fn();
    if (!customElements.get("df-messenger")) {
      customElements.define("df-messenger", class extends HTMLElement {});
    }
    const el = document.createElement("df-messenger");
    Object.assign(el, { setQueryParameters });
    document.body.append(el);
    return setQueryParameters;
  }

  it("passes UTM tags, geo and a first-visit flag", async () => {
    const { enrichSession } = await loadSession();
    window.history.replaceState(null, "", "/?utm_source=facebook&utm_campaign=grande&fbclid=abc");
    const setQueryParameters = await mountMessenger();

    await enrichSession({ ip: "1.2.3.4", city: "Tbilisi", country: "GE" });

    const { parameters } = setQueryParameters.mock.calls[0][0];
    expect(parameters).toMatchObject({
      utm_source: "facebook",
      utm_campaign: "grande",
      utm_medium: "none",
      fbclid: "abc",
      client_ip: "1.2.3.4",
      client_city: "Tbilisi",
      client_country: "GE",
      is_returning: "no",
    });
  });

  it("remembers UTM tags for the session and marks a returning visit", async () => {
    const { enrichSession } = await loadSession();
    window.history.replaceState(null, "", "/?utm_source=google");
    await enrichSession({});
    document.body.innerHTML = "";

    window.history.replaceState(null, "", "/#pricing");
    const setQueryParameters = await mountMessenger();
    await enrichSession({});

    const { parameters } = setQueryParameters.mock.calls[0][0];
    expect(parameters.utm_source).toBe("google");
    expect(parameters.is_returning).toBe("yes");
    expect(parameters.client_city).toBe("unknown");
  });
});
