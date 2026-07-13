/**
 * ImprovementOpportunities — Step 4
 *
 * Shows the highest-yield topics a student should attack next,
 * ranked by potential mark gain derived from existing dashboardData.
 *
 * Loop:  Current Score → Gap Remaining → Topics To Fix → Potential Gain
 */

import { motion } from 'motion/react';
import { Zap, ChevronRight, ClipboardList, TrendingUp } from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

// ── Topic data shape ──────────────────────────────────────────────────────────
interface Opportunity {
  topic: string;
  subject: string;
  gain: number;           // estimated mark gain (integer)
  accuracy: number;       // current accuracy in subject (0-100)
  subjectColor: string;
  subjectBg: string;
}

// ── Topic lookup per subject (representative high-yield topics) ───────────────
const SUBJECT_TOPICS: Record<string, string[]> = {
  Physics:     ['Thermodynamics', 'Modern Physics', 'Electrostatics', 'Optics'],
  Chemistry:   ['Organic Reactions', 'Chemical Bonding', 'Electrochemistry', 'Equilibrium'],
  Mathematics: ['Calculus (Limits)', 'Quadratic Equations', 'Probability', 'Matrices'],
  Biology:     ['Plant Kingdom', 'Cell Division', 'Genetics', 'Human Physiology'],
};

const SUBJECT_PALETTE: Record<string, { color: string; bg: string; bar: string }> = {
  Physics:     { color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  bar: 'bg-indigo-500'  },
  Chemistry:   { color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    bar: 'bg-cyan-500'    },
  Mathematics: { color: 'text-amber-400',   bg: 'bg-amber-500/10',   bar: 'bg-amber-500'   },
  Biology:     { color: 'text-emerald-400', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500' },
};

// ── Derive opportunities from subjectMap ──────────────────────────────────────
function deriveOpportunities(subjectMap: Record<string, number>): Opportunity[] {
  const opps: Opportunity[] = [];

  Object.entries(subjectMap).forEach(([subject, accuracy]) => {
    // Only subjects below target; the lower the accuracy, the bigger the gain
    if (accuracy >= 85) return;

    const topics = SUBJECT_TOPICS[subject] ?? [];
    const gap    = 85 - accuracy;

    topics.forEach((topic, idx) => {
      // Gain decreases with each subsequent topic (pick top ones)
      const gain = Math.max(1, Math.round((gap * 0.06) - idx * 0.5));
      const palette = SUBJECT_PALETTE[subject] ?? { color: 'text-white/60', bg: 'bg-white/5', bar: 'bg-white/30' };
      opps.push({
        topic,
        subject,
        gain,
        accuracy,
        subjectColor: palette.color,
        subjectBg:    palette.bg,
      });
    });
  });

  // Sort by gain desc, take top 5
  return opps
    .sort((a, b) => b.gain - a.gain || a.accuracy - b.accuracy)
    .slice(0, 5);
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ImprovementOpportunities({ dashboardData, loading, onNavigate }: Props) {
  const hasData     = (dashboardData?.total_attempts ?? 0) > 0;
  const subjectMap  = dashboardData?.subjectMap ?? {};
  const predictedScore = Math.round((dashboardData?.overallReadiness ?? 0) * 2.4);
  const gapToSafe  = Math.max(0, 145 - predictedScore);

  const opportunities = hasData ? deriveOpportunities(subjectMap) : [];
  const totalGain     = opportunities.reduce((sum, o) => sum + o.gain, 0);

  return (
    <div className="relative bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10 rounded-3xl p-6 overflow-hidden shadow-xl">

      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/6 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/6 blur-[90px] rounded-full pointer-events-none" />

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-start justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-display font-semibold text-base leading-tight">
              Fastest Improvement
            </h3>
            <p className="text-[11px] text-white/40 mt-0.5">
              High-yield topics · prioritised by mark gain
            </p>
          </div>
        </div>

        {hasData && gapToSafe > 0 && (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Gap remaining</span>
            <span className="text-base font-display font-bold text-rose-400">{gapToSafe} marks</span>
          </div>
        )}
      </div>

      {/* ── Empty state ───────────────────────────────────────────────────────── */}
      {!loading && !hasData && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-center py-8 gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-base">
              Complete a mock test first
            </p>
            <p className="text-white/40 text-sm mt-1 leading-relaxed max-w-[240px] mx-auto">
              We'll identify your top improvement opportunities and show you exactly which topics to study
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('mock_tests')}
            className="mt-1 flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <ClipboardList className="w-4 h-4" />
            Start Diagnostic Test
          </button>
        </motion.div>
      )}

      {/* ── Loading skeletons ─────────────────────────────────────────────────── */}
      {loading && (
        <div className="relative z-10 space-y-2.5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.03]">
              <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-36 h-3.5" />
                <Skeleton className="w-20 h-2.5" />
              </div>
              <Skeleton className="w-14 h-6 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* ── Live opportunity list ─────────────────────────────────────────────── */}
      {!loading && hasData && (
        <div className="relative z-10 space-y-2">
          {opportunities.map((opp, i) => {
            const palette = SUBJECT_PALETTE[opp.subject] ?? { color: 'text-white/60', bg: 'bg-white/5', bar: 'bg-white/30' };
            return (
              <motion.div
                key={`${opp.subject}-${opp.topic}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group flex items-center gap-3 p-3.5 rounded-xl border border-white/5 hover:border-emerald-500/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all cursor-pointer"
                onClick={() => onNavigate?.('smart_lessons')}
              >
                {/* Rank badge */}
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-black', opp.subjectBg, opp.subjectColor)}>
                  #{i + 1}
                </div>

                {/* Topic info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight truncate">
                    {opp.topic}
                  </p>
                  <p className={cn('text-[11px] font-medium mt-0.5', opp.subjectColor)}>
                    {opp.subject} · {opp.accuracy}% accuracy
                  </p>
                </div>

                {/* Gain pill */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                    +{opp.gain} marks
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}

          {/* Total gain footer */}
          {opportunities.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between pt-3 mt-1 border-t border-white/5"
            >
              <p className="text-sm text-white/40 font-medium">
                Total potential gain from these topics
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-display font-bold text-emerald-400">+{totalGain}</span>
                <span className="text-xs text-emerald-400/60 font-medium">marks</span>
              </div>
            </motion.div>
          )}

          {/* Motivational micro-copy if gap exists */}
          {gapToSafe > 0 && totalGain >= gapToSafe && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15"
            >
              <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="text-xs font-semibold text-emerald-300">
                These topics alone can close your gap. Start now 🎯
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
