import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

// ─── Types matching Supabase schema ──────────────────────────────────────────
export interface UserStats {
  user_id: string;
  total_mocks: number;
  best_score: number;
  avg_score: number;
  total_correct: number;
  total_questions: number;
  updated_at: string;
}

export interface MockResult {
  id: string;
  user_id: string;
  mock_id: string;
  mock_title: string;
  score: number;
  total_questions: number;
  correct: number;
  wrong: number;
  skipped: number;
  time_taken: number | null;
  subject: string | null;
  difficulty: string | null;
  created_at: string;
}

export interface DashboardData {
  user: User | null;
  userStats: UserStats | null;
  mockResults: MockResult[];
  // Derived / computed
  accuracyRate: number;
  questionsSolved: number;
  totalMocks: number;
  bestScore: number;
  streak: number;
  weeklyChartData: { date: string; accuracy: number; questions: number; xp: number }[];
  subjectBreakdown: { subject: string; accuracy: number; count: number; correct: number }[];
  loading: boolean;
  error: string | null;
}

// ─── Calculate streak from mock results ──────────────────────────────────────
function calcStreak(results: MockResult[]): number {
  if (!results.length) return 0;
  const dates = [...new Set(results.map(r => r.created_at.slice(0, 10)))].sort().reverse();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    if (dates[i] === expected.toISOString().slice(0, 10)) streak++;
    else break;
  }
  return streak;
}

// ─── Build last-7-days chart data from mock_results ──────────────────────────
function buildWeeklyChart(results: MockResult[]) {
  const days: { date: string; accuracy: number; questions: number; xp: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const dayResults = results.filter(r => r.created_at.slice(0, 10) === dateStr);
    const totalQ = dayResults.reduce((s, r) => s + r.total_questions, 0);
    const totalC = dayResults.reduce((s, r) => s + r.correct, 0);
    const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
    const xp = dayResults.reduce((s, r) => s + r.correct * 10, 0);
    days.push({ date: label, accuracy, questions: totalQ, xp });
  }
  return days;
}

// ─── Build subject breakdown from mock_results ────────────────────────────────
function buildSubjectBreakdown(results: MockResult[]) {
  const subjectMap: Record<string, { correct: number; total: number }> = {};
  for (const r of results) {
    const s = r.subject || 'General';
    if (!subjectMap[s]) subjectMap[s] = { correct: 0, total: 0 };
    subjectMap[s].correct += r.correct;
    subjectMap[s].total += r.total_questions;
  }
  return Object.entries(subjectMap).map(([subject, v]) => ({
    subject,
    accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
    count: results.filter(r => (r.subject || 'General') === subject).length,
    correct: v.correct,
  }));
}

// ─── Main Hook ────────────────────────────────────────────────────────────────
export function useUserData(): DashboardData {
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [mockResults, setMockResults] = useState<MockResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        // 1. Get current session user
        const { data: { user: sessionUser }, error: authErr } = await supabase.auth.getUser();
        if (authErr) throw authErr;
        if (!mounted) return;
        setUser(sessionUser);

        if (!sessionUser) {
          setLoading(false);
          return;
        }

        // 2. Fetch user_stats
        const { data: statsData, error: statsErr } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', sessionUser.id)
          .single();

        if (statsErr && statsErr.code !== 'PGRST116') throw statsErr; // PGRST116 = no rows
        if (mounted) setUserStats(statsData ?? null);

        // 3. Fetch mock_results (last 90 days, most recent first)
        const since = new Date();
        since.setDate(since.getDate() - 90);
        const { data: resultsData, error: resultsErr } = await supabase
          .from('mock_results')
          .select('*')
          .eq('user_id', sessionUser.id)
          .gte('created_at', since.toISOString())
          .order('created_at', { ascending: false });

        if (resultsErr) throw resultsErr;
        if (mounted) setMockResults(resultsData ?? []);
      } catch (err: unknown) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAll();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchAll();
      } else {
        setUser(null);
        setUserStats(null);
        setMockResults([]);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // ─── Derived values ──────────────────────────────────────────────────────
  const accuracyRate = userStats
    ? (userStats.total_questions > 0
        ? Math.round((userStats.total_correct / userStats.total_questions) * 100)
        : Math.round(userStats.avg_score))
    : 0;

  const questionsSolved = userStats?.total_questions ?? 0;
  const totalMocks = userStats?.total_mocks ?? 0;
  const bestScore = userStats?.best_score ?? 0;
  const streak = calcStreak(mockResults);
  const weeklyChartData = buildWeeklyChart(mockResults);
  const subjectBreakdown = buildSubjectBreakdown(mockResults);

  return {
    user,
    userStats,
    mockResults,
    accuracyRate,
    questionsSolved,
    totalMocks,
    bestScore,
    streak,
    weeklyChartData,
    subjectBreakdown,
    loading,
    error,
  };
}
