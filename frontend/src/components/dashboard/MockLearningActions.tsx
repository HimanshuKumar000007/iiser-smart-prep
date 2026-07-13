import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, RotateCcw, AlertTriangle, HelpCircle, Loader } from 'lucide-react';
import { cn } from '../../lib/utils';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface MockLearningActionsProps {
  onNavigate?: (view: string) => void;
  onNavigateBackToMocks: () => void;
}

export function MockLearningActions({ onNavigate, onNavigateBackToMocks }: MockLearningActionsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionsData, setActionsData] = useState<any>(null);

  const fetchActions = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/mock/learning-actions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} when fetching learning actions`);
      }

      const data = await res.json();
      setActionsData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load recommended learning actions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-2 bg-[#0A0C16] border border-white/5 rounded-2xl">
        <Loader className="w-5 h-5 text-cyan-400 animate-spin" />
        <p className="text-xs text-white/40">Evaluating next steps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-2xl bg-[#0A0C16] border border-white/5 flex items-center justify-between gap-4">
        <p className="text-xs text-white/40">Could not load recommendations.</p>
        <button
          onClick={fetchActions}
          className="shrink-0 px-3 py-1.5 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/5 text-white/70 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  const { hasData, learningActions } = actionsData || { hasData: false, learningActions: [] };

  if (!hasData || learningActions.length === 0) {
    return null; // No mock attempts, don't show learning actions
  }

  // Display a maximum of 3 recommended actions
  const visibleActions = learningActions.slice(0, 3);

  return (
    <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="text-sm font-bold text-white">Recommended Next Steps</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleActions.map((action: any) => {
          const isFallback = action.actionType === 'CONTINUE_MOCK_PRACTICE';
          const isRevise = action.actionType === 'REVISE_CHAPTER';
          
          return (
            <div 
              key={action.id} 
              className={cn(
                "p-4 rounded-xl border flex flex-col justify-between gap-4 transition-all font-sans",
                isFallback 
                  ? "bg-white/5 border-white/5" 
                  : isRevise
                  ? "bg-rose-500/[0.02] border-rose-500/10 hover:border-rose-500/20"
                  : "bg-amber-500/[0.02] border-amber-500/10 hover:border-amber-500/20"
              )}
            >
              <div className="space-y-1.5">
                {/* Header info */}
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">
                    {action.subject}
                  </span>
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase",
                    isFallback
                      ? "bg-white/5 border-white/5 text-white/60"
                      : isRevise
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  )}>
                    {isFallback 
                      ? (action.reasonCode === 'STRONG_MOCK_PERFORMANCE' ? "All Clear ✅" : "Gathering Data 📊")
                      : isRevise 
                      ? "Needs Revision" 
                      : "Keep Practicing"
                    }
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-sm line-clamp-1 leading-snug">
                  {action.chapterTitle}
                </h3>

                {/* Description details */}
                <p className="text-xs text-white/50 leading-relaxed">
                  {isFallback
                    ? (action.reasonCode === 'STRONG_MOCK_PERFORMANCE' 
                        ? "Excellent performance! You have no weak chapters. Keep practicing full-length mock tests to maintain your momentum." 
                        : "Take more mock tests to build enough data points for chapter-level analysis.")
                    : `${action.accuracy}% accuracy across ${action.totalQuestions} mock questions`
                  }
                </p>
              </div>

              {/* Action Button CTA */}
              {isFallback ? (
                <button
                  onClick={onNavigateBackToMocks}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg text-xs transition-all border border-white/5 flex items-center justify-center gap-1"
                >
                  Back to Mock Center <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate?.(`/smart-lessons/${action.chapterId}`)}
                  className={cn(
                    "w-full py-2 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1",
                    isRevise 
                      ? "bg-rose-500 hover:bg-rose-400 text-white" 
                      : "bg-amber-500 hover:bg-amber-400 text-[#0A0C16]"
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {isRevise ? "Revise Chapter" : "Practice Chapter"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
