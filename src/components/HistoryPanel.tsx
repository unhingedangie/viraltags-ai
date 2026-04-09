'use client';

interface HistoryItem {
  id: string;
  timestamp: number;
  description: string;
  category: string;
  captions: Array<{
    text: string;
    viralScore: number;
    hookLabel: string;
  }>;
  hashtags: Array<{
    tag: string;
    tier: string;
  }>;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectItem: (id: string) => void;
  onClear: () => void;
}

export default function HistoryPanel({
  history,
  onSelectItem,
  onClear,
}: HistoryPanelProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, length: number = 60) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const getAverageViralScore = () => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, item) => {
      if (item.captions.length === 0) return sum;
      const avg =
        item.captions.reduce((s, c) => s + c.viralScore, 0) /
        item.captions.length;
      return sum + avg;
    }, 0);
    return Math.round(total / history.length);
  };

  const getTotalHashtags = () => {
    return history.reduce((sum, item) => sum + item.hashtags.length, 0);
  };

  const getTotalCaptions = () => {
    return history.reduce((sum, item) => sum + item.captions.length, 0);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Generation History</h2>
          <p className="text-gray-400 text-sm">
            {history.length === 0
              ? 'Your generations will appear here'
              : `Your last ${history.length} generation${history.length > 1 ? 's' : ''}`}
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="btn-outline-neon text-sm py-2 px-4 flex items-center gap-2 transition-smooth"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* History Grid or Empty State */}
      {history.length === 0 ? (
        <div className="card-neon-border text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">No history yet</h3>
          <p className="text-gray-400 mb-8">
            Generate your first caption & hashtags to start building history
          </p>
          <div className="card-dark border-green-500/30 bg-green-500/5">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🎯</span>
              <div>
                <h4 className="font-semibold mb-1 text-green-300">
                  Getting Started
                </h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Go to the "Generate" tab</li>
                  <li>• Describe your TikTok video</li>
                  <li>• Choose your niche and style</li>
                  <li>• Get AI-optimized results instantly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* History Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="card-neon-border text-left hover:glow-neon-green-intense transition-all group"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-300 line-clamp-2 break-words">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400 text-center whitespace-nowrap">
                      {item.captions.length > 0
                        ? Math.round(
                            item.captions.reduce((s, c) => s + c.viralScore, 0) /
                              item.captions.length
                          )
                        : 0}
                    </span>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="bg-gray-800/30 rounded p-3 mb-3 space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1">
                      Top Caption
                    </p>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      "{truncateText(item.captions[0]?.text || 'N/A')}"
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1">
                      Top Hashtags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.hashtags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300"
                        >
                          #{tag.tag}
                        </span>
                      ))}
                      {item.hashtags.length > 3 && (
                        <span className="text-xs px-2 py-1 text-gray-500">
                          +{item.hashtags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                  <div className="text-center py-2 rounded bg-gray-800/20">
                    <p className="text-gray-400">Captions</p>
                    <p className="font-bold text-green-400">
                      {item.captions.length}
                    </p>
                  </div>
                  <div className="text-center py-2 rounded bg-gray-800/20">
                    <p className="text-gray-400">Hashtags</p>
                    <p className="font-bold text-cyan-400">
                      {item.hashtags.length}
                    </p>
                  </div>
                  <div className="text-center py-2 rounded bg-gray-800/20">
                    <p className="text-gray-400">Niche</p>
                    <p className="font-bold text-pink-400 capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Results</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-2">Total Generations</p>
              <p className="text-3xl font-bold text-green-400">
                {history.length}
              </p>
            </div>
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-2">Avg. Viral Score</p>
              <p className="text-3xl font-bold text-cyan-400">
                {getAverageViralScore()}/10
              </p>
            </div>
            <div className="card-dark">
              <p className="text-gray-400 text-xs mb-2">Total Hashtags</p>
              <p className="text-3xl font-bold text-pink-400">
                {getTotalHashtags()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
