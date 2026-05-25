import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ContactBriefForm } from "@/components/sections/ContactBriefForm";
import { ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Contact lotabin",
  description:
    "Start a lotabin creative brief for brand video ads, agency partner capacity, Film Studio custom production, or a project path you are still defining."
};

const intakeSteps = [
  { label: "01", title: "Tell us who you are", detail: "Brand, agency, Film Studio buyer, or not sure yet." },
  { label: "02", title: "Define the project path", detail: "Plan type, timeline, budget range, and current offer context." },
  { label: "03", title: "Share the offer", detail: "Product, service, CTA, audience, assets, and what needs to move." }
];

const responseExpectations = [
  "The form is structured as a creative intake preview and is ready for future backend integration.",
  "A qualified next step should clarify buyer type, scope, production route, and whether a creative call is useful.",
  "Do not send private platform credentials, ad account access, or sensitive customer data through this form."
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section
        eyebrow="Creative Brief Intake"
        title="Start with the offer, the buyer path, and the production need."
        intro="This page is designed to feel like the beginning of a serious creative brief, not a generic contact form."
        tone="framed"
        containerSize="wide"
      >
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <ContactContextPanel />
          <ContactBriefForm />
        </div>
      </Section>
    </>
  );
}

function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:gap-16">
          <div>
            <Badge tone="champagne">Start the creative brief</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Tell us what needs to become a video.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              Whether you are a brand, agency, media buyer, or longer-form production buyer, the first step is the same:
              clarify the offer, audience, scope, and path forward.
            </p>
          </div>

          <Card variant="monitor" padding="lg" className="frame-corners">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusChip tone="queued">Brief queue</StatusChip>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-smoke">Contact / Public</span>
            </div>
            <div className="mt-7 grid gap-3">
              {intakeSteps.map((step) => (
                <div key={step.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/28 bg-champagne/10 font-mono text-[0.62rem] text-champagne">
                      {step.label}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">{step.title}</p>
                      <p className="mt-1 text-xs leading-5 text-smoke">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function ContactContextPanel() {
  return (
    <aside className="lg:sticky lg:top-28">
      <Card variant="monitor" padding="lg">
        <Badge tone="champagne">Response expectations</Badge>
        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-ivory">The form should route the conversation, not close the deal too early.</h2>
        <p className="mt-4 text-sm leading-7 text-smoke">
          Subscription-style decisions should happen after the buyer has seen scope, review structure, turnaround rules,
          and what happens after purchase.
        </p>
        <Divider label="Notes" className="py-6" />
        <ul className="grid gap-4" aria-label="Response expectations">
          {responseExpectations.map((item) => (
            <li key={item} className="border-l border-champagne/28 pl-4 text-sm leading-7 text-smoke">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">Booking CTA</p>
          <p className="mt-3 text-sm leading-6 text-ivory-soft/76">
            Prefer to talk through the offer first? Use the creative call path and bring the product, service, offer, and any
            current assets or references.
          </p>
          <div className="mt-5">
            <Button href={ctas.primary.href} variant="secondary">
              {ctas.primary.label}
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  );
}
