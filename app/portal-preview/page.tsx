import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { PortalPreviewSection } from "@/components/sections/PortalPreviewSection";
import { ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Portal Preview for Client Operations",
  description:
    "Preview a future lotabin client operations room for production wave tracking, creative pipeline visibility, revision queues, approvals, delivery, and agency partner views."
};

export default function PortalPreviewPage() {
  return (
    <>
      <PortalPreviewSection />
      <CTASection
        eyebrow="Preview the Workflow Before It Becomes Software"
        title="A cleaner production experience starts with a clearer creative system."
        intro="Book a creative call to discuss how your brand, agency, or custom production workflow could move through lotabin."
        primaryLabel={ctas.primary.label}
        primaryHref={ctas.primary.href}
        secondaryLabel="Start a Brief"
        secondaryHref="/contact"
      />
    </>
  );
}
