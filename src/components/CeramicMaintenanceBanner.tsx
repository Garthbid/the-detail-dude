import React from 'react';
import { RefreshCw, Phone } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

interface CeramicMaintenanceBannerProps {
  onCallTrevor: () => void;
}

export const CeramicMaintenanceBanner: React.FC<CeramicMaintenanceBannerProps> = ({ onCallTrevor }) => {
  return (
    <section id="ceramic-maintenance" className="py-14 bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 text-white relative border-y border-red-900/40 overflow-hidden">
      {/* Ambient Accent Lights */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl bg-zinc-900/70 border border-red-800/40 p-7 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-start gap-4 text-center lg:text-left flex-col sm:flex-row items-center sm:items-start">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-700/50 flex items-center justify-center text-red-300 shrink-0">
              <RefreshCw className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-900/50 border border-red-700/40 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                Recommended
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                1-Year Ceramic Coating <span className="text-red-500">Maintenance Service</span>
              </h2>
              <p className="text-sm text-zinc-300">Extend the life of your coating.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onCallTrevor}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-950 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Call Trevor: {CLIENT_INFO.phone}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
