import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Visitor IP + location for the chat widget's Dialogflow session parameters.
 *
 * Cloudflare already geolocates every request (request.cf), so this replaces a
 * third-party lookup like ipapi.co: no extra network hop, no rate limit, and
 * the visitor's IP never leaves our own infrastructure. Under `next dev` the
 * cf object is usually empty, so fields fall back to "unknown".
 */
type GeoCf = {
  city?: string;
  region?: string;
  country?: string;
};

export async function GET(request: Request) {
  let cf: GeoCf | undefined;
  try {
    cf = (await getCloudflareContext<GeoCf>({ async: true })).cf;
  } catch {}

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  return NextResponse.json(
    {
      ip,
      city: cf?.city ?? "unknown",
      region: cf?.region ?? "",
      country: cf?.country ?? request.headers.get("cf-ipcountry") ?? "",
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
