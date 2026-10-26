import React, { useState } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryImages: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Caramel Swirl Supreme',
      category: 'Signature',
      image: '/src/assets/images/hero_signature_milkshake_1792925923360.jpg',
      caption: 'Slow-drizzled butter caramel over fresh vanilla soft cream and shaved cocoa.',
    },
    {
      id: 'g-2',
      title: 'Decadent Chocolate Blast',
      category: 'Chocolate',
      image: '/src/assets/images/chocolate_blast_shake_1792925923688.jpg',
      caption: 'Pure Belgian dark chocolate ganache dripping with rich cocoa syrup & wafers.',
    },
    {
      id: 'g-3',
      title: 'Fresh Strawberry Delight',
      category: 'Fruity',
      image: '/src/assets/images/strawberry_delight_shake_1792925925397.jpg',
      caption: 'Real strawberry crush blended with cream and fresh hand-cut berry slices.',
    },
    {
      id: 'g-4',
      title: 'Royal Dry Fruit & Saffron',
      category: 'Dry Fruit',
      image: '/src/assets/images/dry_fruit_royal_shake_1792925926326.jpg',
      caption: 'Lavishly loaded with pistachios, slivered almonds, cashews, and Kashmiri saffron.',
    },
    {
      id: 'g-5',
      title: 'Oreo & Cream Thickshake',
      category: 'Signature',
      image: '/src/assets/images/oreo_biscoff_shake_1792925925977.jpg',
      caption: 'Cookie-crumb crusted rim with deep chocolate fudge and a whole Oreo cookie.',
    },
    {
      id: 'g-6',
      title: 'Sun-Ripened Alphonso Mango',
      category: 'Fruity',
      image: '/src/assets/images/mango_alphonso_shake_1792925980989.jpg',
      caption: 'Pure Ratnagiri Alphonso mango pulp churned fresh with whole dairy cream.',
    },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FFF7EB] border-b border-[#3B241C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9955B] mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Behind The Blender</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C] tracking-tight mb-4">
            A Feast for the Eyes
          </h2>
          <p className="text-base text-[#3B241C]/80">
            Fresh blends, real toppings, and mouth-watering textures created every day in our shop.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-[#F4ECE1] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3B241C]/10"
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Scrim Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#FFF7EB]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9955B]">
                  {photo.category}
                </span>
                <p className="font-serif-display text-base font-bold leading-tight">
                  {photo.title}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-white/80 mt-1">
                  <ZoomIn className="w-3 h-3" />
                  <span>Tap to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-[#231510] text-[#FFF7EB] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#231510]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C9955B]">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif-display text-2xl font-bold mt-1 mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-[#FFF7EB]/80 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
