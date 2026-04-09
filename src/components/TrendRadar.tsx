'use client';

import { useState } from 'react';

interface Trend {
  id: string;
  name: string;
  category: string;
  popularity: number;
  growth: number;
  uses: number;
  emoji: string;
  isRising: boolean;
}

export default function TrendRadar() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trends: Trend[] = [
    {
      id: '1',
      name: 'morning routine',
      category: 'lifestyle',
      popularity: 94,
      growth: 18,
      uses: 2400000,
      emoji: '☀️',
      isRising: true,
    },
    {
      id: '2',
      name: 'aesthetic vibe',
      category: 'aesthetic',
      popularity: 87,
      growth: 12,
      uses: 1800000,
      emoji: '🎨',
      isRising: true,
    },
    {
      id: '3',
      name: 'satisfying',
      category: 'general',
      popularity: 92,
      growth: 8,
      uses: 3200000,
      emoji: '✨',
      isRising: false,
    },
    {
      id: '4',
      name: 'POV',
      category: 'format',
      popularity: 88,
      growth: 15,
      uses: 2100000,
      emoji: '👀',
      isRising: true,
    },
    {
      id: '5',
      name: 'GRWM',
      category: 'lifestyle',
      popularity: 85,
      growth: 22,
      uses: 1600000,
      emoji: '💄',
      isRising: true,
    },
    {
      id: '6',
      name: 'gym girl era',
      category: 'fitness',
      popularity: 81,
      growth: 25,
      uses: 1400000,
      emoji: '💪',
      isRising: true,
    },
    {
      id: '7',
      name: 'no cap',
      category: 'slang',
      popularity: 79,
      growth: 5,
      uses: 900000,
      emoji: '🧢',
      isRising: false,
    },
    {
      id: '8',
      name: 'it girl',
      category: 'aesthetic',
      popularity: 84,
      growth: 19,
      uses: 1700000,
      emoji: '👑',
      isRising: true,
    },
  ];

  const categories = [
    'all',
    'lifestyle',
    'aesthetic',
    'general',
    'format',
    'fitness',
    'slang',
  ];

  const filteredTrends =
    selectedCategory === 'all'
      ? trends
      : trends.filter((t) => t.category === selectedCategory);

  const topTrend = filteredTrends[0];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Trending Now Header */}
      <div className="card-neon-border">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-400 text-sm">
              Real-time TikTok trend analysis
            </p>
          </div>
          <div className="text-3xl animate-pulse">🔥</div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-smooth ${
                selectedCategory === cat
                  ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-700/40 border border-gray-700/30'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Top Trend Spotlight */}
        {topTrend && (
          <div className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-lg p-4 mb-6 border border-pink-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-30 text-5xl">
              {topTrend.emoji}
            </div>
            <div className="relative">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-pink-300">
                  #{topTrend.name}
                </span>
                {topTrend.isRising && (
                  <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
                    </svg>
                    +{topTrend.growth}%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-3">
                {(topTrend.uses / 1000000).toFixed(1)}M uses
              </p>
              <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-cyan-400"
                  style={{ width: `${topTrend.popularity}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Trends List */}
        <div className="space-y-3">
          {filteredTrends.map((trend, idx) => (
            <div
              key={trend.id}
              className="bg-gray-800/20 rounded-lg p-3 hover:bg-gray-800/40 transition-smooth border border-gray-700/20 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {trend.emoji}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-semibold text-gray-100">
                        #{trend.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">
                        {trend.category}
                      </span>
                      {trend.isRising && (
                        <span className="text-xs font-bold text-green-400">
                          ↑ {trend.growth}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {(trend.uses / 1000000).toFixed(1)}M uses
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-gray-800/50 flex items-center justify-center text-xs font-bold">
                    <span className="text-cyan-400">{trend.popularity}%</span>
                  </div>
                </div>
              </div>

              {/* Mini Progress Bar */}
              <div className="w-full h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400"
                  style={{ width: `${trend.popularity}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-dark">
          <p className="text-gray-400 text-xs mb-2">Avg. Growth Rate</p>
          <p className="text-2xl font-bold text-green-400">
            {(
              filteredTrends.reduce((sum, t) => sum + t.growth, 0) /
              filteredTrends.length
            ).toFixed(1)}
            %
          </p>
        </div>
        <div className="card-dark">
          <p className="text-gray-400 text-xs mb-2">Active Trends</p>
          <p className="text-2xl font-bold text-cyan-400">
            {filteredTrends.length}
          </p>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="card-dark border-blue-500/30 bg-blue-500/5">
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <h4 className="font-semibold mb-1 text-blue-300">Pro Tip</h4>
            <p className="text-xs text-gray-400">
              Use rising trends (+15% or more) to maximize visibility. Mix
              them with evergreen hashtags for sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
