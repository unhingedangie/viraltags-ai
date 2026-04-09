'use client';

import Header from '@/components/Header';

export default function BlogPage() {
  const posts = [
    {
      title: '10 TikTok Hooks That Stop the Scroll',
      excerpt: 'Learn the psychology behind why certain captions make viewers stop scrolling and watch.',
      date: 'Apr 8, 2026'
    },
    {
      title: 'Hashtag Strategy: Why Less is More in 2026',
      excerpt: 'The days of 30 hashtags are over. Here\'s the data on why 5-8 targeted tags outperform spray-and-pray.',
      date: 'Apr 5, 2026'
    },
    {
      title: 'How to Spot a Trending Sound Before It Peaks',
      excerpt: 'Early trend detection is the #1 growth hack on TikTok. Here\'s how the pros do it.',
      date: 'Apr 1, 2026'
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
              ViralTags Blog
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
              Tips, trends, and strategies for TikTok creators
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {posts.map((post, index) => (
              <div
                key={index}
                className="card-dark border border-gray-800 rounded-lg p-6 hover:glow-neon-green hover:shadow-lg transition-smooth group cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-smooth">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {post.date}
                  </span>
                  <a href="#" className="text-green-400 hover:text-green-300 text-sm font-semibold transition-smooth">
                    Read More →
                  </a>
                </div>
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
