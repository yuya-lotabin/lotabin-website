import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  label?: string;
  meta?: string;
  ratio?: "auto" | "video" | "square" | "portrait";
};

const ratios = {
  auto: "",
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]"
};

export function Frame({ children, label = "Frame 1080", meta, ratio = "auto", className, ...props }: FrameProps) {
  return (
    <div className={cn("frame-corners rounded-[var(--radius-frame)] p-2", className)} {...props}>
      <div className="overflow-hidden rounded-[calc(var(--radius-frame)-0.35rem)] border border-ivory/12 bg-ink-soft shadow-monitor">
        <div className="flex items-center justify-between border-b border-ivory/10 px-4 py-3 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-smoke">
          <span>{label}</span>
          {meta && <span className="text-champagne/78">{meta}</span>}
        </div>
        <div className={cn("relative", ratios[ratio])}>{children}</div>
      </div>
    </div>
  );
}
