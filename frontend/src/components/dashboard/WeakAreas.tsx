import { motion } from 'motion/react';
import { AlertTriangle, Atom, FlaskConical, Calculator, Dna, Compass, ArrowRight, BookOpen } from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

const SUBJECT_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Physics:     { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  Chemistry:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
  Mathematics: { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  Biology:     { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

export function WeakAreas({ dashboardData, loading, onNavigate }: Props) {
  const weakAreas = dashboardData?.weakAreas ?? [];
  const hasData = (dashboardData?.total_attempts ?? 0) > 0 && weakAreas.length > 0;

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return Atom;
      case 'Chemistry':
        return FlaskConical;
      case 'Mathematics':
        return Calculator;
      case 'Biology':
        return Dna;
      default:
        return Compass;
    }
  };

  const getSeverity = (priority: number) => {
    if (priority >= 75) return { label: 'Critical', style: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    if (priority >= 50) return { label: 'High', style: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
    return { label: 'Moderate', style: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
  };

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={cn(
      'border rounded-3xl p-6 h-full flex flex-col shadow-xl relative overflow-hidden group',
      isLight
        ? 'bg-white/72 backdrop-blur-[12px] border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]'
        : 'bg-[#05060F] border-white/10'
    )}>
      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:bg-amber-500/10" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-base leading-tight">Weak Area Engine</h3>
            <p className="text-[11px] text-white/40">Syllabus gaps & score drain spots</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 z-10 relative">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between mb-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-16 h-4 rounded-full" />
                </div>
                <Skeleton className="w-full h-1.5 rounded-full mb-2" />
                <Skeleton className="w-32 h-3" />
              </div>
            ))}
          </div>
        ) : !hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-white/30" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">No weaknesses detected yet</p>
              <p className="text-xs text-white/35 leading-relaxed">
                Take a diagnostic or mock test to find your concept weak spots.
              </p>
            </div>
          </div>
        ) : (
          weakAreas.map((area, idx) => {
            const Icon = getSubjectIcon(area.subject);
            const colors = SUBJECT_COLORS[area.subject] || { text: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' };
            const severity = getSeverity(area.priorityScore);

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                onClick={() => onNavigate?.('smart_lessons')}
                className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 hover:bg-white/8 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-1 bottom-0 bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />

                <div className="flex justify-between items-start mb-1 pl-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={cn("w-6 h-6 rounded-md flex items-center justify-center border", colors.bg, colors.border)}>
                      <Icon className={cn("w-3.5 h-3.5", colors.text)} />
                    </div>
                    <span className="text-sm font-semibold text-white truncate">{area.subject}</span>
                  </div>
                  <span className={cn('text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border', severity.style)}>
                    {severity.label}
                  </span>
                </div>

                <p className="text-[11px] text-white/40 pl-1 mb-2.5">
                  {Math.round(area.accuracy)}% accuracy · Priority Score: {area.priorityScore}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2.5 ml-1">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-1000"
                    style={{ width: `${Math.max(2, area.accuracy)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pl-1">
                  <span className="text-[11px] text-white/40 font-medium">
                    Potential Marks Gain: <span className="text-emerald-400 font-bold">+{area.potentialGain} marks</span>
                  </span>
                  <button className="text-xs text-white/40 group-hover:text-white flex items-center gap-1 transition-colors font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    Revise <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
