import { motion } from 'framer-motion';
import {
  Target,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Trophy,
  Zap,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import type { Page } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface Profile {
  full_name?: string;
  rank?: number;
  xp?: number;
  accuracy?: number;
  questions_solved?: number;
  streak?: number;
}

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const quickActions = [
  {
    key: 'mock-tests' as const,
    title: 'Mock Tests',
    desc: 'Full-length & quick mocks based on 2026 IAT pattern',
    icon: Target,
    gradient: 'from-indigo-600 to-blue-600',
    bg: 'from-indigo-500/10 to-blue-500/10',
    border: 'border-indigo-500/30',
    glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
    internal: true,
  },
  {
    key: 'ai-doubts',
    title: 'AI Doubt Solver',
    desc: 'Ask any doubt from Physics, Chemistry, Math or Biology',
    icon: Sparkles,
    gradient: 'from-purple-600 to-pink-600',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    external: '/ai_tutor.html',
    internal: false,
  },
  {
    key: 'smart-notes',
    title: 'Smart Notes',
    desc: 'Chapter-wise notes, short summaries  & PYQs',
    icon: BookOpen,
    gradient: 'from-emerald-600 to-teal-600',
    bg: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/30',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    external: '/smart_notes/smart_notes_home.html',
    internal: false,
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('full_name, rank, xp, accuracy, questions_solved, streak')
            .eq('id', user.id)
            .single();
          if (data) setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAction = (action: typeof quickActions[number]) => {
    if (action.internal) {
      onNavigate(action.key as Page);
    } else if (action.external) {
      window.location.href = action.external;
    }
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* Welcome */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight line-clamp-2">
            Welcome back,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {firstName}
            </span>
            !
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Ready to crack IISER? Let's get started.
          </p>
        </div>

        {(profile?.streak ?? 0) > 0 && (
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/15 to-yellow-500/15 border border-orange-500/25"
          >
            <Flame className="w-6 h-6 text-orange-400" />
            <div>
              <p className="text-xl font-bold text-orange-300">{profile?.streak} Days</p>
              <p className="text-xs text-gray-400">Study Streak</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Stats row */}
      {profile && (profile.rank || profile.accuracy || profile.questions_solved) ? (
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profile.rank && (
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/15">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xl font-bold">#{profile.rank}</p>
                <p className="text-xs text-gray-400">Current Rank</p>
              </div>
            </div>
          )}
          {profile.accuracy && (
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/15">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xl font-bold">{profile.accuracy}%</p>
                <p className="text-xs text-gray-400">Accuracy</p>
              </div>
            </div>
          )}
          {profile.questions_solved && (
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/15">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xl font-bold">{profile.questions_solved.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Questions Solved</p>
              </div>
            </div>
          )}
        </motion.div>
      ) : null}

      {/* Main action cards */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold text-gray-300 mb-4">What would you like to do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.key}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(action)}
                className={`
                  relative overflow-hidden p-6 rounded-2xl text-left
                  bg-gradient-to-br ${action.bg}
                  border ${action.border}
                  transition-all duration-300 ${action.glow}
                  group flex flex-col gap-4
                `}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1.5">{action.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{action.desc}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  <span>Open</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Start Note */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/8 to-purple-500/8 border border-indigo-500/15 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 flex-shrink-0">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="font-semibold text-white mb-1">Pro Tip</p>
          <p className="text-sm text-gray-400">
            Start with a <span className="text-indigo-300 font-medium">Full Mock Test</span> to benchmark your level, then use <span className="text-purple-300 font-medium">AI Doubt Solver</span> to clear concepts you got wrong.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
