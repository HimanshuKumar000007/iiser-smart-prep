import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Target, Zap, Trophy, Brain,
  Atom, FlaskConical, Dna, Calculator,
  Activity, Star, AlertTriangle,
} from 'lucide-react';
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ─── AI Algorithm: Polynomial Rank Forecasting ────────────────────────────────
// Fits a simple linear model and projects future rank
function forecastRank(rankHistory: number[]): number[] {
  const n = rankHistory.length;
  const xBar = (n - 1) / 2;
  const yBar = rankHistory.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  rankHistory.forEach((y, x) => { num += (x - xBar) * (y - yBar); den += (x - xBar) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yBar - slope * xBar;
  return [1, 2, 3].map(i => Math.max(1, Math.round(intercept + slope * (n + i))));
}

// ─── AI Algorithm: Momentum Index ────────────────────────────────────────────
// Multi-factor score: streak weight, accuracy trend, volume
function calcMomentum(streak: number, accuracyTrend: number, questionsThisWeek: number): number {
  const streakScore = Math.min(streak * 5, 40);        // max 40 pts
  const accuracyScore = Math.min(accuracyTrend * 2, 35); // max 35 pts
  const volumeScore = Math.min((questionsThisWeek / 10) * 2.5, 25); // max 25 pts
  return Math.round(streakScore + accuracyScore + volumeScore);
}

// ─── AI Algorithm: ROI Calculator (Questions per hour per subject) ────────────
function calcSubjectROI(questionsPerWeek: number, hoursPerWeek: number): number {
  return hoursPerWeek > 0 ? Math.round(questionsPerWeek / hoursPerWeek) : 0;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const weeklyData = [
  { day: 'Mon', accuracy: 75, questions: 45, rank: 68 },
  { day: 'Tue', accuracy: 82, questions: 62, rank: 65 },
  { day: 'Wed', accuracy: 78, questions: 38, rank: 63 },
  { day: 'Thu', accuracy: 88, questions: 55, rank: 58 },
  { day: 'Fri', accuracy: 91, questions: 72, rank: 52 },
  { day: 'Sat', accuracy: 85, questions: 48, rank: 47 },
  { day: 'Sun', accuracy: 93, questions: 65, rank: 42 },
];

const subjectData = [
  { subject: 'Physics', accuracy: 78, questions: 142, hours: 8, color: '#6366f1' },
  { subject: 'Chemistry', accuracy: 65, questions: 118, hours: 6, color: '#22c55e' },
  { subject: 'Biology', accuracy: 88, questions: 175, hours: 7, color: '#a855f7' },
  { subject: 'Mathematics', accuracy: 72, questions: 205, hours: 10, color: '#f59e0b' },
];

const topicHeatmap = [
  { topic: 'Mechanics', physics: 82, chemistry: 0, biology: 0, math: 0 },
  { topic: 'Organic Chem', physics: 0, chemistry: 55, biology: 0, math: 0 },
  { topic: 'Genetics', physics: 0, chemistry: 0, biology: 90, math: 0 },
  { topic: 'Calculus', physics: 0, chemistry: 0, biology: 0, math: 78 },
  { topic: 'Thermodynamics', physics: 45, chemistry: 62, biology: 0, math: 0 },
  { topic: 'Cell Biology', physics: 0, chemistry: 0, biology: 75, math: 0 },
  { topic: 'Algebra', physics: 0, chemistry: 0, biology: 0, math: 88 },
  { topic: 'Optics', physics: 70, chemistry: 0, biology: 0, math: 0 },
];

const radarData = [
  { metric: 'Accuracy', value: 85 },
  { metric: 'Speed', value: 72 },
  { metric: 'Consistency', value: 78 },
  { metric: 'Difficulty', value: 65 },
  { metric: 'Volume', value: 90 },
  { metric: 'Retention', value: 82 },
];

const rankHistory = weeklyData.map(d => d.rank);
const forecastedRanks = forecastRank(rankHistory);
const momentum = calcMomentum(7, 18, 385);

export default function Analytics() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [chartView, setChartView] = useState<'accuracy' | 'questions' | 'rank'>('accuracy');

  const subjectIcons: Record<string, React.ElementType> = {
    Physics: Atom, Chemistry: FlaskConical, Biology: Dna, Mathematics: Calculator
  };
  const subjectColors: Record<string, string> = {
    Physics: 'text-indigo-400', Chemistry: 'text-green-400', Biology: 'text-purple-400', Mathematics: 'text-orange-400'
  };

  const chartColor = { accuracy: '#6366f1', questions: '#22c55e', rank: '#f59e0b' };

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
          <p className="text-gray-400 text-sm mt-1">AI-powered deep analysis of your IISER IAT preparation</p>
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

      {/* AI Rank Forecast */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-indigo-500/20"><Brain className="w-5 h-5 text-indigo-400" /></div>
          <div>
            <h3 className="font-semibold text-indigo-300">🔮 AI Rank Forecast (Next 3 Days)</h3>
            <p className="text-xs text-gray-400">Linear regression on your rank trajectory</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">Current</p>
            <p className="text-2xl font-black text-white">#{rankHistory[rankHistory.length - 1]}</p>
          </div>
          {forecastedRanks.map((rank, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Day +{i + 1}</p>
              <p className="text-2xl font-black text-green-400">#{rank}</p>
              <p className="text-xs text-green-400/70">↑ {Math.max(0, rankHistory[rankHistory.length - 1] - rank)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Accuracy', value: '84.6%', change: '+5.2%', up: true, icon: Target, color: 'text-indigo-400' },
          { label: 'Questions/Week', value: '385', change: '+12%', up: true, icon: Activity, color: 'text-green-400' },
          { label: 'Best Streak', value: '7 Days', change: '↑ active', up: true, icon: Zap, color: 'text-yellow-400' },
          { label: 'Global Rank', value: '#42', change: '↑ 26 spots', up: true, icon: Trophy, color: 'text-purple-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-6 h-6 ${s.color}`} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Weekly Performance Trend</h3>
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
              {(['accuracy', 'questions', 'rank'] as const).map(v => (
                <button key={v} onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${chartView === v ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor[chartView]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor[chartView]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} reversed={chartView === 'rank'} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey={chartView} stroke={chartColor[chartView]} strokeWidth={2}
                  fillOpacity={1} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-4">Performance Matrix</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">6-Dimensional Performance View</p>
        </motion.div>
      </div>

      {/* Subject Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Subject ROI */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" /> Subject Analysis
          </h3>
          <p className="text-xs text-gray-400 mb-5">Accuracy • Questions solved • Hours invested</p>
          <div className="space-y-4">
            {subjectData.map(s => {
              const Icon = subjectIcons[s.subject];
              const colorCls = subjectColors[s.subject];
              const roi = calcSubjectROI(s.questions, s.hours);
              return (
                <button key={s.subject} onClick={() => setActiveSubject(activeSubject === s.subject ? null : s.subject)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${activeSubject === s.subject ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${colorCls}`} />
                    <span className="font-medium">{s.subject}</span>
                    <span className={`ml-auto text-sm font-bold ${s.accuracy >= 80 ? 'text-green-400' : s.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {s.accuracy}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: s.color }}
                      initial={{ width: 0 }} animate={{ width: `${s.accuracy}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>{s.questions} questions</span>
                    <span>{s.hours}h invested</span>
                    <span className="ml-auto text-indigo-400 font-medium">{roi} Q/hr ROI</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Weakness Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" /> Topic Weakness Heatmap
          </h3>
          <p className="text-xs text-gray-400 mb-5">Color = accuracy. Red = needs work</p>
          <div className="space-y-2">
            {topicHeatmap.map(row => {
              const getColor = (v: number) => v === 0 ? 'bg-white/5 text-gray-600' :
                v >= 80 ? 'bg-green-500/30 text-green-300' :
                v >= 65 ? 'bg-yellow-500/30 text-yellow-300' : 'bg-red-500/30 text-red-300';
              return (
                <div key={row.topic} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-28 flex-shrink-0 truncate">{row.topic}</span>
                  {[row.physics, row.chemistry, row.biology, row.math].map((v, i) => (
                    <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${getColor(v)}`}>
                      {v > 0 ? `${v}%` : '—'}
                    </div>
                  ))}
                </div>
              );
            })}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-gray-600 w-28">Subject →</span>
              {['Phys', 'Chem', 'Bio', 'Math'].map(s => (
                <span key={s} className="flex-1 text-center text-xs text-gray-400 font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-4 text-xs">
            <span className="text-gray-500">0%</span>
            <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-green-500/50" />
            <span className="text-gray-500">100%</span>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" /> AI-Generated Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, color: 'text-green-400 bg-green-400/10', title: '📈 Trending Up', desc: 'Your accuracy improved 18% this week. Thermodynamics is your biggest gain (+23%).' },
            { icon: AlertTriangle, color: 'text-orange-400 bg-orange-400/10', title: '⚠️ Needs Attention', desc: 'Organic Chemistry at 55% accuracy. Allocate 2 extra hours this week to reaction mechanisms.' },
            { icon: Star, color: 'text-purple-400 bg-purple-400/10', title: '🎯 Exam Prediction', desc: 'At current pace, projected rank: #28 by exam date. Keep your 7-day streak going!' },
          ].map(insight => (
            <div key={insight.title} className={`p-4 rounded-xl ${insight.color.split(' ')[1]} border border-white/10`}>
              <insight.icon className={`w-5 h-5 ${insight.color.split(' ')[0]} mb-2`} />
              <p className="font-semibold text-white text-sm mb-1">{insight.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
