import React, { useState } from 'react';
import { BEFORE_AFTER_EXAMPLES } from '../data/detailingData';
import { Sparkles, SlidersHorizontal, CheckCircle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const currentExample = BEFORE_AFTER_EXAMPLES[activeTab] || BEFORE_AFTER_EXAMPLES[0];

  const handleSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section id="before-after" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Workmanship Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            BEFORE & AFTER <span className="text-red-500">CORRECTION SLIDER</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Drag the slider to see how Trevor's precision machine polishing and ceramic coating eliminates swirl marks and restores factory-clear mirror reflections.
          </p>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {BEFORE_AFTER_EXAMPLES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === idx
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950 border border-red-500/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {item.category} • {item.vehicle.split('-')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="max-w-4xl mx-auto bg-zinc-900/80 rounded-2xl border border-zinc-800 p-4 sm:p-6 shadow-2xl shadow-black">
          {/* Item Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {currentExample.title}
              </h3>
              <p className="text-xs text-zinc-400">{currentExample.vehicle}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{currentExample.correctionLevel}</span>
            </div>
          </div>

          {/* Image Slider Stage */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden select-none bg-zinc-950 border border-zinc-800">
            {/* AFTER Image (Full Layer Behind) */}
            <img
              src={currentExample.afterImg}
              alt="After Detailing - Ceramic Reflection"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-red-600/90 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-lg backdrop-blur-sm z-10 border border-red-400/30">
              AFTER (TREVOR'S CORRECTION)
            </div>

            {/* BEFORE Image (Clipped Layer on Top) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentExample.beforeImg}
                alt="Before Detailing - Swirl Marks"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-zinc-900/90 text-zinc-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-lg backdrop-blur-sm z-10 border border-zinc-700">
                BEFORE (SWIRL MARKS)
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-xl">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Hidden Native Range Input for Smooth Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={handleSliderMove}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before and after image slider"
            />
          </div>

          <p className="text-xs text-zinc-400 text-center mt-3 flex items-center justify-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
            Drag the handle left or right to inspect the paint transformation.
          </p>
        </div>
      </div>
    </section>
  );
};
