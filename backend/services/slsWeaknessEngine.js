/**
 * SLS Weakness Detection & Evidence Engine — Core Service
 */

const learningCatalog = require("../data/learningCatalog.json");

function getChapterTitle(chapterId) {
  if (!chapterId) return "";
  return learningCatalog[chapterId]?.chapterTitle || chapterId
    .replace(/^phy_|^ch_|^math_|^bio_/, "")
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getTopicTitle(topicId) {
  if (!topicId) return "";
  return topicId
    .split("-")
    .map(word => {
      const lower = word.toLowerCase();
      if (lower === "si") return "SI";
      if (lower === "pyq") return "PYQ";
      if (lower === "pyqs") return "PYQs";
      if (lower === "1d") return "1D";
      if (lower === "2d") return "2D";
      if (lower === "3d") return "3D";
      if (lower === "ke") return "KE";
      if (lower === "vs") return "vs";
      if (lower === "of") return "of";
      if (lower === "and") return "and";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const WEAKNESS_CONFIG = Object.freeze({
  VERSION: "1.0",
  TOPIC_EVIDENCE: Object.freeze({
    INSUFFICIENT: 2,
    LOW: 5,
    MEDIUM: 11
  }),
  CHAPTER_EVIDENCE: Object.freeze({
    LOW_ATTEMPTS: 1,
    MEDIUM_ATTEMPTS: 2
  }),
  ACCURACY_THRESHOLDS: Object.freeze({
    CRITICAL: 40.0,
    HIGH: 60.0,
    MODERATE: 75.0,
    MILD: 85.0
  }),
  SPEED_THRESHOLDS: Object.freeze({
    NONE: 1.2,
    MILD: 1.5,
    MODERATE: 2.0
  }),
  WEIGHTS: Object.freeze({
    ACCURACY: 80,
    SPEED: 20
  }),
  TREND_THRESHOLDS: Object.freeze({
    IMPROVING: 5.0,
    DECLINING: -5.0
  }),
  SPEED_SCALING_FACTOR: 20
});

// --- Normalization & Math Helpers ---
function safeFloat(val, def = 0.0) {
  const num = Number(val);
  return Number.isFinite(num) ? parseFloat(num.toFixed(2)) : def;
}

function nonNegativeInt(val, def = 0) {
  const num = parseInt(val, 10);
  return Number.isInteger(num) && num >= 0 ? num : def;
}

/**
 * Returns empty weakness response contract structure
 */
function createEmptyWeaknessAnalysis() {
  return {
    success: true,
    hasData: false,
    weaknessAnalysis: {
      summary: {
        totalWeakTopics: 0,
        totalWeakChapters: 0,
        totalWeakDifficulties: 0,
        criticalWeaknessCount: 0,
        highWeaknessCount: 0,
        moderateWeaknessCount: 0,
        mildWeaknessCount: 0,
        insufficientEvidenceCount: 0,
        strongestWeaknessScore: 0.0
      },
      weakTopics: [],
      weakChapters: [],
      weakDifficulties: [],
      insufficientEvidence: {
        topics: [],
        chapters: [],
        difficulties: []
      },
      configVersion: WEAKNESS_CONFIG.VERSION
    }
  };
}

/**
 * Helper: computes normalized weaknessScore in [0, 100] range
 */
function computeWeaknessScore(accuracy, speedRatio) {
  const normAcc = safeFloat(accuracy);
  const normSpeed = safeFloat(speedRatio);

  const accComponent = Math.max(0, Math.min(80, (100 - normAcc) * 0.8));
  const speedComponent = normSpeed > 1.0 
    ? Math.min(20, Math.max(0, (normSpeed - 1.0) * WEAKNESS_CONFIG.SPEED_SCALING_FACTOR)) 
    : 0.0;

  return safeFloat(accComponent + speedComponent);
}

/**
 * Helper: Classifies accuracy severity code
 */
function getAccuracySeverity(accuracy) {
  const acc = safeFloat(accuracy);
  if (acc < WEAKNESS_CONFIG.ACCURACY_THRESHOLDS.CRITICAL) return "critical";
  if (acc < WEAKNESS_CONFIG.ACCURACY_THRESHOLDS.HIGH) return "high";
  if (acc < WEAKNESS_CONFIG.ACCURACY_THRESHOLDS.MODERATE) return "moderate";
  if (acc < WEAKNESS_CONFIG.ACCURACY_THRESHOLDS.MILD) return "mild";
  return "none";
}

/**
 * Helper: Classifies speed ratio severity code
 */
function getSpeedSeverity(speedRatio) {
  const speed = safeFloat(speedRatio);
  if (speed <= WEAKNESS_CONFIG.SPEED_THRESHOLDS.NONE) return "none";
  if (speed <= WEAKNESS_CONFIG.SPEED_THRESHOLDS.MILD) return "mild";
  if (speed <= WEAKNESS_CONFIG.SPEED_THRESHOLDS.MODERATE) return "moderate";
  return "high";
}

/**
 * Helper: Generates list of reason codes
 */
function determineReasons(accuracy, speedRatio, isInsufficient) {
  if (isInsufficient) {
    return ["INSUFFICIENT_EVIDENCE"];
  }

  const reasons = [];
  const acc = safeFloat(accuracy);
  const speed = safeFloat(speedRatio);

  if (acc < 60) {
    reasons.push("VERY_LOW_ACCURACY");
  } else if (acc < 85) {
    reasons.push("LOW_ACCURACY");
  }

  if (speed > 1.2) {
    reasons.push("SLOW_SOLVING");
  }

  if (acc < 85 && speed > 1.2) {
    reasons.push("LOW_ACCURACY_AND_SLOW");
  }

  if (speed < 0.8 && acc < 60) {
    reasons.push("FAST_BUT_INACCURATE");
  }

  if (reasons.length === 0) {
    reasons.push("NONE");
  }

  return reasons;
}

/**
 * Helper: Maps topic questions count to evidence level code
 */
function getTopicEvidenceLevel(questionCount) {
  const count = nonNegativeInt(questionCount);
  if (count <= WEAKNESS_CONFIG.TOPIC_EVIDENCE.INSUFFICIENT) return "insufficient";
  if (count <= WEAKNESS_CONFIG.TOPIC_EVIDENCE.LOW) return "low";
  if (count <= WEAKNESS_CONFIG.TOPIC_EVIDENCE.MEDIUM) return "medium";
  return "high";
}

/**
 * Helper: Maps chapter attempts count to evidence level code
 */
function getChapterEvidenceLevel(attemptsCount) {
  const attempts = nonNegativeInt(attemptsCount);
  if (attempts === 0) return "insufficient";
  if (attempts <= WEAKNESS_CONFIG.CHAPTER_EVIDENCE.LOW_ATTEMPTS) return "low";
  if (attempts <= WEAKNESS_CONFIG.CHAPTER_EVIDENCE.MEDIUM_ATTEMPTS) return "medium";
  return "high";
}

/**
 * Maps evidence levels to numeric weights for sorting
 */
const EVIDENCE_WEIGHTS = {
  high: 4,
  medium: 3,
  low: 2,
  insufficient: 1
};

/**
 * Sorts array of weakness objects using:
 * 1. weaknessScore DESC
 * 2. evidenceLevel DESC (high > medium > low)
 * 3. chapterId/topicId alphabetically
 */
function sortWeaknesses(arr, isTopic = true) {
  return [...arr].sort((a, b) => {
    const diffScore = b.weaknessScore - a.weaknessScore;
    if (Math.abs(diffScore) > 1e-4) return diffScore;

    const wA = EVIDENCE_WEIGHTS[a.evidenceLevel] || 0;
    const wB = EVIDENCE_WEIGHTS[b.evidenceLevel] || 0;
    const diffEv = wB - wA;
    if (diffEv !== 0) return diffEv;

    // Tie-breaker: chapterId first
    const chA = String(a.chapterId || "");
    const chB = String(b.chapterId || "");
    const chDiff = chA.localeCompare(chB);
    if (chDiff !== 0) return chDiff;

    if (isTopic) {
      const topA = String(a.topicId || "");
      const topB = String(b.topicId || "");
      return topA.localeCompare(topB);
    }
    return 0;
  });
}

/**
 * Main Weakness Evaluation Logic
 */
function analyzeWeaknesses(analyticsResponse) {
  if (!analyticsResponse || !analyticsResponse.hasData || !analyticsResponse.analytics) {
    return createEmptyWeaknessAnalysis();
  }

  const a = analyticsResponse.analytics;

  const weakTopics = [];
  const insufficientTopics = [];

  const weakChapters = [];
  const insufficientChapters = [];

  const weakDifficulties = [];
  const insufficientDifficulties = [];

  // 1. Evaluate Topics (Source: a.topics)
  const topicsList = Array.isArray(a.topics) ? a.topics : [];
  topicsList.forEach(t => {
    const evidenceLevel = getTopicEvidenceLevel(t.attempts);
    const weaknessScore = computeWeaknessScore(t.accuracy, t.speedRatio);
    const severity = getAccuracySeverity(t.accuracy);
    const reasons = determineReasons(t.accuracy, t.speedRatio, evidenceLevel === "insufficient");

    const record = {
      chapterId: t.chapterId,
      chapterTitle: getChapterTitle(t.chapterId),
      topicId: t.topicId,
      topicTitle: getTopicTitle(t.topicId),
      accuracy: safeFloat(t.accuracy),
      speedRatio: safeFloat(t.speedRatio),
      questionCount: nonNegativeInt(t.attempts),
      correct: nonNegativeInt(t.correct),
      wrong: nonNegativeInt(t.wrong),
      unanswered: nonNegativeInt(t.unanswered),
      questionsAttempted: nonNegativeInt(t.attempts),
      correctCount: nonNegativeInt(t.correct),
      incorrectCount: nonNegativeInt(t.wrong),
      skippedCount: nonNegativeInt(t.unanswered),
      weaknessScore,
      severity,
      evidenceLevel,
      reasons
    };

    if (evidenceLevel === "insufficient") {
      insufficientTopics.push(record);
    } else {
      weakTopics.push(record);
    }
  });

  // 2. Evaluate Chapters (Source: a.chapters)
  const chaptersList = Array.isArray(a.chapters) ? a.chapters : [];
  chaptersList.forEach(c => {
    const attempts = nonNegativeInt(c.attempts);
    const evidenceLevel = getChapterEvidenceLevel(attempts);
    
    // Average estimated time per question default is 90 seconds
    const speedRatio = c.averageTimeSeconds > 0 ? safeFloat(c.averageTimeSeconds / 90.0) : 0.0;
    const weaknessScore = computeWeaknessScore(c.accuracy, speedRatio);
    const severity = getAccuracySeverity(c.accuracy);
    const reasons = determineReasons(c.accuracy, speedRatio, evidenceLevel === "insufficient");

    let trend = "insufficient_history";
    if (attempts >= 2) {
      const imp = safeFloat(c.improvementPercentagePoints);
      if (imp >= WEAKNESS_CONFIG.TREND_THRESHOLDS.IMPROVING) {
        trend = "improving";
      } else if (imp <= WEAKNESS_CONFIG.TREND_THRESHOLDS.DECLINING) {
        trend = "declining";
      } else {
        trend = "stable";
      }
    }

    const record = {
      chapterId: c.chapterId,
      chapterTitle: getChapterTitle(c.chapterId),
      subject: c.subject || "Unknown",
      attempts,
      totalQuestions: nonNegativeInt(c.totalQuestions),
      accuracy: safeFloat(c.accuracy),
      averageTimeSeconds: safeFloat(c.averageTimeSeconds),
      firstAttemptAccuracy: safeFloat(c.firstAttemptAccuracy),
      latestAttemptAccuracy: safeFloat(c.latestAttemptAccuracy),
      improvementPercentagePoints: safeFloat(c.improvementPercentagePoints),
      questionsAttempted: nonNegativeInt(c.totalQuestions),
      correctCount: nonNegativeInt(c.correct),
      incorrectCount: nonNegativeInt(c.wrong),
      skippedCount: nonNegativeInt(c.unanswered),
      assessmentSessions: attempts,
      weaknessScore,
      severity,
      evidenceLevel,
      trend,
      reasons
    };

    if (evidenceLevel === "insufficient") {
      insufficientChapters.push(record);
    } else {
      weakChapters.push(record);
    }
  });

  // 3. Evaluate Difficulties (Source: a.difficulties)
  const difficultiesList = Array.isArray(a.difficulties) ? a.difficulties : [];
  difficultiesList.forEach(d => {
    const evidenceLevel = getTopicEvidenceLevel(d.attempts); // reuse topic evidence levels
    const weaknessScore = computeWeaknessScore(d.accuracy, d.speedRatio);
    const severity = getAccuracySeverity(d.accuracy);
    const reasons = determineReasons(d.accuracy, d.speedRatio, evidenceLevel === "insufficient");

    const record = {
      difficulty: d.difficulty,
      questionCount: nonNegativeInt(d.attempts),
      accuracy: safeFloat(d.accuracy),
      speedRatio: safeFloat(d.speedRatio),
      weaknessScore,
      severity,
      evidenceLevel,
      reasons
    };

    if (evidenceLevel === "insufficient") {
      insufficientDifficulties.push(record);
    } else {
      weakDifficulties.push(record);
    }
  });

  // Sort lists deterministically
  const sortedWeakTopics = sortWeaknesses(weakTopics, true);
  const sortedInsufficientTopics = sortWeaknesses(insufficientTopics, true);
  const sortedWeakChapters = sortWeaknesses(weakChapters, false);
  const sortedInsufficientChapters = sortWeaknesses(insufficientChapters, false);

  // Sorting difficulties by hard -> medium -> easy if scores are tied, or deterministic weight
  const difficultySortWeights = { hard: 3, medium: 2, easy: 1 };
  const sortedWeakDifficulties = [...weakDifficulties].sort((a, b) => {
    const diff = b.weaknessScore - a.weaknessScore;
    if (Math.abs(diff) > 1e-4) return diff;
    return (difficultySortWeights[b.difficulty] || 0) - (difficultySortWeights[a.difficulty] || 0);
  });
  const sortedInsufficientDifficulties = [...insufficientDifficulties].sort((a, b) => {
    const diff = b.weaknessScore - a.weaknessScore;
    if (Math.abs(diff) > 1e-4) return diff;
    return (difficultySortWeights[b.difficulty] || 0) - (difficultySortWeights[a.difficulty] || 0);
  });

  // 4. Calculate Summary Aggregates
  let criticalCount = 0;
  let highCount = 0;
  let moderateCount = 0;
  let mildCount = 0;
  let maxScore = 0.0;

  const countSeverity = (item) => {
    if (item.evidenceLevel === "insufficient") return;
    if (item.severity === "critical") criticalCount++;
    if (item.severity === "high") highCount++;
    if (item.severity === "moderate") moderateCount++;
    if (item.severity === "mild") mildCount++;
    if (item.weaknessScore > maxScore) {
      maxScore = item.weaknessScore;
    }
  };

  sortedWeakTopics.forEach(countSeverity);
  sortedWeakChapters.forEach(countSeverity);
  sortedWeakDifficulties.forEach(countSeverity);

  const insufficientCount = 
    sortedInsufficientTopics.length + 
    sortedInsufficientChapters.length + 
    sortedInsufficientDifficulties.length;

  const summary = {
    totalWeakTopics: sortedWeakTopics.length,
    totalWeakChapters: sortedWeakChapters.length,
    totalWeakDifficulties: sortedWeakDifficulties.length,
    criticalWeaknessCount: criticalCount,
    highWeaknessCount: highCount,
    moderateWeaknessCount: moderateCount,
    mildWeaknessCount: mildCount,
    insufficientEvidenceCount: insufficientCount,
    strongestWeaknessScore: safeFloat(maxScore)
  };

  return {
    success: true,
    hasData: true,
    weaknessAnalysis: {
      summary,
      weakTopics: sortedWeakTopics,
      weakChapters: sortedWeakChapters,
      weakDifficulties: sortedWeakDifficulties,
      insufficientEvidence: {
        topics: sortedInsufficientTopics,
        chapters: sortedInsufficientChapters,
        difficulties: sortedInsufficientDifficulties
      },
      configVersion: WEAKNESS_CONFIG.VERSION
    }
  };
}

module.exports = {
  WEAKNESS_CONFIG,
  createEmptyWeaknessAnalysis,
  analyzeWeaknesses,
  computeWeaknessScore
};
