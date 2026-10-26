import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Instagram, ExternalLink, Send, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Bulk / Party Order');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lineBreak = '\n';
    let text = `👋 *NEW ENQUIRY - ${STORE_CONFIG.brandName.toUpperCase()}*${lineBreak}`;
    text += `-----------------------------------${lineBreak}`;
    text += `Name: ${inquiryName || 'Customer'}${lineBreak}`;
    if (inquiryPhone) text += `Contact: ${inquiryPhone}${lineBreak}`;
    text += `Subject: ${inquiryType}${lineBreak}`;
    if (inquiryMessage) text += `Details: ${inquiryMessage}${lineBreak}`;
    text += `-----------------------------------${lineBreak}`;
    text += `Hello, I'd like more information about this.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FFF7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visit Us & Connect</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
            Find Our Shop & Say Hello
          </h2>
          <p className="text-base text-[#3B241C]/80">
            Drop by for a freshly blended thickshake, or reach out directly for instant takeaway pickups, party orders, and deliveries.
          </p>

          {/* Editable Placeholder Note */}
          {STORE_CONFIG.isConfiguredPlaceholder && (
            <div className="mt-3 inline-block px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#C9955B]/40 text-[11px] text-[#3B241C]/80">
              [Store Owner: Update your real contact numbers, address, and hours anytime in <code className="font-mono text-[#3B241C] bg-[#FFF7EB] px-1 rounded">src/data/storeConfig.ts</code>]
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Store Hours */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Phone & WhatsApp Card */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#3B241C]/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display font-bold text-lg text-[#3B241C]">
                    WhatsApp Ordering & Calls
                  </h3>
                  <span className="text-xs text-[#3B241C]/60">Instant response during store hours</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C9955B] font-bold block">
                      WhatsApp Chat & Orders
                    </span>
                    <span className="font-mono font-semibold text-sm sm:text-base text-[#3B241C]">
                      {STORE_CONFIG.whatsappDisplay}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello! I would like to place a milkshake order.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C9955B] font-bold block">
                      Direct Phone Call
                    </span>
                    <span className="font-mono font-semibold text-sm sm:text-base text-[#3B241C]">
                      {STORE_CONFIG.phoneDisplay}
                    </span>
                  </div>
                  <a
                    href={`tel:${STORE_CONFIG.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9955B]" />
                    <span>Call Store</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Directions Card */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#3B241C]/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9955B]/15 text-[#C9955B] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#3B241C]" />
                </div>
                <div>
                  <h3 className="font-serif-display font-bold text-lg text-[#3B241C]">
                    Shop Location
                  </h3>
                  <span className="text-xs text-[#3B241C]/60">Dine-in counter & takeaway pickup</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF7EB] border border-[#3B241C]/5 mb-4 space-y-1 text-sm text-[#3B241C]/85">
                <p className="font-semibold text-[#3B241C]">{STORE_CONFIG.brandName}</p>
                <p>{STORE_CONFIG.addressLine1}</p>
                <p>{STORE_CONFIG.addressLine2}</p>
                <p className="text-xs text-[#3B241C]/70">{STORE_CONFIG.cityStatePincode}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] rounded-lg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C9955B]" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </a>

                <a
                  href={STORE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#3B241C] bg-[#FFF7EB] hover:bg-[#F3E7D5] border border-[#3B241C]/15 rounded-lg transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#3B241C]/10 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-[#C9955B]" />
                <h3 className="font-serif-display font-bold text-base text-[#3B241C]">
                  Opening Hours
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-[#3B241C] py-2 border-b border-[#3B241C]/10">
                <span className="font-medium">{STORE_CONFIG.openingDays}</span>
                <span className="font-semibold font-mono text-[#C9955B]">{STORE_CONFIG.openingHoursDisplay}</span>
              </div>
              <p className="text-xs text-[#3B241C]/65 mt-2">
                Fresh ice cream batches prepared every morning. Late night orders accepted until 11:15 PM.
              </p>
            </div>

          </div>

          {/* Right Column: Quick WhatsApp Enquiry & Booking Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#3B241C]/10 shadow-xs">
              
              <div className="mb-6">
                <h3 className="font-serif-display font-bold text-2xl text-[#3B241C] mb-1">
                  Send an Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#3B241C]/75">
                  Have questions about catering, corporate bulk orders, birthday parties, or special flavor requests? Drop us a line.
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B241C] mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Gupta"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF7EB] rounded-xl border border-[#3B241C]/15 text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B241C] mb-1.5">
                    Contact Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF7EB] rounded-xl border border-[#3B241C]/15 text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B241C] mb-1.5">
                    Enquiry Topic
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF7EB] rounded-xl border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                  >
                    <option value="Bulk / Party Order">Birthday / Party Bulk Order (10+ Shakes)</option>
                    <option value="Home Delivery Query">Home Delivery & Location Query</option>
                    <option value="Flavor Customization">Dietary / Custom Flavor Request</option>
                    <option value="General Feedback">General Question & Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B241C] mb-1.5">
                    Message / Requirement Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're planning, desired delivery date/time, and shake preferences..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF7EB] rounded-xl border border-[#3B241C]/15 text-[#3B241C] placeholder-[#3B241C]/40 focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-[#FFF7EB] bg-[#25D366] hover:bg-[#20BD5A] active:scale-98 rounded-xl shadow-md transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Enquiry to Store WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#3B241C]/60 pt-1">
                  Clicking will open WhatsApp with your pre-filled inquiry. No automated charges or logins needed.
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
