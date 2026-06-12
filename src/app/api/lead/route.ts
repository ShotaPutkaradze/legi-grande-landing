import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  quantity?: string;
  lang?: string;
  company?: string; // honeypot
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden field → silently accept, don't notify.
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

  const lead = {
    name,
    phone,
    quantity: (body.quantity ?? "").trim() || "—",
    lang: body.lang === "en" ? "EN" : "KA",
    receivedAt: new Date().toISOString(),
  };

  const to = process.env.LEAD_NOTIFY_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL || "Grande Landing <onboarding@resend.dev>";

  // No email configured yet → log so nothing is lost during setup.
  if (!apiKey || !to) {
    console.log("[lead] (email not configured — logging only):", lead);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject: `🧱 ახალი ლიდი — Grande: ${lead.name}`,
      text: buildText(lead),
      html: buildHtml(lead),
    });

    if (error) {
      console.error("[lead] resend error:", error);
      return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

type Lead = {
  name: string;
  phone: string;
  quantity: string;
  lang: string;
  receivedAt: string;
};

function buildText(l: Lead) {
  return [
    "ახალი ლიდი — Grande landing page",
    "----------------------------------",
    `სახელი:      ${l.name}`,
    `ტელეფონი:    ${l.phone}`,
    `რაოდენობა:   ${l.quantity} ცალი`,
    `ენა:         ${l.lang}`,
    `მიღების დრო: ${l.receivedAt}`,
  ].join("\n");
}

function buildHtml(l: Lead) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:8px 14px;color:#6a6565;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee;">${k}</td><td style="padding:8px 14px;color:#211e1e;font-size:15px;font-weight:600;border-bottom:1px solid #eee;">${escapeHtml(
      v,
    )}</td></tr>`;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f5f5;padding:24px;">
    <div style="max-width:520px;margin:0 auto;background:#fff;overflow:hidden;border:1px solid #e0dddd;">
      <div style="background:#211e1e;padding:20px 24px;">
        <span style="color:#fff;font-size:20px;font-weight:800;">LEGI</span>
        <span style="color:#a71f27;font-size:20px;font-weight:800;"> · Grande</span>
        <div style="color:#989393;font-size:12px;margin-top:4px;">ახალი ლიდი ლენდინგ გვერდიდან</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row("სახელი", l.name)}
        ${row("ტელეფონი", l.phone)}
        ${row("რაოდენობა (ცალი)", l.quantity)}
        ${row("ენა", l.lang)}
        ${row("მიღების დრო", l.receivedAt)}
      </table>
    </div>
  </div>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
