import React from 'react';
import { ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

interface BestsellersProps {
  onQuickView: (item: MenuItem) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ onQuickView }) => {
  const { addItem, sendSingleItemWhatsApp } = useCart();
  const bestsellers = MENU_ITEMS.filter((item) => item.isBestseller).slice(0, 4);

  return (
    <section id="bestsellers" className="py-16 sm:py-20 bg-[#FFF7EB] border-b border-[#3B241C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
              <Star className="w-3.5 h-3.5 fill-[#C9955B]" />
              <span>Customer Favorites</span>
              <span aria-hidden="true">·</span>
              <span>Made Fresh Daily</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3B241C] tracking-tight">
              Bestselling Thickshakes
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#3B241C]/75 max-w-md">
            Our most requested recipes. Handcrafted with dense whole milk ice cream and generous gourmet toppings.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#3B241C]/10 hover:border-[#C9955B]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Fallback */}
                <div
                  onClick={() => onQuickView(item)}
                  className="relative aspect-4/3 overflow-hidden bg-[#F4ECE1] cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-3 right-3 text-[11px] font-semibold uppercase tracking-wide bg-[#3B241C] text-[#FFF7EB] px-2.5 py-1 rounded-md shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/95 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    {item.volume}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3
                      onClick={() => onQuickView(item)}
                      className="font-serif-display text-lg font-bold text-[#3B241C] group-hover:text-[#C9955B] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <span className="font-serif-display text-lg font-bold text-[#3B241C] tabular-nums whitespace-nowrap">
                      {STORE_CONFIG.currencySymbol}{item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#3B241C]/75 line-clamp-2 leading-relaxed mb-4 min-h-[2rem]">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-[#3B241C]/60 flex items-center gap-1.5 flex-wrap">
                    <span>{item.ingredients.slice(0, 2).join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => addItem(item)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] active:scale-95 rounded-lg transition-colors whitespace-nowrap"
                  title="Add to your order tray"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C9955B]" />
                  <span>Add to Tray</span>
                </button>

                <a
                  href={`https://api.whatsapp.com/send?phone=${STORE_CONFIG.whatsappNumber}&text=${encodeURIComponent(
                    `🥤 *DIRECT ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*\nItem: *${item.name}* (${item.volume})\nQuantity: 1\nPrice: ₹${item.price}\n\nHello! I would like to order this. Please let me know preparation time.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#128C7E] bg-[#E8F8F5] hover:bg-[#D1F2EB] active:scale-95 rounded-lg transition-colors whitespace-nowrap"
                  title="Order directly on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
