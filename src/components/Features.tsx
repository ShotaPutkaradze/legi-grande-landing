"use client";

import { useLang } from "@/lib/language";
import { featureIcons } from "./icons";

export default function Features() {
 const { t } = useLang();

 return (
 <section id="product" className="bg-white py-14 sm:py-20 lg:py-28 border-y border-stone-200">
 <div className="mx-auto max-w-7xl px-5 sm:px-8">
 <div className="max-w-2xl">
 <p className="eyebrow text-red">{t.features.eyebrow}</p>
 <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
 {t.features.title}
 </h2>
 </div>

 <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {t.features.items.map((item, i) => {
 const Icon = featureIcons[i % featureIcons.length];
 return (
 <div
 key={item.title}
 className="group border border-stone-200 bg-stone-50 p-6 transition-all hover:border-red/40 hover:shadow-soft hover:-translate-y-0.5"
 >
 <div className="flex h-12 w-12 items-center justify-center bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-white">
 <Icon className="h-6 w-6" />
 </div>
 <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.text}</p>
 </div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
