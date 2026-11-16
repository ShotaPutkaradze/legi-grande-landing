declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Meta Pixel standard event (no-op until the pixel script has loaded). */
export function trackPixel(event: "Lead" | "Contact") {
  window.fbq?.("track", event);
}

/** Google Analytics event (no-op unless gtag.js is installed on the page). */
export function trackGtag(event: string, params: Record<string, string>) {
  window.gtag?.("event", event, params);
}
