/**
 * Performance Insights Service — Automated Test Suite
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { calculatePerformanceInsights } = require("./services/performanceInsightsService");

// Load backend .env manually
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

const PORT = process.env.PORT || 8080;
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
  console.log("=== Performance Insights Integration Test Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. New user with zero activity
  await runTest("1. New user with zero activity returns default/null metrics", () => {
    const result = calculatePerformanceInsights({
      userObj: { name: "New Aspirant" },
      sources: { sls: "available", mock: "available" }
    });

    assert(result.overview.readiness === 0, "Readiness must start at 0");
    assert(result.overview.questionsSolved === 0, "Questions solved must start at 0");
    assert(result.overview.mocksCompleted === 0, "Mocks completed must start at 0");
    assert(result.overview.studyStreak === 0, "Streak must start at 0");
    assert(result.readiness.status === "BUILDING_EVIDENCE", "Readiness status must be BUILDING_EVIDENCE");
    assert(result.readiness.gap === 85, "Gap to target of 85% must be 85");
    assert(result.readiness.evidenceLevel === "BUILDING_EVIDENCE", "Evidence level must be BUILDING_EVIDENCE");
    assert(result.subjectPerformance.every(s => s.score === 0), "All subject scores must be 0");
    assert(result.subjectPerformance.every(s => s.status === "NO EVIDENCE"), "All subject statuses must be NO EVIDENCE");
    assert(result.performanceTrend.dataPoints.length === 0, "Trend points must be empty");
    assert(result.performanceTrend.direction === "INSUFFICIENT_DATA", "Trend direction must be INSUFFICIENT_DATA");
    assert(result.latestMock === null, "Latest mock must be null");
    assert(result.improvementOpportunities.length === 0, "Opportunities must be empty");
    assert(result.weakTopics.length === 0, "Weak topics must be empty");
    assert(result.strongTopics.length === 0, "Strong topics must be empty");
    assert(result.targetTracker.targetExam === "IISER IAT 2027", "Target exam should be IISER IAT 2027");
    assert(result.targetTracker.daysRemaining === 330, "Days remaining should be 330");
    assert(result.targetTracker.evidenceQuality === "BUILDING_EVIDENCE", "Tracker evidence quality should be BUILDING_EVIDENCE");
    assert(result.insights.length === 1, "Insights should have 1 onboarding message");
    assert(result.insights[0].type === "ONBOARDING", "Insight type should be ONBOARDING");
  });

  // 2. Lesson activity only
  await runTest("2. Lesson activity updates subject readiness and overview readiness", () => {
    const result = calculatePerformanceInsights({
      userObj: { name: "Student" },
      lessonSessions: [
        { chapter_id: "phy_units", last_opened: Date.now() },
        { chapter_id: "phy_motion_straight", last_opened: Date.now() }
      ],
      sources: { sls: "available" }
    });

    assert(result.overview.readiness > 0, "Overall readiness should reflect completed lessons");
    const physics = result.subjectPerformance.find(s => s.name === "Physics");
    assert(physics.score > 0, "Physics score should be greater than 0");
    assert(physics.status === "BUILDING EVIDENCE", "Physics status should be BUILDING EVIDENCE because there is no quiz attempt yet");
  });

  // 3. Quiz activity only
  await runTest("3. Quiz attempts are correctly tracked and mapped to subject performance", () => {
    const parentAttempts = [
      { id: "qa1", chapter_id: "phy_units", subject: "Physics", total_questions: 10, correct_answers: 8, wrong_answers: 2, accuracy: 80, created_at: new Date().toISOString() }
    ];
    const questionAttempts = [
      { quiz_attempt_id: "qa1", chapter_id: "phy_units", question_id: "q1", is_correct: true }
    ];
    const result = calculatePerformanceInsights({
      userObj: { name: "Student" },
      parentAttempts,
      questionAttempts,
      sources: { sls: "available" }
    });

    assert(result.overview.questionsSolved === 1, "Unique questions solved should be 1");
    const physics = result.subjectPerformance.find(s => s.name === "Physics");
    assert(physics.score === 80, "Physics accuracy score should match quiz accuracy (80%)");
    assert(physics.status === "STRONG", "Physics status should be STRONG for 80% accuracy");
  });

  // 4. Mock activity only
  await runTest("4. Mock completions update mocks completed, streak, and performance trend", () => {
    const mockResults = [
      { id: 101, mock_title: "IISER Mock #1", score: 65, correct: 13, total_questions: 20, created_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 102, mock_title: "IISER Mock #2", score: 75, correct: 15, total_questions: 20, created_at: new Date().toISOString() }
    ];
    const mockQuestionAttempts = [
      { mock_id: 101, question_id: "mq1" },
      { mock_id: 102, question_id: "mq2" }
    ];
    const result = calculatePerformanceInsights({
      userObj: { name: "Student" },
      mockResults,
      mockQuestionAttempts,
      sources: { mock: "available" }
    });

    assert(result.overview.mocksCompleted === 2, "Mocks completed should be 2");
    assert(result.overview.questionsSolved === 2, "Mocks questions solved should be 2");
    assert(result.overview.studyStreak === 2, "Streak should be 2 days");
    assert(result.performanceTrend.dataPoints.length === 2, "Performance trend should have 2 points");
    assert(result.performanceTrend.direction === "IMPROVING", "Trend should show IMPROVING (65% to 75%)");
    assert(result.latestMock.score === 75, "Latest mock score should be 75");
  });

  // 5. Deterministic Key Insights validation
  await runTest("5. Traceable deterministic insights are returned correctly", () => {
    const result = calculatePerformanceInsights({
      userObj: { name: "Student" },
      mockResults: [
        { id: 101, mock_title: "IISER Mock #1", score: 60, correct: 12, total_questions: 20, created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 102, mock_title: "IISER Mock #2", score: 70, correct: 14, total_questions: 20, created_at: new Date().toISOString() }
      ],
      sources: { mock: "available" }
    });

    const mockInsight = result.insights.find(i => i.evidenceSource === "MOCK_RESULTS");
    assert(mockInsight !== undefined, "Should generate a mock results insight");
    assert(mockInsight.type === "IMPROVEMENT", "Mock insight type should be IMPROVEMENT");
    assert(mockInsight.message.includes("improvement"), "Message should mention score improvement");
  });

  // ==========================================
  // Part B: API Endpoint & Router Tests
  // ==========================================

  // 6. Auth Middleware / JWT protection check
  await runTest("6. GET /api/student/performance-insights returns 401 if unauthorized", async () => {
    const res = await fetch(`${API_URL}/api/student/performance-insights`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    assert(res.status === 401, `Should fail with HTTP 401, got ${res.status}`);
  });

  // 7. Success responses when authenticated
  await runTest("7. GET /api/student/performance-insights returns valid contract with token", async () => {
    // Generate a valid mock user JWT token
    const token = jwt.sign({ id: "test-user-uuid", email: "student@prep.com" }, process.env.JWT_SECRET || "fallback_secret");
    const res = await fetch(`${API_URL}/api/student/performance-insights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    assert(res.status === 200, `Expected HTTP 200, got ${res.status}`);
    const body = await res.json();
    assert(body.success === true, "Response wrapper success flag must be true");
    assert(body.overview !== undefined, "overview must be returned");
    assert(body.readiness !== undefined, "readiness must be returned");
    assert(body.subjectPerformance !== undefined, "subjectPerformance must be returned");
    assert(body.performanceTrend !== undefined, "performanceTrend must be returned");
    assert(body.sourceAvailability !== undefined, "sourceAvailability must be returned");
  });

  // 8. Closed-loop learning scenario
  await runTest("8. Closed-loop flow detects weakness, suggests action, and clears action upon revision completion", () => {
    // Stage 1: Student has weak chapter
    const parentAttempts = [
      { id: "qa_weak", chapter_id: "phy_units", subject: "Physics", total_questions: 10, correct_answers: 4, wrong_answers: 6, accuracy: 40, created_at: new Date(Date.now() - 3600000).toISOString() }
    ];
    const questionAttempts = [
      { quiz_attempt_id: "qa_weak", chapter_id: "phy_units", question_id: "q1", is_correct: false },
      { quiz_attempt_id: "qa_weak", chapter_id: "phy_units", question_id: "q2", is_correct: false }
    ];

    const resultStage1 = calculatePerformanceInsights({
      userObj: { name: "Student" },
      parentAttempts,
      questionAttempts,
      sources: { sls: "available" }
    });

    // Verify weakness is detected
    const hasWeakness = resultStage1.improvementOpportunities.some(o => o.chapterId === "phy_units");
    assert(hasWeakness === true, "phy_units must be registered in improvement opportunities");

    // Verify orchestrator action appears
    const primaryAction = resultStage1.recommendedActions.primaryAction;
    assert(primaryAction !== null, "Primary action should be created");
    assert(primaryAction.chapterId === "phy_units", "Primary action should target phy_units");
    assert(primaryAction.type === "COMPLETE_DUE_REVISION", "Action type should be COMPLETE_DUE_REVISION");

    // Stage 2: Student completes revision
    const revisions = [
      {
        chapter_id: "phy_units",
        revision_type: "WEAKNESS_REVIEW",
        started_at: new Date(Date.now() - 60000).toISOString(),
        completed_at: new Date(Date.now() + 60000).toISOString(),
        status: "completed",
        confidence_rating: 4
      }
    ];

    const resultStage2 = calculatePerformanceInsights({
      userObj: { name: "Student" },
      parentAttempts,
      questionAttempts,
      revisions,
      sources: { sls: "available", revision: "available" }
    });

    const primaryActionStage2 = resultStage2.recommendedActions.primaryAction;
    console.log("DEBUG: primaryActionStage2 = ", primaryActionStage2);
    const isStaleActionRemoved = !primaryActionStage2 || primaryActionStage2.chapterId !== "phy_units" || primaryActionStage2.type !== "COMPLETE_DUE_REVISION";
    assert(isStaleActionRemoved === true, "Completed revision action should no longer be the primary REVISE_CHAPTER action");
  });

  console.log(`\nPerformance Insights Suite Completed: ${testsPassed} passed, ${testsFailed} failed.`);
  if (testsFailed > 0) {
    process.exit(1);
  }
}

runSuite();
