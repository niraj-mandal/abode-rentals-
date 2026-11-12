"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { buttonStyles } from "../ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Areas", href: "/areas" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // tuck the header away while reading down, bring it back on any scroll up
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 300);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b text-cream transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled || isOpen ? "border-line-dark bg-night/90 backdrop-blur-md" : "border-transparent bg-transparent",
        hidden && !isOpen && "-translate-y-full",
      )}
    >
      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-sage" />
      <div className="site flex h-20 items-center justify-between md:h-24">
        <Link href="/" aria-label="Abode Rental home">
          <Image src="/logo-white.png" alt="Abode Rental" width={1419} height={298} className="h-8 w-auto md:h-10" preload />
        </Link>

        <nav className="hidden items-center gap-8 xl:gap-10 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[15px] transition-colors hover:text-white",
                  active ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-sage" : "text-cream/80",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <Link href="/list-property" className={cn(buttonStyles({ variant: "light" }), "hidden lg:inline-flex")}>
          Get Rental Analysis <ArrowUpRight className="h-4 w-4" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="-mr-2 p-2 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {isOpen && (
        <nav className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line-dark bg-night px-5 pb-8 lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between border-b border-line-dark py-5 font-serif text-3xl"
            >
              {link.name}
              <ArrowUpRight className="h-5 w-5 text-sage" />
            </Link>
          ))}
          <Link href="/list-property" onClick={() => setIsOpen(false)} className={cn(buttonStyles({ variant: "light", size: "lg" }), "mt-8 w-full")}>
            Get Your Free Rental Analysis
          </Link>
        </nav>
      )}
    </header>
  );
}
