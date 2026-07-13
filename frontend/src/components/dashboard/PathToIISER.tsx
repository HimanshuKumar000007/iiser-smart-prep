import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, Circle, ArrowRight, BookOpen, Calculator, Beaker, Dna, Map, Zap, Calendar, Star, Trophy, TrendingUp, Compass, Flag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { useSlsMyPath } from '../../hooks/useSlsMyPath';
import type { SlsRecommendation, SlsMasteryChapter, SlsWeakChapter, SlsWeakTopic } from '../../types/sls';
import { LESSONS_DATA } from '../../data/lessons';
interface PathToIISERProps {
  onNavigate?: (view: string) => void;
  dashboardData?: any;
  dashboardLoading?: boolean;
  actionPlan?: any;
  actionPlanLoading?: boolean;
}

function getPreparationStage(progress: number): string {
  if (progress <= 0) return 'Getting Started';
  if (progress < 25) return 'Building Foundations';
  if (progress < 50) return 'Developing Concepts';
  if (progress < 75) return 'Strengthening Preparation';
  if (progress < 90) return 'Advanced Preparation';
  return 'Mastery Phase';
}

function getRecommendationLabel(actionType: SlsRecommendation['actionType']): string {
  switch (actionType) {
    case 'REVISE_CHAPTER':
      return 'Revise Chapter';
    case 'PRACTICE_TOPIC':
      return 'Practice Weak Topic';
    case 'RETRY_CHAPTER_QUIZ':
      return 'Retry Chapter Quiz';
    case 'PRACTICE_DIFFICULTY':
      return 'Practice Questions';
    case 'CONTINUE_LEARNING':
      return 'Continue Learning';
    default:
      return 'Continue Learning';
  }
}

function getRecommendationCta(actionType: SlsRecommendation['actionType']): string {
  switch (actionType) {
    case 'REVISE_CHAPTER':
      return 'Revise Now';
    case 'PRACTICE_TOPIC':
      return 'Practice Topic';
    case 'RETRY_CHAPTER_QUIZ':
      return 'Retry Quiz';
    case 'PRACTICE_DIFFICULTY':
      return 'Start Practice';
    case 'CONTINUE_LEARNING':
      return 'Continue Learning';
    default:
      return 'Continue Learning';
  }
}

function getUrgencyText(urgency: SlsRecommendation['urgency']): string {
  switch (urgency) {
    case 'immediate':
      return 'Immediate';
    case 'high':
      return 'High Priority';
    case 'moderate':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return 'Priority';
  }
}

interface SubjectProgressData {
  subject: string;
  totalChapters: number;
  attemptedChapters: number;
  masteredChapters: number;
  progress: number;
}

function calculateSubjectProgress(
  mastery: SlsMasteryChapter[],
  subject: string
): SubjectProgressData {
  const subjectChapters = mastery.filter(chapter => {
    const s = (chapter.subject || '').toLowerCase();
    const t = subject.toLowerCase();
    if (t === 'mathematics') {
      return s === 'mathematics' || s === 'math';
    }
    return s === t;
  });

  const totalChapters = subjectChapters.length;
  const attemptedChapters = subjectChapters.filter(chapter => (chapter.attemptCount || 0) > 0).length;
  const masteredChapters = subjectChapters.filter(chapter => chapter.state === 'MASTERED').length;
  
  const progressSum = subjectChapters.reduce((sum, chapter) => sum + (chapter.masteryScore || 0), 0);
  const progress = totalChapters > 0 ? Math.round(progressSum / totalChapters) : 0;

  return {
    subject,
    totalChapters,
    attemptedChapters,
    masteredChapters,
    progress
  };
}

interface FocusAreaItem {
  id: string;
  chapterId: string;
  topicId?: string;
  subject?: string;
  reasons: string[];
  severity: 'mild' | 'moderate' | 'high' | 'critical';
  type: 'chapter' | 'topic';
}

function selectFocusAreas(
  weakChapters: SlsWeakChapter[],
  weakTopics: SlsWeakTopic[]
): FocusAreaItem[] {
  const selected: FocusAreaItem[] = [];
  const addedChapters = new Set<string>();

  // 1. Add confirmed chapter weaknesses in backend order (up to 3)
  for (const wc of (weakChapters || [])) {
    if (selected.length >= 3) break;
    selected.push({
      id: `wc-${wc.chapterId}`,
      chapterId: wc.chapterId,
      subject: wc.subject,
      reasons: wc.reasons,
      severity: wc.severity,
      type: 'chapter'
    });
    addedChapters.add(wc.chapterId);
  }

  if (selected.length < 3) {
    // 2. Add weakTopics, prioritizing those from chapters not already added to avoid duplicates
    const distinctTopics: SlsWeakTopic[] = [];
    const duplicateTopics: SlsWeakTopic[] = [];

    for (const wt of (weakTopics || [])) {
      if (addedChapters.has(wt.chapterId)) {
        duplicateTopics.push(wt);
      } else {
        distinctTopics.push(wt);
      }
    }

    // Add distinct topics first
    for (const wt of distinctTopics) {
      if (selected.length >= 3) break;
      selected.push({
        id: `wt-${wt.chapterId}-${wt.topicId}`,
        chapterId: wt.chapterId,
        topicId: wt.topicId,
        reasons: wt.reasons,
        severity: wt.severity,
        type: 'topic'
      });
      addedChapters.add(wt.chapterId);
    }

    // If still less than 3, add topics from already-represented chapters
    for (const wt of duplicateTopics) {
      if (selected.length >= 3) break;
      selected.push({
        id: `wt-${wt.chapterId}-${wt.topicId}-dup`,
        chapterId: wt.chapterId,
        topicId: wt.topicId,
        reasons: wt.reasons,
        severity: wt.severity,
        type: 'topic'
      });
    }
  }

  return selected;
}

function getWeaknessReason(reasons: string[]): string {
  if (!reasons || reasons.length === 0) return 'Needs more practice';
  if (reasons.includes('FAST_BUT_INACCURATE')) {
    return 'Answering too quickly with low accuracy';
  }
  if (reasons.includes('LOW_ACCURACY_AND_SLOW')) {
    return 'Needs improvement in accuracy and speed';
  }
  if (reasons.includes('VERY_LOW_ACCURACY')) {
    return 'Low accuracy';
  }
  if (reasons.includes('LOW_ACCURACY')) {
    return 'Accuracy needs improvement';
  }
  if (reasons.includes('SLOW_SOLVING')) {
    return 'Solving questions slower than expected';
  }
  return 'Needs more practice';
}

function getSeverityBadgeStyle(severity: 'mild' | 'moderate' | 'high' | 'critical'): string {
  switch (severity) {
    case 'critical':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'moderate':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'mild':
    default:
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  }
}

function getSeverityLabel(severity: 'mild' | 'moderate' | 'high' | 'critical'): string {
  switch (severity) {
    case 'critical':
      return 'Critical';
    case 'high':
      return 'High Priority';
    case 'moderate':
      return 'Needs Attention';
    case 'mild':
    default:
      return 'Keep Practicing';
  }
}

export function PathToIISER({ onNavigate, dashboardData, dashboardLoading, actionPlan: plan, actionPlanLoading: planLoading }: PathToIISERProps) {
  const examLabel = (() => {
    const raw = localStorage.getItem('onboarding_exam') || 'iiser';
    if (raw === 'nest') return 'NEST 2027';
    if (raw === 'both') return 'IAT & NEST 2027';
    return 'IISER IAT 2027';
  })();

  const daysUntilExam = (() => {
    const EXAM_DATE = new Date('2027-06-07T00:00:00');
    const today = new Date();
    const diffTime = EXAM_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  })();

  const markMissionCompleted = (actionId: string) => {
    const list = localStorage.getItem('completed_missions') || '';
    const arr = list ? list.split(',') : [];
    if (!arr.includes(actionId)) {
      arr.push(actionId);
      localStorage.setItem('completed_missions', arr.join(','));
    }
  };

  const {
    loading,
    error,
    analytics,
    weaknessAnalysis,
    weaknessesAvailable,
    recommendations,
    recommendationsAvailable,
    mastery,
    hasSlsData,
    analyticsAvailable,
    masteryAvailable
  } = useSlsMyPath();

  const [selectedPhaseId, setSelectedPhaseId] = useState<'FOUNDATION' | 'CONCEPT_MASTERY' | 'ADVANCED_PREPARATION' | 'MOCK_TEST_PHASE' | 'FINAL_REVISION' | null>(null);

  // ── Journey Constants & Calculation ──────────────────────────────────
  const THRESHOLDS = useMemo(() => ({
    CONCEPT_MASTERY: {
      MIN_CHAPTERS: 3,
      MIN_QUIZ_ATTEMPTS: 5
    },
    ADVANCED_PREPARATION: {
      MIN_CHAPTERS: 8,
      MIN_QUIZ_ATTEMPTS: 15,
      MIN_STRONG_CHAPTERS: 3
    },
    MOCK_TEST_PHASE: {
      MIN_CHAPTERS: 15,
      MIN_MOCK_ATTEMPTS: 2
    },
    FINAL_REVISION: {
      MAX_DAYS_REMAINING: 30,
      MIN_CHAPTERS: 10
    }
  }), []);

  const PHASES_ORDER = useMemo(() => [
    'FOUNDATION',
    'CONCEPT_MASTERY',
    'ADVANCED_PREPARATION',
    'MOCK_TEST_PHASE',
    'FINAL_REVISION'
  ] as const, []);

  const currentPhaseId = useMemo(() => {
    const uniqueChapters = analytics?.analytics?.overall?.uniqueChaptersAttempted ?? 0;
    const totalQuizAttempts = analytics?.analytics?.overall?.totalAttempts ?? 0;
    const mockAttempts = dashboardData?.total_attempts ?? 0;
    const strongChapters = mastery.filter(chap => chap.state === 'STRONG' || chap.state === 'MASTERED').length;
    
    if (daysUntilExam <= THRESHOLDS.FINAL_REVISION.MAX_DAYS_REMAINING && uniqueChapters >= THRESHOLDS.FINAL_REVISION.MIN_CHAPTERS) {
      return 'FINAL_REVISION';
    }
    if (uniqueChapters >= THRESHOLDS.MOCK_TEST_PHASE.MIN_CHAPTERS && mockAttempts >= THRESHOLDS.MOCK_TEST_PHASE.MIN_MOCK_ATTEMPTS) {
      return 'MOCK_TEST_PHASE';
    }
    if (uniqueChapters >= THRESHOLDS.ADVANCED_PREPARATION.MIN_CHAPTERS && 
        totalQuizAttempts >= THRESHOLDS.ADVANCED_PREPARATION.MIN_QUIZ_ATTEMPTS && 
        strongChapters >= THRESHOLDS.ADVANCED_PREPARATION.MIN_STRONG_CHAPTERS) {
      return 'ADVANCED_PREPARATION';
    }
    if (uniqueChapters >= THRESHOLDS.CONCEPT_MASTERY.MIN_CHAPTERS && 
        totalQuizAttempts >= THRESHOLDS.CONCEPT_MASTERY.MIN_QUIZ_ATTEMPTS) {
      return 'CONCEPT_MASTERY';
    }
    return 'FOUNDATION';
  }, [analytics, mastery, dashboardData, daysUntilExam, THRESHOLDS]);

  const completedLessonsCount = dashboardData?.completed_lessons_count ?? 0;
  const overallReadiness = dashboardData?.overallReadiness ?? 0;

  const getPhaseDetails = (phaseId: typeof PHASES_ORDER[number]) => {
    const uniqueChapters = analytics?.analytics?.overall?.uniqueChaptersAttempted ?? 0;
    const totalQuizAttempts = analytics?.analytics?.overall?.totalAttempts ?? 0;
    const mockAttempts = dashboardData?.total_attempts ?? 0;
    const strongChapters = mastery.filter(chap => chap.state === 'STRONG' || chap.state === 'MASTERED').length;

    switch (phaseId) {
      case 'FOUNDATION':
        return {
          title: 'Foundation Phase',
          timeline: 'Months 1–3 (Kickoff)',
          description: 'You are establishing your baseline subject understanding and generating early learning evidence.',
          progressVal: uniqueChapters >= THRESHOLDS.CONCEPT_MASTERY.MIN_CHAPTERS ? 100 : Math.round((uniqueChapters / THRESHOLDS.CONCEPT_MASTERY.MIN_CHAPTERS) * 100),
          requirements: `${Math.min(THRESHOLDS.CONCEPT_MASTERY.MIN_CHAPTERS, uniqueChapters)} / ${THRESHOLDS.CONCEPT_MASTERY.MIN_CHAPTERS} Chapters Evaluated`,
          evidence: [
            `✓ ${completedLessonsCount} Smart Lessons completed`,
            `✓ ${uniqueChapters} unique chapters evaluated via quizzes`,
            `✓ ${totalQuizAttempts} total quiz questions attempted`
          ]
        };
      case 'CONCEPT_MASTERY':
        return {
          title: 'Concept Mastery',
          timeline: 'Months 4–6 (Core Concepts)',
          description: 'You are actively building syllabus coverage and strengthening chapter-level accuracies.',
          progressVal: uniqueChapters >= THRESHOLDS.ADVANCED_PREPARATION.MIN_CHAPTERS ? 100 : Math.round((uniqueChapters / THRESHOLDS.ADVANCED_PREPARATION.MIN_CHAPTERS) * 100),
          requirements: `${Math.min(THRESHOLDS.ADVANCED_PREPARATION.MIN_CHAPTERS, uniqueChapters)} / ${THRESHOLDS.ADVANCED_PREPARATION.MIN_CHAPTERS} Chapters Evaluated`,
          evidence: [
            `✓ ${strongChapters} chapters at Strong or Mastered state`,
            `✓ Overall syllabus readiness score at ${overallReadiness}%`,
            `✓ Dedicated Weak Area Polish active`
          ]
        };
      case 'ADVANCED_PREPARATION':
        return {
          title: 'Advanced Preparation',
          timeline: 'Months 7–8 (Syllabus Completion)',
          description: 'You are deep-diving into complex concepts, resolving weak topics, and scheduling spaced revisions.',
          progressVal: uniqueChapters >= THRESHOLDS.MOCK_TEST_PHASE.MIN_CHAPTERS ? 100 : Math.round((uniqueChapters / THRESHOLDS.MOCK_TEST_PHASE.MIN_CHAPTERS) * 100),
          requirements: `${Math.min(THRESHOLDS.MOCK_TEST_PHASE.MIN_CHAPTERS, uniqueChapters)} / ${THRESHOLDS.MOCK_TEST_PHASE.MIN_CHAPTERS} Chapters Evaluated`,
          evidence: [
            `✓ Spaced repetition system managing ${mastery.length} chapters`,
            `✓ Focused Weak Area review sessions active`,
            `✓ Direct student interaction surface active`
          ]
        };
      case 'MOCK_TEST_PHASE':
        return {
          title: 'Mock Test Phase',
          timeline: 'Months 9–10 (Exam Simulation)',
          description: 'You are simulating exam scenarios, practicing full-length mock papers, and refining time-management skills.',
          progressVal: mockAttempts >= THRESHOLDS.MOCK_TEST_PHASE.MIN_MOCK_ATTEMPTS ? 100 : Math.round((mockAttempts / THRESHOLDS.MOCK_TEST_PHASE.MIN_MOCK_ATTEMPTS) * 100),
          requirements: `${Math.min(THRESHOLDS.MOCK_TEST_PHASE.MIN_MOCK_ATTEMPTS, mockAttempts)} / ${THRESHOLDS.MOCK_TEST_PHASE.MIN_MOCK_ATTEMPTS} Mocks Completed`,
          evidence: [
            `✓ ${mockAttempts} full mock tests attempted`,
            `✓ Interactive performance analysis active`,
            `✓ Post-mock revision workflows generated`
          ]
        };
      case 'FINAL_REVISION':
        return {
          title: 'Final Revision',
          timeline: 'Month 11 (Last 30 Days)',
          description: 'You are in the final 30-day pre-exam stretch. Focus is on high-yield topic reviews and previous years papers.',
          progressVal: daysUntilExam <= THRESHOLDS.FINAL_REVISION.MAX_DAYS_REMAINING ? Math.round(((30 - daysUntilExam) / 30) * 100) : 0,
          requirements: daysUntilExam <= 30 ? `${30 - daysUntilExam} Days in Revision Window` : 'Locked until 30 days before exam',
          evidence: [
            `✓ Target exam: ${examLabel} scheduled on 7 June 2027`,
            `✓ ${daysUntilExam} days remaining until exam day`,
            `✓ Rapid revision queues optimized`
          ]
        };
    }
  };

  const selectedFocusAreas = useMemo(() => {
    if (loading || !weaknessesAvailable || !weaknessAnalysis) return [];
    return selectFocusAreas(
      weaknessAnalysis.weakChapters || [],
      weaknessAnalysis.weakTopics || []
    );
  }, [loading, weaknessesAvailable, weaknessAnalysis]);

  // Check if mastery failed to load (loading completed but mastery array is empty)
  const isMasteryFailed = !loading && mastery.length === 0;

  const preparationProgress = useMemo(() => {
    if (isMasteryFailed) return null;
    if (!hasSlsData) return 0;
    const sum = mastery.reduce((acc, chap) => acc + (chap.masteryScore || 0), 0);
    return mastery.length > 0 ? Math.round(sum / mastery.length) : 0;
  }, [mastery, hasSlsData, isMasteryFailed]);

  const chaptersMastered = useMemo(() => {
    if (isMasteryFailed) return null;
    if (!hasSlsData) return 0;
    return mastery.filter(chap => chap.state === 'MASTERED').length;
  }, [mastery, hasSlsData, isMasteryFailed]);

  const totalChapters = useMemo(() => {
    if (isMasteryFailed) return null;
    return mastery.length > 0 ? mastery.length : 78;
  }, [mastery, isMasteryFailed]);

  const stage = useMemo(() => {
    if (isMasteryFailed) return 'Unavailable';
    if (preparationProgress === null) return 'Getting Started';
    return getPreparationStage(preparationProgress);
  }, [preparationProgress, isMasteryFailed]);

  const supportingMessage = useMemo(() => {
    if (isMasteryFailed) {
      return 'Progress data is temporarily unavailable.';
    }
    if (!hasSlsData) {
      return 'Complete your first Smart Lesson quiz to start building your preparation profile.';
    }
    return 'Based on mastery across your IAT syllabus';
  }, [isMasteryFailed, hasSlsData]);

  const subjectsConfig = useMemo(() => [
    { name: 'Physics', icon: Calculator, color: 'text-blue-400', bg: 'bg-blue-400' },
    { name: 'Chemistry', icon: Beaker, color: 'text-rose-400', bg: 'bg-rose-400' },
    { name: 'Mathematics', icon: Target, color: 'text-amber-400', bg: 'bg-amber-400' },
    { name: 'Biology', icon: Dna, color: 'text-emerald-400', bg: 'bg-emerald-400' },
  ], []);

  const subjectProgressList = useMemo(() => {
    if (loading || isMasteryFailed) return [];
    return subjectsConfig.map((sub) => {
      const data = calculateSubjectProgress(mastery, sub.name);
      return {
        ...sub,
        data,
      };
    });
  }, [mastery, loading, isMasteryFailed, subjectsConfig]);

  useEffect(() => {
    if (!loading) {
      console.log('[PathToIISER SLS Verification]', {
        totalAttempts: analytics?.analytics?.overall?.totalAttempts ?? 0,
        masteryChaptersCount: mastery.length,
        recommendationsCount: recommendations.length,
        detectedWeaknessesCount: weaknessAnalysis?.weakTopics?.length ?? 0,
        hasSlsData
      });
    }
  }, [loading, analytics, mastery, recommendations, weaknessAnalysis, hasSlsData]);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
      {/* 1. PAGE HEADER & HERO CARD */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0C16] border border-white/10 p-8 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50 translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Your Journey Map</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4">
                My Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">IISER</span>
              </h1>
              <p className="text-lg text-white/60 max-w-md">
                Your personalized journey towards IISER admission. I know exactly where I am and what I need to do next.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-white/40 mb-1">Target Exam</p>
                <p className="font-semibold text-white">{examLabel}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-white/40 mb-1">Target Institute</p>
                <p className="font-semibold text-white">IISER Pune</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-white/40 mb-1">Days Remaining</p>
                <p className="font-semibold text-cyan-400">{daysUntilExam}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs text-white/40 mb-1">Current Level</p>
                <p className="font-semibold text-emerald-400">🌱 Beginner</p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center">
            <div className="p-6 lg:p-8 rounded-3xl bg-[#05060F]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                  <p className="text-sm font-medium text-white/50 mb-1">Preparation Progress</p>
                  {loading ? (
                    <div className="h-10 w-24 bg-white/10 rounded animate-pulse mt-1" />
                  ) : isMasteryFailed ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-display font-bold text-white tracking-tighter">—</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-display font-bold text-white tracking-tighter">
                        {preparationProgress}
                      </span>
                      <span className="text-2xl font-bold text-cyan-400">%</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white/50 mb-1">Chapters Mastered</p>
                  {loading ? (
                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse mt-1 ml-auto" />
                  ) : isMasteryFailed ? (
                    <p className="text-2xl font-display font-bold text-white/80">—</p>
                  ) : (
                    <p className="text-2xl font-display font-bold text-white/80">
                      {chaptersMastered} <span className="text-sm text-white/40">/ {totalChapters}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Line */}
              <div className="relative h-2 w-full bg-white/10 rounded-full mb-4 z-10 overflow-hidden">
                {!loading && !isMasteryFailed && preparationProgress !== null && (
                  <>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, preparationProgress))}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-cyan-300 rounded-full"
                    />
                    <motion.div
                      initial={{ left: 0 }}
                      animate={{ left: `${Math.min(100, Math.max(0, preparationProgress))}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                  </>
                )}
              </div>

              <div className="text-[11px] font-semibold text-white/40 mb-8 relative z-10 leading-normal">
                {supportingMessage}
              </div>

              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-4 relative z-10">
                <Compass className="w-8 h-8 text-indigo-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-indigo-300/70 mb-1">Current Position</p>
                  {loading ? (
                    <div className="h-5 w-40 bg-white/10 rounded animate-pulse" />
                  ) : (
                    <p className="text-sm font-bold text-indigo-100">{stage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Journey & Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. TODAY'S NEXT STEP */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 relative overflow-hidden group hover:border-indigo-400/50 transition-all">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,210,255,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
            
            {loading || planLoading ? (
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between animate-pulse">
                <div className="space-y-4 flex-1">
                  <div className="h-5 w-32 bg-white/10 rounded" />
                  <div className="space-y-2">
                    <div className="h-8 w-64 bg-white/10 rounded" />
                    <div className="h-4 w-48 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="h-14 w-48 bg-white/10 rounded-2xl" />
              </div>
            ) : plan?.primaryAction && plan.primaryAction.type !== 'NO_ACTION' ? (() => {
              const nextAction = plan.primaryAction;
              const label = nextAction.type.replace(/_/g, ' ');
              const cta = nextAction.ctaLabel;
              const priorityText = nextAction.priorityBand.charAt(0).toUpperCase() + nextAction.priorityBand.slice(1).toLowerCase() + ' Priority';

              const handleActionClick = () => {
                if (nextAction.id) {
                  markMissionCompleted(nextAction.id);
                }
                if (nextAction.route) {
                  onNavigate?.(nextAction.route);
                }
              };

              return (
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                      <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">Your Next Action</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 mb-2 uppercase tracking-wide">
                        {label}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-indigo-400" /> {nextAction.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-semibold text-white/50">
                        <span className="capitalize">{nextAction.subject}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-cyan-400">{priorityText}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleActionClick}
                    className="whitespace-nowrap px-8 py-4 bg-white text-[#0A0C16] hover:bg-white/90 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                  >
                    {cta}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })() : !recommendationsAvailable ? (
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">Your Next Action</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Recommendations Temporarily Unavailable
                    </h3>
                    <p className="text-sm text-white/50 font-medium">
                      You can continue studying from Smart Lessons.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="whitespace-nowrap px-8 py-4 bg-white text-[#0A0C16] hover:bg-white/90 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                >
                  Open Smart Lessons
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : recommendations.length === 0 || !hasSlsData ? (
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">Your Next Action</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Start Your First Smart Lesson
                    </h3>
                    <p className="text-sm text-white/50 font-medium">
                      Complete a chapter quiz to begin building your personalized learning path.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="whitespace-nowrap px-8 py-4 bg-white text-[#0A0C16] hover:bg-white/90 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                >
                  Explore Smart Lessons
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (() => {
              const nextAction = recommendations[0];
              const label = getRecommendationLabel(nextAction.actionType);
              const cta = getRecommendationCta(nextAction.actionType);
              const urgencyText = getUrgencyText(nextAction.urgency);

              const handleActionClick = () => {
                const chapterId = nextAction.chapterId;
                if (!chapterId) {
                  onNavigate?.('smart_lessons');
                  return;
                }
                if (nextAction.actionType === 'RETRY_CHAPTER_QUIZ') {
                  onNavigate?.(`/smart-lessons/${chapterId}::quiz`);
                } else {
                  onNavigate?.(`/smart-lessons/${chapterId}`);
                }
              };

              return (
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                      <span className="text-sm font-bold text-amber-400 tracking-wider uppercase">Your Next Action</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 mb-2 uppercase tracking-wide">
                        {label}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-indigo-400" /> {nextAction.chapterTitle || nextAction.chapterId}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-semibold text-white/50">
                        <span className="capitalize">{nextAction.subject}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-cyan-400">{urgencyText}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleActionClick}
                    className="whitespace-nowrap px-8 py-4 bg-white text-[#0A0C16] hover:bg-white/90 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                  >
                    {cta} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })()}
          </div>

          {/* 3. JOURNEY MILESTONES */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">Preparation Journey</h3>
              <p className="text-xs text-white/40 mt-1">Tracks your progression across the complete preparation lifecycle</p>
            </div>

            {/* Stepper Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {PHASES_ORDER.map((phaseId, index) => {
                const isCurrent = phaseId === currentPhaseId;
                const isCompleted = PHASES_ORDER.indexOf(phaseId) < PHASES_ORDER.indexOf(currentPhaseId);
                const isUpcoming = PHASES_ORDER.indexOf(phaseId) === PHASES_ORDER.indexOf(currentPhaseId) + 1;
                const isLocked = PHASES_ORDER.indexOf(phaseId) > PHASES_ORDER.indexOf(currentPhaseId) + 1;

                const details = getPhaseDetails(phaseId);
                const isSelected = selectedPhaseId ? selectedPhaseId === phaseId : isCurrent;

                // Select icon
                let Icon = BookOpen;
                if (phaseId === 'FOUNDATION') Icon = Map;
                else if (phaseId === 'CONCEPT_MASTERY') Icon = Calculator;
                else if (phaseId === 'ADVANCED_PREPARATION') Icon = Trophy;
                else if (phaseId === 'MOCK_TEST_PHASE') Icon = Target;
                else if (phaseId === 'FINAL_REVISION') Icon = Flag;

                return (
                  <button
                    key={phaseId}
                    onClick={() => setSelectedPhaseId(phaseId)}
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-expanded={isSelected}
                    className={cn(
                      "relative p-4 rounded-2xl text-left transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-purple-500/50 flex flex-col justify-between border min-h-[110px] md:min-h-[120px]",
                      isSelected
                        ? "bg-purple-500/5 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]"
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center border",
                        isCompleted ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                        isCurrent ? "bg-purple-500/15 border-purple-500/30 text-purple-400" :
                        "bg-white/5 border-white/5 text-white/30"
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Status indicator */}
                      <span className={cn(
                        "text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
                        isCompleted ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                        isCurrent ? "bg-purple-500/15 border-purple-500/30 text-purple-300 animate-pulse" :
                        isUpcoming ? "bg-blue-500/5 border-blue-500/10 text-blue-400/80" :
                        "bg-white/[0.02] border-white/5 text-white/20"
                      )}>
                        {isCompleted ? 'Done' : isCurrent ? 'Active' : isUpcoming ? 'Next' : 'Locked'}
                      </span>
                    </div>

                    <div>
                      <h4 className={cn(
                        "text-[10px] md:text-xs font-bold leading-tight mt-1.5 whitespace-normal break-words",
                        isLocked ? "text-white/20" : "text-white"
                      )}>
                        {details.title}
                      </h4>
                      
                      {/* Small progress bar if active or done */}
                      {(isCompleted || isCurrent) && details.progressVal !== null && (
                        <div className="mt-2.5 space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-white/35 font-bold">
                            <span>Progress</span>
                            <span>{details.progressVal}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                isCompleted ? "bg-emerald-500" : "bg-purple-500"
                              )}
                              style={{ width: `${details.progressVal}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected/Current Phase Expanded Details */}
            {(() => {
              const activeId = selectedPhaseId || currentPhaseId;
              const details = getPhaseDetails(activeId);
              const isCurrent = activeId === currentPhaseId;
              const isCompleted = PHASES_ORDER.indexOf(activeId) < PHASES_ORDER.indexOf(currentPhaseId);
              const isUpcoming = activeId === currentPhaseId + 1;
              const isLocked = PHASES_ORDER.indexOf(activeId) > PHASES_ORDER.indexOf(currentPhaseId) + 1;

              return (
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/6 space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-purple-400">
                        {isCurrent ? 'Current Lifecycle Phase' : isCompleted ? 'Completed Lifecycle Phase' : 'Future Lifecycle Phase'}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <h4 className="text-lg font-display font-bold text-white">{details.title}</h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">
                          Timeline: {details.timeline}
                        </span>
                      </div>
                    </div>

                    {details.progressVal !== null && (
                      <div className="text-right">
                        <span className="text-[10px] text-white/40 block font-medium">Phase Completeness</span>
                        <span className="text-lg font-display font-black text-white">{details.progressVal}%</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-white/55 leading-relaxed">{details.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-wider text-white/30 mb-2.5">Verification Criteria</h5>
                      <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-white/60 font-semibold">
                        {details.requirements}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-wider text-white/30 mb-2.5">Lifecycle Evidence Logs</h5>
                      <ul className="space-y-2">
                        {details.evidence.map((ev, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                            <span className="text-purple-400">•</span>
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          
        </div>

        {/* RIGHT COLUMN: Sidebar Stats */}
        <div className="space-y-6">

          {/* SUBJECT JOURNEY */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10">
            <h3 className="text-lg font-display font-bold text-white mb-6">Subject Progress</h3>
            
            {loading ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-white/10 rounded" />
                      <div className="h-4 w-8 bg-white/10 rounded" />
                    </div>
                    <div className="h-3 w-40 bg-white/10 rounded" />
                    <div className="flex gap-1 h-2">
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <div key={idx} className="h-full flex-1 bg-white/5 rounded-sm" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : isMasteryFailed ? (
              <div className="text-sm font-medium text-white/40 leading-normal">
                Progress data temporarily unavailable.
              </div>
            ) : (
              <div className="space-y-6">
                {subjectProgressList.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <subject.icon className={cn("w-4 h-4", subject.color)} />
                        <span className="text-sm font-medium text-white/80">{subject.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{subject.data.progress}%</span>
                    </div>
                    <div className="text-xs text-white/40 mb-2 font-medium">
                      {subject.data.attemptedChapters} / {subject.data.totalChapters} attempted · {subject.data.masteredChapters} mastered
                    </div>
                    <div className="flex gap-1 h-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-full flex-1 rounded-sm transition-all",
                            i < Math.round(Math.min(100, Math.max(0, subject.data.progress)) / 10) ? subject.bg : "bg-white/10"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SMART RECOMMENDATIONS */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10">
            <h3 className="text-lg font-display font-bold text-white mb-4">Focus Areas</h3>
            
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-40 bg-white/10 rounded" />
                      <div className="h-3 w-32 bg-white/10 rounded" />
                    </div>
                    <div className="h-6 w-16 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            ) : !weaknessesAvailable ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-white/40 leading-normal">
                  Focus area data temporarily unavailable.
                </p>
                <button
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                >
                  Open Smart Lessons <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : !hasSlsData ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-white/40 leading-normal">
                  Complete your first chapter quiz to discover areas that need improvement.
                </p>
                <button
                  onClick={() => onNavigate?.('smart_lessons')}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                >
                  Explore Smart Lessons <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : selectedFocusAreas.length === 0 ? (
              <p className="text-sm font-medium text-white/40 leading-normal">
                No major weak areas detected. Keep learning and practicing to build stronger mastery.
              </p>
            ) : (
              <div className="space-y-3">
                {selectedFocusAreas.map((item) => {
                  const chapterTitle = LESSONS_DATA.find(l => l.id === item.chapterId)?.title || item.chapterId;
                  const reason = getWeaknessReason(item.reasons);
                  const severityLabel = getSeverityLabel(item.severity);
                  const severityStyle = getSeverityBadgeStyle(item.severity);

                  return (
                    <div 
                      key={item.id} 
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 group/item hover:bg-white/[0.07] transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-sm">{chapterTitle}</h4>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", severityStyle)}>
                            {severityLabel}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">{reason}</p>
                      </div>
                      <button
                        onClick={() => onNavigate?.(`/smart-lessons/${item.chapterId}`)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 shrink-0 group/btn"
                      >
                        Review <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

           {/* MOTIVATION SECTION */}
           <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/10">
             <h3 className="text-lg font-display font-bold text-white mb-4">Journey Stats</h3>
             
             {loading ? (
               <div className="grid grid-cols-2 gap-3 mb-4 animate-pulse">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                     <div className="h-8 w-12 bg-white/10 rounded mb-2" />
                     <div className="h-3 w-20 bg-white/10 rounded" />
                   </div>
                 ))}
               </div>
             ) : (() => {
               const quizAttempts = !analyticsAvailable 
                 ? '—' 
                 : (!hasSlsData ? 0 : (analytics?.analytics?.overall?.totalAttempts ?? 0));

               const questionsAnswered = !analyticsAvailable 
                 ? '—' 
                 : (!hasSlsData ? 0 : (analytics?.analytics?.overall?.totalQuestionsAttempted ?? 0));

               const chaptersStudied = !analyticsAvailable 
                 ? '—' 
                 : (!hasSlsData ? 0 : (analytics?.analytics?.overall?.uniqueChaptersAttempted ?? 0));

               const chaptersMasteredValue = !masteryAvailable || isMasteryFailed
                 ? '—' 
                 : (!hasSlsData ? 0 : (chaptersMastered ?? 0));

               return (
                 <div className="grid grid-cols-2 gap-3 mb-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-white mb-1">{quizAttempts}</span>
                     <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Quiz Attempts</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-white mb-1">{questionsAnswered}</span>
                     <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Questions Answered</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-white mb-1">{chaptersStudied}</span>
                     <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Chapters Studied</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-white mb-1">{chaptersMasteredValue}</span>
                     <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Chapters Mastered</span>
                   </div>
                 </div>
               );
             })()}
           </div>

        </div>
      </div>

      <div className="mt-8 border-t border-white/5 pt-8">
        <Footer />
      </div>
    </div>
  );
}
