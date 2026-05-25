import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { services, type Service } from "@/lib/siteData";

const statusToneByStatus: Record<Service["status"], "concept" | "storyboard" | "production" | "review" | "delivered"> = {
  Concept: "concept",
  Storyboard: "storyboard",
  "In Production": "production",
  Review: "review",
  Delivered: "delivered"
};

const routes = [
  { label: "Brand plans", href: "/plans", detail: "Sprout, Standard, Pro, and Enterprise." },
  { label: "Agency capacity", href: "/agencies", detail: "White-label and partner-safe production." },
  { label: "Film Studio", href: "/film-studio", detail: "Longer-form custom production." }
];

export function ServicesSection() {
  const [leadService, ...remainingServices] = services;

  return (
    <Section
      eyebrow="The Production Desk"
      title="What we make is simple. How it moves is the difference."
      intro="lotabin focuses on the work around the ad: the offer logic, the creative direction, the board, the production wave, the review path, and the final delivery."
      size="lg"
    >
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <Card variant="monitor" padding="lg" className="min-h-[32rem]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="champagne">What We Make</Badge>
            <StatusChip tone={statusToneByStatus[leadService.status]}>{leadService.status}</StatusChip>
          </div>
          <div className="mt-10 max-w-2xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-smoke">{leadService.kicker}</p>
            <h3 className="mt-4 text-balance font-display text-4xl font-semibold tracking-[-0.055em] text-ivory md:text-5xl">
              {leadService.title}
            </h3>
            <p className="mt-5 text-pretty text-base leading-8 text-ivory-soft/76">{leadService.description}</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="focus-ring group rounded-2xl border border-ivory/10 bg-ivory/[0.045] p-4 transition hover:border-champagne/28 hover:bg-ivory/[0.07]"
              >
                <span className="text-sm font-medium text-ivory transition group-hover:text-champagne">{route.label}</span>
                <span className="mt-2 block text-xs leading-5 text-smoke">{route.detail}</span>
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {remainingServices.map((service) => (
            <Card key={service.title} variant="matte" padding="lg" interactive>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">{service.kicker}</p>
                <StatusChip tone={statusToneByStatus[service.status]}>{service.status}</StatusChip>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-smoke">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
