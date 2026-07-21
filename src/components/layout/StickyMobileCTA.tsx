"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

export function StickyMobileCTA() {
  const pathname = usePathname();

  // Don't render on the list-property page itself to prevent redundancy
  if (pathname === "/list-property") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3.5 bg-[#071321]/95 backdrop-blur-xl border-t border-white/10 z-40 md:hidden flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col text-left pl-1">
        <span className="text-white text-xs font-bold font-sans tracking-wide">
          Free Rental Analysis
        </span>
        <div className="flex items-center gap-1 text-[10px] text-slate-300 font-light mt-0.5">
          <Star className="w-3 h-3 text-[#D97745] fill-current" />
          <span>Licensed Managers</span>
        </div>
      </div>

      <Link href="/list-property" className="shrink-0">
        <Button variant="primary" size="sm" className="min-h-[44px] px-4 text-xs font-bold shadow-lg">
          Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
