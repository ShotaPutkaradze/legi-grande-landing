"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { useLang } from "@/lib/language";
import { PHONE, PHONE_HREF } from "@/lib/content";
import { IconArrow, IconCheck, IconPhone } from "./icons";

/**
 * Zoho CRM Web-to-Lead (EU data center).
 * These values come from the webform generated in Zoho CRM
 * (Setup → Developer Hub → Webforms, Leads module). The tokens are public by
 * design — that's how Zoho's client-side web-to-lead forms work. To repoint
 * leads at a different Zoho org/form, regenerate the webform and replace these.
 */
const ZOHO_ACTION = "https://crm.zoho.eu/crm/WebToLeadForm";
const ZOHO_XNQSJSDP =
  "c3c7f77d840ef21ae52ae9af28f4eb1031aa66635c59d7d29e85ddd6f432fdc6";
const ZOHO_XMIWTLD =
  "1667cfad86d6d9b22743cca0386d89863a8dccf8e28da7bc3cea422f2f142fdf7c0962843a4bde6c2b3fb9957ddf9f63";
const ZOHO_ANALYTICS_SRC =
  "https://crm.zohopublic.eu/crm/WebFormAnalyticsServeServlet?rid=969afe3143fe6cb63b9a5d33981feaa410d79c18112bf42a28e3c9e424511399bef0e3d6a9982dfb138f0dabee7def8dgid8cd49291aa3ecaee9dca5d2aa6b904cd1876338977e096824a84afa5f7004d99gid420cd10653c67bd2191a2b1dd6bd3a9a904aaa3da7b5c94be71c7310838c99b0gidf9de778f23301af61648dba69166a6e9152744bd5c6a74228797491c584e7989&tw=b1d9b0fce146473981790975ac464b82d9869d252fa6c483a7872d985fc1db1e";

type Status = "idle" | "submitting" | "success";

export default function LeadForm() {
  const { t, lang } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");
  const submitted = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Native POST goes straight to Zoho, targeting the hidden iframe so the page
  // never navigates. We surface our own inline success once the iframe loads.
  function handleSubmit() {
    submitted.current = true;
    setStatus("submitting");
  }

  function handleIframeLoad() {
    if (!submitted.current) return; // ignore the initial about:blank load
    submitted.current = false;
    formRef.current?.reset();
    setStatus("success");
  }

  return (
    <section
      id="contact"
      className="bg-stone-50 text-ink py-14 sm:py-20 lg:py-28 border-t border-stone-200"
    >
      <Script id="zoho-wf-analytics" src={ZOHO_ANALYTICS_SRC} strategy="afterInteractive" />
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
              <form
                ref={formRef}
                action={ZOHO_ACTION}
                method="POST"
                target="zoho-lead-target"
                acceptCharset="UTF-8"
                onSubmit={handleSubmit}
                className="grid gap-4"
              >
                {/* Zoho web-to-lead required hidden fields — do not remove. */}
                <input type="hidden" name="xnQsjsdp" value={ZOHO_XNQSJSDP} readOnly />
                <input type="hidden" name="xmIwtLD" value={ZOHO_XMIWTLD} readOnly />
                <input type="hidden" name="actionType" value="TGVhZHM=" readOnly />
                <input type="hidden" name="returnURL" value="null" readOnly />
                <input type="hidden" name="zc_gad" value="" readOnly />

                <Field
                  label={f.name}
                  name="Last Name"
                  required
                  maxLength={80}
                  autoComplete="name"
                />
                <Field
                  label={f.phone}
                  name="Mobile"
                  type="tel"
                  required
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="5XX XX XX XX"
                />

                {/* Zoho honeypot — must stay empty. */}
                <input
                  type="text"
                  name="aG9uZXlwb3Q"
                  defaultValue=""
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

                <p className="text-xs text-stone-400">{f.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Hidden target: captures Zoho's response without navigating the page. */}
      <iframe
        name="zoho-lead-target"
        title="Zoho lead submission"
        onLoad={handleIframeLoad}
        className="hidden"
        aria-hidden="true"
      />
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
