"use client";

import { useId, useState } from "react";
import { useLang } from "@/lib/language";
import { PHONE } from "@/lib/content";
import { trackPixel } from "@/lib/analytics";
import { NAME_MAX, PHONE_MAX, PHONE_PATTERN, isValidPhone } from "@/lib/lead";
import { IconArrow, IconCheck, IconPhone } from "./icons";
import PhoneLink from "./PhoneLink";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "submitting" | "success" | "invalid" | "error";

export default function LeadForm() {
  const { t } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");

  // Post same-origin to our route, which forwards the lead to Zoho CRM
  // server-side (Zoho rejects cross-origin browser posts).
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!isValidPhone(String(data.phone ?? "").trim())) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 422) {
        setStatus("invalid");
        return;
      }
      if (!res.ok) throw new Error("request failed");
      // Meta Pixel: standard Lead conversion event for ad optimization.
      trackPixel("Lead");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="bg-stone-50 text-ink py-14 sm:py-20 lg:py-28 border-t border-stone-200"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: pitch + contact */}
          <SectionHeading eyebrow={f.eyebrow} title={f.title} className="">
            <p className="mt-4 max-w-md text-stone-600 leading-relaxed">{f.text}</p>

            <PhoneLink className="mt-8 inline-flex items-center gap-3 border border-stone-200 bg-white px-5 py-4 hover:border-red transition-colors">
              <span className="flex h-11 w-11 items-center justify-center bg-red text-white">
                <IconPhone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-stone-500">{f.callUs}</span>
                <span className="block text-lg font-bold">{PHONE}</span>
              </span>
            </PhoneLink>
          </SectionHeading>

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
                  {t.ui.newRequest}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <Field
                  label={f.name}
                  name="name"
                  required
                  maxLength={NAME_MAX}
                  autoComplete="name"
                />
                <Field
                  label={f.phone}
                  name="phone"
                  type="tel"
                  required
                  maxLength={PHONE_MAX}
                  pattern={PHONE_PATTERN}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="5XX XX XX XX"
                />

                {/* honeypot — must stay empty */}
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

                {status === "invalid" && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {f.invalidPhone}
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {f.error} <PhoneLink className="whitespace-nowrap font-bold underline" />
                  </p>
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
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-stone-700">
        {label}
        {required && <span className="text-red"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:border-red focus:bg-white focus:ring-2 focus:ring-red/20"
        {...rest}
      />
    </div>
  );
}
