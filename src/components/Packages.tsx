import React from 'react';
import { weddingPackages } from '../mockData';
import { Package } from '../types';
import { Sparkles, CalendarRange, Heart, Check } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (pkg: Package) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  return (
    <section className="bg-transparent py-20 lg:py-28" id="packages-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-slate font-bold inline-flex items-center space-x-1.5">
            <Heart className="h-3 w-3 text-brand-rose" />
            <span>CURATED SERVICES</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal">
            Planning Packages Tailored To Your Vision
          </h2>
          <div className="w-16 h-[1px] bg-brand-rose mx-auto my-4" />
          <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
            We offer tiers of engagement depending on how far along you are in your planning journey. Regardless of the package, our hallmark is timeless artistry, transparent pricing, and gentle support.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {weddingPackages.map((pkg) => {
            const isFeatured = pkg.id === 'partial-planning';
            return (
              <div
                key={pkg.id}
                className={`flex flex-col h-full rounded-[32px] transition-all duration-300 relative shadow-md border ${
                  isFeatured
                    ? 'backdrop-blur-xl bg-white/45 border-white/60 scale-100 lg:scale-[1.03] z-10 p-6 sm:p-8 shadow-xl'
                    : 'backdrop-blur-md bg-white/20 border-white/40 hover:bg-white/35 p-6 sm:p-8'
                }`}
                id={`pkg-card-${pkg.id}`}
              >
                {/* Special Tag for Featured Package */}
                {isFeatured && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-brand-rose text-white px-4 py-1 text-[9px] uppercase tracking-[0.2em] rounded-full font-bold shadow-md flex items-center space-x-1 border border-white/40">
                    <Sparkles className="h-2.5 w-2.5 text-brand-gold animate-bounce" />
                    <span>Most Requested Choice</span>
                  </span>
                )}

                {/* Header */}
                <div className="space-y-3 text-center pb-6 border-b border-white/30">
                  <span className="text-[10px] tracking-widest uppercase text-brand-slate font-medium block">
                    {pkg.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
                    {pkg.name}
                  </h3>
                  <div className="pt-2">
                    <span className="text-3xl font-light text-brand-charcoal font-serif">{pkg.price}</span>
                    <span className="text-[10px] text-brand-slate uppercase tracking-widest font-light block mt-1">Starting Investment</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed pt-6 pb-6 text-center italic">
                  "{pkg.description}"
                </p>

                {/* Features Checklist */}
                <div className="flex-grow space-y-3.5 pb-8">
                  <span className="text-[10px] tracking-wider uppercase text-brand-charcoal font-bold block mb-2">
                    What's included:
                  </span>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2.5">
                      <div className="p-0.5 rounded-full bg-white/60 border border-white/50 text-brand-rose mt-0.5 flex-shrink-0 shadow-sm">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs text-brand-charcoal/90 font-light leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 text-xs uppercase tracking-widest rounded-full font-semibold transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-brand-charcoal hover:bg-black text-brand-cream hover:shadow-lg'
                      : 'backdrop-blur-sm bg-white/30 border border-black/15 hover:bg-white/60 text-brand-charcoal'
                  }`}
                  id={`pkg-select-${pkg.id}`}
                >
                  <CalendarRange className="h-3.5 w-3.5" />
                  <span>Secure This Service</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Tailored Consultation Prompt */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
          <p className="text-xs text-brand-slate italic font-light">
            Need something completely bespoke, such as a micro-wedding or multi-day destination event? We happily design custom structures.
          </p>
        </div>

      </div>
    </section>
  );
}
