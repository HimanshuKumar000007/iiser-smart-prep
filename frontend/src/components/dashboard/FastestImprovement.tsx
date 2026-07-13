/**
 * FastestImprovement — Step 4
 *
 * Answers the student's core question after seeing Predicted Performance:
 *   "I need +23 marks. Now what should I study?"
 *
 * Data source: dashboardData.weakAreas (already computed)
 * Formula:     gain = Math.max(2, Math.round((75 - accuracy) * 0.2))
 * Priority:    accuracy < 60 → Critical | < 70 → Important | else → Improve
 */

import { motion } from 'motion/react';
import {
  Rocket,
  ArrowRight,
  TrendingUp,
  ClipboardList,
  AlertCircle,
  AlertTriangle,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { DashboardData, WeakArea } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ImprovementItem {
  subject:  string;
  accuracy: number;
  gain:     number;               // estimated marks
  priority: 'Critical' | 'Important' | 'Improve';
  weightage: 'High' | 'Medium';  // IISER IAT typical weightage
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SUBJECT_PALETTE: Record<string, {
  color:   string;
  dimColor: string;
  bg:      string;
  border:  string;
  hoverBorder: string;
  bar:     string;
}> = {
  Physics:     { color: 'text-indigo-400',  dimColor: 'text-indigo-300',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/15',  hoverBorder: 'hover:border-indigo-500/40',  bar: 'bg-indigo-500'  },
  Chemistry:   { color: 'text-cyan-400',    dimColor: 'text-cyan-300',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/15',    hoverBorder: 'hover:border-cyan-500/40',    bar: 'bg-cyan-500'    },
  Mathematics: { color: 'text-amber-400',   dimColor: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/15',   hoverBorder: 'hover:border-amber-500/40',   bar: 'bg-amber-500'   },
  Biology:     { color: 'text-emerald-400', dimColor: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', hoverBorder: 'hover:border-emerald-500/40', bar: 'bg-emerald-500' },
};

const SUBJECT_WEIGHTAGE: Record<string, 'High' | 'Medium'> = {
  Physics:     'High',
  Chemistry:   'High',
  Mathematics: 'Medium',
  Biology:     'High',
};

// ── Helper — derive list from weakAreas ───────────────────────────────────────

function toImprovementItems(weakAreas: WeakArea[]): ImprovementItem[] {
  return weakAreas.slice(0, 3).map(area => {
    const gain = Math.max(2, Math.round((75 - area.accuracy) * 0.2));
    const priority: ImprovementItem['priority'] =
      area.accuracy < 60 ? 'Critical' :
      area.accuracy < 70 ? 'Important' :
      'Improve';
    return {
      subject:   area.subject,
      accuracy:  Math.round(area.accuracy),
      gain,
      priority,
      weightage: SUBJECT_WEIGHTAGE[area.subject] ?? 'Medium',
    };
  });
}

// ── Priority badge ────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: ImprovementItem['priority'] }) {
  if (priority === 'Critical') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/25">
        <AlertCircle className="w-2.5 h-2.5" />
        Critical
      </span>
    );
  }
  if (priority === 'Important') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
        <AlertTriangle className="w-2.5 h-2.5" />
        Important
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">
      <ChevronUp className="w-2.5 h-2.5" />
      Improve
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

// ── Props ─────────────────────────────────────────────────────────────────────


interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

// ── Main component ────────────────────────────────────────────────────────────

export function FastestImprovement({ dashboardData, loading, onNavigate }: Props) {
  const hasData     = (dashboardData?.total_attempts ?? 0) > 0;
  const weakAreas   = dashboardData?.weakAreas ?? [];
  const items       = hasData ? toImprovementItems(weakAreas) : [];
  const totalGain   = items.reduce((sum, it) => sum + it.gain, 0);

  // The predicted gap (from PredictedPerformance formula)
  const overallReadiness  = dashboardData?.overallReadiness ?? 0;
  const predictedScore    = Math.round(overallReadiness * 2.4);
  const gapToSafe         = Math.max(0, 145 - predictedScore);

  return (
    <div className="relative bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10 rounded-3xl p-6 overflow-hidden shadow-xl">

      {/* Background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/25 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Rocket className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-lg leading-tight">
              Fastest Improvement Opportunities
            </h3>
            <p className="text-[12px] text-white/40 mt-0.5">
              Ranked by mark potential · Fix these first
            </p>
          </div>
        </div>

        {/* Gap + gain summary pill — only when data exists */}
        {hasData && !loading && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-500/8 border border-emerald-500/15 flex-shrink-0"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">Total Gain</p>
              <p className="text-xl font-display font-black text-emerald-400 leading-none">+{totalGain}</p>
              <p className="text-[10px] text-emerald-400/50">Marks</p>
            </div>
            {gapToSafe > 0 && (
              <>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400/70">Gap Left</p>
                  <p className="text-xl font-display font-black text-rose-400 leading-none">{gapToSafe}</p>
                  <p className="text-[10px] text-rose-400/50">Marks</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Loading skeletons ───────────────────────────────────────────────── */}
      {loading && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/[0.03] space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-xl flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-16 h-3" />
                </div>
              </div>
              <Skeleton className="w-full h-1.5 rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-24 h-7 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────────────────────── */}
      {!loading && !hasData && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-center py-10 gap-5"
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-2">
            <p className="text-white font-display font-bold text-lg">
              No performance data yet
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
              Take your first mock test to discover the fastest way
              to improve your score.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('mock_tests')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-6 py-3 rounded-full text-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            <ClipboardList className="w-4 h-4" />
            Start Diagnostic Test
          </button>
        </motion.div>
      )}

      {/* ── Subject cards ───────────────────────────────────────────────────── */}
      {!loading && hasData && items.length > 0 && (
        <div className="relative z-10 space-y-4">
          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item, i) => {
              const pal = SUBJECT_PALETTE[item.subject] ?? SUBJECT_PALETTE['Biology'];
              return (
                <motion.div
                  key={item.subject}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={cn(
                    'group relative flex flex-col gap-4 p-5 rounded-2xl border bg-white/[0.03]',
                    'transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5 cursor-pointer',
                    pal.border, pal.hoverBorder,
                  )}
                  onClick={() => onNavigate?.('smart_lessons')}
                >
                  {/* Top row — subject + priority */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black',
                        pal.bg, pal.color
                      )}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-display font-bold text-base leading-tight">
                          {item.subject}
                        </h4>
                        <span className={cn('text-[11px] font-semibold', pal.color)}>
                          Weightage: {item.weightage}
                        </span>
                      </div>
                    </div>
                    <PriorityBadge priority={item.priority} />
                  </div>

                  {/* Accuracy bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-white/40 tracking-wider uppercase">Accuracy</span>
                      <span className="text-white">{item.accuracy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.accuracy}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
                        className={cn('h-full rounded-full', pal.bar)}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1">
                      <span className="text-white/20">0%</span>
                      <span className="text-white/30">Target: 75%</span>
                    </div>
                  </div>

                  {/* Bottom — gain + CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">Gain:</span>
                      <span className="text-base font-display font-black text-emerald-300">
                        +{item.gain} Marks
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate?.('smart_lessons'); }}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all',
                        'border text-white/60 border-white/10 bg-white/5',
                        'group-hover:border-white/25 group-hover:text-white group-hover:bg-white/10',
                      )}
                    >
                      Start Revision
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Divider + total gain footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5"
          >
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              {gapToSafe > 0
                ? <>Focus on these subjects to close the <span className="text-white font-semibold">&nbsp;{gapToSafe}-mark gap&nbsp;</span> to safe zone</>
                : <>You're already at the safe zone — keep pushing for top rank!</>
              }
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm text-white/40 font-medium">Total Gain Available</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-black text-emerald-400">+{totalGain}</span>
                <span className="text-sm text-emerald-400/60 font-semibold">Marks</span>
              </div>
            </div>
          </motion.div>

          {/* Motivational banner when gain covers gap */}
          {gapToSafe > 0 && totalGain >= gapToSafe && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-sm font-semibold text-emerald-300">
                🎯 These 3 subjects alone can close your entire gap. Start today and you can reach safe zone!
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* ── Empty weakAreas but has data (all subjects above target) ─────────── */}
      {!loading && hasData && items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center text-center py-8 gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-white font-semibold">All subjects above target 🔥</p>
          <p className="text-white/40 text-sm max-w-xs">
            You're performing above 75% in every subject. Focus on mock tests to improve speed and rank.
          </p>
        </motion.div>
      )}
    </div>
  );
}
