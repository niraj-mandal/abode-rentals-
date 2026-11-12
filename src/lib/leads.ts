// Lead rules shared by the browser forms and the /api/leads route (the route is the real gatekeeper).

export const RENT = { min: 300, max: 100_000 };
export const SQFT = { min: 200, max: 50_000 };
export const SOURCES = ["Website Rental Analysis Form", "Website Contact Form"] as const;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  propertyAddress?: string;
  propertyType?: string;
  expectedRent?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  source: (typeof SOURCES)[number];
  notes?: string;
};

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function num(v: unknown, min: number, max: number, field: string): number | undefined | string {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  if (!Number.isFinite(n) || n < min || n > max) return `${field} must be between ${min.toLocaleString()} and ${max.toLocaleString()}.`;
  return n;
}

/** Trims, caps and validates an incoming lead. Returns either the clean lead or a readable error. */
export function cleanLead(raw: unknown): { lead: Lead } | { error: string } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const name = text(r.name, 120);
  const email = text(r.email, 200);
  if (!name) return { error: "Please add your name." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };

  const source = SOURCES.find((s) => s === r.source);
  if (!source) return { error: "Unknown form." };

  const numbers = {
    expectedRent: num(r.expectedRent, RENT.min, RENT.max, "Monthly rent"),
    bedrooms: num(r.bedrooms, 0, 20, "Bedrooms"),
    bathrooms: num(r.bathrooms, 0, 20, "Bathrooms"),
    squareFeet: num(r.squareFeet, SQFT.min, SQFT.max, "Size"),
  };
  const bad = Object.values(numbers).find((v) => typeof v === "string");
  if (bad) return { error: bad as string };

  return {
    lead: {
      name,
      email,
      phone: text(r.phone, 40) || undefined,
      propertyAddress: text(r.propertyAddress, 300) || undefined,
      propertyType: text(r.propertyType, 60) || undefined,
      ...(numbers as Record<string, number | undefined>),
      source,
      notes: text(r.notes, 4000) || undefined,
    },
  };
}
