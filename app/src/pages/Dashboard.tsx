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
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Button } from '@/components/ui/button';
import type { Task, PerformanceData } from '../types';

const performanceData: PerformanceData[] = [
  { date: 'Mon', accuracy: 75, questions: 45, xp: 320 },
  { date: 'Tue', accuracy: 82, questions: 62, xp: 480 },
  { date: 'Wed', accuracy: 78, questions: 38, xp: 290 },
  { date: 'Thu', accuracy: 88, questions: 55, xp: 520 },
  { date: 'Fri', accuracy: 91, questions: 72, xp: 680 },
  { date: 'Sat', accuracy: 85, questions: 48, xp: 420 },
  { date: 'Sun', accuracy: 93, questions: 65, xp: 590 },
];

const todayTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Physics Mock Test',
    description: 'Focus on Mechanics and Thermodynamics',
    completed: true,
    type: 'practice',
    estimatedTime: 45,
  },
  {
    id: '2',
    title: 'Review Organic Chemistry',
    description: 'Reaction mechanisms and named reactions',
    completed: false,
    type: 'review',
    estimatedTime: 30,
  },
  {
    id: '3',
    title: 'Battle with Rahul',
    description: 'Quick 5-question challenge',
    completed: false,
    type: 'battle',
    estimatedTime: 10,
  },
  {
    id: '4',
    title: 'Group Study Session',
    description: 'Join Physics Masters weekly meet',
    completed: false,
    type: 'group',
    estimatedTime: 60,
  },
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

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      setProfile(data);
    }

    fetchProfile();
  }, []);

  const completedTasks = todayTasks.filter(t => t.completed).length;
  const totalTasks = todayTasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

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
            Welcome back, <span className="gradient-text">{profile?.full_name || 'Arjun'}</span>!
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            You're ranked <span className="text-white font-semibold">#42</span> globally
            <span className="text-green-400 text-sm">↑ 5 positions</span>
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
        >
          <div className="p-2 rounded-xl bg-indigo-500/30">
            <Flame className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-gray-400">Day Streak</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Accuracy Rate"
          value="87%"
          change={5.2}
          trend="up"
          icon={<Target className="w-6 h-6 text-indigo-400" />}
          glowColor="indigo"
        />
        <StatCard
          title="Questions Solved"
          value="1,247"
          change={12}
          trend="up"
          icon={<CheckCircle2 className="w-6 h-6 text-green-400" />}
          glowColor="success"
        />
        <StatCard
          title="Current Rank"
          value="#42"
          change={5}
          trend="up"
          icon={<Trophy className="w-6 h-6 text-yellow-400" />}
          glowColor="warning"
        />
        <StatCard
          title="Study Streak"
          value="7 Days"
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
              <AreaChart data={performanceData}>
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
        </motion.div>

        {/* Today's Plan */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Today's Plan</h3>
              <p className="text-sm text-gray-400">AI-generated tasks</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{completedTasks}/{totalTasks}</span>
            </div>
          </div>

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
            {todayTasks.map((task, idx) => (
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
                  <div className={`
                    p-2 rounded-lg flex-shrink-0
                    ${getTaskColor(task.type)}
                  `}>
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
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            title: 'Start Mock Test', 
            desc: 'Full-length JEE simulation', 
            icon: Target,
            color: 'from-blue-500/20 to-cyan-500/20',
            borderColor: 'border-blue-500/30'
          },
          { 
            title: 'Ask AI Doubt', 
            desc: 'Get instant explanations', 
            icon: Zap,
            color: 'from-purple-500/20 to-pink-500/20',
            borderColor: 'border-purple-500/30'
          },
          { 
            title: 'Join Battle', 
            desc: 'Compete with friends', 
            icon: TrendingUp,
            color: 'from-orange-500/20 to-red-500/20',
            borderColor: 'border-orange-500/30'
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
