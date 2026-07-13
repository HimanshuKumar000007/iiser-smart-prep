import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, ClipboardList, ArrowUpRight, Award, Target, BookOpen, Activity, AlertCircle, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';

// ── Skeleton Helper ──────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

// ── Locked Overlay ────────────────────────────────────────────────────────────
function LockedOverlay({ onNavigate }: { onNavigate?: (v: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl"
      style={{ background: 'rgba(7,9,20,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25, type: 'spring', stiffness: 220 }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]"
      >
        <Lock className="w-7 h-7 text-indigo-300" />
      </motion.div>

      <div className="text-center space-y-1.5 px-6">
        <p className="text-white font-display font-bold text-base">Unlock Your Preparation Readiness</p>
        <p className="text-white/40 text-sm leading-snug max-w-[240px] mx-auto">
          Complete 1 diagnostic test to reveal your readiness level, subject balance, and preparation trend.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onNavigate?.('mock_tests')}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all"
      >
        <ClipboardList className="w-4 h-4" />
        Take Diagnostic Test
        <ArrowUpRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function PredictedPerformance({ dashboardData, loading, onNavigate }: Props) {
  const hasData = (dashboardData?.total_attempts ?? 0) > 0;

  // Compute metrics based on dashboardData
  const score = dashboardData?.best_score ?? 0;
  const accuracy = dashboardData?.accuracy ?? 0;
  
  // Subject performance stats
  const subjectPerf = dashboardData?.subject_performance || [];
  const totalAttempts = dashboardData?.total_attempts ?? 0;

  // Evidence Quality Calculation (per mock baseline: min 20 answered questions)
  // Since dashboard data aggregates, if total_attempts > 0 we have mock data.
  const evidenceQuality = totalAttempts === 0 ? 'None' : totalAttempts < 3 ? 'Limited' : 'Sufficient';
  
  // Preparation Readiness State
  let readinessState = 'BASELINE_NOT_ESTABLISHED';
  let readinessTitle = 'Baseline Not Established';
  let readinessDesc = 'No mock data is available yet to compute your readiness profile.';
  let readinessColorClass = 'text-white/40 border-white/10 bg-white/5';

  if (totalAttempts > 0) {
    if (evidenceQuality === 'Limited') {
      readinessState = 'BUILDING_PROFILE';
      readinessTitle = 'Building Profile';
      readinessDesc = 'We are analyzing your first mock tests. More attempts will yield a highly precise readiness evaluation.';
      readinessColorClass = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    } else {
      // Sufficient evidence
      if (accuracy >= 85) {
        readinessState = 'STRONG_PREPARATION';
        readinessTitle = 'Strong Preparation';
        readinessDesc = 'Excellent prep level. Maintain consistency and focus on advanced mock performance.';
        readinessColorClass = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      } else if (accuracy >= 70) {
        readinessState = 'COMPETITIVE_PROGRESS';
        readinessTitle = 'Competitive Progress';
        readinessDesc = 'Competitive prep level. Targeting mock score refinement is recommended.';
        readinessColorClass = 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
      } else if (accuracy >= 50) {
        readinessState = 'DEVELOPING';
        readinessTitle = 'Developing';
        readinessDesc = 'Solid foundation. Focus on weak topics and chapter revision to boost performance.';
        readinessColorClass = 'text-sky-400 border-sky-500/20 bg-sky-500/5';
      } else {
        readinessState = 'EARLY_PROGRESS';
        readinessTitle = 'Early Progress';
        readinessDesc = 'Early preparation phase. We recommend focused study modules before attempting next mock.';
        readinessColorClass = 'text-rose-400 border-rose-500/20 bg-rose-500/5';
      }
    }
  }

  // Calculate Subject Balance
  let subjectBalanceMessage = 'No data available';
  if (subjectPerf.length > 0) {
    const sortedSubjs = [...subjectPerf].sort((a, b) => b.accuracy - a.accuracy);
    const strongest = sortedSubjs[0];
    const weakest = sortedSubjs[sortedSubjs.length - 1];
    if (strongest && weakest && strongest.accuracy !== weakest.accuracy) {
      subjectBalanceMessage = `${strongest.subject} (${Math.round(strongest.accuracy)}% Strongest) / ${weakest.subject} (${Math.round(weakest.accuracy)}% Focus)`;
    } else if (strongest) {
      subjectBalanceMessage = `${strongest.subject} evaluated at ${Math.round(strongest.accuracy)}% accuracy`;
    }
  }

  // Historical Trend (proxy from streak + attempts)
  let trendLabel = 'Insufficient History';
  let TrendIcon = Minus;
  let trendColor = 'text-white/40';

  if (totalAttempts >= 2) {
    if (dashboardData?.streak_days && dashboardData.streak_days >= 3) {
      trendLabel = 'Improving';
      TrendIcon = TrendingUp;
      trendColor = 'text-emerald-400';
    } else {
      trendLabel = 'Stable';
      TrendIcon = Minus;
      trendColor = 'text-cyan-400';
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10 rounded-3xl p-6 overflow-hidden shadow-xl flex flex-col justify-between min-h-[380px]">
      
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Locked overlay */}
      <AnimatePresence>
        {!loading && !hasData && <LockedOverlay onNavigate={onNavigate} />}
      </AnimatePresence>

      <div className="space-y-4">
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-display font-semibold text-base leading-tight">
                Preparation Readiness
              </h3>
              <p className="text-[11px] text-white/40 mt-0.5">
                Dynamic profile evaluation
              </p>
            </div>
          </div>
          {hasData ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              ● Evaluated
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/35">
              <Lock className="w-3.5 h-3.5" /> Locked
            </span>
          )}
        </div>

        {/* Loading state skeleton */}
        {loading && (
          <div className="space-y-4">
            <Skeleton className="w-full h-24" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        )}

        {/* Main content display */}
        {!loading && (
          <div className={cn("space-y-4 relative z-10", !hasData && "blur-sm select-none pointer-events-none")}>
            
            {/* Readiness Banner */}
            <div className={cn("p-4 rounded-2xl border flex flex-col gap-1.5", readinessColorClass)}>
              <span className="text-[9px] uppercase tracking-wider font-black opacity-60">Readiness Level</span>
              <h4 className="text-xl font-display font-black leading-tight">{readinessTitle}</h4>
              <p className="text-xs opacity-80 leading-relaxed font-sans">{readinessDesc}</p>
            </div>

            {/* Score, Accuracy & Subject Balance Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-1">Top Score</span>
                <span className="text-xl font-mono font-bold text-white">{score} / 240</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block mb-1">Avg Accuracy</span>
                <span className="text-xl font-mono font-bold text-cyan-400">{accuracy.toFixed(1)}%</span>
              </div>
            </div>

            {/* Profile Meta Cards */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <span className="text-white/50">Evidence Quality</span>
                <span className={cn("font-bold uppercase tracking-wider text-[10px]", 
                  evidenceQuality === 'Sufficient' ? 'text-emerald-400' : 'text-amber-400'
                )}>{evidenceQuality}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <span className="text-white/50">Historical Trend</span>
                <span className={cn("font-bold flex items-center gap-1.5", trendColor)}>
                  <TrendIcon className="w-3.5 h-3.5" />
                  {trendLabel}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <span className="text-white/50 shrink-0">Subject Balance</span>
                <span className="text-white/80 font-medium truncate max-w-[200px]">{subjectBalanceMessage}</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Preparation readiness disclaimer */}
      <div className="relative z-10 mt-6 pt-3 border-t border-white/5 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
        <p className="text-[10px] text-white/30 leading-snug">
          Preparation readiness is based on your SmartPrep mock performance and is not an official IISER rank or admission prediction.
        </p>
      </div>

    </div>
  );
}
