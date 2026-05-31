/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  variant?: "full" | "compact" | "cube-only" | "text-only";
  glow?: boolean;
}

export default function BrandLogo({
  className = "",
  size,
  variant = "full",
  glow = true
}: BrandLogoProps) {
  
  // Outer size helper
  const sizeClass = size ? "" : "w-auto h-auto";
  const inlineSize = size ? { width: size, height: typeof size === "number" ? `${size}px` : size } : undefined;

  // The 3D Digital Cube Logo
  const renderCube = (w: number = 140, h: number = 140) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none"
    >
      <defs>
        {/* Neon Glow Filters */}
        <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neon-glow-pink" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="gradient-top" x1="45" y1="20" x2="115" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="100%" stopColor="#4facfe" />
        </linearGradient>
        <linearGradient id="gradient-right" x1="80" y1="50" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff007f" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#79003c" />
        </linearGradient>
      </defs>

      {/* 3D CUBE CONTAINER */}
      <g filter={glow ? "url(#neon-glow-cyan)" : undefined}>
        
        {/* 1. TOP FACE (Cyan Theme Digital Isometric diamond) */}
        {/* Polygon base */}
        <polygon 
          points="80,18 126,42 80,66 34,42" 
          fill="url(#gradient-top)" 
          opacity="0.85" 
          stroke="#00ffff"
          strokeWidth="1.5"
        />
        {/* Inner detail slice (dark blue cutout) */}
        <polygon 
          points="80,26 112,42 80,58 48,42" 
          fill="#060913" 
          opacity="0.9"
        />
        {/* Nested geometric inner core */}
        <polygon 
          points="80,34 96,42 80,50 64,42" 
          fill="#00f2fe" 
          opacity="0.9"
        />
      </g>

      <g filter={glow ? "url(#neon-glow-pink)" : undefined}>
        {/* 2. RIGHT FACE (Solid stylized pink-magenta and 'W' geometry) */}
        <polygon 
          points="80,66 126,42 126,110 80,134" 
          fill="url(#gradient-right)" 
          opacity="0.92" 
          stroke="#ff007f"
          strokeWidth="1.5"
        />

        {/* Cutout style line 'W' & 'E' carvings (shows as dark plates inside) */}
        <path 
          d="M 94,62 L 94,117 L 103,112 L 103,72 L 112,77 L 112,107 L 121,102 L 121,68 Z" 
          fill="#030407" 
          opacity="0.95"
        />

        {/* Horizontal block slash of magenta */}
        <rect x="80" y="86" width="46" height="4" fill="#030407" opacity="0.6" transform="skewY(-27.5) translate(1px, -45px)" />
      </g>

      {/* 3. LEFT FACE - DISPERSED DIGITAL PIXELS (Cyan, Magenta, Yellow shatter) */}
      {/* This face is open and shattering. We render detailed floating coordinates of pixels */}
      <g>
        {/* Background shadow guides */}
        <polygon 
          points="80,66 34,42 34,110 80,134" 
          fill="none" 
          stroke="#00f2fe" 
          strokeWidth="1" 
          strokeDasharray="2,3" 
          opacity="0.3"
        />

        {/* High-fidelity dispersed 3D pixels (layered as small cubes/rectangles fading out to the left) */}
        {/* Cyan fragments */}
        <rect x="42" y="55" width="6" height="6" fill="#00f2fe" opacity="0.9" />
        <rect x="42" y="70" width="7" height="7" fill="#00f2fe" opacity="0.9" />
        <rect x="52" y="62" width="6" height="6" fill="#00f2fe" opacity="0.8" />
        <rect x="62" y="78" width="8" height="8" fill="#00f2fe" opacity="0.95" />
        <rect x="70" y="92" width="6" height="6" fill="#06b6d4" opacity="0.9" />
        <rect x="52" y="105" width="7" height="7" fill="#00f2fe" opacity="0.85" />
        
        {/* Chipping far out Cyan pixels */}
        <rect x="22" y="38" width="5" height="5" fill="#00f2fe" opacity="0.75" />
        <rect x="28" y="48" width="6" height="6" fill="#00f2fe" opacity="0.8" />
        <rect x="18" y="58" width="5" height="5" fill="#00f2fe" opacity="0.6" />
        <rect x="20" y="74" width="6" height="6" fill="#4facfe" opacity="0.5" />
        <rect x="24" y="90" width="4" height="4" fill="#00f2fe" opacity="0.7" />

        {/* Pink/Magenta fragments */}
        <rect x="58" y="88" width="6" height="6" fill="#ff007f" opacity="0.9" />
        <rect x="48" y="80" width="7" height="7" fill="#ff007f" opacity="0.95" />
        <rect x="66" y="102" width="8" height="8" fill="#ff007f" opacity="0.9" />
        <rect x="74" y="115" width="6" height="6" fill="#ec4899" opacity="0.9" />
        <rect x="60" y="122" width="6" height="6" fill="#ff007f" opacity="0.8" />
        
        {/* Outlier Pink fragments */}
        <rect x="36" y="98" width="5" height="5" fill="#ff007f" opacity="0.7" />
        <rect x="20" y="110" width="6" height="6" fill="#ff007f" opacity="0.6" />
        <rect x="28" y="118" width="4" height="4" fill="#ff007f" opacity="0.85" />
        
        {/* Gold/Yellow fragments */}
        <rect x="48" y="48" width="5" height="5" fill="#ffd700" opacity="0.95" />
        <rect x="56" y="55" width="5" height="5" fill="#ffd700" opacity="0.9" />
        <rect x="40" y="88" width="6" height="6" fill="#ffd700" opacity="0.9" />
        <rect x="54" y="94" width="5" height="5" fill="#ffd700" opacity="0.85" />
        <rect x="46" y="120" width="6" height="6" fill="#ffd700" opacity="0.9" />
        <rect x="34" y="128" width="5" height="5" fill="#ffd700" opacity="0.75" />

        {/* Small cluster details */}
        <circle cx="68" cy="46" r="2.5" fill="#ffd700" opacity="0.9" />
        <circle cx="34" cy="66" r="2" fill="#00f2fe" opacity="0.8" />
        <circle cx="14" cy="80" r="1.5" fill="#ff007f" opacity="0.5" />
      </g>
    </svg>
  );

  // High-fidelity Custom Vector Typography Wordmark drawing
  const renderTypography = (w: number = 240, h: number = 42) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 320 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none tracking-normal"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="text-gradient" x1="0" y1="27" x2="320" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="50%" stopColor="#499af7" />
          <stop offset="100%" stopColor="#ff007f" />
        </linearGradient>
        
        {/* Text glow */}
        <filter id="text-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Draw letters precisely with nested vector graphics icons matching the image! */}
      <g filter={glow ? "url(#text-glow)" : undefined} stroke="url(#text-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        
        {/* 1. LETTER E (with interactive Cyan fine PenTool vector) */}
        <path d="M 12,12 L 40,12 M 12,12 L 12,42 M 12,42 L 40,42 M 12,27 L 32,27" />
        {/* Inset vector pen icon on E (Cyan) */}
        <path d="M 15,22 L 23,27 L 15,32 Z" stroke="#00f2fe" strokeWidth="1" fill="#00f2fe" opacity="0.3" />
        <line x1="23" y1="27" x2="33" y2="27" stroke="#00f2fe" strokeWidth="1.5" />

        {/* 2. LETTER D (with Stack/Layers sheets icon inside) */}
        <path d="M 52,12 L 72,12 C 82,12 88,18 88,27 C 88,36 82,42 72,42 L 52,42 Z" />
        {/* Inset Layers icon on D */}
        <g stroke="#00f2fe" strokeWidth="1" fill="none" opacity="0.8">
          <path d="M 60,22 L 70,17 L 80,22 L 70,27 Z" />
          <path d="M 60,26 L 70,31 L 80,26" />
          <path d="M 60,30 L 70,35 L 80,30" />
        </g>

        {/* 3. LETTER W (with Up Arrow triangle inside) */}
        <path d="M 100,12 L 108,42 L 118,24 L 128,42 L 136,12" />
        {/* Inset Upward Arrow on W (Cyan glow) */}
        <polygon points="118,12 123,17 113,17" stroke="#00f2fe" strokeWidth="1" fill="#00f2fe" />
        <line x1="118" y1="17" x2="118" y2="23" stroke="#00f2fe" strokeWidth="1.5" />

        {/* 4. LETTER A (with Circuit traces inside) */}
        <path d="M 148,42 L 160,12 L 172,42 M 153,30 L 167,30" />
        {/* Circuit micro-details in A */}
        <circle cx="160" cy="22" r="2.5" stroke="#ff007f" strokeWidth="1" fill="#ff007f" />
        <path d="M 160,24 L 160,30" stroke="#00f2fe" strokeWidth="1" />
        <circle cx="153" cy="30" r="1.5" stroke="#00f2fe" strokeWidth="0.8" fill="#00f2fe" />
        <circle cx="167" cy="30" r="1.5" stroke="#00f2fe" strokeWidth="0.8" fill="#00f2fe" />

        {/* 5. LETTER N (with Mouse pointer cursor inside) */}
        <path d="M 184,42 L 184,12 L 210,42 L 210,12" />
        {/* Inset Cursor pointer on N */}
        <polygon points="201,17 207,24 203,26 208,31 206,32 201,27 199,30" stroke="#ff007f" strokeWidth="1" fill="#ff007f" opacity="0.6" />

        {/* 6. LETTER I (with Vertical capacity level battery curves inside) */}
        <path d="M 222,12 L 238,12 M 230,12 L 230,42 M 222,42 L 238,42" />
        {/* Inset status battery/bars in right column */}
        <g stroke="#00f2fe" strokeWidth="1" fill="#00f2fe" opacity="0.7">
          <rect x="234" y="18" width="3" height="4" />
          <rect x="234" y="24" width="3" height="4" fill="none" />
          <rect x="234" y="30" width="3" height="4" fill="none" />
          <rect x="234" y="36" width="3" height="4" />
        </g>

        {/* 7. LETTER K (with brush cosmic sparkle inside) */}
        <path d="M 252,12 L 252,42 M 274,12 L 254,27 L 274,42" />
        {/* Inset Star Sparkle on meeting intersection */}
        <g stroke="#ff007f" strokeWidth="1">
          <line x1="254" y1="27" x2="260" y2="27" />
          <line x1="257" y1="24" x2="257" y2="30" />
        </g>
      </g>
    </svg>
  );

  if (variant === "cube-only") {
    return (
      <div id="edwanik-cube-rendering" className={`flex items-center justify-center ${className}`} style={inlineSize}>
        {renderCube()}
      </div>
    );
  }

  if (variant === "text-only") {
    return (
      <div id="edwanik-text-rendering" className={`flex items-center justify-center ${className}`} style={inlineSize}>
        {renderTypography()}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div 
        id="edwanik-logo-compact" 
        className={`flex items-center gap-3 group cursor-pointer ${className}`}
        style={inlineSize}
      >
        <div className="w-10 h-10 shrink-0 transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
          {renderCube(44, 44)}
        </div>
        <div className="flex flex-col items-start leading-none gap-0.5">
          {renderTypography(130, 22)}
          <span className="text-[7.5px] uppercase tracking-[0.42em] text-[#ffd700] hover:text-[#00f2fe] font-mono leading-none select-none font-black pl-0.5 mt-0.5">
            CREATIVE STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Full Large Brand Card layout (As seen in the first uploaded image)
  return (
    <div 
      id="edwanik-logo-full-stack" 
      className={`flex flex-col items-center justify-center text-center gap-6 p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-2xl ${className}`}
      style={inlineSize}
    >
      {/* Visual neon light leak overlays inside the card background */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-studio-cyan/5 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-studio-pink/5 blur-[80px] pointer-events-none rounded-full" />

      {/* Floating pixel squares floating up behind logo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-3xl" />

      <div className="relative transform group-hover:scale-105 group-hover:-translate-y-1.5 transition-all duration-500 ease-out">
        {renderCube(160, 160)}
      </div>

      <div className="relative mt-2 flex flex-col items-center select-none">
        {renderTypography(270, 48)}
      </div>
    </div>
  );
}
