import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Frame } from "@/components/ui/Frame";
import { Section } from "@/components/ui/Section";
import { optionalVideoAdPackScope, videoAdPackIncludes } from "@/lib/siteData";

const boardItems = ["Hook", "Script", "Board", "Cut", "Caption", "Export"];

export function VideoAdPackSection() {
  return (
    <Section
      eyebrow="Video Ad Pack Core"
      title="One focused ad angle, built all the way to delivery."
      intro="The Video Ad Pack is the core lotabin unit: not a vague task, not a content dump, and not a random folder of assets. It is one creative angle moved through direction, production, review, and delivery."
      tone="muted"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Frame label="Pack Build" meta="Core unit" ratio="auto">
          <div className="relative overflow-hidden p-5 md:p-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(217,185,118,0.16),transparent_18rem),linear-gradient(180deg,rgba(244,239,229,0.04),transparent)]"
            />
            <div className="relative grid gap-4">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[0.045] p-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="ivory">Concept board</Badge>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-smoke">1 angle</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ivory">
                  Turn the buying reason into the first frame.
                </h3>
                <p className="mt-3 text-sm leading-7 text-smoke">
                  The pack begins with the commercial reason to watch: audience, pain, proof, CTA, and visual direction.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {boardItems.map((item, index) => (
                  <div key={item} className="min-h-24 rounded-2xl border border-ivory/10 bg-ink/54 p-4">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-champagne/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-5 text-sm font-medium text-ivory">{item}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-champagne/18 bg-champagne/[0.075] p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/78">Review path</p>
                <p className="mt-3 text-sm leading-7 text-ivory-soft/78">
                  Direction review before edit finalization. Final polish review after the first draft. Fewer loose notes, cleaner handoff.
                </p>
              </div>
            </div>
          </div>
        </Frame>

        <div className="grid gap-5">
          <Card variant="default" padding="lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-ivory">What a Video Ad Pack includes</h3>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-smoke">Launch-ready core</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {videoAdPackIncludes.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-ivory/10 bg-ivory/[0.035] p-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-champagne/24 bg-champagne/10 font-mono text-[0.58rem] text-champagne">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-ivory-soft/78">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="outline" padding="lg">
            <h3 className="text-xl font-semibold tracking-[-0.035em] text-ivory">Optional depending on plan or scope</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {optionalVideoAdPackScope.map((item) => (
                <span key={item} className="rounded-full border border-ivory/10 bg-ivory/[0.045] px-3 py-2 text-sm text-smoke">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/plans" variant="secondary">
                Compare Brand Plans
              </Button>
              <Button href="/work" variant="ghost">
                See Sample Concepts
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
