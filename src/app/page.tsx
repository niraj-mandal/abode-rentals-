"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const promises = ["Professional management", "Fast response", "Transparent reporting", "Licensed & insured"];

const statement =
  "We handle tenants, rent, repairs and reporting — so owning a rental feels like owning an asset, not a second job.";

const services = [
  { title: "Tenant placement", desc: "Marketing, showings, screening and leases — handled start to finish.", img: "1600210492486-724fe5c67fb0" },
  { title: "Rent collection", desc: "On-time collection, online payments and prompt owner disbursements.", img: "1556911220-e15b29be8c8f" },
  { title: "Maintenance", desc: "24/7 maintenance coordination with trusted, vetted local vendors.", img: "1600607687920-4e2a09cf159d" },
  { title: "Financial reporting", desc: "Detailed monthly reports, so you always know your numbers.", img: "1564013799919-ab600027ffc6" },
  { title: "Legal compliance", desc: "Stay compliant with fair-housing law and lease regulations.", img: "1600585154340-be6161a56a0c" },
];

const benefits = [
  { title: "Hands-off ownership", desc: "We handle the day-to-day so your rental becomes true passive income." },
  { title: "Better tenants", desc: "Rigorous screening means reliable residents and lower turnover." },
  { title: "Transparent reporting", desc: "Monthly statements and real-time insight keep you in control." },
  { title: "Local market expertise", desc: "Data-driven pricing and strategy to maximise rental income." },
];

const steps = [
  { title: "Consultation", desc: "We learn your goals and evaluate your property." },
  { title: "Onboarding", desc: "We handle the paperwork and set everything up." },
  { title: "Tenant placement", desc: "We market your home and place qualified tenants." },
  { title: "Ongoing management", desc: "We run the day-to-day while you enjoy the returns." },
];

const markets = [
  { name: "Charlotte", img: "1568605114967-8130f3a36994" },
  { name: "Concord", img: "1600585154340-be6161a56a0c" },
  { name: "Huntersville", img: "1600607687920-4e2a09cf159d" },
  { name: "Matthews", img: "1602941525421-8f8b81d3edbb" },
  { name: "Gastonia", img: "1512917774080-9991f1c4c750" },
];

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

// Words brighten one by one as the paragraph scrolls through the viewport.
function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className="text-3xl leading-tight font-medium md:text-5xl">{text}</p>;
  return (
    <p ref={ref} className="text-3xl leading-tight font-medium md:text-5xl">
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const processRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ["start 0.8", "end 0.6"] });

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 flex min-h-[640px] flex-col justify-end overflow-hidden h-[100svh]">
        <Image
          src="/hero-house.jpg"
          alt="Modern home with warm interior lighting at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-paper/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/80 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow">Property management · Charlotte, NC</p>
            <h1 className="display mt-6 text-[2.2rem] sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Your property,
              <br />
              <span className="text-brand">better managed.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-ink/80">
              From tenant placement and rent collection to maintenance and reporting, we manage every detail — so you enjoy
              stress-free ownership and stronger returns.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/list-property" className={buttonStyles({ size: "lg" })}>
                Get a free rental analysis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#services" className={buttonStyles({ variant: "ghost", size: "lg" })}>
                Our services
              </Link>
            </div>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 border-t border-line md:mt-16 md:grid-cols-4">
            {promises.map((p, i) => (
              <li
                key={p}
                className={`py-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/75 ${i % 2 ? "pl-4" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""}`}
              >
                <span className="mr-2 text-brand">◆</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto w-full max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3 lg:pt-4">What we do</p>
          <div className="lg:col-span-9">
            <ScrollStatement text={statement} />
          </div>
        </div>
      </section>

      {/* Services: sticky image story */}
      <section id="services" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)]">
            <p className="eyebrow">Our services</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl">
              Full service.
              <br />
              <span className="text-brand">Zero hassle.</span>
            </h2>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden lg:block">
              {services.map((s, i) => (
                <Image
                  key={s.img}
                  src={unsplash(s.img, 1000)}
                  alt={s.title}
                  fill
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="absolute bottom-0 left-0 bg-paper px-4 py-2 text-xs font-semibold tracking-[0.2em] text-brand-deep">
                0{active + 1} / 0{services.length}
              </span>
            </div>
          </div>

          <ol>
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={`border-t border-line py-12 transition-opacity duration-500 last:border-b lg:py-20 ${i === active ? "lg:opacity-100" : "lg:opacity-35"}`}
              >
                <span className="text-sm font-semibold text-brand-deep">0{i + 1}</span>
                <h3 className="display mt-4 text-4xl md:text-5xl">{s.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{s.desc}</p>
                <div className="relative mt-8 aspect-[4/3] overflow-hidden lg:hidden">
                  <Image src={unsplash(s.img, 800)} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why owners choose us */}
      <section className="bg-stone">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Why owners choose us</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-5xl md:text-6xl">
              More than management. <span className="text-brand">Peace of mind.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="bg-stone p-8 md:p-12">
                <span className="display text-7xl text-transparent [-webkit-text-stroke:1px_var(--color-brand)] md:text-8xl">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-2xl font-semibold">{b.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section id="process" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow">Our process</p>
          <h2 className="display mt-6 max-w-4xl text-[2.25rem] sm:text-5xl md:text-6xl">
            Seamless, <span className="text-brand">start to finish.</span>
          </h2>
        </Reveal>

        <ol ref={processRef} className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-line md:block">
            <motion.div style={{ scaleX: processProgress }} className="h-full origin-left bg-brand" />
          </div>
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-l border-line pl-6 md:border-l-0 md:pl-0">
              <span className="absolute top-0 -left-[7px] h-[15px] w-[15px] rotate-45 border border-brand bg-paper md:relative md:left-0 md:block" />
              <p className="mt-0 text-sm font-semibold tracking-[0.2em] text-brand-deep md:mt-8">STEP 0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Markets */}
      <section id="markets" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our markets</p>
              <h2 className="display mt-6 max-w-3xl text-[2.25rem] sm:text-5xl md:text-6xl">
                Charlotte <span className="text-brand">&amp; beyond.</span>
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-muted">Proudly serving Charlotte and the surrounding areas.</p>
          </Reveal>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-24 [scrollbar-width:none] md:gap-5 md:px-10 md:pb-32">
          {markets.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06} className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden sm:w-[300px]">
              <Image
                src={unsplash(m.img, 700)}
                alt={`Home in ${m.name}`}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <p className="display text-3xl">{m.name}</p>
                <span className="text-xs font-semibold text-brand-deep">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden">
        <Image src={unsplash("1600596542815-ffad4c1539a9", 2000)} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-paper/80" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
          <Reveal className="max-w-4xl">
            <h2 className="display text-[2.25rem] sm:text-5xl md:text-7xl">
              Stop managing properties.
              <br />
              <span className="text-brand">Start growing your portfolio.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
              Tell us about your property and get a free, no-obligation rental analysis within 24 hours.
            </p>
            <Link href="/list-property" className={`${buttonStyles({ size: "lg" })} mt-10`}>
              Get a free rental analysis <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
