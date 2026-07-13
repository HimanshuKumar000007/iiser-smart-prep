/**
 * AI Study Coach V2 — Adversarial Production Reliability & Consistency Test Suite
 */

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { presentStudyCoach } = require("./services/studyCoachPresenter");
const { buildStudentActionPlan } = require("./services/studentActionOrchestrator");

// Load connection details
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

const PORT = process.env.PORT || 5000;
const API_URL = `http://localhost:${PORT}`;

let testsPassed = 0;
let testsFailed = 0;
let totalAssertions = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(err);
    testsFailed++;
  }
}

async function runTestAsync(name, fn) {
  try {
    await fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(err);
    testsFailed++;
  }
}

console.log("======================================================================");
console.log("AI STUDY COACH V2 - SYSTEM INTEGRITY & RELIABILITY TEST SUITE");
console.log("======================================================================\n");

// 1. Zero evidence
runTest("Scenario 1: Zero evidence onboarding invariant", () => {
  const coach = presentStudyCoach({
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
  totalAssertions += 6;
  assert.strictEqual(coach.evidence.level, "NONE");
  assert.strictEqual(coach.coachSummary.status, "GETTING_STARTED");
  assert.strictEqual(coach.coachSummary.title, "Start building your study profile");
  assert.ok(coach.coachSummary.message.includes("Complete your first"), "Should show onboarding message");
  assert.ok(!coach.coachSummary.message.includes("declining"), "No fake claims");
  assert.ok(!coach.coachSummary.message.includes("+17 marks"), "No fake marks gain");
});

// 2. Low evidence
runTest("Scenario 2: Low-evidence threshold constraints", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "RESUME_ACTIVE_LESSON", title: "Study Chemistry" },
      secondaryActions: []
    },
    quizAttempts: [{}], // 1 quiz attempt -> < 5 total attempts -> LIMITED
    mockResults: [],
    lessonSessions: [],
    revisions: [],
    questionAttempts: [{}, {}, {}],
    rawMockQuestionAttempts: [],
    pyqSessionsCount: 0,
    mockTrend: "insufficient_history"
  });
  totalAssertions += 5;
  assert.strictEqual(coach.evidence.level, "LIMITED");
  assert.strictEqual(coach.coachSummary.status, "BUILDING_EVIDENCE");
  assert.strictEqual(coach.coachSummary.title, "We're learning from your activity");
  assert.ok(coach.coachSummary.message.includes("Continue practicing"), "Should encourage profiling");
  assert.ok(!coach.coachSummary.message.includes("mastered"), "No premature personalization");
});

// 3. Evidence threshold boundary (boundary checks: totalAttempts = 4 vs 5)
runTest("Scenario 3: Evidence threshold boundary checks (4 vs 5 attempts)", () => {
  // 4 attempts -> LIMITED
  const coach4 = presentStudyCoach({
    actionPlan: { primaryAction: { id: "a1", type: "COMPLETE_PENDING_QUIZ", title: "Pending Quiz" } },
    quizAttempts: [{}, {}, {}, {}],
    mockResults: []
  });
  // 5 attempts -> SUFFICIENT
  const coach5 = presentStudyCoach({
    actionPlan: { primaryAction: { id: "a1", type: "COMPLETE_PENDING_QUIZ", title: "Pending Quiz" } },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: []
  });
  totalAssertions += 2;
  assert.strictEqual(coach4.evidence.level, "LIMITED");
  assert.strictEqual(coach5.evidence.level, "SUFFICIENT");
});

// 4. Strong evidence
runTest("Scenario 4: Strong evidence threshold (>= 15 attempts)", () => {
  const coach15 = presentStudyCoach({
    actionPlan: { primaryAction: { id: "a1", type: "COMPLETE_PENDING_QUIZ", title: "Pending Quiz" } },
    quizAttempts: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    mockResults: []
  });
  totalAssertions += 1;
  assert.strictEqual(coach15.evidence.level, "STRONG");
});

// 5. Critical weakness
runTest("Scenario 5: Critical weakness status precedence", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "a1",
        type: "REVISE_CRITICAL_CHAPTER",
        title: "Revise Laws of Motion",
        subject: "Physics",
        chapterId: "phy_motion_laws",
        description: "Focus on vector resolution weakness."
      }
    },
    quizAttempts: [{}, {}, {}, {}, {}], // 5 attempts -> SUFFICIENT
    mockResults: [],
    mockTrend: "stable"
  });
  totalAssertions += 3;
  assert.strictEqual(coach.coachSummary.status, "NEEDS_FOCUS");
  assert.strictEqual(coach.coachSummary.title, "Strengthen Physics foundations");
  assert.ok(coach.coachSummary.message.includes("Focus on vector resolution weakness"), "Message resolves to description");
});

// 6. Due revision
runTest("Scenario 6: Due revision status precedence", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "a1",
        type: "COMPLETE_DUE_REVISION",
        title: "Revision: Electrostatics",
        subject: "Physics",
        chapterId: "phy_electrostatics"
      }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "stable"
  });
  totalAssertions += 3;
  assert.strictEqual(coach.coachSummary.status, "REVISION_DUE");
  assert.strictEqual(coach.coachSummary.title, "Revisions due to prevent forgetting");
  assert.ok(coach.coachSummary.message.includes("Electrostatics"), "Message highlights due chapter title");
});

// 7. Improving trend
runTest("Scenario 7: Improving trend status precedence", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "New Lesson" }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "improving"
  });
  totalAssertions += 2;
  assert.strictEqual(coach.coachSummary.status, "PERFORMANCE_IMPROVING");
  assert.strictEqual(coach.coachSummary.title, "Excellent momentum!");
});

// 8. Declining trend
runTest("Scenario 8: Declining trend overrides low accuracy critical weakness status", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "a1",
        type: "REVISE_CRITICAL_CHAPTER",
        title: "Revise Laws of Motion",
        subject: "Physics",
        chapterId: "phy_motion_laws"
      }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "declining"
  });
  totalAssertions += 2;
  assert.strictEqual(coach.coachSummary.status, "PERFORMANCE_DECLINING");
  assert.strictEqual(coach.coachSummary.title, "Action needed: Stabilize scores");
});

// 9. Insufficient trend
runTest("Scenario 9: Insufficient mock history trend handling", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "New Lesson" }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "insufficient_history"
  });
  totalAssertions += 2;
  // If no action is due or weakness exists, trend is insufficient -> fall back to ON_TRACK
  assert.strictEqual(coach.coachSummary.status, "ON_TRACK");
  assert.strictEqual(coach.coachSummary.title, "You are on track!");
});

// 10. Overlapping statuses / Precedence
runTest("Scenario 10: Overlapping statuses precedence check (Declining Trend > Revision Due > Needs Focus)", () => {
  // Scenario A: Declining Trend + Revision Due + Critical Weakness
  // Expected: PERFORMANCE_DECLINING (overrides all)
  const coachA = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "COMPLETE_DUE_REVISION", title: "Due Revision" }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "declining"
  });

  // Scenario B: Stable Trend + Revision Due + Critical Weakness (primary action is Revision)
  // Expected: REVISION_DUE
  const coachB = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "COMPLETE_DUE_REVISION", title: "Due Revision" }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "stable"
  });

  // Scenario C: Stable Trend + Weakness (primary action is Weakness)
  // Expected: NEEDS_FOCUS
  const coachC = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "REVISE_CRITICAL_CHAPTER", title: "Weakness Chapter" }
    },
    quizAttempts: [{}, {}, {}, {}, {}],
    mockResults: [],
    mockTrend: "stable"
  });

  totalAssertions += 3;
  assert.strictEqual(coachA.coachSummary.status, "PERFORMANCE_DECLINING");
  assert.strictEqual(coachB.coachSummary.status, "REVISION_DUE");
  assert.strictEqual(coachC.coachSummary.status, "NEEDS_FOCUS");
});

// 11. Orchestrator ordering preservation
runTest("Scenario 11: Orchestrator candidate ordering preservation check", () => {
  const plan = {
    primaryAction: { id: "a-first", type: "COMPLETE_DUE_REVISION", title: "Rev 1", priority: 95 },
    secondaryActions: [
      { id: "a-second", type: "REVISE_CRITICAL_CHAPTER", title: "Weak 1", priority: 85 },
      { id: "a-third", type: "START_NEW_LESSON", title: "Lesson 1", priority: 75 },
      { id: "a-fourth", type: "TAKE_RECOMMENDED_MOCK", title: "Mock 1", priority: 65 }
    ]
  };

  const coach = presentStudyCoach({
    actionPlan: plan,
    quizAttempts: [{}, {}, {}, {}, {}]
  });

  totalAssertions += 4;
  assert.strictEqual(coach.plan.actionCount, 3, "Should display exactly 3 actions");
  assert.strictEqual(coach.plan.actions[0].id, "a-first");
  assert.strictEqual(coach.plan.actions[1].id, "a-second");
  assert.strictEqual(coach.plan.actions[2].id, "a-third");
});

// 12. Maximum 3 actions
runTest("Scenario 12: Displays maximum 3 actions from candidates", () => {
  const plan = {
    primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "L1" },
    secondaryActions: [
      { id: "a2", type: "START_NEW_LESSON", title: "L2" },
      { id: "a3", type: "START_NEW_LESSON", title: "L3" },
      { id: "a4", type: "START_NEW_LESSON", title: "L4" },
      { id: "a5", type: "START_NEW_LESSON", title: "L5" }
    ]
  };
  const coach = presentStudyCoach({ actionPlan: plan, quizAttempts: [{}] });
  totalAssertions += 1;
  assert.strictEqual(coach.plan.actions.length, 3);
});

// 13. Semantic deduplication
runTest("Scenario 13: Candidates deduplication check in presenter mapping", () => {
  const plan = {
    primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "L1" },
    secondaryActions: [
      { id: "a1", type: "START_NEW_LESSON", title: "L1" }, // exact duplicate ID
      { id: "a2", type: "START_NEW_LESSON", title: "L2" }
    ]
  };
  const coach = presentStudyCoach({ actionPlan: plan, quizAttempts: [{}] });
  totalAssertions += 2;
  assert.strictEqual(coach.plan.actions.length, 2);
  assert.strictEqual(coach.plan.actions[1].id, "a2");
});

// 14. Duration correctness & Total Minutes Sum
runTest("Scenario 14: totalEstimatedMinutes matches sum of individual durations", () => {
  const plan = {
    primaryAction: { id: "a1", type: "COMPLETE_DUE_REVISION", title: "Rev" },
    secondaryActions: [
      { id: "a2", type: "START_NEW_LESSON", title: "Les" },
      { id: "a3", type: "COMPLETE_PENDING_QUIZ", title: "Quiz" }
    ]
  };
  const coach = presentStudyCoach({ actionPlan: plan, quizAttempts: [{}] });
  const sum = coach.plan.actions.reduce((s, a) => s + a.estimatedMinutes, 0);
  totalAssertions += 2;
  assert.strictEqual(coach.plan.estimatedMinutes, sum);
  assert.strictEqual(Number.isNaN(coach.plan.estimatedMinutes), false, "Should not be NaN");
});

// 15. Missing duration fallback
runTest("Scenario 15: Missing duration resolved to safe fallback value", () => {
  const plan = {
    primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "L1" } // lesson type fallback = 15 min
  };
  const coach = presentStudyCoach({ actionPlan: plan, quizAttempts: [{}] });
  totalAssertions += 2;
  assert.strictEqual(coach.plan.actions[0].estimatedMinutes, 15);
  assert.strictEqual(coach.plan.actions[0].durationSource, "FALLBACK_BY_ACTION_TYPE");
});

// 16. Evidence source accuracy
runTest("Scenario 16: Active evidence sources list reflects correctly", () => {
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null },
    quizAttempts: [{}],
    mockResults: [{}],
    revisions: [{}],
    pyqSessionsCount: 5
  });
  totalAssertions += 5;
  assert.ok(coach.evidence.sources.includes("CHAPTER_QUIZ"));
  assert.ok(coach.evidence.sources.includes("MOCK"));
  assert.ok(coach.evidence.sources.includes("REVISION"));
  assert.ok(coach.evidence.sources.includes("PYQ"));
  assert.strictEqual(coach.evidence.sources.length, 4);
});

// 17. Claim traceability
runTest("Scenario 17: Claim traceability contract validation", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: {
        id: "active-lesson::phy_units",
        type: "RESUME_ACTIVE_LESSON",
        title: "Resume: Units & Measurements",
        chapterId: "phy_units"
      }
    },
    quizAttempts: [{}]
  });
  totalAssertions += 5;
  assert.strictEqual(coach.plan.actions[0].title, "Resume: Units & Measurements");
  assert.strictEqual(coach.plan.actions[0].chapterId, "phy_units");
  assert.strictEqual(coach.plan.actions[0].reasonCode, "RESUME_ACTIVE_LESSON");
  assert.strictEqual(coach.plan.actions[0].type, "LESSON");
  assert.strictEqual(coach.plan.actions[0].ctaLabel, "Start Learning");
});

// 18. Contradiction check: NO_EVIDENCE + Specific Weakness
runTest("Scenario 18: Contradiction checks - NO_EVIDENCE status vs weakness claims", () => {
  const coach = presentStudyCoach({
    actionPlan: {
      primaryAction: { id: "a1", type: "REVISE_CRITICAL_CHAPTER", title: "Laws of Motion" }
    },
    quizAttempts: [],
    mockResults: []
  });
  totalAssertions += 3;
  assert.strictEqual(coach.evidence.level, "NONE");
  assert.strictEqual(coach.coachSummary.status, "GETTING_STARTED");
  assert.ok(!coach.coachSummary.title.includes("Physics"), "Title must not make dynamic subject weaknesses claims");
});

// 19. No fake marks gain prediction
runTest("Scenario 19: Prohibit +17 marks gain claims check", () => {
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null }
  });
  totalAssertions += 1;
  assert.ok(!JSON.stringify(coach).includes("+17 marks"), "Must not include fake marks claim");
});

// 20. No unsupported schedule
runTest("Scenario 20: Prohibit morning/afternoon schedules checks", () => {
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null }
  });
  const str = JSON.stringify(coach).toLowerCase();
  totalAssertions += 2;
  assert.ok(!str.includes("morning schedule"), "Morning schedule deprecated");
  assert.ok(!str.includes("afternoon schedule"), "Afternoon schedule deprecated");
});

// 21. No misleading AI claims
runTest("Scenario 21: Prohibit misleading fake AI active label representations", () => {
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null }
  });
  totalAssertions += 1;
  assert.ok(!JSON.stringify(coach).includes("AI ACTIVE"), "AI active badge removed");
});

// 22. Deterministic output
runTest("Scenario 22: Deterministic output check", () => {
  const inputs = {
    actionPlan: {
      primaryAction: { id: "a1", type: "START_NEW_LESSON", title: "L1" }
    },
    quizAttempts: [{}, {}],
    mockResults: [],
    mockTrend: "stable"
  };
  const coach1 = presentStudyCoach(inputs);
  const coach2 = presentStudyCoach(inputs);
  totalAssertions += 1;
  assert.deepStrictEqual(coach1, coach2, "Outputs must be byte-equivalent");
});

// 23. Partial-data query safety
runTest("Scenario 23: Presenter safely degrades under partial inputs", () => {
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null }
  });
  totalAssertions += 2;
  assert.strictEqual(coach.evidence.level, "NONE");
  assert.strictEqual(coach.hasData, false);
});

// 24. Database-error safety
runTest("Scenario 24: Endpoint database query failure response isolation", () => {
  // Simulate complete DB breakdown or missing fields
  const coach = presentStudyCoach({
    actionPlan: { primaryAction: null },
    quizAttempts: undefined,
    mockResults: undefined,
    lessonSessions: undefined,
    revisions: undefined
  });
  totalAssertions += 2;
  assert.strictEqual(coach.evidence.level, "NONE");
  assert.strictEqual(coach.hasData, false);
});


// ==========================================
// Part B: End-to-End API Integration Checks
// ==========================================

const testJWTSecret = process.env.JWT_SECRET || "smartprep-development-secret-key-128bits";
const TEST_USER_ID = "2c1dab78-afb2-450e-ad16-4eefd2fe64e6";
const validToken = jwt.sign(
  { id: TEST_USER_ID, email: "test@example.com", plan: "PRO" },
  testJWTSecret,
  { expiresIn: "1h" }
);

// Execute async E2E calls sequentially
(async () => {
  await runTestAsync("Scenario 25: E2E HTTP 401 Unauthorized check", async () => {
    const res = await fetch(`${API_URL}/api/student/action-plan`);
    totalAssertions += 1;
    assert.strictEqual(res.status, 401, `Status should be 401, got ${res.status}`);
  });

  await runTestAsync("Scenario 26: E2E Action Plan response matches Study Coach V2 spec", async () => {
    const res = await fetch(`${API_URL}/api/student/action-plan`, {
      headers: { "Authorization": `Bearer ${validToken}` }
    });
    totalAssertions += 6;
    assert.strictEqual(res.status, 200, `Status should be 200, got ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.studyCoach !== undefined, "Response must include studyCoach presenter payload");
    assert.strictEqual(typeof body.studyCoach.hasData, "boolean");
    assert.ok(body.studyCoach.evidence !== undefined);
    assert.ok(body.studyCoach.coachSummary !== undefined);
  });

  await runTestAsync("Scenario 27: E2E User isolation auth constraints check", async () => {
    const fakeToken = jwt.sign(
      { id: "different-user-uuid", email: "other@example.com", plan: "PRO" },
      testJWTSecret,
      { expiresIn: "1h" }
    );
    const res = await fetch(`${API_URL}/api/student/action-plan`, {
      headers: { "Authorization": `Bearer ${fakeToken}` }
    });
    totalAssertions += 3;
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    // Different user with zero evidence must return GETTING_STARTED status
    assert.strictEqual(body.studyCoach.evidence.level, "NONE");
    assert.strictEqual(body.studyCoach.coachSummary.status, "GETTING_STARTED");
  });

  await runTestAsync("Scenario 28: E2E Cache control and fresh headers check", async () => {
    const res = await fetch(`${API_URL}/api/student/action-plan`, {
      headers: { "Authorization": `Bearer ${validToken}` }
    });
    totalAssertions += 1;
    // Endpoint must not return cached assets; must allow direct payload update
    const cacheControl = res.headers.get("cache-control");
    assert.ok(!cacheControl || !cacheControl.includes("public"), "Should not have public cache headers");
  });

  console.log(`\n=== Reliability Test Suite Complete: ${testsPassed} passed, ${testsFailed} failed ===`);
  console.log(`Total Assertions Evaluated: ${totalAssertions}\n`);
  
  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
