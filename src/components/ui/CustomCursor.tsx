"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#D97745] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-[#D97745]/60 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "rgba(217, 119, 69, 0.12)" : "rgba(217, 119, 69, 0)",
          borderColor: hovered ? "#D97745" : "rgba(217, 119, 69, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}

