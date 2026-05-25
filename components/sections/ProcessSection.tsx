import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ctas } from "@/lib/siteData";

const audiencePaths = [
  {
    eyebrow: "Brands & End Businesses",
    title: "For teams selling their own offer.",
    copy: "Use lotabin when you need paid-social-ready ads for your products, services, launches, or active offers without building an in-house production machine.",
    bullets: ["Sprout pilot", "Monthly creative output", "Offer-first direction", "Launch-ready delivery"],
    ctaLabel: "View Brand Plans",
    ctaHref: "/plans"
  },
  {
    eyebrow: "Agencies & Media Buyers",
    title: "For teams that own the client relationship.",
    copy: "Keep the strategy, reporting, ad account, and relationship. lotabin plugs in behind the work to supply scripts, boards, and video production capacity.",
    bullets: ["White-label-friendly", "Partner-safe workflow", "Capacity blocks", "No ad account access required"],
    ctaLabel: ctas.agency.label,
    ctaHref: "/agencies"
  }
];

const creativeVelocity = [
  "Clear offer input before production starts",
  "Creative direction before the first edit",
  "Production waves instead of scattered requests",
  "Review checkpoints that protect speed and taste",
  "Final files prepared for paid-social use"
];

export function ProcessSection() {
  return (
    <Section
      eyebrow="Built for Creative to Move"
      title="Separate buyer paths. One disciplined production standard."
      intro="Brand plans, agency partner capacity, and Film Studio custom work each have their own route so buyers do not have to decode a mixed pricing page."
      tone="muted"
      size="lg"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {audiencePaths.map((path) => (
          <Card key={path.eyebrow} variant="editorial" padding="lg" className="flex h-full flex-col">
            <Badge tone="champagne">{path.eyebrow}</Badge>
            <h3 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.05em] text-ivory md:text-4xl">
              {path.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-ivory-soft/76">{path.copy}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label={`${path.eyebrow} fit points`}>
              {path.bullets.map((bullet) => (
                <li key={bullet} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm text-smoke">
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={path.ctaHref} variant="secondary">
                {path.ctaLabel}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="monitor" padding="lg" className="mt-6">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <Badge tone="ivory">Production rhythm</Badge>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ivory">Built for teams that need creative to move.</h3>
            <p className="mt-4 text-sm leading-7 text-smoke">
              The system is designed for momentum without making the brand look careless.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {creativeVelocity.map((item, index) => (
              <div key={item} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 text-sm leading-6 text-ivory-soft/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}
