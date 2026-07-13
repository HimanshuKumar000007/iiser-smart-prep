const learningCatalog = require("../data/learningCatalog.json");

/**
 * Deterministic service that analyzes mock question attempts to produce smart learning actions.
 */
function calculateLearningActions(attempts) {
  // Zero-data check
  if (!attempts || attempts.length === 0) {
    return {
      success: true,
      hasData: false,
      learningActions: [],
      summary: {
        totalActions: 0,
        highPriorityCount: 0,
        needsReviewCount: 0,
        keepPracticingCount: 0
      }
    };
  }

  // 1. Group by Chapter
  const chapterGroups = {};
  for (const att of attempts) {
    const chapterId = att.chapter_id;
    if (!chapterId) continue;

    // Catalog validation - skip unrecognized chapter IDs safely
    const catalogItem = learningCatalog[chapterId];
    if (!catalogItem) continue;

    if (!chapterGroups[chapterId]) {
      chapterGroups[chapterId] = {
        chapterId,
        chapterTitle: catalogItem.chapterTitle,
        subject: catalogItem.subject,
        totalQuestions: 0,
        correct: 0,
        wrong: 0,
        skipped: 0,
        totalTime: 0,
        answeredCount: 0,
        mockIdsSet: new Set()
      };
    }

    const group = chapterGroups[chapterId];
    group.totalQuestions++;
    
    if (att.mock_result_id) {
      group.mockIdsSet.add(att.mock_result_id);
    }

    const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
    if (isSkipped) {
      group.skipped++;
    } else {
      if (att.is_correct) {
        group.correct++;
      } else {
        group.wrong++;
      }
      group.totalTime += (att.time_taken_seconds || 0);
      group.answeredCount++;
    }
  }

  const allChapters = Object.values(chapterGroups).map(g => {
    const accuracy = g.answeredCount > 0 ? Number(((g.correct / g.answeredCount) * 100).toFixed(1)) : 0.0;
    const averageTimeSeconds = g.answeredCount > 0 ? Number((g.totalTime / g.answeredCount).toFixed(1)) : 0.0;
    return {
      ...g,
      accuracy,
      averageTimeSeconds,
      mockCount: g.mockIdsSet.size
    };
  });

  // 2. Evidence Threshold check (>= 3 questions)
  const evaluatedChapters = allChapters.filter(c => c.totalQuestions >= 3);

  if (evaluatedChapters.length === 0) {
    // Fallback: Mock data exists, but we have insufficient evidence on any single chapter to recommend revision
    return {
      success: true,
      hasData: true,
      learningActions: [
        {
          id: "mock-action::continue-practice",
          actionType: "CONTINUE_MOCK_PRACTICE",
          chapterId: "all",
          chapterTitle: "All Syllabus",
          subject: "Mixed",
          totalQuestions: 0,
          correct: 0,
          wrong: 0,
          skipped: 0,
          accuracy: 100.0,
          evidenceLevel: "high",
          priorityScore: 0,
          reasonCode: "BUILD_MORE_EVIDENCE"
        }
      ],
      summary: {
        totalActions: 1,
        highPriorityCount: 0,
        needsReviewCount: 0,
        keepPracticingCount: 0
      }
    };
  }

  // 3. Weak chapters evaluation & actions generation
  const actions = [];
  let highPriorityCount = 0;
  let needsReviewCount = 0;
  let keepPracticingCount = 0;

  for (const ch of evaluatedChapters) {
    let category = "STRONG";
    let actionType = null;
    let reasonCode = null;

    if (ch.accuracy < 50.0) {
      category = "HIGH_PRIORITY";
      actionType = "REVISE_CHAPTER";
      reasonCode = "LOW_MOCK_ACCURACY";
      highPriorityCount++;
    } else if (ch.accuracy >= 50.0 && ch.accuracy < 70.0) {
      category = "NEEDS_REVIEW";
      actionType = "PRACTICE_CHAPTER";
      reasonCode = "LOW_MOCK_ACCURACY";
      needsReviewCount++;
    } else if (ch.accuracy >= 70.0 && ch.accuracy < 85.0) {
      category = "KEEP_PRACTICING";
      actionType = "PRACTICE_CHAPTER";
      reasonCode = "LOW_MOCK_ACCURACY";
      keepPracticingCount++;
    }

    if (category === "STRONG") {
      continue; // Skip strong performance chapters
    }

    // Evidence contribution
    let evidenceLevel = "low";
    let evidenceContribution = 5;
    if (ch.totalQuestions >= 12) {
      evidenceLevel = "high";
      evidenceContribution = 20;
    } else if (ch.totalQuestions >= 6) {
      evidenceLevel = "medium";
      evidenceContribution = 12;
    }

    // Priority Score formula: (100 - accuracy) * 0.8 + evidenceContribution
    const accuracyContribution = (100.0 - ch.accuracy) * 0.8;
    const priorityScore = Math.min(100, Math.max(0, Math.round(accuracyContribution + evidenceContribution)));

    actions.push({
      id: `mock-action::${ch.chapterId}`,
      actionType,
      chapterId: ch.chapterId,
      chapterTitle: ch.chapterTitle,
      subject: ch.subject,
      totalQuestions: ch.totalQuestions,
      correct: ch.correct,
      wrong: ch.wrong,
      skipped: ch.skipped,
      accuracy: ch.accuracy,
      evidenceLevel,
      priorityScore,
      reasonCode,
      mockCount: ch.mockCount
    });
  }

  // 4. Fallback: Checked chapters have sufficient evidence, but all are STRONG
  if (actions.length === 0) {
    return {
      success: true,
      hasData: true,
      learningActions: [
        {
          id: "mock-action::continue-practice",
          actionType: "CONTINUE_MOCK_PRACTICE",
          chapterId: "all",
          chapterTitle: "All Syllabus",
          subject: "Mixed",
          totalQuestions: 0,
          correct: 0,
          wrong: 0,
          skipped: 0,
          accuracy: 100.0,
          evidenceLevel: "high",
          priorityScore: 0,
          reasonCode: "STRONG_MOCK_PERFORMANCE"
        }
      ],
      summary: {
        totalActions: 1,
        highPriorityCount: 0,
        needsReviewCount: 0,
        keepPracticingCount: 0
      }
    };
  }

  // 5. Deterministic sorting
  // priorityScore DESC
  // evidence rank DESC (high = 3, medium = 2, low = 1)
  // chapterId ASC
  const getEvidenceRank = (lvl) => {
    if (lvl === "high") return 3;
    if (lvl === "medium") return 2;
    return 1;
  };

  actions.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    const rankDiff = getEvidenceRank(b.evidenceLevel) - getEvidenceRank(a.evidenceLevel);
    if (rankDiff !== 0) {
      return rankDiff;
    }
    return a.chapterId.localeCompare(b.chapterId);
  });

  // Limit to maximum of 5 learning actions
  const limitedActions = actions.slice(0, 5);

  return {
    success: true,
    hasData: true,
    learningActions: limitedActions,
    summary: {
      totalActions: limitedActions.length,
      highPriorityCount,
      needsReviewCount,
      keepPracticingCount
    }
  };
}

module.exports = { calculateLearningActions };
