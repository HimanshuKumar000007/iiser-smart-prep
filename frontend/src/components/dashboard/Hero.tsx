import { motion } from 'motion/react';
import {
  PlayCircle,
  Target,
  CheckCircle2,
  Circle,
  Zap,
  Atom,
  Dna,
  Compass,
  FlaskConical,
  Calculator,
  BookMarked,
  FileText,
  Microscope,
  ClipboardList,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { DashboardData, TodayTask } from '../../hooks/useDashboardData';
import { CanonicalStudentAction } from '../../hooks/useStudentActionPlan';
import { currentUser } from '../../data/mockData';
import { LESSONS_DATA } from '../../data/lessons';
import { useTheme } from '../../context/ThemeContext';

// ── Exam label from onboarding localStorage ──────────────────────────
function getExamLabel(): string {
  const raw = localStorage.getItem('onboarding_exam') || 'iiser';
  if (raw === 'nest') return 'NEST 2027';
  if (raw === 'both') return 'IAT & NEST 2027';
  return 'IISER IAT 2027';
}

// ── Time-of-day greeting ─────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5)  return 'Good Night';
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
}

// ── Extract first name only ──────────────────────────────────────────
function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

// ── Dynamic subject-specific recommendation (Last completed or next first) ──
function getSubjectRecommendation(subject: string, completedLessons: string[]): string {
  const completedSet = new Set(completedLessons || []);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lesson_') && localStorage.getItem(key) === 'completed') {
      completedSet.add(key);
    }
  }

  const subjectLessons = LESSONS_DATA.filter(l => l.subject.toLowerCase() === subject.toLowerCase());
  const completedList = subjectLessons.filter(l => completedSet.has(`lesson_${l.id}`));

  if (completedList.length > 0) {
    const storedLast = localStorage.getItem(`last_completed_lesson_${subject.toLowerCase()}`);
    if (storedLast) {
      return `Last: ${storedLast}`;
    }
    const lastLesson = completedList[completedList.length - 1];
    return `Last: ${lastLesson.title}`;
  }

  return 'No lesson completed yet';
}

function SubjectIcon({ subject, className }: { subject: string | null; className?: string }) {
  switch (subject) {
    case 'Physics':     return <Atom className={className} />;
    case 'Chemistry':   return <FlaskConical className={className} />;
    case 'Mathematics': return <Calculator className={className} />;
    case 'Biology':     return <Dna className={className} />;
    default:            return <Compass className={className} />;
  }
}

// ── Map task type → icon ─────────────────────────────────────────────
function taskIcon(type: TodayTask['type']) {
  switch (type) {
    case 'diagnostic': return ClipboardList;
    case 'lesson':     return BookMarked;
    case 'mock':       return FileText;
    case 'revision':   return Atom;
    case 'pyq':        return Microscope;
    default:           return Target;
  }
}

function taskColor(type: TodayTask['type']) {
  switch (type) {
    case 'diagnostic': return { color: 'text-cyan-400',    bg: 'bg-cyan-400/10',    border: 'border-cyan-400/20'    };
    case 'lesson':     return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
    case 'mock':       return { color: 'text-indigo-400',  bg: 'bg-indigo-400/10',  border: 'border-indigo-400/20'  };
    case 'revision':   return { color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20'   };
    case 'pyq':        return { color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-400/20'    };
    default:           return { color: 'text-white/60',    bg: 'bg-white/5',        border: 'border-white/10'       };
  }
}

// ── Subject grid config ───────────────────────────────────────────────
const SUBJECTS = [
  {
    name: 'Physics',
    colorClass: 'bg-indigo-500',
    bg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    icon: Atom,
    accent: 'indigo',
    recommendation: 'Units and Measurements',
    gradientBorder: 'hover:border-indigo-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]',
    barColor: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
  },
  {
    name: 'Chemistry',
    colorClass: 'bg-cyan-500',
    bg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    icon: FlaskConical,
    accent: 'cyan',
    recommendation: 'Chemical Bonding',
    gradientBorder: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.12)]',
    barColor: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
  },
  {
    name: 'Mathematics',
    colorClass: 'bg-amber-500',
    bg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    icon: Calculator,
    accent: 'amber',
    recommendation: 'Sets and Relations',
    gradientBorder: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.12)]',
    barColor: 'bg-gradient-to-r from-amber-500 to-amber-400',
  },
  {
    name: 'Biology',
    colorClass: 'bg-emerald-500',
    bg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    icon: Dna,
    accent: 'emerald',
    recommendation: 'Cell: Structure & Functions',
    gradientBorder: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]',
    barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  },
] as const;

interface Props {
  onNavigate?: (view: string) => void;
  dashboardData: DashboardData | null;
  loading: boolean;
  actionPlan?: any;
  actionPlanLoading?: boolean;
}

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export function Hero({ onNavigate, dashboardData: data, loading, actionPlan: plan, actionPlanLoading }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const markMissionCompleted = (actionId: string) => {
    const list = localStorage.getItem('completed_missions') || '';
    const arr = list ? list.split(',') : [];
    if (!arr.includes(actionId)) {
      arr.push(actionId);
      localStorage.setItem('completed_missions', arr.join(','));
    }
  };

  const completedIds = (localStorage.getItem('completed_missions') || '').split(',');

  function mapActionTypeToIconType(type: string): 'diagnostic' | 'lesson' | 'mock' | 'revision' | 'pyq' {
    if (type === 'RESUME_ACTIVE_LESSON' || type === 'START_NEW_LESSON') return 'lesson';
    if (type === 'COMPLETE_PENDING_QUIZ' || type === 'TAKE_RECOMMENDED_MOCK' || type === 'BUILD_MORE_MOCK_EVIDENCE') return 'mock';
    if (type === 'COMPLETE_DUE_REVISION' || type === 'REVISE_CRITICAL_CHAPTER') return 'revision';
    if (type === 'PRACTICE_WEAK_TOPIC') return 'pyq';
    return 'revision';
  }

  // Derive unified daily tasks from orchestrator plan
  const todaysTasks = (plan?.dailyMissions || []).map((m, idx) => ({
    id: idx + 1,
    actionId: m.id,
    title: m.title,
    subtitle: m.description,
    completed: completedIds.includes(m.id),
    type: mapActionTypeToIconType(m.type),
    route: m.route
  }));

  const handleCta = (action: CanonicalStudentAction) => {
    if (action.id) {
      markMissionCompleted(action.id);
    }
    if (action.route) {
      onNavigate?.(action.route);
    }
  };

  const examLabel       = getExamLabel();
  // Dynamically calculate days left until 7 June 2027
  const calculateDaysUntilExam = () => {
    const EXAM_DATE = new Date('2027-06-07T00:00:00');
    const today = new Date();
    const diffTime = EXAM_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };
  const daysUntilExam   = calculateDaysUntilExam();

  const displayName     = data?.displayName   ?? '...';
  const preparation     = data?.preparation   ?? 0;
  const levelLabel      = data?.levelLabel    ?? 'Beginner 🌱';
  const accuracy        = data?.accuracy      ?? 0;
  const streakDays      = data?.streak_days   ?? 0;
  const potentialGain   = data?.potentialGain ?? 6;
  const subjectMap      = data?.subjectMap    ?? { Physics: 0, Chemistry: 0, Mathematics: 0, Biology: 0 };

  const totalTasks      = todaysTasks.length;
  const completedTasks  = todaysTasks.filter(t => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalAttempts   = data?.total_attempts ?? 0;
  const completedLessonsCount = data?.completed_lessons_count ?? 0;
  const lessonXp        = completedLessonsCount * 25;
  const xpScore         = totalAttempts * 25 + streakDays * 50 + completedTasks * 15 + lessonXp;

  // ── Practice configuration based on Weak Area Engine ─────────────────
  const firstWeakSubject = data?.weakAreas?.[0]?.subject;
  const practiceRoute = firstWeakSubject ? `smart_lessons:${firstWeakSubject}` : 'smart_lessons';
  const practiceLabel = firstWeakSubject ? `Practice: ${firstWeakSubject}` : 'Quick Practice';
  const practiceSub = firstWeakSubject 
    ? `Practice key concepts in your weakest subject area.`
    : `Practice questions based on your syllabus progress.`;

  const getAiTutorUrl = (mode?: string) => {
    let url = '/ai_tutor.html';
    const params: string[] = [];
    if (mode) params.push(`mode=${mode}`);
    
    if (plan?.primaryAction) {
      if (plan.primaryAction.subject) {
        params.push(`subject=${encodeURIComponent(plan.primaryAction.subject)}`);
      }
      if (plan.primaryAction.chapterId) {
        params.push(`chapter=${encodeURIComponent(plan.primaryAction.chapterId)}`);
      }
    }
    
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    return url;
  };

  // Metric card config
  const hasData = (data?.total_attempts ?? 0) > 0 || (data?.completed_lessons_count ?? 0) > 0;

  const metrics = [
    {
      label: 'Target Exam',
      value: examLabel,
      sub: `${daysUntilExam} Days Left`,
      icon: Calendar,
      valueColor: isLight ? 'text-[#0F0E17]' : 'text-white',
      subColor: 'text-[#DC2626]',
      iconBg: isLight ? 'bg-[#F1EDFB]' : 'bg-rose-500/10',
      iconColor: isLight ? 'text-[#5B21B6]' : 'text-rose-400',
      border: isLight ? 'border-[#E9E7F2]' : 'border-rose-500/15 hover:border-rose-500/30',
      glow: 'hover:shadow-[0_4px_16px_rgba(91,33,182,0.1)]',
    },
    {
      label: 'Prep Index',
      value: hasData ? `${preparation}%` : 'Getting Started',
      sub: hasData ? levelLabel : 'No Evidence Yet',
      icon: BarChart3,
      valueColor: isLight ? 'text-[#5B21B6]' : 'text-cyan-400',
      subColor: isLight ? 'text-[#16A34A]' : 'text-emerald-400',
      iconBg: isLight ? 'bg-[#F1EDFB]' : 'bg-cyan-500/10',
      iconColor: isLight ? 'text-[#5B21B6]' : 'text-cyan-400',
      border: isLight ? 'border-[#E9E7F2]' : 'border-cyan-500/15 hover:border-cyan-500/30',
      glow: 'hover:shadow-[0_4px_16px_rgba(91,33,182,0.1)]',
    },
    {
      label: 'Impact Potential',
      value: hasData 
        ? (preparation < 50 ? 'High Growth' : preparation < 75 ? 'Accelerating' : 'Optimizing')
        : 'Baseline Stage',
      sub: 'Growth Stage',
      icon: TrendingUp,
      valueColor: isLight ? 'text-[#16A34A]' : 'text-emerald-400',
      subColor: isLight ? 'text-[#6B6779]' : 'text-white/40',
      iconBg: isLight ? 'bg-[#F1EDFB]' : 'bg-emerald-500/10',
      iconColor: isLight ? 'text-[#5B21B6]' : 'text-emerald-400',
      border: isLight ? 'border-[#E9E7F2]' : 'border-emerald-500/15 hover:border-emerald-500/30',
      glow: 'hover:shadow-[0_4px_16px_rgba(91,33,182,0.1)]',
    },
    {
      label: 'XP Earned',
      value: `${xpScore} XP`,
      sub: `${streakDays} Day Streak 🔥`,
      icon: Zap,
      valueColor: isLight ? 'text-[#D97706]' : 'text-amber-400',
      subColor: isLight ? 'text-[#6B6779]' : 'text-white/40',
      iconBg: isLight ? 'bg-amber-500/10' : 'bg-amber-500/10',
      iconColor: isLight ? 'text-[#D97706]' : 'text-amber-400',
      border: isLight ? 'border-[#E9E7F2]' : 'border-amber-500/15 hover:border-amber-500/30',
      glow: 'hover:shadow-[0_4px_16px_rgba(217,119,6,0.1)]',
    },
  ];

  return (
    <div className={cn(
      "rounded-3xl relative overflow-hidden",
      isLight
        ? "bg-[#FAFAFC] border border-[#E9E7F2]"
        : "bg-gradient-to-br from-[#0A0C16] via-[#06070E] to-[#080A12] border border-white/8 shadow-[0_0_100px_rgba(6,182,212,0.05)]"
    )}>

      {/* ── Ambient glows ──────────────────────────────────────────────── */}
      <div className={cn("absolute top-[-80px] right-[-60px] w-[480px] h-[480px] blur-[130px] rounded-full pointer-events-none", isLight ? "bg-purple-600/8" : "bg-indigo-600/6")} />
      <div className={cn("absolute bottom-[-60px] left-[-40px] w-[420px] h-[420px] blur-[120px] rounded-full pointer-events-none", isLight ? "bg-violet-500/8" : "bg-cyan-500/5")} />

      <div className="relative z-10 p-6 md:p-8 space-y-6">

        {/* ══ SECTION 1: Header — Greeting + Metrics ══════════════════════ */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          {/* Left — Greeting */}
          <div className="space-y-2.5">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest",
              isLight ? "bg-[#F1EDFB] border border-[#E9E7F2] text-[#5B21B6]" : "bg-cyan-500/8 border border-cyan-500/20 text-cyan-400"
            )}>
              <Sparkles className="w-3 h-3" />
              <span>Personalized Command Center</span>
            </div>

            <h1 className={cn("text-[1.75rem] sm:text-[2.1rem] font-display font-black tracking-tight leading-[1.1]", isLight ? "text-[#0F0E17]" : "text-white")}>
              {getGreeting()},{' '}
              <span className={cn("text-transparent bg-clip-text", isLight ? "bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED]" : "bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400")}>
                {firstName(displayName)}
              </span>
              <span> 👋</span>
            </h1>

            <p className={cn("text-[0.8125rem] leading-relaxed max-w-[420px]", isLight ? "text-[#6B6779]" : "text-white/45")}>
              Your personalized study space is active. Access smart lessons, simulated mocks, or get instant help below.
            </p>
          </div>

          {/* Right — Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto lg:min-w-[520px]">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp} initial="hidden" animate="show"
                transition={{ duration: 0.4, delay: 0.05 * i, ease: 'easeOut' }}
                className={cn(
                  'p-3 rounded-2xl border transition-all duration-300 cursor-default',
                  isLight
                    ? 'bg-white shadow-sm border-[#E9E7F2]'
                    : 'bg-white/[0.025] border-white/10',
                  m.glow
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center', m.iconBg)}>
                    <m.icon className={cn('w-3.5 h-3.5', m.iconColor)} />
                  </div>
                  <span className={cn('text-[9px] font-bold uppercase tracking-widest', isLight ? 'text-[#6B6779]' : 'text-white/30')}>{m.label}</span>
                </div>
                <span className={cn('text-[0.85rem] font-black block leading-tight', m.valueColor)}>{m.value}</span>
                <span className={cn('text-[10px] font-medium block mt-0.5', m.subColor)}>{m.sub}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ NEXT BEST ACTION CARD ══════════════════════════════════════ */}
        {plan && plan.primaryAction && plan.primaryAction.type !== 'NO_ACTION' && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            onClick={() => handleCta(plan.primaryAction)}
            className={cn(
              "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer",
              isLight
                ? "bg-gradient-to-r from-[#F8F6FD] to-[#F1EDFB] border-[#E9E7F2] shadow-sm hover:shadow-md"
                : "bg-gradient-to-r from-white/[0.03] to-white/[0.01] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-4">
                {/* Icon box */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                  isLight ? "bg-[#F1EDFB] border border-[#E9E7F2] text-[#5B21B6]" : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                )}>
                  <SubjectIcon subject={plan.primaryAction.subject} className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded",
                      isLight ? "bg-[#5B21B6] text-white" : "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                    )}>
                      Next Best Action
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded",
                      isLight ? "bg-[#D97706] text-white" :
                      plan.primaryAction.priorityBand === 'CRITICAL' ? "text-rose-400 bg-rose-500/15 border border-rose-500/20" :
                      plan.primaryAction.priorityBand === 'HIGH' ? "text-orange-400 bg-orange-500/15 border border-orange-500/20" :
                      "text-blue-400 bg-blue-500/15 border border-blue-500/20"
                    )}>
                      {plan.primaryAction.priorityBand} Priority
                    </span>
                    <span className={cn("text-[10px] font-medium", isLight ? "text-[#6B6779]" : "text-white/40")}>
                      Confidence: {plan.primaryAction.evidenceLevel}
                    </span>
                  </div>
                  <h2 className={cn("text-[1.125rem] font-bold mt-2 transition-colors", isLight ? "text-[#0F0E17] group-hover:text-[#5B21B6]" : "text-white group-hover:text-cyan-200")}>
                    {plan.primaryAction.title}
                  </h2>
                  <p className={cn("text-xs mt-1 leading-relaxed", isLight ? "text-[#6B6779]" : "text-white/50")}>
                    {plan.primaryAction.description}
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {plan.primaryAction.reasons.map((r, i) => (
                      <div key={i} className={cn("flex items-start gap-2 text-[11px] leading-relaxed", isLight ? "text-[#6B6779]" : "text-white/40")}>
                        <span className={cn("mt-0.5 shrink-0", isLight ? "text-[#5B21B6]" : "text-cyan-400")}>✦</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center md:justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCta(plan.primaryAction);
                  }}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 transform group-hover:translate-x-0.5",
                    isLight
                      ? "bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED] text-white shadow-[0_4px_12px_rgba(91,33,182,0.25)]"
                      : "bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black shadow-lg shadow-cyan-500/10"
                  )}
                >
                  <span>{plan.primaryAction.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ SECTION 3: Body Grid — Subjects + Mission ══════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-5">

          {/* ── Left: Subject Cards ──────────────────────────────────────── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="space-y-3"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className={cn("w-4 h-4", isLight ? "text-[#5B21B6]" : "text-cyan-400")} />
                <h3 className={cn("text-[0.85rem] font-bold uppercase tracking-wider", isLight ? "text-[#0F0E17]" : "text-white")}>Continue Revision</h3>
              </div>
              <button
                onClick={() => onNavigate?.('smart_lessons')}
                className={cn("text-[10.5px] font-bold transition-colors uppercase tracking-wider flex items-center gap-1 group", isLight ? "text-[#5B21B6] hover:text-[#6D28D9]" : "text-cyan-400 hover:text-cyan-300")}
              >
                <span>View Library</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Subject 2×2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBJECTS.map((sub, idx) => {
                const progressScore = data?.lessonProgressMap?.[sub.name] ?? 0;
                const recText       = getSubjectRecommendation(sub.name, data?.completed_lessons || []);

                // Functional progress bar color coding: green ≥70%, amber 40-69%, violet/gray <40%
                const barFillClass = progressScore >= 70
                  ? 'bg-[#16A34A]'
                  : progressScore >= 40
                    ? 'bg-[#D97706]'
                    : isLight ? 'bg-[#5B21B6]' : sub.barColor;

                return (
                  <motion.div
                    key={sub.name}
                    variants={fadeUp} initial="hidden" animate="show"
                    transition={{ duration: 0.35, delay: 0.22 + idx * 0.06, ease: 'easeOut' }}
                    onClick={() => onNavigate?.(`smart_lessons:${sub.name}`)}
                    className={cn(
                      'p-4 rounded-2xl border transition-all duration-300 cursor-pointer group',
                      isLight
                        ? 'bg-white border-[#E9E7F2] shadow-sm hover:shadow-md'
                        : 'bg-white/[0.015] hover:bg-white/[0.03] border-white/6',
                      !isLight && sub.gradientBorder, !isLight && sub.glow
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Consistent soft violet circle background for ALL 4 subject icons */}
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105',
                          isLight ? 'bg-[#F1EDFB] border-[#E9E7F2] text-[#5B21B6]' : sub.bg
                        )}>
                          <sub.icon className={cn('w-5 h-5', isLight ? 'text-[#5B21B6]' : sub.iconColor)} />
                        </div>
                        <div>
                          <h4 className={cn("text-[0.875rem] font-bold transition-colors", isLight ? "text-[#0F0E17] group-hover:text-[#5B21B6]" : "text-white group-hover:text-cyan-200")}>
                            {sub.name}
                          </h4>
                          <p className={cn("text-[10px] mt-0.5 max-w-[140px] truncate", isLight ? "text-[#6B6779]" : "text-white/35")}>
                            {recText}
                          </p>
                        </div>
                      </div>

                      {/* Play button */}
                      <div className={cn(
                        'w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200',
                        isLight
                          ? 'bg-[#F3F2F9] border-[#E9E7F2] text-[#6B6779] group-hover:bg-[#5B21B6] group-hover:text-white'
                          : 'bg-white/5 border-white/10 text-white/30 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black'
                      )}>
                        <PlayCircle className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={cn("text-[9px] font-bold uppercase tracking-wider", isLight ? "text-[#6B6779]" : "text-white/25")}>Syllabus Progress</span>
                        <span className={cn("text-[10px] font-bold", isLight ? "text-[#0F0E17]" : "text-white/60")}>{progressScore}%</span>
                      </div>
                      <div className={cn("w-full h-[4px] rounded-full overflow-hidden", isLight ? "bg-[#F3F2F9]" : "bg-white/5")}>
                        <div
                          className={cn('h-full rounded-full transition-all duration-700', barFillClass)}
                          style={{ width: `${Math.max(progressScore, 3)}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Streak & Accuracy footer */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                {
                  icon: Zap, label: 'Revision Streak', value: `${streakDays} Days`,
                  iconBg: isLight ? 'bg-amber-500/10 border-amber-500/15' : 'bg-amber-500/10 border-amber-500/15', iconColor: 'text-[#D97706]',
                  valueColor: isLight ? 'text-[#D97706]' : 'text-amber-300',
                },
                {
                  icon: Target, label: 'Avg Accuracy', value: hasData ? `${accuracy.toFixed(1)}%` : 'Not Evaluated',
                  iconBg: isLight ? 'bg-emerald-500/10 border-emerald-500/15' : 'bg-emerald-500/10 border-emerald-500/15', iconColor: 'text-[#16A34A]',
                  valueColor: isLight ? 'text-[#16A34A]' : 'text-emerald-300',
                },
              ].map((stat) => (
                <div key={stat.label} className={cn(
                  'p-3.5 rounded-2xl flex items-center gap-3',
                  isLight
                    ? 'bg-white border border-[#E9E7F2] shadow-sm'
                    : 'bg-white/[0.015] border border-white/6'
                )}>
                  <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center shrink-0', stat.iconBg)}>
                    <stat.icon className={cn('w-4.5 h-4.5', stat.iconColor)} />
                  </div>
                  <div>
                    <span className={cn("text-[9px] font-bold block uppercase tracking-widest", isLight ? "text-[#6B6779]" : "text-white/30")}>{stat.label}</span>
                    <span className={cn('text-[1.05rem] font-display font-black', stat.valueColor)}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Smart Study Assistant (AI Feature) ────────────────── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
            className={cn(
              'flex flex-col rounded-2xl overflow-hidden min-h-[350px] relative group/assistant',
              isLight
                ? 'bg-[#F1EDFB] border border-[#E9E7F2] shadow-sm'
                : 'bg-white/[0.015] border border-white/6'
            )}
          >
            {/* Header */}
            <div className={cn(
              'flex items-center justify-between px-5 pt-5 pb-4 border-b relative z-10',
              isLight ? 'border-[#E9E7F2]' : 'border-white/5'
            )}>
              <div className="flex items-center gap-2.5">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", isLight ? "bg-white text-[#5B21B6] shadow-sm border border-[#E9E7F2]" : "bg-purple-500/10 border border-purple-500/20 text-purple-400")}>
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className={cn("text-[0.8rem] font-bold uppercase tracking-wider", isLight ? "text-[#0F0E17]" : "text-white")}>Smart Study Assistant</h3>
                  <p className={cn("text-[9.5px] mt-0.5", isLight ? "text-[#6B6779]" : "text-white/35")}>Learn, practice, or get help instantly</p>
                </div>
              </div>

              <span className={cn(
                "text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider",
                isLight ? "bg-[#5B21B6] text-white" : "border border-purple-500/20 bg-purple-500/10 text-purple-300"
              )}>
                AI Active
              </span>
            </div>

            {/* Content Actions */}
            <div className="flex-1 px-5 py-4 space-y-3 relative z-10 flex flex-col justify-start">
              {/* Primary Action — Ask a Doubt */}
              <div 
                onClick={() => {
                  window.location.href = getAiTutorUrl();
                }}
                className={cn(
                  'group/btn p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4',
                  isLight
                    ? 'bg-white border-[#E9E7F2] hover:border-[#5B21B6] shadow-sm'
                    : 'border-white/5 bg-white/[0.025] hover:bg-white/[0.05] hover:border-purple-500/20'
                )}
              >
                <div className="min-w-0">
                  <h4 className={cn("text-xs font-bold transition-colors", isLight ? "text-[#0F0E17] group-hover/btn:text-[#5B21B6]" : "text-white group-hover/btn:text-purple-300")}>Ask a Doubt</h4>
                  <p className={cn("text-[10px] mt-0.5 leading-relaxed", isLight ? "text-[#6B6779]" : "text-white/40")}>
                    Get help with any Physics, Chemistry, Mathematics, or Biology question.
                  </p>
                </div>
                <button className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg border transition-all shrink-0",
                  isLight ? "bg-[#F3F2F9] border-[#E9E7F2] text-[#5B21B6] group-hover/btn:bg-[#5B21B6] group-hover/btn:text-white" : "bg-white/5 border-white/10 text-white/40 group-hover/btn:bg-purple-500 group-hover/btn:text-black"
                )}>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Secondary Action — Explain a Concept */}
                <div 
                  onClick={() => {
                    window.location.href = getAiTutorUrl('EXPLAIN_CONCEPT');
                  }}
                  className={cn(
                    'group/btn2 p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px]',
                    isLight
                      ? 'bg-white border-[#E9E7F2] hover:border-[#5B21B6] shadow-sm'
                      : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-purple-500/10'
                  )}
                >
                  <h4 className={cn("text-[11px] font-bold transition-colors", isLight ? "text-[#0F0E17] group-hover/btn2:text-[#5B21B6]" : "text-white group-hover/btn2:text-purple-300")}>Explain a Concept</h4>
                  <p className={cn("text-[9.5px] mt-1 leading-normal", isLight ? "text-[#6B6779]" : "text-white/35")}>
                    Learn difficult topics with step-by-step explanations.
                  </p>
                </div>

                {/* Secondary Action — Quick Practice */}
                <div 
                  onClick={() => {
                    onNavigate?.(practiceRoute);
                  }}
                  className={cn(
                    'group/btn3 p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px]',
                    isLight
                      ? 'bg-white border-[#E9E7F2] hover:border-[#5B21B6] shadow-sm'
                      : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-indigo-500/10'
                  )}
                >
                  <h4 className={cn("text-[11px] font-bold truncate transition-colors", isLight ? "text-[#0F0E17] group-hover/btn3:text-[#5B21B6]" : "text-white group-hover/btn3:text-indigo-300")}>
                    {practiceLabel}
                  </h4>
                  <p className={cn("text-[9.5px] mt-1 leading-normal", isLight ? "text-[#6B6779]" : "text-white/35")}>
                    {practiceSub}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Input Form */}
            <div className={cn(
              'relative border-t p-4 z-10',
              isLight ? 'border-[#E9E7F2] bg-[#F3F2F9]' : 'border-white/5 bg-white/[0.008]'
            )}>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const val = (form.elements.namedItem('doubtQuery') as HTMLInputElement).value.trim();
                  if (val) {
                    window.location.href = `/ai_tutor.html?query=${encodeURIComponent(val)}`;
                  }
                }} 
                className="relative flex items-center"
              >
                <input 
                  type="text" 
                  name="doubtQuery"
                  placeholder="Ask SmartPrep anything..."
                  className={cn(
                    'w-full border rounded-xl py-2.5 pl-4 pr-10 text-xs outline-none transition-colors',
                    isLight
                      ? 'bg-white border-[#E9E7F2] text-[#0F0E17] placeholder-[#A5A1B5] focus:border-[#5B21B6]'
                      : 'bg-[#05060F] border-white/8 text-white placeholder-white/25 focus:border-purple-500/30'
                  )}
                />
                <button type="submit" className={cn('absolute right-2 p-1.5 transition-colors', isLight ? 'text-[#6B6779] hover:text-[#5B21B6]' : 'text-white/30 hover:text-white')}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}