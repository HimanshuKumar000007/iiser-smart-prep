import {
  LayoutDashboard,
  Map,
  BookOpen,
  BrainCircuit,
  FileCheck,
  History,
  BarChart2,
  AlertTriangle,
  Calendar,
  Sparkles,
  Crosshair,
  MessageSquareQuote,
  Sliders,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { currentUser } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useEntitlement } from '../../hooks/useEntitlement';
import { Analytics } from '../../lib/analytics';

interface NavItem {
  id: string;
  icon: any;
  label: string;
  badge?: string;
  badgeType?: 'default' | 'new';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'PREPARE',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'path', icon: Map, label: 'My Path to IISER' },
      { id: 'smart_lessons', icon: BookOpen, label: 'Smart Lessons' },
      { id: 'pyqs', icon: History, label: 'PYQs' },
      { id: 'practice_arena', icon: Crosshair, label: 'Practice Arena' },
      { id: 'mock_tests', icon: FileCheck, label: 'Mock Test Ce...', badge: '45+ Tests' },
    ]
  },
  {
    title: 'ANALYZE',
    items: [
      { id: 'analytics', icon: BarChart2, label: 'Performance' },
      { id: 'weak_areas', icon: AlertTriangle, label: 'Weak Areas' },
    ]
  },
  {
    title: 'PLAN',
    items: [
      { id: 'planner', icon: Calendar, label: 'Study Planner' },
    ]
  },
  {
    title: 'AI & TOOLS',
    items: [
      { id: 'ai_doubt_solver', icon: MessageSquareQuote, label: 'AI Doubt Solver', badge: 'NEW', badgeType: 'new' },
    ]
  }
];

export function Sidebar({ 
  isOpen = false, 
  onClose,
  currentView = 'dashboard',
  onNavigate
}: { 
  isOpen?: boolean; 
  onClose?: () => void;
  currentView?: string;
  onNavigate?: (view: any) => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const { isPro } = useEntitlement();

  const storedName = localStorage.getItem('currentUser') || currentUser.name || 'Himanshu Kumar';
  const userInitial = storedName.charAt(0).toUpperCase() || 'H';

  // Dynamic days left until June 7, 2027
  const calculateDaysUntilExam = () => {
    const EXAM_DATE = new Date('2027-06-07T00:00:00');
    const today = new Date();
    const diffTime = EXAM_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };
  const daysUntilExam = calculateDaysUntilExam();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300 select-none",
        isLight
          ? "bg-white/90 backdrop-blur-xl border-r border-slate-200/80 shadow-[2px_0_20px_rgba(15,23,42,0.05)]"
          : "bg-[#080a14] border-r border-white/[0.08]",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* ── TOP LOGO HEADER ── */}
        <div className="p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={cn("font-display font-bold text-base tracking-tight leading-none", isLight ? "text-slate-900" : "text-white")}>
                  SmartPrep
                </h1>
                <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 rounded leading-none">
                  IAT
                </span>
              </div>
              <p className={cn("text-[10px] font-medium tracking-wide mt-1", isLight ? "text-slate-400" : "text-white/40")}>
                IISER IAT 2027
              </p>
            </div>
          </div>
        </div>

        {/* ── CATEGORIZED NAVIGATION LIST (SCROLLABLE) ── */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-4 custom-scrollbar">
          {navSections.map(section => (
            <div key={section.title} className="space-y-1">
              <p className={cn("text-[10px] font-bold uppercase tracking-widest px-3 py-1", isLight ? "text-slate-400" : "text-white/35")}>
                {section.title}
              </p>
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = item.id === currentView || 
                  (item.id === 'smart_lessons' && currentView.startsWith('smart_lessons')) ||
                  (item.id === 'mock_tests' && currentView.startsWith('mock_tests')) ||
                  (item.id === 'pyqs' && currentView.startsWith('pyqs'));

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'ai_doubt_solver') {
                        onNavigate?.('ai_doubt_solver');
                        onClose?.();
                        return;
                      }
                      if (item.id === 'practice_arena') {
                        onNavigate?.('smart_lessons');
                        onClose?.();
                        return;
                      }
                      if (item.id === 'weak_areas') {
                        onNavigate?.('analytics');
                        onClose?.();
                        return;
                      }
                      if (item.id === 'planner') {
                        onNavigate?.('path');
                        onClose?.();
                        return;
                      }
                      onNavigate?.(item.id);
                      onClose?.();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group cursor-pointer",
                      isActive
                        ? (isLight 
                            ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 shadow-sm font-semibold" 
                            : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.12)]")
                        : (isLight 
                            ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70" 
                            : "text-white/60 hover:text-white hover:bg-white/[0.04]")
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? (isLight ? "text-cyan-600" : "text-cyan-400") : "text-white/50 group-hover:text-white/80"
                    )} />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "ml-auto text-[9px] shrink-0 leading-tight transition-all",
                        item.badgeType === 'new' || item.badge === 'NEW'
                          ? (isLight
                              ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-black px-2 py-0.5 rounded-full border border-cyan-500/40 shadow-sm uppercase tracking-wider"
                              : "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-black px-2 py-0.5 rounded-full border border-cyan-300/40 shadow-[0_0_12px_rgba(6,182,212,0.45)] uppercase tracking-wider")
                          : (isLight 
                              ? "bg-slate-100 border border-slate-200 text-slate-600 font-semibold px-1.5 py-0.5 rounded" 
                              : "bg-white/5 border border-white/10 text-white/60 font-semibold px-1.5 py-0.5 rounded")
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── SIDEBAR BOTTOM FOOTER ── */}
        <div className="p-3.5 pt-2 space-y-2.5 border-t border-white/[0.06]">
          {/* Target countdown display */}
          <div className={cn(
            "p-3 rounded-xl border transition-all",
            isLight
              ? "bg-slate-50 border-slate-200"
              : "bg-white/[0.02] border-white/[0.05]"
          )}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={cn("font-medium", isLight ? "text-slate-600" : "text-white/70")}>
                IISER IAT 2027
              </span>
              <span className="font-bold text-cyan-400">
                {daysUntilExam} Days Left
              </span>
            </div>
            <div className={cn("h-1 w-full rounded-full overflow-hidden", isLight ? "bg-slate-200" : "bg-white/10")}>
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-2/3" />
            </div>
          </div>

          {/* SmartPrep Pro Banner */}
          <button
            onClick={() => onNavigate?.('subscription')}
            className={cn(
              "w-full rounded-xl p-2.5 border text-left transition-all duration-200 group cursor-pointer flex items-center justify-between",
              isLight
                ? "bg-indigo-50/60 border-indigo-200/80 hover:border-indigo-400 shadow-sm"
                : "bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 border-indigo-500/25 hover:border-indigo-500/45 shadow-[0_0_15px_rgba(99,102,241,0.08)]"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className={cn("text-xs font-bold leading-tight truncate", isLight ? "text-indigo-950" : "text-white")}>
                  SmartPrep Pro
                </p>
                <p className={cn("text-[9.5px] leading-tight truncate mt-0.5", isLight ? "text-indigo-600" : "text-white/50")}>
                  Unlock 45+ Mocks & AI
                </p>
              </div>
            </div>
            <span className={cn(
              "text-xs transition-transform group-hover:translate-x-1 shrink-0 ml-2",
              isLight ? "text-indigo-600" : "text-cyan-400"
            )}>
              &rarr;
            </span>
          </button>

          {/* User Profile & Actions Row */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className={cn("text-xs font-bold truncate leading-tight", isLight ? "text-slate-800" : "text-white")}>
                  {storedName}
                </p>
                <p className={cn("text-[10px] truncate leading-tight mt-0.5", isLight ? "text-slate-400" : "text-white/40")}>
                  IISER Aspirant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button 
                onClick={toggleTheme}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  isLight ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
                title="Toggle Theme"
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={() => {
                  Analytics.track('User Logged Out');
                  Analytics.reset();
                  localStorage.removeItem('currentUser');
                  localStorage.removeItem('onboarding_completed');
                  localStorage.removeItem('IAT_TOKEN');
                  window.location.href = '/index.html';
                }}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer",
                  isLight ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
