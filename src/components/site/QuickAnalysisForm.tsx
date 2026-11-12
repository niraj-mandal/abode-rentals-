"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PREFILL_KEY, PROPERTY_TYPES } from "@/lib/site";

export function QuickAnalysisForm() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        try {
          sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ address, type }));
        } catch {
          // storage blocked: the full form just starts empty
        }
        router.push("/list-property");
      }}
      className="space-y-3 rounded-xl bg-white/80 p-5 shadow-xl shadow-ink/10 ring-1 ring-line-light md:p-6"
    >
      <label className="relative block">
        <span className="sr-only">Property address</span>
        <MapPin className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Property address" autoComplete="street-address" className="field pl-11" />
      </label>
      <label className="relative block">
        <span className="sr-only">Property type</span>
        <select value={type} onChange={(e) => setType(e.target.value)} className="field appearance-none pr-10">
          <option value="">Property type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate" />
      </label>
      <Button type="submit" size="lg" className="w-full">
        Get My Free Analysis <ArrowUpRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
