import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Grid, LogOut, ArrowRight, Sparkles, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickMockResultsProps {
  resultsPayload: {
    success: boolean;
    assessmentType: string;
    quickMockId: string;
    chapterId: string;
    chapterTitle: string;
    questionCount: number;
    correct: number;
    wrong: number;
    skipped: number;
    accuracy: number | null;
    timeTaken?: number;
    results: Array<{
      id: string;
      question: string;
      options: string[];
      studentAnswer: number;
      correctAnswer: number;
      explanation: string;
      isCorrect: boolean;
      isSkipped: boolean;
    }>;
  };
  onRetry: () => void;
  onChooseAnother: () => void;
  onExit: () => void;
}

export function QuickMockResults({ resultsPayload, onRetry, onChooseAnother, onExit }: QuickMockResultsProps) {
  const {
    correct,
    wrong,
    skipped,
    accuracy,
    chapterTitle,
    timeTaken = 0,
    results
  } = resultsPayload;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const answered = correct + wrong;
  const rawAccuracy = accuracy !== null ? accuracy : 0;
  const accuracyText = answered > 0 ? `${Math.round(rawAccuracy)}%` : "Not Evaluated";

  // SVG Gauge calculations
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rawAccuracy / 100) * circumference;

  // Visual Theme based on performance accuracy
  const getPerformanceTheme = () => {
    if (answered === 0) return {
      border: 'border-white/10',
      glow: 'from-white/5 to-transparent',
      text: 'text-white/40',
      badge: 'bg-white/5 text-white/60 border-white/10',
      msg: 'Practice session completed without answering.',
      icon: <HelpCircle className="w-6 h-6 text-white/40" />
    };
    if (rawAccuracy >= 80) return {
      border: 'border-emerald-500/25',
      glow: 'from-emerald-500/10 to-transparent',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      msg: 'Outstanding! Peak concept accuracy achieved.',
      icon: <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
    };
    if (rawAccuracy >= 50) return {
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
      msg: 'Needs focus. Review concept explanations below.',
      icon: <AlertCircle className="w-6 h-6 text-rose-400 animate-pulse" />
    };
  };

  const theme = getPerformanceTheme();

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return mins > 0 ? `${mins}m ${remainingSecs}s` : `${remainingSecs}s`;
  };

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
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">Practice-Only Results</span>
            <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-tight">{chapterTitle}</h1>
            <p className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
              <span>This quick assessment is non-persistent and will be cleared when you exit.</span>
              <span>&bull;</span>
              <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold border uppercase", theme.badge)}>
                {answered === 0 ? "Skipped Session" : `${Math.round(rawAccuracy)}% Accuracy`}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-3 z-10">
          <button
            onClick={onRetry}
            className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Practice Again
          </button>
          <button
            onClick={onChooseAnother}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-semibold transition-all hover:scale-[1.02] flex items-center gap-1.5"
          >
            <Grid className="w-3.5 h-3.5 text-purple-400" /> Choose Another
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
                    rawAccuracy >= 80 ? "stroke-emerald-500" :
                    rawAccuracy >= 50 ? "stroke-purple-500" : "stroke-rose-500"
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
              {answered > 0 ? `${Math.round(rawAccuracy)}%` : "—"}
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
            <span className="text-xs text-white/40">/ {results.length} Correct</span>
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

      {/* QUESTION REVIEW BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* NAV SELECTION */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-[#0A0C16] border border-white/5 flex flex-col gap-4 max-h-[450px]">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">Mistake Analysis</h3>
          <div className="grid grid-cols-5 gap-2 overflow-y-auto pr-1">
            {results.map((r, idx) => {
              const active = idx === activeQuestionIndex;
              
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-xs font-bold border transition-all",
                    active
                      ? "bg-purple-500 border-purple-400 text-white"
                      : r.isSkipped
                      ? "bg-white/5 border-white/5 text-white/40 hover:border-white/10"
                      : r.isCorrect
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/30"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:border-rose-500/30"
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-auto space-y-1.5 pt-4 border-t border-white/5 text-[10px] text-white/40">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-emerald-500/10 border border-emerald-500/20" /> Correct Response</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-rose-500/10 border border-rose-500/20" /> Incorrect Response</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-white/5 border border-white/5" /> Skipped</div>
          </div>
        </div>

        {/* ACTIVE QUESTION DETAIL */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-5">
          {(() => {
            const activeResult = results[activeQuestionIndex];
            if (!activeResult) return null;

            return (
              <>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs font-semibold text-white/60">
                    Question Review #{activeQuestionIndex + 1}
                  </span>
                  {activeResult.isSkipped ? (
                    <span className="text-xs font-bold text-white/40 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Skipped
                    </span>
                  ) : activeResult.isCorrect ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                {/* Question */}
                <div className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                  {activeResult.question?.includes('<img') || activeResult.question?.includes('<br') ? (
                    <div dangerouslySetInnerHTML={{ __html: activeResult.question }} />
                  ) : (
                    <p>{activeResult.question}</p>
                  )}
                </div>

                {/* Options Review */}
                <div className="space-y-2.5">
                  {activeResult.options.map((opt, optIdx) => {
                    const isCorrectOption = optIdx === activeResult.correctAnswer;
                    const isStudentOption = optIdx === activeResult.studentAnswer;
                    const alphabet = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={cn(
                          "p-3.5 rounded-xl border text-left flex items-start gap-4 transition-all text-xs leading-normal select-none",
                          isCorrectOption
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                            : isStudentOption
                            ? "bg-rose-500/5 border-rose-500/20 text-rose-300"
                            : "bg-black/20 border-white/5 text-white/60"
                        )}
                      >
                        <span className={cn(
                          "w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border shrink-0",
                          isCorrectOption
                            ? "bg-emerald-500 border-emerald-400 text-white"
                            : isStudentOption
                            ? "bg-rose-500 border-rose-400 text-white"
                            : "bg-white/5 border-white/10 text-white/40"
                        )}>
                          {alphabet}
                        </span>
                        
                        {opt.includes('<img') ? (
                          <span className="font-medium" dangerouslySetInnerHTML={{ __html: opt }} />
                        ) : (
                          <span className="font-medium">{opt}</span>
                        )}

                        {isCorrectOption && (
                          <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/15 shrink-0">
                            Correct Answer
                          </span>
                        )}
                        {isStudentOption && !isCorrectOption && (
                          <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-rose-400 font-mono bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15 shrink-0">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {activeResult.explanation && (
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Answer Explanation
                    </h4>
                    <div className="text-xs text-white/70 leading-relaxed font-medium">
                      {activeResult.explanation.includes('<img') || activeResult.explanation.includes('<br') ? (
                        <div dangerouslySetInnerHTML={{ __html: activeResult.explanation }} />
                      ) : (
                        <p>{activeResult.explanation}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {/* FOOTER NAVIGATION ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A0C16] border border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Mock
          </button>
          <button
            onClick={onChooseAnother}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/5 transition-all flex items-center gap-1.5"
          >
            <Grid className="w-3.5 h-3.5 text-purple-400" /> Choose Another
          </button>
        </div>
        <button
          onClick={onExit}
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-bold border border-white/5 transition-all flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
        >
          Back to Test Center <LogOut className="w-3.5 h-3.5 text-rose-400" />
        </button>
      </div>
    </div>
  );
}
