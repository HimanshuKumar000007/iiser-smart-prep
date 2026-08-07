import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, X, ArrowRight, TrendingUp, CheckCircle2, AlertTriangle, ChevronRight, Zap, Target, LineChart, FileText, Star, BrainCircuit, RotateCcw, BarChart, History, Check, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { MOCK_TESTS } from '../../data/mockTests';
import { MockTestPlayer } from './MockTestPlayer';
import { MockTestResults } from './MockTestResults';
import { MockHistory } from './MockHistory';
import { MockAnalytics } from './MockAnalytics';
import { QuickMockModal } from './QuickMockModal';
import { QuickMockPlayer } from './QuickMockPlayer';
import { QuickMockResults } from './QuickMockResults';
import { useEntitlement } from '../../hooks/useEntitlement';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

interface MockTestCenterProps {
  onNavigate?: (view: string) => void;
  initialTab?: 'mocks' | 'history' | 'analytics';
  initialResultId?: string;
  initialMockId?: string;
}

export function MockTestCenter({ onNavigate, initialTab, initialResultId, initialMockId }: MockTestCenterProps) {
  const { isPro } = useEntitlement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMock, setSelectedMock] = useState<any>(null);
  const [mockLimit, setMockLimit] = useState(10);
  const [activeMockTest, setActiveMockTest] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  
  const [selectedQuickMockSubject, setSelectedQuickMockSubject] = useState<string | null>(null);
  const [activeQuickMockId, setActiveQuickMockId] = useState<string | null>(null);
  const [activeQuickMockChapterTitle, setActiveQuickMockChapterTitle] = useState<string>('');
  const [quickMockResults, setQuickMockResults] = useState<any | null>(null);
  const [activeQuickMockQuestions, setActiveQuickMockQuestions] = useState<any[]>([]);
  
  // States for full results mapping and review mode
  const [completedMock, setCompletedMock] = useState<any>(null);
  const [attemptedAnswers, setAttemptedAnswers] = useState<Record<string, number>>({});
  const [attemptedTimes, setAttemptedTimes] = useState<Record<string, number>>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'mocks' | 'history' | 'analytics'>(initialTab || 'mocks');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null);
  const [isLoadingLatestAnalysis, setIsLoadingLatestAnalysis] = useState(false);

  const fetchStats = async () => {
    const token = localStorage.getItem('IAT_TOKEN');

    // First load from local storage immediately so user sees something instantly
    try {
      const localStr = localStorage.getItem('iiser_mock_attempts_history');
      if (localStr) {
        const localAttempts = JSON.parse(localStr);
        if (Array.isArray(localAttempts) && localAttempts.length > 0) {
          const totalMocksLocal = localAttempts.length;
          const avgScoreLocal = Math.round(localAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / totalMocksLocal);
          const bestScoreLocal = Math.max(...localAttempts.map(a => a.score || 0));
          setAnalyticsData({
            overall: {
              totalMocks: totalMocksLocal,
              averageScore: avgScoreLocal,
              bestScore: bestScoreLocal
            },
            progress: { scoreChange: 0 }
          });
          setHistory(localAttempts);
        }
      }
    } catch (e) {}

    if (!token) return;
    try {
      const [analyticsRes, historyRes] = await Promise.all([
        fetch(`${API_BASE}/api/mock/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/mock/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        if (data?.success && data?.hasData) {
          setAnalyticsData(data.analytics);
        }
      }
      if (historyRes.ok) {
        const data = await historyRes.json();
        if (data?.success && data?.history && data.history.length > 0) {
          setHistory(data.history);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch mock stats from server, using local data:", err);
    }
  };

  useEffect(() => {
    if (initialResultId && initialMockId) {
      const realMock = MOCK_TESTS.find(m => m.id === initialMockId);
      if (realMock) {
        setCompletedMock(realMock);
        setTestResult({
          success: true,
          mockResultId: initialResultId,
          score: 0,
          totalQuestions: 60,
          accuracy: 0,
          correct: 0,
          wrong: 0,
          skipped: 0,
          totalTimeSeconds: 0,
          timeTaken: 0,
          submittedAt: new Date().toISOString()
        });
      }
    }
  }, [initialResultId, initialMockId]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      if (history.length === 0) {
        setLatestAnalysis(null);
        return;
      }
      const latestAttempt = history[0];
      const token = localStorage.getItem('IAT_TOKEN');
      if (!token) return;
      setIsLoadingLatestAnalysis(true);
      try {
        const res = await fetch(`${API_BASE}/api/mock/results/${latestAttempt.id}/analysis`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLatestAnalysis(data);
        }
      } catch (err) {
        console.error("Failed to fetch latest mock analysis:", err);
      } finally {
        setIsLoadingLatestAnalysis(false);
      }
    };
    fetchLatestAnalysis();
  }, [history]);

  const allMocks = Array.from({ length: 50 }).map((_, i) => {
    const mockId = `IAT_FULL_${String(i + 1).padStart(2, '0')}`;
    const realMock = MOCK_TESTS.find(m => m.id === mockId);
    
    // Find all attempts for this mockId from history state
    const mockAttempts = history.filter(h => h.mockId === mockId);
    const attemptsCount = mockAttempts.length;
    const bestScoreForMock = attemptsCount > 0 
      ? Math.max(...mockAttempts.map(a => a.score)) 
      : null;

    return {
      id: mockId,
      title: realMock?.title || `IISER IAT Mock #${i + 1}`,
      diff: realMock?.difficulty || (i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy'),
      qs: realMock?.questions || 60,
      time: realMock?.duration || 180,
      attempts: attemptsCount,
      best: bestScoreForMock,
      isReal: !!realMock,
      isLocked: !isPro && i > 0 // 1st mock test is FREE, rest locked for non-Pro
    };
  });

  const visibleMocks = allMocks.slice(0, mockLimit);

  const handleStartMock = (mock: any) => {
    if (mock.isLocked) {
      onNavigate?.('subscription:mock_tests');
      return;
    }
    setSelectedMock(mock);
    setIsModalOpen(true);
  };

  const startTest = () => {
    const realMock = MOCK_TESTS.find(m => m.id === selectedMock.id);
    if (!realMock) {
      alert("This mock test is not loaded in this version. Please try IISER IAT Mock #1, #2, or #3!");
      setIsModalOpen(false);
      return;
    }
    setActiveMockTest(realMock);
    setIsModalOpen(false);
  };

  if (activeMockTest) {
    return (
      <MockTestPlayer 
        mockTest={activeMockTest} 
        onClose={() => setActiveMockTest(null)} 
        onFinish={(result, answers, times) => {
          setCompletedMock(activeMockTest);
          setAttemptedAnswers(answers || {});
          setAttemptedTimes(times || {});
          setTestResult(result);
          setActiveMockTest(null);
        }}
      />
    );
  }

  if (reviewMode && completedMock) {
    return (
      <MockTestPlayer
        mockTest={completedMock}
        isReviewMode={true}
        reviewAnswers={attemptedAnswers}
        onClose={() => setReviewMode(false)}
      />
    );
  }

  if (testResult && completedMock) {
    return (
      <MockTestResults
        mockTest={completedMock}
        submissionResult={testResult}
        selectedAnswers={attemptedAnswers}
        questionTimes={attemptedTimes}
        onReview={() => setReviewMode(true)}
        onRetake={() => {
          const freshMock = completedMock;
          setTestResult(null);
          setReviewMode(false);
          setActiveMockTest(freshMock);
        }}
        onClose={() => {
          setTestResult(null);
          setReviewMode(false);
          setCompletedMock(null);
          fetchStats();
        }}
        onNavigate={onNavigate}
      />
    );
  }

  if (activeTab === 'history') {
    return (
      <MockHistory 
        onReviewMock={(mockId, answers, times, resultId) => {
          const realMock = MOCK_TESTS.find(m => m.id === mockId);
          if (realMock) {
            setCompletedMock(realMock);
            setAttemptedAnswers(answers || {});
            setAttemptedTimes(times || {});
            if (resultId) {
              setTestResult({
                success: true,
                mockResultId: resultId,
                score: 0,
                totalQuestions: 60,
                accuracy: 0,
                correct: 0,
                wrong: 0,
                skipped: 0,
                totalTimeSeconds: 0,
                averageTimeSeconds: 0
              });
              setReviewMode(false);
            } else {
              setReviewMode(true);
            }
          }
        }}
        onClose={() => setActiveTab('mocks')}
        onStartNewMock={() => setActiveTab('mocks')}
      />
    );
  }

  if (activeTab === 'analytics') {
    return (
      <MockAnalytics
        onReviewMock={(mockId, answers, times) => {
          const realMock = MOCK_TESTS.find(m => m.id === mockId);
          if (realMock) {
            setCompletedMock(realMock);
            setAttemptedAnswers(answers || {});
            setAttemptedTimes(times || {});
            setReviewMode(true);
          }
        }}
        onClose={() => setActiveTab('mocks')}
        onStartNewMock={() => setActiveTab('mocks')}
        onNavigate={onNavigate}
      />
    );
  }

  const latestAttempt = history.length > 0 ? history[0] : null;

  const getRecoveryPlanItems = () => {
    if (!latestAnalysis) return [
      "Revise weak areas from latest mock",
      "Complete subject-based practice quick mock",
      "Review incorrect responses"
    ];

    const items = [];
    
    // Step 1: Weakest chapter revision action
    if (latestAnalysis.recommendedAction && latestAnalysis.recommendedAction.actionType === 'REVISE_CHAPTER') {
      const chTitle = latestAnalysis.recommendedAction.chapterTitle || "Weak Chapters";
      const timeEst = latestAnalysis.recommendedAction.estimatedRevision || 20;
      items.push(`Revise ${chTitle} (${timeEst}m)`);
    } else if (latestAnalysis.recommendedAction && latestAnalysis.recommendedAction.title) {
      items.push(latestAnalysis.recommendedAction.title);
    } else {
      items.push("Focus on key concept revisions");
    }

    // Step 2: Practice recommendations (Dynamic subject-based Quick Mock/Quiz)
    const validSubjects = latestAnalysis.subjectBreakdown?.filter((s: any) => s.accuracy !== null) || [];
    if (validSubjects.length > 0) {
      const sortedSubjects = [...validSubjects].sort((a: any, b: any) => a.accuracy - b.accuracy);
      const weakestSubj = sortedSubjects[0]?.subject || "Physics";
      items.push(`Complete ${weakestSubj} Quick Mock`);
    } else {
      items.push("Complete recommended subject quick mocks");
    }

    // Step 3: Review incorrect questions count
    const wrongCount = latestAnalysis.mistakeAnalysis?.totalWrongCount ?? latestAttempt?.wrong ?? 0;
    items.push(`Review ${wrongCount} incorrect questions`);

    return items;
  };

  const getFrequentMistakes = () => {
    if (!latestAnalysis || !latestAnalysis.chapterBreakdown) return [
      { topic: 'Establish your baseline profile', accuracy: '—', miss: 0 },
    ];
    
    const mistakes = latestAnalysis.chapterBreakdown
      .filter((c: any) => c.wrong > 0)
      .sort((a: any, b: any) => {
        if (b.wrong !== a.wrong) {
          return b.wrong - a.wrong;
        }
        return a.accuracy - b.accuracy;
      })
      .slice(0, 3)
      .map((c: any) => ({
        topic: c.chapterTitle,
        accuracy: `${Math.round(c.accuracy)}%`,
        miss: c.wrong,
        chapterId: c.chapterId
      }));

    if (mistakes.length === 0) {
      return [
        { topic: 'No mistake patterns identified!', accuracy: '100%', miss: 0 }
      ];
    }
    return mistakes;
  };

  const handleStartRecoveryPlan = () => {
    if (!latestAttempt) {
      // Switch tab to mocks (or already in mocks)
      setActiveTab('mocks');
      return;
    }
    
    if (latestAnalysis && latestAnalysis.recommendedAction) {
      const { actionType, chapterId } = latestAnalysis.recommendedAction;
      if (actionType === 'REVISE_CHAPTER' && chapterId) {
        if (onNavigate) {
          onNavigate(`/smart-lessons/${chapterId}`);
          return;
        }
      }
    }
    // Fallback: navigate to lessons hub
    if (onNavigate) {
      onNavigate('lessons');
    }
  };

  const totalMocks = analyticsData?.overall?.totalMocks ?? 0;
  const averageScore = analyticsData?.overall?.averageScore !== undefined
    ? Math.round(analyticsData.overall.averageScore)
    : 0;
  const bestScore = analyticsData?.overall?.bestScore !== undefined
    ? Math.round(analyticsData.overall.bestScore)
    : 0;

  const trendVal = analyticsData?.progress?.scoreChange ?? 0;
  const isPositive = trendVal > 0;
  const isNegative = trendVal < 0;

  let trendColorClass = "text-emerald-400";
  let trendBgClass = "bg-emerald-500/5";
  let trendBorderClass = "border-emerald-500/20";
  let trendLabelColorClass = "text-emerald-400/80";
  let trendSign = "+";

  if (isNegative) {
    trendColorClass = "text-rose-400";
    trendBgClass = "bg-rose-500/5";
    trendBorderClass = "border-rose-500/20";
    trendLabelColorClass = "text-rose-400/80";
    trendSign = "";
  } else if (trendVal === 0) {
    trendColorClass = "text-white/60";
    trendBgClass = "bg-white/5";
    trendBorderClass = "border-white/5";
    trendLabelColorClass = "text-white/40";
    trendSign = "";
  }

  if (quickMockResults) {
    return (
      <QuickMockResults
        resultsPayload={quickMockResults}
        onRetry={() => {
          const id = quickMockResults.quickMockId;
          const title = quickMockResults.chapterTitle;
          setQuickMockResults(null);
          setActiveQuickMockId(id);
          setActiveQuickMockChapterTitle(title);
          setActiveQuickMockQuestions([]);
        }}
        onChooseAnother={() => {
          setQuickMockResults(null);
        }}
        onExit={() => {
          setQuickMockResults(null);
          setSelectedQuickMockSubject(null);
        }}
      />
    );
  }

  if (activeQuickMockId) {
    return (
      <QuickMockPlayer
        quickMockId={activeQuickMockId}
        chapterTitle={activeQuickMockChapterTitle}
        initialQuestions={activeQuickMockQuestions}
        onClose={() => {
          setActiveQuickMockId(null);
          setActiveQuickMockQuestions([]);
        }}
        onSubmitSuccess={(results) => {
          setActiveQuickMockId(null);
          setActiveQuickMockQuestions([]);
          setQuickMockResults(results);
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-4 flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Mock Test Center</h1>
            <p className="text-sm text-white/50">Practice under real exam conditions and track your progress.</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="col-span-2 lg:col-span-4 flex items-center gap-2 p-1 bg-[#0A0C16] border border-white/5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('mocks')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-xl transition-all",
              (activeTab as string) === 'mocks'
                ? "bg-cyan-500 text-[#0A0C16] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            Full Mock Tests
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-xl transition-all",
              (activeTab as string) === 'history'
                ? "bg-cyan-500 text-[#0A0C16] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-xl transition-all",
              (activeTab as string) === 'analytics'
                ? "bg-cyan-500 text-[#0A0C16] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            Analytics
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Tests Attempted</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{totalMocks}</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Average Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{averageScore}</span>
            <span className="text-sm text-white/40">/100</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Best Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{bestScore}</span>
            <span className="text-sm text-white/40">/100</span>
          </div>
        </div>
        <div className={cn("p-5 rounded-2xl relative overflow-hidden group border", trendBgClass, trendBorderClass)}>
          {trendVal === 0 && <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
          <p className={cn("text-xs mb-1", trendLabelColorClass)}>Improvement Trend</p>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-display font-bold", trendColorClass)}>{trendSign}{Math.round(trendVal)}</span>
            <span className={cn("text-xl font-bold opacity-50", trendColorClass)}>%</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 w-full md:w-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-wider uppercase border border-indigo-500/20">Recommended Next Test</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">IISER IAT Mock #1</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-lg">
              <Target className="w-4 h-4 text-emerald-400" /> Medium
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-lg">
              <FileText className="w-4 h-4 text-cyan-400" /> 60 Qs
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-amber-400" /> 180 Min
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <TrendingUp className="w-4 h-4" /> +4% Potential Improvement
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleStartMock({ id: 'IAT_FULL_01', title: 'IISER IAT Mock #1', questions: 60, duration: 180 })}
              className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Recommended Mock <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
            >
              View Previous Results
            </button>
          </div>
        </div>

        {/* AI Recommendations card embedded in Hero */}
        <div className="relative z-10 w-full md:w-80 p-5 rounded-2xl bg-[#0A0C16]/60 backdrop-blur-md border border-white/10 hidden lg:block">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">AI Recommendations</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs text-white/70">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span>Attempt IISER Mock #1 next to test Rotational Motion.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-white/70">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span>Revise Chemical Equilibrium before your next mock.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-emerald-400/90">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>Your Biology performance is excellent.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: 2/3 Width */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* QUICK MOCKS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Quick Mocks
              </h3>
              <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { subject: 'Physics', color: 'blue', questions: 10, time: 15 },
                { subject: 'Chemistry', color: 'rose', questions: 10, time: 15 },
                { subject: 'Biology', color: 'emerald', questions: 10, time: 15 },
                { subject: 'Mathematics', color: 'amber', questions: 10, time: 15 },
              ].map((mock, i) => {
                const isQuickMockLocked = !isPro && i > 0;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (isQuickMockLocked) {
                        onNavigate?.('subscription:mock_tests');
                      } else {
                        setSelectedQuickMockSubject(mock.subject);
                      }
                    }}
                    className="p-4 rounded-2xl bg-[#0A0C16] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group cursor-pointer hover:scale-[1.01]"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white group-hover:text-cyan-100 transition-colors">{mock.subject} Quick Mock</h4>
                        {isQuickMockLocked && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> PRO
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {mock.questions} Qs</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mock.time} Min</span>
                      </div>
                    </div>
                    <button className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      isQuickMockLocked
                        ? "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-black"
                        : "bg-white/5 text-white/50 group-hover:bg-cyan-500 group-hover:text-[#0A0C16]"
                    )}>
                      {isQuickMockLocked ? <Lock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FULL MOCK TESTS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" /> Full Mock Tests
              </h3>
              <button
                onClick={() => setActiveTab('history')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <History className="w-3.5 h-3.5 text-indigo-400" /> Mock History
              </button>
            </div>
            <div className="space-y-3">
              {visibleMocks.map((mock, i) => (
                <div key={i} className="p-4 md:p-5 rounded-2xl bg-[#0A0C16] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className="font-bold text-white text-base">{mock.title}</h4>
                      {mock.isLocked ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 tracking-wide uppercase flex items-center gap-1">
                          <Lock className="w-3 h-3" /> PRO LOCK
                        </span>
                      ) : mock.attempts > 0 ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 tracking-wide uppercase">Attempted • {mock.attempts}x</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 tracking-wide uppercase">FREE</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {mock.diff}</span>
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {mock.qs} Qs</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mock.time} Min</span>
                      {mock.best && <span className="text-emerald-400 font-medium ml-auto md:ml-0">Best: {mock.best}/100</span>}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleStartMock(mock)}
                    className={cn(
                      "w-full md:w-auto px-5 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2",
                      mock.isLocked
                        ? "bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 shadow-sm"
                        : "bg-white/5 hover:bg-white/10 border border-white/5 text-white"
                    )}
                  >
                    {mock.isLocked ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" /> Unlock with Pro
                      </>
                    ) : (
                      'Attempt Mock'
                    )}
                  </button>
                </div>
              ))}
              {mockLimit < 50 && (
                <button 
                  onClick={() => setMockLimit(prev => Math.min(prev + 10, 50))}
                  className="w-full py-3.5 rounded-xl border border-dashed border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm font-semibold transition-all">
                  Load More Mocks
                </button>
              )}
            </div>
          </section>

          {/* PYQs */}
          <div className="grid grid-cols-1 gap-6">
            <section>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-rose-400" /> Previous Year Papers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'IAT 2025', year: 2025, tag: 'NEW' },
                  { title: 'IAT 2024', year: 2024 },
                ].map((mock, i) => {
                  const isPyqLocked = !isPro && i > 0;
                  return (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (isPyqLocked) {
                          onNavigate?.('subscription:pyqs');
                        } else {
                          onNavigate?.('pyqs');
                        }
                      }}
                      className="p-4 rounded-xl bg-[#0A0C16] border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white/90 text-sm">{mock.title}</h4>
                        {isPyqLocked ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> PRO
                          </span>
                        ) : mock.tag ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/20">{mock.tag}</span>
                        ) : null}
                      </div>
                      <button className={cn(
                        "text-xs font-semibold flex items-center gap-1 transition-opacity",
                        isPyqLocked ? "text-amber-400" : "text-cyan-400 opacity-0 group-hover:opacity-100"
                      )}>
                        {isPyqLocked ? <Lock className="w-3.5 h-3.5" /> : 'Attempt'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT COLUMN: 1/3 Width */}
        <div className="space-y-6">
          
          {/* LATEST PERFORMANCE / MOCK RECOVERY PLAN */}
          <div className="p-1 rounded-3xl bg-gradient-to-b from-indigo-500/20 to-transparent">
            <div className="p-5 md:p-6 rounded-[1.4rem] bg-[#0A0C16] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 blur-[2px]">
                <BarChart className="w-24 h-24 text-indigo-400" />
              </div>
              <h3 className="text-base font-display font-bold text-white mb-4 relative z-10">Latest Mock Score</h3>
              <div className="flex items-baseline gap-2 mb-6 relative z-10">
                <span className="text-4xl font-display font-bold text-white">
                  {latestAttempt ? Math.round(latestAttempt.accuracy) : '—'}
                </span>
                <span className="text-lg text-white/50">/100</span>
              </div>
              
              <div className="space-y-3 mb-6 relative z-10 font-sans">
                {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map(subj => {
                  let percentage = 0;
                  if (latestAnalysis && latestAnalysis.subjectBreakdown) {
                    const match = latestAnalysis.subjectBreakdown.find((s: any) => s.subject === subj);
                    if (match && match.accuracy !== null) {
                      percentage = Math.round(match.accuracy);
                    }
                  } else if (latestAttempt) {
                    percentage = Math.round(latestAttempt.accuracy);
                  }

                  const isHighAcc = percentage >= 80;
                  const isLowAcc = percentage > 0 && percentage < 60;
                  const labelColor = isLowAcc ? "text-rose-400/80" : "text-white/60";
                  const valColor = isHighAcc ? "text-emerald-400" : isLowAcc ? "text-rose-400" : "text-white";

                  return (
                    <div key={subj} className="flex justify-between items-center text-xs">
                      <span className={cn(labelColor)}>{subj}</span>
                      <span className={cn(valColor, "font-medium")}>
                        {latestAttempt ? `${percentage}%` : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* MOCK RECOVERY PLAN CTA */}
              <div className="pt-4 border-t border-white/5 relative z-10">
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Mock Recovery Plan</p>
                  <ul className="space-y-2 mb-3">
                    {latestAttempt ? (
                      getRecoveryPlanItems().map((item, idx) => (
                        <li key={idx} className="text-xs text-indigo-100 flex items-start gap-1.5 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/50 mt-0.5 shrink-0" /> {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-indigo-200/70 flex items-start gap-1.5 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/30 mt-0.5 shrink-0" /> Attempt a mock test to generate a personalized recovery plan.
                      </li>
                    )}
                  </ul>
                  <button 
                    onClick={handleStartRecoveryPlan}
                    className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    {latestAttempt ? "Start Recovery Plan" : "Start Your First Mock"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TARGET READINESS */}
          {(() => {
            const currentReadiness = latestAnalysis?.iiserReadiness?.readinessScore !== undefined && latestAnalysis?.iiserReadiness?.readinessScore !== null
              ? latestAnalysis.iiserReadiness.readinessScore
              : (latestAttempt ? Math.round(latestAttempt.accuracy) : 0);
            const targetReadiness = 85;
            const neededImprovement = Math.max(0, targetReadiness - currentReadiness);
            return (
              <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10">
                <h3 className="text-base font-display font-bold text-white mb-6">Target Readiness</h3>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {latestAttempt ? `${currentReadiness}%` : '—'}
                    </p>
                    <p className="text-xs text-white/50">Current Readiness</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white/80">{targetReadiness}%</p>
                    <p className="text-xs text-white/50">Target Readiness</p>
                  </div>
                </div>
                <div className="relative h-2 w-full bg-white/5 rounded-full mb-3 mt-4 overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500" 
                    style={{ width: `${latestAttempt ? currentReadiness : 0}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-cyan-400 text-right">
                  {latestAttempt 
                    ? (neededImprovement > 0 ? `Needed Improvement: +${neededImprovement}%` : 'Target Achieved!') 
                    : 'Attempt a mock test to evaluate readiness'}
                </p>
              </div>
            );
          })()}

          {/* MISTAKE ANALYSIS */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-rose-500/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-base font-display font-bold text-white">Frequent Mistakes</h3>
            </div>
            <div className="space-y-4">
              {latestAttempt ? (
                getFrequentMistakes().map((item: any, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (item.chapterId && onNavigate) {
                        onNavigate(`/smart-lessons/${item.chapterId}`);
                      }
                    }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors font-sans"
                  >
                    <div>
                      <p className="text-sm font-medium text-white/90 group-hover:text-rose-300 transition-colors">{item.topic}</p>
                      {item.miss > 0 && <p className="text-xs text-rose-400/70">{item.miss} questions missed</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{item.accuracy}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wide">Accuracy</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-white/40 font-sans">Attempt mock tests to analyze frequent mistake topics.</p>
              )}
            </div>
            {latestAttempt && getFrequentMistakes()[0]?.chapterId && (
              <button 
                onClick={() => {
                  const worstChap = getFrequentMistakes()[0];
                  if (worstChap && worstChap.chapterId && onNavigate) {
                    onNavigate(`/smart-lessons/${worstChap.chapterId}`);
                  }
                }}
                className="w-full mt-4 py-2.5 rounded-xl border border-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/10 transition-colors"
              >
                Revise Weakest Chapter
              </button>
            )}
          </div>

          {/* EXAM SIMULATION */}
          <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Simulation Features</h3>
            <ul className="space-y-3">
              {[
                'Real IISER Interface',
                'Question Palette',
                'Mark for Review',
                'Subject Navigation',
                'Instant Analysis'
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />

      {/* START MOCK MODAL - Simple Implementation */}
      <AnimatePresence>
        {isModalOpen && selectedMock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#05060F]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0A0C16] border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 rounded-full transition-colors"
               >
                 <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-cyan-400" />
              </div>
              
              <h2 className="text-2xl font-display font-bold text-white mb-2">{selectedMock.title}</h2>
              <div className="flex gap-4 text-sm text-white/60 mb-6 pb-6 border-b border-white/5">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {selectedMock.questions} Questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedMock.duration} Minutes</span>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-3">Pre-Test Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Stable Internet Connection
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Screen Recommended
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Distractions
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={startTest}
                  className="flex-[2] px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold transition-colors"
                >
                  Confirm & Start Test
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK MOCK CHAPTER SELECTION MODAL */}
      {selectedQuickMockSubject && (
        <QuickMockModal
          subject={selectedQuickMockSubject}
          isPro={isPro}
          onNavigate={onNavigate}
          onClose={() => setSelectedQuickMockSubject(null)}
          onStartMock={(quickMockId, chapterTitle, questions) => {
            setActiveQuickMockId(quickMockId);
            setActiveQuickMockChapterTitle(chapterTitle);
            setActiveQuickMockQuestions(questions);
          }}
        />
      )}
    </div>
  );
}
