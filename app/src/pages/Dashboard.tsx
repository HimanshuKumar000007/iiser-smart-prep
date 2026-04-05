import { motion } from 'framer-motion';
import {
  Target,
  CheckCircle2,
  Trophy,
  Flame,
  TrendingUp,
  Clock,
  Zap,
  BookOpen,
  Users,
  ArrowRight,
  Star,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Button } from '@/components/ui/button';
import type { Task, PerformanceData } from '../types';

// Empty performance data — will be populated from real DB when available
const emptyPerformanceData: PerformanceData[] = [
  { date: 'Mon', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Tue', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Wed', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Thu', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Fri', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Sat', accuracy: 0, questions: 0, xp: 0 },
  { date: 'Sun', accuracy: 0, questions: 0, xp: 0 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  rank?: number;
  xp?: number;
  accuracy?: number;
  questions_solved?: number;
  streak?: number;
  avatar_url?: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Get current auth user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(profileData);

          // Fetch today's tasks if table exists
          const { data: taskData } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);
          if (taskData) setTasks(taskData);
        }
      } catch {
        // Supabase tables may not exist yet — fail silently
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const displayName = profile?.full_name?.split(' ')[0] || 'there';

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'practice': return <BookOpen className="w-4 h-4" />;
      case 'review': return <Target className="w-4 h-4" />;
      case 'battle': return <Zap className="w-4 h-4" />;
      case 'group': return <Users className="w-4 h-4" />;
    }
  };

  const getTaskColor = (type: Task['type']) => {
    switch (type) {
      case 'practice': return 'text-blue-400 bg-blue-400/10';
      case 'review': return 'text-purple-400 bg-purple-400/10';
      case 'battle': return 'text-orange-400 bg-orange-400/10';
      case 'group': return 'text-green-400 bg-green-400/10';
    }
  };

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
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">{displayName}</span>!
          </h1>
          {profile?.rank ? (
            <p className="text-gray-400 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              You're ranked <span className="text-white font-semibold">#{profile.rank}</span> globally
            </p>
          ) : (
            <p className="text-gray-400">Start studying to build your rank!</p>
          )}
        </div>
        {(profile?.streak ?? 0) > 0 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
          >
            <div className="p-2 rounded-xl bg-indigo-500/30">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{profile?.streak}</p>
              <p className="text-xs text-gray-400">Day Streak</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Accuracy Rate"
          value={profile?.accuracy ? `${profile.accuracy}%` : '—'}
          change={0}
          trend="neutral"
          icon={<Target className="w-6 h-6 text-indigo-400" />}
          glowColor="indigo"
        />
        <StatCard
          title="Questions Solved"
          value={profile?.questions_solved?.toLocaleString() ?? '—'}
          change={0}
          trend="neutral"
          icon={<CheckCircle2 className="w-6 h-6 text-green-400" />}
          glowColor="success"
        />
        <StatCard
          title="Current Rank"
          value={profile?.rank ? `#${profile.rank}` : '—'}
          change={0}
          trend="neutral"
          icon={<Trophy className="w-6 h-6 text-yellow-400" />}
          glowColor="warning"
        />
        <StatCard
          title="Study Streak"
          value={profile?.streak ? `${profile.streak} Days` : '—'}
          change={0}
          trend="neutral"
          icon={<Flame className="w-6 h-6 text-orange-400" />}
          glowColor="danger"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 rounded-2xl glass-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Performance Overview</h3>
              <p className="text-sm text-gray-400">Your accuracy and XP over the last 7 days</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-sm text-gray-400">Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-400">XP</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emptyPerformanceData}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#111827',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAccuracy)"
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorXP)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Empty state overlay if no real data */}
          {emptyPerformanceData.every(d => d.accuracy === 0) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-sm text-gray-500 bg-[#0B0F14]/70 px-4 py-2 rounded-xl border border-white/5">
                Complete mock tests to see your performance here
              </p>
            </div>
          )}
        </motion.div>

        {/* Today's Plan */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Today's Plan</h3>
              <p className="text-sm text-gray-400">AI-generated tasks</p>
            </div>
            {totalTasks > 0 && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">{completedTasks}/{totalTasks}</span>
              </div>
            )}
          </div>

          {tasks.length > 0 ? (
            <>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Daily Progress</span>
                  <span className="text-indigo-400 font-medium">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Tasks list */}
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      p-4 rounded-xl border transition-all duration-300
                      ${task.completed
                        ? 'bg-white/5 border-white/5 opacity-60'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${getTaskColor(task.type)}`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                            {task.title}
                          </p>
                          {task.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 truncate">{task.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.estimatedTime} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
              >
                View All Tasks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 space-y-2">
              <Star className="w-8 h-8 text-gray-600" />
              <p className="text-sm">No tasks yet.</p>
              <p className="text-xs">Start a mock test or AI session to get personalised tasks.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Start Mock Test',
            desc: 'Full-length IAT simulation',
            icon: Target,
            color: 'from-blue-500/20 to-cyan-500/20',
            borderColor: 'border-blue-500/30',
            page: 'mock-tests',
          },
          {
            title: 'Ask AI Doubt',
            desc: 'Get instant explanations',
            icon: Zap,
            color: 'from-purple-500/20 to-pink-500/20',
            borderColor: 'border-purple-500/30',
            page: 'ai-doubts',
          },
          {
            title: 'Join Battle',
            desc: 'Compete with peers',
            icon: TrendingUp,
            color: 'from-orange-500/20 to-red-500/20',
            borderColor: 'border-orange-500/30',
            page: 'battles',
          },
        ].map((action) => (
          <motion.button
            key={action.title}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-5 rounded-2xl text-left
              bg-gradient-to-br ${action.color}
              border ${action.borderColor}
              transition-all duration-300
              hover:shadow-lg group
            `}
            onClick={() => (window as Window & { __setPage?: (p: string) => void }).__setPage?.(action.page)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-white/10">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-semibold text-white mb-1">{action.title}</h4>
            <p className="text-sm text-gray-300">{action.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
