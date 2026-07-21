import React from 'react';
import { Phone, Mail, Shield, MapPin, Calendar, Clock } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenConsultant }) => {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800/90 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-zinc-900 flex items-center justify-center text-white font-black text-xl shadow-lg border border-red-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black tracking-wider text-xl text-white uppercase block">
                  THE DETAIL <span className="text-red-500">DUDE</span>
                </span>
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-semibold block">
                  Trevor Ehrenholz • Mobile Detailing
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Specializing in mobile auto detailing, multi-stage paint correction, and certified SiO2 ceramic coatings. Bringing showroom clarity directly to your driveway.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-red-400 font-bold">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>{CLIENT_INFO.location}</span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 font-mono">
              DIRECT CONTACT
            </h4>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li>
                <a
                  href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all font-semibold"
                >
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Call / Text: {CLIENT_INFO.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all font-semibold break-all"
                >
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{CLIENT_INFO.email}</span>
                </a>
              </li>

              <li className="flex items-center gap-2 text-zinc-400 pt-1">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>{CLIENT_INFO.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 font-mono">
              SPECIALTIES
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-white transition-colors">• Mobile Auto Detailing</li>
              <li className="hover:text-white transition-colors">• Stage 1 Single-Pass Paint Correction</li>
              <li className="hover:text-white transition-colors">• Stage 2 Multi-Step Swirl Removal</li>
              <li className="hover:text-white transition-colors">• 3-Year SiO2 Ceramic Coating Shield</li>
              <li className="hover:text-white transition-colors">• 5-Year Graphene Nano-Coating</li>
              <li className="hover:text-white transition-colors">• Interior Steam Sanitation & Leather Guard</li>
            </ul>
          </div>

          {/* Col 4: Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 font-mono">
              BOOKING & AI ADVISOR
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Have a question about your car’s paint? Use Trevor's AI tool or schedule your appointment online.
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Appointment</span>
              </button>

              <button
                onClick={onOpenConsultant}
                className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs rounded-lg border border-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch AI Vehicle Analyzer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {CLIENT_INFO.businessName}. All Rights Reserved. Owner-Operated by Trevor Ehrenholz.</p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span>Mobile Detailing</span>
            <span>•</span>
            <span>Paint Correction</span>
            <span>•</span>
            <span>Ceramic Coating</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
