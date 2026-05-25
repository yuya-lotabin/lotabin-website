import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { brand, ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "About lotabin",
  description:
    "Learn the philosophy behind lotabin: offer-first, AI-assisted, human-directed video ad production for brands and agencies that care how they appear."
};

const manifestoPoints = [
  {
    title: "The ad people see is the brand they remember.",
    copy: "A video ad is not filler. It is a public touchpoint that tells the buyer how seriously the brand takes its own offer."
  },
  {
    title: "Video only matters if it gets made, approved, and launched.",
    copy: "Good taste does not help if production turns into a folder of drafts, scattered notes, and unclear handoff."
  },
  {
    title: "AI speed needs human judgment.",
    copy: "Modern tools can reduce production drag, but the angle, script logic, brand restraint, and final frame still need direction."
  }
];

const comparisonRows = [
  {
    label: "Against generic AI agencies",
    value:
      "lotabin does not sell a vague promise to make unlimited content. It uses AI-assisted workflows inside a structured creative production process."
  },
  {
    label: "Against bloated full-service agencies",
    value:
      "lotabin stays focused on video ad production. No media buying retainer, no inflated strategy theater, no attempt to own every marketing function."
  },
  {
    label: "Against scattered freelancers",
    value:
      "lotabin gives the work a system: intake, direction, storyboard, production wave, review checkpoint, and paid-social-ready delivery."
  }
];

const standards = [
  "Start with the offer, not the visual trend.",
  "Define the audience and pain before the hook is written.",
  "Make captions and overlays part of the creative system.",
  "Protect brand perception even when production needs to move fast.",
  "Avoid claims, proof, or performance promises that cannot be backed up."
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ManifestoSection />
      <DifferenceSection />
      <HumanDirectedAISection />
      <FounderStyleNote />
      <CTASection
        eyebrow="Start With the Frame They Remember"
        title="If the offer matters, the ad should not look disposable."
        intro="Book a creative call to discuss how your product, service, or client offer can move through a sharper video production path."
        primaryLabel={ctas.primary.label}
        primaryHref={ctas.primary.href}
        secondaryLabel="View Sample Work"
        secondaryHref="/work"
      />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:gap-16">
          <div>
            <Badge tone="champagne">The lotabin point of view</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Every frame is a decision about how the brand is seen.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              lotabin exists for brands and partners that need video ads to move faster without looking cheaper, vaguer,
              or more generic in public.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.primary.href} size="lg">
                {ctas.primary.label}
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                See Sample Work
              </Button>
            </div>
          </div>

          <Card variant="monitor" padding="lg" className="frame-corners">
            <StatusChip tone="concept">Brand thesis</StatusChip>
            <p className="mt-8 text-balance text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-5xl">
              {brand.thesis}
            </p>
            <Divider label="Point of view" className="py-7" />
            <p className="text-sm leading-7 text-smoke">
              The production system is built around one belief: the audience does not separate the ad from the brand. The
              frame, caption, pacing, offer, and CTA all become part of the impression.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function ManifestoSection() {
  return (
    <Section
      eyebrow="Company Philosophy"
      title="Ad creative for brands that care how they appear."
      intro="The work is not trying to be louder than everyone else. It is trying to make the buying reason clearer, sharper, and more launch-ready."
      tone="framed"
      containerSize="wide"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {manifestoPoints.map((point, index) => (
          <Card key={point.title} variant={index === 0 ? "editorial" : "matte"} padding="lg">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
              Thesis {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">{point.title}</h2>
            <p className="mt-4 text-sm leading-7 text-smoke">{point.copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function DifferenceSection() {
  return (
    <Section
      eyebrow="What lotabin is not"
      title="Focused production instead of vague marketing sprawl."
      intro="The positioning is intentionally narrow: offer-first short-form video ad production, plus partner capacity and custom longer-form production when the use case calls for it."
      tone="muted"
    >
      <div className="grid gap-5">
        {comparisonRows.map((row, index) => (
          <Card key={row.label} variant="default" padding="lg">
            <div className="grid gap-5 md:grid-cols-[0.42fr_1fr] md:items-start">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
                  Contrast {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ivory">{row.label}</h2>
              </div>
              <p className="text-sm leading-7 text-ivory-soft/76">{row.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HumanDirectedAISection() {
  return (
    <Section
      eyebrow="Human-Directed AI Production"
      title="The tools can accelerate the work. They should not decide the taste."
      intro="lotabin uses modern AI-assisted workflows where they help production move, but the creative standard remains human: offer logic, brand fit, pacing, restraint, and final review."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card variant="monitor" padding="lg">
          <Badge tone="champagne">Offer-first standards</Badge>
          <ul className="mt-7 grid gap-3" aria-label="lotabin creative standards">
            {standards.map((standard, index) => (
              <li key={standard} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">
                  Standard {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-6 text-ivory-soft/78">{standard}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="editorial" padding="lg">
          <Badge tone="ivory">Operating principle</Badge>
          <p className="mt-7 text-balance text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-5xl">
            Move faster without making the brand look machine-made.
          </p>
          <p className="mt-6 text-sm leading-7 text-ivory-soft/76">
            The final asset should not feel like a shortcut. It should feel like the offer was understood, structured, and
            turned into a video with enough restraint to represent the business well.
          </p>
        </Card>
      </div>
    </Section>
  );
}

function FounderStyleNote() {
  return (
    <Section
      eyebrow="Founder-Style Note"
      title="The point is not to make more content. The point is to make the right ad easier to finish."
      intro="No invented founder lore, fake awards, or borrowed credibility. The trust signal is the system: clear intake, clear direction, structured production, and honest buyer routing."
      tone="framed"
    >
      <Card variant="outline" padding="lg">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <Badge tone="champagne">Why it exists</Badge>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">
              A focused production desk for modern campaign teams.
            </p>
          </div>
          <div className="grid gap-4 text-sm leading-7 text-smoke">
            <p>
              Brands do not need another vague creative vendor that can technically make anything. They need a sharper
              route from offer to launch-ready video.
            </p>
            <p>
              Agencies do not need another vendor trying to own the client. They need a partner-safe production layer that
              keeps the account moving.
            </p>
            <p>
              Film Studio buyers do not need short-form packages forced onto deeper messages. They need scoped longer-form
              clarity, built with the same discipline.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
