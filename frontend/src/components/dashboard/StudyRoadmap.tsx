import { motion } from 'motion/react';
import { Compass, CheckCircle2, Circle, BookOpen, FileText, RefreshCw, Calendar } from 'lucide-react';
import { DashboardData, RoadmapTask } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';

interface Props {
  dashboardData: DashboardData | null;
  loading: boolean;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/8', className)} />;
}

export function StudyRoadmap({ dashboardData, loading }: Props) {
  const roadmap = dashboardData?.roadmap;
  const hasData = roadmap && (roadmap.today.length > 0 || roadmap.tomorrow.length > 0);

  const getTaskIcon = (type: RoadmapTask['type']) => {
    switch (type) {
      case 'lesson':
        return BookOpen;
      case 'quiz':
        return FileText;
      case 'revision':
        return RefreshCw;
      default:
        return Compass;
    }
  };

  const getTaskColor = (type: RoadmapTask['type']) => {
    switch (type) {
      case 'lesson':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'quiz':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'revision':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-white/60 bg-white/5 border-white/10';
    }
  };

  const renderSection = (title: string, tasks: RoadmapTask[], delayOffset: number) => {
    if (!tasks || tasks.length === 0) return null;
    return (
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-1.5 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {title}
        </p>
        <div className="space-y-2">
          {tasks.map((task, idx) => {
            const Icon = getTaskIcon(task.type);
            const colorClasses = getTaskColor(task.type);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (idx + delayOffset) * 0.05 }}
                className={cn(
                  "group relative flex items-center gap-3.5 p-3 rounded-2xl border bg-white/[0.02] border-white/5",
                  "transition-all duration-200 hover:bg-white/[0.04] hover:border-white/10"
                )}
              >
                {/* Completion indicator */}
                <div className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
                  ) : (
                    <Circle className="w-4 h-4 text-white/20 group-hover:text-white/30 transition-colors" />
                  )}
                </div>

                {/* Task details */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-xs font-semibold text-white truncate",
                    task.completed && "text-white/40 line-through font-normal"
                  )}>
                    {task.topic}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/30 mt-0.5">
                    {task.type}
                  </p>
                </div>

                {/* Type icon */}
                <div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0", colorClasses)}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#05060F] border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-xl relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:bg-indigo-500/10" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 z-10 relative">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Compass className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white font-display font-bold text-base leading-tight">Study Roadmap</h3>
          <p className="text-[11px] text-white/40">Step-by-step preparation plan</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-5 z-10 relative">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <Skeleton className="w-4 h-4 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-2/3 h-3.5" />
                  <Skeleton className="w-12 h-2" />
                </div>
                <Skeleton className="w-7 h-7 rounded-lg" />
              </div>
            ))}
          </div>
        ) : !hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-white/60">No roadmap tasks generated</p>
            <p className="text-xs text-white/30 max-w-[200px] leading-relaxed">
              Diagnostic test attempts will unlock your roadmap schedule.
            </p>
          </div>
        ) : (
          <>
            {renderSection("Today's Targets", roadmap.today, 0)}
            {renderSection("Tomorrow's Queue", roadmap.tomorrow, roadmap.today.length)}
          </>
        )}
      </div>
    </div>
  );
}
