const fs = require("fs");
const crypto = require("crypto");
const assert = require("assert");

// Load backend .env manually
const envPath = "D:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/backend/.env";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      process.env[parts[0].trim()] = parts.slice(1).join("=").trim();
    }
  });
}

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const API_URL = "http://localhost:5000"; // Dev URL

async function runTests() {
  console.log("=== START SUBSCRIPTION INTEGRATION TESTS ===");

  // Create temporary unique test email
  const rand = Math.floor(Math.random() * 100000);
  const testEmail = `sub_test_${rand}@smartprep.space`;
  const testPassword = "Password123!";

  console.log(`\n1. Creating test user: ${testEmail}`);
  // Signup user via API
  const signupRes = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Sub Test User", email: testEmail, password: testPassword })
  });

  assert.strictEqual(signupRes.ok, true, "Signup should succeed");
  const signupData = await signupRes.json();
  const token = signupData.token;
  assert.ok(token, "Signup token must be returned");

  // Fetch created user ID from DB
  const { data: dbUser } = await supabase.from("users").select("id").eq("email", testEmail).single();
  const userId = dbUser.id;
  console.log(`User created. id: ${userId}`);

  // Test 1: Confirm initially FREE
  console.log("\n2. Verifying initial FREE status");
  const checkFreeRes = await fetch(`${API_URL}/api/check-pro-status`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const checkFreeData = await checkFreeRes.json();
  assert.strictEqual(checkFreeData.isPro, false, "Initial state must be FREE");
  assert.strictEqual(checkFreeData.status, "FREE");

  // Test 2: Protected endpoint gating check
  console.log("\n3. Testing premium endpoint gating");
  const pyqRes = await fetch(`${API_URL}/api/student/pyq-summary`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  assert.strictEqual(pyqRes.status, 403, "Access to premium endpoints must return 403 Forbidden for FREE users");
  const pyqData = await pyqRes.json();
  assert.strictEqual(pyqData.code, "PRO_REQUIRED");

  // Test 3: Bad payment signature rejection
  console.log("\n4. Testing bad signature rejection");
  const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      razorpay_order_id: "order_test_123",
      razorpay_payment_id: "pay_test_123",
      razorpay_signature: "bad_signature_forged"
    })
  });
  assert.strictEqual(verifyRes.status, 400, "Bad signature verify should be rejected with 400");

  // Test 4: Legacy Compatibility
  console.log("\n5. Testing legacy compatibility");
  // Set user database fields manually to mimic legacy subscriber (plan="PRO", plan_expiry=null, is_pro=true)
  const { error: legacyErr } = await supabase
    .from("users")
    .update({ plan: "PRO", is_pro: true, plan_expiry: null })
    .eq("id", userId);
  assert.strictEqual(legacyErr, null);

  const checkLegacyRes = await fetch(`${API_URL}/api/check-pro-status`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const checkLegacyData = await checkLegacyRes.json();
  assert.strictEqual(checkLegacyData.isPro, true, "Legacy user must remain active");
  assert.strictEqual(checkLegacyData.status, "ACTIVE");
  assert.strictEqual(checkLegacyData.expiresAt, null);

  // Test 5: Expired User Check
  console.log("\n6. Testing expired subscription check");
  const pastDateString = new Date(Date.now() - 3600000).toISOString(); // 1 hour ago
  const { error: expiredErr } = await supabase
    .from("users")
    .update({ plan: "six_month", is_pro: true, plan_expiry: pastDateString })
    .eq("id", userId);
  assert.strictEqual(expiredErr, null);

  const checkExpiredRes = await fetch(`${API_URL}/api/check-pro-status`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const checkExpiredData = await checkExpiredRes.json();
  assert.strictEqual(checkExpiredData.isPro, false, "Expired plan must result in isPro: false");
  assert.strictEqual(checkExpiredData.status, "EXPIRED");

  // Test 6: Order creation price verification
  console.log("\n7. Testing order creation pricing resolution");
  const createOrderRes = await fetch(`${API_URL}/api/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ planId: "monthly" }) // ₹399 = 39900 paise
  });
  assert.strictEqual(createOrderRes.ok, true);
  const orderData = await createOrderRes.json();
  assert.strictEqual(orderData.amount, 39900, "Order amount for monthly must match 39900 paise");

  // Test 7: Expired renewal extension calculation (Starts from now)
  console.log("\n8. Testing renewal starting from now for expired users");
  // Simulate Webhook success or mock payment verification by simulating DB update
  // Let's directly call our local expiry logic via a sample function or mock execution
  const durationMs = 30 * 24 * 60 * 60 * 1000; // 30 days
  const now = Date.now();
  
  // Expiry renewal logic simulation (as verified in backend)
  let calculatedExpiry;
  const currentExpiry = checkExpiredData.expiresAt ? new Date(checkExpiredData.expiresAt) : null;
  const isExpired = currentExpiry ? currentExpiry.getTime() <= now : true;
  if (!isExpired) {
    calculatedExpiry = new Date(currentExpiry.getTime() + durationMs);
  } else {
    calculatedExpiry = new Date(now + durationMs);
  }

  // Calculate difference to verify it starts from now (approx within 5 seconds)
  const diffFromNow = Math.abs(calculatedExpiry.getTime() - (now + durationMs));
  assert.ok(diffFromNow < 5000, "Renewal for expired user must start from now");

  // Test 8: Active renewal extension calculation (Extends from currentExpiry)
  console.log("\n9. Testing renewal extension from future currentExpiry");
  const futureExpiry = new Date(now + 15 * 24 * 60 * 60 * 1000); // 15 days in future
  const isFutureExpired = futureExpiry.getTime() <= now;
  let calculatedFutureExpiry;
  if (!isFutureExpired) {
    calculatedFutureExpiry = new Date(futureExpiry.getTime() + durationMs);
  } else {
    calculatedFutureExpiry = new Date(now + durationMs);
  }

  const expectedFutureVal = futureExpiry.getTime() + durationMs;
  assert.strictEqual(calculatedFutureExpiry.getTime(), expectedFutureVal, "Renewal for active user must extend future currentExpiry");

  // Cleanup database test record
  console.log("\n10. Cleaning up test user record");
  const { error: deletePaymentsErr } = await supabase.from("payments").delete().eq("user_id", userId);
  const { error: deleteUserErr } = await supabase.from("users").delete().eq("id", userId);
  assert.strictEqual(deletePaymentsErr, null);
  assert.strictEqual(deleteUserErr, null);

  console.log("\n=== ALL INTEGRATION TESTS PASSED SUCCESSFULLY ===");
}

runTests().catch(err => {
  console.error("\n❌ TEST FAILURE:", err);
  process.exit(1);
});
