import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aboderental.com"),
  title: "Abode Rental | Property Management in Charlotte, NC",
  description:
    "Full-service property management for Charlotte-area owners: tenant placement, rent collection, maintenance and monthly reporting.",
  openGraph: {
    title: "Abode Rental | Property Management in Charlotte, NC",
    description: "Full-service property management for Charlotte-area owners.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abode Rental Property Management" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-cream pb-20 font-sans text-ink selection:bg-sage/40 md:pb-0">
        <SmoothScroll />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
