"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  // Shared base styles across ALL buttons:
  // Same border radius (rounded-xl), same typography (font-sans font-semibold tracking-wide),
  // same spacing rhythm, same transition, same disabled & loading states.
  const baseStyles = 
    "relative overflow-hidden inline-flex items-center justify-center gap-2.5 font-sans font-semibold tracking-wide rounded-xl min-h-[48px] transition-all duration-300 ease-out cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed touch-manipulation";

  // Unified Variant Styling
  const variants = {
    primary: 
      "bg-[#D97745] hover:bg-[#e88856] text-white shadow-lg shadow-[#D97745]/25 hover:shadow-xl hover:shadow-[#D97745]/40 border border-[#D97745]",
    secondary: 
      "bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-md shadow-slate-900/20 hover:shadow-lg border border-[#0F172A]",
    ghost: 
      "bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60",
  };

  // Unified Spacing & Minimum 48px Touch Height
  const sizes = {
    sm: "px-5 py-2.5 text-xs md:text-sm min-h-[48px]",
    md: "px-7 py-3.5 text-sm md:text-base min-h-[52px]",
    lg: "px-9 py-4 text-base md:text-lg min-h-[56px]",
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.03, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      disabled={isDisabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}


