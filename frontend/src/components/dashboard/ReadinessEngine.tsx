import { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';
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
  { name: 'Biology',     color: '#10b981' },
  { name: 'Chemistry',   color: '#06b6d4' },
  { name: 'Physics',     color: '#6366f1' },
  { name: 'Mathematics', color: '#f59e0b' },
] as const;

export function ReadinessEngine({ dashboardData, loading, onNavigate }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const overallScore   = dashboardData?.overallReadiness ?? 0;
  const subjectMap     = dashboardData?.subjectMap ?? {};
  const hasData        = (dashboardData?.total_attempts ?? 0) > 0 || (dashboardData?.completed_lessons_count ?? 0) > 0;

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
    // Check if they completed any lessons in this subject
    const completedLessons = dashboardData.completed_lessons || [];
    const completedSet = new Set(completedLessons);
    const subjectLessons = LESSONS_DATA.filter(
      l => l.subject.toLowerCase() === subjectName.toLowerCase()
    );
    const hasLocal = subjectLessons.some(l => localStorage.getItem(`lesson_${l.id}`) === 'completed');
    const hasSupabase = subjectLessons.some(l => completedSet.has(`lesson_${l.id}`));
    if (hasLocal || hasSupabase) return true;

    // Check if they took any mocks for this subject
    const performanceRow = dashboardData.subject_performance?.find(
      sp => sp.subject.toLowerCase() === subjectName.toLowerCase()
    );
    if (performanceRow && performanceRow.attempts > 0) return true;

    return false;
  };

  // Derive radial bar chart data array dynamically from the same single source of truth configuration
  const readinessData = SUBJECT_CONFIGS.map(cfg => {
    const studied = isSubjectStudied(cfg.name);
    return {
      name: cfg.name,
      value: studied ? (subjectMap[cfg.name] ?? 0) : 0,
      fill: cfg.color
    };
  });

  // Recharts RadialBarChart: the first item is the innermost ring, and the last item is the outermost.
  // Reversing this ensures the concentric rings order corresponds to the visual legend layout order.
  const chartData = [...readinessData].reverse();

  // Full visual empty state if there is no user data at all
  if (!loading && !hasData) {
    return (
      <div className={cn(
        'border rounded-3xl p-6 flex flex-col items-center justify-center min-h-[340px] text-center h-full relative overflow-hidden group',
        isLight
          ? 'bg-white/72 backdrop-blur-[12px] border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]'
          : 'bg-panel border-panel-border'
      )}>
        {/* Decorative background rings */}
        <div className="absolute w-44 h-44 rounded-full border border-white/5 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-28 rounded-full border border-white/5" />
        </div>
        
        {/* Icon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
          <Target className="w-7 h-7 text-cyan-400/80 animate-pulse" />
        </div>
        
        <h3 className="text-white font-display font-semibold text-base mb-2 relative z-10">Readiness Engine</h3>
        <p className="text-white/40 text-xs max-w-[220px] mb-5 leading-relaxed relative z-10">
          Complete lessons or attempt mock tests to populate your subject readiness rings.
        </p>
        
        <button
          onClick={() => onNavigate?.('smart_lessons')}
          className="relative z-10 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/10"
        >
          Start First Lesson
        </button>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'border rounded-3xl p-6 relative flex flex-col h-full',
        isLight
          ? 'bg-white/72 backdrop-blur-[12px] border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]'
          : 'bg-panel border-panel-border'
      )}
      aria-label="Concentric rings chart showing subject readiness: Biology, Chemistry, Physics, and Mathematics."
    >
      <h3 className="text-white font-display font-semibold text-lg mb-1">Readiness Engine</h3>
      <p className="text-white/50 text-sm mb-4">Subject mastery vs Target</p>

      {/* Screen Reader Table of values */}
      <div className="sr-only">
        <h4>Subject Readiness Scores:</h4>
        <ul>
          {SUBJECT_CONFIGS.map(cfg => {
            const studied = isSubjectStudied(cfg.name);
            const score = studied ? `${subjectMap[cfg.name] ?? 0}%` : 'No attempts yet';
            return (
              <li key={cfg.name}>
                {cfg.name}: {score}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Radial Chart */}
      <div className="flex-1 min-h-[220px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-white/5 animate-pulse" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={220}>
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
                background={{ fill: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.05)' }}
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
              <span className="text-3xl font-display font-bold text-white">
                {overallScore}<span className="text-lg text-white/50">%</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">Overall</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {SUBJECT_CONFIGS.map(({ name, color }) => (
          <div key={name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <div className="flex-1 flex justify-between items-center gap-1 min-w-0">
              <span className="text-xs text-white/60">{name}</span>
              {loading
                ? <Skeleton className="w-8 h-3" />
                : <span className="text-xs font-semibold text-white flex-shrink-0">
                    {isSubjectStudied(name) ? `${subjectMap[name] ?? 0}%` : '—'}
                  </span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
