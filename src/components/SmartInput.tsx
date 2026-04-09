'use client';

import { useState } from 'react';

interface SmartInputProps {
  onGenerate: (description: string, niche: string, style: string) => Promise<void>;
  isGenerating: boolean;
}

export default function SmartInput({
  onGenerate,
  isGenerating,
}: SmartInputProps) {
  const [description, setDescription] = useState('');
  const [niche, setNiche] = useState('general');
  const [style, setStyle] = useState('trendy');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      await onGenerate(description, niche, style);
    }
  };

  const suggestNiches = [
    'General',
    'Fashion',
    'Fitness',
    'Gaming',
    'Comedy',
    'Beauty',
    'Food',
    'Travel',
    'Education',
    'Music',
  ];

  const suggestStyles = [
    'Trendy',
    'Professional',
    'Casual',
    'Funny',
    'Inspirational',
    'Mysterious',
    'Energetic',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="card-neon-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Generate Content</h2>
            <p className="text-gray-400 text-sm">
              Describe your video and let AI create optimized captions & hashtags
            </p>
          </div>
          <div className="text-3xl">✨</div>
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            Video Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your TikTok video... What's it about? What's the vibe? Be specific!"
            className="textarea-neon"
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-500 mt-2">
            {description.length}/500 characters
          </p>
        </div>

        {/* Niche Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            Content Niche
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suggestNiches.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNiche(n.toLowerCase())}
                disabled={isGenerating}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  niche === n.toLowerCase()
                    ? 'bg-green-500 text-gray-950 glow-neon-green-intense'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-gray-300">
            Content Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suggestStyles.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s.toLowerCase())}
                disabled={isGenerating}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  style === s.toLowerCase()
                    ? 'bg-cyan-500 text-gray-950 glow-neon-cyan'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !description.trim()}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-smooth flex items-center justify-center gap-2 ${
            isGenerating || !description.trim()
              ? 'opacity-50 cursor-not-allowed'
              : 'btn-neon-primary'
          }`}
        >
          {isGenerating ? (
            <>
              <span className="inline-block animate-spin">⚡</span>
              Generating...
            </>
          ) : (
            <>
              <span>🚀</span>
              Generate Now
            </>
          )}
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-dark">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="font-semibold mb-1">AI-Powered</h3>
              <p className="text-xs text-gray-400">
                Advanced algorithms analyze trending content
              </p>
            </div>
          </div>
        </div>
        <div className="card-dark">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <h3 className="font-semibold mb-1">Lightning Fast</h3>
              <p className="text-xs text-gray-400">
                Get results in seconds, not minutes
              </p>
            </div>
          </div>
        </div>
        <div className="card-dark">
          <div className="flex items-start gap-3">
            <span className="text-xl">📈</span>
            <div>
              <h3 className="font-semibold mb-1">Boost Engagement</h3>
              <p className="text-xs text-gray-400">
                Optimized for maximum reach and virality
              </p>
            </div>
          </div>
        </div>
        <div className="card-dark">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔄</span>
            <div>
              <h3 className="font-semibold mb-1">Refresh Anytime</h3>
              <p className="text-xs text-gray-400">
                Generate unlimited variations instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
