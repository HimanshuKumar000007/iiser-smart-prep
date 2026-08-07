import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, X, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, BookmarkCheck, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickMockPlayerProps {
  quickMockId: string;
  chapterTitle: string;
  onClose: () => void;
  onSubmitSuccess: (results: any) => void;
  initialQuestions?: any[];
}

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export function QuickMockPlayer({ quickMockId, chapterTitle, onClose, onSubmitSuccess, initialQuestions }: QuickMockPlayerProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const startTimeRef = useRef<number | null>(null);

  // Manage body class to hide MobileNav during mock test
  useEffect(() => {
    document.body.classList.add('mock-test-active');
    return () => {
      document.body.classList.remove('mock-test-active');
    };
  }, []);

  // Load questions on mount
  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      setQuestions(initialQuestions);
      setLoading(false);
      return;
    }

    async function startSession() {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('IAT_TOKEN');
      try {
        const res = await fetch(`${API_BASE}/api/quick-mock/session/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ quickMockId })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to start Quick Mock session.');
        }
        const data = await res.json();
        if (data.success && data.questions) {
          setQuestions(data.questions);
        } else {
          throw new Error('No questions returned for this session.');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to resolve questions. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    startSession();
  }, [quickMockId, initialQuestions]);

  // Active question timer & global countdown
  useEffect(() => {
    if (loading || error || questions.length === 0 || isSubmitting) return;

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const durationMs = 1800 * 1000; // 30 minutes in ms
    const deadline = startTimeRef.current + durationMs;

    const timer = setInterval(() => {
      // Active question time tracking
      const qId = questions[currentIndex]?.id;
      if (qId) {
        setTimeSpent(prev => ({
          ...prev,
          [qId]: (prev[qId] || 0) + 1
        }));
      }

      // Calculate time left based on deadline timestamp
      const now = Date.now();
      const diffSeconds = Math.max(0, Math.ceil((deadline - now) / 1000));
      setTimeLeft(diffSeconds);

      if (diffSeconds <= 0) {
        clearInterval(timer);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, loading, error, questions, isSubmitting]);

  // Prevent back navigation/unload during active mock
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitting && questions.length > 0) {
        e.preventDefault();
        e.returnValue = 'You are currently in an active Quick Mock session. Leaving will discard your progress.';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitting, questions]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitting) return;
    const qId = questions[currentIndex].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    if (isSubmitting) return;
    const qId = questions[currentIndex].id;
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleMark = () => {
    if (isSubmitting) return;
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
    submitSession();
  };

  const submitSession = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    setSubmitError(null);
    setShowSubmitModal(false);

    const token = localStorage.getItem('IAT_TOKEN');

    const formattedAnswers = questions.map(q => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
    }));

    const timeTaken = 1800 - timeLeft;

    // Calculate local fallback results
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const formattedResults = questions.map(q => {
      const ans = selectedAnswers[q.id];
      const isSkipped = ans === undefined || ans === -1;
      const isCorrect = ans === q.correct;
      if (isSkipped) unansweredCount++;
      else if (isCorrect) correctCount++;
      else wrongCount++;

      return {
        id: String(q.id),
        question: q.question,
        options: q.options || [],
        studentAnswer: ans !== undefined ? ans : -1,
        correctAnswer: q.correct,
        explanation: q.explanation || 'Review concept formulas and rules.',
        isCorrect,
        isSkipped
      };
    });

    const totalQs = questions.length;
    const score = correctCount * 4 - wrongCount * 1;
    const accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;

    const fallbackPayload = {
      success: true,
      quickMockId,
      chapterTitle,
      score,
      totalQuestions: totalQs,
      questionCount: totalQs,
      correct: correctCount,
      wrong: wrongCount,
      skipped: unansweredCount,
      correctCount,
      wrongCount,
      unansweredCount,
      accuracy,
      totalTimeSeconds: timeTaken,
      timeTaken,
      results: formattedResults,
      submittedAt: new Date().toISOString()
    };

    try {
      if (token) {
        const res = await fetch(`${API_BASE}/api/quick-mock/session/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quickMockId,
            answers: formattedAnswers,
            timeTaken
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            onSubmitSuccess(data);
            return;
          }
        }
      }
    } catch (err: any) {
      console.warn("Quick Mock submission API notice, using local calculated result:", err);
    }

    // Always succeed using local result calculation if API network or DB fails
    onSubmitSuccess(fallbackPayload);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#04060E] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
        <div className="text-center space-y-1">
          <h3 className="text-sm font-semibold text-white">Preparing Quick Mock</h3>
          <p className="text-xs text-white/40 italic">Resolving chapter inventory...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-[#04060E] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0A0C16] border border-rose-500/20 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Session Start Failure</h3>
            <p className="text-xs text-white/50 mt-1">{error || 'No questions available for this chapter Quick Mock.'}</p>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/5 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
  const isMarked = !!markedForReview[currentQuestion.id];

  return (
    <div className="fixed inset-0 z-50 bg-[#04060E] flex flex-col overflow-hidden text-white select-none">
      
      {/* HEADER */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-black/40 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Mock
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Quick Mock Practice</span>
            <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">{chapterTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {submitError && (
            <span className="text-xs text-rose-400 flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" /> Submit Failed
            </span>
          )}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold",
            timeLeft < 120 
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse" 
              : "bg-white/5 border-white/5 text-purple-300"
          )}>
            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-xs font-bold rounded-lg transition-all"
          >
            Submit Mock
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT NAV PANEL */}
        <aside className="w-64 border-r border-white/5 bg-black/20 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 hidden md:flex">
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Questions list</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const answered = selectedAnswers[q.id] !== undefined;
                const marked = !!markedForReview[q.id];
                const active = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-xs font-bold border transition-all",
                      active
                        ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                        : marked
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : answered
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                        : "bg-white/5 border-white/5 text-white/40 hover:border-white/10"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto space-y-2.5 pt-4 border-t border-white/5 text-[11px] text-white/40">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-purple-500 border border-purple-400" /> Active</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-indigo-500/10 border border-indigo-500/20" /> Answered</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-amber-500/10 border border-amber-500/30" /> Marked for Review</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-white/5 border border-white/5" /> Unattempted</div>
          </div>
        </aside>

        {/* CENTER QUESTION PLAYER */}
        <main className="flex-1 flex flex-col overflow-hidden bg-black/10">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* Question Details header */}
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-semibold text-white/60 tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className={cn(
                "text-xs font-bold",
                currentQuestion.difficulty === 'Hard' ? 'text-rose-400' :
                currentQuestion.difficulty === 'Easy' ? 'text-emerald-400' : 'text-amber-400'
              )}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              {currentQuestion.question?.includes('<img') || currentQuestion.question?.includes('<br') ? (
                <div 
                  className="text-base md:text-lg text-white leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
              ) : (
                <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                  {currentQuestion.question}
                </p>
              )}
            </div>

            {/* Options grid */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt: string, optIdx: number) => {
                const selected = selectedAnswers[currentQuestion.id] === optIdx;
                const alphabet = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all hover:scale-[1.002] select-none",
                      selected
                        ? "bg-purple-500/10 border-purple-500/40 text-purple-300"
                        : "bg-[#0A0C16] border-white/5 text-white/70 hover:bg-white/[0.02] hover:border-white/10 hover:text-white"
                    )}
                  >
                    <span className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shrink-0",
                      selected
                        ? "bg-purple-500 border-purple-400 text-white"
                        : "bg-white/5 border-white/10 text-white/50"
                    )}>
                      {alphabet}
                    </span>
                    {opt.includes('<img') ? (
                      <span 
                        className="text-sm font-medium leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: opt }} 
                      />
                    ) : (
                      <span className="text-sm font-medium leading-relaxed">{opt}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PLAYER ACTIONS FOOTER */}
          <footer className="h-16 border-t border-white/5 px-6 flex items-center justify-between bg-black/20 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearResponse}
                disabled={!isAnswered}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all border",
                  isAnswered
                    ? "bg-white/5 border-white/5 text-white hover:bg-white/10"
                    : "bg-white/[0.01] border-white/[0.02] text-white/20 cursor-not-allowed"
                )}
              >
                Clear Response
              </button>
              <button
                onClick={handleToggleMark}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
                  isMarked
                    ? "bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {isMarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {isMarked ? 'Marked' : 'Mark for Review'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all border",
                  currentIndex > 0
                    ? "bg-white/5 border-white/5 text-white hover:bg-white/10"
                    : "bg-white/[0.01] border-white/[0.02] text-white/20 cursor-not-allowed"
                )}
              >
                Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2 rounded-lg text-xs font-bold transition-all bg-white/5 border border-white/5 text-white hover:bg-white/10 flex items-center gap-1"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-5 py-2 rounded-lg text-xs font-bold transition-all bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Finish
                </button>
              )}
            </div>
          </footer>
        </main>
      </div>

      {/* CONFIRM EXIT MODAL */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExitModal(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm p-6 rounded-2xl bg-[#0C0E1A] border border-white/5 text-center space-y-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Abandon Practice Mock?</h3>
                <p className="text-xs text-white/50 mt-1">
                  Leaving will immediately discard your current mock progress. EPHEMERAL results will not be saved.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-lg border border-white/5 transition-colors"
                >
                  Resume Practice
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Discard & Exit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM SUBMISSION MODAL */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSubmitModal(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm p-6 rounded-2xl bg-[#0C0E1A] border border-white/5 text-center space-y-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Submit Quick Mock?</h3>
                <p className="text-xs text-white/50 mt-1">
                  Are you ready to submit your answers? You have completed {Object.keys(selectedAnswers).length} out of {questions.length} questions.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-lg border border-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={submitSession}
                  disabled={isSubmitting}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin" />
                  ) : (
                    'Confirm & Submit'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
