/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  icon: string; // Icon name from lucide-react
  title: string;
  desc: string;
  features: string[];
  priceRange?: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  desc: string;
  featured: boolean;
  projectUrl?: string;
  addOnText?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  type: "reels" | "youtube" | "commercial" | "promotional";
  thumbnail: string;
  duration: string;
  url: string; // embed URL or watch link
  viewsCount?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
  status: "unread" | "reviewed" | "archived";
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  openGraphImage: string;
}

export interface StudioInfo {
  brandName: string;
  slogan: string;
  tagline: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  journeyPoints: { year: string; title: string; desc: string }[];
  address: string;
  email: string;
  phone: string;
  whatsappNumber: string;
}

export interface CustomPageSettings {
  primaryAccent: "cyan" | "gold" | "rose" | "purple" | "emerald";
  glowIntensity: "low" | "medium" | "high";
  backgroundNoise: boolean;
  typographyStyle: "modern" | "display" | "monospace" | "serif";
  logoGlowEnabled: boolean;
  navContactButtonLabel: string;
  heroHeadingAccent: string;
  heroCtaPrimaryLabel: string;
  heroCtaSecondaryLabel: string;
  announcementText: string;
  announcementEnabled: boolean;
  contactSectionTitle: string;
  contactSectionDesc: string;
  contactPlaceholderName: string;
  contactPlaceholderMsg: string;
  successSubmissionText: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}
