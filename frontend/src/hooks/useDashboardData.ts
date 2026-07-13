/**
 * useDashboardData
 * Fetches /api/dashboard-summary and derives all computed values
 * needed by the Hero, ReadinessEngine, WeakAreas, and StudyRoadmap sections.
 *
 * Flow: App.tsx → useDashboardData → /api/dashboard-summary → Supabase
 * ONE API call powers the entire dashboard.
 */

import { useState, useEffect, useCallback } from 'react';
import { calculatePrediction, Prediction } from '../lib/PredictionEngine';
import { generateStudyCoach, StudyCoachData } from '../lib/StudyCoach';
import { LESSONS_DATA } from '../data/lessons';



// ── Types ────────────────────────────────────────────────────────────

export interface SubjectPerformance {
  subject: string;
  accuracy: number;   // 0-100
  attempts: number;
}

export interface TodayTask {
  id: number;
  title: string;
  subtitle: string;
  completed: boolean;
  type: 'diagnostic' | 'lesson' | 'mock' | 'revision' | 'pyq';
}

export interface WeakArea {
  id: string;
  subject: string;
  accuracy: number;       // actual accuracy %
  priorityScore: number;  // 0–99, higher = more urgent
  potentialGain: number;  // estimated marks gain
}

export interface RoadmapTask {
  id: string;
  topic: string;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'revision';
}

export interface RoadmapData {
  today: RoadmapTask[];
  tomorrow: RoadmapTask[];
}

export interface RecentMockItem {
  score: number;
  date: string;
}

export interface PerformanceTrendData {
  averageScore: number;
  bestScore: number;
  totalMocks: number;
  recentMocks: RecentMockItem[];
  trend: 'Improving' | 'Stable' | 'Needs Attention' | 'No Data';
  improvementPct: number;
  lastScore: number;
  firstScore: number;
}

export interface DashboardSummaryRaw {
  name: string;
  accuracy: number;
  total_attempts: number;
  streak_days: number;
  best_score: number;
  subject_performance: SubjectPerformance[];
  last_mock_date: string | null;
  recentMocks?: RecentMockItem[];
  completed_lessons?: string[]; // Supabase completed lesson IDs
  total_study_time?: number; // Supabase total study time in seconds
}


export interface DashboardData extends DashboardSummaryRaw {
  // Derived — Hero
  displayName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelEmoji: string;
  levelLabel: string;
  preparation: number;
  potentialGain: number;
  todaysTasks: TodayTask[];
  subjectMap: Record<string, number>;  // { Physics: 62, ... }
  completed_lessons: string[];
  completed_lessons_count: number;
  lessonProgressMap: Record<string, number>;

  // Derived — ReadinessEngine
  readinessData: { name: string; value: number; fill: string }[];
  overallReadiness: number;

  // Derived — WeakAreas
  weakAreas: WeakArea[];

  // Derived — StudyRoadmap
  roadmap: RoadmapData;

  // Derived — Predicted Performance
  prediction: Prediction;

  // Derived — AI Study Coach
  studyCoach: StudyCoachData;

  // Derived — Performance Trend
  performanceTrend: PerformanceTrendData;
}




// ── Constants ─────────────────────────────────────────────────────────

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

const HERO_SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

// Colour for each subject in the radial chart
const SUBJECT_COLORS: Record<string, string> = {
  Physics:     '#8b5cf6',  // violet
  Chemistry:   '#3b82f6',  // blue
  Mathematics: '#f59e0b',  // amber
  Biology:     '#10b981',  // emerald
};

// ── Hook ──────────────────────────────────────────────────────────────

export function useDashboardData() {
  const [data, setData]       = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [rawSummary, setRawSummary] = useState<DashboardSummaryRaw | null>(null);

  const fetchSummary = useCallback(async (cancelled = false) => {
    try {
      const token = localStorage.getItem('IAT_TOKEN');

      if (!token) {
        if (!cancelled) {
          setData(buildDerivedData(emptyRaw(), ''));
          setLoading(false);
        }
        return;
      }

      const res = await fetch(`${API_BASE}/api/dashboard-summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw: DashboardSummaryRaw = await res.json();
      console.log('[useDashboardData] raw =>', raw);

      if (!cancelled) {
        setRawSummary(raw);
        if (raw.completed_lessons && Array.isArray(raw.completed_lessons)) {
          raw.completed_lessons.forEach(key => {
            if (localStorage.getItem(key) !== 'completed') {
              localStorage.setItem(key, 'completed');
            }
          });
        }
        const nameFromStorage = localStorage.getItem('currentUser') || 'Aspirant';
        setData(buildDerivedData(raw, nameFromStorage));
      }
    } catch (err) {
      console.error('[useDashboardData] error:', err);
      if (!cancelled) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData(buildDerivedData(emptyRaw(), localStorage.getItem('currentUser') || 'Aspirant'));
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  }, [API_BASE]);

  const refresh = useCallback(() => {
    fetchSummary(false);
  }, [fetchSummary]);

  useEffect(() => {
    let cancelled = false;
    fetchSummary(cancelled);
    return () => { cancelled = true; };
  }, [fetchSummary]);

  return { data, loading, error, refresh };
}

// ── Pure derivation logic ──────────────────────────────────────────────

function emptyRaw(): DashboardSummaryRaw {
  return {
    name: '',
    accuracy: 0,
    total_attempts: 0,
    streak_days: 0,
    best_score: 0,
    subject_performance: [],
    last_mock_date: null,
    completed_lessons: [],
    total_study_time: 0
  };
}

function buildDerivedData(raw: DashboardSummaryRaw, nameFromStorage: string): DashboardData {
  // ── 1. Calculate smart lesson progress per subject ──
  const lessonsCompleted: Record<string, number> = { Physics: 0, Chemistry: 0, Mathematics: 0, Biology: 0 };
  const lessonsTotal: Record<string, number> = { Physics: 0, Chemistry: 0, Mathematics: 0, Biology: 0 };

  const completedSet = new Set(raw.completed_lessons || []);

  let completedLessonsCount = 0;
  LESSONS_DATA.forEach(l => {
    const s = l.subject;
    if (lessonsTotal[s] !== undefined) {
      lessonsTotal[s]++;
      const saved = localStorage.getItem(`lesson_${l.id}`);
      const isCompleted = completedSet.has(`lesson_${l.id}`) || saved === 'completed';
      if (isCompleted) {
        lessonsCompleted[s]++;
        completedLessonsCount++;
      }
    }
  });

  const lessonProgressMap: Record<string, number> = {};
  HERO_SUBJECTS.forEach(s => {
    const total = lessonsTotal[s] || 1;
    const completed = lessonsCompleted[s] || 0;
    lessonProgressMap[s] = Math.round((completed / total) * 100);
  });

  // ── Subject readiness map (40% Mock, 30% Lessons, 20% PYQ, 10% Consistency) ──
  const consistency = Math.min(100, (raw.streak_days || 0) * 15);
  const subjectMap: Record<string, number> = {};

  HERO_SUBJECTS.forEach(s => {
    const lessonCompletion = lessonProgressMap[s] || 0;
    const performanceRow = raw.subject_performance.find(
      sp => sp.subject.toLowerCase() === s.toLowerCase()
    );

    if (performanceRow && performanceRow.attempts > 0) {
      const pyqAccuracy = Math.round(performanceRow.accuracy * 0.95);
      subjectMap[s] = Math.round(
        0.4 * performanceRow.accuracy +
        0.3 * lessonCompletion +
        0.2 * pyqAccuracy +
        0.1 * consistency
      );
    } else {
      // No mock attempts: readiness is solely determined by lesson completion
      subjectMap[s] = lessonCompletion;
    }
  });

  // ── Readiness Engine data (radial chart) ───────────────────────────
  // Reversed so outermost ring = first subject visually
  const readinessData = [...HERO_SUBJECTS].reverse().map(s => ({
    name: s,
    value: subjectMap[s] ?? 0,
    fill: SUBJECT_COLORS[s] ?? '#6366f1',
  }));

  const overallReadiness = Math.round(
    HERO_SUBJECTS.reduce((sum, s) => sum + (subjectMap[s] ?? 0), 0) / HERO_SUBJECTS.length
  );

  // ── Level & Preparation ──────────────────────────────────────────
  const preparation = overallReadiness;
  const level: DashboardData['level'] =
    preparation >= 75 ? 'Advanced' : preparation >= 50 ? 'Intermediate' : 'Beginner';
  const levelEmoji  = preparation >= 75 ? '🔥' : preparation >= 50 ? '🚀' : '🌱';
  const potentialGain = Math.max(2, Math.min(10, Math.round((100 - preparation) * 0.12)));

  // ── Weak Areas (bottom 3 by accuracy, gated by mock attempts) ────
  const weakAreas: WeakArea[] = raw.total_attempts > 0
    ? HERO_SUBJECTS
        .map(s => ({
          id: s,
          subject: s,
          accuracy: subjectMap[s] ?? 0,
          priorityScore: Math.min(99, Math.max(0, Math.round((75 - (subjectMap[s] ?? 0)) * 1.3))),
          potentialGain: Math.min(15, Math.max(2,  Math.round((75 - (subjectMap[s] ?? 0)) * 0.15))),
        }))
        .filter(a => a.accuracy < 75)          // only below target
        .sort((a, b) => a.accuracy - b.accuracy) // worst first
        .slice(0, 3)
    : [];

  // ── Today's Queue (Hero bottom section) ───────────────────────────
  const todaysTasks = deriveTodaysTasks(raw);

  // ── Study Roadmap ──────────────────────────────────────────────────
  const roadmap = deriveRoadmap(raw, subjectMap);

  // Build the partial data object first so calculatePrediction can use it
  const partial: DashboardData = {
    ...raw,
    displayName: raw.name || nameFromStorage,
    level,
    levelEmoji,
    levelLabel: `${level} ${levelEmoji}`,
    preparation,
    potentialGain,
    todaysTasks,
    subjectMap,
    completed_lessons: raw.completed_lessons || [],
    completed_lessons_count: completedLessonsCount,
    lessonProgressMap,
    readinessData,
    overallReadiness,
    weakAreas,
    roadmap,
    total_study_time: raw.total_study_time || 0,
    prediction: {} as Prediction,       // placeholder — filled below
    studyCoach: {} as StudyCoachData,   // placeholder — filled below
    performanceTrend: {} as PerformanceTrendData, // placeholder — filled below
  };


  // ── Predicted Performance ──────────────────────────────────────────
  const prediction = calculatePrediction(partial);
  const withPrediction = { ...partial, prediction };

  // ── AI Study Coach ─────────────────────────────────────────────────
  const studyCoach = generateStudyCoach(withPrediction);

  // ── Performance Trend ──────────────────────────────────────────────
  const performanceTrend = derivePerformanceTrend(raw);

  return { ...withPrediction, studyCoach, performanceTrend };
}

// ── Performance Trend V1 rules ─────────────────────────────────────────

function derivePerformanceTrend(raw: DashboardSummaryRaw): PerformanceTrendData {
  const mocks = raw.recentMocks ?? [];
  if (mocks.length === 0) {
    return {
      averageScore: 0,
      bestScore: 0,
      totalMocks: 0,
      recentMocks: [],
      trend: 'No Data',
      improvementPct: 0,
      lastScore: 0,
      firstScore: 0,
    };
  }

  const totalMocks = raw.total_attempts || mocks.length;
  const bestScore  = Math.max(raw.best_score || 0, ...mocks.map(m => m.score));
  const averageScore = Math.round(mocks.reduce((s, m) => s + m.score, 0) / mocks.length);
  const firstScore = mocks[0].score;
  const lastScore  = mocks[mocks.length - 1].score;

  let improvementPct = 0;
  if (firstScore > 0) {
    improvementPct = Math.round(((lastScore - firstScore) / firstScore) * 100);
  } else if (lastScore > 0) {
    improvementPct = 100;
  }

  let trend: 'Improving' | 'Stable' | 'Needs Attention' = 'Stable';
  if (mocks.length >= 2) {
    const half = Math.max(1, Math.floor(mocks.length / 2));
    const firstHalfAvg  = mocks.slice(0, half).reduce((s, m) => s + m.score, 0) / half;
    const secondHalfAvg = mocks.slice(-half).reduce((s, m) => s + m.score, 0) / half;
    const diff = secondHalfAvg - firstHalfAvg;
    if (diff >= 2.5)      trend = 'Improving';
    else if (diff <= -2.5) trend = 'Needs Attention';
  }

  return {
    averageScore,
    bestScore,
    totalMocks,
    recentMocks: mocks,
    trend,
    improvementPct,
    lastScore,
    firstScore,
  };
}


// ── Today's Queue V1 rules ─────────────────────────────────────────────

const getCompletedLessonsCountHelper = (raw: DashboardSummaryRaw): number => {
  const completedSet = new Set(raw.completed_lessons || []);
  let count = completedSet.size;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lesson_') && localStorage.getItem(key) === 'completed') {
      if (!completedSet.has(key)) {
        count++;
      }
    }
  }
  return count;
};

function deriveTodaysTasks(raw: DashboardSummaryRaw): TodayTask[] {
  const getCompletedLessonsCount = (): number => getCompletedLessonsCountHelper(raw);

  const isMockAttempted = (): boolean => {
    return raw.total_attempts > 0 || localStorage.getItem('mocks_taken_count') !== null;
  };

  if (raw.total_attempts === 0 && !isMockAttempted()) {
    return [
      { id: 1, title: 'Take Diagnostic Test',        subtitle: 'Unlock your baseline score', completed: false, type: 'diagnostic' },
      { id: 2, title: 'Complete First Smart Lesson',  subtitle: '10 min · Physics intro',     completed: getCompletedLessonsCount() > 0, type: 'lesson'     },
      { id: 3, title: 'Attempt First Quick Mock',     subtitle: '10 Questions · 10 min',      completed: false, type: 'mock'       },
    ];
  }

  const tasks: TodayTask[] = [];
  const sorted = [...raw.subject_performance].sort((a, b) => a.accuracy - b.accuracy);
  const worst  = sorted[0];

  if (worst && worst.accuracy < 65) {
    tasks.push({ id: 1, title: `Revise ${worst.subject}`, subtitle: `${Math.round(worst.accuracy)}% accuracy · Needs focus`, completed: false, type: 'revision' });
  }

  const daysSince = raw.last_mock_date
    ? Math.floor((Date.now() - new Date(raw.last_mock_date).getTime()) / 86_400_000)
    : 999;

  if (daysSince >= 3) {
    tasks.push({ id: 2, title: 'Take Quick Mock', subtitle: '15 Questions · 15 min', completed: false, type: 'mock' });
  }

  if (tasks.length === 0) {
    tasks.push({ id: 3, title: 'Solve 15 PYQs', subtitle: 'IAT Previous Year Questions', completed: false, type: 'pyq' });
  }

  const fillers: TodayTask[] = [
    { id: 10, title: 'Smart Revision Session', subtitle: '8 min note review',  completed: false, type: 'revision' },
    { id: 11, title: 'Quick Practice Set',     subtitle: '10 Questions',        completed: false, type: 'pyq'      },
    { id: 12, title: 'Physics Smart Lesson',   subtitle: '10 min Smart Note',   completed: getCompletedLessonsCount() > 0, type: 'lesson'   },
  ];
  let fi = 0;
  while (tasks.length < 3 && fi < fillers.length) tasks.push(fillers[fi++]);
  return tasks.slice(0, 4);
}

// ── Study Roadmap V1 rules ─────────────────────────────────────────────

function deriveRoadmap(raw: DashboardSummaryRaw, subjectMap: Record<string, number>): RoadmapData {
  const completedSet = new Set(raw.completed_lessons || []);
  const getCompletedLessonsCount = (): number => getCompletedLessonsCountHelper(raw);
  const isUnitsCompleted = completedSet.has('lesson_phy_units') || localStorage.getItem('lesson_phy_units') === 'completed';
  const isStraightCompleted = completedSet.has('lesson_phy_motion_straight') || localStorage.getItem('lesson_phy_motion_straight') === 'completed';

  // Empty state
  if (raw.total_attempts === 0) {
    return {
      today: [
        { id: '1', topic: 'Take Diagnostic Test',         completed: raw.total_attempts > 0, type: 'quiz'     },
        { id: '2', topic: 'Physics — Units & Dimensions', completed: isUnitsCompleted, type: 'lesson'   },
        { id: '3', topic: 'Quick Practice Set',           completed: false, type: 'quiz'     },
      ],
      tomorrow: [
        { id: '4', topic: 'Biology — Cell Structure',     completed: false, type: 'lesson'   },
        { id: '5', topic: 'Motion in One Dimension',      completed: isStraightCompleted, type: 'lesson'   },
      ],
    };
  }

  const sorted = HERO_SUBJECTS
    .map(s => ({ subject: s, accuracy: subjectMap[s] ?? 0 }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const worst  = sorted[0];
  const second = sorted[1];

  const daysSince = raw.last_mock_date
    ? Math.floor((Date.now() - new Date(raw.last_mock_date).getTime()) / 86_400_000)
    : 999;

  const today: RoadmapTask[] = [
    { id: '1', topic: `${worst.subject} — Focused Revision`,  completed: false, type: 'revision' },
    { id: '2', topic: `${second.subject} — Key Concepts`,     completed: getCompletedLessonsCount() > 0, type: 'lesson'   },
    { id: '3', topic: daysSince >= 2 ? 'Quick Mock Test' : 'Practice 10 PYQs', completed: false, type: 'quiz' },
  ];

  const tomorrow: RoadmapTask[] = [
    { id: '4', topic: `${second.subject} — Problem Solving`, completed: false, type: 'lesson' },
    { id: '5', topic: raw.streak_days >= 3 ? 'Full Mock Test' : `${sorted[2]?.subject ?? 'Biology'} — Smart Notes`, completed: false, type: raw.streak_days >= 3 ? 'quiz' : 'lesson' },
  ];

  return { today, tomorrow };
}
