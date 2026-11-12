import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Home as HomeIcon, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT, designPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Abode Rental",
  description: "Get in touch with Abode Rental about property management in Charlotte, NC.",
};

const details = [
  { icon: Phone, title: CONTACT.phone, desc: "Call us to talk through your property.", href: CONTACT.phoneHref },
  { icon: Mail, title: CONTACT.email, desc: "Email us anytime.", href: `mailto:${CONTACT.email}` },
  { icon: MapPin, title: "Charlotte, NC", desc: CONTACT.address },
];

const values = [
  { icon: HomeIcon, title: "Local Expertise", desc: "Deep knowledge of the Charlotte market." },
  { icon: ShieldCheck, title: "Responsive Support", desc: "Real people, real answers." },
  { icon: BarChart3, title: "Owner-Focused", desc: "Solutions built for long-term value." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Get in Touch"
        intro="Have a question about your property, our services, or the local rental market? We're here to help."
        image={designPhotos.contactHero}
        imageAlt="Modern home exterior"
      />

      <section className="bg-cream">
        <div className="site grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          <ul className="space-y-8 lg:col-span-5">
            {details.map((d) => (
              <li key={d.title} className="flex gap-5">
                <d.icon className="h-7 w-7 shrink-0 stroke-[1.5]" />
                <div>
                  {d.href ? (
                    <a href={d.href} className="font-semibold hover:text-olive">{d.title}</a>
                  ) : (
                    <p className="font-semibold">{d.title}</p>
                  )}
                  <p className="mt-1 text-slate">{d.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <Reveal className="rounded-2xl bg-white/70 p-6 shadow-xl shadow-ink/10 ring-1 ring-line-light sm:p-10 lg:col-span-7">
            <h2 className="display text-3xl md:text-4xl">Send Us a Message</h2>
            <p className="mt-2 mb-8 text-slate">Tell us a bit about your property or question, and we&apos;ll get back to you soon.</p>
            <ContactForm />
          </Reveal>
        </div>

        <div className="site pb-16 md:pb-20">
          <Reveal className="relative overflow-hidden rounded-2xl bg-night text-cream">
            <div className="absolute inset-y-0 right-0 w-full md:w-[60%]">
              <Image src={designPhotos.contactCta} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-night/0 max-md:via-night/85 max-md:to-night/60" />
            </div>
            <div className="relative max-w-md p-8 md:p-14">
              <p className="eyebrow text-mist">Not sure where to start?</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">Get a Free Rental Analysis</h2>
              <p className="mt-4 leading-relaxed text-cream/85">Find out how much your property could earn in today&apos;s Charlotte rental market.</p>
              <Link href="/list-property" className={`${buttonStyles()} mt-8`}>
                Get My Rental Analysis <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-0">
            {values.map((v, i) => (
              <li key={v.title} className={i > 0 ? "sm:border-l sm:pl-8" : ""}>
                <v.icon className="h-8 w-8 stroke-[1.25]" />
                <p className="mt-4 font-semibold">{v.title}</p>
                <p className="mt-1 text-sm text-slate">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
