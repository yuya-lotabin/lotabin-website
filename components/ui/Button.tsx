import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-champagne/60 bg-champagne text-ink shadow-[0_18px_45px_rgba(217,185,118,0.18)] hover:bg-ivory hover:border-ivory",
  secondary:
    "border-ivory/16 bg-ivory/[0.06] text-ivory hover:bg-ivory/[0.1] hover:border-ivory/28",
  ghost:
    "border-transparent bg-transparent text-ivory/76 hover:text-ivory hover:bg-ivory/[0.06] hover:border-ivory/10",
  quiet: "border-transparent bg-transparent text-smoke hover:text-ivory hover:bg-transparent"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm md:h-[3.25rem] md:px-7"
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
  target,
  rel,
  type = "button",
  disabled
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center rounded-full border font-medium tracking-[0.02em] transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-45",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
