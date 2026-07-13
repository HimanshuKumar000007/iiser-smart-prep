const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  console.log("Checking if student_lesson_sessions and student_revisions exist...");
  
  const { data: d1, error: e1 } = await supabase.from("student_lesson_sessions").select("*").limit(1);
  if (e1) {
    console.log("student_lesson_sessions check failed:", e1.message);
  } else {
    console.log("student_lesson_sessions exists!", d1);
  }

  const { data: d2, error: e2 } = await supabase.from("student_revisions").select("*").limit(1);
  if (e2) {
    console.log("student_revisions check failed:", e2.message);
  } else {
    console.log("student_revisions exists!", d2);
  }
}

check();
