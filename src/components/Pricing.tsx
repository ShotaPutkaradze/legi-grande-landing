"use client";

import { useLang } from "@/lib/language";
import { IconArrow, IconCheck } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section id="pricing" className="bg-stone-50 py-14 sm:py-20 lg:py-28 border-y border-stone-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />

        {/* Desktop table */}
        <div className="mt-10 hidden md:block overflow-x-auto border border-stone-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-100 text-xs uppercase tracking-wider text-stone-500">
                <th className="px-6 py-4 font-semibold">{p.columns.product}</th>
                <th className="px-6 py-4 font-semibold">{p.columns.size}</th>
                <th className="px-6 py-4 font-semibold text-right">{p.columns.underTier}</th>
                <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">{p.columns.aboveTier}</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {p.rows.map((r) => (
                <tr key={r.name} className={r.popular ? "bg-red/5" : "bg-white"}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Swatch color={r.swatch} className="h-7 w-7" />
                      <span className="font-semibold text-ink">{r.name}</span>
                      {r.popular && (
                        <PopularBadge className="text-[0.65rem] tracking-wide">{p.popular}</PopularBadge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-stone-600 whitespace-nowrap">
                    {r.size} · {r.thickness}
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <Price value={r.pricePiece} unit={p.unitPiece} className="text-xl" />
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <Price value={r.priceSqm} unit={p.unitSqm} className="text-xl" />
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
              className={`border p-5 ${
                r.popular ? "border-red bg-red/5" : "border-stone-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Swatch color={r.swatch} className="h-8 w-8" />
                <span className="font-bold text-ink">{r.name}</span>
                {r.popular && (
                  <PopularBadge className="ml-auto text-[0.6rem]">{p.popular}</PopularBadge>
                )}
              </div>
              <div className="mt-2 text-sm text-stone-500">
                {r.size} · {r.thickness}
              </div>
              <div className="mt-4 grid grid-cols-2 items-stretch gap-3 border-t border-stone-200 pt-4">
                <div className="flex flex-col">
                  <div className="flex min-h-[1.5rem] items-start text-[0.7rem] font-semibold uppercase tracking-wide text-stone-500">
                    {p.columns.underTier}
                  </div>
                  <div className="mt-auto pt-1.5">
                    <Price value={r.pricePiece} unit={p.unitPiece} className="text-2xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex min-h-[1.5rem] items-start text-[0.7rem] font-semibold uppercase tracking-wide text-stone-500">
                    {p.columns.aboveTier}
                  </div>
                  <div className="mt-auto pt-1.5">
                    <Price value={r.priceSqm} unit={p.unitSqm} className="text-2xl" />
                  </div>
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

function Swatch({ color, className }: { color: string; className: string }) {
  return <span className={`${className} ring-1 ring-stone-300`} style={{ backgroundColor: color }} />;
}

function PopularBadge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`${className} bg-red px-2.5 py-0.5 font-bold uppercase text-white`}>
      {children}
    </span>
  );
}

function Price({ value, unit, className }: { value: string; unit: string; className: string }) {
  return (
    <>
      <span className={`${className} font-extrabold text-ink`}>{value}</span>
      <span className="ml-1 text-xs text-stone-500">{unit}</span>
    </>
  );
}
