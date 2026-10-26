import React, { useState } from 'react';
import { Star, MessageSquareQuote, Send, PlusCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

interface ReviewPlaceholder {
  id: string;
  author: string;
  location: string;
  shakeLoved: string;
  rating: number;
  reviewText: string;
}

export const ReviewsSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReviewer, setNewReviewer] = useState('');
  const [newShake, setNewShake] = useState('');
  const [newText, setNewText] = useState('');

  // Clearly labelled sample placeholders
  const placeholderReviews: ReviewPlaceholder[] = [
    {
      id: 'rev-1',
      author: 'Sample Tasting Note',
      location: 'Local Customer',
      shakeLoved: 'Chocolate Blast',
      rating: 5,
      reviewText:
        '“The thickness is unmatched! You can genuinely taste the real ice cream and dense fudge. Not watery like normal takeaway shakes.”',
    },
    {
      id: 'rev-2',
      author: 'Sample Tasting Note',
      location: 'Weekend Regular',
      shakeLoved: 'Dry Fruit Special',
      rating: 5,
      reviewText:
        '“Generous with roasted pistachios and real saffron strands. A rich royal treat that keeps you energized for hours.”',
    },
    {
      id: 'rev-3',
      author: 'Sample Tasting Note',
      location: 'Student / Dessert Lover',
      shakeLoved: 'Oreo Chocolate Shake',
      rating: 5,
      reviewText:
        '“The cookie crust rim and chocolate drizzle makes this feel like a luxury dessert cafe at very reasonable prices.”',
    },
  ];

  const handleSendFeedbackWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newText) return;

    const message = `✨ *CUSTOMER REVIEW / FEEDBACK - ${STORE_CONFIG.brandName.toUpperCase()}*\n\n` +
      `👤 Name: ${newReviewer}\n` +
      `🥤 Favorite Shake: ${newShake || 'All of them'}\n` +
      `⭐ Rating: 5/5\n` +
      `💬 Feedback:\n"${newText}"\n\n` +
      `Feel free to feature this on the website!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setNewReviewer('');
    setNewShake('');
    setNewText('');
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-[#3B241C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Love & Tasting Notes</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
            What Milkshake Lovers Say
          </h2>
          <p className="text-base text-[#3B241C]/80">
            Real feedback from our happy neighborhood customers. We blend every cup to delight your tastebuds.
          </p>

          {/* Explicit Placeholder Notice as required */}
          <div className="mt-3 inline-block px-3 py-1 rounded-md bg-[#FFF7EB] border border-[#C9955B]/30 text-[12px] text-[#3B241C]/70">
            [Sample Review Templates — Real customer testimonials will be updated as received from our WhatsApp and store feedback]
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {placeholderReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFF7EB] rounded-2xl p-6 sm:p-7 border border-[#3B241C]/10 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C9955B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9955B]" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#3B241C]/85 italic leading-relaxed mb-6">
                  {rev.reviewText}
                </p>
              </div>

              <div className="pt-4 border-t border-[#3B241C]/10 flex items-center justify-between">
                <div>
                  <p className="font-serif-display font-bold text-sm text-[#3B241C]">
                    {rev.author}
                  </p>
                  <p className="text-xs text-[#3B241C]/60">
                    {rev.location}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#C9955B] bg-[#3B241C]/5 px-2 py-1 rounded">
                  {rev.shakeLoved}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive "Leave a Review" Call to Action */}
        <div className="max-w-xl mx-auto text-center">
          {!isSubmitting ? (
            <button
              onClick={() => setIsSubmitting(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#3B241C] bg-[#FFF7EB] hover:bg-[#F4ECE1] border border-[#3B241C]/20 rounded-xl transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#C9955B]" />
              <span>Share Your Tasting Experience</span>
            </button>
          ) : (
            <form onSubmit={handleSendFeedbackWhatsApp} className="bg-[#FFF7EB] p-6 rounded-2xl border border-[#3B241C]/15 text-left space-y-4">
              <h3 className="font-serif-display font-bold text-lg text-[#3B241C]">
                Send Us Your Tasting Note
              </h3>
              <p className="text-xs text-[#3B241C]/70">
                Your review will be sent directly to our store WhatsApp team to be featured on our board!
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#3B241C] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newReviewer}
                  onChange={(e) => setNewReviewer(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B241C] mb-1">Which Shake Did You Have?</label>
                <input
                  type="text"
                  placeholder="e.g. Oreo Chocolate or Strawberry Delight"
                  value={newShake}
                  onChange={(e) => setNewShake(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B241C] mb-1">Your Review / Comments</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the thickness, flavor, and experience..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#3B241C]/15 text-[#3B241C] focus:outline-none focus:ring-2 focus:ring-[#C9955B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitting(false)}
                  className="px-3 py-1.5 text-xs text-[#3B241C]/70 hover:text-[#3B241C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
