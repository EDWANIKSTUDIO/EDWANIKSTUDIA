/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Eye, Compass, Trophy, Zap, Sparkles } from "lucide-react";
import { StudioInfo } from "../types";

interface AboutSectionProps {
  studioInfo: StudioInfo;
}

export default function AboutSection({ studioInfo }: AboutSectionProps) {
  const coreValues = [
    {
      icon: Eye,
      title: "Our Vision",
      desc: studioInfo.vision,
      badge: "ASPIRATION"
    },
    {
      icon: Compass,
      title: "Our Mission",
      desc: studioInfo.mission,
      badge: "OPERATION"
    }
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-studio-black">
      
      {/* Background Decorative Neon blur lights */}
      <div className="absolute top-[10%] right-[-100px] w-[350px] h-[350px] bg-studio-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-100px] w-[350px] h-[350px] bg-studio-pink/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-28">
          
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-start text-left">
            <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-bold block mb-3 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-studio-cyan" /> The Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight mb-8">
              WE ARE AN END-TO-END <br />
              <span className="text-cyber-gradient font-black">CREATIVE DIGITAL LAB</span>
            </h2>
            <div className="border-l-2 border-studio-cyan/30 pl-6 mb-8 py-2">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                {studioInfo.aboutDescription}
              </p>
            </div>
            
            {/* Quick credentials badges */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-studio-cyan/10 flex items-center justify-center text-studio-cyan">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-white text-base">Elite Class</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Quality Standard</p>
                </div>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-studio-pink/10 flex items-center justify-center text-studio-pink">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-white text-base">High-Fidelity</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Technical Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Block */}
          <div className="lg:col-span-12 xl:col-span-5 h-[340px] md:h-[400px] w-full rounded-2xl overflow-hidden relative border border-white/5 group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
              alt="Edwanik Collaborations" 
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.15] scale-100 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-black/90 via-studio-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="text-[9px] tracking-widest text-[#ffd700] uppercase font-bold block mb-1">
                Studio Space
              </span>
              <h4 className="font-display font-bold text-white text-lg leading-tight">
                Where technical structures meet cinematic visions.
              </h4>
            </div>
          </div>
        </div>

        {/* Vision & Mission Row */}
        <div id="about-values-cards" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28 text-left">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            // First is cyan theme, second is pink
            const isFirst = idx === 0;
            return (
              <div 
                key={idx} 
                className={`p-8 rounded-2xl bg-studio-zinc border border-white/5 relative overflow-hidden group hover:border-${isFirst ? "studio-cyan" : "studio-pink"}/20 transition-all duration-300 ${isFirst ? "cyan-glow-hover" : "pink-glow-hover"}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Icon className="w-32 h-32 text-white" />
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 ${isFirst ? "bg-studio-cyan/10 text-studio-cyan" : "bg-studio-pink/10 text-studio-pink"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[8px] tracking-widest uppercase font-bold block mb-1.5 ${isFirst ? "text-studio-cyan" : "text-studio-pink"}`}>{val.badge}</span>
                <h3 className="font-display font-extrabold text-xl text-white mb-3">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
