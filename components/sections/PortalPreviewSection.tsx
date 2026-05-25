import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Frame } from "@/components/ui/Frame";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas, portalPreview } from "@/lib/siteData";

const projectStatuses = [
  { label: "Intake", value: "Brief received", tone: "delivered" as const },
  { label: "Direction", value: "Angle review", tone: "review" as const },
  { label: "Production", value: "Wave 02 active", tone: "production" as const },
  { label: "Delivery", value: "Queued", tone: "queued" as const }
];

const timeline = [
  { step: "01", label: "Brief", detail: "Offer, audience, CTA, assets" },
  { step: "02", label: "Direction", detail: "Hooks, script, board" },
  { step: "03", label: "Draft", detail: "First cut ready for review" },
  { step: "04", label: "Polish", detail: "Final review and export" }
];

const pipelineCards = [
  { title: "Hook Set A", status: "Approved", detail: "Three first-frame options attached to the same offer angle." },
  { title: "Script Pass", status: "In review", detail: "Caption pacing and proof sequence waiting for direction review." },
  { title: "Master Cut", status: "Queued", detail: "Production starts after angle approval and asset confirmation." }
];

const revisionQueue = [
  "CTA overlay update on Cut 03",
  "Pacing trim after second proof point",
  "Caption hierarchy check for mobile readability"
];

const deliveryItems = ["9:16 master", "1:1 export", "Captioned version", "Clean delivery folder"];

const partnerView = [
  "Client-safe project naming",
  "Partner-facing Loom handoff",
  "White-label delivery folder",
  "No ad account access required"
];

export function PortalPreviewSection() {
  return (
    <>
      <PortalHero />
      <DashboardPreview />
      <OperationsRooms />
      <PartnerViewPreview />
    </>
  );
}

function PortalHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Badge tone="champagne">Portal Preview</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              A future client operations room for creative that needs to move cleanly.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              This is a marketing preview of the planned client experience: production status, creative pipeline, review
              queue, approval flow, delivery area, and partner-safe visibility. It is not a real authenticated app yet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.primary.href} size="lg">
                {ctas.primary.label}
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Start a Brief
              </Button>
            </div>
          </div>

          <Frame label="Client Operations Room" meta="Preview / Not Auth" ratio="auto">
            <div className="relative overflow-hidden p-5 md:p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(217,185,118,0.16),transparent_18rem),linear-gradient(145deg,rgba(244,239,229,0.055),transparent_44%)]"
              />
              <div className="relative grid gap-4">
                <div className="rounded-[var(--radius-panel)] border border-ivory/12 bg-ink/64 p-5 shadow-monitor">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StatusChip tone="live">Preview mode</StatusChip>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">No login built</span>
                  </div>
                  <p className="mt-8 max-w-xl text-3xl font-semibold tracking-[-0.055em] text-ivory md:text-4xl">
                    The future portal makes production visible before creative becomes chaotic.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectStatuses.map((status) => (
                    <div key={status.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                      <StatusChip tone={status.tone}>{status.label}</StatusChip>
                      <p className="mt-3 text-sm leading-6 text-ivory-soft/78">{status.value}</p>
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

function DashboardPreview() {
  return (
    <Section
      eyebrow="Dashboard Preview"
      title={portalPreview.headline}
      intro={portalPreview.description}
      tone="framed"
      containerSize="wide"
      size="lg"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portalPreview.cards.map((card, index) => (
          <Card key={card.title} variant={index === 0 ? "editorial" : "matte"} padding="lg" interactive>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
              Module {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 text-smoke">{card.detail}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function OperationsRooms() {
  return (
    <Section
      eyebrow="Production Visibility"
      title="Project status, wave timing, revisions, approvals, and delivery in one calmer system."
      intro="The preview translates the lotabin production method into an interface language: what is waiting, what is moving, what needs approval, and what has been delivered."
      tone="muted"
      containerSize="wide"
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Card variant="monitor" padding="lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="champagne">Production wave timeline</Badge>
            <StatusChip tone="production">Wave 02</StatusChip>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.step} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">{item.step}</p>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.035em] text-ivory">{item.label}</h3>
                <p className="mt-2 text-xs leading-5 text-smoke">{item.detail}</p>
              </div>
            ))}
          </div>
          <Divider label="Timeline" className="py-7" />
          <div className="timeline-tick h-8 rounded-full border border-ivory/10 bg-ivory/[0.035]" aria-hidden="true" />
        </Card>

        <Card variant="default" padding="lg">
          <Badge tone="ivory">Creative pipeline</Badge>
          <div className="mt-6 grid gap-3">
            {pipelineCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-ivory/10 bg-ink/34 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-ivory">{card.title}</h3>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-champagne/72">{card.status}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-smoke">{card.detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="outline" padding="lg">
          <Badge tone="muted">Revision queue</Badge>
          <ul className="mt-6 grid gap-3" aria-label="Revision queue preview">
            {revisionQueue.map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm leading-6 text-ivory-soft/76">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="editorial" padding="lg">
          <Badge tone="champagne">Approval and delivery area</Badge>
          <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">A clean handoff should be part of the product.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {deliveryItems.map((item) => (
              <div key={item} className="rounded-2xl border border-ivory/10 bg-ink/34 p-4 text-sm text-ivory-soft/78">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function PartnerViewPreview() {
  return (
    <Section
      eyebrow="Agency Partner View Preview"
      title="A partner-safe view for white-label and co-branded work."
      intro="Agency workflows need controlled visibility. The planned partner view is designed to support client-safe naming, review-ready handoffs, and white-label delivery without exposing unnecessary production clutter."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card variant="editorial" padding="lg">
          <Badge tone="champagne">Partner mode</Badge>
          <p className="mt-7 text-balance text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-5xl">
            The agency keeps the relationship. The production room stays organized behind it.
          </p>
          <p className="mt-6 text-sm leading-7 text-ivory-soft/76">
            The preview reinforces the same promise as the agency page: lotabin supports the video production layer while
            the agency owns strategy, reporting, account direction, and the client relationship.
          </p>
        </Card>

        <Card variant="monitor" padding="lg">
          <Badge tone="ivory">Partner-safe modules</Badge>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Agency partner view preview modules">
            {partnerView.map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm leading-6 text-ivory-soft/78">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-2xl border border-champagne/18 bg-champagne/[0.07] p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/78">Important</p>
            <p className="mt-3 text-sm leading-6 text-ivory-soft/76">
              This is a marketing preview only. Real authentication, permissions, and account-level data should be scoped
              separately if built later.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
