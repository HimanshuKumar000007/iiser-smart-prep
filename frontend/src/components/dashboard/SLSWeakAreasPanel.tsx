/**
 * SLSWeakAreasPanel — Real weakness data from /api/sls/weaknesses
 *
 * Shows weak chapters (with accuracy/trend) and weak topics.
 * Falls back to the generic empty state when no weakness data.
 *
 * Each chapter card navigates to /smart-lessons/<chapterId> on click.
 */

import { motion } from 'motion/react';
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Target, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { SlsWeaknessResponse } from '../../types/sls';

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', color: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'border-rose-500/20'   },
  high:     { label: 'High',     color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  moderate: { label: 'Moderate', color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  mild:     { label: 'Mild',     color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
};

interface Props {
  weaknesses: SlsWeaknessResponse | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

export function SLSWeakAreasPanel({ weaknesses, loading, onNavigate }: Props) {
  const hasData = !!(weaknesses?.hasData);
  const weakChapters = weaknesses?.weaknessAnalysis?.weakChapters?.slice(0, 4) ?? [];
  const weakTopics   = weaknesses?.weaknessAnalysis?.weakTopics?.slice(0, 2) ?? [];
  const summary      = weaknesses?.weaknessAnalysis?.summary;

  return (
    <div className="bg-panel border border-panel-border rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-display font-semibold text-lg mb-1 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Weak Area Engine
          </h3>
          <p className="text-white/50 text-sm">
            {hasData && summary
              ? `${summary.totalWeakChapters} weak chapter${summary.totalWeakChapters !== 1 ? 's' : ''} · ${summary.totalWeakTopics} weak topic${summary.totalWeakTopics !== 1 ? 's' : ''}`
              : 'Evidence-backed weaknesses from quiz data'}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Loading skeletons */}
        {loading && [1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex justify-between mb-3">
              <Skeleton className="w-28 h-4" />
              <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-full h-1.5 rounded-full" />
            <Skeleton className="w-20 h-3 mt-3" />
          </div>
        ))}

        {/* Empty state — no SLS data yet */}
        {!loading && !hasData && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center py-6 text-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
              <Target className="w-7 h-7 text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Complete a Smart Lesson quiz</p>
              <p className="text-xs text-white/35 leading-relaxed">
                SLS will detect weak chapters and topics from your quiz performance
              </p>
            </div>
            <div className="w-full space-y-2">
              {['Evidence-backed weak chapters', 'Topic-level accuracy gaps', 'Speed problem detection'].map(item => (
                <div key={item} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xs font-bold text-emerald-400">✓</span>
                  <span className="text-xs text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All strong — no weaknesses */}
        {!loading && hasData && weakChapters.length === 0 && weakTopics.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-white/60">All chapters above weakness threshold! 🔥</p>
            <p className="text-xs text-white/30">Keep attempting more chapters to maintain momentum</p>
          </div>
        )}

        {/* Weak Chapter Cards */}
        {!loading && hasData && weakChapters.map((chapter, i) => {
          const scfg = SEVERITY_CONFIG[chapter.severity] ?? SEVERITY_CONFIG.mild;
          
          const hasTrend = chapter.attempts >= 2 && chapter.trend !== 'insufficient_history';
          const isDeclining = hasTrend && (chapter.trend === 'declining' || chapter.improvementPercentagePoints < -5);
          const isImproving = hasTrend && (chapter.trend === 'improving' || chapter.improvementPercentagePoints > 5);
          const isStable = hasTrend && !isDeclining && !isImproving;

          const evidenceLabelMap: Record<string, string> = {
            low: 'Limited',
            medium: 'Sufficient',
            high: 'Strong',
            insufficient: 'No Evidence'
          };
          const evidenceLabel = evidenceLabelMap[chapter.evidenceLevel] || 'Limited';

          return (
            <motion.div
              key={chapter.chapterId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onNavigate?.(`/smart-lessons/${chapter.chapterId}`)}
              className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 hover:bg-white/8 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-1 bottom-0 bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />

              <div className="flex justify-between items-start mb-1 pl-1">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{chapter.chapterTitle || chapter.chapterId}</h4>
                  <p className="text-[10px] text-white/30 mt-0.5">{chapter.subject}</p>
                </div>
                <span className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 uppercase',
                  scfg.color, scfg.bg, scfg.border,
                )}>
                  {chapter.severity} Priority
                </span>
              </div>

              <p className="text-[11px] text-white/40 pl-1 mb-1">
                {Math.round(chapter.accuracy)}% accuracy · {chapter.questionsAttempted || chapter.totalQuestions || 0} questions answered
              </p>

              <div className="text-[10px] text-white/40 pl-1 mb-2.5">
                Evidence: <span className="font-semibold text-white/60">{evidenceLabel}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2.5 ml-1">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-1000"
                  style={{ width: `${Math.max(2, chapter.accuracy)}%` }}
                />
              </div>

              <div className="flex items-center justify-between pl-1">
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  isDeclining ? 'text-rose-400' : isImproving ? 'text-emerald-400' : isStable ? 'text-white/40' : 'text-white/20',
                )}>
                  {isDeclining ? <TrendingDown className="w-3.5 h-3.5" /> : isImproving ? <TrendingUp className="w-3.5 h-3.5" /> : null}
                  {isDeclining ? 'Declining' : isImproving ? 'Improving' : isStable ? 'Stable' : 'Not Enough Data'}
                </div>
                <button className="text-xs text-white/40 group-hover:text-white flex items-center gap-1 transition-colors font-medium">
                  <BookOpen className="w-3 h-3" />
                  Revise <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Weak Topics (compact, shown after chapter cards) */}
        {!loading && hasData && weakTopics.length > 0 && (
          <div className="pt-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Weak Topics</p>
            <div className="space-y-1.5">
              {weakTopics.map(topic => (
                <div
                  key={`${topic.chapterId}-${topic.topicId}`}
                  onClick={() => onNavigate?.(`/smart-lessons/${topic.chapterId}`)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all cursor-pointer group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-white truncate">{topic.topicTitle || topic.topicId}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">
                      {Math.round(topic.accuracy)}% accuracy · {topic.questionsAttempted || topic.questionCount || 0} questions answered
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/40 group-hover:text-white/60 transition-colors font-medium ml-2 flex-shrink-0">
                    Practice Topic
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 transition-all group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

