import React from 'react';
import { MessageCircle, Phone, MapPin, Instagram, Heart, HelpCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  return (
    <footer className="bg-[#231510] text-[#FFF7EB] pt-16 pb-12 border-t border-[#3B241C]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#C9955B] text-[#3B241C] flex items-center justify-center font-serif-display font-bold text-xl">
                M
              </div>
              <span className="font-serif-display font-bold text-2xl text-[#FFF7EB]">
                {STORE_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-xs text-[#C9955B] font-semibold uppercase tracking-wider">
              {STORE_CONFIG.tagline}
            </p>
            
            <p className="text-xs sm:text-sm text-[#FFF7EB]/70 leading-relaxed max-w-sm">
              Artisanal milkshakes & thickshakes blended fresh to order using 100% whole milk dairy ice creams, natural fruit extracts, and gourmet toppings.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello! I would like to place an order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STORE_CONFIG.phoneRaw}`}
                className="w-9 h-9 rounded-lg bg-white/10 text-[#FFF7EB] hover:bg-[#C9955B] hover:text-[#3B241C] flex items-center justify-center transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 text-[#FFF7EB] hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-display text-base font-bold text-[#C9955B]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFF7EB]/75">
              <li>
                <a href="#menu" className="hover:text-[#FFF7EB] transition-colors">
                  Full Shake Menu
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#FFF7EB] transition-colors">
                  Bestsellers & Specials
                </a>
              </li>
              <li>
                <a href="#combos" className="hover:text-[#FFF7EB] transition-colors">
                  Special Offers & Combos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFF7EB] transition-colors">
                  Our Philosophy & Story
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FFF7EB] transition-colors">
                  Behind the Blender Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FFF7EB] transition-colors">
                  Customer Tasting Notes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif-display text-base font-bold text-[#C9955B]">
              Shop Location & Hours
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#FFF7EB]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9955B] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.addressLine1}, {STORE_CONFIG.addressLine2}, {STORE_CONFIG.cityStatePincode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9955B] shrink-0" />
                <span>Call: {STORE_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {STORE_CONFIG.whatsappDisplay}</span>
              </div>
              <div className="pt-2 text-xs text-[#FFF7EB]/60">
                Operating Hours: <strong className="text-[#C9955B]">{STORE_CONFIG.openingHoursDisplay}</strong> ({STORE_CONFIG.openingDays})
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Owner Guide Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF7EB]/60">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.brandName}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF7EB] transition-colors font-medium text-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C9955B]" />
              <span>Owner Setup & Deploy Instructions</span>
            </button>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#C9955B] fill-[#C9955B]" /> for real milkshake lovers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
