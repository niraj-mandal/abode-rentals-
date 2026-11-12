"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/site/PageHero";
import { AREAS, type Area } from "@/lib/site";
import { cn } from "@/lib/utils";

// Equirectangular projection scaled for 35°N, fitted to a 500×500 viewBox.
const K = 1100;
const proj = (lat: number, lng: number) => ({ x: (lng + 81.06) * K * 0.817, y: (35.48 - lat) * K });
const path = (pts: [number, number][]) => pts.map(([la, ln], i) => `${i ? "L" : "M"}${proj(la, ln).x.toFixed(1)} ${proj(la, ln).y.toFixed(1)}`).join(" ");

// Approximate interstate routes (simplified, for orientation only).
const I77: [number, number][] = [[35.47, -80.86], [35.41, -80.85], [35.3, -80.84], [35.23, -80.855], [35.15, -80.88], [35.08, -80.9], [35.02, -80.94]];
const I85: [number, number][] = [[35.13, -81.05], [35.2, -80.93], [35.25, -80.85], [35.3, -80.76], [35.36, -80.68], [35.42, -80.6], [35.47, -80.54]];
const US74: [number, number][] = [[35.222, -80.84], [35.17, -80.75], [35.12, -80.7], [35.06, -80.6]];
const RING = proj(35.22, -80.83); // I-485 loop centre
const RING_RX = 0.18 * K * 0.817;
const RING_RY = 0.17 * K;

// Mecklenburg County outline, simplified (Charlotte's county; Concord/Harrisburg sit in Cabarrus, Indian Trail in Union).
const MECKLENBURG: [number, number][] = [
  [35.515, -80.875], [35.5, -80.795], [35.4, -80.72], [35.32, -80.69], [35.23, -80.6], [35.205, -80.56],
  [35.14, -80.64], [35.06, -80.76], [35.035, -80.8], [35.05, -80.9], [35.1, -80.96], [35.15, -81.04],
  [35.25, -81.03], [35.33, -80.99], [35.4, -80.96], [35.47, -80.94],
];

// North Carolina outline, heavily simplified, for the locator inset.
const NC: [number, number][] = [
  [36.59, -81.68], [36.54, -79.5], [36.55, -77.0], [36.55, -75.87], [36.0, -75.62], [35.6, -75.47], [35.23, -75.53],
  [35.0, -76.0], [34.7, -76.65], [34.62, -77.2], [34.2, -77.8], [33.85, -78.55], [34.3, -79.0], [34.8, -79.68],
  [34.82, -80.8], [35.13, -80.93], [35.04, -81.05], [35.17, -81.9], [35.2, -82.3], [35.0, -83.1], [34.99, -84.32],
  [35.2, -84.3], [35.45, -83.9], [35.55, -83.5], [35.75, -83.25], [36.05, -82.6], [36.15, -82.0], [36.35, -81.9],
];
const ncProj = (lat: number, lng: number) => ({ x: (lng + 84.45) * 12, y: (36.7 - lat) * 12 * 1.22 });
const ncPath = NC.map(([la, ln], i) => `${i ? "L" : "M"}${ncProj(la, ln).x.toFixed(1)} ${ncProj(la, ln).y.toFixed(1)}`).join(" ") + "Z";

function Locator() {
  const clt = ncProj(35.227, -80.843);
  const box = { a: ncProj(35.48, -81.06), b: ncProj(35.02, -80.45) };
  return (
    // shortcut: hidden on phones, where the map is too small to fit it without covering labels
    <figure className="pointer-events-none absolute top-4 left-4 hidden w-28 rounded-lg sm:block bg-night/70 p-2 ring-1 ring-line-dark backdrop-blur sm:top-7 sm:left-7 sm:w-36">
      <svg viewBox="0 0 110 52" className="h-auto w-full" aria-hidden>
        <path d={ncPath} className="fill-cream/10 stroke-cream/45" strokeWidth={0.8} strokeLinejoin="round" />
        <rect x={box.a.x - 1} y={box.a.y - 1} width={box.b.x - box.a.x + 2} height={box.b.y - box.a.y + 2} className="fill-sage/25 stroke-sage" strokeWidth={0.8} />
        <circle cx={clt.x} cy={clt.y} r={1.8} className="fill-sage" />
      </svg>
      <figcaption className="mt-1 text-[9px] tracking-[0.16em] text-mist uppercase sm:text-[10px]">North Carolina</figcaption>
    </figure>
  );
}

// Label side per town so neighbours never collide.
const LEFT_LABELS = new Set(["Concord", "Pineville"]);

function Shield({ x, y, n }: { x: number; y: number; n: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <rect x={-15} y={-9} width={30} height={18} rx={4} className="fill-night stroke-sage/50" />
      <text y={4} textAnchor="middle" className="fill-mist text-[10px] font-semibold">{n}</text>
    </g>
  );
}

export function AreasExplorer() {
  const [active, setActive] = useState<string>("Charlotte");
  const reduce = useReducedMotion();
  const current = AREAS.find((a) => a.name === active) as Area;
  const c = proj(AREAS[0].lat, AREAS[0].lng);

  return (
    <>
      {/* Coverage: interactive map + town details */}
      <section id="coverage" className="scroll-mt-24 bg-night text-cream">
        <div className="site py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading dark eyebrow="Our Coverage" title="Where We Operate" className="lg:col-span-6" />
            <p className="max-w-md leading-relaxed text-mist lg:col-span-5 lg:col-start-8">
              Full-service property management across Charlotte and eight surrounding communities. Select a town on the map
              or below to learn more.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Map */}
            <Reveal className="relative rounded-2xl bg-night-2 p-3 ring-1 ring-line-dark sm:p-6 lg:col-span-7">
              <Locator />
              <svg viewBox="0 0 500 500" className="h-auto w-full" role="group" aria-label="Map of Charlotte and the towns Abode Rental serves">
                <defs>
                  <pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M25 0H0V25" fill="none" stroke="currentColor" strokeOpacity="0.05" />
                  </pattern>
                  <radialGradient id="map-glow">
                    <stop offset="0" stopColor="var(--color-sage)" stopOpacity="0.28" />
                    <stop offset="1" stopColor="var(--color-sage)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="500" height="500" fill="url(#map-grid)" className="text-cream" />
                <ellipse cx={RING.x} cy={RING.y} rx={RING_RX * 1.35} ry={RING_RY * 1.35} fill="url(#map-glow)" />

                {/* county area */}
                <g aria-hidden>
                  <path d={`${path(MECKLENBURG)}Z`} className="fill-olive/35 stroke-sage/60" strokeWidth={1.5} strokeDasharray="6 4" strokeLinejoin="round" />
                  <text {...proj(35.37, -81.0)} className="fill-sage/80 text-[10px] tracking-[0.2em]">MECKLENBURG CO.</text>
                  <text {...proj(35.46, -80.68)} className="fill-mist/60 text-[10px] tracking-[0.2em]">CABARRUS CO.</text>
                  <text {...proj(35.035, -80.66)} className="fill-mist/60 text-[10px] tracking-[0.2em]">UNION CO.</text>
                  <text {...proj(35.06, -81.05)} className="fill-mist/50 text-[9px] tracking-[0.2em]">SOUTH CAROLINA</text>
                </g>

                {/* roads */}
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <ellipse cx={RING.x} cy={RING.y} rx={RING_RX} ry={RING_RY} className="stroke-sage/45" strokeWidth={2.5} />
                  <path d={path(I77)} className="stroke-cream/35" strokeWidth={3} />
                  <path d={path(I85)} className="stroke-cream/35" strokeWidth={3} />
                  <path d={path(US74)} className="stroke-cream/20" strokeWidth={2} strokeDasharray="1 5" />
                </g>
                <Shield {...proj(35.44, -80.858)} n="I-77" />
                <Shield {...proj(35.33, -80.735)} n="I-85" />
                <Shield x={RING.x - RING_RX} y={RING.y + 40} n="I-485" />

                {/* towns */}
                {AREAS.map((a) => {
                  const p = proj(a.lat, a.lng);
                  const on = a.name === active;
                  const primary = a.name === "Charlotte";
                  const left = LEFT_LABELS.has(a.name);
                  return (
                    <g
                      key={a.name}
                      role="button"
                      tabIndex={0}
                      aria-label={`${a.name}${a.note ? `, ${a.note.toLowerCase()}` : ""}`}
                      aria-pressed={on}
                      // pointermove (not enter) so scrolling the page under a resting cursor doesn't switch towns
                      onPointerMove={(e) => e.pointerType === "mouse" && a.name !== active && setActive(a.name)}
                      onFocus={() => setActive(a.name)}
                      onClick={() => setActive(a.name)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(a.name))}
                      className="cursor-pointer outline-none [&:focus-visible_circle.dot]:stroke-cream"
                    >
                      <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
                      {/* the town's local area */}
                      {on && (
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={primary ? 46 : 32}
                          className="fill-sage/12 stroke-sage/55"
                          strokeWidth={1.2}
                          strokeDasharray="3 4"
                          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                        />
                      )}
                      {on && !reduce && (
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={primary ? 14 : 9}
                          className="fill-sage/30"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.6, opacity: 0 }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                        />
                      )}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={primary ? 9 : 6}
                        strokeWidth={2.5}
                        className={cn("dot transition-colors duration-300", on ? "fill-sage stroke-night" : "fill-cream stroke-night")}
                      />
                      <text
                        x={left ? p.x - 13 : p.x + 13}
                        y={p.y + 5}
                        textAnchor={left ? "end" : "start"}
                        className={cn(
                          "transition-colors duration-300",
                          primary ? "font-serif text-[22px]" : "text-[15px]",
                          on ? "fill-sage" : "fill-cream",
                        )}
                      >
                        {a.name}
                      </text>
                    </g>
                  );
                })}
                <text x={c.x + 13} y={c.y + 24} className="fill-mist text-[11px] tracking-[0.18em]">UPTOWN</text>
              </svg>
            </Reveal>

            {/* Town list + details */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              <ul className="flex flex-wrap gap-2" aria-label="Service areas">
                {AREAS.map((a) => (
                  <li key={a.name}>
                    <button
                      type="button"
                      aria-pressed={a.name === active}
                      onClick={() => setActive(a.name)}
                      className={cn(
                        "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                        a.name === active ? "border-sage bg-sage text-ink" : "border-line-dark text-cream/85 hover:border-white/40",
                      )}
                    >
                      {a.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="relative flex-1 overflow-hidden rounded-2xl bg-night-2 ring-1 ring-line-dark" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.name}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative aspect-[16/9]">
                      <Image src={current.img} alt={`Representative scene for ${current.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-night-2 via-transparent" />
                      {current.note && (
                        <span className="absolute top-4 left-4 rounded-full bg-night/80 px-3 py-1 text-xs font-semibold text-sage backdrop-blur">
                          {current.note}
                        </span>
                      )}
                    </div>
                    <div className="p-6 pt-2">
                      <h3 className="display flex items-center gap-2 text-3xl">
                        <MapPin className="h-5 w-5 text-sage" /> {current.name}
                      </h3>
                      <p className="mt-3 leading-relaxed text-mist">{current.blurb}</p>
                      <Link href="/list-property" className={cn(buttonStyles({ variant: "light" }), "mt-6")}>
                        Rental analysis in {current.name} <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All communities */}
      <section className="bg-cream">
        <div className="site py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow="Communities We Serve" title="Explore Our Service Communities" className="lg:col-span-6" />
            <p className="max-w-sm leading-relaxed text-slate lg:col-span-5 lg:col-start-8 lg:border-l lg:pl-8">
              Every community we manage in, from uptown Charlotte to the growing towns around it.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <li key={a.name}>
                <Reveal delay={(i % 3) * 0.06} className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/60 ring-1 ring-line-light transition-[box-shadow] duration-700 hover:ring-olive/40">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.img}
                      alt={`Representative scene for ${a.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                    />
                    {a.note && (
                      <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-olive">{a.note}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-2xl">{a.name}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-slate">{a.blurb}</p>
                    <div className="mt-5 flex items-center justify-between gap-4 border-t pt-4 text-sm font-semibold">
                      <Link href="/list-property" className="inline-flex items-center gap-1.5 text-olive hover:text-ink">
                        Get a rental analysis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <a href="#coverage" onClick={() => setActive(a.name)} className="text-slate hover:text-ink">
                        Show on map
                      </a>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-slate">
            Don&apos;t see your town?{" "}
            <Link href="/contact" className="font-semibold text-ink underline decoration-olive/40 underline-offset-4 hover:decoration-olive">
              Ask us — we may still be able to help.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
