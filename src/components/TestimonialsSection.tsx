import React from 'react';
import { TESTIMONIALS } from '../data/detailingData';
import { Star, MessageSquareQuote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            WHAT VEHICLE OWNERS <span className="text-red-500">SAY ABOUT TREVOR</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Verified local feedback from daily drivers, truck owners, and sports car enthusiasts across Alberta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800/90 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-red-900/60 transition-colors"
            >
              <div className="space-y-3">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 space-y-1">
                <h4 className="font-bold text-xs text-white flex items-center justify-between">
                  <span>{review.author}</span>
                  <span className="text-[10px] text-zinc-500 font-normal">{review.date}</span>
                </h4>
                <p className="text-[11px] text-zinc-400">{review.vehicle}</p>
                <p className="text-[10px] text-red-400 font-semibold uppercase">{review.serviceReceived}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
