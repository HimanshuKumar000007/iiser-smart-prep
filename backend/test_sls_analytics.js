const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { createEmptyAnalytics, aggregateMetrics, sortAttemptsChronologically } = require("./services/slsAnalytics");

// Load backend .env manually to get connection details
const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
envContent.split("\n").forEach(line => {
  const parts = line.split("=");
  if (parts.length === 2) {
    process.env[parts[0].trim()] = parts[1].trim();
  }
});

const API_URL = `http://localhost:${process.env.PORT || 5000}`;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const dbHeaders = {
  "apikey": SERVICE_ROLE_KEY,
  "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json"
};

// Generate valid JWT for a test user
const TEST_USER_ID = "2c1dab78-afb2-450e-ad16-4eefd2fe64e6";
const token = jwt.sign(
  { id: TEST_USER_ID, email: "test@example.com", plan: "PRO" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Global test counters
let testsPassed = 0;
let testsFailed = 0;

async function assertTest(name, fn) {
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

function assertDeepClose(a, b, msg = "") {
  if (Math.abs(a - b) > 1e-4) {
    throw new Error(`Expected ${b} to be close to ${a}. ${msg}`);
  }
}

async function runSuite() {
  console.log("=== SLS Step 5 Performance Analytics Verification Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. empty structure validation
  await assertTest("createEmptyAnalytics layout validation", () => {
    const empty = createEmptyAnalytics();
    if (!empty.success || empty.hasData) throw new Error("Incorrect success/hasData flags");
    const a = empty.analytics;
    if (a.overall.totalAttempts !== 0) throw new Error("overall.totalAttempts must be 0");
    if (a.subjects.length !== 0) throw new Error("subjects must be empty");
    if (a.chapters.length !== 0) throw new Error("chapters must be empty");
    if (a.topics.length !== 0) throw new Error("topics must be empty");
    if (a.recentAttempts.length !== 0) throw new Error("recentAttempts must be empty");
    if (a.coverage.totalAttemptRecords !== 0) throw new Error("coverage must be empty");
  });

  // 2. chronological attempt sorting with fallback and id tie-breaker
  await assertTest("Deterministic attempt sorting", () => {
    const attempts = [
      { id: "ccc", completed_at: "2026-07-09T08:00:00Z" },
      { id: "aaa", completed_at: "2026-07-09T08:00:00Z" },
      { id: "bbb", completed_at: "2026-07-09T07:59:00Z" },
      { id: "ddd", completed_at: null, created_at: "2026-07-09T08:01:00Z" }
    ];
    const sorted = sortAttemptsChronologically(attempts);
    if (sorted[0].id !== "bbb") throw new Error("First should be bbb");
    if (sorted[1].id !== "aaa") throw new Error("Second should be aaa (alphabetical tie-breaker)");
    if (sorted[2].id !== "ccc") throw new Error("Third should be ccc");
    if (sorted[3].id !== "ddd") throw new Error("Fourth should be ddd (fallback completed_at to created_at)");
  });

  // 3. Single attempt calculations
  await assertTest("Single attempt analytics mapping", () => {
    const parents = [
      {
        id: "att-1",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 18,
        correct_answers: 15,
        wrong_answers: 2,
        unanswered_answers: 1,
        accuracy: 83.33,
        total_time_seconds: 180,
        average_time_seconds: 10,
        completed_at: "2026-07-09T08:00:00Z"
      }
    ];
    const questions = []; // Empty question details
    const res = aggregateMetrics(parents, questions);
    if (!res.hasData) throw new Error("Should have data");
    const overall = res.analytics.overall;
    if (overall.totalAttempts !== 1) throw new Error("totalAttempts !== 1");
    if (overall.totalCorrect !== 15) throw new Error("totalCorrect !== 15");
    if (overall.totalWrong !== 2) throw new Error("totalWrong !== 2");
    if (overall.totalUnanswered !== 1) throw new Error("totalUnanswered !== 1");
    assertDeepClose(overall.overallAccuracy, 83.33);
    assertDeepClose(overall.averageTimePerQuestion, 10.0);
  });

  // 4. Multiple attempts weighted accuracy and groupings
  await assertTest("Multiple attempts weighted accuracy calculation", () => {
    const parents = [
      {
        id: "att-1",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 10,
        correct_answers: 9,
        wrong_answers: 1,
        unanswered_answers: 0,
        accuracy: 90.0,
        total_time_seconds: 100,
        completed_at: "2026-07-09T08:00:00Z"
      },
      {
        id: "att-2",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 20,
        correct_answers: 12,
        wrong_answers: 6,
        unanswered_answers: 2,
        accuracy: 60.0,
        total_time_seconds: 200,
        completed_at: "2026-07-09T08:05:00Z"
      }
    ];
    const res = aggregateMetrics(parents, []);
    const overall = res.analytics.overall;
    // Weighted accuracy: (9 + 12) / (10 + 20) = 21 / 30 = 70%
    assertDeepClose(overall.overallAccuracy, 70.0, "Weighted accuracy calculation failed");
    if (res.analytics.subjects[0].attempts !== 2) throw new Error("Subject attempts !== 2");
    if (res.analytics.chapters[0].attempts !== 2) throw new Error("Chapter attempts !== 2");
  });

  // 5. First/Latest/Best and improvement metrics
  await assertTest("Chapter first/latest/best attempt accuracy and improvement", () => {
    const parents = [
      {
        id: "att-1",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 10,
        correct_answers: 5, // 50%
        wrong_answers: 5,
        unanswered_answers: 0,
        completed_at: "2026-07-09T08:00:00Z"
      },
      {
        id: "att-2",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 10,
        correct_answers: 9, // 90%
        wrong_answers: 1,
        unanswered_answers: 0,
        completed_at: "2026-07-09T08:05:00Z"
      },
      {
        id: "att-3",
        chapter_id: "phy_units",
        subject: "Physics",
        total_questions: 10,
        correct_answers: 8, // 80%
        wrong_answers: 2,
        unanswered_answers: 0,
        completed_at: "2026-07-09T08:10:00Z"
      }
    ];
    const res = aggregateMetrics(parents, []);
    const ch = res.analytics.chapters[0];
    assertDeepClose(ch.firstAttemptAccuracy, 50.0);
    assertDeepClose(ch.latestAttemptAccuracy, 80.0);
    assertDeepClose(ch.bestAttemptAccuracy, 90.0);
    assertDeepClose(ch.improvementPercentagePoints, 30.0);
  });

  // 6. Topic identity collision safety
  await assertTest("Composite topic identity grouping", () => {
    const questions = [
      { chapter_id: "phy_units", topic_id: "si-units", is_correct: true, time_taken_seconds: 10, estimated_time_seconds: 60 },
      { chapter_id: "phy_motion", topic_id: "si-units", is_correct: true, time_taken_seconds: 20, estimated_time_seconds: 60 }
    ];
    const res = aggregateMetrics([{ id: "att-1", chapter_id: "phy_units", completed_at: "2026-07-09T08:00:00Z" }], questions);
    if (res.analytics.coverage.uniqueTopicsAttempted !== 2) {
      throw new Error(`Expected uniqueTopicsAttempted to be 2, got ${res.analytics.coverage.uniqueTopicsAttempted}`);
    }
  });

  // 7. Individual question speed classification & boundaries (0.8 and 1.2)
  await assertTest("Speed classification and exact boundaries", () => {
    const questions = [
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 79, estimated_time_seconds: 100 }, // ratio 0.79 -> faster
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 80, estimated_time_seconds: 100 }, // ratio 0.8 -> near expected
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 120, estimated_time_seconds: 100 }, // ratio 1.2 -> near expected
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 121, estimated_time_seconds: 100 } // ratio 1.21 -> slower
    ];
    const res = aggregateMetrics([{ id: "att-1", chapter_id: "phy_units", completed_at: "2026-07-09T08:00:00Z" }], questions);
    const speed = res.analytics.speed;
    if (speed.fasterThanExpectedCount !== 1) throw new Error("Incorrect fasterThanExpectedCount");
    if (speed.nearExpectedCount !== 2) throw new Error("Incorrect nearExpectedCount");
    if (speed.slowerThanExpectedCount !== 1) throw new Error("Incorrect slowerThanExpectedCount");
  });

  // 8. Exclusion of invalid estimated times from speed metrics
  await assertTest("Legacy invalid estimated_time_seconds exclusions", () => {
    const questions = [
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 30, estimated_time_seconds: 0 }, // invalid est -> excluded
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 30, estimated_time_seconds: -10 }, // invalid est -> excluded
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 30, estimated_time_seconds: null }, // invalid est -> excluded
      { chapter_id: "phy_units", topic_id: "t1", time_taken_seconds: 30, estimated_time_seconds: 60 } // valid
    ];
    const res = aggregateMetrics([{ id: "att-1", chapter_id: "phy_units", completed_at: "2026-07-09T08:00:00Z" }], questions);
    const speed = res.analytics.speed;
    assertDeepClose(speed.overallAverageEstimatedTimeSeconds, 60.0);
    assertDeepClose(speed.overallSpeedRatio, 0.5); // 30 / 60
    if (speed.fasterThanExpectedCount !== 1) throw new Error("Should only count 1 question for ratio");
  });

  // 9. NaN/Infinity prevention in serialized JSON
  await assertTest("Excludes NaN/Infinity from JSON output", () => {
    const parents = [
      {
        id: "att-1",
        chapter_id: "phy_units",
        total_questions: 0, // Should cause division by zero
        correct_answers: 0,
        wrong_answers: 0,
        unanswered_answers: 0,
        total_time_seconds: 0,
        completed_at: "2026-07-09T08:00:00Z"
      }
    ];
    const res = aggregateMetrics(parents, []);
    const jsonStr = JSON.stringify(res);
    if (jsonStr.includes("NaN") || jsonStr.includes("Infinity")) {
      throw new Error("Serialized JSON output contains NaN or Infinity values");
    }
  });

  // ==========================================
  // Part B: API Integration Tests
  // ==========================================

  // 10. Unauthenticated Request Rejected (401)
  await assertTest("GET /api/sls/analytics Unauthenticated returns 401", async () => {
    const res = await fetch(`${API_URL}/api/sls/analytics`);
    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  });

  // 11. Zero data returns HTTP 200 hasData = false
  await assertTest("GET /api/sls/analytics with zero data returns empty response", async () => {
    const zeroUser = uuidv4();
    const zeroToken = jwt.sign(
      { id: zeroUser, email: "zero@example.com", plan: "PRO" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const res = await fetch(`${API_URL}/api/sls/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${zeroToken}`
      }
    });
    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`);
    }
    const data = await res.json();
    if (!data.success || data.hasData !== false) {
      throw new Error(`Expected success: true, hasData: false. Got ${JSON.stringify(data)}`);
    }
  });

  // 12. Query Failure Simulations (Parent & Question query failures)
  await assertTest("GET /api/sls/analytics controlled server error on query failures", async () => {
    // Test parent query failure
    const res1 = await fetch(`${API_URL}/api/sls/analytics`, {
      method: "GET",
      headers: { ...authHeaders, "x-test-simulate-parent-error": "true" }
    });
    if (res1.status !== 500) {
      throw new Error(`Expected status 500 for parent error simulation, got ${res1.status}`);
    }
    const err1 = await res1.json();
    if (err1.error !== "Failed to retrieve student analytics") {
      throw new Error(`Expected controlled error message, got: ${err1.error}`);
    }

    // Test question query failure
    const res2 = await fetch(`${API_URL}/api/sls/analytics`, {
      method: "GET",
      headers: { ...authHeaders, "x-test-simulate-question-error": "true" }
    });
    if (res2.status !== 500) {
      throw new Error(`Expected status 500 for question error simulation, got ${res2.status}`);
    }
    const err2 = await res2.json();
    if (err2.error !== "Failed to retrieve student analytics") {
      throw new Error(`Expected controlled error message, got: ${err2.error}`);
    }
  });

  // 13. Full Endpoint Ingestion & Seeded Data Fetch Test
  await assertTest("Integration: Full workflow fetch correctness", async () => {
    // Seed attempt
    const attemptId = uuidv4();
    const parent = {
      id: attemptId,
      user_id: TEST_USER_ID,
      chapter_id: "test_analytics_ch",
      subject: "Biology",
      total_questions: 10,
      correct_answers: 8,
      wrong_answers: 2,
      unanswered_answers: 0,
      accuracy: 80.0,
      total_time_seconds: 150,
      average_time_seconds: 15.0,
      status: "completed",
      completed_at: new Date().toISOString()
    };
    
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts`, {
      method: "POST",
      headers: dbHeaders,
      body: JSON.stringify(parent)
    });

    const question = {
      quiz_attempt_id: attemptId,
      user_id: TEST_USER_ID,
      chapter_id: "test_analytics_ch",
      question_id: "test_q1",
      topic_id: "topic1",
      difficulty: "easy",
      selected_answer: 0,
      correct_answer: 0,
      is_correct: true,
      time_taken_seconds: 15,
      estimated_time_seconds: 60,
      question_order: 0,
      answered_at: new Date().toISOString()
    };

    await fetch(`${SUPABASE_URL}/rest/v1/question_attempts`, {
      method: "POST",
      headers: dbHeaders,
      body: JSON.stringify(question)
    });

    // Hit route
    const res = await fetch(`${API_URL}/api/sls/analytics`, {
      method: "GET",
      headers: authHeaders
    });

    if (res.status !== 200) {
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    if (data.hasData !== true) {
      throw new Error("Expected hasData to be true after seeding");
    }

    const subjectInfo = data.analytics.subjects.find(s => s.subject === "Biology");
    if (!subjectInfo || subjectInfo.attempts !== 1) {
      throw new Error("Grouped subject metrics invalid");
    }

    // Clean up
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${attemptId}`, {
      method: "DELETE",
      headers: dbHeaders
    });
  });

  console.log(`\n=== Verification Results: Passed: ${testsPassed} | Failed: ${testsFailed} ===`);
  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error(err);
  process.exit(1);
});
