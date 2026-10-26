import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    isCartOpen,
    setIsCartOpen,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
    orderType,
    setOrderType,
    specialInstructions,
    setSpecialInstructions,
    sendWhatsAppCartOrder,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] text-[#3B241C] shadow-2xl flex flex-col justify-between border-l border-[#3B241C]/15 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#3B241C]/10 flex items-center justify-between bg-[#FFF7EB]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#3B241C] text-[#FFF7EB] flex items-center justify-center font-serif-display font-bold">
                M
              </div>
              <div>
                <h2 className="font-serif-display font-bold text-lg text-[#3B241C]">
                  Your Order Tray
                </h2>
                <p className="text-xs text-[#3B241C]/65">
                  {totalCount} {totalCount === 1 ? 'shake' : 'shakes'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#3B241C]/60 hover:text-red-700 transition-colors px-2 py-1"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#3B241C]/60 hover:text-[#3B241C] rounded-lg hover:bg-[#3B241C]/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFF7EB] flex items-center justify-center mb-4 border border-[#3B241C]/10">
                  <ShoppingBag className="w-8 h-8 text-[#C9955B]" />
                </div>
                <h3 className="font-serif-display font-bold text-xl text-[#3B241C] mb-2">
                  Your tray is empty
                </h3>
                <p className="text-sm text-[#3B241C]/70 max-w-xs mb-6">
                  Add handcrafted thickshakes or sharing combos from our menu to begin your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] rounded-xl transition-all"
                >
                  <span>Browse Our Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Item List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/10 flex items-center justify-between gap-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg shrink-0 border border-[#3B241C]/10"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-display font-bold text-sm text-[#3B241C] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#C9955B] tabular-nums mt-0.5">
                          {STORE_CONFIG.currencySymbol}{item.price} each
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-[#FFFDF9] border border-[#3B241C]/15 rounded-lg px-2 py-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-0.5 text-[#3B241C]/70 hover:text-[#3B241C]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-0.5 text-[#3B241C]/70 hover:text-[#3B241C]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#3B241C]/40 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Type Toggle (Takeaway vs Delivery) */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B241C]/70 mb-2">
                    Order Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#FFF7EB] rounded-xl border border-[#3B241C]/10">
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        orderType === 'takeaway'
                          ? 'bg-[#3B241C] text-[#FFF7EB] shadow-xs'
                          : 'text-[#3B241C]/70 hover:text-[#3B241C]'
                      }`}
                    >
                      Store Takeaway / Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        orderType === 'delivery'
                          ? 'bg-[#3B241C] text-[#FFF7EB] shadow-xs'
                          : 'text-[#3B241C]/70 hover:text-[#3B241C]'
                      }`}
                    >
                      Home Delivery
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#3B241C] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sumanth Reddy"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFF7EB] rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-[#3B241C] mb-1 flex items-center justify-between">
                        <span>Delivery Address</span>
                        <span className="text-[10px] text-[#C9955B]">Within 5 km</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Apartment name, street, nearby landmark"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FFF7EB] rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#3B241C] mb-1">
                      Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Less sugar, extra choco drizzle, paper cups..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFF7EB] rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                    />
                  </div>
                </div>

                {/* Important Ordering Process Notice (Clear and honest - no false payment claims) */}
                <div className="p-3 rounded-xl bg-[#FFF7EB] border border-[#C9955B]/30 text-[11px] text-[#3B241C]/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#3B241C]">
                    <ShieldCheck className="w-4 h-4 text-[#C9955B]" />
                    <span>How WhatsApp Ordering Works:</span>
                  </div>
                  <p>
                    1. Tap the button below to send your itemized order directly to our store WhatsApp.
                  </p>
                  <p>
                    2. Our team replies in real-time to confirm preparation time & payment (UPI / Cash upon delivery).
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#3B241C]/10 bg-[#FFF7EB] space-y-4">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#3B241C]/70 block">
                    Estimated Subtotal
                  </span>
                  <span className="text-[11px] text-[#3B241C]/50">
                    Taxes included · Packaging free
                  </span>
                </div>
                <span className="font-serif-display text-2xl font-bold text-[#3B241C] tabular-nums">
                  {STORE_CONFIG.currencySymbol}{subtotal}
                </span>
              </div>

              {orderType === 'delivery' && subtotal < STORE_CONFIG.minimumOrderForDelivery && (
                <div className="flex items-center gap-1.5 text-xs text-[#B47F47] bg-[#FFFDF9] p-2 rounded-lg border border-[#C9955B]/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Minimum delivery order is {STORE_CONFIG.currencySymbol}{STORE_CONFIG.minimumOrderForDelivery} (add {STORE_CONFIG.currencySymbol}{STORE_CONFIG.minimumOrderForDelivery - subtotal} more for delivery)
                  </span>
                </div>
              )}

              <button
                onClick={sendWhatsAppCartOrder}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] active:scale-98 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Send Complete Order to WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#3B241C]/60">
                Direct store connection to {STORE_CONFIG.whatsappDisplay}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
