import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionTone = "default" | "muted" | "framed";
type SectionSize = "sm" | "md" | "lg";

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  intro?: string;
  kicker?: string;
  children: ReactNode;
  containerSize?: "narrow" | "default" | "wide" | "full";
  tone?: SectionTone;
  size?: SectionSize;
};

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-14 md:py-[4.5rem]",
  md: "py-[4.5rem] md:py-24",
  lg: "py-[5.5rem] md:py-32"
};

const toneClasses: Record<SectionTone, string> = {
  default: "",
  muted: "bg-ivory/[0.025]",
  framed: "relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-ivory/10 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ivory/10"
};

export function Section({
  eyebrow,
  title,
  intro,
  kicker,
  children,
  className,
  containerSize = "default",
  tone = "default",
  size = "md",
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative", sizeClasses[size], toneClasses[tone], className)} {...props}>
      <Container size={containerSize}>
        {(eyebrow || title || intro || kicker) && (
          <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
            <div>
              {eyebrow && (
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-champagne/80">{eyebrow}</p>
              )}
              {kicker && <p className="mt-3 max-w-sm text-sm leading-6 text-smoke">{kicker}</p>}
            </div>
            <div>
              {title && (
                <h2 className="text-balance font-display text-3xl font-semibold tracking-[-0.04em] text-ivory md:text-5xl">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-ivory-soft/78">{intro}</p>}
            </div>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
