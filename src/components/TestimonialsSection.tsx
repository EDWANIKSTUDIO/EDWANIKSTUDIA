/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { TestimonialItem } from "../types";

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-28 relative bg-studio-zinc border-t border-white/5 overflow-hidden">
      
      {/* Decorative Blur background lights */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-studio-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-studio-pink/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Row 1: Testimonials Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <span className="text-studio-cyan uppercase tracking-[0.3em] text-[10px] font-black block mb-3 inline-flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" /> Direct Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-none mb-6">
              REVIEWS FROM <br />
              <span className="text-cyber-gradient font-black">THE DIRECTORS TABLE</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8">
              We form long-term alliances with visionaries. Read insights from clients who placed absolute trust in Edwanik Studio&apos;s capabilities.
            </p>

            {/* Slider navigation dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-8 bg-studio-cyan" : "w-2 bg-white/10 hover:bg-white/20"
                  }`}
                  title={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative overflow-hidden min-h-[220px] bg-studio-black/40 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-md">
              
              {testimonials.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-sm">No testimonials registered yet.</p>
                </div>
              ) : (
                <div className="animate-fade-in flex flex-col justify-between h-full">
                  <div>
                    {/* Star Rating Panel */}
                    <div className="flex gap-1 mb-6 text-studio-cyan">
                      {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>

                    {/* Comment text block */}
                    <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed italic mb-8">
                      &ldquo;{testimonials[activeIndex].comment}&rdquo;
                    </p>
                  </div>

                  {/* Profile Cards */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-sm sm:text-base">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-[10px] text-studio-cyan uppercase tracking-widest font-semibold mt-0.5">
                        {testimonials[activeIndex].role}, <span className="text-gray-400 font-bold">{testimonials[activeIndex].company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
