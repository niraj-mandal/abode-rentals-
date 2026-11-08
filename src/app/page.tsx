import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const promises = ["Professional management", "Fast response", "Transparent reporting", "Licensed & insured"];

const benefits = [
  { title: "Hands-off ownership", desc: "We handle the day-to-day so your rental becomes true passive income." },
  { title: "Better tenants", desc: "Rigorous screening means reliable residents and lower turnover." },
  { title: "Transparent reporting", desc: "Monthly statements and real-time insight keep you in control." },
  { title: "Local market expertise", desc: "Data-driven pricing and strategy to maximise rental income." },
];

const services = [
  { title: "Tenant placement", desc: "Marketing, showings, screening and leases — handled start to finish." },
  { title: "Rent collection", desc: "On-time collection, online payments and prompt owner disbursements." },
  { title: "Maintenance", desc: "24/7 maintenance coordination with trusted, vetted local vendors." },
  { title: "Financial reporting", desc: "Detailed monthly reports, so you always know your numbers." },
  { title: "Legal compliance", desc: "Stay compliant with fair-housing law and lease regulations." },
];

const steps = [
  { title: "Consultation", desc: "We learn your goals and evaluate your property." },
  { title: "Onboarding", desc: "We handle the paperwork and set everything up." },
  { title: "Tenant placement", desc: "We market your home and place qualified tenants." },
  { title: "Ongoing management", desc: "We run the day-to-day while you enjoy the returns." },
];

const markets = [
  { name: "Concord", img: "1600585154340-be6161a56a0c" },
  { name: "Huntersville", img: "1600607687920-4e2a09cf159d" },
  { name: "Matthews", img: "1602941525421-8f8b81d3edbb" },
  { name: "Gastonia", img: "1512917774080-9991f1c4c750" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1320px] px-5 pt-10 md:px-10 md:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Property management · Charlotte, NC</p>
            <h1 className="display mt-8 text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">
              Your property.
              <br />
              <span className="italic text-brand">Better managed.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 lg:pb-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              From tenant placement and rent collection to maintenance and financial reporting, we manage every detail —
              so you enjoy stress-free ownership and stronger returns.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/list-property" className={buttonStyles({ size: "lg" })}>
                Get a free rental analysis <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/#services" className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold">
                See what we handle
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="relative mt-12 aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[16/9] md:mt-16 lg:aspect-[21/9]">
          <Image
            src="/hero-house.png"
            alt="Modern home with warm interior lighting at dusk"
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover object-[60%_center]"
          />
          <div className="absolute bottom-0 left-0 hidden bg-paper px-8 pt-6 pb-0 sm:block">
            <p className="label">Now serving</p>
            <p className="mt-1 font-serif text-2xl">North Carolina owners</p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 border-b border-line md:grid-cols-4">
          {promises.map((p, i) => (
            <li
              key={p}
              className={`flex items-center gap-3 py-6 text-sm font-medium ${i % 2 ? "pl-5" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""}`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Why owners choose us */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Why owners choose us</p>
            <h2 className="display mt-6 text-5xl md:text-6xl">
              More than management.
              <br />
              <span className="italic">It&apos;s peace of mind.</span>
            </h2>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
              <Image src={unsplash("1600210492486-724fe5c67fb0", 900)} alt="Bright, well-kept living room" fill sizes="40vw" className="object-cover" />
            </div>
          </Reveal>

          <ol className="lg:col-span-6 lg:col-start-7">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <li className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-9 last:border-b md:grid-cols-[5rem_1fr]">
                  <span className="font-serif text-lg text-brand-deep">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-3xl tracking-tight">{b.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{b.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 bg-ink text-paper">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-paper/60">Our services</p>
              <h2 className="display mt-6 text-5xl md:text-7xl">
                Full-service management,
                <span className="italic text-brand"> simplified.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-paper/65">
                One team, one point of contact, every part of running a rental — so nothing falls between the cracks.
              </p>
            </Reveal>
          </div>

          <ul className="mt-16 md:mt-24">
            {services.map((s, i) => (
              <li key={s.title} className="group border-t border-paper/15 last:border-b">
                <div className="grid gap-3 py-8 transition-colors md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                  <span className="font-serif text-sm text-paper/40 md:col-span-1">0{i + 1}</span>
                  <h3 className="font-serif text-3xl tracking-tight transition-colors group-hover:text-brand md:col-span-5 md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="leading-relaxed text-paper/65 md:col-span-5">{s.desc}</p>
                  <ArrowUpRight className="hidden h-6 w-6 justify-self-end text-paper/30 transition-all group-hover:-translate-y-1 group-hover:text-brand md:block" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto w-full max-w-[1320px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Our process</p>
          <h2 className="display mt-6 text-5xl md:text-6xl">
            A seamless experience, <span className="italic">start to finish.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-paper p-8 pt-10 transition-colors hover:bg-stone md:min-h-80">
              <Reveal delay={i * 0.1} className="flex h-full flex-col">
                <span className="display text-7xl text-brand">{i + 1}</span>
                <h3 className="mt-auto pt-12 font-serif text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Markets */}
      <section id="markets" className="scroll-mt-20 bg-stone">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our markets</p>
              <h2 className="display mt-6 max-w-2xl text-5xl md:text-6xl">
                Proudly serving <span className="italic">Charlotte</span> and surrounding areas.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm md:col-span-6 md:row-span-2 md:aspect-auto">
              <Image src={unsplash("1568605114967-8130f3a36994", 1200)} alt="Home in Charlotte" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
              <div className="absolute bottom-0 p-7 text-paper">
                <p className="label text-paper/70">Home base</p>
                <p className="display mt-2 text-5xl md:text-6xl">Charlotte</p>
              </div>
            </Reveal>
            {markets.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="group relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-3">
                <Image
                  src={unsplash(m.img, 700)}
                  alt={`Home in ${m.name}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
                <p className="absolute bottom-0 p-5 font-serif text-2xl text-paper">{m.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="grid gap-10 border-t border-ink pt-12 lg:grid-cols-12 lg:items-end">
          <h2 className="display text-5xl md:text-7xl lg:col-span-8">
            Stop managing properties.
            <br />
            <span className="italic text-brand">Start growing your portfolio.</span>
          </h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-muted">
              Tell us about your property and get a free, no-obligation rental analysis within 24 hours.
            </p>
            <Link href="/list-property" className={`${buttonStyles({ size: "lg" })} mt-6`}>
              Get a free rental analysis <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
