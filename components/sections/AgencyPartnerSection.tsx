import Link from "next/link";
import { PartnerPlanCard } from "@/components/pricing/PartnerPlanCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Frame } from "@/components/ui/Frame";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  agencyReasons,
  ctas,
  faqs,
  partnerModes,
  partnerPlans,
  partnerPromise,
  scopeNotes
} from "@/lib/siteData";

const partnerFits = [
  "Solo media buyers",
  "Small performance agencies",
  "Paid social specialists",
  "Agencies with active ad accounts but weak creative capacity",
  "Teams that already know what to test, but need the videos made"
];

const workflowSteps = [
  {
    step: "01",
    title: "Partner brief intake",
    detail: "The partner sends offer context, account notes, brand constraints, test priorities, and available assets."
  },
  {
    step: "02",
    title: "Partner-safe direction",
    detail: "Hooks, scripts, boards, and notes are prepared so the agency can review before anything reaches the client."
  },
  {
    step: "03",
    title: "Production wave",
    detail: "Approved concepts move through video production with review checkpoints and delivery expectations kept visible."
  },
  {
    step: "04",
    title: "White-label handoff",
    detail: "Final assets are organized for partner delivery, with clean folders, Loom handoff, and no ad account access required."
  }
];

const partnerFaqs = faqs.filter((faq) => faq.category === "Agencies" || faq.question.includes("media buying"));

export function AgencyPartnerSection() {
  return (
    <>
      <AgencyHero />
      <PartnerPromiseSection />
      <PartnerModesSection />
      <PartnerPlansSection />
      <AgencyReasonsSection />
      <WhiteLabelWorkflowSection />
      <PartnerScopeSection />
      <PartnerFAQPreview />
      <PartnerFinalCTA />
    </>
  );
}

function AgencyHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_16%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Badge tone="champagne">For Agencies & Media Buyers</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Keep the client relationship. Plug in the video production desk.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              lotabin gives agencies and media buyers partner-safe video capacity for paid-social clients without hiring
              editors, building an internal creative team, or handing off the relationship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.agency.href} size="lg">
                {ctas.agency.label}
              </Button>
              <Button href="#partner-plans" variant="secondary" size="lg">
                View Partner Capacity
              </Button>
              <Button href="/plans" variant="ghost" size="lg">
                Brand plans
              </Button>
            </div>
          </div>

          <PartnerControlRoom />
        </div>
      </Container>
    </section>
  );
}

function PartnerControlRoom() {
  return (
    <Frame label="Partner Desk" meta="White-label / Wave 01" ratio="auto" className="relative">
      <div className="relative overflow-hidden p-4 md:p-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(217,185,118,0.14),transparent_18rem),linear-gradient(145deg,rgba(244,239,229,0.06),transparent_48%)]"
        />
        <div className="relative grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card variant="monitor" padding="md" className="min-h-[27rem]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusChip tone="review">Partner Review</StatusChip>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">Client hidden</span>
            </div>
            <div className="mt-8 rounded-[1.25rem] border border-ivory/10 bg-ink/48 p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
                Account creative queue
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-ivory">
                Four client accounts. One production rhythm.
              </h2>
              <p className="mt-4 text-sm leading-7 text-smoke">
                The agency stays in front. lotabin organizes scripts, boards, production status, review notes, and delivery
                assets behind the work.
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              {["Client A / hooks", "Client B / storyboard", "Client C / first draft", "Client D / final files"].map(
                (item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-3">
                    <span className="text-sm text-ivory-soft/78">{item}</span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-champagne/72">
                      Wave {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )
              )}
            </div>
          </Card>

          <div className="grid gap-4">
            <Card variant="default" padding="md">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Agency keeps</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {partnerPromise.agenciesKeep.map((item) => (
                  <Badge key={item} tone="muted" className="normal-case tracking-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
            <Card variant="editorial" padding="md">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">lotabin handles</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {partnerPromise.lotabinHandles.map((item) => (
                  <Badge key={item} tone="ivory" className="normal-case tracking-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
            <Card variant="outline" padding="md">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-smoke">Boundary</p>
              <p className="mt-3 text-sm leading-7 text-ivory-soft/76">
                No fake shared ownership story. No client poaching language. No need for end-client ad account access.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function PartnerPromiseSection() {
  return (
    <Section
      eyebrow="The Partner Promise"
      title={partnerPromise.headline}
      intro={partnerPromise.coreMessage}
      tone="framed"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card variant="monitor" padding="lg">
          <Badge tone="champagne">Agencies keep</Badge>
          <ul className="mt-7 grid gap-3" aria-label="Agencies keep these responsibilities">
            {partnerPromise.agenciesKeep.map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm text-ivory-soft/78">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="editorial" padding="lg">
          <Badge tone="ivory">lotabin handles</Badge>
          <ul className="mt-7 grid gap-3" aria-label="lotabin handles these production responsibilities">
            {partnerPromise.lotabinHandles.map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ink/34 px-4 py-3 text-sm text-ivory-soft/78">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card variant="outline" padding="lg" className="mt-5">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <Badge tone="muted">Best fit</Badge>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">
              For buyers who already own the strategy, but need the videos made.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {partnerFits.map((fit) => (
              <div key={fit} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm leading-6 text-smoke">
                {fit}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}

function PartnerModesSection() {
  return (
    <Section
      eyebrow="Available Partner Modes"
      title="Three ways to plug production into your client work."
      intro="The partner relationship can stay behind the scenes, become visible in a defined role, or reserve monthly capacity across several accounts."
      tone="muted"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {partnerModes.map((mode, index) => (
          <Card key={mode.title} variant={index === 0 ? "editorial" : "matte"} padding="lg" interactive>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-champagne/72">
              Mode {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">{mode.title}</h3>
            <p className="mt-4 text-sm leading-7 text-smoke">{mode.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function PartnerPlansSection() {
  return (
    <Section
      eyebrow="White-Label Video Capacity"
      title="Partner plans built around workflow fit, not vanity volume."
      intro="The Test Sprint proves communication and reliability. Monthly capacity blocks help agencies keep creative moving across active accounts without building an internal video department."
      containerSize="wide"
    >
      <div id="partner-plans" className="grid scroll-mt-28 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
        {partnerPlans.map((plan, index) => (
          <PartnerPlanCard key={plan.slug} plan={plan} index={index} />
        ))}
      </div>
    </Section>
  );
}

function AgencyReasonsSection() {
  return (
    <Section
      eyebrow="Why Agencies Choose This"
      title="More creative supply without losing control of the account."
      intro="The agency path is built around trust boundaries: who owns the relationship, where the work happens, what the client sees, and how production moves."
      tone="framed"
    >
      <div className="grid gap-5 md:grid-cols-5">
        {agencyReasons.map((reason, index) => (
          <Card key={reason} variant={index === 0 ? "editorial" : "outline"} padding="md" className="min-h-44">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/72">
              Reason {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-ivory">{reason}</h3>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function WhiteLabelWorkflowSection() {
  return (
    <Section
      eyebrow="White-Label Workflow"
      title="A partner-safe production path from brief to client-ready files."
      intro="The workflow is designed to protect client ownership, keep reviews organized, and make video delivery easier for agencies already managing strategy and media buying."
      tone="muted"
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="relative grid gap-5">
          <div aria-hidden="true" className="absolute bottom-8 left-8 top-8 hidden w-px bg-ivory/10 md:block" />
          {workflowSteps.map((step) => (
            <Card key={step.step} variant="matte" padding="lg" className="relative md:ml-16">
              <span className="absolute -left-16 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-ink font-mono text-[0.68rem] text-champagne md:flex">
                {step.step}
              </span>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-champagne/72">Step {step.step}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ivory">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-smoke">{step.detail}</p>
            </Card>
          ))}
        </div>

        <Card variant="monitor" padding="lg" className="lg:sticky lg:top-28">
          <Badge tone="champagne">Partner-safe handoff</Badge>
          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-ivory">Built for agencies that need fewer loose ends.</h3>
          <Divider label="Handoff" className="py-5" />
          <ul className="grid gap-3" aria-label="White-label delivery safeguards">
            {[
              "Partner-facing Loom handoffs",
              "White-label-ready delivery folders",
              "Revision workflow before client delivery",
              "No end-client ad account access required",
              "Production notes written for partner review"
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm text-ivory-soft/76">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function PartnerScopeSection() {
  return (
    <Section
      eyebrow="Scope and Delivery Notes"
      title="Production speed is useful only when the handoff stays clean."
      intro="Partner work uses the same production discipline as brand plans, but with extra care around ownership, communication, and what the client sees."
    >
      <Card variant="monitor" padding="lg">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <Badge tone="champagne">Partner delivery rules</Badge>
            <p className="mt-5 text-sm leading-7 text-smoke">
              Contact comes first for partner capacity because scope depends on accounts, offers, volume, white-label needs,
              and review ownership.
            </p>
          </div>
          <ul className="grid gap-3 md:grid-cols-2" aria-label="Partner scope and delivery notes">
            {scopeNotes.slice(0, 4).map((note) => (
              <li key={note} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4 text-sm leading-7 text-ivory-soft/76">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Section>
  );
}

function PartnerFAQPreview() {
  return (
    <Section
      eyebrow="Partner FAQ Preview"
      title="Questions agencies ask before putting production behind client work."
      intro="The full FAQ page will expand these answers, but the partner path starts with control, access, scope, and delivery expectations."
      tone="framed"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {partnerFaqs.map((faq) => (
          <Card key={faq.question} variant="matte" padding="lg">
            <Badge tone="muted">{faq.category}</Badge>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.035em] text-ivory">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-smoke">{faq.answer}</p>
          </Card>
        ))}
      </div>

      <Card variant="outline" padding="lg" className="mt-5">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-7 text-smoke">
            Need to compare direct brand plans instead? Keep partner capacity separate so buyers do not confuse production
            ownership, pricing, or relationship boundaries.
          </p>
          <Link href="/plans" className="focus-ring rounded-full text-sm font-medium text-champagne transition hover:text-ivory">
            View brand plans
          </Link>
        </div>
      </Card>
    </Section>
  );
}

function PartnerFinalCTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,185,118,0.16),transparent_30rem)]"
      />
      <Container size="wide">
        <Card variant="editorial" padding="lg" className="relative overflow-hidden">
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge tone="champagne">Discuss Partner Capacity</Badge>
              <h2 className="mt-7 max-w-4xl text-balance font-display text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-6xl">
                Bring the account context. Leave with a cleaner production path.
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-ivory-soft/76">
                Talk through active accounts, volume, white-label needs, review ownership, and the right partner capacity
                route before committing to a production block.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={ctas.agency.href} size="lg">
                  {ctas.agency.label}
                </Button>
                <Button href="/contact?partner=partner-test-sprint" variant="secondary" size="lg">
                  Start Partner Test Sprint
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {["Client ownership stays clear", "Creative production gets scheduled", "Review flow becomes partner-safe"].map(
                (item) => (
                  <div key={item} className="rounded-2xl border border-ivory/10 bg-ink/38 p-4">
                    <p className="text-sm leading-7 text-ivory-soft/78">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
