"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  ArrowRight, 
  Shield, 
  Star, 
  TrendingUp, 
  FileText,
  UserCheck,
  Wrench,
  MessageSquare,
  Home as HomeIcon,
  Play,
  BarChart2,
  User,
  Clock,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


// High-Performance Animated Counter updating DOM directly to avoid re-renders
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    
    const match = value.match(/([0-9.]+)/);
    if (!match) {
      ref.current.textContent = value;
      return;
    }
    
    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? 1 : 0;
    const currentRef = ref.current;
    
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (!currentRef) return;
        
        let formatted = "";
        if (value.startsWith("$")) {
          formatted = `$${latest.toFixed(0)}${value.replace(/[^M+]/g, "")}`;
        } else if (value.startsWith("0") && value.length === 2) {
          formatted = `0${latest.toFixed(0)}`;
        } else if (value.endsWith("+")) {
          formatted = `${latest.toFixed(0)}+`;
        } else if (value.endsWith("%")) {
          formatted = `${latest.toFixed(0)}%`;
        } else if (value.includes("/5")) {
          formatted = `${latest.toFixed(decimals)}/5`;
        } else {
          formatted = latest.toFixed(decimals);
        }
        
        currentRef.textContent = formatted;
      }
    });
    
    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>0</span>;
}

// 3D Tilt Card for "Why Choose Us" section
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 25, stiffness: 180 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glow Glass Card for "Our Services"
function GlowGlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Liquid glass light sweep animation */}
      <motion.div
        className="absolute top-0 bottom-0 w-[150%] -skew-x-12 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
        }}
        animate={{
          left: ["-150%", "200%"]
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 5,
          duration: 2.5,
          ease: "easeInOut"
        }}
      />

      {/* Background glow follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(140px circle at ${x}px ${y}px, rgba(217, 119, 69, 0.25), transparent 80%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

// Carousel Container for Services & Markets
function InteractiveCarousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const offset = direction === "left" ? -350 : 350;
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        } ${className}`}
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
      
      {/* Navigation Arrows */}
      <div className="flex justify-end gap-2 mt-8">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all duration-300 bg-white/5 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
        >
          <span className="text-sm">❮</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all duration-300 bg-white/5 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
        >
          <span className="text-sm">❯</span>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const marketsSectionRef = useRef<HTMLDivElement>(null);

  // Hero Image Scroll Parallax
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);

  // Process timeline Scroll Progress
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start center", "end center"]
  });
  const processScaleX = useSpring(processScroll, { stiffness: 100, damping: 30 });

  // Markets Section Scroll Parallax (GSAP-like scroll translation)
  const { scrollYProgress: marketsScroll } = useScroll({
    target: marketsSectionRef,
    offset: ["start end", "end start"]
  });
  const marketsX = useTransform(marketsScroll, [0, 1], ["5%", "-15%"]);
  const marketsImgY = useTransform(marketsScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div className="flex flex-col gap-0 pb-8 font-sans bg-white overflow-hidden -mt-32">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-8 bg-[#071321] text-white overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <motion.div style={{ y: heroBgY, scale: 1.1 }} className="relative w-full h-full">
            <Image
              src="/hero-house.png"
              alt="Luxury Architecture"
              fill
              unoptimized
              className="object-cover object-top opacity-95 select-none pointer-events-none"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321] via-[#071321]/60 to-[#071321]/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-transparent z-10" />
        </div>

        <div className="z-20 max-w-7xl w-full mx-auto flex-1 flex flex-col justify-center items-start text-left py-12">
          {/* Badge Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 border border-white/20 bg-slate-950/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 self-start"
          >
            <Star className="w-3.5 h-3.5 text-[#D97745] fill-none stroke-[2.5]" />
            <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase font-sans">
              Full-Service Property Management
            </span>
          </motion.div>

          {/* Headline line by line Reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-normal tracking-tight leading-[1.05] text-white mb-8 font-serif max-w-4xl text-left">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="block"
              >
                Expert Property
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="block"
              >
                <span className="text-[#D97745]">Management.</span>
              </motion.span>
            </span>
          </h1>

          {/* Description Fade Up */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="text-[#C5CCD6] text-[15px] md:text-[17px] mb-10 max-w-[42rem] font-light leading-relaxed text-left"
          >
            We handle everything—from tenant screening and rent collection to maintenance—so you can enjoy passive income without the stress.
          </motion.p>
          
          {/* CTA Buttons Scale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="flex flex-col items-start w-full gap-8 mt-4"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto">
              <Link href="/list-property" className="w-full sm:w-auto block">
                <motion.button 
                  whileHover={{ scale: 1.05, translateY: -2 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="w-full sm:w-auto rounded-lg font-sans font-semibold text-lg px-10 py-4 flex items-center justify-center gap-3 bg-[#D97745] hover:bg-[#e88856] text-white transition-all cursor-pointer shadow-xl shadow-[#D97745]/30 hover:shadow-[#D97745]/50 border border-[#D97745]"
                >
                  Get Free Rental Analysis <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                </motion.button>
              </Link>
              
              <Link href="/#services" className="w-full sm:w-auto block">
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }} 
                  whileTap={{ scale: 0.98 }} 
                  className="w-full sm:w-auto rounded-lg font-sans font-medium text-lg px-8 py-4 flex items-center justify-center gap-3 bg-transparent text-white transition-all cursor-pointer border border-white/30 hover:border-white/60"
                >
                  Explore Services
                </motion.button>
              </Link>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 text-[13px] text-[#C5CCD6] font-light"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#D97745]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D97745]" />
                <span>Licensed Property Managers</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D97745]" />
                <span>Response within 24 Hours</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D97745]" />
                <span>No Upfront Fees</span>
              </div>
            </motion.div>
          </motion.div>
        </div>


        {/* Scroll to Discover */}
        <div className="flex flex-col items-center gap-3 text-center w-full z-20 mt-6 mb-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#C5CCD6] uppercase font-sans">
            Scroll to Discover
          </span>
          <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors cursor-pointer">
            <span className="text-[10px] font-bold">↓</span>
          </div>
        </div>
      </section>

      {/* Why Property Owners Choose Us Section */}
      <section className="px-6 max-w-7xl mx-auto w-full py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-16">
          <div className="max-w-xl text-left">
            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              Why Property Owners Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight font-serif">
              More than management.<br />It&apos;s peace of mind.
            </h2>
          </div>
          <p className="text-slate-500 max-w-lg font-light leading-relaxed text-sm md:text-base lg:mt-8 text-left">
            We combine industry expertise, advanced technology, and exceptional service to protect your investment and maximize your returns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Hands-Off Ownership",
              desc: "We handle the day-to-day so you can enjoy true passive income.",
              img: "1600210492486-724fe5c67fb0",
              icon: UserCheck
            },
            {
              title: "Better Tenants",
              desc: "Rigorous screening ensures reliable tenants and lower turnover.",
              img: "1564013799919-ab600027ffc6",
              icon: Shield
            },
            {
              title: "Transparent Reporting",
              desc: "Real-time insights and monthly reports keep you in control.",
              img: "1556911220-e15b29be8c8f",
              icon: FileText
            },
            {
              title: "Local Market Expertise",
              desc: "Data-driven pricing and strategy to maximize your rental income.",
              img: "1600607687920-4e2a09cf159d",
              icon: TrendingUp
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-5 hover:shadow-2xl transition-all duration-500 group cursor-pointer sweep-effect hover:-translate-y-[10px]">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white shrink-0 self-start transition-colors duration-300 group-hover:bg-secondary">
                  <item.icon className="w-5 h-5 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
                  <Image 
                    src={`https://images.unsplash.com/photo-${item.img}?q=80&w=600&auto=format&fit=crop`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] group-hover:scale-108"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-tight">{item.title}</h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Services Section */}
      <section className="relative overflow-hidden bg-slate-50 text-primary py-16 px-6" id="services">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <div className="text-left">
              <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary max-w-2xl leading-tight">
                Full-service property management, <span className="text-secondary font-light italic">simplified.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 shrink-0">
            </div>
          </div>

          <InteractiveCarousel className="py-12 px-4 -mx-4">
            {[
              {
                title: "Tenant Placement",
                desc: "We market your property, screen tenants, and handle leases from start to finish.",
                icon: UserCheck
              },
              {
                title: "Rent Collection",
                desc: "Timely rent collection, online payments, and owner disbursements.",
                icon: TrendingUp
              },
              {
                title: "Maintenance",
                desc: "24/7 maintenance coordination with trusted vendors.",
                icon: Wrench
              },
              {
                title: "Financial Reporting",
                desc: "Detailed monthly reports so you always know your numbers.",
                icon: FileText
              },
              {
                title: "Legal Compliance",
                desc: "Stay compliant with fair housing laws and lease regulations.",
                icon: Shield
              }
            ].map((service, idx) => (
              <GlowGlassCard
                key={idx}
                className="snap-start min-w-[280px] md:min-w-[320px] flex-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-primary mb-3 text-left">{service.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed text-left">{service.desc}</p>
              </GlowGlassCard>
            ))}
          </InteractiveCarousel>
        </div>
      </section>

      {/* Our Process Section */}
      <section ref={processRef} className="px-6 max-w-7xl mx-auto w-full pt-8 pb-12 text-center">
        <div className="mb-16">
          <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary font-serif">
            A seamless experience from start to finish.
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline progress line that fills on scroll */}
          <div className="absolute top-[2.25rem] left-[12%] right-[12%] h-[2px] bg-slate-200 hidden md:block -z-10 overflow-hidden">
            <motion.div
              style={{ scaleX: processScaleX, originX: 0 }}
              className="h-full bg-secondary w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Consultation",
                desc: "We learn about your goals and evaluate your property.",
                icon: MessageSquare
              },
              {
                num: "02",
                title: "Onboarding",
                desc: "We handle the paperwork and setup everything.",
                icon: FileText
              },
              {
                num: "03",
                title: "Tenant Placement",
                desc: "We market your property and place qualified tenants.",
                icon: UserCheck
              },
              {
                num: "04",
                title: "Ongoing Management",
                desc: "We manage everything while you enjoy the returns.",
                icon: HomeIcon
              }
            ].map((step, idx) => {
              return (
                <div key={idx} className="flex flex-col items-center group relative">
                  {/* Timeline Circle Node highlighting with zero state on viewport enter */}
                  <motion.div
                    initial={{ scale: 1, backgroundColor: "#0F172A", borderColor: "#e2e8f0" }}
                    whileInView={{
                      scale: 1.15,
                      backgroundColor: "#D97745",
                      borderColor: "#ffffff",
                      boxShadow: "0 0 20px rgba(217, 119, 69, 0.6)",
                    }}
                    viewport={{ once: false, margin: "-20% 0px -40% 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md border-4 mb-6 z-10 cursor-pointer"
                  >
                    {/* Render active icon based on step status */}
                    <step.icon className="w-6 h-6 stroke-[2.5]" />
                  </motion.div>
                  
                  {/* Step Content */}
                  <span className="text-secondary font-bold text-base mb-1 block">
                    <AnimatedCounter value={step.num} />
                  </span>
                  <h4 className="text-lg font-bold text-[#0F172A] mb-3 leading-tight transition-colors duration-300 group-hover:text-secondary">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Markets Section */}
      <section ref={marketsSectionRef} className="px-6 max-w-7xl mx-auto w-full py-12" id="markets">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
          <div className="text-left">
            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              Our Markets
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary font-serif max-w-xl">
              Proudly serving Charlotte and surrounding areas.
            </h2>
          </div>
        </div>

        {/* GSAP-like horizontal scroll container */}
        <div className="overflow-hidden py-4 w-full">
          <motion.div 
            style={{ x: marketsX }} 
            className="flex gap-6 w-max px-6"
          >
            {[
              { name: "Charlotte", img: "1568605114967-8130f3a36994" },
              { name: "Concord", img: "1600585154340-be6161a56a0c" },
              { name: "Huntersville", img: "1600607687920-4e2a09cf159d" },
              { name: "Matthews", img: "1602941525421-8f8b81d3edbb" },
              { name: "Gastonia", img: "1512917774080-9991f1c4c750" }
            ].map((market, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] w-[260px] md:w-[300px] rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl cursor-pointer"
              >
                {/* Background image moves slightly slower than foreground */}
                <motion.div 
                  style={{ y: marketsImgY, scale: 1.25 }} 
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={`https://images.unsplash.com/photo-${market.img}?q=80&w=600&auto=format&fit=crop`}
                    alt={market.name}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                </motion.div>
                
                {/* Premium Glass Hover Overlay */}
                <div className="absolute inset-0 bg-[#071321]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                
                <div className="absolute bottom-6 left-6 right-6 z-30">
                  <h3 className="text-lg font-bold text-white mb-2 text-left group-hover:-translate-y-2 transition-transform duration-300">
                    {market.name}
                  </h3>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5 hover:text-white transition-all duration-300"
                  >
                    View Market <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="px-6 max-w-[1400px] mx-auto w-full pt-12 pb-8">
        <div className="relative bg-[#C65D29] text-white rounded-2xl px-12 md:px-16 py-12 overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#C65D29]/40">
          
          {/* Subtle background gradient/pattern overlay for the right side */}
          <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16 relative z-10">
            {/* Headline */}
            <h2 className="text-3xl md:text-[34px] font-heading text-white leading-[1.2] font-serif shrink-0 m-0">
              Stop managing properties.<br />
              Start growing your portfolio.
            </h2>
            
            {/* Subheadline */}
            <p className="text-white/90 font-sans text-[15px] leading-relaxed m-0 text-center md:text-left">
              Let us handle the day-to-day so you can<br className="hidden md:block" />
              focus on what matters.
            </p>
          </div>

          {/* Button */}
          <div className="shrink-0 relative z-10 w-full md:w-auto flex justify-center md:justify-end mt-4 xl:mt-0">
            <Link href="/list-property">
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="border border-white/50 text-white rounded-[6px] font-normal tracking-wide text-[14px] px-8 h-[44px] bg-transparent hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Get Free Rental Analysis
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
