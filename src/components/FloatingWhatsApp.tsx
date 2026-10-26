import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello The Milkshake Factory! I would like to place an order or ask a question.'
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp Order Assistant"
      className="fixed bottom-5 right-5 z-40 group flex items-center"
    >
      {/* Tooltip bubble on desktop */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 text-xs font-semibold text-[#3B241C] bg-[#FFFDF9] border border-[#3B241C]/15 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Order or chat on WhatsApp!
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
};
