import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, ShieldCheck, Users } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/Parallax";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { AreasExplorer } from "@/components/site/AreasExplorer";
import { AREAS, designPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Abode Rental",
  description: "Property management across Charlotte, NC and surrounding communities including Matthews, Ballantyne, Huntersville and Mint Hill.",
};

const market = [
  { icon: BarChart3, title: "Growing Demand", desc: "A growing population and job market support steady rental demand." },
  { icon: Users, title: "Diverse Tenant Base", desc: "Major employers across finance, healthcare, and technology." },
  { icon: ShieldCheck, title: "Long-Term Value", desc: "A stable market for sustained rental income and property appreciation." },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumb="Service Areas"
        title={<>Service Areas<em className="mt-3 block text-[0.6em] text-sage">Charlotte Expertise, Local Service.</em></>}
        intro={`Professional property management across Charlotte and ${AREAS.length - 1} surrounding communities.`}
        image={designPhotos.areasHero}
        imageAlt="Charlotte skyline at night"
      >
        <Link href="/list-property" className={buttonStyles({ size: "lg" })}>
          Get Your Rental Analysis <ArrowRight className="h-4 w-4" />
        </Link>
        <a href="#coverage" className={buttonStyles({ variant: "ghost", size: "lg" })}>
          Explore the Map
        </a>
      </PageHero>

      <AreasExplorer />

      {/* Charlotte market */}
      <section className="bg-cream-2">
        <div className="site grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading eyebrow="The Charlotte Market" title="A Strong Rental Market for Owners" />
              <p className="mt-5 max-w-md leading-relaxed text-slate">
                Charlotte&apos;s job growth, steady relocation, and long-term demand make it one of the Southeast&apos;s most
                attractive places to own a rental.
              </p>
            </Reveal>
            <RevealImage className="relative mt-10 aspect-[16/9] rounded-xl">
              <Image src={designPhotos.areasMarketStreet} alt="Tree-lined residential street" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </RevealImage>
          </div>
          <ul className="lg:col-span-5 lg:col-start-8">
            {market.map((m, i) => (
              <li key={m.title}>
                <Reveal delay={i * 0.08} className="flex gap-5 border-b border-ink/10 py-8 first:pt-0 last:border-b-0">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cream">
                    <m.icon className="h-6 w-6 stroke-[1.5] text-olive" />
                  </span>
                  <div>
                    <p className="font-serif text-2xl">{m.title}</p>
                    <p className="mt-2 leading-relaxed text-slate">{m.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-olive text-cream">
        <div className="site grid gap-8 py-14 md:py-16 lg:grid-cols-12 lg:items-center">
          <h2 className="display text-[2.1rem] sm:text-5xl lg:col-span-5">See Your Property&apos;s Potential in Charlotte</h2>
          <p className="leading-relaxed text-cream/90 lg:col-span-4 lg:border-l lg:border-white/25 lg:pl-8">
            Get a rental analysis with local market insights, estimated rent, and personalized recommendations.
          </p>
          <Link href="/list-property" className={`${buttonStyles({ variant: "light", size: "lg" })} lg:col-span-3 lg:justify-self-end`}>
            Get Free Rental Analysis <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
