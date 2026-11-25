declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Meta Pixel standard event (no-op until the pixel script has loaded). */
export function trackPixel(event: "Lead" | "Contact") {
  window.fbq?.("track", event);
}
