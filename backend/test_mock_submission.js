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

// Test identity
const TEST_USER_ID = "2c1dab78-afb2-450e-ad16-4eefd2fe64e6";
const TEST_TOKEN = jwt.sign(
  { id: TEST_USER_ID, email: "test@example.com", plan: "PRO" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function makePayload({ submissionId, correct = 41, skipped = 2, invalidOrder = false } = {}) {
  const answers = [];
  let correctCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < 60; i++) {
    const isSkipped = skippedCount < skipped && i < skipped;
    const isCorrect = !isSkipped && correctCount < correct;

    let selectedAnswer;
    if (isSkipped) {
      selectedAnswer = -1;
      skippedCount++;
    } else if (isCorrect) {
      selectedAnswer = 1;
      correctCount++;
    } else {
      selectedAnswer = 2; // incorrect
    }

    answers.push({
      questionId: `mock_q_${i}`,
      chapterId: `ch_${i % 4}`,
      topicId: `tp_${i % 10}`,
      subject: i % 4 === 0 ? "Physics" : i % 4 === 1 ? "Chemistry" : i % 4 === 2 ? "Mathematics" : "Biology",
      difficulty: i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard",
      selectedAnswer,
      correctAnswer: 1,
      timeTakenSeconds: 100,
      estimatedTimeSeconds: 120,
      questionOrder: (invalidOrder && i === 0) ? 9999999999 : (i + 1)
    });
  }

  return {
    submissionId: submissionId || uuid(),
    mockId: "iat_mock_1",
    mockTitle: "IISER IAT Mock #1",
    startedAt: "2026-07-09T08:00:00Z",
    completedAt: "2026-07-09T08:05:00Z",
    answers
  };
}

async function runTests() {
  console.log("\n════════════════════════════════════════════════════════");
  console.log(" Mock Submission Backend Foundation Test Suite");
  console.log("════════════════════════════════════════════════════════\n");

  let passed = 0;
  let failed = 0;
  const createdMockIds = [];

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  async function cleanup() {
    if (createdMockIds.length > 0) {
      console.log(`\n  [Cleanup] Removing ${createdMockIds.length} test records...`);
      await supabase.from("mock_question_attempts").delete().in("mock_result_id", createdMockIds);
      await supabase.from("mock_results").delete().in("id", createdMockIds);
    }
  }

  try {
    // 1. Auth check
    await test("Unauthorized request returns 401", async () => {
      const payload = makePayload();
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.status !== 401) {
        throw new Error(`Expected 401, got ${res.status}`);
      }
    });

    // 2. Validation check: Missing mockId
    await test("Validation: Missing mockId returns 400", async () => {
      const payload = makePayload();
      delete payload.mockId;
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });
      if (res.status !== 400) {
        throw new Error(`Expected 400, got ${res.status}`);
      }
      const body = await res.json();
      if (!body.error || !body.error.includes("mockId")) {
        throw new Error(`Expected error message about mockId, got ${JSON.stringify(body)}`);
      }
    });

    // 3. Validation check: Invalid question count
    await test("Validation: Question count not 60 returns 400", async () => {
      const payload = makePayload();
      payload.answers.pop(); // Make it 59
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });
      if (res.status !== 400) {
        throw new Error(`Expected 400, got ${res.status}`);
      }
      const body = await res.json();
      if (!body.error || !body.error.includes("exactly 60")) {
        throw new Error(`Expected error message about question count, got ${JSON.stringify(body)}`);
      }
    });

    // 4. Validation check: Duplicate questionId
    await test("Validation: Duplicate questionId returns 400", async () => {
      const payload = makePayload();
      payload.answers[1].questionId = payload.answers[0].questionId; // Duplicate ID
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });
      if (res.status !== 400) {
        throw new Error(`Expected 400, got ${res.status}`);
      }
      const body = await res.json();
      if (!body.error || !body.error.includes("Duplicate questionId")) {
        throw new Error(`Expected error message about duplicate questionId, got ${JSON.stringify(body)}`);
      }
    });

    // 5. Successful submission check
    const testSubmissionId = uuid();
    await test("Successful submission inserts records & calculates stats", async () => {
      const payload = makePayload({ submissionId: testSubmissionId, correct: 41, skipped: 2 });
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status !== 200) {
        const errText = await res.text();
        throw new Error(`Expected 200, got ${res.status}: ${errText}`);
      }

      const body = await res.json();
      createdMockIds.push(testSubmissionId);

      // Verify response payload
      if (!body.success) throw new Error("success should be true");
      if (body.mockResultId !== testSubmissionId) throw new Error(`Incorrect mockResultId: ${body.mockResultId}`);
      if (body.score !== 41) throw new Error(`Expected score 41, got ${body.score}`);
      if (body.totalQuestions !== 60) throw new Error(`Expected totalQuestions 60, got ${body.totalQuestions}`);
      if (body.accuracy !== 70.7) throw new Error(`Expected accuracy 70.7, got ${body.accuracy}`);
      if (body.correct !== 41) throw new Error(`Expected correct 41, got ${body.correct}`);
      if (body.wrong !== 17) throw new Error(`Expected wrong 17, got ${body.wrong}`);
      if (body.skipped !== 2) throw new Error(`Expected skipped 2, got ${body.skipped}`);
      if (body.totalTimeSeconds !== 6000) throw new Error(`Expected totalTimeSeconds 6000, got ${body.totalTimeSeconds}`);
      
      // answered = 58. average = 6000 / 58 = 103.44 -> 103
      if (body.averageTimeSeconds !== 103) throw new Error(`Expected averageTimeSeconds 103, got ${body.averageTimeSeconds}`);

      // Verify DB persistence of parent
      const { data: parentRow, error: parentErr } = await supabase
        .from("mock_results")
        .select("*")
        .eq("id", testSubmissionId)
        .single();
      
      if (parentErr) throw parentErr;
      if (!parentRow) throw new Error("Parent row not found in mock_results");
      if (parentRow.score !== 41) throw new Error(`DB score expected 41, got ${parentRow.score}`);
      if (parentRow.total_questions !== 60) throw new Error(`DB total_questions expected 60, got ${parentRow.total_questions}`);
      if (parentRow.correct !== 41) throw new Error(`DB correct expected 41, got ${parentRow.correct}`);
      if (parentRow.wrong !== 17) throw new Error(`DB wrong expected 17, got ${parentRow.wrong}`);
      if (parentRow.skipped !== 2) throw new Error(`DB skipped expected 2, got ${parentRow.skipped}`);

      // Verify DB persistence of children
      const { data: childRows, error: childErr } = await supabase
        .from("mock_question_attempts")
        .select("*")
        .eq("mock_result_id", testSubmissionId);

      if (childErr) throw childErr;
      if (childRows.length !== 60) throw new Error(`Expected 60 child rows, got ${childRows.length}`);
      
      const firstChild = childRows.find(c => c.question_id === "mock_q_0");
      if (!firstChild) throw new Error("First child row not found by question_id");
      if (firstChild.selected_answer !== null) throw new Error("Expected first child selected_answer to be null (skipped = -1)");
      if (firstChild.is_correct !== false) throw new Error("Expected first child is_correct to be false");
      
      const activeChild = childRows.find(c => c.question_id === "mock_q_2");
      if (!activeChild) throw new Error("Active child row not found");
      if (activeChild.selected_answer !== 1) throw new Error(`Expected selected_answer 1, got ${activeChild.selected_answer}`);
      if (activeChild.is_correct !== true) throw new Error("Expected active child is_correct to be true");
    });

    // 6. Idempotency for duplicate submissionId
    await test("Duplicate submissionId is idempotent and returns previous response", async () => {
      // Re-submit the same testSubmissionId
      const payload = makePayload({ submissionId: testSubmissionId, correct: 10, skipped: 10 }); // Diff stats in body
      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status !== 200) {
        throw new Error(`Expected 200, got ${res.status}`);
      }

      const body = await res.json();
      // Should return the original calculated stats from database (41 correct)
      if (body.score !== 41) {
        throw new Error(`Expected idempotent original score of 41, got ${body.score}`);
      }
      if (body.accuracy !== 70.7) {
        throw new Error(`Expected idempotent original accuracy of 70.7, got ${body.accuracy}`);
      }
    });

    // 7. Transaction Rollback Check
    await test("Transaction Rollback: Child insert failure deletes parent mock_results", async () => {
      const rollbackSubmissionId = uuid();
      const payload = makePayload({ submissionId: rollbackSubmissionId, invalidOrder: true });

      const res = await fetch(`${API_URL}/api/mock/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      // Child insertion should fail because of integer overflow on questionOrder
      if (res.status !== 500) {
        throw new Error(`Expected 500, got ${res.status}`);
      }

      // Check if parent record was cleaned up
      const { data: parentRow, error: parentErr } = await supabase
        .from("mock_results")
        .select("*")
        .eq("id", rollbackSubmissionId)
        .maybeSingle();

      if (parentErr) throw parentErr;
      if (parentRow) {
        // If parent exists, rollback failed
        createdMockIds.push(rollbackSubmissionId); // add to cleanup list
        throw new Error("Parent record was not cleaned up after child insertion failure");
      }
    });

  } finally {
    await cleanup();
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log(` Results: ${passed}/${passed + failed} passed  |  ${failed} failed`);
  console.log("════════════════════════════════════════════════════════\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Give server a moment to be ready if just restarted
setTimeout(runTests, 500);
