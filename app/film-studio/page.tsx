import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { FilmStudioSection } from "@/components/sections/FilmStudioSection";
import { ctas } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Film Studio Custom Longer-Form Production",
  description:
    "Custom longer-form video production for explainers, educational videos, sales-support assets, product walkthroughs, and branded communication beyond short-form ads."
};

export default function FilmStudioPage() {
  return (
    <>
      <FilmStudioSection />
      <CTASection
        eyebrow="Scope the Message Before Production Starts"
        title="Request a custom Film Studio quote for longer-form clarity."
        intro="Use this path when your message needs more room than a 15–30 second ad: explainers, education, sales-support videos, product walkthroughs, or branded communication."
        primaryLabel={ctas.filmStudio.label}
        primaryHref={ctas.filmStudio.href}
        secondaryLabel="Compare Short-Form Plans"
        secondaryHref="/plans"
      />
    </>
  );
}
