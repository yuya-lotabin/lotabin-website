import type { Metadata } from "next";
import { AgencyPartnerSection } from "@/components/sections/AgencyPartnerSection";
import { CTASection } from "@/components/sections/CTASection";
import { ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Agency Partner Video Capacity",
  description:
    "White-label and co-branded short-form video ad production capacity for agencies, media buyers, paid social specialists, and performance teams."
};

export default function AgenciesPage() {
  return (
    <>
      <AgencyPartnerSection />
      <CTASection
        eyebrow="Build Creative Capacity Without Hiring It All In-House"
        title="Keep the client relationship. Add a cleaner video production lane behind the work."
        intro="Discuss partner capacity if your agency or media-buying team needs scripts, hooks, storyboards, production waves, review-ready delivery, or white-label-friendly fulfillment."
        primaryLabel={ctas.agency.label}
        primaryHref={ctas.agency.href}
        secondaryLabel="View Brand Plans"
        secondaryHref="/plans"
      />
    </>
  );
}
