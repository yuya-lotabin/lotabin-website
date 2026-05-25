import type { BrandPlan } from "@/lib/siteData";
import { brandPlans } from "@/lib/siteData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";

type SubscriptionDecisionPanelProps = {
  plans?: BrandPlan[];
};

const planStage: Record<BrandPlan["slug"], string> = {
  sprout: "Pilot decision",
  standard: "Monthly foundation",
  pro: "Active production",
  enterprise: "Priority capacity"
};

export function SubscriptionDecisionPanel({ plans = brandPlans }: SubscriptionDecisionPanelProps) {
  return (
    <Section
      eyebrow="Subscription Decision Panel"
      title="Know the operating model before you pick the plan."
      intro="Each path explains what you receive, who it is best for, how reviews work, what happens after you start, and what your team needs to provide."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.slug} variant={plan.featured ? "editorial" : "matte"} padding="lg" className="flex h-full flex-col">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge tone={plan.featured ? "champagne" : "muted"}>{planStage[plan.slug]}</Badge>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">{plan.name}</h3>
                <p className="mt-3 text-sm leading-7 text-smoke">{plan.positioning}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tracking-[-0.045em] text-ivory">{plan.price}</p>
                <p className="mt-1 text-xs text-smoke">{plan.billing}</p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <DecisionMetric label="Turnaround" value={plan.turnaround} />
              <DecisionMetric label="Review" value={plan.reviewStructure} />
              <DecisionMetric label="Formats" value={plan.exportFormats} />
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <DecisionList title="Best for" items={plan.bestFor.slice(0, 4)} />
              <DecisionList title="You receive before starting" items={plan.receiveBeforeSubscription.slice(0, 4)} />
              <DecisionList title="What happens after start" items={plan.whatHappensAfterStart.slice(0, 4)} />
              <DecisionList title="Your team provides" items={plan.clientProvides.slice(0, 4)} />
            </div>

            <div className="mt-auto pt-7">
              <div className="mb-4 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatusChip tone="queued">Before CTA</StatusChip>
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-smoke">Scope visible first</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ivory-soft/76">
                  Choose this plan only after reviewing the plan details, scope notes, production rhythm, review structure,
                  and required inputs on this page.
                </p>
              </div>
              <Button href={plan.cta.href} variant={plan.featured || plan.slug === "sprout" ? "primary" : "secondary"}>
                {plan.cta.label}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function DecisionMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-ink/34 p-4">
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-champagne/70">{label}</p>
      <p className="mt-3 text-xs leading-5 text-ivory-soft/78">{value}</p>
    </div>
  );
}

function DecisionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">{title}</h4>
      <ul className="mt-3 grid gap-2" aria-label={title}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-ivory-soft/76">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/70" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
