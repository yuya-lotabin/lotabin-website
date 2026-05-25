import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "FAQ for Video Ad Production",
  description:
    "Answers about lotabin turnaround, reviews, rights, AI usage, subscriptions, agency partnerships, Film Studio, source files, Video Ad Packs, and Production Waves."
};

export default function FAQPage() {
  return (
    <>
      <FAQSection />
      <CTASection
        eyebrow="Still Deciding the Route?"
        title="Use the creative call to clarify scope before production starts."
        intro="The right next step depends on buyer type, offer complexity, monthly creative load, review needs, and whether you need brand plans, partner capacity, or Film Studio."
        primaryLabel={ctas.primary.label}
        primaryHref={ctas.primary.href}
        secondaryLabel="View Plans"
        secondaryHref="/plans"
      />
    </>
  );
}
