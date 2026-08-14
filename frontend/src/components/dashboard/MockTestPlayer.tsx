import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, Bookmark, ArrowRight, RotateCcw, AlertCircle, Loader, LayoutGrid } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MockTestIndex, MockQuestion } from '../../data/mockTests';
import { trackEvent } from '../../lib/posthog';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface MockTestPlayerProps {
  mockTest: MockTestIndex;
  onClose: () => void;
  onFinish?: (result: any, selectedAnswers?: Record<string, number>, questionTimes?: Record<string, number>) => void;
  isReviewMode?: boolean;
  reviewAnswers?: Record<string, number>;
}

export function MockTestPlayer({ 
  mockTest, 
  onClose, 
  onFinish, 
  isReviewMode = false, 
  reviewAnswers = {} 
}: MockTestPlayerProps) {
  const userId = (() => {
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) return 'anonymous';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload.userId || 'anonymous';
    } catch (e) {
      return 'anonymous';
    }
  })();

  const storageKey = `mock_attempt_${userId}_${mockTest.id}`;

  const { questions } = mockTest.data;

  const hasTrackedStartRef = useRef(false);

  // Track mock_started once
  useEffect(() => {
    if (!isReviewMode && !hasTrackedStartRef.current && mockTest.id) {
      hasTrackedStartRef.current = true;
      try {
        trackEvent('mock_started', {
          mock_id: mockTest.id,
          mock_title: mockTest.title,
          total_questions: questions.length,
          exam: (mockTest as any).exam || 'IAT',
        });
      } catch (_) {}
    }
  }, [isReviewMode, mockTest.id, mockTest.title, questions.length]);

  // ─── All hooks must be called unconditionally before any early return ───────

  useEffect(() => {
    document.body.classList.add('mock-test-active');
    return () => {
      document.body.classList.remove('mock-test-active');
    };
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(() => {
    if (isReviewMode) return reviewAnswers;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedAnswers) return parsed.selectedAnswers;
      }
    } catch (e) {
      console.error("Failed to load saved answers", e);
    }
    return {};
  });

  const [visited, setVisited] = useState<Record<string, boolean>>(() => {
    if (isReviewMode) {
      const allVisited: Record<string, boolean> = {};
      questions.forEach(q => { allVisited[q.id] = true; });
      return allVisited;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.visited) return parsed.visited;
      }
    } catch (e) {
      console.error("Failed to load saved visited state", e);
    }
    // Guard: only access questions[0] if questions is non-empty
    return questions.length > 0 ? { [questions[0].id]: true } : {};
  });

  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.markedForReview) return parsed.markedForReview;
      }
    } catch (e) {
      console.error("Failed to load saved review marks", e);
    }
    return {};
  });

  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.questionTimes) return parsed.questionTimes;
      }
    } catch (e) {
      console.error("Failed to load saved question times", e);
    }
    return {};
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (isReviewMode) return 0;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && typeof saved === "string") {
        const parsed = JSON.parse(saved);
        if (typeof parsed.timeLeft === "number") return parsed.timeLeft;
      }
    } catch (e) {
      console.error("Failed to load saved time left", e);
    }
    return mockTest.duration * 60;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Stable submission ID — preserved across retries for idempotency
  const submissionIdRef = useRef<string>(uuid());

  // Safe derived value — guarded against empty or out-of-bounds questions
  const activeQuestionId = questions[currentIndex]?.id ?? '';

  // ─── Optimized localStorage persistence ─────────────────────────────────────
  // Ref always holds the latest state values so event handlers always save fresh data
  const stateRef = useRef({ selectedAnswers, visited, markedForReview, questionTimes, timeLeft });
  useEffect(() => {
    stateRef.current = { selectedAnswers, visited, markedForReview, questionTimes, timeLeft };
  });

  const saveToStorage = useCallback(() => {
    if (isReviewMode) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(stateRef.current));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [isReviewMode, storageKey]);

  // Save on meaningful changes (answers, navigation) — NOT on every 1-second timer tick
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!isReviewMode) saveToStorage(); }, [selectedAnswers, visited, markedForReview, questionTimes]);

  // Periodic save every 15 seconds for timer recovery
  useEffect(() => {
    if (isReviewMode) return;
    const id = setInterval(saveToStorage, 15000);
    return () => clearInterval(id);
  }, [isReviewMode, saveToStorage]);

  // Save on page hide and before unload
  useEffect(() => {
    if (isReviewMode) return;
    const onHide = () => { if (document.visibilityState === 'hidden') saveToStorage(); };
    const onUnload = () => saveToStorage();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('beforeunload', onUnload);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [isReviewMode, saveToStorage]);

  // Mark the current question as visited
  useEffect(() => {
    if (!activeQuestionId) return;
    setVisited(prev => {
      if (prev[activeQuestionId]) return prev;
      return { ...prev, [activeQuestionId]: true };
    });
  }, [currentIndex, activeQuestionId]);

  // Handle countdown timer & question time accumulation
  useEffect(() => {
    if (isReviewMode) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });

      if (activeQuestionId) {
        setQuestionTimes(prev => ({
          ...prev,
          [activeQuestionId]: (prev[activeQuestionId] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuestionId, isReviewMode]);

  // ─── Guard: no questions available (placed after all hooks) ─────────────────
  if (!questions.length) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05060F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <p className="text-white/60 text-sm">No questions available for this mock test.</p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ─── Event handlers ──────────────────────────────────────────────────────────

  const handleSelectOption = (optionIndex: number) => {
    if (isReviewMode) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [activeQuestionId]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    if (isReviewMode) return;
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[activeQuestionId];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (isReviewMode) return;
    setMarkedForReview(prev => ({
      ...prev,
      [activeQuestionId]: !prev[activeQuestionId]
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const subjectsList = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const activeSubject = questions[currentIndex]?.subject ?? 'Physics';

  const handleSubjectTabClick = (subject: string) => {
    const firstIdx = questions.findIndex(q => q.subject === subject);
    if (firstIdx !== -1) setCurrentIndex(firstIdx);
  };

  // Auto-submit: open modal first so user sees the submitting state
  const handleAutoSubmit = async () => {
    setShowSubmitConfirm(true);
    await performSubmission();
  };

  const performSubmission = async () => {
    if (submitting) return; // Prevent double-submit
    setSubmitting(true);
    setError(null);

    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setSubmitting(false);
      return;
    }

    // Freeze an immutable snapshot before the network request starts
    const frozenAnswers = { ...selectedAnswers };
    const frozenTimes = { ...questionTimes };
    const frozenSubmissionId = submissionIdRef.current; // stable across retries
    const elapsed = Math.max(0, mockTest.duration * 60 - timeLeft);
    const frozenStartedAt = new Date(Date.now() - elapsed * 1000).toISOString();
    const frozenCompletedAt = new Date().toISOString();

    try {
      const payloadAnswers = questions.map((q, idx) => {
        const selected = frozenAnswers[q.id];
        return {
          questionId: String(q.id),
          chapterId: q.chapterId || "",
          topicId: q.topicId || "",
          subject: q.subject,
          difficulty: q.difficulty.toLowerCase(),
          selectedAnswer: selected !== undefined ? selected : -1,
          correctAnswer: q.correct,
          timeTakenSeconds: frozenTimes[q.id] || 0,
          estimatedTimeSeconds: 120,
          questionOrder: idx + 1
        };
      });

      const payload = {
        submissionId: frozenSubmissionId,
        mockId: mockTest.id,
        mockTitle: mockTest.title,
        startedAt: frozenStartedAt,
        completedAt: frozenCompletedAt,
        answers: payloadAnswers
      };

      let isSuccess = false;
      let data: any = {};

      if (token) {
        try {
          const res = await fetch(`${API_BASE}/api/mock/submit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            data = await res.json();
            isSuccess = true;
          } else if (res.status === 401) {
            localStorage.removeItem('IAT_TOKEN');
          }
        } catch (e) {
          console.warn("Network submission failed, generating local result fallback:", e);
        }
      }

      if (!isSuccess) {
        let correct = 0;
        let wrong = 0;
        let skipped = 0;
        questions.forEach(q => {
          const ans = frozenAnswers[q.id];
          if (ans === undefined || ans === -1) {
            skipped++;
          } else if (ans === q.correct) {
            correct++;
          } else {
            wrong++;
          }
        });
        const totalScore = correct * 4 - wrong * 1;
        const accuracy = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

        data = {
          success: true,
          mockResultId: `local_${Date.now()}`,
          score: totalScore,
          totalQuestions: questions.length,
          correct,
          wrong,
          skipped,
          accuracy,
          totalTimeSeconds: elapsed,
          timeTaken: elapsed,
          submittedAt: new Date().toISOString()
        };
      }

      // Clear saved attempt only after a confirmed or fallback submission
      localStorage.removeItem(storageKey);

      // Persist attempt to local history for offline/instant review and analytics
      try {
        const existingHistoryStr = localStorage.getItem('iiser_mock_attempts_history') || '[]';
        let existingHistory = JSON.parse(existingHistoryStr);
        if (!Array.isArray(existingHistory)) existingHistory = [];
        const attemptRecord = {
          resultId: data.mockResultId || `local_${Date.now()}`,
          mockId: mockTest.id,
          mockTitle: mockTest.title,
          score: data.score,
          totalQuestions: data.totalQuestions || questions.length,
          accuracy: data.accuracy,
          correct: data.correct,
          wrong: data.wrong,
          skipped: data.skipped,
          totalTimeSeconds: data.totalTimeSeconds || elapsed,
          completedAt: data.submittedAt || new Date().toISOString(),
          selectedAnswers: frozenAnswers,
          questionTimes: frozenTimes
        };
        existingHistory = [attemptRecord, ...existingHistory.filter((a: any) => a.resultId !== attemptRecord.resultId)];
        localStorage.setItem('iiser_mock_attempts_history', JSON.stringify(existingHistory));
      } catch (e) {
        console.warn("Failed to save attempt history locally:", e);
      }

      // Safe PostHog Event Tracking
      try {
        trackEvent('mock_completed', {
          mock_id: mockTest.id,
          mock_title: mockTest.title,
          score: data.score,
          total_questions: data.totalQuestions || questions.length,
          correct: data.correct,
          wrong: data.wrong,
          skipped: data.skipped,
          accuracy: data.accuracy,
          time_taken_seconds: data.totalTimeSeconds || elapsed,
        });
      } catch (_) {}

      // Pass the frozen snapshot to results screen — NOT mutable state refs
      onFinish?.(data, frozenAnswers, frozenTimes);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Submission failed. Your answers are safe. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format time remaining
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const skippedCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 bg-[#05060F] flex flex-col text-white">
      {/* HEADER NAVBAR */}
      <header className="px-4 md:px-6 py-4 bg-[#0A0C16] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button 
            onClick={() => {
              if (isReviewMode) {
                onClose();
              } else if (window.confirm("Are you sure you want to exit? Your progress will be saved, but the timer will continue.")) {
                onClose();
              }
            }}
            className="p-2 hover:bg-white/5 border border-white/10 rounded-xl transition-colors text-white/70 hover:text-white shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-display font-black tracking-tight truncate">
              {mockTest.title} {isReviewMode && <span className="text-cyan-400 font-bold ml-2 text-xs border border-cyan-500/20 px-2 py-0.5 rounded bg-cyan-500/5 whitespace-nowrap">Review Mode</span>}
            </h1>
            <p className="text-xs text-white/50 hidden sm:block">{totalQuestions} Questions | 240 Marks</p>
          </div>
        </div>

        {/* TIMER + PALETTE TOGGLE + SUBMIT */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {!isReviewMode ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/5">
                <Clock className={cn("w-4 h-4 text-cyan-400 animate-pulse")} />
                <span className="font-mono text-sm font-bold">{formatTime(timeLeft)}</span>
              </div>

              {/* Mobile-only palette toggle */}
              <button
                onClick={() => setShowMobilePalette(true)}
                className="lg:hidden p-2 hover:bg-white/5 border border-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                aria-label="Open question palette"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 md:px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowMobilePalette(true)}
                className="lg:hidden p-2 hover:bg-white/5 border border-white/10 rounded-xl transition-colors text-white/70"
                aria-label="Open question palette"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="px-4 md:px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold text-sm transition-all"
              >
                Close Review
              </button>
            </>
          )}
        </div>
      </header>

      {/* SUBJECT SELECTION TABS — scrollable on mobile */}
      <div className="bg-[#05060F] border-b border-white/5 px-4 py-2 flex gap-2 overflow-x-auto flex-nowrap">
        {subjectsList.map(subj => (
          <button
            key={subj}
            onClick={() => handleSubjectTabClick(subj)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0",
              activeSubject === subj 
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400" 
                : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile palette backdrop */}
        {showMobilePalette && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setShowMobilePalette(false)}
          />
        )}

        {/* QUESTION DETAILS */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/10 border border-white/10 text-white/80">
                Question {currentIndex + 1}
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
                questions[currentIndex].difficulty.toLowerCase() === 'hard' 
                  ? "bg-rose-500/20 border border-rose-500/30 text-rose-400"
                  : questions[currentIndex].difficulty.toLowerCase() === 'medium'
                  ? "bg-amber-500/20 border border-amber-500/30 text-amber-400"
                  : "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
              )}>
                {questions[currentIndex].difficulty}
              </span>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              .mock-question-text img {
                max-width: 80% !important;
                height: auto !important;
                display: block;
                margin: 24px auto;
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background-color: #f8fafc;
                padding: 16px;
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .mock-question-text img:hover {
                transform: scale(1.02);
                border-color: rgba(6, 182, 212, 0.4);
                box-shadow: 0 20px 40px -10px rgba(6, 182, 212, 0.25);
              }
            `}} />

            <h2 
              className="text-base md:text-xl leading-relaxed text-white/90 font-medium font-sans mock-question-text"
              dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }}
            />

            {/* Optional Question Image */}
            {questions[currentIndex].image && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-sm overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
                <img 
                  src={questions[currentIndex].image} 
                  alt={`Question ${questions[currentIndex].id}`} 
                  className="rounded-xl w-full h-auto object-contain bg-[#f8fafc] p-4 transition-transform duration-300 group-hover:scale-[1.02] block mx-auto"
                />
              </div>
            )}

            {/* OPTIONS */}
            <div className="space-y-3 pt-4">
              {questions[currentIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[activeQuestionId] === oIdx;
                const isCorrect = questions[currentIndex].correct === oIdx;

                let optionClass = "bg-white/5 border-white/5 text-white/70 hover:bg-white/[0.08] hover:border-white/10 hover:text-white";
                let badgeClass = "bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white";

                if (isReviewMode) {
                  if (isCorrect) {
                    optionClass = "bg-emerald-500/10 border-emerald-500/40 text-emerald-200 cursor-default";
                    badgeClass = "bg-emerald-500 text-[#0A0C16]";
                  } else if (isSelected) {
                    optionClass = "bg-rose-500/10 border-rose-500/40 text-rose-200 cursor-default";
                    badgeClass = "bg-rose-500 text-white";
                  } else {
                    optionClass = "bg-white/5 border-transparent text-white/40 cursor-default";
                    badgeClass = "bg-white/5 text-white/20";
                  }
                } else if (isSelected) {
                  optionClass = "bg-cyan-500/10 border-cyan-500/40 text-cyan-200";
                  badgeClass = "bg-cyan-400 text-[#0A0C16]";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isReviewMode}
                    onClick={() => handleSelectOption(oIdx)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 group",
                      optionClass
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-colors shrink-0",
                        badgeClass
                      )}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-sm font-sans pt-0.5" dangerouslySetInnerHTML={{ __html: opt }} />
                    </div>

                    {isReviewMode && (
                      <div className="shrink-0 flex items-center">
                        {isCorrect && isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded border border-emerald-500/30">
                            Correct & Selected
                          </span>
                        )}
                        {isCorrect && !isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded border border-emerald-500/30">
                            Correct Answer
                          </span>
                        )}
                        {!isCorrect && isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/15 px-2 py-1 rounded border border-rose-500/30">
                            Your Choice
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box in review mode */}
            {isReviewMode && (
              <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Explanation</h4>
                <div 
                  className="text-sm text-white/70 leading-relaxed font-sans" 
                  dangerouslySetInnerHTML={{ __html: questions[currentIndex].explanation || '' }} 
                />
              </div>
            )}
          </div>

          {/* BOTTOM ACTIONS BAR */}
          <div className="border-t border-white/5 pt-6 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              {!isReviewMode && (
                <>
                  <button
                    onClick={handleClearResponse}
                    className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl transition-all"
                  >
                    Clear Response
                  </button>
                  <button
                    onClick={handleToggleReview}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-xl transition-all border flex items-center gap-2",
                      markedForReview[activeQuestionId]
                        ? "bg-purple-500/10 border-purple-500/40 text-purple-400 hover:bg-purple-500/20"
                        : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {markedForReview[activeQuestionId] ? "Marked for Review" : "Mark for Review"}
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 disabled:opacity-40 disabled:hover:bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] disabled:opacity-40 disabled:hover:bg-cyan-500 transition-colors text-sm font-bold flex items-center gap-1"
              >
                {isReviewMode ? "Next" : "Save & Next"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PALETTE PANEL — desktop sidebar + mobile slide-in drawer */}
        <div className={cn(
          "w-72 lg:w-80 bg-[#0A0C16] border-l border-white/10 p-6 flex-col justify-between overflow-y-auto z-40",
          showMobilePalette
            ? "fixed right-0 top-0 bottom-0 flex shadow-2xl"
            : "hidden lg:flex"
        )}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Question Palette</h3>
              {showMobilePalette && (
                <button
                  onClick={() => setShowMobilePalette(false)}
                  className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
                  aria-label="Close palette"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-2.5 mb-6">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isReview = markedForReview[q.id];
                const isCurrent = currentIndex === idx;
                const isSeen = visited[q.id];

                let paletteClass = "bg-white/5 text-white/40 hover:bg-white/10";
                if (isReviewMode) {
                  const userAns = selectedAnswers[q.id];
                  if (userAns === undefined || userAns === -1) {
                    paletteClass = "bg-white/5 text-white/40 border-transparent";
                  } else if (userAns === q.correct) {
                    paletteClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                  } else {
                    paletteClass = "bg-rose-500/20 text-rose-300 border-rose-500/30";
                  }
                } else {
                  if (isReview) {
                    paletteClass = "bg-purple-500/20 text-purple-300 border-purple-500/30";
                  } else if (isAnswered) {
                    paletteClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                  } else if (isSeen) {
                    paletteClass = "bg-rose-500/20 text-rose-300 border-rose-500/30";
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMobilePalette(false);
                    }}
                    className={cn(
                      "aspect-square rounded-xl text-xs font-bold flex items-center justify-center border transition-all",
                      isCurrent 
                        ? "border-cyan-400 ring-2 ring-cyan-400/20" 
                        : "border-transparent",
                      paletteClass
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PALETTE LEGEND */}
          <div className="border-t border-white/5 pt-6 space-y-3">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Legend</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-500/30 shrink-0" />
                <span className="text-xs text-white/70">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-500/20 border border-rose-500/30 shrink-0" />
                <span className="text-xs text-white/70">Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-500/20 border border-purple-500/30 shrink-0" />
                <span className="text-xs text-white/70">For Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-white/5 border border-transparent shrink-0" />
                <span className="text-xs text-white/70">Not Visited</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM SUBMISSION MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !submitting && setShowSubmitConfirm(false)} />
          <div className="relative w-full max-w-md bg-[#0A0C16] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">Submit Mock Test?</h2>
              <p className="text-sm text-white/60 leading-normal">
                Are you sure you want to end the test? You will not be able to change your responses once submitted.
              </p>
            </div>

            {/* SUMMARY STATS TABLE */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Total Questions</span>
                <span className="font-bold text-white">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-400">Answered</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-400">Marked for Review</span>
                <span className="font-bold text-purple-400">{reviewCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-rose-400">Unanswered</span>
                <span className="font-bold text-rose-400">{skippedCount}</span>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <p className="text-xs text-rose-300 leading-normal">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                disabled={submitting}
                onClick={() => { if (!submitting) { setShowSubmitConfirm(false); setError(null); } }}
                className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 disabled:opacity-40 transition-colors"
              >
                Go Back
              </button>
              <button
                disabled={submitting}
                onClick={performSubmission}
                className="flex-[2] px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#0A0C16] font-bold transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : error ? (
                  <>
                    <RotateCcw className="w-4 h-4" /> Retry Submission
                  </>
                ) : (
                  <>
                    Confirm & Submit <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline UUID generator to prevent build warnings
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
