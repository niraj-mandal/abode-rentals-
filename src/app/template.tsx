"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// True once the app has hydrated in the browser. Only ever set in an effect, so it stays false on the server.
let hydrated = false;

// Re-mounts on every navigation. The first page load renders visible straight from the server (fast first paint,
// works without JavaScript); later client-side navigations fade the new page up into place.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hydrated && !reduce;

  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
