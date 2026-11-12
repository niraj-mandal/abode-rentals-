import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BarChart3, CalendarDays, Check, CreditCard, FileText, Home as HomeIcon,
  Layers, Play, RefreshCw, Search, Settings, ShieldCheck, TrendingUp, Users, Wrench,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { designPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property Management Services | Abode Rental",
  description: "Tenant placement, property management, rent collection and property care for Charlotte-area rental owners.",
};

const services = [
  {
    id: "tenant-placement",
    title: "Tenant Placement",
    desc: "Find reliable, long-term tenants with a thorough screening process.",
    img: designPhotos.rowTenant,
    features: [
      { icon: Users, title: "Targeted Marketing", desc: "Reach the right tenants, faster." },
      { icon: ShieldCheck, title: "Rigorous Screening", desc: "Background, credit, and rental history." },
      { icon: FileText, title: "Qualified Leases", desc: "Compliant, owner-friendly agreements." },
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    desc: "Day-to-day management that keeps your property running smoothly.",
    img: designPhotos.rowManagement,
    features: [
      { icon: CalendarDays, title: "Operations & Oversight", desc: "We handle the daily details." },
      { icon: Wrench, title: "Maintenance Coordination", desc: "Fast, reliable, and cost-effective." },
      { icon: BarChart3, title: "Owner Updates", desc: "Stay informed with clear, regular reports." },
    ],
  },
  {
    id: "rent-collection",
    title: "Rent Collection",
    desc: "On-time, secure, and hassle-free rent collection every month.",
    img: designPhotos.rowRent,
    features: [
      { icon: CreditCard, title: "Secure Payments", desc: "Safe, trackable, and on time." },
      { icon: RefreshCw, title: "Timely Processing", desc: "Consistent and transparent collections." },
      { icon: BarChart3, title: "Financial Reporting", desc: "Clear monthly income statements." },
    ],
  },
  {
    id: "property-care",
    title: "Property Care",
    desc: "Proactive upkeep to protect your property's value long-term.",
    img: designPhotos.rowCare,
    features: [
      { icon: ShieldCheck, title: "Routine Inspections", desc: "Keep your property in great shape." },
      { icon: Wrench, title: "Preventive Maintenance", desc: "Fix small issues before they grow." },
      { icon: HomeIcon, title: "Vendor Management", desc: "Trusted, vetted, and cost-conscious support." },
    ],
  },
];

const process = [
  { icon: Search, title: "Analyze", desc: "Understand your property and goals." },
  { icon: Layers, title: "Plan", desc: "Build a customized management plan." },
  { icon: Settings, title: "Manage", desc: "Handle tenants, rent, maintenance, and more." },
  { icon: TrendingUp, title: "Grow", desc: "Maintain value and maximize returns." },
];

const analysisIncludes = ["Estimated rental range", "Local market insights", "Management recommendation", "No obligation"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        title="Our Property Management Services"
        intro="End-to-end rental property solutions designed to protect your investment, reduce stress, and deliver consistent returns."
        image={designPhotos.servicesHero}
        imageAlt="Modern home at dusk"
      >
        <Link href="/list-property" className={buttonStyles({ variant: "light", size: "lg" })}>
          Get Rental Analysis <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link href="#process" className="group inline-flex items-center gap-3 px-1 py-2 text-sm font-semibold sm:ml-3 sm:border-l sm:border-line-dark sm:pl-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sage/60 text-sage transition-colors group-hover:bg-white/10">
            <Play className="h-3 w-3 fill-current" />
          </span>
          See How It Works
        </Link>
      </PageHero>

      {/* Intro */}
      <section className="bg-cream">
        <div className="site grid gap-6 py-14 md:py-16 lg:grid-cols-12 lg:items-center">
          <h2 className="display text-[2.1rem] sm:text-5xl lg:col-span-5">A Complete Management Approach</h2>
          <p className="max-w-lg leading-relaxed text-slate lg:col-span-6 lg:col-start-7 lg:border-l lg:pl-10">
            From finding the right tenants to keeping your property in top condition, we handle every detail so you can enjoy
            the benefits of ownership — without the everyday hassle.
          </p>
        </div>
      </section>

      {/* Service rows */}
      <section className="bg-night text-cream">
        {services.map((s, i) => (
          <article key={s.id} id={s.id} className="relative scroll-mt-24 overflow-hidden border-b border-line-dark">
            <div className="absolute inset-0 lg:left-[22%] lg:right-[28%]">
              <Parallax className="absolute inset-0" strength={12}><Image src={s.img} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Parallax>
              <div className="absolute inset-0 bg-gradient-to-r from-night via-night/40 to-night/80 max-lg:via-night/85 max-lg:to-night/85" />
            </div>
            <div className="site relative grid gap-10 py-14 md:py-16 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-5">
                <div className="flex gap-6 md:gap-10">
                  <span className="pt-2 text-sm font-semibold text-sage">0{i + 1}</span>
                  <div>
                    <h3 className="display text-4xl md:text-5xl">{s.title}</h3>
                    <p className="mt-4 max-w-xs leading-relaxed text-cream/85">{s.desc}</p>
                    <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md border border-sage/50 px-4 py-2 text-sm font-semibold text-sage transition-colors hover:bg-sage hover:text-ink">
                      Discuss Your Property <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
                <ul className="space-y-5 rounded-lg bg-night/70 p-6 backdrop-blur-md lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                  {s.features.map((f) => (
                    <li key={f.title} className="flex gap-4">
                      <f.icon className="mt-0.5 h-6 w-6 shrink-0 stroke-[1.5] text-sage" />
                      <div>
                        <p className="font-semibold">{f.title}</p>
                        <p className="text-sm text-mist">{f.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-cream">
        <div className="site grid gap-12 py-20 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h2 className="display text-[2.25rem] sm:text-5xl">Our Process</h2>
            <p className="mt-4 leading-relaxed text-slate">A simple, transparent journey from evaluation to ongoing management.</p>
          </Reveal>
          <ol className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <li>
                  <div className="flex items-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-cream-2">
                      <p.icon className="h-6 w-6 stroke-[1.5]" />
                    </span>
                    {i < process.length - 1 && <ArrowRight className="mx-auto hidden h-4 w-4 text-slate lg:block" />}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{p.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Analysis CTA */}
      <section className="relative overflow-hidden bg-night text-cream">
        <Parallax className="absolute inset-0" strength={14}>
          <Image src={designPhotos.servicesCta} alt="" fill sizes="100vw" className="object-cover object-[70%_center]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/40" />
        <div className="site relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-sage">Free Rental Analysis</p>
            <h2 className="display mt-4 text-[2.25rem] sm:text-5xl">Know Your Property&apos;s Rental Potential</h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream/85">
              Get a data-driven rental estimate and a customized management recommendation for your property in Charlotte.
            </p>
            <Link href="/list-property" className={`${buttonStyles({ size: "lg" })} mt-8`}>
              Get My Free Analysis <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <ul className="space-y-4 rounded-xl border border-line-dark bg-night/60 p-7 backdrop-blur-md">
              {analysisIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-sage" /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
