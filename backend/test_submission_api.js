const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

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

function makeValidPayload(submissionId) {
  const questions = [];
  for (let i = 0; i < 18; i++) {
    questions.push({
      question_id: `test_ch-q${i}`,
      topic_id: `topic-${i % 3}`,
      difficulty: i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard",
      selectedOption: i % 4 === 3 ? null : i % 3, // Null represents unanswered
      correctAnswerIndex: i % 3,
      time_taken_seconds: 10 + i,
      estimated_time_seconds: 90,
      question_order: i
    });
  }
  return {
    submission_id: submissionId || uuidv4(),
    chapter_id: "test_units",
    subject: "Physics",
    started_at: "2026-07-09T08:00:00Z",
    completed_at: "2026-07-09T08:05:00Z",
    questions
  };
}

async function runTests() {
  console.log("=== SLS Step 3 Submission API Verification Suite ===");
  let failed = 0;
  let passed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // Test 1: Unauthenticated requests are rejected
  await assertTest("Unauthenticated Request Rejected (401)", async () => {
    const payload = makeValidPayload();
    const res = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`);
    }
  });

  // Test 2: Valid submission succeeds & derives correct aggregates
  await assertTest("Valid Submission Succeeds & Computes Aggregates", async () => {
    const subId = uuidv4();
    const payload = makeValidPayload(subId);
    
    // We expect:
    // - 18 total questions
    // - selectedOption === correctAnswerIndex for questions where they match (questions 0,1,2, 4,5,8,9,10,12,13,14,16,17).
    // Let's count them:
    // Question i satisfies correctAnswerIndex = i % 3.
    // selectedOption = i % 4 === 3 ? null : i % 3.
    // If selectedOption !== null, selectedOption is always equal to correctAnswerIndex!
    // So all non-skipped questions are correct!
    // Skipped indices (where i % 4 === 3): 3, 7, 11, 15 (4 questions).
    // Total correct: 18 - 4 = 14 questions.
    // Total unanswered: 4 questions.
    // Total wrong: 0 questions.
    // Total time: sum of 10+i for i in 0..17 => 18*10 + (0+1+..+17) => 180 + 153 = 333 seconds.
    // Average time: 333 / 18 = 18.5 seconds.
    // Accuracy: (14 / 18) * 100 = 77.78%.

    const res = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    
    if (res.status !== 200) {
      const data = await res.json();
      throw new Error(`Expected 200, got ${res.status} - ${JSON.stringify(data)}`);
    }

    const { attempt_id } = await res.json();
    if (!attempt_id) throw new Error("Missing attempt_id in response");

    // Fetch parent attempt from DB to verify aggregates
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${attempt_id}`, { headers: dbHeaders });
    const records = await getRes.json();
    if (records.length === 0) throw new Error("Attempt not found in database");
    const r = records[0];

    if (r.total_questions !== 18) throw new Error(`Expected total_questions = 18, got ${r.total_questions}`);
    if (r.correct_answers !== 14) throw new Error(`Expected correct_answers = 14, got ${r.correct_answers}`);
    if (r.unanswered_answers !== 4) throw new Error(`Expected unanswered_answers = 4, got ${r.unanswered_answers}`);
    if (r.wrong_answers !== 0) throw new Error(`Expected wrong_answers = 0, got ${r.wrong_answers}`);
    if (r.total_time_seconds !== 333) throw new Error(`Expected total_time_seconds = 333, got ${r.total_time_seconds}`);
    if (Math.abs(r.accuracy - 77.78) > 0.01) throw new Error(`Expected accuracy = 77.78, got ${r.accuracy}`);
    if (Math.abs(r.average_time_seconds - 18.5) > 0.01) throw new Error(`Expected average_time = 18.5, got ${r.average_time_seconds}`);

    // Verify child records
    const childRes = await fetch(`${SUPABASE_URL}/rest/v1/question_attempts?quiz_attempt_id=eq.${attempt_id}`, { headers: dbHeaders });
    const children = await childRes.json();
    if (children.length !== 18) throw new Error(`Expected 18 question_attempts, got ${children.length}`);
    
    // Check an unanswered child
    const skippedChild = children.find(c => c.question_order === 3);
    if (skippedChild.selected_answer !== null) throw new Error("Expected selected_answer = null for skipped question");
    if (skippedChild.is_correct !== false) throw new Error("Expected is_correct = false for skipped question");

    // Clean up
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${attempt_id}`, { method: "DELETE", headers: dbHeaders });
  });

  // Test 3: Idempotency deduplication
  await assertTest("Database Idempotency Deduplication", async () => {
    const subId = uuidv4();
    const payload = makeValidPayload(subId);

    // Send first request
    const res1 = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    const data1 = await res1.json();
    const attempt1 = data1.attempt_id;

    // Send second identical request
    const res2 = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    const data2 = await res2.json();
    const attempt2 = data2.attempt_id;

    if (attempt1 !== attempt2) {
      throw new Error(`Expected identical attempt_id, got ${attempt1} and ${attempt2}`);
    }
    if (data2.duplicate !== true) {
      throw new Error("Expected duplicate: true in second response");
    }

    // Clean up
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${attempt1}`, { method: "DELETE", headers: dbHeaders });
  });

  // Test 4: Validation failures
  async function assertValidationFail(name, modifier) {
    await assertTest(name, async () => {
      const payload = makeValidPayload();
      modifier(payload);
      const res = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payload)
      });
      if (res.status !== 400) {
        throw new Error(`Expected 400, got ${res.status}`);
      }
    });
  }

  await assertValidationFail("Reject completed_at earlier than started_at", p => {
    p.completed_at = "2026-07-09T07:59:00Z";
  });

  await assertValidationFail("Reject null correctAnswerIndex", p => {
    p.questions[5].correctAnswerIndex = null;
  });

  await assertValidationFail("Reject invalid difficulty option", p => {
    p.questions[2].difficulty = "easy-peasy";
  });

  await assertValidationFail("Reject duplicate question IDs", p => {
    p.questions[1].question_id = p.questions[0].question_id;
  });

  await assertValidationFail("Reject duplicate question orders", p => {
    p.questions[1].question_order = p.questions[0].question_order;
  });

  await assertValidationFail("Reject null estimated_time_seconds", p => {
    p.questions[3].estimated_time_seconds = null;
  });

  await assertValidationFail("Reject negative estimated_time_seconds", p => {
    p.questions[3].estimated_time_seconds = -10;
  });

  // Test 5: Rollback Success on child insert error
  await assertTest("Rollback Succeeded on Child Insert Failure", async () => {
    const subId = uuidv4();
    const payload = makeValidPayload(subId);

    // Send request with simulation header for child failure
    const res = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: {
        ...authHeaders,
        "x-test-simulate-child-fail": "true"
      },
      body: JSON.stringify(payload)
    });

    if (res.status !== 500) {
      throw new Error(`Expected 500, got ${res.status}`);
    }

    // Query DB to verify parent is NOT present
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?user_id=eq.${TEST_USER_ID}&submission_id=eq.${subId}`, { headers: dbHeaders });
    const records = await getRes.json();
    if (records.length !== 0) {
      // Clean up manually if failed
      await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${records[0].id}`, { method: "DELETE", headers: dbHeaders });
      throw new Error("Orphan parent record was left in the database!");
    }
  });

  // Test 6: Rollback Failure logging
  await assertTest("Rollback Failure Handling", async () => {
    const subId = uuidv4();
    const payload = makeValidPayload(subId);

    // Send request with both child failure and rollback failure headers
    const res = await fetch(`${API_URL}/api/chapter-quiz/submit`, {
      method: "POST",
      headers: {
        ...authHeaders,
        "x-test-simulate-child-fail": "true",
        "x-test-simulate-rollback-fail": "true"
      },
      body: JSON.stringify(payload)
    });

    if (res.status !== 500) {
      throw new Error(`Expected 500, got ${res.status}`);
    }

    // Verify parent is left in database (since deletion failed)
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?user_id=eq.${TEST_USER_ID}&submission_id=eq.${subId}`, { headers: dbHeaders });
    const records = await getRes.json();
    if (records.length === 0) {
      throw new Error("Parent record was deleted despite rollback failure simulation!");
    }

    console.log("  [INFO] Orphan parent ID left in DB for verification:", records[0].id);

    // Clean up parent record manually
    await fetch(`${SUPABASE_URL}/rest/v1/chapter_quiz_attempts?id=eq.${records[0].id}`, { method: "DELETE", headers: dbHeaders });
  });

  console.log(`\n=== Verification Results: Passed: ${passed} | Failed: ${failed} ===`);
  process.exit(failed > 0 ? 1 : 0);
}

// Start test runner after a short timeout in case server is not listening
setTimeout(runTests, 1000);
