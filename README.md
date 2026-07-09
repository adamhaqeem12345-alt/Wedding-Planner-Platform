# 🌸 Wedding Planner Platform — Glassmorphism Edition

A soft, intimate, and visually stunning digital sanctuary designed for modern couples. Built with high-fidelity React 19, Vite 6, and Tailwind CSS v4, this platform offers an elegant glassmorphic interface that seamlessly guides clients from their initial discovery consultation to active celebration tracking.

---

## ✨ Features At A Glance

### 1. ⚜️ Romantic & Immersive Landing Experience
- **Elegant Typographic Scale**: Sophisticated serif display headings paired with clean, geometric monospace data elements.
- **Glassmorphic Navigation**: A floating responsive header with real-time route highlights and subtle backdrop-blur filters.
- **Bespoke Packages Layout**: Tailored planning tiers styled in semi-translucent cards with hover lighting effects.
- **Organic About Section**: Aesthetic design philosophy showcases featuring the team and core artistic guidelines.

### 2. 📅 Complimentory Consultation Booking Form
- **Flexible Scheduler**: Integrated scheduling form for the complimentary 45-minute discovery consultation.
- **Comprehensive Fields**: Seamless input of essential details including target budgets, expected guest scales, date and time slots, and personalized dreams.
- **Smart Success Feedback**: Beautiful receipt card summary displaying booking parameters with a prompt for immediate onboarding.

### 3. 🗝️ Seamless Onboarding & On-Demand Portal
- **Flexible Guest & Custom Auth**: Supports instant custom client creation or immediate entry through a pre-loaded **Interactive Demo**.
- **Unified Celebration Dashboard**: A unified control center that serves as the couples' private planning lounge.

### 4. 🥂 Private Planning Lounge (Client Dashboard)
- **Interactive Love Countdown Clock**: Real-time ticker counting down to the exact second of the couple's special day.
- **Celebration Specs Customizer**: On-demand visual modal/form to modify partner details, wedding dates, and target budget caps.
- **Active Consultation Timeline**: Clean tracking of scheduled consultation times, designer assignments, and custom design briefs.
- **Interactive Checklist Tracker**: 
  - Adaptive progress ring measuring percentage completion.
  - Pre-loaded tasks categorized by phase (Venue, Attire, Floral, Design).
  - Ability to seamlessly create, assign, and delete custom couples' tasks.
- **Professional Budget & Expense Board**:
  - Live metric widgets displaying spending cap, estimated cost allocation, actual money spent, and remaining safety margins.
  - Dynamic financial entry forms to add new expense rows, allocate categories, and track actual vs estimated costs in real-time.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core**: [React 19](https://react.dev/) utilizing functional hook patterns and robust component modularity.
- **Build Engine**: [Vite 6](https://vite.dev/) for extremely fast Hot Module Replacement (HMR) and production optimization.
- **Style Foundation**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS-import configs, fluid responsive utility grids, and beautiful bespoke glassmorphism classes.
- **Interactions & Motion**: [Motion](https://motion.dev/) for micro-animations, fade transitions, and hardware-accelerated user interaction.
- **Icons**: [Lucide React](https://lucide.dev/) vector-perfect, responsive visual indicators.

---

## 📦 Project Structure

```bash
├── src/
│   ├── components/            # Visual Modules & Interactive Controls
│   │   ├── About.tsx          # Creative Philosophy & Studio Story
│   │   ├── AuthModal.tsx      # Onboarding Gateway & Interactive Demo Launcher
│   │   ├── BookingForm.tsx    # Complimentary Consultation Booking System
│   │   ├── ClientDashboard.tsx# Core Lounge Panel (Checklist, Budget, Countdown)
│   │   ├── Hero.tsx           # Romantic Welcome Card & Visual CTA
│   │   ├── Navbar.tsx         # Translucent Header & Global Controls
│   │   └── Packages.tsx       # Tiered Engagement Options & Features List
│   ├── App.tsx                # Client Routing and View Orchestration
│   ├── main.tsx               # Client Entrypoint
│   ├── index.css              # Global Tailwind Imports & Glassmorphism Design Tokens
│   ├── mockData.ts            # Default Demo Datasets
│   └── types.ts               # Core Type Definitions & Object Interfaces
├── package.json               # Package Manifest & System Scripts
├── tsconfig.json              # TypeScript Specifications
└── vite.config.ts             # Vite Module Bundler Configuration
```

---

## 🚀 Local Development Setup

To run the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch the Development Server
```bash
npm run dev
```
The application will launch on port `3000` (or your configured port).

### 3. Build for Production
```bash
npm run build
```
The static optimized assets will be bundled cleanly into `/dist`.

---

## 🎨 Creative Theme Guidelines
The application leverages a premium aesthetic styled as the **"Cosmic Rose & Frost"** collection:
- **Background**: Soft translucent white washes (`bg-white/20`) layered over ambient romantic backgrounds.
- **Panels**: Custom `.glass-panel` components incorporating high-contrast borders (`border-white/40`) and backdrop-blur effects (`backdrop-blur-md`).
- **Typography**: Playful and clean, combining classic high-contrast displays with technical monospace telemetry accents for data-heavy layout structures.
- **Controls**: Soft rounded shapes and tactile interactive elements, designed to put users at ease while designing their perfect celebration.
