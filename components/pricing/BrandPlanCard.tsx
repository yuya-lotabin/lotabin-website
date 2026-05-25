import type { BrandPlan } from "@/lib/siteData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/utils";

type BrandPlanCardProps = {
  plan: BrandPlan;
  index: number;
};

const cardLabels: Record<BrandPlan["slug"], string> = {
  sprout: "Pilot",
  standard: "Foundation",
  pro: "Production system",
  enterprise: "Priority capacity"
};

const statusToneByPlan: Record<BrandPlan["slug"], "concept" | "storyboard" | "production" | "review"> = {
  sprout: "concept",
  standard: "storyboard",
  pro: "production",
  enterprise: "review"
};

export function BrandPlanCard({ plan, index }: BrandPlanCardProps) {
  const isFeatured = Boolean(plan.featured);
  const isSubscription = plan.billing.toLowerCase().includes("month");
  const includePreview = plan.includes.slice(0, 7);
  const beforePreview = plan.receiveBeforeSubscription.slice(0, 3);

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
            {String(index + 1).padStart(2, "0")} · {plan.eyebrow}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-ivory">{plan.name}</h3>
        </div>
        <StatusChip tone={statusToneByPlan[plan.slug]}>{cardLabels[plan.slug]}</StatusChip>
      </div>

      <div className="mt-7">
        <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="font-display text-5xl font-semibold tracking-[-0.065em] text-ivory">{plan.price}</span>
          <span className="pb-2 text-sm text-smoke">{plan.billing}</span>
        </div>
        <p className="mt-5 text-pretty text-sm leading-7 text-ivory-soft/76">{plan.positioning}</p>
      </div>

      {plan.slug === "sprout" && (
        <div className="mt-6 rounded-2xl border border-champagne/28 bg-champagne/[0.09] p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/78">Upgrade credit</p>
          <p className="mt-2 text-sm leading-6 text-ivory-soft/82">
            The $99 is credited toward month one when you upgrade within 7 days of pilot delivery.
          </p>
        </div>
      )}

      <div className="mt-7 grid grid-cols-2 gap-3">
        {plan.highlights.map((highlight) => (
          <div key={`${plan.slug}-${highlight.label}`} className="rounded-2xl border border-ivory/10 bg-ink/32 p-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-smoke">{highlight.label}</p>
            <p className="mt-2 text-sm font-medium text-ivory">{highlight.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Best fit</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {plan.bestFor.slice(0, 3).map((item) => (
            <Badge key={item} tone="muted" className="normal-case tracking-normal">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Core included</p>
        <ul className="mt-4 grid gap-3" aria-label={`${plan.name} included items preview`}>
          {includePreview.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ivory-soft/78">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/80" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">
          {isSubscription ? "Before you subscribe" : "Before production starts"}
        </p>
        <ul className="mt-3 grid gap-2" aria-label={`${plan.name} pre-start context`}>
          {beforePreview.map((item) => (
            <li key={item} className="text-xs leading-5 text-ivory-soft/74">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-2 rounded-2xl border border-ivory/10 bg-ink/30 p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">Operating rules</p>
        <p className="text-xs leading-5 text-ivory-soft/74">Turnaround: {plan.turnaround}</p>
        <p className="text-xs leading-5 text-ivory-soft/74">Reviews: {plan.reviewStructure}</p>
        <p className="text-xs leading-5 text-ivory-soft/74">Exports: {plan.exportFormats}</p>
      </div>

      <div className="mt-auto pt-7">
        <Button href={plan.cta.href} variant={isFeatured || plan.slug === "sprout" ? "primary" : "secondary"} className="w-full">
          {plan.cta.label}
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-smoke">
          Full scope, review structure, and required inputs are detailed below before you choose a plan.
        </p>
      </div>
    </Card>
  );
}
