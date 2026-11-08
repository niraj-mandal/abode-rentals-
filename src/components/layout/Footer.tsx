import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Markets", href: "/#markets" },
  { name: "About", href: "/about" },
  { name: "Free rental analysis", href: "/list-property" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1320px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-paper/60">Talk to us</p>
            <h2 className="display mt-6 text-5xl md:text-7xl">
              Let&apos;s look after
              <br />
              <span className="italic text-brand">your property.</span>
            </h2>
          </div>

          <div className="md:col-span-3">
            <p className="label text-paper/50">Contact</p>
            <ul className="mt-5 space-y-3 text-paper/85">
              <li>
                <a href="tel:7043331234" className="hover:text-brand">+1 704 333 1234</a>
              </li>
              <li>
                <a href="mailto:info@aboderental.com" className="hover:text-brand">info@aboderental.com</a>
              </li>
              <li className="text-paper/60">500 S College St<br />Charlotte, NC 28202</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-paper/50">Explore</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-paper/85 hover:text-brand">
                    {l.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 select-none font-serif text-[22vw] leading-[0.8] tracking-[-0.04em] text-paper/[0.06] md:mt-28 md:text-[17vw]"
        >
          Abode
        </p>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-6 text-xs text-paper/50 md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} Abode Rental LLC. All rights reserved.</span>
          <span>Licensed property management · North Carolina</span>
        </div>
      </div>
    </footer>
  );
}
