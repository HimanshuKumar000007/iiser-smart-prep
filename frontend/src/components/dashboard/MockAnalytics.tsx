import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, CheckCircle2, Target, TrendingUp, BrainCircuit, Loader, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MockLearningActions } from './MockLearningActions';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface MockAnalyticsProps {
  onReviewMock: (mockId: string, selectedAnswers: Record<string, number>, questionTimes: Record<string, number>) => void;
  onClose: () => void;
  onStartNewMock: () => void;
  onNavigate?: (view: string) => void;
}

export function MockAnalytics({ onReviewMock, onClose, onStartNewMock, onNavigate }: MockAnalyticsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [fetchingReviewId, setFetchingReviewId] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('IAT_TOKEN');

    let serverData: any = null;
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/mock/analytics`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          serverData = await res.json();
        }
      } catch (err: any) {
        console.warn('[MockAnalytics] fetch notice:', err);
      }
    }

    if (serverData && serverData.stats && serverData.stats.totalMocksAttempted > 0) {
      setAnalyticsData(serverData);
      setLoading(false);
      return;
    }

    // Compute analytics from local storage attempt history
    let localAttempts: any[] = [];
    try {
      const localStr = localStorage.getItem('iiser_mock_attempts_history');
      if (localStr) {
        localAttempts = JSON.parse(localStr);
        if (!Array.isArray(localAttempts)) localAttempts = [];
      }
    } catch (e) {}

    if (localAttempts.length > 0) {
      const totalMocksAttempted = localAttempts.length;
      const totalScore = localAttempts.reduce((acc, a) => acc + (a.score || 0), 0);
      const averageScore = Math.round(totalScore / totalMocksAttempted);
      const totalAcc = localAttempts.reduce((acc, a) => acc + (a.accuracy || 0), 0);
      const averageAccuracy = Math.round(totalAcc / totalMocksAttempted);
      const highestScore = Math.max(...localAttempts.map(a => a.score || 0));
      const totalTimeSpentSeconds = localAttempts.reduce((acc, a) => acc + (a.totalTimeSeconds || 0), 0);

      setAnalyticsData({
        success: true,
        stats: {
          totalMocksAttempted,
          averageScore,
          averageAccuracy,
          totalTimeSpentSeconds,
          highestScore,
          recentAttempts: localAttempts
        }
      });
    } else {
      setAnalyticsData({
        success: true,
        stats: {
          totalMocksAttempted: 0,
          averageScore: 0,
          averageAccuracy: 0,
          totalTimeSpentSeconds: 0,
          highestScore: 0,
          recentAttempts: []
        }
      });
    }

    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleReviewClick = async (resultId: string, mockId: string) => {
    setFetchingReviewId(resultId);
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/mock/attempts/${resultId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to load attempt details");
      }

      const data = await res.json();
      onReviewMock(mockId, data.selectedAnswers, data.questionTimes);
    } catch (err) {
      console.error(err);
      alert("Failed to load attempt review data. Please try again.");
    } finally {
      setFetchingReviewId(null);
    }
  };

  const formatSecs = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-sm text-white/50">Computing performance analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-3xl bg-[#0A0C16] border border-rose-500/20 text-center max-w-md mx-auto my-12 space-y-4">
        <p className="text-sm text-rose-400">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/5"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { hasData, analytics } = analyticsData || { hasData: false, analytics: {} };

  if (!hasData) {
    return (
      <div className="max-w-2xl mx-auto w-full p-6 md:p-8 rounded-3xl bg-[#0A0C16] border border-white/5 flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between w-full pb-4 border-b border-white/5 mb-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Mock Center
          </button>
        </div>

        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <BrainCircuit className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-black text-white">No Analytics Data</h2>
          <p className="text-sm text-white/50 font-sans max-w-sm">
            Take mock tests to gather statistical data on your score progression, subject balance, and time management.
          </p>
        </div>

        <button
          onClick={onStartNewMock}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          Take First Mock
        </button>
      </div>
    );
  }

  const { overall, progress, subjects, difficulties, timeManagement, strongestSubject, weakestSubject, recentAttempts } = analytics;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER BAR */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Mock Center
        </button>
        <h1 className="text-base font-bold text-white">Performance Analytics</h1>
      </div>

      {/* OVERALL PERFORMANCE CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Mocks Taken</p>
          <span className="text-2xl font-bold text-white">{overall.totalMocks}</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Best Score</p>
          <span className="text-2xl font-bold text-cyan-400">{overall.bestScore} <span className="text-xs text-white/30">/60</span></span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Average Accuracy</p>
          <span className="text-2xl font-bold text-emerald-400">{overall.averageAccuracy}%</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Latest Score</p>
          <span className="text-2xl font-bold text-white">{overall.latestScore} <span className="text-xs text-white/30">/60</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PROGRESS PANEL */}
        <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white">Your Progress</h2>
          <div className="space-y-3 font-sans">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">First Mock Score</span>
              <span className="text-sm font-bold text-white">{progress.firstScore} / 60</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">Latest Mock Score</span>
              <span className="text-sm font-bold text-white">{progress.latestScore} / 60</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">Improvement</span>
              <span className={cn(
                "text-sm font-bold",
                progress.scoreChange > 0 ? "text-emerald-400" : progress.scoreChange < 0 ? "text-rose-400" : "text-white/50"
              )}>
                {progress.scoreChange > 0 ? `+${progress.scoreChange}` : progress.scoreChange}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-white/50">Trend</span>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                progress.trend === "improving" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                progress.trend === "declining" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                "bg-white/5 border-white/5 text-white/50"
              )}>
                {progress.trend === "improving" ? "Improving ↗" :
                 progress.trend === "declining" ? "Declining ↘" :
                 progress.trend === "stable" ? "Stable →" : "Insufficient History"}
              </span>
            </div>
          </div>
        </div>

        {/* TIME MANAGEMENT */}
        <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white">Time Management</h2>
          <div className="space-y-3 font-sans">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">Average Mock Duration</span>
              <span className="text-sm font-bold text-white">{formatSecs(timeManagement.averageMockTimeSeconds)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">Average / Answered Question</span>
              <span className="text-sm font-bold text-white">{timeManagement.averageAnsweredQuestionTimeSeconds}s</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/50">Fastest Answer</span>
              <span className="text-sm font-bold text-emerald-400">{timeManagement.fastestAnsweredQuestionSeconds}s</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-white/50">Slowest Answer</span>
              <span className="text-sm font-bold text-amber-400">{timeManagement.slowestAnsweredQuestionSeconds}s</span>
            </div>
          </div>
        </div>

        {/* SUBJECT PERFORMANCE */}
        <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white">Subject Performance</h2>
          </div>
          
          <div className="space-y-3.5">
            {subjects.map((sub: any) => (
              <div key={sub.subject} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{sub.subject}</span>
                  <span className="text-white/50">{sub.accuracy}% <span className="text-[10px] text-white/30">({sub.correct}/{sub.totalQuestions})</span></span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: `${sub.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {(strongestSubject || weakestSubject) && (
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-[11px] font-bold">
              {strongestSubject && (
                <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                  <span className="text-[9px] uppercase text-white/30 block mb-0.5">Strongest</span>
                  {strongestSubject.subject} ({strongestSubject.accuracy}%)
                </div>
              )}
              {weakestSubject && (
                <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-400">
                  <span className="text-[9px] uppercase text-white/30 block mb-0.5">Needs Work</span>
                  {weakestSubject.subject} ({weakestSubject.accuracy}%)
                </div>
              )}
            </div>
          )}
        </div>

        {/* DIFFICULTY PERFORMANCE */}
        <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-5">
          <h2 className="text-sm font-bold text-white">Difficulty Performance</h2>
          <div className="space-y-4">
            {difficulties.map((diff: any) => {
              const diffColor = diff.difficulty === 'easy' ? 'bg-emerald-400' : diff.difficulty === 'medium' ? 'bg-amber-400' : 'bg-rose-400';
              return (
                <div key={diff.difficulty} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white capitalize">{diff.difficulty}</span>
                    <span className="text-white/50">{diff.accuracy}% <span className="text-[10px] text-white/30">({diff.correct}/{diff.totalQuestions})</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-500", diffColor)}
                      style={{ width: `${diff.accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RECENT PERFORMANCE (last 5 attempts) */}
      <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
        <h2 className="text-sm font-bold text-white">Recent Performance</h2>
        <div className="space-y-3 font-sans">
          {recentAttempts.map((attempt: any) => (
            <div key={attempt.resultId} className="p-3.5 rounded-xl bg-white/5 hover:bg-white/[0.08] transition-all flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{attempt.mockTitle}</p>
                <p className="text-[10px] text-white/40">{new Date(attempt.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{attempt.score} / 60</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Score</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-cyan-400 block">{attempt.accuracy}%</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Accuracy</span>
                </div>
                <button
                  disabled={fetchingReviewId === attempt.resultId}
                  onClick={() => handleReviewClick(attempt.resultId, attempt.mockId)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg border border-white/5 transition-all flex items-center justify-center gap-1"
                >
                  {fetchingReviewId === attempt.resultId ? (
                    <Loader className="w-3 h-3 animate-spin" />
                  ) : (
                    "Review"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED LEARNING ACTIONS */}
      <MockLearningActions 
        onNavigate={onNavigate} 
        onNavigateBackToMocks={onStartNewMock} 
      />

    </div>
  );
}
