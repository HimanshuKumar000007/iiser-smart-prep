const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const API_URL = 'http://localhost:' + PORT;
const JWT_SECRET = process.env.JWT_SECRET || 'iat_super_secret';

const testUserId = '00000000-0000-0000-0000-000000000001';
const validToken = jwt.sign({ id: testUserId, email: 'test_sync@iiser.edu' }, JWT_SECRET, { expiresIn: '1h' });

async function runTests() {
  console.log('=== Testing Study Plan Cloud Sync APIs ===\n');
  let passed = 0;
  let failed = 0;

  // Test 1: Unauthenticated GET returns 401
  try {
    const res = await fetch(API_URL + '/api/user/study-plan');
    if (res.status === 401) {
      console.log('✔ Test 1 PASS: Unauthenticated GET returns 401');
      passed++;
    } else {
      console.error('✘ Test 1 FAIL: Expected 401, got ' + res.status);
      failed++;
    }
  } catch (err) {
    console.error('✘ Test 1 ERROR:', err.message);
    failed++;
  }

  // Test 2: Unauthenticated POST returns 401
  try {
    const res = await fetch(API_URL + '/api/user/study-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: {} })
    });
    if (res.status === 401) {
      console.log('✔ Test 2 PASS: Unauthenticated POST returns 401');
      passed++;
    } else {
      console.error('✘ Test 2 FAIL: Expected 401, got ' + res.status);
      failed++;
    }
  } catch (err) {
    console.error('✘ Test 2 ERROR:', err.message);
    failed++;
  }

  // Test 3: Authenticated POST with missing plan returns 400
  try {
    const res = await fetch(API_URL + '/api/user/study-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + validToken
      },
      body: JSON.stringify({})
    });
    if (res.status === 400) {
      console.log('✔ Test 3 PASS: Empty body POST returns 400');
      passed++;
    } else {
      console.error('✘ Test 3 FAIL: Expected 400, got ' + res.status);
      failed++;
    }
  } catch (err) {
    console.error('✘ Test 3 ERROR:', err.message);
    failed++;
  }

  // Test 4: Authenticated GET returns 200 with success: true
  try {
    const res = await fetch(API_URL + '/api/user/study-plan', {
      headers: { 'Authorization': 'Bearer ' + validToken }
    });
    const json = await res.json();
    if (res.ok && json.success === true) {
      console.log('✔ Test 4 PASS: Authenticated GET returns 200 and success: true');
      passed++;
    } else {
      console.error('✘ Test 4 FAIL:', res.status, json);
      failed++;
    }
  } catch (err) {
    console.error('✘ Test 4 ERROR:', err.message);
    failed++;
  }

  // Test 5: Authenticated POST with valid plan returns 200 and handles gracefully
  try {
    const mockPlan = {
      id: 'test_plan_1',
      answers: {
        targetInstitute: 'IISER Tirupati',
        stream: 'PCB',
        dailyHours: 5,
        targetAir: 'Top 500 AIR'
      }
    };
    const res = await fetch(API_URL + '/api/user/study-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + validToken
      },
      body: JSON.stringify({
        plan: mockPlan,
        checklist: { item_1: true },
        missionSteps: { step_concept_review: true },
        schedulePref: 'MORNING'
      })
    });
    const json = await res.json();
    if (res.ok && json.success === true) {
      console.log('✔ Test 5 PASS: Authenticated POST returns 200 and success: true');
      passed++;
    } else {
      console.error('✘ Test 5 FAIL:', res.status, json);
      failed++;
    }
  } catch (err) {
    console.error('✘ Test 5 ERROR:', err.message);
    failed++;
  }

  console.log('\nResults: ' + passed + ' Passed, ' + failed + ' Failed');
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
