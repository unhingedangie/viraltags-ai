# ViralTags AI — TikTok Caption & Hashtag Optimizer

A production-quality Next.js 14 App Router project with dark mode, neon gradients, and a modern glass-morphism aesthetic.

## Project Structure

```
viraltags-ai/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + custom styles (484 lines)
│   │   ├── layout.tsx           # Root layout with metadata & fonts (80 lines)
│   │   └── page.tsx             # Main page with tab routing (309 lines)
│   ├── components/
│   │   ├── Header.tsx           # Sticky nav with logo & CTA (127 lines)
│   │   ├── SmartInput.tsx        # Video description form (199 lines)
│   │   ├── ResultsPanel.tsx      # Captions/hashtags display (279 lines)
│   │   ├── TrendRadar.tsx        # Trending tags & stats (269 lines)
│   │   ├── HistoryPanel.tsx      # Generation history (224 lines)
│   │   └── CheckTagsPanel.tsx    # Tag analyzer (339 lines)
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # Strict TypeScript config
├── tailwind.config.ts            # Tailwind theme customization
├── next.config.js                # Next.js optimization
├── postcss.config.js             # PostCSS/Autoprefixer setup
├── .eslintrc.json                # ESLint rules
└── .gitignore                    # Git ignore rules
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## Features

### Visual Design
- **Dark Mode Default**: Starts in dark mode with class-based system
- **Neon Aesthetic**: Gradient text, glow effects, and neon borders
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Custom Animations**: Shimmer loading, slide-up, fade-in, pulse-glow
- **Responsive**: Mobile-first design with Tailwind utilities

### CSS Utilities (globals.css)
- **Gradient Classes**: `text-gradient-neon`, `text-gradient-cyan-pink`, `text-gradient-green-blue`
- **Glow Effects**: `glow-neon-green`, `glow-neon-pink`, `glow-neon-cyan`, `glow-neon-multi`
- **Button Styles**: `btn-neon-primary`, `btn-neon-secondary`, `btn-outline-neon`
- **Card Styles**: `card-dark`, `card-neon-border`
- **Input Styles**: `input-neon`, `textarea-neon`
- **Badges**: `badge-neon`, `badge-pink`, `badge-cyan`
- **Animations**: Shimmer, pulse-glow, slide-up, fade-in

### Components

#### Header
- Sticky top navigation with mobile menu
- Logo with neon glow
- CTA buttons (Sign In, Get Started)

#### SmartInput
- Textarea for video description
- Niche selector (8 categories)
- Style selector (7 options)
- Form validation & loading state

#### ResultsPanel
- Virality Score (0-100) with progress bar
- Three tabs: Captions, Hashtags, Trending Tags
- Copy-to-clipboard functionality
- Export options (Text, JSON, CSV)

#### TrendRadar
- Real-time trending hashtags
- Category filtering
- Top trend spotlight
- Growth indicators
- Popularity metrics

#### HistoryPanel
- Generation history grid (last 20)
- Preview cards with snippet
- Select & reuse previous results
- Stats summary (total, avg score, total hashtags)
- Clear history button

#### CheckTagsPanel
- Bulk hashtag analyzer
- Safety scoring (Safe/Moderate/Risky)
- Popularity & competition metrics
- Sortable results table
- Tag recommendations

### Root Layout (layout.tsx)
- Inter font from Google Fonts
- Full metadata for SEO
- Dark theme color scheme
- Animated gradient background overlays
- Proper viewport configuration

### Main Page (page.tsx)
- Client-side state management with hooks
- Tab-based navigation (Generate, Trends, Check Tags, History)
- Mock data generation with realistic results
- Responsive grid layouts
- Professional footer with links

## Styling System

### Dark Mode
- Default: `<html class="dark">`
- CSS Variables: `--primary-neon`, `--secondary-neon`, `--accent-neon`
- BG Gradient: Slate-900 to gray-950
- Text: Mostly gray-100, gray-300, gray-400

### Color Palette
```
Primary:   #00ff88 (Neon Green)
Secondary: #ff006e (Neon Pink)
Accent:    #00d9ff (Neon Cyan)
```

### Custom Scrollbar
- Green gradient track
- Glowing thumb on hover

### Responsive Breakpoints
- Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Mobile-optimized typography & spacing

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020 target with DOM APIs
- Requires JavaScript enabled

## Performance

- **Image Optimization**: Next.js Image component ready
- **Code Splitting**: Automatic with App Router
- **CSS**: Tailwind JIT + custom utilities
- **Fonts**: Pre-configured with next/font
- **Minification**: Enabled by default

## Type Safety

- Full TypeScript support (strict mode)
- Path aliases configured (`@/*`)
- Component props fully typed
- Interface definitions for data structures

## Future Enhancements

- Connect to real AI backend for caption/hashtag generation
- User authentication & saved generation history
- API routes for server-side operations
- Database integration (Prisma recommended)
- Real trending data from TikTok API
- Social media integrations (copy to clipboard, direct share)
- Analytics & performance tracking
- User preferences & settings
- Subscription/billing system

## Development Notes

- All components are client-side (`'use client'`)
- State management uses React hooks (useState, useCallback)
- No external state library (Zustand/Redux can be added)
- Responsive without JavaScript breakpoints
- All hover/focus states fully implemented
- Loading states with visual feedback
- Error handling patterns in place

## File Sizes

- globals.css: 484 lines
- Root layout: 80 lines
- Main page: 309 lines
- Components: 1,437 lines total
- **Total project code: 2,310 lines** (excluding config files)

---

Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.
