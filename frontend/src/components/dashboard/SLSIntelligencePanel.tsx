/**
 * SLSIntelligencePanel — SLS-powered revision & recommendation panel
 *
 * Replaces SmartRevision when SLS data is available.
 * Renders:
 *   1. Top recommendation (from /api/sls/recommendations)
 *   2. Mastery state summary counts (from /api/sls/mastery)
 *   3. Due revision items (from /api/sls/revision-queue)
 *
 * Falls back to SmartRevision (rule-based) when SLS has no data.
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  BrainCircuit, Sparkles, CheckCircle2, Trophy,
  Clock, BookOpen, ChevronRight, Zap,
  FlaskConical, Calculator, Dna,
} from 'lucide-react';
import { SLSNextActionCard } from './SLSNextActionCard';
import { cn } from '../../lib/utils';
import type {
  SlsRecommendationsResponse,
  SlsMasteryResponse,
  SlsRevisionResponse,
  SlsMasteryState,
} from '../../types/sls';

// ── Mastery state config ───────────────────────────────────────────────
const MASTERY_DISPLAY: Record<SlsMasteryState, { label: string; color: string; bg: string }> = {
  NEW:       { label: 'New',       color: 'text-white/40',    bg: 'bg-white/5'           },
  LEARNING:  { label: 'Learning',  color: 'text-blue-400',    bg: 'bg-blue-500/10'       },
  WEAK:      { label: 'Weak',      color: 'text-rose-400',    bg: 'bg-rose-500/10'       },
  IMPROVING: { label: 'Improving', color: 'text-amber-400',   bg: 'bg-amber-500/10'      },
  STRONG:    { label: 'Strong',    color: 'text-emerald-400', bg: 'bg-emerald-500/10'    },
  MASTERED:  { label: 'Mastered',  color: 'text-purple-400',  bg: 'bg-purple-500/10'     },
};

// ── Urgency colour for revision items ─────────────────────────────────
function urgencyColor(urgency: string) {
  switch (urgency) {
    case 'high':      return 'text-orange-400';
    case 'moderate':  return 'text-amber-400';
    case 'low':       return 'text-blue-400';
    default:          return 'text-rose-400'; // immediate
  }
}

// ── Subject icon ──────────────────────────────────────────────────────
function SubjectIcon({ subject, className }: { subject: string; className?: string }) {
  switch (subject) {
    case 'Physics':     return <Zap className={className} />;
    case 'Chemistry':   return <FlaskConical className={className} />;
    case 'Mathematics': return <Calculator className={className} />;
    case 'Biology':     return <Dna className={className} />;
    default:            return <BookOpen className={className} />;
  }
}

// ── Skeleton ───────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

interface Props {
  recommendations: SlsRecommendationsResponse | null;
  mastery: SlsMasteryResponse | null;
  revision: SlsRevisionResponse | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

export function SLSIntelligencePanel({
  recommendations,
  mastery,
  revision,
  loading,
  onNavigate,
}: Props) {
  const topRec = recommendations?.recommendations?.[0] ?? null;
  const masterySummary = mastery?.summary;
  const dueItems = (revision?.revisionQueue ?? [])
    .filter(item => item.isDue || item.daysUntilReview <= 1)
    .slice(0, 3);

  return (
    <div className="relative bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-xl">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/6 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/5 blur-[90px] rounded-full pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/25 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.12)] shrink-0">
            <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-display font-bold text-sm sm:text-base leading-tight">
                SLS Intelligence Engine
              </h3>
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300">
                <Sparkles className="w-2.5 h-2.5" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-white/40 mt-0.5 truncate">
              {recommendations?.summary
                ? `${recommendations.summary.totalRecommendations} recommendation${recommendations.summary.totalRecommendations !== 1 ? 's' : ''} · ${dueItems.length} revision${dueItems.length !== 1 ? 's' : ''} due`
                : 'Analysing your performance data…'}
            </p>
          </div>
        </div>

        {/* Mastery counts mini-display */}
        {masterySummary && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 shrink-0 self-end sm:self-auto"
          >
            {masterySummary.masteredCount > 0 && (
              <div className="flex flex-col items-center px-2.5 py-1 sm:py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-sm sm:text-base font-display font-black text-purple-400 leading-none">{masterySummary.masteredCount}</span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-purple-400/70">Mastered</span>
              </div>
            )}
            {masterySummary.weakCount > 0 && (
              <div className="flex flex-col items-center px-2.5 py-1 sm:py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="text-sm sm:text-base font-display font-black text-rose-400 leading-none">{masterySummary.weakCount}</span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-rose-400/70">Weak</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {loading && (
        <div className="relative z-10 space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.03]">
              <Skeleton className="w-11 h-11 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-52 h-3.5" />
                <Skeleton className="w-40 h-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Top Recommendation ───────────────────────────────────────────── */}
      {!loading && (
        <AnimatePresence mode="popLayout">
          <div className="relative z-10 space-y-4">

            {topRec ? (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-2">
                  Top Priority Action
                </p>
                <SLSNextActionCard recommendation={topRec} onNavigate={onNavigate} />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-4 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">All caught up!</p>
                  <p className="text-xs text-white/40 mt-0.5">No critical weaknesses detected. Keep going 🔥</p>
                </div>
              </div>
            )}

            {/* ── Mastery State Summary ─────────────────────────────────── */}
            {masterySummary && (() => {
              const activeList = (
                [
                  ['NEW',       masterySummary.newCount],
                  ['LEARNING',  masterySummary.learningCount],
                  ['WEAK',      masterySummary.weakCount],
                  ['IMPROVING', masterySummary.improvingCount],
                  ['STRONG',    masterySummary.strongCount],
                  ['MASTERED',  masterySummary.masteredCount],
                ] as [SlsMasteryState, number][]
              ).filter(([, count]) => count > 0);

              return (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-2">
                    Mastery Overview
                  </p>
                  <div className={cn(
                    "grid gap-2",
                    activeList.length === 2 ? "grid-cols-2" :
                    activeList.length === 4 ? "grid-cols-2 sm:grid-cols-4" :
                    "grid-cols-3 sm:grid-cols-6"
                  )}>
                    {activeList.slice(0, 6).map(([state, count]) => {
                      const mcfg = MASTERY_DISPLAY[state];
                      return (
                        <div
                          key={state}
                          className={cn(
                            'flex flex-col items-center py-2 px-1 rounded-xl border border-white/5',
                            mcfg.bg,
                          )}
                        >
                          <span className={cn('text-base sm:text-lg font-black leading-none', mcfg.color)}>{count}</span>
                          <span className={cn('text-[9px] font-bold uppercase tracking-wide mt-0.5', mcfg.color, 'opacity-70')}>
                            {mcfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ── Revision Queue (Due Items) ────────────────────────────── */}
            {dueItems.length > 0 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-2">
                  Due for Revision
                </p>
                <div className="space-y-2">
                  {dueItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => onNavigate?.(`/smart-lessons/${item.chapterId}`)}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer"
                    >
                      <SubjectIcon
                        subject={item.subject}
                        className={cn('w-4 h-4 flex-shrink-0', urgencyColor(item.urgency))}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{item.chapterTitle}</p>
                        <p className="text-[10px] text-white/35 flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {item.isDue ? 'Due now' : `Due in ${item.daysUntilReview}d`}
                          {' · '}
                          Score: {item.masteryScore}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Footer ───────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-white/5">
              <p className="text-[10px] sm:text-[11px] text-white/25 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400/50 shrink-0" />
                SLS Engine · Updates per quiz attempt
              </p>
              {masterySummary && (
                <p className="text-[10px] sm:text-[11px] text-white/25 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400/50 shrink-0" />
                  {masterySummary.masteredCount} / {masterySummary.totalChapters} mastered
                </p>
              )}
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
