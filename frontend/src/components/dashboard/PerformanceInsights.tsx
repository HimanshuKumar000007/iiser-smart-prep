import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, BookOpen, Clock, AlertTriangle, Star, Activity, BarChart, CheckCircle2, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface PerformanceInsightsProps {
  onNavigate?: (view: string) => void;
}

export function PerformanceInsights({ onNavigate }: PerformanceInsightsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('IAT_TOKEN');
      if (!token) {
        setError('Authentication token missing. Please sign in again.');
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/student/performance-insights`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to retrieve insights.`);
      }

      const payload = await res.json();
      if (payload.success) {
        setData(payload);
      } else {
        throw new Error(payload.error || 'Failed to resolve student performance.');
      }
    } catch (err) {
      console.error('[PerformanceInsights] Error fetching:', err);
      setError(err instanceof Error ? err.message : 'Unknown connection error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-32 lg:pb-0 px-4">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-2 animate-pulse">
          <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10" />
          <div className="space-y-2">
            <div className="w-48 h-6 bg-white/10 rounded" />
            <div className="w-32 h-4 bg-white/5 rounded" />
          </div>
        </div>

        {/* 4 Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 h-24" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 rounded-3xl bg-[#0A0C16] border border-white/5" />
              <div className="h-64 rounded-3xl bg-[#0A0C16] border border-white/5" />
            </div>
            <div className="h-80 rounded-3xl bg-[#0A0C16] border border-white/5" />
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="h-72 rounded-3xl bg-[#0A0C16] border border-white/5" />
            <div className="h-72 rounded-3xl bg-[#0A0C16] border border-white/5" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-32 lg:pb-0 px-4 flex flex-col items-center justify-center min-h-[400px]">
        <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 mb-2">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>
        <h2 className="text-lg font-bold text-white">Failed to load Performance Insights</h2>
        <p className="text-sm text-white/50 text-center max-w-md">{error}</p>
        <button 
          onClick={fetchInsights} 
          className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 rounded-xl transition-all flex items-center gap-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  const {
    overview = { readiness: 0, questionsSolved: 0, mocksCompleted: 0, studyStreak: 0 },
    readiness = { current: 0, target: 85, status: 'BUILDING_EVIDENCE', gap: 85, evidenceLevel: 'BUILDING_EVIDENCE' },
    subjectPerformance = [],
    performanceTrend = { dataPoints: [], direction: 'INSUFFICIENT_DATA' },
    latestMock = null,
    improvementOpportunities = [],
    weakTopics = [],
    strongTopics = [],
    targetTracker = { targetExam: 'IISER IAT 2027', examDate: '7 June 2027', daysRemaining: 330, currentPhaseId: 'FOUNDATION', currentReadiness: 0, evidenceQuality: 'BUILDING_EVIDENCE' },
    insights = [],
    recommendedActions = { primaryAction: null, secondaryActions: [] }
  } = data || {};

  const totalSolved = overview.questionsSolved || 0;
  const totalMocks = overview.mocksCompleted || 0;
  const isBrandNew = totalSolved === 0 && totalMocks === 0;

  // Resolve CTA routing based on orchestrator route
  const handleCtaClick = (route: string) => {
    if (!onNavigate) return;
    if (route) {
      onNavigate(route);
    } else {
      // Fallback
      onNavigate('smart_lessons');
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0 px-4">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-4 flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <BarChart className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Performance Insights</h1>
            <p className="text-sm text-white/50">Track your preparation and improve smarter.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-emerald-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
          <p className="text-xs text-white/50 mb-1">Current Readiness</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-emerald-400">
              {isBrandNew ? '—' : `${overview.readiness}%`}
            </span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Questions Solved</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">
              {overview.questionsSolved.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Mock Tests</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">
              {overview.mocksCompleted}
            </span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-amber-400/80 mb-1">Study Streak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-amber-400">{overview.studyStreak}</span>
            <span className="text-sm font-medium text-amber-400/60">Days</span>
          </div>
        </div>
      </div>

      {isBrandNew ? (
        /* Brand-new User Empty State */
        <div className="p-8 rounded-3xl bg-[#0A0C16] border border-white/5 flex flex-col items-center justify-center text-center space-y-4 py-16">
          <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Activity className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Start Practicing to Unlock Performance Insights</h2>
          <p className="text-sm text-white/50 max-w-md">
            Complete Smart Lessons, attempt quizzes, and practice mock exams to generate your preparation metrics and trends.
          </p>
          <button 
            onClick={() => onNavigate?.('smart_lessons')}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5"
          >
            Start First Lesson
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: 2/3 Width */}
          <div className="lg:col-span-2 space-y-6">

            {/* READINESS SCORE & SUBJECT PERFORMANCE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Target className="w-32 h-32 text-indigo-400" />
                </div>
                <h3 className="text-base font-display font-bold text-white mb-6 relative z-10">Current Readiness</h3>
                
                <div className="flex items-baseline gap-2 mb-2 relative z-10">
                  <span className="text-5xl font-display font-bold text-white">
                    {readiness.current}<span className="text-2xl text-white/50">%</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <div className={cn(
                    "px-2 py-1 rounded text-xs font-bold border",
                    readiness.status === 'STRONG' ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/20" :
                    readiness.status === 'ON_TRACK' ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/20" :
                    "bg-amber-500/20 text-amber-300 border-amber-500/20"
                  )}>
                    {readiness.status.replace('_', ' ')}
                  </div>
                </div>

                <div className="space-y-4 mb-6 relative z-10">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Target Readiness</span>
                      <span className="text-white font-medium">{readiness.target}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/20" style={{ width: `${readiness.target}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-indigo-300">Progress Needed</span>
                      <span className="text-indigo-400 font-bold">+{readiness.gap}%</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleCtaClick(recommendedActions.primaryAction?.route)}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 relative z-10"
                >
                  Improve Readiness
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 flex flex-col justify-between">
                <h3 className="text-base font-display font-bold text-white mb-6">Subject Performance</h3>
                <div className="space-y-5">
                  {subjectPerformance.map((subj: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-white/80 font-medium">{subj.name}</span>
                        <span className={cn(
                          "font-bold",
                          subj.status === 'STRONG' ? "text-emerald-400" :
                          subj.status === 'DEVELOPING' ? "text-cyan-400" :
                          subj.status === 'NEEDS ATTENTION' ? "text-rose-400" :
                          "text-amber-400"
                        )}>{subj.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-1">
                        <div className={cn(
                          "h-full rounded-full",
                          subj.status === 'STRONG' ? "bg-emerald-500" :
                          subj.status === 'DEVELOPING' ? "bg-cyan-500" :
                          subj.status === 'NEEDS ATTENTION' ? "bg-rose-500" :
                          "bg-amber-500"
                        )} style={{ width: `${subj.score}%` }} />
                      </div>
                      <p className="text-[10px] text-white/40 text-right uppercase tracking-wider">{subj.status.replace('_', ' ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PERFORMANCE TREND */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" /> General Performance Trend
                </h3>
                <div className="text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20 font-medium">
                  Last 10 Attempts
                </div>
              </div>
              
              {performanceTrend.dataPoints.length < 2 ? (
                <div className="h-[250px] w-full flex items-center justify-center text-center p-4">
                  <p className="text-sm text-white/40">Complete more quizzes or mock tests to unlock your performance trend.</p>
                </div>
              ) : (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                    <AreaChart data={performanceTrend.dataPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0A0C16', borderColor: '#ffffff20', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
              {performanceTrend.dataPoints.length >= 2 && (
                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-medium">
                  <TrendingUp className="w-4 h-4" /> Trend state: {performanceTrend.direction.replace('_', ' ')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WEAK AREA ANALYSIS */}
              <div className="p-6 rounded-3xl bg-[#0A0C16] border border-rose-500/10 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-display font-bold text-white">Topics Needing Attention</h3>
                </div>
                {weakTopics.length === 0 ? (
                  <p className="text-xs text-white/40 my-auto text-center py-4">No weak topics found with active assessment history.</p>
                ) : (
                  <div className="space-y-4 mb-4">
                    {weakTopics.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span className="text-sm font-medium text-white/90">{item.topic}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">{item.accuracy}</span>
                          <span className="block text-[10px] text-white/40 uppercase">Accuracy</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="w-full py-2.5 rounded-xl border border-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/10 transition-colors mt-auto"
                >
                  Revise Topics
                </button>
              </div>

              {/* STRENGTH ZONE */}
              <div className="p-6 rounded-3xl bg-[#0A0C16] border border-emerald-500/10 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                  <h3 className="text-base font-display font-bold text-white">Topics Performing Well</h3>
                </div>
                {strongTopics.length === 0 ? (
                  <p className="text-xs text-white/40 my-auto text-center py-4">No topics qualifying under mastery thresholds yet.</p>
                ) : (
                  <div className="space-y-4 mb-4">
                    {strongTopics.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-sm font-medium text-white/90">{item.topic}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">{item.accuracy}</span>
                          <span className="block text-[10px] text-white/40 uppercase">Accuracy</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-400/80 mt-auto">
                  High confidence in these areas. Focus on quick revision to maintain.
                </div>
              </div>
            </div>

            {/* ACTION CENTER */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none" />
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-indigo-400" /> Recommended Actions
              </h3>
              
              {!recommendedActions.primaryAction ? (
                <p className="text-sm text-white/40">No orchestrator action recommendations scheduled at this time.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    recommendedActions.primaryAction,
                    ...(recommendedActions.secondaryActions || [])
                  ].slice(0, 3).map((action: any, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => handleCtaClick(action.route)}
                      className="p-4 rounded-xl bg-[#0A0C16] border border-white/5 hover:border-white/20 transition-all group flex items-start gap-4 cursor-pointer"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        i === 0 ? "bg-rose-500/10 text-rose-400" :
                        i === 1 ? "bg-amber-500/10 text-amber-400" :
                        "bg-purple-500/10 text-purple-400"
                      )}>
                        {action.type.includes('REVISE') || action.type.includes('REVIEW') ? <BookOpen className="w-5 h-5" /> : 
                         action.type.includes('QUIZ') || action.type.includes('MOCK') ? <FileText className="w-5 h-5" /> :
                         <Activity className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm leading-tight mb-1 group-hover:text-cyan-100 transition-colors truncate">
                          {action.title}
                        </h4>
                        <span className="text-xs text-white/50 block truncate">
                          {action.priorityBand} PRIORITY • {action.reasons?.[0]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 1/3 Width */}
          <div className="space-y-6">
            
            {/* IMPROVEMENT OPPORTUNITIES */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-amber-500/20 to-transparent">
              <div className="p-6 rounded-[1.4rem] bg-[#0A0C16] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 blur-[2px]">
                  <Target className="w-24 h-24 text-amber-400" />
                </div>
                <h3 className="text-base font-display font-bold text-white mb-6 relative z-10">Improvement Opportunities</h3>
                
                {improvementOpportunities.length === 0 ? (
                  <p className="text-xs text-white/40 py-6 text-center">Complete quizzes to unlock improvement zones.</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 relative z-10">
                      {improvementOpportunities.map((op: any, i: number) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-white/5">
                          <div className="flex flex-col">
                            <span className="text-white/80 text-sm font-medium">{op.chapterTitle}</span>
                            <span className="text-[10px] text-white/40">{op.subject}</span>
                          </div>
                          <span className={cn(
                            "font-bold text-sm",
                            op.severity === 'CRITICAL' ? "text-rose-400" : "text-amber-400"
                          )}>{op.severity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 relative z-10">
                      <button 
                        onClick={() => handleCtaClick(recommendedActions.primaryAction?.route)}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0A0C16] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-0.5"
                      >
                        Start Recommended Action
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* MOCK TEST ANALYSIS */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10 relative overflow-hidden">
               <h3 className="text-base font-display font-bold text-white mb-4">Latest Mock Analysis</h3>
               
               {!latestMock ? (
                 <div className="text-center py-6">
                   <p className="text-xs text-white/40 mb-4">Complete your first mock to unlock detailed assessment analysis.</p>
                   <button 
                     onClick={() => onNavigate?.('mock_tests')}
                     className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-colors"
                   >
                      Start Mock
                   </button>
                 </div>
               ) : (
                 <>
                   <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/5">
                     <div>
                        <span className="text-xs text-white/50 block mb-1">Most Recent</span>
                        <span className="font-medium text-white truncate max-w-[150px] block">{latestMock.title}</span>
                     </div>
                     <div className="text-right">
                       <span className="text-2xl font-bold text-white">
                         {latestMock.score}<span className="text-sm text-white/40">/{latestMock.totalQuestions}</span>
                       </span>
                     </div>
                   </div>

                   <div className="space-y-2 mb-6 text-xs text-white/60">
                     <p>Correct: <span className="text-white font-bold">{latestMock.correct}</span></p>
                     <p>Incorrect: <span className="text-white font-bold">{latestMock.wrong}</span></p>
                     <p>Answering accuracy: <span className="text-white font-bold">{Math.round((latestMock.correct / latestMock.totalQuestions) * 100)}%</span></p>
                   </div>

                   <button 
                     onClick={() => onNavigate?.(`mock_tests:results:${latestMock.id}:${latestMock.id}`)}
                     className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-colors"
                   >
                      Review Results
                   </button>
                 </>
               )}
            </div>

            {/* TARGET TRACKER */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent">
               <div className="flex items-center gap-2 mb-4 text-cyan-400">
                 <Target className="w-5 h-5" />
                 <h3 className="text-base font-display font-bold">Target Tracker</h3>
               </div>
               
               <div className="mb-4">
                 <span className="text-xs text-white/50 uppercase tracking-widest block mb-1">Target Exam</span>
                 <span className="text-lg font-bold text-white">🎓 {targetTracker.targetExam}</span>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/5">
                  <div>
                     <span className="block text-[10px] text-white/40 uppercase mb-1">Days Remaining</span>
                     <span className="text-lg font-bold text-white">{targetTracker.daysRemaining}</span>
                  </div>
                  <div>
                     <span className="block text-[10px] text-white/40 uppercase mb-1">Readiness</span>
                     <span className="text-lg font-bold text-cyan-400">{targetTracker.currentReadiness}%</span>
                  </div>
               </div>

               <div className="mb-4 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                     <span className="text-white/60">Preparation Phase</span>
                     <span className="text-emerald-400 font-bold">{targetTracker.currentPhaseId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/60">Evidence Quality</span>
                     <span className="text-indigo-400 font-bold">{targetTracker.evidenceQuality.replace('_', ' ')}</span>
                  </div>
               </div>

               <p className="text-xs text-center text-cyan-200/60 font-medium italic">
                  Maintain consistency to stay on track.
               </p>
            </div>

            {/* KEY INSIGHTS */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" /> Key Insights
              </h3>
              <ul className="space-y-3">
                {insights.map((insight: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                      insight.type === 'STRENGTH' || insight.type === 'HABIT' ? "bg-emerald-400" :
                      insight.type === 'WARNING' ? "bg-rose-400" : "bg-cyan-400"
                    )} />
                    <span className={cn(
                      insight.type === 'STRENGTH' || insight.type === 'HABIT' ? "text-emerald-400/90" :
                      insight.type === 'WARNING' ? "text-rose-400/90" : "text-white/70"
                    )}>
                      {insight.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
