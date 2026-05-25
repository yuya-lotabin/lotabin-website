import type { Metadata } from "next";
import Link from "next/link";
import { PlanComparison } from "@/components/pricing/PlanComparison";
import { PlanDetailBlock } from "@/components/pricing/PlanDetailBlock";
import { SubscriptionDecisionPanel } from "@/components/pricing/SubscriptionDecisionPanel";
import { CTASection } from "@/components/sections/CTASection";
import { DeliveryWorkflowSection } from "@/components/sections/DeliveryWorkflowSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { VideoAdPackSection } from "@/components/sections/VideoAdPackSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  brandPlans,
  ctas,
  faqs,
  filmStudioOffer,
  lightAdjustmentCredits,
  scopeNotes
} from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Brand Plans for Short-Form Video Ads",
  description:
    "Compare lotabin Sprout, Standard, Pro, and Enterprise brand plans for offer-first, AI-assisted, human-directed short-form video ad production."
};

const planHeroSignals = [
  { label: "Core unit", value: "Video Ad Pack" },
  { label: "Built around", value: "Product, offer, audience, CTA" },
  { label: "Delivery", value: "9:16 + 1:1 paid-social-ready files" }
];

const planFaqs = faqs.filter((faq) => ["Plans", "Delivery", "Rights", "General"].includes(faq.category)).slice(0, 6);

export default function PlansPage() {
  return (
    <>
      <PlansHero />
      <PricingSection />
      <SubscriptionDecisionPanel plans={brandPlans} />
      <PlanDetailsSection />
      <PlanComparison plans={brandPlans} />
      <VideoAdPackSection />
      <DeliveryWorkflowSection />
      <ScopeAndAdjustmentsSection />
      <RouteTeasers />
      <PlansFAQPreview />
      <CTASection
        eyebrow="Start With the Right Production Path"
        title="Choose the plan after the scope is clear."
        intro="Book a creative call if you want help deciding between Sprout, Standard, Pro, Enterprise, Film Studio, or partner capacity."
        primaryLabel={ctas.primary.label}
        primaryHref={ctas.primary.href}
        secondaryLabel="Start Sprout"
        secondaryHref={ctas.sprout.href}
      />
    </>
  );
}

function PlansHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:gap-16">
          <div>
            <Badge tone="champagne">For Brands & End Businesses</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Pick the video capacity your offers actually need.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              Sprout tests one offer. Standard creates a monthly foundation. Pro builds a repeatable production system.
              Enterprise gives larger teams priority capacity and cadence control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#brand-plans" size="lg">
                Compare Brand Plans
              </Button>
              <Button href={ctas.primary.href} variant="secondary" size="lg">
                {ctas.primary.label}
              </Button>
              <Button href="/agencies" variant="ghost" size="lg">
                Agency path
              </Button>
            </div>
          </div>

          <Card variant="monitor" padding="lg" className="frame-corners">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusChip tone="live">Brand plan desk</StatusChip>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-smoke">Plans / Public</span>
            </div>
            <div className="mt-7 grid gap-3">
              {planHeroSignals.map((signal, index) => (
                <div key={signal.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">
                      {String(index + 1).padStart(2, "0")} · {signal.label}
                    </p>
                    <span className="h-px w-20 bg-ivory/10" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-lg font-medium tracking-[-0.035em] text-ivory">{signal.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-[var(--radius-panel)] border border-champagne/18 bg-champagne/[0.075] p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-champagne/76">Buyer routing note</p>
              <p className="mt-3 text-sm leading-7 text-ivory-soft/78">
                This page is only for brands buying video ads for their own offers. Agencies, media buyers, and Film
                Studio buyers have separate paths.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function PlanDetailsSection() {
  return (
    <Section
      eyebrow="Plan Detail Blocks"
      title="The full scope is visible before the next step."
      intro="Each plan expands into its operating logic: best fit, included work, before-start context, what happens after purchase, required inputs, review structure, and scope boundaries."
      tone="framed"
      containerSize="wide"
    >
      <div id="plan-details" className="grid scroll-mt-28 gap-8">
        {brandPlans.map((plan, index) => (
          <PlanDetailBlock key={plan.slug} plan={plan} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ScopeAndAdjustmentsSection() {
  return (
    <Section
      eyebrow="Scope Notes"
      title="Fast delivery works only when scope stays visible."
      intro="These rules keep production organized, protect review time, and prevent a light update from turning into a full creative restart."
      tone="muted"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card variant="monitor" padding="lg">
          <Badge tone="champagne">Shared delivery rules</Badge>
          <ul className="mt-6 grid gap-4" aria-label="Brand plan scope notes">
            {scopeNotes.map((note) => (
              <li key={note} className="border-l border-champagne/28 pl-4 text-sm leading-7 text-smoke">
                {note}
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="default" padding="lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="ivory">Light adjustment credits</Badge>
            <StatusChip tone="review">Pro and scoped plans</StatusChip>
          </div>
          <p className="mt-5 text-sm leading-7 text-ivory-soft/76">{lightAdjustmentCredits.definition}</p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Applies to</h3>
              <ul className="mt-4 grid gap-2" aria-label="Light adjustment credits apply to">
                {lightAdjustmentCredits.appliesTo.map((item) => (
                  <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm text-ivory-soft/76">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Out of scope</h3>
              <ul className="mt-4 grid gap-2" aria-label="Light adjustment credits do not apply to">
                {lightAdjustmentCredits.outOfScope.map((item) => (
                  <li key={item} className="rounded-2xl border border-ivory/10 bg-ink/34 px-4 py-3 text-sm text-smoke">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl border border-champagne/18 bg-champagne/[0.07] p-4 text-sm leading-7 text-ivory-soft/78">
                {lightAdjustmentCredits.outOfScopeNote}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function RouteTeasers() {
  return (
    <Section
      eyebrow="Separate Buyer Paths"
      title="Not every buyer belongs on a brand subscription page."
      intro="The pricing system keeps brand plans, agency capacity, and longer-form Film Studio work separate so the offer does not become confusing."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Card variant="outline" padding="lg" interactive>
          <Badge tone="muted">Agency or media buyer?</Badge>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">View partner capacity instead.</h3>
          <p className="mt-4 text-sm leading-7 text-smoke">
            If you own the client relationship, strategy, reporting, and ad account while lotabin handles video production,
            the agency path is built for white-label, co-branded, and capacity-block workflows.
          </p>
          <div className="mt-6">
            <Button href="/agencies" variant="secondary">
              {ctas.agency.label}
            </Button>
          </div>
        </Card>

        <Card variant="editorial" padding="lg" interactive>
          <Badge tone="champagne">Need longer-form video?</Badge>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">Film Studio is custom quoted.</h3>
          <p className="mt-4 text-sm leading-7 text-ivory-soft/76">
            {filmStudioOffer.whyItExists} It is the right path for explainers, education, sales-support videos, and
            branded communication that needs more room than short-form ads.
          </p>
          <div className="mt-6">
            <Button href="/film-studio">{filmStudioOffer.cta.label}</Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function PlansFAQPreview() {
  return (
    <Section
      eyebrow="FAQ Preview"
      title="The questions buyers ask before creative starts."
      intro="A few plan, delivery, and rights answers are shown here. The full FAQ page will cover the rest of the buying process."
      tone="framed"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {planFaqs.map((faq) => (
          <Card key={faq.question} variant="matte" padding="lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge tone="muted">{faq.category}</Badge>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-smoke">Plan desk</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.035em] text-ivory">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-smoke">{faq.answer}</p>
          </Card>
        ))}
      </div>

      <Card variant="outline" padding="lg" className="mt-5">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Need the full answer set?</p>
            <p className="mt-3 text-sm leading-7 text-smoke">
              The full FAQ route will include turnaround, revisions, ownership, AI usage, subscriptions, partner work,
              Film Studio, source files, Production Waves, and Light Adjustment Credits.
            </p>
          </div>
          <Link href="/faq" className="focus-ring rounded-full text-sm font-medium text-champagne transition hover:text-ivory">
            Visit the FAQ
          </Link>
        </div>
      </Card>
    </Section>
  );
}
