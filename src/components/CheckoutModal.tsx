import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  MessageCircle,
  QrCode,
  CreditCard,
  Banknote,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Clock,
  Printer,
  Sparkles,
  Phone,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/storeConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const {
    items,
    subtotal,
    customerName,
    customerAddress,
    orderType,
    paymentMethod,
    upiTransactionRef,
    setUpiTransactionRef,
    specialInstructions,
    getWhatsAppCartUrl,
    getWhatsAppCartMessage,
    clearCart,
  } = useCart();

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(false);
  const [isScannerZoomed, setIsScannerZoomed] = useState(false);

  if (!isOpen) return null;

  const isDelivery = orderType === 'delivery';

  // UPI Intent URL for mobile UPI apps (Google Pay, PhonePe, Paytm, BHIM)
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(
    STORE_CONFIG.upiId
  )}&pn=${encodeURIComponent(STORE_CONFIG.upiName)}&am=${subtotal}&cu=INR&tn=${encodeURIComponent(
    `Order ${orderId} - The Milkshake Factory`
  )}`;

  // Dynamic QR Code using standard Google Charts QR API
  const upiQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(
    upiIntentUrl
  )}`;

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(STORE_CONFIG.upiId).then(() => {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    });
  };

  const handleCopyReceipt = () => {
    const text = getWhatsAppCartMessage();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2500);
    });
  };

  const handleFinalizeAndOpenWhatsApp = () => {
    setIsCompletedState(true);
    // WhatsApp URL will be opened directly
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative bg-[#FFFDF9] text-[#3B241C] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#3B241C]/15 z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#3B241C]/10 bg-[#FFF7EB] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B241C] text-[#FFF7EB] flex items-center justify-center font-serif-display font-bold text-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-display font-bold text-xl sm:text-2xl text-[#3B241C]">
                  Order Checkout
                </h2>
                <span className="text-xs font-mono bg-[#3B241C]/10 text-[#3B241C] px-2 py-0.5 rounded font-bold">
                  {orderId}
                </span>
              </div>
              <p className="text-xs text-[#3B241C]/70">
                Review payment details and dispatch directly to store WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#3B241C]/60 hover:text-[#3B241C] rounded-lg hover:bg-[#3B241C]/5 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {!isCompletedState ? (
            <>
              {/* Order Summary Receipt Box */}
              <div className="p-4 rounded-2xl bg-[#FFF7EB] border border-[#3B241C]/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#3B241C]/70 border-b border-[#3B241C]/10 pb-2">
                  <span>Order Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span>Amount</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#3B241C]">{item.name}</span>
                        <span className="text-xs text-[#3B241C]/60">× {item.quantity}</span>
                      </div>
                      <span className="font-mono font-semibold tabular-nums text-[#3B241C]">
                        {STORE_CONFIG.currencySymbol}{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#3B241C]/10 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm text-[#3B241C]">Total Payable</span>
                    <span className="block text-[11px] text-[#3B241C]/60">Taxes & packaging included</span>
                  </div>
                  <span className="font-serif-display text-2xl font-bold text-[#3B241C] tabular-nums">
                    {STORE_CONFIG.currencySymbol}{subtotal}
                  </span>
                </div>
              </div>

              {/* Customer & Delivery Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FFF7EB]/60 border border-[#3B241C]/10">
                  <span className="text-[10px] uppercase font-bold text-[#C9955B] block mb-1">
                    Customer Name
                  </span>
                  <p className="font-semibold text-sm text-[#3B241C]">
                    {customerName.trim() || 'Valued Guest'}
                  </p>
                  <p className="text-[#3B241C]/60 mt-0.5">
                    Order Type: <strong>{isDelivery ? 'Home Delivery' : 'Store Takeaway'}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FFF7EB]/60 border border-[#3B241C]/10">
                  <span className="text-[10px] uppercase font-bold text-[#C9955B] block mb-1">
                    {isDelivery ? 'Delivery Location' : 'Pickup Store'}
                  </span>
                  <p className="font-semibold text-[#3B241C] line-clamp-2">
                    {isDelivery
                      ? customerAddress.trim() || 'Location specified on WhatsApp'
                      : STORE_CONFIG.addressLine1}
                  </p>
                </div>
              </div>

              {/* Payment Section Based on Selection */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#C9955B]/40 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {paymentMethod === 'upi' ? (
                      <QrCode className="w-5 h-5 text-[#C9955B]" />
                    ) : paymentMethod === 'card' ? (
                      <CreditCard className="w-5 h-5 text-[#C9955B]" />
                    ) : (
                      <Banknote className="w-5 h-5 text-[#C9955B]" />
                    )}
                    <h3 className="font-serif-display font-bold text-base text-[#3B241C]">
                      Selected Payment: {paymentMethod === 'upi' ? 'UPI (Instant Online)' : paymentMethod === 'card' ? 'Card at Counter' : isDelivery ? 'Cash on Delivery (COD)' : 'Cash at Counter'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Selected
                  </span>
                </div>

                {/* If UPI Selected: Show Official PhonePe Account Scanner & Details */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 pt-1">
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-[#1A0B2E] via-[#2A104E] to-[#120524] text-white rounded-2xl shadow-md border border-[#5F259F]/30">
                      
                      {/* Top PhonePe Banner */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#5F259F] text-white flex items-center justify-center font-bold text-base shadow-xs">
                            पे
                          </div>
                          <div>
                            <span className="font-bold text-sm tracking-wide block">PhonePe Accepted Here</span>
                            <span className="text-[10px] text-white/70">Also works with Google Pay, Paytm & BHIM</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-[#C9955B] font-semibold block">Payable</span>
                          <span className="font-serif-display text-xl font-bold text-white tabular-nums">₹{subtotal}</span>
                        </div>
                      </div>

                      {/* Main Scanner Card */}
                      <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                        {/* Real Uploaded PhonePe Scanner Image */}
                        <div
                          onClick={() => setIsScannerZoomed(true)}
                          className="relative group shrink-0 cursor-pointer"
                        >
                          <div className="bg-black p-2 rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                            <img
                              src={STORE_CONFIG.qrScannerImage}
                              alt="PhonePe Account Scanner - Manivisetti Lakshmi Sri"
                              className="w-44 h-auto max-h-56 object-contain rounded-xl transition-transform group-hover:scale-105"
                            />
                          </div>
                          <span className="absolute bottom-3 inset-x-2 text-center text-[10px] font-semibold bg-black/85 text-white py-1 rounded-lg backdrop-blur-xs shadow-xs group-hover:bg-[#5F259F] transition-colors">
                            🔍 Tap to enlarge scanner
                          </span>
                        </div>

                        {/* Scanner Context Details */}
                        <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block">
                              Account Holder Name
                            </span>
                            <p className="font-serif-display font-bold text-base sm:text-lg text-white">
                              {STORE_CONFIG.accountHolderName}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block">
                              Linked UPI ID / Phone Number
                            </span>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                              <code className="font-mono text-xs sm:text-sm font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
                                {STORE_CONFIG.whatsappNumber}@upi / {STORE_CONFIG.whatsappDisplay}
                              </code>
                              <button
                                type="button"
                                onClick={handleCopyUpiId}
                                className="px-2 py-1 text-xs font-semibold bg-[#5F259F] hover:bg-[#7B32CF] text-white rounded-lg transition-colors shadow-xs"
                                title="Copy UPI details"
                              >
                                {copiedUpi ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-white/70 leading-relaxed">
                            Open PhonePe, Google Pay, or Paytm on your phone and scan the QR code to complete payment of <strong>₹{subtotal}</strong>.
                          </p>

                          {/* Direct Mobile UPI Intent Button */}
                          <a
                            href={upiIntentUrl}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#5F259F] hover:bg-[#722CBD] rounded-xl shadow-md transition-colors w-full sm:w-auto"
                          >
                            <span>Open PhonePe / UPI App to Pay ₹{subtotal}</span>
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* UTR / Transaction Reference Input */}
                    <div className="p-3 bg-[#FFF7EB] rounded-xl border border-[#3B241C]/10 space-y-1">
                      <label className="block text-xs font-semibold text-[#3B241C]">
                        Transaction Reference / UTR Number (Optional):
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 12-digit UTR or transaction ID after paying..."
                        value={upiTransactionRef}
                        onChange={(e) => setUpiTransactionRef(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#3B241C]/20 text-[#3B241C] focus:outline-none focus:ring-1 focus:ring-[#C9955B]"
                      />
                      <p className="text-[11px] text-[#3B241C]/60 pt-0.5">
                        Tip: You can also send the payment screenshot directly in the WhatsApp chat!
                      </p>
                    </div>
                  </div>
                )}

                {/* If Cash Selected */}
                {paymentMethod === 'cash' && (
                  <div className="p-3 bg-[#FFF7EB] rounded-xl text-xs text-[#3B241C]/80 leading-relaxed space-y-1">
                    <p className="font-semibold text-[#3B241C]">
                      {isDelivery ? '💵 Cash on Delivery (COD)' : '💵 Cash Payment at Counter'}
                    </p>
                    <p>
                      {isDelivery
                        ? 'Hand over exact change of ₹' + subtotal + ' when our delivery partner arrives at your address.'
                        : 'Pay cash directly at our shop counter when collecting your freshly churned thickshakes.'}
                    </p>
                  </div>
                )}

                {/* If Card Selected */}
                {paymentMethod === 'card' && (
                  <div className="p-3 bg-[#FFF7EB] rounded-xl text-xs text-[#3B241C]/80 leading-relaxed space-y-1">
                    <p className="font-semibold text-[#3B241C]">
                      💳 Credit / Debit Card & Tap-to-Pay POS
                    </p>
                    <p>
                      Our store counter is equipped with a digital POS machine supporting Visa, Mastercard, RuPay, and contactless NFC / Apple Pay / Google Wallet.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Order Dispatched / Success Screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-display font-bold text-2xl text-[#3B241C]">
                Checkout Dispatched to WhatsApp!
              </h3>
              <p className="text-sm text-[#3B241C]/80 max-w-md mx-auto leading-relaxed">
                Your order <strong>{orderId}</strong> and chosen payment method have been pre-filled into WhatsApp. Our team will verify prep time and confirm immediately.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Re-open WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#3B241C] bg-[#FFF7EB] hover:bg-[#F4ECE1] border border-[#3B241C]/20 rounded-xl transition-colors"
                >
                  Start New Order
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Action Bar */}
        {!isCompletedState && (
          <div className="p-4 sm:p-6 border-t border-[#3B241C]/10 bg-[#FFF7EB] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyReceipt}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#3B241C] bg-[#FFFDF9] hover:bg-[#F4ECE1] border border-[#3B241C]/15 rounded-xl transition-colors"
            >
              {copiedReceipt ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Order Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C9955B]" />
                  <span>Copy Receipt Summary</span>
                </>
              )}
            </button>

            <a
              href={getWhatsAppCartUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFinalizeAndOpenWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] active:scale-98 rounded-xl shadow-md transition-all text-center cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-white shrink-0" />
              <span>Confirm & Send Order via WhatsApp</span>
            </a>
          </div>
        )}

      </div>

      {/* Fullscreen Zoomed Scanner Lightbox */}
      {isScannerZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsScannerZoomed(false)}
        >
          <div
            className="relative max-w-sm w-full bg-[#1A0B2E] p-5 rounded-3xl border border-[#5F259F]/50 shadow-2xl text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsScannerZoomed(false)}
              className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close enlarged scanner"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="w-6 h-6 rounded-full bg-[#5F259F] text-white flex items-center justify-center font-bold text-xs">
                पे
              </span>
              <span className="text-white font-bold text-sm tracking-wide">PhonePe Scanner</span>
            </div>

            <div className="bg-black p-2 rounded-2xl border border-white/20 overflow-hidden shadow-inner">
              <img
                src={STORE_CONFIG.qrScannerImage}
                alt="PhonePe Account Scanner - Manivisetti Lakshmi Sri"
                className="w-full h-auto max-h-[65vh] object-contain rounded-xl mx-auto"
              />
            </div>

            <div>
              <p className="text-white font-serif-display font-bold text-base">
                {STORE_CONFIG.accountHolderName}
              </p>
              <p className="text-[#C9955B] text-xs font-semibold">
                Scan to pay ₹{subtotal} to The Milkshake Factory
              </p>
              <p className="text-white/60 text-[11px] mt-1">
                UPI: {STORE_CONFIG.whatsappNumber}@upi ({STORE_CONFIG.whatsappDisplay})
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsScannerZoomed(false)}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#5F259F] hover:bg-[#722CBD] rounded-xl transition-colors cursor-pointer"
            >
              Done / Close Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
