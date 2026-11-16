// Dialogflow CX agent the chat widget talks to.
export const DF_LOCATION = "europe-west3";
export const DF_PROJECT_ID = "gen-lang-client-0970961690";
export const DF_AGENT_ID = "2d05dad3-48c1-41df-bfc3-6bb138b70b0e";
export const DF_LANGUAGE = "ka";

export const DF_SCRIPT_URL =
  "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
export const DF_STYLESHEET_URL =
  "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";

// Funnel telemetry: page view → chat opened → first message.
export const BOT_NAME = "LEGI_Grande_Landing_Bot";
export const TELEMETRY_ENDPOINT = `https://${DF_LOCATION}-${DF_PROJECT_ID}.cloudfunctions.net/copilot-api`;

// Teaser appears after this delay or once the visitor scrolls past this point.
export const TEASER_DELAY_MS = 8000;
export const TEASER_SCROLL_PX = 300;

// Chat history is dropped after a day of inactivity so returning visitors
// start a fresh conversation.
export const CHAT_TTL_MS = 24 * 60 * 60 * 1000;
