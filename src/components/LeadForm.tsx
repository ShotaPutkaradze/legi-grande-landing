"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { PHONE, PHONE_HREF } from "@/lib/content";
import { IconArrow, IconCheck, IconPhone } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const { t, lang } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-stone-50 text-ink py-14 sm:py-20 lg:py-28 border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: pitch + contact */}
          <div>
            <p className="eyebrow text-red">{f.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              {f.title}
            </h2>
            <p className="mt-4 max-w-md text-stone-600 leading-relaxed">{f.text}</p>

            <a
              href={`tel:${PHONE_HREF}`}
              className="mt-8 inline-flex items-center gap-3 border border-stone-200 bg-white px-5 py-4 hover:border-red transition-colors"
            >
              <span className="flex h-11 w-11 items-center justify-center bg-red text-white">
                <IconPhone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-stone-500">{f.callUs}</span>
                <span className="block text-lg font-bold">{PHONE}</span>
              </span>
            </a>
          </div>

          {/* Right: form */}
          <div className="bg-white border border-stone-200 p-6 sm:p-8 text-ink shadow-soft">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center bg-red text-white">
                  <IconCheck className="h-7 w-7" />
                </span>
                <p className="mt-5 text-lg font-bold">{f.success}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold text-red hover:text-red-dark"
                >
                  {lang === "ka" ? "ახალი მოთხოვნა" : "New request"}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <Field label={f.name} name="name" required autoComplete="name" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label={f.phone}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="5XX XX XX XX"
                  />
                  <Field label={f.area} name="area" type="number" inputMode="numeric" placeholder="50" />
                </div>
                <Field label={f.email} name="email" type="email" autoComplete="email" />
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    {f.message}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:border-red focus:bg-white focus:ring-2 focus:ring-red/20"
                  />
                </div>

                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-1 inline-flex items-center justify-center gap-2 bg-red px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-soft hover:bg-red-dark transition-colors disabled:opacity-60"
                >
                  {status === "submitting" ? f.submitting : f.submit}
                  {status !== "submitting" && (
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-600">{f.error}</p>
                )}
                <p className="text-xs text-stone-400">{f.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-stone-700">
        {label}
        {required && <span className="text-red"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:border-red focus:bg-white focus:ring-2 focus:ring-red/20"
        {...rest}
      />
    </div>
  );
}
