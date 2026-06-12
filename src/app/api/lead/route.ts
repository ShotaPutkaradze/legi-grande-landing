import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Server-side proxy to Zoho CRM Web-to-Lead.
 *
 * The browser can't post the lead directly: Zoho rejects cross-origin
 * `no-cors` requests, and a native form post conflicts with React's re-render
 * during submit. So the form posts same-origin to this route, and the server
 * forwards it to Zoho exactly like a normal web-to-lead submission (which Zoho
 * accepts), returning a real success/failure to the client.
 *
 * Tokens come from the Zoho webform (Setup → Developer Hub → Webforms, Leads).
 * They are public by design. To repoint at another Zoho org/form, regenerate
 * the webform and replace these.
 */
const ZOHO_ACTION = "https://crm.zoho.eu/crm/WebToLeadForm";
const ZOHO_XNQSJSDP =
  "c3c7f77d840ef21ae52ae9af28f4eb1031aa66635c59d7d29e85ddd6f432fdc6";
const ZOHO_XMIWTLD =
  "1667cfad86d6d9b22743cca0386d89863a8dccf8e28da7bc3cea422f2f142fdf7c0962843a4bde6c2b3fb9957ddf9f63";

type LeadBody = {
  name?: string;
  phone?: string;
  company?: string; // honeypot
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field → silently accept, don't forward.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 },
    );
  }

  const params = new URLSearchParams({
    xnQsjsdp: ZOHO_XNQSJSDP,
    xmIwtLD: ZOHO_XMIWTLD,
    actionType: "TGVhZHM=", // base64("Leads")
    returnURL: "null",
    "Last Name": name,
    Mobile: phone,
    // Tags the lead so it's filterable in Zoho. For this to populate, add
    // "Grande Landing" as a Lead Source picklist option in the Leads module
    // (Setup → Modules → Leads → Lead Source). Until then the lead still saves
    // with a blank source — no harm.
    "Lead Source": "Grande Landing",
    aG9uZXlwb3Q: "", // Zoho honeypot — must be empty
  });

  try {
    const res = await fetch(ZOHO_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    });
    const text = await res.text();
    const accepted =
      res.ok && /submitted successfully|Thank you for submitting/i.test(text);

    if (!accepted) {
      console.error("[lead] Zoho rejected:", res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: "Zoho rejected" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] proxy error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
