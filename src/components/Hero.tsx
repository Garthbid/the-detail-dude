import React from 'react';
import { Phone, Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

interface HeroProps {
  onOpenConsultant: () => void;
  onScrollToEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultant,
  onScrollToEstimator,
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-zinc-950 text-white overflow-hidden">
      {/* Background Hero Image with Dark Gradient & Red Ambient Glow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car detailing"
          className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        {/* Subtle crimson radial gradient lights */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-red-800/50 text-xs font-semibold tracking-wide text-zinc-200 shadow-xl backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-bold uppercase">{CLIENT_INFO.businessName}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">Trevor Ehrenholz</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              MASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">PAINT CORRECTION</span> & CERAMIC COATING
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
              Obsessive mobile detailing craftsmanship. Eliminating 85%+ of swirl marks, restoring deep mirror reflections, and locking in multi-year ceramic protection—right in your driveway.
            </p>

            {/* Key Value Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>100% Mobile Self-Contained Rig</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                <span>Paint Correction Specialist</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
                className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-xl shadow-red-950/80 border border-red-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Phone className="w-4 h-4" />
                <span>Call Trevor: {CLIENT_INFO.phone}</span>
              </a>

              <button
                onClick={onScrollToEstimator}
                className="px-6 py-4 text-sm font-bold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all hover:border-red-500/40 flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
              >
                <span>Calculate Instant Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* AI Advisor Prompt Bar */}
            <div className="pt-3">
              <button
                onClick={onOpenConsultant}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-zinc-900 via-red-950/40 to-zinc-900 border border-red-800/40 hover:border-red-500/60 transition-all text-xs text-left text-zinc-300 flex items-center justify-between gap-3 group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-red-600/30 flex items-center justify-center text-red-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>Not sure which package your car needs? Ask Trevor's AI Advisor</span>
                </div>
                <span className="text-red-400 font-bold group-hover:translate-x-1 transition-transform shrink-0">
                  Analyze Vehicle →
                </span>
              </button>
            </div>
          </div>

          {/* Right Hero Side - Trevor Profile / Quick Info Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden">
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

              <div className="flex items-center gap-4 pb-5 border-b border-zinc-800">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-red-600/60 shadow-lg shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80"
                    alt="Trevor Ehrenholz Detailing"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    {CLIENT_INFO.ownerName}
                    <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/60 px-2 py-0.5 rounded font-mono uppercase">
                      Pro Detailer
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">{CLIENT_INFO.businessName} • Mobile Specialist</p>
                  <p className="text-xs text-red-400 font-medium mt-0.5">📞 Direct: {CLIENT_INFO.formattedPhone}</p>
                </div>
              </div>

              {/* Quick Specs List */}
              <div className="py-4 space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <Zap className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-200">Rupes Machine Polishing:</span>
                    <p className="text-zinc-400 text-[11px]">Precision dual-action polishers for zero holograms.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-200">Owner-Operated Service:</span>
                    <p className="text-zinc-400 text-[11px]">Every detail performed personally by Trevor — no subcontractors.</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking & SMS CTAs */}
              <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                <a
                  href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=Hi Trevor! I'd like a detailing quote for my vehicle.`}
                  className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg text-center transition-colors border border-zinc-700/60 flex items-center justify-center gap-1.5"
                >
                  💬 Text Trevor
                </a>
                <a
                  href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
                  className="py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg text-center transition-colors shadow-md shadow-red-950 uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Trevor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
