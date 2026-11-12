"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, BookOpen, Home as HomeIcon, LayoutGrid, Lightbulb, Wrench } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { designPhotos } from "@/lib/site";

const CATEGORIES = [
  { name: "All Resources", icon: LayoutGrid },
  { name: "Property Management", icon: HomeIcon },
  { name: "Landlord Guides", icon: BookOpen },
  { name: "Market Insights", icon: BarChart3 },
  { name: "Rental Tips", icon: Lightbulb },
  { name: "Maintenance", icon: Wrench },
];

// Planned guides — shown as "coming soon" until each article is written.
const GUIDES = [
  { category: "Landlord Guides", title: "How to Screen Tenants Effectively", desc: "A practical guide to finding reliable, long-term tenants for your property.", img: designPhotos.guideLiving },
  { category: "Property Management", title: "Is Professional Property Management Worth It?", desc: "A clear look at the benefits, costs, and long-term value for landlords.", img: designPhotos.guideHouse },
  { category: "Market Insights", title: "Understanding Rent Prices in Charlotte", desc: "What drives rents in the Charlotte area and how to price your home.", img: designPhotos.guideSkyline },
  { category: "Rental Tips", title: "Preparing Your Home for New Tenants", desc: "Simple steps that help your property rent faster and for longer.", img: designPhotos.livingRoom },
  { category: "Maintenance", title: "A Seasonal Maintenance Checklist", desc: "Protect your property's value with upkeep through the year.", img: designPhotos.rowCare },
];

export function GuideList() {
  const [active, setActive] = useState("All Resources");
  const shown = active === "All Resources" ? GUIDES : GUIDES.filter((g) => g.category === active);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto border-b pb-5 [scrollbar-width:none]">
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            type="button"
            aria-pressed={active === c.name}
            onClick={() => setActive(c.name)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors ${
              active === c.name ? "bg-olive text-cream" : "hover:bg-cream-2"
            }`}
          >
            <c.icon className="h-4 w-4" /> {c.name}
          </button>
        ))}
      </div>

      {/* Featured */}
      {(active === "All Resources" || active === "Property Management") && (
        <article className="mt-10 grid gap-8 border-b pb-12 md:grid-cols-12 md:items-center">
          <div className="relative aspect-[16/11] overflow-hidden rounded-lg md:col-span-5">
            <Image src={designPhotos.resourcesFeatured} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-olive">Featured Guide · Coming Soon</p>
            <h2 className="display mt-4 text-3xl md:text-4xl">The Complete Guide to Rental Property Management</h2>
            <p className="mt-4 max-w-md leading-relaxed text-slate">
              Everything property owners need to know — from tenant placement to maintenance — to build a profitable, low-stress
              rental investment.
            </p>
            <Link href="/contact" className={`${buttonStyles()} mt-7`}>
              Ask Us in the Meantime <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      )}

      <h2 className="display mt-12 text-3xl md:text-4xl">Upcoming Guides</h2>
      {shown.length === 0 ? (
        <p className="mt-6 text-slate">No guides in this category yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((g) => (
            <li key={g.title} className="overflow-hidden rounded-lg bg-white/60 ring-1 ring-line-light">
              <div className="relative aspect-[16/9]">
                <Image src={g.img} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute top-3 left-3 rounded bg-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  {g.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{g.desc}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-olive">Coming soon</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
