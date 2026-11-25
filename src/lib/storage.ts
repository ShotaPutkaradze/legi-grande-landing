/**
 * localStorage / sessionStorage access that never throws. Storage can be
 * unavailable (blocked cookies, some private modes), and analytics or UI
 * preferences must never break the page because of it.
 */
type Area = "local" | "session";

function area(which: Area): Storage {
  return which === "local" ? window.localStorage : window.sessionStorage;
}

export function storageGet(which: Area, key: string): string | null {
  try {
    return area(which).getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(which: Area, key: string, value: string) {
  try {
    area(which).setItem(key, value);
  } catch {}
}
