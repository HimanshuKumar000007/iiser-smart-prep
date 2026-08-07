import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, CheckCircle2, ChevronRight, Target, TrendingUp, Sparkles, Loader } from 'lucide-react';
import { cn } from '../../lib/utils';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface MockHistoryProps {
  onReviewMock: (mockId: string, selectedAnswers: Record<string, number>, questionTimes: Record<string, number>, resultId?: string) => void;
  onClose: () => void;
  onStartNewMock: () => void;
}

export function MockHistory({ onReviewMock, onClose, onStartNewMock }: MockHistoryProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<any>(null);
  const [fetchingReviewId, setFetchingReviewId] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setError("User authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/mock/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setHistoryData(data);
        return;
      }
    } catch (err: any) {
      console.warn('[MockHistory] fetch notice:', err);
    }
    
    // Serve empty history on 403, 401, or offline network error
    setHistoryData({ success: true, attempts: [] });
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleReviewClick = async (resultId: string, mockId: string) => {
    setFetchingReviewId(resultId);
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setFetchingReviewId(null);
      setError('Session expired. Please log in again to review attempts.');
      return;
    }

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
      onReviewMock(mockId, data.selectedAnswers, data.questionTimes, resultId);
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
        <p className="text-sm text-white/50">Retrieving mock history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-3xl bg-[#0A0C16] border border-rose-500/20 text-center max-w-md mx-auto my-12 space-y-4">
        <p className="text-sm text-rose-400">{error}</p>
        <button
          onClick={fetchHistory}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/5"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { summary, history, hasData } = historyData || { summary: {}, history: [], hasData: false };

  if (!hasData || history.length === 0) {
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
          <Trophy className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-black text-white">No Mock Tests Yet</h2>
          <p className="text-sm text-white/50 font-sans max-w-sm">
            Take your first full-length mock test to begin tracking your score improvements and learning trends.
          </p>
        </div>

        <button
          onClick={onStartNewMock}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          Start Mock Test
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Mock Center
        </button>
        <h1 className="text-base font-bold text-white">Mock Performance History</h1>
      </div>

      {/* PERFORMANCE SUMMARY STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Total Mock Tests</p>
          <span className="text-2xl font-bold text-white">{summary.totalMocks}</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Best Score</p>
          <span className="text-2xl font-bold text-cyan-400">{summary.bestScore} <span className="text-xs text-white/30">/60</span></span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Average Accuracy</p>
          <span className="text-2xl font-bold text-emerald-400">{summary.averageAccuracy}%</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">Latest Score</p>
          <span className="text-2xl font-bold text-white">{summary.latestScore} <span className="text-xs text-white/30">/60</span></span>
        </div>
      </div>

      {/* TIMELINE LIST OF ATTEMPTS */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-2">Previous Attempts</h2>

        {history.map((attempt: any, idx: number) => {
          // Attempt numbers are calculated sequentially oldest to newest (history is DESC, so first element is N, last is 1)
          const attemptNumber = history.length - idx;
          const completedDate = new Date(attempt.completedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          // Comparison with previous chronological attempt (which is at index + 1 in DESC list)
          const prevAttempt = history[idx + 1];
          const scoreDiff = prevAttempt ? attempt.score - prevAttempt.score : null;

          return (
            <div 
              key={attempt.id} 
              className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* ATTEMPT DESCRIPTION & DATE */}
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-white text-base">Attempt #{attemptNumber}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    Completed ✅
                  </span>
                  {scoreDiff !== null && (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1",
                      scoreDiff > 0 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : scoreDiff < 0
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-white/5 border-white/5 text-white/50"
                    )}>
                      {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff === 0 ? 'No' : scoreDiff} Improvement
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50 font-sans">
                  <span>{attempt.mockTitle}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span>{completedDate}</span>
                </div>
              </div>

              {/* STATS MATRIX BLOCK — grid on small screens to prevent overflow */}
              <div className="grid grid-cols-2 gap-2 md:flex md:items-center md:gap-6 shrink-0 md:justify-end">
                <div className="text-center md:text-right min-w-[70px]">
                  <span className="text-base font-bold text-white block">{attempt.score} / 60</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-white/30">Score</span>
                </div>
                <div className="text-center md:text-right min-w-[70px]">
                  <span className="text-base font-bold text-cyan-400 block">{attempt.accuracy}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-white/30">Accuracy</span>
                </div>
                <div className="text-center md:text-right min-w-[70px]">
                  <span className="text-base font-bold text-white/60 block">{formatSecs(attempt.totalTimeSeconds)}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-white/30">Duration</span>
                </div>

                <button
                  disabled={fetchingReviewId !== null}
                  onClick={() => handleReviewClick(attempt.id, attempt.mockId)}
                  className="col-span-2 md:col-span-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {fetchingReviewId === attempt.id ? (
                    <>
                      <Loader className="w-3 h-3 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>Review</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
