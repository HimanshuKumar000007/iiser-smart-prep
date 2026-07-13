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
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const supabase = createClient(SUPABASE_URL, SRK);

const TEST_USER_ID = "55555555-5555-5555-5555-555555555555";
const TEST_TOKEN = jwt.sign(
  { id: TEST_USER_ID, email: "quick_mock_test@example.com", plan: "PRO" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function runSuite() {
  console.log("=== Running Stateless Quick Mocks Integration Tests ===\n");

  try {
    // 0. Ensure user exists
    await supabase.from("users").upsert([
      { id: TEST_USER_ID, email: "quick_mock_test@example.com", name: "Quick Mock Test User" }
    ]);

    // 1. Clean up any leftover database records for this user (if any exist)
    await supabase.from("mock_question_attempts").delete().eq("user_id", TEST_USER_ID);
    await supabase.from("mock_results").delete().eq("user_id", TEST_USER_ID);

    // Record initial global database counts to assert zero writes globally
    const [initResults, initAttempts] = await Promise.all([
      supabase.from("mock_results").select("id"),
      supabase.from("mock_question_attempts").select("id")
    ]);
    const initialGlobalResultsCount = (initResults.data || []).length;
    const initialGlobalAttemptsCount = (initAttempts.data || []).length;

    // 2. Test GET /api/quick-mocks/catalog?subject=Mathematics
    console.log("Test 1: GET quick-mocks catalog for Mathematics...");
    const resCatalog = await fetch(`${API_URL}/api/quick-mocks/catalog?subject=Mathematics`, {
      headers: { "Authorization": `Bearer ${TEST_TOKEN}` }
    });
    assert(resCatalog.ok, `Failed to load catalog: ${resCatalog.statusText}`);
    const catalogData = await resCatalog.json();
    assert(catalogData.success === true, "Catalog success should be true");
    assert(catalogData.subject === "Mathematics", "Subject field must be Mathematics");
    assert(Array.isArray(catalogData.chapters), "Chapters must be an array");

    const trigChapter = catalogData.chapters.find(c => c.chapterId === "math_trig");
    assert(trigChapter !== undefined, "math_trig chapter should exist in Mathematics catalog");
    assert(trigChapter.mocks.length === 4, "Every chapter should contain exactly 4 mocks");

    // Trig has mapped questions
    const mock1 = trigChapter.mocks[0];
    assert(mock1.id === "qm_math_trig_01", "Mock 1 ID must be qm_math_trig_01");
    assert(mock1.status === "AVAILABLE", "Trig Mock 1 should be AVAILABLE since questions are mapped");
    assert(mock1.questionCount === 16, "Trig Mock 1 should have 16 questions");
    assert(mock1.durationMinutes === 30, "Trig Mock 1 should have 30 minutes duration");

    console.log("-> Pass (Test 1)");

    // 3. Test POST /api/quick-mock/session/start (Resolving, Sanitization & Security)
    console.log("Test 2: POST session start for Trig Mock 1...");
    const resStart = await fetch(`${API_URL}/api/quick-mock/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({ quickMockId: "qm_math_trig_01" })
    });
    assert(resStart.ok, `Failed to start session: ${resStart.statusText}`);
    const startData = await resStart.json();
    assert(startData.success === true, "Session start success should be true");
    assert(startData.quickMockId === "qm_math_trig_01", "Session quickMockId mismatch");
    assert(startData.questions.length === 16, "Quick mock must return exactly 16 questions");

    // Security check: correct and explanation must be completely stripped
    startData.questions.forEach((q, i) => {
      assert(q.correct === undefined, `Question ${i} still contains correct answer key!`);
      assert(q.explanation === undefined, `Question ${i} still contains explanation text!`);
    });

    console.log("-> Pass (Test 2)");

    // 4. Test Determinism (identical sets returned for same ID)
    console.log("Test 3: Verify determinism of question set...");
    const resStart2 = await fetch(`${API_URL}/api/quick-mock/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({ quickMockId: "qm_math_trig_01" })
    });
    const startData2 = await resStart2.json();
    const ids1 = startData.questions.map(q => q.id);
    const ids2 = startData2.questions.map(q => q.id);
    assert(JSON.stringify(ids1) === JSON.stringify(ids2), "Deterministic question selection returned different sets for the same ID");

    console.log("-> Pass (Test 3)");

    // 5. Test POST /api/quick-mock/session/submit
    console.log("Test 4: POST submit quick mock session scoring...");
    // Retrieve correct answers from secure backend questions database
    const quickMockQuestions = require("./data/quickMockQuestions.json");
    const canonicalQuestions = quickMockQuestions["qm_math_trig_01"];
    assert(canonicalQuestions !== undefined && canonicalQuestions.length === 16, "Trig Mock 1 canonical questions list not found or invalid");

    // Simulate: 10 correct answers, 3 incorrect, 3 skipped
    const answers = canonicalQuestions.map((q, idx) => {
      let selectedAnswer = -1; // skipped
      if (idx < 10) {
        selectedAnswer = q.correct; // correct
      } else if (idx < 13) {
        selectedAnswer = (q.correct + 1) % 4; // incorrect
      }
      return { questionId: q.id, selectedAnswer };
    });

    const resSubmit = await fetch(`${API_URL}/api/quick-mock/session/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`
      },
      body: JSON.stringify({
        quickMockId: "qm_math_trig_01",
        answers
      })
    });
    assert(resSubmit.ok, `Failed to submit session: ${resSubmit.statusText}`);
    const submitData = await resSubmit.json();
    assert(submitData.success === true, "Submit success should be true");
    assert(submitData.assessmentType === "QUICK_MOCK", "Assessment type mismatch");
    assert(submitData.correct === 10, "Correct count mismatch (should be 10)");
    assert(submitData.wrong === 3, "Wrong count mismatch (should be 3)");
    assert(submitData.skipped === 3, "Skipped count mismatch (should be 3)");
    assert(submitData.accuracy === 76.92, "Accuracy mismatch (should be 76.92%)");
    assert(Array.isArray(submitData.results), "Results must be an array");

    // Verify results detail contains correct answer keys and explanations
    submitData.results.forEach((r, idx) => {
      const originalQuestion = canonicalQuestions.find(q => q.id === r.id);
      assert(originalQuestion !== undefined, "Result question ID does not match input question");
      assert(r.correctAnswer === originalQuestion.correct, "Correct answer key mismatch in results review");
      assert(r.explanation === originalQuestion.explanation, "Explanation text mismatch in results review");
      
      if (idx < 10) {
        assert(r.isCorrect === true, `Question ${idx} should be marked correct`);
        assert(r.isSkipped === false, `Question ${idx} should not be marked skipped`);
      } else if (idx < 13) {
        assert(r.isCorrect === false, `Question ${idx} should be marked incorrect`);
        assert(r.isSkipped === false, `Question ${idx} should not be marked skipped`);
      } else {
        assert(r.isCorrect === false, `Question ${idx} should be marked incorrect`);
        assert(r.isSkipped === true, `Question ${idx} should be marked skipped`);
      }
    });

    console.log("-> Pass (Test 4)");

    // 6. Test Zero Database Writes Verification (Supabase isolation check)
    console.log("Test 5: Asserting ZERO database writes occurred...");
    
    // Check results for our specific test user
    const [userResults, userAttempts] = await Promise.all([
      supabase.from("mock_results").select("id").eq("user_id", TEST_USER_ID),
      supabase.from("mock_question_attempts").select("id").eq("user_id", TEST_USER_ID)
    ]);
    assert((userResults.data || []).length === 0, "Test user mock_results rows should be 0");
    assert((userAttempts.data || []).length === 0, "Test user mock_question_attempts rows should be 0");

    // Check global database tables size changes
    const [finalResults, finalAttempts] = await Promise.all([
      supabase.from("mock_results").select("id"),
      supabase.from("mock_question_attempts").select("id")
    ]);
    const finalGlobalResultsCount = (finalResults.data || []).length;
    const finalGlobalAttemptsCount = (finalAttempts.data || []).length;

    assert(finalGlobalResultsCount === initialGlobalResultsCount, `Global mock_results count changed from ${initialGlobalResultsCount} to ${finalGlobalResultsCount}`);
    assert(finalGlobalAttemptsCount === initialGlobalAttemptsCount, `Global mock_question_attempts count changed from ${initialGlobalAttemptsCount} to ${finalGlobalAttemptsCount}`);

    console.log("-> Pass (Test 5)");

    console.log("\nAll Quick Mock Integration Tests passed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("Test suite failed:", error.message || error);
    process.exit(1);
  }
}

runSuite();
