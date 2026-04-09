'use client';

import Header from '@/components/Header';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      content: 'Describe your video in 1-2 sentences. Select your niche. Hit Generate. That\'s it — the AI handles the rest.'
    },
    {
      title: 'Understanding Captions',
      content: 'Each generation gives you 5 captions using proven viral frameworks: Curiosity Gap, Bold Claim, Direct Question, Story/Journey, and Hot Take. Pick the one that fits your vibe.'
    },
    {
      title: 'Reading Hashtag Results',
      content: 'Hashtags are sorted into three tiers: Broad (1B+ views for discovery), Mid-Tier (100M-1B for targeted reach), and Niche (under 100M for low competition). Green dots = opportunity, yellow = competitive, red = oversaturated.'
    },
    {
      title: 'Using the Trend Radar',
      content: 'The Trends tab shows what\'s hot right now. Look for tags with high growth % and the "Early Trend" badge — these are your biggest opportunities.'
    },
    {
      title: 'Check My Tags',
      content: 'Already have hashtags? Paste up to 20 in the Check Tags tab to see their saturation levels and get recommendations.'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-20 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-neon mb-6 animate-fade-in">
              Documentation
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
              Learn how to get the most out of ViralTags AI
            </p>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="card-dark border border-gray-800 rounded-lg p-8 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h2 className="text-2xl font-bold text-gradient-neon mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-8">
        <div className="container mx-auto px-4 max-w-7xl text-center text-gray-500 text-sm">
          © 2026 ViralTags AI. All rights reserved.
        </div>
      </footer>
    </>
  );
}
