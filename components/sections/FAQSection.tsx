import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { ctas, faqs } from "@/lib/siteData";

type ExpandedFAQ = {
  category: string;
  question: string;
  answer: string;
};

const additionalFaqs: ExpandedFAQ[] = [
  {
    category: "Delivery",
    question: "Are the videos ready for paid social platforms?",
    answer:
      "Standard short-form delivery is built around paid-social use, including 9:16 delivery, 1:1 export, captions, and on-screen text overlays. Other formats can be scoped when needed."
  },
  {
    category: "Plans",
    question: "Can I cancel a monthly plan?",
    answer:
      "Cancellation and renewal terms should be confirmed before the monthly plan starts. The public site focuses on scope, deliverables, review structure, and buyer routing rather than legal contract terms."
  },
  {
    category: "Plans",
    question: "When should a brand choose Enterprise?",
    answer:
      "Enterprise is the right path when a brand has more products, more offers, a custom production cadence, priority queue needs, or higher-touch creative communication requirements."
  },
  {
    category: "General",
    question: "Do strategy calls replace a full marketing strategy engagement?",
    answer:
      "No. Creative direction calls help set video priorities, angles, and production rhythm. They do not replace media buying, full-funnel strategy, analytics ownership, or ad account management."
  },
  {
    category: "Delivery",
    question: "Can you work from existing winning ads?",
    answer:
      "Yes, depending on plan and scope. Existing winners, prior concepts, client-provided feedback, and internal notes can be used to guide refreshes or new Video Ad Packs."
  },
  {
    category: "Rights",
    question: "Can we request source files?",
    answer:
      "Source files are not assumed by default. If your team or agency workflow needs source files, that should be scoped before production starts."
  },
  {
    category: "Agencies",
    question: "Can the agency stay client-facing?",
    answer:
      "Yes. Partner workflows can be white-label, co-branded, or capacity-block based. The agency keeps the client relationship, strategy, reporting, and ad account."
  },
  {
    category: "Film Studio",
    question: "How are Film Studio revision rounds handled?",
    answer:
      "Film Studio can include up to 5 revision rounds depending on scope. The exact review path should be defined in the custom production plan before work begins."
  }
];

const expandedFaqs: ExpandedFAQ[] = [...faqs, ...additionalFaqs];

const categories = ["General", "Plans", "Delivery", "Rights", "Agencies", "Film Studio"];

const faqSignals = [
  { label: "Plan clarity", value: "Scope, reviews, turnaround, exports" },
  { label: "Buyer routing", value: "Brands, agencies, Film Studio" },
  { label: "No fake promises", value: "No guaranteed ROAS or viral claims" }
];

export function FAQSection() {
  return (
    <>
      <FAQHero />
      <Section
        eyebrow="Objection Library"
        title="The questions that should be answered before production starts."
        intro="Good creative operations do not hide the practical details. Turnaround, reviews, rights, source files, AI usage, partner boundaries, and Film Studio scope should be visible before a buyer commits."
        tone="framed"
        containerSize="wide"
      >
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <Card variant="monitor" padding="lg">
              <Badge tone="champagne">FAQ map</Badge>
              <div className="mt-6 grid gap-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#faq-${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="focus-ring rounded-2xl border border-ivory/10 bg-ivory/[0.04] px-4 py-3 text-sm text-ivory-soft/78 transition hover:border-champagne/28 hover:text-ivory"
                  >
                    {category}
                  </a>
                ))}
              </div>
              <div className="mt-7 rounded-2xl border border-champagne/18 bg-champagne/[0.07] p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-champagne/78">Need fit guidance?</p>
                <p className="mt-3 text-sm leading-6 text-ivory-soft/76">
                  Use the contact page when the answer depends on your offer, buyer type, assets, or campaign rhythm.
                </p>
                <div className="mt-5">
                  <Button href={ctas.primary.href} variant="secondary">
                    {ctas.primary.label}
                  </Button>
                </div>
              </div>
            </Card>
          </aside>

          <div className="grid gap-8">
            {categories.map((category) => {
              const items = expandedFaqs.filter((faq) => faq.category === category);

              return (
                <section key={category} id={`faq-${category.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-3xl font-semibold tracking-[-0.05em] text-ivory">{category}</h2>
                    <StatusChip tone="queued">{items.length} answers</StatusChip>
                  </div>
                  <div className="grid gap-4">
                    {items.map((faq) => (
                      <Card key={`${faq.category}-${faq.question}`} variant="matte" padding="lg">
                        <h3 className="text-xl font-semibold tracking-[-0.035em] text-ivory">{faq.question}</h3>
                        <p className="mt-3 text-sm leading-7 text-smoke">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

function FAQHero() {
  return (
    <section className="relative overflow-hidden border-b border-ivory/10 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(217,185,118,0.16),transparent_30rem),radial-gradient(circle_at_92%_20%,rgba(244,239,229,0.07),transparent_28rem)]"
      />
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:gap-16">
          <div>
            <Badge tone="champagne">FAQ</Badge>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.065em] text-ivory md:text-7xl lg:text-[5.2rem] lg:leading-[0.94]">
              Clear answers before creative enters production.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ivory-soft/78 md:text-xl md:leading-9">
              This page covers the practical details serious buyers ask about: turnaround, revisions, rights, AI usage,
              source files, subscriptions, partner work, Film Studio, and how to get started.
            </p>
          </div>

          <Card variant="monitor" padding="lg" className="frame-corners">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusChip tone="review">Review room</StatusChip>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-smoke">FAQ / Public</span>
            </div>
            <div className="mt-7 grid gap-3">
              {faqSignals.map((signal, index) => (
                <div key={signal.label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.04] p-4">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-champagne/70">
                    {String(index + 1).padStart(2, "0")} · {signal.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ivory-soft/78">{signal.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
