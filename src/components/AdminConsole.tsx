/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Layers, BookOpen, Video, Users, CheckCircle, BarChart3, Edit, Plus, Trash2, Send, Heart, Save, AlertCircle, Crop, Sliders, ZoomIn } from "lucide-react";
import { ServiceItem, PortfolioItem, VideoItem, TestimonialItem, ContactSubmission, StudioInfo, SEOConfig, CustomPageSettings } from "../types";

interface AdminConsoleProps {
  onClose: () => void;
  onLogout?: () => void;
  studioInfo: StudioInfo;
  setStudioInfo: (info: StudioInfo) => void;
  services: ServiceItem[];
  setServices: (services: ServiceItem[]) => void;
  portfolio: PortfolioItem[];
  setPortfolio: (items: PortfolioItem[]) => void;
  videos: VideoItem[];
  setVideos: (videos: VideoItem[]) => void;
  testimonials: TestimonialItem[];
  setTestimonials: (testimonials: TestimonialItem[]) => void;
  submissions: ContactSubmission[];
  setSubmissions: (submissions: ContactSubmission[]) => void;
  seo: SEOConfig;
  setSeo: (seo: SEOConfig) => void;
  sectionVisibility: Record<string, boolean>;
  setSectionVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  portfolioAspect: string;
  setPortfolioAspect: (aspect: string) => void;
  customSettings: CustomPageSettings;
  setCustomSettings: (settings: CustomPageSettings) => void;
}

export default function AdminConsole({
  onClose,
  onLogout,
  studioInfo,
  setStudioInfo,
  services,
  setServices,
  portfolio,
  setPortfolio,
  videos,
  setVideos,
  testimonials,
  setTestimonials,
  submissions,
  setSubmissions,
  seo,
  setSeo,
  sectionVisibility,
  setSectionVisibility,
  portfolioAspect,
  setPortfolioAspect,
  customSettings,
  setCustomSettings
}: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "homepage" | "services" | "portfolio" | "videos" | "leads" | "settings">("analytics");
  const [isCroppingProj, setIsCroppingProj] = useState(false);
  const [isCroppingVid, setIsCroppingVid] = useState(false);
  
  const [localSettings, setLocalSettings] = useState<CustomPageSettings>(() => ({ ...customSettings }));
  
  React.useEffect(() => {
    setLocalSettings({ ...customSettings });
  }, [customSettings]);
  
  // Local notification banners
  const [successMsg, setSuccessMsg] = useState("");
  const triggerSuccessBanner = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Form states
  const [newSrv, setNewSrv] = useState({
    title: "",
    category: "Website Development",
    desc: "",
    features: "",
    priceRange: ""
  });

  const [newProj, setNewProj] = useState({
    title: "",
    category: "Website Design",
    client: "",
    year: "2026",
    desc: "",
    image: "",
    addOnText: ""
  });

  const [newVid, setNewVid] = useState({
    title: "",
    type: "reels",
    thumbnail: "",
    duration: "1:00",
    url: "",
    viewsCount: "10K views"
  });

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Services actions
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrv.title || !newSrv.desc) return;

    if (editingServiceId) {
      const updated = services.map(s => {
        if (s.id === editingServiceId) {
          return {
            ...s,
            title: newSrv.title,
            category: newSrv.category,
            desc: newSrv.desc,
            features: newSrv.features.split(",").map(f => f.trim()).filter(Boolean),
            priceRange: newSrv.priceRange || undefined
          };
        }
        return s;
      });
      setServices(updated);
      setEditingServiceId(null);
      setNewSrv({ title: "", category: "Website Development", desc: "", features: "", priceRange: "" });
      triggerSuccessBanner("Capability updated successfully.");
    } else {
      const item: ServiceItem = {
        id: `srv-${Date.now()}`,
        icon: "Code", // Default icon
        title: newSrv.title,
        category: newSrv.category,
        desc: newSrv.desc,
        features: newSrv.features.split(",").map(f => f.trim()).filter(Boolean),
        priceRange: newSrv.priceRange || undefined
      };
      setServices([...services, item]);
      setNewSrv({ title: "", category: "Website Development", desc: "", features: "", priceRange: "" });
      triggerSuccessBanner("New custom service added.");
    }
  };

  const handleStartEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setNewSrv({
      title: srv.title,
      category: srv.category,
      desc: srv.desc,
      features: srv.features.join(", "),
      priceRange: srv.priceRange || ""
    });
    triggerSuccessBanner("Loaded capability specs into editing form.");
  };

  const handleCancelEditService = () => {
    setEditingServiceId(null);
    setNewSrv({ title: "", category: "Website Development", desc: "", features: "", priceRange: "" });
  };

  const handleDeleteService = (id: string) => {
    if (editingServiceId === id) {
      handleCancelEditService();
    }
    setServices(services.filter(s => s.id !== id));
    triggerSuccessBanner("Capability removed.");
  };

  // Portfolio actions
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title || !newProj.desc) return;

    if (editingProjectId) {
      const updated = portfolio.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: newProj.title,
            category: newProj.category,
            client: newProj.client || "Bespoke Private Client",
            year: newProj.year,
            desc: newProj.desc,
            image: newProj.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
            addOnText: newProj.addOnText
          };
        }
        return p;
      });
      setPortfolio(updated);
      setEditingProjectId(null);
      setNewProj({ title: "", category: "Website Design", client: "", year: "2026", desc: "", image: "", addOnText: "" });
      triggerSuccessBanner("Project gallery item updated successfully.");
    } else {
      const item: PortfolioItem = {
        id: `port-${Date.now()}`,
        title: newProj.title,
        category: newProj.category,
        client: newProj.client || "Bespoke Private Client",
        year: newProj.year,
        desc: newProj.desc,
        image: newProj.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
        featured: false,
        addOnText: newProj.addOnText
      };
      setPortfolio([...portfolio, item]);
      setNewProj({ title: "", category: "Website Design", client: "", year: "2026", desc: "", image: "", addOnText: "" });
      triggerSuccessBanner("Project uploaded to Curated Gallery successfully.");
    }
  };

  const handleStartEditProject = (proj: PortfolioItem) => {
    setEditingProjectId(proj.id);
    setNewProj({
      title: proj.title,
      category: proj.category,
      client: proj.client || "",
      year: proj.year || "2026",
      desc: proj.desc,
      image: proj.image,
      addOnText: proj.addOnText || ""
    });
    triggerSuccessBanner("Loaded gallery asset specs into editing form.");
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setNewProj({ title: "", category: "Website Design", client: "", year: "2026", desc: "", image: "", addOnText: "" });
  };

  const handleDeleteProject = (id: string) => {
    if (editingProjectId === id) {
      handleCancelEditProject();
    }
    setPortfolio(portfolio.filter(p => p.id !== id));
    triggerSuccessBanner("Project removed from archive.");
  };

  // Video actions
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVid.title || !newVid.url) return;
    const item: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVid.title,
      type: newVid.type as any,
      thumbnail: newVid.thumbnail || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
      duration: newVid.duration,
      url: newVid.url,
      viewsCount: newVid.viewsCount
    };
    setVideos([...videos, item]);
    setNewVid({ title: "", type: "reels", thumbnail: "", duration: "1:00", url: "", viewsCount: "10K views" });
    triggerSuccessBanner("Video asset loaded successfully.");
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    triggerSuccessBanner("Video asset deleted.");
  };

  // Submissions leads actions
  const toggleSubmissionStatus = (id: string) => {
    setSubmissions(submissions.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: sub.status === "unread" ? "reviewed" : "unread" };
      }
      return sub;
    }));
    triggerSuccessBanner("Submission status updated.");
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    triggerSuccessBanner("Inquiry removed from registry.");
  };

  // Info save
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Re-verify object is complete
    setStudioInfo({ ...studioInfo });
    triggerSuccessBanner("Brand Copy customizations saved securely.");
  };

  // Analytics helper metrics
  const unreadLeadsCount = submissions.filter(s => s.status === "unread").length;

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 bg-studio-black/95 z-[200] flex items-center justify-center p-4 overflow-hidden">
      
      {/* Container Frame */}
      <div className="w-full max-w-6xl h-[90vh] bg-studio-zinc border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-left">
        
        {/* Upper Brand Control row */}
        <div className="p-6 border-b border-white/5 bg-studio-black/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-studio-gold flex items-center justify-center text-studio-black shadow">
              <Layers className="w-5 h-5 font-extrabold" />
            </div>
            <div>
              <h3 className="font-display font-black text-white text-base leading-none">
                EDWANIK CORE CONTROL
              </h3>
              <span className="text-[9px] tracking-widest text-[#FFD700] uppercase font-bold mt-1 block">
                ADMIN CONSOLE OVERLAY • SECURE SESSION
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {successMsg && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/15 rounded-full text-[10px] uppercase tracking-wider text-emerald-400 font-bold animate-fade-in shadow">
                <CheckCircle className="w-3.5 h-3.5" />
                {successMsg}
              </div>
            )}
            
            {onLogout && (
              <button
                id="admin-logout-btn"
                onClick={onLogout}
                className="px-3.5 py-1.5 border border-red-500/20 hover:border-red-500 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg text-[9px] uppercase tracking-widest font-bold transition duration-300 flex items-center gap-1.5 cursor-pointer"
                title="Lock and Log Out"
              >
                Logout / Lock
              </button>
            )}

            <button
              id="admin-panel-close-btn"
              onClick={onClose}
              className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic grid split (Sidebar + Viewports) */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* TAB SIDEBAR */}
          <aside className="w-48 border-r border-white/5 bg-studio-black/30 p-4 flex flex-col justify-between shrink-0">
            <ul className="space-y-1">
              {[
                { id: "analytics", label: "Analytics Hub", icon: BarChart3 },
                { id: "homepage", label: "Brand Copy", icon: Edit },
                { id: "services", label: "Capabilities", icon: Layers },
                { id: "portfolio", label: "Portfolio Grid", icon: BookOpen },
                { id: "videos", label: "Motion Reels", icon: Video },
                { id: "leads", label: "Client Inquiries", icon: Users },
                { id: "settings", label: "Page Styles & Settings", icon: Sliders }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      id={`admin-tab-trigger-${tab.id}`}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full px-3.5 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center gap-3 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-studio-gold text-studio-black"
                          : "text-gray-400 hover:text-white hover:bg-white/3"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                      {tab.id === "leads" && unreadLeadsCount > 0 && (
                        <span className="ml-auto w-4.5 h-4.5 rounded-full bg-studio-gold text-studio-black flex items-center justify-center font-mono font-black text-[8px] tracking-normal border border-studio-black shadow">
                          {unreadLeadsCount}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Quick telemetry watermark */}
            <div className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">
              Vite+React 19 Pro
            </div>
          </aside>

          {/* VIEWPORT CONTROLLER CONTENT */}
          <main className="flex-1 overflow-y-auto p-8 bg-studio-slate/40">
            
            {/* TAB: ANALYTICAL METRICS */}
            {activeTab === "analytics" && (
              <div id="tab-analytics" className="space-y-8 animate-fade-in">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    ANALYTICS ENGINE
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Real-time engagement telemetry generated via client session state logs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Metric 1 */}
                  <div className="p-5 bg-studio-zinc border border-white/5 rounded-xl">
                    <span className="text-[9px] text-[#FFD700] tracking-widest font-bold uppercase block">Direct Inquiries</span>
                    <span className="block font-display font-black text-white text-3xl mt-1.5">{submissions.length}</span>
                    <span className="text-[9px] text-emerald-400 font-mono font-bold mt-1 block">● Active pipeline</span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-5 bg-studio-zinc border border-white/5 rounded-xl">
                    <span className="text-[9px] text-gray-500 tracking-widest font-bold uppercase block">Capabilities Live</span>
                    <span className="block font-display font-black text-white text-3xl mt-1.5">{services.length}</span>
                    <span className="text-[9px] text-studio-gold font-mono font-semibold mt-1 block">Luxury category tags</span>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-5 bg-studio-zinc border border-white/5 rounded-xl">
                    <span className="text-[9px] text-gray-500 tracking-widest font-bold uppercase block">Gallery Assets</span>
                    <span className="block font-display font-black text-white text-3xl mt-1.5">{portfolio.length}</span>
                    <span className="text-[9px] text-[#FFD700] font-mono font-semibold mt-1 block">Featured & filtered</span>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-5 bg-studio-zinc border border-white/5 rounded-xl">
                    <span className="text-[9px] text-gray-500 tracking-widest font-bold uppercase block">Cinematic Clips</span>
                    <span className="block font-display font-black text-white text-3xl mt-1.5">{videos.length}</span>
                    <span className="text-[9px] text-pink-500 font-mono font-semibold mt-1 block">Full aspect embeds</span>
                  </div>
                </div>

                {/* Submissions summary preview */}
                <div className="p-6 bg-studio-zinc rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Recent submission logs ({submissions.length})
                    </h5>
                    <button 
                      onClick={() => setActiveTab("leads")}
                      className="text-[10px] text-studio-gold font-bold uppercase tracking-widest hover:text-white transition"
                    >
                      Launch Registry
                    </button>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 text-xs">
                      No customer interactions registered. Submit contact forms to log real entries!
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {submissions.slice(0, 3).map((sub, idx) => (
                        <div key={idx} className="p-4 bg-studio-black/40 rounded-xl flex items-center justify-between border border-white/5 text-xs text-left">
                          <div>
                            <span className="font-bold text-white pr-2">{sub.name}</span>
                            <span className="px-2 py-0.5 bg-studio-gold/10 text-studio-gold rounded text-[8px] uppercase tracking-wider font-semibold">
                              {sub.service}
                            </span>
                            <p className="text-gray-400 mt-1 italic max-w-md select-all">&ldquo;{sub.message}&rdquo;</p>
                          </div>
                          <span className="font-mono text-[9px] text-[#FFD700] uppercase font-bold">{sub.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: HOMEPAGE SETUPS & COPY */}
            {activeTab === "homepage" && (
              <form id="tab-homepage" onSubmit={handleSaveInfo} className="space-y-6 animate-fade-in">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    HOMEPAGE & BRAND COPY CUSTOMIZATIONS
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Customize default text headers and brand descriptions representing Edwanik Studio.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Studio Brand Headline Name</label>
                    <input 
                      type="text" 
                      value={studioInfo.brandName}
                      onChange={(e) => setStudioInfo({ ...studioInfo, brandName: e.target.value })}
                      className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Primary Slogan Headline (Hero section)</label>
                    <input 
                      type="text" 
                      value={studioInfo.slogan}
                      onChange={(e) => setStudioInfo({ ...studioInfo, slogan: e.target.value })}
                      className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Tagline Sub-Badge Header</label>
                    <input 
                      type="text" 
                      value={studioInfo.tagline}
                      onChange={(e) => setStudioInfo({ ...studioInfo, tagline: e.target.value })}
                      className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">About Segment Paragraph</label>
                    <textarea 
                      rows={4}
                      value={studioInfo.aboutDescription}
                      onChange={(e) => setStudioInfo({ ...studioInfo, aboutDescription: e.target.value })}
                      className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div>
                      <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Studio Vision Statement</label>
                      <textarea 
                        rows={3}
                        value={studioInfo.vision}
                        onChange={(e) => setStudioInfo({ ...studioInfo, vision: e.target.value })}
                        className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Studio Mission Statement</label>
                      <textarea 
                        rows={3}
                        value={studioInfo.mission}
                        onChange={(e) => setStudioInfo({ ...studioInfo, mission: e.target.value })}
                        className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3.5 text-white focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <div>
                      <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Studio Operational Hours / Active Time</label>
                      <input 
                        type="text" 
                        value={studioInfo.phone}
                        onChange={(e) => setStudioInfo({ ...studioInfo, phone: e.target.value })}
                        placeholder="e.g. 10:00 AM - 07:00 PM IST"
                        className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">HQ Mail Address</label>
                      <input 
                        type="text" 
                        value={studioInfo.email}
                        onChange={(e) => setStudioInfo({ ...studioInfo, email: e.target.value })}
                        className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">WhatsApp Number Prefix</label>
                      <input 
                        type="text" 
                        value={studioInfo.whatsappNumber}
                        onChange={(e) => setStudioInfo({ ...studioInfo, whatsappNumber: e.target.value })}
                        placeholder="e.g. 919876543210"
                        className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Custom Layout options & visibility section */}
                <div className="pt-8 border-t border-white/5 space-y-6 text-left">
                  <div>
                    <h5 className="text-[11px] font-display font-black tracking-wider text-[#FFD700] uppercase mb-1">
                      LAYOUT STYLING & SECTION VISIBILITY CONTROLS
                    </h5>
                    <p className="text-gray-400 text-[10px]">Enable or disable main sections of the website and customize image layouts.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Column 1: SECTION TOGGLES */}
                    <div className="p-5 bg-studio-black/35 border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-gray-400 tracking-widest font-black uppercase block border-b border-white/5 pb-2">Toggle Section Visibilities</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "about", label: "About Narrative" },
                          { id: "services", label: "Our Capabilities" },
                          { id: "portfolio", label: "Portfolio Grid" },
                          { id: "videos", label: "Motion Cinematics" },
                          { id: "testimonials", label: "Client Testimonials" },
                          { id: "contact", label: "Inquiries Channel" }
                        ].map((item) => (
                          <label key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-studio-zinc/60 border border-white/5 hover:border-white/10 select-none cursor-pointer transition">
                            <span className="text-[10px] text-gray-300 font-semibold">{item.label}</span>
                            <input 
                              type="checkbox"
                              checked={sectionVisibility[item.id] !== false}
                              onChange={(e) => {
                                setSectionVisibility(prev => ({
                                  ...prev,
                                  [item.id]: e.target.checked
                                }));
                                triggerSuccessBanner(`Visibility updated for '${item.label}'.`);
                              }}
                              className="w-3.5 h-3.5 rounded border-white/20 text-[#FFD700] bg-studio-zinc focus:ring-0 cursor-pointer accent-[#FFD700]"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: CUSTOM ASPECT CONTROLS */}
                    <div className="p-5 bg-studio-black/35 border border-white/5 rounded-2xl space-y-4 text-left">
                      <span className="text-[9px] text-gray-400 tracking-widest font-black uppercase block border-b border-white/5 pb-2">Portfolio Aspect Ratio Presets</span>
                      
                      <div>
                        <label className="block text-[8px] text-gray-500 uppercase tracking-widest font-black mb-1.5">Aesthetic Crop Frame Selection</label>
                        <select 
                          value={portfolioAspect}
                          onChange={(e) => {
                            setPortfolioAspect(e.target.value);
                            triggerSuccessBanner(`Aesthetic photo crop frame adjusted to ${e.target.value.replace(/_/g, " ").toUpperCase()}`);
                          }}
                          className="w-full text-xs bg-studio-zinc border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer"
                        >
                          <option value="natural">Balanced Natural Frame (Fitted - Best for Mixed Portrait Assets)</option>
                          <option value="full_size">Natural Full Height (Absolute 100% Uncropped - Best for long flyers & banners)</option>
                          <option value="standard_4_3">Standard 4:3 Box Frame (Classic grid layout)</option>
                          <option value="cinematic_16_9">Cinematic 16:9 Aspect Frame (Widescreen styling)</option>
                          <option value="square_1_1">Aspect Square 1:1 Frame (Instagram-themed Uniform grid)</option>
                        </select>
                      </div>

                      <p className="text-[10px] text-gray-500 leading-relaxed italic border-t border-white/5 pt-3 mt-1.5">
                        Tip: Selecting the &ldquo;Original Full Shape&rdquo; preset triggers pure, uncropped rendering of flyer images. Ideal for custom height assets.
                      </p>
                    </div>

                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button
                    id="save-homepage-copy-btn"
                    type="submit"
                    className="py-3 px-8 bg-studio-gold text-studio-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition duration-300 hover:scale-[1.02] flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Copy Customizations
                  </button>
                </div>
              </form>
            )}

            {/* TAB: MANAGE SERVICES */}
            {activeTab === "services" && (
              <div id="tab-services" className="space-y-8 animate-fade-in bg-transparent">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    CAPABILITIES ARCHIVE MANAGER
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Define core luxury digital services and active conversion features.</p>
                </div>

                {/* Left Form: Add service */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  <form onSubmit={handleAddService} className="lg:col-span-4 p-5 bg-studio-zinc border border-white/5 rounded-xl space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                        {editingServiceId ? "Update Capability" : "Load Custom Capability"}
                      </h5>
                      {editingServiceId && (
                        <button
                          type="button"
                          onClick={handleCancelEditService}
                          className="text-[9px] text-[#FFD700] hover:text-white font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded cursor-pointer transition"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Title</label>
                      <input 
                        type="text"
                        value={newSrv.title}
                        onChange={(e) => setNewSrv({ ...newSrv, title: e.target.value })}
                        placeholder="e.g. Brand Audits"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Category</label>
                      <select 
                        value={newSrv.category}
                        onChange={(e) => setNewSrv({ ...newSrv, category: e.target.value })}
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="Branding">Branding</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Photography">Photography</option>
                        <option value="Videography">Videography</option>
                        <option value="Social Media Management">Social Media Management</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Overview Description</label>
                      <textarea 
                        rows={3}
                        value={newSrv.desc}
                        onChange={(e) => setNewSrv({ ...newSrv, desc: e.target.value })}
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Key highlights (comma separated)</label>
                      <input 
                        type="text"
                        value={newSrv.features}
                        onChange={(e) => setNewSrv({ ...newSrv, features: e.target.value })}
                        placeholder="Bullet 1, Bullet 2, Bullet 3"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Price Tier Range (Investments)</label>
                      <input 
                        type="text"
                        value={newSrv.priceRange}
                        onChange={(e) => setNewSrv({ ...newSrv, priceRange: e.target.value })}
                        placeholder="starting at $2,000"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <button 
                      id="save-new-service-btn"
                      type="submit"
                      className={`w-full py-2.5 text-studio-black font-extrabold text-[9px] uppercase tracking-widest rounded-lg transition duration-300 cursor-pointer ${
                        editingServiceId ? "bg-emerald-400 hover:bg-emerald-500 text-black font-black" : "bg-studio-gold hover:bg-studio-gold-hover"
                      }`}
                    >
                      {editingServiceId ? "Apply Capability Updates" : "Publish Capability"}
                    </button>
                  </form>

                  {/* Right List: Display current services */}
                  <div className="lg:col-span-8 space-y-4">
                    <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Current Capabilities active ({services.length})
                    </h5>

                    <div className="grid grid-cols-1 gap-3">
                      {services.map((srv) => (
                        <div 
                          key={srv.id} 
                          className={`p-4 border rounded-xl flex items-center justify-between group transition duration-300 ${
                            editingServiceId === srv.id 
                              ? "bg-studio-gold/5 border-studio-gold shadow-lg shadow-studio-gold/5" 
                              : "bg-studio-zinc border-white/5 hover:border-white/10"
                          }`}
                        >
                          <div className="text-left">
                            <span className="text-[8px] text-[#FFD700] uppercase font-bold tracking-widest block">{srv.category}</span>
                            <span className="font-bold text-sm block mt-0.5">{srv.title}</span>
                            <p className="text-gray-400 text-xs mt-1 leading-relaxed max-w-lg line-clamp-2">{srv.desc}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <button
                              type="button"
                              onClick={() => handleStartEditService(srv)}
                              className="p-2 bg-studio-gold/10 hover:bg-studio-gold text-studio-gold hover:text-studio-black rounded-lg transition cursor-pointer"
                              title="Edit Capability"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              id={`delete-service-btn-${srv.id}`}
                              onClick={() => handleDeleteService(srv.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition shrink-0 cursor-pointer"
                              title="Delete Capability"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: PORTFOLIO SHOWCASE */}
            {activeTab === "portfolio" && (
              <div id="tab-portfolio" className="space-y-8 animate-fade-in">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    FEATURED GALLERY ARCHIVE
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Upload new visual assets or custom product frames directly to coordinates.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Upload Form */}
                  <form onSubmit={handleAddProject} className="lg:col-span-4 p-5 bg-studio-zinc border border-white/5 rounded-xl space-y-4 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                        {editingProjectId ? "Update Creative Asset" : "Upload Creative Asset"}
                      </h5>
                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={handleCancelEditProject}
                          className="text-[9px] text-[#FFD700] hover:text-white font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded cursor-pointer transition"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Project Name *</label>
                      <input 
                        type="text"
                        value={newProj.title}
                        onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                        placeholder="e.g. Aurelia Chronos Edition"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Category *</label>
                      <select 
                        value={newProj.category}
                        onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Branding">Branding</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Posters">Posters</option>
                        <option value="Flyers">Flyers</option>
                        <option value="Photography">Photography</option>
                        <option value="Videography">Videography</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Social Media Designs">Social Media Designs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Optional Add-On Text (Highlight Tag)</label>
                      <input 
                        type="text"
                        value={newProj.addOnText || ""}
                        onChange={(e) => setNewProj({ ...newProj, addOnText: e.target.value })}
                        placeholder="e.g. 20% Off, New Year Edition, Custom Spec"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Client Business *</label>
                      <input 
                        type="text"
                        value={newProj.client}
                        onChange={(e) => setNewProj({ ...newProj, client: e.target.value })}
                        placeholder="e.g. Aurelia Watches Ltd"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Thumbnail Cover (Upload File or Paste Link)</label>
                      <div className="flex flex-col gap-2">
                        {/* Interactive File Input */}
                        <div className="relative border border-dashed border-white/10 hover:border-studio-gold rounded-xl p-3 bg-studio-black/30 flex flex-col items-center justify-center text-center group cursor-pointer transition duration-300">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setNewProj(prev => ({ ...prev, image: event.target!.result as string }));
                                    triggerSuccessBanner("Image loaded from file.");
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <Plus className="w-4 h-4 text-gray-400 group-hover:text-studio-gold transition duration-300 mb-1" />
                          <span className="text-[9px] text-gray-300 group-hover:text-white transition block font-bold">Upload Local Image</span>
                          <span className="text-[7px] text-gray-500 block">Drag & drop or browse</span>
                        </div>

                        {/* Text input alternative */}
                        <input 
                          type="text"
                          value={newProj.image}
                          onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                          placeholder="Or paste direct image URL address"
                          className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      {/* Preview Thumbnail */}
                      {newProj.image && !isCroppingProj && (
                        <div className="mt-2 space-y-2">
                          <div className="text-center rounded-lg overflow-hidden border border-white/10 aspect-video bg-studio-black relative">
                            <img src={newProj.image} alt="Upload preview" className="w-full h-full object-cover mx-auto" />
                            <button
                              type="button"
                              onClick={() => setNewProj(prev => ({ ...prev, image: "" }))}
                              className="absolute top-1.5 right-1.5 p-1 bg-studio-black/80 hover:bg-red-500 text-white rounded-full transition z-20 cursor-pointer"
                              title="Remove preview"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setIsCroppingProj(true)}
                            className="w-full py-2 bg-studio-gold/15 hover:bg-studio-gold text-studio-gold hover:text-studio-black border border-studio-gold/25 hover:border-studio-gold rounded-lg text-[9px] uppercase tracking-widest font-bold transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Crop className="w-3.5 h-3.5" />
                            Specify Size & Crop Interactive Preset
                          </button>
                        </div>
                      )}

                      {/* Size/Crop Custom Workspace */}
                      {newProj.image && isCroppingProj && (
                        <div className="mt-2">
                          <ImageCropper 
                            id="proj-cover"
                            src={newProj.image}
                            onCropSave={(croppedBase64) => {
                              setNewProj(prev => ({ ...prev, image: croppedBase64 }));
                              setIsCroppingProj(false);
                              triggerSuccessBanner("Custom sized and cropped image applied.");
                            }}
                            onCancel={() => setIsCroppingProj(false)}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Description Specs</label>
                      <textarea 
                        rows={3}
                        value={newProj.desc}
                        onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })}
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <button 
                      id="save-new-art-btn"
                      type="submit"
                      className={`w-full py-2.5 text-studio-black font-extrabold text-[9px] uppercase tracking-widest rounded-lg transition duration-300 cursor-pointer ${
                        editingProjectId ? "bg-emerald-400 hover:bg-emerald-500 text-black font-black" : "bg-studio-gold hover:bg-studio-gold-hover"
                      }`}
                    >
                      {editingProjectId ? "Apply Asset Updates" : "Publish Gallery Frame"}
                    </button>
                  </form>

                  {/* List displays */}
                  <div className="lg:col-span-8 space-y-4">
                    <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Current Gallery Listings ({portfolio.length})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolio.map((port) => (
                        <div 
                          key={port.id} 
                          className={`p-3 border rounded-xl flex gap-3 items-center group transition duration-300 ${
                            editingProjectId === port.id 
                              ? "bg-studio-gold/5 border-studio-gold shadow-lg shadow-studio-gold/5" 
                              : "bg-studio-zinc border-white/5 hover:border-white/10"
                          }`}
                        >
                          <img 
                            src={port.image} 
                            alt={port.title} 
                            className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="flex-grow text-left overflow-hidden">
                            <span className="text-[7px] text-[#FFD700] uppercase font-bold block">{port.category}</span>
                            <span className="font-bold text-xs block text-white truncate">{port.title}</span>
                            <span className="text-[9px] text-gray-500 font-bold block truncate">{port.client}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <button
                              type="button"
                              onClick={() => handleStartEditProject(port)}
                              className="p-1.5 bg-studio-gold/10 hover:bg-studio-gold text-studio-gold hover:text-studio-black rounded-lg transition cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`delete-project-btn-${port.id}`}
                              onClick={() => handleDeleteProject(port.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition shrink-0 cursor-pointer"
                              title="Remove Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: MOTION / VIDEO ASSETS */}
            {activeTab === "videos" && (
              <div id="tab-videos" className="space-y-8 animate-fade-in">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    MOTION CINEMATICS FILES
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Update Reels, YouTube logs, or high-fidelity commercial shoots.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Upload Form */}
                  <form onSubmit={handleAddVideo} className="lg:col-span-4 p-5 bg-studio-zinc border border-white/5 rounded-xl space-y-4 text-left">
                    <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-2">
                      Queue Cinematic Record
                    </h5>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Clip Display Title *</label>
                      <input 
                        type="text"
                        value={newVid.title}
                        onChange={(e) => setNewVid({ ...newVid, title: e.target.value })}
                        placeholder="e.g. Luxury Coffee Commercial"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Stream Type *</label>
                      <select 
                        value={newVid.type}
                        onChange={(e) => setNewVid({ ...newVid, type: e.target.value as any })}
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="reels">Instagram Reels</option>
                        <option value="youtube">YouTube Videos</option>
                        <option value="commercial">Commercial Shoots</option>
                        <option value="promotional">Promotional Videos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Secure Video Embed URL *</label>
                      <input 
                        type="text"
                        value={newVid.url}
                        onChange={(e) => setNewVid({ ...newVid, url: e.target.value })}
                        placeholder="YouTube watch or embed URL"
                        className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Thumbnail Cover (Upload File or Paste Link)</label>
                      <div className="flex flex-col gap-2">
                        {/* Interactive File Input */}
                        <div className="relative border border-dashed border-white/10 hover:border-studio-gold rounded-xl p-3 bg-studio-black/30 flex flex-col items-center justify-center text-center group cursor-pointer transition duration-300">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setNewVid(prev => ({ ...prev, thumbnail: event.target!.result as string }));
                                    triggerSuccessBanner("Thumbnail loaded from file.");
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <Plus className="w-4 h-4 text-gray-400 group-hover:text-studio-gold transition duration-300 mb-1" />
                          <span className="text-[9px] text-gray-300 group-hover:text-white transition block font-bold">Upload Local Cover</span>
                          <span className="text-[7px] text-gray-500 block">Drag & drop or browse</span>
                        </div>

                        {/* Text input alternative */}
                        <input 
                          type="text"
                          value={newVid.thumbnail}
                          onChange={(e) => setNewVid({ ...newVid, thumbnail: e.target.value })}
                          placeholder="Or paste direct preview URL address"
                          className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      {/* Preview Thumbnail */}
                      {newVid.thumbnail && !isCroppingVid && (
                        <div className="mt-2 space-y-2">
                          <div className="text-center rounded-lg overflow-hidden border border-white/10 aspect-video bg-studio-black relative">
                            <img src={newVid.thumbnail} alt="Upload preview" className="w-full h-full object-cover mx-auto" />
                            <button
                              type="button"
                              onClick={() => setNewVid(prev => ({ ...prev, thumbnail: "" }))}
                              className="absolute top-1.5 right-1.5 p-1 bg-studio-black/80 hover:bg-red-500 text-white rounded-full transition z-20 cursor-pointer"
                              title="Remove preview"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setIsCroppingVid(true)}
                            className="w-full py-2 bg-studio-gold/15 hover:bg-studio-gold text-studio-gold hover:text-studio-black border border-studio-gold/25 hover:border-studio-gold rounded-lg text-[9px] uppercase tracking-widest font-bold transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Crop className="w-3.5 h-3.5" />
                            Specify Size & Crop Interactive Preset
                          </button>
                        </div>
                      )}

                      {/* Size/Crop Custom Workspace */}
                      {newVid.thumbnail && isCroppingVid && (
                        <div className="mt-2">
                          <ImageCropper 
                            id="vid-cover"
                            src={newVid.thumbnail}
                            onCropSave={(croppedBase64) => {
                              setNewVid(prev => ({ ...prev, thumbnail: croppedBase64 }));
                              setIsCroppingVid(false);
                              triggerSuccessBanner("Custom sized and cropped cover applied.");
                            }}
                            onCancel={() => setIsCroppingVid(false)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Duration</label>
                        <input 
                          type="text"
                          value={newVid.duration}
                          onChange={(e) => setNewVid({ ...newVid, duration: e.target.value })}
                          placeholder="e.g. 1:30"
                          className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Metric Count</label>
                        <input 
                          type="text"
                          value={newVid.viewsCount}
                          onChange={(e) => setNewVid({ ...newVid, viewsCount: e.target.value })}
                          placeholder="e.g. 100K views"
                          className="w-full text-[11px] bg-studio-black border border-white/5 focus:border-studio-gold rounded-lg px-3 py-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      id="save-new-video-btn"
                      type="submit"
                      className="w-full py-2.5 bg-studio-gold hover:bg-studio-gold-hover text-studio-black font-extrabold text-[9px] uppercase tracking-widest rounded-lg transition duration-300"
                    >
                      Publish Motion Clip
                    </button>
                  </form>

                  {/* List displays */}
                  <div className="lg:col-span-8 space-y-4">
                    <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Current Motion Assets active ({videos.length})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videos.map((vid) => (
                        <div key={vid.id} className="p-3 bg-studio-zinc border border-white/5 rounded-xl flex gap-3 items-center group">
                          <img 
                            src={vid.thumbnail} 
                            alt={vid.title} 
                            className="w-16 h-9 object-cover rounded-md border border-white/10 shrink-0"
                          />
                          <div className="flex-grow text-left overflow-hidden">
                            <span className="text-[7px] text-[#FFD700] uppercase font-bold block">{vid.type}</span>
                            <span className="font-bold text-xs block text-white truncate">{vid.title}</span>
                            <span className="text-[9px] text-gray-500 font-mono font-bold block">{vid.duration} • {vid.viewsCount}</span>
                          </div>

                          <button
                            id={`delete-video-btn-${vid.id}`}
                            onClick={() => handleDeleteVideo(vid.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition shrink-0 ml-2"
                            title="Remove Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: VIEW LEADS REGISTER */}
            {activeTab === "leads" && (
              <div id="tab-leads" className="space-y-6 animate-fade-in text-left">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-[#FFD700] uppercase mb-1">
                    CLIENT SUBMISSION REGISTRY
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Real-time leads captured from the luxury front contact submission pages.</p>
                </div>

                {submissions.length === 0 ? (
                  <div className="p-12 text-center bg-studio-zinc border border-white/5 rounded-xl">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h5 className="text-white font-bold text-sm">Registry is entirely clear.</h5>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed max-w-sm mx-auto">
                      Whenever visitors submit inquiries via the contact form, their name, service criteria, phone and custom parameters will catalog here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((sub) => (
                      <div 
                        id={`lead-panel-${sub.id}`}
                        key={sub.id} 
                        className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                          sub.status === "unread" 
                            ? "bg-studio-black border-studio-gold/20" 
                            : "bg-studio-zinc/60 border-white/5"
                        }`}
                      >
                        {/* Status top floating markers */}
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-studio-gold opacity-0 border-r" />

                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div>
                            {/* Contact Details */}
                            <span className="px-2.5 py-1 bg-studio-gold/10 border border-studio-gold/20 text-studio-gold font-bold text-[8px] uppercase tracking-widest rounded-md">
                              {sub.service}
                            </span>
                            <h4 className="font-display font-black text-white text-base mt-2.5">{sub.name}</h4>
                            
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-gray-500 mt-2 font-mono">
                              <span>Mail: <strong className="text-gray-300 font-bold select-all">{sub.email}</strong></span>
                              {sub.phone && <span>Tel: <strong className="text-gray-300 font-bold select-all">{sub.phone}</strong></span>}
                              <span>Submitted: <strong className="text-gray-400">{sub.submittedAt.split("T")[0]}</strong></span>
                            </div>
                          </div>

                          {/* Quick Interactive status controls */}
                          <div className="flex gap-2 shrink-0">
                            <button
                              id={`mark-reviewed-btn-${sub.id}`}
                              onClick={() => toggleSubmissionStatus(sub.id)}
                              className={`px-3 py-2 rounded-xl text-[9px] font-bold tracking-widest uppercase transition ${
                                sub.status === "unread"
                                  ? "bg-studio-gold/10 text-studio-gold border border-studio-gold/25 hover:bg-studio-gold hover:text-studio-black"
                                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
                              }`}
                            >
                              {sub.status === "unread" ? "Mark Reviewed" : "Mark Unread"}
                            </button>
                            <button
                              id={`delete-lead-btn-${sub.id}`}
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer specifications body */}
                        <div className="p-4 bg-studio-zinc border border-white/5 rounded-xl text-xs sm:text-sm mt-4 text-gray-300 leading-relaxed max-w-4xl border-l-[3px] border-l-studio-gold italic">
                          &ldquo;{sub.message}&rdquo;
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WEBPAGE CUSTOM STYLES & SETTINGS */}
            {activeTab === "settings" && (
              <form id="tab-settings" onSubmit={(e) => {
                e.preventDefault();
                setCustomSettings(localSettings);
                triggerSuccessBanner("Global webpage custom settings saved & updated live!");
              }} className="space-y-8 animate-fade-in text-left">
                <div>
                  <h4 className="text-sm font-display font-black tracking-widest text-studio-gold uppercase mb-1">
                    FULL WEBPAGE STYLES & CUSTOMIZATIONS
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Configure global theme aesthetics, typography accents, button copy, and contact form placeholders securely from this console.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Visual Theme & Overlays */}
                  <div className="space-y-6">
                    <div className="p-5 bg-studio-zinc border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-[#FFD700] tracking-widest font-black uppercase block border-b border-white/5 pb-2">Global Visual Theme</span>
                      
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Primary Color Accent Palette *</label>
                        <select 
                          value={localSettings.primaryAccent}
                          onChange={(e) => setLocalSettings({ ...localSettings, primaryAccent: e.target.value as any })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer"
                        >
                          <option value="cyan">Cyber Neon Cyan (Ocean #00f2fe x Deep #4facfe)</option>
                          <option value="gold">Luxury Warm Gold (Rich Gold #FFD700 x #FFF080)</option>
                          <option value="rose">Energetic Midnight Rose (Sizzling Pink #ff007f x Cyber Cyan)</option>
                          <option value="purple">Futuristic Neon Purple (Hyper Violet #A855F7 x Ocean Cyan)</option>
                          <option value="emerald">Lush Emerald Mint (Hyper Mint Green #10B981 x Sunset Gold)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Typography Vibe Style *</label>
                        <select 
                          value={localSettings.typographyStyle}
                          onChange={(e) => setLocalSettings({ ...localSettings, typographyStyle: e.target.value as any })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer"
                        >
                          <option value="modern">Sleek Inter Pro (Neo-Swiss Clean Rounded Sans)</option>
                          <option value="serif">Playfair Editorial (Elegant Classic Serif Headings)</option>
                          <option value="monospace">JetBrains Pro (Technical Brutalist Cybersecurity Mono)</option>
                          <option value="display">Space Grotesk (Tech-Forward Wide Display Sans)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-studio-black border border-white/5">
                        <div className="text-left">
                          <span className="text-[10px] text-gray-200 font-bold block">Scanline Grid Noise Backdrop Overlay</span>
                          <span className="text-[8px] text-gray-500 block leading-tight mt-0.5">Toggle high-fidelity cyber static & scanline grids on page.</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={localSettings.backgroundNoise}
                          onChange={(e) => setLocalSettings({ ...localSettings, backgroundNoise: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 text-[#FFD700] bg-studio-zinc focus:ring-0 cursor-pointer accent-[#FFD700]"
                        />
                      </div>
                    </div>

                    <div className="p-5 bg-studio-zinc border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-[#FFD700] tracking-widest font-black uppercase block border-b border-white/5 pb-2">Top Announcement Bar</span>
                      
                      <div className="flex items-center justify-between p-3 rounded-xl bg-studio-black border border-white/5 mb-3">
                        <div className="text-left">
                          <span className="text-[10px] text-gray-200 font-bold block">Display Floating Announcement Bar</span>
                          <span className="text-[8px] text-gray-500 block">Render a static banner above footer or header section.</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={localSettings.announcementEnabled}
                          onChange={(e) => setLocalSettings({ ...localSettings, announcementEnabled: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 text-[#FFD700] bg-studio-zinc focus:ring-0 cursor-pointer accent-[#FFD700]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Announcement Banner Text Copy *</label>
                        <input 
                          type="text" 
                          value={localSettings.announcementText}
                          onChange={(e) => setLocalSettings({ ...localSettings, announcementText: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          placeholder="e.g. 🎉 NEW FLYERS & BUSINESS POSTER DISCIPLINE ADDED - ORDER BESPOKE NOW"
                          disabled={!localSettings.announcementEnabled}
                        />
                      </div>
                    </div>

                    {/* Social Media Link settings */}
                    <div className="p-5 bg-studio-zinc border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-[#FFD700] tracking-widest font-black uppercase block border-b border-white/5 pb-2">Social Media Link Settings</span>
                      
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Instagram Profile URL</label>
                        <input 
                          type="url" 
                          value={localSettings.instagramUrl || ""}
                          onChange={(e) => setLocalSettings({ ...localSettings, instagramUrl: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          placeholder="e.g. https://www.instagram.com/edwanikstudio"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">YouTube Channel URL</label>
                        <input 
                          type="url" 
                          value={localSettings.youtubeUrl || ""}
                          onChange={(e) => setLocalSettings({ ...localSettings, youtubeUrl: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          placeholder="e.g. https://youtube.com/c/example"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">LinkedIn Profile URL</label>
                        <input 
                          type="url" 
                          value={localSettings.linkedinUrl || ""}
                          onChange={(e) => setLocalSettings({ ...localSettings, linkedinUrl: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          placeholder="e.g. https://linkedin.com/company/example"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Text Headings, CTA Labels & Forms */}
                  <div className="space-y-6">
                    <div className="p-5 bg-studio-zinc border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-[#FFD700] tracking-widest font-black uppercase block border-b border-white/5 pb-2">Hero & Nav Copy</span>
                      
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Hero Main Heading upper Accent (Badge) *</label>
                        <input 
                          type="text" 
                          value={localSettings.heroHeadingAccent}
                          onChange={(e) => setLocalSettings({ ...localSettings, heroHeadingAccent: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Primary Hero CTA *</label>
                          <input 
                            type="text" 
                            value={localSettings.heroCtaPrimaryLabel}
                            onChange={(e) => setLocalSettings({ ...localSettings, heroCtaPrimaryLabel: e.target.value })}
                            className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Secondary Hero CTA *</label>
                          <input 
                            type="text" 
                            value={localSettings.heroCtaSecondaryLabel}
                            onChange={(e) => setLocalSettings({ ...localSettings, heroCtaSecondaryLabel: e.target.value })}
                            className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Header Menu Inquire Button Label *</label>
                        <input 
                          type="text" 
                          value={localSettings.navContactButtonLabel}
                          onChange={(e) => setLocalSettings({ ...localSettings, navContactButtonLabel: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-5 bg-studio-zinc border border-white/5 rounded-2xl space-y-4">
                      <span className="text-[9px] text-[#FFD700] tracking-widest font-black uppercase block border-b border-white/5 pb-2">Client Inquiries Form Specifications</span>
                      
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Inquiries Section Title Line *</label>
                        <input 
                          type="text" 
                          value={localSettings.contactSectionTitle}
                          onChange={(e) => setLocalSettings({ ...localSettings, contactSectionTitle: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Inquiries Section Narrative Description *</label>
                        <textarea 
                          rows={2}
                          value={localSettings.contactSectionDesc}
                          onChange={(e) => setLocalSettings({ ...localSettings, contactSectionDesc: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-2 text-white focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Name Input Placeholder *</label>
                          <input 
                            type="text" 
                            value={localSettings.contactPlaceholderName}
                            onChange={(e) => setLocalSettings({ ...localSettings, contactPlaceholderName: e.target.value })}
                            className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Message Box Placeholder *</label>
                          <input 
                            type="text" 
                            value={localSettings.contactPlaceholderMsg}
                            onChange={(e) => setLocalSettings({ ...localSettings, contactPlaceholderMsg: e.target.value })}
                            className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Success Form Notification Description *</label>
                        <input 
                          type="text" 
                          value={localSettings.successSubmissionText}
                          onChange={(e) => setLocalSettings({ ...localSettings, successSubmissionText: e.target.value })}
                          className="w-full text-xs bg-studio-black border border-white/5 focus:border-studio-gold rounded-xl px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex pt-4 justify-end">
                  <button
                    id="save-custom-settings-btn"
                    type="submit"
                    className="px-8 py-4 bg-studio-gold hover:bg-studio-gold/80 text-studio-black font-extrabold text-[11px] uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-studio-gold/10"
                  >
                    <Save className="w-4 h-4" />
                    Save Webpage Customizations Live
                  </button>
                </div>
              </form>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

interface ImageCropperProps {
  id: string;
  src: string;
  onCropSave: (croppedBase64: string) => void;
  onCancel: () => void;
}

export function ImageCropper({ id, src, onCropSave, onCancel }: ImageCropperProps) {
  const [zoom, setZoom] = useState(1.0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:5' | '9:16'>('16:9');
  const [isProcessing, setIsProcessing] = useState(false);

  const getAspectClass = () => {
    switch(aspectRatio) {
      case '1:1': return 'aspect-square max-w-[200px]';
      case '4:5': return 'aspect-[4/5] max-w-[180px]';
      case '9:16': return 'aspect-[9/16] max-w-[160px]';
      default: return 'aspect-video max-w-xs';
    }
  };

  const handleApplyCrop = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = 800;
          let height = 450;
          if (aspectRatio === '1:1') {
            width = 600;
            height = 600;
          } else if (aspectRatio === '4:5') {
            width = 480;
            height = 600;
          } else if (aspectRatio === '9:16') {
            width = 360;
            height = 640;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setIsProcessing(false);
            return;
          }

          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, width, height);

          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = width / height;

          let drawWidth = width;
          let drawHeight = height;

          if (imgAspect > canvasAspect) {
            drawWidth = height * imgAspect;
          } else {
            drawHeight = width / imgAspect;
          }

          const initialX = (width - drawWidth) / 2;
          const initialY = (height - drawHeight) / 2;

          const scaleX = drawWidth * zoom;
          const scaleY = drawHeight * zoom;

          const translateX = (offsetX / 100) * width;
          const translateY = (offsetY / 100) * height;

          const finalX = initialX - (scaleX - drawWidth) / 2 + translateX;
          const finalY = initialY - (scaleY - drawHeight) / 2 + translateY;

          ctx.drawImage(img, finalX, finalY, scaleX, scaleY);
          const croppedBase64 = canvas.toDataURL("image/jpeg", 0.9);
          onCropSave(croppedBase64);
          setIsProcessing(false);
        };
        img.src = src;
      } catch (err) {
        console.error("Cropping failed:", err);
        setIsProcessing(false);
      }
    }, 150);
  };

  return (
    <div className="p-4 bg-studio-black/40 border border-white/5 rounded-xl space-y-4 text-left">
      <div className="flex items-center gap-2 mb-2">
        <Crop className="w-4 h-4 text-studio-gold" />
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffd700]">Size & Crop Controls</span>
      </div>

      <div className="flex justify-center bg-studio-black rounded-lg p-2 border border-white/10 overflow-hidden relative min-h-[160px] items-center">
        <div className={`overflow-hidden relative border border-white/5 bg-black rounded ${getAspectClass()} transition-all duration-300 w-full`}>
          <img 
            id={`crop-img-preview-${id}`}
            src={src} 
            alt="Source to crop"
            className="max-w-none origin-center" 
            style={{
              transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }} 
          />
        </div>
      </div>

      <div className="space-y-3 font-sans">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 pl-0.5">Crop Aspect Preset</span>
          <div className="grid grid-cols-4 gap-1">
            {(['16:9', '1:1', '4:5', '9:16'] as const).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                style={{ contentVisibility: "auto" }}
                className={`py-1 text-[9px] font-mono font-bold rounded border transition duration-300 cursor-pointer ${
                  aspectRatio === ratio
                    ? "border-studio-gold text-studio-gold bg-studio-gold/10"
                    : "border-white/5 text-gray-400 bg-white/5 hover:text-white"
                }`}
              >
                {ratio === '16:9' ? '16:9 HD' : ratio === '1:1' ? '1:1 Sq' : ratio === '4:5' ? '4:5 Ftr' : '9:16 Tall'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase mb-1 px-0.5">
            <span>Scale / Zoom</span>
            <span className="font-mono text-[9px] text-studio-gold">{(zoom * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn className="w-3.5 h-3.5 text-gray-500" />
            <input 
              type="range"
              min="1.0"
              max="3.0"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-studio-gold bg-white/5 rounded-lg h-1.5 outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase mb-1 px-0.5">
              <span>Shift X (Pan)</span>
              <span className="font-mono text-gray-500">{offsetX}px</span>
            </div>
            <input 
              type="range"
              min="-150"
              max="150"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value))}
              className="w-full accent-studio-gold bg-white/5 rounded-lg h-1"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase mb-1 px-0.5">
              <span>Shift Y (Pan)</span>
              <span className="font-mono text-gray-500">{offsetY}px</span>
            </div>
            <input 
              type="range"
              min="-150"
              max="150"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value))}
              className="w-full accent-studio-gold bg-white/5 rounded-lg h-1"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={handleApplyCrop}
            disabled={isProcessing}
            className="flex-1 py-1.5 bg-studio-gold hover:bg-yellow-500 text-studio-black font-extrabold text-[9px] uppercase tracking-widest rounded-lg transition duration-300 cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-studio-gold/10"
          >
            {isProcessing ? "Processing Crop..." : "Apply & Save Crop"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold text-[9px] uppercase tracking-widest rounded-lg transition duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
