"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const baseStyles = "relative overflow-hidden font-medium rounded-full inline-flex items-center justify-center transition-all duration-300 font-sans cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(15,23,42,0.12)] hover:bg-slate-800 hover:shadow-[0_6px_20px_rgba(15,23,42,0.2)]",
    secondary: "bg-secondary text-primary-foreground shadow-[0_4px_12px_rgba(217,119,69,0.2)] hover:bg-[#B85323] hover:shadow-[0_6px_20px_rgba(217,119,69,0.35)]",
    glass: "glass-card text-foreground hover:bg-light-bg border-white/10",
    outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase",
    md: "px-6 py-3 text-sm tracking-widest uppercase",
    lg: "px-8 py-4 text-sm tracking-widest uppercase font-semibold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

