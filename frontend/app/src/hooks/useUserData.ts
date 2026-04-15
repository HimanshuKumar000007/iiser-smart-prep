import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

// ─── Types matching EXACT Supabase schema ─────────────────────────────────────
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
  // Computed
  accuracyRate: number;
  questionsSolved: number;
  totalMocks: number;
  bestScore: number;
  avgScore: number;
  streak: number;
  weeklyChartData: { date: string; accuracy: number; questions: number; correct: number }[];
  subjectBreakdown: { subject: string; accuracy: number; count: number; correct: number; total: number }[];
  loading: boolean;
  error: string | null;
}

// ─── Calculate streak (days in a row with at least 1 test) ───────────────────
function calcStreak(results: MockResult[]): number {
  if (!results.length) return 0;
  const uniqueDates = [...new Set(results.map(r => r.created_at.slice(0, 10)))].sort().reverse();
  let streak = 0;
  for (let i = 0; i < uniqueDates.length; i++) {
    const expected = new Date();
    expected.setDate(expected.getDate() - i);
    if (uniqueDates[i] === expected.toISOString().slice(0, 10)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// ─── Build last-7-days chart from mock_results ────────────────────────────────
function buildWeeklyChart(results: MockResult[]) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const dayResults = results.filter(r => r.created_at.slice(0, 10) === dateStr);
    const totalQ = dayResults.reduce((s, r) => s + r.total_questions, 0);
    const totalC = dayResults.reduce((s, r) => s + r.correct, 0);
    const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
    return { date: label, accuracy, questions: totalQ, correct: totalC };
  });
}

// ─── Build subject breakdown from mock_results ────────────────────────────────
function buildSubjectBreakdown(results: MockResult[]) {
  const map: Record<string, { correct: number; total: number; count: number }> = {};
  for (const r of results) {
    const s = r.subject || 'General';
    if (!map[s]) map[s] = { correct: 0, total: 0, count: 0 };
    map[s].correct += r.correct;
    map[s].total += r.total_questions;
    map[s].count += 1;
  }
  return Object.entries(map)
    .map(([subject, v]) => ({
      subject,
      accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
      count: v.count,
      correct: v.correct,
      total: v.total,
    }))
    .sort((a, b) => b.count - a.count);
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

    async function fetchAll(userId: string) {
      try {
        // Fetch user_stats — exact columns only
        const { data: statsData, error: statsErr } = await supabase
          .from('user_stats')
          .select('user_id, total_mocks, best_score, avg_score, total_correct, total_questions, updated_at')
          .eq('user_id', userId)
          .single();

        // PGRST116 = no rows found (new user) — that's ok
        if (statsErr && statsErr.code !== 'PGRST116') {
          console.warn('user_stats error:', statsErr.message);
        }
        if (mounted) setUserStats(statsData ?? null);

        // Fetch mock_results — last 90 days, exact columns
        const since = new Date();
        since.setDate(since.getDate() - 90);
        const { data: resultsData, error: resultsErr } = await supabase
          .from('mock_results')
          .select('id, user_id, mock_id, mock_title, score, total_questions, correct, wrong, skipped, time_taken, subject, difficulty, created_at')
          .eq('user_id', userId)
          .gte('created_at', since.toISOString())
          .order('created_at', { ascending: false });

        if (resultsErr) console.warn('mock_results error:', resultsErr.message);
        if (mounted) setMockResults(resultsData ?? []);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function init() {
      const { data: { user: sessionUser } } = await supabase.auth.getUser();
      if (!mounted) return;

      if (sessionUser) {
        setUser(sessionUser);
        await fetchAll(sessionUser.id);
      } else {
        // Not logged in — show empty dashboard, no redirect
        setLoading(false);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && mounted) {
        setUser(session.user);
        setLoading(true);
        fetchAll(session.user.id);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ─── Computed values from REAL data ──────────────────────────────────────
  const accuracyRate = userStats
    ? (userStats.total_questions > 0
      ? Math.round((userStats.total_correct / userStats.total_questions) * 100)
      : Math.round(userStats.avg_score))
    : 0;

  return {
    user,
    userStats,
    mockResults,
    accuracyRate,
    questionsSolved: userStats?.total_questions ?? 0,
    totalMocks: userStats?.total_mocks ?? 0,
    bestScore: userStats?.best_score ?? 0,
    avgScore: userStats?.avg_score ?? 0,
    streak: calcStreak(mockResults),
    weeklyChartData: buildWeeklyChart(mockResults),
    subjectBreakdown: buildSubjectBreakdown(mockResults),
    loading,
    error,
  };
}
