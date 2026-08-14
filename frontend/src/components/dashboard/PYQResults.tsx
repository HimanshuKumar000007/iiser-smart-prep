import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  BookOpen, 
  RotateCcw, 
  ChevronRight,
  Trophy,
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PYQResultsProps {
  resultId: string;
  onNavigate?: (view: string) => void;
}

export function PYQResults({ resultId, onNavigate }: PYQResultsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [nextAction, setNextAction] = useState<any>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect'>('all');

  const API_BASE = (import.meta as any).env?.VITE_API_URL ?? 
    ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('IAT_TOKEN');
      if (!token) {
        setError("User unauthorized.");
        setLoading(false);
        return;
      }

      try {
        // Fetch attempt details and action plan in parallel
        const [detailsRes, planRes] = await Promise.all([
          fetch(`${API_BASE}/api/mock/attempts/${resultId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_BASE}/api/student/action-plan`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!detailsRes.ok) {
          throw new Error('Failed to load session details.');
        }

        const details = await detailsRes.json();
        setResultData(details);

        if (planRes.ok) {
          const plan = await planRes.json();
          if (plan.success && plan.primaryAction) {
            setNextAction(plan.primaryAction);
          }
        }
      } catch (err: any) {
        console.error("Error fetching results details:", err);
        setError(err.message || 'We couldn\'t load your results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resultId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto w-full space-y-6 mt-6 animate-pulse">
        <div className="h-40 bg-white/5 border border-white/5 rounded-3xl" />
        <div className="h-60 bg-white/5 border border-white/5 rounded-3xl" />
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="max-w-md mx-auto w-full p-8 rounded-3xl bg-[#0A0C16] border border-rose-500/15 text-center space-y-4 mt-12">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Report Unloadable</h3>
        <p className="text-xs text-white/50">{error || "Failed to parse session metrics."}</p>
        <button 
          onClick={() => onNavigate?.('pyqs')}
          className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/5 transition-colors"
        >
          Back to PYQ Hub
        </button>
      </div>
    );
  }

  const { parent, attempts = [] } = resultData;
  const totalQuestions = parent.total_questions || attempts.length;
  const correct = parent.correct || 0;
  const wrong = parent.wrong || 0;
  const skipped = parent.skipped || 0;
  const timeTaken = parent.time_taken || 0;
  
  const answered = correct + wrong;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const accuracyText = answered > 0 ? `${accuracy}%` : "Not Evaluated";

  const displayQuestions = filterMode === 'all' 
    ? attempts 
    : attempts.filter((att: any) => att.is_correct === false);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return mins > 0 ? `${mins}m ${remainingSecs}s` : `${remainingSecs}s`;
  };

  // Circular progress ring math
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  // Visual Theme based on performance accuracy
  const getPerformanceTheme = () => {
    if (answered === 0) return {
      border: 'border-white/10',
      glow: 'from-white/5 to-transparent',
      text: 'text-white/40',
      badge: 'bg-white/5 text-white/60 border-white/10',
      msg: 'No questions answered in this session.',
      icon: <FileText className="w-6 h-6 text-white/40" />
    };
    if (accuracy >= 80) return {
      border: 'border-emerald-500/25',
      glow: 'from-emerald-500/10 to-transparent',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      msg: 'Outstanding Performance! You have mastered this pool.',
      icon: <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
    };
    if (accuracy >= 50) return {
      border: 'border-purple-500/25',
      glow: 'from-purple-500/10 to-transparent',
      text: 'text-purple-400',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      msg: 'Great job! Keep practicing to secure peak accuracy.',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    };
    return {
      border: 'border-rose-500/25',
      glow: 'from-rose-500/10 to-transparent',
      text: 'text-rose-400',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      msg: 'Needs Focus. Review explanations below to resolve concept gaps.',
      icon: <AlertCircle className="w-6 h-6 text-rose-400 animate-pulse" />
    };
  };

  const theme = getPerformanceTheme();

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 mt-4 pb-32 lg:pb-0 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-6 md:p-8 rounded-3xl bg-[#0A0C16] border flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden transition-all",
          theme.border
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-r pointer-events-none", theme.glow)} />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
            {theme.icon}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">Performance Report</span>
            <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-tight">{parent.mock_title || "PYQ Practice Session"}</h1>
            <p className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
              <span>Completed on {new Date(parent.created_at).toLocaleDateString()}</span>
              <span>&bull;</span>
              <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold border uppercase", theme.badge)}>
                {answered === 0 ? "Skipped Session" : `${accuracy}% Accuracy`}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-3 z-10">
          <button
            onClick={() => onNavigate?.('pyqs')}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold transition-all hover:scale-[1.02] flex items-center gap-1.5"
          >
            Practice Again
          </button>
          <button
            onClick={() => onNavigate?.('pyqs')}
            className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            Back to PYQ Hub
          </button>
        </div>
      </motion.div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Accuracy Radial Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#0D0E1C]/80 to-[#04060F]/80 border border-white/5 relative overflow-hidden flex items-center justify-between group hover:border-purple-500/20 transition-all"
        >
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Accuracy</p>
            <span className="text-xl md:text-2xl font-display font-bold text-white leading-tight block">{accuracyText}</span>
            <span className="text-[9px] text-white/30 block mt-0.5">{theme.msg.slice(0, 20)}...</span>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r={radius} className="stroke-white/5" strokeWidth="4" fill="transparent" />
              {answered > 0 && (
                <circle 
                  cx="32" 
                  cy="32" 
                  r={radius} 
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    accuracy >= 80 ? "stroke-emerald-500" :
                    accuracy >= 50 ? "stroke-purple-500" : "stroke-rose-500"
                  )}
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[10px] text-white">
              {answered > 0 ? `${accuracy}%` : "—"}
            </div>
          </div>
        </motion.div>

        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#0E1B18]/80 to-[#030605]/80 border border-white/5 relative overflow-hidden group hover:border-emerald-500/20 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />
          <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Score (Correct)</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-display font-extrabold text-emerald-400">{correct}</span>
            <span className="text-xs text-white/40">/ {totalQuestions} Correct</span>
          </div>
          <span className="text-[9px] text-emerald-500/50 block mt-1.5 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{correct * 4} Marks (IAT Scale)
          </span>
        </motion.div>

        {/* Skipped / Incorrect Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1C0F14]/80 to-[#050304]/80 border border-white/5 relative overflow-hidden group hover:border-rose-500/20 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] to-transparent pointer-events-none" />
          <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Skipped / Wrong</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-display font-extrabold text-rose-400">{wrong}</span>
            <span className="text-xs text-white/40">Wrong &bull; </span>
            <span className="text-sm font-bold text-white/60">{skipped}</span>
            <span className="text-[10px] text-white/30">Skip</span>
          </div>
          <span className="text-[9px] text-rose-500/50 block mt-1.5 font-medium">
            -{wrong * 1} Marks (Negative Marking)
          </span>
        </motion.div>

        {/* Duration Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1A180E]/80 to-[#050503]/80 border border-white/5 relative overflow-hidden group hover:border-amber-500/20 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent pointer-events-none" />
          <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">Time Spent</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-display font-extrabold text-amber-400">{formatDuration(timeTaken)}</span>
          </div>
          <span className="text-[9px] text-white/30 block mt-2">
            Average {answered > 0 ? Math.round(timeTaken / answered) : 0}s per question
          </span>
        </motion.div>

      </div>

      {/* NEXT BEST ACTION: CLOSED-LOOP INTERACTION */}
      {nextAction && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/5 border border-emerald-500/20 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SmartPrep Next Step Recommendation
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{nextAction.title}</h3>
            <p className="text-xs text-white/60">{nextAction.description}</p>
          </div>
          
          <button
            onClick={() => onNavigate?.(nextAction.route)}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0 flex items-center gap-1.5 z-10 hover:scale-[1.02]"
          >
            {nextAction.ctaLabel || "Complete Steps"} <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </motion.div>
      )}

      {/* MISTAKES & REVIEW FEED */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-2">
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Question &amp; Mistake Review
          </h2>

          <div className="flex bg-[#05060F] p-1 rounded-xl border border-white/5 self-start">
            <button
              onClick={() => setFilterMode('all')}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-lg transition-all",
                filterMode === 'all' ? "bg-white/5 text-white" : "text-white/40 hover:text-white"
              )}
            >
              All Questions ({attempts.length})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-lg transition-all",
                filterMode === 'incorrect' ? "bg-white/5 text-white" : "text-white/40 hover:text-white"
              )}
            >
              Incorrect Only ({wrong})
            </button>
          </div>
        </div>

        {displayQuestions.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0A0C16] border border-white/5 text-center text-white/40 text-sm">
            No questions match the current filter.
          </div>
        ) : (
          <div className="space-y-4">
            {displayQuestions.map((attempt: any, index: number) => {
              const isCorrect = attempt.is_correct === true;
              
              const selectedOptLetter = attempt.selected_answer !== null && attempt.selected_answer !== -1
                ? String.fromCharCode(65 + attempt.selected_answer)
                : 'Skipped';
              
              const correctOptLetter = String.fromCharCode(65 + attempt.correct_answer);

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(0.3 + index * 0.05, 0.8) }}
                  key={index}
                  className={cn(
                    "p-6 rounded-2xl border flex flex-col gap-5 transition-all relative overflow-hidden",
                    isCorrect ? "bg-emerald-500/[0.01] border-emerald-500/10 hover:border-emerald-500/20" : "bg-rose-500/[0.01] border-rose-500/10 hover:border-rose-500/20"
                  )}
                >
                  
                  {/* Status header */}
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">
                      Question {attempt.question_order} &bull; {attempt.subject} &bull; {attempt.difficulty || "Medium"}
                    </span>

                    <span className={cn(
                      "px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase border flex items-center gap-1",
                      isCorrect 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : attempt.selected_answer === null || attempt.selected_answer === -1
                          ? "bg-white/5 border-white/10 text-white/50"
                          : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    )}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {isCorrect ? "Correct" : attempt.selected_answer === null || attempt.selected_answer === -1 ? "Skipped" : "Incorrect"}
                    </span>
                  </div>

                  {/* Question Content */}
                  <div>
                    {attempt.question && (attempt.question.includes('<img') || attempt.question.includes('<br')) ? (
                      <p 
                        className="text-sm text-white/90 leading-relaxed whitespace-pre-line font-medium"
                        dangerouslySetInnerHTML={{ __html: attempt.question }}
                      />
                    ) : (
                      <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line font-medium">
                        {attempt.question || `Question ID: ${attempt.question_id}`}
                      </p>
                    )}
                  </div>

                  {/* Options review panel */}
                  {attempt.options && attempt.options.length > 0 ? (
                    <div className="space-y-2.5">
                      <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider block">Question Options</span>
                      <div className="grid grid-cols-1 gap-2">
                        {attempt.options.map((opt: string, optIdx: number) => {
                          const isCorrectOpt = optIdx === attempt.correct_answer;
                          const isSelectedOpt = optIdx === attempt.selected_answer;
                          return (
                            <div 
                              key={optIdx} 
                              className={cn(
                                "p-3.5 rounded-xl text-xs flex items-center justify-between border transition-all",
                                isCorrectOpt 
                                  ? "bg-emerald-500/5 border-emerald-500/35 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.02)]"
                                  : isSelectedOpt 
                                    ? "bg-rose-500/5 border-rose-500/35 text-rose-200"
                                    : "bg-black/30 border-white/5 text-white/60 hover:border-white/10"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-[10px] transition-all",
                                  isCorrectOpt 
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                    : isSelectedOpt 
                                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" 
                                      : "bg-white/5 text-white/40 border border-white/10"
                                )}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                {opt.includes('<img') ? (
                                  <span className="leading-relaxed w-full" dangerouslySetInnerHTML={{ __html: opt }} />
                                ) : (
                                  <span className="leading-relaxed">{opt}</span>
                                )}
                              </div>
                              {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                              {!isCorrectOpt && isSelectedOpt && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Fallback when options list is not available */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block mb-1">Your Response:</span>
                        <span className={cn(
                          "font-bold",
                          isCorrect ? "text-emerald-400" : attempt.selected_answer === null || attempt.selected_answer === -1 ? "text-white/50" : "text-rose-400"
                        )}>
                          Option {selectedOptLetter}
                        </span>
                      </div>
                      
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block mb-1">Correct Answer:</span>
                        <span className="font-bold text-emerald-400">
                          Option {correctOptLetter}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Solutions / Explanations section */}
                  {attempt.explanation && (
                    <div className="p-4 rounded-2xl bg-purple-500/[0.01] border border-purple-500/10 text-xs relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-purple-500/30" />
                      <span className="text-purple-400 font-bold block mb-1.5 uppercase tracking-wide">Explanation Details:</span>
                      <p className="text-white/70 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: attempt.explanation }} />
                    </div>
                  )}

                </motion.div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
