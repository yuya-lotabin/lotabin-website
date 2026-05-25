import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ctas } from "@/lib/siteData";

const handoff = [
  { label: "Bring", value: "The offer, audience, assets, and constraints." },
  { label: "Receive", value: "Direction, script logic, board, production, review, and launch-ready files." },
  { label: "Protect", value: "Brand perception while creative moves faster." }
];

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  eyebrow = "Start With the Frame They Remember",
  title = "Bring the offer. Leave with a clearer ad production path.",
  intro = "Book a creative call to talk through the offer, scope, buyer path, and the right production route for your team.",
  primaryLabel = ctas.primary.label,
  primaryHref = ctas.primary.href,
  secondaryLabel = ctas.secondary.label,
  secondaryHref = ctas.secondary.href
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(217,185,118,0.16),transparent_30rem)]"
      />
      <Container size="wide">
        <Card variant="editorial" padding="lg" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent,rgba(217,185,118,0.1))]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <Badge tone="champagne">{eyebrow}</Badge>
              <h2 className="mt-7 max-w-4xl text-balance font-display text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-6xl">
                {title}
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-ivory-soft/76">{intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={primaryHref} size="lg">
                  {primaryLabel}
                </Button>
                <Button href={secondaryHref} variant="secondary" size="lg">
                  {secondaryLabel}
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {handoff.map((item) => (
                <div key={item.label} className="rounded-2xl border border-ivory/10 bg-ink/38 p-4">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-champagne/72">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-ivory-soft/78">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
