/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Instagram, Youtube, Linkedin, Mail, Clock, Send } from "lucide-react";
import { StudioInfo, CustomPageSettings } from "../types";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  setActiveSection: (section: string) => void;
  studioInfo: StudioInfo;
  sectionVisibility?: Record<string, boolean>;
  customSettings?: CustomPageSettings;
}

export default function Footer({ setActiveSection, studioInfo, sectionVisibility, customSettings }: FooterProps) {
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      };
      setLiveTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-studio-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Decorative Neon Light glow */}
      <div className="absolute top-0 left-[-150px] w-[350px] h-[350px] bg-studio-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-150px] w-[350px] h-[350px] bg-studio-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 relative z-10 text-left">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start gap-6">
          <div className="cursor-pointer" onClick={() => handleScrollTo("home")}>
            <BrandLogo variant="compact" />
          </div>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Crafting luxury digital transformations, high-impact poster arrays, cinematic commercials, and optimized Web/Google setups for ambitious brands globally.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a 
              href={customSettings?.instagramUrl || "https://www.instagram.com/edwanikstudio"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-studio-zinc hover:bg-studio-cyan hover:text-studio-black rounded-xl transition duration-300"
              title="Instagram Profile"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a 
              href={customSettings?.youtubeUrl || "https://youtube.com"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-studio-zinc hover:bg-studio-pink hover:text-studio-black rounded-xl transition duration-300"
              title="YouTube Channel"
            >
              <Youtube className="w-4.5 h-4.5" />
            </a>
            <a 
              href={customSettings?.linkedinUrl || "https://linkedin.com"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-studio-zinc hover:bg-studio-cyan hover:text-studio-black rounded-xl transition duration-300"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Directory column */}
        <div>
          <h4 className="text-[10px] tracking-widest uppercase font-black text-studio-cyan mb-6 border-l-2 border-studio-cyan pl-3">
            EXPLORATION INDEX
          </h4>
          <ul className="flex flex-col items-start gap-4 text-xs font-semibold text-gray-400">
            <li><button onClick={() => handleScrollTo("home")} className="hover:text-studio-cyan transition duration-200">Main Portal</button></li>
            {(sectionVisibility?.about !== false) && <li><button onClick={() => handleScrollTo("about")} className="hover:text-studio-cyan transition duration-200">About Narrative</button></li>}
            {(sectionVisibility?.services !== false) && <li><button onClick={() => handleScrollTo("services")} className="hover:text-studio-cyan transition duration-200">Our Capabilities</button></li>}
            {(sectionVisibility?.portfolio !== false) && <li><button onClick={() => handleScrollTo("portfolio")} className="hover:text-studio-cyan transition duration-200">Client Archive</button></li>}
            {(sectionVisibility?.videos !== false) && <li><button onClick={() => handleScrollTo("videos")} className="hover:text-studio-cyan transition duration-200">Motion & Cinematics</button></li>}
          </ul>
        </div>

        {/* Contacts column */}
        <div>
          <h4 className="text-[10px] tracking-widest uppercase font-black text-studio-pink mb-6 border-l-2 border-studio-pink pl-3">
            STUDIO CONTACTS
          </h4>
          <ul className="flex flex-col gap-4 text-xs text-gray-400 leading-relaxed font-semibold">
            <li className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-studio-cyan shrink-0 mt-0.5" />
              <span>{studioInfo.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4.5 h-4.5 text-studio-pink shrink-0 mt-0.5 animate-pulse" />
              <div className="text-left font-mono">
                <span className="block text-white text-[11px] font-bold uppercase tracking-wider">{liveTime}</span>
                <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-widest block mt-0.5">{studioInfo.phone || "10 AM - 7 PM IST"}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Stay Connected Signup column */}
        <div className="flex flex-col items-start text-left">
          <h4 className="text-[10px] tracking-widest uppercase font-black text-[#ffd700] mb-6 border-l-2 border-[#ffd700] pl-3">
            STAY INSPIRED
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            Receive occasional technical briefs on core brand tactics, local Google ranking factors, and UI/UX news.
          </p>
          <div className="flex gap-2 w-full">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-studio-zinc border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-studio-cyan w-full placeholder-gray-600"
            />
            <button 
              className="px-4 py-3 bg-white hover:bg-studio-cyan text-studio-black border-none text-xs font-bold rounded-xl transition duration-300 shrink-0 flex items-center justify-center cursor-pointer"
              title="Newsletter Submit"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest uppercase text-gray-600 font-mono font-bold">
        <div>
          © {new Date().getFullYear()} {studioInfo.brandName}. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-studio-cyan transition">Privacy Strategy</a>
          <a href="#" className="hover:text-studio-cyan transition">Agreement Terms</a>
        </div>
      </div>
    </footer>
  );
}
