import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { MobileServiceBanner } from './components/MobileServiceBanner';
import { PackagesSection } from './components/PackagesSection';
import { QuoteEstimator } from './components/QuoteEstimator';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AiConsultantModal } from './components/AiConsultantModal';
import { BookingModal } from './components/BookingModal';
import { CLIENT_INFO } from './data/detailingData';
import { Phone, MessageSquare, Calendar, Sparkles } from 'lucide-react';
import { QuoteSelection } from './types';

export default function App() {
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState('platinum-mobile');
  const [prefilledVehicleForBooking, setPrefilledVehicleForBooking] = useState('');
  const [initialConsultantData, setInitialConsultantData] = useState<Partial<QuoteSelection> | undefined>(undefined);

  const handleOpenBooking = (packageId?: string, vehicleInfo?: string) => {
    if (packageId) setSelectedPackageForBooking(packageId);
    if (vehicleInfo) setPrefilledVehicleForBooking(vehicleInfo);
    setIsBookingOpen(true);
  };

  const handleOpenConsultantWithData = (data: Partial<QuoteSelection>) => {
    setInitialConsultantData(data);
    setIsConsultantOpen(true);
  };

  const handleBookFromAi = (packageName: string, vehicleInfo: string) => {
    setIsConsultantOpen(false);
    setSelectedPackageForBooking('ceramic-coating-3yr');
    setPrefilledVehicleForBooking(`${vehicleInfo} (${packageName})`);
    setIsBookingOpen(true);
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Header */}
      <Header
        onOpenQuote={scrollToEstimator}
        onOpenConsultant={() => {
          setInitialConsultantData(undefined);
          setIsConsultantOpen(true);
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenConsultant={() => {
            setInitialConsultantData(undefined);
            setIsConsultantOpen(true);
          }}
          onOpenBooking={() => handleOpenBooking()}
          onScrollToEstimator={scrollToEstimator}
        />

        <BeforeAfterSlider />

        <MobileServiceBanner />

        <PackagesSection
          onSelectPackage={(pkgId) => handleOpenBooking(pkgId)}
        />

        <QuoteEstimator
          onOpenConsultantWithData={handleOpenConsultantWithData}
          onOpenBookingWithPackage={(pkgId, vehicle) => handleOpenBooking(pkgId, vehicle)}
        />

        <GallerySection />

        <ProcessSection />

        <TestimonialsSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenConsultant={() => setIsConsultantOpen(true)}
      />

      {/* Sticky Floating Quick Contact Actions Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-zinc-900/95 border border-red-800/60 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2">
        <a
          href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
          className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 border border-zinc-700/80"
        >
          <Phone className="w-3.5 h-3.5 text-red-500" />
          <span>Call Trevor</span>
        </a>

        <a
          href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=Hi Trevor! I'd like a mobile detailing quote.`}
          className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl flex items-center justify-center border border-zinc-700/80"
          aria-label="Text Trevor"
        >
          <MessageSquare className="w-4 h-4 text-red-400" />
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md shadow-red-950 flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Service</span>
        </button>
      </div>

      {/* Modals */}
      <AiConsultantModal
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
        initialData={initialConsultantData}
        onBookRecommendedPackage={handleBookFromAi}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPackageId={selectedPackageForBooking}
        prefilledVehicleInfo={prefilledVehicleForBooking}
      />
    </div>
  );
}
