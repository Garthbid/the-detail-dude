import React, { useState, useEffect } from 'react';
import { Phone, Mail, Shield, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { CLIENT_INFO } from '../data/detailingData';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenConsultant: () => void;
  onCallTrevor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuote,
  onOpenConsultant,
  onCallTrevor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-red-900/30 shadow-2xl py-3'
          : 'bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-transparent py-5'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 hidden md:flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800/50 pb-2">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-red-400 font-medium bg-red-950/50 px-2.5 py-0.5 rounded-full border border-red-800/40">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            100% Mobile Service - We Come To You
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            {CLIENT_INFO.location}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-red-400 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>Call Trevor: {CLIENT_INFO.phone}</span>
          </a>
          <a
            href={`mailto:${CLIENT_INFO.email}`}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span>{CLIENT_INFO.email}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-zinc-900 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-900/40 border border-red-500/30 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-wider text-xl text-white uppercase font-sans">
                  THE DETAIL <span className="text-red-500">DUDE</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-zinc-400 uppercase font-semibold">
                Trevor Ehrenholz • Mobile Detailing
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button
              onClick={() => scrollToSection('packages')}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Services & Packages
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Before & After
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Work Showcase
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1 text-red-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              Quote Calculator
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenConsultant}
              className="px-3.5 py-2 text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>AI Vehicle Advice</span>
            </button>
            <a
              href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg shadow-lg shadow-red-900/40 border border-red-500/40 transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Trevor</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
              className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-600/40"
              aria-label="Call Trevor"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 bg-zinc-900 rounded-lg border border-zinc-800 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="text-xs text-red-400 font-bold uppercase tracking-wider">
              Mobile Detailing Service Area
            </div>
            <p className="text-xs text-zinc-300">{CLIENT_INFO.location}</p>
            <a
              href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-sm font-bold text-white bg-red-600/20 px-3 py-2 rounded-lg border border-red-500/30"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call / Text Trevor: {CLIENT_INFO.phone}</span>
            </a>
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-200 pt-2">
            <button
              onClick={() => scrollToSection('packages')}
              className="text-left py-2 border-b border-zinc-800/60 text-zinc-200 hover:text-red-400"
            >
              Services & Pricing Packages
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="text-left py-2 border-b border-zinc-800/60 text-zinc-200 hover:text-red-400"
            >
              Before & After Swirl Removal
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left py-2 border-b border-zinc-800/60 text-zinc-200 hover:text-red-400"
            >
              Work Showcase Gallery
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="text-left py-2 border-b border-zinc-800/60 text-red-400 font-semibold flex items-center justify-between"
            >
              <span>Instant Quote Calculator</span>
              <Sparkles className="w-4 h-4 text-red-500" />
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 text-zinc-200 hover:text-red-400"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultant();
              }}
              className="w-full py-2.5 px-3 text-xs font-semibold text-zinc-200 bg-zinc-900 rounded-lg border border-zinc-700 text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>AI Recommendation</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCallTrevor();
              }}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-red-600 rounded-lg text-center uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Trevor</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
