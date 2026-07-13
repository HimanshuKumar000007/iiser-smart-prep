const mockCatalog = require("../data/mockCatalog.json");

/**
 * Maps orchestrator action plan and raw evidence to the Study Coach V2 contract.
 */
function presentStudyCoach({
  actionPlan,
  quizAttempts = [],
  mockResults = [],
  lessonSessions = [],
  revisions = [],
  questionAttempts = [],
  rawMockQuestionAttempts = [],
  pyqSessionsCount = 0,
  mockTrend = 'insufficient_history'
} = {}) {
  // 1. Calculate structured evidence summary
  const answeredQuestions = questionAttempts.length + rawMockQuestionAttempts.length;
  const chapterQuizSessions = quizAttempts.length;
  const pyqSessions = pyqSessionsCount;
  const fullMockSessions = mockResults.length;
  const completedRevisions = revisions.length;

  const lastActivityDates = [
    ...quizAttempts.map(a => a.completed_at || a.created_at),
    ...mockResults.map(a => a.created_at),
    ...lessonSessions.map(a => a.last_active_at || a.created_at),
    ...revisions.map(a => a.created_at)
  ]
    .filter(Boolean)
    .map(d => {
      const t = new Date(d).getTime();
      return Number.isFinite(t) ? t : null;
    })
    .filter(Boolean);

  const lastActivityAt = lastActivityDates.length > 0 
    ? new Date(Math.max(...lastActivityDates)).toISOString() 
    : null;

  const activeSources = [];
  if (chapterQuizSessions > 0) activeSources.push("CHAPTER_QUIZ");
  if (pyqSessions > 0) activeSources.push("PYQ");
  if (fullMockSessions > 0) activeSources.push("MOCK");
  if (completedRevisions > 0) activeSources.push("REVISION");

  const evidenceSummary = {
    answeredQuestions,
    chapterQuizSessions,
    pyqSessions,
    fullMockSessions,
    completedRevisions,
    lastActivityAt,
    sources: activeSources
  };

  // 2. Resolve Evidence Level Gating (matching SLS & Prediction thresholds)
  const totalEvidenceAttempts = chapterQuizSessions + fullMockSessions;
  let evidenceLevel = "NONE";
  if (totalEvidenceAttempts > 0) {
    if (totalEvidenceAttempts < 5) {
      evidenceLevel = "LIMITED";
    } else if (totalEvidenceAttempts < 15) {
      evidenceLevel = "SUFFICIENT";
    } else {
      evidenceLevel = "STRONG";
    }
  }

  // 3. Select Actionable Plan Actions (top 3)
  const planCandidates = [];
  if (actionPlan.primaryAction && actionPlan.primaryAction.type !== 'NO_ACTION') {
    planCandidates.push(actionPlan.primaryAction);
  }
  if (Array.isArray(actionPlan.secondaryActions)) {
    actionPlan.secondaryActions.forEach(a => {
      if (a && a.type !== 'NO_ACTION' && !planCandidates.some(p => p.id === a.id)) {
        planCandidates.push(a);
      }
    });
  }

  // Slice to max 3 actions
  const planActions = planCandidates.slice(0, 3);

  // Fallback durations mappings
  const FALLBACK_DURATIONS = {
    LESSON: 15,
    QUIZ: 30,
    REVISION: 20,
    PYQ: 20,
    FULL_MOCK: 180
  };

  const processedActions = planActions.map((action, idx) => {
    let type = 'LESSON';
    let ctaLabel = action.ctaLabel || 'Start Learning';

    if (action.type === 'COMPLETE_DUE_REVISION' || action.type === 'REVISE_CRITICAL_CHAPTER' || action.type === 'POST_MOCK_REVISION') {
      type = 'REVISION';
    } else if (action.type === 'COMPLETE_PENDING_QUIZ') {
      type = 'QUIZ';
    } else if (action.type === 'PRACTICE_WEAK_TOPIC') {
      type = 'PYQ';
    } else if (action.type === 'TAKE_RECOMMENDED_MOCK' || action.type === 'BUILD_MORE_MOCK_EVIDENCE') {
      type = 'FULL_MOCK';
    }

    // Determine realistic duration
    let estimatedMinutes = FALLBACK_DURATIONS[type] || 15;
    let durationSource = 'FALLBACK_BY_ACTION_TYPE';

    if (type === 'FULL_MOCK' && action.mockId) {
      const mockMeta = mockCatalog.find(m => m.id === action.mockId);
      if (mockMeta && mockMeta.duration) {
        estimatedMinutes = mockMeta.duration;
        durationSource = 'MOCK_CATALOG';
      }
    }

    const priorityLabels = ['Do First', 'Then', 'Optional'];

    return {
      id: action.id,
      priority: action.priority || (100 - idx * 10),
      type,
      label: priorityLabels[idx] || 'Optional',
      title: action.title,
      description: action.description || '',
      estimatedMinutes,
      durationSource,
      reasonCode: action.type,
      chapterId: action.chapterId || null,
      subject: action.subject || null,
      ctaLabel
    };
  });

  const totalPlanMinutes = processedActions.reduce((sum, act) => sum + act.estimatedMinutes, 0);

  // 4. Resolve Coaching Status Precedence Rules
  let status = "ON_TRACK";
  let coachTitle = "You are on track!";
  let coachMessage = "Maintain your daily targets and syllabus progression.";
  let coachReason = "No urgent weaknesses or pending revisions.";

  if (evidenceLevel === "NONE") {
    status = "GETTING_STARTED";
    coachTitle = "Start building your study profile";
    coachMessage = "Complete your first diagnostic test or lesson quiz to unlock personalized insights.";
    coachReason = "No learning attempts recorded yet.";
  } else if (evidenceLevel === "LIMITED") {
    status = "BUILDING_EVIDENCE";
    coachTitle = "We're learning from your activity";
    coachMessage = "Continue practicing lessons and taking quizzes to refine your study roadmap.";
    coachReason = "Based on initial attempts and study patterns.";
  } else {
    // Actionable precedence derived from top orchestrator action
    const primary = processedActions[0];
    if (mockTrend === 'declining') {
      status = "PERFORMANCE_DECLINING";
      coachTitle = "Action needed: Stabilize scores";
      coachMessage = "Performance shows a downward trend. Pause on mocks and focus on revising weak concepts.";
      coachReason = "Based on recent mock test score progression.";
    } else if (primary && primary.reasonCode === 'COMPLETE_DUE_REVISION') {
      status = "REVISION_DUE";
      coachTitle = "Revisions due to prevent forgetting";
      coachMessage = `${primary.chapterId ? primary.title : 'Revisions'} scheduled for review to maintain retention.`;
      coachReason = "Based on spaced repetition scheduling.";
    } else if (primary && (primary.type === 'QUIZ' || primary.type === 'PYQ' || primary.reasonCode === 'REVISE_CRITICAL_CHAPTER' || primary.reasonCode === 'POST_MOCK_REVISION' || primary.chapterId)) {
      status = "NEEDS_FOCUS";
      coachTitle = primary.subject ? `Strengthen ${primary.subject} foundations` : "Strengthen weak chapters";
      coachMessage = `${primary.description || 'Targeted review needed'} in ${primary.chapterId || 'weak chapters'}.`;
      coachReason = "Based on low accuracy or repeated mistakes.";
    } else if (primary && primary.type === 'FULL_MOCK') {
      status = "MOCK_READY";
      coachTitle = "Validate your exam readiness";
      coachMessage = "You have consistent scores across subjects. Take a full mock to benchmark your AIR.";
      coachReason = "Based on solid practice evidence.";
    } else if (mockTrend === 'improving') {
      status = "PERFORMANCE_IMPROVING";
      coachTitle = "Excellent momentum!";
      coachMessage = "Your performance is improving. Keep up consistent practice to lock in score gains.";
      coachReason = "Based on recent attempts and streak.";
    }
  }

  return {
    hasData: processedActions.length > 0,
    evidence: {
      level: evidenceLevel,
      ...evidenceSummary
    },
    coachSummary: {
      status,
      title: coachTitle,
      message: coachMessage,
      reason: coachReason
    },
    plan: {
      estimatedMinutes: totalPlanMinutes,
      actionCount: processedActions.length,
      actions: processedActions
    }
  };
}

module.exports = { presentStudyCoach };
