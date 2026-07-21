"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
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
    hidden: { opacity: 0, y: 20 },
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
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="w-full bg-[#22272E] text-white relative z-10 font-sans mt-32 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row justify-between gap-12 md:gap-16">
        
        {/* Left Column - About & Socials */}
        <motion.div variants={itemVariants} className="flex flex-col md:w-5/12 md:pr-4">
          <h3 className="text-xl font-bold text-white mb-6 tracking-wide">About the company</h3>
          <p className="text-slate-300 leading-relaxed text-[15px] mb-8 font-normal">
            Professional property management that protects your investment and maximizes your returns. We specialize in providing top-tier service for property owners and tenants alike.
          </p>
          
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded bg-[#323842] hover:bg-secondary transition-colors flex items-center justify-center text-white" aria-label="Facebook">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded bg-[#323842] hover:bg-secondary transition-colors flex items-center justify-center text-white" aria-label="Instagram">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </motion.div>

        {/* Middle Column - Quick Links */}
        <motion.div variants={itemVariants} className="flex flex-col md:w-3/12 md:pl-10">
          <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Quick Links</h3>
          <div className="flex flex-col gap-4 text-[15px] text-slate-300 font-normal">
            <Link href="/" className="hover:text-white transition-colors w-fit">Home</Link>
            <Link href="/#services" className="hover:text-white transition-colors w-fit">Services</Link>
            <Link href="/#markets" className="hover:text-white transition-colors w-fit">Markets</Link>
            <Link href="/about" className="hover:text-white transition-colors w-fit">About Us</Link>
          </div>
        </motion.div>

        {/* Right Column - Contact Info */}
        <motion.div variants={itemVariants} className="flex flex-col md:w-4/12 md:items-end">
          
          <div className="flex flex-col w-fit">
            <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Contact Us</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#323842] flex flex-shrink-0 items-center justify-center shadow-inner">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <a href="tel:7043259240" className="text-[18px] font-bold text-white hover:text-secondary transition-colors">
                  +1 704 325 9240
                </a>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#323842] flex flex-shrink-0 items-center justify-center shadow-inner">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <a href="mailto:info@aboderental.com" className="text-[16px] font-bold text-blue-400 hover:text-blue-300 transition-colors tracking-wide">
                  info@aboderental.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#1C2128] py-5 px-6 border-t border-[#30363d]">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <div className="text-[13px] text-slate-300 font-normal">
            &copy; 2026 Abode Rental LLC. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}


