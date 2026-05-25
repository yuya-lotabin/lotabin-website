import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas, workExamples } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Sample Campaign Concepts",
  description:
    "Review sample lotabin campaign concepts showing offer angle, creative objective, visual direction, deliverables, and performance-aware production thinking."
};

const workPrinciples = [
  "Offer angle before visual treatment",
  "Clear first-frame reason to care",
  "Captions and overlays designed as part of the concept",
  "Paid-social-ready formats from the start",
  "Sample status kept visible until real client work is added"
];

const productionLanes = [
  { label: "Concept", value: "Commercial reason to watch" },
  { label: "Board", value: "Frame logic and pacing" },
  { label: "Cut", value: "Launch-ready master" }
];

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkGrid />
      <WorkStandards />
      <CTASection
        eyebrow="Discuss a Similar Project"
        title="Bring the offer. We will shape the campaign concept around it."
        intro="Use the work page as a direction signal, not a fake portfolio wall. Book a creative call to discuss the product, offer, audience, proof, and production path."
        primaryLabel={ctas.primary.label}
        primaryHref={ctas.primary.href}
        secondaryLabel="View Brand Plans"
        secondaryHref="/plans"
      />
    </>
  );
}

function WorkHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-end lg:gap-16">
          <div>
            <Badge tone="champagne">Sample campaign concepts</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Campaign concepts, not a fake wall of logos.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              Real portfolio work can be added as the business grows. For now, these sample concepts show how lotabin
              thinks: offer first, frame second, launch-readiness always visible.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.primary.href} size="lg">
                {ctas.primary.label}
              </Button>
              <Button href="#sample-concepts" variant="secondary" size="lg">
                Review Concepts
              </Button>
              <Button href="/plans" variant="ghost" size="lg">
                View Plans
              </Button>
            </div>
          </div>

          <Frame label="Campaign Review Board" meta="Sample / Public" ratio="auto">
            <div className="relative overflow-hidden p-5 md:p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(217,185,118,0.16),transparent_18rem),linear-gradient(145deg,rgba(244,239,229,0.055),transparent_44%)]"
              />
              <div className="relative grid gap-4">
                <div className="rounded-[var(--radius-panel)] border border-ivory/12 bg-ink/64 p-5 shadow-monitor">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StatusChip tone="concept">Sample only</StatusChip>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">No fake proof</span>
                  </div>
                  <p className="mt-8 max-w-xl text-3xl font-semibold tracking-[-0.055em] text-ivory md:text-4xl">
                    The concept should explain why the buyer should care before the edit tries to impress them.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {productionLanes.map((lane) => (
                    <div key={lane.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">
                        {lane.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-ivory-soft/78">{lane.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Frame>
        </div>
      </Container>
    </section>
  );
}

function WorkGrid() {
  return (
    <Section
      eyebrow="Concept Library"
      title="Each sample is built around the commercial reason to watch."
      intro="The goal is to show the working layer behind a video ad: objective, offer angle, visual direction, deliverables, and performance-aware framing."
      containerSize="wide"
      size="lg"
    >
      <div id="sample-concepts" className="grid scroll-mt-28 gap-6">
        {workExamples.map((work, index) => (
          <Card key={work.title} variant={index === 0 ? "editorial" : "default"} padding="lg">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="champagne">Concept {String(index + 1).padStart(2, "0")}</Badge>
                  <StatusChip tone="concept">{work.status}</StatusChip>
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-ivory md:text-5xl">{work.title}</h2>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-smoke">{work.industry}</p>
                <div className="mt-7">
                  <Button href="/contact?intent=similar-project" variant={index === 0 ? "primary" : "secondary"}>
                    Discuss a Similar Project
                  </Button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <WorkField label="Creative objective" value={work.creativeObjective} />
                <WorkField label="Offer angle" value={work.offerAngle} />
                <WorkField label="Visual direction" value={work.visualDirection} />
                <WorkField label="Performance angle" value={work.performanceAngle} />
                <div className="rounded-[var(--radius-panel)] border border-ivory/10 bg-ink/34 p-5 md:col-span-2">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Deliverables</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.deliverables.map((deliverable) => (
                      <span key={deliverable} className="rounded-full border border-ivory/10 bg-ivory/[0.045] px-3 py-2 text-sm text-smoke">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="monitor" padding="lg" className="mt-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Badge tone="ivory">Portfolio note</Badge>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-smoke">
              Sample concepts shown here demonstrate creative direction and production style. Real client work can be
              added as the portfolio grows.
            </p>
          </div>
          <Button href={ctas.primary.href}>{ctas.primary.label}</Button>
        </div>
      </Card>
    </Section>
  );
}

function WorkField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-panel)] border border-ivory/10 bg-ivory/[0.035] p-5">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">{label}</p>
      <p className="mt-4 text-sm leading-7 text-ivory-soft/76">{value}</p>
    </div>
  );
}

function WorkStandards() {
  return (
    <Section
      eyebrow="How to Read the Work"
      title="The visual direction is never separated from the buying reason."
      intro="lotabin work should feel cinematic, but the point is not decoration. It is to make the offer clear enough to launch and polished enough to represent the brand."
      tone="framed"
    >
      <div className="grid gap-5 md:grid-cols-5">
        {workPrinciples.map((principle, index) => (
          <Card key={principle} variant={index === 1 ? "editorial" : "matte"} padding="lg">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
              Rule {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-ivory">{principle}</h2>
          </Card>
        ))}
      </div>
    </Section>
  );
}
