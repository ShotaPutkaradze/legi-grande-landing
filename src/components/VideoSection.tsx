"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { IconPlay } from "./icons";

/**
 * Drop-in video.
 * To use a real video, set VIDEO_EMBED_URL to a YouTube/Vimeo embed URL,
 * e.g. "https://www.youtube.com/embed/XXXXXXXX".
 * Leave it null to keep the placeholder poster with the play button.
 */
const VIDEO_EMBED_URL: string | null = null;

export default function VideoSection() {
 const { t } = useLang();
 const [playing, setPlaying] = useState(false);

 return (
 <section id="video" className="bg-stone-50 py-14 sm:py-20 lg:py-28">
 <div className="mx-auto max-w-5xl px-5 sm:px-8">
 <div className="text-center max-w-2xl mx-auto">
 <p className="eyebrow text-red">{t.video.eyebrow}</p>
 <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
 {t.video.title}
 </h2>
 <p className="mt-4 text-stone-500">{t.video.text}</p>
 </div>

 <div className="mt-10 relative aspect-video overflow-hidden shadow-lift ring-1 ring-stone-200 bg-stone-200">
 {playing && VIDEO_EMBED_URL ? (
 <iframe
 className="absolute inset-0 h-full w-full"
 src={`${VIDEO_EMBED_URL}?autoplay=1`}
 title={t.video.title}
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 ) : (
 <button
 onClick={() => setPlaying(true)}
 className="group absolute inset-0 flex flex-col items-center justify-center bg-stone-200"
 aria-label={t.hero.ctaSecondary}
 >
 <span className="flex h-20 w-20 items-center justify-center bg-red text-white shadow-lift transition-transform group-hover:scale-110">
 <IconPlay className="h-8 w-8 translate-x-0.5" />
 </span>
 <span className="mt-5 text-sm font-medium text-stone-500">
 {VIDEO_EMBED_URL ? t.video.title : t.video.replace}
 </span>
 </button>
 )}
 </div>
 </div>
 </section>
 );
}
