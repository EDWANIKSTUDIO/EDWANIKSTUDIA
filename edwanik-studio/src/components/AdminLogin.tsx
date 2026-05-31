/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, ShieldAlert, Key, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLogin({ onClose, onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Normalizing email to match user email s.mohamedriswan28@gmail.com
    const trimmedEmail = email.trim().toLowerCase();
    const targetEmail = "s.mohamedriswan28@gmail.com";
    
    // Standard access passwords: support 'admin123', 'edwanikstudioadmin', 'edwanik2026'
    const allowedPasswords = ["admin123", "edwanikstudioadmin", "edwanik2026", "admin"];

    if (!trimmedEmail) {
      setErrorMsg("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setErrorMsg("Password is required.");
      return;
    }

    if (trimmedEmail !== targetEmail) {
      setErrorMsg("Access Denied: Non-authorized administrator email.");
      return;
    }

    if (!allowedPasswords.includes(password)) {
      setErrorMsg("Invalid security credentials provided.");
      return;
    }

    // Success state transition
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 850);
  };

  return (
    <div 
      id="admin-login-modal"
      className="fixed inset-0 bg-studio-black/95 backdrop-blur-xl z-[150] flex items-center justify-center p-4 animate-fade-in"
    >
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-studio-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-studio-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="bg-studio-zinc border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative p-8 text-center">
        
        {/* Close button */}
        <button 
          id="login-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-studio-cyan text-white hover:text-studio-black rounded-full transition-colors duration-300 cursor-pointer"
          title="Cancel login"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header/Logo Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 shrink-0 transform mb-2 scale-90">
            <BrandLogo variant="cube-only" size={56} />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[#ffd700] uppercase font-bold block mb-1">
            Secure Entry Port
          </span>
          <h3 className="font-display font-black text-white text-xl uppercase tracking-tight">
            Studio Administrator
          </h3>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center gap-4 animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-studio-cyan/15 border border-studio-cyan/35 flex items-center justify-center text-studio-cyan animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-white font-bold text-sm">Access Verified Successfully</p>
            <p className="text-gray-400 text-xs font-mono">Initializing Admin Console...</p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-5 text-left">
            
            {/* Display error warnings banner */}
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-2.5 text-xs text-red-400 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email Port */}
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block pl-1">
                Authorized Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@edwanikstudio.com"
                  className="w-full bg-studio-black border border-white/5 focus:border-studio-cyan/40 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-gray-600 outline-none transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Port */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                  Security Code
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-studio-black border border-white/5 focus:border-studio-pink/40 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-gray-600 outline-none transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Signin Actions */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 bg-studio-cyan hover:bg-studio-cyan-hover text-studio-black font-extrabold text-[11px] uppercase tracking-widest rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-studio-cyan/5 ${isSubmitting ? "opacity-60" : ""}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isSubmitting ? "Verifying Keys..." : "Authorize Entry"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
