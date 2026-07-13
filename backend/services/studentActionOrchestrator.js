const learningCatalog = require("../data/learningCatalog.json");
const { resolveActionState } = require("./actionCompletionResolver");

const BASE_PRIORITIES = Object.freeze({
  OVERDUE_REVISION: 100,
  CRITICAL_WEAKNESS: 90,
  CONTINUE_ACTIVE_LESSON: 80,
  PENDING_QUIZ: 75,
  POST_MOCK_REVISION: 70,
  WEAK_TOPIC_PRACTICE: 60,
  BUILD_MOCK_EVIDENCE: 50,
  RECOMMENDED_MOCK: 45,
  START_NEW_LESSON: 30,
  MAINTAIN_STRONG_TOPIC: 25,
  NO_ACTION: 0
});

const EVIDENCE_MODIFIERS = Object.freeze({
  STRONG: 15,
  SUFFICIENT: 10,
  LIMITED: -20,
  NONE: -100 // essentially disqualify
});

const URGENCY_MODIFIERS = Object.freeze({
  IMMEDIATE: 20,
  HIGH: 15,
  MEDIUM: 10,
  LOW: 5
});

/**
 * Pure orchestration function to build student action plan with versioned IDs and lifecycle states.
 */
function buildStudentActionPlan({
  slsRecommendations = [],
  revisionQueue = [],
  mockRecommendations = null,
  mockLearningActions = [],
  slsMastery = [],
  activeLessons = [],
  mockAttemptsCount = 0,
  completedMissions = [], // Kept for compatibility / direct manual filters if any
  evidence = {}
} = {}) {
  const candidates = [];
  const generatedAt = new Date().toISOString();

  // Helper to determine evidence level from attempts
  function getEvidenceLevel(attempts) {
    if (attempts === 0 || attempts === undefined || attempts === null) return 'NONE';
    if (attempts === 1) return 'LIMITED';
    if (attempts === 2) return 'SUFFICIENT';
    return 'STRONG';
  }

  // Helper to find chapter title and subject from catalog
  function lookupCatalog(chapterId) {
    const item = learningCatalog[chapterId];
    return item ? { chapterTitle: item.chapterTitle, subject: item.subject } : { chapterTitle: null, subject: null };
  }

  // Create lookup for mastery states to check freshness/staleness
  const masteryLookup = {};
  if (Array.isArray(slsMastery)) {
    slsMastery.forEach(m => {
      if (m.chapterId) {
        masteryLookup[m.chapterId] = m;
      }
    });
  }

  // 1. Normalize SLS Recommendations
  if (Array.isArray(slsRecommendations)) {
    slsRecommendations.forEach(item => {
      if (!item.chapterId) return;
      const cat = lookupCatalog(item.chapterId);
      if (!cat.chapterTitle && !cat.subject) {
        console.warn(`[studentActionOrchestrator] G8 Bypass: Unknown chapterId skipped: ${item.chapterId}`);
        return;
      }
      const chapterTitle = item.chapterTitle || cat.chapterTitle || "General";
      const subject = item.subject || cat.subject || "General";

      let type = 'START_NEW_LESSON';
      let route = `/smart-lessons/${item.chapterId}`;
      let ctaLabel = 'Start Lesson';
      let basePriority = BASE_PRIORITIES.START_NEW_LESSON;

      if (item.actionType === 'REVISE_CHAPTER') {
        type = 'REVISE_CRITICAL_CHAPTER';
        ctaLabel = 'Start Revision';
        basePriority = BASE_PRIORITIES.CRITICAL_WEAKNESS;
      } else if (item.actionType === 'RETRY_CHAPTER_QUIZ') {
        type = 'COMPLETE_PENDING_QUIZ';
        route = `/smart-lessons/${item.chapterId}::quiz`;
        ctaLabel = 'Retry Quiz';
        basePriority = BASE_PRIORITIES.PENDING_QUIZ;
      } else if (item.actionType === 'PRACTICE_TOPIC') {
        type = 'PRACTICE_WEAK_TOPIC';
        ctaLabel = 'Practice Topic';
        basePriority = BASE_PRIORITIES.WEAK_TOPIC_PRACTICE;
      } else if (item.actionType === 'CONTINUE_LEARNING') {
        type = 'RESUME_ACTIVE_LESSON';
        ctaLabel = 'Continue Lesson';
        basePriority = BASE_PRIORITIES.CONTINUE_ACTIVE_LESSON;
      }

      // Check evidence gating (attempts count)
      const attempts = item.evidence ? (item.evidence.attempts !== undefined ? item.evidence.attempts : item.evidence.attemptCount || 0) : 0;
      const accuracy = item.evidence ? item.evidence.accuracy : null;
      let evidenceLevel = getEvidenceLevel(attempts);

      // Gating safeguard: 1 attempt with 0% accuracy must not remain critical weakness priority
      if (evidenceLevel === 'LIMITED' || evidenceLevel === 'NONE') {
        basePriority = Math.min(basePriority, BASE_PRIORITIES.WEAK_TOPIC_PRACTICE);
      }

      // Freshness: check if chapter is already MASTERED or STRONG in SLS mastery
      const currentMastery = masteryLookup[item.chapterId];
      if (currentMastery && (currentMastery.state === 'MASTERED' || currentMastery.state === 'STRONG')) {
        if (type === 'REVISE_CRITICAL_CHAPTER' || type === 'PRACTICE_WEAK_TOPIC') {
          return; // Reject stale recommendation
        }
      }

      const urgencyUpper = (item.urgency || 'low').toUpperCase();
      const urgencyMod = URGENCY_MODIFIERS[urgencyUpper] || URGENCY_MODIFIERS.LOW;
      const evidenceMod = EVIDENCE_MODIFIERS[evidenceLevel] || 0;

      const priority = basePriority + urgencyMod + evidenceMod;

      const reasons = [];
      if (accuracy !== null && accuracy !== undefined) {
        reasons.push(`Accuracy is currently ${Math.round(accuracy)}% on this chapter.`);
      }
      if (item.urgency === 'immediate' || item.urgency === 'high') {
        reasons.push('This recommendation requires immediate attention to reinforce preparation.');
      } else {
        reasons.push('Regular practice recommended to consolidate learning.');
      }

      // Versioned ID representation (instance identity)
      const definitionId = `sls-rec::${item.chapterId}::${item.actionType}::${item.topicId || 'all'}`;
      const id = `${definitionId}::${attempts}`;

      candidates.push({
        id,
        definitionId,
        type,
        source: 'SLS',
        title: `${actionLabel(item.actionType)}: ${chapterTitle}`,
        description: `Targeted practice for ${chapterTitle} under SLS recommendations.`,
        subject,
        chapterId: item.chapterId,
        chapterTitle,
        topicId: item.topicId || null,
        route,
        ctaLabel,
        priority,
        priorityBand: getPriorityBand(priority),
        evidenceLevel,
        reasons,
        metadata: {
          originalUrgency: item.urgency,
          attempts,
          accuracy
        },
        generatedAt
      });
    });
  }

  // Helper for action types labeling
  function actionLabel(actionType) {
    if (actionType === 'REVISE_CHAPTER') return 'Revise';
    if (actionType === 'RETRY_CHAPTER_QUIZ') return 'Retry Quiz';
    if (actionType === 'PRACTICE_TOPIC') return 'Practice';
    return 'Study';
  }

  // 2. Normalize Revision Queue
  if (Array.isArray(revisionQueue)) {
    revisionQueue.forEach(item => {
      if (!item.chapterId) return;
      const cat = lookupCatalog(item.chapterId);
      if (!cat.chapterTitle && !cat.subject) {
        console.warn(`[studentActionOrchestrator] G8 Bypass: Unknown chapterId skipped: ${item.chapterId}`);
        return;
      }
      const chapterTitle = item.chapterTitle || cat.chapterTitle || "General";
      const subject = item.subject || cat.subject || "General";

      const basePriority = BASE_PRIORITIES.OVERDUE_REVISION;
      const urgencyMod = item.isDue ? 20 : 5;
      const evidenceLevel = 'SUFFICIENT'; // Default for calculated revision items

      const priority = basePriority + urgencyMod;

      const lastAttemptedEpoch = item.lastAttemptedAt ? new Date(item.lastAttemptedAt).getTime() : 0;
      const definitionId = `rev-queue::${item.chapterId}::${item.revisionType || 'general'}`;
      const id = `${definitionId}::${lastAttemptedEpoch}`;

      candidates.push({
        id,
        definitionId,
        type: 'COMPLETE_DUE_REVISION',
        source: 'REVISION_QUEUE',
        title: `Revision: ${chapterTitle}`,
        description: `This chapter is scheduled for review to maintain long-term memory retention.`,
        subject,
        chapterId: item.chapterId,
        chapterTitle,
        route: `/smart-lessons/${item.chapterId}`,
        ctaLabel: 'Revise Now',
        priority,
        priorityBand: getPriorityBand(priority),
        evidenceLevel,
        reasons: [`Scheduled revision due based on spaced-repetition timing.`],
        metadata: {
          isDue: item.isDue,
          dueInDays: item.dueInDays,
          masteryState: item.masteryState
        },
        generatedAt
      });
    });
  }

  // 3. Normalize Mock Recommendations
  if (mockRecommendations && mockRecommendations.recommendedMock) {
    const recMock = mockRecommendations.recommendedMock;
    const isRetake = mockRecommendations.recommendationType === 'RETAKE_MOCK';
    const isFirst = mockRecommendations.recommendationType === 'START_FIRST_MOCK';

    let type = 'TAKE_RECOMMENDED_MOCK';
    let basePriority = BASE_PRIORITIES.RECOMMENDED_MOCK;
    if (isRetake) {
      type = 'BUILD_MORE_MOCK_EVIDENCE';
      basePriority = BASE_PRIORITIES.BUILD_MOCK_EVIDENCE;
    }

    const priority = basePriority + (isFirst ? 15 : 5);
    const evidenceLevel = mockRecommendations.evidenceState === 'NO_DATA' ? 'NONE' :
                          mockRecommendations.evidenceState === 'LIMITED' ? 'LIMITED' : 'SUFFICIENT';

    const reasons = (mockRecommendations.reasons || []).map(r => r.message);
    if (reasons.length === 0) {
      reasons.push('Practice under exam conditions to sharpen timing and score consistency.');
    }

    const definitionId = `mock-rec::${recMock.id}::${mockRecommendations.recommendationType}`;
    const id = `${definitionId}::${mockAttemptsCount}`;

    candidates.push({
      id,
      definitionId,
      type,
      source: 'MOCK',
      title: mockRecommendations.primaryAction?.title || `Attempt Mock: ${recMock.title}`,
      description: mockRecommendations.primaryAction?.description || `Take full mock ${recMock.title} to test overall readiness.`,
      mockId: recMock.id,
      route: `/mock-tests`,
      ctaLabel: isRetake ? 'Retake Mock' : 'Start Mock',
      priority,
      priorityBand: getPriorityBand(priority),
      evidenceLevel,
      reasons,
      metadata: {
        recommendationType: mockRecommendations.recommendationType,
        confidence: mockRecommendations.confidence
      },
      generatedAt
    });
  }

  // 4. Normalize Mock Learning Actions
  if (Array.isArray(mockLearningActions)) {
    mockLearningActions.forEach(item => {
      if (!item.chapterId || item.chapterId === 'all') return;
      const cat = lookupCatalog(item.chapterId);
      if (!cat.chapterTitle && !cat.subject) {
        console.warn(`[studentActionOrchestrator] G8 Bypass: Unknown chapterId skipped: ${item.chapterId}`);
        return;
      }
      const chapterTitle = item.chapterTitle || cat.chapterTitle || "General";
      const subject = item.subject || cat.subject || "General";

      let type = 'PRACTICE_WEAK_TOPIC';
      let ctaLabel = 'Practice';
      let basePriority = BASE_PRIORITIES.WEAK_TOPIC_PRACTICE;

      if (item.actionType === 'REVISE_CHAPTER') {
        type = 'POST_MOCK_REVISION';
        ctaLabel = 'Revise Chapter';
        basePriority = BASE_PRIORITIES.POST_MOCK_REVISION;
      }

      // Fix G7: use mockCount as attempts, default to 2 (SUFFICIENT) if missing
      const attemptsCount = item.mockCount !== undefined ? item.mockCount : (item.totalQuestions !== undefined ? item.totalQuestions : 2);
      const accuracyVal = item.accuracy;
      const evidenceLevel = getEvidenceLevel(attemptsCount);

      // Gating safeguard
      if (evidenceLevel === 'LIMITED' || evidenceLevel === 'NONE') {
        basePriority = Math.min(basePriority, BASE_PRIORITIES.WEAK_TOPIC_PRACTICE - 10);
      }

      // Mastery check for staleness override
      const currentMastery = masteryLookup[item.chapterId];
      if (currentMastery && (currentMastery.state === 'MASTERED' || currentMastery.state === 'STRONG')) {
        return; // Reject stale recommendation
      }

      const priority = basePriority + (item.priorityScore ? Math.round(item.priorityScore * 0.1) : 5) + (EVIDENCE_MODIFIERS[evidenceLevel] || 0);

      const definitionId = `mock-learning::${item.chapterId}::${item.actionType}`;
      const id = `${definitionId}::${attemptsCount}`;

      candidates.push({
        id,
        definitionId,
        type,
        source: 'MOCK',
        title: `Post-Mock: ${chapterTitle}`,
        description: `Calculated from your mock results: ${chapterTitle} needs review.`,
        subject,
        chapterId: item.chapterId,
        chapterTitle,
        route: `/smart-lessons/${item.chapterId}`,
        ctaLabel,
        priority,
        priorityBand: getPriorityBand(priority),
        evidenceLevel,
        reasons: [`Your performance on mock test questions indicates improvement potential in this chapter.`],
        metadata: {
          attempts: attemptsCount,
          accuracy: accuracyVal,
          priorityScore: item.priorityScore
        },
        generatedAt
      });
    });
  }

  // 5. Normalize Active Lessons (Continuity Candidates)
  if (Array.isArray(activeLessons)) {
    activeLessons.forEach(item => {
      if (!item.chapterId) return;
      const cat = lookupCatalog(item.chapterId);
      const chapterTitle = cat.chapterTitle || "General";
      const subject = cat.subject || "General";

      const basePriority = BASE_PRIORITIES.CONTINUE_ACTIVE_LESSON;
      const progress = item.progress || 0;
      // Urgency modifier matches progress: higher progress = higher urgency to finish
      const urgencyMod = Math.round(progress * 0.15);
      const priority = basePriority + urgencyMod;

      const definitionId = `active-lesson::${item.chapterId}`;
      const id = `${definitionId}::${item.lastOpened || 0}`;

      candidates.push({
        id,
        definitionId,
        type: 'RESUME_ACTIVE_LESSON',
        source: 'LEARNING_PROGRESS',
        title: `Resume: ${chapterTitle}`,
        description: `You are currently ${progress}% through this lesson. Complete it to unlock the chapter quiz.`,
        subject,
        chapterId: item.chapterId,
        chapterTitle,
        route: `/smart-lessons/${item.chapterId}`,
        ctaLabel: 'Continue Lesson',
        priority,
        priorityBand: getPriorityBand(priority),
        evidenceLevel: 'SUFFICIENT',
        reasons: [`Complete your active, unfinished lesson in ${chapterTitle}.`],
        metadata: {
          progress,
          lastOpened: item.lastOpened
        },
        generatedAt
      });
    });
  }

  // Gating check: Reject any weakness candidates with no attempts / no evidence
  const gatedCandidates = candidates.filter(c => {
    if (c.type === 'REVISE_CRITICAL_CHAPTER' || c.type === 'PRACTICE_WEAK_TOPIC' || c.type === 'POST_MOCK_REVISION') {
      return c.evidenceLevel !== 'NONE';
    }
    return true;
  });

  // 6. Semantic Deduplication Engine (collapse same chapter actions)
  const groupedByChapter = {};
  gatedCandidates.forEach(cand => {
    const key = cand.chapterId || cand.id;
    if (!groupedByChapter[key]) {
      groupedByChapter[key] = [];
    }
    groupedByChapter[key].push(cand);
  });

  const deduplicatedCandidates = [];

  Object.entries(groupedByChapter).forEach(([key, list]) => {
    if (list.length === 1) {
      deduplicatedCandidates.push(list[0]);
    } else {
      // Sort by priority desc, stable tie-breaker id
      list.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
      const representative = { ...list[0] };

      // Merge reasons
      const allReasons = [];
      const seenReasons = new Set();
      list.forEach(c => {
        (c.reasons || []).forEach(r => {
          if (!seenReasons.has(r)) {
            seenReasons.add(r);
            allReasons.push(r);
          }
        });
      });
      representative.reasons = allReasons;

      // Merge contributing sources in metadata
      const contributingSources = Array.from(new Set(list.map(c => c.source)));
      representative.metadata = {
        ...representative.metadata,
        contributingSources,
        collapsedActionsCount: list.length
      };

      // Merge highest evidence level
      const evidenceWeights = { NONE: 0, LIMITED: 1, SUFFICIENT: 2, STRONG: 3 };
      let maxEv = 'NONE';
      list.forEach(c => {
        if (evidenceWeights[c.evidenceLevel] > evidenceWeights[maxEv]) {
          maxEv = c.evidenceLevel;
        }
      });
      representative.evidenceLevel = maxEv;

      deduplicatedCandidates.push(representative);
    }
  });

  // Resolve state for ALL deduplicated candidates
  deduplicatedCandidates.forEach(c => {
    c.state = resolveActionState(c, evidence);
  });

  // Active candidates for CTAs must only be AVAILABLE, STARTED, or IN_PROGRESS
  const activeCandidates = deduplicatedCandidates.filter(c => {
    // Also filter using completedMissions legacy check for unit tests compatibility
    const isCompletedLegacy = completedMissions.includes(c.id) || completedMissions.some(mId => c.id.startsWith(mId));
    return c.state !== 'COMPLETED' && !isCompletedLegacy;
  });

  // Sort final active candidates
  activeCandidates.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));

  // Select Primary & Secondary Actions
  const primaryAction = activeCandidates[0] || getSystemOnboardingFallback(generatedAt);
  const secondaryCandidates = activeCandidates.slice(1);
  const secondaryActions = secondaryCandidates.slice(0, 2);

  // Daily Missions are selected from the full pool (Derived Daily Mission View)
  const dailyMissionsCandidates = [...deduplicatedCandidates];
  dailyMissionsCandidates.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));

  // Daily Mission Generation logic (stable selections)
  const dailyMissions = [];
  
  // Slot 1: Primary action (always included)
  if (primaryAction && primaryAction.type !== 'NO_ACTION') {
    dailyMissions.push(primaryAction);
  }

  if (dailyMissionsCandidates.length > 0) {
    const primarySubj = dailyMissions[0]?.subject;
    const primaryChap = dailyMissions[0]?.chapterId;
    
    // Slot 2
    const slot2Candidate = dailyMissionsCandidates.find(c => {
      if (dailyMissions.some(m => m.id === c.id)) return false;
      const diffSubj = c.subject !== primarySubj;
      const diffChap = c.chapterId !== primaryChap;
      return (diffSubj || diffChap) && (c.type === 'PRACTICE_WEAK_TOPIC' || c.type === 'COMPLETE_PENDING_QUIZ' || c.type === 'COMPLETE_DUE_REVISION');
    });
    if (slot2Candidate) {
      dailyMissions.push(slot2Candidate);
    }

    // Slot 3
    const slot3Candidate = dailyMissionsCandidates.find(c => {
      const alreadyChosenIds = dailyMissions.map(m => m.id);
      if (alreadyChosenIds.includes(c.id)) return false;

      const diffSubj = dailyMissions.every(m => m.subject !== c.subject);
      const diffChap = dailyMissions.every(m => m.chapterId !== c.chapterId);
      
      const isAssessmentOrContinuity = c.type === 'BUILD_MORE_MOCK_EVIDENCE' || c.type === 'TAKE_RECOMMENDED_MOCK' || c.type === 'RESUME_ACTIVE_LESSON';
      return (diffSubj || diffChap) && isAssessmentOrContinuity;
    });
    if (slot3Candidate) {
      dailyMissions.push(slot3Candidate);
    }
  }

  // Fallbacks: If slots aren't filled, fill respecting diversity checks & type caps (G9)
  if (dailyMissions.length < 3) {
    for (const c of dailyMissionsCandidates) {
      if (dailyMissions.length >= 3) break;
      if (!dailyMissions.some(m => m.id === c.id)) {
        if (!dailyMissions.some(m => m.chapterId && m.chapterId === c.chapterId)) {
          // G9 constraint: enforce no more than 2 missions of the same type in fallback
          const typeCount = dailyMissions.filter(m => m.type === c.type).length;
          if (typeCount < 2) {
            dailyMissions.push(c);
          }
        }
      }
    }
  }

  // Summary calculations
  const totalCritical = activeCandidates.filter(c => c.priorityBand === 'CRITICAL').length;
  let summaryEvidence = 'NONE';
  if (activeCandidates.some(c => c.evidenceLevel === 'STRONG')) summaryEvidence = 'STRONG';
  else if (activeCandidates.some(c => c.evidenceLevel === 'SUFFICIENT')) summaryEvidence = 'SUFFICIENT';
  else if (activeCandidates.some(c => c.evidenceLevel === 'LIMITED')) summaryEvidence = 'LIMITED';

  return {
    success: true,
    hasData: activeCandidates.length > 0,
    primaryAction,
    secondaryActions,
    dailyMissions,
    summary: {
      evidenceLevel: summaryEvidence,
      activePriorities: activeCandidates.length,
      criticalActions: totalCritical
    },
    generatedAt
  };
}

// Helpers for priority bands mapping
function getPriorityBand(score) {
  if (score >= 90) return 'CRITICAL';
  if (score >= 70) return 'HIGH';
  if (score >= 45) return 'MEDIUM';
  return 'LOW';
}

function getSystemOnboardingFallback(generatedAt) {
  const defaultChapterId = "phy_units";
  const item = learningCatalog[defaultChapterId] || { chapterTitle: "Units & Measurements", subject: "Physics" };
  return {
    id: 'system-fallback::onboarding::0',
    definitionId: 'system-fallback::onboarding',
    type: 'START_NEW_LESSON',
    source: 'SYSTEM_FALLBACK',
    title: `Start Learning: ${item.chapterTitle}`,
    description: 'Begin your preparation path by exploring your first recommended lesson.',
    subject: item.subject,
    chapterId: defaultChapterId,
    chapterTitle: item.chapterTitle,
    route: `/smart-lessons/${defaultChapterId}`,
    ctaLabel: 'Start Learning',
    priority: BASE_PRIORITIES.START_NEW_LESSON,
    priorityBand: 'LOW',
    evidenceLevel: 'NONE',
    reasons: ['No learning history detected. Establish your baseline by completing this lesson.'],
    state: 'AVAILABLE',
    generatedAt
  };
}

module.exports = {
  BASE_PRIORITIES,
  buildStudentActionPlan
};
