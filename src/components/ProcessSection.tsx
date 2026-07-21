import React from 'react';
import { PROCESS_STEPS } from '../data/detailingData';
import { Layers } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-900/60 text-white relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Zero Shortcut Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            THE 5-STEP <span className="text-red-500">PRECISION PROCESS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every vehicle undergoes Trevor's strict master detailer protocol to ensure paint safety, scratch elimination, and maximum ceramic bond strength.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-5 shadow-xl hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-amber-500 block">
                  {step.step}
                </span>
                <h3 className="text-sm font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
              </div>

              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-red-500/60 font-bold">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
