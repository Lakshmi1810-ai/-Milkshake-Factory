import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, Check, Milk } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

interface QuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ item, onClose }) => {
  const { addItem, sendSingleItemWhatsApp } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  if (!item) return null;

  const handleAddToCart = () => {
    addItem(item, quantity);
    onClose();
  };

  const handleQuickWhatsApp = () => {
    sendSingleItemWhatsApp(item, quantity, customNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] text-[#3B241C] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#3B241C]/15 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          
          {/* Image Column */}
          <div className="relative aspect-4/3 sm:aspect-auto sm:h-full bg-[#F4ECE1]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {item.badge && (
              <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wide bg-[#3B241C] text-[#FFF7EB] px-3 py-1 rounded-md shadow-sm">
                {item.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 text-xs font-medium bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded">
              Serving: {item.volume}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-7 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C9955B] font-semibold">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#3B241C] mt-1">
                  {item.name}
                </h3>
                <span className="font-serif-display text-2xl font-bold text-[#3B241C] tabular-nums mt-1 block">
                  {STORE_CONFIG.currencySymbol}{item.price}
                </span>
              </div>

              <p className="text-sm text-[#3B241C]/80 leading-relaxed">
                {item.description}
              </p>

              {/* Ingredients */}
              <div className="space-y-1.5 pt-2 border-t border-[#3B241C]/10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#3B241C]/60">
                  Ingredients & Churn:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] bg-[#FFF7EB] text-[#3B241C] px-2 py-0.5 rounded border border-[#3B241C]/10"
                    >
                      <Check className="w-3 h-3 text-[#C9955B]" />
                      <span>{ing}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Customization Note input */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#3B241C] mb-1">
                  Preferences / Customization:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less sweet, extra ice cream scoop..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#FFF7EB] rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                />
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#3B241C]">Quantity</span>
                <div className="flex items-center gap-2 bg-[#FFF7EB] border border-[#3B241C]/15 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#3B241C]/70 hover:text-[#3B241C]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold font-mono px-2 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#3B241C]/70 hover:text-[#3B241C]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#3B241C]/10 space-y-2 mt-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] active:scale-98 rounded-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#C9955B]" />
                <span>Add {quantity} to Order Tray · {STORE_CONFIG.currencySymbol}{item.price * quantity}</span>
              </button>

              <button
                onClick={handleQuickWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#128C7E] bg-[#E8F8F5] hover:bg-[#D1F2EB] active:scale-98 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp directly</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
