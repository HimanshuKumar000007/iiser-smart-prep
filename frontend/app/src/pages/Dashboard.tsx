import { motion } from 'framer-motion';
import {
  Target, CheckCircle2, Trophy, Flame, TrendingUp, Clock, Zap,
  BookOpen, Users, ArrowRight, Star, Brain, AlertCircle, ChevronRight,
  Atom, FlaskConical, Dna, Calculator,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import { Button } from '@/components/ui/button';
import type { Task, PerformanceData } from '../types';

// ─── AI Algorithm: Performance Forecasting (Linear Regression) ───────────────
function linearForecast(data: number[]): number {
  const n = data.length;
  const xBar = (n - 1) / 2;
  const yBar = data.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  data.forEach((y, x) => { num += (x - xBar) * (y - yBar); den += (x - xBar) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yBar - slope * xBar;
  return Math.round(Math.min(100, Math.max(0, intercept + slope * n)));
}

// ─── AI Algorithm: Anomaly Detection ─────────────────────────────────────────
function detectAnomaly(data: number[]): boolean {
  if (data.length < 3) return false;
  const recent = data[data.length - 1];
  const avg = data.slice(0, -1).reduce((a, b) => a + b) / (data.length - 1);
  return recent < avg - 15; // drop >15% = anomaly
}

// ─── AI Algorithm: Adaptive Task Priority Scoring ────────────────────────────
// Score = (1 - accuracy) × urgency × (1/estimated_minutes)
function scoreTask(task: Task & { subject?: string }, subjectAccuracy: Record<string, number>): number {
  const urgency = task.type === 'practice' ? 1.5 : task.type === 'review' ? 1.2 : 1.0;
  const weaknessFactor = 1 - ((subjectAccuracy[task.subject || 'general'] ?? 75) / 100);
  return (weaknessFactor * urgency * 100) / task.estimatedTime;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const performanceData: (PerformanceData & { subject?: string })[] = [
  { date: 'Mon', accuracy: 75, questions: 45, xp: 320 },
  { date: 'Tue', accuracy: 82, questions: 62, xp: 480 },
  { date: 'Wed', accuracy: 78, questions: 38, xp: 290 },
  { date: 'Thu', accuracy: 88, questions: 55, xp: 520 },
  { date: 'Fri', accuracy: 91, questions: 72, xp: 680 },
  { date: 'Sat', accuracy: 85, questions: 48, xp: 420 },
  { date: 'Sun', accuracy: 93, questions: 65, xp: 590 },
];

const subjectAccuracy: Record<string, number> = { Physics: 78, Chemistry: 58, Biology: 88, Mathematics: 72 };

const todayTasks: (Task & { subject?: string })[] = [
  { id: '1', title: 'Complete Physics Mock Test', description: 'Focus on Mechanics and Thermodynamics', completed: true, type: 'practice', estimatedTime: 45, subject: 'Physics' },
  { id: '2', title: 'Review Organic Chemistry', description: 'Reaction mechanisms and named reactions', completed: false, type: 'review', estimatedTime: 30, subject: 'Chemistry' },
  { id: '3', title: 'Battle with Rahul', description: 'Quick 5-question challenge', completed: false, type: 'battle', estimatedTime: 10 },
  { id: '4', title: 'Group Study Session', description: 'Join Physics Masters weekly meet', completed: false, type: 'group', estimatedTime: 60 },
];

const subjectProgress = [
  { subject: 'Physics', value: 78, fill: '#6366f1' },
  { subject: 'Chemistry', value: 58, fill: '#22c55e' },
  { subject: 'Biology', value: 88, fill: '#a855f7' },
  { subject: 'Mathematics', value: 72, fill: '#f59e0b' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Dashboard() {
  const completedTasks = todayTasks.filter(t => t.completed).length;
  const totalTasks = todayTasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  const accuracyHistory = performanceData.map(d => d.accuracy);
  const forecastedAccuracy = linearForecast(accuracyHistory);
  const hasAnomaly = detectAnomaly(accuracyHistory);

  // Sort tasks by AI priority score
  const sortedTasks = [...todayTasks].sort((a, b) => scoreTask(b, subjectAccuracy) - scoreTask(a, subjectAccuracy));

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Welcome + Streak */}
      <motion.div variants={itemVariants} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">Arjun</span>!
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            Ranked <span className="text-white font-semibold">#42</span> globally
            <span className="text-green-400 text-sm">↑ 5 positions this week</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="p-2 rounded-xl bg-orange-500/30"><Flame className="w-5 h-5 text-orange-400" /></div>
            <div><p className="text-xl font-bold">7</p><p className="text-xs text-gray-400">Day Streak</p></div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="p-2 rounded-xl bg-green-500/30"><Brain className="w-5 h-5 text-green-400" /></div>
            <div><p className="text-xl font-bold">{forecastedAccuracy}%</p><p className="text-xs text-gray-400">AI Forecast</p></div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Anomaly Alert */}
      {hasAnomaly && (
        <motion.div variants={itemVariants}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-300 text-sm">⚠️ Performance Anomaly Detected</p>
            <p className="text-xs text-gray-400">Today's accuracy dropped significantly below your 6-day average. Consider taking a break or revising fundamentals.</p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Accuracy Rate" value="87%" change={5.2} trend="up" icon={<Target className="w-6 h-6 text-indigo-400" />} glowColor="indigo" />
        <StatCard title="Questions Solved" value="1,247" change={12} trend="up" icon={<CheckCircle2 className="w-6 h-6 text-green-400" />} glowColor="success" />
        <StatCard title="Current Rank" value="#42" change={5} trend="up" icon={<Trophy className="w-6 h-6 text-yellow-400" />} glowColor="warning" />
        <StatCard title="Study Streak" value="7 Days" change={0} trend="neutral" icon={<Flame className="w-6 h-6 text-orange-400" />} glowColor="danger" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Performance Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold">7-Day Performance</h3>
              <p className="text-sm text-gray-400">Accuracy trend + AI next-day forecast: <span className="text-indigo-400 font-semibold">{forecastedAccuracy}%</span></p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />Accuracy</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />XP</span>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...performanceData, { date: 'Mon+1', accuracy: forecastedAccuracy, questions: 0, xp: 0 }]}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }} labelStyle={{ color: '#9ca3af' }} />
                <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAccuracy)" strokeDasharray="0" />
                <Area type="monotone" dataKey="xp" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorXP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI-Prioritized Task Plan */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Today's AI Plan</h3>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Brain className="w-3 h-3 text-indigo-400" /> Priority-scored by weakness
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{completedTasks}/{totalTasks}</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">Daily Progress</span>
              <span className="text-indigo-400 font-medium">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            </div>
          </div>

          <div className="space-y-2.5">
            {sortedTasks.map((task, idx) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                className={`p-3.5 rounded-xl border transition-all ${task.completed ? 'bg-white/5 border-white/5 opacity-60' : 'bg-white/[0.03] border-white/10 hover:border-white/20'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${getTaskColor(task.type)}`}>{getTaskIcon(task.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{task.estimatedTime} min</span>
                    </div>
                  </div>
                  {task.completed && <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />}
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-4 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
            View All Tasks <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Subject Radial Progress + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Subject Mastery */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Subject Mastery</h3>
          <div className="grid grid-cols-2 gap-3">
            {subjectProgress.map(s => {
              const iconMap: Record<string, React.ElementType> = { Physics: Atom, Chemistry: FlaskConical, Biology: Dna, Mathematics: Calculator };
              const Icon = iconMap[s.subject];
              return (
                <div key={s.subject} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4" style={{ color: s.fill }} />
                    <span className="text-sm font-medium">{s.subject}</span>
                  </div>
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="absolute left-0 top-0 h-full rounded-full"
                      style={{ backgroundColor: s.fill }}
                      initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{s.value}%</span>
                    {s.value < 65 && <span className="text-xs text-orange-400">⚠ Focus</span>}
                    {s.value >= 85 && <span className="text-xs text-green-400">★ Strong</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { title: 'Start Adaptive Mock Test', desc: 'AI-calibrated difficulty for you', icon: Brain, color: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', page: 'mock-tests' },
              { title: 'Ask AI Tutor', desc: 'Get instant concept explanations', icon: Zap, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', page: 'ai-doubts' },
              { title: 'View Analytics', desc: 'Deep performance intelligence', icon: TrendingUp, color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', page: 'analytics' },
              { title: 'Join Battle', desc: 'Compete with live opponents', icon: Target, color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', page: 'battles' },
            ].map(a => (
              <motion.button key={a.title} whileHover={{ scale: 1.01, x: 4 }} whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left bg-gradient-to-r ${a.color} border ${a.border} transition-all group`}>
                <div className="p-2 rounded-xl bg-white/10 flex-shrink-0"><a.icon className="w-5 h-5 text-white" /></div>
                <div className="flex-1"><p className="font-medium text-sm text-white">{a.title}</p><p className="text-xs text-gray-400">{a.desc}</p></div>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
