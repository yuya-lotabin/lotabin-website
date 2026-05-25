import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { DeliveryWorkflowSection } from "@/components/sections/DeliveryWorkflowSection";
import { Hero } from "@/components/sections/Hero";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { VideoAdPackSection } from "@/components/sections/VideoAdPackSection";
import { WorkPreview } from "@/components/sections/WorkPreview";

export const metadata: Metadata = {
  title: "Premium Short-Form Video Ad Production",
  description:
    "lotabin turns your offer into clear, launch-ready short-form video ads through offer-first creative direction, scripting, storyboarding, and AI-assisted production workflows."
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <ServicesSection />
      <VideoAdPackSection />
      <TrustSection />
      <WorkPreview />
      <DeliveryWorkflowSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
