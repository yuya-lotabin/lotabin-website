import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "champagne" | "ivory" | "graphite" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  champagne: "border-champagne/30 bg-champagne/10 text-champagne",
  ivory: "border-ivory/18 bg-ivory/[0.07] text-ivory",
  graphite: "border-ivory/10 bg-graphite/70 text-ivory-soft",
  muted: "border-ivory/10 bg-transparent text-smoke"
};

export function Badge({ children, tone = "champagne", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.26em]",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
