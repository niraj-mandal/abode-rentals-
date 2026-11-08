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
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-500",
        scrolled || isOpen ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="Abode Rental home">
          <Image src="/logo-light.png" alt="Abode Rental" width={1419} height={298} className="h-8 w-auto md:h-9" priority />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-brand-deep",
                pathname === link.href ? "text-ink" : "text-ink/70",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href="/list-property" className={cn(buttonStyles({ size: "sm" }), "hidden lg:inline-flex")}>
          Free analysis <ArrowUpRight className="h-4 w-4" />
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
        <nav className="h-[calc(100dvh-5rem)] border-t border-line bg-paper px-5 pb-8 lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="display flex items-center justify-between border-b border-line py-5 text-3xl"
            >
              {link.name}
              <ArrowUpRight className="h-5 w-5 text-brand" />
            </Link>
          ))}
          <Link href="/list-property" onClick={() => setIsOpen(false)} className={cn(buttonStyles({ size: "lg" }), "mt-8 w-full")}>
            Get a free rental analysis
          </Link>
        </nav>
      )}
    </header>
  );
}
