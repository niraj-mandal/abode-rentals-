"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sendLead } from "@/lib/crm";
import { EMAIL_RE } from "@/lib/leads";
import { Honeypot } from "@/components/site/Honeypot";

const INQUIRY_TYPES = ["Property management", "Rental analysis", "Current owner question", "Other"];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const submit = async () => {
    if (!name.trim() || !email.trim() || !inquiry || !message.trim()) return setError("Please fill in all required fields.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email address.");
    setError("");
    setSending(true);
    try {
      await sendLead({
        website: honeypot,
        name,
        email,
        phone,
        source: "Website Contact Form",
        notes: `Inquiry: ${inquiry}\nMessage: ${message}`,
      });
      setSent(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err instanceof Error ? err.message : "Sorry, your message couldn't be sent. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="py-8 text-center" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive text-cream">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="display mt-5 text-3xl">Message sent</h3>
        <p className="mt-2 text-slate">Thanks, {name}. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <label className="block">
        <span className="sr-only">Full name (required)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name *" autoComplete="name" className="field" />
      </label>
      <label className="block">
        <span className="sr-only">Email address (required)</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address *" autoComplete="email" className="field" />
      </label>
      <label className="block">
        <span className="sr-only">Phone number</span>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" autoComplete="tel" className="field" />
      </label>
      <label className="relative block">
        <span className="sr-only">Inquiry type (required)</span>
        <select value={inquiry} onChange={(e) => setInquiry(e.target.value)} className="field appearance-none pr-10">
          <option value="">Inquiry Type *</option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate" />
      </label>
      <label className="block sm:col-span-2">
        <span className="sr-only">Your message (required)</span>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message *" className="field h-auto resize-none py-3" />
      </label>
      {error && <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">{error}</p>}
      <Button type="submit" size="lg" isLoading={sending} className="sm:col-span-2">
        Send Message <ArrowUpRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
