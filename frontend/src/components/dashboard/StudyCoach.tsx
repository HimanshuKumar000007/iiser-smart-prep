import { motion } from 'motion/react';
import { BrainCircuit, BookOpen, Target, Trophy, Clock, ArrowRight, ClipboardList, BookOpenCheck, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  dashboardData: any;
  loading: boolean;
  onNavigate?: (view: string) => void;
  actionPlan?: any;
  error?: string | null;
  onRetry?: () => void;
}

const STATUS_THEMES = {
  GETTING_STARTED: {
    eyebrow: 'text-indigo-400',
    border: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-300',
    glow: 'bg-indigo-500/5',
    emoji: '🎯'
  },
  BUILDING_EVIDENCE: {
    eyebrow: 'text-cyan-400',
    border: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-300',
    glow: 'bg-cyan-500/5',
    emoji: '📊'
  },
  REVISION_DUE: {
    eyebrow: 'text-amber-400',
    border: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
    glow: 'bg-amber-500/5',
    emoji: '⏳'
  },
  NEEDS_FOCUS: {
    eyebrow: 'text-rose-400',
    border: 'border-rose-500/20 bg-rose-500/5 text-rose-300',
    glow: 'bg-rose-500/5',
    emoji: '🚨'
  },
  PERFORMANCE_DECLINING: {
    eyebrow: 'text-rose-400',
    border: 'border-rose-500/20 bg-rose-500/5 text-rose-300',
    glow: 'bg-rose-500/5',
    emoji: '⚠️'
  },
  PERFORMANCE_IMPROVING: {
    eyebrow: 'text-emerald-400',
    border: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    glow: 'bg-emerald-500/5',
    emoji: '🔥'
  },
  ON_TRACK: {
    eyebrow: 'text-emerald-400',
    border: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    glow: 'bg-emerald-500/5',
    emoji: '🏆'
  }
};

const ACTION_ICONS = {
  LESSON: BookOpen,
  QUIZ: ClipboardList,
  REVISION: BookOpenCheck,
  PYQ: Target,
  FULL_MOCK: Trophy
};

export function StudyCoach({ dashboardData, loading, onNavigate, actionPlan, error, onRetry }: Props) {
  const coachData = actionPlan?.studyCoach;
  const hasData = coachData?.hasData;

  const handleTaskClick = (action: any) => {
    if (action.type === 'FULL_MOCK') {
      onNavigate?.('mock_tests');
    } else if (action.type === 'PYQ') {
      onNavigate?.('pyqs');
    } else if (action.type === 'QUIZ') {
      if (action.chapterId) {
        onNavigate?.(`smart-lessons/${action.chapterId}::quiz`);
      } else {
        onNavigate?.('smart_lessons');
      }
    } else if (action.type === 'REVISION' || action.type === 'LESSON') {
      if (action.chapterId) {
        onNavigate?.(`smart-lessons/${action.chapterId}`);
      } else {
        onNavigate?.('smart_lessons');
      }
    } else {
      onNavigate?.('smart_lessons');
    }
  };

  // Resolve visual status theme
  const statusKey = (coachData?.coachSummary?.status || 'GETTING_STARTED') as keyof typeof STATUS_THEMES;
  const theme = STATUS_THEMES[statusKey] || STATUS_THEMES.GETTING_STARTED;

  // Decide if profile is personalized or building evidence
  const isPersonalized = coachData?.evidence?.level === 'STRONG' || coachData?.evidence?.level === 'SUFFICIENT';

  return (
    <div className="bg-[#05060F] border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col h-full shadow-xl relative overflow-hidden group">
      {/* Background glow */}
      <div className={`absolute -top-32 -right-32 w-96 h-96 ${theme.glow} blur-[140px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-80`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-display font-bold text-base leading-tight">Smart Coach</h3>
              <span className={cn(
                "flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
                isPersonalized 
                  ? "bg-purple-500/15 border-purple-500/20 text-purple-300"
                  : "bg-cyan-500/15 border-cyan-500/20 text-cyan-300"
              )}>
                {isPersonalized ? (
                  <>
                    <Sparkles className="w-2.5 h-2.5" />
                    Personalized
                  </>
                ) : (
                  <>
                    <Compass className="w-2.5 h-2.5" />
                    Building Profile
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] text-white/40">Guidance based on your learning activity</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between space-y-6 z-10 relative">
        {loading ? (
          <div className="space-y-4 animate-pulse flex-1">
            <div className="h-20 bg-white/5 rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map(i => <div key={i} className="h-14 bg-white/5 rounded-2xl" />)}
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
            </div>
          </div>
        ) : (error || (actionPlan?.sources && (actionPlan.sources.sls === 'unavailable' || actionPlan.sources.weaknesses === 'unavailable')) || !hasData) ? (() => {
            const isRequiredSourceOffline = actionPlan?.sources && (
              actionPlan.sources.sls === 'unavailable' ||
              actionPlan.sources.weaknesses === 'unavailable'
            );
            const isOutage = error || isRequiredSourceOffline;
            if (isOutage) {
              let errorTitle = 'Insights temporarily offline';
              let errorMessage = 'Dynamic coaching recommendations are temporarily unavailable.';

              if (error) {
                if (error.includes('401') || error.includes('403') || error.includes('Unauthorized')) {
                  errorTitle = 'Session Expired';
                  errorMessage = 'Please log in again to sync your personalized study recommendations.';
                } else if (error.includes('500') || error.includes('Internal')) {
                  errorTitle = 'Service Temporarily Offline';
                  errorMessage = 'Our servers encountered an internal error. We are working to restore recommendations.';
                } else {
                  errorTitle = 'Connection Timeout';
                  errorMessage = 'Our servers are experiencing connection timeouts. Please check your network connection.';
                }
              } else if (isRequiredSourceOffline) {
                errorTitle = 'Database Sync Offline';
                errorMessage = 'Our database service is experiencing temporary issues. Coaching updates are offline.';
              }

              return (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-rose-500/10 rounded-2xl bg-rose-500/5 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
                    <ShieldAlert className="w-7 h-7 text-rose-400" />
                  </div>
                  <h4 className="text-white font-display font-bold text-base mb-1">{errorTitle}</h4>
                  <p className="text-white/40 text-xs max-w-sm mb-5 leading-relaxed">
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => onRetry ? onRetry() : window.location.reload()}
                    className="px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all"
                  >
                    Retry Connection
                  </button>
                </div>
              );
            }
            return (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-white/5 rounded-2xl bg-white/[0.015] flex-1">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                  <BrainCircuit className="w-7 h-7 text-purple-400" />
                </div>
                <h4 className="text-white font-display font-bold text-base mb-1">Start building your study profile</h4>
                <p className="text-white/40 text-xs max-w-sm mb-5 leading-relaxed">
                  Complete your first lesson quiz or assessment to unlock personalized guidance and active remediation plans.
                </p>
                <button
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="px-5 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition-colors shadow-lg shadow-purple-500/10"
                >
                  Start Learning
                </button>
              </div>
            );
          })() : (
          <>
            {/* SECTION 1 — COACH SUMMARY */}
            {coachData.coachSummary && (
              <div className={cn(
                "p-4 rounded-2xl border flex items-start gap-3 relative overflow-hidden backdrop-blur-sm",
                theme.border
              )}>
                {/* Subtle visual glow inside card */}
                <div className={cn(
                  "absolute -bottom-8 -right-8 w-24 h-24 blur-[24px] rounded-full pointer-events-none opacity-30",
                  theme.glow
                )} />

                <div className="text-xl flex-shrink-0 mt-0.5 leading-none">
                  {theme.emoji}
                </div>
                <div className="space-y-1">
                  <span className={cn("text-[9px] font-black uppercase tracking-widest block", theme.eyebrow)}>
                    {coachData.coachSummary.status.replace('_', ' ')}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-normal">
                    {coachData.coachSummary.title}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {coachData.coachSummary.message}
                  </p>
                  <p className="text-[9px] text-white/30 pt-1 border-t border-white/5 mt-2">
                    {coachData.coachSummary.reason}
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 2 — TODAY'S FOCUS METRICS */}
            {coachData.plan && (
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Today's Focus</p>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-white/35">Time</span>
                    <span className="text-sm font-display font-black text-white">
                      {coachData.plan.estimatedMinutes} <span className="text-[10px] font-normal text-white/40">min</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-white/35">Actions</span>
                    <span className="text-sm font-display font-black text-white">
                      {coachData.plan.actionCount} <span className="text-[10px] font-normal text-white/40">tasks</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-white/35">Evidence</span>
                    <span className={cn(
                      "text-sm font-display font-black",
                      coachData.evidence.level === 'STRONG' ? 'text-emerald-400' :
                      coachData.evidence.level === 'SUFFICIENT' ? 'text-cyan-400' :
                      coachData.evidence.level === 'LIMITED' ? 'text-amber-400' : 'text-white/40'
                    )}>
                      {coachData.evidence.level}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3 — RECOMMENDED PLAN */}
            {coachData.plan?.actions && coachData.plan.actions.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Recommended Plan</p>
                <div className="space-y-2.5">
                  {coachData.plan.actions.map((action: any) => {
                    const Icon = ACTION_ICONS[action.type as keyof typeof ACTION_ICONS] || BookOpen;
                    return (
                      <div
                        key={action.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleTaskClick(action)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleTaskClick(action);
                          }
                        }}
                        className="group flex items-center justify-between p-3 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:bg-white/[0.04]"
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={cn(
                              "text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                              action.label === 'Do First' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10' :
                              action.label === 'Then' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/10' :
                              'bg-white/5 text-white/50 border border-white/5'
                            )}>
                              {action.label}
                            </span>
                            <span className="text-[10px] font-semibold text-white/40 flex items-center gap-1">
                              <Icon className="w-3 h-3 text-purple-400" />
                              {action.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                            {action.title}
                          </p>
                          <p className="text-[10px] text-white/35 mt-0.5 truncate leading-relaxed">
                            {action.description || 'Targeted activity to reinforce performance.'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-lg">
                            {action.estimatedMinutes} min
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors group-hover:translate-x-0.5 duration-200" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
