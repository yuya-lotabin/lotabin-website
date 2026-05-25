import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Frame } from "@/components/ui/Frame";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas, filmStudioOffer, scopeNotes } from "@/lib/siteData";

const filmUseCases = [
  {
    title: "Product explainers",
    description: "Clarify what the product does, why it matters, and where the viewer should go next."
  },
  {
    title: "B2B education",
    description: "Turn a complex service, process, or point of view into a video that can be sent, embedded, or reused."
  },
  {
    title: "Sales-support videos",
    description: "Give sales teams a more polished way to explain the offer before or after a call."
  },
  {
    title: "Founder-led communication",
    description: "Structure a message from a founder or operator so it feels clear, credible, and brand-safe."
  },
  {
    title: "Internal enablement",
    description: "Create sharper internal or external communication pieces when a short ad is not enough room."
  },
  {
    title: "Branded walkthroughs",
    description: "Show product, service, onboarding, or education flows with a controlled visual language."
  }
];

const customPlanSteps = [
  {
    step: "01",
    title: "Scope the message",
    description:
      "Define the audience, length, use case, number of finished videos, source assets, voiceover needs, and approval path."
  },
  {
    step: "02",
    title: "Build the creative spine",
    description:
      "Translate the message into a structured script, concept board, storyboard direction, and production notes before editing starts."
  },
  {
    step: "03",
    title: "Produce the film system",
    description:
      "Create the video assets, voiceover flow, visual pacing, caption or overlay system, and review-ready draft package."
  },
  {
    step: "04",
    title: "Review, polish, deliver",
    description:
      "Move through the scoped revision rounds, final polish, export preparation, and delivery package for the intended channels."
  }
];

const shortFormDifferences = [
  {
    label: "Short-form Video Ad Packs",
    value: "15–30 second paid-social assets built around one focused ad angle, hooks, script, board, cut, captions, and fast review checkpoints."
  },
  {
    label: "Film Studio",
    value: "Custom longer-form production for explainers, education, sales support, internal communication, and branded pieces up to 1:30 depending on scope."
  },
  {
    label: "Decision rule",
    value: "Use Video Ad Packs when the goal is paid-social creative supply. Use Film Studio when the message needs more space, structure, and explanation."
  }
];

export function FilmStudioSection() {
  return (
    <>
      <FilmStudioHero />
      <FilmBestFitSection />
      <FilmIncludesAndUseCases />
      <CustomProductionPlan />
      <FilmDifferenceSection />
    </>
  );
}

function FilmStudioHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-16">
          <div>
            <Badge tone="champagne">Film Studio · Custom Quote</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Longer-form video for messages that need more room than an ad.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              Film Studio is the custom production path for explainers, education, sales-support videos, and branded
              communication that needs structure, pacing, and clarity beyond a 15–30 second paid-social spot.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={filmStudioOffer.cta.href} size="lg">
                {filmStudioOffer.cta.label}
              </Button>
              <Button href="#film-includes" variant="secondary" size="lg">
                View Scope
              </Button>
              <Button href="/plans" variant="ghost" size="lg">
                Short-form plans
              </Button>
            </div>
          </div>

          <Frame label="Long-Form Review Monitor" meta="1:30 max scope" ratio="auto">
            <div className="relative overflow-hidden p-5 md:p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(217,185,118,0.16),transparent_18rem),linear-gradient(145deg,rgba(244,239,229,0.055),transparent_44%)]"
              />
              <div className="relative grid gap-4">
                <div className="rounded-[var(--radius-panel)] border border-ivory/12 bg-ink/64 p-4 shadow-monitor">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StatusChip tone="concept">Custom production plan</StatusChip>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">Film Studio</span>
                  </div>
                  <div className="mt-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                    <div className="aspect-[4/5] rounded-2xl border border-ivory/10 bg-[linear-gradient(155deg,#171511_0%,#242018_42%,#080806_100%)] p-4">
                      <div className="h-full rounded-xl border border-ivory/10 bg-[radial-gradient(circle_at_35%_24%,rgba(244,239,229,0.18),transparent_10rem)]" />
                    </div>
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Script spine</p>
                      <p className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-ivory">
                        Explain the offer without flattening the brand.
                      </p>
                      <p className="mt-4 text-sm leading-7 text-smoke">
                        Longer-form work needs a message architecture: setup, context, proof, demonstration, and a clear
                        next action.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MiniFrame label="Scope" value="Up to 4 videos" />
                  <MiniFrame label="Length" value="Up to 1:30" />
                  <MiniFrame label="Reviews" value="Up to 5 rounds" />
                </div>
              </div>
            </div>
          </Frame>
        </div>
      </Container>
    </section>
  );
}

function MiniFrame({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">{label}</p>
      <p className="mt-3 text-sm font-medium text-ivory">{value}</p>
    </div>
  );
}

function FilmBestFitSection() {
  return (
    <Section
      eyebrow="Best Fit"
      title="For businesses with a message that needs structure before it needs spectacle."
      intro={filmStudioOffer.whyItExists}
      tone="framed"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {filmStudioOffer.bestFor.map((item, index) => (
          <Card key={item} variant={index === 1 ? "editorial" : "matte"} padding="lg" interactive>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
              Fit {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-ivory">{item}</h3>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function FilmIncludesAndUseCases() {
  return (
    <Section
      eyebrow="What Film Studio Includes"
      title="A custom quote path for finished videos, not a disguised subscription package."
      intro="The scope is defined around the message, use case, number of finished videos, length, review needs, and delivery requirements."
      tone="muted"
      containerSize="wide"
      size="lg"
    >
      <div id="film-includes" className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card variant="monitor" padding="lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="champagne">{filmStudioOffer.price}</Badge>
            <StatusChip tone="review">Custom scope</StatusChip>
          </div>
          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-ivory">{filmStudioOffer.positioning}</h3>
          <ul className="mt-7 grid gap-3" aria-label="Film Studio included scope">
            {filmStudioOffer.includes.map((item) => (
              <li key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm leading-6 text-ivory-soft/78">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          {filmUseCases.map((useCase, index) => (
            <Card key={useCase.title} variant="default" padding="lg" interactive>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">
                Use case {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">{useCase.title}</h3>
              <p className="mt-4 text-sm leading-7 text-smoke">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CustomProductionPlan() {
  return (
    <Section
      eyebrow="Custom Production Plan"
      title="Longer-form work needs a stronger spine before production starts."
      intro="The Film Studio workflow creates a defined production plan so the video can explain, educate, or support sales without becoming a wandering edit."
    >
      <div className="relative grid gap-5">
        <div aria-hidden="true" className="absolute bottom-8 left-8 top-8 hidden w-px bg-ivory/10 md:block" />
        {customPlanSteps.map((step) => (
          <Card key={step.step} variant="matte" padding="lg" className="relative md:ml-16">
            <span className="absolute -left-16 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-ink font-mono text-[0.68rem] text-champagne md:flex">
              {step.step}
            </span>
            <div className="grid gap-5 md:grid-cols-[0.32fr_1fr] md:items-start">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-champagne/72">Scene {step.step}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-ivory">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-smoke">{step.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function FilmDifferenceSection() {
  return (
    <Section
      eyebrow="Difference From Short-Form Video Ad Packs"
      title="Choose the route based on how much room the message needs."
      intro="Film Studio is intentionally separate from the short-form brand subscriptions. It exists for deeper explanation, not monthly ad capacity."
      tone="framed"
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Card variant="editorial" padding="lg">
          <Badge tone="champagne">Route decision</Badge>
          <div className="mt-7 grid gap-4">
            {shortFormDifferences.map((item) => (
              <div key={item.label} className="rounded-2xl border border-ivory/10 bg-ink/34 p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-ivory-soft/78">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="monitor" padding="lg">
          <Badge tone="ivory">Scope discipline</Badge>
          <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">Custom does not mean vague.</p>
          <Divider label="Delivery" className="py-6" />
          <ul className="grid gap-4" aria-label="Film Studio scope notes">
            {scopeNotes.slice(0, 4).map((note) => (
              <li key={note} className="border-l border-champagne/28 pl-4 text-sm leading-7 text-smoke">
                {note}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <Button href={ctas.filmStudio.href}>{ctas.filmStudio.label}</Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}
