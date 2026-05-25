import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas, workExamples } from "@/lib/siteData";

export function WorkPreview() {
  return (
    <Section
      eyebrow="Featured Work Preview"
      title="Campaign concepts, not content dumps."
      intro="Until real portfolio pieces are added, these sample concepts show the creative direction, commercial thinking, and production style lotabin is built around."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {workExamples.map((work) => (
          <Card key={work.title} variant="default" padding="lg" interactive className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusChip tone="concept">{work.status}</StatusChip>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-smoke">{work.industry}</span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-ivory">{work.title}</h3>
            <p className="mt-4 text-sm leading-7 text-smoke">{work.creativeObjective}</p>

            <div className="mt-6 grid gap-4">
              <PreviewField label="Offer angle" value={work.offerAngle} />
              <PreviewField label="Visual direction" value={work.visualDirection} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {work.deliverables.slice(0, 4).map((deliverable) => (
                <span key={deliverable} className="rounded-full border border-ivory/10 bg-ivory/[0.04] px-3 py-1.5 text-xs text-smoke">
                  {deliverable}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card variant="outline" padding="lg" className="mt-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Badge tone="muted">Portfolio note</Badge>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-smoke">
              Sample concepts shown here demonstrate creative direction and production style. Real client work can be added as the portfolio grows.
            </p>
          </div>
          <Button href={ctas.sampleWork.href} variant="secondary">
            {ctas.sampleWork.label}
          </Button>
        </div>
      </Card>
    </Section>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-ink/34 p-4">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/68">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ivory-soft/76">{value}</p>
    </div>
  );
}
