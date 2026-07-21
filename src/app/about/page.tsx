"use client";

import { motion } from "framer-motion";
import { Star, Shield, Award, CheckCircle2, ChevronRight, Clock, HeartHandshake, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";


const values = [
  {
    icon: Shield,
    title: "Asset Protection",
    description: "We perform rigorous preventative maintenance, seasonal audits, and routine inspections to safeguard your capital and grow your property value."
  },
  {
    icon: Star,
    title: "100-Point Curation",
    description: "Every resident undergoes strict financial and criminal screening. We only place residents who meet our strict credit, income, and background criteria."
  },
  {
    icon: Award,
    title: "White-Glove Service",
    description: "Our dedicated local property manager and 24/7 emergency dispatch handle all maintenance requests quickly, minimizing tenant friction."
  }
];

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Unmatched Security",
    description: "Your property is protected with our comprehensive insurance coverage and rigorous tenant screening process."
  },
  {
    icon: TrendingUp,
    title: "Maximized ROI",
    description: "We strategically price your rental and minimize vacancy periods to ensure you get the highest possible return."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to handle maintenance emergencies and tenant inquiries."
  },
  {
    icon: HeartHandshake,
    title: "Transparent Communication",
    description: "Stay informed with real-time updates on your property's performance through our owner portal."
  }
];


export default function AboutPage() {
  return (
    <div className="flex flex-col gap-0 pb-8 font-sans bg-white -mt-32">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-40 pb-20 bg-[#0F172A] text-white">
        <div className="absolute inset-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/40 via-[#0F172A]/85 to-[#0F172A] z-10" />
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Property Management"
            fill
            className="object-cover opacity-25 select-none pointer-events-none"
            priority
          />
        </div>

        <div className="text-center z-20 max-w-4xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 block bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20 w-fit mx-auto">
              Our Philosophy
            </span>
            <h1 className="flex flex-col items-center justify-center text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight mb-8 text-center leading-[1.05]">
              <span>Protecting Assets.</span>
              <span className="text-secondary italic font-light mt-2">Optimizing Returns.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Abode was founded with a single mission: to allow real estate investors to build wealth without the daily burden of property management. We treat every home in our registry as a premier asset.
          </motion.p>
        </div>
      </section>


      {/* Core Values */}
      <section className="px-6 max-w-7xl mx-auto w-full py-24 md:py-36">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Our Commitments
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">The Abode Standard</h2>
          <p className="text-slate-600 font-normal leading-relaxed">
            We combine high-end customer service that attracts the market&apos;s most qualified tenants with institution-grade financial tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card rounded-[2.5rem] p-10 md:p-12 border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary transition-transform duration-500 group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">{val.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-normal text-sm">{val.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Inspection Details Section */}
      <section className="px-6 max-w-7xl mx-auto w-full py-24 md:py-36">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-16 overflow-hidden border border-slate-100 shadow-xl relative bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                Rigorous Audits
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">Our 100-Point Inspection</h2>
              <p className="text-slate-600 leading-relaxed font-normal mb-8 text-sm md:text-base">
                Before a property is permitted to join the Abode registry, our team performs a thorough physical evaluation. We review everything from structural integrity, utility status, water pressure, to safety compliance and noise levels.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Detailed preventive inspection",
                  "HVAC & climate control audits",
                  "Safety & smoke detector test",
                  "Appliance diagnostics & checks",
                  "Smart-lock & security system audit",
                  "Vetted local contractor dispatch"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop"
                alt="Property inspection detail"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-0" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 max-w-7xl mx-auto w-full py-24 md:py-36">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            The Abode Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">Why Choose Us</h2>
          <p className="text-slate-600 font-normal leading-relaxed">
            We deliver peace of mind and profitability through our comprehensive property management services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-10 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-primary mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm font-normal leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* CTA Section */}
      <section className="px-6 max-w-5xl mx-auto w-full text-center py-24 md:py-36">
        <div className="rounded-[3rem] p-10 md:p-16 bg-primary text-white border border-primary/20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">Ready to Protect Your Investment?</h2>
            <p className="text-slate-300 mb-10 max-w-xl font-light leading-relaxed text-[15px]">
              Submit your property address today for a comprehensive, free rental price analysis and management overview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/list-property">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get Free Analysis
                </Button>
              </Link>
            </div>
          </div>
          {/* Subtle liquid glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#C65D29_0%,_transparent_70%)] mix-blend-screen pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
