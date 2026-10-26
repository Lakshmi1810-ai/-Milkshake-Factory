/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Bestsellers } from './components/Bestsellers';
import { MenuSection } from './components/MenuSection';
import { CombosSection } from './components/CombosSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OwnerGuideModal } from './components/OwnerGuideModal';
import { MenuItem } from './data/menuData';

export default function App() {
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FFF7EB] text-[#3B241C] selection:bg-[#C9955B] selection:text-white">
        
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Bestselling Milkshakes */}
          <Bestsellers onQuickView={(item) => setQuickViewItem(item)} />

          {/* 3. Complete Handcrafted Menu with Categories */}
          <MenuSection onQuickView={(item) => setQuickViewItem(item)} />

          {/* 4. Special Offers and Combos */}
          <CombosSection />

          {/* 5. Authentic About Us Section */}
          <AboutSection />

          {/* 6. Photo Gallery */}
          <GallerySection />

          {/* 7. Customer Reviews / Tasting Notes Area */}
          <ReviewsSection />

          {/* 8. Contact, Location, and WhatsApp Enquiry */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenGuide={() => setIsOwnerGuideOpen(true)} />

        {/* Global Floating Elements & Modals */}
        <FloatingWhatsApp />
        <CartDrawer />
        <QuickViewModal
          item={quickViewItem}
          onClose={() => setQuickViewItem(null)}
        />
        <OwnerGuideModal
          isOpen={isOwnerGuideOpen}
          onClose={() => setIsOwnerGuideOpen(false)}
        />

      </div>
    </CartProvider>
  );
}
