'use client';

import { useState } from 'react';
import type { GenerationOutput, CaptionResult, HashtagResult } from '@/app/page';

interface ResultsPanelProps {
  result: GenerationOutput;
  onSelectCaption: (id: string) => void;
}

export default function ResultsPanel({
  result,
  onSelectCaption,
}: ResultsPanelProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    broad: true,
    mid: true,
    niche: true,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 9) return 'from-green-500 to-emerald-500';
    if (score >= 8) return 'from-green-400 to-cyan-500';
    if (score >= 6) return 'from-yellow-400 to-orange-400';
    return 'from-orange-400 to-red-400';
  };

  const getViralScoreTextColor = (score: number) => {
    if (score >= 9) return 'text-emerald-400';
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getSaturationColor = (saturation: string) => {
    if (saturation === 'opportunity') return 'bg-green-500/30 text-green-300';
    if (saturation === 'competitive')
      return 'bg-yellow-500/30 text-yellow-300';
    return 'bg-red-500/30 text-red-300';
  };

  const getSaturationDot = (saturation: string) => {
    if (saturation === 'opportunity') return 'bg-green-500';
    if (saturation === 'competitive') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (direction: string) => {
    if (direction === 'rising') return '↗ ';
    if (direction === 'stable') return '→ ';
    return '↘ ';
  };

  const getTrendColor = (direction: string) => {
    if (direction === 'rising') return 'text-green-400';
    if (direction === 'stable') return 'text-gray-400';
    return 'text-red-400';
  };

  const getHookBadgeColor = (hookType: string) => {
    const colors: { [key: string]: string } = {
      'curiosity-gap': 'bg-pink-500/30 text-pink-300 border-pink-500/50',
      'bold-claim': 'bg-red-500/30 text-red-300 border-red-500/50',
      'direct-question': 'bg-cyan-500/30 text-cyan-300 border-cyan-500/50',
      'story-journey': 'bg-purple-500/30 text-purple-300 border-purple-500/50',
      'hot-take': 'bg-orange-500/30 text-orange-300 border-orange-500/50',
    };
    return colors[hookType] || 'bg-gray-500/30 text-gray-300 border-gray-500/50';
  };

  const selectedCaption = result.captions.find(
    (c) => c.id === result.selectedCaptionId
  );
  const broadHashtags = result.hashtags.filter((h) => h.tier === 'broad');
  const midHashtags = result.hashtags.filter((h) => h.tier === 'mid');
  const nicheHashtags = result.hashtags.filter((h) => h.tier === 'niche');

  const formatPostContent = () => {
    if (!selectedCaption) return '';
    const caption = selectedCaption.text;
    const tags = result.recommendedTags.map((t) => `#${t.tag}`).join(' ');
    return `${caption}\n\n${tags}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Section 1: Caption Options */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-neon">
          Caption Options (5 Hooks)
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {result.captions.map((caption) => (
            <div
              key={caption.id}
              className={`card-neon-border group cursor-pointer transition-all ${
                result.selectedCaptionId === caption.id
                  ? 'ring-2 ring-green-500 bg-green-500/10'
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold border ${getHookBadgeColor(
                          caption.hookType
                        )}`}
                      >
                        {caption.hookLabel}
                      </span>
                      <span className="text-xs text-gray-500">
                        {caption.characterCount} chars
                      </span>
                    </div>
                    <p className="text-sm text-gray-200">{caption.text}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(caption.text)}
                      className="p-2 rounded hover:bg-gray-700/50 transition-smooth text-gray-400 hover:text-gray-200"
                      title="Copy caption"
                    >
                      {copiedText === caption.text ? (
                        <span className="text-green-400 text-sm">✓</span>
                      ) : (
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">
                      Viral Score: {caption.viralScore}/10
                    </span>
                    <span className={`text-sm font-bold ${getViralScoreTextColor(caption.viralScore)}`}>
                      {caption.viralScore}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getViralScoreColor(caption.viralScore)}`}
                      style={{ width: `${(caption.viralScore / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 italic">
                    {caption.viralReasoning}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectCaption(caption.id)}
                    className={`flex-1 text-sm font-medium py-2 rounded transition-smooth ${
                      result.selectedCaptionId === caption.id
                        ? 'btn-neon-primary'
                        : 'btn-outline-neon'
                    }`}
                  >
                    {result.selectedCaptionId === caption.id
                      ? '✓ Selected'
                      : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Hashtag Engine Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-neon">
          Hashtag Engine
        </h2>

        {/* Broad Reach */}
        <div className="card-dark">
          <button
            onClick={() =>
              setExpandedSections((s) => ({ ...s, broad: !s.broad }))
            }
            className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🌍</span>
              <div className="text-left">
                <h3 className="font-bold text-green-400">BROAD REACH</h3>
                <p className="text-xs text-gray-500">1B+ estimated views</p>
              </div>
            </div>
            <span className="text-gray-400">
              {expandedSections.broad ? '−' : '+'}
            </span>
          </button>
          {expandedSections.broad && (
            <div className="px-4 pb-4 border-t border-gray-800/50 pt-4">
              <div className="flex flex-wrap gap-2">
                {broadHashtags.map((tag) => (
                  <HashtagPill
                    key={tag.tag}
                    tag={tag}
                    onCopy={() => copyToClipboard(`#${tag.tag}`)}
                    isCopied={copiedText === `#${tag.tag}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mid-Tier */}
        <div className="card-dark">
          <button
            onClick={() =>
              setExpandedSections((s) => ({ ...s, mid: !s.mid }))
            }
            className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <div className="text-left">
                <h3 className="font-bold text-cyan-400">MID-TIER</h3>
                <p className="text-xs text-gray-500">100M-1B estimated views</p>
              </div>
            </div>
            <span className="text-gray-400">
              {expandedSections.mid ? '−' : '+'}
            </span>
          </button>
          {expandedSections.mid && (
            <div className="px-4 pb-4 border-t border-gray-800/50 pt-4">
              <div className="flex flex-wrap gap-2">
                {midHashtags.map((tag) => (
                  <HashtagPill
                    key={tag.tag}
                    tag={tag}
                    onCopy={() => copyToClipboard(`#${tag.tag}`)}
                    isCopied={copiedText === `#${tag.tag}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Niche */}
        <div className="card-dark">
          <button
            onClick={() =>
              setExpandedSections((s) => ({ ...s, niche: !s.niche }))
            }
            className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💎</span>
              <div className="text-left">
                <h3 className="font-bold text-pink-400">NICHE</h3>
                <p className="text-xs text-gray-500">Under 100M estimated views</p>
              </div>
            </div>
            <span className="text-gray-400">
              {expandedSections.niche ? '−' : '+'}
            </span>
          </button>
          {expandedSections.niche && (
            <div className="px-4 pb-4 border-t border-gray-800/50 pt-4">
              <div className="flex flex-wrap gap-2">
                {nicheHashtags.map((tag) => (
                  <HashtagPill
                    key={tag.tag}
                    tag={tag}
                    onCopy={() => copyToClipboard(`#${tag.tag}`)}
                    isCopied={copiedText === `#${tag.tag}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Recommended Set */}
      <div className="card-neon-border bg-gradient-to-br from-green-500/10 via-cyan-500/10 to-pink-500/10">
        <h3 className="text-lg font-bold mb-4 text-gradient-neon">
          AI Recommended Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.recommendedTags.map((tag) => (
            <div
              key={tag.tag}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/40 to-cyan-500/40 border border-green-500/50 text-sm font-semibold text-green-200 hover:bg-gradient-to-r hover:from-green-500/60 hover:to-cyan-500/60 transition-smooth cursor-pointer"
              onClick={() => copyToClipboard(`#${tag.tag}`)}
              title="Click to copy"
            >
              #{tag.tag}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Ready to Post */}
      <div className="card-neon-border bg-gradient-to-br from-gray-900 to-gray-800 border-green-500/50 sticky bottom-0">
        <h3 className="text-lg font-bold mb-4 text-gradient-neon">
          Ready to Post
        </h3>

        <div className="bg-gray-950 rounded-lg p-4 mb-4 min-h-[120px] max-h-[200px] overflow-y-auto">
          {selectedCaption ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-200">{selectedCaption.text}</p>
              <div className="flex flex-wrap gap-1">
                {result.recommendedTags.map((tag) => (
                  <span
                    key={tag.tag}
                    className="text-xs text-cyan-400 font-semibold"
                  >
                    #{tag.tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Total: {formatPostContent().length} characters
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Select a caption above to preview
            </p>
          )}
        </div>

        <button
          disabled={!selectedCaption}
          onClick={() => copyToClipboard(formatPostContent())}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-smooth flex items-center justify-center gap-2 ${
            selectedCaption
              ? 'btn-neon-primary'
              : 'opacity-50 cursor-not-allowed bg-gray-700'
          }`}
        >
          {copiedText === formatPostContent() ? (
            <>
              <span>✓</span>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to TikTok
            </>
          )}
        </button>
      </div>
    </div>
  );
}

interface HashtagPillProps {
  tag: HashtagResult;
  onCopy: () => void;
  isCopied: boolean;
}

function HashtagPill({ tag, onCopy, isCopied }: HashtagPillProps) {
  const getSaturationColor = (saturation: string) => {
    if (saturation === 'opportunity') return 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30';
    if (saturation === 'competitive') return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30';
    return 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30';
  };

  const getSaturationDot = (saturation: string) => {
    if (saturation === 'opportunity') return 'bg-green-500';
    if (saturation === 'competitive') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (direction: string) => {
    if (direction === 'rising') return '↗ ';
    if (direction === 'stable') return '→ ';
    return '↘ ';
  };

  const getTrendColor = (direction: string) => {
    if (direction === 'rising') return 'text-green-400';
    if (direction === 'stable') return 'text-gray-400';
    return 'text-red-400';
  };

  return (
    <div
      onClick={onCopy}
      className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-smooth cursor-pointer flex items-center gap-2 ${getSaturationColor(tag.saturation)}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getSaturationDot(tag.saturation)}`} />
      <span>#{tag.tag}</span>
      <span className="text-xs text-gray-500">{tag.estimatedViews}</span>
      <span className={`${getTrendColor(tag.trendDirection)} font-bold`}>
        {getTrendIcon(tag.trendDirection)}
      </span>
      {!tag.isVerified && (
        <span className="text-xs text-gray-500 ml-auto">AI est.</span>
      )}
      {isCopied && <span className="text-green-400 ml-auto">✓</span>}
    </div>
  );
}
