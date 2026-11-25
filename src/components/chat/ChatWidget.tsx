import Script from "next/script";

const WIDGET_SRC =
  "https://legi-ai-core-1062355980136.europe-west3.run.app/widget/legi-chat-widget.js";

/**
 * LEGI AI Core chat widget (v2). The script is self-contained: it draws the
 * chat button, the "expert" teaser and the chat panel inside its own shadow
 * root, keeps the conversation for a day, and sends its own funnel telemetry.
 * Everything configurable is passed through the data attributes below, which
 * next/script forwards to the <script> element the widget reads them from.
 */
export default function ChatWidget() {
  return (
    <Script
      src={WIDGET_SRC}
      data-profile="grande"
      data-title="LEGI • Grande ექსპერტი"
      data-teaser-title="LEGI Grande ექსპერტი"
      data-teaser-body="დაგეხმარებით Grande 800×400 ფილის რაოდენობის, პალეტებისა და ფასის დათვლაში!"
      data-primary-color="#c28d5d"
      data-dark-color="#2c3e50"
      data-bot-name="LEGI_Grande_Core_Bot"
      data-bot-id="legi-ai-core-grande"
      data-is-test="false"
    />
  );
}
