export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export type CTA = {
  label: string;
  href: string;
  description?: string;
};

export type PlanHighlight = {
  label: string;
  value: string;
};

export type BrandPlan = {
  slug: "sprout" | "standard" | "pro" | "enterprise";
  name: string;
  eyebrow: string;
  price: string;
  billing: string;
  positioning: string;
  bestFor: string[];
  includes: string[];
  highlights: PlanHighlight[];
  turnaround: string;
  reviewStructure: string;
  exportFormats: string;
  receiveBeforeSubscription: string[];
  whatHappensAfterStart: string[];
  clientProvides: string[];
  scopeNotes: string[];
  whyItExists: string;
  cta: CTA;
  featured?: boolean;
};

export type PartnerPlan = {
  slug: "partner-test-sprint" | "partner-starter-capacity" | "partner-growth-capacity" | "partner-scale-capacity";
  name: string;
  eyebrow: string;
  price: string;
  billing: string;
  positioning: string;
  bestFor: string[];
  includes: string[];
  highlights: PlanHighlight[];
  cta: CTA;
  note?: string;
  featured?: boolean;
};

export type Service = {
  title: string;
  kicker: string;
  description: string;
  status: "Concept" | "Storyboard" | "In Production" | "Review" | "Delivered";
};

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
  details: string[];
};

export type WorkExample = {
  title: string;
  industry: string;
  status: "Sample campaign concept";
  creativeObjective: string;
  offerAngle: string;
  visualDirection: string;
  deliverables: string[];
  performanceAngle: string;
};

export type FAQItem = {
  category: "General" | "Plans" | "Delivery" | "Agencies" | "Film Studio" | "Rights";
  question: string;
  answer: string;
};

export const brand = {
  name: "lotabin",
  logoPath: "/media/lotabin-logo.png",
  logoAlt: "lotabin logo",
  thesis: "Your ad is not just content. It is the public face of your brand.",
  emotionalMessage: "Every frame represents you.",
  operationalMessage: "You bring the offer. We turn it into video.",
  shortDescription:
    "A premium AI-assisted short-form video ad production desk for brands, agencies, media buyers, and teams that need launch-ready creative."
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", description: "Return to the lotabin production desk." },
  { label: "Plans", href: "/plans", description: "Brand and end-business video ad plans." },
  { label: "Agencies", href: "/agencies", description: "White-label and partner video capacity." },
  { label: "Work", href: "/work", description: "Sample campaign concepts and future portfolio." },
  { label: "About", href: "/about", description: "The point of view behind lotabin." },
  { label: "FAQ", href: "/faq", description: "Turnaround, reviews, rights, and scope answers." },
  { label: "Contact", href: "/contact", description: "Start a creative brief or book a call." }
];

export const footerLinks: FooterGroup[] = [
  {
    title: "Production paths",
    links: [
      { label: "Plans", href: "/plans" },
      { label: "Agencies", href: "/agencies" },
      { label: "Film Studio", href: "/film-studio" },
      { label: "Portal Preview", href: "/portal-preview" }
    ]
  },
  {
    title: "Review room",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export const ctas = {
  primary: {
    label: "Book a Creative Call",
    href: "/contact?intent=creative-call",
    description: "Talk through the offer, scope, and right production path."
  },
  secondary: {
    label: "View Plans",
    href: "/plans",
    description: "Compare Sprout, Standard, Pro, and Enterprise for brands."
  },
  sampleWork: {
    label: "See Sample Work",
    href: "/work",
    description: "Review sample campaign concepts and creative direction."
  },
  sprout: {
    label: "Start Sprout",
    href: "/contact?plan=sprout",
    description: "Begin with one low-risk Video Ad Pack."
  },
  agency: {
    label: "Discuss Partner Capacity",
    href: "/contact?buyer=agency",
    description: "Explore white-label, co-branded, or capacity-block production."
  },
  filmStudio: {
    label: "Request a Film Studio Quote",
    href: "/contact?buyer=film-studio",
    description: "Scope longer-form production for explainers, education, or sales support."
  }
} as const;

export const videoAdPackIncludes = [
  "1 core video angle or concept",
  "3 hook options",
  "1 script",
  "1 storyboard or concept board",
  "1 master cut",
  "Captions and on-screen text overlays",
  "9:16 delivery",
  "1:1 export",
  "Review checkpoints built into the production flow"
];

export const optionalVideoAdPackScope = [
  "Voiceover",
  "Refresh from an existing winning concept",
  "Extra variants",
  "16:9 export",
  "Avatar-supported delivery"
];

export const deliveryWorkflow: WorkflowStep[] = [
  {
    step: "01",
    title: "Offer-to-Creative Intake",
    description:
      "The brief starts with the commercial center of the ad: product, offer, audience, pain, proof, CTA, brand notes, references, and available assets.",
    details: [
      "Product or service",
      "Offer and CTA",
      "Target audience and pain points",
      "Brand notes and references",
      "Existing assets, if available"
    ]
  },
  {
    step: "02",
    title: "Creative Direction",
    description:
      "The offer is translated into a production-ready angle before edit work begins, so the video is built around a clear strategic point.",
    details: ["Angle selection", "Hook direction", "Script logic", "Storyboard or concept board", "Brand alignment notes"]
  },
  {
    step: "03",
    title: "Production Waves",
    description:
      "Videos are grouped into scheduled waves so reviews stay organized and delivery does not become a scattered folder drop.",
    details: ["Wave planning", "Direction review", "First draft", "Final polish review", "Delivery queue"]
  },
  {
    step: "04",
    title: "Launch-Ready Delivery",
    description:
      "Approved assets are delivered in paid-social-ready formats with captions, on-screen text, and exports aligned to scope.",
    details: ["9:16 delivery", "1:1 export", "Final naming structure", "Review-ready delivery", "Clean handoff"]
  }
];

export const services: Service[] = [
  {
    title: "Offer-to-Video Translation",
    kicker: "The Production Desk",
    description:
      "lotabin turns the commercial idea behind the offer into scripts, hooks, boards, and video assets made for paid social.",
    status: "Concept"
  },
  {
    title: "Short-Form Video Ad Packs",
    kicker: "Video Ad Pack Core",
    description:
      "Each pack gives one focused creative angle the structure it needs: hooks, script, storyboard, master cut, captions, and exports.",
    status: "Storyboard"
  },
  {
    title: "Production Waves",
    kicker: "Campaign Rhythm",
    description:
      "Monthly plans use scheduled delivery waves so creative moves through intake, direction, review, polish, and delivery without chaos.",
    status: "In Production"
  },
  {
    title: "Partner Capacity",
    kicker: "Agency Desk",
    description:
      "Agencies and media buyers keep the client relationship while lotabin supports scripts, boards, production, and white-label-friendly delivery.",
    status: "Review"
  },
  {
    title: "Film Studio",
    kicker: "Longer-Form Clarity",
    description:
      "Custom production for explainers, sales-support videos, educational assets, and branded communication that needs more room than a short ad.",
    status: "Delivered"
  }
];

export const brandPlans: BrandPlan[] = [
  {
    slug: "sprout",
    name: "Sprout",
    eyebrow: "Low-risk first frame",
    price: "$99",
    billing: "one-time",
    positioning: "The fastest way to see how one offer translates into a video ad before committing to a monthly plan.",
    bestFor: ["First-time clients", "One product / one offer test", "Businesses that want proof before committing"],
    includes: [
      "1 product / 1 offer",
      "1 Video Ad Pack",
      "3 hook options",
      "1 script",
      "1 storyboard / concept board",
      "1 master cut up to 15 seconds",
      "Captions / text overlays",
      "Brand Alignment Sheet",
      "Pro-reviewed Brand Rules",
      "Offer-to-Creative Intake",
      "Loom creative direction handoff",
      "2 review points: 1 direction review and 1 final polish review",
      "7-day turnaround after brief and required assets are received"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "1" },
      { label: "Length", value: "Up to 15s" },
      { label: "Reviews", value: "2 points" },
      { label: "Turnaround", value: "7 days" }
    ],
    turnaround: "7-day turnaround after the brief, required assets, and scope are approved.",
    reviewStructure: "1 direction review before edit finalization and 1 final polish review after first draft delivery.",
    exportFormats: "9:16 delivery with 1:1 export included.",
    receiveBeforeSubscription: [
      "Offer-to-Creative Intake",
      "Brand Alignment Sheet",
      "Pro-reviewed Brand Rules",
      "Loom creative direction handoff"
    ],
    whatHappensAfterStart: [
      "You submit the intake and required assets.",
      "lotabin confirms the scope and creative angle.",
      "The Video Ad Pack moves through direction, draft, polish, and delivery.",
      "The $99 is credited toward month one when you upgrade within 7 days of pilot delivery."
    ],
    clientProvides: ["Offer details", "Product or service information", "Brand notes", "References", "Assets, if available"],
    scopeNotes: ["One product", "One offer", "New concepts outside the approved scope require a new Video Ad Pack."],
    whyItExists:
      "Sprout gives a serious buyer a small, controlled entry point without making the first decision feel like a blind subscription.",
    cta: ctas.sprout
  },
  {
    slug: "standard",
    name: "Standard",
    eyebrow: "Monthly video foundation",
    price: "$997",
    billing: "/ month",
    positioning: "Consistent short-form video output for brands that need a reliable monthly creative foundation.",
    bestFor: [
      "Growing businesses with a small but active offer set",
      "Brands that need ongoing video production",
      "Teams that want predictable monthly delivery",
      "Businesses building the foundation of their brand image"
    ],
    includes: [
      "Up to 2 products",
      "Up to 2 offers",
      "6 Video Ad Packs / month",
      "Videos up to 30 seconds",
      "Commercial-grade premium video",
      "Brand Alignment Sheet",
      "Pro-reviewed Brand Rules",
      "Creative Direction Setup",
      "Storyboarding included",
      "Offer-to-Creative Workshop, if available as early VIP access",
      "Captions / text overlays",
      "9:16 delivery",
      "1:1 exports",
      "Delivered in planned production waves",
      "Review checkpoints built into each production wave"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "6 / month" },
      { label: "Products", value: "Up to 2" },
      { label: "Offers", value: "Up to 2" },
      { label: "Length", value: "Up to 30s" }
    ],
    turnaround: "Delivered in planned production waves after brief, assets, and scope approval.",
    reviewStructure: "Review checkpoints are built into each production wave to keep feedback organized.",
    exportFormats: "Standard delivery is 9:16 with 1:1 exports included.",
    receiveBeforeSubscription: [
      "Plan fit guidance",
      "What a Video Ad Pack includes",
      "Delivery rhythm explanation",
      "Review structure and scope notes"
    ],
    whatHappensAfterStart: [
      "Creative Direction Setup aligns the first wave.",
      "Products and offers are prioritized for the month.",
      "Production moves in planned waves with review checkpoints.",
      "Approved videos are delivered in paid-social-ready formats."
    ],
    clientProvides: ["Products and offers", "Priority order", "Assets", "Brand notes", "References and feedback"],
    scopeNotes: ["Up to 2 products", "Up to 2 offers", "Extra concepts or new offers count as additional Video Ad Packs."],
    whyItExists:
      "Standard is for brands that need consistent short-form video output without turning production into a complicated agency retainer.",
    cta: { label: "Choose Standard", href: "/contact?plan=standard" }
  },
  {
    slug: "pro",
    name: "Pro",
    eyebrow: "High-output production system",
    price: "$1,997",
    billing: "/ month",
    positioning: "A repeatable video production engine for active businesses that need creative moving every month.",
    bestFor: [
      "Businesses actively running multiple offers",
      "Teams producing frequent paid-social campaigns",
      "Brands with several products or ongoing creative refresh needs",
      "Owners who need a production system, not one-off videos"
    ],
    includes: [
      "Up to 3 products",
      "Up to 3 offers",
      "12 Video Ad Packs / month",
      "Videos up to 30 seconds",
      "Delivered in 2 planned production waves of up to 6 videos each",
      "1 direction review and 1 final polish review in each production wave",
      "6 light adjustment credits / month",
      "Refreshes from prior ads, top concepts, winning concepts, client-provided feedback, or internal notes",
      "Voiceover included",
      "Monthly Creative Direction Call",
      "Priority turnaround",
      "Brand Alignment Sheet",
      "Pro-reviewed Brand Rules",
      "Storyboarding included",
      "Offer-to-Creative Workshop",
      "Captions / text overlays",
      "9:16 delivery",
      "1:1 exports"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "12 / month" },
      { label: "Waves", value: "2 planned" },
      { label: "Adjustment credits", value: "6 / month" },
      { label: "Voiceover", value: "Included" }
    ],
    turnaround: "Priority turnaround through 2 planned production waves of up to 6 videos each.",
    reviewStructure: "Each wave includes 1 direction review and 1 final polish review.",
    exportFormats: "9:16 delivery and 1:1 exports included.",
    receiveBeforeSubscription: [
      "Plan fit and capacity expectations",
      "Production wave explanation",
      "Light adjustment credit definition",
      "Creative Direction Call structure"
    ],
    whatHappensAfterStart: [
      "A Monthly Creative Direction Call sets priorities.",
      "The month is split into two planned production waves.",
      "Refreshes and new Video Ad Packs are organized by offer priority.",
      "Light adjustment credits can be used for minor approved-video updates."
    ],
    clientProvides: ["Monthly priorities", "Offer details", "Performance feedback if available", "Assets", "Review feedback"],
    scopeNotes: [
      "Up to 3 products",
      "Up to 3 offers",
      "Major new directions count as new Video Ad Packs, not light adjustments."
    ],
    whyItExists:
      "Pro is for businesses that do not just need more videos. They need a production system that keeps creative moving.",
    cta: { label: "Choose Pro", href: "/contact?plan=pro" },
    featured: true
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    eyebrow: "Priority video capacity",
    price: "From $2,497",
    billing: "/ month",
    positioning:
      "Priority capacity for brands with more offers, more moving parts, and more frequent refresh demands.",
    bestFor: [
      "Brands with active paid-social operations",
      "Teams managing multiple products and offers",
      "Businesses that need a more customized production cadence",
      "Brands that want priority access and higher-touch communication",
      "Growing businesses looking to enhance brand identity"
    ],
    includes: [
      "Up to 5 products",
      "Up to 5 offers",
      "15 Video Ad Packs / month",
      "Videos up to 30 seconds",
      "Custom production cadence",
      "Priority queue",
      "Highest volume among standard brand plans",
      "Refreshes from client-provided feedback, prior ads, top concepts, existing winners, or internal notes",
      "Voiceover included",
      "Optional avatar-supported video scope",
      "Creative Direction Cadence",
      "Structured Loom updates",
      "Scheduled review checkpoints",
      "Brand Alignment Sheet",
      "Pro-reviewed Brand Rules",
      "Storyboarding included",
      "Offer-to-Creative Workshop",
      "Captions / text overlays",
      "9:16 delivery",
      "1:1 exports"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "15 / month" },
      { label: "Products", value: "Up to 5" },
      { label: "Cadence", value: "Custom" },
      { label: "Queue", value: "Priority" }
    ],
    turnaround: "Custom production cadence with priority queue access after scope approval.",
    reviewStructure: "Scheduled review checkpoints with structured Loom updates and a defined creative cadence.",
    exportFormats: "9:16 delivery and 1:1 exports included; other exports can be scoped.",
    receiveBeforeSubscription: [
      "Enterprise fit discussion",
      "Capacity and cadence planning",
      "Communication structure",
      "Scope and review expectations"
    ],
    whatHappensAfterStart: [
      "A custom production cadence is defined.",
      "Products, offers, and refresh needs are prioritized.",
      "Production moves through scheduled checkpoints.",
      "Delivery is organized around brand capacity and speed requirements."
    ],
    clientProvides: ["Product and offer map", "Priority cadence", "Brand rules", "Assets", "Review owners"],
    scopeNotes: ["Up to 5 products", "Up to 5 offers", "Avatar-supported scope is optional and defined before production."],
    whyItExists:
      "Enterprise is for brands that need capacity, consistency, and speed without production becoming a bottleneck.",
    cta: { label: "Discuss Enterprise", href: "/contact?plan=enterprise" }
  }
];

export const lightAdjustmentCredits = {
  definition:
    "A light adjustment credit is for a minor update to an approved video. It keeps small improvements moving without reopening the entire concept.",
  appliesTo: [
    "Hook swap",
    "CTA change",
    "Caption / overlay update",
    "Pacing trim",
    "Music swap",
    "Small visual replacement",
    "Minor variant from an approved asset",
    "Extra format version"
  ],
  outOfScope: [
    "New product",
    "New offer",
    "New concept",
    "New script",
    "New storyboard",
    "Full creative rework",
    "Substantially different direction"
  ],
  outOfScopeNote: "Out-of-scope items count as new Video Ad Packs."
};

export const partnerPromise = {
  headline: "The client relationship stays with you. The video production desk plugs in behind the work.",
  agenciesKeep: ["The client", "The strategy", "The reporting", "The ad account", "The relationship"],
  lotabinHandles: [
    "Scripts",
    "Hooks",
    "Storyboards",
    "Video production",
    "Review-ready delivery",
    "White-label-friendly fulfillment"
  ],
  coreMessage:
    "This is not another vendor dumping files in a folder. It is a video production desk agencies can plug into client work without hiring editors, building an internal creative team, or slowing their media operation down."
};

export const partnerModes = [
  {
    title: "White-Label Fulfillment",
    description:
      "lotabin produces under the agency's brand. The client sees the agency. lotabin stays behind the scenes."
  },
  {
    title: "Co-Branded Support",
    description:
      "lotabin supports accounts visibly, but within a clearly defined production role."
  },
  {
    title: "Capacity Blocks",
    description:
      "The agency reserves monthly production capacity so its team can move faster across multiple clients."
  }
];

export const partnerPlans: PartnerPlan[] = [
  {
    slug: "partner-test-sprint",
    name: "Partner Test Sprint",
    eyebrow: "Partner-first proof of fit",
    price: "$297–$500",
    billing: "one-time",
    positioning:
      "A workflow-first test built to prove communication, reliability, revision flow, and white-label readiness.",
    bestFor: ["First-time partners", "Solo buyers testing reliability", "Agencies evaluating fit before a monthly block"],
    includes: [
      "Partner onboarding form",
      "1 client-facing Video Ad Pack or 2 smaller concept directions depending on scope",
      "White-label-ready delivery folder",
      "Partner-facing Loom handoff",
      "Partner brief template",
      "Revision workflow",
      "Partner-safe communication structure",
      "Credit toward the first monthly partner capacity block"
    ],
    highlights: [
      { label: "Use", value: "Proof of fit" },
      { label: "Delivery", value: "Partner-safe" },
      { label: "Handoff", value: "Loom" },
      { label: "Credit", value: "Toward first block" }
    ],
    cta: { label: "Start Partner Test Sprint", href: "/contact?partner=partner-test-sprint" },
    note: "This is not the same as a direct-to-brand trial. It is built for workflow fit."
  },
  {
    slug: "partner-starter-capacity",
    name: "Partner Starter Capacity",
    eyebrow: "Smaller account loads",
    price: "From $850",
    billing: "/ month",
    positioning: "Monthly video support for solo media buyers and smaller agencies that need reliable production capacity.",
    bestFor: [
      "Solo operators",
      "Small account loads",
      "Teams needing a reliable white-label video source without heavy volume"
    ],
    includes: [
      "Up to 4 Video Ad Packs / month",
      "White-label or co-branded delivery",
      "Partner brief workflow",
      "Partner-facing Loom handoffs",
      "Planned production waves",
      "Review checkpoints built into delivery",
      "7-day standard turnaround after brief and required assets are received",
      "No ad account access required"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "Up to 4" },
      { label: "Mode", value: "White-label or co-branded" },
      { label: "Access", value: "No ad account needed" },
      { label: "Turnaround", value: "7-day standard" }
    ],
    cta: { label: "Discuss Starter Capacity", href: "/contact?partner=starter-capacity" }
  },
  {
    slug: "partner-growth-capacity",
    name: "Partner Growth Capacity",
    eyebrow: "Recurring creative supply",
    price: "From $1,700",
    billing: "/ month",
    positioning: "A larger monthly block for agencies managing multiple active client accounts.",
    bestFor: [
      "Agencies with several paid-social clients",
      "Buyers needing recurring fresh video supply",
      "Teams managing regular testing and refresh cycles"
    ],
    includes: [
      "Up to 10 Video Ad Packs / month",
      "White-label delivery",
      "Partner-facing Loom handoffs",
      "Refresh support from prior concepts",
      "Planned production waves",
      "Priority production over starter-level partners",
      "Clean handoff structure for faster client delivery",
      "No end-client account access required"
    ],
    highlights: [
      { label: "Video Ad Packs", value: "Up to 10" },
      { label: "Mode", value: "White-label" },
      { label: "Refresh", value: "Prior concepts" },
      { label: "Queue", value: "Priority over starter" }
    ],
    cta: { label: "Discuss Growth Capacity", href: "/contact?partner=growth-capacity" },
    featured: true
  },
  {
    slug: "partner-scale-capacity",
    name: "Partner Scale Capacity",
    eyebrow: "Dedicated capacity planning",
    price: "Custom",
    billing: "capacity block",
    positioning:
      "Dedicated or semi-dedicated production capacity for higher-volume agencies and performance teams.",
    bestFor: [
      "Agencies managing multiple active ad accounts",
      "Teams that need ongoing refresh capacity across several clients",
      "Performance operations that want a real creative production arm without hiring internally"
    ],
    includes: [
      "Custom monthly video capacity",
      "Multi-account production planning",
      "White-label fulfillment system",
      "Priority queue",
      "Structured review cadence",
      "Custom handoff workflow",
      "Refresh support",
      "Larger monthly capacity blocks",
      "Partner-safe production process"
    ],
    highlights: [
      { label: "Video capacity", value: "Custom" },
      { label: "Accounts", value: "Multi-account" },
      { label: "Queue", value: "Priority" },
      { label: "Workflow", value: "Custom handoff" }
    ],
    cta: { label: "Discuss Partner Scale", href: "/contact?partner=scale-capacity" }
  }
];

export const agencyReasons = [
  "You Stay in Control",
  "Faster Creative Supply Without Hiring",
  "Easier Client Retention",
  "Cleaner White-Label Workflow",
  "No Client Poaching"
];

export const filmStudioOffer = {
  name: "Film Studio",
  eyebrow: "Custom longer-form production",
  price: "Custom quote",
  positioning: "Longer-form production for businesses that need more than short-form ad video.",
  bestFor: [
    "B2B instructional content",
    "Product explainers",
    "Branded educational videos",
    "Sales-support videos",
    "Internal / external longer-form communication pieces"
  ],
  includes: [
    "Up to 4 finished videos, depending on scope",
    "Videos up to 1 minute 30 seconds",
    "Script development",
    "Storyboarding",
    "Offer-to-Creative Workshop",
    "Voiceover",
    "Optional avatar-supported delivery",
    "Up to 5 revision rounds depending on scope",
    "Custom production plan"
  ],
  whyItExists:
    "Some messages need more room than a 15–30 second paid-social ad. Film Studio is built for longer-form clarity, education, explanation, and deeper brand communication.",
  cta: ctas.filmStudio
};

export const scopeNotes = [
  "Turnaround begins once the brief is submitted, required assets are received, and scope is approved.",
  "Review checkpoints are built into the production flow to keep feedback organized, predictable, and fast.",
  "Standard delivery is 9:16 with 1:1 included. Other exports can be quoted or included depending on plan and scope.",
  "The communication style is designed to reduce friction: clear intake, clear direction, structured review points, clean delivery, and fewer unnecessary meetings.",
  "New products, new offers, new concepts, new scripts, new storyboards, full creative reworks, and substantially different directions count as new Video Ad Packs."
];

export const workExamples: WorkExample[] = [
  {
    title: "The First Five Seconds Decide",
    industry: "Beauty / skincare",
    status: "Sample campaign concept",
    creativeObjective: "Make a single hero product feel premium, specific, and easy to understand in a short paid-social placement.",
    offerAngle: "A daily ritual positioned around the moment the buyer notices texture, tone, and confidence in the mirror.",
    visualDirection:
      "Tight product macro frames, restrained studio lighting, sharp caption pacing, and a calm voiceover that avoids overclaiming.",
    deliverables: ["3 hooks", "1 script", "1 concept board", "1 master cut", "9:16 and 1:1 exports"],
    performanceAngle: "Lead with the visible use moment, then make the product promise clear before the viewer scrolls."
  },
  {
    title: "From Cart Doubt to Decision",
    industry: "E-commerce apparel",
    status: "Sample campaign concept",
    creativeObjective: "Turn a product page hesitation into a clean short-form ad that clarifies fit, feel, and use case.",
    offerAngle: "The buyer wants the piece to look intentional in real life, not just on the model.",
    visualDirection:
      "Editorial crops, quick outfit transitions, frame-line overlays, and text that behaves like a fitting room note.",
    deliverables: ["3 hooks", "1 script", "1 storyboard", "1 master cut", "Caption and overlay system"],
    performanceAngle: "Show the purchase reason visually, then support it with concise proof points and a direct CTA."
  },
  {
    title: "The Offer, Made Obvious",
    industry: "Consulting / service business",
    status: "Sample campaign concept",
    creativeObjective: "Make an intangible service feel concrete enough for a prospect to understand the problem and next step.",
    offerAngle: "A founder is losing momentum because the offer is clear internally but vague to the market.",
    visualDirection:
      "Monochrome founder-led frames, annotated problem statements, timeline cuts, and a restrained command-center interface motif.",
    deliverables: ["3 hooks", "1 script", "1 concept board", "1 master cut", "9:16 and 1:1 exports"],
    performanceAngle: "Frame the pain as operational drag, then present the service as the clean next action."
  }
];

export const contactSegments = [
  "I am a brand / end business",
  "I am an agency / media buyer",
  "I am interested in Film Studio",
  "I am not sure yet"
];

export const projectTypes = [
  "Sprout pilot",
  "Monthly brand plan",
  "Agency partner capacity",
  "Film Studio custom production",
  "Sample work discussion",
  "Not sure yet"
];

export const budgetRanges = ["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+", "Not sure yet"];

export const timelineOptions = ["As soon as scope is approved", "Within 2 weeks", "This month", "Next month", "Exploring options"];

export const portalPreview = {
  headline: "A future client operations room for creative that needs to move cleanly.",
  description:
    "The portal preview is a marketing view of the planned lotabin client experience: production wave tracking, review queues, approvals, delivery areas, and partner-safe handoff visibility.",
  cards: [
    { title: "Project Status", detail: "See intake, direction, production, review, and delivery at a glance." },
    { title: "Production Wave Timeline", detail: "Understand which videos are moving through each scheduled wave." },
    { title: "Creative Pipeline", detail: "Track concepts, storyboards, drafts, polish, and final assets." },
    { title: "Revision Queue", detail: "Keep feedback organized around direction reviews and final polish reviews." },
    { title: "Approval Workflow", detail: "Know what is waiting for review, approval, or delivery." },
    { title: "Agency Partner View", detail: "Preview a partner-safe view designed for white-label and co-branded work." }
  ]
};

export const faqs: FAQItem[] = [
  {
    category: "Delivery",
    question: "When does turnaround start?",
    answer:
      "Turnaround starts once the brief is submitted, required assets are received, and the scope is approved. This keeps timelines tied to usable production inputs, not guesswork."
  },
  {
    category: "Delivery",
    question: "What is a Production Wave?",
    answer:
      "A Production Wave is a scheduled group of videos delivered together for review. Each wave includes a direction review before edit finalization and a final polish review after first draft delivery."
  },
  {
    category: "Plans",
    question: "What is a Video Ad Pack?",
    answer:
      "A Video Ad Pack is the core production unit: one video angle or concept, three hook options, a script, a storyboard or concept board, one master cut, captions, on-screen text overlays, 9:16 delivery, 1:1 export, and review checkpoints."
  },
  {
    category: "Plans",
    question: "Is Sprout credited toward a monthly plan?",
    answer:
      "Yes. The $99 Sprout pilot is credited toward month one when the client upgrades within 7 days of pilot delivery."
  },
  {
    category: "Plans",
    question: "What are light adjustment credits?",
    answer:
      "Light adjustment credits are for minor updates to approved videos, such as hook swaps, CTA changes, caption updates, pacing trims, music swaps, small visual replacements, minor variants, or extra format versions."
  },
  {
    category: "Plans",
    question: "What is out of scope for a light adjustment?",
    answer:
      "A new product, new offer, new concept, new script, new storyboard, full creative rework, or substantially different direction counts as a new Video Ad Pack."
  },
  {
    category: "General",
    question: "Is lotabin a media buying agency?",
    answer:
      "No. lotabin is a video ad production desk. It supports paid-social-ready creative, but it does not replace the media buyer, ad account owner, or reporting function."
  },
  {
    category: "General",
    question: "How is AI used?",
    answer:
      "AI supports modern production workflows, but direction, structure, brand judgment, and final creative decisions remain human-directed. The goal is speed without making the brand look cheaper."
  },
  {
    category: "Rights",
    question: "Who owns the finished videos?",
    answer:
      "Finished deliverables are intended for client campaign use after payment and scope completion. Any exceptional source-file or licensing needs should be clarified before production starts."
  },
  {
    category: "Rights",
    question: "Are source files included?",
    answer:
      "Source files are not assumed by default. They can be scoped separately when a project or partner workflow requires them."
  },
  {
    category: "Agencies",
    question: "Can agencies use lotabin white-label?",
    answer:
      "Yes. Agencies and media buyers can use white-label fulfillment, co-branded support, or capacity blocks depending on the client relationship and workflow."
  },
  {
    category: "Agencies",
    question: "Does lotabin need ad account access?",
    answer:
      "No. Partner plans are designed so lotabin can handle production without needing end-client ad account access."
  },
  {
    category: "Film Studio",
    question: "How is Film Studio different from Video Ad Packs?",
    answer:
      "Video Ad Packs are built for 15–30 second paid-social ads. Film Studio is for longer-form explainers, educational content, sales-support videos, and branded communication up to 1 minute 30 seconds depending on scope."
  },
  {
    category: "General",
    question: "Do you guarantee ad performance?",
    answer:
      "No. lotabin creates structured, launch-ready video ads, but it does not promise fake ROAS, viral outcomes, or platform results. Creative quality, clarity, and delivery discipline are the controllable focus."
  },
  {
    category: "General",
    question: "How do we get started?",
    answer:
      "Choose the path that fits your buyer type: brand plan, agency partner capacity, or Film Studio. From there, submit the intake, provide required assets, approve scope, and production can begin."
  }
];
