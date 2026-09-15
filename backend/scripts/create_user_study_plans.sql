-- ==============================================================================
-- Table: user_study_plans
-- Description: Stores personalized student study plans ("My Path to IISER")
--              and checklist/schedule progress for multi-device synchronization.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.user_study_plans (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  plan_data JSONB NOT NULL,
  checklist_state JSONB DEFAULT '{}'::jsonb,
  mission_steps JSONB DEFAULT '{}'::jsonb,
  daily_slots JSONB DEFAULT '{}'::jsonb,
  schedule_preference TEXT DEFAULT 'MORNING',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookup by user_id
CREATE INDEX IF NOT EXISTS idx_user_study_plans_user_id ON public.user_study_plans(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_study_plans ENABLE ROW LEVEL SECURITY;

-- Allow service role full access and users to manage their own study plan
CREATE POLICY "Users can manage their own study plan"
  ON public.user_study_plans
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
