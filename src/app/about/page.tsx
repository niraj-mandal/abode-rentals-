import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/Parallax";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { designPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Abode Rental",
  description: "Abode Rental helps Charlotte-area investors build wealth without the daily burden of property management.",
};

const values = [
  { title: "Asset Protection", description: "Preventative maintenance, seasonal audits and routine inspections safeguard your capital and grow your property's value." },
  { title: "Careful Tenant Screening", description: "Every applicant goes through financial and background screening. We only place residents who meet strict credit, income and background criteria." },
  { title: "Responsive Service", description: "A dedicated local manager and 24/7 emergency dispatch handle maintenance quickly, keeping residents happy and turnover low." },
];

const checklist = [
  "Detailed preventive inspection",
  "HVAC & climate control audit",
  "Safety & smoke detector test",
  "Appliance diagnostics",
  "Smart-lock & security check",
  "Vetted local contractor dispatch",
];

const advantages = [
  { icon: ShieldCheck, title: "Security", description: "Comprehensive insurance coverage and a rigorous screening process protect your property." },
  { icon: TrendingUp, title: "Return on Investment", description: "Strategic pricing and short vacancy periods help you earn the most from your rental." },
  { icon: Clock, title: "24/7 Support", description: "Our team is available around the clock for maintenance emergencies and tenant questions." },
  { icon: HeartHandshake, title: "Clear Communication", description: "Regular updates on your property's performance, so you always know where things stand." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title={<>Protecting assets. <em className="text-sage">Optimizing returns.</em></>}
        intro="Abode was founded with a single mission: to let real estate investors build wealth without the daily burden of property management."
        image={designPhotos.rowTenant}
        imageAlt="Well-kept living room"
      >
        <Link href="/list-property" className={buttonStyles({ variant: "light", size: "lg" })}>
          Get Rental Analysis <ArrowUpRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* Values */}
      <section className="bg-cream">
        <div className="site py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow="Our Commitments" title="The Abode Standard" className="lg:col-span-6" />
            <p className="max-w-md leading-relaxed text-slate lg:col-span-5 lg:col-start-8">
              Attentive service that attracts the market&apos;s most qualified tenants, backed by careful financial tracking.
              We treat every home we look after as a premier asset.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-lg border p-8">
                <span className="text-sm text-slate">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-2xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection */}
      <section className="bg-night text-cream">
        <div className="site grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <RevealImage className="relative aspect-[4/3] rounded-lg lg:col-span-5">
            <Image src={designPhotos.rowCare} alt="Evening patio at a well-kept home" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </RevealImage>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <SectionHeading dark eyebrow="Rigorous Audits" title="Our 100-Point Inspection" />
            <p className="mt-5 leading-relaxed text-mist">
              Before we take on a property, our team performs a thorough physical evaluation — from structural integrity,
              utilities and water pressure to safety compliance and noise levels.
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 border-t border-line-dark py-3.5 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-sage" /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-cream-2">
        <div className="site py-20 md:py-24">
          <SectionHeading eyebrow="The Abode Advantage" title="Why Owners Choose Us" />
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <li key={a.title}>
                <a.icon className="h-7 w-7 stroke-[1.5] text-olive" />
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-olive text-cream">
        <div className="site grid gap-8 py-14 md:py-16 lg:grid-cols-12 lg:items-center">
          <h2 className="display text-[2.1rem] sm:text-5xl lg:col-span-6">Ready to Protect Your Investment?</h2>
          <p className="leading-relaxed text-cream/90 lg:col-span-3">Send us your property details for a free rental analysis and management overview.</p>
          <Link href="/list-property" className={`${buttonStyles({ variant: "light", size: "lg" })} lg:col-span-3 lg:justify-self-end`}>
            Get Free Analysis <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
