import React, { useState } from 'react';
import { Package, User, Booking } from '../types';
import { weddingPackages } from '../mockData';
import { Calendar, Clock, Gift, Heart, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface BookingFormProps {
  user: User | null;
  selectedPackage: Package | null;
  onBookingSuccess: (booking: Booking, userProfileUpdate?: Partial<User>) => void;
  onOpenAuth: () => void;
}

export default function BookingForm({
  user,
  selectedPackage,
  onBookingSuccess,
  onOpenAuth,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    partnerName: user?.partnerName || '',
    email: user?.email || '',
    packageId: selectedPackage?.id || weddingPackages[0].id,
    date: '',
    time: '11:00 AM',
    weddingDate: user?.weddingDate || '',
    estimatedBudget: user?.estimatedBudget || 30000,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<Booking | null>(null);

  // Keep state in sync with user if user logs in mid-way
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name,
        partnerName: prev.partnerName || user.partnerName || '',
        email: prev.email || user.email,
        weddingDate: prev.weddingDate || user.weddingDate || '',
        estimatedBudget: prev.estimatedBudget || user.estimatedBudget || 30000,
      }));
    }
  }, [user]);

  // Keep state in sync if a package is selected from services page
  React.useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageId: selectedPackage.id,
      }));
    }
  }, [selectedPackage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedBudget' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) return;

    setIsSubmitting(true);

    // Simulate database insertion with brief delay
    setTimeout(() => {
      const selectedPkg = weddingPackages.find(p => p.id === formData.packageId) || weddingPackages[0];
      const newBooking: Booking = {
        id: `bk-${Math.random().toString(36).substr(2, 9)}`,
        userId: user?.id || 'guest',
        packageId: formData.packageId,
        packageName: selectedPkg.name,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      setBookingRef(newBooking);
      setIsSubmitting(false);
      setSuccess(true);

      // Pass details back up to save
      onBookingSuccess(newBooking, {
        partnerName: formData.partnerName,
        weddingDate: formData.weddingDate,
        estimatedBudget: formData.estimatedBudget,
      });
    }, 1200);
  };

  if (success && bookingRef) {
    return (
      <div className="max-w-xl mx-auto glass-panel p-8 sm:p-12 text-center space-y-6 animate-fade-in" id="booking-success-message">
        <div className="mx-auto w-16 h-16 bg-white/50 border border-white text-brand-rose flex items-center justify-center rounded-full shadow-sm">
          <CheckCircle2 className="h-10 w-10 text-brand-rose fill-brand-rose/10" />
        </div>
        
        <div className="space-y-2">
          <span className="text-[10px] tracking-widest uppercase text-brand-slate font-bold block">
            CONSULTATION LOCKED
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
            Your journey begins here.
          </h3>
          <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed max-w-md mx-auto">
            We are thrilled to begin crafting your celebration! A calendar invitation has been dispatched to <span className="font-medium text-brand-charcoal">{formData.email || 'your email'}</span>.
          </p>
        </div>

        {/* Booking Card summary */}
        <div className="glass-card p-6 text-left space-y-3.5 max-w-sm mx-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-slate uppercase font-medium">Assigned Service:</span>
            <span className="font-serif font-medium text-brand-charcoal">{bookingRef.packageName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-slate uppercase font-medium">Consult Date:</span>
            <span className="font-medium text-brand-charcoal flex items-center space-x-1">
              <Calendar className="h-3 w-3 mr-1 text-brand-rose" />
              {bookingRef.date}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-slate uppercase font-medium">Session Time:</span>
            <span className="font-medium text-brand-charcoal flex items-center space-x-1">
              <Clock className="h-3 w-3 mr-1 text-brand-rose" />
              {bookingRef.time}
            </span>
          </div>
        </div>

        {!user && (
          <div className="glass-card p-6 text-xs text-left space-y-3">
            <p className="text-brand-charcoal/85 leading-relaxed font-light">
              <strong className="text-brand-charcoal">Bespoke Portal Tip:</strong> You just booked as a guest. Want to track this consultation, organize an interactive wedding timeline, and calculate your budget in real time?
            </p>
            <button
              onClick={onOpenAuth}
              className="w-full py-3 bg-brand-charcoal hover:bg-black text-brand-cream text-[10px] tracking-widest uppercase rounded-full font-medium transition-colors cursor-pointer"
            >
              Sign Up & Open Wedding Portal
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setSuccess(false);
            setBookingRef(null);
            setFormData(prev => ({ ...prev, date: '' }));
          }}
          className="text-xs tracking-widest uppercase text-brand-slate hover:text-brand-charcoal underline cursor-pointer"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto glass-panel overflow-hidden grid grid-cols-1 md:grid-cols-12" id="booking-form-container">
      
      {/* Visual Info Column */}
      <div className="md:col-span-4 backdrop-blur-md bg-white/20 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/30 relative">
        <div className="space-y-4">
          <Heart className="h-6 w-6 text-brand-rose fill-brand-rose/10" />
          <h3 className="font-serif text-2xl text-brand-charcoal leading-snug">
            Plan your <br />
            <span className="italic text-brand-rose">discovery consultation</span>.
          </h3>
          <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light">
            Our discovery consultations are casual, relaxed, and highly inspiring. We will listen to your ideas, walk through color styling, and recommend tailored planning outlines.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center space-x-2 text-[10px] text-brand-charcoal/80 uppercase tracking-wider font-semibold">
            <Clock className="h-3.5 w-3.5 text-brand-rose" />
            <span>Duration: 45 Minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-brand-charcoal/80 uppercase tracking-wider font-semibold">
            <Gift className="h-3.5 w-3.5 text-brand-rose" />
            <span>Complimentary Call</span>
          </div>
        </div>
      </div>

      {/* Main Inputs Form */}
      <form onSubmit={handleSubmit} className="md:col-span-8 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Your Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Your Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Clara Thompson"
              className="w-full glass-input"
            />
          </div>

          {/* Partner's Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Partner's Name (Optional)
            </label>
            <input
              type="text"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleChange}
              placeholder="e.g. Thomas Sterling"
              className="w-full glass-input"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. love@couple.com"
              className="w-full glass-input"
            />
          </div>

          {/* Wedding Package Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Interested Service
            </label>
            <select
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              className="w-full glass-input cursor-pointer"
            >
              {weddingPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Consultation Date *
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full glass-input cursor-pointer"
            />
          </div>

          {/* Preferred Time Slot */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Preferred Consultation Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full glass-input cursor-pointer"
            >
              <option value="9:00 AM">9:00 AM (Early Morning)</option>
              <option value="11:00 AM">11:00 AM (Mid Morning)</option>
              <option value="2:00 PM">2:00 PM (Early Afternoon)</option>
              <option value="4:00 PM">4:00 PM (Late Afternoon)</option>
            </select>
          </div>

        </div>

        {/* Wedding Specific Details */}
        <div className="border-t border-brand-rose/20 pt-6 mt-4 space-y-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-rose font-bold block">
            OPTIONAL CELEBRATION SPECS
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Wedding Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                Target Wedding Date
              </label>
              <input
                type="date"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full glass-input cursor-pointer"
              />
            </div>

            {/* Estimated Wedding Budget */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
                Target Budget (USD)
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

          {/* Love Story & Vision Notes */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-brand-slate font-bold block">
              Tell us a bit about your wedding vision or love story
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. We are dreaming of a small garden wedding with soft warm light, neutral color styling, and lots of candles..."
              className="w-full glass-input resize-none"
            />
          </div>
        </div>

        {/* Action Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-charcoal hover:bg-black disabled:bg-brand-slate/60 text-brand-cream text-xs uppercase tracking-widest rounded-full font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            id="submit-booking"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin text-brand-rose" />
                <span>Securing Your Consultation Slot...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Confirm Complimentary Consultation</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
