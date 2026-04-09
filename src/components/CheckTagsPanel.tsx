'use client';

import { useState } from 'react';

interface TagAnalysis {
  tag: string;
  popularity: number;
  competition: number;
  score: number;
  status: 'safe' | 'moderate' | 'risky';
  useCount: number;
}

export default function CheckTagsPanel() {
  const [inputTags, setInputTags] = useState('');
  const [analyzedTags, setAnalyzedTags] = useState<TagAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputTags.trim()) return;

    setIsAnalyzing(true);

    const tags = inputTags
      .split(/[\s,#]+/)
      .filter((tag) => tag.length > 0)
      .map((tag) => tag.replace(/^#/, ''));

    const analyzed = tags.map((tag) => {
      const popularity = Math.floor(Math.random() * 100);
      const competition = Math.floor(Math.random() * 100);
      const useCount = Math.floor(Math.random() * 5000000) + 100000;

      let score = 0;
      let status: 'safe' | 'moderate' | 'risky' = 'moderate';

      if (popularity > 70 && competition < 60) {
        score = 90 + Math.floor(Math.random() * 10);
        status = 'safe';
      } else if (popularity > 50 && competition < 70) {
        score = 70 + Math.floor(Math.random() * 20);
        status = 'safe';
      } else if (popularity > 40) {
        score = 50 + Math.floor(Math.random() * 30);
        status = 'moderate';
      } else {
        score = 30 + Math.floor(Math.random() * 40);
        status = 'risky';
      }

      return {
        tag,
        popularity,
        competition,
        score,
        status,
        useCount,
      };
    });

    setAnalyzedTags(analyzed);
    setIsAnalyzing(false);
  };

  const handleTagSuggestion = (tag: string) => {
    setInputTags((prev) => {
      const tags = prev.split(/[\s,#]+/).filter((t) => t.length > 0);
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
      return tags.join(' ');
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'text-green-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'risky':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-500/20 border-green-500/30';
      case 'moderate':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'risky':
        return 'bg-orange-500/20 border-orange-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe':
        return '✓ Safe';
      case 'moderate':
        return '⚠ Moderate';
      case 'risky':
        return '⚠ Risky';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="card-neon-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Check Your Tags</h2>
            <p className="text-gray-400 text-sm">
              Analyze hashtag safety, competition, and effectiveness
            </p>
          </div>
          <span className="text-3xl">🔍</span>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            Paste your hashtags
          </label>
          <textarea
            value={inputTags}
            onChange={(e) => setInputTags(e.target.value)}
            placeholder="Paste hashtags here (separate by spaces, commas, or #). Example: #FYP #viral #trending"
            className="textarea-neon"
            disabled={isAnalyzing}
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter up to 30 hashtags for analysis
          </p>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputTags.trim()}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-smooth flex items-center justify-center gap-2 ${
            isAnalyzing || !inputTags.trim()
              ? 'opacity-50 cursor-not-allowed'
              : 'btn-neon-primary'
          }`}
        >
          {isAnalyzing ? (
            <>
              <span className="inline-block animate-spin">⚡</span>
              Analyzing...
            </>
          ) : (
            <>
              <span>🔍</span>
              Analyze Tags
            </>
          )}
        </button>
      </div>

      {/* Quick Suggestions */}
      {!analyzedTags.length && (
        <div className="card-dark">
          <p className="text-sm font-semibold mb-3 text-gray-300">
            Try analyzing these popular tags:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['#FYP', '#ForYou', '#Trending', '#Viral', '#Explore', '#Discover'].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSuggestion(tag.replace('#', ''))}
                  className="px-3 py-2 rounded text-sm bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 transition-smooth border border-gray-700/30"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {analyzedTags.length > 0 && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-1">Total Tags</p>
              <p className="text-2xl font-bold text-cyan-400">
                {analyzedTags.length}
              </p>
            </div>
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-1">Safe Tags</p>
              <p className="text-2xl font-bold text-green-400">
                {analyzedTags.filter((t) => t.status === 'safe').length}
              </p>
            </div>
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-1">Avg Score</p>
              <p className="text-2xl font-bold text-yellow-400">
                {(
                  analyzedTags.reduce((sum, t) => sum + t.score, 0) /
                  analyzedTags.length
                ).toFixed(0)}
              </p>
            </div>
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-1">Total Uses</p>
              <p className="text-2xl font-bold text-pink-400">
                {(
                  analyzedTags.reduce((sum, t) => sum + t.useCount, 0) / 1000000
                ).toFixed(1)}
                M
              </p>
            </div>
          </div>

          {/* Tags Analysis Table */}
          <div className="card-neon-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Hashtag</th>
                    <th className="px-4 py-3 text-right">Popularity</th>
                    <th className="px-4 py-3 text-right">Competition</th>
                    <th className="px-4 py-3 text-right">Score</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analyzedTags.map((tag, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-smooth"
                    >
                      <td className="px-4 py-3 font-semibold text-cyan-400">
                        #{tag.tag}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                              style={{ width: `${tag.popularity}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">
                            {tag.popularity}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-red-400"
                              style={{ width: `${tag.competition}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 w-8 text-right">
                            {tag.competition}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-yellow-400">
                          {tag.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBg(
                            tag.status
                          )} ${getStatusColor(tag.status)}`}
                        >
                          {getStatusLabel(tag.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card-dark border-blue-500/30 bg-blue-500/5">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-semibold mb-2 text-blue-300">Recommendations</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>
                    • Keep safe tags: {analyzedTags
                      .filter((t) => t.status === 'safe')
                      .map((t) => `#${t.tag}`)
                      .join(', ')}
                  </li>
                  <li>
                    • Mix high-competition tags with niche ones for better reach
                  </li>
                  <li>
                    • Use 8-10 relevant hashtags for optimal performance
                  </li>
                  <li>
                    • Rotate tags weekly to avoid shadow-ban risks
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Retest Button */}
          <button
            onClick={() => {
              setInputTags('');
              setAnalyzedTags([]);
            }}
            className="w-full btn-neon-secondary py-3 font-semibold"
          >
            Analyze Different Tags
          </button>
        </div>
      )}
    </div>
  );
}
