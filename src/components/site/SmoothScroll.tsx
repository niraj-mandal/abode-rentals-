"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

// Inertial smooth scrolling site-wide. Lenis turns itself off for prefers-reduced-motion.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // allowNestedScroll: wheel over a scrollable child (textarea, mobile menu) scrolls that child, not the page
    lenis = new Lenis({ lerp: 0.09, autoRaf: true, anchors: { offset: -88 }, stopInertiaOnNavigate: true, allowNestedScroll: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page starts at the top (unless it was opened at a #section).
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
