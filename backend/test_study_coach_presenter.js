const assert = require("assert");
const { presentStudyCoach } = require("./services/studyCoachPresenter");

console.log("=== Running Study Coach Presenter V2 Unit Tests ===\n");

function runTest(name, fn) {
  try {
    fn();
    console.log(`-> Pass: ${name}`);
  } catch (err) {
    console.error(`-> Fail: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. New user with zero evidence
runTest("Scenario 1: Completely new user with no evidence", () => {
  const result = presentStudyCoach({
    actionPlan: { primaryAction: null, secondaryActions: [] },
    quizAttempts: [],
    mockResults: [],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "insufficient_history"
  });

  assert.strictEqual(result.evidence.level, "NONE");
  assert.strictEqual(result.coachSummary.status, "GETTING_STARTED");
  assert.strictEqual(result.coachSummary.title, "Start building your study profile");
  assert.strictEqual(result.plan.actionCount, 0);
});

// 2. Low-evidence user
runTest("Scenario 2: Low-evidence user (attempts < 5)", () => {
  const result = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "active-lesson::phy_units",
        type: "RESUME_ACTIVE_LESSON",
        title: "Resume: Units & Measurements",
        subject: "Physics",
        chapterId: "phy_units"
      },
      secondaryActions: []
    },
    quizAttempts: [{ created_at: "2026-07-12T12:00:00Z" }],
    mockResults: [],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [{}, {}],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "insufficient_history"
  });

  assert.strictEqual(result.evidence.level, "LIMITED");
  assert.strictEqual(result.coachSummary.status, "BUILDING_EVIDENCE");
  assert.strictEqual(result.plan.actionCount, 1);
  assert.strictEqual(result.plan.actions[0].type, "LESSON");
  assert.strictEqual(result.plan.actions[0].estimatedMinutes, 15); // Fallback lesson duration
});

// 3. Sufficient-evidence user with due revision (precedence checks)
runTest("Scenario 3: Sufficient-evidence with due revision as top action", () => {
  const result = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "rev-queue::phy_units",
        type: "COMPLETE_DUE_REVISION",
        title: "Revision: Units & Measurements",
        subject: "Physics",
        chapterId: "phy_units"
      },
      secondaryActions: []
    },
    quizAttempts: [{}, {}, {}, {}],
    mockResults: [{}], // total attempts = 5
    lessonSessions: [],
    revisions: [],
    questionAttempts: [{}, {}, {}, {}],
    rawMockQuestionAttempts: [{}],
    pyqSessionsCount: 0,
    mockTrend: "stable"
  });

  assert.strictEqual(result.evidence.level, "SUFFICIENT");
  assert.strictEqual(result.coachSummary.status, "REVISION_DUE");
  assert.strictEqual(result.plan.actions[0].type, "REVISION");
  assert.strictEqual(result.plan.actions[0].estimatedMinutes, 20); // Fallback revision
});

// 4. Critical weakness precedence over trend
runTest("Scenario 4: Needs focus (critical weakness) precedence", () => {
  const result = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "sls-rec::phy_units::REVISE_CHAPTER",
        type: "REVISE_CRITICAL_CHAPTER",
        title: "Revise: Units & Measurements",
        subject: "Physics",
        chapterId: "phy_units",
        description: "Low accuracy on chapter."
      },
      secondaryActions: []
    },
    quizAttempts: [{}, {}, {}, {}],
    mockResults: [{}],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "stable"
  });

  assert.strictEqual(result.coachSummary.status, "NEEDS_FOCUS");
  assert.strictEqual(result.coachSummary.title, "Strengthen Physics foundations");
});

// 5. Declining performance trend override
runTest("Scenario 5: Declining trend overrides low accuracy needs focus", () => {
  const result = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "sls-rec::phy_units::REVISE_CHAPTER",
        type: "REVISE_CRITICAL_CHAPTER",
        title: "Revise: Units & Measurements",
        subject: "Physics",
        chapterId: "phy_units"
      },
      secondaryActions: []
    },
    quizAttempts: [{}, {}, {}, {}],
    mockResults: [{}],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "declining"
  });

  assert.strictEqual(result.coachSummary.status, "PERFORMANCE_DECLINING");
  assert.strictEqual(result.coachSummary.title, "Action needed: Stabilize scores");
});

// 6. Mock test catalog duration loading
runTest("Scenario 6: Mock duration resolved from mockCatalog.json", () => {
  const result = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "mock-rec::IAT_FULL_01",
        type: "TAKE_RECOMMENDED_MOCK",
        mockId: "IAT_FULL_01",
        title: "IISER IAT Mock #1"
      },
      secondaryActions: []
    },
    quizAttempts: [{}, {}, {}, {}],
    mockResults: [{}],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "stable"
  });

  assert.strictEqual(result.plan.actions[0].type, "FULL_MOCK");
  assert.strictEqual(result.plan.actions[0].estimatedMinutes, 180); // Maps from mockCatalog
  assert.strictEqual(result.plan.actions[0].durationSource, "MOCK_CATALOG");
});

console.log("\nAll Study Coach Presenter V2 Unit Tests passed successfully! 🎉");
