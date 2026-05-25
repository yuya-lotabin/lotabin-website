import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { brand } from "@/lib/siteData";

const beliefs = [
  {
    title: "Perception is built in public.",
    copy: "The ad people see is often the first proof they have of your taste, clarity, and seriousness."
  },
  {
    title: "Speed is not an excuse to look careless.",
    copy: "Fast creative only helps when the offer is clear, the frame is intentional, and the final asset is ready to launch."
  },
  {
    title: "A video should move through a system.",
    copy: "Intake, direction, production, review, and delivery should feel organized enough that creative can keep moving."
  }
];

export function PhilosophySection() {
  return (
    <Section
      eyebrow="Ads Are Representation"
      title="Your ad is not just content. It is the public face of your brand."
      intro="lotabin is built for teams that need video ads to carry the offer clearly without making the brand feel disposable."
      tone="framed"
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <Card variant="editorial" padding="lg" className="min-h-[22rem]">
          <Badge tone="ivory">Brand thesis</Badge>
          <p className="mt-8 max-w-2xl text-balance font-display text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-5xl">
            {brand.emotionalMessage}
          </p>
          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-ivory-soft/74">
            If the first impression feels cheap, confusing, or generic, the buyer remembers that. The work starts before editing: with the offer, the audience, the pain, and the reason to act.
          </p>
        </Card>

        <div className="grid gap-5">
          {beliefs.map((belief, index) => (
            <Card key={belief.title} variant="matte" padding="lg">
              <div className="grid gap-5 sm:grid-cols-[4.5rem_1fr] sm:items-start">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-champagne/72">
                  Scene {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-ivory">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-smoke">{belief.copy}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
