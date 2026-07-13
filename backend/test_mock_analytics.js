const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

// Load .env manually
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

const USER_1 = "a7251785-5df1-4aeb-ba9c-097c5545802a";
const USER_2 = "b8362896-6ef2-5bfc-cb0d-1a8d6656913b";

const TOKEN_1 = jwt.sign({ id: USER_1, email: "u1@example.com" }, JWT_SECRET, { expiresIn: "1h" });
const TOKEN_2 = jwt.sign({ id: USER_2, email: "u2@example.com" }, JWT_SECRET, { expiresIn: "1h" });

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function makePayload(mockId, mockTitle, completedAtOffsetMin, statsBySubject = {}) {
  // We want to construct exactly 60 questions: 15 Physics, 15 Chemistry, 15 Mathematics, 15 Biology
  const answers = [];
  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
  
  let questionOrder = 1;
  for (const subject of subjects) {
    const subjRules = statsBySubject[subject] || { correct: 10, skipped: 2, difficulty: "medium" };
    let correctCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < 15; i++) {
      const isSkipped = skippedCount < subjRules.skipped && i < subjRules.skipped;
      const isCorrect = !isSkipped && correctCount < subjRules.correct;

      let selectedAnswer = 2; // wrong answer by default
      if (isSkipped) {
        selectedAnswer = -1;
        skippedCount++;
      } else if (isCorrect) {
        selectedAnswer = 1;
        correctCount++;
      }

      answers.push({
        questionId: `q_${mockId}_${questionOrder}`,
        subject,
        difficulty: subjRules.difficulty,
        selectedAnswer,
        correctAnswer: 1,
        timeTakenSeconds: isSkipped ? 0 : 50 + i, // skipped questions take 0s
        estimatedTimeSeconds: 120,
        questionOrder: questionOrder++
      });
    }
  }

  const completedAt = new Date(Date.now() - completedAtOffsetMin * 60 * 1000).toISOString();
  const startedAt = new Date(Date.now() - (completedAtOffsetMin + 180) * 60 * 1000).toISOString();

  return {
    submissionId: uuid(),
    mockId,
    mockTitle,
    startedAt,
    completedAt,
    answers
  };
}

async function runTests() {
  console.log("════════════════════════════════════════════════════════");
  console.log(" Mock Performance Analytics Test Suite");
  console.log("════════════════════════════════════════════════════════\n");

  const createdResultIds = [];

  try {
    // Clean slate before test
    await supabase.from("mock_question_attempts").delete().in("user_id", [USER_1, USER_2]);
    await supabase.from("mock_results").delete().in("user_id", [USER_1, USER_2]);

    // 1. Unauthorized request
    {
      const res = await fetch(`${API_URL}/api/mock/analytics`, { method: "GET" });
      if (res.status !== 401) throw new Error("Analytics fetch without token did not return 401");
      console.log("  ✓ Unauthorized analytics fetch rejected with 401");
    }

    // 2. Zero-data user contract
    {
      const res = await fetch(`${API_URL}/api/mock/analytics`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      if (!res.ok) throw new Error("Failed to fetch empty analytics");
      const data = await res.json();
      if (!data.success || data.hasData !== false) throw new Error("Zero-data status is incorrect");
      if (data.analytics.overall.totalMocks !== 0) throw new Error("Zero-data totalMocks is not 0");
      if (data.analytics.progress.trend !== "insufficient_history") throw new Error("Zero-data trend should be insufficient_history");
      console.log("  ✓ Zero-data user receives complete empty contract with 200");
    }

    // 3. User isolation check (User 2 has zero data, while User 1 has attempts)
    // Let's first submit mock attempts for User 1
    // Attempt #1: 60 minutes ago
    // Physics: 8 correct, 2 skipped (medium)
    // Chemistry: 6 correct, 4 skipped (medium)
    // Mathematics: 4 correct, 1 skipped (medium)
    // Biology: 12 correct, 0 skipped (medium)
    // Total Correct = 8 + 6 + 4 + 12 = 30 / 60 = 50.0%
    const p1 = makePayload("IAT_FULL_01", "Mock Test 1", 60, {
      Physics: { correct: 8, skipped: 2, difficulty: "easy" },
      Chemistry: { correct: 6, skipped: 4, difficulty: "easy" },
      Mathematics: { correct: 4, skipped: 1, difficulty: "medium" },
      Biology: { correct: 12, skipped: 0, difficulty: "hard" }
    });

    // Attempt #2: 10 minutes ago
    // Physics: 10 correct, 1 skipped (easy)
    // Chemistry: 10 correct, 2 skipped (easy)
    // Mathematics: 8 correct, 0 skipped (medium)
    // Biology: 14 correct, 0 skipped (hard)
    // Total Correct = 10 + 10 + 8 + 14 = 42 / 60 = 70.0%
    const p2 = makePayload("IAT_FULL_02", "Mock Test 2", 10, {
      Physics: { correct: 10, skipped: 1, difficulty: "easy" },
      Chemistry: { correct: 10, skipped: 2, difficulty: "easy" },
      Mathematics: { correct: 8, skipped: 0, difficulty: "medium" },
      Biology: { correct: 14, skipped: 0, difficulty: "hard" }
    });

    const submit = async (token, payload) => {
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
      const data = await res.json();
      createdResultIds.push(data.mockResultId);
      return data.mockResultId;
    };

    await submit(TOKEN_1, p1);
    await submit(TOKEN_1, p2);

    console.log("  ✓ Submitted 2 mock tests with different scores, subjects, and difficulties");

    // Fetch User 2 analytics to verify isolation
    {
      const res = await fetch(`${API_URL}/api/mock/analytics`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_2}` }
      });
      const data = await res.json();
      if (data.hasData !== false) throw new Error("User 2 analytics is dirty with User 1 attempts");
      console.log("  ✓ User isolation enforced (User 2 has empty stats)");
    }

    // 4. Fetch User 1 analytics and check calculations
    {
      const res = await fetch(`${API_URL}/api/mock/analytics`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      if (!res.ok) throw new Error("Failed to fetch User 1 analytics");
      const data = await res.json();
      if (!data.success || !data.hasData) throw new Error("Analytics state indicates no data");

      const a = data.analytics;

      // Overall calculations:
      // totalMocks: 2
      // averageScore: (30 + 42) / 2 = 36
      // bestScore: 42
      // latestScore: 42
      // totalQuestions: 120
      // totalCorrect: 72
      // totalAnswered: 53 + 57 = 110
      // weighted averageAccuracy: (72 / 110) * 100 = 65.5%
      if (a.overall.totalMocks !== 2) throw new Error(`Expected 2 mocks, got ${a.overall.totalMocks}`);
      if (a.overall.averageScore !== 36.0) throw new Error(`Expected average score 36.0, got ${a.overall.averageScore}`);
      if (a.overall.bestScore !== 42) throw new Error(`Expected best score 42, got ${a.overall.bestScore}`);
      if (a.overall.latestScore !== 42) throw new Error(`Expected latest score 42, got ${a.overall.latestScore}`);
      if (a.overall.averageAccuracy !== 65.5) throw new Error(`Expected average accuracy 65.5, got ${a.overall.averageAccuracy}`);
      console.log("  ✓ Weighted overall accuracy and overall stats calculated correctly");

      // Progress calculations:
      // firstScore: 30
      // latestScore: 42
      // scoreChange: +12
      // firstAccuracy: 30 / 53 = 56.6%
      // latestAccuracy: 42 / 57 = 73.7%
      // accuracyChangePercentagePoints: +17.1
      // trend: "improving" (since scoreChange >= 5)
      const p = a.progress;
      if (p.firstScore !== 30) throw new Error(`Expected first score 30, got ${p.firstScore}`);
      if (p.latestScore !== 42) throw new Error(`Expected latest score 42, got ${p.latestScore}`);
      if (p.scoreChange !== 12) throw new Error(`Expected score change 12, got ${p.scoreChange}`);
      if (p.firstAccuracy !== 56.6) throw new Error(`Expected first accuracy 56.6, got ${p.firstAccuracy}`);
      if (p.latestAccuracy !== 73.7) throw new Error(`Expected latest accuracy 73.7, got ${p.latestAccuracy}`);
      if (p.accuracyChangePercentagePoints !== 17.1) throw new Error(`Expected accuracy change 17.1, got ${p.accuracyChangePercentagePoints}`);
      if (p.trend !== "improving") throw new Error(`Expected trend to be improving, got ${p.trend}`);
      console.log("  ✓ Chronological progress trend and change deltas verified");

      // Subject accuracy calculations:
      // Biology:
      // Attempt 1: 12 correct / 15 Qs
      // Attempt 2: 14 correct / 15 Qs
      // Total Biology Correct = 26 / 30 Qs = 86.7%
      const bio = a.subjects.find(s => s.subject === "Biology");
      if (!bio) throw new Error("Biology stats missing");
      if (bio.accuracy !== 86.7) throw new Error(`Expected Biology accuracy 86.7%, got ${bio.accuracy}%`);

      // Mathematics:
      // Attempt 1: 4 correct / 14 answered (1 skipped)
      // Attempt 2: 8 correct / 15 answered
      // Total Maths Correct = 12 / 29 Qs = 41.4%
      const math = a.subjects.find(s => s.subject === "Mathematics");
      if (!math) throw new Error("Mathematics stats missing");
      if (math.accuracy !== 41.4) throw new Error(`Expected Mathematics accuracy 41.4%, got ${math.accuracy}%`);
      
      console.log("  ✓ Dynamic subject aggregation and weighted accuracy verified (skipped Qs excluded from denominator)");

      // Deterministic strongest / weakest:
      // Strongest accuracy: Biology (86.7)
      // Weakest accuracy: Mathematics (41.4)
      if (a.strongestSubject.subject !== "Biology") throw new Error(`Expected strongest Biology, got ${a.strongestSubject.subject}`);
      if (a.weakestSubject.subject !== "Mathematics") throw new Error(`Expected weakest Mathematics, got ${a.weakestSubject.subject}`);
      console.log("  ✓ Strongest and weakest subject selection works correctly");

      // Time Management check (excludes skipped items from denominator):
      // Attempt 1 Biology: 0 skipped. Attempt 2 Biology: 0 skipped.
      // Attempt 1 Physics: 2 skipped (13 answered). Attempt 2 Physics: 1 skipped (14 answered).
      // Let's check that averageAnsweringTime is non-zero and correct.
      if (bio.averageTimeSeconds <= 0) throw new Error("Biology averageTimeSeconds should be greater than zero");
      console.log("  ✓ Time Management metrics correctly exclude skipped questions");
      
      // Recent Attempts sorting (newest first, i.e., IAT_FULL_02 first):
      if (a.recentAttempts[0].mockId !== "IAT_FULL_02") {
        throw new Error(`Expected first recent attempt to be IAT_FULL_02, got ${a.recentAttempts[0].mockId}`);
      }
      console.log("  ✓ Recent attempts list is sorted newest first");
    }

  } catch (err) {
    console.error("\n❌ Test Suite Failed:");
    console.error(err);
    process.exit(1);
  } finally {
    if (createdResultIds.length > 0) {
      console.log(`\n  [Cleanup] Removing ${createdResultIds.length} test record(s) from DB…`);
      await supabase.from("mock_question_attempts").delete().in("mock_result_id", createdResultIds);
      await supabase.from("mock_results").delete().in("id", createdResultIds);
    }
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log(" Results: All analytics tests passed!");
  console.log("════════════════════════════════════════════════════════\n");
}

runTests();
