import type { BrandPlan } from "@/lib/siteData";
import { brandPlans } from "@/lib/siteData";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type PlanComparisonProps = {
  plans?: BrandPlan[];
};

type ComparisonRow = {
  label: string;
  values: Record<BrandPlan["slug"], string>;
};

const comparisonRows: ComparisonRow[] = [
  {
    label: "Public price",
    values: {
      sprout: "$99 one-time",
      standard: "$997 / month",
      pro: "$1,997 / month",
      enterprise: "From $2,497 / month"
    }
  },
  {
    label: "Best use",
    values: {
      sprout: "One-off proof of offer-to-video fit",
      standard: "Predictable monthly video foundation",
      pro: "High-output recurring production system",
      enterprise: "Priority capacity for larger offer sets"
    }
  },
  {
    label: "Products / offers",
    values: {
      sprout: "1 product / 1 offer",
      standard: "Up to 2 products / 2 offers",
      pro: "Up to 3 products / 3 offers",
      enterprise: "Up to 5 products / 5 offers"
    }
  },
  {
    label: "Video Ad Packs",
    values: {
      sprout: "1 pack",
      standard: "6 / month",
      pro: "12 / month",
      enterprise: "15 / month"
    }
  },
  {
    label: "Video length",
    values: {
      sprout: "Up to 15 seconds",
      standard: "Up to 30 seconds",
      pro: "Up to 30 seconds",
      enterprise: "Up to 30 seconds"
    }
  },
  {
    label: "Production rhythm",
    values: {
      sprout: "Single pilot flow",
      standard: "Planned production waves",
      pro: "2 planned waves of up to 6 videos",
      enterprise: "Custom production cadence"
    }
  },
  {
    label: "Review structure",
    values: {
      sprout: "1 direction review + 1 final polish review",
      standard: "Review checkpoints inside each wave",
      pro: "Direction + final polish review in each wave",
      enterprise: "Scheduled checkpoints + structured Loom updates"
    }
  },
  {
    label: "Turnaround",
    values: {
      sprout: "7 days after brief and required assets",
      standard: "Planned monthly wave delivery",
      pro: "Priority turnaround",
      enterprise: "Priority queue + custom cadence"
    }
  },
  {
    label: "Light adjustment credits",
    values: {
      sprout: "Not included",
      standard: "Scoped as needed",
      pro: "6 / month",
      enterprise: "Scoped to cadence"
    }
  },
  {
    label: "Voiceover",
    values: {
      sprout: "Optional depending on scope",
      standard: "Optional depending on scope",
      pro: "Included",
      enterprise: "Included"
    }
  },
  {
    label: "Exports",
    values: {
      sprout: "9:16 + 1:1",
      standard: "9:16 + 1:1",
      pro: "9:16 + 1:1",
      enterprise: "9:16 + 1:1; other exports can be scoped"
    }
  }
];

export function PlanComparison({ plans = brandPlans }: PlanComparisonProps) {
  return (
    <Section
      eyebrow="Plan Comparison"
      title="Choose by creative load, not by vague features."
      intro="The right plan depends on how many offers need to move, how frequently creative needs to refresh, and how much production capacity your team needs each month."
      tone="muted"
    >
      <Card variant="monitor" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse text-left">
            <caption className="sr-only">Comparison of Sprout, Standard, Pro, and Enterprise brand plans</caption>
            <thead>
              <tr className="border-b border-ivory/10 bg-ivory/[0.035]">
                <th scope="col" className="w-[18rem] px-5 py-5 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-smoke">
                  Decision point
                </th>
                {plans.map((plan) => (
                  <th key={plan.slug} scope="col" className="px-5 py-5 align-top">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold tracking-[-0.035em] text-ivory">{plan.name}</span>
                      {plan.featured && (
                        <span className="rounded-full border border-champagne/28 bg-champagne/10 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-champagne">
                          Most active
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-smoke">{plan.eyebrow}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIndex) => (
                <tr key={row.label} className={cn("border-b border-ivory/10", rowIndex % 2 === 0 && "bg-ink/20")}>
                  <th scope="row" className="px-5 py-5 align-top text-sm font-medium text-ivory">
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td key={`${row.label}-${plan.slug}`} className="px-5 py-5 align-top text-sm leading-6 text-ivory-soft/76">
                      {row.values[plan.slug]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
}
