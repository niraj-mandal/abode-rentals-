"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Menu, X, Home as HomeIcon, ChevronDown, ArrowRight } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
  hasDropdown?: boolean;
};

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pathname = usePathname();
  const isDarkHero = pathname === "/" || pathname === "/about";
  const useDarkText = !scrolled && !isDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-[#071321]/75 backdrop-blur-[20px] border-b border-white/8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image 
              src="/logo-mark.png" 
              alt="AR Logo" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-bold font-sans tracking-wide leading-none transition-colors duration-300 ${useDarkText ? "text-slate-800" : "text-white"}`}>
              Abode Rental
            </span>
            <span className={`text-[7.5px] font-semibold tracking-widest font-sans mt-1 transition-colors duration-300 ${useDarkText ? "text-slate-500" : "text-slate-300"}`}>
              PROPERTY MANAGEMENT
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && !link.href.includes('#') && pathname.startsWith(link.href));
            
            return (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`relative py-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                isActive 
                  ? (useDarkText ? "text-slate-900" : "text-white") 
                  : (useDarkText ? "text-slate-600 hover:text-slate-900" : "text-slate-200 hover:text-white")
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60 z-10" />}
              
              <AnimatePresence>
                {(hoveredLink === link.name || isActive) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
                    style={{
                      originX: 0.5,
                      boxShadow: "0 0 10px #D97745, 0 0 4px #D97745",
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </Link>
          )})}
        </nav>

        <div className="hidden md:block">
          <Link href="/list-property">
            <Button variant="secondary" size="sm" className="rounded-md font-bold px-5 py-2 text-[10px]">
              Free Rental Analysis
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-1 transition-colors focus:outline-none cursor-pointer z-50 ${useDarkText ? "text-slate-800 hover:text-secondary" : "text-white hover:text-secondary"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.header>

      {/* Mobile menu drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[90px] inset-x-4 z-40 bg-gradient-to-b from-[#1a1a1a]/95 to-[#050505]/95 backdrop-blur-2xl md:hidden flex flex-col p-6 rounded-[32px] border border-white/10 shadow-2xl"
            >
              <nav className="flex flex-col">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-4 text-[17px] font-sans font-medium text-white hover:text-white/70 transition-all ${idx !== navLinks.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <span className="capitalize">{link.name.toLowerCase()}</span>
                      <ArrowRight className="w-4 h-4 text-white/40" />
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <Link href="/list-property" onClick={() => setIsOpen(false)} className="w-full block">
                    <Button className="w-full rounded-full font-bold uppercase tracking-widest text-[13px] bg-[#D97745] hover:bg-[#c4683a] text-white py-6 shadow-[0_0_20px_rgba(217,119,69,0.3)] transition-all">
                      Free Rental Analysis
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

