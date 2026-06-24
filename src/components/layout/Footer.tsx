"use client";

import Link from 'next/link';
import { Home as HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <motion.footer 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="w-full border-t border-white/5 bg-[#0F172A] text-white relative z-10 font-sans mt-32"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row justify-between gap-12">
        <motion.div variants={itemVariants} className="max-w-xs flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="w-7 h-7 text-secondary stroke-[2] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold font-sans tracking-wide text-white leading-none">
                Abode Rental
              </span>
              <span className="text-[7.5px] font-semibold tracking-widest text-slate-400 font-sans mt-1">
                PROPERTY MANAGEMENT
              </span>
            </div>
          </Link>
          <p className="text-slate-400 leading-relaxed font-light text-sm">
            Professional property management that protects your investment and maximizes your returns.
          </p>
          {/* Social media icons with glow effect */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-secondary/20 hover:text-secondary hover:shadow-[0_0_12px_rgba(217,119,69,0.5)] border border-transparent hover:border-[#D97745]/30 transition-all duration-300 flex items-center justify-center text-slate-400" 
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-secondary/20 hover:text-secondary hover:shadow-[0_0_12px_rgba(217,119,69,0.5)] border border-transparent hover:border-[#D97745]/30 transition-all duration-300 flex items-center justify-center text-slate-400" 
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-secondary/20 hover:text-secondary hover:shadow-[0_0_12px_rgba(217,119,69,0.5)] border border-transparent hover:border-[#D97745]/30 transition-all duration-300 flex items-center justify-center text-slate-400" 
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 flex-1 max-w-4xl lg:ml-12">
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-xs font-light text-slate-400">
              <li><Link href="/" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Home</Link></li>
              <li><Link href="/#services" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Services</Link></li>
              <li><Link href="/#markets" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Markets</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Contact</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-xs font-light text-slate-400">
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Owner Portal</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Tenant Portal</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Blog</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Rental Market Reports</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-xs font-light text-slate-400">
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Careers</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Terms of Service</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-xs font-light text-slate-400">
              <li className="hover:text-white transition-colors duration-300">(800) 555-1234</li>
              <li className="hover:text-white transition-colors duration-300">info@aboderental.com</li>
              <li className="hover:text-white transition-colors duration-300">1234 Park Rd, Suite 101</li>
              <li className="hover:text-white transition-colors duration-300">Charlotte, NC 28209</li>
            </ul>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-[10px] text-slate-500 font-light tracking-widest uppercase">
        &copy; 2026 Abode Rental LLC. All rights reserved.
      </div>
    </motion.footer>
  );
}


