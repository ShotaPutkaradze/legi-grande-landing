"use client";

import { useLang } from "@/lib/language";
import { IconArrow, IconCheck } from "./icons";

export default function Pricing() {
 const { t } = useLang();
 const p = t.pricing;

 return (
 <section id="pricing" className="bg-white py-20 sm:py-28 border-y border-stone-200">
 <div className="mx-auto max-w-6xl px-5 sm:px-8">
 <div className="max-w-2xl">
 <p className="eyebrow text-red">{p.eyebrow}</p>
 <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
 {p.title}
 </h2>
 </div>

 {/* Desktop table */}
 <div className="mt-10 hidden md:block overflow-hidden border border-stone-200">
 <table className="w-full text-left">
 <thead>
 <tr className="bg-stone-100 text-xs uppercase tracking-wider text-stone-500">
 <th className="px-6 py-4 font-semibold">{p.columns.product}</th>
 <th className="px-6 py-4 font-semibold">{p.columns.size}</th>
 <th className="px-6 py-4 font-semibold">{p.columns.thickness}</th>
 <th className="px-6 py-4 font-semibold text-right">{p.columns.price}</th>
 <th className="px-6 py-4" />
 </tr>
 </thead>
 <tbody className="divide-y divide-stone-200">
 {p.rows.map((r) => (
 <tr key={r.name} className={r.popular ? "bg-red/5" : "bg-white"}>
 <td className="px-6 py-5">
 <div className="flex items-center gap-3">
 <span
 className="h-7 w-7 ring-1 ring-stone-300"
 style={{ backgroundColor: swatch(r.name) }}
 />
 <span className="font-semibold text-ink">{r.name}</span>
 {r.popular && (
 <span className=" bg-red px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
 {p.popular}
 </span>
 )}
 </div>
 </td>
 <td className="px-6 py-5 text-stone-600">{r.size}</td>
 <td className="px-6 py-5 text-stone-600">{r.thickness}</td>
 <td className="px-6 py-5 text-right">
 <span className="text-xl font-extrabold text-ink">{r.price}</span>
 <span className="ml-1 text-sm text-stone-500">{p.unit}</span>
 </td>
 <td className="px-6 py-5 text-right">
 <a
 href="#contact"
 className="inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-red transition-colors"
 >
 {p.cta}
 <IconArrow className="h-3.5 w-3.5" />
 </a>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* Mobile cards */}
 <div className="mt-8 md:hidden grid gap-4">
 {p.rows.map((r) => (
 <div
 key={r.name}
 className={` border p-5 ${
 r.popular ? "border-red bg-red/5" : "border-stone-200 bg-white"
 }`}
 >
 <div className="flex items-center gap-3">
 <span
 className="h-8 w-8 ring-1 ring-stone-300"
 style={{ backgroundColor: swatch(r.name) }}
 />
 <span className="font-bold text-ink">{r.name}</span>
 {r.popular && (
 <span className="ml-auto bg-red px-2.5 py-0.5 text-[0.6rem] font-bold uppercase text-white">
 {p.popular}
 </span>
 )}
 </div>
 <div className="mt-4 flex items-end justify-between">
 <div className="text-sm text-stone-500">
 {r.size} · {r.thickness}
 </div>
 <div>
 <span className="text-2xl font-extrabold text-ink">{r.price}</span>
 <span className="ml-1 text-sm text-stone-500">{p.unit}</span>
 </div>
 </div>
 <a
 href="#contact"
 className="mt-4 flex items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-sm font-semibold text-white"
 >
 {p.cta}
 <IconArrow className="h-3.5 w-3.5" />
 </a>
 </div>
 ))}
 </div>

 <p className="mt-6 flex items-start gap-2 text-sm text-stone-500">
 <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-red" />
 {p.note}
 </p>
 </div>
 </section>
 );
}

function swatch(name: string): string {
 if (name.includes("Gray")) return "#b4b1a8";
 if (name.includes("Cappuccino")) return "#977258";
 if (name.includes("Obsidian")) return "#3f3f42";
 return "#b4b1a8";
}
