import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Target, Zap, Trophy, Brain,
  Atom, FlaskConical, Dna, Calculator,
  Activity, Star, AlertTriangle, Loader2,
} from 'lucide-react';
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useUserData } from '../hooks/useUserData';

// ─── AI: Polynomial Rank Forecasting ─────────────────────────────────────────
function forecastRank(rankHistory: number[]): number[] {
  const filtered = rankHistory.filter(v => v > 0);
  if (filtered.length < 2) return [filtered[0] ?? 0, filtered[0] ?? 0, filtered[0] ?? 0];
  const n = filtered.length;
  const xBar = (n - 1) / 2;
  const yBar = filtered.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  filtered.forEach((y, x) => { num += (x - xBar) * (y - yBar); den += (x - xBar) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yBar - slope * xBar;
  return [1, 2, 3].map(i => Math.max(1, Math.round(intercept + slope * (n + i))));
}

// ─── AI: Momentum Index ────────────────────────────────────────────────────────
function calcMomentum(streak: number, accuracyTrend: number, questionsThisWeek: number): number {
  const streakScore = Math.min(streak * 5, 40);
  const accuracyScore = Math.min(accuracyTrend * 0.35, 35);
  const volumeScore = Math.min((questionsThisWeek / 10) * 2.5, 25);
  return Math.round(streakScore + accuracyScore + volumeScore);
}

// ─── AI: Subject ROI ──────────────────────────────────────────────────────────
const subjectHours: Record<string, number> = { Physics: 8, Chemistry: 6, Biology: 7, Mathematics: 10 };

const subjectIconMap: Record<string, React.ElementType> = {
  Physics: Atom, Chemistry: FlaskConical, Biology: Dna, Mathematics: Calculator,
};
const subjectColorMap: Record<string, string> = {
  Physics: '#6366f1', Chemistry: '#22c55e', Biology: '#a855f7', Mathematics: '#f59e0b',
};

export default function Analytics() {
  const {
    weeklyChartData, subjectBreakdown, mockResults,
    accuracyRate, questionsSolved, totalMocks, bestScore, streak, loading, error,
  } = useUserData();

  const [chartView, setChartView] = useState<'accuracy' | 'questions' | 'xp'>('accuracy');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const chartColor = { accuracy: '#6366f1', questions: '#22c55e', xp: '#f59e0b' };

  // Rank history from weekly chart (simulate from accuracy: higher accuracy → better rank)
  const rankHistory = weeklyChartData.map(d => d.accuracy > 0 ? Math.max(1, Math.round(200 - d.accuracy * 1.8)) : 0);
  const forecastedRanks = forecastRank(rankHistory);
  const currentRank = rankHistory.filter(v => v > 0).slice(-1)[0] ?? 0;

  const questionsThisWeek = weeklyChartData.reduce((s, d) => s + d.questions, 0);
  const momentum = calcMomentum(streak, accuracyRate, questionsThisWeek);

  // Radar performance data
  const radarData = [
    { metric: 'Accuracy', value: accuracyRate },
    { metric: 'Best Score', value: Math.round(bestScore) },
    { metric: 'Consistency', value: streak > 0 ? Math.min(100, streak * 14) : 0 },
    { metric: 'Volume', value: Math.min(100, (questionsSolved / 5)) },
    { metric: 'Tests Done', value: Math.min(100, totalMocks * 5) },
    { metric: 'Avg Score', value: accuracyRate },
  ];

  // Real mock results last 30 days for recent history
  const recentResults = mockResults.slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-gray-400">Loading your performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30">
        <p className="font-semibold text-red-300">Error loading analytics: {error}</p>
      </div>
    );
  }

  const hasData = totalMocks > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Performance Intelligence
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {hasData ? 'AI-powered deep analysis of your IISER IAT preparation' : 'Complete mock tests to unlock your analytics'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Momentum Index</p>
          <div className="flex items-center gap-2 justify-end">
            <span className={`text-3xl font-black ${momentum >= 70 ? 'text-green-400' : momentum >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>{momentum}</span>
            <span className="text-sm text-gray-400">/100</span>
          </div>
          <p className="text-xs text-gray-500">Streak × Accuracy × Volume</p>
        </div>
      </div>

      {/* No data nudge */}
      {!hasData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center">
          <Star className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No test data yet</h3>
          <p className="text-gray-400 text-sm">Take your first mock test and your detailed analytics will appear here automatically.</p>
        </motion.div>
      )}

      {/* AI Rank Forecast */}
      {hasData && currentRank > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-indigo-500/20"><Brain className="w-5 h-5 text-indigo-400" /></div>
            <div>
              <h3 className="font-semibold text-indigo-300">🔮 AI Rank Forecast (Next 3 Days)</h3>
              <p className="text-xs text-gray-400">Linear regression on your performance trajectory</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Current Est.</p>
              <p className="text-2xl font-black text-white">#{currentRank}</p>
            </div>
            {forecastedRanks.map((rank, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Day +{i + 1}</p>
                <p className="text-2xl font-black text-green-400">#{rank}</p>
                <p className="text-xs text-green-400/70">↑ {Math.max(0, currentRank - rank)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Accuracy', value: hasData ? `${accuracyRate}%` : '—', icon: Target, color: 'text-indigo-400' },
          { label: 'Questions Solved', value: hasData ? questionsSolved.toLocaleString() : '—', icon: Activity, color: 'text-green-400' },
          { label: 'Study Streak', value: streak > 0 ? `${streak} Days` : '—', icon: Zap, color: 'text-yellow-400' },
          { label: 'Best Score', value: hasData ? `${Math.round(bestScore)}%` : '—', icon: Trophy, color: 'text-purple-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">7-Day Performance Trend</h3>
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
              {(['accuracy', 'questions', 'xp'] as const).map(v => (
                <button key={v} onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${chartView === v ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyChartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor[chartView]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor[chartView]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey={chartView} stroke={chartColor[chartView]} strokeWidth={2} fillOpacity={1} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-4">Performance Matrix</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">From your real test data</p>
        </motion.div>
      </div>

      {/* Subject Analysis + Recent Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Subject Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" /> Subject Breakdown (Real Data)
          </h3>
          {subjectBreakdown.length > 0 ? (
            <div className="space-y-4">
              {subjectBreakdown.map(s => {
                const Icon = subjectIconMap[s.subject] ?? Atom;
                const color = subjectColorMap[s.subject] ?? '#6366f1';
                const hours = subjectHours[s.subject] ?? 5;
                const roi = hours > 0 ? Math.round(s.correct / hours) : 0;
                return (
                  <button key={s.subject} onClick={() => setActiveSubject(activeSubject === s.subject ? null : s.subject)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${activeSubject === s.subject ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5" style={{ color }} />
                      <span className="font-medium text-sm">{s.subject}</span>
                      <span className={`ml-auto text-sm font-bold ${s.accuracy >= 80 ? 'text-green-400' : s.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{s.accuracy}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
                        initial={{ width: 0 }} animate={{ width: `${s.accuracy}%` }} transition={{ duration: 0.8 }} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{s.count} test{s.count !== 1 ? 's' : ''}</span>
                      <span>{s.correct} correct</span>
                      <span className="ml-auto text-indigo-400 font-medium">{roi} correct/hr ROI</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-10 h-10 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Take subject-specific tests to see breakdown</p>
            </div>
          )}
        </motion.div>

        {/* Recent Tests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" /> Recent Test Results
          </h3>
          {recentResults.length > 0 ? (
            <div className="space-y-3">
              {recentResults.map((result, i) => {
                const pct = result.total_questions > 0 ? Math.round((result.correct / result.total_questions) * 100) : result.score;
                return (
                  <motion.div key={result.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0
                      ${pct >= 70 ? 'bg-green-500/20 text-green-400' : pct >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                      {pct}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{result.mock_title || result.mock_id}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                        {result.subject && <span>{result.subject}</span>}
                        <span>{result.correct}/{result.total_questions} correct</span>
                        <span>{new Date(result.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-10 h-10 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Your test history will appear here</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* AI Insights */}
      {hasData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> AI-Generated Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-green-400/10 border border-white/10">
              <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
              <p className="font-semibold text-white text-sm mb-1">📈 Performance</p>
              <p className="text-xs text-gray-400">Avg accuracy: <span className="text-white font-semibold">{accuracyRate}%</span> across {totalMocks} tests. {accuracyRate >= 70 ? 'Strong performance!' : 'Keep practicing to improve.'}</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-400/10 border border-white/10">
              <AlertTriangle className="w-5 h-5 text-orange-400 mb-2" />
              <p className="font-semibold text-white text-sm mb-1">⚠️ Focus Area</p>
              <p className="text-xs text-gray-400">
                {subjectBreakdown.length > 0
                  ? `${subjectBreakdown.sort((a, b) => a.accuracy - b.accuracy)[0]?.subject ?? 'General'} needs most attention at ${subjectBreakdown.sort((a, b) => a.accuracy - b.accuracy)[0]?.accuracy ?? 0}% accuracy.`
                  : 'Take more subject-specific tests to identify weak areas.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-400/10 border border-white/10">
              <Star className="w-5 h-5 text-purple-400 mb-2" />
              <p className="font-semibold text-white text-sm mb-1">🎯 Momentum</p>
              <p className="text-xs text-gray-400">
                Momentum score: <span className="text-white font-semibold">{momentum}/100</span>.
                {momentum >= 70 ? ' Excellent! Maintain this pace to crack IISER IAT.' : ' Increase daily practice volume to boost your score.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
