import {
  LayoutDashboard,
  Map,
  BookOpen,
  BrainCircuit,
  FileCheck,
  History,
  BarChart2,
  Settings,
  Sparkles,
  LogOut,
  Sun,
  Moon,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { currentUser } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useEntitlement } from '../../hooks/useEntitlement';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'path', icon: Map, label: 'My Path to IISER' },
  { id: 'smart_lessons', icon: BrainCircuit, label: 'Smart Lessons' },
  { id: 'mock_tests', icon: FileCheck, label: 'Mock Tests' },
  { id: 'pyqs', icon: History, label: 'PYQs' },
  { id: 'analytics', icon: BarChart2, label: 'Performance Insights' },
  { id: 'subscription', icon: Sparkles, label: 'Pricing Plans' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'support', icon: HelpCircle, label: 'Support & Help' },
  { id: 'feedback', icon: ThumbsUp, label: 'Send Feedback' },
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
  const { isPro } = useEntitlement();
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
          ? "bg-white border-r border-[#E9E7F2] shadow-[2px_0_20px_rgba(15,23,42,0.03)]"
          : "bg-background border-r border-white/5",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED] flex items-center justify-center shadow-[0_4px_12px_rgba(91,33,182,0.3)]">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className={cn("font-display font-bold text-xl tracking-tight", theme === 'light' ? "text-[#0F0E17]" : "text-white")}>
              SmartPrep
            </h1>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === currentView || 
                (item.id === 'smart_lessons' && currentView.startsWith('smart_lessons')) ||
                (item.id === 'subscription' && currentView.startsWith('subscription'));
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (['dashboard', 'path', 'mock_tests', 'pyqs', 'analytics', 'smart_lessons', 'subscription', 'settings', 'support', 'feedback'].includes(item.id)) {
                      onNavigate?.(item.id);
                    }
                    onClose?.();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? (theme === 'light' ? "bg-[#F1EDFB] text-[#5B21B6] font-semibold" : "bg-white/10 text-white") 
                      : (theme === 'light' ? "text-[#6B6779] hover:text-[#0F0E17] hover:bg-[#F3F2F9]" : "text-white/60 hover:text-white hover:bg-white/5")
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? (theme === 'light' ? "text-[#5B21B6]" : "text-cyan-400") : (item.id === 'subscription' ? "text-amber-500" : ""))} />
                  {item.label}
                  {item.id === 'subscription' && !isPro && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] text-white">
                      PRO
                    </span>
                  )}
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
              ? "bg-[#F3F2F9] border-[#E9E7F2]"
              : "bg-white/5 border-white/5"
          )}>
            <p className={cn("text-xs mb-1 font-medium tracking-wider uppercase", theme === 'light' ? "text-[#6B6779]" : "text-white/50")}>Current Target</p>
            <div className="flex items-baseline justify-between mb-3">
              <p className={cn("text-sm font-semibold", theme === 'light' ? "text-[#0F0E17]" : "text-white")}>{currentUser.exam}</p>
            </div>
            <div className={cn("h-1.5 w-full rounded-full overflow-hidden", theme === 'light' ? "bg-[#E9E7F2]" : "bg-white/10")}>
               {/* Progress bar visual concept for time passed vs remaining */}
               <div className="h-full bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED] w-2/3" />
            </div>
            <p className={cn("text-xs mt-2", theme === 'light' ? "text-[#6B6779]" : "text-white/70")}>
              <span className={cn("font-bold", theme === 'light' ? "text-[#5B21B6]" : "text-cyan-400")}>{currentUser.daysUntilExam}</span> Days Remaining
            </p>
          </div>

          {/* Premium Upgrade */}
          {!isPro && (
            <button 
              onClick={() => onNavigate?.('subscription')}
              className={cn(
                "w-full relative group overflow-hidden rounded-xl p-4 transition-all text-white",
                theme === 'light'
                  ? "bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED] shadow-[0_4px_12px_rgba(91,33,182,0.25)]"
                  : "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-400/50"
              )}
            >
              <div className="flex items-start gap-3 relative z-10">
                <Sparkles className="w-5 h-5 text-amber-300 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
                  <p className="text-xs mt-0.5 text-purple-200">Unlock predicted ranks & deep analytics.</p>
                </div>
              </div>
            </button>
          )}

          {/* User Profile & Logout */}
          <div className={cn("pt-4 border-t flex items-center justify-between gap-3", theme === 'light' ? "border-[#E9E7F2]" : "border-white/5")}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E1B4B] via-[#4C1D95] to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-[0_2px_8px_rgba(91,33,182,0.25)]">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-left overflow-hidden">
                <p className={cn("text-sm font-semibold truncate", theme === 'light' ? "text-[#0F0E17]" : "text-white")}>
                  {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                </p>
                <p className={cn("text-[11px] truncate", theme === 'light' ? "text-[#6B6779]" : "text-white/45")}>Student Profile</p>
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
