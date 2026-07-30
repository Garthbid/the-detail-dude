import React, { useState } from 'react';
import { VehicleType, QuoteSelection } from '../types';
import { SERVICE_PACKAGES, CLIENT_INFO } from '../data/detailingData';
import { Calculator, Sparkles, Check, Car, Shield, AlertTriangle, Phone } from 'lucide-react';

interface QuoteEstimatorProps {
  onOpenConsultantWithData?: (data: Partial<QuoteSelection>) => void;
  onCallTrevor?: () => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({
  onOpenConsultantWithData,
  onCallTrevor,
}) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [vehicleMake, setVehicleMake] = useState('Ford');
  const [vehicleModel, setVehicleModel] = useState('F-150');
  const [paintColor, setPaintColor] = useState('Black / Dark Metallic');
  const [condition, setCondition] = useState<'excellent' | 'moderate' | 'heavy'>('moderate');
  const [selectedService, setSelectedService] = useState('platinum-mobile');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Calculate estimated price based on vehicle size & condition
  const getMultiplier = (type: VehicleType) => {
    switch (type) {
      case 'sedan':
        return 1.0;
      case 'suv':
        return 1.2;
      case 'truck':
        return 1.25;
      case 'exotic':
        return 1.35;
      case 'rv':
        return 1.6;
      default:
        return 1.0;
    }
  };

  const getConditionMultiplier = (cond: 'excellent' | 'moderate' | 'heavy') => {
    switch (cond) {
      case 'excellent':
        return 1.0;
      case 'moderate':
        return 1.15;
      case 'heavy':
        return 1.3;
    }
  };

  const basePackage = SERVICE_PACKAGES.find((p) => p.id === selectedService) || SERVICE_PACKAGES[1];
  const sizeMult = getMultiplier(vehicleType);
  const condMult = getConditionMultiplier(condition);

  const estimatedStartPrice = Math.round(basePackage.priceStart * sizeMult * condMult);
  const estimatedEndPrice = Math.round(estimatedStartPrice * 1.15);

  const toggleAddon = (addonName: string) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleConsultAi = () => {
    if (onOpenConsultantWithData) {
      onOpenConsultantWithData({
        vehicleType,
        vehicleYear,
        vehicleMake,
        vehicleModel,
        paintColor,
        condition,
        selectedPackageId: selectedService,
        addons: selectedAddons,
      });
    }
  };


  return (
    <section id="estimator" className="py-20 bg-zinc-900/60 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Mobile Detailing Estimate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            BUILD YOUR <span className="text-red-500">CUSTOM QUOTE</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Select your vehicle size and paint condition below to see estimated pricing and turnaround duration for Trevor's mobile service.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-2xl space-y-6">
            {/* Step 1: Vehicle Size & Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-3 flex items-center justify-between">
                <span>1. Select Vehicle Type</span>
                <span className="text-[11px] text-zinc-500 font-normal">Pricing adjusts for surface area</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'sedan', label: 'Sedan / Coupe' },
                  { id: 'suv', label: 'SUV / Crossover' },
                  { id: 'truck', label: 'Truck / Van' },
                  { id: 'exotic', label: 'Exotic / Sports' },
                  { id: 'rv', label: 'Boat / RV' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVehicleType(item.id as VehicleType)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      vehicleType === item.id
                        ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-md shadow-red-950'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Car className="w-5 h-5 mx-auto mb-1 text-red-500" />
                    <span className="text-xs block leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Vehicle Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Year</label>
                <input
                  type="text"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  placeholder="e.g. 2022"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Make</label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  placeholder="e.g. Ford"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Model</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                  placeholder="e.g. F-150"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Paint Color</label>
                <select
                  value={paintColor}
                  onChange={(e) => setPaintColor(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="Black / Dark Metallic">Black / Dark Metallic</option>
                  <option value="White / Silver">White / Silver</option>
                  <option value="Red / Bright Colors">Red / Bright Colors</option>
                  <option value="Matte / Satin Paint">Matte / Satin Finish</option>
                </select>
              </div>
            </div>

            {/* Step 3: Current Paint & Interior Condition */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                2. Current Vehicle Condition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'excellent',
                    title: 'New / Maintained',
                    desc: 'Light dust, minimal swirls, well cared for.',
                  },
                  {
                    id: 'moderate',
                    title: 'Moderate Swirls / Stains',
                    desc: 'Tunnel wash scratches, dog hair, daily use.',
                  },
                  {
                    id: 'heavy',
                    title: 'Heavy Oxidation / Scratches',
                    desc: 'Deep spiderwebbing, dull clear coat, deep stains.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      condition === item.id
                        ? 'bg-red-950/60 border-red-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="font-bold text-xs block text-white">{item.title}</span>
                    <span className="text-[11px] text-zinc-400 block leading-tight mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Choose Desired Package */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                3. Choose Primary Service Package
              </label>
              <div className="space-y-2">
                {SERVICE_PACKAGES.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedService === pkg.id
                        ? 'bg-red-950/70 border-red-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="packageChoice"
                        value={pkg.id}
                        checked={selectedService === pkg.id}
                        onChange={() => setSelectedService(pkg.id)}
                        className="accent-red-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-xs text-white block">{pkg.name}</span>
                        <span className="text-[11px] text-zinc-400 block">{pkg.tagline}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-400 shrink-0">
                      From ${pkg.priceStart}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 5: Add-ons */}
            {basePackage.addonOptions && basePackage.addonOptions.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                  Optional Recommended Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {basePackage.addonOptions.map((addon) => (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        selectedAddons.includes(addon.name)
                          ? 'bg-zinc-800 border-red-500 text-white font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span>{addon.name}</span>
                      <span className="text-red-400 font-bold">+${addon.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 rounded-2xl border border-red-900/40 p-6 shadow-2xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs text-red-400 font-bold uppercase tracking-wider block">Estimated Quote Range</span>
                <h3 className="text-3xl font-black text-white mt-1">
                  ${estimatedStartPrice} - ${estimatedEndPrice}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-zinc-400 block">Est. Duration</span>
                <span className="text-xs font-bold text-zinc-200">{basePackage.duration}</span>
              </div>
            </div>

            {/* Selection Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Selected Vehicle:</span>
                <span className="font-bold text-white">
                  {vehicleYear} {vehicleMake} {vehicleModel} ({vehicleType.toUpperCase()})
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Paint Color & Condition:</span>
                <span className="font-semibold text-zinc-200">
                  {paintColor} • {condition.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Package Selected:</span>
                <span className="font-bold text-red-400">{basePackage.name}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Protection Included:</span>
                <span className="font-semibold text-emerald-400">{basePackage.protectionTerm}</span>
              </div>
            </div>

            {/* Included Highlights */}
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Package Included Features:
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {basePackage.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Guarantee Note */}
            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-200 flex items-start gap-2">
              <Shield className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                <strong>100% Mobile Service Guarantee:</strong> Trevor arrives at your home or work with spot-free deionized water and silent power. No travel fee within Alberta service zone.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onCallTrevor?.()}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-xl shadow-red-950 border border-red-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Trevor About This Quote</span>
              </button>

              <button
                onClick={handleConsultAi}
                className="w-full py-3 px-4 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Run AI Vehicle Assessment for This Car</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
