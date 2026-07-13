/**
 * QuizResultsScreen — Smart Quiz Results Screen (SLS Step 11)
 *
 * Shown immediately after quiz submission succeeds (quizFinished = true).
 * Two-phase rendering:
 *
 *   Phase 1 (instant): Computes all metrics from local attempt data
 *     - Score, accuracy, time, correct/wrong/skipped
 *     - Per-topic performance grouped from questions[]
 *     - Per-difficulty breakdown
 *     - Speed analysis (actual vs estimated time)
 *
 *   Phase 2 (async, ~1s): Fetches GET /api/sls/recommendations
 *     - Extracts the top recommendation for this chapter
 *     - Shows "Follow Recommendation" CTA if available
 *     - Gracefully degrades to "Back to Dashboard" only if fetch fails
 *
 * This component receives all data it needs from LessonReader via props —
 * no new backend endpoints, no database tables.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2, XCircle, MinusCircle, Clock, Zap,
  TrendingUp, TrendingDown, Minus, Brain, ArrowRight,
  LayoutDashboard, RotateCcw, Target, BookOpen,
  ChevronDown, ChevronUp, Sparkles, Trophy,
} from 'lucide-react';
import type { QuizQuestion } from '../../data/lessonContent';
import { cn } from '../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────

interface QuizAttemptData {
  questions: QuizQuestion[];
  /** null = skipped/unanswered */
  selectedAnswers: (number | null)[];
  /** time per question in seconds */
  questionTimes: number[];
  /** lesson meta */
  lessonId: string;
  lessonTitle: string;
  subject: string;
}

interface TopicRow {
  topicId: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  totalTime: number;
  avgEstimated: number;
  speedRatio: number;
}

interface TopSLSRecommendation {
  actionType: string;
  chapterId: string | null;
  chapterTitle: string | null;
  urgency: string;
  evidence: { accuracy: number } | null;
}

// ── Helpers ──────────────────────────────────────────────────────────

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  return s === 0 ? `${m} min` : `${m}m ${s}s`;
}

function getScoreGrade(accuracy: number): { label: string; color: string; bg: string; border: string } {
  if (accuracy >= 90) return { label: 'Excellent',    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' };
  if (accuracy >= 75) return { label: 'Good',         color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25'    };
  if (accuracy >= 55) return { label: 'Needs Work',   color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25'   };
  return               { label: 'Critical Gap',  color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/25'    };
}

function getSpeedLabel(ratio: number, accuracy?: number): { label: string; color: string; icon: React.ReactNode } {
  if (ratio < 0.8) {
    // Fast but was it precise or careless?
    const acc = accuracy ?? 100;
    if (acc >= 70) return { label: 'Fast & Accurate', color: 'text-cyan-400',  icon: <Zap className="w-3.5 h-3.5" /> };
    return               { label: 'Rushing',          color: 'text-amber-400', icon: <Zap className="w-3.5 h-3.5" /> };
  }
  if (ratio <= 1.2) return { label: 'On Time', color: 'text-emerald-400', icon: <Minus className="w-3.5 h-3.5" /> };
  return               { label: 'Slow',   color: 'text-amber-400',   icon: <Clock className="w-3.5 h-3.5" /> };
}

// Compute the circumference path for the accuracy ring
const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function AccuracyRing({ accuracy }: { accuracy: number }) {
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - accuracy / 100);
  const grade = getScoreGrade(accuracy);
  const strokeColor =
    accuracy >= 90 ? '#10b981' :
    accuracy >= 75 ? '#06b6d4' :
    accuracy >= 55 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Track */}
        <circle cx="50" cy="50" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Progress */}
        <circle
          cx="50" cy="50" r={RING_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${strokeColor}55)` }}
        />
      </svg>
      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-2xl font-display font-black leading-none', grade.color)}>
          {Math.round(accuracy)}%
        </span>
        <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">
          {grade.label}
        </span>
      </div>
    </div>
  );
}

// ── Recommendation action label + CTA text ────────────────────────────

function actionCTA(actionType: string): { label: string; destination: string } {
  switch (actionType) {
    case 'REVISE_CHAPTER':      return { label: 'Revise Chapter',   destination: 'lesson'  };
    case 'RETRY_CHAPTER_QUIZ':  return { label: 'Retry This Quiz',  destination: 'quiz'    };
    case 'PRACTICE_TOPIC':      return { label: 'Practice Topics',  destination: 'lesson'  };
    case 'PRACTICE_DIFFICULTY': return { label: 'Practice More',    destination: 'lesson'  };
    case 'CONTINUE_LEARNING':
    default:                    return { label: 'Continue Learning', destination: 'next'   };
  }
}

// ── Main Component ─────────────────────────────────────────────────────

interface Props {
  attempt: QuizAttemptData;
  onNavigate?: (view: string) => void;
  onRetakeQuiz?: () => void;
}

export function QuizResultsScreen({ attempt, onNavigate, onRetakeQuiz }: Props) {
  const { questions, selectedAnswers, questionTimes, lessonId, lessonTitle, subject } = attempt;

  // ── Phase 1: Instant local metrics ───────────────────────────────────

  const metrics = useMemo(() => {
    let correct = 0, wrong = 0, skipped = 0;
    let totalTime = 0, totalEstimated = 0;

    const topicMap: Record<string, { total: number; correct: number; wrong: number; skipped: number; time: number; estimated: number }> = {};
    const diffMap: Record<string, { total: number; correct: number; time: number; estimated: number }> = {};

    questions.forEach((q, i) => {
      const sel = selectedAnswers[i];
      const t = questionTimes[i] ?? 0;
      totalTime += t;
      totalEstimated += q.estimatedTimeSeconds;

      // outcome
      if (sel === null || sel === undefined) {
        skipped++;
      } else if (sel === q.correctAnswerIndex) {
        correct++;
      } else {
        wrong++;
      }

      // topic rollup
      if (!topicMap[q.topicId]) topicMap[q.topicId] = { total: 0, correct: 0, wrong: 0, skipped: 0, time: 0, estimated: 0 };
      topicMap[q.topicId].total++;
      topicMap[q.topicId].time += t;
      topicMap[q.topicId].estimated += q.estimatedTimeSeconds;
      if (sel === null || sel === undefined) topicMap[q.topicId].skipped++;
      else if (sel === q.correctAnswerIndex) topicMap[q.topicId].correct++;
      else topicMap[q.topicId].wrong++;

      // difficulty rollup
      if (!diffMap[q.difficulty]) diffMap[q.difficulty] = { total: 0, correct: 0, time: 0, estimated: 0 };
      diffMap[q.difficulty].total++;
      diffMap[q.difficulty].time += t;
      diffMap[q.difficulty].estimated += q.estimatedTimeSeconds;
      if (sel === q.correctAnswerIndex) diffMap[q.difficulty].correct++;
    });

    const accuracy = questions.length > 0 ? (correct / questions.length) * 100 : 0;
    const speedRatio = totalEstimated > 0 ? totalTime / totalEstimated : 1;

    const topics: TopicRow[] = Object.entries(topicMap).map(([topicId, d]) => ({
      topicId,
      total: d.total,
      correct: d.correct,
      wrong: d.wrong,
      skipped: d.skipped,
      accuracy: d.total > 0 ? (d.correct / d.total) * 100 : 0,
      totalTime: d.time,
      avgEstimated: d.estimated / d.total,
      speedRatio: d.estimated > 0 ? d.time / d.estimated : 1,
    })).sort((a, b) => a.accuracy - b.accuracy); // weakest first

    return {
      correct, wrong, skipped,
      totalTime, totalEstimated,
      accuracy, speedRatio,
      topics,
      diffMap,
    };
  }, [questions, selectedAnswers, questionTimes]);

  // ── Phase 2: Async SLS recommendation fetch ───────────────────────────

  const [slsRec, setSlsRec] = useState<TopSLSRecommendation | null>(null);
  const [slsLoading, setSlsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) { setSlsLoading(false); return; }

    const API_BASE = (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    fetch(`${API_BASE}/api/sls/recommendations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled || !data?.recommendations?.length) { setSlsLoading(false); return; }
        // Prefer a recommendation for THIS chapter; otherwise use global top
        const forThisChapter = data.recommendations.find(
          (r: any) => r.chapterId === lessonId
        );
        const top = forThisChapter ?? data.recommendations[0];
        if (!cancelled) {
          setSlsRec({
            actionType: top.actionType,
            chapterId: top.chapterId,
            chapterTitle: top.chapterTitle ?? lessonTitle,
            urgency: top.urgency,
            evidence: top.evidence ?? null,
          });
          setSlsLoading(false);
        }
      })
      .catch(() => { if (!cancelled) setSlsLoading(false); });

    return () => { cancelled = true; };
  }, [lessonId, lessonTitle]);

  // ── Navigation helpers ────────────────────────────────────────────────

  const [showTopics, setShowTopics] = useState(false);

  function handleRecommendation() {
    if (!slsRec?.chapterId) { onNavigate?.('dashboard'); return; }
    const dest = actionCTA(slsRec.actionType).destination;
    if (dest === 'quiz')   onNavigate?.(`/smart-lessons/${slsRec.chapterId}::quiz`);
    else if (dest === 'lesson') onNavigate?.(`/smart-lessons/${slsRec.chapterId}`);
    else onNavigate?.('smart_lessons');
  }

  const grade = getScoreGrade(metrics.accuracy);
  const speed = getSpeedLabel(metrics.speedRatio, metrics.accuracy);

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto w-full space-y-5 pb-24 px-1"
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-6 rounded-3xl bg-gradient-to-br from-[#0D0F20] via-[#0A0C18] to-[#0D0F20] border border-white/10 relative overflow-hidden">
        {/* Ambient glow */}
        <div className={cn(
          'absolute -top-32 -right-32 w-72 h-72 blur-[120px] rounded-full pointer-events-none opacity-40',
          metrics.accuracy >= 75 ? 'bg-emerald-500/30' : metrics.accuracy >= 55 ? 'bg-amber-500/25' : 'bg-rose-500/25',
        )} />

        {/* Accuracy Ring */}
        <div className="relative z-10 flex-shrink-0">
          <AccuracyRing accuracy={metrics.accuracy} />
        </div>

        {/* Score info */}
        <div className="relative z-10 flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className={cn(
              'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border',
              grade.color, grade.bg, grade.border,
            )}>
              {grade.label}
            </span>
            {metrics.accuracy >= 80 && (
              <span className="text-[10px] font-bold text-white/30 flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" /> Great work!
              </span>
            )}
          </div>

          <h2 className="text-3xl font-display font-black text-white leading-none mb-1">
            {metrics.correct}{' '}
            <span className="text-white/25 text-xl font-bold">/ {questions.length}</span>
          </h2>
          <p className="text-sm text-white/40 mb-4">{lessonTitle} · {subject}</p>

          {/* Stat row */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-bold text-emerald-400">{metrics.correct}</span>
              <span className="text-white/35">correct</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="font-bold text-rose-400">{metrics.wrong}</span>
              <span className="text-white/35">wrong</span>
            </div>
            {metrics.skipped > 0 && (
              <div className="flex items-center gap-1.5 text-sm">
                <MinusCircle className="w-4 h-4 text-white/30 flex-shrink-0" />
                <span className="font-bold text-white/50">{metrics.skipped}</span>
                <span className="text-white/35">skipped</span>
              </div>
            )}
            <div className={cn('flex items-center gap-1.5 text-sm', speed.color)}>
              {speed.icon}
              <span className="font-bold">{speed.label}</span>
              <span className="text-white/35 text-xs">({formatTime(metrics.totalTime)} total)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Topic Performance ────────────────────────────────────────────── */}
      {metrics.topics.length > 0 && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden">
          <button
            onClick={() => setShowTopics(v => !v)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-sm font-bold text-white">Topic Performance</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Quick summary pills */}
              {metrics.topics.filter(t => t.accuracy < 50).length > 0 && (
                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                  {metrics.topics.filter(t => t.accuracy < 50).length} weak
                </span>
              )}
              {metrics.topics.filter(t => t.accuracy >= 80).length > 0 && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {metrics.topics.filter(t => t.accuracy >= 80).length} strong
                </span>
              )}
              {showTopics
                ? <ChevronUp className="w-4 h-4 text-white/30" />
                : <ChevronDown className="w-4 h-4 text-white/30" />
              }
            </div>
          </button>

          <AnimatePresence>
            {showTopics && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2.5 border-t border-white/5 pt-3">
                  {metrics.topics.map(topic => {
                    const topicAccuracy = Math.round(topic.accuracy);
                    const topicSpeed = getSpeedLabel(topic.speedRatio, topic.accuracy);
                    const barColor =
                      topicAccuracy >= 80 ? 'bg-emerald-500' :
                      topicAccuracy >= 55 ? 'bg-amber-400' : 'bg-rose-500';

                    return (
                      <div key={topic.topicId} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-semibold text-white/80 truncate capitalize">
                              {topic.topicId.replace(/-/g, ' ')}
                            </span>
                            <span className={cn('text-[10px] flex items-center gap-0.5', topicSpeed.color)}>
                              {topicSpeed.icon}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                            <span className="text-[10px] text-white/35">
                              {topic.correct}/{topic.total}
                            </span>
                            <span className={cn(
                              'text-xs font-black',
                              topicAccuracy >= 80 ? 'text-emerald-400' :
                              topicAccuracy >= 55 ? 'text-amber-400' : 'text-rose-400',
                            )}>
                              {topicAccuracy}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${topicAccuracy}%` }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={cn('h-full rounded-full', barColor)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Speed & Difficulty Snapshot ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Speed card */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Speed</p>
          <div className="flex items-end gap-2 mb-2">
            <span className={cn('text-xl font-display font-black', speed.color)}>{speed.label}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/35">Your time</span>
              <span className="text-white/60 font-semibold">{formatTime(metrics.totalTime)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/35">Expected</span>
              <span className="text-white/60 font-semibold">{formatTime(metrics.totalEstimated)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-white/35">Ratio</span>
              <span className={cn('font-bold', speed.color)}>
                {metrics.speedRatio.toFixed(2)}×
              </span>
            </div>
          </div>
        </div>

        {/* Difficulty card */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">By Difficulty</p>
          <div className="space-y-2">
            {(['easy', 'medium', 'hard'] as const).map(diff => {
              const d = metrics.diffMap[diff];
              if (!d) return null;
              const acc = Math.round((d.correct / d.total) * 100);
              const diffColor =
                diff === 'easy' ? 'text-emerald-400' :
                diff === 'medium' ? 'text-amber-400' : 'text-rose-400';
              return (
                <div key={diff} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn('text-[10px] font-black capitalize', diffColor)}>{diff}</span>
                    <span className="text-[10px] text-white/25">({d.total}q)</span>
                  </div>
                  <span className={cn('text-xs font-bold', acc >= 70 ? 'text-emerald-400' : acc >= 50 ? 'text-amber-400' : 'text-rose-400')}>
                    {acc}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SLS Recommendation ──────────────────────────────────────────── */}
      <div className="rounded-2xl border overflow-hidden relative">
        {/* Purple gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-indigo-500/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/8 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 border-white/10">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-wider">SLS Recommendation</p>
              <p className="text-[10px] text-white/35">Based on your attempt + learning history</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[9px] font-black text-purple-300/70 bg-purple-500/10 border border-purple-500/15 px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" />
              Live
            </div>
          </div>

          <div className="px-5 py-4">
            {slsLoading ? (
              /* Skeleton while fetching */
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-white/8 rounded-lg w-3/4" />
                <div className="h-3 bg-white/5 rounded-lg w-1/2" />
                <div className="h-9 bg-white/8 rounded-xl mt-2" />
              </div>
            ) : slsRec ? (
              <div className="space-y-4">
                {/* Recommendation text */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn(
                      'text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border',
                      slsRec.urgency === 'immediate' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                      slsRec.urgency === 'high'      ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                      slsRec.urgency === 'moderate'  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                                                       'text-blue-400 bg-blue-500/10 border-blue-500/20',
                    )}>
                      {slsRec.urgency}
                    </span>
                    {slsRec.evidence && (
                      <span className="text-[10px] text-white/30">
                        Chapter accuracy: <span className="text-white/55 font-bold">{Math.round(slsRec.evidence.accuracy)}%</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-white leading-snug">
                    {actionCTA(slsRec.actionType).label}
                    {slsRec.chapterTitle && slsRec.chapterId !== lessonId
                      ? `: ${slsRec.chapterTitle}`
                      : ` for ${lessonTitle}`
                    }
                  </p>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    {slsRec.actionType === 'REVISE_CHAPTER'     && 'Re-read the core concepts and formula summary.'}
                    {slsRec.actionType === 'RETRY_CHAPTER_QUIZ' && 'Take this quiz again — aim for ≥ 80% to move to STRONG mastery.'}
                    {slsRec.actionType === 'PRACTICE_TOPIC'     && 'Focus on the specific topics where you lost marks.'}
                    {slsRec.actionType === 'PRACTICE_DIFFICULTY'&& 'Work through questions at the difficulty level where you struggled.'}
                    {slsRec.actionType === 'CONTINUE_LEARNING'  && 'Great score! Move on to the next chapter to maintain momentum.'}
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleRecommendation}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20"
                  >
                    {actionCTA(slsRec.actionType).destination === 'quiz'
                      ? <RotateCcw className="w-4 h-4" />
                      : <BookOpen className="w-4 h-4" />
                    }
                    {actionCTA(slsRec.actionType).label}
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                  <button
                    onClick={() => onNavigate?.('dashboard')}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                </div>
              </div>
            ) : (
              /* SLS unavailable — simple fallback buttons */
              <div className="space-y-2.5">
                <p className="text-sm text-white/50">Complete more chapters to unlock personalised recommendations.</p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {onRetakeQuiz && (
                    <button
                      onClick={onRetakeQuiz}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/[0.08] hover:bg-white/[0.13] border border-white/10 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retry Quiz
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate?.('dashboard')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98] shadow-lg"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Secondary actions ────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {onRetakeQuiz && (
          <button
            onClick={onRetakeQuiz}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Quiz
          </button>
        )}
        <button
          onClick={() => onNavigate?.(`/smart-lessons/${lessonId}`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 text-xs font-semibold transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Re-read Lesson
        </button>
        <button
          onClick={() => onNavigate?.('smart_lessons')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80 text-xs font-semibold transition-all"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Chapter Library
        </button>
      </div>

    </motion.div>
  );
}
