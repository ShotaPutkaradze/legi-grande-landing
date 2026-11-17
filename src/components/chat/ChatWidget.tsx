"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  DF_AGENT_ID,
  DF_LANGUAGE,
  DF_LOCATION,
  DF_PROJECT_ID,
  DF_SCRIPT_URL,
  DF_STYLESHEET_URL,
  TEASER_DELAY_MS,
  TEASER_SCROLL_PX,
} from "@/lib/chat/config";
import { enrichSession, expireOldChat, markOpened, readGeo, wasOpened } from "@/lib/chat/session";
import { trackFunnelEvent } from "@/lib/chat/telemetry";
import ChatTeaser from "./ChatTeaser";
import "./chat.css";

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
      (HTMLElement & { openChat?: () => void }) | null;
    bubble?.openChat?.();
    setShowTeaser(false);
    markOpened();
  }

  return (
    <>
      <link rel="stylesheet" href={DF_STYLESHEET_URL} />
      <Script src={DF_SCRIPT_URL} strategy="lazyOnload" />

      <div className="legi-chat-ring" aria-hidden="true" />

      {showTeaser && <ChatTeaser onOpen={openChat} onClose={() => setShowTeaser(false)} />}

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
    </>
  );
}
