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

// Clean unique test identities
const NEW_USER_ID = "33333333-3333-3333-3333-333333333333";
const NEW_TOKEN = jwt.sign(
  { id: NEW_USER_ID, email: "new_pyq@example.com", plan: "PRO" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

const EXIST_USER_ID = "44444444-4444-4444-4444-444444444444";
const EXIST_TOKEN = jwt.sign(
  { id: EXIST_USER_ID, email: "exist_pyq@example.com", plan: "PRO" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

async function runSuite() {
  console.log("=== Running PYQ Practice Engine & Closed-Loop Integration Tests ===\n");
  
  try {
    // 0. Set up test users in public.users if they do not exist
    await supabase.from("users").upsert([
      { id: NEW_USER_ID, email: "new_pyq@example.com", name: "New User" },
      { id: EXIST_USER_ID, email: "exist_pyq@example.com", name: "Existing User" }
    ]);

    // Clean up any historical attempts left over for these test users
    await supabase.from("mock_question_attempts").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("mock_results").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("mock_question_attempts").delete().eq("user_id", EXIST_USER_ID);
    await supabase.from("mock_results").delete().eq("user_id", EXIST_USER_ID);

    // 1. BRAND-NEW USER EMPTY STATES
    console.log("Test 1: Brand-new user summary empty states...");
    const resSummary = await fetch(`${API_URL}/api/student/pyq-summary`, {
      headers: { "Authorization": `Bearer ${NEW_TOKEN}` }
    });
    assert(resSummary.ok, `Failed to fetch summary: ${resSummary.statusText}`);
    const summaryData = await resSummary.json();
    assert(summaryData.success === true, "Summary request failed");
    assert(summaryData.summary.questionsSolved === 0, "Brand-new user should have 0 solved");
    assert(summaryData.summary.accuracy === "No Evidence", "Brand-new user should have 'No Evidence' accuracy");
    assert(summaryData.summary.yearsAttempted === 0, "Brand-new user should have 0 years attempted");
    assert(summaryData.summary.strongestSubject === "Not Enough Data", "Brand-new user strongest subject should be 'Not Enough Data'");
    assert(summaryData.recentSessions.length === 0, "Recent sessions list should be empty");
    assert(summaryData.highFrequencyTopics && summaryData.highFrequencyTopics.length > 0, "High-frequency topics catalog list should load successfully");
    console.log("-> Pass (Test 1)");

    // 2. AUTHENTICATION PROTECTION
    console.log("Test 2: Endpoint auth protection...");
    const resNoAuth = await fetch(`${API_URL}/api/student/pyq-summary`);
    assert(resNoAuth.status === 401, `Expected 401 status, got ${resNoAuth.status}`);
    const resNoAuthStart = await fetch(`${API_URL}/api/pyq/session/start`, { method: "POST" });
    assert(resNoAuthStart.status === 401, `Expected 401 status for start, got ${resNoAuthStart.status}`);
    console.log("-> Pass (Test 2)");

    // 3. PYQ SESSION CONFIGURATION FILTERS
    console.log("Test 3: Start session generation with filters...");
    // Subject filter
    const resSubj = await fetch(`${API_URL}/api/pyq/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NEW_TOKEN}`
      },
      body: JSON.stringify({
        count: "10",
        exam: "IAT",
        subject: "Biology",
        filter: "all"
      })
    });
    assert(resSubj.ok, `Start session failed: ${resSubj.statusText}`);
    const subjData = await resSubj.json();
    assert(subjData.success === true, "Start session payload unsuccessful");
    assert(subjData.sessionId && subjData.questions.length > 0, "Should generate session and return questions");
    assert(subjData.questions.every(q => q.subject === "Biology"), "All questions must belong to Biology");
    console.log("-> Pass (Test 3)");

    // 4. SECURITY AUDIT: NO ANSWER KEY EXPOSURE
    console.log("Test 4: Correct answer key leak protection...");
    const questionSample = subjData.questions[0];
    assert(questionSample.correct === undefined, "Should not leak correct index");
    assert(questionSample.explanation === undefined, "Should not leak explanation text");
    console.log("-> Pass (Test 4)");

    // 5. INSUFFICIENT MATCHING QUESTIONS HANDLING
    console.log("Test 5: Insufficient matching questions...");
    const resEmpty = await fetch(`${API_URL}/api/pyq/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NEW_TOKEN}`
      },
      body: JSON.stringify({
        count: "250", // Use a very large count to trigger availableCount fallback
        exam: "IAT",
        subject: "Biology",
        filter: "all"
      })
    });
    const emptyData = await resEmpty.json();
    assert(emptyData.questions.length <= emptyData.availableCount, "Should return available count when pool is smaller than requested count");
    console.log("-> Pass (Test 5)");

    // 6. SESSION SUBMISSION & SCORING
    console.log("Test 6: Session submission and server-side scoring...");
    const submissionId = "e55e55e5-5555-5555-5555-555555555555";
    // Build answers list: 1 correct, 1 wrong
    const sessionQuestions = emptyData.questions;
    // We look up the real answers from backend/data/pyqQuestions.json for verification
    const pyqCatalog = require("./data/pyqQuestions.json");
    const q1 = pyqCatalog.find(q => q.id === sessionQuestions[0].id);
    const q2 = pyqCatalog.find(q => q.id === sessionQuestions[1].id);

    const submitRes = await fetch(`${API_URL}/api/pyq/session/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NEW_TOKEN}`
      },
      body: JSON.stringify({
        submissionId,
        mockId: "pyq_chap_bio_cell",
        mockTitle: "Cell PYQ Session",
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        answers: [
          { questionId: q1.id, selectedAnswer: q1.correct, timeTakenSeconds: 30 }, // correct
          { questionId: q2.id, selectedAnswer: (q2.correct + 1) % 4, timeTakenSeconds: 20 } // wrong
        ]
      })
    });
    assert(submitRes.ok, `Submit failed: ${submitRes.statusText}`);
    const submitData = await submitRes.json();
    assert(submitData.success === true, "Submit payload failed");
    assert(submitData.score === 1, `Expected score 1, got ${submitData.score}`);
    assert(submitData.correct === 1, `Expected 1 correct, got ${submitData.correct}`);
    assert(submitData.wrong === 1, `Expected 1 wrong, got ${submitData.wrong}`);
    assert(submitData.skipped === 0, `Expected 0 skipped, got ${submitData.skipped}`);
    assert(submitData.accuracy === 50, `Expected 50% accuracy, got ${submitData.accuracy}`);
    console.log("-> Pass (Test 6)");

    // 7. DUPLICATE SUBMISSION & IDEMPOTENCY
    console.log("Test 7: Idempotency protections...");
    const resDuplicateSubmit = await fetch(`${API_URL}/api/pyq/session/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NEW_TOKEN}`
      },
      body: JSON.stringify({
        submissionId,
        mockId: "pyq_chap_bio_cell",
        mockTitle: "Cell PYQ Session",
        answers: [
          { questionId: q1.id, selectedAnswer: q1.correct, timeTakenSeconds: 30 },
          { questionId: q2.id, selectedAnswer: (q2.correct + 1) % 4, timeTakenSeconds: 20 }
        ]
      })
    });
    const dupData = await resDuplicateSubmit.json();
    assert(dupData.success === true, "Idempotency request failed");
    assert(dupData.mockResultId === submissionId, "Should return existing submission ID");
    console.log("-> Pass (Test 7)");

    // 7b. ATTEMPTS ENRICHMENT VERIFICATION (PYQResults compatibility)
    console.log("Test 7b: Mock attempts details enrichment validation...");
    const resDetails = await fetch(`${API_URL}/api/mock/attempts/${submissionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${NEW_TOKEN}`
      }
    });
    assert(resDetails.ok, `Fetch details failed: ${resDetails.statusText}`);
    const detailsData = await resDetails.json();
    assert(detailsData.success === true, "Enriched mock details fetch failed");
    assert(detailsData.mockResult && detailsData.selectedAnswers && detailsData.questionTimes, "Legacy properties missing");
    assert(detailsData.parent && Array.isArray(detailsData.attempts), "New parent/attempts properties missing");
    assert(detailsData.parent.total_questions === 2, `Expected parent.total_questions 2, got ${detailsData.parent.total_questions}`);
    assert(detailsData.attempts.length === 2, `Expected attempts.length 2, got ${detailsData.attempts.length}`);
    const firstAttempt = detailsData.attempts[0];
    assert(typeof firstAttempt.question === "string" && firstAttempt.question.length > 0, "Attempt question text was not enriched");
    assert(Array.isArray(firstAttempt.options) && firstAttempt.options.length > 0, "Attempt options array was not enriched");
    assert(typeof firstAttempt.correct_answer === "number", "Attempt correct answer was not enriched");
    console.log("-> Pass (Test 7b)");

    // 8. UNATTEMPTED & INCORRECT FILTERS IN START SESSION
    console.log("Test 8: Session generation filters validation (unattempted & incorrect)...");
    // Get unattempted list for IAT Biology (q1 to q5). We completed q1/q2 in NEST cell, let's see for IAT.
    // Let's draw an unattempted session for IAT Biology
    const resUnattempted = await fetch(`${API_URL}/api/pyq/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NEW_TOKEN}`
      },
      body: JSON.stringify({
        count: "10",
        exam: "IAT",
        subject: "Biology",
        filter: "unattempted"
      })
    });
    const unattData = await resUnattempted.json();
    // Since NEW_USER has not attempted any IAT Biology questions, all should be returned
    assert(unattData.questions.length > 0, "Should return unattempted questions");
    console.log("-> Pass (Test 8)");

    // 9. DYNAMIC DYNAMIC DATA SUMMARY VERIFICATION
    console.log("Test 9: Live student dynamic stats summary update...");
    const resUpdatedSummary = await fetch(`${API_URL}/api/student/pyq-summary`, {
      headers: { "Authorization": `Bearer ${NEW_TOKEN}` }
    });
    const updatedSummary = await resUpdatedSummary.json();
    assert(updatedSummary.summary.questionsSolved === 2, `Expected 2 solved, got ${updatedSummary.summary.questionsSolved}`);
    assert(updatedSummary.summary.accuracy === "50%", `Expected 50% accuracy, got ${updatedSummary.summary.accuracy}`);
    assert(updatedSummary.summary.yearsAttempted >= 1, `Expected at least 1 year attempted, got ${updatedSummary.summary.yearsAttempted}`);
    assert(updatedSummary.recentSessions.length === 1, `Expected 1 recent session, got ${updatedSummary.recentSessions.length}`);
    console.log("-> Pass (Test 9)");

    // 10. REAL INTELLIGENCE CLOSED-LOOP ACTION plan INTEGRATION
    console.log("Test 10: Closed-loop evidence integration with SLS Action Plan...");
    const resActionPlan = await fetch(`${API_URL}/api/student/action-plan`, {
      headers: { "Authorization": `Bearer ${NEW_TOKEN}` }
    });
    assert(resActionPlan.ok, `Action plan retrieval failed: ${resActionPlan.statusText}`);
    const actionPlanData = await resActionPlan.json();
    assert(actionPlanData.success === true, "Action plan payload failed");
    // Action Plan should successfully execute with simulated quiz attempts merged in-memory
    console.log("-> Pass (Test 10)");

    // 11. REGRESSION SAFEGUARDS FOR DASHBOARD SUMMARY
    console.log("Test 11: Real mock test stats dashboard summary safety...");
    const resDash = await fetch(`${API_URL}/api/dashboard-summary`, {
      headers: { "Authorization": `Bearer ${NEW_TOKEN}` }
    });
    assert(resDash.ok, `Dashboard summary failed: ${resDash.statusText}`);
    const dashData = await resDash.json();
    assert(dashData.total_attempts === 0, "PYQ sessions must NOT contaminate mock tests total attempts count");
    console.log("-> Pass (Test 11)");

    console.log("\nAll PYQ practice engine automated tests PASSED successfully! 🎉");
    
    // Clean up
    await supabase.from("mock_question_attempts").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("mock_results").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("users").delete().eq("id", NEW_USER_ID);
    await supabase.from("users").delete().eq("id", EXIST_USER_ID);
    process.exit(0);

  } catch (err) {
    console.error("\n[FAIL] Test suite crashed with error:");
    console.error(err);
    
    // Clean up
    await supabase.from("mock_question_attempts").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("mock_results").delete().eq("user_id", NEW_USER_ID);
    await supabase.from("users").delete().eq("id", NEW_USER_ID);
    await supabase.from("users").delete().eq("id", EXIST_USER_ID);
    process.exit(1);
  }
}

runSuite();
