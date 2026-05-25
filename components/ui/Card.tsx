import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "monitor" | "matte" | "outline" | "editorial";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
};

const variants: Record<CardVariant, string> = {
  default: "border-ivory/10 bg-ivory/[0.045] shadow-studio",
  monitor: "border-ivory/12 bg-charcoal/86 shadow-monitor production-scanline",
  matte: "border-ivory/8 bg-graphite/42",
  outline: "border-ivory/12 bg-transparent",
  editorial: "border-champagne/18 bg-[linear-gradient(145deg,rgba(244,239,229,0.075),rgba(244,239,229,0.025))]"
};

const paddings: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8"
};

export function Card({ children, variant = "default", padding = "md", interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "surface-noise rounded-[var(--radius-panel)] border backdrop-blur-sm",
        variants[variant],
        paddings[padding],
        interactive && "transition duration-200 ease-out hover:-translate-y-1 hover:border-champagne/32 hover:bg-ivory/[0.065]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
