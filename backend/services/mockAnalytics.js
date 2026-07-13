/**
 * Pure analytics calculation service for mock performance metrics.
 */
function calculateAnalytics(results, attempts) {
  const totalMocks = results.length;

  // Zero-data contract
  if (totalMocks === 0) {
    return {
      success: true,
      hasData: false,
      analytics: {
        overall: {
          totalMocks: 0,
          averageScore: 0,
          bestScore: 0,
          latestScore: 0,
          averageAccuracy: 0,
          bestAccuracy: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          totalWrong: 0,
          totalSkipped: 0,
          totalTimeSeconds: 0
        },
        progress: {
          firstScore: 0,
          latestScore: 0,
          scoreChange: 0,
          firstAccuracy: 0,
          latestAccuracy: 0,
          accuracyChangePercentagePoints: 0,
          trend: "insufficient_history"
        },
        subjects: [],
        difficulties: [],
        timeManagement: {
          totalTimeSeconds: 0,
          averageMockTimeSeconds: 0,
          averageAnsweredQuestionTimeSeconds: 0,
          fastestAnsweredQuestionSeconds: 0,
          slowestAnsweredQuestionSeconds: 0
        },
        strongestSubject: null,
        weakestSubject: null,
        recentAttempts: []
      }
    };
  }

  // 1. Overall Metrics
  let totalQuestions = 0;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalSkipped = 0;
  let totalTimeSeconds = 0;

  for (const r of results) {
    totalQuestions += r.total_questions || 0;
    totalCorrect += r.correct || 0;
    totalWrong += r.wrong || 0;
    totalSkipped += r.skipped || 0;
    totalTimeSeconds += r.time_taken || 0;
  }

  const averageScore = Number((results.reduce((sum, r) => sum + r.score, 0) / totalMocks).toFixed(1));
  const bestScore = Math.max(...results.map(r => r.score));
  
  // Sorting is already ascending chronologically from backend:
  // results[results.length - 1] is latest attempt
  const latestScore = results[results.length - 1].score;

  const overallAnswered = totalCorrect + totalWrong;
  const averageAccuracy = overallAnswered > 0 ? Number(((totalCorrect / overallAnswered) * 100).toFixed(1)) : 0.0;
  const accuracies = results
    .map(r => {
      const ans = r.correct + r.wrong;
      return ans > 0 ? Number(((r.correct / ans) * 100).toFixed(1)) : null;
    })
    .filter(a => a !== null);
  const bestAccuracy = accuracies.length > 0 ? Math.max(...accuracies) : 0.0;

  // 2. Progress Calculation
  const first = results[0];
  const latest = results[results.length - 1];

  const firstScore = first.score;
  const scoreChange = latestScore - firstScore;

  const firstAnswered = first.correct + first.wrong;
  const firstAccuracy = firstAnswered > 0 ? Number(((first.correct / firstAnswered) * 100).toFixed(1)) : 0.0;

  const latestAnswered = latest.correct + latest.wrong;
  const latestAccuracy = latestAnswered > 0 ? Number(((latest.correct / latestAnswered) * 100).toFixed(1)) : 0.0;
  const accuracyChangePercentagePoints = Number((latestAccuracy - firstAccuracy).toFixed(1));

  let trend = "insufficient_history";
  if (totalMocks >= 2) {
    if (scoreChange >= 5) {
      trend = "improving";
    } else if (scoreChange <= -5) {
      trend = "declining";
    } else {
      trend = "stable";
    }
  }

  // 3. Subject Performance
  const subjectStatsMap = {
    Physics: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Chemistry: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Mathematics: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    Biology: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 }
  };

  for (const att of attempts) {
    const sub = att.subject || "Mixed";
    if (!subjectStatsMap[sub]) {
      subjectStatsMap[sub] = { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 };
    }
    const stats = subjectStatsMap[sub];
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

  const subjects = Object.entries(subjectStatsMap).map(([subject, stats]) => ({
    subject,
    totalQuestions: stats.totalQuestions,
    correct: stats.correct,
    wrong: stats.wrong,
    skipped: stats.skipped,
    accuracy: stats.answeredCount > 0 ? Number(((stats.correct / stats.answeredCount) * 100).toFixed(1)) : 0.0,
    averageTimeSeconds: stats.answeredCount > 0 ? Number((stats.totalTime / stats.answeredCount).toFixed(1)) : 0.0
  }));

  // 4. Difficulty Performance
  const diffStatsMap = {
    easy: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    medium: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 },
    hard: { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 }
  };

  for (const att of attempts) {
    const diff = (att.difficulty || "medium").toLowerCase();
    if (!diffStatsMap[diff]) {
      diffStatsMap[diff] = { totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, totalTime: 0, answeredCount: 0 };
    }
    const stats = diffStatsMap[diff];
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

  const difficulties = Object.entries(diffStatsMap).map(([difficulty, stats]) => ({
    difficulty,
    totalQuestions: stats.totalQuestions,
    correct: stats.correct,
    wrong: stats.wrong,
    skipped: stats.skipped,
    accuracy: stats.answeredCount > 0 ? Number(((stats.correct / stats.answeredCount) * 100).toFixed(1)) : 0.0,
    averageTimeSeconds: stats.answeredCount > 0 ? Number((stats.totalTime / stats.answeredCount).toFixed(1)) : 0.0
  }));

  // Strongest / Weakest Subject Calculation
  const activeSubjects = subjects.filter(s => s.totalQuestions > 0);
  let strongestSubject = null;
  let weakestSubject = null;

  if (activeSubjects.length > 0) {
    // Strongest: accuracy DESC, subject ASC
    const sortedStrong = [...activeSubjects].sort((a, b) => b.accuracy - a.accuracy || a.subject.localeCompare(b.subject));
    // Weakest: accuracy ASC, subject ASC
    const sortedWeak = [...activeSubjects].sort((a, b) => a.accuracy - b.accuracy || a.subject.localeCompare(b.subject));

    strongestSubject = { subject: sortedStrong[0].subject, accuracy: sortedStrong[0].accuracy };
    weakestSubject = { subject: sortedWeak[0].subject, accuracy: sortedWeak[0].accuracy };
  }

  // 5. Time Management
  const averageMockTimeSeconds = totalMocks > 0 ? Math.round(totalTimeSeconds / totalMocks) : 0;
  
  const answeredQuestionTimes = attempts
    .filter(att => att.selected_answer !== null && att.selected_answer !== undefined && att.selected_answer !== -1)
    .map(att => att.time_taken_seconds || 0);

  const averageAnsweredQuestionTimeSeconds = answeredQuestionTimes.length > 0
    ? Number((answeredQuestionTimes.reduce((s, t) => s + t, 0) / answeredQuestionTimes.length).toFixed(1))
    : 0.0;

  const fastestAnsweredQuestionSeconds = answeredQuestionTimes.length > 0 ? Math.min(...answeredQuestionTimes) : 0;
  const slowestAnsweredQuestionSeconds = answeredQuestionTimes.length > 0 ? Math.max(...answeredQuestionTimes) : 0;

  // 6. Recent Attempts (latest 5 attempts, sorted completedAt DESC)
  // results is currently sorted ASC (first to latest)
  const recentAttempts = [...results].reverse().slice(0, 5).map(row => {
    const ans = row.correct + row.wrong;
    const accuracy = ans > 0 ? Number(((row.correct / ans) * 100).toFixed(1)) : null;
    return {
      resultId: row.id,
      mockId: row.mock_id,
      mockTitle: row.mock_title,
      score: row.score,
      accuracy,
      totalTimeSeconds: row.time_taken || 0,
      completedAt: row.created_at
    };
  });

  return {
    success: true,
    hasData: true,
    analytics: {
      overall: {
        totalMocks,
        averageScore,
        bestScore,
        latestScore,
        averageAccuracy,
        bestAccuracy,
        totalQuestions,
        totalCorrect,
        totalWrong,
        totalSkipped,
        totalTimeSeconds
      },
      progress: {
        firstScore,
        latestScore,
        scoreChange,
        firstAccuracy,
        latestAccuracy,
        accuracyChangePercentagePoints,
        trend
      },
      subjects,
      difficulties,
      timeManagement: {
        totalTimeSeconds,
        averageMockTimeSeconds,
        averageAnsweredQuestionTimeSeconds,
        fastestAnsweredQuestionSeconds,
        slowestAnsweredQuestionSeconds
      },
      strongestSubject,
      weakestSubject,
      recentAttempts
    }
  };
}

module.exports = { calculateAnalytics };
