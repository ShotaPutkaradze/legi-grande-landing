"use client";

import Image from "next/image";
import { useLang } from "@/lib/language";
import { IconArrow, IconTag } from "./icons";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative bg-white text-ink overflow-hidden">
      {/* light grey grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(33,30,30,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(33,30,30,.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* soft red corner glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96"
        style={{
          background:
            "radial-gradient(circle, rgba(167,31,39,.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-12 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
        <div className="grid md:grid-cols-2 md:grid-rows-[auto_auto] gap-x-10 lg:gap-x-12 gap-y-6 md:gap-y-7 items-start">
          {/* Headline (mobile: 1st · desktop: top-left) */}
          <div className="animate-fadeUp order-1 md:col-start-1 md:row-start-1">
            <span className="inline-flex items-center gap-2 border border-stone-200 bg-stone-50 px-3 py-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-red">
              <span className="h-1.5 w-1.5 bg-red" />
              {t.hero.badge}
            </span>

            <h1 className="mt-4 sm:mt-5 font-latin text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] text-ink">
              {t.hero.title}
            </h1>
            <div className="red-rule mt-3 w-24 sm:w-28" />
            <p className="mt-3 text-lg sm:text-2xl font-bold text-ink">
              {t.hero.subtitle}
            </p>
            <p className="mt-2 max-w-md text-base sm:text-lg italic text-stone-500 leading-snug">
              {t.hero.tagline}
            </p>
          </div>

          {/* Product photo (mobile: 2nd, right under the title · desktop: full-height right column) */}
          <div className="relative animate-fadeUp [animation-delay:120ms] order-2 md:col-start-2 md:row-start-1 md:row-span-2 md:self-stretch">
            <div className="relative aspect-[3/4] sm:aspect-[16/10] md:aspect-auto md:h-full overflow-hidden shadow-lift ring-1 ring-stone-200">
              <Image
                src="/grande-pavers-gray-cappuccino-obsidian.webp"
                alt="Grande მსხვილფორმატიანი ბეტონის ფილა სამ ფერში — Gray, Karva და Obsidian — გაზონზე"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* colour caption — desktop only (mobile shows the CTA here) */}
              <div className="hidden md:block absolute bottom-4 left-4 bg-ink/80 backdrop-blur px-3 py-2 text-xs font-semibold text-white">
                {t.hero.photoCaption}
              </div>

              {/* Mobile price CTA — overlaps the bottom of the hero shot (no scroll needed) */}
              <a
                href="#pricing"
                className="md:hidden absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-red px-6 pt-4 pb-5 text-base font-bold uppercase tracking-wide text-white shadow-[0_-10px_30px_rgba(0,0,0,0.25)]"
              >
                <IconTag className="h-4 w-4" />
                {t.hero.ctaPrice}
              </a>
            </div>

            {/* floating chip */}
            <div className="absolute -top-4 -right-2 sm:-right-4 rotate-3 bg-red px-4 py-3 shadow-lift">
              <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">EN 1338</div>
              <div className="text-sm font-bold text-white">{t.hero.certified}</div>
            </div>
          </div>

          {/* Details: copy, CTAs, stats (mobile: 3rd · desktop: bottom-left) */}
          <div className="animate-fadeUp order-3 md:col-start-1 md:row-start-2">
            <p className="max-w-lg text-base sm:text-lg text-stone-600 leading-relaxed">
              {t.hero.lead}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-red px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold uppercase tracking-wide text-white shadow-lift hover:bg-red-dark transition-colors"
              >
                {t.hero.ctaPrimary}
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#pricing"
                className="hidden md:inline-flex items-center gap-2 border border-stone-300 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-bold uppercase tracking-wide text-ink hover:border-ink hover:bg-stone-50 transition-colors"
              >
                <IconTag className="h-4 w-4 text-red" />
                {t.hero.ctaSecondary}
              </a>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-md border-t border-stone-200 pt-6 sm:pt-7">
              {t.hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-latin text-2xl sm:text-3xl text-red">{s.value}</dt>
                  <dd className="mt-1 text-xs text-stone-500 leading-snug">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
