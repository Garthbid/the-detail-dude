import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/detailingData';
import { GalleryItem } from '../types';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Master Work Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            RECENT <span className="text-red-500">DETAILING PROJECTS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            High gloss ceramic coats, swirl-free paint correction, and immaculate interior restorations completed on location by Trevor Ehrenholz.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Work' },
              { id: 'correction', label: 'Paint Correction' },
              { id: 'ceramic', label: 'Ceramic Coating' },
              { id: 'interior', label: 'Interior Revival' },
              { id: 'full', label: 'Full Mobile Details' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950 border border-red-500/40'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer shadow-xl hover:border-red-500/60 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 bg-zinc-900/90 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Maximize2 className="w-4 h-4 text-red-400" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-md">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block font-mono">
                    {item.category.toUpperCase()} • {item.vehicle}
                  </span>
                  <h4 className="text-sm font-extrabold text-white truncate mt-0.5">{item.title}</h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-red-600 transition-colors z-10"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
                {selectedImage.category.toUpperCase()} • {selectedImage.vehicle}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-xs text-zinc-300">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
