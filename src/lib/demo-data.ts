import {
  GenerationResult,
  GenerationInput,
  Caption,
  Hashtag,
  RecommendedSet,
  TrendData,
  TrendingTag,
  CheckTagResult,
  SaturationLevel,
  TrendDirection,
  HookType,
} from "@/types";

/**
 * Generate a UUID v4-like string for demo purposes
 */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Simulate an async delay
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a realistic viral score between 6-9
 */
function generateViralScore(): number {
  return Math.floor(Math.random() * 4) + 6; // 6-9
}

/**
 * Get random saturation level
 */
function getRandomSaturation(): SaturationLevel {
  const levels: SaturationLevel[] = ["low", "medium", "high", "very_high"];
  return levels[Math.floor(Math.random() * levels.length)];
}

/**
 * Get random trend direction
 */
function getRandomTrendDirection(): TrendDirection {
  const directions: TrendDirection[] = ["rising", "stable", "declining"];
  return directions[Math.floor(Math.random() * directions.length)];
}

/**
 * Generate hook frameworks based on input
 */
function generateHookFrameworks(
  description: string,
  category: string
): { framework: HookType; caption: string; score: number }[] {
  // Extract keywords from description for more relevant captions
  const keywords = description.split(" ").slice(0, 3).join(" ");

  return [
    {
      framework: "curiosity_gap",
      caption: `POV: You didn't know ${keywords} could do THIS... 🤯 Wait until you see the ending`,
      score: generateViralScore(),
    },
    {
      framework: "bold_claim",
      caption: `I'm convinced ${keywords} is the most underrated trend in ${category} right now`,
      score: generateViralScore(),
    },
    {
      framework: "question",
      caption: `So nobody's going to talk about how ${keywords} literally changed everything? 🧵`,
      score: generateViralScore(),
    },
    {
      framework: "story_journey",
      caption: `Started from the bottom with ${keywords}, now we're here 📈 Here's what I learned...`,
      score: generateViralScore(),
    },
    {
      framework: "hot_take",
      caption: `Hot take: If you're not doing ${keywords} in ${category}, you're already behind`,
      score: generateViralScore(),
    },
  ];
}

/**
 * Generate hashtags with varied saturation levels
 */
function generateHashtags(): Hashtag[] {
  // Broad hashtags (1B+ views)
  const broadTags: Hashtag[] = [
    {
      tag: "#FYP",
      postCount: 45000000000,
      viewCount: 1200000000000,
      saturation: "very_high",
      trendDirection: "stable",
      isVerified: false,
    },
    {
      tag: "#ForYouPage",
      postCount: 32000000000,
      viewCount: 890000000000,
      saturation: "very_high",
      trendDirection: "stable",
      isVerified: false,
    },
    {
      tag: "#Viral",
      postCount: 28000000000,
      viewCount: 750000000000,
      saturation: "very_high",
      trendDirection: "stable",
      isVerified: false,
    },
  ];

  // Mid-tier hashtags (100M-1B)
  const midTierTags: Hashtag[] = [
    {
      tag: "#Trending",
      postCount: 450000000,
      viewCount: 580000000,
      saturation: "high",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#ContentCreator",
      postCount: 380000000,
      viewCount: 520000000,
      saturation: "high",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#MustWatch",
      postCount: 320000000,
      viewCount: 450000000,
      saturation: "high",
      trendDirection: "stable",
      isVerified: false,
    },
    {
      tag: "#CommunityOnTheRise",
      postCount: 280000000,
      viewCount: 390000000,
      saturation: "medium",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#SmallCreators",
      postCount: 265000000,
      viewCount: 360000000,
      saturation: "medium",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#CreatorFundRobinhood",
      postCount: 245000000,
      viewCount: 330000000,
      saturation: "medium",
      trendDirection: "declining",
      isVerified: false,
    },
    {
      tag: "#ViralTok",
      postCount: 210000000,
      viewCount: 295000000,
      saturation: "medium",
      trendDirection: "rising",
      isVerified: false,
    },
  ];

  // Niche hashtags (under 100M)
  const nicheTags: Hashtag[] = [
    {
      tag: "#NicheVibes",
      postCount: 85000000,
      viewCount: 120000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#MicroCommunity",
      postCount: 72000000,
      viewCount: 95000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#AuthenticCreators",
      postCount: 65000000,
      viewCount: 85000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#GrowWithIntent",
      postCount: 52000000,
      viewCount: 68000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#SmallButMighty",
      postCount: 48000000,
      viewCount: 62000000,
      saturation: "low",
      trendDirection: "stable",
      isVerified: false,
    },
    {
      tag: "#CreatorRealTalk",
      postCount: 41000000,
      viewCount: 54000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
    {
      tag: "#EngagedAudience",
      postCount: 36000000,
      viewCount: 48000000,
      saturation: "low",
      trendDirection: "rising",
      isVerified: false,
    },
  ];

  return [...broadTags, ...midTierTags, ...nicheTags];
}

/**
 * Main function to generate demo generation result
 */
export async function generateDemoResult(
  input: GenerationInput
): Promise<GenerationResult> {
  // Simulate 2-3 second delay
  await simulateDelay(2000 + Math.random() * 1000);

  // Generate captions with relevant hooks
  const hooks = generateHookFrameworks(input.description, input.category);
  const captions: Caption[] = hooks.map((hook) => ({
    text: hook.caption,
    hookType: hook.framework,
    characterCount: hook.caption.length,
    viralScore: hook.score,
  }));

  // Generate hashtags
  const allHashtags = generateHashtags();

  // Build recommended set (best performing hashtags)
  const recommendedSet: RecommendedSet = {
    hashtags: allHashtags.slice(0, 5),
    captions: captions.slice(0, 3),
    estimatedReach: Math.floor(Math.random() * 500000) + 250000,
  };

  return {
    id: generateUUID(),
    captions,
    hashtags: allHashtags,
    recommendedSet,
    generatedAt: new Date().toISOString(),
    inputCategory: input.category,
    inputDescription: input.description,
  };
}

/**
 * Get demo trend data for a category
 */
export async function getDemoTrendData(category?: string): Promise<TrendData> {
  await simulateDelay(1500 + Math.random() * 500);

  // Generate trending tags
  const trendingTags: TrendingTag[] = [
    {
      tag: "#DayInMyLife",
      postCount: 892000000,
      viewCount: 1280000000,
      growthPercent: 127,
      isEarlyTrend: false,
    },
    {
      tag: "#BehindTheScenes",
      postCount: 756000000,
      viewCount: 1050000000,
      growthPercent: 89,
      isEarlyTrend: false,
    },
    {
      tag: "#Unboxing",
      postCount: 654000000,
      viewCount: 920000000,
      growthPercent: 156,
      isEarlyTrend: true,
    },
    {
      tag: "#ReactionVideo",
      postCount: 512000000,
      viewCount: 780000000,
      growthPercent: 203,
      isEarlyTrend: true,
    },
    {
      tag: "#GRWM",
      postCount: 489000000,
      viewCount: 710000000,
      growthPercent: 67,
      isEarlyTrend: false,
    },
    {
      tag: "#ArtisanCraft",
      postCount: 324000000,
      viewCount: 520000000,
      growthPercent: 245,
      isEarlyTrend: true,
    },
    {
      tag: "#MondayMotivation",
      postCount: 478000000,
      viewCount: 650000000,
      growthPercent: 45,
      isEarlyTrend: false,
    },
    {
      tag: "#TutorialTuesday",
      postCount: 412000000,
      viewCount: 580000000,
      growthPercent: 78,
      isEarlyTrend: false,
    },
    {
      tag: "#QuickTips",
      postCount: 345000000,
      viewCount: 495000000,
      growthPercent: 91,
      isEarlyTrend: false,
    },
    {
      tag: "#InspireMeChannel",
      postCount: 267000000,
      viewCount: 405000000,
      growthPercent: 134,
      isEarlyTrend: false,
    },
    {
      tag: "#CareerGlow",
      postCount: 198000000,
      viewCount: 320000000,
      growthPercent: 312,
      isEarlyTrend: true,
    },
    {
      tag: "#PassionProject",
      postCount: 156000000,
      viewCount: 245000000,
      growthPercent: 187,
      isEarlyTrend: false,
    },
  ];

  // Best posting times
  const bestPostingTimes = [
    "6:00 AM - 9:00 AM (Morning Commute)",
    "12:00 PM - 2:00 PM (Lunch Break)",
    "7:00 PM - 11:00 PM (Evening Wind Down)",
    "10:00 PM - 12:00 AM (Late Night Scroll)",
  ];

  // Emerging topics
  const emergingTopics = [
    "Sustainable Living",
    "Remote Work Culture",
    "AI & Automation",
    "Mental Health Awareness",
    "Side Hustle Stories",
  ];

  return {
    category: category || "General",
    trendingTags,
    bestPostingTimes,
    emergingTopics,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Check demo tags and return realistic analysis
 */
export async function checkDemoTags(
  tags: string[]
): Promise<CheckTagResult[]> {
  await simulateDelay(1000 + Math.random() * 800);

  return tags.map((tag) => {
    const cleanTag = tag.startsWith("#") ? tag : `#${tag}`;
    const postCount = Math.floor(Math.random() * 800000000) + 50000000;
    const viewCount = postCount * (Math.random() * 1.5 + 0.8);
    const saturation = getRandomSaturation();
    const trendDirection = getRandomTrendDirection();

    // Generate contextual recommendations
    let recommendation = "";
    if (saturation === "very_high" && trendDirection === "declining") {
      recommendation =
        "This tag is oversaturated and losing momentum. Consider pairing with more niche tags.";
    } else if (saturation === "low" && trendDirection === "rising") {
      recommendation =
        "Excellent pick! This niche tag is growing and less saturated. High discoverability potential.";
    } else if (saturation === "medium" && trendDirection === "rising") {
      recommendation =
        "Good choice. This tag has strong growth potential with moderate competition.";
    } else if (saturation === "high" && trendDirection === "stable") {
      recommendation =
        "Popular tag with steady performance. Works well as part of a mixed hashtag strategy.";
    } else {
      recommendation =
        "This tag has moderate performance. Best used alongside higher-trending tags.";
    }

    return {
      tag: cleanTag,
      postCount,
      viewCount,
      saturation,
      trendDirection,
      recommendation,
    };
  });
}
