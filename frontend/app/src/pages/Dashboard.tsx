import { motion } from 'framer-motion';
import {
  Target, CheckCircle2, Trophy, Flame, TrendingUp, Clock, Zap,
  BookOpen, Users, ArrowRight, Star, Brain, AlertCircle, ChevronRight,
  Atom, FlaskConical, Dna, Calculator, Loader2,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import { Button } from '@/components/ui/button';
import { useUserData } from '../hooks/useUserData';
import type { Task } from '../types';

// ─── AI Algorithm: Performance Forecasting (Linear Regression) ───────────────
function linearForecast(data: number[]): number {
  const nonZero = data.filter(v => v > 0);
  if (nonZero.length < 2) return nonZero[nonZero.length - 1] ?? 0;
  const n = nonZero.length;
  const xBar = (n - 1) / 2;
  const yBar = nonZero.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  nonZero.forEach((y, x) => { num += (x - xBar) * (y - yBar); den += (x - xBar) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yBar - slope * xBar;
  return Math.round(Math.min(100, Math.max(0, intercept + slope * n)));
}

// ─── AI Algorithm: Anomaly Detection ─────────────────────────────────────────
function detectAnomaly(data: number[]): boolean {
  const nonZero = data.filter(v => v > 0);
  if (nonZero.length < 3) return false;
  const recent = nonZero[nonZero.length - 1];
  const avg = nonZero.slice(0, -1).reduce((a, b) => a + b) / (nonZero.length - 1);
  return recent < avg - 15;
}

// ─── Static fallback task list ────────────────────────────────────────────────
const defaultTasks: Task[] = [
  { id: '1', title: 'Take a Mock Test', description: 'Click Mock Tests → Start Adaptive Test', completed: false, type: 'practice', estimatedTime: 45 },
  { id: '2', title: 'Review Weak Topics', description: 'Use AI Doubts → Concept Library', completed: false, type: 'review', estimatedTime: 30 },
  { id: '3', title: 'Join a Battle', description: '5-question challenge with peers', completed: false, type: 'battle', estimatedTime: 10 },
  { id: '4', title: 'Study Group Session', description: 'Join Physics Masters weekly meet', completed: false, type: 'group', estimatedTime: 60 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const subjectIcons: Record<string, React.ElementType> = {
  Physics: Atom, Chemistry: FlaskConical, Biology: Dna, Mathematics: Calculator,
};
const subjectColors: Record<string, string> = {
  Physics: '#6366f1', Chemistry: '#22c55e', Biology: '#a855f7', Mathematics: '#f59e0b',
};

export default function Dashboard() {
  const {
    user, userStats, accuracyRate, questionsSolved, totalMocks,
    bestScore, streak, weeklyChartData, subjectBreakdown, loading, error,
  } = useUserData();

  const userName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || 'Student';

  const accuracyHistory = weeklyChartData.map(d => d.accuracy);
  const forecastedAccuracy = linearForecast(accuracyHistory);
  const hasAnomaly = detectAnomaly(accuracyHistory);

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

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-gray-400">Loading your dashboard...</p>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/30">
        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
        <div>
          <p className="font-semibold text-red-300">Failed to load dashboard</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Welcome + Streak */}
      <motion.div variants={itemVariants} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">{userName}</span>!
          </h1>
          <p className="text-gray-400 flex items-center gap-2 flex-wrap">
            <Trophy className="w-4 h-4 text-yellow-400" />
            {totalMocks > 0
              ? <><span className="text-white font-semibold">{totalMocks}</span> mock tests completed</>
              : 'Start your first mock test to unlock your rank!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="p-2 rounded-xl bg-orange-500/30"><Flame className="w-5 h-5 text-orange-400" /></div>
            <div><p className="text-xl font-bold">{streak}</p><p className="text-xs text-gray-400">Day Streak</p></div>
          </motion.div>
          {weeklyChartData.some(d => d.accuracy > 0) && (
            <motion.div whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="p-2 rounded-xl bg-green-500/30"><Brain className="w-5 h-5 text-green-400" /></div>
              <div><p className="text-xl font-bold">{forecastedAccuracy}%</p><p className="text-xs text-gray-400">AI Forecast</p></div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Anomaly Alert */}
      {hasAnomaly && (
        <motion.div variants={itemVariants}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-300 text-sm">⚠️ Performance Drop Detected</p>
            <p className="text-xs text-gray-400">Today's accuracy is significantly below your recent average. Consider revisiting fundamental concepts.</p>
          </div>
        </motion.div>
      )}

      {/* No Data State */}
      {!userStats && !loading && (
        <motion.div variants={itemVariants}
          className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-4">
          <Star className="w-8 h-8 text-indigo-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-indigo-300">Start your IISER IAT journey! 🚀</p>
            <p className="text-sm text-gray-400">Take your first mock test to see your personalized stats here.</p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Accuracy Rate" value={userStats ? `${accuracyRate}%` : '—'} change={0} trend="neutral"
          icon={<Target className="w-6 h-6 text-indigo-400" />} glowColor="indigo" />
        <StatCard title="Questions Solved" value={questionsSolved > 0 ? questionsSolved.toLocaleString() : '—'} change={0} trend="neutral"
          icon={<CheckCircle2 className="w-6 h-6 text-green-400" />} glowColor="success" />
        <StatCard title="Best Score" value={bestScore > 0 ? `${Math.round(bestScore)}%` : '—'} change={0} trend="neutral"
          icon={<Trophy className="w-6 h-6 text-yellow-400" />} glowColor="warning" />
        <StatCard title="Mock Tests" value={totalMocks > 0 ? totalMocks : '—'} change={0} trend="neutral"
          icon={<Flame className="w-6 h-6 text-orange-400" />} glowColor="danger" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Performance Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold">7-Day Performance</h3>
              <p className="text-sm text-gray-400">
                {weeklyChartData.some(d => d.accuracy > 0)
                  ? <>Real accuracy trend • AI forecast: <span className="text-indigo-400 font-semibold">{forecastedAccuracy}%</span></>
                  : 'Complete tests to see your trend here'}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />Accuracy</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />XP</span>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyChartData}>
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
                <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAccuracy)" />
                <Area type="monotone" dataKey="xp" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorXP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Task Plan */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Today's Plan</h3>
              <p className="text-xs text-gray-400 flex items-center gap-1"><Brain className="w-3 h-3 text-indigo-400" /> AI-generated tasks</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {defaultTasks.map((task, idx) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${getTaskColor(task.type)}`}>{getTaskIcon(task.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{task.description}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
            Go to Mock Tests <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Subject Mastery (real data) */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Subject Mastery</h3>
          {subjectBreakdown.length > 0 ? (
            <div className="space-y-3">
              {subjectBreakdown.slice(0, 6).map(s => {
                const Icon = subjectIcons[s.subject] ?? BookOpen;
                const color = subjectColors[s.subject] ?? '#6366f1';
                return (
                  <div key={s.subject}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="text-sm font-medium flex-1">{s.subject}</span>
                      <span className={`text-sm font-bold ${s.accuracy >= 80 ? 'text-green-400' : s.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{s.accuracy}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
                        initial={{ width: 0 }} animate={{ width: `${s.accuracy}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{s.count} test{s.count !== 1 ? 's' : ''} • {s.correct} correct</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-10 h-10 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Complete mock tests to see subject breakdown</p>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { title: 'Start Adaptive Mock Test', desc: 'AI-calibrated to your weak topics', icon: Brain, color: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30' },
              { title: 'Ask AI Tutor', desc: 'Instant concept explanations', icon: Zap, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
              { title: 'View Analytics', desc: 'Deep performance intelligence', icon: TrendingUp, color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
              { title: 'Join Battle', desc: 'Live peer competition', icon: Target, color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
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
