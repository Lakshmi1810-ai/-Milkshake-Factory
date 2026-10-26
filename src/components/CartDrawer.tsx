import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Copy,
  Phone,
  QrCode,
  CreditCard,
  Banknote,
  Receipt,
  ArrowRightCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { CheckoutModal } from './CheckoutModal';

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
    paymentMethod,
    setPaymentMethod,
    specialInstructions,
    setSpecialInstructions,
    getWhatsAppCartUrl,
    getWhatsAppCartMessage,
    sendWhatsAppCartOrder,
  } = useCart();

  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderId] = useState(() => `#MF-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isCartOpen) return null;

  const isDelivery = orderType === 'delivery';
  const isNameEmpty = !customerName.trim();
  const isAddressEmpty = isDelivery && !customerAddress.trim();
  const isBelowDeliveryMin = isDelivery && subtotal < STORE_CONFIG.minimumOrderForDelivery;

  const validateForm = (): boolean => {
    if (isNameEmpty) {
      setValidationError('Please enter your name below so we know who this order is for.');
      const nameInput = document.getElementById('cart-customer-name');
      if (nameInput) nameInput.focus();
      return false;
    }

    if (isAddressEmpty) {
      setValidationError('Please enter your delivery location/address, or select "Will share live location on WhatsApp".');
      const addressInput = document.getElementById('cart-customer-address');
      if (addressInput) addressInput.focus();
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleProceedToCheckout = () => {
    if (!validateForm()) return;
    setIsCheckoutOpen(true);
  };

  const handleQuickSend = (e: React.MouseEvent) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    sendWhatsAppCartOrder();
  };

  const handleCopyOrderText = () => {
    const text = getWhatsAppCartMessage();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const quickLocations = [
    'Near Central Park',
    'Main Road Commercial Hub',
    'Will share live location on WhatsApp',
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <div className="w-screen max-w-md bg-[#FFFDF9] text-[#3B241C] shadow-2xl flex flex-col justify-between border-l border-[#3B241C]/15 animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#3B241C]/10 flex items-center justify-between bg-[#FFF7EB]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#3B241C] text-[#FFF7EB] flex items-center justify-center font-serif-display font-bold">
                  M
                </div>
                <div>
                  <h2 className="font-serif-display font-bold text-lg text-[#3B241C]">
                    Your Order Tray
                  </h2>
                  <p className="text-xs text-[#3B241C]/65">
                    {totalCount} {totalCount === 1 ? 'shake' : 'shakes'} in your order
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

            {/* Body: Items & Order Details Form */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
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
                  
                  {/* Itemized Shakes List */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B241C]/60 block">
                      Selected Items
                    </span>

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/10 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg shrink-0 border border-[#3B241C]/10"
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
                  <div className="pt-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B241C]/70 mb-1.5">
                      Order Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#FFF7EB] rounded-xl border border-[#3B241C]/10">
                      <button
                        type="button"
                        onClick={() => {
                          setOrderType('takeaway');
                          setValidationError(null);
                        }}
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
                        onClick={() => {
                          setOrderType('delivery');
                          setValidationError(null);
                        }}
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

                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <div className="flex-1 font-medium">{validationError}</div>
                    </div>
                  )}

                  {/* Customer Details Form */}
                  <div className="space-y-3 pt-1 p-3.5 bg-[#FFF7EB]/60 rounded-xl border border-[#3B241C]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3B241C]/80">
                        Customer Information
                      </span>
                      <span className="text-[11px] text-[#C9955B] font-medium">
                        Sent with order receipt
                      </span>
                    </div>

                    {/* 1. Name Input */}
                    <div>
                      <label
                        htmlFor="cart-customer-name"
                        className="block text-xs font-semibold text-[#3B241C] mb-1 flex items-center justify-between"
                      >
                        <span>Your Name *</span>
                        {customerName.trim() && (
                          <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Ready</span>
                          </span>
                        )}
                      </label>
                      <input
                        id="cart-customer-name"
                        type="text"
                        required
                        placeholder="Enter your name (e.g. Rahul, Priya)..."
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFDF9] rounded-lg border text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none transition-all ${
                          isNameEmpty && validationError
                            ? 'border-red-400 ring-2 ring-red-200'
                            : 'border-[#3B241C]/20 focus:ring-2 focus:ring-[#C9955B]'
                        }`}
                      />
                    </div>

                    {/* 2. Delivery Address (Visible when Home Delivery is active) */}
                    {isDelivery && (
                      <div className="space-y-1.5 pt-1">
                        <label
                          htmlFor="cart-customer-address"
                          className="block text-xs font-semibold text-[#3B241C] flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#C9955B]" />
                            <span>Delivery Address / Location *</span>
                          </span>
                          {customerAddress.trim() && (
                            <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Address set</span>
                            </span>
                          )}
                        </label>
                        <input
                          id="cart-customer-address"
                          type="text"
                          required
                          placeholder="Enter flat/house no, street, landmark..."
                          value={customerAddress}
                          onChange={(e) => {
                            setCustomerAddress(e.target.value);
                            if (validationError) setValidationError(null);
                          }}
                          className={`w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFDF9] rounded-lg border text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none transition-all ${
                            isAddressEmpty && validationError
                              ? 'border-red-400 ring-2 ring-red-200'
                              : 'border-[#3B241C]/20 focus:ring-2 focus:ring-[#C9955B]'
                          }`}
                        />

                        {/* Quick Location Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[10px] text-[#3B241C]/60 self-center">Quick pick:</span>
                          {quickLocations.map((loc, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setCustomerAddress(loc);
                                if (validationError) setValidationError(null);
                              }}
                              className="text-[10px] bg-[#FFFDF9] hover:bg-[#FFF7EB] text-[#3B241C]/80 px-2 py-0.5 rounded border border-[#3B241C]/15 transition-colors"
                            >
                              + {loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Special Instructions */}
                    <div className="pt-1">
                      <label
                        htmlFor="cart-customer-notes"
                        className="block text-xs font-semibold text-[#3B241C] mb-1"
                      >
                        Special Instructions (Optional)
                      </label>
                      <input
                        id="cart-customer-notes"
                        type="text"
                        placeholder="e.g. Less sweet, extra ice cream, paper straws..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FFFDF9] rounded-lg border border-[#3B241C]/20 text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                      />
                    </div>
                  </div>

                  {/* PAYMENT OPTIONS SELECTION (Requested Feature) */}
                  <div className="p-3.5 bg-[#FFF7EB] rounded-xl border border-[#3B241C]/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3B241C]/80">
                        Select Payment Option
                      </span>
                      <span className="text-[10px] font-semibold text-[#C9955B]">
                        Zero Extra Fees
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Option 1: UPI */}
                      <label
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-[#FFFDF9] border-[#C9955B] ring-1 ring-[#C9955B]/40 shadow-xs'
                            : 'bg-white/60 border-[#3B241C]/10 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="mt-1 text-[#C9955B] focus:ring-[#C9955B]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs sm:text-sm text-[#3B241C] flex items-center gap-1.5">
                              <QrCode className="w-4 h-4 text-[#C9955B]" />
                              <span>UPI (GPay / PhonePe / Paytm / QR)</span>
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              Instant
                            </span>
                          </div>
                          <p className="text-[11px] text-[#3B241C]/65 mt-0.5">
                            Scan QR or pay directly to store UPI ID: <strong className="font-mono">{STORE_CONFIG.upiId}</strong>
                          </p>
                        </div>
                      </label>

                      {/* Option 2: Cash */}
                      <label
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === 'cash'
                            ? 'bg-[#FFFDF9] border-[#C9955B] ring-1 ring-[#C9955B]/40 shadow-xs'
                            : 'bg-white/60 border-[#3B241C]/10 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="mt-1 text-[#C9955B] focus:ring-[#C9955B]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs sm:text-sm text-[#3B241C] flex items-center gap-1.5">
                              <Banknote className="w-4 h-4 text-[#C9955B]" />
                              <span>{isDelivery ? 'Cash on Delivery (COD)' : 'Pay Cash at Counter'}</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-[#3B241C]/65 mt-0.5">
                            {isDelivery
                              ? 'Pay exact cash of ₹' + subtotal + ' to the delivery executive'
                              : 'Pay cash when collecting your shake order at our shop counter'}
                          </p>
                        </div>
                      </label>

                      {/* Option 3: Card / POS */}
                      <label
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-[#FFFDF9] border-[#C9955B] ring-1 ring-[#C9955B]/40 shadow-xs'
                            : 'bg-white/60 border-[#3B241C]/10 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mt-1 text-[#C9955B] focus:ring-[#C9955B]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs sm:text-sm text-[#3B241C] flex items-center gap-1.5">
                              <CreditCard className="w-4 h-4 text-[#C9955B]" />
                              <span>Card / POS Machine at Counter</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-[#3B241C]/65 mt-0.5">
                            Tap to pay or swipe Visa, Mastercard, RuPay & Apple/Google Pay at counter
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Delivery Threshold Notice */}
                  {isBelowDeliveryMin && (
                    <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Delivery Minimum Notice:</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Delivery is recommended for orders above {STORE_CONFIG.currencySymbol}{STORE_CONFIG.minimumOrderForDelivery} (current total: {STORE_CONFIG.currencySymbol}{subtotal}).
                      </p>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className="text-[11px] font-bold text-[#3B241C] underline hover:text-black block"
                      >
                        → Switch to Store Takeaway (No minimum order required)
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Footer Subtotal & CHECKOUT Action Buttons */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#3B241C]/10 bg-[#FFF7EB] space-y-3">
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#3B241C]/70 font-semibold block">
                      Estimated Subtotal
                    </span>
                    <span className="text-[11px] text-[#3B241C]/55">
                      {orderType === 'delivery' ? 'Home Delivery' : 'Takeaway Pickup'} · {paymentMethod.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-serif-display text-2xl font-bold text-[#3B241C] tabular-nums">
                    {STORE_CONFIG.currencySymbol}{subtotal}
                  </span>
                </div>

                {/* Primary Proceed to Checkout Button */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#3B241C] hover:bg-[#231510] active:scale-98 rounded-xl shadow-md transition-all text-center cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-[#C9955B]" />
                  <span>Proceed to Payment Checkout ({STORE_CONFIG.currencySymbol}{subtotal})</span>
                  <ArrowRight className="w-4 h-4 text-[#C9955B]" />
                </button>

                {/* Secondary Fast Track: Direct WhatsApp Dispatch */}
                <a
                  href={getWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleQuickSend}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] active:scale-98 rounded-xl shadow-xs transition-all text-center cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white shrink-0" />
                  <span>Quick Order directly on WhatsApp</span>
                </a>

                {/* Secondary Options: Copy Details & Call */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={handleCopyOrderText}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#3B241C] bg-[#FFFDF9] hover:bg-[#F4ECE1] border border-[#3B241C]/15 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C9955B]" />
                        <span>Copy Order Text</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${STORE_CONFIG.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#3B241C] bg-[#FFFDF9] hover:bg-[#F4ECE1] border border-[#3B241C]/15 rounded-lg transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9955B]" />
                    <span>Call Store</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-[#3B241C]/60">
                  Direct store connection to {STORE_CONFIG.whatsappDisplay}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Full-Screen Payment & Checkout Receipt Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderId={orderId}
      />
    </>
  );
};
