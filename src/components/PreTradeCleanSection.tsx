import React from 'react';
import { TrendingUp, Phone, Car, ThumbsUp, DollarSign, MessageSquare } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

interface PreTradeCleanSectionProps {
  onCallTrevor: () => void;
}

export const PreTradeCleanSection: React.FC<PreTradeCleanSectionProps> = ({ onCallTrevor }) => {
  return (
    <section id="pre-trade" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Pre-Trade Clean</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
              HAVE YOUR RIDE CLEANED <span className="text-red-500">BEFORE TRADING IT IN</span>
            </h2>

            {/* Value Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 pt-1">
              <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-800/40 flex items-center justify-center text-red-400 shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">$200</p>
                  <p className="text-xs text-zinc-400">Pre-trade clean</p>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-red-950/50 to-zinc-900 border border-red-800/50 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/25 border border-red-700/50 flex items-center justify-center text-red-300 shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">$500+</p>
                  <p className="text-xs text-red-200/80">Potential added trade-in value</p>
                </div>
              </div>
            </div>

            {/* Why */}
            <div className="pt-2 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Why?</h3>
              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <ThumbsUp className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                <p className="leading-relaxed">
                  Sales managers will tell you they deduct value from vehicles that show up dirty.
                </p>
              </div>
              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <ThumbsUp className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                <p className="leading-relaxed">
                  A clean vehicle gives the impression it has been well cared for, which can lead to a higher trade-in value.
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-zinc-900/90 border border-red-800/50 p-7 text-center space-y-4 shadow-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">Trading in soon?</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Book a pre-trade clean and walk into the dealership with a vehicle that looks cared for — it can pay for itself many times over.
              </p>
              <button
                onClick={onCallTrevor}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-950 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Trevor: {CLIENT_INFO.phone}</span>
              </button>
              <a
                href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=Hi Trevor! I'd like to book a pre-trade clean for my vehicle.`}
                className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-700/60"
              >
                <MessageSquare className="w-4 h-4 text-red-400" />
                <span>Text Trevor</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
