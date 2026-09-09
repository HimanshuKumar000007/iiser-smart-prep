import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  PlayCircle,
  Target,
  Zap,
  Atom,
  Dna,
  Compass,
  FlaskConical,
  Calculator,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Flame,
  BarChart3,
  Search,
  Bell,
  Maximize2,
  Trash2,
  Send,
  Cpu,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { DashboardData } from '../../hooks/useDashboardData';
import { CanonicalStudentAction } from '../../hooks/useStudentActionPlan';
import { currentUser } from '../../data/mockData';
import { LESSONS_DATA } from '../../data/lessons';
import { useTheme } from '../../context/ThemeContext';
import { FormattedAnswer } from './AiTutorHub';

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

// ── Subject grid config ───────────────────────────────────────────────
const SUBJECTS = [
  {
    name: 'Physics',
    colorClass: 'bg-indigo-500',
    bg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    icon: Atom,
    accent: 'indigo',
    recommendation: 'Units and Measurements',
    gradientBorder: 'hover:border-indigo-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.15)]',
    barColor: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
  },
  {
    name: 'Chemistry',
    colorClass: 'bg-cyan-500',
    bg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    icon: FlaskConical,
    accent: 'cyan',
    recommendation: 'Chemical Bonding',
    gradientBorder: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    barColor: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
  },
  {
    name: 'Mathematics',
    colorClass: 'bg-amber-500',
    bg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    icon: Calculator,
    accent: 'amber',
    recommendation: 'Sets and Relations',
    gradientBorder: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    barColor: 'bg-gradient-to-r from-amber-500 to-amber-400',
  },
  {
    name: 'Biology',
    colorClass: 'bg-emerald-500',
    bg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    icon: Dna,
    accent: 'emerald',
    recommendation: 'Cell: Structure & Functions',
    gradientBorder: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
  },
] as const;

// ── Quick Actions 2×2 Grid Config (4 cards, omitting practice arena) ─────────
const QUICK_ACTIONS = [
  {
    title: 'Smart Lessons',
    subtitle: 'Master core concepts',
    icon: BookOpen,
    iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.15)]',
    route: 'smart_lessons',
  },
  {
    title: 'PYQs (2017-2024)',
    subtitle: 'Solve past papers',
    icon: FileText,
    iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    route: 'pyqs',
  },
  {
    title: 'Mock Tests',
    subtitle: 'CBT exam simulation',
    icon: Clock,
    iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
    hoverBorder: 'hover:border-purple-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    route: 'mock_tests',
  },
  {
    title: 'Analytics',
    subtitle: 'Track your growth',
    icon: BarChart3,
    iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    route: 'analytics',
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

const ChatMessageItem = React.memo(function ChatMessageItem({
  msg,
  isLight
}: {
  msg: { role: 'user' | 'assistant'; content: string };
  isLight: boolean;
}) {
  const isUser = msg.role === 'user';
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed transition-all",
          isUser
            ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-br-none shadow-sm"
            : cn(
                "rounded-bl-none border",
                isLight
                  ? "bg-white border-slate-200 text-slate-800 shadow-sm"
                  : "bg-[#0b0e24]/90 border-purple-500/20 text-white/90"
              )
        )}
      >
        {msg.content ? (
          isUser ? (
            <div className="whitespace-pre-wrap">{msg.content}</div>
          ) : (
            <FormattedAnswer content={msg.content} />
          )
        ) : (
          <div className="flex items-center gap-1.5 text-purple-300 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[11px]">Thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
});

interface InlineChatInputProps {
  onSend: (text: string) => void;
  isStreaming: boolean;
  isLight: boolean;
}

const InlineChatInput = React.memo(
  React.forwardRef<HTMLInputElement, InlineChatInputProps>(
    function InlineChatInput({ onSend, isStreaming, isLight }, ref) {
      const [val, setVal] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = val.trim();
        if (!trimmed || isStreaming) return;
        onSend(trimmed);
        setVal('');
      };

      return (
        <div
          className={cn(
            'relative border-t p-3 sm:p-4 z-10',
            isLight ? 'border-slate-200/50 bg-white/40' : 'border-purple-500/15 bg-[#070916]/80'
          )}
        >
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              ref={ref}
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Ask SmartPrep anything (starts chat here)..."
              className={cn(
                'w-full border rounded-xl py-2.5 pl-4 pr-10 text-xs outline-none transition-all',
                isLight
                  ? 'bg-white/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500'
                  : 'bg-[#060814] border-white/10 text-white placeholder-white/30 focus:border-purple-500/60 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              )}
            />
            <button
              type="submit"
              disabled={!val.trim() || isStreaming}
              className={cn(
                'absolute right-2 p-1.5 transition-colors cursor-pointer',
                val.trim() && !isStreaming
                  ? (isLight ? 'text-purple-600 hover:text-purple-800' : 'text-purple-300 hover:text-white')
                  : 'text-white/20 cursor-not-allowed'
              )}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      );
    }
  )
);

export function Hero({ onNavigate, dashboardData: data, loading, actionPlan: plan }: Props) {
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

  const handleCta = (action: CanonicalStudentAction) => {
    if (action.id) {
      markMissionCompleted(action.id);
    }
    if (action.route) {
      onNavigate?.(action.route);
    }
  };

  // Dynamically calculate days left until 7 June 2027
  const calculateDaysUntilExam = () => {
    const EXAM_DATE = new Date('2027-06-07T00:00:00');
    const today = new Date();
    const diffTime = EXAM_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };
  const daysUntilExam = calculateDaysUntilExam();

  const storedName    = localStorage.getItem('currentUser') || currentUser.name || 'Himanshu';
  const preparation   = data?.preparation ?? 18;
  const accuracy      = data?.accuracy    ?? 0;
  const streakDays    = data?.streak_days ?? 0;
  const totalAttempts = data?.total_attempts ?? 0;

  const firstWeakSubject = data?.weakAreas?.[0]?.subject;
  const practiceRoute = firstWeakSubject ? `smart_lessons:${firstWeakSubject}` : 'smart_lessons';
  const practiceLabel = firstWeakSubject ? `Practice: ${firstWeakSubject}` : 'Quick Practice';
  const practiceSub   = firstWeakSubject 
    ? `Practice key concepts in your weakest subject area.`
    : `Practice questions based on your syllabus progress.`;

  // ── Inline Chat State for Smart Study Assistant ───────────
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>(() => {
    try {
      const saved = sessionStorage.getItem('smartprep_active_chat');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [isChatting, setIsChatting] = useState<boolean>(() => chatMessages.length > 0);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const inlineChatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isChatNearBottomRef = useRef<boolean>(true);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  const handleChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    isChatNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight <= 80;
  };

  useEffect(() => {
    if (isChatting && chatContainerRef.current && isChatNearBottomRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages.length, isChatting]);

  const handleSendInlineChat = async (queryText?: string) => {
    const q = (queryText || '').trim();
    if (!q || isStreaming) return;

    const newMsgs = [...chatMessages, { role: 'user' as const, content: q }];
    setChatMessages(newMsgs);
    setIsChatting(true);
    setIsStreaming(true);
    isChatNearBottomRef.current = true;
    try {
      sessionStorage.setItem('smartprep_active_chat', JSON.stringify(newMsgs));
    } catch {}
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 20);

    // Append placeholder for assistant
    setChatMessages([...newMsgs, { role: 'assistant', content: '' }]);

    // Construct userContext from student's live dashboard data
    const userContext = data ? {
      studentName: data.displayName || storedName || "Student",
      overallAccuracy: Math.round(data.accuracy || 0),
      totalAttempts: data.total_attempts || 0,
      streakDays: data.streak_days || 0,
      overallReadiness: Math.round(data.overallReadiness || 0),
      level: data.level || "Intermediate",
      subjectPerformance: data.subjectMap || {},
      weakAreas: data.weakAreas?.map(w => `${w.chapter || w.subject} (${Math.round(w.accuracy)}% accuracy)`),
      completedLessons: data.completed_lessons || [],
      daysLeft: daysUntilExam
    } : undefined;

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL ?? 'https://api.iisersmartprep.space';
      const res = await fetch(`${apiUrl}/api/ai-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
          userContext
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }

      if (!res.body) throw new Error('No stream available');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullAns = '';
      let lastRenderTime = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              const delta = data.choices?.[0]?.delta?.content || '';
              if (delta) {
                fullAns += delta;
                const now = performance.now();
                if (now - lastRenderTime > 60) {
                  lastRenderTime = now;
                  const currentText = fullAns;
                  setChatMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: currentText };
                    return updated;
                  });
                  if (isChatNearBottomRef.current && chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                  }
                }
              }
            } catch {}
          }
        }
      }

      // Final flush to ensure complete response is rendered
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: fullAns };
        return updated;
      });
      if (isChatNearBottomRef.current && chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      try {
        const finalChat = [...newMsgs, { role: 'assistant' as const, content: fullAns }];
        sessionStorage.setItem('smartprep_active_chat', JSON.stringify(finalChat));
      } catch {}
    } catch (err: any) {
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `⚠️ ${err.message || 'Unable to connect to AI assistant. Please try again.'}`
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleOpenFullScreen = () => {
    try {
      sessionStorage.setItem('smartprep_active_chat', JSON.stringify(chatMessages));
    } catch {}
    onNavigate?.('ai_doubt_solver');
  };

  const hasData = (data?.total_attempts ?? 0) > 0 || (data?.completed_lessons_count ?? 0) > 0;

  // Exact 4 metric cards matching screenshot UI/UX
  const metrics = [
    {
      label: 'Exam Target',
      value: `${daysUntilExam}`,
      subUnit: 'Days Left',
      subText: 'IISER IAT 2027',
      icon: Calendar,
      iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      route: 'path'
    },
    {
      label: 'Syllabus Progress',
      value: `${preparation}`,
      subUnit: '%',
      subText: 'Physics, Chem, Math, Bio',
      icon: BookOpen,
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      route: 'smart_lessons'
    },
    {
      label: 'Questions Solved',
      value: totalAttempts > 0 ? `${totalAttempts * 60}` : '60',
      subUnit: 'Attempted',
      subText: 'Target: 3,600 Qs',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      route: 'mock_tests'
    },
    {
      label: 'Study Habit',
      value: `${streakDays}`,
      subUnit: 'Day Streak',
      subText: streakDays > 0 ? 'Active Session' : 'Awaiting First Session',
      icon: Flame,
      iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      route: 'dashboard'
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* ══ SECTION 1: Header — Breadcrumb + Greeting + Desktop Search & Profile ════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left — Breadcrumb & Greeting */}
        <div className="space-y-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
            <span className={isLight ? "text-slate-500" : "text-white/50"}>Dashboard</span>
            <span className={isLight ? "text-slate-400" : "text-white/30"}>&gt;</span>
            <span className="text-cyan-400 font-semibold tracking-wider uppercase">IISER IAT 2027</span>
          </div>

          {/* Greeting */}
          <h1 className={cn(
            "text-xl sm:text-2xl lg:text-3xl font-display font-extrabold tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2 leading-tight",
            isLight ? "text-slate-900" : "text-white"
          )}>
            <span>Welcome back, {storedName}</span>
            <span className="text-xl sm:text-2xl">👋</span>
          </h1>

          {/* Subtitle */}
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/50")}>
            Your dedicated preparation command center for the IISER Aptitude Test.
          </p>
        </div>

        {/* Right — Desktop Search & Profile (matches reference screenshot) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onNavigate?.('smart_lessons')}
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs cursor-pointer transition-all duration-200 w-64 group",
              isLight
                ? "bg-white/80 border-slate-200/80 text-slate-400 hover:border-slate-300 hover:text-slate-600 shadow-sm"
                : "bg-[#0b0e1b]/80 border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/70 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            )}
          >
            <Search className="w-3.5 h-3.5 text-white/40 group-hover:text-cyan-400 transition-colors" />
            <span className="truncate">Search lessons, topics, questions...</span>
          </div>

          <button 
            className={cn(
              "w-9 h-9 rounded-xl border flex items-center justify-center relative transition-all duration-200 cursor-pointer",
              isLight
                ? "bg-white/80 border-slate-200/80 text-slate-500 hover:text-slate-900"
                : "bg-[#0b0e1b]/80 border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-[1.5px] shadow-[0_0_15px_rgba(147,51,234,0.3)] shrink-0">
            <div className="w-full h-full rounded-full bg-[#0a0d1e] flex items-center justify-center text-xs font-bold text-white">
              {storedName ? storedName.charAt(0).toUpperCase() : 'H'}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 4 STANDALONE METRIC / KPI CARDS GRID (COMPACT 2×2 ON MOBILE) ═════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.35, delay: 0.05 * i, ease: 'easeOut' }}
            onClick={() => onNavigate?.(m.route)}
            className={cn(
              'p-3 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 relative group cursor-pointer overflow-hidden flex flex-col justify-between min-h-[105px] sm:min-h-[125px]',
              isLight
                ? 'bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md'
                : 'bg-[#0b0e1b]/80 border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0e1224] shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
            )}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-3">
              <span className={cn("text-[10px] sm:text-xs font-semibold tracking-tight truncate", isLight ? "text-slate-500" : "text-white/50")}>
                {m.label}
              </span>
              <div className={cn('w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 shadow-sm', m.iconBg)}>
                <m.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1 sm:gap-2 mb-1.5 sm:mb-3">
              <span className={cn("text-lg sm:text-2xl lg:text-3xl font-black font-display tracking-tight", isLight ? "text-slate-900" : "text-white")}>
                {m.value}
              </span>
              <span className={cn("text-[9px] sm:text-xs font-semibold truncate", isLight ? "text-slate-500" : "text-white/50")}>
                {m.subUnit}
              </span>
            </div>

            <div className="flex items-center justify-between text-[9.5px] sm:text-xs pt-1 border-t border-white/[0.04]">
              <span className={cn("font-semibold truncate", isLight ? "text-slate-600" : "text-white/70")}>
                {m.subText}
              </span>
              <ArrowUpRight className={cn("w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5", isLight ? "text-slate-400" : "text-white/40")} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Tier Divider 1 ────────────────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-1" />

      {/* ══ SECTION 2: NEXT BEST ACTION CARD (STANDALONE CARD) ══════════ */}
      {plan && plan.primaryAction && plan.primaryAction.type !== 'NO_ACTION' && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          onClick={() => handleCta(plan.primaryAction)}
          className={cn(
            "p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden group cursor-pointer",
            isLight
              ? "bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/50 border-indigo-200/80 shadow-md hover:border-cyan-400"
              : "bg-gradient-to-br from-[#0c1028]/95 via-[#090c20]/90 to-[#070916]/95 border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_35px_rgba(6,182,212,0.1),inset_0_1px_0_0_rgba(6,182,212,0.25)] backdrop-blur-xl hover:border-cyan-400/50"
          )}
        >
          <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-cyan-500/[0.07] blur-[90px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <SubjectIcon subject={plan.primaryAction.subject} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-500/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                    RECOMMENDED NEXT STEP
                  </span>
                  <span className="text-[10.5px] sm:text-[11px] font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.primaryAction.priorityBand || 'High'} Priority</span>
                  </span>
                </div>

                <h2 className={cn("text-sm sm:text-base lg:text-lg font-bold tracking-tight group-hover:text-cyan-300 transition-colors leading-snug", isLight ? "text-slate-900" : "text-white")}>
                  {plan.primaryAction.title}
                </h2>
                <p className={cn("text-xs sm:text-sm mt-1 leading-relaxed", isLight ? "text-slate-600" : "text-white/60")}>
                  {plan.primaryAction.description}
                </p>

                <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={cn("inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10.5px] sm:text-xs font-medium border", isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.08] text-white/75")}>
                    <FileText className="w-3 h-3 text-cyan-400" />
                    <span>Full 60 Questions</span>
                  </span>
                  <span className={cn("inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10.5px] sm:text-xs font-medium border", isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/[0.08] text-white/75")}>
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>180 Min Timed</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10.5px] sm:text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>Predicted Rank Boost</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center md:justify-end w-full md:w-auto mt-1 sm:mt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCta(plan.primaryAction);
                }}
                className="w-full md:w-auto justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#00b8db] hover:bg-[#00caef] text-slate-950 shadow-[0_0_24px_rgba(0,184,219,0.4)] hover:shadow-[0_0_32px_rgba(0,184,219,0.6)] transition-all flex items-center gap-2 cursor-pointer transform group-hover:translate-x-0.5"
              >
                <span>{plan.primaryAction.ctaLabel || 'Start Mock'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tier Divider 2 ────────────────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-1" />

      {/* ══ SECTION 3: Body Grid — Subjects + Assistant (STANDALONE CARDS) ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-4 sm:gap-5">

        {/* ── Left: Subject Cards ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <h3 className={cn("text-xs sm:text-sm font-bold tracking-tight uppercase", isLight ? "text-slate-900" : "text-white")}>
                Quick Actions
              </h3>
            </div>
            <span className={cn("text-[10.5px] sm:text-xs font-medium tracking-wide", isLight ? "text-slate-400" : "text-white/40")}>
              Core Shortcuts
            </span>
          </div>

          {/* Quick Actions 2×2 Grid (Responsive on all screens) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {QUICK_ACTIONS.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={fadeUp} initial="hidden" animate="show"
                transition={{ duration: 0.35, delay: 0.22 + idx * 0.06, ease: 'easeOut' }}
                onClick={() => onNavigate?.(item.route)}
                className={cn(
                  'p-3 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[96px] sm:min-h-[114px]',
                  isLight
                    ? 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white shadow-sm hover:shadow-md'
                    : 'bg-[#0b0e1b]/80 border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0e1224] shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)]',
                  item.hoverBorder, item.glow
                )}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={cn(
                    'w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-105 shrink-0 shadow-sm',
                    item.iconBg
                  )}>
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <ArrowRight className={cn(
                    "w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-200 group-hover:translate-x-0.5",
                    isLight ? "text-slate-300 group-hover:text-slate-600" : "text-white/20 group-hover:text-white/70"
                  )} />
                </div>

                <div>
                  <h4 className={cn(
                    "text-xs sm:text-sm font-bold truncate group-hover:text-cyan-300 transition-colors tracking-tight",
                    isLight ? "text-slate-900" : "text-white"
                  )}>
                    {item.title}
                  </h4>
                  <p className={cn(
                    "text-[9px] sm:text-[11px] truncate mt-0.5 font-medium",
                    isLight ? "text-slate-500" : "text-white/40"
                  )}>
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Capsule — Streak & Accuracy */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            {[
              {
                icon: Zap, label: 'Revision Streak', value: `${streakDays} Days`,
                iconBg: 'bg-amber-500/15 border-amber-500/30', iconColor: 'text-amber-400',
                valueColor: 'text-amber-400',
                pulseColor: 'bg-amber-400',
              },
              {
                icon: Target, label: 'Avg Accuracy', value: hasData ? `${accuracy.toFixed(1)}%` : 'Not Evaluated',
                iconBg: 'bg-emerald-500/15 border-emerald-500/30', iconColor: 'text-emerald-400',
                valueColor: 'text-emerald-400',
                pulseColor: 'bg-emerald-400',
              },
            ].map((stat) => (
              <div key={stat.label} className={cn(
                'p-2.5 sm:p-3.5 rounded-2xl flex items-center gap-2.5 sm:gap-3 border transition-all duration-200',
                isLight
                  ? 'bg-white/70 border-slate-200/80 shadow-sm'
                  : 'bg-[#0b0e1b]/80 border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/[0.14]'
              )}>
                <div className={cn('w-7 h-7 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-sm', stat.iconBg)}>
                  <stat.icon className={cn('w-3.5 h-3.5 sm:w-4.5 sm:h-4.5', stat.iconColor)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0 animate-pulse", stat.pulseColor)} />
                    <span className={cn("text-[8px] sm:text-[9px] font-bold uppercase tracking-wider sm:tracking-widest truncate", isLight ? "text-slate-400" : "text-white/40")}>{stat.label}</span>
                  </div>
                  <span className={cn('text-xs sm:text-sm font-display font-black tracking-tight block mt-0.5 truncate', stat.valueColor)}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Smart Study Assistant ────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
          className={cn(
            'flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[370px] relative group/assistant border transition-all duration-300',
            isLight
              ? 'bg-white/80 border-slate-200/80 shadow-md'
              : 'bg-gradient-to-b from-[#0e102a]/95 via-[#0a0c22]/90 to-[#070818]/95 border-purple-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(168,85,247,0.08),inset_0_1px_0_0_rgba(168,85,247,0.25)] backdrop-blur-xl hover:border-purple-500/40'
          )}
        >
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-purple-600/[0.12] blur-[70px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className={cn(
            'flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3.5 border-b relative z-10',
            isLight ? 'border-slate-200/60' : 'border-purple-500/15'
          )}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className={cn("text-xs font-bold uppercase tracking-wider", isLight ? "text-slate-800" : "text-white")}>
                  Smart Study Assistant
                </h3>
                <p className={cn("text-[10px] mt-0.5", isLight ? "text-slate-500" : "text-white/40")}>
                  Learn, practice, or get help instantly
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenFullScreen}
              className={cn(
                "flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer shadow-sm",
                isLight
                  ? "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                  : "border-purple-500/35 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 hover:border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
              )}
              title="Open full screen AI Tutor"
            >
              <span>Open Full Screen</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Content Area: Either Buttons OR Inline Chat Feed */}
          {(!isChatting && chatMessages.length === 0) ? (
            /* Default Mode: Action Cards */
            <div className="flex-1 px-5 py-4 space-y-3 relative z-10 flex flex-col justify-start">
              {/* Ask a Doubt */}
              <div 
                onClick={() => {
                  setIsChatting(true);
                  if (chatMessages.length === 0) {
                    setChatMessages([{
                      role: 'assistant',
                      content: "👋 Hi! I'm your Smart Study Assistant powered by NVIDIA AI. Ask me any doubt in Physics, Chemistry, Math, or Biology below!"
                    }]);
                  }
                  setTimeout(() => inlineInputRef.current?.focus(), 50);
                }}
                className={cn(
                  'p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group/btn',
                  isLight
                    ? 'bg-white/60 border-slate-200/80 hover:border-purple-400/40 shadow-sm'
                    : 'border-white/[0.08] bg-white/[0.02] hover:bg-purple-500/[0.06] hover:border-purple-500/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                )}
              >
                <div className="min-w-0">
                  <h4 className={cn("text-xs font-bold group-hover/btn:text-purple-300 transition-colors", isLight ? "text-slate-900" : "text-white")}>
                    Ask a Doubt
                  </h4>
                  <p className={cn("text-[10px] mt-0.5 leading-relaxed", isLight ? "text-slate-500" : "text-white/40")}>
                    Get help with any Physics, Chemistry, Mathematics, or Biology question.
                  </p>
                </div>
                <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/40 group-hover/btn:bg-purple-500 group-hover/btn:border-purple-400 group-hover/btn:text-black transition-all shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Explain a Concept */}
                <div 
                  onClick={() => {
                    const subj = plan?.primaryAction?.subject || "Physics";
                    const chap = plan?.primaryAction?.title || "Key High-Yield Exam Concept";
                    handleSendInlineChat(`Please explain the core concept of "${chap}" in ${subj} step-by-step with formulas, common traps, and key points for IISER IAT.`);
                  }}
                  className={cn(
                    'p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[85px] group/btn2',
                    isLight
                      ? 'bg-white/60 border-slate-200/80 hover:border-purple-400/40 shadow-sm'
                      : 'border-white/[0.08] bg-white/[0.02] hover:bg-purple-500/[0.06] hover:border-purple-500/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                  )}
                >
                  <h4 className={cn("text-[11px] font-bold group-hover/btn2:text-purple-300 transition-colors", isLight ? "text-slate-900" : "text-white")}>
                    Explain a Concept
                  </h4>
                  <p className={cn("text-[9.5px] mt-1 leading-normal", isLight ? "text-slate-500" : "text-white/40")}>
                    Learn difficult topics with step-by-step explanations.
                  </p>
                </div>

                {/* Quick Practice */}
                <div 
                  onClick={() => {
                    onNavigate?.(practiceRoute);
                  }}
                  className={cn(
                    'p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[85px] group/btn3',
                    isLight
                      ? 'bg-white/60 border-slate-200/80 hover:border-cyan-400/40 shadow-sm'
                      : 'border-white/[0.08] bg-white/[0.02] hover:bg-cyan-500/[0.06] hover:border-cyan-500/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                  )}
                >
                  <h4 className={cn("text-[11px] font-bold group-hover/btn3:text-cyan-300 transition-colors truncate", isLight ? "text-slate-900" : "text-white")}>
                    {practiceLabel}
                  </h4>
                  <p className={cn("text-[9.5px] mt-1 leading-normal", isLight ? "text-slate-500" : "text-white/40")}>
                    {practiceSub}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Active Inline Chat Feed */
            <div className="flex-1 px-4 py-3 relative z-10 flex flex-col justify-between min-h-[220px]">
              {/* Mini Toolbar */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Chatting (NVIDIA AI)
                  </span>
                  {data && (
                    <span className={cn(
                      "text-[9.5px] font-mono px-1.5 py-0.5 rounded border hidden sm:inline-flex items-center gap-1",
                      isLight 
                        ? "bg-cyan-50 border-cyan-200 text-cyan-800" 
                        : "bg-cyan-500/10 border-cyan-500/25 text-cyan-300"
                    )}>
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      Stats Synced ({Math.round(data.accuracy || 0)}% Acc)
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setChatMessages([]);
                    setIsChatting(false);
                    try { sessionStorage.removeItem('smartprep_active_chat'); } catch {}
                  }}
                  className={cn(
                    "text-[10px] flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer",
                    isLight ? "text-slate-500 hover:text-rose-600" : "text-white/40 hover:text-rose-400"
                  )}
                  title="Clear chat and return to quick actions"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Scrollable messages */}
              <div 
                ref={chatContainerRef}
                onScroll={handleChatScroll}
                className="flex-1 overflow-y-auto max-h-[210px] space-y-2.5 pr-1 custom-scrollbar"
              >
                {chatMessages.map((msg, idx) => (
                  <ChatMessageItem
                    key={idx}
                    msg={msg}
                    isLight={isLight}
                  />
                ))}
                <div ref={inlineChatEndRef} />
              </div>
            </div>
          )}

          {/* AI Input Form */}
          <InlineChatInput
            ref={inlineInputRef}
            onSend={handleSendInlineChat}
            isStreaming={isStreaming}
            isLight={isLight}
          />
        </motion.div>

      </div>
    </div>
  );
}