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

function makePayload(mockId, questionsArray) {
  const answers = questionsArray.map((q, idx) => ({
    questionId: `q_${mockId}_${idx + 1}`,
    chapterId: q.chapterId,
    subject: q.subject || "Physics",
    difficulty: "medium",
    selectedAnswer: q.correct ? 1 : 2,
    correctAnswer: 1,
    timeTakenSeconds: 30,
    estimatedTimeSeconds: 120,
    questionOrder: idx + 1
  }));

  // Standard mock submission requires exactly 60 questions!
  // Let's pad it out with skipped questions from a dummy chapter
  const padLength = 60 - answers.length;
  for (let i = 0; i < padLength; i++) {
    answers.push({
      questionId: `pad_${mockId}_${i}`,
      chapterId: "dummy_pad_chapter", // Pad using unrecognized chapter
      subject: "Physics",
      difficulty: "medium",
      selectedAnswer: -1, // skipped
      correctAnswer: 1,
      timeTakenSeconds: 0,
      estimatedTimeSeconds: 120,
      questionOrder: answers.length + 1
    });
  }

  const completedAt = new Date().toISOString();
  const startedAt = new Date(Date.now() - 180 * 60 * 1000).toISOString();

  return {
    submissionId: uuid(),
    mockId,
    mockTitle: `Mock ${mockId}`,
    startedAt,
    completedAt,
    answers
  };
}

async function runTests() {
  console.log("════════════════════════════════════════════════════════");
  console.log(" Mock Learning Actions Test Suite");
  console.log("════════════════════════════════════════════════════════\n");

  const createdResultIds = [];

  try {
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

    // Clean slate before test
    await supabase.from("mock_question_attempts").delete().in("user_id", [USER_1, USER_2]);
    await supabase.from("mock_results").delete().in("user_id", [USER_1, USER_2]);

    // 1. Unauthorized request
    {
      const res = await fetch(`${API_URL}/api/mock/learning-actions`, { method: "GET" });
      if (res.status !== 401) throw new Error("Learning actions fetch without token did not return 401");
      console.log("  ✓ Unauthorized actions fetch rejected with 401");
    }

    // 2. Zero-data contract
    {
      const res = await fetch(`${API_URL}/api/mock/learning-actions`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      if (!res.ok) throw new Error("Failed to fetch empty actions");
      const data = await res.json();
      if (!data.success || data.hasData !== false || data.learningActions.length !== 0) {
        throw new Error("Zero-data contract is incorrect");
      }
      console.log("  ✓ Zero-data user receives empty learningActions list (hasData: false)");
    }

    // 3. Fallback: BUILD_MORE_EVIDENCE (mock data exists, but no chapter has >= 3 questions)
    {
      // Submitting 2 questions of motion
      const p = makePayload("M1", [
        { chapterId: "phy_motion_straight", correct: false },
        { chapterId: "phy_motion_straight", correct: false }
      ]);
      await submit(TOKEN_1, p);

      const res = await fetch(`${API_URL}/api/mock/learning-actions`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      const data = await res.json();
      if (data.learningActions[0].actionType !== "CONTINUE_MOCK_PRACTICE" || data.learningActions[0].reasonCode !== "BUILD_MORE_EVIDENCE") {
        throw new Error(`Expected BUILD_MORE_EVIDENCE fallback, got ${JSON.stringify(data.learningActions)}`);
      }
      console.log("  ✓ Under-sampled attempts correctly return CONTINUE_MOCK_PRACTICE with BUILD_MORE_EVIDENCE");

      // Clean database for next sections
      await supabase.from("mock_question_attempts").delete().in("user_id", [USER_1, USER_2]);
      await supabase.from("mock_results").delete().in("user_id", [USER_1, USER_2]);
      createdResultIds.length = 0;
    }

    // 4. Fallback: STRONG_MOCK_PERFORMANCE (attempts with >= 3 questions exist, but all are STRONG (>= 85%))
    {
      // Submitting 3 questions of motion (all correct)
      const p = makePayload("M2", [
        { chapterId: "phy_motion_straight", correct: true },
        { chapterId: "phy_motion_straight", correct: true },
        { chapterId: "phy_motion_straight", correct: true }
      ]);
      await submit(TOKEN_1, p);

      const res = await fetch(`${API_URL}/api/mock/learning-actions`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      const data = await res.json();
      if (data.learningActions[0].actionType !== "CONTINUE_MOCK_PRACTICE" || data.learningActions[0].reasonCode !== "STRONG_MOCK_PERFORMANCE") {
        throw new Error(`Expected STRONG_MOCK_PERFORMANCE fallback, got ${JSON.stringify(data.learningActions)}`);
      }
      console.log("  ✓ Strong performance on all evaluated chapters returns CONTINUE_MOCK_PRACTICE with STRONG_MOCK_PERFORMANCE");

      // Clean database for next sections
      await supabase.from("mock_question_attempts").delete().in("user_id", [USER_1, USER_2]);
      await supabase.from("mock_results").delete().in("user_id", [USER_1, USER_2]);
      createdResultIds.length = 0;
    }

    // 5. Normal workflow: weak chapters detected
    {
      // phy_motion_straight: 1/4 correct = 25% (HIGH_PRIORITY -> REVISE_CHAPTER, medium evidence (4 Qs))
      // phy_units: 3/5 correct = 60% (NEEDS_REVIEW -> PRACTICE_CHAPTER, low evidence (5 Qs))
      // invalid_chapter: 5/5 correct (should be skipped safely)
      const p = makePayload("M3", [
        { chapterId: "phy_motion_straight", correct: true },
        { chapterId: "phy_motion_straight", correct: false },
        { chapterId: "phy_motion_straight", correct: false },
        { chapterId: "phy_motion_straight", correct: false },
        
        { chapterId: "phy_units", correct: true },
        { chapterId: "phy_units", correct: true },
        { chapterId: "phy_units", correct: true },
        { chapterId: "phy_units", correct: false },
        { chapterId: "phy_units", correct: false },
        
        { chapterId: "invalid_chapter_id", correct: true },
        { chapterId: "invalid_chapter_id", correct: true },
        { chapterId: "invalid_chapter_id", correct: true }
      ]);
      await submit(TOKEN_1, p);

      const res = await fetch(`${API_URL}/api/mock/learning-actions`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${TOKEN_1}` }
      });
      const data = await res.json();
      
      if (!data.success || data.learningActions.length !== 2) {
        throw new Error(`Expected 2 actions, got ${data.learningActions.length}`);
      }

      const motionAction = data.learningActions.find(a => a.chapterId === "phy_motion_straight");
      const unitsAction = data.learningActions.find(a => a.chapterId === "phy_units");

      if (!motionAction || motionAction.actionType !== "REVISE_CHAPTER" || motionAction.priorityScore !== 65) {
        // accuracyContribution = (100 - 25) * 0.8 = 60
        // evidenceContribution = 5 (low evidence: totalQuestions is 4)
        // priorityScore = 60 + 5 = 65
        throw new Error(`Motion action statistics incorrect: ${JSON.stringify(motionAction)}`);
      }

      if (!unitsAction || unitsAction.actionType !== "PRACTICE_CHAPTER" || unitsAction.priorityScore !== 37) {
        // accuracyContribution = (100 - 60) * 0.8 = 32
        // evidenceContribution = 5 (low evidence: totalQuestions is 5)
        // priorityScore = 32 + 5 = 37
        throw new Error(`Units action statistics incorrect: ${JSON.stringify(unitsAction)}`);
      }

      console.log("  ✓ Learning actions correctly classified, scored, and catalog-checked");

      // Verify sorting order: motion first (priorityScore 65) then units (priorityScore 37)
      if (data.learningActions[0].chapterId !== "phy_motion_straight") {
        throw new Error("Learning actions not sorted in descending priorityScore order");
      }
      console.log("  ✓ Learning actions list sorted in descending priorityScore order");
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
  console.log(" Results: All tests passed!");
  console.log("════════════════════════════════════════════════════════\n");
}

runTests();
