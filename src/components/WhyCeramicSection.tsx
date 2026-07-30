import React from 'react';
import { Sparkles, Droplets, ShieldCheck, Sun, Clock } from 'lucide-react';

const BENEFITS = [
  {
    icon: Sun,
    title: 'Maximum shine that lasts',
    detail: 'Up to 3 years of deep, mirror-like gloss.',
  },
  {
    icon: Droplets,
    title: 'Easy to wash and keep clean',
    detail: 'You can often wash the car without soap — a simple rinse may be all it needs.',
  },
  {
    icon: ShieldCheck,
    title: 'Superior protection for your paint',
    detail: 'A hard ceramic barrier shields your clear coat from the elements.',
  },
  {
    icon: Sparkles,
    title: 'Outstanding hydrophobic properties',
    detail: 'Water beads up and rolls off, carrying dirt and grime with it.',
  },
];

export const WhyCeramicSection: React.FC = () => {
  return (
    <section id="why-ceramic" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ceramic Coating Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            WHY CERAMIC COAT <span className="text-red-500">YOUR RIDE</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            A professional ceramic coating is the single best way to protect your investment and keep it looking showroom-fresh with almost no effort.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-red-500/50 transition-all p-6 flex flex-col gap-3 shadow-xl group"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600/15 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:bg-red-600/25 transition-colors">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-base leading-snug">{b.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{b.detail}</p>
            </div>
          ))}
        </div>

        {/* Longevity Strip */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <Clock className="w-3.5 h-3.5 text-red-500" />
          <span>Protection that lasts for years — not weeks like traditional wax.</span>
        </div>
      </div>
    </section>
  );
};
