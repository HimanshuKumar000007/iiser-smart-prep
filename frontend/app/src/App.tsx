import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import StudyGroups from './pages/StudyGroups';
import Battles from './pages/Battles';
import MockTests from './pages/MockTests';
import AIDoubts from './pages/AIDoubts';
import Analytics from './pages/Analytics';
import type { Page } from './types';
import { supabase } from './lib/supabase';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Just mark ready once session check is done — no redirect
    supabase.auth.getSession().finally(() => setReady(true));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':    return <Dashboard />;
      case 'study-groups': return <StudyGroups />;
      case 'battles':      return <Battles />;
      case 'mock-tests':   return <MockTests />;
      case 'ai-doubts':    return <AIDoubts />;
      case 'analytics':    return <Analytics />;
      default:             return <Dashboard />;
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
            <span className="text-2xl text-white font-bold">✦</span>
          </div>
          <p className="text-gray-400 text-sm">Loading IISER Smart Prep...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="relative flex h-screen">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="flex-1 overflow-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
