// Content categories
export type ContentCategory = "comedy" | "education" | "fitness" | "beauty" | "food" | "tech" | "lifestyle" | "finance" | "gaming" | "pets" | "fashion" | "parenting" | "travel" | "diy" | "music";

// Caption hook frameworks
export type HookType = "curiosity" | "bold-claim" | "question" | "story" | "hot-take";

export interface Caption {
  id: string;
  hookType: HookType;
  hookLabel: string; // e.g. "Curiosity Gap"
  text: string; // The full caption (hook + body + CTA)
  characterCount: number;
  viralScore: number; // 1-10
  viralReasoning: string;
}

export type SaturationLevel = "opportunity" | "competitive" | "oversaturated";
export type TrendDirection = "rising" | "stable" | "declining";

export interface Hashtag {
  tag: string; // without #
  tier: "broad" | "mid" | "niche";
  estimatedViews: string; // e.g. "2.1B" or "450M"
  viewCountMin: number;
  viewCountMax: number;
  saturation: SaturationLevel;
  trendDirection: TrendDirection;
  isVerified: boolean; // true if from web search, false if AI estimated
}

export interface RecommendedSet {
  hashtags: Hashtag[];
  reasoning: string;
}

export interface GenerationResult {
  id: string;
  timestamp: number;
  input: GenerationInput;
  captions: Caption[];
  hashtags: {
    broad: Hashtag[];
    mid: Hashtag[];
    niche: Hashtag[];
  };
  recommendedSet: RecommendedSet;
  selectedCaptionId: string | null;
}

export interface GenerationInput {
  description: string;
  category?: ContentCategory;
  targetAudience?: string;
}

export interface TrendingTag {
  tag: string;
  views: string;
  growth: string; // e.g. "+340% this week"
  isEarlyTrend: boolean;
  category: string;
}

export interface TrendData {
  trendingTags: TrendingTag[];
  bestPostingTimes: string[];
  emergingTopics: string[];
  lastUpdated: number;
}

export interface SavedSet {
  id: string;
  name: string;
  captionText: string;
  hashtags: string[];
  isFavorite: boolean;
  performanceNotes?: string;
  views?: number;
  likes?: number;
  createdAt: number;
}

export interface CheckTagResult {
  tag: string;
  postCount: string;
  viewCount: string;
  saturation: SaturationLevel;
  trendDirection: TrendDirection;
  recommendation: string;
}
