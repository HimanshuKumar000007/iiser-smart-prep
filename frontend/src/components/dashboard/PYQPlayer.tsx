import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Clock, X, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, BookmarkCheck, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/posthog';

interface PYQPlayerProps {
  questions: any[];
  sessionId: string;
  mockId: string;
  mockTitle: string;
  practiceMode: 'Practice' | 'Timed';
  onNavigate?: (view: string) => void;
  onSubmitSuccess: (resultId: string) => void;
}

export function PYQPlayer({
  questions,
  sessionId,
  mockId,
  mockTitle,
  practiceMode,
  onNavigate,
  onSubmitSuccess
}: PYQPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});
  
  // Timer state
  const isTimed = practiceMode === 'Timed';
  const [timeLeft, setTimeLeft] = useState(questions.length * 90); // 90 seconds per question in timed mode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasTrackedStartRef = useRef(false);

  // Track pyq_started once
  useEffect(() => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      try {
        trackEvent('pyq_started', {
          mock_id: mockId,
          mock_title: mockTitle,
          practice_mode: practiceMode,
          total_questions: questions.length,
        });
      } catch (_) {}
    }
  }, [mockId, mockTitle, practiceMode, questions.length]);


  // Active question timer
  useEffect(() => {
    const timer = setInterval(() => {
      const qId = questions[currentIndex]?.id;
      if (qId) {
        setTimeSpent(prev => ({
          ...prev,
          [qId]: (prev[qId] || 0) + 1
        }));
      }

      if (isTimed) {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isTimed, questions]);

  const handleSelectOption = (optionIndex: number) => {
    const qId = questions[currentIndex].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    const qId = questions[currentIndex].id;
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleMark = () => {
    const qId = questions[currentIndex].id;
    setMarkedForReview(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutoSubmit = () => {
    console.log("Time expired. Autosubmitting session...");
    submitSession();
  };

  const submitSession = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    const API_BASE = (import.meta as any).env?.VITE_API_URL ?? 
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    const formattedAnswers = questions.map(q => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1,
      timeTakenSeconds: timeSpent[q.id] || 0
    }));

    try {
      const res = await fetch(`${API_BASE}/api/pyq/session/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          submissionId: sessionId,
          mockId,
          mockTitle,
          startedAt: new Date(Date.now() - (questions.reduce((sum, q) => sum + (timeSpent[q.id] || 0), 0) * 1000)).toISOString(),
          completedAt: new Date().toISOString(),
          answers: formattedAnswers
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit results. Please try again.');
      }

      const data = await res.json();
      if (data.success && data.mockResultId) {
        try {
          trackEvent('pyq_completed', {
            mock_id: mockId,
            mock_title: mockTitle,
            practice_mode: practiceMode,
            total_questions: questions.length,
            answered: formattedAnswers.filter(a => a.selectedAnswer !== -1).length,
            result_id: data.mockResultId,
          });
        } catch (_) {}
        onSubmitSuccess(data.mockResultId);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: any) {
      console.error("PYQ Submission error:", err);
      setSubmitError(err.message || 'Something went wrong during submission.');
      setIsSubmitting(false);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return null;

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-6 mt-4 pb-32 lg:pb-0 animate-in fade-in duration-300">
      
      {/* LEFT COLUMN: Question Solve Pane */}
      <div className="flex-1 space-y-4">
        
        {/* PLAYER HEADER */}
        <div className="p-4 rounded-2xl bg-[#0A0C16] border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">PYQ Practice Session</span>
            <h2 className="text-sm font-bold text-white leading-tight">{mockTitle}</h2>
          </div>

          <div className="flex items-center gap-4">
            {isTimed && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-sm font-semibold">
                <Clock className="w-4 h-4 animate-pulse" /> {formatTime(timeLeft)}
              </div>
            )}
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to exit? Your current session progress will be lost.")) {
                  onNavigate?.('pyqs');
                }
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QUESTION PANE */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60 font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs text-white/40 font-mono uppercase tracking-wider">
              {currentQuestion.subject} &bull; {currentQuestion.year}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            {currentQuestion.question.includes('<img') || currentQuestion.question.includes('<br') ? (
              <p 
                className="text-base text-white/90 font-medium leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />
            ) : (
              <p className="text-base text-white/90 font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion.question}
              </p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt: string, i: number) => {
              const isSelected = selectedAnswers[currentQuestion.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3",
                    isSelected 
                      ? "bg-purple-500/10 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
                      : "bg-black/30 border-white/5 hover:border-white/15 text-white/70 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border shrink-0 mt-0.5",
                    isSelected 
                      ? "bg-purple-500 border-purple-400 text-white" 
                      : "bg-white/5 border-white/10 text-white/40"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.includes('<img') ? (
                    <span dangerouslySetInnerHTML={{ __html: opt }} className="w-full" />
                  ) : (
                    <span>{opt}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            <div className="flex gap-2">
              <button
                onClick={handleToggleMark}
                className={cn(
                  "px-4 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5",
                  markedForReview[currentQuestion.id]
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                )}
              >
                {markedForReview[currentQuestion.id] ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                Mark for Review
              </button>
              {selectedAnswers[currentQuestion.id] !== undefined && (
                <button
                  onClick={handleClearResponse}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-black/20 hover:bg-black/40 text-rose-400/90 hover:text-rose-400 border border-rose-500/10 transition-colors"
                >
                  Clear Response
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-colors flex items-center gap-1"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  Submit Session
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Question Navigator */}
      <div className="w-full md:w-64 space-y-4">
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Question Navigator</h3>
          
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => {
              const isCurrent = i === currentIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isMarked = markedForReview[q.id] === true;

              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold border transition-all",
                    isCurrent && "ring-2 ring-purple-400 ring-offset-2 ring-offset-black scale-105",
                    isAnswered && isMarked && "bg-purple-500/25 border-purple-500 text-purple-300",
                    isAnswered && !isMarked && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                    !isAnswered && isMarked && "bg-amber-500/10 border-amber-500/30 text-amber-400",
                    !isAnswered && !isMarked && "bg-black/30 border-white/5 text-white/30 hover:text-white"
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2 text-[10px] text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/40" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-purple-500/20 border border-purple-500/40" />
              <span>Answered &amp; Marked</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all"
        >
          Submit Practice Session
        </button>
      </div>

      {/* SUBMISSION OVERLAY DIALOG */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#0A0C16] border border-white/10 shadow-2xl space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Submit Session</h3>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Are you sure you want to finish and submit your PYQ practice session? You will immediately unlock your performance report and mistake breakdown.
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 text-center text-xs">
              <div>
                <span className="text-white/40 block mb-1">Answered</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">Unanswered</span>
                <span className="font-bold text-white/80">{questions.length - answeredCount}</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">Marked</span>
                <span className="font-bold text-amber-400">{Object.values(markedForReview).filter(Boolean).length}</span>
              </div>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                disabled={isSubmitting}
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
              >
                Back to Session
              </button>
              <button
                disabled={isSubmitting}
                onClick={submitSession}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
