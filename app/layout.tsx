import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://lotabin.com"),
  title: {
    default: "lotabin — AI-Assisted Video Ad Production Desk",
    template: "%s | lotabin"
  },
  description:
    "Premium AI-assisted, human-directed short-form video ad production for brands, agencies, media buyers, and teams that need launch-ready creative.",
  applicationName: "lotabin",
  keywords: [
    "video ad production",
    "AI-assisted video production",
    "short-form video ads",
    "paid social creative",
    "creative production desk",
    "offer-first advertising"
  ],
  authors: [{ name: "lotabin" }],
  creator: "lotabin",
  publisher: "lotabin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lotabin.com",
    siteName: "lotabin",
    title: "lotabin — AI-Assisted Video Ad Production Desk",
    description:
      "Turn your offer into clear, launch-ready short-form video ads with structured creative direction, scripting, storyboarding, and modern AI-assisted production workflows."
  },
  twitter: {
    card: "summary_large_image",
    title: "lotabin — AI-Assisted Video Ad Production Desk",
    description:
      "Cinematic, offer-first short-form video ad production for modern growth teams."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#070706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="studio-shell min-h-screen bg-ink text-ivory antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
