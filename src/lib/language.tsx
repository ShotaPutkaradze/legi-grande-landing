"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { content, type Lang, type Content } from "./content";
import { storageGet, storageSet } from "./storage";

const LANG_KEY = "legi-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Content;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    // Read the saved language after mount. Doing this in a lazy initializer
    // instead would cause an SSR/client hydration mismatch, so the post-mount
    // setState here is intentional.
    const stored = storageGet("local", LANG_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "ka" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Memoized so consumers only re-render when the language actually changes.
  const value = useMemo<Ctx>(() => {
    const setLang = (l: Lang) => {
      setLangState(l);
      storageSet("local", LANG_KEY, l);
    };
    return { lang, setLang, toggle: () => setLang(lang === "ka" ? "en" : "ka"), t: content[lang] };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
