import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Packages from './components/Packages';
import BookingForm from './components/BookingForm';
import AuthModal from './components/AuthModal';
import ClientDashboard from './components/ClientDashboard';
import { User, Booking, Package } from './types';
import { Heart, Mail, Phone, MapPin, Sparkles, Instagram, Facebook } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Authentication State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('wedding_portal_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('wedding_portal_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('wedding_portal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wedding_portal_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('wedding_portal_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setCurrentTab('dashboard'); // Auto redirect to dashboard on login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab('home');
  };

  const handleUpdateUser = (updatedFields: Partial<User>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const handleBookingSuccess = (newBooking: Booking, userProfileUpdate?: Partial<User>) => {
    setBookings(prev => [newBooking, ...prev]);
    if (user && userProfileUpdate) {
      handleUpdateUser(userProfileUpdate);
    }
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentTab('book');
  };

  // Safe wrapper for adding booking from dashboard panel
  const handleAddBookingFromDashboard = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-brand-cream/80 flex flex-col selection:bg-brand-rose/30 selection:text-brand-charcoal relative">
      
      {/* Ambient Frosted Glass Backdrop Blobs */}
      <div className="glass-backdrop">
        <div className="glass-blob-1"></div>
        <div className="glass-blob-2"></div>
        <div className="glass-blob-3"></div>
      </div>
      
      {/* Navigation Bar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        
        {currentTab === 'home' && (
          <div className="animate-fade-in space-y-20">
            <Hero
              onNavigateToTab={setCurrentTab}
              onOpenAuth={() => setAuthModalOpen(true)}
              isAuthenticated={!!user}
            />
            <About />
            <Packages onSelectPackage={handleSelectPackage} />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="animate-fade-in">
            <About />
          </div>
        )}

        {currentTab === 'packages' && (
          <div className="animate-fade-in">
            <Packages onSelectPackage={handleSelectPackage} />
          </div>
        )}

        {currentTab === 'book' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-brand-slate font-bold block">
                BEGIN YOUR CELEBRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal">
                Book a Consultation Call
              </h2>
              <div className="w-12 h-[1px] bg-brand-rose mx-auto my-3" />
              <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
                Schedule a complimentary, relaxed 45-minute discovery consultation with Evelyn or Julian. We will explore your color ideas, timeline parameters, and packages tailored to your exact scope.
              </p>
            </div>
            
            <BookingForm
              user={user}
              selectedPackage={selectedPackage}
              onBookingSuccess={handleBookingSuccess}
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'dashboard' && user && (
          <div className="animate-fade-in">
            <ClientDashboard
              user={user}
              bookings={bookings.filter(b => b.userId === user.id || b.userId === 'guest')}
              onUpdateUser={handleUpdateUser}
              onAddBooking={handleAddBookingFromDashboard}
            />
          </div>
        )}

      </main>

      {/* Elegant Editorial Footer */}
      <footer className="bg-brand-charcoal text-brand-cream/80 border-t border-brand-rose/20 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Logo & Brand Slogan */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-brand-slate">
                <Heart className="h-4 w-4 text-brand-rose fill-brand-rose" />
              </div>
              <span className="font-display text-lg tracking-widest text-white uppercase">
                Amore & Co.
              </span>
            </div>
            <p className="text-xs text-brand-cream/60 leading-relaxed font-light max-w-sm">
              We specialize in the quiet art of curation. From botanical selections to candle placements and timeline structure, we create celebrations that feel completely personal and look timelessly elegant.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-1.5 rounded-full bg-brand-slate/40 text-brand-cream/70 hover:text-brand-rose transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-1.5 rounded-full bg-brand-slate/40 text-brand-cream/70 hover:text-brand-rose transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Explore Portal</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }} className="hover:text-brand-rose transition-colors cursor-pointer text-left">
                  Welcome Showcase
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('about'); window.scrollTo(0, 0); }} className="hover:text-brand-rose transition-colors cursor-pointer text-left">
                  The Curators Story
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('packages'); window.scrollTo(0, 0); }} className="hover:text-brand-rose transition-colors cursor-pointer text-left">
                  Planning Packages
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('book'); window.scrollTo(0, 0); }} className="hover:text-brand-rose transition-colors cursor-pointer text-left">
                  Schedule Discover Call
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">The Design Studio</h4>
            <div className="space-y-3 text-xs font-light">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-brand-rose mt-0.5 flex-shrink-0" />
                <span>412 SW 11th Avenue, Suite 400<br />Portland, Oregon 97205</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-brand-rose flex-shrink-0" />
                <span>+1 (503) 555-0185</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-brand-rose flex-shrink-0" />
                <span>concierge@amoreweddings.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Bottom line */}
        <div className="max-w-7xl mx-auto border-t border-brand-rose/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-brand-cream/40 font-light space-y-2 sm:space-y-0">
          <p>© 2026 Amore & Co. Curation Ltd. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-brand-gold" />
            <span>Curated with pure devotion & elegance.</span>
          </p>
        </div>
      </footer>

      {/* Authentication Gateway Dialog Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleLoginSuccess}
      />

    </div>
  );
}
