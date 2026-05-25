import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatusTone = "concept" | "storyboard" | "production" | "review" | "delivered" | "queued" | "live";

type StatusChipProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: StatusTone;
};

const tones: Record<StatusTone, string> = {
  concept: "border-champagne/26 bg-champagne/10 text-champagne",
  storyboard: "border-silver/22 bg-silver/10 text-silver",
  production: "border-caution/24 bg-caution/10 text-caution",
  review: "border-ivory/18 bg-ivory/[0.07] text-ivory-soft",
  delivered: "border-positive/24 bg-positive/10 text-positive",
  queued: "border-smoke/20 bg-smoke/10 text-smoke",
  live: "border-champagne/34 bg-champagne/15 text-ivory"
};

export function StatusChip({ children, tone = "concept", className, ...props }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em]",
        tones[tone],
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      {children}
    </span>
  );
}
