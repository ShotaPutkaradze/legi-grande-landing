"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Dialogflow CX agent the widget talks to.
const DF_LOCATION = "europe-west3";
const DF_PROJECT_ID = "gen-lang-client-0970961690";
const DF_AGENT_ID = "2d05dad3-48c1-41df-bfc3-6bb138b70b0e";
const DF_LANGUAGE = "ka";

// Funnel telemetry: page view → chat opened → first message.
const BOT_NAME = "LEGI_Grande_Landing_Bot";
const TELEMETRY_ENDPOINT =
  "https://europe-west3-gen-lang-client-0970961690.cloudfunctions.net/copilot-api";

// Teaser appears after this delay or once the visitor scrolls past this point.
const TEASER_DELAY_MS = 8000;
const TEASER_SCROLL_PX = 300;

// Chat history is dropped after a day of inactivity so returning visitors
// start a fresh conversation.
const CHAT_TTL_MS = 24 * 60 * 60 * 1000;
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

type Geo = { ip?: string; city?: string; region?: string; country?: string };

type DfMessenger = HTMLElement & {
  setQueryParameters?: (params: { parameters: Record<string, string> }) => void;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function markOpened() {
  try {
    sessionStorage.setItem(OPENED_KEY, "true");
  } catch {}
}

function wasOpened() {
  try {
    return sessionStorage.getItem(OPENED_KEY) === "true";
  } catch {
    return false;
  }
}

/** Clears df-messenger's stored conversation after CHAT_TTL_MS of inactivity. */
function expireOldChat() {
  try {
    const now = Date.now();
    const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) ?? "0", 10);
    if (lastActive && now - lastActive > CHAT_TTL_MS) {
      for (const storage of [localStorage, sessionStorage]) {
        Object.keys(storage)
          .filter((key) => key.includes("df-messenger"))
          .forEach((key) => storage.removeItem(key));
      }
    }
    localStorage.setItem(LAST_ACTIVE_KEY, String(now));
  } catch {}
}

function getSessionId() {
  try {
    let sid = sessionStorage.getItem(SESSION_ID_KEY);
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem(SESSION_ID_KEY, sid);
    }
    return sid;
  } catch {
    return "unknown";
  }
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
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return fromUrl;
  }
}

function checkReturning(): "yes" | "no" {
  try {
    const returning = localStorage.getItem(VISITED_KEY) ? "yes" : "no";
    localStorage.setItem(VISITED_KEY, "true");
    return returning;
  } catch {
    return "no";
  }
}

async function readGeo(): Promise<Geo> {
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    if (res.ok) return (await res.json()) as Geo;
  } catch {}
  return {};
}

function trackFunnelEvent(event: string, geo: Geo) {
  try {
    fetch(TELEMETRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        action: "telemetry",
        event,
        bot_id: DF_AGENT_ID,
        bot_name: BOT_NAME,
        page_url: window.location.href,
        page_path: window.location.pathname,
        session_id: getSessionId(),
        client_ip: geo.ip ?? "",
        client_city: geo.city ?? "",
        client_country: geo.country ?? "",
      }),
    }).catch(() => {});

    window.gtag?.("event", `ai_${event}`, {
      bot_name: BOT_NAME,
      page_path: window.location.pathname,
    });
  } catch {}
}

/**
 * Passes visitor context (UTM, returning visit, IP/city) into the Dialogflow
 * CX session so the agent and its logs can see where the lead came from.
 */
async function enrichSession(geo: Geo) {
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

/**
 * LEGI-branded Dialogflow Messenger: graphite/bronze theme, a pulsing ring
 * around the chat button, an "expert" teaser that appears on scroll or after a
 * delay, and funnel telemetry (page view → chat opened → first message).
 */
export default function ChatWidget() {
  const [showTeaser, setShowTeaser] = useState(false);

  // Runs before the lazily loaded df-messenger script initialises, so an
  // expired conversation is cleared before the widget restores it.
  useEffect(() => {
    expireOldChat();
    const geo = readGeo();
    geo.then((g) => {
      trackFunnelEvent("page_view", g);
      enrichSession(g);
    });

    let chatOpenedTracked = false;
    let messageTracked = false;

    function onOpenChanged(e: Event) {
      if (!(e as CustomEvent<{ isOpen?: boolean }>).detail?.isOpen) return;
      setShowTeaser(false);
      markOpened();
      if (!chatOpenedTracked) {
        chatOpenedTracked = true;
        geo.then((g) => trackFunnelEvent("chat_opened", g));
      }
    }
    function onUserInput() {
      if (!messageTracked) {
        messageTracked = true;
        geo.then((g) => trackFunnelEvent("message_sent", g));
      }
    }
    window.addEventListener("df-chat-open-changed", onOpenChanged);
    window.addEventListener("df-user-input-entered", onUserInput);
    return () => {
      window.removeEventListener("df-chat-open-changed", onOpenChanged);
      window.removeEventListener("df-user-input-entered", onUserInput);
    };
  }, []);

  useEffect(() => {
    if (wasOpened()) return;
    let shown = false;
    function reveal() {
      if (shown || wasOpened()) return;
      shown = true;
      setShowTeaser(true);
      window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (window.scrollY > TEASER_SCROLL_PX) reveal();
    }
    const timer = setTimeout(reveal, TEASER_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function openChat() {
    const bubble = document.querySelector("df-messenger-chat-bubble") as
      | (HTMLElement & { openChat?: () => void })
      | null;
    bubble?.openChat?.();
    setShowTeaser(false);
    markOpened();
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
        strategy="lazyOnload"
      />

      <div className="legi-chat-ring" aria-hidden="true" />

      {showTeaser && (
        <div
          className="legi-chat-teaser"
          role="button"
          tabIndex={0}
          onClick={openChat}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openChat();
          }}
        >
          <div className="legi-chat-teaser-title">
            <span className="legi-chat-teaser-name">
              <span className="legi-chat-teaser-dot" />
              LEGI Grande ექსპერტი
            </span>
            <button
              type="button"
              className="legi-chat-teaser-close"
              aria-label="დახურვა"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
            >
              &times;
            </button>
          </div>
          <div className="legi-chat-teaser-body">
            დაგეხმარებით Grande 800×400 ფილის რაოდენობის, პალეტებისა და ფასის
            დათვლაში!
          </div>
        </div>
      )}

      {/* Custom elements go through innerHTML so TypeScript doesn't need JSX typings for them. */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
<df-messenger
  location="${DF_LOCATION}"
  project-id="${DF_PROJECT_ID}"
  agent-id="${DF_AGENT_ID}"
  language-code="${DF_LANGUAGE}"
  max-query-length="-1">
  <df-messenger-chat-bubble
    chat-title="LEGI • Grande ექსპერტი"
    placeholder-text="მიუთითეთ ფართობი (მაგ: 50 კვ.მ)...">
  </df-messenger-chat-bubble>
</df-messenger>`,
        }}
      />

      <style>{`
        df-messenger {
          z-index: 999999;
          position: fixed;
          bottom: 20px;
          right: 20px;
          --df-messenger-font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          --df-messenger-font-color: #1a1a1a;
          --df-messenger-primary-color: #c28d5d;
          --df-messenger-chat-bubble-background: #2c3e50;
          --df-messenger-chat-bubble-icon-color: #ffffff;
          --df-messenger-titlebar-background: #2c3e50;
          --df-messenger-titlebar-font-color: #ffffff;
          --df-messenger-chat-background: #ffffff;
          --df-messenger-message-user-background: #c28d5d;
          --df-messenger-message-user-font-color: #ffffff;
          --df-messenger-message-bot-background: #f4f6f9;
          --df-messenger-message-bot-font-color: #1a1a1a;
          --df-messenger-send-icon-color: #c28d5d;
        }

        /* Pulsing ring behind the 64px chat button. */
        .legi-chat-ring {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          z-index: 999998;
          pointer-events: none;
          animation: legi-glow 3s infinite;
        }
        @keyframes legi-glow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(194, 141, 93, 0.6); }
          70% { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(194, 141, 93, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(194, 141, 93, 0); }
        }

        .legi-chat-teaser {
          position: fixed;
          bottom: 95px;
          right: 20px;
          background: #ffffff;
          color: #2c3e50;
          padding: 12px 16px;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          border-left: 5px solid #c28d5d;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 13.5px;
          line-height: 1.4;
          max-width: 280px;
          cursor: pointer;
          z-index: 999998;
          transition: transform 0.2s ease, opacity 0.3s ease;
          animation: legi-slide-in 0.4s ease-out;
        }
        @keyframes legi-slide-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .legi-chat-teaser:hover { transform: translateY(-3px); }
        .legi-chat-teaser-title {
          font-weight: 700;
          color: #c28d5d;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 13px;
        }
        .legi-chat-teaser-name {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legi-chat-teaser-dot {
          background: #27ae60;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
        }
        .legi-chat-teaser-close {
          background: none;
          border: 0;
          color: #95a5a6;
          font-size: 18px;
          font-weight: bold;
          line-height: 1;
          padding: 0 4px;
          cursor: pointer;
        }
        .legi-chat-teaser-close:hover { color: #e74c3c; }
        .legi-chat-teaser-body {
          color: #34495e;
          font-size: 13px;
        }
      `}</style>
    </>
  );
}
