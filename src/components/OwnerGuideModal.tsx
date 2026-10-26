import React from 'react';
import { X, BookOpen, Check, Settings, UploadCloud, Globe, Code } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="relative bg-[#FFFDF9] text-[#3B241C] rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#3B241C]/15 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#3B241C]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B241C] text-[#FFF7EB] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#C9955B]" />
            </div>
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-[#3B241C]">
                Shop Owner Guide
              </h2>
              <p className="text-xs text-[#3B241C]/70">
                How to customize phone numbers, update menu & prices, and deploy online.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#3B241C]/60 hover:text-[#3B241C] rounded-lg hover:bg-[#3B241C]/5"
            aria-label="Close owner guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 pt-5 text-sm text-[#3B241C]/85">
          
          {/* Step 1: WhatsApp & Contact Configuration */}
          <div className="p-4 rounded-2xl bg-[#FFF7EB] border border-[#3B241C]/10 space-y-2">
            <div className="flex items-center gap-2 font-bold text-base text-[#3B241C]">
              <Settings className="w-4 h-4 text-[#C9955B]" />
              <span>1. How to Set Your Real WhatsApp & Phone</span>
            </div>
            <p className="text-xs text-[#3B241C]/80 leading-relaxed">
              Open file <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#3B241C]/15 text-[#3B241C]">src/data/storeConfig.ts</code>:
            </p>
            <div className="bg-[#231510] text-[#FFF7EB] p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <div>// Update with your country code + 10-digit number (no + or spaces)</div>
              <div className="text-[#C9955B]">whatsappNumber: "91XXXXXXXXXX",</div>
              <div className="text-[#C9955B]">whatsappDisplay: "+91 XXXXX XXXXX",</div>
              <div className="text-[#C9955B]">addressLine1: "Your Shop Address...",</div>
              <div className="text-[#C9955B]">openingHoursDisplay: "11:00 AM – 11:30 PM",</div>
            </div>
            <p className="text-[11px] text-[#3B241C]/70">
              When a customer clicks any "Order on WhatsApp" or sends their tray, WhatsApp will instantly open a chat directly with your phone number with the items pre-filled!
            </p>
          </div>

          {/* Step 2: Menu & Price Customization */}
          <div className="p-4 rounded-2xl bg-[#FFF7EB] border border-[#3B241C]/10 space-y-2">
            <div className="flex items-center gap-2 font-bold text-base text-[#3B241C]">
              <Code className="w-4 h-4 text-[#C9955B]" />
              <span>2. How to Edit Menu Items, Prices & Combos</span>
            </div>
            <p className="text-xs text-[#3B241C]/80 leading-relaxed">
              Open <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#3B241C]/15 text-[#3B241C]">src/data/menuData.ts</code> or <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#3B241C]/15 text-[#3B241C]">src/data/combosData.ts</code>:
            </p>
            <div className="bg-[#231510] text-[#FFF7EB] p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <div>// Example menu item:</div>
              <div>&#123;</div>
              <div className="pl-4">id: 'choco-blast',</div>
              <div className="pl-4 text-[#C9955B]">name: 'Chocolate Blast',</div>
              <div className="pl-4 text-[#C9955B]">price: 80, // in Rupees</div>
              <div className="pl-4">description: 'Double chocolate fudge shake...',</div>
              <div>&#125;</div>
            </div>
            <p className="text-[11px] text-[#3B241C]/70">
              Change the price number or description and the website updates everywhere automatically.
            </p>
          </div>

          {/* Step 3: Running Locally */}
          <div className="p-4 rounded-2xl bg-[#FFF7EB] border border-[#3B241C]/10 space-y-2">
            <div className="flex items-center gap-2 font-bold text-base text-[#3B241C]">
              <Globe className="w-4 h-4 text-[#C9955B]" />
              <span>3. How to Run Locally</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-xs text-[#3B241C]/80">
              <li>Open your project folder in your terminal or VS Code.</li>
              <li>Run <code className="font-mono bg-white px-1 rounded">npm install</code> to install dependencies.</li>
              <li>Run <code className="font-mono bg-white px-1 rounded">npm run dev</code> to start the local development server.</li>
              <li>Open <code className="font-mono bg-white px-1 rounded">http://localhost:3000</code> in your browser.</li>
            </ol>
          </div>

          {/* Step 4: Free Deployment Options */}
          <div className="p-4 rounded-2xl bg-[#FFF7EB] border border-[#3B241C]/10 space-y-2">
            <div className="flex items-center gap-2 font-bold text-base text-[#3B241C]">
              <UploadCloud className="w-4 h-4 text-[#C9955B]" />
              <span>4. Free Deployment Options & Limitations</span>
            </div>
            <p className="text-xs text-[#3B241C]/80 leading-relaxed">
              Because this website requires no database or backend server, you can host it 100% for free with custom domain support:
            </p>
            <ul className="space-y-1.5 text-xs text-[#3B241C]/80">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Vercel (Recommended):</strong> Push your code to GitHub, connect to Vercel.com, and click Deploy. Free SSL, lightning-fast CDN, zero cost.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Netlify:</strong> Drag and drop your built <code className="font-mono bg-white px-1 rounded">dist</code> folder or connect via GitHub. Free tier supports 100GB/month bandwidth.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                <span><strong>Cloudflare Pages:</strong> Unlimited bandwidth on free tier, global edge caching.</span>
              </li>
            </ul>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
              <strong>Note on Limitations:</strong> Free hosting tiers don't include custom email addresses or SMS gateways, but with WhatsApp ordering, all orders go directly to your personal or business WhatsApp with zero third-party commissions!
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-6 mt-4 border-t border-[#3B241C]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-[#FFF7EB] bg-[#3B241C] hover:bg-[#231510] rounded-xl transition-colors"
          >
            Got It, Thanks!
          </button>
        </div>

      </div>
    </div>
  );
};
