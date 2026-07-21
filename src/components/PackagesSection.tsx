import React, { useState } from 'react';
import { SERVICE_PACKAGES } from '../data/detailingData';
import { ServiceCategory } from '../types';
import { Check, Shield, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const filteredPackages =
    activeCategory === 'all'
      ? SERVICE_PACKAGES
      : SERVICE_PACKAGES.filter((p) => p.category === activeCategory);

  return (
    <section id="packages" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Master Service Tier Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            SERVICES & <span className="text-red-500">PRICING PACKAGES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every service is performed personally by Trevor Ehrenholz using high-end Rupes polishers, deionized water, and certified SiO2 ceramic coatings.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'mobile', label: 'Mobile Detailing' },
              { id: 'correction', label: 'Paint Correction' },
              { id: 'ceramic', label: 'Ceramic Coatings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950 border border-red-500/40'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl bg-zinc-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                pkg.popular
                  ? 'border-red-500/80 shadow-2xl shadow-red-950/40 hover:border-red-400'
                  : 'border-zinc-800/90 hover:border-zinc-700 shadow-xl'
              }`}
            >
              {/* Top Accent Line */}
              <div
                className={`h-1.5 w-full ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500'
                    : 'bg-zinc-800 group-hover:bg-red-600 transition-colors'
                }`}
              />

              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-red-400/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Requested</span>
                </div>
              )}

              <div className="p-6 space-y-5">
                {/* Package Header */}
                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block font-mono">
                    {pkg.category.toUpperCase()} PACKAGE
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-red-400 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{pkg.tagline}</p>
                </div>

                {/* Price & Duration */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Starting At</span>
                    <span className="text-2xl font-black text-white">${pkg.priceStart}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-red-500" />
                      Duration
                    </span>
                    <span className="text-xs font-bold text-zinc-300">{pkg.duration}</span>
                  </div>
                </div>

                {/* Recommended Use Case */}
                <div className="text-xs text-zinc-300 bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/50">
                  <span className="text-red-400 font-bold block mb-0.5">Best Suited For:</span>
                  <p className="text-zinc-400 leading-snug">{pkg.recommendedFor}</p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                    Included Treatments:
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Protection Warranty Tag */}
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40 text-[11px] font-semibold text-red-300 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{pkg.protectionTerm}</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-xl shadow-red-950 border border-red-500/40'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/60'
                  }`}
                >
                  <span>Select & Book Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
