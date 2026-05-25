import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Section } from "@/components/ui/Section";
import { deliveryWorkflow, scopeNotes } from "@/lib/siteData";

export function DeliveryWorkflowSection() {
  return (
    <Section
      eyebrow="From Offer to Launch-Ready Video"
      title="The work moves through checkpoints, not guesswork."
      intro="Video does not help if it never gets made, approved, or launched. The lotabin workflow keeps the creative process legible from brief to final files."
      tone="framed"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-start">
        <div className="relative grid gap-5">
          <div aria-hidden="true" className="absolute bottom-8 left-8 top-8 hidden w-px bg-ivory/10 md:block" />
          {deliveryWorkflow.map((step) => (
            <Card key={step.step} variant="matte" padding="lg" className="relative md:ml-16">
              <span className="absolute -left-16 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-ink font-mono text-[0.68rem] text-champagne md:flex">
                {step.step}
              </span>
              <div className="grid gap-6 md:grid-cols-[0.72fr_1fr]">
                <div>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-champagne/72">Step {step.step}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ivory">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-smoke">{step.description}</p>
                </div>
                <ul className="grid gap-2" aria-label={`${step.title} details`}>
                  {step.details.map((detail) => (
                    <li key={detail} className="rounded-2xl border border-ivory/10 bg-ivory/[0.035] px-4 py-3 text-sm text-ivory-soft/76">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28">
          <Card variant="monitor" padding="lg">
            <Badge tone="champagne">Delivery rules</Badge>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-ivory">Clarity before speed.</h3>
            <Divider label="Scope" className="py-5" />
            <ul className="grid gap-4">
              {scopeNotes.slice(0, 4).map((note) => (
                <li key={note} className="border-l border-champagne/26 pl-4 text-sm leading-7 text-smoke">
                  {note}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
