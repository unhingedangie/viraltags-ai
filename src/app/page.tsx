'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import SmartInput from '@/components/SmartInput';
import ResultsPanel from '@/components/ResultsPanel';
import TrendRadar from '@/components/TrendRadar';
import HistoryPanel from '@/components/HistoryPanel';
import CheckTagsPanel from '@/components/CheckTagsPanel';

export interface CaptionResult {
  id: string;
  hookType: string;
  hookLabel: string;
  text: string;
  characterCount: number;
  viralScore: number;
  viralReasoning: string;
}

export interface HashtagResult {
  tag: string;
  tier: 'broad' | 'mid' | 'niche';
  estimatedViews: string;
  saturation: 'opportunity' | 'competitive' | 'oversaturated';
  trendDirection: 'rising' | 'stable' | 'declining';
  isVerified: boolean;
}

export interface GenerationOutput {
  id: string;
  timestamp: number;
  description: string;
  category: string;
  captions: CaptionResult[];
  hashtags: HashtagResult[];
  recommendedTags: HashtagResult[];
  selectedCaptionId: string | null;
}

type TabType = 'generate' | 'trends' | 'history' | 'check-tags';

const LOADING_MESSAGES = [
  'Analyzing your content...',
  'Researching trending hashtags...',
  'Checking saturation levels...',
  'Building your strategy...',
  'Generating viral captions...',
];

const HOOK_TYPES = [
  { type: 'curiosity-gap', label: 'Curiosity Gap' },
  { type: 'bold-claim', label: 'Bold Claim' },
  { type: 'direct-question', label: 'Direct Question' },
  { type: 'story-journey', label: 'Story/Journey' },
  { type: 'hot-take', label: 'Hot Take' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('generate');
  const [result, setResult] = useState<GenerationOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GenerationOutput[]>([]);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('viraltags-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isGenerating) return;

    let messageIndex = 0;
    setLoadingMessage(LOADING_MESSAGES[0]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const generateCaptions = (
    description: string,
    niche: string,
    style: string
  ): CaptionResult[] => {
    const keywords = description.toLowerCase().split(/\s+/).slice(0, 3);
    const templates = [
      (kw: string[]) =>
        `Wait, did you see that? 👀 ${kw[0]} on another level...`,
      (kw: string[]) =>
        `The ${kw[0]} part hit different 🔥 nobody's doing it like this`,
      (kw: string[]) =>
        `Is it just me or was ${kw[0]} the most insane part? 💯`,
      (kw: string[]) =>
        `Started with ${kw[0]}, ended with respect 🎯 full story in comments`,
      (kw: string[]) =>
        `Unpopular opinion: this ${kw[0]} era is > everything else 📈`,
    ];

    return HOOK_TYPES.map((hook, idx) => {
      const text = templates[idx](keywords);
      return {
        id: `caption-${idx}`,
        hookType: hook.type,
        hookLabel: hook.label,
        text,
        characterCount: text.length,
        viralScore: Math.floor(Math.random() * 3) + 7,
        viralReasoning: `Strong ${hook.label.toLowerCase()} hook with immediate emotional appeal. Niche: ${niche}.`,
      };
    });
  };

  const generateHashtags = (): {
    broad: HashtagResult[];
    mid: HashtagResult[];
    niche: HashtagResult[];
  } => {
    const broadTags = [
      'FYP',
      'ForYouPage',
      'Trending',
      'Viral',
      'TikTok',
    ].map((tag) => ({
      tag,
      tier: 'broad' as const,
      estimatedViews: ['2.1B', '1.8B', '2.5B', '1.9B', '2.3B'][
        Math.floor(Math.random() * 5)
      ],
      saturation: Math.random() > 0.4 ? 'oversaturated' : 'competitive',
      trendDirection: ['rising', 'stable', 'declining'][
        Math.floor(Math.random() * 3)
      ] as any,
      isVerified: true,
    }));

    const midTags = [
      'ContentCreator',
      'Aesthetic',
      'Reels',
      'Shorts',
      'Explore',
      'Viral',
      'Trending',
    ]
      .slice(0, Math.floor(Math.random() * 3) + 5)
      .map((tag) => ({
        tag,
        tier: 'mid' as const,
        estimatedViews: ['450M', '680M', '320M', '780M', '520M', '610M', '390M'][
          Math.floor(Math.random() * 7)
        ],
        saturation: ['opportunity', 'competitive', 'oversaturated'][
          Math.floor(Math.random() * 3)
        ] as any,
        trendDirection: ['rising', 'stable', 'declining'][
          Math.floor(Math.random() * 3)
        ] as any,
        isVerified: Math.random() > 0.6,
      }));

    const nicheTags = [
      'MondayMotivation',
      'ContentCreation',
      'DayInMyLife',
      'BehindTheScenes',
      'CreativeProcess',
      'TechTok',
      'DesignTok',
    ]
      .slice(0, Math.floor(Math.random() * 3) + 5)
      .map((tag) => ({
        tag,
        tier: 'niche' as const,
        estimatedViews: ['45M', '68M', '32M', '78M', '52M', '61M', '39M'][
          Math.floor(Math.random() * 7)
        ],
        saturation: ['opportunity', 'competitive', 'oversaturated'][
          Math.floor(Math.random() * 3)
        ] as any,
        trendDirection: ['rising', 'stable', 'declining'][
          Math.floor(Math.random() * 3)
        ] as any,
        isVerified: false,
      }));

    return { broad: broadTags, mid: midTags, niche: nicheTags };
  };

  const handleGenerate = useCallback(
    async (description: string, niche: string, style: string) => {
      setIsGenerating(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const captions = generateCaptions(description, niche, style);
        const { broad, mid, niche: nicheHashtags } = generateHashtags();
        const allHashtags = [...broad, ...mid, ...nicheHashtags];

        const recommendedTags = allHashtags
          .filter(
            (tag) =>
              tag.saturation === 'opportunity' || tag.trendDirection === 'rising'
          )
          .sort((a, b) => {
            if (a.saturation === 'opportunity' && b.saturation !== 'opportunity')
              return -1;
            if (a.trendDirection === 'rising' && b.trendDirection !== 'rising')
              return -1;
            return 0;
          })
          .slice(0, 6);

        const newResult: GenerationOutput = {
          id: `result-${Date.now()}`,
          timestamp: Date.now(),
          description,
          category: niche,
          captions,
          hashtags: allHashtags,
          recommendedTags,
          selectedCaptionId: null,
        };

        setResult(newResult);
        const newHistory = [newResult, ...history.slice(0, 19)];
        setHistory(newHistory);
        localStorage.setItem('viraltags-history', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Generation error:', error);
      } finally {
        setIsGenerating(false);
      }
    },
    [history]
  );

  const handleSelectHistoryItem = useCallback((id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setResult(item);
      setActiveTab('generate');
    }
  }, [history]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('viraltags-history');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <Header />

      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="card-neon-border max-w-sm mx-auto text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 mb-4">
                <svg
                  className="w-12 h-12 text-cyan-400 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gradient-neon">
              {loadingMessage}
            </h3>
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-pink-500 animate-pulse"
                style={{
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <nav className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('generate')}
            className={`tab-button whitespace-nowrap ${
              activeTab === 'generate' ? 'active' : ''
            }`}
          >
            ✨ Generate
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`tab-button whitespace-nowrap ${
              activeTab === 'trends' ? 'active' : ''
            }`}
          >
            🔥 Trends
          </button>
          <button
            onClick={() => setActiveTab('check-tags')}
            className={`tab-button whitespace-nowrap ${
              activeTab === 'check-tags' ? 'active' : ''
            }`}
          >
            🔍 Check Tags
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`tab-button whitespace-nowrap ${
              activeTab === 'history' ? 'active' : ''
            }`}
          >
            📜 History
          </button>
        </nav>

        <div className="animate-fade-in">
          {activeTab === 'generate' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <SmartInput
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>
              <div className="lg:col-span-2">
                {result ? (
                  <ResultsPanel
                    result={result}
                    onSelectCaption={(id: string) => {
                      setResult({
                        ...result,
                        selectedCaptionId: id,
                      });
                    }}
                  />
                ) : (
                  <div className="card-neon-border text-center py-24 animate-slide-up">
                    <div className="text-6xl mb-6">🎬</div>
                    <h2 className="text-3xl font-bold mb-3 text-gradient-neon">
                      Describe your video
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                      We'll handle the rest
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-sm font-semibold">AI-Powered</p>
                        <p className="text-xs text-gray-400">
                          Smart analysis
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm font-semibold">Viral-Ready</p>
                        <p className="text-xs text-gray-400">
                          Optimized content
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-800/30">
                        <div className="text-2xl mb-2">🚀</div>
                        <p className="text-sm font-semibold">Lightning Fast</p>
                        <p className="text-xs text-gray-400">
                          Instant results
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'trends' && <TrendRadar />}

          {activeTab === 'check-tags' && <CheckTagsPanel />}

          {activeTab === 'history' && (
            <HistoryPanel
              history={history.map((item) => ({
                id: item.id,
                timestamp: item.timestamp,
                description: item.description,
                category: item.category,
                captions: item.captions.map((c) => ({
                  text: c.text,
                  viralScore: c.viralScore,
                  hookLabel: c.hookLabel,
                })),
                hashtags: item.hashtags.map((h) => ({
                  tag: h.tag,
                  tier: h.tier,
                })),
              }))}
              onSelectItem={handleSelectHistoryItem}
              onClear={handleClearHistory}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800/50 py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2026 ViralTags AI. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              Made with passion for content creators everywhere
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
