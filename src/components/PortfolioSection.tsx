/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Eye, X, Calendar, User, ArrowUpRight, FolderOpen } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
  portfolioAspect?: string;
}

export default function PortfolioSection({ portfolioItems, portfolioAspect = "natural" }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const [lightboxFit, setLightboxFit] = useState<"contain" | "cover">("contain");

  // Aligned list supporting EDWANIK's portfolio flyer disciplines
  const categories = ["All", "Branding", "Website Development", "Posters", "Flyers", "Photography", "Social Media Management"];

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => {
        // Broad matches to catch different categorizations smoothly
        const cat = item.category.toLowerCase().trim();
        const sel = selectedCategory.toLowerCase().trim();
        return cat.includes(sel) || sel.includes(cat);
      });

  return (
    <section id="portfolio" className="py-28 relative bg-studio-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title and filters */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-20 text-left">
          <div>
            <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-black block mb-3 inline-flex items-center gap-2">
              <FolderOpen className="w-3.5 h-3.5" /> Curated Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
              SAMPLE DESIGNS
            </h2>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                id={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-studio-cyan text-studio-black border-studio-cyan shadow-lg shadow-studio-cyan/15 font-black"
                    : "bg-white/3 text-gray-400 hover:text-white border-white/5 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-20 text-center glass-panel rounded-2xl">
              <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium">No projects added under the {selectedCategory} category yet.</p>
              <p className="text-xs text-gray-500 mt-2">Use the Admin Panel to upload new portfolio items!</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const hoverGlowClass = idx % 2 === 0 ? "cyan-glow-hover" : "pink-glow-hover";
              const tagBgClass = idx % 2 === 0 ? "text-studio-cyan border-studio-cyan/25 bg-studio-cyan/10" : "text-studio-pink border-studio-pink/25 bg-studio-pink/10";
              const accentTextClass = idx % 2 === 0 ? "text-studio-cyan block" : "text-studio-pink block";

              // Determine classes based on configured portfolio layout aspect choices
              let aspectContainerClass = "aspect-[4/3] overflow-hidden relative";
              let aspectImgClass = "w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700";

              if (portfolioAspect === "cinematic_16_9") {
                aspectContainerClass = "aspect-[16/9] overflow-hidden relative";
              } else if (portfolioAspect === "square_1_1") {
                aspectContainerClass = "aspect-square overflow-hidden relative";
              } else if (portfolioAspect === "natural") {
                aspectContainerClass = "aspect-[3/4] sm:aspect-auto h-96 sm:h-[420px] overflow-hidden relative bg-studio-black/40 flex items-center justify-center p-4";
                aspectImgClass = "max-w-full max-h-full object-contain rounded-xl filter grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 shadow-xl";
              } else if (portfolioAspect === "full_size") {
                aspectContainerClass = "w-full h-auto overflow-hidden relative bg-studio-black/40 flex items-center justify-center";
                aspectImgClass = "w-full h-auto object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700";
              }

              return (
                <div
                  id={`portfolio-grid-item-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveProject(item)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-studio-zinc border border-white/5 hover:border-white/10 transition-all duration-500 ${hoverGlowClass}`}
                >
                  {/* Visual Thumbnail */}
                  <div className={aspectContainerClass}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className={aspectImgClass}
                    />
                    {portfolioAspect !== "natural" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-studio-black/85 via-studio-black/30 to-transparent" />
                    )}
                    
                    {/* Floating category tag */}
                    <span className={`absolute top-4 left-4 backdrop-blur-md text-[8px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border ${tagBgClass}`}>
                      {item.category}
                    </span>
                    {item.addOnText && (
                      <span className="absolute top-4 right-4 backdrop-blur-md text-[8px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                        {item.addOnText}
                      </span>
                    )}
                  </div>

                  {/* Info Bar */}
                  <div className="p-6">
                    <span className={`text-[9px] tracking-widest uppercase font-black mb-1 ${accentTextClass}`}>
                      {item.client}
                    </span>
                    <h3 className="font-display font-black text-white text-lg group-hover:text-studio-cyan transition-colors block leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-xs leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover view circular icon overlay */}
                  <div className="absolute inset-0 bg-studio-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-studio-cyan text-studio-black rounded-full shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition duration-300">
                      <Eye className="w-5 h-5 font-bold" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Premium Lightbox Modal Overlays */}
        {activeProject && (
          <div 
            id="portfolio-lightbox-container"
            className="fixed inset-0 bg-studio-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveProject(null);
              }
            }}
          >
            <div className="bg-studio-zinc border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative my-8 animate-fade-in text-left">
              
              {/* Close Button */}
              <button 
                id="lightbox-close-btn"
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-studio-black/60 hover:bg-studio-cyan text-white hover:text-studio-black rounded-full transition-colors duration-300 cursor-pointer"
                title="Close Project Details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Product/Showcase Banner image */}
                <div className="h-96 lg:h-[500px] w-full relative bg-studio-black flex items-center justify-center overflow-hidden border-r border-white/5">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-all duration-300 ${lightboxFit === "contain" ? "object-contain p-4" : "object-cover"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                  
                  {/* Aspect Ratio Toggle inside Lightbox */}
                  <button
                    type="button"
                    onClick={() => setLightboxFit(prev => prev === "contain" ? "cover" : "contain")}
                    className="absolute bottom-4 left-4 px-2.5 py-1 bg-studio-black/75 hover:bg-studio-cyan text-white hover:text-studio-black font-extrabold text-[8px] uppercase tracking-wider rounded border border-white/10 transition flex items-center gap-1 cursor-pointer"
                    title="Toggle Full Scale vs Cropped Aspect"
                  >
                    <span>{lightboxFit === "contain" ? "Zoom / Crop to Fill" : "Fit Whole Image (Full Size)"}</span>
                  </button>
                </div>

                {/* Specs deck details */}
                <div className="p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="text-[9px] text-studio-cyan font-black tracking-widest uppercase px-3 py-1.5 bg-studio-cyan/10 rounded-full border border-studio-cyan/20 inline-block">
                        {activeProject.category}
                      </span>
                      {activeProject.addOnText && (
                        <span className="text-[9px] text-emerald-400 font-black tracking-widest uppercase px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/25 inline-block">
                          {activeProject.addOnText}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-black text-white text-2xl sm:text-3xl leading-tight mb-4">
                      {activeProject.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
                      {activeProject.desc}
                    </p>

                    {/* Metadata Table */}
                    <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
                      <div className="flex items-start gap-2.5">
                        <User className="w-4 h-4 text-studio-cyan shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Client</span>
                          <span className="text-xs font-bold text-white block mt-0.5">{activeProject.client}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-studio-cyan shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Timeline</span>
                          <span className="text-xs font-bold text-white block mt-0.5">{activeProject.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons action */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    {activeProject.projectUrl && (
                      <a 
                        id="portfolio-lightbox-cta-external"
                        href={activeProject.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-6 bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Launch Project <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button 
                      id="portfolio-lightbox-close"
                      onClick={() => setActiveProject(null)}
                      className="py-3.5 px-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 grow cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
