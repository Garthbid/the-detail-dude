import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, Mail, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { CLIENT_INFO, SERVICE_PACKAGES } from '../data/detailingData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageId?: string;
  prefilledVehicleInfo?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackageId = 'platinum-mobile',
  prefilledVehicleInfo = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState(prefilledVehicleInfo || '2022 Ford F-150');
  const [packageId, setPackageId] = useState(selectedPackageId);
  const [preferredDate, setPreferredDate] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPackageId) setPackageId(selectedPackageId);
    if (prefilledVehicleInfo) setVehicle(prefilledVehicleInfo);
  }, [selectedPackageId, prefilledVehicleInfo]);

  if (!isOpen) return null;

  const currentPkg = SERVICE_PACKAGES.find((p) => p.id === packageId) || SERVICE_PACKAGES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          vehicle,
          packageSelected: currentPkg.name,
          preferredDate,
          serviceAddress,
          message: notes,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const smsMessage = `Hi Trevor! My name is ${name || '[Name]'}. I'd like to book ${currentPkg.name} for my ${vehicle || 'vehicle'} on ${preferredDate || 'soon'}. Address: ${serviceAddress || 'Alberta'}.`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-red-900/40 rounded-2xl p-6 shadow-2xl space-y-6 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-zinc-800 pb-4">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block font-mono">
            Direct Mobile Detailing Booking
          </span>
          <h3 className="text-2xl font-black text-white mt-1">Schedule Trevor Ehrenholz</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Fill out the details below or text Trevor directly at{' '}
            <a href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`} className="text-red-400 underline font-bold">
              {CLIENT_INFO.phone}
            </a>
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Booking Request Sent to Trevor!</h4>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you {name}! Trevor Ehrenholz will review your vehicle specs and contact you at{' '}
              <strong className="text-white">{phone || email}</strong> shortly to confirm the exact mobile arrival time.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=${encodeURIComponent(smsMessage)}`}
                className="w-full sm:w-auto px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text Trevor Copy of Request</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs rounded-xl border border-zinc-800"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Package Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Selected Package</label>
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
              >
                {SERVICE_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — From ${pkg.priceStart} ({pkg.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 780-555-0199"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Vehicle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Vehicle Specs</label>
                <input
                  type="text"
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="e.g. 2022 Ford F-150 Black"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Preferred Date & Service Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Preferred Date / Time</label>
                <input
                  type="text"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="e.g. Next Tuesday Morning"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Service Address / Location</label>
                <input
                  type="text"
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  placeholder="e.g. Home Driveway or Work Garage"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">Notes / Specific Concerns</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Pet hair on back seats, water spots on sunroof"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-red-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Booking Request to Trevor</span>
              </button>

              <div className="text-center pt-1">
                <a
                  href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=${encodeURIComponent(smsMessage)}`}
                  className="text-xs text-zinc-400 hover:text-red-400 underline font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                  <span>Or text Trevor directly via SMS ({CLIENT_INFO.phone})</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
