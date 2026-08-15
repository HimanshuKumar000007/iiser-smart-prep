const assert = require("assert");

// Load sale config and logic test
const PLANS = {
  monthly: { amount: 399, durationDays: 30, description: "Pro Plan — 1 Month" },
  six_month: { amount: 499, durationDays: 180, description: "Pro Plan — 6 Months" },
  annual: { amount: 899, durationDays: 365, description: "Pro Plan — 1 Year" }
};

const SALE_CONFIG = {
  id: "independence_day_2026",
  name: "Independence Day Special Sale",
  badge: "🇮🇳 Independence Day Sale — ₹200 OFF",
  discountAmount: 200,
  targetPlanId: "annual",
  salePrice: 699,
  originalPrice: 899,
  startTime: new Date("2026-08-15T00:00:00+05:30").getTime(),
  endTime: new Date("2026-08-19T23:59:59+05:30").getTime()
};

function isSaleActiveAt(timeMs, sale = SALE_CONFIG) {
  return timeMs >= sale.startTime && timeMs <= sale.endTime;
}

function getEffectivePlanAt(planId, timeMs) {
  const basePlan = PLANS[planId];
  if (!basePlan) return null;

  if (planId === SALE_CONFIG.targetPlanId && isSaleActiveAt(timeMs)) {
    return {
      ...basePlan,
      amount: SALE_CONFIG.salePrice,
      originalAmount: SALE_CONFIG.originalPrice,
      discount: SALE_CONFIG.discountAmount,
      isSale: true,
      saleName: SALE_CONFIG.name
    };
  }

  return {
    ...basePlan,
    originalAmount: basePlan.amount,
    isSale: false
  };
}

console.log("🧪 Running Independence Day Sale Logic Tests...\n");

// 1. Current Date Test (Aug 15, 2026)
const currentTestTime = new Date("2026-08-15T09:30:00+05:30").getTime();
assert.strictEqual(isSaleActiveAt(currentTestTime), true, "Sale should be active on Aug 15, 2026");

const annualPlanDuringSale = getEffectivePlanAt("annual", currentTestTime);
assert.strictEqual(annualPlanDuringSale.amount, 699, "Annual plan should be ₹699 during sale");
assert.strictEqual(annualPlanDuringSale.originalAmount, 899, "Original amount should be ₹899");
assert.strictEqual(annualPlanDuringSale.isSale, true, "isSale flag should be true");
console.log("✅ Test 1 Passed: During sale window, Annual plan is ₹699 (Flat ₹200 OFF)");

// 2. Other plans unaffected during sale
const monthlyPlan = getEffectivePlanAt("monthly", currentTestTime);
assert.strictEqual(monthlyPlan.amount, 399, "Monthly plan should remain ₹399");
const sixMonthPlan = getEffectivePlanAt("six_month", currentTestTime);
assert.strictEqual(sixMonthPlan.amount, 499, "Six-month plan should remain ₹499");
console.log("✅ Test 2 Passed: Monthly (₹399) and 6-Month (₹499) plans remain unchanged");

// 3. Post-Sale Auto Reversion Test (Aug 20, 2026)
const postSaleTime = new Date("2026-08-20T00:00:01+05:30").getTime();
assert.strictEqual(isSaleActiveAt(postSaleTime), false, "Sale should be inactive on Aug 20, 2026");

const annualPlanAfterSale = getEffectivePlanAt("annual", postSaleTime);
assert.strictEqual(annualPlanAfterSale.amount, 899, "Annual plan should automatically revert to ₹899");
assert.strictEqual(annualPlanAfterSale.isSale, false, "isSale flag should be false after sale");
console.log("✅ Test 3 Passed: After Aug 19, 2026, Annual plan automatically reverts to ₹899 with zero manual intervention");

console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");
