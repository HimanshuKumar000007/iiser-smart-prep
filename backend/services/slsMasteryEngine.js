/**
 * SLS Mastery State Engine — Core Service
 */

const MASTERY_CONFIG = Object.freeze({
  VERSION: "1.0",
  CONSISTENCY_PENALTY_FACTOR: 0.5,
  WEIGHTS: Object.freeze({
    ACCURACY: 0.5,       // Max 50
    CONSISTENCY: 20,     // Max 20
    IMPROVEMENT: 15,     // Max 15
    EVIDENCE: Object.freeze({
      attempts_0: 0,
      attempts_1: 4,
      attempts_2: 9,
      attempts_3_plus: 15
    })
  }),
  THRESHOLDS: Object.freeze({
    WEAK: Object.freeze(["critical", "high", "moderate"]),
    IMPROVING: Object.freeze({
      minAttempts: 2,
      minImprovement: 10,
      minLatestAccuracy: 70
    }),
    STRONG: Object.freeze({
      minAttempts: 2,
      minLatestAccuracy: 85,
      minBestAccuracy: 85,
      blockingChapterSeverities: Object.freeze(["critical", "high"])
    }),
    MASTERED: Object.freeze({
      minAttempts: 3,
      minLatestAccuracy: 90,
      minBestAccuracy: 90,
      minWeightedAccuracy: 85,
      blockingChapterSeverities: Object.freeze(["critical", "high", "moderate"]),
      blockingTopicSeverities: Object.freeze(["critical", "high"])
    })
  })
});

/**
 * Calculates standard deviation for consistency score
 */
function calculateStdDev(accuracies) {
  if (!accuracies || accuracies.length <= 1) return 0.0;
  const mean = accuracies.reduce((sum, val) => sum + val, 0) / accuracies.length;
  const variance = accuracies.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / accuracies.length;
  return Math.sqrt(variance);
}

/**
 * Pure function to evaluate mastery state and score for a single chapter
 */
function evaluateChapterMastery(chapterId, catEntry, chAna, parentAttempts, weaknessAnalysis) {
  // 1. Check if unattempted (NEW)
  if (!chAna || chAna.attempts === 0) {
    return {
      chapterId,
      chapterTitle: catEntry.chapterTitle,
      subject: catEntry.subject,
      state: "NEW",
      masteryScore: 0,
      attemptCount: 0,
      weightedAccuracy: 0.0,
      firstAttemptAccuracy: 0.0,
      latestAttemptAccuracy: 0.0,
      bestAttemptAccuracy: 0.0,
      improvementPercentagePoints: 0.0,
      trend: "insufficient_history",
      evidenceLevel: "insufficient",
      blockingWeaknesses: [],
      reasonCodes: ["NO_ATTEMPTS"]
    };
  }

  const attempts = chAna.attempts;
  const weightedAccuracy = chAna.accuracy;
  const firstAttemptAccuracy = chAna.firstAttemptAccuracy;
  const latestAttemptAccuracy = chAna.latestAttemptAccuracy;
  const bestAttemptAccuracy = chAna.bestAttemptAccuracy;
  const improvementPercentagePoints = chAna.improvementPercentagePoints;
  const lastAttemptedAt = chAna.lastAttemptedAt;

  // Derive trend from analytics if present, fallback to config standard
  const trend = chAna.attempts >= 2 
    ? (improvementPercentagePoints >= 5 ? "improving" : (improvementPercentagePoints <= -5 ? "declining" : "stable"))
    : "insufficient_history";

  // Derive evidence level
  const evidenceLevel = attempts >= 3 ? "high" : (attempts === 2 ? "medium" : "low");

  // Fetch chapter weakness from weakness engine response
  const weakChapters = weaknessAnalysis?.weakChapters || weaknessAnalysis?.weaknessAnalysis?.weakChapters || [];
  const chWeak = weakChapters.find(w => w.chapterId === chapterId) || {
    severity: "none",
    reasons: []
  };

  // Check for blocking topic weaknesses
  const weakTopics = weaknessAnalysis?.weakTopics || weaknessAnalysis?.weaknessAnalysis?.weakTopics || [];
  const chTopicsWeak = weakTopics.filter(w => w.chapterId === chapterId);
  const blockingTopics = chTopicsWeak.filter(w => 
    MASTERY_CONFIG.THRESHOLDS.MASTERED.blockingTopicSeverities.includes(w.severity)
  ).map(w => ({ topicId: w.topicId, severity: w.severity }));

  // Filter raw attempts for consistency calculation
  const chAttempts = parentAttempts.filter(a => a.chapter_id === chapterId);
  const accuracies = chAttempts.map(a => {
    const tot = a.total_questions || 0;
    return tot > 0 ? ((a.correct_answers || 0) / tot) * 100 : 0.0;
  });

  // Calculate masteryScore components
  // 1. Accuracy Component (max 50)
  const accuracyContrib = weightedAccuracy * MASTERY_CONFIG.WEIGHTS.ACCURACY;

  // 2. Consistency Component (max 20)
  const stdDev = calculateStdDev(accuracies);
  const consistencyContrib = Math.max(0, 20 - stdDev * MASTERY_CONFIG.CONSISTENCY_PENALTY_FACTOR);

  // 3. Improvement Component (max 15)
  const improvementContrib = Math.max(0, Math.min(15, improvementPercentagePoints));

  // 4. Evidence Component (max 15)
  let evidenceContrib = 0;
  if (attempts === 1) evidenceContrib = MASTERY_CONFIG.WEIGHTS.EVIDENCE.attempts_1;
  else if (attempts === 2) evidenceContrib = MASTERY_CONFIG.WEIGHTS.EVIDENCE.attempts_2;
  else if (attempts >= 3) evidenceContrib = MASTERY_CONFIG.WEIGHTS.EVIDENCE.attempts_3_plus;

  const rawMasteryScore = accuracyContrib + consistencyContrib + improvementContrib + evidenceContrib;
  const masteryScore = Math.round(Math.max(0, Math.min(100, rawMasteryScore)));

  // Mastery State Precedence Logic
  // 1. WEAK
  const isWeak = MASTERY_CONFIG.THRESHOLDS.WEAK.includes(chWeak.severity) && evidenceLevel !== "insufficient";
  if (isWeak) {
    return {
      chapterId,
      chapterTitle: catEntry.chapterTitle,
      subject: catEntry.subject,
      state: "WEAK",
      masteryScore,
      attemptCount: attempts,
      weightedAccuracy,
      firstAttemptAccuracy,
      latestAttemptAccuracy,
      bestAttemptAccuracy,
      improvementPercentagePoints,
      trend,
      evidenceLevel,
      blockingWeaknesses: blockingTopics,
      reasonCodes: ["CONFIRMED_CHAPTER_WEAKNESS"]
    };
  }

  // 2. MASTERED
  const meetsMastered = 
    attempts >= MASTERY_CONFIG.THRESHOLDS.MASTERED.minAttempts &&
    latestAttemptAccuracy >= MASTERY_CONFIG.THRESHOLDS.MASTERED.minLatestAccuracy &&
    bestAttemptAccuracy >= MASTERY_CONFIG.THRESHOLDS.MASTERED.minBestAccuracy &&
    weightedAccuracy >= MASTERY_CONFIG.THRESHOLDS.MASTERED.minWeightedAccuracy &&
    !MASTERY_CONFIG.THRESHOLDS.MASTERED.blockingChapterSeverities.includes(chWeak.severity) &&
    blockingTopics.length === 0 &&
    trend !== "declining";

  if (meetsMastered) {
    return {
      chapterId,
      chapterTitle: catEntry.chapterTitle,
      subject: catEntry.subject,
      state: "MASTERED",
      masteryScore,
      attemptCount: attempts,
      weightedAccuracy,
      firstAttemptAccuracy,
      latestAttemptAccuracy,
      bestAttemptAccuracy,
      improvementPercentagePoints,
      trend,
      evidenceLevel,
      blockingWeaknesses: [],
      reasonCodes: ["REPEATED_MASTERY_EVIDENCE"]
    };
  }

  // 3. IMPROVING
  const meetsImproving = 
    attempts >= MASTERY_CONFIG.THRESHOLDS.IMPROVING.minAttempts &&
    improvementPercentagePoints >= MASTERY_CONFIG.THRESHOLDS.IMPROVING.minImprovement &&
    latestAttemptAccuracy >= MASTERY_CONFIG.THRESHOLDS.IMPROVING.minLatestAccuracy &&
    latestAttemptAccuracy > firstAttemptAccuracy;

  if (meetsImproving) {
    return {
      chapterId,
      chapterTitle: catEntry.chapterTitle,
      subject: catEntry.subject,
      state: "IMPROVING",
      masteryScore,
      attemptCount: attempts,
      weightedAccuracy,
      firstAttemptAccuracy,
      latestAttemptAccuracy,
      bestAttemptAccuracy,
      improvementPercentagePoints,
      trend,
      evidenceLevel,
      blockingWeaknesses: blockingTopics,
      reasonCodes: ["SIGNIFICANT_IMPROVEMENT"]
    };
  }

  // 4. STRONG
  const meetsStrong = 
    attempts >= MASTERY_CONFIG.THRESHOLDS.STRONG.minAttempts &&
    latestAttemptAccuracy >= MASTERY_CONFIG.THRESHOLDS.STRONG.minLatestAccuracy &&
    bestAttemptAccuracy >= MASTERY_CONFIG.THRESHOLDS.STRONG.minBestAccuracy &&
    !MASTERY_CONFIG.THRESHOLDS.STRONG.blockingChapterSeverities.includes(chWeak.severity);

  if (meetsStrong) {
    return {
      chapterId,
      chapterTitle: catEntry.chapterTitle,
      subject: catEntry.subject,
      state: "STRONG",
      masteryScore,
      attemptCount: attempts,
      weightedAccuracy,
      firstAttemptAccuracy,
      latestAttemptAccuracy,
      bestAttemptAccuracy,
      improvementPercentagePoints,
      trend,
      evidenceLevel,
      blockingWeaknesses: blockingTopics,
      reasonCodes: ["CONSISTENT_STRONG_PERFORMANCE"]
    };
  }

  // 5. LEARNING (fallback)
  const reasonCodes = [];
  if (trend === "declining") {
    reasonCodes.push("DECLINING_PERFORMANCE");
  } else if (blockingTopics.length > 0) {
    reasonCodes.push("BLOCKING_TOPIC_WEAKNESS");
  } else {
    reasonCodes.push("INSUFFICIENT_MASTERY_EVIDENCE");
  }

  return {
    chapterId,
    chapterTitle: catEntry.chapterTitle,
    subject: catEntry.subject,
    state: "LEARNING",
    masteryScore,
    attemptCount: attempts,
    weightedAccuracy,
    firstAttemptAccuracy,
    latestAttemptAccuracy,
    bestAttemptAccuracy,
    improvementPercentagePoints,
    trend,
    evidenceLevel,
    blockingWeaknesses: blockingTopics,
    reasonCodes
  };
}

/**
 * Pure function to generate mastery states for all chapters in the catalog
 */
function generateMasteryStates(analyticsResponse, weaknessResponse, parentAttempts, catalog) {
  if (!catalog || typeof catalog !== "object") {
    return {
      success: true,
      hasData: false,
      mastery: [],
      summary: { totalChapters: 0, newCount: 0, learningCount: 0, weakCount: 0, improvingCount: 0, strongCount: 0, masteredCount: 0, averageMasteryScore: 0 },
      configVersion: MASTERY_CONFIG.VERSION
    };
  }

  const catalogKeys = Object.keys(catalog);
  const rawParent = Array.isArray(parentAttempts) ? parentAttempts : [];
  const hasData = rawParent.length > 0;

  const chAnalyticsList = analyticsResponse?.analytics?.chapters || [];

  console.log("DEBUG generateMasteryStates - weaknessResponse:", JSON.stringify(weaknessResponse, null, 2));
  const masteryList = catalogKeys.map(chId => {
    const catEntry = catalog[chId];
    const chAna = chAnalyticsList.find(a => a.chapterId === chId);
    return evaluateChapterMastery(chId, catEntry, chAna, rawParent, weaknessResponse);
  });

  // Calculate summary counts
  let newCount = 0;
  let learningCount = 0;
  let weakCount = 0;
  let improvingCount = 0;
  let strongCount = 0;
  let masteredCount = 0;
  let totalScoreSum = 0;

  masteryList.forEach(m => {
    if (m.state === "NEW") newCount++;
    else if (m.state === "LEARNING") learningCount++;
    else if (m.state === "WEAK") weakCount++;
    else if (m.state === "IMPROVING") improvingCount++;
    else if (m.state === "STRONG") strongCount++;
    else if (m.state === "MASTERED") masteredCount++;
    totalScoreSum += m.masteryScore;
  });

  const averageMasteryScore = catalogKeys.length > 0 ? parseFloat((totalScoreSum / catalogKeys.length).toFixed(2)) : 0.0;

  return {
    success: true,
    hasData,
    mastery: masteryList,
    summary: {
      totalChapters: catalogKeys.length,
      newCount,
      learningCount,
      weakCount,
      improvingCount,
      strongCount,
      masteredCount,
      averageMasteryScore
    },
    configVersion: MASTERY_CONFIG.VERSION
  };
}

module.exports = {
  MASTERY_CONFIG,
  evaluateChapterMastery,
  generateMasteryStates
};
