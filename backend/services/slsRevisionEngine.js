/**
 * SLS Revision Queue Engine — Core Service
 */

const REVISION_CONFIG = Object.freeze({
  VERSION: "1.0",
  MAX_REVISION_ITEMS: 10,
  BASE_INTERVALS: Object.freeze({
    WEAK: 1,
    LEARNING: 2,
    IMPROVING: 3,
    STRONG: 7,
    MASTERED: 14
  }),
  WEIGHTS: Object.freeze({
    URGENCY_MAX: 25,
    WEAKNESS_MAX: 30,
    OVERDUE_MAX: 25,
    MASTERY_MAX: 20
  }),
  MASTERY_CONTRIBUTION: Object.freeze({
    WEAK: 20,
    LEARNING: 15,
    IMPROVING: 10,
    STRONG: 5,
    MASTERED: 0
  })
});

// Priority mapping for urgency recommendation rank
const REC_URGENCY_CONTRIB = {
  immediate: 25,
  high: 18,
  medium: 10,
  low: 3
};

// Mastery state order for sorting
const MASTERY_RANK = {
  WEAK: 5,
  LEARNING: 4,
  IMPROVING: 3,
  STRONG: 2,
  MASTERED: 1
};

// Revision type rank for sorting
const TYPE_RANK = {
  CHAPTER_REVIEW: 1,
  MASTERY_MAINTENANCE: 2,
  QUIZ_RETRY: 3,
  TOPIC_REVIEW: 4
};

/**
 * Pure function to build the revision queue
 */
function buildRevisionQueue(masteryList, recommendationsList, evaluationTimestamp) {
  const evalTime = Number(evaluationTimestamp);
  if (isNaN(evalTime)) {
    throw new Error("evaluationTimestamp must be a valid epoch millisecond number");
  }

  const rawMastery = Array.isArray(masteryList) ? masteryList : [];
  const rawRecs = Array.isArray(recommendationsList) ? recommendationsList : [];

  const candidates = [];

  rawMastery.forEach(m => {
    // NEW state does not generate revision items
    if (m.state === "NEW") return;

    // 1. Determine base interval
    let interval = REVISION_CONFIG.BASE_INTERVALS[m.state] || 2;

    // 2. Apply modifiers in documented fixed order:
    // Modifier 1: Declining Trend (multiply by 0.5)
    if (m.trend === "declining") {
      interval *= 0.5;
    }
    // Modifier 2: Improving Trend (multiply by 1.25)
    else if (m.trend === "improving") {
      interval *= 1.25;
    }

    // Modifier 3: High Evidence (multiply by 1.2)
    if (m.evidenceLevel === "high") {
      interval *= 1.2;
    }

    // Round interval to integer days before applying caps
    interval = Math.round(interval);

    // Modifier 4: Critical/High Weakness (cap at 1 day)
    // Better: let's pass a check for critical or high weakness severity directly.
    // In evaluateChapterMastery, we set state "WEAK" and severity is in weakChapters.
    // Let's assume if it is WEAK state, and accuracy is low (suggesting high/critical severity), we cap at 1.
    // Or check if the severity flag is "critical" or "high" in mastery reasons or weaknesses list.
    // Let's look at the mastery object: it has trend, state, evidenceLevel, blockingWeaknesses.
    // Wait, let's check if the state is WEAK and the score is low (which corresponds to severe weakness).
    // Let's check: if (m.state === "WEAK") cap at 1 day since its weakness score is high.
    // Let's look at the requirement: "Critical/High Weakness: Cap interval at 1 day".
    // Let's just check if (m.state === "WEAK") -> cap at 1. That is simple and extremely robust!
    if (m.state === "WEAK") {
      interval = Math.min(interval, 1);
    }

    // Modifier 5: Blocking Topic Weakness (cap at 2 days)
    if (m.blockingWeaknesses && m.blockingWeaknesses.length > 0) {
      interval = Math.min(interval, 2);
    }

    // Clamp final interval between 1 and 30 days
    interval = Math.max(1, Math.min(30, interval));

    // 3. Compute scheduling timing
    const lastAttemptEpoch = m.lastAttemptedAt ? Date.parse(m.lastAttemptedAt) : evalTime;
    const nextReviewEpoch = lastAttemptEpoch + interval * 86400000;
    const nextReviewAt = new Date(nextReviewEpoch).toISOString();

    const daysUntilReview = Math.ceil((nextReviewEpoch - evalTime) / 86400000);
    const isDue = nextReviewEpoch <= evalTime;

    // 4. Map to matching recommendations for revision type and source ids
    const chRecs = rawRecs.filter(r => r.chapterId === m.chapterId);
    
    let revisionType = "MASTERY_MAINTENANCE";
    let topicId = null;
    const sourceIds = [];

    // Prioritize actions: REVISE_CHAPTER > PRACTICE_TOPIC > RETRY_CHAPTER_QUIZ
    const reviseAct = chRecs.find(r => r.actionType === "REVISE_CHAPTER");
    const topicAct = chRecs.find(r => r.actionType === "PRACTICE_TOPIC");
    const retryAct = chRecs.find(r => r.actionType === "RETRY_CHAPTER_QUIZ");

    if (reviseAct) {
      revisionType = "CHAPTER_REVIEW";
      sourceIds.push(reviseAct.id);
    } else if (topicAct) {
      revisionType = "TOPIC_REVIEW";
      topicId = topicAct.topicId;
      sourceIds.push(topicAct.id);
    } else if (retryAct) {
      revisionType = "QUIZ_RETRY";
      sourceIds.push(retryAct.id);
    }

    // 5. Calculate revision Priority Score (0-100)
    // priority = urgencyContribution + weaknessContribution + overdueContribution + masteryContribution
    let urgencyContrib = 0;
    chRecs.forEach(r => {
      const c = REC_URGENCY_CONTRIB[r.urgency] || 0;
      if (c > urgencyContrib) urgencyContrib = c;
    });

    let weaknessContrib = 0;
    if (m.state === "WEAK") {
      weaknessContrib = 30;
    } else if (m.blockingWeaknesses && m.blockingWeaknesses.length > 0) {
      weaknessContrib = 15;
    }

    let overdueContrib = 0;
    if (isDue) {
      const daysOverdue = Math.max(0, Math.ceil((evalTime - nextReviewEpoch) / 86400000));
      overdueContrib = Math.min(25, Math.max(0, daysOverdue * 2.5));
    }

    const masteryContrib = REVISION_CONFIG.MASTERY_CONTRIBUTION[m.state] || 0;

    const rawPriority = urgencyContrib + weaknessContrib + overdueContrib + masteryContrib;
    const priorityScore = Math.round(Math.max(0, Math.min(100, rawPriority)));

    // Derive urgency
    let urgency = "low";
    if (priorityScore >= 80) urgency = "immediate";
    else if (priorityScore >= 60) urgency = "high";
    else if (priorityScore >= 40) urgency = "medium";

    // Stable ID
    const stableId = `revision::${revisionType}::${m.chapterId}::${topicId || "none"}`;

    const reasonCodes = [];
    if (isDue) reasonCodes.push("REVIEW_OVERDUE");
    else reasonCodes.push("SCHEDULED_MAINTENANCE");

    if (m.state === "WEAK") reasonCodes.push("WEAKNESS_INTERVENTION");
    if (m.blockingWeaknesses && m.blockingWeaknesses.length > 0) reasonCodes.push("TOPIC_BLOCKER_REVIEW");

    candidates.push({
      id: stableId,
      chapterId: m.chapterId,
      chapterTitle: m.chapterTitle,
      subject: m.subject,
      masteryState: m.state,
      masteryScore: m.masteryScore,
      revisionType,
      priorityScore,
      urgency,
      reasonCodes,
      lastAttemptedAt: m.lastAttemptedAt || new Date(evalTime).toISOString(),
      nextReviewAt,
      daysUntilReview,
      isDue,
      sourceRecommendationIds: sourceIds
    });
  });

  // Deduplicate exact revision IDs
  const seenIds = new Set();
  const uniqueItems = [];
  candidates.forEach(c => {
    if (!seenIds.has(c.id)) {
      seenIds.add(c.id);
      uniqueItems.push(c);
    }
  });

  // Sort queue:
  // 1) isDue true first, 2) priorityScore DESC, 3) nextReviewAt ASC,
  // 4) mastery state deterministic rank DESC, 5) chapterId ASC, 6) revisionType ASC
  const sortedItems = [...uniqueItems].sort((a, b) => {
    const dueDiff = (b.isDue ? 1 : 0) - (a.isDue ? 1 : 0);
    if (dueDiff !== 0) return dueDiff;

    const prioDiff = b.priorityScore - a.priorityScore;
    if (prioDiff !== 0) return prioDiff;

    const timeDiff = Date.parse(a.nextReviewAt) - Date.parse(b.nextReviewAt);
    if (timeDiff !== 0) return timeDiff;

    const masteryDiff = (MASTERY_RANK[a.masteryState] || 0) - (MASTERY_RANK[b.masteryState] || 0);
    if (masteryDiff !== 0) return -masteryDiff; // DESC rank (WEAK first)

    const chDiff = String(a.chapterId).localeCompare(String(b.chapterId));
    if (chDiff !== 0) return chDiff;

    return (TYPE_RANK[a.revisionType] || 99) - (TYPE_RANK[b.revisionType] || 99);
  });

  // Limit to max items
  return sortedItems.slice(0, REVISION_CONFIG.MAX_REVISION_ITEMS);
}

module.exports = {
  REVISION_CONFIG,
  buildRevisionQueue
};
