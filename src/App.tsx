/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  getStoredData, 
  setStoredData, 
  defaultStudioInfo, 
  defaultServices, 
  defaultPortfolio, 
  defaultVideos, 
  defaultTestimonials, 
  defaultSEO,
  defaultCustomSettings
} from "./data";
import { 
  StudioInfo, 
  ServiceItem, 
  PortfolioItem, 
  VideoItem, 
  TestimonialItem, 
  ContactSubmission, 
  SEOConfig,
  CustomPageSettings
} from "./types";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import VideosSection from "./components/VideosSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import AdminConsole from "./components/AdminConsole";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";

export default function App() {
  // 1. Initial State from Storage
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(() => 
    getStoredData<StudioInfo>("studio_info", defaultStudioInfo)
  );

  const [services, setServices] = useState<ServiceItem[]>(() => 
    getStoredData<ServiceItem[]>("services", defaultServices)
  );

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => 
    getStoredData<PortfolioItem[]>("portfolio", defaultPortfolio)
  );

  const [videos, setVideos] = useState<VideoItem[]>(() => 
    getStoredData<VideoItem[]>("videos", defaultVideos)
  );

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => 
    getStoredData<TestimonialItem[]>("testimonials", defaultTestimonials)
  );

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => 
    getStoredData<ContactSubmission[]>("submissions", [])
  );

  const [seo, setSeo] = useState<SEOConfig>(() => 
    getStoredData<SEOConfig>("seo", defaultSEO)
  );

  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>(() => 
    getStoredData<Record<string, boolean>>("section_visibility", {
      about: true,
      services: true,
      portfolio: true,
      videos: true,
      testimonials: true,
      contact: true
    })
  );

  const [portfolioAspect, setPortfolioAspect] = useState<string>(() => 
    getStoredData<string>("portfolio_aspect", "natural")
  );

  const [customSettings, setCustomSettings] = useState<CustomPageSettings>(() => 
    getStoredData<CustomPageSettings>("custom_settings", defaultCustomSettings)
  );

  // 2. Active Section and Secure Login/Admin toggle states
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem("edwanik_admin_logged_in") === "true";
    } catch (_) {
      return false;
    }
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Check URL query parameters on mount to challenge for login
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "login" || params.get("admin") === "true") {
        setShowLoginModal(true);
        // Clean URL parameters for privacy and clean aesthetic
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {
      console.warn("Security load check:", e);
    }
  }, []);

  const handleAdminUnlock = () => {
    if (isAdminLoggedIn) {
      // Toggle
      setIsAdminOpen(prev => !prev);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("edwanik_admin_logged_in", "true");
    setShowLoginModal(false);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem("edwanik_admin_logged_in", "false");
    setIsAdminOpen(false);
  };

  // 3. Effects to save states when changed
  useEffect(() => {
    setStoredData("studio_info", studioInfo);
  }, [studioInfo]);

  useEffect(() => {
    setStoredData("services", services);
  }, [services]);

  useEffect(() => {
    setStoredData("portfolio", portfolio);
  }, [portfolio]);

  useEffect(() => {
    setStoredData("videos", videos);
  }, [videos]);

  useEffect(() => {
    setStoredData("testimonials", testimonials);
  }, [testimonials]);

  useEffect(() => {
    setStoredData("submissions", submissions);
  }, [submissions]);

  useEffect(() => {
    setStoredData("seo", seo);
  }, [seo]);

  useEffect(() => {
    setStoredData("section_visibility", sectionVisibility);
  }, [sectionVisibility]);

  useEffect(() => {
    setStoredData("portfolio_aspect", portfolioAspect);
  }, [portfolioAspect]);

  useEffect(() => {
    setStoredData("custom_settings", customSettings);
  }, [customSettings]);

  // 4. Update index meta fields dynamically (Simulates SEO optimization from state)
  useEffect(() => {
    document.title = seo.metaTitle || defaultSEO.metaTitle;
    
    // Manage meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement("meta");
      descMeta.setAttribute("name", "description");
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute("content", seo.metaDescription || defaultSEO.metaDescription);

    // Manage keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement("meta");
      keywordsMeta.setAttribute("name", "keywords");
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute("content", seo.keywords || defaultSEO.keywords);
  }, [seo]);

  // 5. Scroll Spy to track visible sections
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["home", "about", "services", "portfolio", "videos", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // 6. Lead submission capture callback
  const handleNewSubmission = (data: Omit<ContactSubmission, "id" | "submittedAt" | "status">) => {
    const newSubmission: ContactSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "unread"
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const getThemeStyles = () => {
    let primary = "#00f2fe";
    let primaryHover = "#4facfe";
    let secondary = "#ff007f";
    let secondaryHover = "#ec4899";
    
    if (customSettings.primaryAccent === "gold") {
      primary = "#FFD700";
      primaryHover = "#FFF080";
      secondary = "#00f2fe";
      secondaryHover = "#4facfe";
    } else if (customSettings.primaryAccent === "rose") {
      primary = "#ff007f";
      primaryHover = "#ec4899";
      secondary = "#00f2fe";
      secondaryHover = "#4facfe";
    } else if (customSettings.primaryAccent === "purple") {
      primary = "#A855F7";
      primaryHover = "#C084FC";
      secondary = "#00f2fe";
      secondaryHover = "#4facfe";
    } else if (customSettings.primaryAccent === "emerald") {
      primary = "#10B981";
      primaryHover = "#34D399";
      secondary = "#FFD700";
      secondaryHover = "#FFF080";
    }
    
    let fontSans = '"Inter", "Poppins", sans-serif';
    let fontDisplay = '"Poppins", "Inter", sans-serif';
    if (customSettings.typographyStyle === "monospace") {
      fontSans = '"JetBrains Mono", monospace';
      fontDisplay = '"JetBrains Mono", monospace';
    } else if (customSettings.typographyStyle === "serif") {
      fontSans = '"Inter", sans-serif';
      fontDisplay = '"Playfair Display", serif';
    } else if (customSettings.typographyStyle === "display") {
      fontSans = '"Space Grotesk", sans-serif';
      fontDisplay = '"Space Grotesk", sans-serif';
    }
    
    return `
      :root {
        --color-studio-cyan: ${primary} !important;
        --color-studio-cyan-hover: ${primaryHover} !important;
        --color-studio-pink: ${secondary} !important;
        --color-studio-pink-hover: ${secondaryHover} !important;
        --font-sans: ${fontSans} !important;
        --font-display: ${fontDisplay} !important;
      }
    `;
  };

  return (
    <div id="edwanik-app-shell" className="min-h-screen bg-studio-slate text-white select-none relative">
      <style>{getThemeStyles()}</style>

      {customSettings.announcementEnabled && customSettings.announcementText && (
        <div className="bg-gradient-to-r from-studio-cyan/25 via-studio-pink/25 to-studio-cyan/25 border-b border-white/5 py-2 px-4 text-center text-[10px] uppercase tracking-widest font-extrabold text-studio-cyan relative z-50 flex items-center justify-center gap-2">
          <span>{customSettings.announcementText}</span>
        </div>
      )}

      {/* Dynamic scanlines / noise backdrop overlay */}
      {customSettings.backgroundNoise && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,36,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none z-40 opacity-20" />
      )}
      
      {/* Dynamic Header */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        openAdmin={() => setIsAdminOpen(true)}
        studioInfo={studioInfo}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminUnlock={handleAdminUnlock}
        sectionVisibility={sectionVisibility}
        customSettings={customSettings}
      />

      {/* Main Single Page Sections Grid */}
      <main id="viewports-root">
        {/* Home / Hero Banner */}
        <Hero 
          setActiveSection={setActiveSection} 
          studioInfo={studioInfo} 
          customSettings={customSettings}
        />

        {/* About Narrative Story */}
        {sectionVisibility.about !== false && (
          <AboutSection 
            studioInfo={studioInfo} 
          />
        )}

        {/* Capabilities grid */}
        {sectionVisibility.services !== false && (
          <ServicesSection 
            services={services} 
          />
        )}

        {/* Portfolio Archives Grid */}
        {sectionVisibility.portfolio !== false && (
          <PortfolioSection 
            portfolioItems={portfolio} 
            portfolioAspect={portfolioAspect}
          />
        )}

        {/* Motion Cinematics and Reels */}
        {sectionVisibility.videos !== false && (
          <VideosSection 
            videos={videos} 
          />
        )}

        {/* Testimonials with Instagram Feed Portal */}
        {sectionVisibility.testimonials !== false && (
          <TestimonialsSection 
            testimonials={testimonials} 
          />
        )}

        {/* Contact Pipeline */}
        {sectionVisibility.contact !== false && (
          <ContactSection 
            studioInfo={studioInfo} 
            onNewSubmission={handleNewSubmission} 
            customSettings={customSettings}
          />
        )}
      </main>

      {/* Footer Details */}
      <Footer 
        setActiveSection={setActiveSection} 
        studioInfo={studioInfo} 
        sectionVisibility={sectionVisibility}
        customSettings={customSettings}
      />

      {/* Overlays / Admin Dashboard Dialog Panel */}
      {isAdminOpen && (
        <AdminConsole 
          onClose={() => setIsAdminOpen(false)}
          onLogout={handleAdminLogout}
          studioInfo={studioInfo}
          setStudioInfo={setStudioInfo}
          services={services}
          setServices={setServices}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          videos={videos}
          setVideos={setVideos}
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          submissions={submissions}
          setSubmissions={setSubmissions}
          seo={seo}
          setSeo={setSeo}
          sectionVisibility={sectionVisibility}
          setSectionVisibility={setSectionVisibility}
          portfolioAspect={portfolioAspect}
          setPortfolioAspect={setPortfolioAspect}
          customSettings={customSettings}
          setCustomSettings={setCustomSettings}
        />
      )}

      {/* Secure Admin Lock Login Overlay */}
      {showLoginModal && (
        <AdminLogin 
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
