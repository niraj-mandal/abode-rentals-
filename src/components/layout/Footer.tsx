import Link from "next/link";
import Image from "next/image";
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
    <footer id="contact" className="border-t border-line bg-stone">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Image src="/logo-light.png" alt="Abode Rental" width={1419} height={298} className="h-10 w-auto" />
            <p className="mt-8 max-w-sm leading-relaxed text-muted">
              Full-service property management for Charlotte-area owners. Licensed, insured and local.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label">Contact</p>
            <ul className="mt-5 space-y-3 text-ink/85">
              <li><a href="tel:7043331234" className="hover:text-brand-deep">+1 704 333 1234</a></li>
              <li><a href="mailto:info@aboderental.com" className="hover:text-brand-deep">info@aboderental.com</a></li>
              <li className="text-muted">500 S College St<br />Charlotte, NC 28202</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label">Explore</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-ink/85 hover:text-brand-deep">
                    {l.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line py-6 text-xs text-muted md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} Abode Rental LLC. All rights reserved.</span>
          <span>Licensed property management · North Carolina</span>
        </div>
      </div>
    </footer>
  );
}
