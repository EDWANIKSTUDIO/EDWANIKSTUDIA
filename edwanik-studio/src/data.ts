/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, PortfolioItem, VideoItem, TestimonialItem, StudioInfo, SEOConfig, CustomPageSettings } from "./types";

// Initial Studio Info
export const defaultStudioInfo: StudioInfo = {
  brandName: "Edwanik Studio",
  slogan: "We Build Creative Digital Experiences",
  tagline: "Premium Creative Studio for Modern Brands",
  aboutDescription: "Founded at the intersection of cinematic visuals and modern technologies, Edwanik Studio redefines digital luxury. We do not operate on templates or standardized grids. We craft bespoke brand systems, cinematic storytelling content, and high-fidelity React ecosystems that capture market leadership for ambitious brands worldwide.",
  mission: "To empower visionary companies with elite artistic narratives and flawless engineering, converting normal interfaces into unforgettable premium brand assets.",
  vision: "To define the future of premium digital ecosystems by merging structural architecture with raw, high-resolution cinematic design.",
  journeyPoints: [
    { year: "2020", title: "The Genesis", desc: "Started as a boutique cinematic production house in New Delhi, editing commercials and designing luxury brand assets." },
    { year: "2022", title: "Digital Integration", desc: "Expanded the core team to include senior Next.js engineers and luxury UI/UX architects, establishing our end-to-end studio workflow." },
    { year: "2024", title: "Going Global", desc: "Partnered with premier fashion houses and enterprise brands across Europe and Asia, executing multiple luxury launches." },
    { year: "2026", title: "Studio Evolution", desc: "Deploying intelligent immersive interfaces and setting state-of-the-art standards for high-converting premium experiences." }
  ],
  address: "Luxury Corporate Suites, DLF CyberCity, New Delhi, India",
  email: "hello@edwanikstudio.com",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210" // Format for direct wa.me link
};

// Initial services matching Edwanik's luxury industries
export const defaultServices: ServiceItem[] = [
  {
    id: "srv-logo",
    icon: "PenTool",
    title: "Logo Design",
    desc: "Unique, modern, and memorable brand logos custom-crafted for high-end recognition.",
    features: [
      "Custom Typography & Vector Scales",
      "Complete Brand Identity Guidelines",
      "High-Quality Source Files & SVGs"
    ],
    priceRange: "starting at $200",
    category: "Branding"
  },
  {
    id: "srv-poster",
    icon: "Image",
    title: "Poster Design",
    desc: "Creative high-impact posters for promotions, product launches, events, and strategic marketing drives.",
    features: [
      "High-Resolution Print-Ready Formats",
      "Custom Branded Narrative Graphics",
      "Optimized Social Media Aspect Ratios"
    ],
    priceRange: "starting at $150",
    category: "Photography"
  },
  {
    id: "srv-banner",
    icon: "Layers",
    title: "Banner Design",
    desc: "Professional, premium banners for corporate webpages, Shopify sliders, and social media showcase feeds.",
    features: [
      "Cross-Platform Dimension Optimization",
      "High-Contrast Interactive Collateral",
      "Branded Cyber Grid Aesthetics"
    ],
    priceRange: "starting at $100",
    category: "Branding"
  },
  {
    id: "srv-card",
    icon: "CreditCard",
    title: "Business Card Design",
    desc: "Clean, modern, and premium business card layouts engineered to make unforgettable physical and digital impressions.",
    features: [
      "Exquisite Minimalist Layouts",
      "Print-Ready CMYK Formats",
      "QR-Code Integration for Direct Links"
    ],
    priceRange: "starting at $50",
    category: "Branding"
  },
  {
    id: "srv-web",
    icon: "Code",
    title: "Website Development",
    desc: "Modern, lightning-fast, and mobile-friendly websites meticulously hand-coded for Shops, Restaurants, Clinics, Salons, Real Estate, and Small Businesses.",
    features: [
      "High-Converting UX/UI Layouts",
      "Full Mobile & Tablet Responsive Adaptations",
      "Lighthouse Speed & Search Engine Optimized (SEO)"
    ],
    priceRange: "starting at $500",
    category: "Website Development"
  },
  {
    id: "srv-gbp",
    icon: "MapPin",
    title: "Google Business Profile Setup",
    desc: "Get discovered instantly by local customers on Google Search and Google Maps with professional profiling and local SEO setup.",
    features: [
      "Accurate Business Profile & Location Setup",
      "Contact Channels, Hours & Product Catalog Updates",
      "Smart Verification Support & local search rank optimization"
    ],
    priceRange: "starting at $100",
    category: "Social Media Management"
  }
];

// Initial premium portfolio items
export const defaultPortfolio: PortfolioItem[] = [
  {
    id: "port-1",
    title: "The Aurelia Watch Co.",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    client: "Aurelia Luxury Group",
    year: "2025",
    desc: "An exhaustive luxury rebranding campaign for Aurelia Watchmakers. Combining dark carbon grids with warm physical gold visual styling, representing flawless timelessness.",
    featured: true,
    projectUrl: "https://github.com"
  },
  {
    id: "port-2",
    title: "Vanguard EV Platform",
    category: "Website Design",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    client: "Vanguard Automotive",
    year: "2024",
    desc: "An Apple-inspired immersive interface with 3D product interactive grids, customized live configurators, and microanimations built on Next.js.",
    featured: true,
    projectUrl: "https://github.com"
  },
  {
    id: "port-3",
    title: "Noir Architecture Collective",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    client: "Noir Builders",
    year: "2025",
    desc: "Sophisticated interior and exterior photography capture of architectural marvels in South Delhi, focusing on brutalist styling of raw materials and heavy shadows.",
    featured: true
  },
  {
    id: "port-4",
    title: "Chronos Premium Campaign",
    category: "Videography",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    client: "Chronos Switzerland",
    year: "2024",
    desc: "Comprehensive advert production, custom storyboard layouts, and editorial videography sequences capturing details of watch mechanics under studio macros.",
    featured: false
  },
  {
    id: "port-5",
    title: "Elysian Skincare Campaign",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    client: "Elysian Cosmetics",
    year: "2025",
    desc: "Clean packaging, luxury catalogue booklets, social media aesthetic grid systems, and typographical collateral designed for a high-end product announcement.",
    featured: false
  },
  {
    id: "port-6",
    title: "Helios Eco Resort",
    category: "Social Media Designs",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    client: "Helios Wellness",
    year: "2024",
    desc: "Curated premium grid assets, interactive Instagram stories layouts, and customized video templates presenting organic lifestyle travel destinations.",
    featured: false
  }
];

// Initial premium videos and reels
export const defaultVideos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Luxury Coffee Craftsmanship Cinematic Edit",
    type: "reels",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    duration: "0:30",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Classic placeholder for demo iframe
    viewsCount: "128K views"
  },
  {
    id: "vid-2",
    title: "Vanguard EV Cinematic Launch Commercial",
    type: "commercial",
    thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    duration: "1:45",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: "450K views"
  },
  {
    id: "vid-3",
    title: "Behind The Scenes: Luxury Brand Studio Shoots",
    type: "youtube",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    duration: "8:12",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: "35K views"
  },
  {
    id: "vid-4",
    title: "Aesthetic Studio Lighting Portrait Course Teaser",
    type: "promotional",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    duration: "2:30",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    viewsCount: "92K views"
  }
];

// Initial luxury client testimonials
export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Aarav Singhania",
    role: "Marketing Director",
    company: "Aurelia Luxury Group",
    rating: 5,
    comment: "Working with Edwanik Studio transformed our brand image overnight. Their attention to detail in balancing gold luxury accents with raw minimalism was exactly what we needed. The feedback on our luxury collection is outstanding.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "test-2",
    name: "Sophia Mercier",
    role: "CEO & Co-Founder",
    company: "Sophia Watches",
    rating: 5,
    comment: "The speed and performance of our new Next.js portfolio website designed by Edwanik Studio is unbelievable. Impeccable glassmorphic lines, stunning transitions, and absolutely zero compromises in visual fidelity.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "test-3",
    name: "Kabir Mehta",
    role: "Creative Producer",
    company: "Noir Builders Group",
    rating: 5,
    comment: "Edwanik's photographic shoot and advertising videos captured our real estate architecture's brutalist soul perfectly. They created an experiential art asset rather than just an ad campaign.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  }
];

// Initial SEO Config
export const defaultSEO: SEOConfig = {
  metaTitle: "Edwanik Studio | Premium Creative Digital Portfolio",
  metaDescription: "Bespoke brand identities, luxury designs, ultra-fast tech stacks, cinematic ad editing, and expert studio videography engineered to convert.",
  keywords: "Branding, Web Development, Luxury Studio, Ad Cinematics, Drone Videography, Photo Shoots",
  openGraphImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800"
};

export const defaultCustomSettings: CustomPageSettings = {
  primaryAccent: "cyan",
  glowIntensity: "high",
  backgroundNoise: true,
  typographyStyle: "modern",
  logoGlowEnabled: true,
  navContactButtonLabel: "Initiate Project",
  heroHeadingAccent: "BESPOKE MASTERPIECES",
  heroCtaPrimaryLabel: "Explore Showcase",
  heroCtaSecondaryLabel: "Direct Inquiries",
  announcementText: "✨ SPECIAL OFFER: Custom Branding & Posters Suite now comes with 20% Add-On discount. Limited slots!",
  announcementEnabled: true,
  contactSectionTitle: "ESTABLISH CONTACT",
  contactSectionDesc: "Let's co-create your brand's next digital standard. Fill in the creative parameters below or hit the chat portal.",
  contactPlaceholderName: "How should we address you?",
  contactPlaceholderMsg: "Tell us about your creative concept or requirements...",
  successSubmissionText: "✨ Your details have crossed our transmission threshold. Our directors will review your parameters and respond within 2-4 hours!",
  instagramUrl: "https://www.instagram.com/edwanikstudio",
  youtubeUrl: "https://youtube.com",
  linkedinUrl: "https://linkedin.com"
};

// Functions to load/save state with default fallback from localStorage
export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(`edwanik_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`edwanik_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
}
