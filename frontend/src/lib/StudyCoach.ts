/**
 * StudyCoach.ts — AI Study Coach (Rule-Based Intelligence)
 *
 * Answers: "What exactly should I do today?"
 *
 * 10 advanced rules, fully deterministic, zero API calls.
 * Every output feels personally generated from the student's data.
 *
 * Rules:
 *   R1  Subject priority — lowest accuracy first, skip >82%
 *   R2  Mock cadence — no mock >3 days → schedule it
 *   R3  Cutoff proximity — need <15 marks → gap-closure urgency
 *   R4  Streak momentum — streak ≥3 → encouragement + pace
 *   R5  Accuracy trend — improving → push mock; declining → revise
 *   R6  Consistency gap — best_score >> avg → flag inconsistency
 *   R7  All subjects strong — all >75% → full mock time
 *   R8  Coach message — personalized insight from worst-subject cost
 *   R9  Session assignment — morning=concept, afternoon=PYQ, evening=mock
 *   R10 Daily goal — compute minutes, PYQs, mocks, expected gain
 */

import { DashboardData } from '../hooks/useDashboardData';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TaskType    = 'revision' | 'pyq' | 'mock' | 'lesson' | 'rest';
export type TaskSession = 'morning' | 'afternoon' | 'evening';
export type TaskBadge   = 'URGENT' | 'HIGH' | 'QUICK WIN' | 'MAINTAIN' | 'SCHEDULED';
export type MessageType = 'warning' | 'encouragement' | 'strategy' | 'milestone';

export interface CoachTask {
  id:         string;
  priority:   1 | 2 | 3;
  title:      string;         // "Revise Thermodynamics"
  subject:    string;         // "Physics"
  detail:     string;         // "48% accuracy · 20 min"
  type:       TaskType;
  duration:   number;         // minutes
  marksGain:  number;         // estimated marks gain
  reason:     string;         // why this rule fired
  badge:      TaskBadge;
  session:    TaskSession;
}

export interface CoachMessage {
  headline:   string;         // "Physics costs you ~18 marks every week"
  subline:    string;         // "Fix it first."
  type:       MessageType;
  emoji:      string;
}

export interface SessionSlot {
  session:    TaskSession;
  label:      string;         // "Morning"
  emoji:      string;
  timeRange:  string;         // "6–9 AM"
  tasks:      CoachTask[];
  totalMins:  number;
}

export interface DailyGoal {
  totalMinutes:   number;
  pyqCount:       number;
  mockCount:      number;
  lessonCount:    number;
  revisionCount:  number;
  expectedGain:   number;   // marks
}

export interface StudyCoachData {
  coachMessage:    CoachMessage;
  priorityTasks:   CoachTask[];    // top 3
  sessionPlan:     SessionSlot[];  // morning / afternoon / evening
  dailyGoal:       DailyGoal;
  streakMessage:   string | null;
  activeRule:      string;         // which primary rule drove today's plan (debug)
  isReady:         boolean;        // false = new user → show empty state
}

// ── Subject topic lookup ──────────────────────────────────────────────────────

const TOPICS: Record<string, string[]> = {
  Physics:     ['Thermodynamics', 'Electrostatics', 'Modern Physics', 'Optics', 'Mechanics'],
  Chemistry:   ['Organic Reactions', 'Chemical Equilibrium', 'Electrochemistry', 'Atomic Structure', 'p-Block Elements'],
  Mathematics: ['Calculus & Integrals', 'Probability & Stats', 'Coordinate Geometry', 'Algebra', 'Trigonometry'],
  Biology:     ['Plant Kingdom', 'Cell Biology & Genetics', 'Human Physiology', 'Ecology', 'Biomolecules'],
};

function topicFor(subject: string, accuracy: number): string {
  const list = TOPICS[subject] ?? [subject];
  // Lower accuracy → use first (hardest) topic; higher → use later ones
  const idx = Math.min(Math.floor((accuracy / 100) * list.length), list.length - 1);
  return list[idx];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysSince(dateStr: string | null): number {
  if (!dateStr) return 999;
  return Math.max(0, Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86_400_000
  ));
}

/**
 * How many marks does weak accuracy cost per mock?
 * Each 1% below target (75%) ≈ 0.32 marks per mock.
 * Over ~2 mocks/week = weekly cost.
 */
function weeklyMarkCost(accuracy: number): number {
  const gap = Math.max(0, 75 - accuracy);
  return Math.round(gap * 0.32 * 2);
}

function estimateGain(accuracy: number): number {
  return Math.max(1, Math.round((75 - Math.min(accuracy, 75)) * 0.18));
}

function badge(accuracy: number, daysMock: number): TaskBadge {
  if (accuracy < 50)          return 'URGENT';
  if (accuracy < 65)          return 'HIGH';
  if (daysMock >= 3)          return 'SCHEDULED';
  if (accuracy >= 75)         return 'MAINTAIN';
  return 'QUICK WIN';
}

// ── Main engine ───────────────────────────────────────────────────────────────

export function generateStudyCoach(data: DashboardData): StudyCoachData {
  const {
    accuracy,
    total_attempts,
    best_score,
    streak_days,
    subject_performance,
    last_mock_date,
    prediction,
  } = data;

  // New user — no data yet
  if (total_attempts === 0) {
    return {
      isReady:       false,
      coachMessage:  { headline: 'Complete your first diagnostic test', subline: 'Your personalised plan will appear here.', type: 'strategy', emoji: '🎯' },
      priorityTasks: [],
      sessionPlan:   [],
      dailyGoal:     { totalMinutes: 0, pyqCount: 0, mockCount: 0, lessonCount: 0, revisionCount: 0, expectedGain: 0 },
      streakMessage: null,
      activeRule:    'empty',
    };
  }

  const daysMock   = daysSince(last_mock_date);
  const avgScore   = accuracy * 2.4;
  const needMarks  = prediction.marksNeeded;
  const trend      = prediction.trend;

  // Sort subjects by accuracy ascending (worst first), skip >82%
  const sorted = [...subject_performance].sort((a, b) => a.accuracy - b.accuracy);
  const actionable = sorted.filter(sp => sp.accuracy <= 82);
  const worst   = actionable[0];
  const second  = actionable[1];
  const allStrong = subject_performance.every(sp => sp.accuracy >= 75);
  const isConsistencyGap = best_score > 0 && (best_score - avgScore) > 25;

  // ── R8: Coach message ────────────────────────────────────────────────────────

  let coachMessage: CoachMessage;

  if (allStrong) {
    // R7 — milestone
    coachMessage = {
      headline: `All subjects above 75% — you're in the selection zone`,
      subline:  'Take a full mock to validate your level.',
      type:     'milestone',
      emoji:    '🏆',
    };
  } else if (isConsistencyGap) {
    // R6 — consistency
    coachMessage = {
      headline: `Your best score was ${Math.round(best_score)} but your average is ${Math.round(avgScore)}`,
      subline:  'Consistency is your biggest gap right now.',
      type:     'strategy',
      emoji:    '📊',
    };
  } else if (trend === 'Improving' && streak_days >= 3) {
    // R4+R5 — momentum
    coachMessage = {
      headline: `You're on a ${streak_days}-day streak and your scores are rising`,
      subline:  'This is the momentum that toppers build. Keep it going.',
      type:     'encouragement',
      emoji:    '🔥',
    };
  } else if (trend === 'Declining') {
    // R5 — declining
    coachMessage = {
      headline: 'Your recent performance is dipping — slow down on mocks',
      subline:  'Revise concepts first. Mocks won\'t help until you solidify basics.',
      type:     'warning',
      emoji:    '⚠️',
    };
  } else if (needMarks > 0 && needMarks <= 15) {
    // R3 — close to cutoff
    coachMessage = {
      headline: `Only ${needMarks} marks from safe zone — you're almost there`,
      subline:  'One focused week is all you need.',
      type:     'strategy',
      emoji:    '🎯',
    };
  } else if (worst && worst.accuracy < 55) {
    // R1 — weak subject cost
    const cost = weeklyMarkCost(worst.accuracy);
    coachMessage = {
      headline: `${worst.subject} is costing you ~${cost} marks every week`,
      subline:  `Don't study other subjects today. Fix ${worst.subject} first.`,
      type:     'warning',
      emoji:    '🚨',
    };
  } else if (streak_days >= 5) {
    // R4 — strong streak
    coachMessage = {
      headline: `${streak_days}-day streak — you're building the habit that toppers have`,
      subline:  'Stay consistent. Your prediction will improve this week.',
      type:     'encouragement',
      emoji:    '⚡',
    };
  } else {
    coachMessage = {
      headline: worst
        ? `Focus on ${worst.subject} today — it's your highest-ROI subject right now`
        : 'Solve 15 PYQs daily and your rank will move significantly',
      subline:  'Small, consistent sessions beat long random ones.',
      type:     'strategy',
      emoji:    '📚',
    };
  }

  // ── Build priority tasks ─────────────────────────────────────────────────────

  const tasks: CoachTask[] = [];

  // R7 — all strong → full mock
  if (allStrong) {
    tasks.push({
      id:        'r7-fullmock',
      priority:  1,
      title:     'Take a Full Mock Test',
      subject:   'All Subjects',
      detail:    'All subjects above 75% · Test your peak',
      type:      'mock',
      duration:  30,
      marksGain: 5,
      reason:    'All subjects above target — full mock will validate your level',
      badge:     'QUICK WIN',
      session:   'morning',
    });
  }

  // R1 — worst subject revision (if below 82%)
  if (worst && !allStrong) {
    const acc     = Math.round(worst.accuracy);
    const topic   = topicFor(worst.subject, worst.accuracy);
    const gain    = estimateGain(worst.accuracy);
    const b       = badge(worst.accuracy, daysMock);
    const dur     = worst.accuracy < 55 ? 25 : 20;

    tasks.push({
      id:        `r1-${worst.subject}`,
      priority:  1,
      title:     `Revise ${topic}`,
      subject:   worst.subject,
      detail:    `${acc}% accuracy · ${dur} min`,
      type:      'revision',
      duration:  dur,
      marksGain: gain,
      reason:    `${worst.subject} is your weakest subject — highest mark potential`,
      badge:     b,
      session:   'morning',
    });
  }

  // R1 — second worst (if different and below 82%)
  if (second && tasks.length < 3) {
    const acc   = Math.round(second.accuracy);
    const topic = topicFor(second.subject, second.accuracy);
    const gain  = estimateGain(second.accuracy);

    tasks.push({
      id:        `r1b-${second.subject}`,
      priority:  tasks.length + 1 as 1 | 2 | 3,
      title:     `Solve 15 ${second.subject} PYQs`,
      subject:   second.subject,
      detail:    `${acc}% accuracy · 15 min · Previous Year Questions`,
      type:      'pyq',
      duration:  15,
      marksGain: Math.max(1, gain - 1),
      reason:    `${second.subject} is your second priority — PYQs reinforce weak spots`,
      badge:     acc < 65 ? 'HIGH' : 'QUICK WIN',
      session:   'afternoon',
    });

    // Also add a lesson for the second subject
    if (tasks.length < 3) {
      tasks.push({
        id:        `r1c-lesson-${second.subject}`,
        priority:  tasks.length + 1 as 1 | 2 | 3,
        title:     `${topic} — Smart Lesson`,
        subject:   second.subject,
        detail:    `10 min · Concept reinforcement`,
        type:      'lesson',
        duration:  10,
        marksGain: 1,
        reason:    `Concept lesson before PYQs improves retention`,
        badge:     'HIGH',
        session:   'morning',
      });
    }
  }

  // R2 — no mock in 3+ days
  if (daysMock >= 3 && tasks.length < 3 && !allStrong) {
    const urgency = daysMock >= 7 ? 'URGENT' : 'SCHEDULED';
    tasks.push({
      id:        'r2-mock',
      priority:  tasks.length + 1 as 1 | 2 | 3,
      title:     'Take a Quick Mock Test',
      subject:   'All Subjects',
      detail:    `No mock for ${daysMock < 999 ? daysMock : '7+'} days · 20 min`,
      type:      'mock',
      duration:  20,
      marksGain: 3,
      reason:    `Regular mocks are essential — ${daysMock} days without one`,
      badge:     urgency,
      session:   'evening',
    });
  }

  // R5 — declining → force revision, no mock
  if (trend === 'Declining' && tasks.length < 3) {
    const subj = worst?.subject ?? 'Physics';
    tasks.push({
      id:        'r5-revise',
      priority:  tasks.length + 1 as 1 | 2 | 3,
      title:     `Deep Revision Session — ${subj}`,
      subject:   subj,
      detail:    'Concepts only · No timing pressure',
      type:      'revision',
      duration:  20,
      marksGain: 2,
      reason:    'Declining trend — revision rebuilds foundation',
      badge:     'HIGH',
      session:   'afternoon',
    });
  }

  // R3 — close to cutoff → PYQ sprint
  if (needMarks > 0 && needMarks <= 15 && tasks.length < 3) {
    tasks.push({
      id:        'r3-pyq',
      priority:  tasks.length + 1 as 1 | 2 | 3,
      title:     'PYQ Sprint — Mixed Subjects',
      subject:   'All Subjects',
      detail:    `Only ${needMarks} marks from safe zone · 20 min`,
      type:      'pyq',
      duration:  20,
      marksGain: 2,
      reason:    `${needMarks} marks from safe zone — targeted PYQs close this gap`,
      badge:     'QUICK WIN',
      session:   'afternoon',
    });
  }

  // R6 — consistency gap → mock (not revision)
  if (isConsistencyGap && tasks.length < 3) {
    tasks.push({
      id:        'r6-consistency',
      priority:  tasks.length + 1 as 1 | 2 | 3,
      title:     'Timed Mock — Simulate Exam Conditions',
      subject:   'All Subjects',
      detail:    `Best: ${Math.round(best_score)} · Avg: ${Math.round(avgScore)} · Consistency gap`,
      type:      'mock',
      duration:  25,
      marksGain: 3,
      reason:    'Consistent performance under pressure narrows best-avg gap',
      badge:     'SCHEDULED',
      session:   'evening',
    });
  }

  // Fallback filler to always have 3 tasks
  const fillers: Omit<CoachTask, 'priority'>[] = [
    {
      id:        'fill-pyq',
      title:     'Solve 15 Mixed PYQs',
      subject:   'All Subjects',
      detail:    '15 min · IAT Previous Year Questions',
      type:      'pyq',
      duration:  15,
      marksGain: 2,
      reason:    'Daily PYQ practice is the single highest-ROI study habit',
      badge:     'QUICK WIN',
      session:   'afternoon',
    },
    {
      id:        'fill-lesson',
      title:     'Smart Lesson — Weak Chapter',
      subject:   worst?.subject ?? 'Physics',
      detail:    '10 min · Concept overview',
      type:      'lesson',
      duration:  10,
      marksGain: 1,
      reason:    'Short focused lessons improve retention by 40%',
      badge:     'SCHEDULED',
      session:   'morning',
    },
  ];
  let fi = 0;
  while (tasks.length < 3 && fi < fillers.length) {
    tasks.push({ ...fillers[fi++], priority: tasks.length + 1 as 1 | 2 | 3 });
  }

  // Clamp to 3 tasks, correct priorities
  const priorityTasks = tasks.slice(0, 3).map((t, i) => ({
    ...t,
    priority: (i + 1) as 1 | 2 | 3,
  }));

  // ── Session plan ──────────────────────────────────────────────────────────────

  const bySession = (s: TaskSession) => priorityTasks.filter(t => t.session === s);

  // Ensure evening has mock if applicable
  const morningTasks   = bySession('morning');
  const afternoonTasks = bySession('afternoon');
  const eveningTasks   = bySession('evening');

  // If nothing in a session, add a short filler
  const sessionPlan: SessionSlot[] = [
    {
      session:   'morning' as TaskSession,
      label:     'Morning',
      emoji:     '🌅',
      timeRange: '6 – 9 AM',
      tasks:     morningTasks,
      totalMins: morningTasks.reduce((s, t) => s + t.duration, 0),
    },
    {
      session:   'afternoon' as TaskSession,
      label:     'Afternoon',
      emoji:     '☀️',
      timeRange: '2 – 5 PM',
      tasks:     afternoonTasks,
      totalMins: afternoonTasks.reduce((s, t) => s + t.duration, 0),
    },
    {
      session:   'evening' as TaskSession,
      label:     'Evening',
      emoji:     '🌙',
      timeRange: '7 – 10 PM',
      tasks:     eveningTasks,
      totalMins: eveningTasks.reduce((s, t) => s + t.duration, 0),
    },
  ].filter(s => s.tasks.length > 0);


  // ── Daily goal ────────────────────────────────────────────────────────────────

  const dailyGoal: DailyGoal = {
    totalMinutes:  priorityTasks.reduce((s, t) => s + t.duration, 0),
    pyqCount:      priorityTasks.filter(t => t.type === 'pyq').length * 15,
    mockCount:     priorityTasks.filter(t => t.type === 'mock').length,
    lessonCount:   priorityTasks.filter(t => t.type === 'lesson').length,
    revisionCount: priorityTasks.filter(t => t.type === 'revision').length,
    expectedGain:  priorityTasks.reduce((s, t) => s + t.marksGain, 0),
  };

  // ── Streak message ────────────────────────────────────────────────────────────

  let streakMessage: string | null = null;
  if (streak_days >= 7)     streakMessage = `🔥 ${streak_days}-day streak — you're in the top 5% of consistent students`;
  else if (streak_days >= 3) streakMessage = `⚡ ${streak_days}-day streak — keep this pace and your rank will move`;
  else if (streak_days === 0) streakMessage = '📅 Start your streak today — day 1 is the hardest';

  // ── Active rule (for debug / transparency) ────────────────────────────────────

  const activeRule = allStrong ? 'R7-all-strong'
    : isConsistencyGap         ? 'R6-consistency'
    : trend === 'Declining'    ? 'R5-declining'
    : trend === 'Improving' && streak_days >= 3 ? 'R4+R5-momentum'
    : needMarks <= 15 && needMarks > 0 ? 'R3-cutoff-proximity'
    : daysMock >= 3            ? 'R2-mock-cadence'
    : 'R1-subject-priority';

  return {
    coachMessage,
    priorityTasks,
    sessionPlan,
    dailyGoal,
    streakMessage,
    activeRule,
    isReady: true,
  };
}
