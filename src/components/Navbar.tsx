import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Bestsellers', href: '#bestsellers' },
    { label: 'Offers & Combos', href: '#combos' },
    { label: 'About Us', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF7EB]/95 backdrop-blur-md border-b border-[#3B241C]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element with artisanal emblem) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-[#3B241C] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3B241C] text-[#FFF7EB] flex items-center justify-center font-serif-display font-bold text-xl shadow-sm group-hover:bg-[#C9955B] transition-colors">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display font-bold text-xl sm:text-2xl tracking-tight text-[#3B241C]">
                {STORE_CONFIG.brandName}
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#C9955B]">
                Artisanal Thickshakes
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3B241C]/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#3B241C] hover:font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Cart Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello The Milkshake Factory! I would like to check today’s menu & place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#128C7E] bg-[#E8F8F5] hover:bg-[#D1F2EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              aria-label={`Open shopping cart with ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C9955B]" />
              <span className="hidden sm:inline">Order Tray</span>
              {totalCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-[#3B241C] bg-[#C9955B] rounded-full min-w-5">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#3B241C] hover:bg-[#3B241C]/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF7EB] border-b border-[#3B241C]/15 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-medium text-[#3B241C] hover:bg-[#3B241C]/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#3B241C]/10 flex flex-col gap-2">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello The Milkshake Factory! I would like to place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#128C7E] bg-[#E8F8F5] rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp ({STORE_CONFIG.whatsappDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
