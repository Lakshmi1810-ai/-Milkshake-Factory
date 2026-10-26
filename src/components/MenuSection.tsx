import React, { useState, useMemo } from 'react';
import { ShoppingBag, MessageCircle, Search, Info } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId, MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

interface MenuSectionProps {
  onQuickView: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, sendSingleItemWhatsApp } = useCart();

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9955B] block mb-2">
            Freshly Blended Upon Order
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
            Our Handcrafted Menu
          </h2>
          <p className="text-base text-[#3B241C]/80">
            Pick your favorite flavor, customize sugar and toppings, and order instantly. All prices in Indian Rupees ({STORE_CONFIG.currencySymbol}).
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-6 mb-10 sm:mb-12">
          
          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#3B241C]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shakes (e.g. oreo, chocolate, mango, dry fruit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FFF7EB] border border-[#3B241C]/15 rounded-xl text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none focus:ring-2 focus:ring-[#C9955B] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#3B241C]/50 hover:text-[#3B241C]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#3B241C] text-[#FFF7EB] shadow-sm'
                      : 'bg-[#FFF7EB] text-[#3B241C]/75 hover:text-[#3B241C] hover:bg-[#F3E7D5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#FFF7EB] rounded-2xl border border-dashed border-[#3B241C]/20 max-w-lg mx-auto">
            <p className="font-serif-display text-xl font-bold text-[#3B241C] mb-2">
              No milkshakes found
            </p>
            <p className="text-sm text-[#3B241C]/70 mb-4">
              We couldn't find any shakes matching "{searchQuery}". Try searching for chocolate, vanilla, or mango.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] rounded-lg hover:bg-[#231510] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FFF7EB]/40 hover:bg-[#FFF7EB] rounded-2xl overflow-hidden border border-[#3B241C]/10 hover:border-[#C9955B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
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
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      onClick={() => onQuickView(item)}
                      className="font-serif-display text-lg sm:text-xl font-bold text-[#3B241C] group-hover:text-[#C9955B] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <span className="font-serif-display text-xl font-bold text-[#3B241C] tabular-nums whitespace-nowrap">
                      {STORE_CONFIG.currencySymbol}{item.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#3B241C]/75 leading-relaxed mb-4 min-h-[2.5rem]">
                    {item.description}
                  </p>

                  {/* Ingredients Preview */}
                  <div className="text-[11px] text-[#3B241C]/65 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-[#C9955B]">Blended with:</span>
                    <span>{item.ingredients.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
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

                <button
                  onClick={() => onQuickView(item)}
                  className="w-full flex items-center justify-center gap-1 text-[11px] font-medium text-[#3B241C]/60 hover:text-[#3B241C] py-1 transition-colors"
                >
                  <Info className="w-3 h-3" />
                  <span>Customize & details</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
