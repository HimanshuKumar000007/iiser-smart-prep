/**
 * SLS Recommendation & Learning Action Engine — Test Suite
 */

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { RECOMMENDATION_CONFIG, createEmptyRecommendations, generateRecommendations } = require("./services/slsRecommendationEngine");

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

// Minimal mock catalog for unit tests
const mockCatalog = {
  "phy_units": {
    "chapterId": "phy_units",
    "chapterTitle": "Units & Measurements",
    "subject": "Physics",
    "topicIds": ["t1", "t2", "t3"]
  },
  "phy_motion": {
    "chapterId": "phy_motion",
    "chapterTitle": "Motion in a Line",
    "subject": "Physics",
    "topicIds": ["t4"]
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

async function runSuite() {
  console.log("=== SLS Step 7 Recommendation Engine Verification Suite ===\n");

  // ==========================================
  // Part A: Pure Service Unit Tests
  // ==========================================

  // 1. Zero data response contract validation
  await assertTest("Zero data creates empty recommendations layout", () => {
    const empty = createEmptyRecommendations();
    if (!empty.success || empty.hasData || empty.recommendations.length !== 0) {
      throw new Error("Incorrect zero-data contract fields");
    }
  });

  // 2. Critical/High chapter weakness -> REVISE_CHAPTER
  await assertTest("Critical/High chapter weakness generates REVISE_CHAPTER", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [{
          chapterId: "phy_units",
          severity: "critical",
          evidenceLevel: "high",
          weaknessScore: 90,
          attempts: 3,
          totalQuestions: 54,
          accuracy: 30,
          averageTimeSeconds: 100,
          reasons: ["VERY_LOW_ACCURACY"],
          trend: "declining"
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].actionType !== "REVISE_CHAPTER") {
      throw new Error(`Expected REVISE_CHAPTER, got ${recs[0].actionType}`);
    }
    if (recs[0].chapterTitle !== "Units & Measurements") {
      throw new Error("Catalog lookup failed");
    }
  });

  // 3. Moderate topic weakness -> PRACTICE_TOPIC
  await assertTest("Moderate topic weakness generates PRACTICE_TOPIC", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakTopics: [{
          chapterId: "phy_units",
          topicId: "t1",
          severity: "moderate",
          evidenceLevel: "medium",
          weaknessScore: 65,
          questionCount: 6,
          accuracy: 65,
          speedRatio: 1.0,
          reasons: ["LOW_ACCURACY"]
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].actionType !== "PRACTICE_TOPIC") {
      throw new Error(`Expected PRACTICE_TOPIC, got ${recs[0].actionType}`);
    }
    if (recs[0].topicId !== "t1") throw new Error("Incorrect topicId mapping");
  });

  // 4. Mild chapter weakness -> RETRY_CHAPTER_QUIZ
  await assertTest("Mild chapter weakness generates RETRY_CHAPTER_QUIZ", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [{
          chapterId: "phy_units",
          severity: "mild",
          evidenceLevel: "high",
          weaknessScore: 30,
          attempts: 3,
          totalQuestions: 54,
          accuracy: 80,
          averageTimeSeconds: 80,
          reasons: ["NONE"],
          trend: "stable"
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].actionType !== "RETRY_CHAPTER_QUIZ") {
      throw new Error("Expected RETRY_CHAPTER_QUIZ");
    }
  });

  // 5. Difficulty weakness -> PRACTICE_DIFFICULTY
  await assertTest("Difficulty weakness generates PRACTICE_DIFFICULTY", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakDifficulties: [{
          difficulty: "hard",
          severity: "moderate",
          evidenceLevel: "medium",
          weaknessScore: 60,
          questionCount: 15,
          accuracy: 70,
          speedRatio: 1.0,
          reasons: ["LOW_ACCURACY"]
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].actionType !== "PRACTICE_DIFFICULTY") {
      throw new Error("Expected PRACTICE_DIFFICULTY");
    }
  });

  // 6. Insufficient evidence does not generate weakness recommendations
  await assertTest("Insufficient evidence candidates are ignored", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakTopics: [{
          chapterId: "phy_units",
          topicId: "t1",
          severity: "critical",
          evidenceLevel: "insufficient",
          weaknessScore: 90,
          questionCount: 1,
          accuracy: 0,
          speedRatio: 1.0,
          reasons: ["INSUFFICIENT_EVIDENCE"]
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    // Should fallback to CONTINUE_LEARNING since no confirmed weaknesses exist
    if (recs[0].actionType !== "CONTINUE_LEARNING") {
      throw new Error(`Expected CONTINUE_LEARNING, got ${recs[0].actionType}`);
    }
  });

  // 7. No confirmed weaknesses -> CONTINUE_LEARNING
  await assertTest("No confirmed weaknesses generates CONTINUE_LEARNING with NO_CONFIRMED_WEAKNESS reason", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: []
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].actionType !== "CONTINUE_LEARNING") throw new Error("Expected CONTINUE_LEARNING");
    if (recs[0].reasonCodes[0] !== "NO_CONFIRMED_WEAKNESS") throw new Error("Incorrect reason code");
  });

  // 8. Overlapping recommendations deduplication
  await assertTest("Overlapping candidates deduplication suppresses lower priority items", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [
          // c1: critical chapter weakness -> Revise
          {
            chapterId: "phy_units",
            severity: "critical",
            evidenceLevel: "high",
            weaknessScore: 90,
            attempts: 3,
            totalQuestions: 54,
            accuracy: 30,
            averageTimeSeconds: 100,
            reasons: ["VERY_LOW_ACCURACY"],
            trend: "declining"
          },
          // c2: mild chapter weakness -> Retry. Should be suppressed by c1's Revise
          {
            chapterId: "phy_units",
            severity: "mild",
            evidenceLevel: "high",
            weaknessScore: 30,
            attempts: 3,
            totalQuestions: 54,
            accuracy: 80,
            averageTimeSeconds: 80,
            reasons: ["NONE"],
            trend: "stable"
          }
        ],
        weakTopics: [
          // t1: moderate topic weakness. Should be suppressed by chapter's Revise
          {
            chapterId: "phy_units",
            topicId: "t1",
            severity: "moderate",
            evidenceLevel: "medium",
            weaknessScore: 65,
            questionCount: 6,
            accuracy: 65,
            speedRatio: 1.0,
            reasons: ["LOW_ACCURACY"]
          },
          // t2: critical topic weakness. Should NOT be suppressed by chapter's Revise (independently severe)
          {
            chapterId: "phy_units",
            topicId: "t2",
            severity: "critical",
            evidenceLevel: "medium",
            weaknessScore: 90,
            questionCount: 6,
            accuracy: 30,
            speedRatio: 1.0,
            reasons: ["VERY_LOW_ACCURACY"]
          }
        ]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    // Expected:
    // 1. REVISE_CHAPTER for phy_units
    // 2. PRACTICE_TOPIC for phy_units::t2
    // Suppressed: RETRY_CHAPTER_QUIZ for phy_units and PRACTICE_TOPIC for phy_units::t1
    if (recs.length !== 2) throw new Error(`Expected 2 recommendations, got ${recs.length}`);
    if (recs[0].actionType !== "REVISE_CHAPTER") throw new Error("1st should be REVISE_CHAPTER");
    if (recs[1].topicId !== "t2") throw new Error("2nd should be t2");
  });

  // 9. Stable IDs check
  await assertTest("Stable recommendations IDs generated from fields", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakTopics: [{
          chapterId: "phy_units",
          topicId: "t1",
          severity: "moderate",
          evidenceLevel: "medium",
          weaknessScore: 65,
          questionCount: 6,
          accuracy: 65,
          speedRatio: 1.0,
          reasons: ["LOW_ACCURACY"]
        }]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const id = res.recommendations[0].id;
    if (id !== "rec::PRACTICE_TOPIC::phy_units::t1::none") {
      throw new Error(`Incorrect stable ID: ${id}`);
    }
  });

  // 10. Priority score components & clamping bounds
  await assertTest("Priority score calculations & clamping bounds", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [{
          chapterId: "phy_units",
          severity: "critical",
          evidenceLevel: "high", // +20
          weaknessScore: 100, // 100 * 0.7 = 70
          attempts: 3,
          totalQuestions: 54,
          accuracy: 0,
          averageTimeSeconds: 100,
          reasons: ["VERY_LOW_ACCURACY"],
          trend: "declining" // +10
        }] // Total candidates score = 70 + 20 + 10 = 100
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    if (res.recommendations[0].priorityScore !== 100) {
      throw new Error(`Expected score 100, got ${res.recommendations[0].priorityScore}`);
    }
    if (res.recommendations[0].urgency !== "immediate") {
      throw new Error("Urgency should be immediate");
    }
  });

  // 11. Limit count to 5 maximum
  await assertTest("Limits output count to maxRecommendations (5)", () => {
    // Generate 7 candidates
    const weakTopics = [];
    for (let i = 0; i < 7; i++) {
      weakTopics.push({
        chapterId: "phy_units",
        topicId: `t${i % 3}`, // Note: t0, t1, t2 are in mock catalog
        severity: "critical",
        evidenceLevel: "high",
        weaknessScore: 90 - i,
        questionCount: 15,
        accuracy: 20 + i,
        speedRatio: 1.0,
        reasons: ["VERY_LOW_ACCURACY"]
      });
    }
    const res = generateRecommendations({ hasData: true }, { hasData: true, weaknessAnalysis: { weakTopics } }, mockCatalog);
    if (res.recommendations.length > 5) {
      throw new Error(`Expected max 5, got ${res.recommendations.length}`);
    }
  });

  // 12. Safe handling of invalid chapter/topic IDs
  await assertTest("Safely handles invalid chapter and topic catalog IDs by skipping", () => {
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakTopics: [
          // Invalid chapter id -> skipped
          { chapterId: "invalid_ch", topicId: "t1", severity: "critical", evidenceLevel: "high", weaknessScore: 90, questionCount: 12, accuracy: 30, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] },
          // Invalid topic id -> skipped
          { chapterId: "phy_units", topicId: "invalid_top", severity: "critical", evidenceLevel: "high", weaknessScore: 90, questionCount: 12, accuracy: 30, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] },
          // Valid chapter and topic -> kept
          { chapterId: "phy_units", topicId: "t1", severity: "critical", evidenceLevel: "high", weaknessScore: 80, questionCount: 12, accuracy: 40, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] }
        ]
      }
    };
    const res = generateRecommendations({ hasData: true }, weaknesses, mockCatalog);
    if (res.recommendations.length !== 1 || res.recommendations[0].topicId !== "t1") {
      throw new Error(`Expected exactly 1 valid recommendation, got ${res.recommendations.length}`);
    }
  });

  // 17. Immutability checks for inputs
  await assertTest("generateRecommendations does not mutate input analytics or weakness analysis", () => {
    const analytics = { hasData: true, foo: "bar" };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [{
          chapterId: "phy_units",
          severity: "critical",
          evidenceLevel: "high",
          weaknessScore: 90,
          attempts: 3,
          totalQuestions: 54,
          accuracy: 30,
          averageTimeSeconds: 100,
          reasons: ["VERY_LOW_ACCURACY"],
          trend: "declining"
        }]
      }
    };
    const analyticsCopy = JSON.stringify(analytics);
    const weaknessesCopy = JSON.stringify(weaknesses);
    generateRecommendations(analytics, weaknesses, mockCatalog);
    if (JSON.stringify(analytics) !== analyticsCopy || JSON.stringify(weaknesses) !== weaknessesCopy) {
      throw new Error("Inputs were mutated during recommendations generation");
    }
  });

  // 18. Formula variations (evidence weights, trend weights, urgency boundaries)
  await assertTest("Formula variations: evidence weighting, trend weighting, and urgency boundaries", () => {
    const analytics = { hasData: true };
    const makeWeak = (evidenceLevel, trend, weaknessScore) => ({
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [{
          chapterId: "phy_units",
          severity: "critical",
          evidenceLevel,
          weaknessScore,
          attempts: 3,
          totalQuestions: 54,
          accuracy: 30,
          averageTimeSeconds: 100,
          reasons: ["VERY_LOW_ACCURACY"],
          trend
        }]
      }
    });

    // 1. Evidence medium (+12), stable (+5), weaknessScore 50 (50 * 0.7 = 35) -> 35 + 12 + 5 = 52. Urgency: medium
    let res = generateRecommendations(analytics, makeWeak("medium", "stable", 50), mockCatalog);
    if (res.recommendations[0].priorityScore !== 52 || res.recommendations[0].urgency !== "medium") {
      throw new Error(`Expected score 52 / medium. Got ${res.recommendations[0].priorityScore} / ${res.recommendations[0].urgency}`);
    }

    // 2. Evidence low (+5), declining (+10), weaknessScore 80 (56) -> 56 + 5 + 10 = 71. Urgency: high
    res = generateRecommendations(analytics, makeWeak("low", "declining", 80), mockCatalog);
    if (res.recommendations[0].priorityScore !== 71 || res.recommendations[0].urgency !== "high") {
      throw new Error(`Expected score 71 / high. Got ${res.recommendations[0].priorityScore} / ${res.recommendations[0].urgency}`);
    }

    // 3. Evidence high (+20), improving (+0), weaknessScore 40 (28) -> 28 + 20 + 0 = 48. Urgency: medium
    res = generateRecommendations(analytics, makeWeak("high", "improving", 40), mockCatalog);
    if (res.recommendations[0].priorityScore !== 48 || res.recommendations[0].urgency !== "medium") {
      throw new Error(`Expected score 48 / medium. Got ${res.recommendations[0].priorityScore} / ${res.recommendations[0].urgency}`);
    }
  });

  // 19. Deterministic sorting priorities verification
  await assertTest("Deterministic sorting of candidates on multiple metrics", () => {
    const analytics = { hasData: true };
    const weaknesses = {
      hasData: true,
      weaknessAnalysis: {
        weakChapters: [],
        weakTopics: [
          // A: 70 * 0.7 + 20 = 69
          { chapterId: "phy_units", topicId: "t2", severity: "critical", evidenceLevel: "high", weaknessScore: 70, questionCount: 15, accuracy: 30, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] },
          // B: 90 * 0.7 + 5 = 68
          { chapterId: "phy_units", topicId: "t1", severity: "critical", evidenceLevel: "low", weaknessScore: 90, questionCount: 4, accuracy: 20, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] },
          // C: 75 * 0.7 + 12 = 65
          { chapterId: "phy_units", topicId: "t3", severity: "critical", evidenceLevel: "medium", weaknessScore: 75, questionCount: 8, accuracy: 25, speedRatio: 1.0, reasons: ["VERY_LOW_ACCURACY"] }
        ]
      }
    };
    const res = generateRecommendations(analytics, weaknesses, mockCatalog);
    const recs = res.recommendations;
    if (recs[0].topicId !== "t2" || recs[1].topicId !== "t1" || recs[2].topicId !== "t3") {
      throw new Error(`Incorrect sorting order. Got: ${recs.map(r => r.topicId).join(', ')}`);
    }
  });

  // ==========================================
  // Part B: API Integration Tests
  // ==========================================

  // 13. Unauthenticated request rejected (401)
  await assertTest("GET /api/sls/recommendations Unauthenticated returns 401", async () => {
    const res = await fetch(`${API_URL}/api/sls/recommendations`);
    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  });

  // 14. Authenticated zero data returns 200 hasData = false
  await assertTest("GET /api/sls/recommendations zero-data user returns empty recommendations", async () => {
    const zeroUser = uuidv4();
    const zeroToken = jwt.sign(
      { id: zeroUser, email: "zero@example.com", plan: "PRO" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const res = await fetch(`${API_URL}/api/sls/recommendations`, {
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
    if (!data.success || data.hasData !== false || data.recommendations.length !== 0) {
      throw new Error(`Expected hasData: false. Got ${JSON.stringify(data)}`);
    }
  });

  // 15. Query failure simulations
  await assertTest("GET /api/sls/recommendations query failures returns HTTP 500 controlled errors", async () => {
    const res1 = await fetch(`${API_URL}/api/sls/recommendations`, {
      method: "GET",
      headers: { ...authHeaders, "x-test-simulate-parent-error": "true" }
    });
    if (res1.status !== 500) {
      throw new Error("Expected status 500");
    }
    const err1 = await res1.json();
    if (err1.error !== "Failed to retrieve student recommendations") {
      throw new Error("Incorrect error message");
    }
  });

  // 16. Full Integration Workflow fetch correctness
  await assertTest("Integration: Full recommendations pipeline fetch correctness & catalog integrity", async () => {
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

    // Seed attempt for integrationUser (use a real catalog chapter: phy_units)
    const attemptId = uuidv4();
    const parent = {
      id: attemptId,
      user_id: integrationUser,
      chapter_id: "phy_units",
      subject: "Physics",
      total_questions: 18,
      correct_answers: 3, // 16.6% accuracy -> critical chapter weakness -> Revise Chapter
      wrong_answers: 15,
      unanswered_answers: 0,
      accuracy: 16.67,
      total_time_seconds: 270,
      average_time_seconds: 15.0,
      status: "completed",
      completed_at: new Date().toISOString()
    };
    
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts`, {
      method: "POST",
      headers: dbHeaders,
      body: JSON.stringify(parent)
    });

    // Seed questions for integrationUser (use a real topic from catalog: si-base-units)
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
        correct_answer: i === 0 ? 0 : 1, // 25% accuracy -> critical topic weakness
        is_correct: i === 0,
        time_taken_seconds: 15,
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
    const res = await fetch(`${API_URL}/api/sls/recommendations`, {
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

    // Verify recommendations exists and revise chapter/practice topics are generated
    const reviseRec = data.recommendations.find(r => r.actionType === "REVISE_CHAPTER");
    if (!reviseRec || reviseRec.chapterId !== "phy_units") {
      throw new Error("Failed to generate REVISE_CHAPTER action for weak chapter");
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
