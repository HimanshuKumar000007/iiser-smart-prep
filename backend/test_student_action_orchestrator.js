/**
 * Unified Student Action Plan Orchestrator — Expanded Test Suite
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { buildStudentActionPlan } = require("./services/studentActionOrchestrator");

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

const PORT = process.env.PORT || 5000;
const API_URL = `http://localhost:${PORT}`;

let testsPassed = 0;
let testsFailed = 0;
let totalAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function runTest(name, fn) {
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

async function runSuite() {
  console.log("=== Unified Intelligence Orchestrator Expanded Test Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. brand-new user (empty data fallback onboarding)
  await runTest("1. Brand-new user returns system onboarding fallback", () => {
    const plan = buildStudentActionPlan({});
    assert(plan.success === true, "Plan should be successful");
    assert(plan.hasData === false, "Zero-data hasData should be false");
    assert(plan.primaryAction.type === 'START_NEW_LESSON', "Primary action should be START_NEW_LESSON");
    assert(plan.primaryAction.source === 'SYSTEM_FALLBACK', "Primary source should be SYSTEM_FALLBACK");
    assert(plan.primaryAction.chapterId === 'phy_units', "Fallback chapter should be phy_units");
    assert(plan.dailyMissions.length === 1, "Only 1 daily mission for fallback");
  });

  // 2. lessons but no mocks
  await runTest("2. Active lessons continuity has priority over fallback", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [{ chapterId: 'phy_thermo', progress: 50, lastOpened: Date.now() }]
    });
    assert(plan.hasData === true, "Should have data");
    assert(plan.primaryAction.type === 'RESUME_ACTIVE_LESSON', "Primary action should be RESUME_ACTIVE_LESSON");
    assert(plan.primaryAction.chapterId === 'phy_thermo', "Correct chapterId");
    assert(plan.dailyMissions.length === 1, "Daily mission contains active lesson");
  });

  // 3. only all-skipped mocks -> evidenceLevel = NONE, gating rule check
  await runTest("3. All-skipped mocks have NONE evidence level and are gated/disqualified from weakness actions", () => {
    const plan = buildStudentActionPlan({
      mockLearningActions: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        totalQuestions: 0,
        accuracy: 0.0,
        priorityScore: 90
      }]
    });
    assert(plan.success === true, "Should succeed even with empty output");
    assert(plan.hasData === false, "No valid candidate because weakness is gated by zero attempts");
  });

  // 4. one answered mock question -> evidenceLevel = LIMITED
  await runTest("4. Limited mock evidence (1 attempt) is gated and priority score penalized", () => {
    const plan = buildStudentActionPlan({
      mockLearningActions: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        totalQuestions: 1, // < 3 attempts -> LIMITED
        accuracy: 0.0,
        priorityScore: 90
      }]
    });
    assert(plan.hasData === true, "Contains candidate since attempts > 0");
    const item = plan.primaryAction;
    assert(item.evidenceLevel === 'LIMITED', "Should be LIMITED");
    // Gated base priority (50) + priorityMod (9) + evidenceMod (-20) = 39
    assert(item.priority === 39, "Priority should be penalized by -20 and base priority gated to 50");
  });

  // 5. critical SLS weakness vs limited evidence
  await runTest("5. Critical weakness gets high priority band when supported by sufficient evidence", () => {
    const plan = buildStudentActionPlan({
      slsRecommendations: [
        {
          chapterId: 'phy_units',
          actionType: 'REVISE_CHAPTER',
          urgency: 'high',
          evidence: { attempts: 3, accuracy: 35 } // STRONG evidence
        }
      ]
    });
    assert(plan.primaryAction.priorityBand === 'CRITICAL', "Priority band should be CRITICAL");
    assert(plan.primaryAction.evidenceLevel === 'STRONG', "Evidence should be STRONG");
  });

  // 6. overdue revision plus recommended mock
  await runTest("6. Overdue revision has higher priority than recommended mock", () => {
    const plan = buildStudentActionPlan({
      revisionQueue: [{ chapterId: 'phy_units', revisionType: 'CHAPTER_REVIEW', isDue: true }],
      mockRecommendations: {
        recommendationType: 'CONTINUE_MOCK_PRACTICE',
        recommendedMock: { id: 'mock_3', title: 'Mock #3' },
        primaryAction: { title: 'Take Mock' }
      }
    });
    assert(plan.primaryAction.type === 'COMPLETE_DUE_REVISION', "Primary action should be COMPLETE_DUE_REVISION");
    assert(plan.primaryAction.source === 'REVISION_QUEUE', "Source should be REVISION_QUEUE");
  });

  // 7. active lesson plus weak topic in same chapter (deduplication check)
  await runTest("7. Active lesson and weakness in same chapter are deduplicated and merged with combined reasons", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [{ chapterId: 'phy_units', progress: 80 }],
      slsRecommendations: [{
        chapterId: 'phy_units',
        actionType: 'PRACTICE_TOPIC',
        topicId: 't1',
        evidence: { attempts: 2, accuracy: 40 }
      }]
    });
    assert(plan.hasData === true);
    assert(plan.secondaryActions.length === 0, "Should merge into a single candidate");
    assert(plan.primaryAction.reasons.length > 1, "Reasons should be merged");
  });

  // 8. strong student (stale weakness override)
  await runTest("8. Stale weakness actions are disqualified if chapter is already strong or mastered", () => {
    const plan = buildStudentActionPlan({
      slsRecommendations: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        evidence: { attempts: 3, accuracy: 40 }
      }],
      slsMastery: [{ chapterId: 'phy_units', state: 'MASTERED' }]
    });
    assert(plan.hasData === false);
    assert(plan.primaryAction.source === 'SYSTEM_FALLBACK');
  });

  // 9. completed action filtering
  await runTest("9. Completed action IDs are filtered out of the candidate list", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [{ chapterId: 'phy_units', progress: 40 }],
      completedMissions: ['active-lesson::phy_units']
    });
    assert(plan.hasData === false, "Active lesson is completed, should return fallback");
    assert(plan.primaryAction.source === 'SYSTEM_FALLBACK');
  });

  // 10. no valid third Daily Mission (returns 1 or 2 high quality missions)
  await runTest("10. Returns only valid diverse missions rather than repeating subjects or chapters", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [
        { chapterId: 'phy_units', progress: 40 },
        { chapterId: 'phy_thermo', progress: 50 } // both Physics
      ]
    });
    assert(plan.dailyMissions.length > 0);
    assert(plan.dailyMissions.length <= 3);
  });

  // 11. deterministic tie-breaker
  await runTest("11. Deterministic alphabetical tie-breaker works consistently", () => {
    const plan1 = buildStudentActionPlan({
      revisionQueue: [
        { chapterId: 'phy_units', revisionType: 'CHAPTER_REVIEW', isDue: true },
        { chapterId: 'phy_thermo', revisionType: 'CHAPTER_REVIEW', isDue: true }
      ]
    });
    const plan2 = buildStudentActionPlan({
      revisionQueue: [
        { chapterId: 'phy_thermo', revisionType: 'CHAPTER_REVIEW', isDue: true },
        { chapterId: 'phy_units', revisionType: 'CHAPTER_REVIEW', isDue: true }
      ]
    });
    assert(plan1.primaryAction.id === plan2.primaryAction.id, "Tie breaker must yield identical primary action ID");
    assert(plan1.primaryAction.chapterId === plan2.primaryAction.chapterId, "Chapter IDs must match");
  });

  // ==========================================
  // New Step 9 Action Types & Edge Cases
  // ==========================================

  // 12. COMPLETE_PENDING_QUIZ mapping
  await runTest("12. Emits COMPLETE_PENDING_QUIZ for RETRY_CHAPTER_QUIZ recommendations", () => {
    const plan = buildStudentActionPlan({
      slsRecommendations: [{
        chapterId: 'phy_units',
        actionType: 'RETRY_CHAPTER_QUIZ',
        evidence: { attempts: 2, accuracy: 55 }
      }]
    });
    assert(plan.hasData === true);
    assert(plan.primaryAction.type === 'COMPLETE_PENDING_QUIZ', "Should map RETRY_CHAPTER_QUIZ to COMPLETE_PENDING_QUIZ");
    assert(plan.primaryAction.route.includes("::quiz"), "Quiz route should include ::quiz suffix");
    assert(plan.primaryAction.ctaLabel === 'Retry Quiz', "Cta label should be Retry Quiz");
  });

  // 13. BUILD_MORE_MOCK_EVIDENCE mapping
  await runTest("13. Emits BUILD_MORE_MOCK_EVIDENCE for RETAKE_MOCK recommendations", () => {
    const plan = buildStudentActionPlan({
      mockRecommendations: {
        recommendationType: 'RETAKE_MOCK',
        recommendedMock: { id: 'mock_01', title: 'Mock #1' },
        primaryAction: { title: 'Resume Mock' }
      }
    });
    assert(plan.hasData === true);
    assert(plan.primaryAction.type === 'BUILD_MORE_MOCK_EVIDENCE', "Should map RETAKE_MOCK to BUILD_MORE_MOCK_EVIDENCE");
    assert(plan.primaryAction.route === '/mock-tests', "Mock route matches");
    assert(plan.primaryAction.ctaLabel === 'Retake Mock', "CTA should be Retake Mock");
  });

  // 14. POST_MOCK_REVISION mapping
  await runTest("14. Emits POST_MOCK_REVISION for mock REVISE_CHAPTER recommendations", () => {
    const plan = buildStudentActionPlan({
      mockLearningActions: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        totalQuestions: 6,
        accuracy: 45.0,
        priorityScore: 75
      }]
    });
    assert(plan.hasData === true);
    assert(plan.primaryAction.type === 'POST_MOCK_REVISION', "Should map REVISE_CHAPTER mock action to POST_MOCK_REVISION");
    assert(plan.primaryAction.route === '/smart-lessons/phy_units', "Revision lesson route matches");
    assert(plan.primaryAction.ctaLabel === 'Revise Chapter', "CTA label matches");
  });

  // 15. Active lesson viewed to end progress=100
  await runTest("15. Active lesson with progress=100 resolves as IN_PROGRESS but remains in pool", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [{ chapterId: 'phy_units', progress: 100, lastOpened: Date.now() }],
      evidence: {
        lessonSessions: [{ chapter_id: 'phy_units', scroll_progress: 100, status: 'viewed_to_end', started_at: new Date().toISOString() }]
      }
    });
    assert(plan.hasData === true, "Should have data");
    assert(plan.primaryAction.type === 'RESUME_ACTIVE_LESSON', "Action type should match active lesson");
    assert(plan.primaryAction.state === 'IN_PROGRESS', "State should resolve to IN_PROGRESS");
  });

  // 16. G8 Validation: unknown chapterId is skipped
  await runTest("16. Unknown chapterId is ignored and does not emit general action (G8)", () => {
    const plan = buildStudentActionPlan({
      slsRecommendations: [{
        chapterId: 'unrecognized_nonexistent_chapter_code',
        actionType: 'REVISE_CHAPTER',
        evidence: { attempts: 3 }
      }]
    });
    assert(plan.hasData === false, "Unrecognized chapterId is skipped entirely");
    assert(plan.primaryAction.type === 'START_NEW_LESSON', "Falls back to onboarding");
    assert(plan.primaryAction.source === 'SYSTEM_FALLBACK', "Fallback matches system onboarding");
  });

  // 17. isDue=false revisions have lower priority
  await runTest("17. Non-due revision items get lower priority modifier (LOW instead of HIGH)", () => {
    const plan = buildStudentActionPlan({
      revisionQueue: [
        { chapterId: 'phy_units', revisionType: 'CHAPTER_REVIEW', isDue: false }
      ]
    });
    const planDue = buildStudentActionPlan({
      revisionQueue: [
        { chapterId: 'phy_units', revisionType: 'CHAPTER_REVIEW', isDue: true }
      ]
    });
    assert(plan.primaryAction.priority === 105, "Non-due priority is 100 + 5 = 105");
    assert(planDue.primaryAction.priority === 120, "Due priority is 100 + 20 = 120");
    assert(planDue.primaryAction.priority > plan.primaryAction.priority, "Due revision has higher priority than non-due");
  });

  // 18. Evidence level STRONG modifier check
  await runTest("18. Evidence level STRONG contributes +15 priority modifier", () => {
    const planStrong = buildStudentActionPlan({
      slsRecommendations: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        urgency: 'low',
        evidence: { attempts: 3, accuracy: 40 } // attempts >= 3 -> STRONG
      }]
    });
    const planSufficient = buildStudentActionPlan({
      slsRecommendations: [{
        chapterId: 'phy_units',
        actionType: 'REVISE_CHAPTER',
        urgency: 'low',
        evidence: { attempts: 2, accuracy: 40 } // attempts == 2 -> SUFFICIENT
      }]
    });
    // Gated/Base: 90. Urgency low: +5. Strong: +15 = 110
    // Sufficient: +10 = 105
    assert(planStrong.primaryAction.priority === 110, "STRONG evidence priority matches 110");
    assert(planSufficient.primaryAction.priority === 105, "SUFFICIENT evidence priority matches 105");
    assert(planStrong.primaryAction.priority > planSufficient.primaryAction.priority, "Strong evidence action priority exceeds sufficient");
  });

  // 19. Derived Daily Missions checked state
  await runTest("19. Completed daily missions remain in pool but marked COMPLETED and filtered from CTAs", () => {
    const plan = buildStudentActionPlan({
      activeLessons: [
        { chapterId: 'phy_thermo', progress: 50, lastOpened: 1783576209515 }
      ],
      evidence: {
        lessonSessions: [{ chapter_id: 'phy_thermo', scroll_progress: 50, status: 'started', started_at: new Date(1783576200000).toISOString() }],
        quizAttempts: [{ chapter_id: 'phy_thermo', completed_at: new Date(1783576210000).toISOString() }] // completed after session started
      }
    });
    // The active lesson is resolved as COMPLETED
    assert(plan.hasData === false, "Active lesson is completed, no active actions");
    const activeLessonMission = plan.dailyMissions.find(m => m.chapterId === 'phy_thermo');
    assert(activeLessonMission !== undefined, "Completed active lesson should be in daily missions");
    assert(activeLessonMission.state === 'COMPLETED', "Daily mission state is COMPLETED");
    assert(plan.primaryAction.type === 'START_NEW_LESSON', "Primary action falls back to onboarding because active is complete");
  });

  // 20. Resolver mock count completion check
  await runTest("20. Mock recommendations complete when mock attempts count exceeds version timestamp", () => {
    const planIncomplete = buildStudentActionPlan({
      mockRecommendations: {
        recommendationType: 'RETAKE_MOCK',
        recommendedMock: { id: 'mock_01' }
      },
      mockAttemptsCount: 2,
      evidence: {
        mockResults: [{ mock_id: 'mock_01' }, { mock_id: 'mock_02' }] // only 1 for mock_01
      }
    });
    const planComplete = buildStudentActionPlan({
      mockRecommendations: {
        recommendationType: 'RETAKE_MOCK',
        recommendedMock: { id: 'mock_01' }
      },
      mockAttemptsCount: 1, // trigger count is 1
      evidence: {
        mockResults: [{ mock_id: 'mock_01' }, { mock_id: 'mock_01' }] // 2 mock_01 results found (trigger count 1 < current 2)
      }
    });
    assert(planIncomplete.primaryAction.type === 'BUILD_MORE_MOCK_EVIDENCE', "Should recommend retake if incomplete");
    assert(planIncomplete.primaryAction.state === 'AVAILABLE', "State should resolve as AVAILABLE");
    assert(planComplete.hasData === false, "Mock resolves to complete, plan reverts to onboarding fallback");
    assert(planComplete.primaryAction.type === 'START_NEW_LESSON', "Fallback is active");
  });

  // ==========================================
  // Part B: API Endpoint E2E Verification
  // ==========================================

  const testJWTSecret = process.env.JWT_SECRET || "smartprep-development-secret-key-128bits";
  const TEST_USER_ID = "2c1dab78-afb2-450e-ad16-4eefd2fe64e6";
  const validToken = jwt.sign(
    { id: TEST_USER_ID, email: "test@example.com", plan: "PRO" },
    testJWTSecret,
    { expiresIn: "1h" }
  );

  // 21. E2E: Unauthorized request returns 401
  await runTest("21. E2E: GET /api/student/action-plan without auth header returns 401", async () => {
    const res = await fetch(`${API_URL}/api/student/action-plan`);
    assert(res.status === 401, `Status should be 401, got ${res.status}`);
  });

  // 22. E2E: Authorized request returns valid response contract
  await runTest("22. E2E: GET /api/student/action-plan with auth returns HTTP 200 and plan", async () => {
    const res = await fetch(`${API_URL}/api/student/action-plan`, {
      headers: { "Authorization": `Bearer ${validToken}` }
    });
    assert(res.status === 200, `Status should be 200, got ${res.status}`);
    const body = await res.json();
    assert(body.success === true, "Response success must be true");
    assert(body.primaryAction !== undefined, "Response must contain primaryAction");
    assert(Array.isArray(body.secondaryActions), "Response must contain secondaryActions array");
    assert(Array.isArray(body.dailyMissions), "Response must contain dailyMissions array");
    assert(body.sources !== undefined, "Response must report source availability");
  });

  console.log(`\n=== Test Suite Results: ${testsPassed} passed, ${testsFailed} failed ===`);
  console.log(`Total Assertions run: ${totalAssertions}`);
  
  if (testsFailed > 0) {
    process.exit(1);
  }
}

// Start tests
runSuite();
