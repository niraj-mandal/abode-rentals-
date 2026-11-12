import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Service Areas", href: "/areas" },
      { name: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Owner Guides", href: "/resources" },
      { name: "FAQs", href: "/resources#faqs" },
      { name: "Free Rental Analysis", href: "/list-property" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-night text-cream">
      {/* Editorial sign-off */}
      <div className="site flex flex-col gap-10 border-b border-line-dark py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <p className="eyebrow text-sage">Abode Rental</p>
          <p className="display mt-6 max-w-3xl text-[2.6rem] sm:text-6xl lg:text-7xl">
            Your property. <em className="text-sage">Our priority.</em>
          </p>
        </div>
        <Link href="/contact" className="link-line inline-flex shrink-0 items-center gap-2 self-start pb-1 text-lg text-cream md:self-auto">
          Talk to our team <ArrowUpRight className="h-5 w-5 text-sage" />
        </Link>
      </div>
      <div className="site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Image src="/logo-white.png" alt="Abode Rental" width={1419} height={298} className="h-10 w-auto" />
          <p className="mt-6 max-w-xs leading-relaxed text-mist">Property management for Charlotte and surrounding areas.</p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-mist">
              {col.links.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="link-line transition-colors hover:text-white">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4">
          <p className="text-sm font-semibold">Get in Touch</p>
          <ul className="mt-5 space-y-4 text-[15px] text-mist">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-sage" />
              <a href="tel:+17043331234" className="hover:text-white">+1 704 333 1234</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-sage" />
              <a href="mailto:info@aboderental.com" className="hover:text-white">info@aboderental.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sage" />
              <span>500 S College St, Charlotte, NC 28202</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="site flex flex-col gap-2 py-6 text-sm text-mist md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} Abode Rental LLC. All rights reserved.</span>
          <span>Licensed property management · North Carolina</span>
        </div>
      </div>
    </footer>
  );
}
