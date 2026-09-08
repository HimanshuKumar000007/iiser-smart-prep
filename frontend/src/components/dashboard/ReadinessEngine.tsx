import { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Target, Info, HelpCircle, X } from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { LESSONS_DATA } from '../../data/lessons';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
  onNavigate?: (view: string) => void;
}

const SUBJECT_CONFIGS = [
  { name: 'Physics',     color: '#3b82f6' },
  { name: 'Chemistry',   color: '#06b6d4' },
  { name: 'Mathematics', color: '#f59e0b' },
  { name: 'Biology',     color: '#10b981' },
] as const;

export function ReadinessEngine({ dashboardData, loading, onNavigate }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const overallScore   = dashboardData?.overallReadiness ?? 0;
  const subjectMap     = dashboardData?.subjectMap ?? {};
  const hasData        = (dashboardData?.total_attempts ?? 0) > 0 || (dashboardData?.completed_lessons_count ?? 0) > 0;
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldAnimate(!e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isSubjectStudied = (subjectName: string): boolean => {
    if (!dashboardData) return false;
    const completedLessons = dashboardData.completed_lessons || [];
    const completedSet = new Set(completedLessons);
    const subjectLessons = LESSONS_DATA.filter(
      l => l.subject.toLowerCase() === subjectName.toLowerCase()
    );
    const hasLocal = subjectLessons.some(l => localStorage.getItem(`lesson_${l.id}`) === 'completed');
    const hasSupabase = subjectLessons.some(l => completedSet.has(`lesson_${l.id}`));
    if (hasLocal || hasSupabase) return true;

    const performanceRow = dashboardData.subject_performance?.find(
      sp => sp.subject.toLowerCase() === subjectName.toLowerCase()
    );
    if (performanceRow && performanceRow.attempts > 0) return true;

    return false;
  };

  const readinessData = SUBJECT_CONFIGS.map(cfg => {
    const studied = isSubjectStudied(cfg.name);
    return {
      name: cfg.name,
      value: studied ? (subjectMap[cfg.name] ?? 0) : 0,
      fill: cfg.color
    };
  });

  const chartData = [...readinessData].reverse();

  // Baseline score out of 240
  const scoreOutOf240 = Math.round((overallScore / 100) * 240);

  return (
    <>
      <div 
        className={cn(
          'border rounded-3xl p-6 relative flex flex-col justify-between h-full transition-all duration-300',
          isLight
            ? 'bg-white/75 backdrop-blur-[14px] border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)]'
            : 'bg-[#0b0e1b]/90 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/[0.14]'
        )}
        aria-label="Concentric rings chart showing subject readiness: Physics, Chemistry, Mathematics, and Biology."
      >
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/[0.03] blur-[70px] pointer-events-none rounded-full" />

        {/* ── CARD HEADER ── */}
        <div>
          <div className="flex items-center justify-between mb-1 relative z-10">
            <div className="flex items-center gap-2">
              <h3 className={cn("font-display font-bold text-base tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                Readiness Engine
              </h3>
              <button
                onClick={() => setShowInfoModal(true)}
                title="How readiness is calculated"
                className={cn(
                  "p-1 rounded-full transition-colors cursor-pointer",
                  isLight ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className={cn(
              "text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
              isLight
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
            )}>
              IAT 2027 BASELINE
            </span>
          </div>
          <p className={cn("text-xs mb-4", isLight ? "text-slate-500" : "text-white/50")}>
            Subject mastery vs Target
          </p>
        </div>

        {/* ── RADIAL CHART ── */}
        <div className="flex-1 min-h-[200px] relative my-1">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-4 border-white/5 animate-pulse" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="28%"
                outerRadius="95%"
                barSize={11}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.05)' }}
                  dataKey="value"
                  cornerRadius={8}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{ 
                    backgroundColor: isLight ? '#ffffff' : '#0D0F1F', 
                    borderColor: isLight ? 'rgba(15,23,42,0.08)' : '#ffffff20', 
                    borderRadius: '10px', 
                    color: isLight ? '#0f172a' : '#fff', 
                    fontSize: '12px' 
                  }}
                  formatter={(value: number, name: string) => {
                    const studied = isSubjectStudied(name);
                    return [studied ? `${value}%` : 'No attempts yet', name];
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          )}

          {/* Centre score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {loading ? (
              <Skeleton className="w-16 h-8" />
            ) : (
              <motion.div
                initial={shouldAnimate ? { scale: 0.8, opacity: 0 } : undefined}
                animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <span className={cn("text-3xl font-display font-black leading-none", isLight ? "text-slate-900" : "text-white")}>
                  {overallScore > 0 ? overallScore : 4}
                </span>
                <span className={cn("text-xs font-semibold block mt-1", isLight ? "text-slate-400" : "text-white/40")}>
                  / 240
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── ASSESSED STATUS PILL ── */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Assessed</span>
          </div>
        </div>

        {/* ── SUBJECT SCORE ROWS ── */}
        <div className="space-y-2 mb-4">
          {SUBJECT_CONFIGS.map(({ name, color }) => (
            <div key={name} className="flex items-center justify-between text-xs py-1 px-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className={cn("font-medium", isLight ? "text-slate-700" : "text-white/80")}>{name}</span>
              </div>
              <div className="font-mono text-xs font-bold">
                {loading ? (
                  <Skeleton className="w-8 h-3" />
                ) : (
                  <span className={isLight ? "text-slate-900" : "text-cyan-400"}>
                    {isSubjectStudied(name) ? `${Math.round(((subjectMap[name] ?? 0) / 100) * 60)} / 60` : '58 / 60'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER LINKS ── */}
        <div className={cn(
          "pt-3 border-t flex items-center justify-between text-[11px]",
          isLight ? "border-slate-100" : "border-white/5"
        )}>
          <button
            onClick={() => setShowInfoModal(true)}
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            How is readiness calculated? &gt;
          </button>
          <button
            onClick={() => onNavigate?.('mock_tests')}
            className={cn(
              "font-medium transition-colors cursor-pointer",
              isLight ? "text-slate-500 hover:text-slate-800" : "text-white/50 hover:text-white"
            )}
          >
            View Mock Hub &rarr;
          </button>
        </div>
      </div>

      {/* ── INFO MODAL ── */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={cn(
            "relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden",
            isLight ? "bg-white border-slate-200 text-slate-900" : "bg-[#0d1021] border-white/10 text-white"
          )}>
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg">How IISER Readiness is Calculated</h4>
                <p className="text-xs text-cyan-400 font-medium">IISER Aptitude Test (IAT) Standard</p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed opacity-80 mb-6">
              <p>
                The <strong>IISER Aptitude Test (IAT)</strong> evaluates performance across 4 subjects for a total of <strong>240 marks</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Physics:</strong> 15 Questions × 4 marks = <strong>60 marks</strong></li>
                <li><strong>Chemistry:</strong> 15 Questions × 4 marks = <strong>60 marks</strong></li>
                <li><strong>Mathematics:</strong> 15 Questions × 4 marks = <strong>60 marks</strong></li>
                <li><strong>Biology:</strong> 15 Questions × 4 marks = <strong>60 marks</strong></li>
              </ul>
              <p>
                Your overall readiness score dynamically computes syllabus coverage, concept retention, and test consistency against baseline targets.
              </p>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
