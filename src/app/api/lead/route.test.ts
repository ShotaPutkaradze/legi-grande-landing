import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const ZOHO_OK = "<html>Thank you for submitting your details</html>";

function lead(body: unknown) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function mockZoho(response: Response | Error) {
  const fetchMock = vi.fn(async () => {
    if (response instanceof Error) throw response;
    return response;
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/lead", () => {
  it("forwards a valid lead to Zoho", async () => {
    const fetchMock = mockZoho(new Response(ZOHO_OK));

    const res = await POST(lead({ name: " ნინო ", phone: "+995 577 10 16 10" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://crm.zoho.eu/crm/WebToLeadForm");
    const sent = new URLSearchParams(init.body as string);
    expect(sent.get("Last Name")).toBe("ნინო");
    expect(sent.get("Mobile")).toBe("+995 577 10 16 10");
    expect(sent.get("Lead Source")).toBe("Grande Landing");
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("silently accepts honeypot submissions without calling Zoho", async () => {
    const fetchMock = mockZoho(new Response(ZOHO_OK));

    const res = await POST(lead({ name: "bot", phone: "123456", company: "spam" }));

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["invalid JSON", "{not json", 400],
    ["missing phone", { name: "ნინო" }, 422],
    ["missing name", { phone: "577101610" }, 422],
    ["letters in phone", { name: "ნინო", phone: "abc defg" }, 422],
    ["too few digits", { name: "ნინო", phone: "12-34" }, 422],
    ["name too long", { name: "a".repeat(81), phone: "577101610" }, 422],
  ])("rejects %s", async (_label, body, status) => {
    const fetchMock = mockZoho(new Response(ZOHO_OK));

    const res = await POST(lead(body));

    expect(res.status).toBe(status);
    expect((await res.json()).ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 502 when Zoho does not confirm the submission", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockZoho(new Response("<html>Something went wrong</html>"));

    const res = await POST(lead({ name: "ნინო", phone: "577101610" }));

    expect(res.status).toBe(502);
  });

  it("returns 500 when Zoho is unreachable", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockZoho(new Error("network down"));

    const res = await POST(lead({ name: "ნინო", phone: "577101610" }));

    expect(res.status).toBe(500);
  });
});
