"use client";

import { useLang } from "@/lib/language";
import { PHONE, PHONE_HREF } from "@/lib/content";
import { Logo } from "./Header";

const socials = [
  { label: "Facebook", href: "https://facebook.com/legi.ge" },
  { label: "Instagram", href: "https://instagram.com/legi.ge" },
  { label: "YouTube", href: "https://youtube.com/@legi" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-stone-100 text-stone-600 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 brand-slant text-red">{t.slogan}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{t.footer.tagline}</p>
            <a
              href={`tel:${PHONE_HREF}`}
              className="mt-5 inline-block text-lg font-bold text-ink hover:text-red transition-colors"
            >
              {PHONE}
            </a>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t.footer.locations}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {t.footer.locationList.map((loc) => (
                <li key={loc}>{loc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t.footer.follow}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>
            © {new Date().getFullYear()} LEGI. {t.footer.rights}
          </span>
          <span className="text-stone-400">{t.footer.productLine}</span>
        </div>
      </div>
    </footer>
  );
}
