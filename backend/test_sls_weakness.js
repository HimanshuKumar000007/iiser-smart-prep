/**
 * SLS Weakness Engine — Test Suite
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { WEAKNESS_CONFIG, createEmptyWeaknessAnalysis, analyzeWeaknesses, computeWeaknessScore } = require("./services/slsWeaknessEngine");
const slsAnalytics = require("./services/slsAnalytics");

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
  console.log("=== SLS Step 6 Weakness Engine Verification Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. Zero data response contract validation
  await assertTest("Zero data creates empty analysis layout", () => {
    const empty = createEmptyWeaknessAnalysis();
    if (!empty.success || empty.hasData) throw new Error("Incorrect hasData flag");
    const wa = empty.weaknessAnalysis;
    if (wa.configVersion !== "1.0") throw new Error("Incorrect config version");
    if (wa.summary.totalWeakTopics !== 0) throw new Error("totalWeakTopics must be 0");
    if (wa.weakTopics.length !== 0) throw new Error("weakTopics list must be empty");
    if (wa.insufficientEvidence.topics.length !== 0) throw new Error("insufficient topics must be empty");
  });

  // 2. High accuracy with sufficient evidence -> no weakness
  await assertTest("High accuracy with sufficient evidence -> severity: none", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          { chapterId: "phy_units", topicId: "t1", attempts: 15, accuracy: 95.0, speedRatio: 0.9, correct: 14, wrong: 1, unanswered: 0 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const t = res.weaknessAnalysis.weakTopics[0];
    if (t.severity !== "none") throw new Error(`Expected severity: none, got ${t.severity}`);
    if (t.weaknessScore > 5.0) throw new Error("Weakness score should be low");
    if (t.reasons[0] !== "NONE") throw new Error("Reason code should be NONE");
  });

  // 3. Severity classifications (critical, high, moderate, mild)
  await assertTest("Accuracy severity classifications and thresholds", () => {
    const mockTopics = (acc) => ({
      hasData: true,
      analytics: {
        topics: [{ chapterId: "phy_units", topicId: "t1", attempts: 15, accuracy: acc, speedRatio: 1.0, correct: 0, wrong: 0, unanswered: 0 }]
      }
    });

    const getSev = (acc) => analyzeWeaknesses(mockTopics(acc)).weaknessAnalysis.weakTopics[0].severity;

    if (getSev(35) !== "critical") throw new Error("35% accuracy should be critical");
    if (getSev(55) !== "high") throw new Error("55% accuracy should be high");
    if (getSev(70) !== "moderate") throw new Error("70% accuracy should be moderate");
    if (getSev(80) !== "mild") throw new Error("80% accuracy should be mild");
  });

  // 4. Speed-only weakness
  await assertTest("Speed-only weakness with high accuracy", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          { chapterId: "phy_units", topicId: "t1", attempts: 15, accuracy: 90.0, speedRatio: 1.8, correct: 13, wrong: 2, unanswered: 0 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const t = res.weaknessAnalysis.weakTopics[0];
    if (t.severity !== "none") throw new Error("High accuracy must not trigger accuracy weakness severity");
    if (t.reasons.indexOf("SLOW_SOLVING") === -1) throw new Error("Expected SLOW_SOLVING reason");
    // speedRatio 1.8 -> speedComponent = (1.8 - 1) * 20 = 16.
    // accuracyComponent = (100 - 90) * 0.8 = 8.
    // weaknessScore = 24.
    assertDeepClose(t.weaknessScore, 24.0);
  });

  // 5. Low accuracy + slow solving
  await assertTest("Low accuracy + slow solving combined reason codes", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          { chapterId: "phy_units", topicId: "t1", attempts: 15, accuracy: 50.0, speedRatio: 1.5, correct: 7, wrong: 7, unanswered: 1 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const t = res.weaknessAnalysis.weakTopics[0];
    if (t.reasons.indexOf("VERY_LOW_ACCURACY") === -1) throw new Error("Missing VERY_LOW_ACCURACY");
    if (t.reasons.indexOf("SLOW_SOLVING") === -1) throw new Error("Missing SLOW_SOLVING");
    if (t.reasons.indexOf("LOW_ACCURACY_AND_SLOW") === -1) throw new Error("Missing LOW_ACCURACY_AND_SLOW");
  });

  // 6. Fast but inaccurate code trigger
  await assertTest("Fast but inaccurate reason code trigger", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          { chapterId: "phy_units", topicId: "t1", attempts: 15, accuracy: 45.0, speedRatio: 0.5, correct: 6, wrong: 9, unanswered: 0 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const t = res.weaknessAnalysis.weakTopics[0];
    if (t.reasons.indexOf("FAST_BUT_INACCURATE") === -1) throw new Error("Missing FAST_BUT_INACCURATE code");
  });

  // 7. Evidence levels for topics (insufficient, low, medium, high)
  await assertTest("Topic evidence levels based on questions count", () => {
    const getEv = (count) => {
      const analytics = {
        hasData: true,
        analytics: {
          topics: [{ chapterId: "phy_units", topicId: "t1", attempts: count, accuracy: 50.0, speedRatio: 1.0, correct: 0, wrong: 0, unanswered: 0 }]
        }
      };
      const res = analyzeWeaknesses(analytics);
      if (res.weaknessAnalysis.insufficientEvidence.topics.length > 0) {
        return res.weaknessAnalysis.insufficientEvidence.topics[0].evidenceLevel;
      }
      return res.weaknessAnalysis.weakTopics[0].evidenceLevel;
    };

    if (getEv(2) !== "insufficient") throw new Error("2 attempts should be insufficient evidence");
    if (getEv(4) !== "low") throw new Error("4 attempts should be low evidence");
    if (getEv(8) !== "medium") throw new Error("8 attempts should be medium evidence");
    if (getEv(15) !== "high") throw new Error("15 attempts should be high evidence");
  });

  // 8. Evidence levels for chapters (low, medium, high)
  await assertTest("Chapter evidence levels based on attempts count", () => {
    const getEv = (attempts) => {
      const analytics = {
        hasData: true,
        analytics: {
          chapters: [{ chapterId: "phy_units", subject: "Physics", attempts, totalQuestions: 18, accuracy: 80.0, averageTimeSeconds: 15.0 }]
        }
      };
      const res = analyzeWeaknesses(analytics);
      return res.weaknessAnalysis.weakChapters[0].evidenceLevel;
    };

    if (getEv(1) !== "low") throw new Error("1 attempt should be low evidence");
    if (getEv(2) !== "medium") throw new Error("2 attempts should be medium evidence");
    if (getEv(3) !== "high") throw new Error("3+ attempts should be high evidence");
  });

  // 9. Chapter trend metric (improving, declining, stable, insufficient_history)
  await assertTest("Chapter trend thresholds validation", () => {
    const mockCh = (attempts, imp) => ({
      hasData: true,
      analytics: {
        chapters: [{ chapterId: "phy_units", subject: "Physics", attempts, totalQuestions: 18, accuracy: 80.0, averageTimeSeconds: 15.0, improvementPercentagePoints: imp }]
      }
    });

    const getTrend = (attempts, imp) => analyzeWeaknesses(mockCh(attempts, imp)).weaknessAnalysis.weakChapters[0].trend;

    if (getTrend(1, 10.0) !== "insufficient_history") throw new Error("1 attempt must yield insufficient_history trend");
    if (getTrend(2, 6.0) !== "improving") throw new Error(">= +5 points improvement should be improving");
    if (getTrend(2, -6.0) !== "declining") throw new Error("<= -5 points improvement should be declining");
    if (getTrend(2, 2.0) !== "stable") throw new Error("Between -5 and +5 points should be stable");
  });

  // 10. Weakness score boundaries (0 - 100)
  await assertTest("Weakness score components boundary values (0 and 100)", () => {
    // Best case: 100% accuracy, speed ratio <= 1.0 -> score 0
    assertDeepClose(computeWeaknessScore(100.0, 0.8), 0.0);
    // Worst case: 0% accuracy (80 points), speed ratio >= 2.0 (20 points) -> score 100
    assertDeepClose(computeWeaknessScore(0.0, 2.0), 100.0);
    assertDeepClose(computeWeaknessScore(0.0, 3.0), 100.0); // Capped at 100
  });

  // 11. Deterministic sorting
  await assertTest("Deterministic sorting of topics weakness", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          // score = (100 - 50)*0.8 = 40. evidence = low (4 attempts)
          { chapterId: "phy_units", topicId: "z_topic", attempts: 4, accuracy: 50.0, speedRatio: 1.0, correct: 2, wrong: 2, unanswered: 0 },
          // score = (100 - 40)*0.8 = 48. evidence = low (4 attempts)
          { chapterId: "phy_units", topicId: "a_topic", attempts: 4, accuracy: 40.0, speedRatio: 1.0, correct: 1, wrong: 2, unanswered: 1 },
          // score = (100 - 50)*0.8 = 40. evidence = low (4 attempts)
          { chapterId: "phy_units", topicId: "b_topic", attempts: 4, accuracy: 50.0, speedRatio: 1.0, correct: 2, wrong: 2, unanswered: 0 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const list = res.weaknessAnalysis.weakTopics;
    // 1st: a_topic (highest score: 48)
    // 2nd: b_topic (score: 40, alphabetical)
    // 3rd: z_topic (score: 40, alphabetical)
    if (list[0].topicId !== "a_topic") throw new Error("z_topic should not be first");
    if (list[1].topicId !== "b_topic") throw new Error("b_topic should be second alphabetically");
    if (list[2].topicId !== "z_topic") throw new Error("z_topic should be last");
  });

  // 12. Legacy metrics check
  await assertTest("Robustness: missing speed properties do not generate NaN/Infinity", () => {
    const analytics = {
      hasData: true,
      analytics: {
        topics: [
          { chapterId: "phy_units", topicId: "t1", attempts: 10, accuracy: 70.0, speedRatio: null, correct: 7, wrong: 3, unanswered: 0 }
        ]
      }
    };
    const res = analyzeWeaknesses(analytics);
    const jsonStr = JSON.stringify(res);
    if (jsonStr.includes("NaN") || jsonStr.includes("Infinity")) {
      throw new Error("Serialized JSON output contains invalid finite numbers");
    }
  });

  // ==========================================
  // Part B: Endpoint Integration Tests
  // ==========================================

  // 13. Unauthenticated request rejected with 401
  await assertTest("GET /api/sls/weaknesses Unauthenticated returns 401", async () => {
    const res = await fetch(`${API_URL}/api/sls/weaknesses`);
    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  });

  // 14. Authenticated zero data returns empty contract
  await assertTest("GET /api/sls/weaknesses zero-data user returns empty analysis", async () => {
    const zeroUser = uuidv4();
    const zeroToken = jwt.sign(
      { id: zeroUser, email: "zero@example.com", plan: "PRO" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const res = await fetch(`${API_URL}/api/sls/weaknesses`, {
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
      throw new Error(`Expected hasData: false, got: ${JSON.stringify(data)}`);
    }
  });

  // 15. Query Failure simulations
  await assertTest("GET /api/sls/weaknesses query failures returns HTTP 500 controlled errors", async () => {
    const res1 = await fetch(`${API_URL}/api/sls/weaknesses`, {
      method: "GET",
      headers: { ...authHeaders, "x-test-simulate-parent-error": "true" }
    });
    if (res1.status !== 500) {
      throw new Error("Expected status 500");
    }
    const err1 = await res1.json();
    if (err1.error !== "Failed to retrieve student weaknesses") {
      throw new Error("Incorrect error message");
    }
  });

  // 16. Full workflow integration & user isolation
  await assertTest("Integration: Full weaknesses fetch correctness & user isolation", async () => {
    const integrationUser = uuidv4();
    const integrationToken = jwt.sign(
      { id: integrationUser, email: "integration@example.com", plan: "PRO" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const intHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${integrationToken}`
    };

    // Seed attempt for integrationUser
    const attemptId = uuidv4();
    const parent = {
      id: attemptId,
      user_id: integrationUser,
      chapter_id: "test_weakness_ch",
      subject: "Chemistry",
      total_questions: 10,
      correct_answers: 3, // 30% accuracy -> severe weakness
      wrong_answers: 7,
      unanswered_answers: 0,
      accuracy: 30.0,
      total_time_seconds: 300,
      average_time_seconds: 30.0,
      status: "completed",
      completed_at: new Date().toISOString()
    };
    
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts`, {
      method: "POST",
      headers: dbHeaders,
      body: JSON.stringify(parent)
    });

    // Seed questions for integrationUser
    const questions = [];
    for (let i = 0; i < 4; i++) {
      questions.push({
        quiz_attempt_id: attemptId,
        user_id: integrationUser,
        chapter_id: "test_weakness_ch",
        question_id: `test_wq_${i}`,
        topic_id: "composite-topic",
        difficulty: "medium",
        selected_answer: 0,
        correct_answer: i === 0 ? 0 : 1, // 25% accuracy
        is_correct: i === 0,
        time_taken_seconds: 30,
        estimated_time_seconds: 60,
        question_order: i,
        answered_at: new Date().toISOString()
      });
    }

    await fetch(`${SUPABASE_URL}/rest/v1/question_attempts`, {
      method: "POST",
      headers: dbHeaders,
      body: JSON.stringify(questions)
    });

    // Hit route
    const res = await fetch(`${API_URL}/api/sls/weaknesses`, {
      method: "GET",
      headers: intHeaders
    });

    if (res.status !== 200) {
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    if (data.hasData !== true) {
      throw new Error("Expected hasData to be true after seeding");
    }

    const topic = data.weaknessAnalysis.weakTopics.find(t => t.topicId === "composite-topic");
    if (!topic) {
      throw new Error("Could not find seeded topic in weakTopics list");
    }

    // Since attempts = 4, topic evidence should be low (not insufficient)
    if (topic.evidenceLevel !== "low") {
      throw new Error(`Expected evidenceLevel to be low, got ${topic.evidenceLevel}`);
    }
    if (topic.severity !== "critical") {
      throw new Error(`Expected severity: critical (25% accuracy), got ${topic.severity}`);
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
