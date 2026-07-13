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
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { currentUser } from '../../data/mockData';

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
        "fixed left-0 top-0 h-screen w-64 bg-background border-r border-white/5 flex flex-col z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-white">
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
                      ? "bg-white/10 text-white" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-cyan-400" : "")} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          {/* Exam Selector Display */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-xs text-white/50 mb-1 font-medium tracking-wider uppercase">Current Target</p>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm font-semibold text-white">{currentUser.exam}</p>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
               {/* Progress bar visual concept for time passed vs remaining */}
               <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-2/3" />
            </div>
            <p className="text-xs text-white/70 mt-2">
              <span className="text-cyan-400 font-bold">{currentUser.daysUntilExam}</span> Days Remaining
            </p>
          </div>

          {/* Premium Upgrade */}
          <button 
            onClick={() => onNavigate?.('subscription')}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 p-4 transition-all hover:border-indigo-400/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-white/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="flex items-start gap-3 relative z-10">
              <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
                <p className="text-xs text-indigo-200/70 mt-0.5">Unlock predicted ranks & deep analytics.</p>
              </div>
            </div>
          </button>

          {/* User Profile & Logout */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">
                  {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                </p>
                <p className="text-[11px] text-white/45 truncate">Student Profile</p>
              </div>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('onboarding_completed');
                localStorage.removeItem('IAT_TOKEN');
                window.location.href = 'index.html';
              }}
              className="p-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
