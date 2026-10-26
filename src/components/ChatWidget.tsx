"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Dialogflow CX agent the widget talks to.
const DF_LOCATION = "europe-west3";
const DF_PROJECT_ID = "gen-lang-client-0970961690";
const DF_AGENT_ID = "2d05dad3-48c1-41df-bfc3-6bb138b70b0e";
const DF_LANGUAGE = "ru";

// Delay before the teaser bubble pops up above the chat button.
const TEASER_DELAY_MS = 3500;
const OPENED_KEY = "chat_opened";

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

type DfMessenger = HTMLElement & {
  setQueryParameters?: (params: { parameters: Record<string, string> }) => void;
};

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

async function readGeo() {
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    if (res.ok) return (await res.json()) as Record<string, string>;
  } catch {}
  return {};
}

/**
 * Passes visitor context (UTM, returning visit, IP/city) into the Dialogflow
 * CX session so the agent and its logs can see where the lead came from.
 */
async function enrichSession() {
  const utm = readUtm();
  const isReturning = checkReturning();
  const [geo] = await Promise.all([
    readGeo(),
    customElements.whenDefined("df-messenger"),
  ]);

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
 * LEGI-branded Dialogflow Messenger: graphite/terracotta theme, a pulsing ring
 * around the chat button and a "calculator" teaser that appears once per
 * session until the chat is opened.
 */
export default function ChatWidget() {
  const [showTeaser, setShowTeaser] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    enrichSession();
  }, []);

  useEffect(() => {
    if (wasOpened()) {
      const frame = requestAnimationFrame(() => setOpened(true));
      return () => cancelAnimationFrame(frame);
    }
    const timer = setTimeout(() => {
      if (!wasOpened()) setShowTeaser(true);
    }, TEASER_DELAY_MS);

    function onOpenChanged(e: Event) {
      if ((e as CustomEvent<{ isOpen?: boolean }>).detail?.isOpen) {
        setShowTeaser(false);
        setOpened(true);
        markOpened();
      }
    }
    window.addEventListener("df-chat-open-changed", onOpenChanged);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("df-chat-open-changed", onOpenChanged);
    };
  }, []);

  function openChat() {
    const bubble = document.querySelector("df-messenger-chat-bubble") as
      | (HTMLElement & { openChat?: () => void })
      | null;
    bubble?.openChat?.();
    setShowTeaser(false);
    setOpened(true);
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

      {!opened && <div className="legi-chat-ring" aria-hidden="true" />}

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
            <span>📐 LEGI კალკულატორი</span>
            <span className="legi-chat-teaser-dot" />
          </div>
          გამოთვალეთ Grande-ს ფილების რაოდენობა და ფასი 30 წამში! 👇
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
    chat-title="LEGI კალკულატორი"
    chat-subtitle="Grande ფილების გაანგარიშება"
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
          --df-messenger-primary-color: #d35400;
          --df-messenger-chat-bubble-background: #2c3e50;
          --df-messenger-chat-bubble-icon-color: #ffffff;
          --df-messenger-titlebar-background: #2c3e50;
          --df-messenger-titlebar-font-color: #ffffff;
          --df-messenger-chat-background: #ffffff;
          --df-messenger-message-user-background: #d35400;
          --df-messenger-message-user-font-color: #ffffff;
          --df-messenger-message-bot-background: #f4f6f9;
          --df-messenger-message-bot-font-color: #1a1a1a;
          --df-messenger-send-icon-color: #d35400;
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
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(211, 84, 0, 0.5); }
          70% { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(211, 84, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(211, 84, 0, 0); }
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
          border-left: 5px solid #d35400;
          font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 13.5px;
          line-height: 1.4;
          max-width: 270px;
          cursor: pointer;
          z-index: 999998;
          transition: transform 0.2s ease;
        }
        .legi-chat-teaser:hover { transform: translateY(-2px); }
        .legi-chat-teaser-title {
          font-weight: 700;
          color: #d35400;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .legi-chat-teaser-dot {
          background: #27ae60;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
