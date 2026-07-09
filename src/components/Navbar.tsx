import React from 'react';
import { User } from '../types';
import { Heart, User as UserIcon, LogOut, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({
  user,
  onLogout,
  onOpenAuth,
  currentTab,
  setCurrentTab,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Welcome' },
    { id: 'about', label: 'Our Story' },
    { id: 'packages', label: 'Services' },
    { id: 'book', label: 'Book Consultation' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand Logo / Monogram */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 text-left focus:outline-none group cursor-pointer"
            id="brand-logo"
          >
            <div className="p-2 rounded-full bg-brand-blush group-hover:bg-brand-rose/30 transition-colors duration-500">
              <Heart className="h-5 w-5 text-brand-rose fill-brand-rose/20 group-hover:fill-brand-rose/40 transition-all" />
            </div>
            <div>
              <span className="font-display text-xl tracking-widest text-brand-charcoal uppercase block">
                Amore & Co.
              </span>
              <span className="text-[10px] tracking-widest text-brand-slate uppercase block -mt-1 font-light">
                Bespoke Wedding Curation
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-widest uppercase transition-all duration-300 relative py-2 cursor-pointer ${
                  currentTab === item.id 
                    ? 'text-brand-charcoal font-medium' 
                    : 'text-brand-slate hover:text-brand-charcoal font-light'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-rose/80" />
                )}
              </button>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 border-l border-brand-rose/30 pl-6">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center space-x-2 text-sm tracking-wider uppercase py-2 cursor-pointer transition-all ${
                    currentTab === 'dashboard'
                      ? 'text-brand-charcoal font-semibold'
                      : 'text-brand-slate hover:text-brand-charcoal font-light'
                  }`}
                  id="nav-dashboard"
                >
                  <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
                  <span>Our Wedding Portal</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-brand-blush text-brand-slate hover:text-brand-charcoal transition-colors cursor-pointer"
                  title="Logout"
                  id="nav-logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="ml-4 px-6 py-2.5 bg-brand-charcoal hover:bg-black text-brand-cream text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md flex items-center space-x-2 hover:shadow-lg cursor-pointer"
                id="nav-login-btn"
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>Client Portal</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`mr-4 p-2 rounded-full ${currentTab === 'dashboard' ? 'bg-brand-blush text-brand-charcoal' : 'text-brand-slate'}`}
                title="Portal"
              >
                <Sparkles className="h-5 w-5 text-brand-gold" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brand-charcoal hover:bg-brand-blush transition-colors"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-b border-brand-rose/20 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm uppercase tracking-widest ${
                  currentTab === item.id
                    ? 'bg-brand-blush text-brand-charcoal font-medium'
                    : 'text-brand-slate hover:bg-brand-blush hover:text-brand-charcoal font-light'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-brand-rose/20 pt-4 mt-4 px-4">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-brand-slate font-light mb-1">
                    Welcome back, <span className="font-medium text-brand-charcoal">{user.name}</span>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full py-2.5 bg-brand-blush hover:bg-brand-rose/40 text-brand-charcoal text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                    <span>Go to Wedding Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 border border-brand-rose/30 text-brand-slate text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-widest rounded-sm shadow-md flex items-center justify-center space-x-2"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Client Portal Log In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
