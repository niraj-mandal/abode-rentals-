"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Background photo that drifts slower than the page. The inner layer is oversized so edges never show.
export function Parallax({
  children,
  className = "",
  strength = 12,
  intro = false,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  /** Hero photos: settle in from a slight zoom when the page loads. */
  intro?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={reduce ? { top: 0, bottom: 0 } : { y, top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        <motion.div
          className="absolute inset-0"
          initial={intro && !reduce ? { scale: 1.1 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Photo that unveils with an upward wipe and settles from a slight zoom as it enters the viewport.
export function RevealImage({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  // The observed box stays unclipped: browsers measure a clipped target as zero area, so it would never "enter" view.
  return (
    <motion.div className={className} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: 1.1, delay, ease }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
          transition={{ duration: 1.6, delay, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
