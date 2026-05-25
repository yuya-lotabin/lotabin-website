import type { PartnerPlan } from "@/lib/siteData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/utils";

type PartnerPlanCardProps = {
  plan: PartnerPlan;
  index: number;
};

const partnerStatusBySlug: Record<PartnerPlan["slug"], "concept" | "storyboard" | "production" | "review"> = {
  "partner-test-sprint": "concept",
  "partner-starter-capacity": "storyboard",
  "partner-growth-capacity": "production",
  "partner-scale-capacity": "review"
};

const partnerStageBySlug: Record<PartnerPlan["slug"], string> = {
  "partner-test-sprint": "Proof of fit",
  "partner-starter-capacity": "Starter block",
  "partner-growth-capacity": "Growth block",
  "partner-scale-capacity": "Scale block"
};

export function PartnerPlanCard({ plan, index }: PartnerPlanCardProps) {
  const isFeatured = Boolean(plan.featured);

  return (
    <Card
      variant={isFeatured ? "editorial" : "default"}
      padding="lg"
      className={cn(
        "flex h-full flex-col",
        isFeatured && "relative overflow-hidden border-champagne/34 bg-champagne/[0.065] lg:-translate-y-3"
      )}
    >
      {isFeatured && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent"
        />
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-champagne/72">
            Partner {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-ivory">{plan.name}</h3>
        </div>
        <StatusChip tone={partnerStatusBySlug[plan.slug]}>{partnerStageBySlug[plan.slug]}</StatusChip>
      </div>

      <div className="mt-7">
        <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="font-display text-4xl font-semibold tracking-[-0.06em] text-ivory md:text-5xl">
            {plan.price}
          </span>
          <span className="pb-2 text-sm text-smoke">{plan.billing}</span>
        </div>
        <p className="mt-5 text-pretty text-sm leading-7 text-ivory-soft/76">{plan.positioning}</p>
      </div>

      {plan.note && (
        <div className="mt-6 rounded-2xl border border-champagne/24 bg-champagne/[0.08] p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/76">Partner note</p>
          <p className="mt-2 text-sm leading-6 text-ivory-soft/80">{plan.note}</p>
        </div>
      )}

      <div className="mt-7 grid grid-cols-2 gap-3">
        {plan.highlights.map((highlight) => (
          <div key={`${plan.slug}-${highlight.label}`} className="rounded-2xl border border-ivory/10 bg-ink/34 p-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-smoke">{highlight.label}</p>
            <p className="mt-2 text-sm font-medium text-ivory">{highlight.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Best fit</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {plan.bestFor.map((item) => (
            <Badge key={item} tone="muted" className="normal-case tracking-normal">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Partner capacity includes</p>
        <ul className="mt-4 grid gap-3" aria-label={`${plan.name} includes`}>
          {plan.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ivory-soft/78">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/80" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-7">
        <Button href={plan.cta.href} variant={isFeatured || plan.slug === "partner-test-sprint" ? "primary" : "secondary"} className="w-full">
          {plan.cta.label}
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-smoke">
          Partner capacity is scoped around workflow, communication, client ownership, and review rhythm before production begins.
        </p>
      </div>
    </Card>
  );
}
