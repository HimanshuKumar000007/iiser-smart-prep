const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTables() {
  console.log("Creating new closed-loop learning system tables...");
  
  const sql = `
    -- Table for student lesson reading sessions
    CREATE TABLE IF NOT EXISTS public.student_lesson_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
      chapter_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_active_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      scroll_progress INT NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'started', -- started | in_progress | viewed_to_end | completed
      UNIQUE(user_id, chapter_id)
    );

    CREATE INDEX IF NOT EXISTS idx_student_lesson_sessions_user ON public.student_lesson_sessions(user_id, last_active_at DESC);

    -- Table for student concept/mistake revision events
    CREATE TABLE IF NOT EXISTS public.student_revisions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
      chapter_id TEXT NOT NULL,
      revision_type TEXT NOT NULL, -- CHAPTER_REVIEW | TOPIC_REVIEW | QUIZ_RETRY | MASTERY_MAINTENANCE
      status TEXT NOT NULL DEFAULT 'started', -- started | completed
      started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      completed_at TIMESTAMPTZ,
      time_spent_seconds INT DEFAULT 0,
      confidence_rating INT,
      UNIQUE(user_id, chapter_id, started_at)
    );

    CREATE INDEX IF NOT EXISTS idx_student_revisions_user ON public.student_revisions(user_id, started_at DESC);
  `;

  const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql });
  if (error) {
    console.error("Failed to execute SQL via RPC:", error.message);
    process.exit(1);
  } else {
    console.log("Successfully created student_lesson_sessions and student_revisions tables!", data);
    process.exit(0);
  }
}

createTables();
