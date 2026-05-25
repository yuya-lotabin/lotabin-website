import { cn } from "@/lib/utils";

type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className }: DividerProps) {
  return (
    <div className={cn("relative flex items-center gap-4 py-6", className)} aria-hidden={!label}>
      <div className="h-px flex-1 bg-ivory/10" />
      <div className="timeline-tick h-3 w-28 opacity-55" />
      {label && <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-smoke">{label}</span>}
      <div className="h-px flex-1 bg-ivory/10" />
    </div>
  );
}
