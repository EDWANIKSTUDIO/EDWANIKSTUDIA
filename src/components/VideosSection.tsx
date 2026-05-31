/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, Eye, X, Video, Film, Laptop, Sparkles } from "lucide-react";
import { VideoItem } from "../types";

interface VideosSectionProps {
  videos: VideoItem[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "reels" | "youtube" | "commercial" | "promotional">("all");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const videoTabs = [
    { id: "all", label: "All Clips" },
    { id: "reels", label: "Instagram Reels" },
    { id: "youtube", label: "YouTube Videos" },
    { id: "commercial", label: "Commercials" },
    { id: "promotional", label: "Promo Shoots" }
  ];

  const filteredVideos = activeTab === "all"
    ? videos
    : videos.filter(v => v.type === activeTab);

  // Parse any youtube link securely to use as embed URL, or fallback
  const getEmbedUrl = (url: string) => {
    try {
      if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
      if (url.includes("embed/")) return url;
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      // Fallback
    }
    return "https://www.youtube.com/embed/dQw4w9WgXcQ";
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case "reels": return <Film className="w-3 h-3 text-studio-pink" />;
      case "youtube": return <Play className="w-3 h-3 text-red-500" />;
      case "commercial": return <Video className="w-3 h-3 text-studio-cyan" />;
      default: return <Laptop className="w-3 h-3 text-[#ffd700]" />;
    }
  };

  return (
    <section id="videos" className="py-28 relative bg-studio-slate border-y border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-studio-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-studio-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Grid */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-20 text-left">
          <div>
            <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-black block mb-3 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Motion Arts
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
              REELS & CINEMATICS
            </h2>
          </div>

          {/* Video Sub Nav Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {videoTabs.map((tab) => (
              <button
                id={`video-filter-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4.5 py-2.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-studio-cyan text-studio-black border-studio-cyan font-black"
                    : "bg-white/3 text-gray-400 hover:text-white border-white/5 hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full py-20 text-center glass-panel rounded-2xl">
              <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium">No videos uploaded in this category.</p>
              <p className="text-xs text-gray-500 mt-2">Update catalog listings inside the Admin panel.</p>
            </div>
          ) : (
            filteredVideos.map((video, idx) => {
              const borderGlowClass = idx % 2 === 0 ? "cyan-glow-hover" : "pink-glow-hover";
              const playBgClass = idx % 2 === 0 ? "bg-studio-cyan text-studio-black" : "bg-studio-pink text-studio-black";
              const titleHoverClass = idx % 2 === 0 ? "group-hover:text-studio-cyan" : "group-hover:text-studio-pink";
              const textIconClass = idx % 2 === 0 ? "text-studio-cyan" : "text-studio-pink";

              return (
                <div
                  id={`video-showcase-card-${video.id}`}
                  key={video.id}
                  onClick={() => setSelectedVideoUrl(video.url)}
                  className={`group relative rounded-2xl overflow-hidden bg-studio-zinc border border-white/5 transition-all duration-300 flex flex-col cursor-pointer ${borderGlowClass}`}
                >
                  {/* Visual Thumbnail */}
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-[0.75] group-hover:brightness-[0.95] transition-all duration-500"
                    />
                    
                    {/* Subtle Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-zinc/95 via-studio-zinc/20 to-transparent" />

                    {/* Circular Play button indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 ${playBgClass}`}>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Top floating tags */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <span className="flex items-center gap-1 px-3 py-1 bg-studio-black/75 backdrop-blur-md rounded-full text-[8px] font-bold tracking-widest text-white uppercase border border-white/5">
                        {getBadgeIcon(video.type)} {video.type}
                      </span>
                      <span className="px-2 py-0.5 bg-studio-black/80 backdrop-blur-md rounded-md text-[9px] font-mono font-bold text-gray-300">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Video Info Block */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <h3 className={`font-display font-extrabold text-white text-sm sm:text-base transition-colors line-clamp-2 leading-snug mb-4 ${titleHoverClass}`}>
                      {video.title}
                    </h3>

                    {/* Direct interactive view metrics */}
                    {video.viewsCount && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">
                        <Eye className={`w-3.5 h-3.5 ${textIconClass}`} />
                        <span>{video.viewsCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Video Cinema Player Lightbox */}
        {selectedVideoUrl && (
          <div 
            id="video-player-modal-container"
            className="fixed inset-0 bg-studio-black/95 backdrop-blur-md z-[120] flex items-center justify-center p-4"
            onClick={() => setSelectedVideoUrl(null)}
          >
            <div className="relative w-full max-w-4xl aspect-[16/9] bg-studio-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              
              {/* Close Button */}
              <button
                id="video-player-close-btn"
                onClick={() => setSelectedVideoUrl(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-studio-black/60 hover:bg-studio-pink text-white hover:text-studio-black rounded-full transition-colors duration-300 cursor-pointer"
                title="Exit Cinema"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Secure Youtube / Vimeo Frame container */}
              <iframe
                id="interactive-video-iframe"
                src={getEmbedUrl(selectedVideoUrl)}
                title="Cinematic Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-none z-10"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
