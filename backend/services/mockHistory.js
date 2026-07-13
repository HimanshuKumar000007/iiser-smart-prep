const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Retrieves the mock test history and performance summary for the given user.
 * Sorted by completed_at DESC, id DESC.
 */
async function getHistory(userId) {
  if (!userId) {
    throw { status: 401, message: "Unauthorized" };
  }

  const { data: rows, error } = await supabase
    .from("mock_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.error("Failed to query mock history:", error);
    throw error;
  }

  const totalMocks = rows.length;
  let bestScore = 0;
  let bestAccuracy = 0;
  let averageScore = 0;
  let averageAccuracy = 0;
  let latestScore = 0;

  if (totalMocks > 0) {
    const scores = rows.map(r => r.score);
    const accuracies = rows
      .map(r => {
        const ans = r.correct + r.wrong;
        return ans > 0 ? Number(((r.correct / ans) * 100).toFixed(1)) : null;
      })
      .filter(a => a !== null);
    
    bestScore = Math.max(...scores);
    bestAccuracy = accuracies.length > 0 ? Math.max(...accuracies) : 0;
    
    const sumScore = scores.reduce((sum, s) => sum + s, 0);
    const sumAccuracy = accuracies.reduce((sum, a) => sum + a, 0);
    
    averageScore = Number((sumScore / totalMocks).toFixed(1));
    averageAccuracy = accuracies.length > 0 ? Number((sumAccuracy / accuracies.length).toFixed(1)) : 0;
    
    latestScore = rows[0].score;
  }

  const history = rows.map(row => {
    const answered = row.correct + row.wrong;
    const accuracy = answered > 0 ? Number(((row.correct / answered) * 100).toFixed(1)) : null;
    return {
      id: row.id,
      mockId: row.mock_id,
      mockTitle: row.mock_title,
      score: row.score,
      accuracy,
      correct: row.correct,
      wrong: row.wrong,
      skipped: row.skipped,
      totalTimeSeconds: row.time_taken || 0,
      completedAt: row.created_at
    };
  });

  return {
    success: true,
    hasData: totalMocks > 0,
    summary: {
      totalMocks,
      bestScore,
      bestAccuracy,
      averageScore,
      averageAccuracy,
      latestScore
    },
    history
  };
}

/**
 * Retrieves the details and answers map of a specific mock test result.
 */
async function getAttemptDetails(userId, resultId) {
  if (!userId) {
    throw { status: 401, message: "Unauthorized" };
  }
  if (!resultId) {
    throw { status: 400, message: "Missing resultId" };
  }

  // 1. Fetch parent and verify ownership
  const { data: parent, error: parentErr } = await supabase
    .from("mock_results")
    .select("*")
    .eq("id", resultId)
    .maybeSingle();

  if (parentErr) throw parentErr;
  if (!parent) {
    throw { status: 404, message: "Mock result not found" };
  }
  if (parent.user_id !== userId) {
    throw { status: 403, message: "Forbidden: Access denied" };
  }

  // 2. Fetch question attempts
  const { data: childRows, error: childErr } = await supabase
    .from("mock_question_attempts")
    .select("*")
    .eq("mock_result_id", resultId)
    .order("question_order", { ascending: true });

  if (childErr) throw childErr;

  const selectedAnswers = {};
  const questionTimes = {};

  for (const row of childRows) {
    selectedAnswers[row.question_id] = row.selected_answer === null ? -1 : row.selected_answer;
    questionTimes[row.question_id] = row.time_taken_seconds || 0;
  }

  // Load backend questions list to enrich dynamic PYQ reviews
  const fs = require('fs');
  const path = require('path');
  let pyqQuestions = [];
  try {
    const pyqPath = path.join(__dirname, '../data/pyqQuestions.json');
    if (fs.existsSync(pyqPath)) {
      pyqQuestions = JSON.parse(fs.readFileSync(pyqPath, 'utf8'));
    }
  } catch (err) {
    console.error("Failed to load pyqQuestions.json in mockHistory service:", err);
  }

  const attemptsList = childRows.map(row => {
    const matched = pyqQuestions.find(q => q.id === row.question_id);
    return {
      id: row.id,
      mock_result_id: row.mock_result_id,
      question_id: row.question_id,
      selected_answer: row.selected_answer === null ? -1 : row.selected_answer,
      is_correct: row.is_correct,
      question_order: row.question_order,
      time_taken_seconds: row.time_taken_seconds || 0,
      subject: matched ? matched.subject : (row.subject || 'Unknown'),
      difficulty: matched ? matched.difficulty : 'Medium',
      question: matched ? matched.question : `Question ID: ${row.question_id}`,
      correct_answer: matched ? matched.correct : 0,
      explanation: matched ? matched.explanation : null,
      options: matched ? matched.options : []
    };
  });

  return {
    success: true,
    mockResult: {
      id: parent.id,
      mockId: parent.mock_id,
      mockTitle: parent.mock_title,
      score: parent.score,
      totalQuestions: parent.total_questions,
      correct: parent.correct,
      wrong: parent.wrong,
      skipped: parent.skipped,
      totalTimeSeconds: parent.time_taken,
      completedAt: parent.created_at
    },
    selectedAnswers,
    questionTimes,
    // Add compatibility properties for PYQResults UI component
    parent: {
      id: parent.id,
      mock_id: parent.mock_id,
      mock_title: parent.mock_title,
      score: parent.score,
      total_questions: parent.total_questions,
      correct: parent.correct,
      wrong: parent.wrong,
      skipped: parent.skipped,
      time_taken: parent.time_taken,
      created_at: parent.created_at
    },
    attempts: attemptsList
  };
}

module.exports = {
  getHistory,
  getAttemptDetails
};
