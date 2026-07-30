import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { MobileServiceBanner } from './components/MobileServiceBanner';
import { WhyCeramicSection } from './components/WhyCeramicSection';
import { PackagesSection } from './components/PackagesSection';
import { CeramicMaintenanceBanner } from './components/CeramicMaintenanceBanner';
import { QuoteEstimator } from './components/QuoteEstimator';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { PreTradeCleanSection } from './components/PreTradeCleanSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AiConsultantModal } from './components/AiConsultantModal';
import { CLIENT_INFO } from './data/detailingData';
import { Phone, MessageSquare } from 'lucide-react';
import { QuoteSelection } from './types';

export default function App() {
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [initialConsultantData, setInitialConsultantData] = useState<Partial<QuoteSelection> | undefined>(undefined);

  const callTrevor = () => {
    window.location.href = `tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`;
  };

  const handleOpenConsultantWithData = (data: Partial<QuoteSelection>) => {
    setInitialConsultantData(data);
    setIsConsultantOpen(true);
  };

  const handleCallFromAi = () => {
    setIsConsultantOpen(false);
    callTrevor();
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
        onCallTrevor={callTrevor}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenConsultant={() => {
            setInitialConsultantData(undefined);
            setIsConsultantOpen(true);
          }}
          onScrollToEstimator={scrollToEstimator}
        />

        <BeforeAfterSlider />

        <MobileServiceBanner />

        <WhyCeramicSection />

        <PackagesSection onCallTrevor={callTrevor} />

        <CeramicMaintenanceBanner onCallTrevor={callTrevor} />

        <QuoteEstimator
          onOpenConsultantWithData={handleOpenConsultantWithData}
          onCallTrevor={callTrevor}
        />

        <GallerySection />

        <ProcessSection />

        <PreTradeCleanSection onCallTrevor={callTrevor} />

        <TestimonialsSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onCallTrevor={callTrevor}
        onOpenConsultant={() => setIsConsultantOpen(true)}
      />

      {/* Sticky Floating Quick Contact Actions Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-zinc-900/95 border border-red-800/60 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2">
        <a
          href={`tel:${CLIENT_INFO.phone.replace(/\D/g, '')}`}
          className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md shadow-red-950 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Trevor: {CLIENT_INFO.phone}</span>
        </a>

        <a
          href={`sms:${CLIENT_INFO.phone.replace(/\D/g, '')}?body=Hi Trevor! I'd like a mobile detailing quote.`}
          className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl flex items-center justify-center border border-zinc-700/80"
          aria-label="Text Trevor"
        >
          <MessageSquare className="w-4 h-4 text-red-400" />
        </a>
      </div>

      {/* Modals */}
      <AiConsultantModal
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
        initialData={initialConsultantData}
        onCallTrevor={handleCallFromAi}
      />
    </div>
  );
}
