/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as Icons from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  
  // Dynamic Icon Renderer
  const renderIcon = (iconName: string) => {
    const resolved = (Icons as any)[iconName];
    if (resolved) {
      const LucideIcon = resolved;
      return <LucideIcon className="w-5 h-5" />;
    }
    // Fallback search
    const lowerName = iconName.toLowerCase();
    if (lowerName.includes("code") || lowerName.includes("web") || lowerName.includes("dev")) {
      return <Icons.Code className="w-5 h-5" />;
    }
    if (lowerName.includes("pen") || lowerName.includes("design") || lowerName.includes("brand")) {
      return <Icons.PenTool className="w-5 h-5" />;
    }
    if (lowerName.includes("video") || lowerName.includes("edit") || lowerName.includes("layer")) {
      return <Icons.Layers className="w-5 h-5" />;
    }
    if (lowerName.includes("photo") || lowerName.includes("camera") || lowerName.includes("image")) {
      return <Icons.Image className="w-5 h-5" />;
    }
    if (lowerName.includes("trend") || lowerName.includes("market") || lowerName.includes("zap") || lowerName.includes("ai")) {
      return <Icons.Zap className="w-5 h-5" />;
    }
    return <Icons.Sparkles className="w-5 h-5" />;
  };

  return (
    <section 
      id="services" 
      className="py-28 relative bg-studio-slate border-y border-white/5"
    >
      {/* Background Decorative Grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Cyber lights */}
      <div className="absolute top-[10%] left-[-150px] w-[400px] h-[400px] bg-studio-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-150px] w-[400px] h-[400px] bg-studio-pink/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-black block mb-3 inline-flex items-center gap-2">
            <Icons.Sparkles className="w-3.5 h-3.5 animate-pulse text-studio-cyan" /> Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight mb-4 text-center">
            CREATIVE SOLUTIONS & <br />
            <span className="text-cyber-gradient font-black">BRAND DESIGN</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center">
            We craft bespoke brand strategies, digital platforms, and high-impact visual campaigns engineered for market leadership.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            // Alternate theme values for organic visual variety
            const isPink = idx % 2 === 1;
            const borderGlowClass = isPink ? "pink-glow-hover" : "cyan-glow-hover";
            const iconBgClass = isPink ? "bg-studio-pink/10 text-studio-pink" : "bg-studio-cyan/10 text-studio-cyan";
            const titleHoverClass = isPink ? "group-hover:text-studio-pink" : "group-hover:text-studio-cyan";
            const accentTextClass = isPink ? "text-studio-pink" : "text-studio-cyan";

            return (
              <div
                id={`service-card-${srv.id}`}
                key={srv.id}
                className={`group p-8 rounded-2xl bg-studio-zinc border border-white/5 relative overflow-hidden transition-all duration-300 flex flex-col justify-between text-left ${borderGlowClass}`}
              >
                <div>
                  {/* Icon Box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ${iconBgClass}`}>
                    {renderIcon(srv.icon)}
                  </div>

                  <span className={`text-[8px] tracking-[0.2em] font-bold uppercase block mb-1.5 ${accentTextClass}`}>
                    {srv.category}
                  </span>

                  <h3 className={`font-display font-black text-white text-lg sm:text-xl mb-4 transition-colors ${titleHoverClass}`}>
                    {srv.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  {/* Bullets feature list */}
                  <ul className="space-y-2.5 border-t border-white/5 pt-5 mb-6">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                        <Icons.Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accentTextClass}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Tag line */}
                {srv.priceRange && (
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-wider pt-4 border-t border-white/5 text-gray-400 mt-2">
                    <span className="uppercase text-[9px] text-gray-500 font-bold">Investments</span>
                    <span className={`font-black uppercase ${accentTextClass}`}>{srv.priceRange}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
