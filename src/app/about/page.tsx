import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    title: "Asset protection",
    description:
      "Preventative maintenance, seasonal audits and routine inspections safeguard your capital and grow your property's value.",
  },
  {
    title: "Careful tenant screening",
    description:
      "Every applicant goes through financial and background screening. We only place residents who meet strict credit, income and background criteria.",
  },
  {
    title: "Responsive service",
    description:
      "A dedicated local manager and 24/7 emergency dispatch handle maintenance quickly, keeping residents happy and turnover low.",
  },
];

const advantages = [
  { title: "Security", description: "Comprehensive insurance coverage and a rigorous screening process protect your property." },
  { title: "Return on investment", description: "Strategic pricing and short vacancy periods help you earn the most from your rental." },
  { title: "24/7 support", description: "Our team is available around the clock for maintenance emergencies and tenant questions." },
  { title: "Clear communication", description: "Real-time updates on your property's performance through our owner portal." },
];

const checklist = [
  "Detailed preventive inspection",
  "HVAC & climate control audit",
  "Safety & smoke detector test",
  "Appliance diagnostics",
  "Smart-lock & security check",
  "Vetted local contractor dispatch",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1320px] px-5 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28">
        <Reveal>
          <p className="eyebrow">Our philosophy</p>
          <h1 className="display mt-8 max-w-5xl text-[2.2rem] sm:text-6xl lg:text-[5.5rem]">
            Protecting assets.
            <br />
            <span className="italic text-brand">Optimising returns.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-12">
          <p className="text-xl leading-relaxed md:col-span-7 md:text-2xl">
            Abode was founded with a single mission: to let real estate investors build wealth without the daily burden of
            property management. We treat every home we look after as a premier asset.
          </p>
          <p className="label md:col-span-4 md:col-start-9 md:pt-2">Now serving North Carolina property owners</p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-paper/60">Our commitments</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl">
              The <span className="italic text-brand">Abode</span> standard
            </h2>
            <p className="mt-6 leading-relaxed text-paper/65">
              Attentive service that attracts the market&apos;s most qualified tenants, backed by careful financial tracking.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-paper/15 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="bg-ink p-8 md:p-10">
                <Reveal delay={i * 0.1}>
                  <span className="font-serif text-sm text-paper/40">0{i + 1}</span>
                  <h3 className="mt-10 font-serif text-3xl">{v.title}</h3>
                  <p className="mt-4 leading-relaxed text-paper/65">{v.description}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm lg:col-span-5">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop"
              alt="Well-maintained modern kitchen"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Rigorous audits</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl">
              Our 100-point <span className="italic">inspection</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Before we take on a property, our team performs a thorough physical evaluation — from structural integrity,
              utilities and water pressure to safety compliance and noise levels.
            </p>
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 border-t border-line py-4 text-sm font-medium">
                  <Check className="h-4 w-4 shrink-0 text-brand-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-stone">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">The Abode advantage</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl">Why owners choose us</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="border-t border-ink/20 py-8">
                <h3 className="font-serif text-2xl">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-[2.25rem] sm:text-5xl md:text-7xl lg:col-span-8">
            Ready to protect <span className="italic text-brand">your investment?</span>
          </h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-muted">
              Send us your property address for a free rental price analysis and management overview.
            </p>
            <Link href="/list-property" className={`${buttonStyles({ size: "lg" })} mt-6`}>
              Get a free analysis <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
