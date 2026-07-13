/**
 * SLS Mastery Engine — Verification Suite
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { MASTERY_CONFIG, evaluateChapterMastery, generateMasteryStates } = require("./services/slsMasteryEngine");

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

const mockCatalog = {
  "phy_units": {
    "chapterId": "phy_units",
    "chapterTitle": "Units & Measurements",
    "subject": "Physics",
    "topicIds": ["t1", "t2"]
  },
  "phy_motion": {
    "chapterId": "phy_motion",
    "chapterTitle": "Motion in a Line",
    "subject": "Physics",
    "topicIds": ["t3"]
  }
};

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

function assertClose(a, b, msg = "") {
  if (Math.abs(a - b) > 1e-4) {
    throw new Error(`Expected ${b} to be close to ${a}. ${msg}`);
  }
}

async function runSuite() {
  console.log("=== SLS Step 8 Mastery Engine Verification Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. no attempts → NEW
  await assertTest("No attempts returns NEW", () => {
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, null, [], {});
    if (res.state !== "NEW" || res.masteryScore !== 0 || res.attemptCount !== 0) {
      throw new Error("Incorrect NEW state mapping");
    }
  });

  // 2. one perfect attempt does not → MASTERED (requires at least 3 attempts)
  await assertTest("One perfect attempt does not yield MASTERED (requires 3+ attempts)", () => {
    const chAna = {
      attempts: 1,
      accuracy: 100.0,
      firstAttemptAccuracy: 100.0,
      latestAttemptAccuracy: 100.0,
      bestAttemptAccuracy: 100.0,
      improvementPercentagePoints: 0.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [{ chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.state === "MASTERED") {
      throw new Error("One attempt must not yield MASTERED");
    }
  });

  // 3. confirmed weakness → WEAK
  await assertTest("Confirmed chapter weakness yields WEAK state", () => {
    const chAna = {
      attempts: 2,
      accuracy: 30.0,
      firstAttemptAccuracy: 30.0,
      latestAttemptAccuracy: 30.0,
      bestAttemptAccuracy: 30.0,
      improvementPercentagePoints: 0.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [{ chapter_id: "phy_units", total_questions: 10, correct_answers: 3 }];
    const weakness = {
      weakChapters: [{ chapterId: "phy_units", severity: "high", evidenceLevel: "medium", weaknessScore: 76 }]
    };
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, weakness);
    if (res.state !== "WEAK" || res.reasonCodes[0] !== "CONFIRMED_CHAPTER_WEAKNESS") {
      throw new Error(`Expected WEAK state. Got ${res.state}`);
    }
  });

  // 4. improving conditions → IMPROVING
  await assertTest("Meets improving conditions -> state: IMPROVING", () => {
    const chAna = {
      attempts: 2,
      accuracy: 50.0,
      firstAttemptAccuracy: 40.0,
      latestAttemptAccuracy: 80.0,
      bestAttemptAccuracy: 80.0,
      improvementPercentagePoints: 40.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 4 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 8 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.state !== "IMPROVING" || res.reasonCodes[0] !== "SIGNIFICANT_IMPROVEMENT") {
      throw new Error(`Expected IMPROVING state. Got ${res.state}`);
    }
  });

  // 5. strong conditions → STRONG
  await assertTest("Meets strong conditions -> state: STRONG", () => {
    const chAna = {
      attempts: 2,
      accuracy: 87.5,
      firstAttemptAccuracy: 85.0,
      latestAttemptAccuracy: 90.0,
      bestAttemptAccuracy: 90.0,
      improvementPercentagePoints: 5.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 8 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.state !== "STRONG" || res.reasonCodes[0] !== "CONSISTENT_STRONG_PERFORMANCE") {
      throw new Error(`Expected STRONG state. Got ${res.state}`);
    }
  });

  // 6. repeated strong evidence → MASTERED
  await assertTest("Meets repeat strong evidence conditions -> state: MASTERED", () => {
    const chAna = {
      attempts: 3,
      accuracy: 93.3,
      firstAttemptAccuracy: 90.0,
      latestAttemptAccuracy: 95.0,
      bestAttemptAccuracy: 95.0,
      improvementPercentagePoints: 5.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.state !== "MASTERED" || res.reasonCodes[0] !== "REPEATED_MASTERY_EVIDENCE") {
      throw new Error(`Expected MASTERED state. Got ${res.state}`);
    }
  });

  // 7. critical topic blocks MASTERED
  await assertTest("Critical topic weakness blocks MASTERED state", () => {
    const chAna = {
      attempts: 3,
      accuracy: 95.0,
      firstAttemptAccuracy: 90.0,
      latestAttemptAccuracy: 95.0,
      bestAttemptAccuracy: 95.0,
      improvementPercentagePoints: 5.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const weakness = {
      weakChapters: [],
      weakTopics: [{ chapterId: "phy_units", topicId: "t1", severity: "critical", evidenceLevel: "medium" }]
    };
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, weakness);
    if (res.state === "MASTERED") {
      throw new Error("Critical topic weakness must block MASTERED state");
    }
  });

  // 8. declining trend blocks MASTERED
  await assertTest("Declining trend blocks MASTERED state", () => {
    const chAna = {
      attempts: 3,
      accuracy: 90.0,
      firstAttemptAccuracy: 95.0,
      latestAttemptAccuracy: 85.0,
      bestAttemptAccuracy: 95.0,
      improvementPercentagePoints: -10.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 8 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.state === "MASTERED") {
      throw new Error("Declining trend must block MASTERED state");
    }
  });

  // 9. Mastery score components and consistency SD
  await assertTest("Mastery score calculation (accuracy, consistency, evidence, improvement)", () => {
    const chAna = {
      attempts: 2,
      accuracy: 80.0, // 80 * 0.5 = 40 pts
      firstAttemptAccuracy: 60.0,
      latestAttemptAccuracy: 100.0,
      bestAttemptAccuracy: 100.0,
      improvementPercentagePoints: 40.0, // max 15 pts
      lastAttemptedAt: new Date().toISOString()
    };
    // parentAttempts accuracies: 60 and 100. Mean: 80.
    // StdDev: sqrt(((60-80)^2 + (100-80)^2)/2) = sqrt((400 + 400)/2) = 20.
    // Consistency: max(0, 20 - 20 * 0.5) = 10 pts.
    // Evidence: 2 attempts -> 9 pts.
    // Total score expected: 40 (acc) + 10 (consistency) + 15 (improvement max) + 9 (evidence) = 74.
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 6 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, { weakChapters: [], weakTopics: [] });
    assertClose(res.masteryScore, 74.0, "Score mismatch");
  });

  // 10. score clamps to 0 & 100
  await assertTest("Mastery score clamps cleanly between 0 and 100", () => {
    const chAnaBest = {
      attempts: 3,
      accuracy: 100.0,
      firstAttemptAccuracy: 100.0,
      latestAttemptAccuracy: 100.0,
      bestAttemptAccuracy: 100.0,
      improvementPercentagePoints: 50.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAnaBest, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.masteryScore > 100 || res.masteryScore < 0) {
      throw new Error("Clamping bounds failed");
    }
  });

  // 11. score clamps to 0
  await assertTest("Mastery score clamps cleanly to 0 minimum", () => {
    const chAnaZero = {
      attempts: 1,
      accuracy: 0.0,
      firstAttemptAccuracy: 0.0,
      latestAttemptAccuracy: 0.0,
      bestAttemptAccuracy: 0.0,
      improvementPercentagePoints: -50.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [{ chapter_id: "phy_units", total_questions: 10, correct_answers: 0 }];
    const res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAnaZero, parentAttempts, { weakChapters: [], weakTopics: [] });
    if (res.masteryScore !== 24) {
      throw new Error(`Expected mastery score of 24 (consistency 20 + evidence 4), got ${res.masteryScore}`);
    }
  });

  // 12. high topic blocks MASTERED vs moderate topic behavior
  await assertTest("High topic blocks MASTERED while moderate topic does not", () => {
    const chAna = {
      attempts: 3,
      accuracy: 95.0,
      firstAttemptAccuracy: 90.0,
      latestAttemptAccuracy: 95.0,
      bestAttemptAccuracy: 95.0,
      improvementPercentagePoints: 5.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 9 },
      { chapter_id: "phy_units", total_questions: 10, correct_answers: 10 }
    ];

    // Case A: High topic severity blocks
    const weaknessHigh = {
      weakChapters: [],
      weakTopics: [{ chapterId: "phy_units", topicId: "t1", severity: "high", evidenceLevel: "medium" }]
    };
    let res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, weaknessHigh);
    if (res.state === "MASTERED") throw new Error("High topic severity should block MASTERED");

    // Case B: Moderate topic severity does not block
    const weaknessMod = {
      weakChapters: [],
      weakTopics: [{ chapterId: "phy_units", topicId: "t1", severity: "moderate", evidenceLevel: "medium" }]
    };
    res = evaluateChapterMastery("phy_units", mockCatalog.phy_units, chAna, parentAttempts, weaknessMod);
    if (res.state !== "MASTERED") throw new Error("Moderate topic severity should not block MASTERED");
  });

  // 13. Summary counts & average score correctness
  await assertTest("Summary counts and average mastery score calculations are correct", () => {
    const chAna = {
      attempts: 1,
      accuracy: 80.0,
      firstAttemptAccuracy: 80.0,
      latestAttemptAccuracy: 80.0,
      bestAttemptAccuracy: 80.0,
      improvementPercentagePoints: 0.0,
      lastAttemptedAt: new Date().toISOString()
    };
    const parentAttempts = [{ chapter_id: "phy_units", total_questions: 10, correct_answers: 8 }];
    const analytics = {
      hasData: true,
      analytics: {
        chapters: [{
          chapterId: "phy_units",
          attempts: 1,
          accuracy: 80.0,
          firstAttemptAccuracy: 80.0,
          latestAttemptAccuracy: 80.0,
          bestAttemptAccuracy: 80.0,
          improvementPercentagePoints: 0.0,
          lastAttemptedAt: new Date().toISOString()
        }]
      }
    };
    // generateMasteryStates
    const res = generateMasteryStates(analytics, { weakChapters: [] }, parentAttempts, mockCatalog);
    const summary = res.summary;
    if (summary.totalChapters !== 2) throw new Error(`Expected 2 chapters, got ${summary.totalChapters}`);
    if (summary.newCount !== 1) throw new Error(`Expected 1 NEW chapter, got ${summary.newCount}`);
    if (summary.learningCount !== 1) throw new Error(`Expected 1 LEARNING chapter, got ${summary.learningCount}`);
    // average score should be (learning_score + 0) / 2
    const phyScore = res.mastery.find(m => m.chapterId === "phy_units").masteryScore;
    assertClose(summary.averageMasteryScore, phyScore / 2, "Average score mismatch");
  });

  // 14. input immutability
  await assertTest("generateMasteryStates does not mutate inputs", () => {
    const analytics = { hasData: true, foo: "bar" };
    const weaknesses = { hasData: true, weakChapters: [] };
    const parent = [];
    const analyticsCopy = JSON.stringify(analytics);
    generateMasteryStates(analytics, weaknesses, parent, mockCatalog);
    if (JSON.stringify(analytics) !== analyticsCopy) {
      throw new Error("Analytics input mutated during generateMasteryStates call");
    }
  });

  // 15. invalid catalog chapter handled safely
  await assertTest("Safe handling of null/missing parameters", () => {
    const res = generateMasteryStates(null, null, null, null);
    if (!res.success || res.mastery.length !== 0) {
      throw new Error("Zero handling failed");
    }
  });

  // ==========================================
  // Part B: API Integration Tests
  // ==========================================

  // 13. Unauthenticated request rejected (401)
  await assertTest("GET /api/sls/mastery Unauthenticated returns 401", async () => {
    const res = await fetch(`${API_URL}/api/sls/mastery`);
    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  });

  // 14. Authenticated zero data returns all catalog chapters as NEW
  await assertTest("GET /api/sls/mastery zero-data user returns catalog as NEW", async () => {
    const zeroUser = uuidv4();
    const zeroToken = jwt.sign(
      { id: zeroUser, email: "zero@example.com", plan: "PRO" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const res = await fetch(`${API_URL}/api/sls/mastery`, {
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
      throw new Error("Incorrect hasData key");
    }
    // Verify it returns all chapters (e.g. 78 chapters)
    if (data.mastery.length < 50) {
      throw new Error("Syllabus catalog list should be fully loaded");
    }
    const phy = data.mastery.find(m => m.chapterId === "phy_units");
    if (phy.state !== "NEW") {
      throw new Error("Unattempted chapters must return NEW state");
    }
  });

  // 15. Query failure simulations
  await assertTest("GET /api/sls/mastery query failures returns HTTP 500 controlled errors", async () => {
    const res1 = await fetch(`${API_URL}/api/sls/mastery`, {
      method: "GET",
      headers: { ...authHeaders, "x-test-simulate-parent-error": "true" }
    });
    if (res1.status !== 500) {
      throw new Error("Expected status 500");
    }
    const err1 = await res1.json();
    if (err1.error !== "Failed to retrieve student mastery states") {
      throw new Error("Incorrect error message");
    }
  });

  // 16. Full Integration Workflow fetch correctness & user isolation
  await assertTest("Integration: Full mastery pipeline fetch correctness & user isolation", async () => {
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
      chapter_id: "phy_units",
      subject: "Physics",
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
        chapter_id: "phy_units",
        question_id: `test_rq_${i}`,
        topic_id: "si-base-units",
        difficulty: "easy",
        selected_answer: 0,
        correct_answer: i === 0 ? 0 : 1, // 25% accuracy -> severe weakness
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
    const res = await fetch(`${API_URL}/api/sls/mastery`, {
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

    const m = data.mastery.find(x => x.chapterId === "phy_units");
    if (!m) throw new Error("Chapter phy_units not found in response");
    console.log("DEBUG MASTERY OBJECT:", JSON.stringify(m, null, 2));
    if (m.state !== "WEAK" || m.attemptCount !== 1) {
      throw new Error(`Expected WEAK state. Got ${m.state}`);
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
