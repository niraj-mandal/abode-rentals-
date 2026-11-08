import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-paper hover:bg-ink",
  secondary: "bg-ink text-paper hover:bg-brand",
  ghost: "border border-ink/40 bg-transparent hover:bg-ink hover:text-paper hover:border-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5",
  md: "h-12 px-6",
  lg: "h-14 px-5 sm:px-8",
};

// Shared so <Link> can look like a button without nesting <button> inside <a>.
export function buttonStyles({ variant = "primary", size = "md" }: { variant?: Variant; size?: Size } = {}) {
  return cn(
    "inline-flex select-none whitespace-nowrap items-center justify-center gap-2.5 rounded-none text-[12px] font-bold uppercase tracking-[0.12em] sm:text-[13px] sm:tracking-[0.14em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40",
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
