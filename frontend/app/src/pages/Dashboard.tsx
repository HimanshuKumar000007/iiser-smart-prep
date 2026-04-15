import { motion } from 'framer-motion';
import {
  Target, CheckCircle2, Trophy, Flame, TrendingUp,
  Clock, Zap, BookOpen, Users, ArrowRight,
  Star, Brain, AlertCircle, ChevronRight,
  Atom, FlaskConical, Dna, Calculator, Loader2, LogIn,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import { Button } from '@/components/ui/button';
import { useUserData } from '../hooks/useUserData';
import type { Task } from '../types';

// ─── AI: Linear Regression Forecast ──────────────────────────────────────────
function linearForecast(data: number[]): number {
  const pts = data.filter(v => v > 0);
  if (pts.length < 2) return pts[pts.length - 1] ?? 0;
  const n = pts.length;
  const xBar = (n - 1) / 2;
  const yBar = pts.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  pts.forEach((y, x) => { num += (x - xBar) * (y - yBar); den += (x - xBar) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  return Math.round(Math.min(100, Math.max(0, yBar - slope * xBar + slope * n)));
}

// ─── AI: Anomaly Detection ─────────────────────────────────────────────────
function detectAnomaly(data: number[]): boolean {
  const pts = data.filter(v => v > 0);
  if (pts.length < 3) return false;
  const recent = pts[pts.length - 1];
  const avg = pts.slice(0, -1).reduce((a, b) => a + b) / (pts.length - 1);
  return recent < avg - 15;
}

const subjectIconMap: Record<string, React.ElementType> = {
  Physics: Atom, Chemistry: FlaskConical, Biology: Dna, Mathematics: Calculator,
};
const subjectColorMap: Record<string, { hex: string; text: string }> = {
  Physics:     { hex: '#6366f1', text: 'text-indigo-400' },
  Chemistry:   { hex: '#22c55e', text: 'text-green-400' },
  Biology:     { hex: '#a855f7', text: 'text-purple-400' },
  Mathematics: { hex: '#f59e0b', text: 'text-orange-400' },
};

const defaultTasks: Task[] = [
  { id: '1', title: 'Take a Mock Test', description: 'AI-adaptive difficulty for your weak topics', completed: false, type: 'practice', estimatedTime: 45 },
  { id: '2', title: 'Review Wrong Answers', description: 'Use AI Doubts → Spaced Repetition', completed: false, type: 'review', estimatedTime: 30 },
  { id: '3', title: 'Join a Battle', description: '5-question challenge with peers', completed: false, type: 'battle', estimatedTime: 10 },
  { id: '4', title: 'Group Study Session', description: 'Join Study Groups weekly meet', completed: false, type: 'group', estimatedTime: 60 },
];

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Dashboard() {
  const {
    user, userStats, accuracyRate, questionsSolved,
    totalMocks, bestScore, streak,
    weeklyChartData, subjectBreakdown, loading, error,
  } = useUserData();

  const userName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || 'Student';

  const accuracyHistory = weeklyChartData.map(d => d.accuracy);
  const forecast = linearForecast(accuracyHistory);
  const hasAnomaly = detectAnomaly(accuracyHistory);
  const hasData = !!userStats;

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'practice': return <BookOpen className="w-4 h-4" />;
      case 'review':   return <Target className="w-4 h-4" />;
      case 'battle':   return <Zap className="w-4 h-4" />;
      case 'group':    return <Users className="w-4 h-4" />;
    }
  };
  const getTaskColor = (type: Task['type']) => {
    switch (type) {
      case 'practice': return 'text-blue-400 bg-blue-400/10';
      case 'review':   return 'text-purple-400 bg-purple-400/10';
      case 'battle':   return 'text-orange-400 bg-orange-400/10';
      case 'group':    return 'text-green-400 bg-green-400/10';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-gray-400">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/30">
        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
        <div>
          <p className="font-semibold text-red-300">Could not load data</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={containerVars} initial="hidden" animate="visible" className="space-y-5">

      {/* Not logged in banner */}
      {!user && (
        <motion.div variants={itemVars}
          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
          <div className="flex items-center gap-3">
            <LogIn className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="font-semibold text-indigo-300 text-sm">Sign in to see your real stats</p>
              <p className="text-xs text-gray-400">Your scores, accuracy and performance are waiting</p>
            </div>
          </div>
          <a href="/login.html"
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors flex-shrink-0">
            Sign In
          </a>
        </motion.div>
      )}

      {/* Welcome */}
      <motion.div variants={itemVars} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="gradient-text">{userName}</span>!
          </h1>
          <p className="text-gray-400 flex items-center gap-2 flex-wrap text-sm">
            {hasData
              ? <><Trophy className="w-4 h-4 text-yellow-400" /><span className="text-white font-semibold">{totalMocks}</span> mock tests • <span className="text-white font-semibold">{questionsSolved}</span> questions solved</>
              : 'Complete your first mock test to see your personalized stats!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <motion.div whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <div className="p-2 rounded-xl bg-orange-500/30"><Flame className="w-5 h-5 text-orange-400" /></div>
              <div><p className="text-xl font-bold">{streak}</p><p className="text-xs text-gray-400">Day Streak</p></div>
            </motion.div>
          )}
          {weeklyChartData.some(d => d.accuracy > 0) && (
            <motion.div whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="p-2 rounded-xl bg-green-500/30"><Brain className="w-5 h-5 text-green-400" /></div>
              <div><p className="text-xl font-bold">{forecast}%</p><p className="text-xs text-gray-400">AI Forecast</p></div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Anomaly alert */}
      {hasAnomaly && (
        <motion.div variants={itemVars}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-300 text-sm">⚠️ Performance Drop Detected</p>
            <p className="text-xs text-gray-400">Today's accuracy dropped significantly. Consider revising fundamentals before your next test.</p>
          </div>
        </motion.div>
      )}

      {/* Stats from user_stats table */}
      <motion.div variants={itemVars} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Accuracy" value={hasData ? `${accuracyRate}%` : '—'} change={0} trend="neutral"
          icon={<Target className="w-6 h-6 text-indigo-400" />} glowColor="indigo" />
        <StatCard title="Best Score" value={hasData ? `${Math.round(bestScore)}%` : '—'} change={0} trend="neutral"
          icon={<Trophy className="w-6 h-6 text-yellow-400" />} glowColor="warning" />
        <StatCard title="Questions Solved" value={hasData ? questionsSolved.toLocaleString() : '—'} change={0} trend="neutral"
          icon={<CheckCircle2 className="w-6 h-6 text-green-400" />} glowColor="success" />
        <StatCard title="Mock Tests" value={hasData ? totalMocks : '—'} change={0} trend="neutral"
          icon={<Flame className="w-6 h-6 text-orange-400" />} glowColor="danger" />
      </motion.div>

      {/* Chart + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 7-Day Chart from mock_results */}
        <motion.div variants={itemVars} className="lg:col-span-2 p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold">7-Day Performance</h3>
              <p className="text-sm text-gray-400">
                {weeklyChartData.some(d => d.accuracy > 0)
                  ? <>From your real test data • AI forecast: <span className="text-indigo-400 font-semibold">{forecast}%</span></>
                  : 'Complete tests to populate this chart'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"/>Accuracy</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"/>Questions</span>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyChartData}>
                <defs>
                  <linearGradient id="gAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gQuestions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false}/>
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false}/>
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} labelStyle={{ color: '#9ca3af' }}/>
                <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#gAccuracy)"/>
                <Area type="monotone" dataKey="questions" name="Questions" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#gQuestions)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Plan */}
        <motion.div variants={itemVars} className="p-6 rounded-2xl glass-card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Today's Plan</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Brain className="w-3 h-3 text-indigo-400"/> AI-suggested tasks
            </p>
          </div>
          <div className="space-y-2.5">
            {defaultTasks.map((task, idx) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${getTaskColor(task.type)}`}>{getTaskIcon(task.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{task.description}</p>
                  </div>
                  <Clock className="w-3 h-3 text-gray-600 flex-shrink-0"/>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
            Go to Mock Tests <ArrowRight className="w-4 h-4 ml-2"/>
          </Button>
        </motion.div>
      </div>

      {/* Subject Mastery + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Subject breakdown from mock_results.subject */}
        <motion.div variants={itemVars} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Subject Mastery</h3>
          {subjectBreakdown.length > 0 ? (
            <div className="space-y-4">
              {subjectBreakdown.slice(0, 5).map(s => {
                const Icon = subjectIconMap[s.subject] ?? BookOpen;
                const clr = subjectColorMap[s.subject] ?? { hex: '#6366f1', text: 'text-indigo-400' };
                return (
                  <div key={s.subject}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`w-4 h-4 ${clr.text}`} />
                      <span className="text-sm font-medium flex-1">{s.subject}</span>
                      <span className={`text-sm font-bold ${s.accuracy >= 75 ? 'text-green-400' : s.accuracy >= 55 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {s.accuracy}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: clr.hex }}
                        initial={{ width: 0 }} animate={{ width: `${s.accuracy}%` }} transition={{ duration: 1, ease: 'easeOut' }}/>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {s.count} test{s.count !== 1 ? 's' : ''} &nbsp;·&nbsp; {s.correct}/{s.total} correct
                      {s.accuracy < 55 && <span className="text-orange-400 ml-2">⚠ Focus needed</span>}
                      {s.accuracy >= 80 && <span className="text-green-400 ml-2">★ Strong</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-10 h-10 text-gray-600 mx-auto mb-3"/>
              <p className="text-sm text-gray-400">Take subject tests to see your mastery breakdown</p>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVars} className="p-6 rounded-2xl glass-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { title: 'Adaptive Mock Test', desc: 'AI picks questions from your weak topics', icon: Brain, color: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30' },
              { title: 'Ask AI Tutor', desc: 'Instant concept + formula explanations', icon: Zap, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
              { title: 'Performance Analytics', desc: 'Deep dive into your test history', icon: TrendingUp, color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
              { title: 'Join a Battle', desc: 'Live peer competition, 5 questions', icon: Target, color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
            ].map(a => (
              <motion.button key={a.title} whileHover={{ scale: 1.01, x: 4 }} whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left bg-gradient-to-r ${a.color} border ${a.border} transition-all group`}>
                <div className="p-2 rounded-xl bg-white/10 flex-shrink-0"><a.icon className="w-5 h-5 text-white"/></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white">{a.title}</p>
                  <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0"/>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
