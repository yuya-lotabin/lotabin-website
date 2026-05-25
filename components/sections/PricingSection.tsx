import Link from "next/link";
import { BrandPlanCard } from "@/components/pricing/BrandPlanCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { brandPlans } from "@/lib/siteData";

const beforeStartItems = [
  "Plan-fit context before a monthly commitment",
  "A clear definition of what a Video Ad Pack includes",
  "Turnaround, review, export, and scope expectations",
  "A visible path for Sprout, monthly plans, Film Studio, or agency capacity"
];

const preSubscriptionProof = [
  {
    label: "Scope before checkout",
    detail: "No subscription-style CTA appears before the page explains deliverables, reviews, timing, and required inputs."
  },
  {
    label: "Offer-first intake",
    detail: "The buying reason, audience, pain, proof, and CTA come before visual production decisions."
  },
  {
    label: "Review-ready rhythm",
    detail: "Monthly plans are framed as production capacity with checkpoints, not vague content bundles."
  }
];

export function PricingSection() {
  return (
    <Section
      eyebrow="Brand Plans"
      title="Video ad production packages for brands and end businesses."
      intro="Sprout is the low-risk pilot. Standard, Pro, and Enterprise are monthly production paths for teams that need consistent short-form video ads without turning creative into a mess."
      size="lg"
    >
      <Card variant="monitor" padding="lg" className="mb-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <Badge tone="champagne">Before You Start</Badge>
            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.05em] text-ivory md:text-4xl">
              The plan comes after the production context, not before it.
            </h3>
            <p className="mt-4 text-sm leading-7 text-smoke">
              Brand buyers should understand what they are receiving, how the work moves, what reviews are included,
              and what they need to provide before choosing a plan.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {beforeStartItems.map((item, index) => (
              <div key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/72">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm leading-6 text-ivory-soft/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        {preSubscriptionProof.map((item) => (
          <Card key={item.label} variant="outline" padding="md">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">{item.label}</p>
            <p className="mt-3 text-sm leading-7 text-smoke">{item.detail}</p>
          </Card>
        ))}
      </div>

      <div id="brand-plans" className="grid scroll-mt-28 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
        {brandPlans.map((plan, index) => (
          <BrandPlanCard key={plan.slug} plan={plan} index={index} />
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card variant="editorial" padding="lg">
          <Badge tone="champagne">Sprout credit</Badge>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">
            Start small without making the first decision feel throwaway.
          </h3>
          <p className="mt-4 text-sm leading-7 text-ivory-soft/76">
            Sprout is a one-time pilot for one product and one offer. If the pilot proves fit, the $99 is credited toward
            month one when you upgrade within 7 days of pilot delivery.
          </p>
          <div className="mt-6">
            <Button href="#plan-sprout" variant="secondary">Review Sprout Scope</Button>
          </div>
        </Card>

        <Card variant="outline" padding="lg">
          <Badge tone="muted">Wrong pricing page?</Badge>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">
            Agency and media-buyer capacity is separate.
          </h3>
          <p className="mt-4 text-sm leading-7 text-smoke">
            If you keep the client relationship, strategy, ad account, reporting, and media buying while lotabin supports
            video production, use the partner capacity path instead.
          </p>
          <Link
            href="/agencies"
            className="focus-ring group mt-6 inline-flex rounded-full text-sm font-medium text-champagne transition hover:text-ivory"
          >
            View partner capacity
            <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Card>
      </div>
    </Section>
  );
}
