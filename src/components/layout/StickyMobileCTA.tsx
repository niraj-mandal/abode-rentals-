"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname === "/list-property") return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      <Link href="/list-property" className={cn(buttonStyles({ size: "lg" }), "w-full justify-between shadow-xl shadow-ink/20")}>
        Get a free rental analysis
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
