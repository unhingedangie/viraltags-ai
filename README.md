# ViralTags AI — TikTok Caption & Hashtag Optimizer

AI-powered TikTok SEO strategist. Describe your video, get optimized captions, hashtags, and trend insights.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

That's it! The app runs in demo mode by default — no API keys needed.

## Features

- **Caption Generator** — 5 viral hook frameworks (Curiosity Gap, Bold Claim, Direct Question, Story/Journey, Hot Take) with viral scoring
- **Hashtag Engine** — Tiered hashtags (Broad 1B+, Mid-Tier 100M-1B, Niche under 100M) with saturation indicators
- **Ready to Post** — Select a caption, get recommended hashtags, one-tap copy to TikTok
- **Trend Radar** — Trending tags and emerging opportunities
- **Check My Tags** — Paste your own hashtags for saturation analysis
- **History** — Auto-saved generations with performance tracking

## Going Live (Optional)

When you want real AI-powered generations with live web search:

1. Copy `.env.example` to `.env.local`
2. Add your [Anthropic API key](https://console.anthropic.com)
3. Set `NEXT_PUBLIC_DEMO_MODE=false`

### Free Hosting

- **Vercel** (free tier): `npm i -g vercel && vercel`
- **Supabase** (free tier): For user auth & database
- **Stripe**: Only charges when YOU get paid

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- LocalStorage for history (Supabase-ready)
