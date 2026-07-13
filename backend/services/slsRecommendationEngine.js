/**
 * SLS Recommendation & Learning Action Engine — Core Service
 */

const RECOMMENDATION_CONFIG = Object.freeze({
  VERSION: "1.0",
  MAX_RECOMMENDATIONS: 5,
  WEIGHTS: Object.freeze({
    WEAKNESS: 0.7,
    EVIDENCE: Object.freeze({
      insufficient: 0,
      low: 5,
      medium: 12,
      high: 20
    }),
    TREND: Object.freeze({
      declining: 10,
      stable: 5,
      improving: 0,
      insufficient_history: 2
    })
  }),
  URGENCY_THRESHOLDS: Object.freeze({
    IMMEDIATE: 80,
    HIGH: 60,
    MEDIUM: 40
  }),
  ACTION_ORDER: Object.freeze([
    "REVISE_CHAPTER",
    "PRACTICE_TOPIC",
    "RETRY_CHAPTER_QUIZ",
    "PRACTICE_DIFFICULTY",
    "CONTINUE_LEARNING"
  ]),
  SPEED_SCALING_FACTOR: 20
});

// Urgency rank mapping for sorting
const URGENCY_RANK = {
  immediate: 4,
  high: 3,
  medium: 2,
  low: 1
};

// Evidence rank mapping for sorting
const EVIDENCE_RANK = {
  high: 4,
  medium: 3,
  low: 2,
  insufficient: 1
};

// Action type order rank for sorting
const ACTION_RANK = {
  REVISE_CHAPTER: 1,
  PRACTICE_TOPIC: 2,
  RETRY_CHAPTER_QUIZ: 3,
  PRACTICE_DIFFICULTY: 4,
  CONTINUE_LEARNING: 5
};

/**
 * Returns empty recommendation response contract
 */
function createEmptyRecommendations() {
  return {
    success: true,
    hasData: false,
    recommendations: [],
    summary: {
      totalRecommendations: 0,
      immediateCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      topActionType: null,
      topPriorityScore: 0
    },
    configVersion: RECOMMENDATION_CONFIG.VERSION
  };
}

/**
 * Helper to determine urgency string from priorityScore
 */
function getUrgency(score) {
  if (score >= RECOMMENDATION_CONFIG.URGENCY_THRESHOLDS.IMMEDIATE) return "immediate";
  if (score >= RECOMMENDATION_CONFIG.URGENCY_THRESHOLDS.HIGH) return "high";
  if (score >= RECOMMENDATION_CONFIG.URGENCY_THRESHOLDS.MEDIUM) return "medium";
  return "low";
}

/**
 * Validates catalog integrity.
 * Returns true if valid, throws error or returns false if invalid.
 */
function verifyCatalogIntegrity(catalog) {
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new Error("Learning catalog must be a non-null object dictionary");
  }
  const keys = Object.keys(catalog);
  if (keys.length === 0) {
    throw new Error("Learning catalog must contain at least one chapter record");
  }
  for (const id of keys) {
    const ch = catalog[id];
    if (!ch.chapterId || !ch.chapterTitle || !ch.subject || !Array.isArray(ch.topicIds)) {
      throw new Error(`Catalog entry for ${id} is malformed or missing key properties`);
    }
  }
  return true;
}

/**
 * Generates ranked recommendations based on analytics, weaknesses, and catalog content.
 */
function generateRecommendations(analyticsResponse, weaknessResponse, catalog) {
  // Validate inputs
  if (!analyticsResponse || !analyticsResponse.hasData || !weaknessResponse || !weaknessResponse.hasData) {
    return createEmptyRecommendations();
  }

  verifyCatalogIntegrity(catalog);

  const weakness = weaknessResponse.weaknessAnalysis;
  const candidates = [];

  // Helper to safely fetch catalog chapter info
  const getCatalogChapter = (chId) => {
    if (!chId) return null;
    const item = catalog[chId];
    if (!item) {
      console.warn(`Warning: Chapter ${chId} was not found in the learning catalog.`);
      return null;
    }
    return item;
  };

  // 1. Generate REVISE_CHAPTER candidates
  const weakChaptersList = Array.isArray(weakness.weakChapters) ? weakness.weakChapters : [];
  weakChaptersList.forEach(c => {
    if (c.evidenceLevel === "insufficient") return;
    if (c.severity === "critical" || c.severity === "high") {
      const cat = getCatalogChapter(c.chapterId);
      if (!cat) return; // Safely exclude invalid chapters

      const weaknessContrib = c.weaknessScore * RECOMMENDATION_CONFIG.WEIGHTS.WEAKNESS;
      const evidenceContrib = RECOMMENDATION_CONFIG.WEIGHTS.EVIDENCE[c.evidenceLevel] || 0;
      const trendContrib = RECOMMENDATION_CONFIG.WEIGHTS.TREND[c.trend] || 0;
      const priorityScore = Math.round(Math.max(0, Math.min(100, weaknessContrib + evidenceContrib + trendContrib)));

      const urgency = getUrgency(priorityScore);
      const id = `rec::REVISE_CHAPTER::${c.chapterId}::none::none`;

      candidates.push({
        id,
        actionType: "REVISE_CHAPTER",
        chapterId: c.chapterId,
        chapterTitle: cat.chapterTitle,
        subject: cat.subject,
        topicId: null,
        difficulty: null,
        priorityScore,
        urgency,
        reasonCodes: c.reasons,
        evidence: {
          accuracy: c.accuracy,
          speedRatio: c.averageTimeSeconds > 0 ? parseFloat((c.averageTimeSeconds / 90.0).toFixed(2)) : 0.0,
          weaknessScore: c.weaknessScore,
          severity: c.severity,
          evidenceLevel: c.evidenceLevel,
          attemptCount: c.attempts,
          questionCount: c.totalQuestions,
          trend: c.trend
        }
      });
    }
  });

  // 2. Generate PRACTICE_TOPIC candidates
  const weakTopicsList = Array.isArray(weakness.weakTopics) ? weakness.weakTopics : [];
  weakTopicsList.forEach(t => {
    if (t.evidenceLevel === "insufficient") return;
    if (t.severity === "critical" || t.severity === "high" || t.severity === "moderate") {
      const cat = getCatalogChapter(t.chapterId);
      if (!cat) return; // Exclude invalid chapters
      if (!cat.topicIds.includes(t.topicId)) {
        console.warn(`Warning: Topic ${t.topicId} was not found in catalog for chapter ${t.chapterId}.`);
        return; // Exclude invalid topics
      }

      const weaknessContrib = t.weaknessScore * RECOMMENDATION_CONFIG.WEIGHTS.WEAKNESS;
      const evidenceContrib = RECOMMENDATION_CONFIG.WEIGHTS.EVIDENCE[t.evidenceLevel] || 0;
      const priorityScore = Math.round(Math.max(0, Math.min(100, weaknessContrib + evidenceContrib)));

      const urgency = getUrgency(priorityScore);
      const id = `rec::PRACTICE_TOPIC::${t.chapterId}::${t.topicId}::none`;

      candidates.push({
        id,
        actionType: "PRACTICE_TOPIC",
        chapterId: t.chapterId,
        chapterTitle: cat.chapterTitle,
        subject: cat.subject,
        topicId: t.topicId,
        difficulty: null,
        priorityScore,
        urgency,
        reasonCodes: t.reasons,
        evidence: {
          accuracy: t.accuracy,
          speedRatio: t.speedRatio,
          weaknessScore: t.weaknessScore,
          severity: t.severity,
          evidenceLevel: t.evidenceLevel,
          attemptCount: null,
          questionCount: t.questionCount,
          trend: null
        }
      });
    }
  });

  // 3. Generate RETRY_CHAPTER_QUIZ candidates
  weakChaptersList.forEach(c => {
    if (c.evidenceLevel === "insufficient") return;
    if (c.severity === "mild") {
      const cat = getCatalogChapter(c.chapterId);
      if (!cat) return;

      const weaknessContrib = c.weaknessScore * RECOMMENDATION_CONFIG.WEIGHTS.WEAKNESS;
      const evidenceContrib = RECOMMENDATION_CONFIG.WEIGHTS.EVIDENCE[c.evidenceLevel] || 0;
      const trendContrib = RECOMMENDATION_CONFIG.WEIGHTS.TREND[c.trend] || 0;
      const priorityScore = Math.round(Math.max(0, Math.min(100, weaknessContrib + evidenceContrib + trendContrib)));

      const urgency = getUrgency(priorityScore);
      const id = `rec::RETRY_CHAPTER_QUIZ::${c.chapterId}::none::none`;

      candidates.push({
        id,
        actionType: "RETRY_CHAPTER_QUIZ",
        chapterId: c.chapterId,
        chapterTitle: cat.chapterTitle,
        subject: cat.subject,
        topicId: null,
        difficulty: null,
        priorityScore,
        urgency,
        reasonCodes: c.reasons,
        evidence: {
          accuracy: c.accuracy,
          speedRatio: c.averageTimeSeconds > 0 ? parseFloat((c.averageTimeSeconds / 90.0).toFixed(2)) : 0.0,
          weaknessScore: c.weaknessScore,
          severity: c.severity,
          evidenceLevel: c.evidenceLevel,
          attemptCount: c.attempts,
          questionCount: c.totalQuestions,
          trend: c.trend
        }
      });
    }
  });

  // 4. Generate PRACTICE_DIFFICULTY candidates
  const weakDifficultiesList = Array.isArray(weakness.weakDifficulties) ? weakness.weakDifficulties : [];
  weakDifficultiesList.forEach(d => {
    if (d.evidenceLevel === "insufficient") return;
    if (d.severity !== "none") {
      const weaknessContrib = d.weaknessScore * RECOMMENDATION_CONFIG.WEIGHTS.WEAKNESS;
      const evidenceContrib = RECOMMENDATION_CONFIG.WEIGHTS.EVIDENCE[d.evidenceLevel] || 0;
      const priorityScore = Math.round(Math.max(0, Math.min(100, weaknessContrib + evidenceContrib)));

      const urgency = getUrgency(priorityScore);
      const id = `rec::PRACTICE_DIFFICULTY::none::none::${d.difficulty}`;

      candidates.push({
        id,
        actionType: "PRACTICE_DIFFICULTY",
        chapterId: null,
        chapterTitle: null,
        subject: null,
        topicId: null,
        difficulty: d.difficulty,
        priorityScore,
        urgency,
        reasonCodes: d.reasons,
        evidence: {
          accuracy: d.accuracy,
          speedRatio: d.speedRatio,
          weaknessScore: d.weaknessScore,
          severity: d.severity,
          evidenceLevel: d.evidenceLevel,
          attemptCount: null,
          questionCount: d.questionCount,
          trend: null
        }
      });
    }
  });

  // 5. Deduplication Policy
  // If a chapter X has a REVISE_CHAPTER action:
  // - suppress RETRY_CHAPTER_QUIZ for X
  // - suppress PRACTICE_TOPIC for X only if topic severity is "moderate" (keep critical or high)
  const chaptersWithRevise = new Set(
    candidates.filter(c => c.actionType === "REVISE_CHAPTER").map(c => c.chapterId)
  );

  const filteredCandidates = candidates.filter(cand => {
    if (cand.actionType === "RETRY_CHAPTER_QUIZ") {
      return !chaptersWithRevise.has(cand.chapterId);
    }
    if (cand.actionType === "PRACTICE_TOPIC") {
      if (chaptersWithRevise.has(cand.chapterId)) {
        // Suppress moderate topic weakness if the chapter is critically/highly weak
        return cand.evidence.severity === "critical" || cand.evidence.severity === "high";
      }
    }
    return true;
  });

  // Ensure unique recommendation IDs
  const seenIds = new Set();
  const uniqueCandidates = [];
  filteredCandidates.forEach(cand => {
    if (!seenIds.has(cand.id)) {
      seenIds.add(cand.id);
      uniqueCandidates.push(cand);
    }
  });

  // 6. No weaknesses Fallback (CONTINUE_LEARNING)
  if (uniqueCandidates.length === 0) {
    const isTopicInsufficient = (weakness.insufficientEvidence?.topics?.length || 0) > 0;
    const isChapterInsufficient = (weakness.insufficientEvidence?.chapters?.length || 0) > 0;
    const isDiffInsufficient = (weakness.insufficientEvidence?.difficulties?.length || 0) > 0;

    const hasInsufficient = isTopicInsufficient || isChapterInsufficient || isDiffInsufficient;

    const id = "rec::CONTINUE_LEARNING::none::none::none";
    uniqueCandidates.push({
      id,
      actionType: "CONTINUE_LEARNING",
      chapterId: null,
      chapterTitle: null,
      subject: null,
      topicId: null,
      difficulty: null,
      priorityScore: 20,
      urgency: "low",
      reasonCodes: hasInsufficient ? ["NEED_MORE_EVIDENCE"] : ["NO_CONFIRMED_WEAKNESS"],
      evidence: null
    });
  }

  // 7. Deterministic Sorting
  // Priority: 1) priorityScore DESC, 2) urgency rank DESC, 3) evidence rank DESC,
  // 4) action order rank ASC, 5) chapterId ASC, 6) topicId ASC, 7) difficulty ASC
  const sortedCandidates = [...uniqueCandidates].sort((a, b) => {
    const diffScore = b.priorityScore - a.priorityScore;
    if (diffScore !== 0) return diffScore;

    const urgDiff = (URGENCY_RANK[b.urgency] || 0) - (URGENCY_RANK[a.urgency] || 0);
    if (urgDiff !== 0) return urgDiff;

    const evDiff = (EVIDENCE_RANK[b.evidence?.evidenceLevel || "insufficient"] || 0) - 
                   (EVIDENCE_RANK[a.evidence?.evidenceLevel || "insufficient"] || 0);
    if (evDiff !== 0) return evDiff;

    const actDiff = (ACTION_RANK[a.actionType] || 99) - (ACTION_RANK[b.actionType] || 99);
    if (actDiff !== 0) return actDiff;

    const chA = String(a.chapterId || "");
    const chB = String(b.chapterId || "");
    const chDiff = chA.localeCompare(chB);
    if (chDiff !== 0) return chDiff;

    const topA = String(a.topicId || "");
    const topB = String(b.topicId || "");
    const topDiff = topA.localeCompare(topB);
    if (topDiff !== 0) return topDiff;

    const diffA = String(a.difficulty || "");
    const diffB = String(b.difficulty || "");
    return diffA.localeCompare(diffB);
  });

  // 8. Max count limit
  const recommendations = sortedCandidates.slice(0, RECOMMENDATION_CONFIG.MAX_RECOMMENDATIONS);

  // 9. Compute Summary
  let immediateCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  let topScore = 0;
  let topAction = null;

  recommendations.forEach(r => {
    if (r.urgency === "immediate") immediateCount++;
    if (r.urgency === "high") highCount++;
    if (r.urgency === "medium") mediumCount++;
    if (r.urgency === "low") lowCount++;
    
    if (r.priorityScore > topScore) {
      topScore = r.priorityScore;
      topAction = r.actionType;
    }
  });

  const summary = {
    totalRecommendations: recommendations.length,
    immediateCount,
    highCount,
    mediumCount,
    lowCount,
    topActionType: topAction,
    topPriorityScore: topScore
  };

  return {
    success: true,
    hasData: true,
    recommendations,
    summary,
    configVersion: RECOMMENDATION_CONFIG.VERSION
  };
}

module.exports = {
  RECOMMENDATION_CONFIG,
  createEmptyRecommendations,
  verifyCatalogIntegrity,
  generateRecommendations
};
