import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const humanLedStandards = [
  {
    title: "The offer sets the frame.",
    copy: "AI can help produce faster, but the starting point is still commercial judgment: who is watching, what they need to understand, and why the offer matters."
  },
  {
    title: "Taste stays in the loop.",
    copy: "The final ad should not reveal the production shortcut. Direction, copy, pacing, captions, and visual restraint are reviewed as brand decisions."
  },
  {
    title: "The system protects momentum.",
    copy: "Structured intake, boards, wave planning, and review checkpoints help teams move without turning every ad into a custom fire drill."
  }
];

const split = [
  {
    label: "AI supports",
    items: ["Draft exploration", "Production acceleration", "Variant thinking", "Workflow leverage"]
  },
  {
    label: "Humans decide",
    items: ["Offer angle", "Brand judgment", "Script logic", "Final polish"]
  }
];

export function TrustSection() {
  return (
    <Section
      eyebrow="Why AI-Assisted Video Production"
      title="AI speed is useful only when taste stays in control."
      intro="lotabin uses modern production workflows to reduce drag, not to make your brand look machine-made. The work is AI-assisted, human-directed, and judged against the offer."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card variant="monitor" padding="lg">
          <Badge tone="champagne">Operating principle</Badge>
          <p className="mt-6 text-balance text-3xl font-semibold tracking-[-0.05em] text-ivory md:text-4xl">
            Move faster without looking cheaper.
          </p>
          <p className="mt-5 text-sm leading-7 text-smoke">
            The goal is not to make more files for the sake of volume. The goal is to make useful video ads that are clear enough to launch and polished enough to represent the brand.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {split.map((column) => (
              <div key={column.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/72">{column.label}</p>
                <ul className="mt-4 grid gap-2">
                  {column.items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-ivory-soft/76">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          {humanLedStandards.map((standard, index) => (
            <Card key={standard.title} variant="outline" padding="lg">
              <div className="grid gap-4 sm:grid-cols-[5rem_1fr]">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-champagne/72">
                  Cut {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-ivory">{standard.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-smoke">{standard.copy}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
