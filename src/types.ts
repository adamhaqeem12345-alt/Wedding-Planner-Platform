export interface User {
  id: string;
  email: string;
  name: string;
  partnerName?: string;
  weddingDate?: string;
  estimatedBudget?: number;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  userId: string;
  title: string;
  category: 'Venue' | 'Attire' | 'Catering' | 'Decor' | 'Paperwork' | 'Other';
  dueDate?: string;
  isCompleted: boolean;
  notes?: string;
}

export interface BudgetItem {
  id: string;
  userId: string;
  category: 'Venue' | 'Attire' | 'Food & Beverage' | 'Decor & Florals' | 'Photography' | 'Music & Entertainment' | 'Invites' | 'Other';
  itemName: string;
  estimatedCost: number;
  actualCost: number;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  features: string[];
}
