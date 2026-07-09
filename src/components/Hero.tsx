import React from 'react';
import { Calendar, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onNavigateToTab: (tabId: string) => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
}

export default function Hero({ onNavigateToTab, onOpenAuth, isAuthenticated }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 lg:py-24" id="hero-section">
      {/* Delicate background elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-blush/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 backdrop-blur-md bg-white/30 rounded-full border border-white/50 shadow-sm animate-fade-in">
              <Heart className="h-3.5 w-3.5 text-brand-rose fill-brand-rose/40" />
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-brand-charcoal font-medium">
                Bespoke luxury wedding planning
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-brand-charcoal leading-[1.15] tracking-tight">
              Curating your <br className="hidden sm:inline" />
              <span className="italic font-light text-brand-rose font-serif">eternal moments</span> <br />
              of quiet luxury.
            </h1>

            <div className="backdrop-blur-md bg-white/20 border border-white/40 rounded-3xl p-8 shadow-sm max-w-2xl">
              <p className="text-brand-charcoal/80 text-sm sm:text-base font-light leading-relaxed">
                We specialize in curating heartfelt, poetically styled weddings. Guided by refined aesthetics, warm candlelight, and seamless organization, we translate your unique love story into an atmospheric reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigateToTab('book')}
                className="px-8 py-4 bg-brand-charcoal hover:bg-black text-brand-cream text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center space-x-2 font-medium"
                id="hero-book-btn"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Consultation</span>
              </button>
              
              <button
                onClick={() => onNavigateToTab('packages')}
                className="px-8 py-4 border border-black/15 backdrop-blur-sm bg-white/30 hover:bg-white/50 text-brand-charcoal text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer font-medium"
                id="hero-services-btn"
              >
                Explore Services
              </button>
            </div>

            {/* Micro-Features */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-rose/20 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-serif text-3xl font-light text-brand-charcoal">100%</div>
                <div className="text-[10px] tracking-wider uppercase text-brand-slate font-medium mt-1">Bespoke Curation</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-3xl font-light text-brand-charcoal">12</div>
                <div className="text-[10px] tracking-wider uppercase text-brand-slate font-medium mt-1">Weddings Per Year</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-3xl font-light text-brand-charcoal">9+</div>
                <div className="text-[10px] tracking-wider uppercase text-brand-slate font-medium mt-1">Years of Artistry</div>
              </div>
            </div>

          </div>

          {/* Styled Image Frame */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Artistic border offset */}
            <div className="absolute inset-4 border border-white/50 rounded-3xl translate-x-4 translate-y-4 pointer-events-none z-0" />
            
            {/* Main Picture Frame */}
            <div className="relative backdrop-blur-md bg-white/20 p-4 rounded-3xl shadow-lg border border-white/40 transform hover:-translate-y-1 transition-transform duration-500 z-10">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
                alt="Romantic Candlelight Wedding Reception"
                className="w-full h-[350px] sm:h-[450px] object-cover rounded-2xl grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="pt-4 text-center">
                <p className="font-serif italic text-brand-charcoal text-base">
                  "Atmospheric, warm, and utterly seamless."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-brand-slate mt-1.5 font-medium">
                  - Clara & Thomas, June 2025
                </p>
              </div>
            </div>

            {/* Little floating ornament card */}
            <button
              onClick={isAuthenticated ? () => onNavigateToTab('dashboard') : onOpenAuth}
              className="absolute -bottom-6 -left-6 backdrop-blur-xl bg-white/50 p-4 rounded-2xl shadow-xl border border-white/60 flex items-center space-x-3 hover:bg-white/85 transition-all duration-300 text-left cursor-pointer z-20"
              id="hero-floating-card"
            >
              <div className="p-2 bg-white/80 rounded-full border border-white shadow-sm">
                <Sparkles className="h-4 w-4 text-brand-gold" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-brand-charcoal font-semibold">Interactive Portal</span>
                <span className="block text-[11px] text-brand-slate">Manage Wedding Checklist & Budget</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
