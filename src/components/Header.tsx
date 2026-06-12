"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language";
import { PHONE, PHONE_HREF } from "@/lib/content";
import { IconPhone } from "./icons";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <a href="#top" className="flex items-center select-none" aria-label="Legi — ვქმნით ხარისხს">
      <Image
        src="/legi-logo.webp"
        alt="Legi"
        width={154}
        height={40}
        priority
        className={`${className} w-auto`}
      />
    </a>
  );
}

export default function Header() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#product", label: t.nav.product },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-soft"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold uppercase tracking-wide text-stone-600 hover:text-red transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggle}
              className="border border-stone-300 px-3 py-1.5 text-xs font-bold text-stone-600 hover:border-red hover:text-red transition-colors"
              aria-label="Switch language"
            >
              {lang === "ka" ? "EN" : "ქა"}
            </button>

            <a
              href={`tel:${PHONE_HREF}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-red transition-colors"
            >
              <IconPhone className="h-4 w-4 text-red" />
              <span className="hidden lg:inline">{PHONE}</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center bg-red px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-dark transition-colors"
            >
              {t.nav.cta}
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden ml-1 inline-flex h-9 w-9 items-center justify-center border border-stone-300"
              aria-label="Menu"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <nav className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-semibold uppercase tracking-wide text-stone-700"
              >
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE_HREF}`} className="py-2 text-base font-bold text-red">
              {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
