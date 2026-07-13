const mockCatalog = require("../data/mockCatalog.json");

/**
 * Deterministic service that analyzes mock test history, analytics, and learning actions
 * to suggest the next best action and mock test.
 */
function calculateMockRecommendations({
  results = [],
  attempts = [],
  analytics = null,
  learningActions = []
}) {
  const totalMocks = results.length;
  
  // Calculate total attempted questions: attempts where selected_answer is not null/unanswered
  const attemptedQuestions = attempts.filter(
    att => att.selected_answer !== null && att.selected_answer !== undefined && att.selected_answer !== -1
  );
  const totalQuestionsAttempted = attemptedQuestions.length;

  // Default baseline metadata structure
  const metadata = {
    totalMocks,
    totalQuestionsAttempted,
    latestAccuracy: null,
    trend: "insufficient_history",
    weakestSubject: null,
    strongestSubject: null
  };

  if (analytics && analytics.hasData) {
    metadata.latestAccuracy = analytics.overall?.latestScore !== undefined
      ? Number(((analytics.overall.latestScore / 60) * 100).toFixed(1))
      : null;
    metadata.trend = analytics.progress?.trend || "insufficient_history";
    metadata.weakestSubject = analytics.weakestSubject || null;
    metadata.strongestSubject = analytics.strongestSubject || null;
  }

  // 1. NO DATA (Scenario A)
  if (totalMocks === 0) {
    const recommendedMock = mockCatalog[0] || null;
    return {
      success: true,
      hasData: false,
      evidenceState: "NO_DATA",
      recommendationType: "START_FIRST_MOCK",
      recommendedMock,
      primaryAction: {
        type: "START_MOCK",
        title: "Start First Mock",
        description: "Take your first full mock to establish your performance baseline.",
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "BASELINE", message: "Take your first full mock to establish your performance baseline." },
        { type: "UNLOCK_ANALYTICS", message: "Your results will unlock personalized analytics." },
        { type: "DISCOVER_WEAKNESS", message: "Complete the test to discover subjects and chapters that need attention." }
      ],
      potentialImprovement: null,
      confidence: "LOW",
      metadata
    };
  }

  // Find latest attempt details
  const latestResult = results[results.length - 1];
  const latestMockId = latestResult.mock_id;
  const latestMockTitle = latestResult.mock_title || `Mock #${latestMockId}`;
  
  // Find recommended mock using catalog
  // Priority: 
  // - If retaking is preferred (INSUFFICIENT or LIMITED): latestMockId
  // - If progressing: first unattempted mock
  // - If all attempted: mock with lowest score/accuracy from history
  const attemptedMockIds = new Set(results.map(r => r.mock_id));
  let recommendedMockItem = mockCatalog.find(m => !attemptedMockIds.has(m.id)) || null;
  if (!recommendedMockItem && mockCatalog.length > 0) {
    // If all mocks attempted, select the one with the lowest score
    let lowestScore = Infinity;
    let lowestMockId = mockCatalog[0].id;
    const mockBestScores = {};
    for (const res of results) {
      if (mockBestScores[res.mock_id] === undefined || res.score < mockBestScores[res.mock_id]) {
        mockBestScores[res.mock_id] = res.score;
      }
    }
    for (const mock of mockCatalog) {
      const bestScore = mockBestScores[mock.id] ?? 0;
      if (bestScore < lowestScore) {
        lowestScore = bestScore;
        lowestMockId = mock.id;
      }
    }
    recommendedMockItem = mockCatalog.find(m => m.id === lowestMockId) || mockCatalog[0];
  }

  // Latest mock item helper for CTAs
  const latestMockItem = mockCatalog.find(m => m.id === latestMockId) || {
    id: latestMockId,
    title: latestMockTitle,
    duration: 180,
    questions: 60,
    difficulty: latestResult.difficulty || "Medium"
  };

  const latestAttemptedCount = (latestResult.correct || 0) + (latestResult.wrong || 0);

  if (latestAttemptedCount === 0) {
    return {
      success: true,
      hasData: true,
      evidenceState: totalQuestionsAttempted < 20 ? "INSUFFICIENT" : "SUFFICIENT",
      recommendationType: "COMPLETE_MORE_QUESTIONS",
      recommendedMock: latestMockItem,
      primaryAction: {
        type: "RETAKE_MOCK",
        title: "Retake Mock",
        description: `No questions were attempted in your latest mock. Retake ${latestMockTitle} to build analytics evidence.`,
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "ZERO_ATTEMPTS", message: "No questions were attempted in your latest mock." },
        { type: "BUILD_INSIGHTS", message: "Complete more questions to generate meaningful performance insights." },
        { type: "NEED_EVIDENCE", message: "Personalized chapter recommendations require actual answer evidence." }
      ],
      potentialImprovement: null,
      confidence: "LOW",
      metadata
    };
  }
  // 3. LIMITED evidence (Scenario C)
  if (totalQuestionsAttempted < 20) {
    return {
      success: true,
      hasData: true,
      evidenceState: "LIMITED",
      recommendationType: "COMPLETE_MORE_QUESTIONS",
      recommendedMock: latestMockItem, // prefer retaking the latest mock to build evidence
      primaryAction: {
        type: "RETAKE_MOCK",
        title: "Retake Mock",
        description: `Retake ${latestMockTitle} to collect enough evidence for personalization.`,
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "LIMITED_EVIDENCE", message: `You have limited evidence because only ${totalQuestionsAttempted} questions have been attempted.` },
        { type: "BUILD_INSIGHTS", message: "Complete more questions to generate meaningful performance insights." },
        { type: "NEED_EVIDENCE", message: "Personalized recommendations require actual answer evidence." }
      ],
      potentialImprovement: null,
      confidence: "LOW",
      metadata
    };
  }

  // Now we have SUFFICIENT evidence (totalQuestionsAttempted >= 20)
  const evidenceState = "SUFFICIENT";
  const trend = metadata.trend;

  // Extract latest attempt accuracy
  const latestAccuracy = latestResult.total_questions > 0 
    ? (latestResult.correct / latestResult.total_questions) * 100 
    : 0;

  // Determine top learning action (if any) from learningActions list
  // Ignore fallback CONTINUE_MOCK_PRACTICE action with chapterId === "all"
  const validActions = (learningActions || []).filter(act => act.chapterId && act.chapterId !== "all" && act.actionType === "REVISE_CHAPTER");
  const topWeakChapter = validActions.length > 0 ? validActions[0] : null;

  // 4. Perfect performance (Scenario K)
  if (latestResult.correct === 60 && totalQuestionsAttempted >= 60) {
    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "ADVANCED_PRACTICE",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "TAKE_NEXT_MOCK",
        title: "Take Another Mock",
        description: "Excellent performance on your latest mock! Continue to test consistency.",
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "PERFECT_SCORE", message: "Excellent performance on your latest mock." },
        { type: "NO_WEAKNESS", message: "No significant weakness was detected." },
        { type: "TEST_CONSISTENCY", message: "Continue with another mock to test consistency." }
      ],
      potentialImprovement: null,
      confidence: "HIGH",
      metadata
    };
  }

  // 5. Strong performance (Scenario J)
  if (latestAccuracy >= 85 && !topWeakChapter) {
    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "TAKE_NEXT_MOCK",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "TAKE_NEXT_MOCK",
        title: "Take Next Mock",
        description: "Your latest mock performance is strong. Continue practicing to build consistency.",
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "STRONG_PERFORMANCE", message: "Your latest mock performance is strong." },
        { type: "NO_URGENT_WEAKNESS", message: "No major chapter weakness currently requires immediate revision." },
        { type: "BUILD_CONSISTENCY", message: "Continue with another mock to build consistency." }
      ],
      potentialImprovement: null,
      confidence: "HIGH",
      metadata
    };
  }

  // Find weakest subject details if it is truly weak (< 75% accuracy)
  let isSubjectWeak = false;
  let weakestSubjectAccuracy = 100;
  if (analytics && analytics.subjects && metadata.weakestSubject) {
    const subStat = analytics.subjects.find(s => s.subject === metadata.weakestSubject);
    if (subStat) {
      weakestSubjectAccuracy = subStat.accuracy;
      if (weakestSubjectAccuracy < 75.0) {
        isSubjectWeak = true;
      }
    }
  }

  // 6. Declining trend + valid high-priority chapter weakness (Scenario G)
  if (trend === "declining" && topWeakChapter) {
    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "REVISE_THEN_RETAKE",
      recommendedMock: latestMockItem, // suggest retaking latest mock to recover
      primaryAction: {
        type: "REVISE_CHAPTER",
        title: "Start Revision",
        description: `Revise ${topWeakChapter.chapterTitle} before retaking your mock.`,
        chapterId: topWeakChapter.chapterId,
        chapterTitle: topWeakChapter.chapterTitle,
        subject: topWeakChapter.subject
      },
      reasons: [
        { type: "DECLINING_PERFORMANCE", message: "Your recent mock performance has declined." },
        { type: "WEAK_CHAPTER", message: `${topWeakChapter.chapterTitle} is your highest-priority weak chapter.` },
        { type: "REVISE_CTA", message: `Reviewing it before retaking ${latestMockTitle} may improve performance.` }
      ],
      potentialImprovement: null, // As requested: return null rather than displaying a mathematically weak estimate
      confidence: "HIGH",
      metadata
    };
  }

  // 7. Valid high-priority chapter weakness (Scenario D & E)
  if (topWeakChapter) {
    const reasons = [
      { type: "WEAK_CHAPTER", message: `${topWeakChapter.chapterTitle} is your highest-priority weak chapter.` },
      { type: "CHAPTER_ACCURACY", message: `Your accuracy in this chapter is ${topWeakChapter.accuracy}%.` }
    ];
    if (isSubjectWeak) {
      reasons.push({ type: "WEAK_SUBJECT", message: `${metadata.weakestSubject} is currently your weakest subject at ${Math.round(weakestSubjectAccuracy)}% accuracy.` });
    } else {
      reasons.push({ type: "REVISE_CTA", message: `Reviewing this chapter before your next mock may improve performance.` });
    }

    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "REVISE_THEN_CONTINUE",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "REVISE_CHAPTER",
        title: "Start Revision",
        description: `Revise ${topWeakChapter.chapterTitle} before your next mock.`,
        chapterId: topWeakChapter.chapterId,
        chapterTitle: topWeakChapter.chapterTitle,
        subject: topWeakChapter.subject
      },
      reasons,
      potentialImprovement: null,
      confidence: "HIGH",
      metadata
    };
  }

  // 8. Improving trend without blocking weakness (Scenario I)
  if (trend === "improving") {
    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "TAKE_NEXT_MOCK",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "TAKE_NEXT_MOCK",
        title: "Start Recommended Mock",
        description: "Continue building consistency with the next full mock.",
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "IMPROVING_TREND", message: "Your recent mock performance is improving." },
        { type: "CONTINUE_MOCK", message: "Continue building consistency with the next full mock." },
        { type: "LATEST_SCORE", message: `Your latest mock score is ${latestResult.score} / 60.` }
      ],
      potentialImprovement: null,
      confidence: "MEDIUM",
      metadata
    };
  }

  // 9. Stable weak performance (Scenario H)
  if (trend === "stable" && latestAccuracy < 70) {
    const reasons = [
      { type: "STABLE_PERFORMANCE", message: "Your overall mock performance trend is stable." }
    ];
    if (isSubjectWeak) {
      reasons.push({ type: "WEAK_SUBJECT", message: `${metadata.weakestSubject} is currently your weakest subject at ${Math.round(weakestSubjectAccuracy)}% accuracy.` });
    }
    reasons.push({ type: "CONTINUE_PRACTICE", message: "Practice another mock to identify specific chapter focus areas." });

    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "CONTINUE_MOCK_PRACTICE",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "TAKE_NEXT_MOCK",
        title: "Take Recommended Mock",
        description: "Continue practicing to discover chapter-level strengths and weaknesses.",
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: reasons.slice(0, 3),
      potentialImprovement: null,
      confidence: "MEDIUM",
      metadata
    };
  }

  // 10. Weak subject without valid chapter evidence (Scenario F)
  if (isSubjectWeak) {
    return {
      success: true,
      hasData: true,
      evidenceState,
      recommendationType: "CONTINUE_MOCK_PRACTICE",
      recommendedMock: recommendedMockItem,
      primaryAction: {
        type: "TAKE_NEXT_MOCK",
        title: "Take Recommended Mock",
        description: `Improve your performance in ${metadata.weakestSubject} by practicing another mock.`,
        chapterId: null,
        chapterTitle: null,
        subject: null
      },
      reasons: [
        { type: "WEAK_SUBJECT", message: `${metadata.weakestSubject} currently has your lowest attempted-question accuracy at ${Math.round(weakestSubjectAccuracy)}%.` },
        { type: "NEED_CHAPTER_EVIDENCE", message: "More chapter-level evidence is needed for a specific revision recommendation." },
        { type: "CONTINUE_MOCK", message: "Continue practicing to improve recommendation confidence." }
      ],
      potentialImprovement: null,
      confidence: "MEDIUM",
      metadata
    };
  }

  // 11. General continued mock practice fallback (Scenario K fallback)
  return {
    success: true,
    hasData: true,
    evidenceState,
    recommendationType: "CONTINUE_MOCK_PRACTICE",
    recommendedMock: recommendedMockItem,
    primaryAction: {
      type: "TAKE_NEXT_MOCK",
      title: "Take Recommended Mock",
      description: "Continue practicing with available full mock tests to track your progress.",
      chapterId: null,
      chapterTitle: null,
      subject: null
    },
    reasons: [
      { type: "CONTINUE_PRACTICE", message: "Keep practicing with mock tests under exam conditions." },
      { type: "TRACK_PROGRESS", message: "Your attempts will continue building your performance history." },
      { type: "BASELINE_OK", message: "Review previous results inside the history tab to check detailed explanations." }
    ],
    potentialImprovement: null,
    confidence: "MEDIUM",
    metadata
  };
}

module.exports = { calculateMockRecommendations };
