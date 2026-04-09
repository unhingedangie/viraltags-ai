'use client';

import Header from '@/components/Header';

export default function FeaturesPage() {
  const features = [
    {
      emoji: '✍️',
      title: 'AI Caption Generator',
      description: '5 proven hook frameworks generate scroll-stopping captions. Each scored for viral potential.'
    },
    {
      emoji: '#️⃣',
      title: 'Smart Hashtag Engine',
      description: 'Three-tier hashtag strategy: Broad reach, Mid-tier targeting, and Niche opportunities. All saturation-checked.'
    },
    {
      emoji: '📡',
      title: 'Trend Radar',
      description: 'Real-time trending hashtags and sounds. Spot early trends before they blow up.'
    },
    {
      emoji: '🔍',
      title: 'Saturation Checker',
      description: 'Every hashtag analyzed for oversaturation. Green means go, red means find something better.'
    },
    {
      emoji: '📋',
      title: 'Ready to Post',
      description: 'One-tap copy your caption + hashtags, perfectly formatted for TikTok. Zero formatting hassle.'
    },
    {
      emoji: '📊',
      title: 'Smart History',
      description: 'Every generation saved automatically. Track what works, favorite your best combos.'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-20 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-neon mb-6 animate-fade-in">
              Everything You Need to Go Viral
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
              AI does the research. You just describe your video.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-dark border border-gray-800 rounded-lg p-6 hover:card-neon-border hover:border-green-400/30 transition-smooth group cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-400/20 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to boost your reach?
            </h2>
            <button className="btn-neon-primary text-lg py-4 px-8 rounded-lg font-semibold transition-smooth hover:shadow-lg glow-neon-green">
              Get Started Free
            </button>
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
