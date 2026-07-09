import React, { useState, useEffect } from 'react';
import { User, Booking, ChecklistItem, BudgetItem } from '../types';
import { initialChecklist, initialBudget, weddingPackages } from '../mockData';
import { 
  Heart, Calendar, DollarSign, CheckSquare, Square, Plus, Trash2, 
  Sparkles, Clock, MapPin, Percent, HelpCircle, Save 
} from 'lucide-react';

interface ClientDashboardProps {
  user: User;
  bookings: Booking[];
  onUpdateUser: (updatedUser: Partial<User>) => void;
  onAddBooking: (booking: Booking) => void;
}

export default function ClientDashboard({
  user,
  bookings,
  onUpdateUser,
  onAddBooking,
}: ClientDashboardProps) {
  // Tab control
  const [activeTab, setActiveTab] = useState<'timeline' | 'checklist' | 'budget'>('timeline');

  // Client-Side Wedding Countdown
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasDate, setHasDate] = useState(!!user.weddingDate);

  // Checklist Local States
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem(`checklist_${user.id}`);
    return saved ? JSON.parse(saved) : initialChecklist(user.id);
  });
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newChecklistCategory, setNewChecklistCategory] = useState<ChecklistItem['category']>('Venue');
  const [newChecklistDueDate, setNewChecklistDueDate] = useState('');

  // Budget Local States
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
    const saved = localStorage.getItem(`budget_${user.id}`);
    return saved ? JSON.parse(saved) : initialBudget(user.id);
  });
  const [newBudgetItemName, setNewBudgetItemName] = useState('');
  const [newBudgetCategory, setNewBudgetCategory] = useState<BudgetItem['category']>('Venue');
  const [newBudgetEstCost, setNewBudgetEstCost] = useState('');
  const [newBudgetActCost, setNewBudgetActCost] = useState('');

  // Settings modification
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [editSpecs, setEditSpecs] = useState({
    partnerName: user.partnerName || '',
    weddingDate: user.weddingDate || '',
    estimatedBudget: user.estimatedBudget || 30000,
  });

  // Keep checklists and budgets in local storage for that user
  useEffect(() => {
    localStorage.setItem(`checklist_${user.id}`, JSON.stringify(checklist));
  }, [checklist, user.id]);

  useEffect(() => {
    localStorage.setItem(`budget_${user.id}`, JSON.stringify(budgetItems));
  }, [budgetItems, user.id]);

  // Update dates if user specs change
  useEffect(() => {
    setHasDate(!!user.weddingDate);
    setEditSpecs({
      partnerName: user.partnerName || '',
      weddingDate: user.weddingDate || '',
      estimatedBudget: user.estimatedBudget || 30000,
    });
  }, [user]);

  // Countdown timer calculation
  useEffect(() => {
    if (!user.weddingDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(user.weddingDate!) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setCountdown(timeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [user.weddingDate]);

  // Handle saving modified wedding specs
  const handleSaveSpecs = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      partnerName: editSpecs.partnerName,
      weddingDate: editSpecs.weddingDate || undefined,
      estimatedBudget: Number(editSpecs.estimatedBudget),
    });
    setIsEditingSpecs(false);
  };

  // CHECKLIST OPERATIONS
  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)
    );
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistTitle) return;

    const newItem: ChecklistItem = {
      id: `ch-custom-${Date.now()}`,
      userId: user.id,
      title: newChecklistTitle,
      category: newChecklistCategory,
      dueDate: newChecklistDueDate || undefined,
      isCompleted: false,
    };

    setChecklist(prev => [newItem, ...prev]);
    setNewChecklistTitle('');
    setNewChecklistDueDate('');
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const checklistCompletedCount = checklist.filter(item => item.isCompleted).length;
  const checklistPercent = checklist.length > 0 ? Math.round((checklistCompletedCount / checklist.length) * 100) : 0;

  // BUDGET OPERATIONS
  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetItemName) return;

    const newItem: BudgetItem = {
      id: `bg-custom-${Date.now()}`,
      userId: user.id,
      category: newBudgetCategory,
      itemName: newBudgetItemName,
      estimatedCost: Number(newBudgetEstCost) || 0,
      actualCost: Number(newBudgetActCost) || 0,
    };

    setBudgetItems(prev => [...prev, newItem]);
    setNewBudgetItemName('');
    setNewBudgetEstCost('');
    setNewBudgetActCost('');
  };

  const handleDeleteBudget = (id: string) => {
    setBudgetItems(prev => prev.filter(item => item.id !== id));
  };

  const totalEstCost = budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0);
  const totalActCost = budgetItems.reduce((acc, item) => acc + item.actualCost, 0);
  const remainingBudget = (user.estimatedBudget || 30000) - totalActCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="client-dashboard-panel">
      
      {/* 1. Header Profile & Countdown Banner */}
      <div className="glass-panel p-6 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[40px] shadow-xl">
        {/* Intimate background overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 left-10 w-24 h-24 bg-brand-rose/10 rounded-full blur-xl pointer-events-none" />

        {/* Left Side Info */}
        <div className="lg:col-span-6 space-y-4 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white/40 rounded-full border border-white/50 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-brand-rose fill-brand-rose/30 animate-pulse" />
            <span className="text-[9px] tracking-widest uppercase text-brand-charcoal font-bold">
              Private Curated Planning Lounge
            </span>
          </div>

          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal">
              {user.name} {user.partnerName && <span className="text-brand-rose font-light">& {user.partnerName}</span>}
            </h2>
            <p className="text-xs text-brand-charcoal/80 font-light mt-1.5">
              {user.weddingDate ? (
                <span className="flex items-center justify-center lg:justify-start space-x-2">
                  <Calendar className="h-4 w-4 text-brand-rose" />
                  <span>Celebrating on {new Date(user.weddingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </span>
              ) : (
                <span>No celebration date set yet. Click "Update Celebration Specs" to customize!</span>
              )}
            </p>
          </div>

          <div className="pt-2">
            {!isEditingSpecs ? (
              <button
                onClick={() => setIsEditingSpecs(true)}
                className="px-5 py-2.5 bg-brand-charcoal hover:bg-black text-brand-cream text-[10px] uppercase tracking-wider rounded-full font-semibold transition-all cursor-pointer shadow-sm"
                id="edit-specs-toggle"
              >
                Update Celebration Specs
              </button>
            ) : (
              <form onSubmit={handleSaveSpecs} className="glass-card p-5 max-w-md animate-fade-in text-left space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block mb-1">Partner Name</label>
                    <input
                      type="text"
                      value={editSpecs.partnerName}
                      onChange={(e) => setEditSpecs(prev => ({ ...prev, partnerName: e.target.value }))}
                      className="w-full glass-input"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block mb-1">Wedding Date</label>
                    <input
                      type="date"
                      value={editSpecs.weddingDate}
                      onChange={(e) => setEditSpecs(prev => ({ ...prev, weddingDate: e.target.value }))}
                      className="w-full glass-input cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block mb-1">Total Target Budget (USD)</label>
                  <input
                    type="number"
                    value={editSpecs.estimatedBudget}
                    onChange={(e) => setEditSpecs(prev => ({ ...prev, estimatedBudget: Number(e.target.value) }))}
                    className="w-full glass-input"
                  />
                </div>

                <div className="flex space-x-2 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-charcoal hover:bg-black text-brand-cream text-[10px] uppercase tracking-wider rounded-full flex items-center space-x-1 font-semibold cursor-pointer shadow-sm"
                  >
                    <Save className="h-3 w-3" />
                    <span>Save Specs</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingSpecs(false)}
                    className="px-4 py-2 border border-black/15 hover:bg-white/45 text-brand-charcoal text-[10px] uppercase tracking-wider rounded-full font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side Live Countdown */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative z-10">
          {hasDate ? (
            <div className="space-y-3.5 text-center">
              <span className="text-[10px] tracking-widest uppercase text-brand-rose font-bold block">
                COUNTDOWN TO FOREVER
              </span>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
                <div className="glass-card p-2.5 sm:p-3.5 rounded-2xl shadow-sm w-16 sm:w-20">
                  <div className="font-serif text-xl sm:text-2xl text-brand-charcoal font-semibold">{countdown.days}</div>
                  <div className="text-[8px] sm:text-[9px] text-brand-slate uppercase font-medium mt-0.5">Days</div>
                </div>
                <div className="glass-card p-2.5 sm:p-3.5 rounded-2xl shadow-sm w-16 sm:w-20">
                  <div className="font-serif text-xl sm:text-2xl text-brand-charcoal font-semibold">{countdown.hours}</div>
                  <div className="text-[8px] sm:text-[9px] text-brand-slate uppercase font-medium mt-0.5">Hours</div>
                </div>
                <div className="glass-card p-2.5 sm:p-3.5 rounded-2xl shadow-sm w-16 sm:w-20">
                  <div className="font-serif text-xl sm:text-2xl text-brand-charcoal font-semibold">{countdown.minutes}</div>
                  <div className="text-[8px] sm:text-[9px] text-brand-slate uppercase font-medium mt-0.5">Mins</div>
                </div>
                <div className="glass-card p-2.5 sm:p-3.5 rounded-2xl shadow-sm w-16 sm:w-20 border-brand-rose/40">
                  <div className="font-serif text-xl sm:text-2xl text-brand-charcoal font-semibold text-brand-rose">{countdown.seconds}</div>
                  <div className="text-[8px] sm:text-[9px] text-brand-slate uppercase font-medium mt-0.5">Secs</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 glass-card rounded-[24px] max-w-sm">
              <Sparkles className="h-5 w-5 text-brand-gold mx-auto mb-2.5" />
              <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light">
                Specify your wedding celebration date to activate your personal bespoke love countdown clock.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 2. Bespoke Tab Controls */}
      <div className="flex max-w-lg mx-auto backdrop-blur-md bg-white/20 border border-white/40 p-1.5 rounded-full shadow-md">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
            activeTab === 'timeline'
              ? 'bg-brand-charcoal text-brand-cream shadow-md'
              : 'text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-white/30'
          }`}
          id="tab-bookings"
        >
          Consultations
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-brand-charcoal text-brand-cream shadow-md'
              : 'text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-white/30'
          }`}
          id="tab-checklist"
        >
          My Checklist ({checklistPercent}%)
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
            activeTab === 'budget'
              ? 'bg-brand-charcoal text-brand-cream shadow-md'
              : 'text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-white/30'
          }`}
          id="tab-budget"
        >
          Budget Planner
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="transition-all duration-300">
        
        {/* TAB 1: My Bookings & Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 sm:p-8 shadow-md rounded-[32px]">
              <div className="flex justify-between items-center mb-6 border-b border-white/30 pb-4">
                <div>
                  <h3 className="font-serif text-xl text-brand-charcoal">My consultations & Bookings</h3>
                  <p className="text-xs text-brand-charcoal/80 font-light mt-0.5">Your booked appointments with our designers and coordinators.</p>
                </div>
                <div className="p-2.5 bg-white/50 border border-white/60 rounded-full text-brand-rose shadow-sm">
                  <Clock className="h-5 w-5" />
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-xs text-brand-charcoal/80 italic font-light">You have no scheduled consultations yet.</p>
                  <p className="text-xs text-brand-charcoal/70 max-w-sm mx-auto font-light leading-relaxed">
                    Schedule your complimentary 45-minute discovery call to discuss themes, layout planning, and floral curation.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="glass-card p-5 rounded-2xl relative hover:bg-white/40 transition-colors shadow-sm"
                    >
                      <span className="absolute top-4 right-4 px-3 py-1 bg-white/60 border border-white/50 text-[9px] uppercase tracking-widest text-brand-rose rounded-full font-bold shadow-sm">
                        {booking.status}
                      </span>

                      <div className="space-y-3.5 text-left">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block">Assigned Service</span>
                          <h4 className="font-serif text-base text-brand-charcoal font-medium">{booking.packageName}</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-t border-white/30 pt-3">
                          <div className="flex items-center space-x-1.5 text-xs text-brand-charcoal/80">
                            <Calendar className="h-3.5 w-3.5 text-brand-rose" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-xs text-brand-charcoal/80">
                            <Clock className="h-3.5 w-3.5 text-brand-rose" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="bg-white/30 p-3 rounded-xl border border-white/20 text-[11px] text-brand-charcoal/90 font-light italic leading-relaxed">
                            "{booking.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Wedding Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-fade-in" id="dashboard-checklist-subpanel">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Checklist Progress Summary */}
              <div className="lg:col-span-4 glass-panel p-6 shadow-md rounded-[32px] space-y-4">
                <h3 className="font-serif text-lg text-brand-charcoal">Checklist Status</h3>
                
                {/* Visual Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-brand-charcoal uppercase font-bold">
                    <span>Task Completion</span>
                    <span className="text-brand-rose font-bold">{checklistPercent}%</span>
                  </div>
                  <div className="w-full bg-white/40 h-2.5 rounded-full overflow-hidden border border-white/20">
                    <div 
                      className="bg-brand-rose h-full rounded-full transition-all duration-500" 
                      style={{ width: `${checklistPercent}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-white/30 pt-4 text-[11px] text-brand-charcoal/80 leading-relaxed font-light">
                  <p>
                    This bespoke checklist is pre-loaded based on typical timelines. Check items as you complete them or add your own custom assignments to stay completely aligned.
                  </p>
                </div>

                {/* Add Checklist Item Form */}
                <form onSubmit={handleAddChecklist} className="border-t border-white/30 pt-4 space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-brand-rose font-bold block">
                    ADD CUSTOM ASSIGNMENT
                  </span>
                  
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Order linen napkins"
                      value={newChecklistTitle}
                      onChange={(e) => setNewChecklistTitle(e.target.value)}
                      className="w-full glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newChecklistCategory}
                      onChange={(e) => setNewChecklistCategory(e.target.value as ChecklistItem['category'])}
                      className="glass-input cursor-pointer focus:outline-none"
                    >
                      <option value="Venue">Venue</option>
                      <option value="Attire">Attire</option>
                      <option value="Catering">Catering</option>
                      <option value="Decor">Decor</option>
                      <option value="Paperwork">Paperwork</option>
                      <option value="Other">Other</option>
                    </select>
                    
                    <input
                      type="date"
                      value={newChecklistDueDate}
                      onChange={(e) => setNewChecklistDueDate(e.target.value)}
                      className="glass-input cursor-pointer focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-charcoal hover:bg-black text-brand-cream text-[10px] uppercase tracking-wider rounded-full font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-1 shadow"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Create Assignment</span>
                  </button>
                </form>
              </div>

              {/* Checklist Items List */}
              <div className="lg:col-span-8 glass-panel p-6 shadow-md rounded-[32px] space-y-4">
                <div className="flex justify-between items-center border-b border-white/30 pb-4">
                  <h3 className="font-serif text-lg text-brand-charcoal">To-Do Checklist</h3>
                  <span className="text-xs text-brand-charcoal/80">{checklistCompletedCount} of {checklist.length} items complete</span>
                </div>

                <div className="divide-y divide-white/20">
                  {checklist.map((item) => (
                    <div 
                      key={item.id} 
                      className={`py-4 flex items-start justify-between space-x-3 transition-colors ${item.isCompleted ? 'bg-white/10' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <button 
                          onClick={() => handleToggleChecklist(item.id)}
                          className="mt-0.5 text-brand-rose hover:scale-105 transition-transform cursor-pointer"
                        >
                          {item.isCompleted ? (
                            <CheckSquare className="h-5 w-5 fill-brand-rose/10 text-brand-rose" />
                          ) : (
                            <Square className="h-5 w-5 text-brand-rose/50" />
                          )}
                        </button>

                        <div className="space-y-1 text-left">
                          <p className={`text-xs text-brand-charcoal font-medium ${item.isCompleted ? 'line-through text-brand-charcoal/50 font-light' : ''}`}>
                            {item.title}
                          </p>
                          <div className="flex items-center space-x-2.5">
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-charcoal/90 px-2.5 py-0.5 bg-white/40 border border-white/35 rounded-full shadow-sm">
                              {item.category}
                            </span>
                            {item.dueDate && (
                              <span className="text-[10px] text-brand-charcoal/80 font-light flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-brand-rose/70" />
                                Due: {item.dueDate}
                              </span>
                            )}
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-brand-slate italic font-light leading-snug">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteChecklist(item.id)}
                        className="text-brand-slate/40 hover:text-red-600 p-1.5 rounded-full hover:bg-white/40 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: Intimate Budget Planner */}
        {activeTab === 'budget' && (
          <div className="space-y-6 animate-fade-in" id="dashboard-budget-subpanel">
            {/* Visual Budget Ring Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="glass-panel p-5 text-center space-y-1 rounded-2xl shadow-sm border border-white/40">
                <span className="text-[9px] tracking-widest uppercase text-brand-slate font-bold block">Target Budget limit</span>
                <div className="text-2xl font-serif text-brand-charcoal">${user.estimatedBudget?.toLocaleString() || '30,000'}</div>
                <div className="text-[9px] text-brand-slate font-light">Set as your total spending limit</div>
              </div>

              <div className="glass-panel p-5 text-center space-y-1 rounded-2xl shadow-sm border border-white/40">
                <span className="text-[9px] tracking-widest uppercase text-brand-slate font-bold block">Estimated Allocation</span>
                <div className="text-2xl font-serif text-brand-charcoal text-brand-slate">${totalEstCost.toLocaleString()}</div>
                <div className="text-[9px] text-brand-slate font-light">Total of planned estimates</div>
              </div>

              <div className="glass-panel p-5 text-center space-y-1 rounded-2xl shadow-sm border border-white/40">
                <span className="text-[9px] tracking-widest uppercase text-brand-slate font-bold block">Actual Cost Spent</span>
                <div className="text-2xl font-serif text-brand-charcoal text-brand-rose">${totalActCost.toLocaleString()}</div>
                <div className="text-[9px] text-brand-slate font-light">Current paid out / locked costs</div>
              </div>

              <div className="glass-panel p-5 text-center space-y-1 rounded-2xl shadow-sm border border-white/40">
                <span className="text-[9px] tracking-widest uppercase text-brand-slate font-bold block">Remaining Allocation</span>
                <div className={`text-2xl font-serif ${remainingBudget >= 0 ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}`}>
                  ${remainingBudget.toLocaleString()}
                </div>
                <div className="text-[9px] text-brand-slate font-light">Leftover safety margin</div>
              </div>

            </div>

            {/* Budget list & add custom form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Add Budget Entry Form */}
              <div className="lg:col-span-4 glass-panel p-6 shadow-md rounded-[32px] space-y-4">
                <h3 className="font-serif text-lg text-brand-charcoal">Add Budget Row</h3>
                
                <form onSubmit={handleAddBudget} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block">Item Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wedding Flowers"
                      value={newBudgetItemName}
                      onChange={(e) => setNewBudgetItemName(e.target.value)}
                      className="w-full glass-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block">Budget Category</label>
                    <select
                      value={newBudgetCategory}
                      onChange={(e) => setNewBudgetCategory(e.target.value as BudgetItem['category'])}
                      className="w-full glass-input cursor-pointer"
                    >
                      <option value="Venue">Venue</option>
                      <option value="Attire">Attire</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Decor & Florals">Decor & Florals</option>
                      <option value="Photography">Photography</option>
                      <option value="Music & Entertainment">Music & Entertainment</option>
                      <option value="Invites">Invites</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block">Estimate ($)</label>
                      <input
                        type="number"
                        placeholder="3500"
                        value={newBudgetEstCost}
                        onChange={(e) => setNewBudgetEstCost(e.target.value)}
                        className="w-full glass-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-brand-slate font-bold block">Actual ($)</label>
                      <input
                        type="number"
                        placeholder="3200"
                        value={newBudgetActCost}
                        onChange={(e) => setNewBudgetActCost(e.target.value)}
                        className="w-full glass-input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-charcoal hover:bg-black text-brand-cream text-[10px] uppercase tracking-wider rounded-full font-semibold transition-colors cursor-pointer flex items-center justify-center space-x-1 shadow"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Create Expense Row</span>
                  </button>
                </form>
              </div>

              {/* Budget Table Column */}
              <div className="lg:col-span-8 glass-panel p-6 shadow-md rounded-[32px] space-y-4">
                <h3 className="font-serif text-lg text-brand-charcoal mb-4">Celebration Cost Breakdown</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-brand-charcoal/80">
                    <thead>
                      <tr className="border-b border-white/30 text-[10px] uppercase tracking-widest text-brand-charcoal font-bold bg-white/20">
                        <th className="py-3 px-4">Item Details</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 text-right">Estimate Cost</th>
                        <th className="py-3 px-4 text-right">Actual Cost</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                      {budgetItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/10 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-brand-charcoal text-left">{item.itemName}</td>
                          <td className="py-3.5 px-4 text-left">
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-charcoal/90 px-2.5 py-0.5 bg-white/40 border border-white/35 rounded-full shadow-sm">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-light">${item.estimatedCost.toLocaleString()}</td>
                          <td className="py-3.5 px-4 text-right font-semibold text-brand-charcoal">
                            {item.actualCost > 0 ? `$${item.actualCost.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleDeleteBudget(item.id)}
                              className="text-brand-slate/40 hover:text-red-600 p-1.5 rounded-full hover:bg-white/40 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                              title="Delete Row"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
