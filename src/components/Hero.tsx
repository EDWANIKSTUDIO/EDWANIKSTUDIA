/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, ArrowRight, Award, Users, ShieldCheck } from "lucide-react";
import { StudioInfo, CustomPageSettings } from "../types";
import BrandLogo from "./BrandLogo";

interface HeroProps {
  setActiveSection: (section: string) => void;
  studioInfo: StudioInfo;
  customSettings?: CustomPageSettings;
}

export default function Hero({ setActiveSection, studioInfo, customSettings }: HeroProps) {
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-studio-black"
    >
      {/* 1. Cyber Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* 2. Soft Ambient Brand Lights */}
      <div id="hero-orb-cyan" className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-studio-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div id="hero-orb-pink" className="absolute bottom-1/5 right-1/4 w-[500px] h-[500px] bg-studio-pink/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* 3. Laser lines */}
      <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-studio-cyan/25 to-transparent pointer-events-none" />
      <div className="absolute top-[65%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-studio-pink/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
        
        {/* Left Copy block */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Badge */}
          <div 
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-cyan/5 border border-studio-cyan/15 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-studio-cyan animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-studio-cyan font-bold block">
              {customSettings?.heroHeadingAccent || studioInfo.tagline}
            </span>
          </div>

          {/* Headline */}
          <h1 
            id="hero-headline"
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] mb-6"
          >
            {studioInfo.slogan.split(" ").slice(0, 3).join(" ")} <br />
            <span className="text-cyber-gradient font-black">
              {studioInfo.slogan.split(" ").slice(3).join(" ") || "DIGITAL DESTINITIES"}
            </span>
          </h1>

          {/* Sub description */}
          <p 
            id="hero-description"
            className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-8"
          >
            We combine expert custom code, cinematic assets, and elite brand geometry to build absolute market authority for ambitious small businesses and enterprises.
          </p>

          {/* Call-to-actions */}
          <div id="hero-actions-group" className="flex flex-wrap gap-4 mb-12">
            <button
              id="hero-cta-portfolio"
              onClick={() => handleScrollTo("portfolio")}
              className="group px-7 py-4 bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 shadow-lg shadow-studio-cyan/10"
            >
              {customSettings?.heroCtaPrimaryLabel || "View Designs"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-cta-contact"
              onClick={() => handleScrollTo("contact")}
              className="px-7 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 backdrop-blur-md"
            >
              {customSettings?.heroCtaSecondaryLabel || "Contact Us"}
            </button>
          </div>

          {/* Luxury Stats Badges */}
          <div id="hero-mini-stats" className="flex flex-wrap gap-6 border-t border-white/5 pt-8 w-full max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center text-studio-cyan">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-white">150+</span>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Projects Competed</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center text-studio-pink">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-white">40+</span>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Premium Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center text-[#ffd700]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-white">100%</span>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Fast Handover</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Graphic - Interactive brand card centered perfectly around the beautiful brand assets */}
        <div id="hero-graphic" className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-sm transform hover:scale-[1.02] transition-transform duration-500">
            <BrandLogo variant="full" className="w-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
