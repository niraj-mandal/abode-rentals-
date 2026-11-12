import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { GuideList } from "@/components/site/GuideList";
import { ALSO_SERVING, designPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources & FAQs | Abode Rental",
  description: "Guides and answers for Charlotte-area rental property owners.",
};

const faqs = [
  {
    q: "What does full-service property management include?",
    a: "Tenant placement (marketing, showings, screening and leases), rent collection and owner disbursements, 24/7 maintenance coordination with vetted local vendors, monthly financial reporting, and help staying compliant with fair-housing and lease regulations.",
  },
  {
    q: "Which areas do you serve?",
    a: `Charlotte, NC, plus ${ALSO_SERVING.join(", ")}.`,
  },
  {
    q: "How does the free rental analysis work?",
    a: "Tell us about your property using our short form. We review it against the local market and contact you, usually within 24 hours, with an estimated rent range and a management recommendation. We may suggest a short on-site walk-through.",
  },
  {
    q: "Is there any obligation?",
    a: "No. The rental analysis is free and there's no obligation to sign up for management.",
  },
  {
    q: "How do you screen tenants?",
    a: "Every applicant goes through financial and background screening, including credit, income and rental history. We only place residents who meet our criteria.",
  },
  {
    q: "How do I get started?",
    a: "Request a free rental analysis or send us a message — we'll walk you through onboarding from there.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumb="Resources"
        title="Resources"
        intro="Property management insights, market updates, and practical guides for rental property owners."
        image={designPhotos.resourcesHero}
        imageAlt="Reading corner with a lamp and garden view"
      />

      <section className="bg-cream">
        <div className="site py-12 md:py-16">
          <GuideList />
        </div>
      </section>

      <section id="faqs" className="scroll-mt-24 bg-cream-2">
        <div className="site grid gap-10 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQs" title="Questions Owners Ask" />
            <p className="mt-5 max-w-sm leading-relaxed text-slate">Can&apos;t find what you need? We&apos;re happy to help.</p>
            <Link href="/contact" className={`${buttonStyles({ variant: "ghostInk" })} mt-7`}>
              Contact Us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
