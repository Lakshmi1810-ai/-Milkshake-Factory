import React from 'react';
import { Milk, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-[#3B241C]/5 p-2 border border-[#3B241C]/10 shadow-xl">
              <img
                src="/src/assets/images/dry_fruit_royal_shake_1792925926326.jpg"
                alt="Craftsmanship and natural ingredients at The Milkshake Factory"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover rounded-2xl"
                loading="lazy"
              />
              
              {/* Overlay Quality Note */}
              <div className="absolute inset-x-6 bottom-6 p-4 rounded-xl bg-[#231510]/90 backdrop-blur-md text-[#FFF7EB] border border-[#FFF7EB]/10">
                <p className="text-xs font-semibold text-[#C9955B] uppercase tracking-wider mb-1">
                  Our Uncompromising Standard
                </p>
                <p className="text-sm font-medium leading-snug">
                  Dense ice cream + creamy whole milk. No crushed ice dilution. Ever.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Philosophy & Story */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
            
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Philosophy & Craft</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
                Real Milkshakes, Made the Authentic Way.
              </h2>
              <p className="text-base sm:text-lg text-[#3B241C]/80 leading-relaxed">
                {STORE_CONFIG.brandName} was created with one simple conviction: a milkshake should be an indulgent, rich celebration, not a glass of sweetened crushed ice.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#3B241C]/75 leading-relaxed">
              We slow-churn our bases with rich dairy ice cream, pure whole milk, and real ingredients—whether that's hand-crushed Oreos, sun-ripened fruit purees, or roasted Kashmiri dry fruits. Each drink is blended fresh to order in our open kitchen so you taste the true magic in every sip.
            </p>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/10">
                <Milk className="w-5 h-5 text-[#C9955B] mb-2" />
                <h3 className="font-serif-display font-bold text-sm text-[#3B241C] mb-1">
                  Pure Whole Dairy
                </h3>
                <p className="text-xs text-[#3B241C]/70 leading-relaxed">
                  Wholesome milk and dense cream ice cream for that thick, velvety spoonable texture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/10">
                <Award className="w-5 h-5 text-[#C9955B] mb-2" />
                <h3 className="font-serif-display font-bold text-sm text-[#3B241C] mb-1">
                  Real Ingredients
                </h3>
                <p className="text-xs text-[#3B241C]/70 leading-relaxed">
                  Fresh fruit purees, rich Belgian cocoa, and crisp nuts. No chemical premixes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/10">
                <HeartHandshake className="w-5 h-5 text-[#C9955B] mb-2" />
                <h3 className="font-serif-display font-bold text-sm text-[#3B241C] mb-1">
                  Handmade to Order
                </h3>
                <p className="text-xs text-[#3B241C]/70 leading-relaxed">
                  Blended live when you walk in or place a WhatsApp delivery request.
                </p>
              </div>
            </div>

            {/* Transparent Note for Store Customization */}
            <div className="p-3.5 rounded-xl bg-[#FFF7EB]/60 border border-dashed border-[#C9955B]/40 text-xs text-[#3B241C]/70 flex items-center justify-between">
              <span>Looking to update this story with your specific shop history or founder note?</span>
              <span className="font-semibold text-[#3B241C] underline cursor-pointer ml-2 whitespace-nowrap">
                Edit in AboutSection.tsx
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
