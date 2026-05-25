import type { BrandPlan } from "@/lib/siteData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/utils";

type PlanDetailBlockProps = {
  plan: BrandPlan;
  index: number;
};

const detailStatus: Record<BrandPlan["slug"], "concept" | "storyboard" | "production" | "review"> = {
  sprout: "concept",
  standard: "storyboard",
  pro: "production",
  enterprise: "review"
};

export function PlanDetailBlock({ plan, index }: PlanDetailBlockProps) {
  const isSubscription = plan.billing.toLowerCase().includes("month");

  return (
    <article id={`plan-${plan.slug}`} className="scroll-mt-28">
      <Card variant={plan.featured ? "editorial" : "outline"} padding="lg" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="champagne">Plan {String(index + 1).padStart(2, "0")}</Badge>
              <StatusChip tone={detailStatus[plan.slug]}>{plan.eyebrow}</StatusChip>
            </div>
            <h3 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-ivory md:text-5xl">{plan.name}</h3>
            <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="font-display text-4xl font-semibold tracking-[-0.06em] text-ivory">{plan.price}</span>
              <span className="pb-1.5 text-sm text-smoke">{plan.billing}</span>
            </div>
            <p className="mt-5 text-pretty text-sm leading-7 text-ivory-soft/76">{plan.positioning}</p>

            <div className="mt-7 rounded-2xl border border-champagne/18 bg-champagne/[0.07] p-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/76">Why it exists</p>
              <p className="mt-3 text-sm leading-7 text-ivory-soft/78">{plan.whyItExists}</p>
            </div>

            {plan.slug === "sprout" && (
              <div className="mt-4 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">Upgrade path</p>
                <p className="mt-3 text-sm leading-6 text-ivory-soft/76">
                  The $99 Sprout fee is credited toward month one when you upgrade within 7 days of pilot delivery.
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <DetailMetric label="Turnaround" value={plan.turnaround} />
              <DetailMetric label="Reviews" value={plan.reviewStructure} />
              <DetailMetric label="Formats" value={plan.exportFormats} />
            </div>

            <Divider label="Decision context" className="py-7" />

            <div className="grid gap-6 xl:grid-cols-2">
              <DetailList title="Best for" items={plan.bestFor} />
              <DetailList title="What it includes" items={plan.includes} />
              <DetailList
                title={isSubscription ? "What you receive before subscribing" : "What you receive before production"}
                items={plan.receiveBeforeSubscription}
              />
              <DetailList title="What happens after you start" items={plan.whatHappensAfterStart} />
              <DetailList title="What your team provides" items={plan.clientProvides} />
              <DetailList title="Scope notes" items={plan.scopeNotes} />
            </div>

            <div className="mt-8 rounded-[var(--radius-panel)] border border-ivory/10 bg-ink/36 p-5 md:p-6">
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
                    {isSubscription ? "Before subscription CTA" : "Before pilot CTA"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-smoke">
                    This page has shown the scope, review structure, turnaround rules, exports, required inputs, and next
                    steps before asking you to choose {plan.name}.
                  </p>
                </div>
                <Button href={plan.cta.href} variant={plan.featured || plan.slug === "sprout" ? "primary" : "secondary"}>
                  {plan.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-champagne/72">{label}</p>
      <p className="mt-3 text-xs leading-5 text-ivory-soft/76">{value}</p>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">{title}</h4>
      <ul className={cn("mt-4 grid gap-2", items.length > 8 && "sm:grid-cols-2")} aria-label={title}>
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.035] px-4 py-3 text-sm leading-6 text-ivory-soft/76">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
