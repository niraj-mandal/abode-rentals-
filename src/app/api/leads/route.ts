import { cleanLead } from "@/lib/leads";

// Server-side relay to the Abode CRM, so the CRM secret never reaches the browser.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: the hidden "website" field is only ever filled in by bots. Pretend success so they move on.
  if (body?.website) return Response.json({ ok: true, reference: null });

  const result = cleanLead(body);
  if ("error" in result) return Response.json({ error: result.error }, { status: 400 });

  const url = process.env.CRM_WEBHOOK_URL || "https://abode-crm-lime.vercel.app/api/webhooks/leads";
  // Server-only. The old NEXT_PUBLIC_ name is still accepted here (never bundled for the browser) until it's renamed on Vercel.
  const secret = process.env.CRM_WEBHOOK_SECRET || process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[api/leads] CRM_WEBHOOK_SECRET is not set");
    return Response.json({ error: "Our form is temporarily unavailable. Please call or email us." }, { status: 500 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify(result.lead),
    });
    if (!res.ok) {
      console.error("[api/leads] CRM rejected lead", res.status, await res.text().catch(() => ""));
      return Response.json({ error: "We couldn't send your request. Please try again." }, { status: 502 });
    }
    const json = await res.json().catch(() => null);
    return Response.json({ ok: true, reference: typeof json?.data?.id === "string" ? json.data.id : null });
  } catch (err) {
    console.error("[api/leads] CRM unreachable", err);
    return Response.json({ error: "We couldn't send your request. Please try again." }, { status: 502 });
  }
}
