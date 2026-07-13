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

function makePayload(mockId, mockTitle, completedAtOffsetMin, correctCount = 40) {
  const answers = [];
  for (let i = 0; i < 60; i++) {
    answers.push({
      questionId: String(i + 1),
      subject: i < 15 ? "Physics" : i < 30 ? "Chemistry" : i < 45 ? "Mathematics" : "Biology",
      difficulty: "medium",
      selectedAnswer: i < correctCount ? 1 : 2,
      correctAnswer: 1,
      timeTakenSeconds: 10 + i,
      estimatedTimeSeconds: 120,
      questionOrder: i + 1
    });
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
  console.log(" Mock History & Review Details Test Suite");
  console.log("════════════════════════════════════════════════════════\n");

  const createdResultIds = [];

  try {
    // Clean slate before test
    await supabase.from("mock_question_attempts").delete().in("user_id", [USER_1, USER_2]);
    await supabase.from("mock_results").delete().in("user_id", [USER_1, USER_2]);
    // 1. Unauthorized request
    {
      const res = await fetch(`${API_URL}/api/mock/history`, { method: "GET" });
      if (res.status !== 401) throw new Error("History fetch without auth token did not return 401");
      console.log("  ✓ Unauthorized history fetch rejected with 401");
    }

    // 2. Submit attempts for User 1
    // Attempt #1: 10 minutes ago, 45 correct answers
    const p1 = makePayload("IAT_FULL_01", "Mock Test 1", 10, 45);
    // Attempt #2: 60 minutes ago, 30 correct answers
    const p2 = makePayload("IAT_FULL_02", "Mock Test 2", 60, 30);
    // Attempt #3: 120 minutes ago, 50 correct answers (best score)
    const p3 = makePayload("IAT_FULL_03", "Mock Test 3", 120, 50);

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

    const r1Id = await submit(TOKEN_1, p1);
    const r2Id = await submit(TOKEN_1, p2);
    const r3Id = await submit(TOKEN_1, p3);

    console.log("  ✓ Submitted 3 mock attempts with distinct timestamps and scores");

    // 3. Fetch history for User 1
    {
      const res = await fetch(`${API_URL}/api/mock/history`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      if (!res.ok) throw new Error("Failed to fetch User 1 history");
      
      const data = await res.json();
      if (!data.success || !data.hasData) throw new Error("History status indicates no data");
      
      // Check summary calculations
      // Scores: 45, 30, 50
      // Best Score = 50
      // Accuracies: (45/60)*100 = 75.0, (30/60)*100 = 50.0, (50/60)*100 = 83.3
      // Best Accuracy = 83.3
      // Average Score = (45 + 30 + 50) / 3 = 41.7
      // Average Accuracy = (75.0 + 50.0 + 83.3) / 3 = 69.4
      // Latest Score = 45 (Attempt #1, 10 min ago)
      
      const s = data.summary;
      if (s.totalMocks !== 3) throw new Error(`Expected 3 mocks, got ${s.totalMocks}`);
      if (s.bestScore !== 50) throw new Error(`Expected best score 50, got ${s.bestScore}`);
      if (s.bestAccuracy !== 83.3) throw new Error(`Expected best accuracy 83.3, got ${s.bestAccuracy}`);
      if (s.averageScore !== 41.7) throw new Error(`Expected average score 41.7, got ${s.averageScore}`);
      if (s.averageAccuracy !== 69.4) throw new Error(`Expected average accuracy 69.4, got ${s.averageAccuracy}`);
      if (s.latestScore !== 45) throw new Error(`Expected latest score 45, got ${s.latestScore}`);
      
      console.log("  ✓ Summary statistics (average, best, latest, count) calculated correctly");

      // Check sorting order (completed_at DESC)
      const timestamps = data.history.map(h => new Date(h.completedAt).getTime());
      for (let i = 0; i < timestamps.length - 1; i++) {
        if (timestamps[i] < timestamps[i + 1]) {
          throw new Error("History items not sorted in descending completedAt order");
        }
      }
      console.log("  ✓ History list sorted in descending chronological order (completedAt DESC)");
    }

    // 4. Fetch detail attempt questions review for User 1
    {
      const res = await fetch(`${API_URL}/api/mock/attempts/${r1Id}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      if (!res.ok) throw new Error(`Failed to fetch attempts detail for ID ${r1Id}`);

      const data = await res.json();
      if (!data.success) throw new Error("Attempt detail response marked unsuccessful");
      if (!data.selectedAnswers || !data.questionTimes) throw new Error("Missing answers or questionTimes map");
      
      // Verify correct values mapped
      // Questions 1-45 were answered with 1 (correct), others with 2 (incorrect)
      if (data.selectedAnswers["1"] !== 1) throw new Error(`Expected selectedAnswer for question 1 to be 1, got ${data.selectedAnswers["1"]}`);
      if (data.selectedAnswers["46"] !== 2) throw new Error(`Expected selectedAnswer for question 46 to be 2, got ${data.selectedAnswers["46"]}`);
      if (data.questionTimes["1"] !== 10) throw new Error(`Expected question 1 time to be 10, got ${data.questionTimes["1"]}`);
      
      console.log("  ✓ Successfully retrieved attempts details answers and times spent mappings");
    }

    // 5. User isolation (User 2 tries to fetch User 1's details)
    {
      const res = await fetch(`${API_URL}/api/mock/attempts/${r1Id}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_2}` }
      });
      if (res.status !== 403) throw new Error(`User 2 fetching User 1 attempts did not return 403, returned ${res.status}`);
      console.log("  ✓ Access to another user's attempts details is correctly blocked (403)");
    }

    // 6. User 2 has empty history
    {
      const res = await fetch(`${API_URL}/api/mock/history`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_2}` }
      });
      if (!res.ok) throw new Error("Failed to fetch User 2 history");
      const data = await res.json();
      if (data.hasData !== false || data.history.length !== 0) {
        throw new Error("Expected empty history data for User 2");
      }
      console.log("  ✓ User with no mock attempts correctly returns empty history data state");

    }

  } catch (err) {
    console.error("\n❌ Test Suite Failed:");
    console.error(err);
    process.exit(1);
  } finally {
    // Cleanup parent and children records
    if (createdResultIds.length > 0) {
      console.log(`\n  [Cleanup] Removing ${createdResultIds.length} test record(s) from DB…`);
      await supabase.from("mock_question_attempts").delete().in("mock_result_id", createdResultIds);
      await supabase.from("mock_results").delete().in("id", createdResultIds);
    }
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log(" Results: All tests passed!");
  console.log("════════════════════════════════════════════════════════\n");
}

runTests();
