const { createClient } = require("@supabase/supabase-js");
const learningCatalog = require("../data/learningCatalog.json");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Helper: Format Seconds to Human Readable String ───────────────────────
function formatSeconds(sec) {
  if (sec === null || sec === undefined || isNaN(sec) || sec < 0) return '—';
  if (sec === 0) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  if (m === 0) return `${s} sec`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

// ─── Helper: Calculate Percentile ──────────────────────────────────────────
function getPercentile(arr, p) {
  if (!arr || arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

async function analyzeMockResult(userId, resultId) {
  if (!userId) {
    throw { status: 401, message: "Unauthorized" };
  }
  if (!resultId) {
    throw { status: 400, message: "Missing resultId" };
  }

  // 1. Fetch current mock result
  const { data: currentResult, error: currentError } = await supabase
    .from("mock_results")
    .select("*")
    .eq("id", resultId)
    .maybeSingle();

  if (currentError) throw currentError;
  if (!currentResult) {
    throw { status: 404, message: "Mock result not found." };
  }

  // Check ownership
  if (currentResult.user_id !== userId) {
    throw { status: 404, message: "Mock result not found." };
  }

  // 2. Fetch question attempts for this result
  const { data: attempts, error: attemptsError } = await supabase
    .from("mock_question_attempts")
    .select("*")
    .eq("mock_result_id", resultId)
    .order("question_order", { ascending: true });

  if (attemptsError) throw attemptsError;

  // 3. Fetch historical results for comparison (excluding the current one)
  const { data: history, error: historyError } = await supabase
    .from("mock_results")
    .select("*")
    .eq("user_id", userId)
    .neq("id", resultId)
    .order("created_at", { ascending: true });

  if (historyError) throw historyError;

  // ─── Calculations ─────────────────────────────────────────────────────────
  const totalQuestions = currentResult.total_questions || 60;
  const correct = currentResult.correct;
  const wrong = currentResult.wrong;
  const skipped = currentResult.skipped;
  const answeredQuestions = correct + wrong;
  const score = correct;
  const accuracy = answeredQuestions > 0 ? Number(((correct / answeredQuestions) * 100).toFixed(1)) : null;
  const coverage = totalQuestions > 0 ? Number(((answeredQuestions / totalQuestions) * 100).toFixed(1)) : null;
  const totalTimeSeconds = currentResult.time_taken || 0;
  const averageAnsweredTimeSeconds = answeredQuestions > 0 ? Math.round(totalTimeSeconds / answeredQuestions) : 0;

  // ─── Evidence State ───────────────────────────────────────────────────────
  const evidenceState = answeredQuestions === 0 ? "NONE" : answeredQuestions < 20 ? "LIMITED" : "SUFFICIENT";
  const evidenceMessage =
    evidenceState === "NONE"
      ? "No questions were attempted, so there isn't enough evidence to evaluate your performance."
      : evidenceState === "LIMITED"
      ? `You attempted ${answeredQuestions} of ${totalQuestions} questions. Complete more questions for a reliable performance evaluation.`
      : "You have completed enough questions for a reliable performance evaluation.";

  // ─── Performance Evaluation ───────────────────────────────────────────────
  let perfStatus = "NONE";
  let perfTitle = "Not Evaluated";
  let perfMessage = "No questions were attempted, so there isn't enough evidence to evaluate your performance.";

  if (evidenceState === "LIMITED") {
    perfStatus = "LIMITED";
    perfTitle = "Building Your Profile";
    const qWord = correct === 1 ? "question" : "questions";
    perfMessage = `You answered ${correct} ${qWord} correctly, but more questions are needed for a reliable performance evaluation.`;
  } else if (evidenceState === "SUFFICIENT") {
    if (accuracy >= 95) {
      perfStatus = "OUTSTANDING";
      perfTitle = "Outstanding";
      perfMessage = "Outstanding performance. Maintain consistency and continue challenging yourself with advanced practice.";
    } else if (accuracy >= 85) {
      perfStatus = "EXCELLENT";
      perfTitle = "Excellent";
      perfMessage = "Excellent performance. Focus on precision, time management, and your remaining weak areas.";
    } else if (accuracy >= 75) {
      perfStatus = "VERY_GOOD";
      perfTitle = "Very Good";
      perfMessage = "You have strong preparation. Continue refining weaker topics and reducing avoidable mistakes.";
    } else if (accuracy >= 65) {
      perfStatus = "GOOD";
      perfTitle = "Good";
      perfMessage = "You are making solid progress. Focused revision of weaker areas can improve consistency.";
    } else if (accuracy >= 50) {
      perfStatus = "FAIR";
      perfTitle = "Fair";
      perfMessage = "You have a working foundation. Strengthening weaker topics can produce meaningful score improvements.";
    } else if (accuracy >= 30) {
      perfStatus = "DEVELOPING";
      perfTitle = "Developing";
      perfMessage = "Your foundation is developing, but several concepts need more focused revision and practice.";
    } else {
      perfStatus = "NEEDS_IMPROVEMENT";
      perfTitle = "Needs Significant Improvement";
      perfMessage = "Your results show major concept gaps. Focus on your weakest areas before attempting the next full mock.";
    }
  }

  // ─── Subject Breakdown ────────────────────────────────────────────────────
  const subjectStats = {
    Physics: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Chemistry: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Mathematics: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Biology: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 }
  };

  attempts.forEach(att => {
    const sub = att.subject || "Physics";
    if (subjectStats[sub]) {
      const stats = subjectStats[sub];
      stats.totalQuestions++;
      const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
      if (isSkipped) {
        stats.skipped++;
      } else {
        if (att.is_correct) {
          stats.correct++;
        } else {
          stats.wrong++;
        }
        stats.totalTime += (att.time_taken_seconds || 0);
        stats.answeredCount++;
      }
    }
  });

  const subjectBreakdown = Object.entries(subjectStats).map(([subjName, s]) => {
    const subAcc = s.answeredCount > 0 ? Number(((s.correct / s.answeredCount) * 100).toFixed(1)) : null;
    const subCov = s.totalQuestions > 0 ? Number(((s.answeredCount / s.totalQuestions) * 100).toFixed(1)) : 0.0;
    const subEv = s.answeredCount === 0 ? "No Evidence" : s.answeredCount < 5 ? "Limited Evidence" : "Evaluated";
    return {
      subject: subjName,
      totalQuestions: s.totalQuestions,
      answeredQuestions: s.answeredCount,
      correct: s.correct,
      wrong: s.wrong,
      skipped: s.skipped,
      accuracy: subAcc,
      coverage: subCov,
      evidenceState: subEv
    };
  });

  // ─── Difficulty Breakdown ──────────────────────────────────────────────────
  const diffStats = {
    easy: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, answeredCount: 0 },
    medium: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, answeredCount: 0 },
    hard: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, answeredCount: 0 }
  };

  attempts.forEach(att => {
    const diff = (att.difficulty || "medium").toLowerCase();
    if (diffStats[diff]) {
      const stats = diffStats[diff];
      stats.totalQuestions++;
      const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
      if (isSkipped) {
        stats.skipped++;
      } else {
        if (att.is_correct) {
          stats.correct++;
        } else {
          stats.wrong++;
        }
        stats.answeredCount++;
      }
    }
  });

  const difficultyBreakdown = Object.entries(diffStats).map(([diffName, d]) => {
    const diffAcc = d.answeredCount > 0 ? Number(((d.correct / d.answeredCount) * 100).toFixed(1)) : null;
    const diffCov = d.totalQuestions > 0 ? Number(((d.answeredCount / d.totalQuestions) * 100).toFixed(1)) : 0.0;
    return {
      difficulty: diffName.charAt(0).toUpperCase() + diffName.slice(1),
      totalQuestions: d.totalQuestions,
      answeredQuestions: d.answeredCount,
      correct: d.correct,
      wrong: d.wrong,
      skipped: d.skipped,
      accuracy: diffAcc,
      coverage: diffCov
    };
  });

  // ─── Chapter Breakdown ────────────────────────────────────────────────────
  const chapterMap = {};
  attempts.forEach(att => {
    const chapId = att.chapter_id;
    if (!chapId) return;

    const catalogItem = learningCatalog[chapId];
    if (!catalogItem) return; // Only recognized chapters

    if (!chapterMap[chapId]) {
      chapterMap[chapId] = {
        chapterId: chapId,
        chapterTitle: catalogItem.chapterTitle,
        subject: catalogItem.subject,
        answeredQuestions: 0,
        correct: 0,
        wrong: 0,
        totalQuestions: 0
      };
    }
    const c = chapterMap[chapId];
    c.totalQuestions++;
    const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
    if (!isSkipped) {
      c.answeredQuestions++;
      if (att.is_correct) {
        c.correct++;
      } else {
        c.wrong++;
      }
    }
  });

  const chapterBreakdown = Object.values(chapterMap).map(c => {
    const chapAcc = c.answeredQuestions > 0 ? Number(((c.correct / c.answeredQuestions) * 100).toFixed(1)) : 0.0;
    let status = "INSUFFICIENT_EVIDENCE";
    if (c.answeredQuestions >= 3) {
      if (chapAcc < 50) status = "HIGH_PRIORITY";
      else if (chapAcc < 70) status = "NEEDS_REVIEW";
      else if (chapAcc < 85) status = "DEVELOPING";
      else status = "STRONG";
    }
    return {
      chapterId: c.chapterId,
      chapterTitle: c.chapterTitle,
      subject: c.subject,
      answeredQuestions: c.answeredQuestions,
      correct: c.correct,
      wrong: c.wrong,
      accuracy: chapAcc,
      status
    };
  });

  // Sort: HIGH_PRIORITY -> NEEDS_REVIEW -> DEVELOPING -> STRONG -> INSUFFICIENT_EVIDENCE
  const statusPriorityMap = {
    HIGH_PRIORITY: 1,
    NEEDS_REVIEW: 2,
    DEVELOPING: 3,
    STRONG: 4,
    INSUFFICIENT_EVIDENCE: 5
  };

  chapterBreakdown.sort((a, b) => {
    const pa = statusPriorityMap[a.status];
    const pb = statusPriorityMap[b.status];
    if (pa !== pb) return pa - pb;
    if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
    if (b.answeredQuestions !== a.answeredQuestions) return b.answeredQuestions - a.answeredQuestions;
    return a.chapterTitle.localeCompare(b.chapterTitle);
  });

  // ─── Weakest Chapter for Recommendations (min 3 answered) ─────────────────
  const weakestChapter = chapterBreakdown.find(c => c.status !== "INSUFFICIENT_EVIDENCE" && c.status !== "STRONG") || null;

  // ─── Recommended Action with Explainability Metadata ─────────────────────
  let recommendedAction = {};
  if (evidenceState === "NONE") {
    recommendedAction = {
      actionType: "BUILD_MORE_EVIDENCE",
      title: "Attempt the Mock Test",
      description: "Answer questions to begin building your performance profile.",
      ctaText: "Retake Mock",
      selectionReasonCode: "BUILD_MORE_EVIDENCE",
      selectionExplanation: "No questions were attempted, so no specific revision areas can be recommended."
    };
  } else if (evidenceState === "LIMITED") {
    recommendedAction = {
      actionType: "BUILD_MORE_EVIDENCE",
      title: "Build More Evidence",
      description: "Complete more questions before SmartPrep recommends specific revision areas.",
      ctaText: "Retake Mock",
      selectionReasonCode: "BUILD_MORE_EVIDENCE",
      selectionExplanation: `Selected because you attempted ${answeredQuestions} of ${totalQuestions} questions. Answer more questions to build a reliable performance profile.`
    };
  } else {
    // Sufficient Evidence
    if (weakestChapter) {
      // Deterministic explanation based on weakest chapter accuracy or mistake counts
      let selectionReasonCode = "SUFFICIENT_EVIDENCE_WEAKNESS";
      let selectionExplanation = "";

      if (weakestChapter.accuracy === 0) {
        selectionReasonCode = "HIGHEST_REVISION_PRIORITY";
        selectionExplanation = `Selected because you answered 0 of ${weakestChapter.answeredQuestions} questions correctly, giving this chapter the highest revision priority among evaluated chapters.`;
      } else {
        // Find if this is the highest mistake contributor
        const sortedByWrong = [...chapterBreakdown].sort((a, b) => b.wrong - a.wrong);
        if (sortedByWrong[0] && sortedByWrong[0].chapterId === weakestChapter.chapterId && weakestChapter.wrong > 0) {
          selectionReasonCode = "HIGH_MISTAKE_CONCENTRATION";
          selectionExplanation = `Selected because this chapter contributed the largest number of mistakes (${weakestChapter.wrong}) among chapters with sufficient evidence.`;
        } else {
          selectionReasonCode = "LOWEST_CHAPTER_ACCURACY";
          selectionExplanation = `Selected because you achieved lowest accuracy (${weakestChapter.accuracy}%) in this chapter, indicating a need for targeted review.`;
        }
      }

      recommendedAction = {
        actionType: "REVISE_CHAPTER",
        title: `Revise: ${weakestChapter.chapterTitle}`,
        description: "Your performance indicates that this chapter should be reviewed before your next mock.",
        ctaText: "Start Revision",
        chapterId: weakestChapter.chapterId,
        chapterTitle: weakestChapter.chapterTitle,
        subject: weakestChapter.subject,
        accuracy: weakestChapter.accuracy,
        answeredQuestions: weakestChapter.answeredQuestions,
        estimatedRevision: 20,
        selectionReasonCode,
        selectionExplanation
      };
    } else {
      // No weak chapters or all evaluated chapters are strong
      const allEvaluatedAreStrong = chapterBreakdown.filter(c => c.status !== "INSUFFICIENT_EVIDENCE").every(c => c.status === "STRONG");
      if (allEvaluatedAreStrong && chapterBreakdown.some(c => c.status !== "INSUFFICIENT_EVIDENCE")) {
        recommendedAction = {
          actionType: "TAKE_NEXT_MOCK",
          title: "Continue to Your Next Mock",
          description: "Your chapter-level performance is strong. Continue building exam experience.",
          ctaText: "Take Next Mock",
          selectionReasonCode: "STRONG_PERFORMANCE",
          selectionExplanation: "All evaluated chapters show strong performance. You are ready to proceed to the next mock."
        };
      } else {
        recommendedAction = {
          actionType: "CONTINUE_MOCK_PRACTICE",
          title: "Continue Practice",
          description: "Continue practicing mock tests to build stronger performance profiles.",
          ctaText: "Retake Mock",
          selectionReasonCode: "NEXT_MOCK_PROGRESSION",
          selectionExplanation: "Continue practicing mock tests to build stronger performance profiles."
        };
      }
    }
  }

  // ─── Pacing Percentiles & Outlier Analysis ────────────────────────────────
  const answeredTimes = attempts
    .filter(att => att.selected_answer !== null && att.selected_answer !== undefined && att.selected_answer !== -1)
    .map(att => att.time_taken_seconds || 0);

  const hasTime = answeredTimes.length > 0;
  
  let medianAnsweredTime = null;
  let p75AnsweredTime = null;
  let p90AnsweredTime = null;
  let outlierThreshold = null;
  let outlierQuestionCount = 0;

  if (hasTime) {
    medianAnsweredTime = Math.round(getPercentile(answeredTimes, 50));
    p75AnsweredTime = Math.round(getPercentile(answeredTimes, 75));
    p90AnsweredTime = Math.round(getPercentile(answeredTimes, 90));

    if (answeredTimes.length >= 4) {
      const q1 = getPercentile(answeredTimes, 25);
      const q3 = getPercentile(answeredTimes, 75);
      const iqr = q3 - q1;
      outlierThreshold = Math.round(q3 + (1.5 * iqr));
      outlierQuestionCount = answeredTimes.filter(t => t > outlierThreshold).length;
    }
  }

  // ─── Safe Time Insights ───────────────────────────────────────────────────
  const pacingInsights = [];
  const slowThreshold = outlierThreshold !== null ? outlierThreshold : (medianAnsweredTime !== null ? Math.max(30, medianAnsweredTime * 3) : 90);
  
  const answeredAttempts = attempts.filter(att => att.selected_answer !== null && att.selected_answer !== undefined && att.selected_answer !== -1);

  // Slow correct / incorrect lists sorted descending by time spent
  const slowIncorrectAttempts = answeredAttempts
    .filter(att => !att.is_correct && (att.time_taken_seconds || 0) > slowThreshold)
    .sort((a, b) => (b.time_taken_seconds || 0) - (a.time_taken_seconds || 0));

  const slowCorrectAttempts = answeredAttempts
    .filter(att => att.is_correct && (att.time_taken_seconds || 0) > slowThreshold)
    .sort((a, b) => (b.time_taken_seconds || 0) - (a.time_taken_seconds || 0));

  // Count fast incorrect responses
  const fastIncorrectThreshold = medianAnsweredTime !== null ? Math.max(10, medianAnsweredTime * 0.3) : 10;
  const fastIncorrectAttempts = answeredAttempts.filter(att => !att.is_correct && (att.time_taken_seconds || 0) < fastIncorrectThreshold);
  const fastIncorrectCount = fastIncorrectAttempts.length;

  if (answeredQuestions >= 5 && medianAnsweredTime !== null) {
    if (fastIncorrectCount >= 3) {
      pacingInsights.push({
        category: "time",
        type: "warning",
        text: `${fastIncorrectCount} incorrect responses were submitted significantly faster than your typical answering time. This pattern may be consistent with rapid guessing or insufficient question review.`
      });
    } else if (slowIncorrectAttempts.length > 0) {
      const worst = slowIncorrectAttempts[0];
      pacingInsights.push({
        category: "time",
        type: "warning",
        text: `Question ${worst.question_order} took ${formatSeconds(worst.time_taken_seconds)}, significantly longer than your typical response time. Review this question to determine whether the cause was difficulty, calculation time, or interruption.`
      });
    } else if (slowCorrectAttempts.length > 0) {
      const best = slowCorrectAttempts[0];
      pacingInsights.push({
        category: "time",
        type: "info",
        text: `You answered Question ${best.question_order} correctly, but it required significantly more time than your typical response (${formatSeconds(best.time_taken_seconds)}). Review your approach to see whether a faster solution method is available.`
      });
    } else {
      pacingInsights.push({
        category: "time",
        type: "success",
        text: "Your overall pacing is stable. Keep practicing to maintain your target speed."
      });
    }
  } else {
    pacingInsights.push({
      category: "time",
      type: "info",
      text: "Answer more questions to generate detailed speed and timing analytics."
    });
  }

  // ─── Insights Pushing ─────────────────────────────────────────────────────
  const insights = [];

  // Insight 1: Strongest subject
  const validSubjectsForInsight = subjectBreakdown.filter(s => s.answeredQuestions >= 5 && s.correct > 0);
  if (validSubjectsForInsight.length > 0) {
    const sortedSubjs = [...validSubjectsForInsight].sort((a, b) => b.accuracy - a.accuracy || a.subject.localeCompare(b.subject));
    const strongest = sortedSubjs[0];
    insights.push({
      category: "strength",
      type: "success",
      text: `${strongest.subject} was your strongest evaluated subject with ${strongest.accuracy}% accuracy across ${strongest.answeredQuestions} answered questions.`
    });
  } else {
    insights.push({
      category: "strength",
      type: "info",
      text: "Answer more questions across subjects to identify reliable strengths."
    });
  }

  // Insight 2: Mistakes / Coverage
  if (evidenceState === "LIMITED") {
    insights.push({
      category: "coverage",
      type: "warning",
      text: `You attempted only ${answeredQuestions} of ${totalQuestions} questions. Complete more questions to improve analysis reliability.`
    });
  } else {
    const totalWrong = wrong;
    if (totalWrong > 0) {
      const sortedByWrong = [...subjectBreakdown].sort((a, b) => b.wrong - a.wrong || a.subject.localeCompare(b.subject));
      const worstSubj = sortedByWrong[0];
      const pct = Math.round((worstSubj.wrong / totalWrong) * 100);
      insights.push({
        category: "weakness",
        type: "warning",
        text: `${worstSubj.subject} accounted for ${pct}% of your incorrect answers.`
      });
    } else {
      insights.push({
        category: "strength",
        type: "success",
        text: "No incorrect answers were recorded in this mock."
      });
    }
  }

  // Insight 3: safe pacing insight
  insights.push(pacingInsights[0]);

  // ─── Time Analysis Payload ────────────────────────────────────────────────
  const timeBySubject = {};
  const timeByDifficulty = {};
  const paceChartPoints = [];

  attempts.forEach(att => {
    const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
    const sub = att.subject || "Physics";
    const diff = (att.difficulty || "medium").toLowerCase();
    const tTaken = att.time_taken_seconds || 0;

    if (!timeBySubject[sub]) timeBySubject[sub] = 0;
    timeBySubject[sub] += tTaken;

    if (!timeByDifficulty[diff]) timeByDifficulty[diff] = 0;
    timeByDifficulty[diff] += tTaken;

    paceChartPoints.push({
      questionNumber: att.question_order,
      answered: !isSkipped,
      correct: !isSkipped && att.is_correct,
      timeTaken: tTaken
    });
  });

  const timeAnalysis = {
    totalTimeSeconds,
    averageAnsweredTimeSeconds,
    medianAnsweredTime,
    p75AnsweredTime,
    p90AnsweredTime,
    fastestAnsweredTimeSeconds: hasTime ? Math.min(...answeredTimes) : null,
    slowestAnsweredTimeSeconds: hasTime ? Math.max(...answeredTimes) : null,
    outlierThreshold,
    outlierQuestionCount,
    timeBySubject,
    timeByDifficulty,
    paceChartPoints
  };

  // ─── Question Analysis / Solutions Details ────────────────────────────────
  const questionAnalysis = attempts.map(att => {
    const isSkipped = att.selected_answer === null || att.selected_answer === undefined || att.selected_answer === -1;
    const status = isSkipped ? "skipped" : att.is_correct ? "correct" : "incorrect";
    const catalogItem = learningCatalog[att.chapter_id] || {};
    return {
      questionId: att.question_id,
      questionNumber: att.question_order,
      status,
      subject: att.subject,
      chapterId: att.chapter_id,
      chapterTitle: catalogItem.chapterTitle || "General",
      difficulty: att.difficulty,
      timeTakenSeconds: att.time_taken_seconds || 0,
      estimatedTimeSeconds: att.estimated_time_seconds || 0,
      selectedAnswer: att.selected_answer === null ? -1 : att.selected_answer,
      correctAnswer: att.correct_answer
    };
  });

  // ─── Mistake Analysis ─────────────────────────────────────────────────────
  const wrongAttempts = attempts.filter(att => att.selected_answer !== null && att.selected_answer !== undefined && att.selected_answer !== -1 && !att.is_correct);
  const totalWrongCount = wrongAttempts.length;

  const mistakesBreakdown = {
    bySubject: {},
    byDifficulty: {},
    byChapter: {},
    fastIncorrectCount: 0
  };

  wrongAttempts.forEach(att => {
    const sub = att.subject || "Physics";
    const diff = (att.difficulty || "medium").toLowerCase();
    const chapId = att.chapter_id;
    const catalogItem = learningCatalog[chapId] || {};
    const chapTitle = catalogItem.chapterTitle || "General";

    if (!mistakesBreakdown.bySubject[sub]) mistakesBreakdown.bySubject[sub] = 0;
    mistakesBreakdown.bySubject[sub]++;

    const diffLabel = diff.charAt(0).toUpperCase() + diff.slice(1);
    if (!mistakesBreakdown.byDifficulty[diffLabel]) mistakesBreakdown.byDifficulty[diffLabel] = 0;
    mistakesBreakdown.byDifficulty[diffLabel]++;

    if (!mistakesBreakdown.byChapter[chapTitle]) mistakesBreakdown.byChapter[chapTitle] = 0;
    mistakesBreakdown.byChapter[chapTitle]++;

    // Check fast incorrect response
    if (att.time_taken_seconds && att.time_taken_seconds < fastIncorrectThreshold) {
      mistakesBreakdown.fastIncorrectCount++;
    }
  });

  const mistakeSummaries = [];
  if (totalWrongCount > 0) {
    const maxSubj = Object.entries(mistakesBreakdown.bySubject).sort((a, b) => b[1] - a[1])[0];
    if (maxSubj) {
      mistakeSummaries.push(`${maxSubj[1]} of your ${totalWrongCount} incorrect answers came from ${maxSubj[0]}.`);
    }
    const maxDiff = Object.entries(mistakesBreakdown.byDifficulty).sort((a, b) => b[1] - a[1])[0];
    if (maxDiff) {
      mistakeSummaries.push(`Most incorrect responses occurred on ${maxDiff[0]} questions.`);
    }
    const maxChap = Object.entries(mistakesBreakdown.byChapter).sort((a, b) => b[1] - a[1])[0];
    if (maxChap) {
      mistakeSummaries.push(`${maxChap[0]} contributed the largest number of incorrect responses.`);
    }
    if (mistakesBreakdown.fastIncorrectCount > 0) {
      mistakeSummaries.push(`${mistakesBreakdown.fastIncorrectCount} incorrect answers were submitted significantly faster than your typical answering time.`);
    }
  }

  // ─── Historical Comparison ────────────────────────────────────────────────
  const evaluableHistory = history.filter(h => (h.correct + h.wrong) > 0);

  const historicalComparison = {
    hasComparison: evaluableHistory.length > 0,
    currentMock: {
      score,
      accuracy,
      coverage,
      totalTimeSeconds
    },
    previousMock: null,
    personalBest: null,
    rollingAverage: null,
    trend: "insufficient_history"
  };

  if (evaluableHistory.length > 0) {
    const prev = evaluableHistory[evaluableHistory.length - 1];
    const prevAns = prev.correct + prev.wrong;
    historicalComparison.previousMock = {
      score: prev.score,
      accuracy: prevAns > 0 ? Number(((prev.correct / prevAns) * 100).toFixed(1)) : 0,
      coverage: prev.total_questions > 0 ? Number(((prevAns / prev.total_questions) * 100).toFixed(1)) : 0,
      totalTimeSeconds: prev.time_taken || 0
    };

    const allAttempts = [...evaluableHistory, currentResult].map(h => {
      const ans = h.correct + h.wrong;
      return {
        id: h.id,
        score: h.score,
        accuracy: ans > 0 ? Number(((h.correct / ans) * 100).toFixed(1)) : 0,
        coverage: h.total_questions > 0 ? Number(((ans / h.total_questions) * 100).toFixed(1)) : 0,
        totalTimeSeconds: h.time_taken || 0
      };
    });

    allAttempts.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
    historicalComparison.personalBest = allAttempts[0];

    const rollingCount = allAttempts.length;
    const rollingSumScore = allAttempts.reduce((sum, h) => sum + h.score, 0);
    const rollingSumAccuracy = allAttempts.reduce((sum, h) => sum + h.accuracy, 0);
    const rollingSumCoverage = allAttempts.reduce((sum, h) => sum + h.coverage, 0);
    const rollingSumTime = allAttempts.reduce((sum, h) => sum + h.totalTimeSeconds, 0);

    historicalComparison.rollingAverage = {
      score: Number((rollingSumScore / rollingCount).toFixed(1)),
      accuracy: Number((rollingSumAccuracy / rollingCount).toFixed(1)),
      coverage: Number((rollingSumCoverage / rollingCount).toFixed(1)),
      totalTimeSeconds: Math.round(rollingSumTime / rollingCount)
    };

    const scoreChange = score - historicalComparison.previousMock.score;
    if (scoreChange >= 5) {
      historicalComparison.trend = "improving";
    } else if (scoreChange <= -5) {
      historicalComparison.trend = "declining";
    } else {
      historicalComparison.trend = "stable";
    }
  }

  // ─── IISER IAT Readiness Evaluation ───────────────────────────────────────
  const dimensionEvidence = {
    SCORE: answeredQuestions > 0,
    ACCURACY: answeredQuestions > 0,
    SUBJECT_BALANCE: subjectBreakdown.every(s => s.answeredQuestions >= 2),
    DIFFICULTY: difficultyBreakdown.every(d => d.answeredQuestions >= 2),
    PACE: answeredQuestions >= 5 && averageAnsweredTimeSeconds > 0,
    TREND: historicalComparison.hasComparison
  };

  const dimensionScores = {
    SCORE: (correct / totalQuestions) * 100,
    ACCURACY: accuracy || 0,
    SUBJECT_BALANCE: 0,
    DIFFICULTY: 0,
    PACE: 0,
    TREND: 0
  };

  let minAccuracy = 0;
  let maxAccuracy = 0;

  if (dimensionEvidence.SUBJECT_BALANCE) {
    const subjectAccs = subjectBreakdown.map(s => s.accuracy || 0);
    minAccuracy = Math.min(...subjectAccs);
    maxAccuracy = Math.max(...subjectAccs);
    const avgAcc = subjectAccs.reduce((sum, val) => sum + val, 0) / 4;
    dimensionScores.SUBJECT_BALANCE = Math.max(0, avgAcc - (maxAccuracy - minAccuracy) * 0.25);
  }

  if (dimensionEvidence.DIFFICULTY) {
    const diffAccs = difficultyBreakdown.map(d => d.accuracy || 0);
    dimensionScores.DIFFICULTY = diffAccs.reduce((sum, val) => sum + val, 0) / 3;
  }

  if (dimensionEvidence.PACE) {
    dimensionScores.PACE = averageAnsweredTimeSeconds <= 180 
      ? 100 
      : Math.max(0, 100 - (averageAnsweredTimeSeconds - 180) * 0.5);
  }

  if (dimensionEvidence.TREND) {
    const trend = historicalComparison.trend;
    dimensionScores.TREND = trend === "improving" ? 100 : trend === "stable" ? 75 : 40;
  }

  const baseWeights = {
    SCORE: 0.30,
    ACCURACY: 0.25,
    SUBJECT_BALANCE: 0.15,
    DIFFICULTY: 0.10,
    PACE: 0.10,
    TREND: 0.10
  };

  let totalAvailableWeight = 0;
  Object.keys(baseWeights).forEach(d => {
    if (dimensionEvidence[d]) {
      totalAvailableWeight += baseWeights[d];
    }
  });

  let readinessScore = null;
  let readinessLevel = "NOT_EVALUATED";
  let readinessConfidence = "NONE";
  const readinessFactors = [];
  let readinessSummary = "No questions were attempted, so your readiness could not be evaluated.";
  let nextMilestone = "Attempt questions to begin your baseline evaluations.";

  if (evidenceState === "NONE") {
    readinessLevel = "NOT_EVALUATED";
    readinessConfidence = "NONE";
  } else if (evidenceState === "LIMITED") {
    readinessLevel = "BASELINE_BUILDING";
    readinessConfidence = "LIMITED";
    readinessSummary = "We are building your baseline preparation profile. Complete more questions for a detailed analysis.";
    nextMilestone = "Attempt at least 20 questions to establish a reliable readiness profile.";
  } else {
    // SUFFICIENT
    let weightedSum = 0;
    Object.keys(baseWeights).forEach(d => {
      if (dimensionEvidence[d]) {
        const normWeight = baseWeights[d] / totalAvailableWeight;
        weightedSum += normWeight * dimensionScores[d];
      }
    });

    readinessScore = Math.round(weightedSum);

    if (readinessScore >= 85) {
      readinessLevel = "STRONG_PREPARATION";
      readinessSummary = "Your preparation is outstanding across all evaluated metrics. Focus on maintaining mock consistency.";
      nextMilestone = "Achieve perfect score profiles or refine time management on advanced mock papers.";
    } else if (readinessScore >= 70) {
      readinessLevel = "COMPETITIVE_FOUNDATION";
      readinessSummary = "You have established a highly competitive foundation. Fine-tune your timing on Hard questions to lock in high scores.";
      nextMilestone = "Raise overall accuracy above 75% while keeping average answering time below 90 seconds.";
    } else if (readinessScore >= 55) {
      readinessLevel = "PROGRESSING";
      readinessSummary = "You are showing steady progress. Target medium-difficulty questions to build competitive consistency.";
      nextMilestone = "Raise overall accuracy above 65% across all core subjects.";
    } else if (readinessScore >= 40) {
      readinessLevel = "DEVELOPING";
      readinessSummary = "You are developing a basic foundation. Concentrating on high-mistake chapters will help stabilize your scores.";
      nextMilestone = "Raise accuracy above 50% across Physics, Chemistry, and Mathematics.";
    } else {
      readinessLevel = "FOUNDATION_REQUIRED";
      readinessSummary = "Your current results show broad improvement opportunities across evaluated subjects. Focus on high-priority chapters before your next full mock.";
      nextMilestone = "Raise accuracy above 35% while maintaining balanced subject coverage.";
    }

    const availableCount = Object.values(dimensionEvidence).filter(Boolean).length;
    if (availableCount >= 5) readinessConfidence = "STRONG";
    else if (availableCount >= 3) readinessConfidence = "MODERATE";
    else readinessConfidence = "LIMITED";
  }

  // Helper to get status based on dimension score
  function getDimStatus(sValue) {
    return sValue >= 75 ? "STRONG" : sValue >= 50 ? "DEVELOPING" : "WEAK";
  }

  // Push Factors
  if (answeredQuestions > 0) {
    readinessFactors.push({
      factor: "SCORE",
      status: getDimStatus(dimensionScores.SCORE),
      message: `You scored ${correct} out of 60 questions correctly.`
    });
    readinessFactors.push({
      factor: "ACCURACY",
      status: getDimStatus(dimensionScores.ACCURACY),
      message: `Your average accuracy is ${accuracy.toFixed(1)}% on attempted questions.`
    });
  }

  if (dimensionEvidence.SUBJECT_BALANCE) {
    readinessFactors.push({
      factor: "SUBJECT_BALANCE",
      status: getDimStatus(dimensionScores.SUBJECT_BALANCE),
      message: `Subject accuracies range from ${minAccuracy.toFixed(1)}% to ${maxAccuracy.toFixed(1)}%.`
    });
  } else if (answeredQuestions > 0) {
    readinessFactors.push({
      factor: "SUBJECT_BALANCE",
      status: "UNAVAILABLE",
      message: "More subject-level attempts are needed to evaluate subject balance."
    });
  }

  if (dimensionEvidence.DIFFICULTY) {
    readinessFactors.push({
      factor: "DIFFICULTY",
      status: getDimStatus(dimensionScores.DIFFICULTY),
      message: "Answering performance is balanced across Easy, Medium, and Hard questions."
    });
  } else if (answeredQuestions > 0) {
    readinessFactors.push({
      factor: "DIFFICULTY",
      status: "UNAVAILABLE",
      message: "Attempt questions across all difficulties to evaluate performance."
    });
  }

  if (dimensionEvidence.PACE) {
    readinessFactors.push({
      factor: "PACE",
      status: getDimStatus(dimensionScores.PACE),
      message: `Average answering time is ${formatSeconds(averageAnsweredTimeSeconds)} per question.`
    });
  } else if (answeredQuestions > 0) {
    readinessFactors.push({
      factor: "PACE",
      status: "UNAVAILABLE",
      message: "More timed attempts are needed to analyze pacing."
    });
  }

  if (dimensionEvidence.TREND) {
    readinessFactors.push({
      factor: "TREND",
      status: historicalComparison.trend === "improving" ? "STRONG" : historicalComparison.trend === "stable" ? "DEVELOPING" : "WEAK",
      message: `Your performance trajectory is currently ${historicalComparison.trend}.`
    });
  } else if (answeredQuestions > 0) {
    readinessFactors.push({
      factor: "TREND",
      status: "UNAVAILABLE",
      message: "Complete additional mock tests to establish preparation trends."
    });
  }

  const iiserReadiness = {
    readinessLevel,
    readinessScore,
    confidence: readinessConfidence,
    factors: readinessFactors,
    summary: readinessSummary,
    nextMilestone
  };

  // ─── Dynamic Result Summary ───────────────────────────────────────────────
  let dynamicSummary = "";
  if (evidenceState === "NONE") {
    dynamicSummary = "No questions were attempted, so your performance could not yet be evaluated.";
  } else if (evidenceState === "LIMITED") {
    dynamicSummary = `You attempted ${answeredQuestions} of ${totalQuestions} questions. Answer more questions to build a reliable performance profile.`;
  } else {
    const strongestSubject = validSubjectsForInsight.length > 0
      ? [...validSubjectsForInsight].sort((a, b) => b.accuracy - a.accuracy || a.subject.localeCompare(b.subject))[0].subject
      : null;

    if (accuracy < 50 && weakestChapter) {
      dynamicSummary = `You attempted ${answeredQuestions} questions and answered ${correct} correctly. Your highest revision priority is ${weakestChapter.chapterTitle}.`;
    } else if (strongestSubject && accuracy >= 70) {
      dynamicSummary = `You answered ${correct} of ${answeredQuestions} attempted questions correctly. ${strongestSubject} was your strongest evaluated subject.`;
    } else if (accuracy >= 85 && !weakestChapter) {
      dynamicSummary = `You answered ${correct} of ${totalQuestions} questions correctly with balanced performance across all four subjects.`;
    } else {
      dynamicSummary = `You completed the mock with a score of ${score} / ${totalQuestions} and an accuracy of ${accuracy.toFixed(1)}%.`;
    }
  }

  // ─── Final Returned Analysis Payload ──────────────────────────────────────
  return {
    success: true,
    hasData: true,
    result: {
      resultId: currentResult.id,
      mockId: currentResult.mock_id,
      mockTitle: currentResult.mock_title,
      completedAt: currentResult.created_at
    },
    summary: {
      totalQuestions,
      answeredQuestions,
      correct,
      wrong,
      skipped,
      score,
      accuracy,
      coverage,
      totalTimeSeconds,
      averageAnsweredTimeSeconds
    },
    evidence: {
      state: evidenceState,
      answeredQuestions,
      requiredForReliableEvaluation: 20,
      message: evidenceMessage
    },
    performance: {
      status: perfStatus,
      title: perfTitle,
      message: perfMessage
    },
    recommendedAction,
    insights,
    subjectBreakdown,
    difficultyBreakdown,
    chapterBreakdown,
    timeAnalysis,
    questionAnalysis,
    mistakeAnalysis: {
      totalWrongCount,
      summaries: mistakeSummaries
    },
    historicalComparison,
    prepReadiness: readinessLevel,
    iiserReadiness,
    dynamicSummary
  };
}

module.exports = { analyzeMockResult };
