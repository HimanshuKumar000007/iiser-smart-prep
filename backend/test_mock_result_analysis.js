const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

// ── Load .env manually ──────────────────────────────────────────────────────
const envPath = path.join(__dirname, ".env");
fs.readFileSync(envPath, "utf-8").split("\n").forEach(line => {
  const [k, ...rest] = line.split("=");
  if (k && rest.length) process.env[k.trim()] = rest.join("=").trim();
});

const API_URL = `http://localhost:${process.env.PORT || 5000}`;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const supabase = createClient(SUPABASE_URL, SRK);

const TEST_USER_1 = "9dbda72a-bf1b-4d30-a22a-f3e3a9a8d46a";
const TEST_USER_2 = "8c12a78b-bf2c-450e-b83b-e1ef234f90ab";

const TOKEN_1 = jwt.sign({ id: TEST_USER_1, email: "u1@example.com" }, JWT_SECRET, { expiresIn: "1h" });
const TOKEN_2 = jwt.sign({ id: TEST_USER_2, email: "u2@example.com" }, JWT_SECRET, { expiresIn: "1h" });

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// ─── DB HELPER FOR INSERTING TEST CASES ──────────────────────────────────────
async function insertMockData({
  userId = TEST_USER_1,
  correct = 0,
  wrong = 0,
  skipped = 60,
  totalTime = 300,
  subjectMap = null,
  customTimes = null, // array of 60 integers
  customAnswers = null // array of 60 objects: { selectedAnswer: number|null, isCorrect: boolean, chapterId?: string, subject?: string }
} = {}) {
  const resultId = uuid();
  const mockId = "mock_test_v2_spec";

  // Build attempts list
  const attempts = [];
  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
  const difficulties = ["easy", "medium", "hard"];
  const chapters = ["phy_units", "chem_basic_concepts", "math_sets", "bio_living_world"];

  let correctAlloc = 0;
  let wrongAlloc = 0;
  let skippedAlloc = 0;

  for (let i = 0; i < 60; i++) {
    const subj = (customAnswers && customAnswers[i] && customAnswers[i].subject) || subjects[i % 4];
    const diff = difficulties[i % 3];
    const chap = (customAnswers && customAnswers[i] && customAnswers[i].chapterId) || chapters[i % 4];
    let selectedAnswer = -1;
    let isCorrect = false;

    if (customAnswers && customAnswers[i]) {
      selectedAnswer = customAnswers[i].selectedAnswer === null ? -1 : customAnswers[i].selectedAnswer;
      isCorrect = customAnswers[i].isCorrect;
      if (selectedAnswer !== -1) {
        if (isCorrect) correctAlloc++; else wrongAlloc++;
      } else {
        skippedAlloc++;
      }
    } else if (subjectMap && subjectMap[subj]) {
      const ms = subjectMap[subj];
      if (ms.correctAlloc < ms.correct) {
        selectedAnswer = 1;
        isCorrect = true;
        ms.correctAlloc++;
      } else if (ms.wrongAlloc < ms.wrong) {
        selectedAnswer = 2;
        isCorrect = false;
        ms.wrongAlloc++;
      } else {
        selectedAnswer = -1;
        isCorrect = false;
        ms.skippedAlloc++;
      }
    } else {
      if (correctAlloc < correct) {
        selectedAnswer = 1;
        isCorrect = true;
        correctAlloc++;
      } else if (wrongAlloc < wrong) {
        selectedAnswer = 2;
        isCorrect = false;
        wrongAlloc++;
      } else {
        selectedAnswer = -1;
        isCorrect = false;
        skippedAlloc++;
      }
    }

    let timeTaken = 0;
    if (customTimes && customTimes[i] !== undefined) {
      timeTaken = customTimes[i];
    } else {
      timeTaken = selectedAnswer === -1 ? 0 : Math.round(totalTime / (correct + wrong || 1));
    }

    attempts.push({
      mock_result_id: resultId,
      user_id: userId,
      mock_id: mockId,
      question_id: `q_${i + 1}`,
      chapter_id: chap,
      topic_id: `topic_${i + 1}`,
      subject: subj,
      difficulty: diff,
      selected_answer: selectedAnswer === -1 ? null : selectedAnswer,
      correct_answer: 1,
      is_correct: isCorrect,
      time_taken_seconds: timeTaken,
      estimated_time_seconds: 120,
      question_order: i + 1
    });
  }

  // Insert mock result parent
  const parentCorrect = customAnswers ? correctAlloc : correct;
  const parentWrong = customAnswers ? wrongAlloc : wrong;
  const parentSkipped = 60 - parentCorrect - parentWrong;
  const parentTime = customTimes ? customTimes.reduce((sum, t) => sum + t, 0) : totalTime;

  const { error: pErr } = await supabase
    .from("mock_results")
    .insert([{
      id: resultId,
      user_id: userId,
      mock_id: mockId,
      mock_title: "Results V2 Specification Mock",
      score: parentCorrect,
      total_questions: 60,
      correct: parentCorrect,
      wrong: parentWrong,
      skipped: parentSkipped,
      time_taken: parentTime
    }]);

  if (pErr) throw pErr;

  const { error: cErr } = await supabase
    .from("mock_question_attempts")
    .insert(attempts);

  if (cErr) throw cErr;

  return resultId;
}

async function cleanUserData(userId) {
  await supabase.from("mock_question_attempts").delete().eq("user_id", userId);
  await supabase.from("mock_results").delete().eq("user_id", userId);
}

// ─── RUN RUNNER ─────────────────────────────────────────────────────────────
async function run() {
  console.log("======================================================");
  console.log(" RESULTS V2 ANALYSIS AUTOMATED TEST SPECIFICATION");
  console.log("======================================================");

  try {
    await cleanUserData(TEST_USER_1);
    await cleanUserData(TEST_USER_2);

    // ─── TEST 1: Unauthorized access ────────────────────────────────────────
    {
      const res = await fetch(`${API_URL}/api/mock/results/some-id/analysis`, { method: "GET" });
      if (res.status !== 401) throw new Error(`Expected 401 unauthorized, got ${res.status}`);
      console.log("  ✓ Unauthorized request rejected with 401");
    }

    // ─── TEST 2: Missing / Not Found result (returns 404) ────────────────────
    {
      const res = await fetch(`${API_URL}/api/mock/results/${uuid()}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
      console.log("  ✓ Non-existent resultId returns 404");
    }

    // ─── TEST 3: Scenario A: 60 Skipped (NONE evidence) ──────────────────────
    {
      const resultId = await insertMockData({ correct: 0, wrong: 0, skipped: 60 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      if (res.status !== 200) throw new Error(`Fetch failed: ${res.status}`);
      const d = await res.json();

      if (d.summary.score !== 0) throw new Error("Expected score 0");
      if (d.summary.accuracy !== null) throw new Error("Expected accuracy null");
      if (d.summary.coverage !== 0.0) throw new Error("Expected coverage 0");
      if (d.evidence.state !== "NONE") throw new Error("Expected NONE state");
      if (d.performance.status !== "NONE") throw new Error("Expected performance NONE");
      if (d.recommendedAction.actionType !== "BUILD_MORE_EVIDENCE") throw new Error(`Expected action BUILD_MORE_EVIDENCE, got ${d.recommendedAction.actionType}`);

      // Readiness evaluation NONE evidence check
      if (d.iiserReadiness.readinessLevel !== "NOT_EVALUATED") throw new Error("Expected NOT_EVALUATED readinessLevel");
      if (d.iiserReadiness.readinessScore !== null) throw new Error("Expected null readinessScore");
      if (d.iiserReadiness.confidence !== "NONE") throw new Error("Expected NONE confidence");

      // Dynamic header check
      if (d.dynamicSummary !== "No questions were attempted, so your performance could not yet be evaluated.") {
        throw new Error(`Unexpected dynamic summary: ${d.dynamicSummary}`);
      }

      console.log("  ✓ Scenario A (60 Skipped) verified");
    }

    // ─── TEST 4: Scenario B: 1 Correct, 0 Wrong, 59 Skipped (LIMITED evidence)
    {
      const resultId = await insertMockData({ correct: 1, wrong: 0, skipped: 59 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      if (d.summary.score !== 1) throw new Error("Expected score 1");
      if (d.summary.accuracy !== 100.0) throw new Error("Expected accuracy 100%");
      if (d.summary.coverage !== 1.7) throw new Error(`Expected coverage 1.7%, got ${d.summary.coverage}`);
      if (d.evidence.state !== "LIMITED") throw new Error("Expected LIMITED evidence state");
      if (d.performance.status !== "LIMITED") throw new Error("Expected Building Your Profile status");
      if (d.recommendedAction.actionType !== "BUILD_MORE_EVIDENCE") throw new Error("Expected Action BUILD_MORE_EVIDENCE");

      // Check subject claim gating (since subject has < 5 attempts, should return fallback)
      const insight = d.insights.find(ins => ins.category === "strength");
      if (!insight || !insight.text.includes("Answer more questions")) {
        throw new Error(`Subject insight gating failed: ${insight?.text}`);
      }

      // Dynamic header check
      if (d.dynamicSummary !== "You attempted 1 of 60 questions. Answer more questions to build a reliable performance profile.") {
        throw new Error(`Unexpected dynamic summary: ${d.dynamicSummary}`);
      }

      console.log("  ✓ Scenario B (1 Correct, 59 Skipped) verified");
    }

    // ─── TEST 5: Scenario C: 0 Correct, 1 Wrong, 59 Skipped ──────────────────
    {
      const resultId = await insertMockData({ correct: 0, wrong: 1, skipped: 59 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      if (d.summary.score !== 0) throw new Error("Expected score 0");
      if (d.summary.accuracy !== 0.0) throw new Error("Expected accuracy 0%");
      if (d.evidence.state !== "LIMITED") throw new Error("Expected LIMITED evidence state");
      
      if (d.mistakeAnalysis.totalWrongCount !== 1) throw new Error("Expected totalWrongCount 1");

      console.log("  ✓ Scenario C (0 Correct, 1 Wrong, 59 Skipped) verified");
    }

    // ─── TEST 6: Subject evidence thresholds ─────────────────────────────────
    {
      const subjectMap = {
        Physics: { correct: 4, wrong: 1, correctAlloc: 0, wrongAlloc: 0, skippedAlloc: 0 }
      };
      const resultId = await insertMockData({ subjectMap });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      const insight = d.insights.find(ins => ins.category === "strength");
      if (!insight || !insight.text.includes("Physics was your strongest")) {
        throw new Error(`Expected Physics strongest insight, got: ${insight?.text}`);
      }
      console.log("  ✓ Subject gating & strongest subject claim works correctly");
    }

    // ─── TEST 7: Scenario D: 16 Correct, 44 Wrong, 0 Skipped ──────────────────
    {
      const resultId = await insertMockData({ correct: 16, wrong: 44, skipped: 0 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      if (d.summary.score !== 16) throw new Error("Expected score 16");
      if (d.summary.accuracy !== 26.7) throw new Error(`Expected accuracy 26.7%, got ${d.summary.accuracy}`);
      if (d.summary.coverage !== 100.0) throw new Error("Expected coverage 100%");
      if (d.evidence.state !== "SUFFICIENT") throw new Error("Expected SUFFICIENT evidence");
      if (d.performance.status !== "NEEDS_IMPROVEMENT") throw new Error("Expected NEEDS_IMPROVEMENT status");

      console.log("  ✓ Scenario D (16 Correct, 44 Wrong, 0 Skipped) verified");
    }

    // ─── TEST 8: Scenario E: 60 Correct, 0 Wrong, 0 Skipped ──────────────────
    {
      const resultId = await insertMockData({ correct: 60, wrong: 0, skipped: 0 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      if (d.summary.score !== 60) throw new Error("Expected score 60");
      if (d.summary.accuracy !== 100.0) throw new Error("Expected accuracy 100%");
      if (d.performance.status !== "OUTSTANDING") throw new Error("Expected OUTSTANDING performance");

      console.log("  ✓ Scenario E (60 Correct, 0 Wrong, 0 Skipped) verified");
    }

    // ─── TEST 9: Cross-user isolation (404 response) ─────────────────────────
    {
      const resultId = await insertMockData({ userId: TEST_USER_1, correct: 10 });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_2}` } // User 2 requests User 1 attempt
      });
      if (res.status !== 404) throw new Error(`Cross-user request should return 404, got ${res.status}`);
      console.log("  ✓ Cross-user access returns 404 correctly");
    }

    // ─── TEST 10: Historical comparison validation ──────────────────────────
    {
      await cleanUserData(TEST_USER_1);
      const firstId = await insertMockData({ correct: 20, wrong: 40, skipped: 0 });
      const secondId = await insertMockData({ correct: 30, wrong: 30, skipped: 0 });

      const res = await fetch(`${API_URL}/api/mock/results/${secondId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();

      const hc = d.historicalComparison;
      if (!hc.hasComparison) throw new Error("Comparison not calculated");
      if (hc.previousMock.score !== 20) throw new Error(`Expected previous score 20, got ${hc.previousMock.score}`);
      if (hc.trend !== "improving") throw new Error(`Expected improving trend, got ${hc.trend}`);
      if (hc.personalBest.score !== 30) throw new Error(`Expected personal best score 30, got ${hc.personalBest.score}`);

      console.log("  ✓ Historical progress comparison & trend analyzed correctly");
    }

    // ─── TEST 11: UPGRADED PACE ANALYSIS (Outliers & Percentiles) ────────────
    {
      // 10 answered questions with custom response times:
      // Times: 10, 12, 14, 16, 18, 20, 22, 24, 26, 300 (300 is extreme outlier)
      const customTimes = Array(60).fill(0);
      const times = [10, 12, 14, 16, 18, 20, 22, 24, 26, 300];
      times.forEach((t, i) => { customTimes[i] = t; });

      const customAnswers = Array(60).fill(null).map((_, i) => {
        if (i < 10) return { selectedAnswer: 1, isCorrect: i % 2 === 0, chapterId: "phy_units", subject: "Physics" };
        return null; // skipped
      });

      const resultId = await insertMockData({ customTimes, customAnswers });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();
      const ta = d.timeAnalysis;

      // Assert percentiles are calculated correctly
      if (ta.medianAnsweredTime === null || ta.medianAnsweredTime <= 0) throw new Error("Median calculation failed");
      if (ta.p75AnsweredTime === null || ta.p75AnsweredTime <= 0) throw new Error("P75 calculation failed");
      if (ta.p90AnsweredTime === null || ta.p90AnsweredTime <= 0) throw new Error("P90 calculation failed");
      if (ta.outlierThreshold === null || ta.outlierThreshold <= ta.p75AnsweredTime) throw new Error("Outlier threshold incorrect");
      if (ta.outlierQuestionCount !== 1) throw new Error(`Expected exactly 1 outlier, got ${ta.outlierQuestionCount}`);

      console.log("  ✓ Upgraded Pace Analysis (Percentiles & IQR Outliers) verified");
    }

    // ─── TEST 12: FIX OVERCONFIDENT TIME INSIGHTS ────────────────────────────
    {
      // Case 1: Slow incorrect response
      const customTimes = Array(60).fill(0);
      customTimes[0] = 500; // very slow incorrect response (Question 1)
      const customAnswers = Array(60).fill(null).map((_, i) => {
        if (i < 5) return { selectedAnswer: i === 0 ? 2 : 1, isCorrect: i !== 0, chapterId: "phy_units", subject: "Physics" };
        return null;
      });
      const resultId = await insertMockData({ customTimes, customAnswers });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();
      const timeInsight = d.insights.find(ins => ins.category === "time");

      if (!timeInsight || !timeInsight.text.includes("Question 1 took") || !timeInsight.text.includes("determine whether the cause was difficulty")) {
        throw new Error(`Incorrect pacing insight for slow incorrect response: ${timeInsight?.text}`);
      }

      // Case 2: Slow correct response
      customTimes[0] = 500;
      customAnswers[0].isCorrect = true; // slow correct response
      const resultId2 = await insertMockData({ customTimes, customAnswers });
      const res2 = await fetch(`${API_URL}/api/mock/results/${resultId2}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d2 = await res2.json();
      const timeInsight2 = d2.insights.find(ins => ins.category === "time");

      if (!timeInsight2 || !timeInsight2.text.includes("Question 1 correctly, but it required significantly more time")) {
        throw new Error(`Incorrect pacing insight for slow correct response: ${timeInsight2?.text}`);
      }

      console.log("  ✓ Safe Time Insights (Epistemically safe wording) verified");
    }

    // ─── TEST 13: RECOMMENDATION EXPLAINABILITY ──────────────────────────────
    {
      // 20 questions completed so evidence is SUFFICIENT.
      // phy_units chapter has 4 attempts, all incorrect (accuracy 0).
      const customAnswers = Array(60).fill(null).map((_, i) => {
        if (i < 20) {
          const isPhy = i < 4;
          return {
            selectedAnswer: 1,
            isCorrect: !isPhy,
            chapterId: isPhy ? "phy_units" : "chem_basic_concepts",
            subject: isPhy ? "Physics" : "Chemistry"
          };
        }
        return null;
      });
      const resultId = await insertMockData({ customAnswers });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();
      const rec = d.recommendedAction;

      if (rec.actionType !== "REVISE_CHAPTER") throw new Error(`Expected REVISE_CHAPTER action, got ${rec.actionType}`);
      if (rec.selectionReasonCode !== "HIGHEST_REVISION_PRIORITY") {
        throw new Error(`Expected selectionReasonCode HIGHEST_REVISION_PRIORITY, got ${rec.selectionReasonCode}`);
      }
      if (!rec.selectionExplanation.includes("answered 0 of")) {
        throw new Error(`Expected explanation matching 0 correct answers, got: ${rec.selectionExplanation}`);
      }

      console.log("  ✓ Recommendation Explainability metadata verified");
    }

    // ─── TEST 14: IISER-SPECIFIC READINESS EVALUATION ─────────────────────────
    {
      // Sufficient evidence (20 questions answered correctly)
      const customAnswers = Array(60).fill(null).map((_, i) => {
        if (i < 30) {
          return { selectedAnswer: 1, isCorrect: i % 2 === 0, chapterId: "phy_units", subject: "Physics" };
        }
        return null;
      });
      const resultId = await insertMockData({ customAnswers });
      const res = await fetch(`${API_URL}/api/mock/results/${resultId}/analysis`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN_1}` }
      });
      const d = await res.json();
      const ir = d.iiserReadiness;

      if (!ir) throw new Error("iiserReadiness is missing!");
      if (!ir.readinessLevel) throw new Error("readinessLevel is missing!");
      if (ir.readinessScore === null || ir.readinessScore <= 0) throw new Error("readinessScore calculation failed");
      if (!ir.factors || ir.factors.length === 0) throw new Error("readinessFactors are empty");

      // Verify that score weight normalization handles missing historical trend cleanly
      if (ir.confidence !== "STRONG" && ir.confidence !== "MODERATE") throw new Error("Confidence level calculation incorrect");

      console.log("  ✓ IISER-Specific Readiness Evaluation (Weight Normalization & Factors) verified");
    }

    // Cleanup user data after verification
    await cleanUserData(TEST_USER_1);
    await cleanUserData(TEST_USER_2);

    console.log("======================================================");
    console.log(" RESULTS V2 VERIFICATION COMPLETED SUCCESSFULLY!");
    console.log("======================================================");
  } catch (error) {
    console.error("Test run failure:", error);
    process.exit(1);
  }
}

run();
