import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// primary: olive (main action) · light: cream on dark · ghost: outline on dark · ghostInk: outline on cream
type Variant = "primary" | "light" | "ghost" | "ghostInk";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-cream hover:bg-olive-hover",
  light: "bg-cream text-ink hover:bg-white",
  ghost: "border border-white/30 text-cream hover:border-white/60 hover:bg-white/10",
  ghostInk: "border border-ink/25 text-ink hover:border-ink/50 hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[15px]",
};

// Shared so <Link> can look like a button without nesting <button> inside <a>.
export function buttonStyles({ variant = "primary", size = "md" }: { variant?: Variant; size?: Size } = {}) {
  return cn(
    "group/btn inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-md font-semibold transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-px",
    variants[variant],
    sizes[size],
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export function Button({ variant, size, isLoading = false, disabled, className, children, ...props }: ButtonProps) {
  return (
    <button disabled={disabled || isLoading} className={cn(buttonStyles({ variant, size }), "cursor-pointer", className)} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
          <span>Sending…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
