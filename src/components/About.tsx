import React from 'react';
import { companyBackground, teamMembers } from '../mockData';
import { Sparkles, Award, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section className="bg-transparent py-20 lg:py-28 border-t border-b border-white/20" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Company Core Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-rose/10 rounded-full blur-2xl pointer-events-none" />
            <div className="border border-white/40 absolute inset-0 transform -translate-x-3 translate-y-3 rounded-3xl pointer-events-none" />
            
            <div className="backdrop-blur-md bg-white/20 p-3 rounded-3xl border border-white/40 shadow-sm relative z-10">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000"
                alt="Evelyn & Julian designing a wedding floral layout"
                className="w-full h-[380px] object-cover rounded-2xl grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] tracking-[0.25em] uppercase text-brand-slate font-bold block">
              OUR HERITAGE & PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal leading-snug">
              Designing with intention, <br />
              <span className="italic font-light text-brand-rose">celebrating with intimacy</span>.
            </h2>
            
            <div className="w-12 h-[1px] bg-brand-rose my-4" />

            <p className="text-brand-charcoal/80 text-sm sm:text-base font-light leading-relaxed">
              {companyBackground.philosophy}
            </p>

            <p className="text-brand-charcoal/80 text-sm sm:text-base font-light leading-relaxed">
              {companyBackground.history}
            </p>

            {/* Quick credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-white/50 border border-white/60 text-brand-rose mt-0.5 shadow-sm">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">Vogue Featured</h4>
                  <p className="text-[11px] text-brand-slate font-light mt-0.5">Lauded for bespoke organic editorial aesthetics.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-white/50 border border-white/60 text-brand-rose mt-0.5 shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">Complete Solvency</h4>
                  <p className="text-[11px] text-brand-slate font-light mt-0.5">Fully bonded, insured, and certified internationally.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Our Curators (Team Bio Grid) */}
        <div className="border-t border-brand-rose/20 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-slate font-bold">
              THE ARTISTS BEHIND THE SCENES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
              Meet Our Principal Planners
            </h3>
            <p className="text-xs sm:text-sm text-brand-slate font-light">
              We are dedicated storytellers, layout designers, and meticulous coordinators who live to create bespoke milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative border */}
                <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-brand-rose/40 to-transparent pointer-events-none" />

                {/* Member Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 mx-auto sm:mx-0 relative">
                  <div className="absolute inset-1 border border-white/40 rounded-full translate-x-1 translate-y-1 pointer-events-none z-0" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full shadow-md relative z-10 border border-white p-1 bg-white/40 backdrop-blur-md"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bio text */}
                <div className="space-y-2.5 text-center sm:text-left">
                  <div>
                    <h4 className="font-serif text-lg text-brand-charcoal">{member.name}</h4>
                    <span className="text-[10px] tracking-widest uppercase text-brand-rose font-semibold block mt-0.5">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-brand-charcoal/85 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Callout Quote */}
        <div className="mt-20 glass-panel p-8 sm:p-12 text-center max-w-4xl mx-auto relative shadow-lg">
          <div className="absolute top-4 left-6 text-brand-rose/20 font-serif text-7xl select-none leading-none">“</div>
          <p className="font-serif italic text-base sm:text-lg text-brand-charcoal leading-relaxed relative z-10 px-4 sm:px-6">
            "A wedding should not feel like an event; it should feel like an organic extension of your home, your love, and your hospitality. It is a memory designed to linger in the hearts of those you hold dear."
          </p>
          <div className="text-[10px] tracking-widest uppercase text-brand-slate mt-4 font-bold">
            - Evelyn Sterling
          </div>
        </div>

      </div>
    </section>
  );
}
