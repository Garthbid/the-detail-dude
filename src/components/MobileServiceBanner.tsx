import React from 'react';
import { Truck, Droplets, Zap, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

export const MobileServiceBanner: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 text-white relative border-y border-red-900/40 overflow-hidden">
      {/* Background Subtle Accent Lights */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Mobile Detailing Convenience</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              WE BRING THE <span className="text-red-500">DETAILING STUDIO</span> TO YOUR DRIVEWAY
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
              No dropping off your car, waiting in uncomfortable lobbies, or taking time out of your day. Trevor Ehrenholz operates a fully self-contained mobile detailing unit equipped to handle any vehicle anywhere in Alberta.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <Droplets className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Deionized Spot-Free Water</h4>
                  <p className="text-[11px] text-zinc-400">Zero mineral residue or water spots during rinse.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <Zap className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Silent Onboard Power</h4>
                  <p className="text-[11px] text-zinc-400">We supply our own electric power. Zero plug-in needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Precision Paint Gauges</h4>
                  <p className="text-[11px] text-zinc-400">Clear coat thickness measured before machine polish.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Home or Workplace Service</h4>
                  <p className="text-[11px] text-zinc-400">Parked at home, office, or private garage.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-900/90 border border-red-800/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">Ready for a Transformation?</h3>
            <p className="text-xs text-zinc-400">
              Call or text Trevor directly to lock in a mobile detailing time slot or ask any vehicle preparation question.
            </p>

            <a
              href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Trevor: {CLIENT_INFO.phone}</span>
            </a>

            <p className="text-[11px] text-zinc-500">
              Owner-Operated • Alberta, Canada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
