import { useState, useEffect, useCallback } from 'react';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export interface MockResultAnalysisData {
  success: boolean;
  hasData: boolean;
  result: {
    resultId: string;
    mockId: string;
    mockTitle: string;
    completedAt: string;
  };
  summary: {
    totalQuestions: number;
    answeredQuestions: number;
    correct: number;
    wrong: number;
    skipped: number;
    score: number;
    accuracy: number | null;
    coverage: number | null;
    totalTimeSeconds: number;
    averageAnsweredTimeSeconds: number;
  };
  evidence: {
    state: 'NONE' | 'LIMITED' | 'SUFFICIENT';
    answeredQuestions: number;
    requiredForReliableEvaluation: number;
    message: string;
  };
  performance: {
    status: string;
    title: string;
    message: string;
  };
  recommendedAction: {
    actionType: 'RETAKE_MOCK' | 'BUILD_MORE_EVIDENCE' | 'REVISE_CHAPTER' | 'TAKE_NEXT_MOCK' | 'CONTINUE_MOCK_PRACTICE';
    title: string;
    description: string;
    ctaText: string;
    chapterId?: string | null;
    chapterTitle?: string | null;
    subject?: string | null;
    accuracy?: number | null;
    answeredQuestions?: number | null;
    estimatedRevision?: number | null;
    selectionReasonCode?: string;
    selectionExplanation?: string;
  };
  insights: Array<{
    category: string;
    type: 'success' | 'warning' | 'info';
    text: string;
  }>;
  subjectBreakdown: Array<{
    subject: string;
    totalQuestions: number;
    answeredQuestions: number;
    correct: number;
    wrong: number;
    skipped: number;
    accuracy: number | null;
    coverage: number;
    evidenceState: string;
  }>;
  difficultyBreakdown: Array<{
    difficulty: string;
    totalQuestions: number;
    answeredQuestions: number;
    correct: number;
    wrong: number;
    skipped: number;
    accuracy: number | null;
    coverage: number;
  }>;
  chapterBreakdown: Array<{
    chapterId: string;
    chapterTitle: string;
    subject: string;
    answeredQuestions: number;
    correct: number;
    wrong: number;
    accuracy: number;
    status: 'INSUFFICIENT_EVIDENCE' | 'HIGH_PRIORITY' | 'NEEDS_REVIEW' | 'DEVELOPING' | 'STRONG';
  }>;
  timeAnalysis: {
    totalTimeSeconds: number;
    averageAnsweredTimeSeconds: number;
    medianAnsweredTime: number | null;
    p75AnsweredTime: number | null;
    p90AnsweredTime: number | null;
    fastestAnsweredTimeSeconds: number | null;
    slowestAnsweredTimeSeconds: number | null;
    outlierThreshold: number | null;
    outlierQuestionCount: number;
    timeBySubject: Record<string, number>;
    timeByDifficulty: Record<string, number>;
    paceChartPoints: Array<{
      questionNumber: number;
      answered: boolean;
      correct: boolean;
      timeTaken: number;
    }>;
  };
  questionAnalysis: Array<{
    questionId: string;
    questionNumber: number;
    status: 'correct' | 'incorrect' | 'skipped';
    subject: string;
    chapterId: string;
    chapterTitle: string;
    difficulty: string;
    timeTakenSeconds: number;
    estimatedTimeSeconds: number;
    selectedAnswer: number;
    correctAnswer: number;
  }>;
  mistakeAnalysis: {
    totalWrongCount: number;
    summaries: string[];
  };
  historicalComparison: {
    hasComparison: boolean;
    currentMock: {
      score: number;
      accuracy: number | null;
      coverage: number;
      totalTimeSeconds: number;
    };
    previousMock: {
      score: number;
      accuracy: number | null;
      coverage: number;
      totalTimeSeconds: number;
    } | null;
    personalBest: {
      score: number;
      accuracy: number | null;
      coverage: number;
      totalTimeSeconds: number;
    } | null;
    rollingAverage: {
      score: number;
      accuracy: number | null;
      coverage: number;
      totalTimeSeconds: number;
    } | null;
    trend: 'improving' | 'declining' | 'stable' | 'insufficient_history';
  };
  prepReadiness: string;
  iiserReadiness?: {
    readinessLevel: string;
    readinessScore: number | null;
    confidence: 'NONE' | 'LIMITED' | 'MODERATE' | 'STRONG';
    factors: Array<{
      factor: 'SCORE' | 'ACCURACY' | 'SUBJECT_BALANCE' | 'DIFFICULTY' | 'PACE' | 'TREND';
      status: 'STRONG' | 'DEVELOPING' | 'WEAK' | 'UNAVAILABLE';
      message: string;
    }>;
    summary: string;
    nextMilestone: string;
  };
  dynamicSummary?: string;
}

export function useMockResultAnalysis(resultId: string) {
  const [data, setData] = useState<MockResultAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async () => {
    if (!resultId) return;
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setError('Your session has expired. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/mock/results/${resultId}/analysis`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Your session has expired. Please log in again.');
        } else if (res.status === 404) {
          throw new Error('Mock result not found.');
        } else {
          throw new Error("We couldn't load your result analysis.");
        }
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('[useMockResultAnalysis] error:', err);
      setError(err.message || "We couldn't load your result analysis.");
    } finally {
      setLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  return { data, loading, error, retry: fetchAnalysis };
}
