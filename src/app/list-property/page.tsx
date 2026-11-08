"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, buttonStyles } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Single Family", "Townhome", "Penthouse", "Waterfront Estate", "Multi-Family Portfolio"];

const AMENITIES_OPTIONS = [
  "Smart Home System", "Heated Pool & Spa", "Gated Security Access",
  "Wine Cellar", "Professional Chef Kitchen", "Lake Norman Dock",
  "Private Garage (3+ Cars)", "Guest House / ADU", "Home Cinema", "Modern Outdoor Living"
];

const STEPS = ["Property details", "Specifications", "Rent & contact"];

export default function ListPropertyPage() {
  const [registrationCode, setRegistrationCode] = useState("");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Single Family");
  const [description, setDescription] = useState("");

  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2.5);
  const [size, setSize] = useState(3500);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [price, setPrice] = useState(4500);
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleNext = async () => {
    if (step === 1 && (!title || !location || !description)) {
      alert("Please fill in all details for Step 1.");
      return;
    }
    if (step === 3 && (!ownerName || !ownerEmail || !ownerPhone || !inspectionDate)) {
      alert("Please fill in your contact information and select an inspection date.");
      return;
    }

    if (step === 3) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: ownerName,
          email: ownerEmail,
          phone: ownerPhone,
          propertyAddress: location,
          propertyType: category,
          expectedRent: price,
          bedrooms: beds,
          bathrooms: baths,
          squareFeet: size,
          source: "Website Rental Analysis Form",
          notes: `Title: ${title}\nDescription: ${description}\nAmenities: ${selectedAmenities.join(", ")}\nRequested Audit Date: ${inspectionDate}`
        };

        const WEBHOOK_URL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL || "https://abode-crm-lime.vercel.app/api/webhooks/leads";
        const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET || "default_dev_secret_12345";

        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${WEBHOOK_SECRET}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("Failed to submit to CRM");
        }

        setRegistrationCode(`ABD-${Math.floor(10000 + Math.random() * 90000)}`);
        setStep(prev => prev + 1);
      } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const stepMotion = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.35 },
  };

  return (
    <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-5 pt-10 pb-24 md:px-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
      {/* Intro + step rail */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">For Charlotte owners & investors</p>
          <h1 className="display mt-6 text-5xl md:text-6xl">
            Your free <span className="italic text-brand">rental analysis.</span>
          </h1>
          <p className="mt-6 leading-relaxed text-muted">
            Tell us about your property. We&apos;ll run a market review and come back with a tailored management assessment within 24 hours.
          </p>

          {step <= 3 && (
            <ol className="mt-10 hidden border-t border-line lg:block">
              {STEPS.map((s, i) => {
                const n = i + 1;
                return (
                  <li key={s} className="flex items-center gap-4 border-b border-line py-4 text-sm">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
                        n < step ? "border-ink bg-ink text-paper" : n === step ? "border-brand bg-brand text-ink" : "text-muted"
                      }`}
                    >
                      {n < step ? <Check className="h-3.5 w-3.5" /> : n}
                    </span>
                    <span className={n === step ? "font-semibold" : "text-muted"}>{s}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </aside>

      <form
        onSubmit={(e) => { e.preventDefault(); handleNext(); }}
        className="rounded-sm bg-white/60 p-6 ring-1 ring-line sm:p-10 md:p-14 lg:col-span-8"
      >
        <input type="hidden" name="property_type" value={category} />
        <input type="hidden" name="amenities" value={selectedAmenities.join(", ")} />

        {step <= 3 && (
          <div className="mb-10 lg:hidden">
            <p className="label">Step {step} of 3 · {STEPS[step - 1]}</p>
            <div className="mt-3 h-px w-full bg-line">
              <motion.div className="h-px bg-ink" animate={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...stepMotion} className="space-y-10">
              <h2 className="font-serif text-3xl">Property details</h2>

              <label className="block">
                <span className="label">Property nickname</span>
                <input type="text" name="property_title" placeholder="e.g. The Myers Park house" value={title} onChange={(e) => setTitle(e.target.value)} className="field" />
              </label>

              <label className="block">
                <span className="label">Property address</span>
                <input type="text" name="property_address" autoComplete="street-address" placeholder="e.g. 2200 Queens Rd W, Charlotte, NC 28207" value={location} onChange={(e) => setLocation(e.target.value)} className="field" />
              </label>

              <fieldset>
                <legend className="label">Property type</legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={category === cat}
                      onClick={() => setCategory(cat)}
                      className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors ${
                        category === cat ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="label">Brief description</span>
                <textarea
                  name="property_description"
                  rows={4}
                  placeholder="Highlights, target rent, current tenancy status, recent upgrades…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="field resize-none"
                />
              </label>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...stepMotion} className="space-y-10">
              <h2 className="font-serif text-3xl">Specifications</h2>

              <div className="grid grid-cols-3 gap-6">
                <label className="block">
                  <span className="label">Bedrooms</span>
                  <input type="number" name="bedrooms" min="1" value={beds} onChange={(e) => setBeds(Number(e.target.value))} className="field font-serif text-2xl" />
                </label>
                <label className="block">
                  <span className="label">Bathrooms</span>
                  <input type="number" name="bathrooms" min="1" step="0.5" value={baths} onChange={(e) => setBaths(Number(e.target.value))} className="field font-serif text-2xl" />
                </label>
                <label className="block">
                  <span className="label">Sq ft</span>
                  <input type="number" name="square_footage" min="500" step="100" value={size} onChange={(e) => setSize(Number(e.target.value))} className="field font-serif text-2xl" />
                </label>
              </div>

              <fieldset>
                <legend className="label">Amenities</legend>
                <div className="mt-4 grid gap-x-6 sm:grid-cols-2">
                  {AMENITIES_OPTIONS.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleAmenity(amenity)}
                        className="flex cursor-pointer items-center gap-3 border-b border-line py-3.5 text-left text-sm"
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors ${isSelected ? "border-ink bg-ink text-paper" : "border-line"}`}>
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className={isSelected ? "" : "text-muted"}>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...stepMotion} className="space-y-10">
              <h2 className="font-serif text-3xl">Rent & contact</h2>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label">Target monthly rent</span>
                  <label className="flex items-baseline font-serif text-4xl">
                    <span className="sr-only">Target monthly rent in USD</span>$
                    <input
                      type="number"
                      name="target_rent"
                      min="500"
                      value={price || ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-36 bg-transparent text-right focus:outline-none"
                    />
                  </label>
                </div>
                <input
                  type="range"
                  aria-label="Target monthly rent"
                  min="500"
                  max="30000"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-4 w-full cursor-pointer accent-ink"
                />
                <div className="mt-1 flex justify-between text-xs text-muted">
                  <span>$500</span>
                  <span>$30,000+</span>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Full name</span>
                  <input type="text" name="full_name" autoComplete="name" placeholder="Your name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="field" />
                </label>
                <label className="block">
                  <span className="label">Email</span>
                  <input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} className="field" />
                </label>
                <label className="block">
                  <span className="label">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" placeholder="+1 704 555 0101" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} className="field" />
                </label>
                <label className="block">
                  <span className="label">Preferred walk-through date</span>
                  <input type="date" name="inspection_date" value={inspectionDate} onChange={(e) => setInspectionDate(e.target.value)} className="field" />
                </label>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                We schedule a short on-site walk-through before onboarding to verify the property&apos;s condition and safety.
              </p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink">
                <Check className="h-7 w-7" />
              </span>
              <h2 className="display mt-8 text-5xl">Request received.</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                Thank you, <span className="font-semibold text-ink">{ownerName}</span>. Your request for{" "}
                <span className="font-semibold text-ink">{title}</span> is with our Charlotte onboarding team.
              </p>

              <dl className="mt-10 max-w-lg divide-y divide-line border-y border-line text-sm">
                {[
                  ["Reference", registrationCode],
                  ["Address", location],
                  ["Type", category],
                  ["Target rent", `$${price.toLocaleString()} / mo`],
                  ["Walk-through", inspectionDate],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className={`text-right ${k === "Reference" ? "font-mono font-semibold" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted">
                We&apos;ll complete a desk rent analysis and contact you within 24 hours to confirm the walk-through on {inspectionDate}.
              </p>
              <Link href="/" className={`${buttonStyles()} mt-8`}>
                Back to home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {step <= 3 && (
          <div className="mt-14 flex items-center justify-between border-t border-line pt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <Button
              type={step === 3 ? "submit" : "button"}
              onClick={step === 3 ? undefined : handleNext}
              isLoading={isSubmitting}
            >
              {step === 3 ? "Send request" : "Continue"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
