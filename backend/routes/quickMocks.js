const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Malformed token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function requirePro(req, res, next) {
  try {
    const userId = req.user.id || req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("plan, is_pro, plan_expiry")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(403).json({
        success: false,
        code: "PRO_REQUIRED",
        message: "SmartPrep Pro subscription required."
      });
    }

    const plan = (user.plan || "").toUpperCase();
    const isProPlan = plan === "PRO" || plan === "MONTHLY" || plan === "SIX_MONTH" || plan === "ANNUAL";
    const isPro = user.is_pro === true || isProPlan;
    
    // Expiration check
    const now = new Date();
    const hasExpired = user.plan_expiry && new Date(user.plan_expiry).getTime() <= now.getTime();

    if (!isPro || hasExpired) {
      return res.status(403).json({
        success: false,
        code: "PRO_REQUIRED",
        message: "SmartPrep Pro subscription required."
      });
    }

    next();
  } catch (err) {
    console.error("requirePro middleware error in quickMocks:", err);
    return res.status(500).json({ error: "Internal server error during entitlement check" });
  }
}

// Load production compiled datasets
const quickMockCatalog = require('../data/quickMockCatalog.json');
const quickMockQuestions = require('../data/quickMockQuestions.json');

// 1. GET /api/quick-mocks/catalog?subject=Physics
router.get('/api/quick-mocks/catalog', authMiddleware, async (req, res) => {
  try {
    const { subject } = req.query;
    if (!subject) {
      return res.status(400).json({ error: "Missing subject query parameter" });
    }

    const subKey = subject.toLowerCase();
    const validSubjects = ['physics', 'chemistry', 'biology', 'mathematics'];
    if (!validSubjects.includes(subKey)) {
      return res.status(400).json({ error: "Invalid subject. Must be one of Physics, Chemistry, Biology, or Mathematics" });
    }

    const chaptersList = quickMockCatalog[subKey] || [];

    res.json({
      success: true,
      subject,
      chapters: chaptersList
    });
  } catch (err) {
    console.error("GET /api/quick-mocks/catalog error:", err);
    res.status(500).json({ error: "Internal server error loading catalog" });
  }
});

// 2. POST /api/quick-mock/session/start
router.post('/api/quick-mock/session/start', authMiddleware, async (req, res, next) => {
  const { quickMockId } = req.body || {};
  if (quickMockId && (quickMockId.startsWith('qm_phy_units') || quickMockId === 'qm_phy_units_01')) {
    return next();
  }
  return requirePro(req, res, next);
}, async (req, res) => {
  try {
    const { quickMockId } = req.body;
    if (!quickMockId) {
      return res.status(400).json({ error: "Missing quickMockId parameter" });
    }

    const match = quickMockId.match(/^qm_([a-zA-Z0-9_]+)_(\d{2})$/);
    if (!match) {
      return res.status(400).json({ error: "Invalid quickMockId format. Must be qm_<chapterId>_<01-04>" });
    }

    const questionsList = quickMockQuestions[quickMockId];
    if (!questionsList) {
      return res.status(400).json({ error: "This Quick Mock variant is currently unavailable" });
    }

    if (questionsList.length !== 16) {
      return res.status(400).json({ error: "Quick mock dataset does not contain exactly 16 questions" });
    }

    // Dynamic sanitization of correct answer and explanation to block client leakage
    const sanitizedQuestions = questionsList.map(q => {
      const { correct, explanation, ...rest } = q;
      return rest;
    });

    res.json({
      success: true,
      quickMockId,
      questions: sanitizedQuestions
    });
  } catch (err) {
    console.error("POST /api/quick-mock/session/start error:", err);
    res.status(500).json({ error: "Internal server error starting session" });
  }
});

// 3. POST /api/quick-mock/session/submit
router.post('/api/quick-mock/session/submit', authMiddleware, requirePro, async (req, res) => {
  try {
    const { quickMockId, answers, timeTaken } = req.body;
    if (!quickMockId) {
      return res.status(400).json({ error: "Missing quickMockId parameter" });
    }
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Missing or invalid answers parameter" });
    }

    const match = quickMockId.match(/^qm_([a-zA-Z0-9_]+)_(\d{2})$/);
    if (!match) {
      return res.status(400).json({ error: "Invalid quickMockId format. Must be qm_<chapterId>_<01-04>" });
    }

    const chapterId = match[1];

    const questionsList = quickMockQuestions[quickMockId];
    if (!questionsList) {
      return res.status(400).json({ error: "This Quick Mock variant is currently unavailable" });
    }

    if (questionsList.length !== 16) {
      return res.status(400).json({ error: "Quick mock dataset does not contain exactly 16 questions" });
    }

    // Map canonical questions by ID for strict lookup
    const canonicalMap = {};
    questionsList.forEach(q => {
      canonicalMap[q.id] = q;
    });

    const submittedAnswersMap = {};
    const seenQuestionIds = new Set();
    let containsDuplicates = false;

    // Validate incoming answers payload parameters
    for (let i = 0; i < answers.length; i++) {
      const ans = answers[i];
      if (!ans || ans.questionId === undefined) {
        return res.status(400).json({ error: "Malformed answer element inside payload" });
      }

      // Reject foreign question IDs
      if (!canonicalMap[ans.questionId]) {
        continue; // ignore foreign questions or reject
      }

      // Detect duplicate question submissions
      if (seenQuestionIds.has(ans.questionId)) {
        containsDuplicates = true;
        continue;
      }
      seenQuestionIds.add(ans.questionId);

      submittedAnswersMap[ans.questionId] = ans.selectedAnswer;
    }

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const results = questionsList.map(q => {
      const studentAnswer = submittedAnswersMap[q.id] !== undefined ? submittedAnswersMap[q.id] : -1;
      const isSkipped = studentAnswer === -1 || studentAnswer === null || studentAnswer === undefined;
      const isCorrect = !isSkipped && studentAnswer === q.correct;

      if (isSkipped) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        id: q.id,
        question: q.question,
        options: q.options,
        studentAnswer,
        correctAnswer: q.correct,
        explanation: q.explanation,
        isCorrect,
        isSkipped
      };
    });

    const totalAnswered = correctCount + wrongCount;
    // All skipped returns null accuracy
    const accuracy = totalAnswered > 0
      ? parseFloat(((correctCount / totalAnswered) * 100).toFixed(2))
      : null;

    res.json({
      success: true,
      assessmentType: "QUICK_MOCK",
      quickMockId,
      chapterId,
      questionCount: 16,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      accuracy,
      timeTaken: Number(timeTaken) || 0,
      results
    });
  } catch (err) {
    console.error("POST /api/quick-mock/session/submit error:", err);
    res.status(500).json({ error: "Internal server error submitting session" });
  }
});

module.exports = router;
