import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BarChart3, Home as HomeIcon, Layers, MapPin, Play,
  Search, Settings, ShieldCheck, TrendingUp, Users,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax, RevealImage } from "@/components/ui/Parallax";
import { SectionHeading } from "@/components/site/PageHero";
import { QuickAnalysisForm } from "@/components/site/QuickAnalysisForm";
import { designPhotos, photos } from "@/lib/site";
import { cn } from "@/lib/utils";

const quickLinks = [
  { icon: HomeIcon, label: "Property Management", href: "/services#property-management" },
  { icon: Users, label: "Tenant Placement", href: "/services#tenant-placement" },
  { icon: BarChart3, label: "Rent Optimization", href: "/services#rent-collection" },
  { icon: ShieldCheck, label: "Property Care", href: "/services#property-care" },
];

const services = [
  { title: "Tenant Placement", desc: "Find and screen reliable, long-term tenants.", img: designPhotos.tenantPlacement, href: "/services#tenant-placement" },
  { title: "Property Management", desc: "End-to-end management for a truly passive investment.", img: designPhotos.propertyManagement, href: "/services#property-management" },
  { title: "Rent Collection", desc: "Reliable, on-time rent with full transparency.", img: designPhotos.rentCollection, href: "/services#rent-collection" },
  { title: "Property Care", desc: "Proactive maintenance and quick, reliable support.", img: designPhotos.propertyCare, href: "/services#property-care" },
];

const reasons = [
  { icon: MapPin, title: "Local Expertise", desc: "Deep knowledge of the Charlotte rental market." },
  { icon: BarChart3, title: "Higher Returns", desc: "Strategies to maximize your rental income." },
  { icon: ShieldCheck, title: "Reliable & Transparent", desc: "Clear communication and full visibility." },
  { icon: Layers, title: "End-to-End Support", desc: "From tenant placement to ongoing care." },
];

const journey = [
  { icon: Search, title: "Analyze", desc: "Get a rental analysis and property assessment." },
  { icon: Layers, title: "Onboard", desc: "We create a tailored management plan." },
  { icon: Settings, title: "Manage", desc: "We handle tenants, rent, maintenance, and more." },
  { icon: TrendingUp, title: "Grow", desc: "Enjoy consistent returns and long-term peace of mind." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 overflow-hidden bg-night text-cream md:-mt-24">
        <div className="absolute inset-0">
          <Parallax className="absolute inset-0" strength={10} intro>
            <Image src={photos.hero} alt="Modern home with warm interior lighting at golden hour" fill preload sizes="100vw" className="object-cover object-[70%_center] max-sm:object-[74%_center]" />
          </Parallax>
          {/* Light washes only where text sits, so the golden-hour sky and warm walls stay bright.
              desktop: behind the text column · tablet: soft left-to-right fade · phone: top (headline) and bottom (icons) only */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(26_31_28/0.72)_0%,rgb(26_31_28/0.45)_30%,transparent_55%)] max-lg:bg-[linear-gradient(90deg,rgb(26_31_28/0.8)_0%,rgb(26_31_28/0.45)_50%,rgb(26_31_28/0.1)_100%)] max-sm:bg-[linear-gradient(180deg,rgb(26_31_28/0.7)_0%,rgb(26_31_28/0.35)_30%,rgb(26_31_28/0.2)_50%,rgb(26_31_28/0.35)_65%,rgb(26_31_28/0.75)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night/80 to-transparent" />
        </div>
        {/* thin arc, as in the design */}
        <svg aria-hidden className="pointer-events-none absolute -top-40 -left-72 hidden h-[52rem] w-[52rem] text-white/15 lg:block" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="49.8" stroke="currentColor" strokeWidth="0.12" />
        </svg>

        <div className="site relative pt-32 pb-10 md:pt-36 md:pb-10 lg:min-h-[760px] lg:pt-40 lg:pb-14">
          <div className="hero-rise max-w-xl">
            <h1 className="display text-[2.9rem] sm:text-6xl lg:text-[5.25rem]">
              Your property.
              <br />
              <em className="text-sage">Our priority.</em>
            </h1>
            <div className="mt-6 h-px w-16 bg-sage/60 lg:mt-8" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-cream/85 lg:mt-8">
              Thoughtful property management for owners who expect more.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/list-property"
                className={cn(buttonStyles({ size: "lg" }), "rounded-none bg-sage pr-10 text-ink [clip-path:polygon(0_0,100%_0,calc(100%-18px)_100%,0_100%)] hover:bg-cream")}
              >
                Get Your Rental Analysis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#journey" className="group inline-flex items-center gap-3 px-1 py-2 text-sm font-semibold">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-white/10">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                See How It Works
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between lg:mt-20">
            <ul className="grid grid-cols-4 gap-2 sm:gap-6 md:max-w-lg">
              {quickLinks.map((q) => (
                <li key={q.label}>
                  <Link href={q.href} className="group flex flex-col items-center gap-2 text-center text-xs leading-tight text-cream/85 hover:text-white sm:text-[13px]">
                    <q.icon className="h-6 w-6 stroke-[1.5] transition-transform group-hover:-translate-y-0.5" />
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="inline-flex items-center gap-3 self-start rounded-lg border border-line-dark bg-night/60 px-4 py-3 backdrop-blur-md md:self-auto">
              <MapPin className="h-5 w-5 text-sage" />
              <span className="text-sm leading-tight">
                Charlotte, NC
                <span className="block text-xs text-mist">&amp; Surrounding Areas</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream">
        <div className="site grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Our Philosophy"
              title={<>Property ownership should feel rewarding. <em className="text-olive">Not overwhelming.</em></>}
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3 lg:border-l lg:pl-8">
            <p className="leading-relaxed text-slate">
              We take the complexity out of rental property ownership with local expertise, proactive management, and a
              hands-on approach that protects your investment and grows its potential.
            </p>
            <Link href="/about" className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold">
              <span className="h-px w-8 bg-ink" /> Our Approach <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <RevealImage delay={0.15} className="relative aspect-[16/10] rounded-lg lg:col-span-5">
            <Image src={designPhotos.livingRoom} alt="Bright, comfortable living room" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </RevealImage>
        </div>
      </section>

      {/* Services */}
      <section className="bg-night text-cream">
        <div className="site py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading dark eyebrow="Our Services" title="Complete Property Management" className="lg:col-span-6" />
            <p className="leading-relaxed text-mist lg:col-span-4">
              A full-service solution for rental property owners in Charlotte, designed to maximize income, minimize hassle,
              and protect your investment.
            </p>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-white lg:col-span-2 lg:justify-self-end">
              Explore All Services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <Link href={s.href} className="group flex h-full flex-col overflow-hidden rounded-lg bg-night-2 ring-1 ring-line-dark transition-[box-shadow] duration-700 hover:ring-sage/40">
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-night-2/10 to-transparent" />
                  </div>
                  <div className="relative -mt-8 flex flex-1 items-end justify-between gap-4 p-5">
                    <div>
                      <span className="text-xs text-mist">0{i + 1}</span>
                      <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-sm leading-snug text-mist">{s.desc}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-cream group-hover:text-ink">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Abode */}
      <section className="bg-cream-2">
        <div className="site grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow="Why Abode" title="A smarter way to own rental property." />
          </Reveal>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-0">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06} className="lg:border-l lg:px-6">
                <li>
                  <r.icon className="h-6 w-6 stroke-[1.5] text-olive" />
                  <h3 className="mt-4 font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{r.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ownership journey */}
      <section id="journey" className="scroll-mt-24 bg-cream">
        <div className="site grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
          <RevealImage className="relative aspect-[4/3] rounded-xl lg:col-span-5 lg:aspect-[4/5]">
            <Image src={designPhotos.journey} alt="Sunlit living room with a balcony" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </RevealImage>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="The Ownership Journey"
                title={<>Simple. Clear. <span className="whitespace-nowrap">Stress-Free.</span></>}
              />
              <p className="mt-5 max-w-md leading-relaxed text-slate">
                A streamlined process designed to get your property rented, managed, and performing — without the hassle.
              </p>
            </Reveal>
            <ol className="mt-12 grid gap-x-12 sm:grid-cols-2">
              {journey.map((j, i) => (
                <li key={j.title}>
                  <Reveal delay={i * 0.08} className="flex gap-5 border-t py-7">
                    <span className="display text-4xl text-olive">0{i + 1}</span>
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        {j.title} <j.icon className="h-4 w-4 stroke-[1.5] text-olive" />
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-slate">{j.desc}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Local expertise */}
      <section className="relative overflow-hidden bg-night text-cream">
        <Parallax className="absolute inset-0" strength={14}>
          <Image src={designPhotos.skyline} alt="" fill sizes="100vw" className="object-cover object-[70%_bottom]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/55 to-transparent max-md:via-night/75 max-md:to-night/40" />
        <div className="site relative py-20 md:py-28">
          <Reveal className="max-w-xl">
            <SectionHeading dark eyebrow="Local Expertise" title="Proudly Serving Charlotte & Surrounding Communities" />
            <p className="mt-6 max-w-md leading-relaxed text-cream/85">
              Rooted in the Charlotte market, we combine local insight with professional management to deliver better results
              for property owners.
            </p>
            <Link href="/areas" className={`${buttonStyles({ variant: "light" })} mt-8`}>
              Explore Our Service Areas <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Rental analysis teaser */}
      <section className="relative overflow-hidden bg-cream">
        {/* photo bleeding in from the left with a diagonal edge, as in the design */}
        <div className="absolute inset-y-0 left-0 hidden w-[30%] [clip-path:polygon(0_0,100%_0,72%_100%,0_100%)] lg:block">
          <Image src={designPhotos.analysisHouse} alt="" fill sizes="30vw" className="object-cover" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[16%] xl:block">
          <Image src={designPhotos.analysisStone} alt="" fill sizes="16vw" className="object-cover object-left" />
        </div>
        <div className="site relative grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4 lg:col-start-4">
            <SectionHeading eyebrow="Rental Analysis" title="Get Your Free Rental Analysis" />
            <p className="mt-5 max-w-md leading-relaxed text-slate">
              Find out how much your property could earn in today&apos;s Charlotte rental market.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 xl:col-span-4">
            <QuickAnalysisForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
