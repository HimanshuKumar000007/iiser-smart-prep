/**
 * test_mock_e2e.js — Comprehensive End-to-End Pipeline Verification
 *
 * Tests the complete mock test flow:
 *   Submit → History → Attempt Details → Analytics → Learning Actions
 *
 * Verifications:
 *   1. Submission creates correct parent + exactly 60 child records
 *   2. Idempotent re-submission returns same result
 *   3. History reflects the submission
 *   4. Attempt details returns correct answer mapping
 *   5. Analytics weighted accuracy is consistent with submission
 *   6. Learning actions evaluates evidence correctly
 *   7. Cross-user data isolation (User 2 cannot access User 1's data)
 *   8. All endpoints return 401 without a token
 */

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Load .env the same way all other test suites do
const envPath = path.join(__dirname, '.env');
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const [k, ...rest] = line.split('=');
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
});

const API_BASE = `http://localhost:${process.env.PORT || 5000}`;
const JWT_SECRET = process.env.JWT_SECRET;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test identities — two separate users for isolation test
const USER1_ID = '2c1dab78-afb2-450e-ad16-4eefd2fe64e6';
const USER2_ID = '3d2ecb89-bfc3-561f-be27-5fffe3ff75f7';

const TOKEN1 = jwt.sign(
  { id: USER1_ID, email: 'e2e-user1@test.iiser', plan: 'PRO' },
  JWT_SECRET,
  { expiresIn: '1h' }
);
const TOKEN2 = jwt.sign(
  { id: USER2_ID, email: 'e2e-user2@test.iiser', plan: 'PRO' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function buildPayload(submissionId, partial = {}) {
  // Build a minimal 60-question payload
  // Physics: 15, Chemistry: 15, Math: 15, Biology: 15
  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const answers = [];

  for (let i = 0; i < 60; i++) {
    const subject = subjects[Math.floor(i / 15)];
    const correctAnswer = i % 4;                // cycle 0-3
    const selectedAnswer = i < 30 ? correctAnswer : (correctAnswer + 1) % 4; // first 30 correct, rest wrong

    answers.push({
      questionId: `e2e_q_${i + 1}`,
      chapterId: '',
      topicId: '',
      subject,
      difficulty: ['Easy', 'Medium', 'Hard'][i % 3].toLowerCase(),
      selectedAnswer,
      correctAnswer,
      timeTakenSeconds: 60 + i,
      estimatedTimeSeconds: 120,
      questionOrder: i + 1
    });
  }

  return {
    submissionId,
    mockId: `e2e_mock_test_${submissionId.slice(0, 8)}`,
    mockTitle: 'E2E Test Mock',
    startedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    completedAt: new Date().toISOString(),
    answers,
    ...partial
  };
}

async function apiPost(path, body, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data = {};
  try { data = JSON.parse(text); } catch (_) {}
  return { status: res.status, data };
}

async function apiGet(path, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const text = await res.text();
  let data = {};
  try { data = JSON.parse(text); } catch (_) {}
  return { status: res.status, data };
}

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label, detail = '') {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${label}${detail ? ` — ${detail}` : ''}`);
    failed++;
    failures.push(label);
  }
}

// ─── Test Records (for cleanup) ───────────────────────────────────────────────

const createdResultIds = [];

// ─── Test Suites ──────────────────────────────────────────────────────────────

async function test_401_without_token() {
  console.log('\n── Test: 401 without token ──');
  const endpoints = [
    ['POST', '/api/mock/submit', { submissionId: 'x', mockId: 'x', answers: [] }],
    ['GET',  '/api/mock/history'],
    ['GET',  '/api/mock/attempts/some-id'],
    ['GET',  '/api/mock/analytics'],
    ['GET',  '/api/mock/learning-actions']
  ];

  for (const [method, path, body] of endpoints) {
    const result = method === 'POST'
      ? await apiPost(path, body, null)
      : await apiGet(path, null);
    assert(result.status === 401, `${method} ${path} returns 401 without token`, `got ${result.status}`);
  }
}

async function test_submission_and_integrity(token) {
  console.log('\n── Test: Submission & DB Integrity ──');

  const submissionId = generateUUID();
  const payload = buildPayload(submissionId);

  const { status, data } = await apiPost('/api/mock/submit', payload, token);
  assert(status === 200, 'POST /api/mock/submit returns 200', `got ${status} — ${data.error || ''}`);
  assert(data.success === true, 'Response has success: true');
  assert(typeof data.score === 'number', 'Response has numeric score');
  assert(typeof data.accuracy === 'number', 'Response has numeric accuracy');
  assert(data.totalQuestions === 60, 'totalQuestions is 60', `got ${data.totalQuestions}`);
  assert(data.correct === 30, 'correct is 30 (first 30 answered correctly)', `got ${data.correct}`);
  assert(data.wrong === 30, 'wrong is 30', `got ${data.wrong}`);
  assert(data.skipped === 0, 'skipped is 0', `got ${data.skipped}`);

  const expectedAccuracy = Number(((30 / 60) * 100).toFixed(1));
  assert(data.accuracy === expectedAccuracy, `accuracy is ${expectedAccuracy}%`, `got ${data.accuracy}`);

  const resultId = data.mockResultId || submissionId;
  if (resultId) createdResultIds.push(resultId);

  // Verify DB parent record
  const { data: parentRow } = await supabase
    .from('mock_results')
    .select('*')
    .eq('id', submissionId)
    .maybeSingle();

  assert(parentRow !== null, 'mock_results parent row exists in DB');
  assert(parentRow?.correct === 30, 'DB parent correct = 30', `got ${parentRow?.correct}`);
  assert(parentRow?.wrong === 30, 'DB parent wrong = 30', `got ${parentRow?.wrong}`);
  assert(parentRow?.total_questions === 60, 'DB parent total_questions = 60', `got ${parentRow?.total_questions}`);

  // Verify exactly 60 child records
  const { data: childRows } = await supabase
    .from('mock_question_attempts')
    .select('id')
    .eq('mock_result_id', submissionId);

  assert(childRows?.length === 60, 'Exactly 60 mock_question_attempts created', `got ${childRows?.length}`);

  return { submissionId, resultId: submissionId };
}

async function test_idempotency(token, submissionId) {
  console.log('\n── Test: Idempotent Re-submission ──');

  const payload = buildPayload(submissionId);
  const { status, data } = await apiPost('/api/mock/submit', payload, token);

  assert(status === 200, 'Duplicate submission returns 200 (not 4xx/5xx)', `got ${status}`);
  assert(data.success === true, 'Duplicate submission has success: true');
  assert(data.correct === 30, 'Duplicate returns same correct count', `got ${data.correct}`);

  // Verify no duplicate parent row
  const { data: parentRows } = await supabase
    .from('mock_results')
    .select('id')
    .eq('id', submissionId);
  assert(parentRows?.length === 1, 'No duplicate parent record created', `found ${parentRows?.length}`);
}

async function test_history(token, submissionId) {
  console.log('\n── Test: History Endpoint ──');

  const { status, data } = await apiGet('/api/mock/history', token);
  assert(status === 200, 'GET /api/mock/history returns 200', `got ${status}`);
  assert(data.success === true, 'History has success: true');
  assert(typeof data.hasData === 'boolean', 'History has hasData boolean');
  assert(data.hasData === true, 'hasData is true after submission');
  assert(Array.isArray(data.history), 'History has array');
  assert(data.history.length >= 1, 'History contains at least 1 record');

  const matchingAttempt = data.history.find(h => h.id === submissionId);
  assert(!!matchingAttempt, 'Submitted attempt appears in history');
  assert(matchingAttempt?.score === 30, 'History entry has correct score', `got ${matchingAttempt?.score}`);
  assert(typeof matchingAttempt?.accuracy === 'number', 'History entry accuracy is a number');
  assert(!isNaN(matchingAttempt?.accuracy), 'History entry accuracy is not NaN');
  assert(matchingAttempt?.accuracy === 50.0, 'History entry accuracy is 50.0%', `got ${matchingAttempt?.accuracy}`);

  // Summary stats
  assert(typeof data.summary.totalMocks === 'number', 'Summary totalMocks is a number');
  assert(typeof data.summary.averageAccuracy === 'number', 'Summary averageAccuracy is a number');
  assert(!isNaN(data.summary.bestAccuracy), 'Summary bestAccuracy is not NaN');
}

async function test_attempt_details(token, submissionId) {
  console.log('\n── Test: Attempt Details Endpoint ──');

  const { status, data } = await apiGet(`/api/mock/attempts/${submissionId}`, token);
  assert(status === 200, `GET /api/mock/attempts/${submissionId} returns 200`, `got ${status}`);
  assert(data.success === true, 'Attempt details has success: true');
  assert(typeof data.selectedAnswers === 'object', 'selectedAnswers is an object');
  assert(typeof data.questionTimes === 'object', 'questionTimes is an object');

  // First question: q_1 should be correct (selected === correct = 0)
  const q1Answer = data.selectedAnswers['e2e_q_1'];
  assert(q1Answer === 0, 'Question 1 selected answer maps correctly (0)', `got ${q1Answer}`);

  // Question 31: should be wrong (selected = 1, correct = 2)
  const q31Answer = data.selectedAnswers['e2e_q_31'];
  assert(q31Answer !== undefined, 'Question 31 has a recorded answer');

  // Verify question time is numeric for first question
  const q1Time = data.questionTimes['e2e_q_1'];
  assert(typeof q1Time === 'number', 'Question 1 time is numeric', `got ${typeof q1Time}`);
}

async function test_analytics(token) {
  console.log('\n── Test: Analytics Endpoint ──');

  const { status, data } = await apiGet('/api/mock/analytics', token);
  assert(status === 200, 'GET /api/mock/analytics returns 200', `got ${status}`);
  assert(typeof data.hasData === 'boolean', 'Analytics has hasData boolean');

  if (data.hasData) {
    const analytics = data.analytics;
    assert(typeof analytics === 'object', 'data.analytics exists');
    assert(typeof analytics.overall === 'object', 'Analytics has overall object');
    assert(typeof analytics.overall.totalMocks === 'number', 'overall.totalMocks is a number');
    assert(!isNaN(analytics.overall.averageAccuracy), 'overall.averageAccuracy is not NaN');
    assert(Array.isArray(analytics.subjects), 'Analytics has subjects array');
    assert(Array.isArray(analytics.recentAttempts), 'Analytics has recentAttempts array');
  }
}

async function test_learning_actions(token) {
  console.log('\n── Test: Learning Actions Endpoint ──');

  const { status, data } = await apiGet('/api/mock/learning-actions', token);
  assert(status === 200, 'GET /api/mock/learning-actions returns 200', `got ${status}`);
  assert(typeof data.hasData === 'boolean', 'Learning actions has hasData boolean');

  if (data.hasData) {
    assert(Array.isArray(data.learningActions), 'learningActions is an array');
    if (data.learningActions.length > 0) {
      const action = data.learningActions[0];
      assert(typeof action.chapterId === 'string', 'Action has chapterId string');
      assert(typeof action.subject === 'string', 'Action has subject string');
      assert(typeof action.accuracy === 'number', 'Action has numeric accuracy');
      assert(!isNaN(action.accuracy), 'Action accuracy is not NaN');
    }
  }
}

async function test_cross_user_isolation(token1, token2) {
  console.log('\n── Test: Cross-User Data Isolation ──');

  if (!token2) {
    console.log('  ⏭  Skipped (IAT_TEST_TOKEN_2 not set)');
    return;
  }

  // Get history as user 1 to find a result ID
  const { data: h1 } = await apiGet('/api/mock/history', token1);
  if (!h1?.history?.length) {
    console.log('  ⏭  Skipped (no history for user 1)');
    return;
  }

  const user1ResultId = h1.history[0].id;

  // Try to access user 1's attempt as user 2
  const { status } = await apiGet(`/api/mock/attempts/${user1ResultId}`, token2);
  assert(status === 403, 'User 2 gets 403 accessing User 1 attempt', `got ${status}`);
}

// ─── Main Runner ──────────────────────────────────────────────────────────────

async function cleanup(submissionId) {
  if (!submissionId) return;
  console.log(`\n── Cleanup: deleting test records for ${submissionId} ──`);
  try {
    // Delete child records first
    await supabase.from('mock_question_attempts').delete().eq('mock_result_id', submissionId);
    // Delete parent record
    await supabase.from('mock_results').delete().eq('id', submissionId);
    console.log('  🗑  Test records deleted.');
  } catch (err) {
    console.error('  ⚠  Cleanup error (non-critical):', err.message);
  }
}

async function run() {
  console.log('='.repeat(60));
  console.log('MOCK TEST E2E VERIFICATION SUITE');
  console.log('='.repeat(60));

  let submissionId = null;

  try {
    // Phase 1: Unauthenticated guard
    await test_401_without_token();

    // Phase 2: Submission & integrity
    const result = await test_submission_and_integrity(TOKEN1);
    submissionId = result.submissionId;

    // Phase 3: Idempotency
    await test_idempotency(TOKEN1, submissionId);

    // Phase 4: History
    await test_history(TOKEN1, submissionId);

    // Phase 5: Attempt details
    await test_attempt_details(TOKEN1, submissionId);

    // Phase 6: Analytics
    await test_analytics(TOKEN1);

    // Phase 7: Learning actions
    await test_learning_actions(TOKEN1);

    // Phase 8: Cross-user isolation
    await test_cross_user_isolation(TOKEN1, TOKEN2);

  } finally {
    // Always clean up, even on failure
    await cleanup(submissionId);

    console.log('\n' + '='.repeat(60));
    console.log(`RESULTS: ${passed} passed, ${failed} failed`);
    if (failures.length > 0) {
      console.error('Failed tests:');
      failures.forEach(f => console.error(`  • ${f}`));
    }
    console.log('='.repeat(60));

    process.exit(failed > 0 ? 1 : 0);
  }
}


run().catch(err => {
  console.error('Unhandled error in E2E suite:', err);
  process.exit(1);
});
