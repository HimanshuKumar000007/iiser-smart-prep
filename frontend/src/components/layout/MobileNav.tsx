import { useState } from 'react';
import { Home, BookOpen, Zap, FileText, Trophy, BookMarked, Target, PlayCircle, Map } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'path', icon: Map, label: 'My Path' },
  { id: 'smart_lessons', icon: BookOpen, label: 'Smart Lessons' },
  { id: 'quick_test', icon: FileText, label: 'Quick Test' },
  { id: 'mock_test', icon: Trophy, label: 'Mock Test' },
];

export function MobileNav({
  currentView = 'dashboard',
  onNavigate
}: {
  currentView?: string;
  onNavigate?: (view: any) => void;
}) {
  const [isStudyMenuOpen, setIsStudyMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const inactiveColor = isLight ? 'text-slate-400' : 'text-white/40';

  return (
    <>
      {/* Backdrop for Study Menu */}
      <AnimatePresence>
        {isStudyMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsStudyMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden mobile-nav-backdrop"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-6 pt-2 pointer-events-none mobile-nav-container">
        
        {/* Study Menu Popup */}
        <AnimatePresence>
          {isStudyMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className={cn(
                "absolute bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm backdrop-blur-xl border p-2 rounded-3xl pointer-events-auto overflow-hidden",
                isLight
                  ? 'bg-white/90 border-slate-200/60 shadow-[0_12px_40px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)]'
                  : 'bg-[#0A0C16]/95 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-1">
                <button
                  onClick={() => { onNavigate?.('/smart-lessons/bio_cell'); setIsStudyMenuOpen(false); }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Continue Reading</p>
                    <p className="text-white/50 text-xs">Cell Biology - Chapter 4</p>
                  </div>
                </button>

                <button
                  onClick={() => { onNavigate?.('smart_lessons'); setIsStudyMenuOpen(false); }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <BookMarked className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Recommended Notes</p>
                    <p className="text-white/50 text-xs">Based on weak areas</p>
                  </div>
                </button>

                <button
                  onClick={() => { onNavigate?.('path'); setIsStudyMenuOpen(false); }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Today's Mission</p>
                    <p className="text-white/50 text-xs">Complete 3 tasks</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn(
          'mx-auto max-w-md backdrop-blur-2xl border rounded-full px-1.5 py-1 sm:px-2 sm:py-1.5 flex items-center justify-between pointer-events-auto relative',
          isLight
            ? 'bg-white/88 border-slate-200/60 shadow-[0_8px_32px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]'
            : 'bg-[#05060F]/90 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
        )}>
          
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="flex-[1.2] flex justify-center py-2 relative"
          >
            <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1 mt-0.5">
              <Home className={cn("w-5 h-5 transition-colors", currentView === 'dashboard' ? "text-cyan-400" : inactiveColor)} />
              <span className={cn("text-[9px] sm:text-[10px] font-medium transition-colors", currentView === 'dashboard' ? "text-cyan-400" : inactiveColor)}>Home</span>
            </div>
            {currentView === 'dashboard' && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-400/10 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => onNavigate?.('path')}
            className="flex-[1.2] flex justify-center py-2 relative"
          >
            <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1 mt-0.5">
              <Map className={cn("w-5 h-5 transition-colors", currentView === 'path' ? "text-cyan-400" : inactiveColor)} />
              <span className={cn("text-[9px] sm:text-[10px] font-medium transition-colors whitespace-nowrap", currentView === 'path' ? "text-cyan-400" : inactiveColor)}>My Path</span>
            </div>
            {currentView === 'path' && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-400/10 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => onNavigate?.('smart_lessons')}
            className="flex-[1.2] flex justify-center py-2 relative"
          >
            <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1 mt-0.5">
              <BookOpen className={cn("w-5 h-5 transition-colors", currentView.startsWith('smart_lessons') ? "text-cyan-400" : inactiveColor)} />
              <span className={cn("text-[9px] sm:text-[10px] font-medium transition-colors whitespace-nowrap", currentView.startsWith('smart_lessons') ? "text-cyan-400" : inactiveColor)}>Lessons</span>
            </div>
            {currentView.startsWith('smart_lessons') && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-400/10 rounded-full" />
            )}
          </button>

          <div className="flex-1 flex justify-center relative">
             <button
              onClick={() => setIsStudyMenuOpen(!isStudyMenuOpen)}
              className={cn(
                "w-12 h-12 -mt-8 sm:w-14 sm:h-14 sm:-mt-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 relative z-20 group",
                isStudyMenuOpen ? "scale-95" : "hover:scale-105"
              )}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
            </button>
          </div>

          <button 
            onClick={() => onNavigate?.('pyqs')}
            className="flex-[1.2] flex justify-center py-2 relative"
          >
            <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1 mt-0.5">
              <FileText className={cn("w-5 h-5 transition-colors", currentView === 'pyqs' ? "text-cyan-400" : inactiveColor)} />
              <span className={cn("text-[9px] sm:text-[10px] font-medium transition-colors whitespace-nowrap", currentView === 'pyqs' ? "text-cyan-400" : inactiveColor)}>PYQs</span>
            </div>
            {currentView === 'pyqs' && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-400/10 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => onNavigate?.('mock_tests')}
            className="flex-[1.2] flex justify-center py-2 relative"
          >
            <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1 mt-0.5">
              <Trophy className={cn("w-5 h-5 transition-colors", currentView === 'mock_tests' ? "text-cyan-400" : inactiveColor)} />
              <span className={cn("text-[9px] sm:text-[10px] font-medium transition-colors whitespace-nowrap", currentView === 'mock_tests' ? "text-cyan-400" : inactiveColor)}>Mocks</span>
            </div>
            {currentView === 'mock_tests' && (
               <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-400/10 rounded-full" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
