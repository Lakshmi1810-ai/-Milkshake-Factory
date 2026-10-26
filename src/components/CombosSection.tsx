import React from 'react';
import { Tag, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { COMBO_OFFERS, ComboOffer } from '../data/combosData';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

export const CombosSection: React.FC = () => {
  const { addItem, sendComboWhatsApp } = useCart();

  const handleAddComboToCart = (combo: ComboOffer) => {
    addItem({
      id: combo.id,
      name: combo.title,
      price: combo.dealPrice,
      isCombo: true,
      image: '/src/assets/images/hero_signature_milkshake_1792925923360.jpg',
    });
  };

  return (
    <section id="combos" className="py-16 sm:py-24 bg-[#FFF7EB] border-y border-[#3B241C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Value Bundles & Special Offers</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
            Combos Made for Sharing
          </h2>
          <p className="text-base text-[#3B241C]/80">
            Enjoy your favorite shake pairings with curated savings. Perfect for friends, dates, and family evenings.
          </p>
        </div>

        {/* 2x2 or 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COMBO_OFFERS.map((combo) => (
            <div
              key={combo.id}
              className={`relative bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                combo.isFeatured
                  ? 'border-[#C9955B] shadow-md ring-1 ring-[#C9955B]/30'
                  : 'border-[#3B241C]/10 hover:border-[#C9955B]/40 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9955B] block mb-1">
                      {combo.badge}
                    </span>
                    <h3 className="font-serif-display text-2xl font-bold text-[#3B241C]">
                      {combo.title}
                    </h3>
                  </div>

                  {/* Savings Pill */}
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 text-xs font-bold text-[#FFF7EB] bg-[#3B241C] rounded-lg">
                      Save {STORE_CONFIG.currencySymbol}{combo.savings}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#3B241C]/75 mb-6">
                  {combo.subtitle}
                </p>

                {/* Items Included List */}
                <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#FFF7EB]/60 border border-[#3B241C]/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#3B241C]/60 mb-1">
                    What's inside:
                  </p>
                  {combo.itemsIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#3B241C]">
                      <Check className="w-4 h-4 text-[#C9955B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#3B241C]/60 italic mb-6">
                  Note: {combo.popularFor}
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="pt-4 border-t border-[#3B241C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-display text-3xl font-bold text-[#3B241C] tabular-nums">
                    {STORE_CONFIG.currencySymbol}{combo.dealPrice}
                  </span>
                  <span className="text-sm text-[#3B241C]/45 line-through tabular-nums">
                    {STORE_CONFIG.currencySymbol}{combo.originalPrice}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleAddComboToCart(combo)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] active:scale-95 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C9955B]" />
                    <span>Add to Tray</span>
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(
                      `🥤 *SPECIAL COMBO ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*\n-----------------------------------\nCombo: *${combo.title}*\nIncludes: ${combo.itemsIncluded.join(', ')}\nSpecial Deal Price: *₹${combo.dealPrice}*\n-----------------------------------\nHello! I'd like to order this special combo deal. Please confirm availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#128C7E] bg-[#E8F8F5] hover:bg-[#D1F2EB] active:scale-95 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
