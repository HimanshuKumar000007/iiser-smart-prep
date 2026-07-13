import {
  LayoutDashboard,
  Map,
  BookOpen,
  BrainCircuit,
  Target,
  FileCheck,
  History,
  BarChart2,
  Settings,
  Sparkles,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { currentUser } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'path', icon: Map, label: 'My Path to IISER' },
  { id: 'smart_lessons', icon: BrainCircuit, label: 'Smart Lessons' },
  { id: 'practice', icon: Target, label: 'Practice' },
  { id: 'mock_tests', icon: FileCheck, label: 'Mock Tests' },
  { id: 'pyqs', icon: History, label: 'PYQs' },
  { id: 'analytics', icon: BarChart2, label: 'Performance Insights' },
  { id: 'settings', icon: Settings, label: 'Settings' },
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
        "fixed left-0 top-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300",
        theme === 'light'
          ? "bg-white/85 backdrop-blur-[12px] border-r border-slate-200/80 shadow-[2px_0_20px_rgba(15,23,42,0.05)]"
          : "bg-background border-r border-white/5",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className={cn("font-display font-bold text-xl tracking-tight", theme === 'light' ? "text-slate-800" : "text-white")}>
              SmartPrep
            </h1>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === currentView || (item.id === 'smart_lessons' && currentView.startsWith('smart_lessons'));
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (['dashboard', 'path', 'mock_tests', 'pyqs', 'analytics', 'smart_lessons', 'settings'].includes(item.id)) {
                      onNavigate?.(item.id);
                    }
                    onClose?.();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? (theme === 'light' ? "bg-cyan-500/10 text-cyan-700 shadow-sm" : "bg-white/10 text-white") 
                      : (theme === 'light' ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60" : "text-white/60 hover:text-white hover:bg-white/5")
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? (theme === 'light' ? "text-cyan-600" : "text-cyan-400") : "")} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          {/* Exam Selector Display */}
          <div className={cn(
            "p-4 rounded-xl border",
            theme === 'light'
              ? "bg-white/60 border-slate-200/60 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
              : "bg-white/5 border-white/5"
          )}>
            <p className={cn("text-xs mb-1 font-medium tracking-wider uppercase", theme === 'light' ? "text-slate-400" : "text-white/50")}>Current Target</p>
            <div className="flex items-baseline justify-between mb-3">
              <p className={cn("text-sm font-semibold", theme === 'light' ? "text-slate-800" : "text-white")}>{currentUser.exam}</p>
            </div>
            <div className={cn("h-1.5 w-full rounded-full overflow-hidden", theme === 'light' ? "bg-slate-100" : "bg-white/10")}>
               {/* Progress bar visual concept for time passed vs remaining */}
               <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-2/3" />
            </div>
            <p className={cn("text-xs mt-2", theme === 'light' ? "text-slate-600" : "text-white/70")}>
              <span className={cn("font-bold", theme === 'light' ? "text-cyan-600" : "text-cyan-400")}>{currentUser.daysUntilExam}</span> Days Remaining
            </p>
          </div>

          {/* Premium Upgrade */}
          <button 
            onClick={() => onNavigate?.('subscription')}
            className={cn(
              "w-full relative group overflow-hidden rounded-xl p-4 transition-all",
              theme === 'light'
                ? "bg-gradient-to-b from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 hover:border-indigo-500/40 shadow-sm"
                : "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-400/50"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-white/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="flex items-start gap-3 relative z-10">
              <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5" />
              <div className="text-left">
                <p className={cn("text-sm font-semibold", theme === 'light' ? "text-indigo-950" : "text-white")}>Upgrade to Pro</p>
                <p className={cn("text-xs mt-0.5", theme === 'light' ? "text-indigo-600/80" : "text-indigo-200/70")}>Unlock predicted ranks & deep analytics.</p>
              </div>
            </div>
          </button>

          {/* User Profile & Logout */}
          <div className={cn("pt-4 border-t flex items-center justify-between gap-3", theme === 'light' ? "border-slate-200/80" : "border-white/5")}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-left overflow-hidden">
                <p className={cn("text-sm font-semibold truncate", theme === 'light' ? "text-slate-800" : "text-white")}>
                  {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                </p>
                <p className={cn("text-[11px] truncate", theme === 'light' ? "text-slate-400" : "text-white/45")}>Student Profile</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button 
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  theme === 'light' ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-white/40 hover:text-white/80 hover:bg-white/5"
                )}
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  localStorage.removeItem('onboarding_completed');
                  localStorage.removeItem('IAT_TOKEN');
                  window.location.href = 'index.html';
                }}
                className={cn(
                  "p-2 rounded-lg transition-all cursor-pointer",
                  theme === 'light' ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100" : "text-white/40 hover:text-white/80 hover:bg-white/5"
                )}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
