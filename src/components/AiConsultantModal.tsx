import React, { useState, useEffect } from 'react';
import { X, Sparkles, Car, Loader2, CheckCircle2, Shield, Phone, AlertCircle } from 'lucide-react';
import { QuoteSelection, AiConsultationResult } from '../types';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<QuoteSelection>;
  onCallTrevor: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onCallTrevor,
}) => {
  const [vehicleYear, setVehicleYear] = useState(initialData?.vehicleYear || '2022');
  const [vehicleMake, setVehicleMake] = useState(initialData?.vehicleMake || 'Ford');
  const [vehicleModel, setVehicleModel] = useState(initialData?.vehicleModel || 'F-150');
  const [paintColor, setPaintColor] = useState(initialData?.paintColor || 'Black Metallic');
  const [condition, setCondition] = useState(initialData?.condition || 'moderate');
  const [concern, setConcern] = useState('Light wash swirls and water spots');
  const [serviceGoal, setServiceGoal] = useState('Deep mirror gloss and long-term ceramic protection');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiConsultationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.vehicleYear) setVehicleYear(initialData.vehicleYear);
      if (initialData.vehicleMake) setVehicleMake(initialData.vehicleMake);
      if (initialData.vehicleModel) setVehicleModel(initialData.vehicleModel);
      if (initialData.paintColor) setPaintColor(initialData.paintColor);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/quote-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleYear,
          vehicleMake,
          vehicleModel,
          paintColor,
          condition,
          concern,
          serviceGoal,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI Detailer Consultant');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to AI detailer. Defaulting to Trevor’s standard recommendation.');
      setResult({
        recommendation: `For your ${vehicleYear} ${vehicleMake} ${vehicleModel} in ${paintColor}, Trevor recommends a Stage 1 Single-Pass Paint Correction followed by a 3-Year SiO2 Ceramic Coating. This removes light swirl marks, restores deep gloss to dark metallic finish, and guards against environmental etching.`,
        recommendedPackage: 'Stage 1 Paint Correction & 3-Yr Ceramic Coating',
        estimatedTime: '5 - 6 Hours',
        proTip: 'Never wipe dusty dark paint with a dry microfiber cloth—always use a dedicated quick detailer lubricant or foam pre-rinse.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-red-900/40 rounded-2xl p-6 shadow-2xl space-y-6 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close AI modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              The Detail Dude AI Advisor
            </h3>
            <p className="text-xs text-zinc-400">
              Powered by Gemini • Customized detail package analyzer for Trevor Ehrenholz
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Year</label>
              <input
                type="text"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Make</label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Model</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Paint Color & Type</label>
              <input
                type="text"
                value={paintColor}
                onChange={(e) => setPaintColor(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                placeholder="e.g. Metallic Black, White Clearcoat"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Current Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
              >
                <option value="excellent">Like New / Well Maintained</option>
                <option value="moderate">Moderate Wash Swirls & Dog Hair</option>
                <option value="heavy">Heavy Scratches & Oxidized Clearcoat</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">Primary Paint or Interior Concern</label>
            <input
              type="text"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
              placeholder="e.g. Swirl marks from tunnel washes, water spots on glass, leather stains"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Vehicle Clearcoat & Paint Specs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Master Detailer Recommendation</span>
              </>
            )}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* AI Results Output */}
        {result && (
          <div className="p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-red-800/60 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                Trevor's Recommended Package
              </span>
              <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded">
                Est. {result.estimatedTime}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-white">{result.recommendedPackage}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed mt-2">{result.recommendation}</p>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-300">
              <span className="text-amber-400 font-bold block mb-1">💡 Detailer Pro Tip:</span>
              <p className="text-zinc-400 text-[11px]">{result.proTip}</p>
            </div>

            <button
              onClick={onCallTrevor}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Trevor to Book This</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
