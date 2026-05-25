import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas } from "@/lib/siteData";

const productionSignals = [
  { label: "Offer", value: "One promise, one viewer, one CTA" },
  { label: "Direction", value: "Hooks, script, board, review" },
  { label: "Delivery", value: "9:16 master + 1:1 export" }
];

const waveCards = [
  { step: "01", title: "Intake locked", detail: "Product, pain, proof, offer, CTA." },
  { step: "02", title: "Creative direction", detail: "The angle is chosen before the edit." },
  { step: "03", title: "Review checkpoint", detail: "Direction review before final polish." }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 sm:py-20 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(217,185,118,0.16),transparent_32rem),radial-gradient(circle_at_88%_18%,rgba(244,239,229,0.08),transparent_28rem)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
      />

      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
          <div>
            <Badge tone="champagne">AI-assisted · human-directed video ads</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory sm:text-6xl md:text-7xl lg:text-[5.25rem] lg:leading-[0.92]">
              Every frame your buyer sees becomes part of your brand.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              lotabin turns your product, service, or offer into clear, launch-ready short-form video ads without the drag of a bloated agency or the chaos of scattered freelancers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={ctas.primary.href} size="lg">
                {ctas.primary.label}
              </Button>
              <Button href={ctas.secondary.href} variant="secondary" size="lg">
                {ctas.secondary.label}
              </Button>
              <Button href="/agencies" variant="ghost" size="lg">
                For Agencies
              </Button>
            </div>

            <div className="mt-9 grid gap-3 border-l border-champagne/28 pl-5 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
              {productionSignals.map((signal) => (
                <div key={signal.label} className="sm:border-l sm:border-ivory/10 sm:pl-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-champagne/72">{signal.label}</p>
                  <p className="mt-2 text-sm leading-6 text-smoke">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>

          <ProductionInterface />
        </div>
      </Container>
    </section>
  );
}

function ProductionInterface() {
  return (
    <div className="relative lg:pt-6" aria-label="Preview of lotabin video ad production interface">
      <div
        aria-hidden="true"
        className="absolute -left-10 top-20 h-52 w-52 rounded-full bg-champagne/10 blur-3xl"
      />
      <Frame label="Director Monitor" meta="Wave 02 / Cut 03" ratio="auto" className="relative">
        <div className="relative overflow-hidden p-4 md:p-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(217,185,118,0.16),transparent_18rem),linear-gradient(145deg,rgba(244,239,229,0.06),transparent_45%)]"
          />
          <div className="relative grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.25rem] border border-ivory/12 bg-ink/74 p-3 shadow-monitor">
              <div className="relative min-h-[28rem] overflow-hidden rounded-[1rem] border border-ivory/10 bg-[radial-gradient(circle_at_38%_20%,rgba(244,239,229,0.18),transparent_12rem),linear-gradient(155deg,#11100d_0%,#191713_44%,#070706_100%)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <StatusChip tone="production">In Production</StatusChip>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-smoke">00:14 / 00:30</span>
                </div>

                <div className="absolute inset-x-5 top-20 h-px bg-ivory/10" aria-hidden="true" />
                <div className="absolute bottom-24 left-5 right-5 h-px bg-ivory/10" aria-hidden="true" />
                <div className="absolute bottom-5 left-5 top-20 w-px bg-ivory/10" aria-hidden="true" />
                <div className="absolute bottom-5 right-5 top-20 w-px bg-ivory/10" aria-hidden="true" />

                <div className="absolute left-8 top-24 max-w-[14rem]">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Hook option A</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-ivory md:text-3xl">
                    Make the offer obvious before the scroll.
                  </p>
                </div>

                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-ivory/12 bg-black/28 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">Caption track</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">Approved angle</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ivory-soft/80">
                    Your product is not the ad. The reason to care is the ad.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid content-between gap-4">
              <Card variant="monitor" padding="md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-champagne/72">Campaign Board</p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-ivory">Offer-to-creative map</p>
                  </div>
                  <span className="rounded-full border border-ivory/12 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-smoke">
                    Brief live
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  {waveCards.map((card) => (
                    <div key={card.step} className="rounded-2xl border border-ivory/10 bg-ivory/[0.045] p-3">
                      <div className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-champagne/26 bg-champagne/10 font-mono text-[0.62rem] text-champagne">
                          {card.step}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-ivory">{card.title}</p>
                          <p className="mt-1 text-xs leading-5 text-smoke">{card.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <MiniStatus label="Frames" value="03 hooks" />
                <MiniStatus label="Export" value="9:16 + 1:1" />
                <MiniStatus label="Review" value="Direction" />
                <MiniStatus label="Delivery" value="Ready" />
              </div>
            </div>
          </div>
        </div>
      </Frame>

      <Link
        href="/portal-preview"
        className="focus-ring group mt-4 inline-flex rounded-full text-sm text-smoke transition hover:text-ivory"
      >
        Preview the future client operations room
        <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

function MiniStatus({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.045] p-4">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-smoke">{label}</p>
      <p className="mt-2 text-sm font-medium text-ivory">{value}</p>
    </div>
  );
}
