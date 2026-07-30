"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-0 pb-8 font-sans bg-white -mt-32">
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-40 pb-20 bg-[#0F172A] text-white">
        <div className="text-center z-20 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 block bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20 w-fit mx-auto">
              Our Registry
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8 text-center leading-[1.05]">
              Premium Listings
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-2xl mx-auto mt-12"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6 text-secondary">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">New listings coming soon</h2>
            <p className="text-slate-300 text-center font-light leading-relaxed mb-8">
              We are currently onboarding a new portfolio of luxury properties. Check back shortly to view our exclusive North Carolina rental registry.
            </p>
            <Link href="/#contact">
              <Button variant="primary">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
