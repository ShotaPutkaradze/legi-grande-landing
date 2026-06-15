"use client";

import { useEffect } from "react";

/**
 * Fires the Meta Pixel "Contact" event whenever a phone-number link is tapped
 * (header, contact card, footer). Uses one delegated listener so every current
 * and future tel: link is covered.
 */
export default function PhoneTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (link) {
        (window as Window & { fbq?: (...args: unknown[]) => void }).fbq?.(
          "track",
          "Contact",
        );
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
