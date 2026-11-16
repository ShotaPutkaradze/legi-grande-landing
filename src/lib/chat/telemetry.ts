import { trackGtag } from "@/lib/analytics";
import { BOT_NAME, DF_AGENT_ID, TELEMETRY_ENDPOINT } from "./config";
import { getSessionId, type Geo } from "./session";

export type FunnelEvent = "page_view" | "chat_opened" | "message_sent";

/** Fire-and-forget funnel event; failures never affect the page. */
export function trackFunnelEvent(event: FunnelEvent, geo: Geo) {
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

    trackGtag(`ai_${event}`, {
      bot_name: BOT_NAME,
      page_path: window.location.pathname,
    });
  } catch {}
}
