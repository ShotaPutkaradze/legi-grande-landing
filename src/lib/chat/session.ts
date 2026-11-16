import { storageGet, storageRemoveMatching, storageSet } from "@/lib/storage";
import { CHAT_TTL_MS } from "./config";

const LAST_ACTIVE_KEY = "legi_chat_last_active";
const OPENED_KEY = "chat_opened";
const SESSION_ID_KEY = "legi_ai_sid";
const VISITED_KEY = "legi_visited";
const UTM_KEY = "legi_utm";
const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type Geo = { ip?: string; city?: string; region?: string; country?: string };

type DfMessenger = HTMLElement & {
  setQueryParameters?: (params: { parameters: Record<string, string> }) => void;
};

export function markOpened() {
  storageSet("session", OPENED_KEY, "true");
}

export function wasOpened() {
  return storageGet("session", OPENED_KEY) === "true";
}

/** Clears df-messenger's stored conversation after CHAT_TTL_MS of inactivity. */
export function expireOldChat() {
  const now = Date.now();
  const lastActive = parseInt(storageGet("local", LAST_ACTIVE_KEY) ?? "0", 10);
  if (lastActive && now - lastActive > CHAT_TTL_MS) {
    storageRemoveMatching("df-messenger");
  }
  storageSet("local", LAST_ACTIVE_KEY, String(now));
}

// Kept in memory too, so the id stays stable for the page even if storage is blocked.
let sessionId: string | null = null;

export function getSessionId() {
  sessionId ??= storageGet("session", SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    storageSet("session", SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * UTM tags from the landing URL. Saved for the session so they survive
 * in-page navigation that drops the query string.
 */
function readUtm(): Record<string, string> {
  const url = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const key of UTM_FIELDS) {
    const value = url.get(key);
    if (value) fromUrl[key] = value;
  }
  if (Object.keys(fromUrl).length) {
    storageSet("session", UTM_KEY, JSON.stringify(fromUrl));
    return fromUrl;
  }
  try {
    return JSON.parse(storageGet("session", UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function checkReturning(): "yes" | "no" {
  const returning = storageGet("local", VISITED_KEY) ? "yes" : "no";
  storageSet("local", VISITED_KEY, "true");
  return returning;
}

export async function readGeo(): Promise<Geo> {
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    if (res.ok) return (await res.json()) as Geo;
  } catch {}
  return {};
}

/**
 * Passes visitor context (UTM, returning visit, IP/city) into the Dialogflow
 * CX session so the agent and its logs can see where the lead came from.
 */
export async function enrichSession(geo: Geo) {
  const utm = readUtm();
  const isReturning = checkReturning();
  await customElements.whenDefined("df-messenger");

  const messenger = document.querySelector("df-messenger") as DfMessenger | null;
  messenger?.setQueryParameters?.({
    parameters: {
      client_ip: geo.ip || "unknown",
      client_city: geo.city || "unknown",
      client_region: geo.region || "",
      client_country: geo.country || "",
      utm_source: utm.utm_source || "direct",
      utm_medium: utm.utm_medium || "none",
      utm_campaign: utm.utm_campaign || "none",
      utm_term: utm.utm_term || "",
      utm_content: utm.utm_content || "",
      gclid: utm.gclid || "",
      fbclid: utm.fbclid || "",
      referrer: document.referrer || "direct",
      is_returning: isReturning,
    },
  });
}
