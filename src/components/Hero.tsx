import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, Milk, Clock, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export const Hero: React.FC = () => {
  const whatsappHeroUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hi The Milkshake Factory! I would like to order fresh milkshakes. Please share today’s specials!'
  )}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#FFF7EB] via-[#FFF7EB] to-[#FBF3E4]">
      {/* Subtle organic cafe ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9955B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B241C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Natural Editorial Brand Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C9955B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pure Whole Milk & Artisanal Churn</span>
              <span aria-hidden="true">·</span>
              <span>Bengaluru</span>
            </div>

            {/* Tagline & Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B241C] tracking-tight leading-[1.1] max-w-2xl mx-auto lg:mx-0">
                {STORE_CONFIG.tagline}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#C9955B]">
                Welcome to {STORE_CONFIG.brandName}
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-[#3B241C]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {STORE_CONFIG.subTagline} No artificial syrups, no watery shortcuts—just creamy, thick perfection poured with genuine love.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] active:scale-98 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <span>View Full Menu</span>
                <ArrowDown className="w-4 h-4 text-[#C9955B]" />
              </a>

              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-[#FFF7EB] bg-[#25D366] hover:bg-[#20BD5A] active:scale-98 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust & Quality Indicators */}
            <div className="pt-6 border-t border-[#3B241C]/10 grid grid-cols-3 gap-3 text-left">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#3B241C] font-semibold text-xs sm:text-sm">
                  <Milk className="w-4 h-4 text-[#C9955B] shrink-0" />
                  <span>100% Real Dairy</span>
                </div>
                <span className="text-[12px] text-[#3B241C]/65 hidden sm:inline">Whole milk ice cream</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#3B241C] font-semibold text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-[#C9955B] shrink-0" />
                  <span>Blended Fresh</span>
                </div>
                <span className="text-[12px] text-[#3B241C]/65 hidden sm:inline">Made right upon order</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#3B241C] font-semibold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#C9955B] shrink-0" />
                  <span>100% Pure Veg</span>
                </div>
                <span className="text-[12px] text-[#3B241C]/65 hidden sm:inline">Clean & hygienic prep</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Res Milkshake Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative soft border */}
              <div className="relative rounded-3xl overflow-hidden bg-[#3B241C]/5 p-2 shadow-2xl border border-[#3B241C]/10">
                <img
                  src="/src/assets/images/hero_signature_milkshake_1792925923360.jpg"
                  alt="Artisanal Caramel and Chocolate Thickshake at The Milkshake Factory"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[480px] object-cover rounded-2xl transition-transform duration-500 hover:scale-102"
                />

                {/* Subtle scrim caption overlay */}
                <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-[#231510]/85 backdrop-blur-md text-[#FFF7EB] border border-[#FFF7EB]/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#C9955B] font-semibold">Today's Star Shake</p>
                    <p className="font-serif-display font-bold text-lg text-[#FFF7EB]">Butterscotch Caramel Swirl</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#FFF7EB]/70 block">Starting at</span>
                    <span className="font-serif-display text-xl font-bold text-[#C9955B] tabular-nums">₹85</span>
                  </div>
                </div>
              </div>

              {/* Float badge */}
              <div className="absolute -top-3 -right-3 sm:-right-5 bg-[#C9955B] text-[#FFF7EB] px-4 py-2 rounded-xl shadow-lg border-2 border-[#FFF7EB] text-xs font-bold tracking-wide uppercase">
                Artisanal Cafe
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
