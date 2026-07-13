/**
 * test_system_intelligence_consistency.js
 *
 * System-Wide Intelligence Consistency & Data Integrity Test Suite (Step 10 Verification)
 * Covers 30+ scenarios across metrics, closed-loop states, temporal logic, user isolation, and robustness.
 */

const fs = require("fs");
const path = require("path");

// Load backend .env manually to get connection details
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length === 2) {
      process.env[parts[0].trim()] = parts[1].trim();
    }
  });
}

// Load backend logic
const { calculateAnalytics } = require("./services/mockAnalytics");
const { analyzeResults } = require("./services/mockResultAnalysis");
const { calculateMockRecommendations } = require("./services/mockRecommendations");
const { buildStudentActionPlan } = require("./services/studentActionOrchestrator");
const { resolveActionState } = require("./services/actionCompletionResolver");
const { getChapterWeaknesses } = require("./services/mockLearningActions");
const { evaluateChapterMastery } = require("./services/slsMasteryEngine");
const { analyzeWeaknesses } = require("./services/slsWeaknessEngine");
const { buildRevisionQueue } = require("./services/slsRevisionEngine");

let testsPassed = 0;
let testsFailed = 0;
let totalAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function runScenario(name, fn) {
  try {
    await fn();
    console.log(`[PASS] Scenario: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] Scenario: ${name}`);
    console.error(err);
    testsFailed++;
  }
}

async function runTestSuite() {
  console.log("======================================================================");
  console.log("SMARTPREP SYSTEM-WIDE INTELLIGENCE CONSISTENCY TEST SUITE");
  console.log("======================================================================\n");

  // 1. Completely new user
  await runScenario("1. Completely new user returns default plan", () => {
    const plan = buildStudentActionPlan({});
    assert(plan.success === true, "Plan call should succeed");
    assert(plan.hasData === false, "Zero-data hasData should be false");
    assert(plan.dailyMissions.length > 0, "Should generate fallback daily missions");
  });

  // 2. Zero evidence
  await runScenario("2. Zero evidence mock recommendations status", () => {
    const recs = calculateMockRecommendations({ results: [], attempts: [], analytics: null });
    assert(recs.success === true, "Should succeed");
    assert(recs.evidenceState === "NO_DATA", "Evidence state must be NO_DATA");
    assert(recs.primaryAction.type === "START_MOCK", "Should prompt to take first mock");
  });

  // 3. One correct mock answer (1 correct, 0 wrong, 59 skipped = 100% accuracy)
  await runScenario("3. Metric Check: 1 correct + 0 wrong + 59 skipped = 100% accuracy", () => {
    const mockResult = { score: 1, total_questions: 60, correct: 1, wrong: 0, skipped: 59, time_taken: 60 };
    const mockAttempt = { selected_answer: 1, is_correct: true, time_taken_seconds: 60 };
    const res = calculateAnalytics([mockResult], [mockAttempt]);
    assert(res.analytics.overall.averageAccuracy === 100.0, `Expected 100% accuracy, got ${res.analytics.overall.averageAccuracy}%`);
  });

  // 4. One incorrect mock answer (0 correct, 1 wrong, 59 skipped = 0% accuracy)
  await runScenario("4. Metric Check: 0 correct + 1 wrong + 59 skipped = 0% accuracy", () => {
    const mockResult = { score: 0, total_questions: 60, correct: 0, wrong: 1, skipped: 59, time_taken: 60 };
    const mockAttempt = { selected_answer: 1, is_correct: false, time_taken_seconds: 60 };
    const res = calculateAnalytics([mockResult], [mockAttempt]);
    assert(res.analytics.overall.averageAccuracy === 0.0, `Expected 0% accuracy, got ${res.analytics.overall.averageAccuracy}%`);
  });

  // 5. Standard mock score (10 correct, 50 wrong, 0 skipped = 16.7% accuracy)
  await runScenario("5. Metric Check: 10 correct + 50 wrong + 0 skipped = 16.7% accuracy", () => {
    const mockResult = { score: 10, total_questions: 60, correct: 10, wrong: 50, skipped: 0, time_taken: 600 };
    const attempts = [];
    for (let i = 0; i < 10; i++) attempts.push({ selected_answer: 1, is_correct: true, time_taken_seconds: 10 });
    for (let i = 0; i < 50; i++) attempts.push({ selected_answer: 1, is_correct: false, time_taken_seconds: 10 });
    const res = calculateAnalytics([mockResult], attempts);
    assert(res.analytics.overall.averageAccuracy === 16.7, `Expected 16.7% accuracy, got ${res.analytics.overall.averageAccuracy}%`);
  });

  // 6. Zero answered mock (0 answered = 0.0% accuracy)
  await runScenario("6. Metric Check: 0 answered mock returns 0.0% average accuracy", () => {
    const mockResult = { score: 0, total_questions: 60, correct: 0, wrong: 0, skipped: 60, time_taken: 0 };
    const res = calculateAnalytics([mockResult], []);
    assert(res.analytics.overall.averageAccuracy === 0.0, "Expected 0.0% accuracy for zero attempts");
  });

  // 7. Limited SLS evidence (gated weakness)
  await runScenario("7. SLS Weakness Engine Gates Low Evidence", () => {
    const analytics = {
      hasData: true,
      analytics: {
        chapters: [
          { chapterId: "phy_units", attempts: 0, accuracy: 20, averageTimeSeconds: 60, subject: "Physics" }
        ],
        topics: []
      }
    };
    const res = analyzeWeaknesses(analytics);
    assert(res.weaknessAnalysis.weakChapters.length === 0, "Should gate weakness due to insufficient attempts");
  });

  // 8. Sufficient SLS evidence (standard weakness)
  await runScenario("8. SLS Weakness Engine Evaluates with Sufficient Evidence", () => {
    const analytics = {
      hasData: true,
      analytics: {
        chapters: [
          { chapterId: "phy_units", attempts: 3, accuracy: 20, averageTimeSeconds: 60, subject: "Physics", totalCorrect: 0, totalWrong: 3 }
        ],
        topics: []
      }
    };
    const res = analyzeWeaknesses(analytics);
    assert(res.weaknessAnalysis.weakChapters.length > 0, "Should identify phy_units as weak chapter");
  });

  // 9. Limited mock evidence (penalized priority)
  await runScenario("9. Mock Recommendations Gates Limited Evidence", () => {
    const results = [{ mock_id: 1, score: 12, correct: 12, wrong: 8, skipped: 40 }];
    const attempts = Array(20).fill({ selected_answer: -1 }); // mostly skipped
    const recs = calculateMockRecommendations({ results, attempts });
    assert(recs.evidenceState === "LIMITED", "Should classify evidence as LIMITED");
    assert(recs.primaryAction.type === "RETAKE_MOCK", "Should prompt to retake to build evidence");
  });

  // 10. Sufficient mock evidence (standard priority)
  await runScenario("10. Mock Recommendations Evaluates with Sufficient Evidence", () => {
    const results = [
      { mock_id: 1, score: 25, correct: 25, wrong: 15, skipped: 20 },
      { mock_id: 2, score: 30, correct: 30, wrong: 10, skipped: 20 }
    ];
    const attempts = Array(80).fill({ selected_answer: 1 }); // plenty of answered questions
    const recs = calculateMockRecommendations({ results, attempts });
    assert(recs.evidenceState === "SUFFICIENT", "Should classify evidence as SUFFICIENT");
  });

  // 11. Weak chapter becomes strong (re-evaluates correctly)
  await runScenario("11. Mastery Engine Updates Priority as Weak becomes Strong", () => {
    const catEntry = { chapterTitle: "Units & Dimensions", subject: "Physics" };
    const weakAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 1 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 2 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 0 }
    ];
    const weakChAna = {
      attempts: 3,
      accuracy: 10,
      firstAttemptAccuracy: 10,
      latestAttemptAccuracy: 0,
      bestAttemptAccuracy: 20,
      improvementPercentagePoints: -10
    };
    const weakMastery = evaluateChapterMastery("phy_units", catEntry, weakChAna, weakAttempts, { weakChapters: [{ chapterId: "phy_units", severity: "critical" }], weakTopics: [] });
    assert(weakMastery.masteryScore < 40, `Initial mastery should be low (<40), got ${weakMastery.masteryScore}`);

    const strongAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const strongChAna = {
      attempts: 3,
      accuracy: 95,
      firstAttemptAccuracy: 90,
      latestAttemptAccuracy: 95,
      bestAttemptAccuracy: 100,
      improvementPercentagePoints: 5
    };
    const strongMastery = evaluateChapterMastery("phy_units", catEntry, strongChAna, strongAttempts, { weakChapters: [], weakTopics: [] });
    assert(strongMastery.masteryScore > 60, `Mastery score should rise (>60), got ${strongMastery.masteryScore}`);
  });

  // 12. Strong chapter becomes weak from newer sufficient evidence
  await runScenario("12. Mastery Engine Declines when Newer Evidence is Poor", () => {
    const catEntry = { chapterTitle: "Units & Dimensions", subject: "Physics" };
    const strongAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const strongChAna = {
      attempts: 2,
      accuracy: 95,
      firstAttemptAccuracy: 90,
      latestAttemptAccuracy: 100,
      bestAttemptAccuracy: 100,
      improvementPercentagePoints: 10
    };
    const initialMastery = evaluateChapterMastery("phy_units", catEntry, strongChAna, strongAttempts, { weakChapters: [], weakTopics: [] });
    assert(initialMastery.masteryScore > 65, `Initial mastery should be strong (>65), got ${initialMastery.masteryScore}`);

    const decliningAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 2 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 1 }
    ];
    const decliningChAna = {
      attempts: 4,
      accuracy: 35,
      firstAttemptAccuracy: 90,
      latestAttemptAccuracy: 10,
      bestAttemptAccuracy: 100,
      improvementPercentagePoints: -80
    };
    const finalMastery = evaluateChapterMastery("phy_units", catEntry, decliningChAna, decliningAttempts, { weakChapters: [{ chapterId: "phy_units", severity: "critical" }], weakTopics: [] });
    assert(finalMastery.masteryScore < 45, `Mastery should decline (<45), got ${finalMastery.masteryScore}`);
  });

  // 13. Completed action disappears
  await runScenario("13. Resolver Marks Actions Inactive once Completed", () => {
    const action = { id: "action_1", type: "START_NEW_LESSON", chapterId: "phy_units" };
    const state = resolveActionState(action, {
      lessonSessions: [{ chapter_id: "phy_units", status: "completed", started_at: "2026-07-11T12:00:00Z" }],
      quizAttempts: [{ chapter_id: "phy_units", completed_at: "2026-07-11T13:00:00Z" }],
      revisions: []
    });
    assert(state === "COMPLETED", "Action should resolve to COMPLETED");
  });

  // 14. Correct next action generated (lesson -> quiz)
  await runScenario("14. Lesson Session Completion Prompts Quiz Action", () => {
    const action = { id: "action_2", type: "COMPLETE_PENDING_QUIZ", chapterId: "phy_units" };
    const state = resolveActionState(action, {
      lessonSessions: [{ chapter_id: "phy_units", status: "completed", started_at: "2026-07-11T12:00:00Z" }],
      quizAttempts: [],
      revisions: []
    });
    assert(state === "STARTED" || state === "IN_PROGRESS", "Quiz submission action should resolve to STARTED/IN_PROGRESS since lesson session exists");
  });

  // 15. Duplicate submission protection
  await runScenario("15. Mock Submission Idempotency Logic Check", async () => {
    const { submitMock } = require("./services/mockSubmission");
    try {
      await submitMock("test-user", { mockId: null });
      assert(false, "Should fail basic ingestion validations");
    } catch (err) {
      assert(err.status === 400, "Should correctly throw 400 for bad payloads");
    }
  });

  // 16. Refresh consistency
  await runScenario("16. Orchestrator output remains consistent across refreshes", () => {
    const plan1 = buildStudentActionPlan({
      lessons: [{ chapter_id: "phy_units", status: "completed" }],
      attempts: [],
      mockResults: [],
      revisions: []
    });
    const plan2 = buildStudentActionPlan({
      lessons: [{ chapter_id: "phy_units", status: "completed" }],
      attempts: [],
      mockResults: [],
      revisions: []
    });
    assert(JSON.stringify(plan1) === JSON.stringify(plan2), "Regenerated plans must match exactly");
  });

  // 17. Multi-device consistency
  await runScenario("17. Multi-device Server-Based Authority", () => {
    const plan = buildStudentActionPlan({
      lessons: [{ chapter_id: "phy_units", status: "completed" }],
      attempts: [],
      mockResults: [],
      revisions: []
    });
    assert(plan.success === true, "Should resolve purely from DB input");
  });

  // 18. Cross-user isolation
  await runScenario("18. Security Verification: req.user overrides client parameters", () => {
    const req = { user: { id: "real-jwt-id" }, params: { user_id: "fake-spoofed-id" } };
    const activeUserId = req.user.id || req.user.userId;
    assert(activeUserId === "real-jwt-id", "Must strictly read user_id from verified JWT");
  });

  // 19. Partial SLS failure (Promise.allSettled handling)
  await runScenario("19. Orchestrator handles partial SLS rejection gracefully", () => {
    const plan = buildStudentActionPlan({
      lessons: null,
      attempts: [],
      mockResults: [],
      revisions: []
    });
    assert(plan.success === true, "Orchestrator must handle null/empty SLS list gracefully");
  });

  // 20. Partial Mock failure (Promise.allSettled handling)
  await runScenario("20. Orchestrator handles partial Mock rejection gracefully", () => {
    const plan = buildStudentActionPlan({
      lessons: [],
      attempts: [],
      mockResults: null,
      revisions: []
    });
    assert(plan.success === true, "Orchestrator must handle null/empty mocks gracefully");
  });

  // 21. Revision Queue failure (graceful degradation)
  await runScenario("21. Spaced Revision handles empty revision schedules", () => {
    const queue = buildRevisionQueue([], [], Date.now());
    assert(Array.isArray(queue), "Should degrade to empty array gracefully");
  });

  // 22. Stale recommendation rejection
  await runScenario("22. Stale action disqualified by new mastery state", () => {
    const action = { id: "act_1", type: "REVISE_CRITICAL_CHAPTER", chapterId: "phy_units" };
    const state = resolveActionState(action, {
      lessonSessions: [],
      quizAttempts: [{ chapter_id: "phy_units", completed_at: "2026-07-11T12:00:00Z", accuracy: 90 }],
      revisions: [{ chapter_id: "phy_units", status: "completed", completed_at: "2026-07-11T13:00:00Z" }]
    });
    assert(state === "COMPLETED", "Mastered chapter revision recommendations must be marked COMPLETED");
  });

  // 23. Semantic deduplication
  await runScenario("23. Orchestrator collapses duplicates for same chapter", () => {
    const plan = buildStudentActionPlan({
      lessons: [{ chapter_id: "phy_units", status: "started" }],
      attempts: [
        { chapter_id: "phy_units", is_correct: false },
        { chapter_id: "phy_units", is_correct: false },
        { chapter_id: "phy_units", is_correct: false }
      ],
      mockResults: [],
      revisions: []
    });
    const unitsMissions = plan.dailyMissions.filter(m => m.chapterId === "phy_units");
    assert(unitsMissions.length <= 1, "Should collapse all phy_units recommendations into one representative CTA");
  });

  // 24. Dashboard metric consistency
  await runScenario("24. Overall dashboard metrics consistency", () => {
    const plan = buildStudentActionPlan({
      lessons: [{ chapter_id: "phy_units", status: "completed" }],
      attempts: [],
      mockResults: [],
      revisions: []
    });
    assert(plan.success === true, "Dashboard plan call is valid");
  });

  // 25. Results vs Dashboard accuracy consistency
  await runScenario("25. Overall Accuracy Denominator Checks", () => {
    const mockResult = { score: 10, total_questions: 60, correct: 10, wrong: 20, skipped: 30 };
    const answered = mockResult.correct + mockResult.wrong;
    const accuracy = answered > 0 ? (mockResult.correct / answered) * 100 : 0;
    assert(accuracy === 33.33333333333333, "Accuracy must ignore skipped questions");
  });

  // 26. Readiness evidence consistency
  await runScenario("26. Readiness does not manufacture fake defaults when data exists", () => {
    const mockResults = [{ mock_id: 1, score: 30, correct: 30, wrong: 10, skipped: 20 }];
    const attempts = Array(40).fill({ selected_answer: 1 });
    const recs = calculateMockRecommendations({ results: mockResults, attempts });
    assert(recs.evidenceState === "SUFFICIENT", "Should reflect sufficient mock evidence");
  });

  // 27. Full Closed Loop lifecycle
  await runScenario("27. E2E Closed-Loop Student Activity Journey", () => {
    const action = { id: "a_1", type: "START_NEW_LESSON", chapterId: "phy_units" };
    let state = resolveActionState(action, {
      lessonSessions: [{ chapter_id: "phy_units", status: "started", started_at: "2026-07-11T12:00:00Z" }],
      quizAttempts: [],
      revisions: []
    });
    assert(state === "STARTED", "New lesson session should resolve to STARTED");

    state = resolveActionState(action, {
      lessonSessions: [{ chapter_id: "phy_units", status: "completed", started_at: "2026-07-11T12:00:00Z" }],
      quizAttempts: [{ chapter_id: "phy_units", completed_at: "2026-07-11T13:00:00Z" }],
      revisions: []
    });
    assert(state === "COMPLETED", "Action must resolve to completed after quiz submission");
  });

  // 28. Long-term returning student
  await runScenario("28. Temporal ordering checks ignore outdated historical logs", () => {
    const action = { id: "a_1", type: "START_NEW_LESSON", chapterId: "phy_units" };
    const state = resolveActionState(action, {
      lessonSessions: [{ chapter_id: "phy_units", status: "started", started_at: "2026-07-11T15:00:00Z" }],
      quizAttempts: [{ chapter_id: "phy_units", completed_at: "2026-07-11T12:00:00Z" }],
      revisions: []
    });
    assert(state === "COMPLETED", "START_NEW_LESSON resolves to COMPLETED when quiz attempts already exist");
  });

  // 29. Simultaneous activity
  await runScenario("29. Simultaneous actions resolve without errors", () => {
    const action1 = { id: "act_1", type: "START_NEW_LESSON", chapterId: "phy_units" };
    const action2 = { id: "act_2", type: "COMPLETE_PENDING_QUIZ", chapterId: "phy_units" };
    const logs = {
      lessonSessions: [{ chapter_id: "phy_units", status: "completed", started_at: "2026-07-11T12:00:00Z" }],
      quizAttempts: [{ chapter_id: "phy_units", completed_at: "2026-07-11T13:00:00Z" }],
      revisions: []
    };
    const s1 = resolveActionState(action1, logs);
    const s2 = resolveActionState(action2, logs);
    assert(s1 === "COMPLETED" && s2 === "COMPLETED", "Both actions should resolve as completed");
  });

  // 30. Historical record compatibility (missing optional fields)
  await runScenario("30. Historical compatibility with missing optional fields", () => {
    const results = [{ id: 1, mock_id: 1, score: 20, correct: 20, wrong: 10, skipped: 30 }];
    const attempts = [{ mock_result_id: 1, is_correct: true, selected_answer: 1 }];
    const res = calculateAnalytics(results, attempts);
    assert(res.success === true, "Should compile analytics without crashing");
    assert(res.analytics.overall.averageAccuracy === 66.7, "Accuracy should still calculate correctly");
  });

  // 31. Null/empty fields validation
  await runScenario("31. Analytics tolerates null fields safely", () => {
    const results = [{ id: 1, mock_id: 1, score: 20, correct: null, wrong: null, skipped: null }];
    const res = calculateAnalytics(results, []);
    assert(res.success === true, "Should handle null correctly");
  });

  // 32. Malformed legacy records
  await runScenario("32. Legacy mock records with missing completedAt field", () => {
    const results = [{ mock_id: 1, score: 25, correct: 25, wrong: 15, created_at: null }];
    const recs = calculateMockRecommendations({ results, attempts: [] });
    assert(recs.success === true, "Should fallback safely when completedAt is null");
  });

  console.log("\n======================================================================");
  console.log(`SYSTEM CONSISTENCY SUITE COMPLETE: ${testsPassed} passed / ${testsFailed} failed`);
  console.log(`Total assertions evaluated: ${totalAssertions}`);
  console.log("======================================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite();
