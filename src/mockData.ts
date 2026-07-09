import { Package, ChecklistItem, BudgetItem } from './types';

export const weddingPackages: Package[] = [
  {
    id: 'day-of-coordination',
    name: 'The Intimate Day',
    tagline: 'Day-of Coordination & Execution',
    price: '$1,850',
    description: 'Perfect for couples who have planned everything but want a professional to oversee the wedding day and ensure a flawless, stress-free execution.',
    features: [
      'In-depth handover meeting 4 weeks before the wedding',
      'Timeline creation and vendor coordination',
      '1-hour rehearsal supervision',
      'On-site coordination (up to 10 hours) on your wedding day',
      'Behind-the-scenes troubleshooting and cueing',
      'Emergency bridal kit provided on-site'
    ]
  },
  {
    id: 'partial-planning',
    name: 'The Perfect Blend',
    tagline: 'Partial Planning & Design Guidance',
    price: '$3,600',
    description: 'Designed for couples who want to be hands-on but need professional guidance for vendor selection, layout design, and budget management.',
    features: [
      'Everything in "The Intimate Day" package',
      'Bi-weekly check-in planning sessions',
      'Access to curated vendor list & contract reviews',
      'Bespoke mood board & color palette design',
      'Budget allocation assistance and tracking tools',
      'Detailed floor plan and guest flow planning'
    ]
  },
  {
    id: 'full-planning',
    name: 'The Grand Affair',
    tagline: 'Full-Service Bespoke Curation',
    price: '$6,500',
    description: 'Our signature, all-inclusive luxury planning package. We handle every details from concept to cleanup, translating your personal love story into a breathtaking reality.',
    features: [
      'Everything in "The Perfect Blend" package',
      'Unlimited consultation calls and email support',
      'Complete venue sourcing, visits, and negotiations',
      'Full vendor sourcing, hiring, and management',
      'RSVP management and seating chart arrangement',
      'Day-of coordination with 2 senior lead coordinators',
      'Post-wedding wrap-up and breakdown oversight'
    ]
  }
];

export const initialChecklist = (userId: string): ChecklistItem[] => [
  {
    id: 'ch-1',
    userId,
    title: 'Select and reserve the wedding venue',
    category: 'Venue',
    dueDate: '2026-10-01',
    isCompleted: false,
    notes: 'Look for venues with soft natural lighting and garden access.'
  },
  {
    id: 'ch-2',
    userId,
    title: 'Finalize guest list and send Save the Dates',
    category: 'Paperwork',
    dueDate: '2026-11-15',
    isCompleted: false,
    notes: 'Keep it intimate - targeting around 80 guests.'
  },
  {
    id: 'ch-3',
    userId,
    title: 'Book photographer and videographer',
    category: 'Other',
    dueDate: '2026-12-01',
    isCompleted: false,
    notes: 'Focus on film-inspired, high-contrast, artistic documentary style.'
  },
  {
    id: 'ch-4',
    userId,
    title: 'Choose floral designer and curate color palette',
    category: 'Decor',
    dueDate: '2026-02-15',
    isCompleted: false,
    notes: 'Aim for blush roses, gardenias, and soft eucalyptus greens.'
  },
  {
    id: 'ch-5',
    userId,
    title: 'Select wedding dress and bridal party attire',
    category: 'Attire',
    dueDate: '2026-03-01',
    isCompleted: false,
    notes: 'Schedule fittings with the tailor.'
  },
  {
    id: 'ch-6',
    userId,
    title: 'Select catering menu and organize cake tasting',
    category: 'Catering',
    dueDate: '2026-04-10',
    isCompleted: false,
    notes: 'Include vegetarian options and a custom floral tiered cake.'
  }
];

export const initialBudget = (userId: string): BudgetItem[] => [
  {
    id: 'bg-1',
    userId,
    category: 'Venue',
    itemName: 'Garden Estate Rental',
    estimatedCost: 12000,
    actualCost: 11500
  },
  {
    id: 'bg-2',
    userId,
    category: 'Food & Beverage',
    itemName: 'Plated Organic Catering & Wine',
    estimatedCost: 8000,
    actualCost: 0
  },
  {
    id: 'bg-3',
    userId,
    category: 'Decor & Florals',
    itemName: 'Floral Arbors & Soft Lighting',
    estimatedCost: 4500,
    actualCost: 2000
  },
  {
    id: 'bg-4',
    userId,
    category: 'Photography',
    itemName: 'Fine Art Documentary Coverage',
    estimatedCost: 3500,
    actualCost: 3500
  },
  {
    id: 'bg-5',
    userId,
    category: 'Attire',
    itemName: 'Bespoke Suit & Silk Gown',
    estimatedCost: 3000,
    actualCost: 1200
  },
  {
    id: 'bg-6',
    userId,
    category: 'Music & Entertainment',
    itemName: 'Acoustic Trio & Late-night DJ',
    estimatedCost: 2500,
    actualCost: 0
  }
];

export const teamMembers = [
  {
    name: 'Evelyn Sterling',
    role: 'Founder & Principal Creative',
    bio: 'With over a decade of luxury event design experience, Evelyn founded our studio on the belief that weddings should feel like living art. She coordinates with a deep passion for subtle details, warm tones, and intimate guest experiences.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Julian Vance',
    role: 'Design Director & Styling Lead',
    bio: 'Julian is an architect of atmosphere. He specializes in spatial planning, lighting curation, and custom botanical installations that transform historic mansions and raw spaces into ethereal, unforgettable memories.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
  }
];

export const companyBackground = {
  philosophy: 'We believe that the most powerful love stories are told through whispers, not shouts. Our signature design philosophy blends effortless editorial elegance with deep, personal warmth. Every candle flame, linen fold, and acoustic note is curated to foster genuine connection and lasting beauty.',
  history: 'Founded in 2016 in Portland, Oregon, our boutique agency has designed over 150 bespoke weddings across the Pacific Northwest and Europe. We limit ourselves to just twelve full-service celebrations a year, ensuring every couple receives our absolute presence, devotion, and artistry.'
};
