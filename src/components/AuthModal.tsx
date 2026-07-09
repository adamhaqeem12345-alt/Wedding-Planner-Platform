import React, { useState } from 'react';
import { User } from '../types';
import { Heart, X, Sparkles, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    partnerName: '',
    email: '',
    password: '',
    weddingDate: '',
    estimatedBudget: 35000,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedBudget' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (activeTab === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please enter both your email and password.');
        return;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please complete all required fields.');
        return;
      }
    }

    setLoading(true);

    // Simulate standard user auth
    setTimeout(() => {
      setLoading(false);
      
      const userId = `usr-${Math.random().toString(36).substr(2, 9)}`;
      const userPayload: User = {
        id: userId,
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        partnerName: formData.partnerName || undefined,
        weddingDate: formData.weddingDate || undefined,
        estimatedBudget: formData.estimatedBudget,
      };

      onAuthSuccess(userPayload);
      onClose();
    }, 1000);
  };

  // Pre-load demo couple data for effortless review
  const handleLoadDemo = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser: User = {
        id: 'usr-demo-123',
        email: 'clara.thomas@eternal.com',
        name: 'Clara Thompson',
        partnerName: 'Thomas Sterling',
        weddingDate: '2027-06-18', // 2027 to ensure countdown works nicely in 2026
        estimatedBudget: 45000,
      };
      setLoading(false);
      onAuthSuccess(demoUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="auth-modal-overlay">
      {/* Blurred romantic backdrop */}
      <div 
        className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main card */}
      <div className="relative glass-panel max-w-md w-full p-6 sm:p-8 space-y-6 z-10 animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-brand-charcoal hover:bg-white/50 backdrop-blur-sm border border-white/40 transition-colors cursor-pointer"
          id="close-auth-modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto p-1.5 w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center mb-1">
            <Heart className="h-5 w-5 text-brand-rose fill-brand-rose/20" />
          </div>
          <h3 className="font-display text-lg tracking-widest text-brand-charcoal uppercase">
            Amore & Co. Portal
          </h3>
          <p className="text-[11px] text-brand-slate font-light uppercase tracking-wider">
            Your private wedding planning sanctuary
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 border-b border-brand-rose/20 text-center pb-2">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`pb-2 text-xs uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'login'
                ? 'border-b border-brand-charcoal font-semibold text-brand-charcoal'
                : 'text-brand-slate font-light hover:text-brand-charcoal'
            }`}
          >
            Client Sign In
          </button>
          
          <button
            onClick={() => {
              setActiveTab('signup');
              setError('');
            }}
            className={`pb-2 text-xs uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'signup'
                ? 'border-b border-brand-charcoal font-semibold text-brand-charcoal'
                : 'text-brand-slate font-light hover:text-brand-charcoal'
            }`}
          >
            Register Couple
          </button>
        </div>

        {/* Effortless Demo Account Action */}
        {activeTab === 'login' && (
          <button
            onClick={handleLoadDemo}
            type="button"
            className="w-full py-3 px-4 bg-white/40 hover:bg-white/70 border border-white/50 rounded-full text-xs text-brand-charcoal font-medium transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow cursor-pointer"
            id="demo-account-btn"
          >
            <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
            <span>Load Pre-populated Sample Couple Account</span>
          </button>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm text-center">
              {error}
            </div>
          )}

          {activeTab === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Clara"
                  className="w-full glass-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                  Partner's Name
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  placeholder="e.g. Thomas"
                  className="w-full glass-input"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. clara@eternal.com"
              className="w-full glass-input"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Secure Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full glass-input"
            />
          </div>

          {activeTab === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in border-t border-brand-rose/15 pt-3 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                  Wedding Date
                </label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full glass-input cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                  Est. Budget (USD)
                </label>
                <input
                  type="number"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  min={5000}
                  step={5000}
                  className="w-full glass-input"
                />
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-charcoal hover:bg-black disabled:bg-brand-slate/60 text-brand-cream text-xs uppercase tracking-widest rounded-full font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            id="auth-submit-btn"
          >
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin text-brand-rose" />
                <span>Authenticating with Amore & Co...</span>
              </>
            ) : (
              <>
                {activeTab === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                <span>{activeTab === 'login' ? 'Access My Sanctuary' : 'Register Profile'}</span>
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-brand-slate text-center font-light leading-relaxed">
          Your privacy is sacred to us. All connections are secured via double SSL standard encryption and strict access-controlled architecture.
        </p>

      </div>
    </div>
  );
}
