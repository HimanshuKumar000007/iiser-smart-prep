/**
 * SLS Analytics Engine — Core performance computation service
 */

const RECENT_ATTEMPTS_LIMIT = 20;

// --- Defensive Data Normalization Helpers ---
function finiteNum(val, def = 0) {
  const num = Number(val);
  return Number.isFinite(num) ? num : def;
}

function nonNegativeInt(val, def = 0) {
  const num = parseInt(val, 10);
  return Number.isInteger(num) && num >= 0 ? num : def;
}

function positiveInt(val, def = 90) {
  const num = parseInt(val, 10);
  return Number.isInteger(num) && num > 0 ? num : def;
}

function safeFloat(val, def = 0.0) {
  const num = Number(val);
  return Number.isFinite(num) ? parseFloat(num.toFixed(2)) : def;
}

/**
 * Returns the canonical empty analytics response structure
 */
function createEmptyAnalytics() {
  return {
    success: true,
    hasData: false,
    analytics: {
      overall: {
        totalAttempts: 0,
        uniqueChaptersAttempted: 0,
        totalQuestionsAttempted: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalUnanswered: 0,
        overallAccuracy: 0.0,
        totalActiveTimeSeconds: 0,
        averageTimePerQuestion: 0.0
      },
      subjects: [],
      chapters: [],
      topics: [],
      difficulties: [],
      speed: {
        overallAverageActualTimeSeconds: 0.0,
        overallAverageEstimatedTimeSeconds: 0.0,
        overallSpeedRatio: 0.0,
        fasterThanExpectedCount: 0,
        nearExpectedCount: 0,
        slowerThanExpectedCount: 0
      },
      recentAttempts: [],
      coverage: {
        totalAttemptRecords: 0,
        totalQuestionRecords: 0,
        uniqueChaptersAttempted: 0,
        uniqueTopicsAttempted: 0,
        firstActivityAt: null,
        lastActivityAt: null
      }
    }
  };
}

/**
 * Performs chronological sorting on attempts.
 * Uses completed_at ?? created_at as effective timestamp, with UUID id as tie-breaker.
 */
function sortAttemptsChronologically(attempts) {
  return [...attempts].sort((a, b) => {
    const timeA = new Date(a.completed_at || a.created_at || 0).getTime();
    const timeB = new Date(b.completed_at || b.created_at || 0).getTime();
    const diff = timeA - timeB;
    if (diff !== 0) return diff;
    // Tie-breaker: ID alphabetical sorting
    const idA = String(a.id || "");
    const idB = String(b.id || "");
    return idA.localeCompare(idB);
  });
}

/**
 * Core aggregation logic.
 * Expects raw inputs for parentAttempts and questionAttempts.
 */
function aggregateMetrics(rawParentAttempts, rawQuestionAttempts) {
  const parentAttempts = Array.isArray(rawParentAttempts) ? rawParentAttempts : [];
  const questionAttempts = Array.isArray(rawQuestionAttempts) ? rawQuestionAttempts : [];

  if (parentAttempts.length === 0) {
    return createEmptyAnalytics();
  }

  // Sort parent attempts chronologically
  const sortedParentAttempts = sortAttemptsChronologically(parentAttempts);

  // 1. Overall Performance (Source of truth: parentAttempts)
  let totalAttempts = sortedParentAttempts.length;
  let totalQuestionsAttempted = 0;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalUnanswered = 0;
  let totalActiveTimeSeconds = 0;
  const uniqueChapters = new Set();

  sortedParentAttempts.forEach(a => {
    totalQuestionsAttempted += nonNegativeInt(a.total_questions);
    totalCorrect += nonNegativeInt(a.correct_answers);
    totalWrong += nonNegativeInt(a.wrong_answers);
    totalUnanswered += nonNegativeInt(a.unanswered_answers);
    totalActiveTimeSeconds += nonNegativeInt(a.total_time_seconds);
    if (a.chapter_id) {
      uniqueChapters.add(a.chapter_id);
    }
  });

  const overallAccuracy = totalQuestionsAttempted > 0 
    ? safeFloat((totalCorrect / totalQuestionsAttempted) * 100) 
    : 0.0;

  const averageTimePerQuestion = totalQuestionsAttempted > 0 
    ? safeFloat(totalActiveTimeSeconds / totalQuestionsAttempted) 
    : 0.0;

  const overall = {
    totalAttempts,
    uniqueChaptersAttempted: uniqueChapters.size,
    totalQuestionsAttempted,
    totalCorrect,
    totalWrong,
    totalUnanswered,
    overallAccuracy,
    totalActiveTimeSeconds,
    averageTimePerQuestion
  };

  // 2. Subject Performance (Source of truth: parentAttempts)
  const subjectMap = new Map();
  sortedParentAttempts.forEach(a => {
    const sub = a.subject || "Unknown";
    if (!subjectMap.has(sub)) {
      subjectMap.set(sub, {
        subject: sub,
        attempts: 0,
        chapterSet: new Set(),
        totalQuestions: 0,
        correct: 0,
        wrong: 0,
        unanswered: 0,
        totalTimeSeconds: 0
      });
    }
    const s = subjectMap.get(sub);
    s.attempts++;
    if (a.chapter_id) s.chapterSet.add(a.chapter_id);
    s.totalQuestions += nonNegativeInt(a.total_questions);
    s.correct += nonNegativeInt(a.correct_answers);
    s.wrong += nonNegativeInt(a.wrong_answers);
    s.unanswered += nonNegativeInt(a.unanswered_answers);
    s.totalTimeSeconds += nonNegativeInt(a.total_time_seconds);
  });

  const subjects = Array.from(subjectMap.values()).map(s => {
    const accuracy = s.totalQuestions > 0 ? safeFloat((s.correct / s.totalQuestions) * 100) : 0.0;
    const averageTimeSeconds = s.totalQuestions > 0 ? safeFloat(s.totalTimeSeconds / s.totalQuestions) : 0.0;
    return {
      subject: s.subject,
      attempts: s.attempts,
      chaptersAttempted: s.chapterSet.size,
      totalQuestions: s.totalQuestions,
      correct: s.correct,
      wrong: s.wrong,
      unanswered: s.unanswered,
      accuracy,
      totalTimeSeconds: s.totalTimeSeconds,
      averageTimeSeconds
    };
  });

  // 3. Chapter Performance (Source of truth: parentAttempts)
  const chapterMap = new Map();
  sortedParentAttempts.forEach(a => {
    const ch = a.chapter_id;
    if (!ch) return;
    if (!chapterMap.has(ch)) {
      chapterMap.set(ch, []);
    }
    chapterMap.get(ch).push(a);
  });

  const chapters = Array.from(chapterMap.entries()).map(([chapterId, chAttempts]) => {
    const first = chAttempts[0];
    const latest = chAttempts[chAttempts.length - 1];

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let totalQuestions = 0;
    let totalTime = 0;
    let bestAccuracy = 0.0;

    chAttempts.forEach(a => {
      correct += nonNegativeInt(a.correct_answers);
      wrong += nonNegativeInt(a.wrong_answers);
      unanswered += nonNegativeInt(a.unanswered_answers);
      totalQuestions += nonNegativeInt(a.total_questions);
      totalTime += nonNegativeInt(a.total_time_seconds);
      
      const acc = nonNegativeInt(a.total_questions) > 0 
        ? (nonNegativeInt(a.correct_answers) / nonNegativeInt(a.total_questions)) * 100 
        : 0.0;
      if (acc > bestAccuracy) {
        bestAccuracy = acc;
      }
    });

    const accuracy = totalQuestions > 0 ? safeFloat((correct / totalQuestions) * 100) : 0.0;
    const averageTimeSeconds = totalQuestions > 0 ? safeFloat(totalTime / totalQuestions) : 0.0;

    const firstAcc = nonNegativeInt(first.total_questions) > 0 
      ? safeFloat((nonNegativeInt(first.correct_answers) / nonNegativeInt(first.total_questions)) * 100) 
      : 0.0;
    const latestAcc = nonNegativeInt(latest.total_questions) > 0 
      ? safeFloat((nonNegativeInt(latest.correct_answers) / nonNegativeInt(latest.total_questions)) * 100) 
      : 0.0;

    const improvementPercentagePoints = safeFloat(latestAcc - firstAcc);

    return {
      chapterId,
      subject: latest.subject || "Unknown",
      attempts: chAttempts.length,
      totalQuestions,
      correct,
      wrong,
      unanswered,
      accuracy,
      averageTimeSeconds,
      firstAttemptAccuracy: firstAcc,
      latestAttemptAccuracy: latestAcc,
      bestAttemptAccuracy: safeFloat(bestAccuracy),
      improvementPercentagePoints,
      lastAttemptedAt: latest.completed_at || latest.created_at || null
    };
  });

  // 4. Topic Performance (Source of truth: questionAttempts)
  const topicMap = new Map();
  const uniqueTopicsSet = new Set();

  questionAttempts.forEach(q => {
    const ch = q.chapter_id;
    const top = q.topic_id;
    if (!ch || !top) return;
    
    const compositeKey = `${ch}::${top}`;
    uniqueTopicsSet.add(compositeKey);

    if (!topicMap.has(compositeKey)) {
      topicMap.set(compositeKey, {
        chapterId: ch,
        topicId: top,
        attempts: 0,
        correct: 0,
        wrong: 0,
        unanswered: 0,
        actualTimeSum: 0,
        estimatedTimeSum: 0,
        validTimingCount: 0
      });
    }

    const t = topicMap.get(compositeKey);
    t.attempts++;
    
    const isCorrect = q.is_correct === true;
    const isUnanswered = q.selected_answer === null || q.selected_answer === undefined;

    if (isCorrect) {
      t.correct++;
    } else if (isUnanswered) {
      t.unanswered++;
    } else {
      t.wrong++;
    }

    const actualTime = parseInt(q.time_taken_seconds, 10);
    const estimatedTime = parseInt(q.estimated_time_seconds, 10);
    
    const isActualValid = Number.isInteger(actualTime) && actualTime >= 0;
    const isEstValid = Number.isInteger(estimatedTime) && estimatedTime > 0;

    if (isActualValid) {
      t.actualTimeSum += actualTime;
    }
    if (isEstValid) {
      t.estimatedTimeSum += estimatedTime;
    }
    if (isActualValid && isEstValid) {
      t.validTimingCount++;
    }
  });

  const topics = Array.from(topicMap.values()).map(t => {
    const accuracy = t.attempts > 0 ? safeFloat((t.correct / t.attempts) * 100) : 0.0;
    const averageTimeSeconds = t.attempts > 0 ? safeFloat(t.actualTimeSum / t.attempts) : 0.0;
    const averageEstimatedTimeSeconds = t.attempts > 0 ? safeFloat(t.estimatedTimeSum / t.attempts) : 0.0;
    
    let speedRatio = 0.0;
    if (t.validTimingCount > 0) {
      let overlappingActualSum = 0;
      let overlappingEstSum = 0;
      questionAttempts.forEach(q => {
        if (q.chapter_id === t.chapterId && q.topic_id === t.topicId) {
          const act = parseInt(q.time_taken_seconds, 10);
          const est = parseInt(q.estimated_time_seconds, 10);
          if (Number.isInteger(act) && act >= 0 && Number.isInteger(est) && est > 0) {
            overlappingActualSum += act;
            overlappingEstSum += est;
          }
        }
      });
      if (overlappingEstSum > 0) {
        speedRatio = safeFloat(overlappingActualSum / overlappingEstSum);
      }
    }

    return {
      chapterId: t.chapterId,
      topicId: t.topicId,
      attempts: t.attempts,
      correct: t.correct,
      wrong: t.wrong,
      unanswered: t.unanswered,
      accuracy,
      totalTimeSeconds: t.actualTimeSum,
      averageTimeSeconds,
      averageEstimatedTimeSeconds,
      speedRatio
    };
  });

  // 5. Difficulty Performance (Source of truth: questionAttempts)
  const diffMap = new Map();
  ["easy", "medium", "hard"].forEach(d => {
    diffMap.set(d, {
      difficulty: d,
      attempts: 0,
      correct: 0,
      wrong: 0,
      unanswered: 0,
      actualTimeSum: 0,
      estimatedTimeSum: 0,
      validTimingCount: 0
    });
  });

  questionAttempts.forEach(q => {
    const diff = String(q.difficulty).toLowerCase();
    if (!diffMap.has(diff)) return;

    const d = diffMap.get(diff);
    d.attempts++;
    
    const isCorrect = q.is_correct === true;
    const isUnanswered = q.selected_answer === null || q.selected_answer === undefined;

    if (isCorrect) {
      d.correct++;
    } else if (isUnanswered) {
      d.unanswered++;
    } else {
      d.wrong++;
    }

    const actualTime = parseInt(q.time_taken_seconds, 10);
    const estimatedTime = parseInt(q.estimated_time_seconds, 10);
    
    const isActualValid = Number.isInteger(actualTime) && actualTime >= 0;
    const isEstValid = Number.isInteger(estimatedTime) && estimatedTime > 0;

    if (isActualValid) d.actualTimeSum += actualTime;
    if (isEstValid) d.estimatedTimeSum += estimatedTime;
    if (isActualValid && isEstValid) d.validTimingCount++;
  });

  const difficulties = Array.from(diffMap.values()).map(d => {
    const accuracy = d.attempts > 0 ? safeFloat((d.correct / d.attempts) * 100) : 0.0;
    const averageTimeSeconds = d.attempts > 0 ? safeFloat(d.actualTimeSum / d.attempts) : 0.0;
    const averageEstimatedTimeSeconds = d.attempts > 0 ? safeFloat(d.estimatedTimeSum / d.attempts) : 0.0;

    let speedRatio = 0.0;
    if (d.validTimingCount > 0) {
      let overlappingActualSum = 0;
      let overlappingEstSum = 0;
      questionAttempts.forEach(q => {
        if (String(q.difficulty).toLowerCase() === d.difficulty) {
          const act = parseInt(q.time_taken_seconds, 10);
          const est = parseInt(q.estimated_time_seconds, 10);
          if (Number.isInteger(act) && act >= 0 && Number.isInteger(est) && est > 0) {
            overlappingActualSum += act;
            overlappingEstSum += est;
          }
        }
      });
      if (overlappingEstSum > 0) {
        speedRatio = safeFloat(overlappingActualSum / overlappingEstSum);
      }
    }

    return {
      difficulty: d.difficulty,
      attempts: d.attempts,
      correct: d.correct,
      wrong: d.wrong,
      unanswered: d.unanswered,
      accuracy,
      averageTimeSeconds,
      averageEstimatedTimeSeconds,
      speedRatio
    };
  });

  // 6. Speed Analytics (Source of truth: questionAttempts)
  let totalValidActualTime = 0;
  let totalValidEstimatedTime = 0;
  let validActualCount = 0;
  let validEstCount = 0;
  let bothValidActualSum = 0;
  let bothValidEstSum = 0;

  let fasterThanExpectedCount = 0;
  let nearExpectedCount = 0;
  let slowerThanExpectedCount = 0;

  questionAttempts.forEach(q => {
    const act = parseInt(q.time_taken_seconds, 10);
    const est = parseInt(q.estimated_time_seconds, 10);
    const isActValid = Number.isInteger(act) && act >= 0;
    const isEstValid = Number.isInteger(est) && est > 0;

    if (isActValid) {
      totalValidActualTime += act;
      validActualCount++;
    }
    if (isEstValid) {
      totalValidEstimatedTime += est;
      validEstCount++;
    }

    if (isActValid && isEstValid) {
      bothValidActualSum += act;
      bothValidEstSum += est;

      // Speed classification over individual question
      const ratio = act / est;
      if (ratio < 0.8) {
        fasterThanExpectedCount++;
      } else if (ratio >= 0.8 && ratio <= 1.2) {
        nearExpectedCount++;
      } else {
        slowerThanExpectedCount++;
      }
    }
  });

  const overallAverageActualTimeSeconds = validActualCount > 0 
    ? safeFloat(totalValidActualTime / validActualCount) 
    : 0.0;
  
  const overallAverageEstimatedTimeSeconds = validEstCount > 0 
    ? safeFloat(totalValidEstimatedTime / validEstCount) 
    : 0.0;

  const overallSpeedRatio = bothValidEstSum > 0 
    ? safeFloat(bothValidActualSum / bothValidEstSum) 
    : 0.0;

  const speed = {
    overallAverageActualTimeSeconds,
    overallAverageEstimatedTimeSeconds,
    overallSpeedRatio,
    fasterThanExpectedCount,
    nearExpectedCount,
    slowerThanExpectedCount
  };

  // 7. Recent Attempt History (Source of truth: parentAttempts)
  const newestFirstAttempts = [...sortedParentAttempts].sort((a, b) => {
    const timeA = new Date(a.completed_at || a.created_at || 0).getTime();
    const timeB = new Date(b.completed_at || b.created_at || 0).getTime();
    const diff = timeB - timeA;
    if (diff !== 0) return diff;
    const idA = String(a.id || "");
    const idB = String(b.id || "");
    return idB.localeCompare(idA);
  });

  const recentAttempts = newestFirstAttempts.slice(0, RECENT_ATTEMPTS_LIMIT).map(a => ({
    attemptId: a.id,
    chapterId: a.chapter_id,
    subject: a.subject || "Unknown",
    totalQuestions: nonNegativeInt(a.total_questions),
    correct: nonNegativeInt(a.correct_answers),
    wrong: nonNegativeInt(a.wrong_answers),
    unanswered: nonNegativeInt(a.unanswered_answers),
    accuracy: safeFloat(a.accuracy),
    totalTimeSeconds: nonNegativeInt(a.total_time_seconds),
    averageTimeSeconds: safeFloat(a.average_time_seconds),
    completedAt: a.completed_at || a.created_at || null
  }));

  // 8. Coverage Metadata (Source of truth: parentAttempts/questionAttempts)
  const coverage = {
    totalAttemptRecords: sortedParentAttempts.length,
    totalQuestionRecords: questionAttempts.length,
    uniqueChaptersAttempted: uniqueChapters.size,
    uniqueTopicsAttempted: uniqueTopicsSet.size,
    firstActivityAt: sortedParentAttempts[0].completed_at || sortedParentAttempts[0].created_at || null,
    lastActivityAt: sortedParentAttempts[sortedParentAttempts.length - 1].completed_at || sortedParentAttempts[sortedParentAttempts.length - 1].created_at || null
  };

  return {
    success: true,
    hasData: true,
    analytics: {
      overall,
      subjects,
      chapters,
      topics,
      difficulties,
      speed,
      recentAttempts,
      coverage
    }
  };
}

module.exports = {
  createEmptyAnalytics,
  aggregateMetrics,
  sortAttemptsChronologically
};
