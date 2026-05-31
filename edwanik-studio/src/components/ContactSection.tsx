/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mail, Clock, MessageSquare, Send, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { StudioInfo, ContactSubmission, CustomPageSettings } from "../types";

interface ContactSectionProps {
  studioInfo: StudioInfo;
  onNewSubmission: (submission: Omit<ContactSubmission, "id" | "submittedAt" | "status">) => void;
  customSettings?: CustomPageSettings;
}

export default function ContactSection({ studioInfo, onNewSubmission, customSettings }: ContactSectionProps) {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Logo Design",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Aligned list matching EDWANIK's uploaded flyers
  const servicesList = [
    "Logo Design",
    "Poster Design",
    "Banner Design",
    "Business Card Design",
    "Website Development",
    "Google Business Profile Setup",
    "AI-Powered Creative Design"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please populate all mandatory fields (Name, Email, Message).");
      return;
    }

    onNewSubmission({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    });

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "Logo Design",
      message: ""
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Direct WhatsApp dispatch template
  const getWhatsAppLink = () => {
    const text = `Hello Edwanik Studio, I am interested in custom services. Name: ${formData.name || "Visitor"}, Service Required: ${formData.service}. Message: ${formData.message || "Looking to collaborate."}`;
    return `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-28 relative bg-studio-black overflow-hidden">
      
      {/* Background grids and glowing lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-studio-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] bg-studio-pink/5 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 text-center">
          <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-black block mb-3 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-studio-cyan" /> Direct Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase text-center justify-center">
            {customSettings?.contactSectionTitle || "LET’S WORK TOGETHER ON YOUR NEXT CAMPAIGN"}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 text-center">
            {customSettings?.contactSectionDesc || "Inquire through our creative pipeline or connect instantly via direct WhatsApp triggers. Our average feedback timeline is under 18 hours."}
          </p>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start text-left">
          
          {/* Left Column: Coordinates details */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h3 className="font-display font-black text-white text-base tracking-wider uppercase mb-6">
                STUDIO CONTACTS
              </h3>
              
              <div className="space-y-6">
                {/* Mail */}
                <a 
                  href={`mailto:${studioInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-studio-zinc border border-white/5 hover:border-studio-cyan/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-studio-cyan/10 flex items-center justify-center text-studio-cyan shrink-0 scale-100 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black block">Digital Mailbox</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 group-hover:text-studio-cyan transition-colors">{studioInfo.email}</span>
                  </div>
                </a>

                {/* Live Digital Clock */}
                <div 
                  className="flex items-start gap-4 p-4 rounded-xl bg-studio-zinc border border-white/5 hover:border-studio-pink/20 transition-all duration-300 group select-none"
                >
                  <div className="w-10 h-10 rounded-lg bg-studio-pink/10 flex items-center justify-center text-studio-pink shrink-0 scale-100 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black block">Studio Local Time</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 font-mono tracking-wider">{liveTime}</span>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mt-1 block flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Studio Hours: {studioInfo.phone || "10 AM - 7 PM IST"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-studio-zinc border border-white/5">
              
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h3 className="font-display font-black text-white text-base tracking-wider uppercase">
                  SUBMIT SPECIFICATIONS
                </h3>
                <span className="text-[9px] text-studio-cyan font-mono tracking-widest font-black">SECURE CHANNEL</span>
              </div>

              {/* Status Notifications */}
              {isSubmitted && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center gap-3 mb-6 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Transmission Successful</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">{customSettings?.successSubmissionText || "Your bespoke specifications have been logged securely. We will consult our timelines and contact you shortly."}</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3 mb-6 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Form Validation Warning</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Name / Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={customSettings?.contactPlaceholderName || "e.g. Rahul Gupta"}
                      className="w-full text-xs sm:text-sm bg-studio-slate border border-white/5 focus:border-studio-cyan rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. contact@yourbrand.com"
                      className="w-full text-xs sm:text-sm bg-studio-slate border border-white/5 focus:border-studio-cyan rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Preferred Contact Hours / Requested Service row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                      Preferred Work Time / Hour (Optional)
                    </label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. Afternoon (2 PM - 5 PM)"
                      className="w-full text-xs sm:text-sm bg-studio-slate border border-white/5 focus:border-studio-cyan rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                      Requested Capability *
                    </label>
                    <div className="relative">
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm bg-studio-slate border border-white/5 focus:border-studio-cyan rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {servicesList.map((item, idx) => (
                          <option key={idx} value={item} className="bg-studio-zinc text-white">
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message block */}
                <div>
                  <label className="block text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                    Bespoke Brand Specifications *
                  </label>
                  <textarea 
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={customSettings?.contactPlaceholderMsg || "Briefly describe your design needs, marketing flyers requirements, and project timeline goals..."}
                    className="w-full text-xs sm:text-sm bg-studio-slate border border-white/5 focus:border-studio-cyan rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Action button rows */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="py-4 px-8 bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 grow shadow cursor-pointer"
                  >
                    Send Specifications <Send className="w-3.5 h-3.5" />
                  </button>

                  <a
                    id="whatsapp-trigger-btn"
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-8 border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366] text-[#25D366] hover:text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2"
                  >
                    WhatsApp Chat <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
