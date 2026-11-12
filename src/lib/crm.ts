// Sends a lead through our own /api/leads route, which holds the CRM secret server-side.
// Returns the CRM's lead ID when it provides one. Throws with a readable message on failure.
export async function sendLead(payload: Record<string, unknown>): Promise<string | null> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error || "We couldn't send your request. Please try again.");
  return json?.reference ?? null;
}
