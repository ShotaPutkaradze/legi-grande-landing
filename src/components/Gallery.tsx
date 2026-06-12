"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language";
import { IconClose } from "./icons";

type Shot = {
  src: string;
  alt: { ka: string; en: string };
  label: { ka: string; en: string };
  tall?: boolean;
};

const shots: Shot[] = [
  {
    src: "/gallery/grande-cappuccino-obsidian-paving.webp",
    alt: { ka: "Grande ყავისფერი და ობსიდიანი ფილა ფასადთან", en: "Grande Karva and Obsidian slabs by a facade" },
    label: { ka: "ფასადი · ყავისფერი + ობსიდიანი", en: "Facade · Karva + Obsidian" },
    tall: true,
  },
  {
    src: "/gallery/grande-gray-stepping-stones-lawn.webp",
    alt: { ka: "Grande ნაცრისფერი ფილა მოლზე, ბილიკად", en: "Grande Gray slabs as a path on a lawn" },
    label: { ka: "ბილიკი · ნაცრისფერი", en: "Pathway · Gray" },
  },
  {
    src: "/gallery/grande-obsidian-paver-closeup.webp",
    alt: { ka: "Grande ობსიდიანი ფილის ახლო ხედი", en: "Close-up of a Grande Obsidian slab" },
    label: { ka: "დეტალი · ობსიდიანი", en: "Detail · Obsidian" },
  },
  {
    src: "/gallery/grande-gray-garden-pathway.webp",
    alt: { ka: "Grande ნაცრისფერი ფილა ეზოში", en: "Grande Gray slabs in a garden" },
    label: { ka: "ეზო · ნაცრისფერი", en: "Garden · Gray" },
    tall: true,
  },
  {
    src: "/gallery/grande-cappuccino-obsidian-detail.webp",
    alt: { ka: "Grande ყავისფერი და ობსიდიანი ზედაპირის დეტალი", en: "Grande Karva and Obsidian surface detail" },
    label: { ka: "დეტალი · ყავისფერი + ობსიდიანი", en: "Detail · Karva + Obsidian" },
  },
  {
    src: "/gallery/grande-gray-paver-closeup.webp",
    alt: { ka: "Grande ნაცრისფერი ფილის ზედაპირი ახლოდან", en: "Grande Gray slab surface up close" },
    label: { ka: "ზედაპირი · ნაცრისფერი", en: "Surface · Gray" },
  },
];

export default function Gallery() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="bg-white py-14 sm:py-20 lg:py-28 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-red">{t.gallery.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-stone-500">{t.gallery.text}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[230px]">
          {shots.map((shot, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden ring-1 ring-stone-200 ${
                shot.tall ? "row-span-2" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt[lang]}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 text-left text-sm font-semibold text-white drop-shadow">
                {shot.label[lang]}
              </span>
              <span className="absolute inset-0 ring-0 ring-red transition-all group-hover:ring-2" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <IconClose />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={shots[active].src}
              alt={shots[active].alt[lang]}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <span className="absolute -bottom-7 left-0 text-sm font-semibold text-white/90">
              {shots[active].label[lang]}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
