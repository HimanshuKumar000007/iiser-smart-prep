const learningCatalog = require("../data/learningCatalog.json");
const slsAnalytics = require("./slsAnalytics");
const slsWeaknessEngine = require("./slsWeaknessEngine");
const slsMasteryEngine = require("./slsMasteryEngine");
const slsRecommendationEngine = require("./slsRecommendationEngine");
const slsRevisionEngine = require("./slsRevisionEngine");
const mockAnalytics = require("./mockAnalytics");
const mockLearningActions = require("./mockLearningActions");
const mockRecommendations = require("./mockRecommendations");
const studentActionOrchestrator = require("./studentActionOrchestrator");

const HERO_SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];

/**
 * Pure calculation helper to construct the Performance Insights response.
 * Receives all pre-fetched database records as inputs.
 */
function calculatePerformanceInsights({
  userObj,
  parentAttempts = [],
  questionAttempts = [],
  mockResults = [],
  mockQuestionAttempts = [],
  lessonSessions = [],
  revisions = [],
  daysUntilExam = 330,
  examLabel = "IISER IAT 2027",
  currentPhaseId = "FOUNDATION",
  sources = {}
}) {
  // 1. Calculate SLS indicators
  let slsAnalyticsRes = null;
  let weaknessRes = null;
  let masteryRes = null;
  let slsRecommendations = [];
  let revisionQueue = [];
  
  if (sources.sls === "available") {
    try {
      slsAnalyticsRes = slsAnalytics.aggregateMetrics(parentAttempts, questionAttempts);
      weaknessRes = slsWeaknessEngine.analyzeWeaknesses(slsAnalyticsRes);
      masteryRes = slsMasteryEngine.generateMasteryStates(slsAnalyticsRes, weaknessRes, parentAttempts, learningCatalog);
      slsRecommendations = slsRecommendationEngine.generateRecommendations(slsAnalyticsRes, weaknessRes, learningCatalog)?.recommendations || [];
      revisionQueue = slsRevisionEngine.buildRevisionQueue(
        masteryRes.mastery,
        slsRecommendations,
        Date.now()
      );
    } catch (err) {
      console.error("[PerformanceInsightsService] SLS engine error:", err);
      sources.sls = "error";
    }
  }

  // 2. Calculate Mock indicators
  let mockAnalyticsRes = null;
  let mockLearningActionsRes = [];
  let mockRecs = null;

  if (sources.mock === "available") {
    try {
      mockAnalyticsRes = mockAnalytics.calculateAnalytics(mockResults, mockQuestionAttempts);
      mockLearningActionsRes = mockLearningActions.calculateLearningActions(mockQuestionAttempts)?.learningActions || [];
      mockRecs = mockRecommendations.calculateMockRecommendations({
        results: mockResults,
        attempts: mockQuestionAttempts,
        analytics: mockAnalyticsRes,
        learningActions: mockLearningActionsRes
      });
    } catch (err) {
      console.error("[PerformanceInsightsService] Mock engine error:", err);
      sources.mock = "error";
    }
  }

  // 3. Build Action Plan
  let actionPlan = null;
  try {
    actionPlan = studentActionOrchestrator.buildStudentActionPlan({
      slsRecommendations,
      revisionQueue,
      mockRecommendations: mockRecs,
      mockLearningActions: mockLearningActionsRes,
      slsMastery: masteryRes?.mastery || [],
      activeLessons: lessonSessions,
      mockAttemptsCount: mockResults.length,
      evidence: {
        quizAttempts: parentAttempts,
        mockResults,
        lessonSessions,
        revisions
      }
    });
  } catch (err) {
    console.error("[PerformanceInsightsService] Orchestration error:", err);
    sources.orchestrator = "error";
  }

  // 4. Questions Solved definition: unique chapter quiz question attempts + mock question attempts
  const uniqueSlsQuestions = new Set(questionAttempts.filter(q => q && q.question_id).map(q => `${q.chapter_id || 'ch'}_${q.question_id}`));
  const uniqueMockQuestions = new Set(mockQuestionAttempts.filter(q => q && q.question_id).map(q => `${q.mock_id || q.mock_title || 'mock'}_${q.question_id}`));
  const questionsSolved = uniqueSlsQuestions.size + uniqueMockQuestions.size;

  // 5. Calculate Streak
  let streak_days = 0;
  const allResults = [...mockResults];
  parentAttempts.forEach(pa => {
    if (pa.created_at || pa.started_at) {
      allResults.push({ created_at: pa.created_at || pa.started_at });
    }
  });
  
  const dates = new Set();
  allResults.forEach(r => {
    const val = r.created_at || r.started_at;
    if (val) {
      try {
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
          dates.add(d.toISOString().split('T')[0]);
        }
      } catch (e) {
        // Safe skip invalid dates
      }
    }
  });

  if (dates.size > 0) {
    const sortedDates = Array.from(dates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr) {
      let currentDate = new Date(sortedDates[0]);
      while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (dates.has(dateStr)) {
          streak_days++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  // 6. Lesson completions map
  const completedSet = new Set();
  lessonSessions.forEach(l => {
    if (l.status === 'completed' || l.status === undefined) {
      completedSet.add(l.chapter_id || l.id);
    }
  });
  mockResults.forEach(r => {
    if (r.mock_title === 'SMART_LESSON' || (r.mock_id && r.mock_id.startsWith('lesson_'))) {
      completedSet.add(r.mock_id);
    }
  });

  const lessonsCompleted = { Physics: 0, Chemistry: 0, Mathematics: 0, Biology: 0 };
  const lessonsTotal = { Physics: 0, Chemistry: 0, Mathematics: 0, Biology: 0 };
  const catalogArray = Object.values(learningCatalog || {});
  
  catalogArray.forEach(lesson => {
    const subject = lesson.subject;
    if (lessonsTotal[subject] !== undefined) {
      lessonsTotal[subject]++;
      if (completedSet.has(lesson.chapterId)) {
        lessonsCompleted[subject]++;
      }
    }
  });

  const subjectMap = {};
  HERO_SUBJECTS.forEach(s => {
    const total = lessonsTotal[s] || 1;
    const done = lessonsCompleted[s] || 0;
    subjectMap[s] = Math.round((done / total) * 100);
  });

  // 7. Readiness (Calculated dynamically using mock history and quiz performance metrics)
  let totalCorrectQuizzes = 0;
  let totalQuestionsQuizzes = 0;
  parentAttempts.forEach(pa => {
    totalCorrectQuizzes += (pa.correct_answers || pa.correct || 0);
    totalQuestionsQuizzes += (pa.total_questions || 0);
  });
  const quizAccuracy = totalQuestionsQuizzes > 0 ? (totalCorrectQuizzes / totalQuestionsQuizzes) * 100 : null;

  const lessonReadiness = HERO_SUBJECTS.reduce((sum, s) => sum + (subjectMap[s] ?? 0), 0) / HERO_SUBJECTS.length;
  const baselineReadiness = quizAccuracy !== null ? quizAccuracy : lessonReadiness;
  
  let readinessScore = 0;
  if (mockResults.length > 0) {
    const latestMock = mockResults[mockResults.length - 1];
    const answered = latestMock.correct + latestMock.wrong;
    const latestMockAccuracy = answered > 0 ? (latestMock.correct / answered) * 100 : (latestMock.score || 0);
    
    const avgMockAccuracy = mockResults.reduce((sum, r) => {
      const ans = r.correct + r.wrong;
      const acc = ans > 0 ? (r.correct / ans) * 100 : (r.score || 0);
      return sum + acc;
    }, 0) / mockResults.length;
    
    // Composite readiness: 50% latest mock accuracy, 30% average mock accuracy, 20% baseline quiz/lesson readiness
    readinessScore = Math.round(latestMockAccuracy * 0.5 + avgMockAccuracy * 0.3 + baselineReadiness * 0.2);
  } else {
    readinessScore = Math.round(baselineReadiness);
  }

  // 8. Subject Performance
  const subjectPerformance = HERO_SUBJECTS.map(subj => {
    const subjectLessons = catalogArray.filter(l => l.subject === subj);
    const subjectLessonIds = new Set(subjectLessons.map(l => l.chapterId || l.id).filter(Boolean));
    const subjAttempts = parentAttempts.filter(pa => pa && (pa.subject === subj || (pa.chapter_id && subjectLessonIds.has(pa.chapter_id))));
    
    let score = 0;
    let status = 'NO EVIDENCE';
    let attemptedChapters = 0;
    let masteredChapters = 0;

    if (subjAttempts.length > 0) {
      const totalCorrect = subjAttempts.reduce((sum, a) => sum + (a.correct_answers || a.correct || 0), 0);
      const totalQ = subjAttempts.reduce((sum, a) => sum + (a.total_questions || 0), 0);
      score = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

      const subjectMastery = (masteryRes?.mastery || []).filter(m => m.subject === subj);
      attemptedChapters = subjectMastery.filter(m => m.attemptCount > 0).length;
      masteredChapters = subjectMastery.filter(m => m.state === 'MASTERED' || m.state === 'STRONG').length;

      if (score >= 75) status = 'STRONG';
      else if (score >= 50) status = 'DEVELOPING';
      else status = 'NEEDS ATTENTION';
    } else {
      score = subjectMap[subj] || 0;
      status = score > 0 ? 'BUILDING EVIDENCE' : 'NO EVIDENCE';
    }

    return {
      name: subj,
      score,
      status,
      attemptedChapters,
      masteredChapters
    };
  });

  // 9. Improvement Opportunities (Replacing Marks Recovery)
  const improvementOpportunities = (masteryRes?.mastery || [])
    .filter(m => m.attemptCount > 0 && (m.state === 'WEAK' || m.state === 'LEARNING' || m.masteryScore < 60))
    .sort((a, b) => a.masteryScore - b.masteryScore)
    .slice(0, 3)
    .map(m => {
      let severity = 'MEDIUM';
      if (m.masteryScore < 40) severity = 'CRITICAL';
      else if (m.masteryScore < 55) severity = 'HIGH';
      
      return {
        chapterId: m.chapterId,
        chapterTitle: m.chapterTitle,
        subject: m.subject,
        score: m.masteryScore,
        severity,
        reason: `Accuracy at ${m.latestAttemptAccuracy}% across ${m.attemptCount} assessment attempts.`
      };
    });

  // 10. Performance Trend (Combine mock results & quiz attempts chronologically)
  const trendPoints = [];
  // Mock test points
  mockResults.forEach((mr, idx) => {
    trendPoints.push({
      name: mr.mock_title || `Mock #${idx + 1}`,
      accuracy: mr.total_questions > 0 ? Math.round(((mr.correct || 0) / mr.total_questions) * 100) : mr.score,
      date: new Date(mr.created_at).getTime(),
      type: 'Mock'
    });
  });
  // Quiz points (only if mocks are few)
  if (mockResults.length < 5) {
    parentAttempts.forEach(pa => {
      if (!pa) return;
      const matched = catalogArray.find(c => (c.chapterId || c.id) === pa.chapter_id);
      const rawTitle = matched?.chapterTitle || matched?.title || pa.chapter_id || pa.subject || "Practice Quiz";
      const chapterTitle = String(rawTitle);
      const dateVal = pa.created_at || pa.started_at;
      const parsedDate = dateVal ? new Date(dateVal).getTime() : Date.now();
      trendPoints.push({
        name: chapterTitle.length > 12 ? chapterTitle.substring(0, 12) + "..." : chapterTitle,
        accuracy: typeof pa.accuracy === 'number' && !isNaN(pa.accuracy) ? pa.accuracy : 0,
        date: isNaN(parsedDate) ? Date.now() : parsedDate,
        type: 'Quiz'
      });
    });
  }

  // Sort chronologically and limit to 10 points
  const sortedPoints = trendPoints
    .filter(pt => pt && !isNaN(pt.date))
    .sort((a, b) => a.date - b.date)
    .slice(-10)
    .map(pt => ({
      name: new Date(pt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      accuracy: typeof pt.accuracy === 'number' && !isNaN(pt.accuracy) ? pt.accuracy : 0,
      type: pt.type
    }));

  let trendDirection = 'INSUFFICIENT_DATA';
  if (sortedPoints.length >= 2) {
    const half = Math.max(1, Math.floor(sortedPoints.length / 2));
    const firstHalfAvg = sortedPoints.slice(0, half).reduce((s, m) => s + m.accuracy, 0) / half;
    const secondHalfAvg = sortedPoints.slice(-half).reduce((s, m) => s + m.accuracy, 0) / half;
    const diff = secondHalfAvg - firstHalfAvg;
    
    if (diff >= 3) trendDirection = 'IMPROVING';
    else if (diff <= -3) trendDirection = 'DECLINING';
    else trendDirection = 'STABLE';
  }

  // 11. Weak / Strong Topics
  const weakTopics = (masteryRes?.mastery || [])
    .filter(m => m.state === 'WEAK' || m.state === 'LEARNING')
    .slice(0, 3)
    .map(m => ({ topic: m.chapterTitle, accuracy: `${m.latestAttemptAccuracy}%` }));
    
  const strongTopics = (masteryRes?.mastery || [])
    .filter(m => m.state === 'MASTERED' || m.state === 'STRONG')
    .slice(0, 3)
    .map(m => ({ topic: m.chapterTitle, accuracy: `${m.latestAttemptAccuracy}%` }));

  // 12. Latest Mock
  const latestMockObj = mockResults.length > 0 ? mockResults[mockResults.length - 1] : null;

  // 13. Deterministic Key Insights
  const insights = [];
  const mathPerf = subjectPerformance.find(s => s.name === 'Mathematics');
  const bioPerf = subjectPerformance.find(s => s.name === 'Biology');
  if (streak_days >= 3) {
    insights.push({
      type: "HABIT",
      message: `Consistent study habit active! Current learning streak at ${streak_days} days.`,
      evidenceSource: "STUDY_STREAK"
    });
  }
  if (mathPerf && mathPerf.score < 50 && mathPerf.status !== 'NO EVIDENCE') {
    insights.push({
      type: "WARNING",
      message: "Mathematics accuracy is currently below target thresholds. Focus on recommended learning actions.",
      evidenceSource: "SUBJECT_PERFORMANCE"
    });
  }
  if (bioPerf && bioPerf.score >= 75) {
    insights.push({
      type: "STRENGTH",
      message: "Strong performance detected in Biology. Keep solving PYQs to maintain active recall.",
      evidenceSource: "SUBJECT_PERFORMANCE"
    });
  }
  if (mockResults.length >= 2) {
    const prev = mockResults[mockResults.length - 2];
    const cur = mockResults[mockResults.length - 1];
    if (cur.score > prev.score) {
      insights.push({
        type: "IMPROVEMENT",
        message: `Your latest mock score of ${cur.score} represents an improvement over your previous test score (${prev.score}).`,
        evidenceSource: "MOCK_RESULTS"
      });
    }
  }
  if (insights.length === 0) {
    insights.push({
      type: "ONBOARDING",
      message: "Complete more chapter quizzes and practice mocks to unlock personalized study insights.",
      evidenceSource: "SYSTEM_INITIALIZATION"
    });
  }

  // 14. Gated/locked properties based on evidence count
  const totalMocksCompleted = mockResults.length;
  const evidenceLevel = questionAttempts.length + mockQuestionAttempts.length >= 20 ? 'SUFFICIENT' : 'BUILDING_EVIDENCE';

  return {
    overview: {
      readiness: readinessScore,
      questionsSolved,
      mocksCompleted: totalMocksCompleted,
      studyStreak: streak_days
    },
    readiness: {
      current: readinessScore,
      target: 85,
      status: readinessScore >= 75 ? 'STRONG' : readinessScore >= 50 ? 'ON_TRACK' : 'BUILDING_EVIDENCE',
      gap: Math.max(0, 85 - readinessScore),
      evidenceLevel
    },
    subjectPerformance,
    performanceTrend: {
      dataPoints: sortedPoints,
      direction: trendDirection
    },
    latestMock: latestMockObj ? {
      id: latestMockObj.id,
      title: latestMockObj.mock_title,
      score: latestMockObj.score,
      correct: latestMockObj.correct,
      wrong: latestMockObj.wrong,
      totalQuestions: latestMockObj.total_questions,
      created_at: latestMockObj.created_at
    } : null,
    improvementOpportunities,
    weakTopics,
    strongTopics,
    targetTracker: {
      targetExam: examLabel,
      examDate: "7 June 2027",
      daysRemaining: daysUntilExam,
      currentPhaseId,
      currentReadiness: readinessScore,
      evidenceQuality: evidenceLevel
    },
    insights,
    recommendedActions: actionPlan ? {
      primaryAction: actionPlan.primaryAction,
      secondaryActions: actionPlan.secondaryActions || []
    } : null,
    generatedAt: new Date().toISOString(),
    sourceAvailability: {
      lessons: sources.lessonSessions,
      quizzes: sources.sls,
      mocks: sources.mock,
      sls: sources.sls,
      orchestrator: sources.orchestrator || "available"
    }
  };
}

module.exports = { calculatePerformanceInsights };
