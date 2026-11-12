import type { Metadata } from "next";
import Image from "next/image";
import { BarChart3, Check, Home as HomeIcon, Layers, Lock, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { AnalysisForm } from "@/components/site/AnalysisForm";
import { designPhotos, photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Rental Analysis | Abode Rental",
  description: "Get a free, no-obligation rental analysis for your Charlotte-area property.",
};

const perks = [
  { icon: BarChart3, label: "Market Rent Estimate" },
  { icon: Layers, label: "Local Market Insights" },
  { icon: HomeIcon, label: "Personalized Recommendations" },
];

const receive = [
  { title: "Estimated Rental Value", desc: "A realistic rent range for your property." },
  { title: "Local Market Insights", desc: "Current rental trends in your area." },
  { title: "Recommendations", desc: "Practical steps to improve rental returns." },
];

const assurances = [
  { icon: Lock, label: "Private & Confidential" },
  { icon: Layers, label: "No Obligation" },
  { icon: Zap, label: "Quick Turnaround (usually within 24 hrs)" },
];

export default function RentalAnalysisPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 overflow-hidden bg-night text-cream md:-mt-24">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
          <Parallax className="absolute inset-0" strength={10} intro>
            <Image src={photos.hero} alt="Modern home at golden hour" fill preload sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-[70%_center]" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/50 to-night/0 max-lg:via-night/80 max-lg:to-night/60" />
        </div>
        <div className="site relative pt-32 pb-14 md:pt-40 lg:min-h-[640px] lg:pb-20">
          <div className="hero-rise max-w-xl">
            <p className="eyebrow flex items-center gap-4 text-cream/85">
              Rental Analysis <span className="h-px w-12 bg-cream/50" />
            </p>
            <h1 className="display mt-6 text-[2.5rem] sm:text-6xl lg:text-[4.25rem]">
              Understand Your Property&apos;s Rental <em className="text-sage">Potential</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/85">
              A rental analysis tailored to your property and the Charlotte market — free, fast, and with no obligation.
            </p>
            <ul className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {perks.map((p, i) => (
                <li key={p.label} className={`flex flex-col gap-3 text-sm leading-snug sm:flex-row sm:items-center ${i > 0 ? "sm:border-l sm:border-line-dark sm:pl-4" : ""}`}>
                  <p.icon className="h-7 w-7 shrink-0 stroke-[1.5]" />
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you'll receive + form */}
      <section className="bg-cream">
        <div className="site grid gap-12 pb-20 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 grid gap-8 pt-4 sm:grid-cols-2 sm:items-center lg:order-1 lg:col-span-6 lg:pt-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_2rem_6rem]">
              <Image src={designPhotos.analysisReceive} alt="Calm, modern interior" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-olive">
                What You&apos;ll Receive <span className="h-px w-10 bg-olive/50" />
              </p>
              <h2 className="display mt-4 text-3xl md:text-4xl">A Clear, Actionable Rental Analysis</h2>
              <ul className="mt-6 space-y-5">
                {receive.map((r) => (
                  <li key={r.title} className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-olive" />
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-sm text-slate">{r.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative z-10 order-1 -mt-6 lg:order-2 lg:col-span-6 lg:-mt-[22rem]">
            <div className="rounded-2xl bg-cream p-6 shadow-2xl shadow-ink/25 ring-1 ring-line-light sm:p-10">
              <AnalysisForm />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="relative overflow-hidden bg-night text-cream">
        <div className="absolute inset-y-0 right-0 hidden w-[24%] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] xl:block">
          <Image src={designPhotos.analysisStoneBand} alt="" fill sizes="24vw" className="object-cover" />
        </div>
        <div className="site relative grid gap-10 py-14 lg:grid-cols-12 lg:items-center xl:pr-[22%]">
          <div className="flex gap-5 lg:col-span-5 lg:border-r lg:border-line-dark lg:pr-10">
            <ShieldCheck className="h-12 w-12 shrink-0 stroke-[1.25] text-sage" />
            <div>
              <h2 className="display text-3xl">Your Information is Secure</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                We respect your privacy. Your details are kept confidential and used only to prepare your rental analysis.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-4 text-center text-sm lg:col-span-7">
            {assurances.map((a) => (
              <li key={a.label} className="flex flex-col items-center gap-3">
                <a.icon className="h-7 w-7 stroke-[1.5] text-sage" />
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
