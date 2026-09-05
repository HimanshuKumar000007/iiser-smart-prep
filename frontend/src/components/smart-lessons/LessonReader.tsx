/**
 * LessonReader — Premium Revision Reader & Interactive Quiz Player
 *
 * Implements a complete 10-15 min learning progression:
 *   1. Lesson Snapshot (Header) with High Scoring badge
 *   2. What You'll Learn
 *   3. Concept Breakdown Cards (Concept, Explanation, Example, Trap)
 *   4. Formula Box with 'Frequently Asked Formula' badge and Unicode formulas
 *   5. Exam Traps Warnings
 *   6. IAT Question Pattern List
 *   7. Interactive 5-Question Quick Quiz with lock mechanism (unlocked at 90% scroll)
 *   8. Satisfying Lesson Completed banner (+10 XP, next recommended link)
 *
 * All lesson-detail components are lazily loaded (React.lazy + Suspense) so
 * each chapter is bundled into its own chunk and downloaded only when opened.
 */

import React, { lazy, Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Lightbulb, CheckCircle, Check, X, Lock, Unlock, BookOpen, Brain } from 'lucide-react';
import { LESSONS_DATA, LessonItem } from '../../data/lessons';
import { getLessonContent, DetailedLessonContent, QuizQuestion } from '../../data/lessonContent';
import { useEntitlement } from '../../hooks/useEntitlement';
import { LessonHeader } from './LessonHeader';
import { SummaryCard } from './SummaryCard';
import { FormulaBox } from './FormulaBox';
import { ImportantPoints } from './ImportantPoints';
import { CommonMistakes } from './CommonMistakes';
import { QuizResultsScreen } from './QuizResultsScreen';
import { cn } from '../../lib/utils';

// ── Lazy-loaded lesson detail components (one chunk per chapter) ──────────────
const UnitsLessonDetail            = lazy(() => import('./UnitsLessonDetail').then(m => ({ default: m.UnitsLessonDetail })));
const MotionStraightLessonDetail   = lazy(() => import('./MotionStraightLessonDetail').then(m => ({ default: m.MotionStraightLessonDetail })));
const MotionPlaneLessonDetail      = lazy(() => import('./MotionPlaneLessonDetail').then(m => ({ default: m.MotionPlaneLessonDetail })));
const MechanicsLessonDetail        = lazy(() => import('./MechanicsLessonDetail').then(m => ({ default: m.MechanicsLessonDetail })));
const WorkEnergyLessonDetail       = lazy(() => import('./WorkEnergyLessonDetail').then(m => ({ default: m.WorkEnergyLessonDetail })));
const RotationLessonDetail         = lazy(() => import('./RotationLessonDetail').then(m => ({ default: m.RotationLessonDetail })));
const GravitationLessonDetail      = lazy(() => import('./GravitationLessonDetail').then(m => ({ default: m.GravitationLessonDetail })));
const FluidsLessonDetail           = lazy(() => import('./FluidsLessonDetail').then(m => ({ default: m.FluidsLessonDetail })));
const SolidsLessonDetail           = lazy(() => import('./SolidsLessonDetail').then(m => ({ default: m.SolidsLessonDetail })));
const ThermalPropertiesLessonDetail = lazy(() => import('./ThermalPropertiesLessonDetail'));
const ThermodynamicsLessonDetail   = lazy(() => import('./ThermodynamicsLessonDetail'));
const KineticTheoryLessonDetail    = lazy(() => import('./KineticTheoryLessonDetail').then(m => ({ default: m.KineticTheoryLessonDetail })));
const OscillationsLessonDetail     = lazy(() => import('./OscillationsLessonDetail').then(m => ({ default: m.OscillationsLessonDetail })));
const WavesLessonDetail            = lazy(() => import('./WavesLessonDetail').then(m => ({ default: m.WavesLessonDetail })));
const ElectrostaticsLessonDetail   = lazy(() => import('./ElectrostaticsLessonDetail'));
const PotentialCapacitanceDetail   = lazy(() => import('./PotentialCapacitanceDetail'));
const CurrentElectricityDetail     = lazy(() => import('./CurrentElectricityDetail'));
const MovingChargesDetail          = lazy(() => import('./MovingChargesDetail'));
const MagnetismMatterDetail        = lazy(() => import('./MagnetismMatterDetail'));
const ElectromagneticInductionDetail = lazy(() => import('./ElectromagneticInductionDetail'));
const AlternatingCurrentDetail     = lazy(() => import('./AlternatingCurrentDetail'));
const RayOpticsDetail              = lazy(() => import('./RayOpticsDetail'));
const ElectromagneticWavesDetail   = lazy(() => import('./ElectromagneticWavesDetail'));
const WaveOpticsDetail             = lazy(() => import('./WaveOpticsDetail'));
const DualNatureDetail             = lazy(() => import('./DualNatureDetail'));
const AtomsDetail                  = lazy(() => import('./AtomsDetail'));
const NucleiDetail                 = lazy(() => import('./NucleiDetail'));
const SemiconductorDetail          = lazy(() => import('./SemiconductorDetail'));
const SetsDetail                   = lazy(() => import('./SetsDetail'));
const PermCombBinomialDetail       = lazy(() => import('./PermCombBinomialDetail'));
const ComplexQuadraticsDetail      = lazy(() => import('./ComplexQuadraticsDetail'));
const TrigInverseDetail            = lazy(() => import('./TrigInverseDetail'));
const VectorsDetail                = lazy(() => import('./VectorsDetail'));
const MatricesDeterminantsDetail   = lazy(() => import('./MatricesDeterminantsDetail'));
const CoordinateGeometryDetail     = lazy(() => import('./CoordinateGeometryDetail'));
const ThreeDimensionalGeometryDetail = lazy(() => import('./ThreeDimensionalGeometryDetail'));
const SequencesSeriesDetail        = lazy(() => import('./SequencesSeriesDetail'));
const LimitsContinuityDetail       = lazy(() => import('./LimitsContinuityDetail'));
const DifferentiationAoDDetail     = lazy(() => import('./DifferentiationAoDDetail'));
const IntegrationApplicationsDetail = lazy(() => import('./IntegrationApplicationsDetail'));
const DifferentialEquationsDetail  = lazy(() => import('./DifferentialEquationsDetail'));
const StatsProbLPDetail            = lazy(() => import('./StatsProbLPDetail'));
const BasicConceptsChemistryDetail = lazy(() => import('./BasicConceptsChemistryDetail'));
const OrganicBasicsDetail          = lazy(() => import('./OrganicBasicsDetail'));
const AtomStructureDetail          = lazy(() => import('./AtomStructureDetail'));
const PeriodicityDetail            = lazy(() => import('./PeriodicityDetail'));
const ChemicalBondingDetail        = lazy(() => import('./ChemicalBondingDetail'));
const DfBlockDetail                = lazy(() => import('./DfBlockDetail'));
const CoordinationCompoundsDetail  = lazy(() => import('./CoordinationCompoundsDetail'));
const ThermodynamicsDetail         = lazy(() => import('./ThermodynamicsDetail'));
const EquilibriumDetail            = lazy(() => import('./EquilibriumDetail'));
const RedoxDetail                  = lazy(() => import('./RedoxDetail'));
const SolutionsDetail              = lazy(() => import('./SolutionsDetail'));
const ElectrochemistryDetail       = lazy(() => import('./ElectrochemistryDetail'));
const ChemicalKineticsDetail       = lazy(() => import('./ChemicalKineticsDetail'));
const HydrocarbonsDetail           = lazy(() => import('./HydrocarbonsDetail'));
const HaloalkanesDetail            = lazy(() => import('./HaloalkanesDetail'));
const AlcoholsPhenolsDetail        = lazy(() => import('./AlcoholsPhenolsDetail'));
const AldehydesKetonesDetail       = lazy(() => import('./AldehydesKetonesDetail'));
const AminesDetail                 = lazy(() => import('./AminesDetail'));
const BiomoleculesDetail           = lazy(() => import('./BiomoleculesDetail'));
const DiversityDetail              = lazy(() => import('./DiversityDetail'));
const StructuralOrganisationDetail = lazy(() => import('./StructuralOrganisationDetail'));
const CellDetail                   = lazy(() => import('./CellDetail'));
const PlantPhysiologyDetail        = lazy(() => import('./PlantPhysiologyDetail'));
const HumanPhysiologyDetail        = lazy(() => import('./HumanPhysiologyDetail'));
const ReproductionDetail           = lazy(() => import('./ReproductionDetail'));
const GeneticsDetail               = lazy(() => import('./GeneticsDetail'));
const HumanWelfareDetail           = lazy(() => import('./HumanWelfareDetail'));
const BiotechDetail                = lazy(() => import('./BiotechDetail'));
const EcologyDetail                = lazy(() => import('./EcologyDetail'));

// ── Skeleton shown while a chapter chunk is downloading ──────────────────────
function ChapterSkeleton() {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 mt-2 pb-32 lg:pb-8 px-2 sm:px-4 lg:px-0 animate-pulse">
      <div className="h-32 rounded-3xl bg-white/5" />
      <div className="h-24 rounded-3xl bg-white/5" />
      <div className="h-48 rounded-3xl bg-white/5" />
      <div className="h-32 rounded-3xl bg-white/5" />
    </div>
  );
}

interface Props {
  lessonId: string;
  onNavigate?: (view: string) => void;
  /** When true, bypasses the 90% scroll gate and opens the quiz section immediately. */
  startAtQuiz?: boolean;
}

export function LessonReader({ lessonId, onNavigate, startAtQuiz = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());

  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScores, setQuizScores] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  /**
   * Frozen snapshot of the completed attempt — set atomically at HTTP 200.
   * Using React state (not refs) ensures the QuizResultsScreen receives a
   * stable, immutable copy that cannot shift during re-renders or while the
   * async SLS recommendation is loading.
   */
  const [frozenAttempt, setFrozenAttempt] = useState<{
    selectedAnswers: (number | null)[];
    questionTimes: number[];
  } | null>(null);

  // SLS Step 4 Timing & Offline Persistence States
  const [submissionId, setSubmissionId] = useState<string>('');
  const [pendingPayload, setPendingPayload] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [masteryInfo, setMasteryInfo] = useState<any>(null);
  const [loadingMastery, setLoadingMastery] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const quizStartedAtRef = useRef<string>('');
  const questionStartTimeRef = useRef<number | null>(null);
  const questionTimesRef = useRef<number[]>([]);
  const selectedAnswersRef = useRef<(number | null)[]>([]);

  // Find current lesson index & adjacent lessons
  const currentLessonIndex = LESSONS_DATA.findIndex((l) => l.id === lessonId);
  const lesson: LessonItem = LESSONS_DATA[currentLessonIndex] || {
    id: 'phy_thermo',
    title: 'Thermodynamics',
    subject: 'Physics',
    duration: 240,
    revision: 80,
    weightage: 'Very High',
    priorityScore: 96,
    difficulty: 'Hard',
    ncertEnough: 'Partial',
    pyqFrequency: 0.84,
    bestRevisionOrder: 3,
  };

  const { isPro, loading: entitlementLoading } = useEntitlement();

  // 1st lesson per subject is FREE for non-Pro users
  const freeLessonIds = useMemo(() => {
    const freeSet = new Set<string>();
    ['Physics', 'Chemistry', 'Biology', 'Mathematics'].forEach(sub => {
      const firstSubjLesson = LESSONS_DATA.find(l => l.subject === sub);
      if (firstSubjLesson) {
        freeSet.add(firstSubjLesson.id);
      }
    });
    return freeSet;
  }, []);

  // Filter lessons for current subject so linear progression stays within subject
  const subjectLessons = useMemo(() => {
    return LESSONS_DATA.filter(l => l.subject === lesson.subject);
  }, [lesson.subject]);

  const subjectLessonIndex = subjectLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = subjectLessonIndex > 0 ? subjectLessons[subjectLessonIndex - 1] : null;
  const nextLesson = subjectLessonIndex >= 0 && subjectLessonIndex < subjectLessons.length - 1 ? subjectLessons[subjectLessonIndex + 1] : null;

  const isCurrentLessonLocked = !isPro && !freeLessonIds.has(lesson.id);
  const isNextLocked = !!(nextLesson && !isPro && !freeLessonIds.has(nextLesson.id));
  const isPrevLocked = !!(prevLesson && !isPro && !freeLessonIds.has(prevLesson.id));

  const content: DetailedLessonContent = getLessonContent(lesson.id, lesson.title, lesson.subject);

  useEffect(() => {
    if (isCurrentLessonLocked) return;
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) return;

    let active = true;
    setLoadingMastery(true);

    const apiBase = (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    fetch(`${apiBase}/api/sls/mastery`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        if (active && data?.success && Array.isArray(data.mastery)) {
          const found = data.mastery.find((m: any) => m.chapterId === lesson.id);
          if (found) {
            setMasteryInfo(found);
          } else {
            setMasteryInfo(null);
          }
        }
      })
      .catch(err => {
        console.error('Error fetching mastery data for LessonReader:', err);
      })
      .finally(() => {
        if (active) {
          setLoadingMastery(false);
        }
      });

    return () => {
      active = false;
    };
  }, [lesson.id, refreshTrigger, isCurrentLessonLocked]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const questions = content.quizQuestions;

  // Revision States (Stateless Derived Action Completions)
  const [isRevisionActive, setIsRevisionActive] = useState(false);
  const [activeRevisionType, setActiveRevisionType] = useState('CHAPTER_REVIEW');
  const [revisionStartedAt, setRevisionStartedAt] = useState('');
  const [revisionConfidence, setRevisionConfidence] = useState(3);
  const [revisionCompleted, setRevisionCompleted] = useState(false);

  const lastSyncedProgressRef = useRef<number>(0);

  // Calculate estimated minutes dynamically from question metadata
  const totalEstimatedSeconds = questions.reduce((sum, q) => sum + (q.estimatedTimeSeconds || 0), 0);
  const quizEstimatedMinutes = Math.max(1, Math.round(totalEstimatedSeconds / 60));

  // Set to in_progress initially and hook scroll tracking
  useEffect(() => {
    if (isCurrentLessonLocked) return;
    startTimeRef.current = Date.now();
    lastSyncedProgressRef.current = 0;

    const token = localStorage.getItem('IAT_TOKEN');
    const apiBase = (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    // 1. Check for pending payload in localStorage
    const pendingKey = `pending_quiz_submit_${lesson.id}`;
    const savedPending = localStorage.getItem(pendingKey);
    if (savedPending) {
      try {
        const parsed = JSON.parse(savedPending);
        setPendingPayload(parsed);
        setSubmissionId(parsed.submission_id);
        
        // Reconstruct timing and answer refs
        quizStartedAtRef.current = parsed.started_at;
        questionStartTimeRef.current = null; // Freeze active timing
        
        const parsedQuestions = parsed.questions || [];
        questionTimesRef.current = parsedQuestions.map((q: any) => q.time_taken_seconds);
        selectedAnswersRef.current = parsedQuestions.map((q: any) => q.selectedOption);
        
        // Reconstruct scores
        const reconstructedScores = parsedQuestions.map((q: any) => q.selectedOption === q.correctAnswerIndex);
        setQuizScores(reconstructedScores);
        
        // Force player UI to final question
        setQuizStarted(true);
        setCurrentQuestionIndex(questions.length - 1);
        setSelectedOption(parsedQuestions[questions.length - 1]?.selectedOption ?? null);
        setQuizFinished(false);
        setScrollProgress(100);
        return;
      } catch (err) {
        console.error("Failed to restore pending quiz payload:", err);
      }
    }

    const saved = localStorage.getItem(`lesson_${lesson.id}`);
    if (saved !== 'completed') {
      localStorage.setItem(`lesson_${lesson.id}`, 'in_progress');
    }
    localStorage.setItem(`lesson_last_opened_${lesson.id}`, String(Date.now()));
    
    // Reset quiz when lesson changes
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScores([]);
    setQuizFinished(false);
    setFrozenAttempt(null);          // clear stale results from previous chapter
    setScrollProgress(startAtQuiz ? 100 : 0);
    setSubmissionId('');
    setPendingPayload(null);
    setSubmitError(null);
    setIsSubmitting(false);
    quizStartedAtRef.current = '';
    questionStartTimeRef.current = null;
    questionTimesRef.current = [];
    selectedAnswersRef.current = [];

    // Check action plan to see if a revision session is currently recommended for this lesson (stateless lookup)
    if (token) {
      fetch(`${apiBase}/api/student/action-plan`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => {
          if (data?.success) {
            const allActions = [
              data.primaryAction,
              ...(data.secondaryActions || []),
              ...(data.dailyMissions || [])
            ].filter(Boolean);

            const match = allActions.find(a => 
              a.chapterId === lesson.id && 
              a.state !== 'COMPLETED' &&
              (a.type === 'COMPLETE_DUE_REVISION' || a.type === 'REVISE_CRITICAL_CHAPTER' || a.type === 'POST_MOCK_REVISION' || a.type === 'MAINTAIN_STRONG_TOPIC')
            );

            if (match) {
              setIsRevisionActive(true);
              setRevisionCompleted(false);
              const type = match.type === 'MAINTAIN_STRONG_TOPIC' ? 'MAINTAIN_STRONG_TOPIC' : 'CHAPTER_REVIEW';
              setActiveRevisionType(type);
              
              const startTimestamp = new Date().toISOString();
              setRevisionStartedAt(startTimestamp);
              
              // Register revision started in DB (REVISION_STARTED)
              fetch(`${apiBase}/api/revision/start`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  chapterId: lesson.id,
                  revisionType: type,
                  startedAt: startTimestamp
                })
              }).catch(err => console.error("Error starting revision session on DB:", err));
            }
          }
        })
        .catch(err => console.error("Error checking active revision plan:", err));

      // Register lesson started in DB (LESSON_STARTED)
      fetch(`${apiBase}/api/lesson/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chapterId: lesson.id,
          subject: lesson.subject,
          scrollProgress: startAtQuiz ? 100 : 0,
          status: startAtQuiz ? 'viewed_to_end' : 'started'
        })
      }).catch(err => console.error("Error registering lesson session:", err));
    }

    // When entering via a Quiz-retry action, scroll directly to the quiz section
    if (startAtQuiz) {
      setTimeout(() => {
        const quizSection = document.getElementById('sls-quiz-section');
        const scrollContainer = document.querySelector('.overflow-y-auto') || window;
        if (quizSection && scrollContainer !== window) {
          (scrollContainer as HTMLElement).scrollTo({ top: (quizSection as HTMLElement).offsetTop - 80, behavior: 'smooth' });
        } else if (quizSection) {
          quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    }

    const syncProgressToServer = (prog: number) => {
      if (!token) return;
      fetch(`${apiBase}/api/lesson/session/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chapterId: lesson.id,
          scrollProgress: prog
        })
      }).catch(err => console.error("Error syncing scroll progress:", err));
    };

    const handleScroll = () => {
      const container = document.querySelector('.overflow-y-auto') || document.documentElement;
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      
      const totalScroll = scrollHeight - clientHeight;
      let clamped = 0;
      if (totalScroll <= 0) {
        clamped = 100;
      } else {
        const pct = Math.round((scrollTop / totalScroll) * 100);
        clamped = Math.min(100, Math.max(0, pct));
      }

      setScrollProgress(clamped);
      if (clamped > 0) {
        localStorage.setItem(`lesson_progress_${lesson.id}`, String(clamped));
        
        // Milestone checks (25%, 50%, 75%, 100%) to avoid excessive API requests
        let targetMilestone = 0;
        if (clamped === 100) targetMilestone = 100;
        else if (clamped >= 75) targetMilestone = 75;
        else if (clamped >= 50) targetMilestone = 50;
        else if (clamped >= 25) targetMilestone = 25;

        if (targetMilestone > lastSyncedProgressRef.current) {
          lastSyncedProgressRef.current = targetMilestone;
          syncProgressToServer(targetMilestone);
        }
      }
    };

    const scrollContainer = document.querySelector('.overflow-y-auto') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll, { capture: true });
      
      // On unmount/exit, sync the final scroll progress to server
      const container = document.querySelector('.overflow-y-auto') || document.documentElement;
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const totalScroll = scrollHeight - clientHeight;
        const pct = totalScroll <= 0 ? 100 : Math.round((scrollTop / totalScroll) * 100);
        const finalClamped = Math.min(100, Math.max(0, pct));
        if (finalClamped > lastSyncedProgressRef.current) {
          syncProgressToServer(finalClamped);
        }
      }
    };
  }, [lesson.id, isCurrentLessonLocked]);

  // Quiz calculations
  const currentQuestion: QuizQuestion = questions[currentQuestionIndex] || {
    id: 'fallback-q1',
    topicId: 'general',
    difficulty: 'easy' as const,
    estimatedTimeSeconds: 45,
    question: 'Default question?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswerIndex: 0,
    explanation: 'Basic explanation.'
  };

  // Generate random UUID
  const generateUUID = () => {
    if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleStartQuiz = () => {
    const newSubId = generateUUID();
    setSubmissionId(newSubId);
    setPendingPayload(null);
    const pendingKey = `pending_quiz_submit_${lesson.id}`;
    localStorage.removeItem(pendingKey);
    
    setSubmitError(null);
    setIsSubmitting(false);
    setFrozenAttempt(null);
    
    quizStartedAtRef.current = new Date().toISOString();
    questionStartTimeRef.current = Date.now();
    questionTimesRef.current = new Array(questions.length).fill(0);
    selectedAnswersRef.current = new Array(questions.length).fill(null);
    
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScores([]);
    setQuizFinished(false);
  };

  const handleSubmitRevision = async () => {
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) return;
    const apiBase = (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    try {
      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      const res = await fetch(`${apiBase}/api/revision/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chapterId: lesson.id,
          revisionType: activeRevisionType,
          startedAt: revisionStartedAt,
          timeSpentSeconds,
          confidenceRating: revisionConfidence
        })
      });

      if (res.ok) {
        setRevisionCompleted(true);
        // Refresh mastery
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err) {
      console.error("Error completing revision session:", err);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (selectedOption !== null) return; // Answer locked
    setSelectedOption(optIdx);
    
    // Save in Ref to avoid duplicates in React state
    selectedAnswersRef.current[currentQuestionIndex] = optIdx;

    const isCorrect = optIdx === currentQuestion.correctAnswerIndex;
    setQuizScores(prev => [...prev, isCorrect]);
  };

  const recordQuestionTime = (index: number) => {
    if (questionStartTimeRef.current !== null) {
      // Milliseconds conversion to nearest integer seconds
      const elapsed = Math.max(0, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
      questionTimesRef.current[index] = (questionTimesRef.current[index] || 0) + elapsed;
      questionStartTimeRef.current = Date.now();
    }
  };

  const submitPayload = async (payload: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const token = localStorage.getItem('IAT_TOKEN');
    const apiBase = (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    try {
      const res = await fetch(`${apiBase}/api/chapter-quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('Saved lesson completion to Supabase:', data);
        
        // Remove pending payload from localStorage after success
        const pendingKey = `pending_quiz_submit_${lesson.id}`;
        localStorage.removeItem(pendingKey);
        setPendingPayload(null);

        // Freeze a deep copy of the mutable refs into React state BEFORE
        // setting quizFinished. This guarantees QuizResultsScreen always
        // reads the exact answers and times from this submission, even if
        // something later touches the refs (retake reset, lesson change).
        setFrozenAttempt({
          selectedAnswers: [...selectedAnswersRef.current],
          questionTimes:   [...questionTimesRef.current],
        });

        // Execute existing chapter completion localStorage logic
        localStorage.setItem(`lesson_${lesson.id}`, 'completed');
        setQuizFinished(true);
        setRefreshTrigger(prev => prev + 1);
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned status ${res.status}`);
      }
    } catch (err: any) {
      console.error('Error saving completion to Supabase:', err);
      setSubmitError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex === questions.length - 1) {
      if (isSubmitting) return;

      let payload = pendingPayload;
      if (!payload) {
        // Finalize final-question timing exactly once
        recordQuestionTime(currentQuestionIndex);
        questionStartTimeRef.current = null; // Freeze active timing

        const completedAt = new Date().toISOString();
        const questionAttempts = questions.map((q, idx) => {
          const selected = selectedAnswersRef.current[idx];
          return {
            question_id: q.id,
            topic_id: q.topicId,
            difficulty: q.difficulty,
            estimated_time_seconds: q.estimatedTimeSeconds,
            selectedOption: selected !== undefined ? selected : null,
            correctAnswerIndex: q.correctAnswerIndex,
            time_taken_seconds: questionTimesRef.current[idx] || 0,
            question_order: idx
          };
        });

        payload = {
          submission_id: submissionId,
          chapter_id: lesson.id,
          subject: lesson.subject,
          started_at: quizStartedAtRef.current,
          completed_at: completedAt,
          questions: questionAttempts
        };

        // Freeze in state
        setPendingPayload(payload);
        
        // Persist to localStorage before fetching
        const pendingKey = `pending_quiz_submit_${lesson.id}`;
        localStorage.setItem(pendingKey, JSON.stringify(payload));
      }

      await submitPayload(payload);
    } else {
      recordQuestionTime(currentQuestionIndex);
      setSelectedOption(null);
      setCurrentQuestionIndex(prev => prev + 1);
      questionStartTimeRef.current = Date.now();
    }
  };

  const scoreCount = quizScores.filter(s => s).length;
  const savedStatus = localStorage.getItem(`lesson_${lesson.id}`);
  const isCompleted = savedStatus === 'completed' || quizFinished;
  // startAtQuiz bypasses the 90% scroll gate so the quiz section is immediately accessible
  const isQuizUnlocked = isCompleted || scrollProgress >= 90 || startAtQuiz;

  const isUnitsLesson = lesson.id === 'phy_units';
  const isMotionStraightLesson = lesson.id === 'phy_motion_straight';
  const isMotionPlaneLesson = lesson.id === 'phy_motion_plane';
  const isMechanicsLesson = lesson.id === 'phy_mechanics';
  const isWorkEnergyLesson = lesson.id === 'phy_work_energy';
  const isRotationLesson = lesson.id === 'phy_rotation';
  const isGravitationLesson = lesson.id === 'phy_gravitation';
  const isSolidsLesson = lesson.id === 'phy_mech_solid';
  const isFluidsLesson = lesson.id === 'phy_mech_fluid';
  const isThermalLesson = lesson.id === 'phy_thermal';
  const isThermoLesson = lesson.id === 'phy_thermo';
  const isKineticLesson = lesson.id === 'phy_kinetic_theory';
  const isOscillationsLesson = lesson.id === 'phy_oscillations';
  const isWavesLesson = lesson.id === 'phy_waves';
  const isElectrostaticsLesson = lesson.id === 'phy_electrostatics';
  const isPotentialCapacitanceLesson = lesson.id === 'phy_potential_cap';
  const isCurrentElectricityLesson = lesson.id === 'phy_current_elec';
  const isMovingChargesLesson = lesson.id === 'phy_moving_charges';
  const isMagnetismMatterLesson = lesson.id === 'phy_mag_matter';
  const isEmInductionLesson = lesson.id === 'phy_em_induction';
  const isAcLesson = lesson.id === 'phy_ac';
  const isRayOpticsLesson = lesson.id === 'phy_ray_optics';
  const isEmWavesLesson = lesson.id === 'phy_em_waves';
  const isWaveOpticsLesson = lesson.id === 'phy_wave_optics';
  const isDualNatureLesson = lesson.id === 'phy_dual_nature';
  const isAtomsLesson = lesson.id === 'phy_atoms';
  const isNucleiLesson = lesson.id === 'phy_nuclei';
  const isSemiconductorLesson = lesson.id === 'phy_semiconductor';
  const isSetsLesson = lesson.id === 'math_sets';
  const isPermCombLesson = lesson.id === 'math_perm_comb';
  const isComplexLesson = lesson.id === 'math_complex';
  const isTrigLesson = lesson.id === 'math_trig';
  const isVectorsLesson = lesson.id === 'math_vec';
  const isMatricesLesson = lesson.id === 'math_matrices';
  const isCoordGeomLesson = lesson.id === 'math_straight_lines';
  const is3DGeoLesson = lesson.id === 'math_3d_geo';
  const isSeqSeriesLesson = lesson.id === 'math_seq_series';
  const isLimitsLesson = lesson.id === 'math_limits_deriv';
  const isDiffAoDLesson = lesson.id === 'math_diff';
  const isIntegLesson = lesson.id === 'math_integ_basics' || lesson.id === 'math_integ';
  const isDiffEqLesson = lesson.id === 'math_diff_eq';
  const isStatsProbLesson = lesson.id === 'math_prob' || lesson.id === 'math_stats';
  const isBasicConceptsLesson = lesson.id === 'chem_basic_concepts';
  const isAtomStructureLesson = lesson.id === 'chem_atom_struct';
  const isPeriodicLesson = lesson.id === 'chem_periodic';
  const isChemicalBondingLesson = lesson.id === 'chem_bonding';
  const isDfBlockLesson          = lesson.id === 'chem_df_block';
  const isCoordLesson            = lesson.id === 'chem_coord';
  const isThermoChemistryLesson  = lesson.id === 'chem_thermo';
  const isEquilibriumLesson      = lesson.id === 'chem_eq';
  const isRedoxLesson            = lesson.id === 'chem_redox';
  const isSolutionsLesson        = lesson.id === 'chem_solutions';
  const isElectrochemistryLesson = lesson.id === 'chem_electrochemistry';
  const isKineticsLesson         = lesson.id === 'chem_kinetics';
  const isOrgBasicsLesson        = lesson.id === 'chem_org_basics';
  const isHydrocarbonsLesson     = lesson.id === 'chem_hydrocarbons';
  const isHaloalkanesLesson      = lesson.id === 'chem_haloalkanes';
  const isAlcoholsPhenolsLesson  = lesson.id === 'chem_alcohol';
  const isAldehydesKetonesLesson = lesson.id === 'chem_aldehyde';
  const isAminesLesson           = lesson.id === 'chem_amines';
  const isBiomoleculesLesson     = lesson.id === 'chem_biomolecules';
  const isDiversityLesson        = lesson.id === 'bio_diversity';
  const isStructuralLesson      = lesson.id === 'bio_struct_org';
  const isCellLesson            = lesson.id === 'bio_cell';
  const isPlantPhysioLesson     = lesson.id === 'bio_plant_physio';
  const isHumanPhysioLesson     = lesson.id === 'bio_human_physio';
  const isReproductionLesson    = lesson.id === 'bio_reproduction';
  const isGeneticsLesson        = lesson.id === 'bio_genetics';
  const isHumanWelfareLesson    = lesson.id === 'bio_human_welfare';
  const isBiotechLesson         = lesson.id === 'bio_biotech';
  const isEcologyLesson         = lesson.id === 'bio_ecology';

  const hasDetailComponent = isUnitsLesson || isMotionStraightLesson || isMotionPlaneLesson ||
    isMechanicsLesson || isWorkEnergyLesson || isRotationLesson || isGravitationLesson ||
    isSolidsLesson || isFluidsLesson || isThermalLesson || isThermoLesson || isKineticLesson ||
    isOscillationsLesson || isWavesLesson || isElectrostaticsLesson || isPotentialCapacitanceLesson ||
    isCurrentElectricityLesson || isMovingChargesLesson || isMagnetismMatterLesson ||
    isEmInductionLesson || isAcLesson || isRayOpticsLesson || isEmWavesLesson ||
    isWaveOpticsLesson || isDualNatureLesson || isAtomsLesson || isNucleiLesson ||
    isSemiconductorLesson || isSetsLesson || isPermCombLesson || isComplexLesson ||
    isTrigLesson || isVectorsLesson || isMatricesLesson || isCoordGeomLesson ||
    is3DGeoLesson || isSeqSeriesLesson || isLimitsLesson || isDiffAoDLesson ||
    isIntegLesson || isDiffEqLesson || isStatsProbLesson || isBasicConceptsLesson ||
    isAtomStructureLesson || isPeriodicLesson || isChemicalBondingLesson || isDfBlockLesson || isCoordLesson || isThermoChemistryLesson || isEquilibriumLesson || isRedoxLesson || isSolutionsLesson || isElectrochemistryLesson || isKineticsLesson || isOrgBasicsLesson || isHydrocarbonsLesson || isHaloalkanesLesson || isAlcoholsPhenolsLesson || isAldehydesKetonesLesson || isAminesLesson || isBiomoleculesLesson || isDiversityLesson || isStructuralLesson || isCellLesson || isPlantPhysioLesson || isHumanPhysioLesson || isReproductionLesson || isGeneticsLesson || isHumanWelfareLesson || isBiotechLesson || isEcologyLesson;


  /** Renders the lazy chapter detail component, or null if none matched. */
  function renderChapter() {
    if (isUnitsLesson)              return <UnitsLessonDetail isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMotionStraightLesson)     return <MotionStraightLessonDetail isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMotionPlaneLesson)        return <MotionPlaneLessonDetail isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMechanicsLesson)          return <MechanicsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isWorkEnergyLesson)         return <WorkEnergyLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isRotationLesson)           return <RotationLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isGravitationLesson)        return <GravitationLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isSolidsLesson)             return <SolidsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isFluidsLesson)             return <FluidsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isThermalLesson)            return <ThermalPropertiesLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isThermoLesson)             return <ThermodynamicsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isKineticLesson)            return <KineticTheoryLessonDetail progress={progress} isCompleted={isCompleted ?? false} onNavigate={onNavigate} />;
    if (isOscillationsLesson)       return <OscillationsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isWavesLesson)              return <WavesLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isElectrostaticsLesson)     return <ElectrostaticsLessonDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isPotentialCapacitanceLesson) return <PotentialCapacitanceDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isCurrentElectricityLesson) return <CurrentElectricityDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMovingChargesLesson)      return <MovingChargesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMagnetismMatterLesson)    return <MagnetismMatterDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isEmInductionLesson)        return <ElectromagneticInductionDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAcLesson)                 return <AlternatingCurrentDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isRayOpticsLesson)          return <RayOpticsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isEmWavesLesson)            return <ElectromagneticWavesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isWaveOpticsLesson)         return <WaveOpticsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isDualNatureLesson)         return <DualNatureDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAtomsLesson)              return <AtomsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isNucleiLesson)             return <NucleiDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isSemiconductorLesson)      return <SemiconductorDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isSetsLesson)               return <SetsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isPermCombLesson)           return <PermCombBinomialDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isComplexLesson)            return <ComplexQuadraticsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isTrigLesson)               return <TrigInverseDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isVectorsLesson)            return <VectorsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isMatricesLesson)           return <MatricesDeterminantsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isCoordGeomLesson)          return <CoordinateGeometryDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (is3DGeoLesson)              return <ThreeDimensionalGeometryDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isSeqSeriesLesson)          return <SequencesSeriesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isLimitsLesson)             return <LimitsContinuityDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isDiffAoDLesson)            return <DifferentiationAoDDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isIntegLesson)              return <IntegrationApplicationsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isDiffEqLesson)             return <DifferentialEquationsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isStatsProbLesson)          return <StatsProbLPDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isBasicConceptsLesson)      return <BasicConceptsChemistryDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAtomStructureLesson)      return <AtomStructureDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isPeriodicLesson)           return <PeriodicityDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isChemicalBondingLesson)    return <ChemicalBondingDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isDfBlockLesson)            return <DfBlockDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isCoordLesson)              return <CoordinationCompoundsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isThermoChemistryLesson)    return <ThermodynamicsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isEquilibriumLesson)        return <EquilibriumDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isRedoxLesson)              return <RedoxDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isSolutionsLesson)          return <SolutionsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isElectrochemistryLesson)   return <ElectrochemistryDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isKineticsLesson)           return <ChemicalKineticsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isOrgBasicsLesson)          return <OrganicBasicsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isHydrocarbonsLesson)       return <HydrocarbonsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isHaloalkanesLesson)        return <HaloalkanesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAlcoholsPhenolsLesson)    return <AlcoholsPhenolsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAldehydesKetonesLesson)   return <AldehydesKetonesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isAminesLesson)             return <AminesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isBiomoleculesLesson)       return <BiomoleculesDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isDiversityLesson)          return <DiversityDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isStructuralLesson)         return <StructuralOrganisationDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isCellLesson)               return <CellDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isPlantPhysioLesson)        return <PlantPhysiologyDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isHumanPhysioLesson)        return <HumanPhysiologyDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isReproductionLesson)       return <ReproductionDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isGeneticsLesson)           return <GeneticsDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isHumanWelfareLesson)       return <HumanWelfareDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isBiotechLesson)            return <BiotechDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    if (isEcologyLesson)            return <EcologyDetail progress={progress} isCompleted={isCompleted} onNavigate={onNavigate} />;
    return null;
  }

  const progress = isCompleted ? 100 : scrollProgress;

  // ── Quiz Results Screen (replaces entire lesson view when quiz is done) ──
  // Uses frozenAttempt (immutable React state) rather than live mutable refs
  // so the screen stays stable while the async SLS recommendation loads.
  if (quizFinished && frozenAttempt) {
    return (
      <QuizResultsScreen
        attempt={{
          questions,
          selectedAnswers: frozenAttempt.selectedAnswers,
          questionTimes:   frozenAttempt.questionTimes,
          lessonId:        lesson.id,
          lessonTitle:     lesson.title,
          subject:         lesson.subject,
        }}
        onNavigate={onNavigate}
        onRetakeQuiz={() => {
          // Reset only quiz-attempt state. Keep scrollProgress=100 and
          // isQuizUnlocked=true so the student can start without re-reading.
          setQuizFinished(false);
          setFrozenAttempt(null);
          setQuizStarted(false);
          setCurrentQuestionIndex(0);
          setSelectedOption(null);
          setQuizScores([]);
          setScrollProgress(100);
          setPendingPayload(null);
          setSubmitError(null);
          setSubmissionId('');
          questionTimesRef.current = new Array(questions.length).fill(0);
          selectedAnswersRef.current = new Array(questions.length).fill(null);
          const pendingKey = `pending_quiz_submit_${lesson.id}`;
          localStorage.removeItem(pendingKey);
          // Scroll to quiz section after state settles
          setTimeout(() => {
            const quizSection = document.getElementById('sls-quiz-section');
            const scrollContainer = document.querySelector('.overflow-y-auto') || window;
            if (quizSection && scrollContainer !== window) {
              (scrollContainer as HTMLElement).scrollTo({
                top: (quizSection as HTMLElement).offsetTop - 80,
                behavior: 'smooth',
              });
            } else if (quizSection) {
              quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }}
      />
    );
  }

  if (isCurrentLessonLocked && entitlementLoading) {
    return <ChapterSkeleton />;
  }

  if (isCurrentLessonLocked) {
    const freeLessonForSubject = LESSONS_DATA.find(l => l.subject === lesson.subject && freeLessonIds.has(l.id));

    return (
      <div className="lesson-reader-container max-w-2xl mx-auto w-full space-y-6 mt-4 pb-32 px-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('smart_lessons')}
          className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold transition-colors py-2 px-3 rounded-xl hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Smart Lessons</span>
        </button>

        {/* Lock Paywall Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0D0F20] via-[#090B14] to-[#0D0F20] border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.08)]">
          {/* Ambient Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-5">
            {/* Lock Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            {/* Tags / Badges */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Pro Chapter Locked
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold">
                {lesson.subject}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                {lesson.title}
              </h2>
              <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                This chapter is exclusively available to SmartPrep Pro members. Upgrade now to unlock all 60+ chapters, formula vaults, trap breakdowns, and adaptive quizzes.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2.5 text-left text-xs">
              <div className="flex items-center gap-2.5 text-white/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complete 10-15 Min Concept & NCERT Bridge breakdown</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Frequently asked formulas & PYQ frequency patterns</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-yield exam traps & negative marking warnings</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5-Question SLS adaptive mastery quiz & instant score analytics</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
              <button
                onClick={() => onNavigate?.('subscription:smart_lessons')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-black font-black text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Unlock with SmartPrep Pro</span>
              </button>

              {freeLessonForSubject && (
                <button
                  onClick={() => onNavigate?.(`/smart-lessons/${freeLessonForSubject.id}`)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-bold text-xs transition-all active:scale-95"
                >
                  Read Free Chapter ({freeLessonForSubject.title.split(' ')[0]}...)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Nav to go to previous lesson if available */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {prevLesson && (
            <button
              onClick={() => {
                if (isPrevLocked) {
                  onNavigate?.('subscription:smart_lessons');
                } else {
                  onNavigate?.(`/smart-lessons/${prevLesson.id}`);
                }
              }}
              className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold transition-colors py-2 px-3 rounded-xl hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {prevLesson.title}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="lesson-reader-container max-w-4xl mx-auto w-full space-y-6 mt-2 pb-32 lg:pb-8 px-2 sm:px-4 lg:px-0">
      
      {/* ── Lazy chapter detail (Suspense shows skeleton while chunk downloads) ── */}
      <Suspense fallback={<ChapterSkeleton />}>
        {renderChapter()}
      </Suspense>

      {/* ── Fallback generic reader for lessons without a dedicated detail component ── */}
      {!hasDetailComponent && (
        <>
          {/* ── Section 1: Lesson Snapshot (Header) ───────────────────────────── */}
          <LessonHeader
            title={lesson.title}
            subject={lesson.subject}
            duration={lesson.revision}
            weightage={lesson.weightage}
            averageQuestions={content.averageQuestions}
            onBack={() => onNavigate?.('smart_lessons')}
          />

          {/* ── Section 2: What You'll Learn ───────────────────────────────────── */}
          <SummaryCard goals={content.whatYoullLearn} />

          {/* ── Section 3: Concept Breakdown Cards ─────────────────────────────── */}
          <div className="space-y-4">
            <div className="lesson-section-header px-1">
              <div className="lesson-section-icon bg-cyan-500/10 border border-cyan-500/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="lesson-section-title">Concept Breakdown</h3>
            </div>

            <div className="space-y-3">
              {content.concepts.map((c, index) => (
                <div
                  key={index}
                  className="concept-card lesson-section-animate"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Concept Title */}
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                      Concept {index + 1}
                    </span>
                    {c.title}
                  </h4>

                  {/* Description */}
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {c.explanation}
                  </p>

                  {/* Example & Trap blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Example */}
                    <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-1">
                      <span className="text-[10px] font-black text-cyan-400 tracking-wider uppercase block">💡 Example / Application</span>
                      <p className="text-white/60 text-xs leading-relaxed">{c.example}</p>
                    </div>

                    {/* Concept Trap */}
                    <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1">
                      <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block">⚠️ Concept Trap</span>
                      <p className="text-white/60 text-xs leading-relaxed">{c.trap}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 4: Formula Box ────────────────────────────────────────── */}
          <FormulaBox formulas={content.formulas} />

          {/* ── Section 5: Exam Traps ⚠️ ───────────────────────────────────────── */}
          <CommonMistakes traps={content.examTraps} />

          {/* ── Section 6: IAT Question Pattern ────────────────────────────────── */}
          <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="lesson-section-header border-b border-white/5 pb-3">
                <div className="lesson-section-icon bg-indigo-500/10 border border-indigo-500/20">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="lesson-section-title">IAT Question Pattern</h3>
              </div>

              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Based on official PYQ trends (2017–2024), exam problems frequently test:
              </p>
              <div className="flex flex-col gap-2.5">
                {content.questionPattern.map((pat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 bg-white/[0.02] rounded-xl px-3.5 py-3 border border-white/5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Section 7: Interactive Quick Quiz ─────────────────────────────── */}
      <div id="sls-quiz-section" className="border border-white/10 rounded-3xl bg-[#070810] p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Start Quiz Card */}
        {!quizStarted && !quizFinished && (
          <div className="text-center space-y-6 py-4 relative z-10">
            {/* Lock Icon */}
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg transition-all duration-500',
              isQuizUnlocked
                ? 'bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 border border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.25)]'
                : 'bg-white/5 border border-white/10'
            )}>
              {isQuizUnlocked ? (
                <Unlock className="w-7 h-7 text-cyan-400" />
              ) : (
                <Lock className="w-7 h-7 text-white/30" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-white">Quick Quiz</h3>
              <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                {isQuizUnlocked
                  ? 'Ready to test your comprehension? Start the review quiz below.'
                  : 'Complete reading the lesson above to unlock this quiz.'}
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex justify-center gap-6 text-xs text-white/50">
              <div className="text-center">
                <span className="text-white font-bold block text-base">{questions.length}</span>
                <span>Questions</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="text-white font-bold block text-base">{quizEstimatedMinutes} Min</span>
                <span>Est. Time</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="text-white font-bold block text-base">80%</span>
                <span>Mastery Target</span>
              </div>
            </div>

            {/* Previous Attempts Info */}
            {loadingMastery ? (
              <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse flex flex-col items-center space-y-2">
                <div className="h-2 w-24 bg-white/10 rounded" />
                <div className="h-6 w-48 bg-white/10 rounded" />
              </div>
            ) : masteryInfo && masteryInfo.attemptCount > 0 ? (
              <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                <p className="font-semibold text-white/70 uppercase tracking-wider text-[10px]">Previous Performance</p>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div>
                    <span className="text-white font-bold block text-base">{masteryInfo.attemptCount}</span>
                    <span className="text-white/40 text-[10px]">Attempts</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold block text-base">{Math.round(masteryInfo.latestAttemptAccuracy)}%</span>
                    <span className="text-white/40 text-[10px]">Latest Score</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block text-base">{Math.round(masteryInfo.bestAttemptAccuracy)}%</span>
                    <span className="text-white/40 text-[10px]">Best Score</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Revision Session Complete Reflection */}
            {isRevisionActive && (
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 mb-6 relative z-10 text-center">
                <Brain className="w-8 h-8 text-purple-400 mx-auto" />
                {revisionCompleted ? (
                  <div>
                    <h4 className="text-white font-bold text-sm">✓ Revision Completed</h4>
                    <p className="text-xs text-white/50 mt-1">
                      Your concept revision evidence has been persisted to the server.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="text-white font-bold text-sm">Active Revision Session</h4>
                      <p className="text-xs text-white/50 mt-1">
                        Self-evaluate your understanding to complete this revision task.
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRevisionConfidence(star)}
                          className={cn(
                            "w-8 h-8 rounded-full font-bold text-xs border transition-all",
                            revisionConfidence === star
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                          )}
                        >
                          {star}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-white/40">Rate your confidence (1 = low, 5 = high)</p>
                    <button
                      onClick={handleSubmitRevision}
                      className="w-full py-2.5 font-bold text-xs rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all active:scale-95 shadow-md shadow-purple-500/20"
                    >
                      Confirm Concept Revision
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Reading Progress (when locked) */}
            {!isQuizUnlocked && (
              <div className="max-w-xs mx-auto space-y-1.5">
                <div className="flex justify-between text-[11px] text-white/40 font-bold">
                  <span>Reading Progress</span>
                  <span>{scrollProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/30">Scroll to 90% to unlock quiz</p>
              </div>
            )}

            <button
              disabled={!isQuizUnlocked}
              onClick={handleStartQuiz}
              className={cn(
                'px-10 py-3.5 font-bold text-sm rounded-full transition-all shadow-lg active:scale-95',
                isQuizUnlocked
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25'
                  : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
              )}
            >
              {isQuizUnlocked
                ? (masteryInfo && masteryInfo.attemptCount > 0 ? '🔄 Retake Quiz' : '🚀 Start Quiz')
                : 'Complete Reading to Unlock'}
            </button>
          </div>
        )}

        {/* Live Quiz Player */}
        {quizStarted && !quizFinished && (
          <div className="space-y-5 relative z-10">
            {/* Header / Progress Tracker */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider block">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-[10px] text-white/25">
                  {quizScores.filter(Boolean).length} correct so far
                </span>
              </div>
              {/* Dot progress indicators */}
              <div className="flex gap-1.5 items-center">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-full transition-all duration-350',
                      i === currentQuestionIndex
                        ? 'bg-cyan-400 w-5 h-2'
                        : i < quizScores.length
                        ? quizScores[i]
                          ? 'bg-emerald-400 w-2 h-2'
                          : 'bg-rose-400 w-2 h-2'
                        : 'bg-white/10 w-2 h-2'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden -mt-2">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h4 className="text-white font-bold text-sm sm:text-base leading-relaxed">
              {currentQuestion.question}
            </h4>

            {/* 4 Clickable Options — bigger touch targets */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                const showCorrectColor = selectedOption !== null && isCorrect;
                const showWrongColor = isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={cn(
                      'quiz-option',
                      selectedOption === null
                        ? 'bg-white/[0.02] border-white/8 hover:border-white/20 hover:bg-white/[0.05] text-white/80 active:scale-[0.99]'
                        : showCorrectColor
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                        : showWrongColor
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 font-bold'
                        : 'bg-white/[0.01] border-white/5 text-white/30'
                    )}
                  >
                    {/* Option letter bubble */}
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <span className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 border',
                        selectedOption === null
                          ? 'bg-white/5 border-white/10 text-white/50'
                          : showCorrectColor
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : showWrongColor
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                          : 'bg-white/[0.02] border-white/5 text-white/20'
                      )}>
                        {['A','B','C','D'][idx]}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </div>
                    {selectedOption !== null && (
                      <span className="shrink-0">
                        {isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        {isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Section */}
            {selectedOption !== null && (
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-[10px] font-black text-indigo-400 uppercase block tracking-wider">💡 Explanation</span>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next Question Control */}
            {selectedOption !== null && (
              <div className="flex flex-col items-end gap-3 w-full">
                {submitError && (
                  <div className="w-full text-right text-rose-400 text-xs font-bold leading-relaxed">
                    ⚠️ Submission Error: {submitError}
                  </div>
                )}
                <button
                  disabled={isSubmitting}
                  onClick={handleNextQuestion}
                  className={cn(
                    "px-7 py-3 text-black font-bold text-sm rounded-full flex items-center gap-2 shadow-lg transition-all",
                    isSubmitting
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-400 active:scale-95"
                  )}
                >
                  <span>
                    {isSubmitting
                      ? "Submitting..."
                      : currentQuestionIndex === questions.length - 1
                      ? submitError
                        ? "Retry Submission"
                        : "Finish Quiz"
                      : "Next Question"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quiz finished state is handled by QuizResultsScreen above — nothing to render here */}
      </div>

      {/* ── Section 8: Bottom Navigation (Adjacent Chapters) ────────────────── */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
        {prevLesson ? (
          <button
            onClick={() => {
              if (isPrevLocked) {
                onNavigate?.('subscription:smart_lessons');
              } else {
                onNavigate?.(`/smart-lessons/${prevLesson.id}`);
              }
            }}
            className={cn(
              "flex items-center gap-2.5 text-sm font-bold transition-all group text-left active:scale-95 p-3.5 rounded-2xl flex-1 border",
              isPrevLocked
                ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/25 hover:border-amber-500/40 hover:bg-amber-500/15 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.06)]"
                : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            {isPrevLocked ? (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                <Lock className="w-4 h-4" />
              </div>
            ) : (
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 shrink-0" />
            )}
            <div className="min-w-0">
              <span className={cn(
                "text-[10px] block uppercase font-bold mb-0.5 flex items-center gap-1",
                isPrevLocked ? "text-amber-400" : "text-white/30"
              )}>
                {isPrevLocked ? (
                  <>
                    <Lock className="w-2.5 h-2.5" />
                    <span>Previous (PRO LOCK)</span>
                  </>
                ) : (
                  <span>← Previous</span>
                )}
              </span>
              <span className={cn(
                "truncate block text-xs",
                isPrevLocked ? "text-amber-200/90 font-semibold" : "text-white/70 group-hover:text-white"
              )}>
                {prevLesson.title}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson && (
          <button
            onClick={() => {
              if (isNextLocked) {
                onNavigate?.('subscription:smart_lessons');
              } else {
                onNavigate?.(`/smart-lessons/${nextLesson.id}`);
              }
            }}
            className={cn(
              "flex items-center gap-2.5 text-sm font-bold transition-all group text-right active:scale-95 p-3.5 rounded-2xl flex-1 justify-end border",
              isNextLocked
                ? "bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/25 hover:border-amber-500/40 hover:bg-amber-500/15 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.06)]"
                : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <div className="text-right min-w-0">
              <span className={cn(
                "text-[10px] block uppercase font-bold mb-0.5 flex items-center justify-end gap-1",
                isNextLocked ? "text-amber-400" : "text-white/30"
              )}>
                {isNextLocked ? (
                  <>
                    <Lock className="w-2.5 h-2.5" />
                    <span>Next (PRO LOCK)</span>
                  </>
                ) : (
                  <span>Next →</span>
                )}
              </span>
              <span className={cn(
                "truncate block text-xs",
                isNextLocked ? "text-amber-200/90 font-semibold" : "text-white/70 group-hover:text-white"
              )}>
                {nextLesson.title}
              </span>
            </div>
            {isNextLocked ? (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                <Lock className="w-4 h-4" />
              </div>
            ) : (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
            )}
          </button>
        )}
      </div>

    </div>
  );
}
