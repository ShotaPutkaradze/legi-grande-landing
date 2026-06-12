"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content, type Lang, type Content } from "./content";

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
    const stored = window.localStorage.getItem("legi-lang") as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "ka" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("legi-lang", l);
  };

  const toggle = () => setLang(lang === "ka" ? "en" : "ka");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
