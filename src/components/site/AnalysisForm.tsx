"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MapPin } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { sendLead } from "@/lib/crm";
import { EMAIL_RE, RENT, SQFT } from "@/lib/leads";
import { AMENITIES, PREFILL_KEY, PROPERTY_TYPES } from "@/lib/site";
import { Honeypot } from "@/components/site/Honeypot";

const STEPS = ["Property Details", "Property Info", "Your Details", "Review"];
const BEDROOMS = ["1", "2", "3", "4", "5", "6"];
const BATHROOMS = ["1", "1.5", "2", "2.5", "3", "3.5", "4"];

function Select({ value, onChange, options, placeholder, id }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string; id: string }) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field appearance-none pr-10">
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate" />
    </div>
  );
}

export function AnalysisForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [size, setSize] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [rent, setRent] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [walkthrough, setWalkthrough] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Pick up address/type entered in the home-page quick form.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(PREFILL_KEY) || "null");
      sessionStorage.removeItem(PREFILL_KEY);
      // Browser-only storage can't be read during server render, so this one-time sync has to happen after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved?.address) setAddress(saved.address);
      if (saved?.type && PROPERTY_TYPES.includes(saved.type)) setType(saved.type);
    } catch {
      // storage unavailable: start empty
    }
  }, []);

  const inRange = (v: string, r: { min: number; max: number }) => Number(v) >= r.min && Number(v) <= r.max;

  const missing = (): string => {
    if (step === 1 && (!address.trim() || !type || !beds || !baths || !size)) return "Please complete the property address, type, bedrooms, bathrooms and size.";
    if (step === 1 && !inRange(size, SQFT)) return `Please enter a size between ${SQFT.min.toLocaleString()} and ${SQFT.max.toLocaleString()} sq ft.`;
    if (step === 2 && !inRange(rent, RENT)) return `Please enter a monthly rent between $${RENT.min.toLocaleString()} and $${RENT.max.toLocaleString()}.`;
    if (step === 3 && (!name.trim() || !email.trim() || !phone.trim())) return "Please add your name, email and phone number.";
    if (step === 3 && !EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
    return "";
  };

  const next = async () => {
    const problem = missing();
    setError(problem);
    if (problem) return;
    if (step < 4) return setStep(step + 1);

    setIsSubmitting(true);
    try {
      const ref = await sendLead({
        website: honeypot,
        name,
        email,
        phone,
        propertyAddress: address,
        propertyType: type,
        expectedRent: Number(rent),
        bedrooms: Number(beds),
        bathrooms: Number(baths),
        squareFeet: Number(size),
        source: "Website Rental Analysis Form",
        notes: `Title: ${title || "-"}\nDescription: ${description || "-"}\nAmenities: ${amenities.join(", ") || "-"}\nRequested Audit Date: ${walkthrough || "Not specified"}`,
      });
      setReference(ref ?? "");
      setStep(5);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : "There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggle = (a: string) => setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  if (step === 5) {
    return (
      <div className="py-4 text-center" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olive text-cream">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="display mt-6 text-4xl">Request received</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate">
          Thank you, {name}. We&apos;ll prepare your rental analysis for {address} and contact you within 24 hours.
        </p>
        {reference && (
          <p className="mt-6 text-sm text-slate">
            Reference <span className="font-mono font-semibold break-all text-ink">{reference}</span>
          </p>
        )}
        <Link href="/" className={`${buttonStyles()} mt-8`}>Back to home</Link>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {/* Stepper */}
      <ol className="flex items-center gap-2 text-xs sm:text-sm">
        {STEPS.map((s, i) => {
          const n = i + 1;
          return (
            <li key={s} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                  n < step ? "border-olive bg-olive text-cream" : n === step ? "border-ink bg-ink text-cream" : "border-ink/25 text-slate"
                }`}
              >
                {n < step ? <Check className="h-3.5 w-3.5" /> : n}
              </span>
              <span className={`hidden whitespace-nowrap md:inline ${n === step ? "font-semibold" : "text-slate"}`}>{s}</span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-ink/15" />}
            </li>
          );
        })}
      </ol>

      <h2 className="display mt-8 text-3xl md:text-4xl">{STEPS[step - 1]}</h2>

      {step === 1 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <p className="-mt-3 text-slate sm:col-span-2">Let&apos;s start with the basics about your property.</p>
          <div className="sm:col-span-2">
            <label htmlFor="address" className="label">Property Address *</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate" />
              <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder="Enter full property address" className="field pl-11" />
            </div>
          </div>
          <div>
            <label htmlFor="type" className="label">Property Type *</label>
            <Select id="type" value={type} onChange={setType} options={PROPERTY_TYPES} placeholder="Select property type" />
          </div>
          <div>
            <label htmlFor="beds" className="label">Bedrooms *</label>
            <Select id="beds" value={beds} onChange={setBeds} options={BEDROOMS} placeholder="Select bedrooms" />
          </div>
          <div>
            <label htmlFor="baths" className="label">Bathrooms *</label>
            <Select id="baths" value={baths} onChange={setBaths} options={BATHROOMS} placeholder="Select bathrooms" />
          </div>
          <div>
            <label htmlFor="size" className="label">Approx. Size (sq ft) *</label>
            <input id="size" type="number" min="200" inputMode="numeric" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 1,500" className="field" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rent" className="label">Target Monthly Rent (USD) *</label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate">$</span>
              <input id="rent" type="number" min="300" inputMode="numeric" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="e.g. 2,400" className="field pl-8" />
            </div>
          </div>
          <div>
            <label htmlFor="title" className="label">Property Nickname</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional" className="field" />
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="label">Features</legend>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => {
                const on = amenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(a)}
                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors ${on ? "border-olive bg-olive text-cream" : "border-ink/20 bg-white/60 hover:border-ink/40"}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="label">Anything else we should know?</label>
            <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Current tenancy, recent upgrades, timing…" className="field h-auto resize-none py-3" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">Full Name *</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" />
          </div>
          <div>
            <label htmlFor="email" className="label">Email Address *</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="field" />
          </div>
          <div>
            <label htmlFor="phone" className="label">Phone *</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className="field" />
          </div>
          <div>
            <label htmlFor="walkthrough" className="label">Preferred Walk-through Date</label>
            <input id="walkthrough" type="date" value={walkthrough} onChange={(e) => setWalkthrough(e.target.value)} className="field" />
          </div>
        </div>
      )}

      {step === 4 && (
        <dl className="mt-6 divide-y divide-ink/10 rounded-lg border bg-white/60 text-sm">
          {[
            ["Address", address],
            ["Property", `${type} · ${beds} bed · ${baths} bath · ${Number(size).toLocaleString()} sq ft`],
            ["Target rent", `$${Number(rent).toLocaleString()} / month`],
            ["Features", amenities.join(", ") || "—"],
            ["Contact", `${name} · ${email} · ${phone}`],
            ["Walk-through", walkthrough || "Flexible"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 px-4 py-3">
              <dt className="text-slate">{k}</dt>
              <dd className="break-words">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {error && (
        <p role="alert" className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}

      <div className="mt-8 flex items-center gap-4">
        {step > 1 && (
          <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="inline-flex cursor-pointer items-center gap-2 px-2 text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        <Button type="submit" size="lg" isLoading={isSubmitting} className="flex-1">
          {step < 4 ? <>Continue to {STEPS[step]}</> : "Send My Request"} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
