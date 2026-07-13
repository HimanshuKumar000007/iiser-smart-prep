const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function submitMock(userId, payload) {
  const {
    submissionId,
    mockId,
    mockTitle,
    startedAt,
    completedAt,
    answers
  } = payload;

  // 1. Validation
  if (!mockId) {
    throw { status: 400, message: "Missing mockId" };
  }
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw { status: 400, message: "Missing or empty answers array" };
  }
  if (answers.length !== 60) {
    throw { status: 400, message: "Invalid question count: exactly 60 questions required" };
  }

  // Check for duplicate questionIds
  const questionIds = new Set();
  for (const ans of answers) {
    if (!ans.questionId) {
      throw { status: 400, message: "Missing questionId in answer" };
    }
    if (questionIds.has(ans.questionId)) {
      throw { status: 400, message: `Duplicate questionId detected: ${ans.questionId}` };
    }
    questionIds.add(ans.questionId);

    // Validate correctAnswer bounds (e.g. 0 to 3)
    if (ans.correctAnswer === undefined || ans.correctAnswer === null || typeof ans.correctAnswer !== "number" || ans.correctAnswer < 0 || ans.correctAnswer > 3) {
      throw { status: 400, message: `Invalid correctAnswer index for question ${ans.questionId}: must be between 0 and 3` };
    }

    // Validate selectedAnswer format
    if (ans.selectedAnswer !== undefined && ans.selectedAnswer !== null) {
      if (typeof ans.selectedAnswer !== "number" || ans.selectedAnswer < -1) {
        throw { status: 400, message: `Invalid selectedAnswer for question ${ans.questionId}` };
      }
    }

    // Validate timeTakenSeconds >= 0
    if (ans.timeTakenSeconds !== undefined && ans.timeTakenSeconds !== null) {
      if (typeof ans.timeTakenSeconds !== "number" || ans.timeTakenSeconds < 0) {
        throw { status: 400, message: `Invalid timeTakenSeconds for question ${ans.questionId}: must be non-negative` };
      }
    }
  }

  // 2. Idempotency Check
  const parentId = submissionId || require("crypto").randomUUID();
  if (submissionId) {
    const { data: existingParent, error: parentErr } = await supabase
      .from("mock_results")
      .select("*")
      .eq("id", submissionId)
      .maybeSingle();

    if (parentErr) throw parentErr;

    if (existingParent) {
      const correct = existingParent.correct;
      const wrong = existingParent.wrong;
      const skipped = existingParent.skipped;
      const totalQuestions = existingParent.total_questions;
      const totalTimeSeconds = existingParent.time_taken || 0;
      const answeredQuestions = correct + wrong;

      const accuracy = answeredQuestions > 0 ? Number(((correct / answeredQuestions) * 100).toFixed(1)) : null;
      const averageTimeSeconds = answeredQuestions > 0 ? Math.round(totalTimeSeconds / answeredQuestions) : 0;

      return {
        mockResultId: existingParent.id,
        score: existingParent.score,
        totalQuestions,
        accuracy,
        correct,
        wrong,
        skipped,
        answeredQuestions,
        totalTimeSeconds,
        averageTimeSeconds
      };
    }
  }

  // 3. Calculate statistics
  const totalQuestions = answers.length;
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let totalTimeSeconds = 0;

  for (const ans of answers) {
    const isAnswered = ans.selectedAnswer !== null && ans.selectedAnswer !== undefined && ans.selectedAnswer !== -1;
    if (!isAnswered) {
      skipped++;
    } else if (ans.selectedAnswer === ans.correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
    totalTimeSeconds += (ans.timeTakenSeconds || 0);
  }

  const score = correct;
  const answeredQuestions = correct + wrong;
  const accuracy = answeredQuestions > 0 ? Number(((correct / answeredQuestions) * 100).toFixed(1)) : null;
  const averageTimeSeconds = answeredQuestions > 0 ? Math.round(totalTimeSeconds / answeredQuestions) : 0;

  // Deriving subject and difficulty from first question
  const firstAnswer = answers[0];
  const subject = firstAnswer?.subject || "Mixed";
  const difficulty = firstAnswer?.difficulty || "Mixed";

  // 4. Insert mock_results
  const { error: insertParentErr } = await supabase
    .from("mock_results")
    .insert([{
      id: parentId,
      user_id: userId,
      mock_id: mockId,
      mock_title: mockTitle || `Mock #${mockId}`,
      score,
      total_questions: totalQuestions,
      correct,
      wrong,
      skipped,
      time_taken: totalTimeSeconds,
      subject,
      difficulty,
      created_at: payload.completedAt || new Date().toISOString()
    }]);

  if (insertParentErr) {
    throw insertParentErr;
  }

  // 5. Insert mock_question_attempts
  const questionAttempts = answers.map(ans => ({
    mock_result_id: parentId,
    user_id: userId,
    mock_id: mockId,
    question_id: ans.questionId,
    chapter_id: ans.chapterId,
    topic_id: ans.topicId,
    subject: ans.subject,
    difficulty: ans.difficulty,
    selected_answer: ans.selectedAnswer === -1 ? null : ans.selectedAnswer,
    correct_answer: ans.correctAnswer,
    is_correct: ans.selectedAnswer === ans.correctAnswer,
    time_taken_seconds: ans.timeTakenSeconds || 0,
    estimated_time_seconds: ans.estimatedTimeSeconds || 0,
    question_order: ans.questionOrder || 1
  }));

  const { error: insertChildrenErr } = await supabase
    .from("mock_question_attempts")
    .insert(questionAttempts);

  if (insertChildrenErr) {
    // JS-level rollback: best-effort delete the parent record
    const { error: rollbackErr } = await supabase.from("mock_results").delete().eq("id", parentId);
    if (rollbackErr) {
      console.error(`[mockSubmission] Rollback failed for parentId ${parentId}:`, rollbackErr.message);
    }
    throw insertChildrenErr;
  }

  return {
    mockResultId: parentId,
    score,
    totalQuestions,
    accuracy,
    correct,
    wrong,
    skipped,
    answeredQuestions,
    totalTimeSeconds,
    averageTimeSeconds
  };
}

module.exports = { submitMock };
