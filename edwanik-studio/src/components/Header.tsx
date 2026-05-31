/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Settings2, Lock, Unlock } from "lucide-react";
import { StudioInfo, CustomPageSettings } from "../types";
import BrandLogo from "./BrandLogo";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openAdmin: () => void;
  studioInfo: StudioInfo;
  isAdminLoggedIn: boolean;
  onAdminUnlock: () => void;
  sectionVisibility?: Record<string, boolean>;
  customSettings?: CustomPageSettings;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  openAdmin, 
  studioInfo,
  isAdminLoggedIn,
  onAdminUnlock,
  sectionVisibility,
  customSettings
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "videos", label: "Videos" },
    { id: "contact", label: "Contact" },
  ].filter(item => item.id === "home" || (sectionVisibility ? sectionVisibility[item.id] !== false : true));

  const handleLogoClick = () => {
    handleNavClick("home");
    
    const now = Date.now();
    // Keep clicks in the last 2 seconds
    const recentClicks = [...logoClicks, now].filter(time => now - time < 2000);
    setLogoClicks(recentClicks);

    if (recentClicks.length === 4) {
      onAdminUnlock();
      setLogoClicks([]); // Reset sequence
    }
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll support
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header 
      id="site-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-studio-black/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          id="brand-logo"
          className="cursor-pointer select-none" 
          onClick={handleLogoClick}
          title="Edwanik Studio"
        >
          <BrandLogo variant="compact" />
        </div>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs tracking-widest uppercase transition-all duration-300 relative py-2 font-medium ${
                activeSection === item.id 
                  ? "text-studio-cyan" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-studio-cyan rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div id="header-actions" className="hidden md:flex items-center gap-4">
          {isAdminLoggedIn && (
            <button
              id="admin-portal-trigger"
              onClick={onAdminUnlock}
              className="flex items-center gap-2 px-4 py-2 border rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-studio-black"
              title="Open Admin Dashboard"
            >
              <Unlock className="w-3.5 h-3.5 animate-pulse" />
              Console
            </button>
          )}
          <button
            id="header-enquiry-btn"
            onClick={() => handleNavClick("contact")}
            className="px-5 py-2.5 bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold text-[10px] uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-md shadow-studio-cyan/5"
          >
            {customSettings?.navContactButtonLabel || "Inquire Now"}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div id="mobile-controls" className="md:hidden flex items-center gap-3">
          {isAdminLoggedIn && (
            <button
              id="mobile-admin-btn"
              onClick={onAdminUnlock}
              className="p-2 border rounded-full transition-all duration-300 border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              title="Admin Console"
            >
              <Unlock className="w-4 h-4" />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-white/10 rounded-md text-white hover:bg-white/5 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="md:hidden absolute top-[72px] left-0 w-full bg-studio-slate/95 border-b border-white/5 px-6 py-8 flex flex-col gap-6 animate-fade-in shadow-2xl backdrop-blur-xl"
        >
          {navItems.map((item) => (
            <button
              id={`mobile-nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-sm tracking-widest uppercase font-semibold ${
                activeSection === item.id ? "text-studio-cyan" : "text-gray-400"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            {isAdminLoggedIn && (
              <button
                 id="mobile-admin-drawer-trigger"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAdminUnlock();
                }}
                className="w-full py-3.5 text-center border font-bold uppercase tracking-widest rounded-md text-xs flex items-center justify-center gap-2 transition duration-300 bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              >
                <Unlock className="w-4 h-4" /> Admin Console
              </button>
            )}
            <button
              id="mobile-enquiry-drawer-btn"
              onClick={() => handleNavClick("contact")}
              className="w-full py-3.5 text-center bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold uppercase tracking-widest rounded-md text-xs"
            >
              {customSettings?.navContactButtonLabel || "Inquire Now"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
