"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { buttonStyles } from "../ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Markets", href: "/#markets" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || isOpen ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1320px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" aria-label="Abode Rental home">
          <Image src="/logo.png" alt="Abode Rental" width={1419} height={298} className="h-8 w-auto md:h-10" priority />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors hover:text-ink ${pathname === link.href ? "text-ink" : "text-muted"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href="/list-property" className={cn(buttonStyles({ size: "sm" }), "hidden lg:inline-flex")}>
          Free rental analysis <ArrowUpRight className="h-4 w-4" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="-mr-2 p-2 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-line bg-paper px-5 pb-8 lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between border-b border-line py-5 font-serif text-2xl"
            >
              {link.name}
              <ArrowUpRight className="h-5 w-5 text-muted" />
            </Link>
          ))}
          <Link href="/list-property" onClick={() => setIsOpen(false)} className={`${buttonStyles({ size: "lg" })} mt-8 w-full`}>
            Get a free rental analysis
          </Link>
        </nav>
      )}
    </header>
  );
}
