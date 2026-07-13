const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testRpc() {
  console.log("Testing SQL execution via RPC...");
  const sql = `
    CREATE TABLE IF NOT EXISTS public.lesson_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
      lesson_id TEXT NOT NULL,
      completed BOOLEAN DEFAULT TRUE,
      completed_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, lesson_id)
    );
  `;
  const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql });
  if (error) {
    console.error("RPC exec_sql failed:", error.message);
  } else {
    console.log("RPC exec_sql succeeded!", data);
  }
}
testRpc();
