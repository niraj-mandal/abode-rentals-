import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/ui/Parallax";

// Dark hero used by inner pages: breadcrumb, serif title, intro, actions, photo fading in from the right.
export function PageHero({
  crumb,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  crumb: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  image: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-night text-cream md:-mt-24">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Parallax className="absolute inset-0" strength={10} intro>
          <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-night/0 max-lg:via-night/80 max-lg:to-night/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night/40" />
      </div>
      <div className="site relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="hero-rise max-w-2xl">
          <nav aria-label="Breadcrumb" className="text-sm text-mist">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">{crumb}</span>
          </nav>
          <h1 className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.5rem]">{title}</h1>
          <div className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85">{intro}</div>
          {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>}
        </div>
      </div>
    </section>
  );
}

// Section heading pair used across pages.
export function SectionHeading({
  eyebrow,
  title,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow ${dark ? "text-sage" : "text-olive"}`}>{eyebrow}</p>}
      <h2 className="display mt-4 text-[2.25rem] sm:text-5xl">{title}</h2>
    </div>
  );
}
