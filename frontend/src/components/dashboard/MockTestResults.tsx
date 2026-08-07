import React, { useState, useMemo } from 'react';
import { 
  Clock, BookOpen, RotateCcw, Zap, ArrowRight, AlertCircle, Award, Target, 
  Layers, BarChart2, CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MockTestIndex } from '../../data/mockTests';
import { useMockResultAnalysis } from '../../hooks/useMockResultAnalysis';

interface MockTestResultsProps {
  mockTest: MockTestIndex;
  submissionResult: {
    success: boolean;
    score: number;
    totalQuestions: number;
    accuracy: number;
    correct: number;
    wrong: number;
    skipped: number;
    totalTimeSeconds: number;
    averageTimeSeconds: number;
    mockResultId?: string;
  };
  selectedAnswers: Record<string, number>;
  questionTimes: Record<string, number>;
  onReview: () => void;
  onRetake: () => void;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

// ─── Human Readable Time Formatter ──────────────────────────────────────────
function formatSeconds(sec: number | null | undefined): string {
  if (sec === null || sec === undefined || isNaN(sec) || sec < 0) return '—';
  if (sec === 0) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  if (m === 0) return `${s} sec`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function buildFallbackAnalysisData(
  mockTest: MockTestIndex,
  submissionResult: MockTestResultsProps['submissionResult'],
  selectedAnswers: Record<string, number>,
  questionTimes: Record<string, number>
) {
  const total = submissionResult.totalQuestions || mockTest.data?.questions?.length || 60;
  const correct = submissionResult.correct || 0;
  const wrong = submissionResult.wrong || 0;
  const skipped = submissionResult.skipped || Math.max(0, total - correct - wrong);
  const answered = correct + wrong;
  const score = submissionResult.score ?? (correct * 4 - wrong * 1);
  const accuracy = submissionResult.accuracy ?? (answered > 0 ? Math.round((correct / answered) * 100) : 0);
  const totalTimeSeconds = submissionResult.totalTimeSeconds || 10800;
  const averageAnsweredTimeSeconds = answered > 0 ? Math.round(totalTimeSeconds / answered) : 0;

  const questions = mockTest.data?.questions || [];

  const questionAnalysis = questions.map((q, idx) => {
    const studentAns = selectedAnswers[q.id];
    const isSkipped = studentAns === undefined || studentAns === -1;
    const isCorrect = studentAns === q.correct;
    const status: 'correct' | 'incorrect' | 'skipped' = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'incorrect');

    return {
      questionId: String(q.id),
      questionNumber: idx + 1,
      status,
      subject: q.subject || 'General',
      chapterId: q.chapterId || 'general',
      chapterTitle: q.chapterTitle || q.subject || 'General',
      difficulty: q.difficulty || 'medium',
      timeTakenSeconds: questionTimes[q.id] || averageAnsweredTimeSeconds || 60,
      estimatedTimeSeconds: 120,
      selectedAnswer: studentAns !== undefined ? studentAns : -1,
      correctAnswer: q.correct
    };
  });

  const subjectMap: Record<string, { total: number; answered: number; correct: number; wrong: number; skipped: number; time: number }> = {};
  questions.forEach(q => {
    const subj = q.subject || 'General';
    if (!subjectMap[subj]) {
      subjectMap[subj] = { total: 0, answered: 0, correct: 0, wrong: 0, skipped: 0, time: 0 };
    }
    subjectMap[subj].total++;
    const ans = selectedAnswers[q.id];
    const time = questionTimes[q.id] || 0;
    subjectMap[subj].time += time;
    if (ans !== undefined && ans !== -1) {
      subjectMap[subj].answered++;
      if (ans === q.correct) subjectMap[subj].correct++;
      else subjectMap[subj].wrong++;
    } else {
      subjectMap[subj].skipped++;
    }
  });

  const subjectBreakdown = Object.entries(subjectMap).map(([subject, s]) => ({
    subject,
    totalQuestions: s.total,
    answeredQuestions: s.answered,
    correct: s.correct,
    wrong: s.wrong,
    skipped: s.skipped,
    accuracy: s.answered > 0 ? Math.round((s.correct / s.answered) * 100) : 0,
    coverage: s.total > 0 ? Math.round((s.answered / s.total) * 100) : 0,
    evidenceState: s.answered >= 5 ? 'SUFFICIENT' : 'LIMITED'
  }));

  const diffMap: Record<string, { total: number; answered: number; correct: number; wrong: number; time: number }> = {
    easy: { total: 0, answered: 0, correct: 0, wrong: 0, time: 0 },
    medium: { total: 0, answered: 0, correct: 0, wrong: 0, time: 0 },
    hard: { total: 0, answered: 0, correct: 0, wrong: 0, time: 0 }
  };
  questions.forEach(q => {
    const diff = (q.difficulty || 'medium').toLowerCase();
    if (!diffMap[diff]) diffMap[diff] = { total: 0, answered: 0, correct: 0, wrong: 0, time: 0 };
    diffMap[diff].total++;
    const ans = selectedAnswers[q.id];
    const time = questionTimes[q.id] || 0;
    diffMap[diff].time += time;
    if (ans !== undefined && ans !== -1) {
      diffMap[diff].answered++;
      if (ans === q.correct) diffMap[diff].correct++;
      else diffMap[diff].wrong++;
    }
  });

  const difficultyBreakdown = Object.entries(diffMap).map(([difficulty, d]) => ({
    difficulty,
    totalQuestions: d.total,
    answeredQuestions: d.answered,
    correct: d.correct,
    wrong: d.wrong,
    accuracy: d.answered > 0 ? Math.round((d.correct / d.answered) * 100) : 0,
    timeTakenSeconds: d.time
  }));

  const chapterMap: Record<string, { chapterId: string; chapterTitle: string; subject: string; answered: number; correct: number; wrong: number }> = {};
  questions.forEach(q => {
    const cid = q.chapterId || 'general';
    const ctitle = q.chapterTitle || q.subject || 'General';
    const subj = q.subject || 'General';
    if (!chapterMap[cid]) {
      chapterMap[cid] = { chapterId: cid, chapterTitle: ctitle, subject: subj, answered: 0, correct: 0, wrong: 0 };
    }
    const ans = selectedAnswers[q.id];
    if (ans !== undefined && ans !== -1) {
      chapterMap[cid].answered++;
      if (ans === q.correct) chapterMap[cid].correct++;
      else chapterMap[cid].wrong++;
    }
  });

  const chapterBreakdown = Object.values(chapterMap).map(c => ({
    chapterId: c.chapterId,
    chapterTitle: c.chapterTitle,
    subject: c.subject,
    answeredQuestions: c.answered,
    correct: c.correct,
    wrong: c.wrong,
    accuracy: c.answered > 0 ? Math.round((c.correct / c.answered) * 100) : 0,
    status: (c.answered > 0 && Math.round((c.correct / c.answered) * 100) >= 70 ? 'STRONG' : 'DEVELOPING') as any
  }));

  return {
    success: true,
    hasData: true,
    result: {
      resultId: submissionResult.mockResultId || mockTest.id,
      mockId: mockTest.id,
      mockTitle: mockTest.title,
      completedAt: new Date().toISOString()
    },
    summary: {
      totalQuestions: total,
      answeredQuestions: answered,
      correct,
      wrong,
      skipped,
      score,
      accuracy,
      coverage: total > 0 ? Math.round((answered / total) * 100) : 0,
      totalTimeSeconds,
      averageAnsweredTimeSeconds
    },
    evidence: {
      state: (answered >= 10 ? 'SUFFICIENT' : 'LIMITED') as any,
      answeredQuestions: answered,
      requiredForReliableEvaluation: 10,
      message: 'Attempt evidence generated locally.'
    },
    performance: {
      status: accuracy >= 70 ? 'HIGH' : 'MODERATE',
      title: accuracy >= 70 ? 'Strong Concept Accuracy' : 'Baseline Evaluation',
      message: 'Your responses have been processed into full diagnostic breakdowns.'
    },
    recommendedAction: {
      actionType: 'CONTINUE_MOCK_PRACTICE' as any,
      title: 'Review Missed Questions',
      description: 'Check step-by-step solutions to strengthen accuracy on weak topics.',
      ctaText: 'Explore Solutions'
    },
    insights: [
      { category: 'ACCURACY', type: (accuracy >= 70 ? 'success' : 'info') as any, text: `Scored ${score} marks with ${accuracy}% overall accuracy.` }
    ],
    subjectBreakdown,
    difficultyBreakdown,
    chapterBreakdown,
    timeAnalysis: {
      totalTimeSeconds,
      averageAnsweredTimeSeconds,
      medianAnsweredTime: averageAnsweredTimeSeconds,
      p75AnsweredTime: averageAnsweredTimeSeconds * 1.25,
      p90AnsweredTime: averageAnsweredTimeSeconds * 1.5,
      fastestAnsweredTimeSeconds: 15,
      slowestAnsweredTimeSeconds: 300,
      outlierThreshold: 180,
      outlierQuestionCount: 0,
      timeBySubject: {},
      timeByDifficulty: {},
      paceChartPoints: questionAnalysis.map(q => ({
        questionNumber: q.questionNumber,
        answered: q.status !== 'skipped',
        correct: q.status === 'correct',
        timeTaken: q.timeTakenSeconds
      }))
    },
    questionAnalysis,
    mistakeAnalysis: {
      totalWrongCount: wrong,
      summaries: wrong > 0 ? [`${wrong} questions were answered incorrectly. Review solutions below.`] : []
    },
    historicalComparison: {
      hasComparison: false,
      currentMock: { score, accuracy, coverage: Math.round((answered / total) * 100), totalTimeSeconds },
      previousMock: null,
      personalBest: null,
      rollingAverage: null,
      trend: 'insufficient_history' as any
    },
    prepReadiness: accuracy >= 75 ? 'Ready' : 'Developing',
    iiserReadiness: {
      readinessLevel: accuracy >= 75 ? 'TARGET_BENCHMARK_REACHED' : 'DEVELOPING_FOUNDATION',
      readinessScore: accuracy,
      confidence: (answered >= 20 ? 'STRONG' : 'MODERATE') as any,
      factors: [
        { factor: 'SCORE' as any, status: (score >= 100 ? 'STRONG' : 'DEVELOPING') as any, message: `Current score is ${score} marks.` },
        { factor: 'ACCURACY' as any, status: (accuracy >= 70 ? 'STRONG' : 'DEVELOPING') as any, message: `${accuracy}% response accuracy.` },
        { factor: 'PACE' as any, status: 'STRONG' as any, message: `Averaging ${averageAnsweredTimeSeconds}s per question.` }
      ],
      summary: `Baseline evaluation completed with ${accuracy}% accuracy across ${answered} questions.`,
      nextMilestone: 'Attempt next full-length mock to build higher confidence.'
    },
    dynamicSummary: `Scored ${score} / ${total * 4} marks (${accuracy}% accuracy) across ${answered} attempted questions.`
  };
}

export function MockTestResults({
  mockTest,
  submissionResult,
  selectedAnswers,
  questionTimes,
  onReview,
  onRetake,
  onClose,
  onNavigate,
}: MockTestResultsProps) {
  
  const resultId = submissionResult.mockResultId || '';
  const { data: serverData, loading } = useMockResultAnalysis(resultId);

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'pace' | 'solutions' | 'progress'>('overview');

  // Chapter list toggling
  const [showAllChapters, setShowAllChapters] = useState(false);

  // Solutions Filters state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [solutionsSort, setSolutionsSort] = useState<string>('order');

  // Compute fallback data if server data is unavailable
  const fallbackData = useMemo(() => {
    return buildFallbackAnalysisData(mockTest, submissionResult, selectedAnswers, questionTimes);
  }, [mockTest, submissionResult, selectedAnswers, questionTimes]);

  const data = serverData || fallbackData;

  // ─── Loading Skeleton Screen ───────────────────────────────────────────────
  if (loading && !serverData) {
    return (
      <div className="max-w-4xl mx-auto w-full space-y-6 flex-1 mt-4 pb-32 animate-pulse">
        {/* Hero Banner Skeleton */}
        <div className="h-44 rounded-3xl bg-white/5 border border-white/5 p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-32 h-4 bg-white/10 rounded" />
            <div className="w-64 h-8 bg-white/10 rounded" />
          </div>
          <div className="flex gap-4">
            <div className="w-24 h-12 bg-white/10 rounded" />
            <div className="w-24 h-12 bg-white/10 rounded" />
          </div>
        </div>
        {/* Tabs Skeleton */}
        <div className="flex gap-2 h-10 border-b border-white/5">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-24 h-full bg-white/5 rounded-t" />
          ))}
        </div>
        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-48 bg-white/5 border border-white/5 rounded-3xl" />
          <div className="h-48 bg-white/5 border border-white/5 rounded-3xl" />
        </div>
      </div>
    );
  }

  const {
    summary,
    evidence,
    performance,
    recommendedAction,
    insights,
    subjectBreakdown,
    difficultyBreakdown,
    chapterBreakdown,
    timeAnalysis,
    mistakeAnalysis,
    historicalComparison,
    prepReadiness
  } = data;

  // ─── Tab Selection Configuration ───────────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'pace', label: 'Pace Analysis' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'progress', label: 'Progress', disabled: !historicalComparison.hasComparison }
  ] as const;

  // ─── Filter Solutions list dynamically ──────────────────────────────────────
  const dynamicRecognizedChapters = Array.from(new Set(mockTest.data.questions.map(q => q.chapterId).filter(Boolean)));
  
  const filteredQuestions = mockTest.data.questions.filter(q => {
    // Match selection/attempt status
    const att = data.questionAnalysis.find(a => a.questionId === String(q.id));
    const attStatus = att ? att.status : 'skipped';

    if (statusFilter !== 'all' && attStatus !== statusFilter) return false;
    if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
    if (difficultyFilter !== 'all' && q.difficulty.toLowerCase() !== difficultyFilter) return false;
    if (chapterFilter !== 'all' && q.chapterId !== chapterFilter) return false;
    return true;
  });

  // Sort Solutions list
  if (solutionsSort === 'slowest') {
    filteredQuestions.sort((a, b) => (questionTimes[a.id] || 0) - (questionTimes[b.id] || 0));
  } else if (solutionsSort === 'fastest') {
    filteredQuestions.sort((a, b) => (questionTimes[b.id] || 0) - (questionTimes[a.id] || 0));
  } else {
    // default order
    filteredQuestions.sort((a, b) => Number(a.id) - Number(b.id));
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-32 animate-in fade-in zoom-in-95 duration-300">
      
      {/* ─── V2 HERO HERO SUMMARY CARD ──────────────────────────────────────── */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0A0C16] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="space-y-3 relative z-10 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Submission Successful
            </span>
            <span className="text-xs text-white/40">
              Completed on {new Date(data.result.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-xs text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-full bg-cyan-500/5">
              {summary.answeredQuestions} / {summary.totalQuestions} attempted
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-black text-white">{data.result.mockTitle}</h2>
          <p className="text-sm text-white/70 font-sans max-w-xl leading-relaxed">
            {data.dynamicSummary || "Readiness evaluated under baseline standards. Scroll to explore performance trends."}
          </p>
        </div>
        
        {/* Core summary metrics grid */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto relative z-10 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center min-w-[90px]">
            <span className="text-xl font-bold text-white mb-0.5">{summary.score} / {summary.totalQuestions}</span>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Score</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center min-w-[90px] relative group cursor-help">
            <span className={cn("text-xl font-bold mb-0.5", summary.accuracy !== null && summary.accuracy >= 70 ? "text-emerald-400" : "text-amber-400")}>
              {summary.accuracy === null ? '—' : `${summary.accuracy.toFixed(1)}%`}
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Accuracy</span>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-black border border-white/10 text-[9px] text-white/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-55 shadow-xl leading-normal text-center">
              Correct answers among questions attempted.
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center min-w-[90px] relative group cursor-help">
            <span className="text-xl font-bold text-white mb-0.5">{summary.coverage.toFixed(1)}%</span>
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Coverage</span>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-black border border-white/10 text-[9px] text-white/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-55 shadow-xl leading-normal text-center">
              Percentage of the mock test you attempted.
            </div>
          </div>
        </div>
      </div>

      {/* ─── NAVIGATION TABS ────────────────────────────────────────────────── */}
      <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            disabled={(tab as any).disabled}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-5 py-2.5 font-display font-bold text-xs uppercase tracking-wider transition-all border-b-2 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed",
              activeTab === tab.id 
                ? "border-cyan-500 text-cyan-400" 
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT: OVERVIEW ─────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Performance Evaluation Card */}
            <div className={cn("md:col-span-2 p-6 rounded-3xl border flex flex-col justify-between gap-4", 
              evidence.state === 'NONE' ? 'text-white/40 border-white/10 bg-white/5' :
              evidence.state === 'LIMITED' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
              summary.accuracy >= 75 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-sky-400 border-sky-500/20 bg-sky-500/5'
            )}>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-1">Performance Evaluation</p>
                <h3 className="text-3xl font-display font-black mb-3">{performance.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed font-sans">{performance.message}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40">Evidence Quality</span>
                <span className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                  evidence.state === 'SUFFICIENT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                )}>{evidence.state}</span>
              </div>
            </div>

            {/* 2. Next Best Action Recommendation Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 flex flex-col justify-between gap-4 relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-24 h-24 bg-indigo-500/10 blur-xl rounded-full" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">Next Recommended Action</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">{recommendedAction.title}</h4>
                <p className="text-xs text-white/40 font-sans leading-relaxed">{recommendedAction.description}</p>
                
                {recommendedAction.actionType === 'REVISE_CHAPTER' && (
                  <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] text-white/60 space-y-1 font-sans">
                    <div className="flex justify-between"><span>Subject</span><span className="text-white font-medium">{recommendedAction.subject}</span></div>
                    <div className="flex justify-between"><span>Accuracy</span><span className="text-cyan-400 font-medium">{recommendedAction.accuracy}%</span></div>
                    <div className="flex justify-between"><span>Questions</span><span className="text-white font-medium">{recommendedAction.answeredQuestions} answered</span></div>
                  </div>
                )}
              </div>

              {recommendedAction.actionType === 'REVISE_CHAPTER' ? (
                <button
                  onClick={() => onNavigate?.(`/smart-lessons/${recommendedAction.chapterId}`)}
                  className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                  Start Revision <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onRetake}
                  className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                  {recommendedAction.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* IISER Readiness Card */}
          {data.iiserReadiness && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#0A0C16] border border-cyan-500/20 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute right-0 top-0 -translate-y-8 translate-x-8 w-44 h-44 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400">IISER Aptitude Test Readiness</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white">
                    {data.iiserReadiness.readinessLevel.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-sm text-white/70 font-sans leading-relaxed max-w-xl">
                    {data.iiserReadiness.summary}
                  </p>
                </div>

                {data.iiserReadiness.readinessScore !== null && (
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5">
                      <div className="absolute inset-0.5 rounded-[14px] bg-[#0A0C16] flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-mono font-black text-white">{data.iiserReadiness.readinessScore}</span>
                        <span className="text-[7px] uppercase font-bold tracking-wider text-white/40">Readiness Score</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Confidence:</span>
                        <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded",
                          data.iiserReadiness.confidence === 'STRONG' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          data.iiserReadiness.confidence === 'MODERATE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        )}>
                          {data.iiserReadiness.confidence}
                        </span>
                      </div>
                      <div className="text-[9px] text-white/40 font-sans">Based on {summary.answeredQuestions} attempted questions.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Factors grid */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-white/40">Readiness Factors Evaluation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.iiserReadiness.factors.map((factorObj: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between gap-2.5 hover:bg-white/[0.08] transition-all">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold text-white/60 tracking-wide uppercase">{factorObj.factor.replace(/_/g, ' ')}</span>
                        <span className={cn("text-[8px] font-bold uppercase px-1.5 py-0.5 rounded font-mono",
                          factorObj.status === 'STRONG' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' :
                          factorObj.status === 'DEVELOPING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10' :
                          factorObj.status === 'WEAK' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10' :
                          'bg-white/5 text-white/40 border border-white/5'
                        )}>
                          {factorObj.status}
                        </span>
                      </div>
                      <p className="text-xs text-white/80 leading-normal font-sans">{factorObj.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next milestone block */}
              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-black tracking-widest text-cyan-400">Target Next Milestone</span>
                  <p className="text-xs text-cyan-300 font-sans leading-relaxed">{data.iiserReadiness.nextMilestone}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Active Goal</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Key Insights (max 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "p-4 rounded-2xl border flex items-center gap-3",
                  insight.type === 'success' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                  insight.type === 'warning' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                  'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                )}
              >
                <span className="text-lg font-bold shrink-0">{insight.type === 'success' ? '✓' : insight.type === 'warning' ? '⚠' : 'ℹ'}</span>
                <span className="text-xs font-sans leading-relaxed text-white/80">{insight.text}</span>
              </div>
            ))}
          </div>

          {/* 4. Score & Attempt Analysis */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Score & Attempt Distribution</h3>
            
            {/* Custom segmented bar */}
            <div className="h-6 w-full rounded-full bg-white/5 flex overflow-hidden border border-white/10">
              <div 
                className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                style={{ width: `${(summary.correct / summary.totalQuestions) * 100}%` }}
              />
              <div 
                className="h-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                style={{ width: `${(summary.wrong / summary.totalQuestions) * 100}%` }}
              />
              <div 
                className="h-full bg-white/15" 
                style={{ width: `${(summary.skipped / summary.totalQuestions) * 100}%` }}
              />
            </div>

            {/* Segmented bar labels */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-lg font-bold text-emerald-400 block mb-0.5">{summary.correct}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-500/55">Correct</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <span className="text-lg font-bold text-rose-400 block mb-0.5">{summary.wrong}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-rose-500/55">Incorrect</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-lg font-bold text-white/60 block mb-0.5">{summary.skipped}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Skipped</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: PERFORMANCE ──────────────────────────────────────── */}
      {activeTab === 'performance' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Subject Performance & Difficulty Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Subject Performance list */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Subject Performance</h3>
              <div className="space-y-4">
                {subjectBreakdown.map((stat, idx) => {
                  const bw = stat.accuracy === null ? 0 : Math.min(100, Math.max(0, stat.accuracy));
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white/80">{stat.subject}</span>
                          <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white/40">
                            {stat.evidenceState}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <span className="text-white/40">{stat.correct} correct · {stat.wrong} wrong</span>
                          <span className={cn("font-bold", stat.accuracy === null ? "text-white/30" : "text-cyan-400")}>
                            {stat.accuracy === null ? '—' : `${stat.accuracy.toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            stat.accuracy === null ? "bg-transparent" :
                            stat.accuracy >= 75 ? "bg-emerald-500" :
                            stat.accuracy >= 50 ? "bg-amber-500" : "bg-rose-500"
                          )}
                          style={{ width: `${bw}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Breakdown list */}
            <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Difficulty Performance</h3>
              <div className="space-y-4">
                {difficultyBreakdown.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <span className="text-xs font-bold text-white/80 block">{stat.difficulty}</span>
                      <span className="text-[10px] text-white/40 font-sans">{stat.correct} correct · {stat.wrong} wrong · {stat.skipped} skipped</span>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-sm font-mono font-bold block",
                        stat.accuracy === null ? "text-white/30" :
                        stat.accuracy >= 75 ? "text-emerald-400" :
                        stat.accuracy >= 50 ? "text-amber-400" : "text-rose-400"
                      )}>
                        {stat.accuracy === null ? '—' : `${stat.accuracy.toFixed(1)}%`}
                      </span>
                      <span className="text-[8px] uppercase tracking-wider text-white/30 font-bold">Accuracy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter Performance List */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Chapter Performance</h3>
              <span className="text-[10px] text-white/45 font-sans">
                Showing {showAllChapters ? chapterBreakdown.length : Math.min(5, chapterBreakdown.length)} chapters
              </span>
            </div>
            
            <div className="space-y-3">
              {(showAllChapters ? chapterBreakdown : chapterBreakdown.slice(0, 5)).map((c, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white/80">{c.chapterTitle}</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded font-mono uppercase bg-white/5 text-white/40">{c.subject}</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-sans block mt-1">
                      {c.answeredQuestions} attempted · {c.correct} correct · {c.wrong} incorrect
                    </span>
                  </div>
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className={cn(
                        "text-sm font-mono font-bold block",
                        c.status === 'INSUFFICIENT_EVIDENCE' ? 'text-white/30' :
                        c.accuracy >= 85 ? 'text-emerald-400' :
                        c.accuracy >= 70 ? 'text-cyan-400' :
                        c.accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'
                      )}>
                        {c.status === 'INSUFFICIENT_EVIDENCE' ? '—' : `${c.accuracy.toFixed(1)}%`}
                      </span>
                      <span className={cn("text-[8px] font-bold uppercase tracking-wider",
                        c.status === 'HIGH_PRIORITY' ? 'text-rose-400' :
                        c.status === 'NEEDS_REVIEW' ? 'text-amber-400' :
                        c.status === 'DEVELOPING' ? 'text-sky-400' :
                        c.status === 'STRONG' ? 'text-emerald-400' : 'text-white/30'
                      )}>{c.status.replace('_', ' ')}</span>
                    </div>

                    {c.status !== 'INSUFFICIENT_EVIDENCE' && c.status !== 'STRONG' && (
                      <button
                        onClick={() => onNavigate?.(`/smart-lessons/${c.chapterId}`)}
                        className="py-1.5 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        Revise
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {chapterBreakdown.length > 5 && (
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-white/5"
              >
                {showAllChapters ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>View All {chapterBreakdown.length} Chapters <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>

          {/* Mistake Analysis (Wrong Answers Only) */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Mistake Analysis</h3>
            {mistakeAnalysis.totalWrongCount === 0 ? (
              <p className="text-xs text-white/40 leading-relaxed font-sans">
                Complete questions to begin identifying mistake patterns. No incorrect answers recorded.
              </p>
            ) : (
              <div className="space-y-2">
                {mistakeAnalysis.summaries.map((sm, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <p className="text-xs text-rose-300 leading-relaxed font-sans">{sm}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: PACE ANALYSIS ────────────────────────────────────── */}
      {activeTab === 'pace' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Pace Summary Metrics Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-white block mb-0.5">{formatSeconds(timeAnalysis.totalTimeSeconds)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Total Time</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-white block mb-0.5">{formatSeconds(timeAnalysis.averageAnsweredTimeSeconds)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Avg Answered Time</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-emerald-400 block mb-0.5">{formatSeconds(timeAnalysis.fastestAnsweredTimeSeconds)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400/60">Fastest Answering</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-rose-400 block mb-0.5">{formatSeconds(timeAnalysis.slowestAnsweredTimeSeconds)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-rose-400/60">Slowest Answering</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-white block mb-0.5">{formatSeconds(timeAnalysis.medianAnsweredTime)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">Median Answered</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-white block mb-0.5">{formatSeconds(timeAnalysis.p75AnsweredTime)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">75th Percentile</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-lg font-mono font-bold text-white block mb-0.5">{formatSeconds(timeAnalysis.p90AnsweredTime)}</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40">90th Percentile</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center relative group cursor-help">
                <span className={cn("text-lg font-mono font-bold block mb-0.5", timeAnalysis.outlierQuestionCount > 0 ? "text-amber-400" : "text-white")}>
                  {timeAnalysis.outlierQuestionCount}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 block">Slow Outliers</span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-black border border-white/10 text-[9px] text-white/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-55 shadow-xl leading-normal text-center">
                  Questions taking longer than outlier threshold ({formatSeconds(timeAnalysis.outlierThreshold)}).
                </div>
              </div>
            </div>
          </div>

          {/* SVG Pace Chart */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Questions Pace Timeline</h3>
            
            <div className="relative w-full overflow-x-auto py-2">
              <svg viewBox="0 0 620 180" className="w-full min-w-[580px] h-40">
                {/* Axes */}
                <line x1="20" y1="150" x2="600" y2="150" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" />
                <line x1="20" y1="20" x2="20" y2="150" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" />
                
                {/* Horizontal Guide lines */}
                <line x1="20" y1="85" x2="600" y2="85" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="30" x2="600" y2="30" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 3" />

                {/* Guide labels */}
                <text x="2" y="34" fill="#ffffff" fillOpacity="0.2" fontSize="8">2m</text>
                <text x="2" y="89" fill="#ffffff" fillOpacity="0.2" fontSize="8">1m</text>

                {/* Plot points */}
                {timeAnalysis.paceChartPoints.map((pt, idx) => {
                  const x = 20 + (idx * 9.5);
                  // Normalize Y axis: Max 180 seconds mapped to y=20 (so max 3 minutes max)
                  const cappedTime = Math.min(180, pt.timeTaken);
                  const y = 150 - ((cappedTime / 180) * 130);
                  
                  return (
                    <g key={idx} className="group cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r={pt.timeTaken > 0 ? (pt.timeTaken >= 90 ? "4" : "3") : "1"}
                        className={cn(
                          "transition-all",
                          !pt.answered ? "fill-white/10" :
                          pt.correct ? "fill-emerald-500 group-hover:fill-emerald-400 group-hover:r-5" :
                          "fill-rose-500 group-hover:fill-rose-400 group-hover:r-5"
                        )}
                      />
                      <title>
                        {`Q${pt.questionNumber}: ${pt.answered ? formatSeconds(pt.timeTaken) : 'Skipped'} (${pt.correct ? 'Correct' : 'Incorrect'})`}
                      </title>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* Timeline Legend */}
            <div className="flex flex-wrap gap-4 justify-center text-[10px] font-sans text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct response</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Incorrect response</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/10" /> Skipped / Not Attempted</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: SOLUTIONS / QUESTIONS REVIEW ──────────────────────── */}
      {activeTab === 'solutions' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Solutions Filtering bar */}
          <div className="p-4 rounded-3xl bg-[#0A0C16] border border-white/5 flex flex-wrap gap-3.5 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider font-bold text-white/30 block">Status</label>
                <select 
                  value={statusFilter} 
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0A0C16]">All Status</option>
                  <option value="correct" className="bg-[#0A0C16]">Correct</option>
                  <option value="incorrect" className="bg-[#0A0C16]">Incorrect</option>
                  <option value="skipped" className="bg-[#0A0C16]">Skipped</option>
                </select>
              </div>

              {/* Subject Filter */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider font-bold text-white/30 block">Subject</label>
                <select 
                  value={subjectFilter} 
                  onChange={e => setSubjectFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0A0C16]">All Subjects</option>
                  <option value="Physics" className="bg-[#0A0C16]">Physics</option>
                  <option value="Chemistry" className="bg-[#0A0C16]">Chemistry</option>
                  <option value="Mathematics" className="bg-[#0A0C16]">Mathematics</option>
                  <option value="Biology" className="bg-[#0A0C16]">Biology</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider font-bold text-white/30 block">Difficulty</label>
                <select 
                  value={difficultyFilter} 
                  onChange={e => setDifficultyFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0A0C16]">All Difficulties</option>
                  <option value="easy" className="bg-[#0A0C16]">Easy</option>
                  <option value="medium" className="bg-[#0A0C16]">Medium</option>
                  <option value="hard" className="bg-[#0A0C16]">Hard</option>
                </select>
              </div>

              {/* Chapter Filter */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider font-bold text-white/30 block">Chapter</label>
                <select 
                  value={chapterFilter} 
                  onChange={e => setChapterFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0A0C16]">All Chapters</option>
                  {dynamicRecognizedChapters.map(chId => (
                    <option key={chId} value={chId} className="bg-[#0A0C16]">{chId}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider font-bold text-white/30 block">Sort By</label>
              <select 
                value={solutionsSort} 
                onChange={e => setSolutionsSort(e.target.value)}
                className="bg-white/5 border border-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
              >
                <option value="order" className="bg-[#0A0C16]">Question Order</option>
                <option value="slowest" className="bg-[#0A0C16]">Slowest First</option>
                <option value="fastest" className="bg-[#0A0C16]">Fastest First</option>
              </select>
            </div>
          </div>

          {/* Solutions question list */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <p className="text-center py-12 text-xs text-white/40 font-sans">
                No questions match your current filter settings.
              </p>
            ) : (
              filteredQuestions.map((q, idx) => {
                const att = data.questionAnalysis.find(a => a.questionId === String(q.id));
                const status = att ? att.status : 'skipped';
                const timeSpent = questionTimes[q.id] || 0;
                
                return (
                  <div key={q.id} className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
                    
                    {/* Card Header metadata */}
                    <div className="flex justify-between items-start gap-4 flex-wrap pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-mono font-black text-xs text-white">
                          #{idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white">{q.subject}</span>
                            <span className="text-[9px] uppercase tracking-wider font-bold text-white/30">
                              {q.difficulty}
                            </span>
                          </div>
                          {q.chapterId && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 block mt-1">
                              Chapter: {q.chapterId}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-bold text-white block">
                            {formatSeconds(timeSpent)}
                          </span>
                          <span className="text-[8px] uppercase tracking-wider font-bold text-white/30">Time Taken</span>
                        </div>
                        {status === 'correct' ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : status === 'incorrect' ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/20 text-rose-400">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-white/40">
                            <HelpCircle className="w-3.5 h-3.5" /> Skipped
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <div 
                      className="text-sm text-white/90 leading-relaxed font-sans"
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />

                    {/* Options list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectOption = oIdx === q.correct;
                        const isSelectedOption = selectedAnswers[q.id] === oIdx;

                        return (
                          <div
                            key={oIdx}
                            className={cn(
                              "p-3 rounded-xl border text-xs leading-relaxed transition-all font-sans flex items-start gap-2",
                              isCorrectOption 
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium"
                                : isSelectedOption
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                : "bg-white/5 border-white/5 text-white/70"
                            )}
                          >
                            <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Explanation</span>
                      <p 
                        className="text-xs text-white/60 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: q.explanation || "Explanation unavailable." }}
                      />
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: PROGRESS / HISTORICAL COMPARISON ─────────────────── */}
      {activeTab === 'progress' && historicalComparison.hasComparison && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Comparison Metrics Grid */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Attempt Progress Comparison</h3>
              <span className={cn("px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                historicalComparison.trend === 'improving' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                historicalComparison.trend === 'declining' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' :
                'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
              )}>
                Trajectory: {historicalComparison.trend}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/70 font-sans min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5 text-white/40 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Metric</th>
                    <th className="pb-3">Current Mock</th>
                    <th className="pb-3">Previous Attempt</th>
                    <th className="pb-3">Personal Best</th>
                    <th className="pb-3">Rolling Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="h-10">
                    <td className="font-bold text-white/90">Score</td>
                    <td className="font-mono text-white font-bold">{historicalComparison.currentMock.score}</td>
                    <td className="font-mono">{historicalComparison.previousMock?.score ?? '—'}</td>
                    <td className="font-mono text-emerald-400 font-bold">{historicalComparison.personalBest?.score ?? '—'}</td>
                    <td className="font-mono">{historicalComparison.rollingAverage?.score ?? '—'}</td>
                  </tr>
                  <tr className="h-10">
                    <td className="font-bold text-white/90">Accuracy</td>
                    <td className="font-mono text-cyan-400 font-bold">{historicalComparison.currentMock.accuracy !== null ? `${historicalComparison.currentMock.accuracy.toFixed(1)}%` : '—'}</td>
                    <td className="font-mono">{historicalComparison.previousMock?.accuracy !== null && historicalComparison.previousMock?.accuracy !== undefined ? `${historicalComparison.previousMock.accuracy.toFixed(1)}%` : '—'}</td>
                    <td className="font-mono font-bold text-emerald-400">{historicalComparison.personalBest?.accuracy !== null && historicalComparison.personalBest?.accuracy !== undefined ? `${historicalComparison.personalBest.accuracy.toFixed(1)}%` : '—'}</td>
                    <td className="font-mono">{historicalComparison.rollingAverage?.accuracy !== null && historicalComparison.rollingAverage?.accuracy !== undefined ? `${historicalComparison.rollingAverage.accuracy.toFixed(1)}%` : '—'}</td>
                  </tr>
                  <tr className="h-10">
                    <td className="font-bold text-white/90">Coverage</td>
                    <td className="font-mono text-white">{historicalComparison.currentMock.coverage.toFixed(1)}%</td>
                    <td className="font-mono">{historicalComparison.previousMock?.coverage !== null && historicalComparison.previousMock?.coverage !== undefined ? `${historicalComparison.previousMock.coverage.toFixed(1)}%` : '—'}</td>
                    <td className="font-mono">{historicalComparison.personalBest?.coverage !== null && historicalComparison.personalBest?.coverage !== undefined ? `${historicalComparison.personalBest.coverage.toFixed(1)}%` : '—'}</td>
                    <td className="font-mono">{historicalComparison.rollingAverage?.coverage !== null && historicalComparison.rollingAverage?.coverage !== undefined ? `${historicalComparison.rollingAverage.coverage.toFixed(1)}%` : '—'}</td>
                  </tr>
                  <tr className="h-10">
                    <td className="font-bold text-white/90">Duration</td>
                    <td className="font-mono text-white">{formatSeconds(historicalComparison.currentMock.totalTimeSeconds)}</td>
                    <td className="font-mono">{historicalComparison.previousMock ? formatSeconds(historicalComparison.previousMock.totalTimeSeconds) : '—'}</td>
                    <td className="font-mono">{historicalComparison.personalBest ? formatSeconds(historicalComparison.personalBest.totalTimeSeconds) : '—'}</td>
                    <td className="font-mono">{historicalComparison.rollingAverage ? formatSeconds(historicalComparison.rollingAverage.totalTimeSeconds) : '—'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── BOTTOM ACTIONS FOR RESULTS HUB ─────────────────────────────────── */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onReview}
          className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2 text-sm"
        >
          <BookOpen className="w-4 h-4" /> Review Mock
        </button>
        <button
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#0A0C16] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Retake Mock
        </button>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          Back to Mock Center
        </button>
      </div>

    </div>
  );
}
