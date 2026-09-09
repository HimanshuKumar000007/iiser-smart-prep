import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  BookOpen,
  Calculator,
  Beaker,
  Dna,
  Map,
  Zap,
  Calendar,
  Star,
  Trophy,
  TrendingUp,
  Compass,
  Flag,
  Sparkles,
  Clock,
  RotateCcw,
  Check,
  ChevronRight,
  School,
  Award,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  CheckSquare,
  Square,
  MessageSquare,
  Atom,
  Flame,
  Layers,
  GraduationCap,
  Sunrise,
  Sunset,
  Sun,
  Moon,
  ShieldAlert,
  Crosshair,
  BarChart3,
  Activity,
  X,
  Info,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { useSlsMyPath } from '../../hooks/useSlsMyPath';
import { useTheme } from '../../context/ThemeContext';
import {
  AiOnboardingAnswers,
  AiGeneratedStudyPlan,
  TARGET_INSTITUTES,
  STREAMS,
  STAGES,
  SUBJECT_OPTIONS,
  WEAKNESS_HURDLES,
  STUDY_HOURS,
  TARGET_AIRS,
  getStoredAiStudyPlan,
  saveAiStudyPlan,
  generateAiStudyPlan,
  buildDeterministicStudyPlan,
  isDailyActionCompleted,
  setDailyActionCompleted,
  getSavedChecklistState,
  saveChecklistState,
  resolveLessonTarget,
  DailyTimeSlot,
  DaySchedulePlan,
  WeakAreaDiagnosis,
  getSavedSchedulePreference,
  saveSchedulePreference,
  getSavedSlotStates,
  saveSlotState,
  getSavedMissionSteps,
  saveMissionStep,
  generate7DaySchedule,
  getSynthesizedWeakAreas
} from './aiPathGenerator';

interface PathToIISERProps {
  onNavigate?: (view: string) => void;
  dashboardData?: any;
  dashboardLoading?: boolean;
  actionPlan?: any;
  actionPlanLoading?: boolean;
}

export function PathToIISER({
  onNavigate,
  dashboardData,
  dashboardLoading,
  actionPlan: plan,
  actionPlanLoading: planLoading
}: PathToIISERProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // ── Plan & Calibration State ───────────────────────────────────────────
  const [aiPlan, setAiPlan] = useState<AiGeneratedStudyPlan>(() => {
    let p = getStoredAiStudyPlan();
    if (!p) {
      const defaultAnswers: AiOnboardingAnswers = {
        targetInstitute: 'IISc Bangalore',
        targetYear: '2027',
        stream: 'PCB',
        currentStage: 'STARTING',
        strongSubject: 'Biology',
        weakSubject: 'Mathematics',
        weakTopicHurdle: 'Matrices, Determinants & System of Equations',
        dailyHours: 5,
        targetAir: 'Top 100 AIR'
      };
      p = buildDeterministicStudyPlan(defaultAnswers, 'Himanshu');
      saveAiStudyPlan(p);
    } else {
      // Ensure target institute reflects onboarding selection
      if (!p.answers.targetInstitute || p.answers.targetInstitute === 'IISER Pune') {
        p.answers.targetInstitute = 'IISc Bangalore';
        p.answers.stream = p.answers.stream || 'PCB';
        p.answers.dailyHours = p.answers.dailyHours || 5;
        p.answers.targetAir = p.answers.targetAir || 'Top 100 AIR';
        saveAiStudyPlan(p);
      }
    }
    return p;
  });

  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStepText, setGenerationStepText] = useState<string>('Analyzing your academic stream...');
  const [showPriorityModal, setShowPriorityModal] = useState<boolean>(false);

  // ── Onboarding Wizard Answers ──────────────────────────────────────────
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardAnswers, setWizardAnswers] = useState<AiOnboardingAnswers>(() => {
    const existing = aiPlan?.answers;
    return existing || {
      targetInstitute: 'IISc Bangalore',
      targetYear: '2027',
      stream: 'PCB',
      currentStage: 'STARTING',
      strongSubject: 'Biology',
      weakSubject: 'Mathematics',
      weakTopicHurdle: 'Matrices, Determinants & System of Equations',
      dailyHours: 5,
      targetAir: 'Top 100 AIR'
    };
  });

  // ── Interactive Action States ──────────────────────────────────────────
  const [dailyCompleted, setDailyCompleted] = useState<boolean>(() => {
    return aiPlan ? isDailyActionCompleted(aiPlan.id) : false;
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => getSavedChecklistState());
  const [activePhaseTab, setActivePhaseTab] = useState<string>('PHASE_1');

  // ── Mission Sub-Steps State ───────────────────────────────────────────
  const [missionStepsState, setMissionStepsState] = useState<Record<string, boolean>>(() => getSavedMissionSteps());

  // Calculations for Today's Mission Sub-Steps
  const subSteps = aiPlan.dailyAction.subSteps || [];
  const completedSubStepsCount = subSteps.filter(s => !!missionStepsState[s.id]).length;
  const subStepsPercent = subSteps.length > 0 ? Math.round((completedSubStepsCount / subSteps.length) * 100) : 0;

  const handleToggleMissionStep = (stepId: string) => {
    setMissionStepsState(prev => {
      const nextVal = !prev[stepId];
      const next = { ...prev, [stepId]: nextVal };
      saveMissionStep(stepId, nextVal);
      // Auto-sync daily completed if all sub-steps are done
      const allDone = subSteps.length > 0 && subSteps.every(s => next[s.id]);
      if (allDone && !dailyCompleted) {
        setDailyCompleted(true);
        if (aiPlan) setDailyActionCompleted(aiPlan.id, true);
      } else if (!allDone && dailyCompleted) {
        setDailyCompleted(false);
        if (aiPlan) setDailyActionCompleted(aiPlan.id, false);
      }
      return next;
    });
  };

  // Toggle Daily Mission Completed (and sync sub-steps)
  const handleToggleDailyMission = () => {
    if (!aiPlan) return;
    const nextState = !dailyCompleted;
    setDailyCompleted(nextState);
    setDailyActionCompleted(aiPlan.id, nextState);
    // Sync all sub-steps
    const updatedSteps: Record<string, boolean> = {};
    subSteps.forEach(s => {
      updatedSteps[s.id] = nextState;
      saveMissionStep(s.id, nextState);
    });
    setMissionStepsState(prev => ({ ...prev, ...updatedSteps }));
  };

  // ── SLS Live Intelligence Integration ─────────────────────────────────
  const {
    weaknessAnalysis,
    analytics,
    masterySummary,
    hasSlsData
  } = useSlsMyPath();

  // ── Daily Schedule State & Preference ──────────────────────────────────
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<number>(1);
  const [schedulePref, setSchedulePref] = useState<'MORNING' | 'EVENING'>(() => getSavedSchedulePreference());
  const [slotStates, setSlotStates] = useState<Record<string, boolean>>(() => getSavedSlotStates());

  const handleToggleSlot = (slotId: string) => {
    setSlotStates(prev => {
      const next = { ...prev, [slotId]: !prev[slotId] };
      saveSlotState(slotId, next[slotId]);
      return next;
    });
  };

  const handleToggleSchedulePref = (pref: 'MORNING' | 'EVENING') => {
    setSchedulePref(pref);
    saveSchedulePreference(pref);
  };

  // ── 7-Day Schedule Memo ────────────────────────────────────────────────
  const sevenDaySchedule = useMemo<DaySchedulePlan[]>(() => {
    if (aiPlan?.sevenDaySchedule && aiPlan.sevenDaySchedule.length === 7) {
      return aiPlan.sevenDaySchedule;
    }
    if (aiPlan?.answers) {
      return generate7DaySchedule(aiPlan.answers);
    }
    return [];
  }, [aiPlan]);

  const activeDayPlan = useMemo<DaySchedulePlan | null>(() => {
    if (!sevenDaySchedule || sevenDaySchedule.length === 0) return null;
    return sevenDaySchedule.find(d => d.dayNumber === selectedScheduleDay) || sevenDaySchedule[0];
  }, [sevenDaySchedule, selectedScheduleDay]);

  const activeSlots = useMemo<DailyTimeSlot[]>(() => {
    if (!activeDayPlan) return [];
    return schedulePref === 'MORNING' ? activeDayPlan.morningSlots : activeDayPlan.eveningSlots;
  }, [activeDayPlan, schedulePref]);

  // Days left dynamic countdown (~271 days to June 2027)
  const daysUntilExam = useMemo(() => {
    const EXAM_DATE = new Date('2027-06-07T00:00:00');
    const today = new Date();
    const diffTime = EXAM_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  const storedUserName = useMemo(() => {
    return dashboardData?.displayName || localStorage.getItem('currentUser') || 'Himanshu';
  }, [dashboardData]);

  // Handle Generating AI Plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const steps = [
      `Analyzing ${wizardAnswers.stream} academic background...`,
      `Formulating high-yield scoring tactics for ${wizardAnswers.targetInstitute}...`,
      `Balancing ${wizardAnswers.dailyHours} daily hours across all 4 subjects...`,
      `Structuring 4-phase milestones towards ${wizardAnswers.targetAir}...`
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setGenerationStepText(steps[stepIdx]);
      }
    }, 700);

    try {
      const newPlan = await generateAiStudyPlan(wizardAnswers, storedUserName);
      clearInterval(interval);
      setAiPlan(newPlan);
      setIsGenerating(false);
      setIsCalibrating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      setIsCalibrating(false);
    }
  };

  // Toggle Weekly Checklist Item
  const handleToggleChecklistItem = (id: string) => {
    setChecklist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecklistState(next);
      return next;
    });
  };

  // ══════════════════════════════════════════════════════════════════════════
  // 1. AI GENERATION ANIMATED LOADING SCREEN
  // ══════════════════════════════════════════════════════════════════════════
  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto w-full min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-8 animate-in fade-in duration-300">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_50px_rgba(6,182,212,0.45)] border border-white/20 animate-pulse">
            <Sparkles className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#0b0e24] border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg">
            <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Synthesizing Your IISER Roadmap
          </h2>
          <p className="text-sm text-cyan-400 font-mono tracking-wide flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{generationStepText}</span>
          </p>
          <p className="text-xs text-white/50 leading-relaxed pt-2">
            Calibrating subject weightages, non-calculus scoring shortcuts, and phase targets powered by NVIDIA AI.
          </p>
        </div>

        <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. INTERACTIVE ONBOARDING / CALIBRATION WIZARD
  // ══════════════════════════════════════════════════════════════════════════
  if (isCalibrating) {
    return (
      <div className="max-w-4xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-20 animate-in fade-in duration-300">
        
        {/* Wizard Header */}
        <div className={cn(
          "p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl shadow-2xl",
          isLight 
            ? "bg-white/90 border-slate-200 shadow-slate-200/50" 
            : "bg-[#0b0e24]/90 border-indigo-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(99,102,241,0.1)]"
        )}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Preparation Architect</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Calibrate Your Path to IISER
              </h1>
              <p className={cn("text-xs sm:text-sm mt-1", isLight ? "text-slate-600" : "text-white/60")}>
                Update your stream, dream institute, study commitment, or weak areas to adjust your roadmap.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCalibrating(false)}
              className="self-start sm:self-auto text-xs px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer"
            >
              Cancel & View Existing Plan
            </button>
          </div>

          {/* 6-Step Indicator Pills */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 mb-8 overflow-x-auto pb-1">
            {[
              { num: 1, label: 'Target College' },
              { num: 2, label: 'Your Stream' },
              { num: 3, label: 'Current Stage' },
              { num: 4, label: 'Subject Balance' },
              { num: 5, label: 'Study Hours' },
              { num: 6, label: 'Target AIR' },
            ].map(s => {
              const isActive = wizardStep === s.num;
              const isPast = wizardStep > s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => setWizardStep(s.num)}
                  className={cn(
                    "flex-1 min-w-[50px] sm:min-w-[80px] p-2 rounded-xl border text-center transition-all cursor-pointer select-none",
                    isActive
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      : isPast
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="text-[10px] font-mono font-bold flex items-center justify-center gap-1">
                    {isPast ? <Check className="w-3 h-3" /> : `STEP ${s.num}`}
                  </div>
                  <div className="text-[11px] font-semibold truncate hidden sm:block mt-0.5">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── STEP 1: TARGET INSTITUTE ── */}
          {wizardStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  1. Which Premier Institute is your target destination?
                </h3>
                <p className="text-xs text-white/50">
                  Target selection determines the composite marks and percentile threshold required in IAT 2027.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {TARGET_INSTITUTES.map((inst) => {
                  const isSelected = wizardAnswers.targetInstitute === inst.id;
                  return (
                    <div
                      key={inst.id}
                      onClick={() => setWizardAnswers(prev => ({ ...prev, targetInstitute: inst.id }))}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between gap-3 group",
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                          : "bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold text-sm sm:text-base", isSelected ? "text-cyan-300" : "text-white")}>
                            {inst.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white/70">
                            {inst.badge}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">{inst.tag}</p>
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold block">{inst.rank}</span>
                      </div>

                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold" : "border-white/20"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 2: STREAM ── */}
          {wizardStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  2. What is your Academic Stream / Subject Background?
                </h3>
                <p className="text-xs text-white/50">
                  Allows SmartPrep to formulate your 4th-subject scoring strategy (e.g. Non-Calculus Math for PCB).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {STREAMS.map((s) => {
                  const isSelected = wizardAnswers.stream === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setWizardAnswers(prev => ({ ...prev, stream: s.id }))}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between gap-3 group",
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                          : "bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold text-sm sm:text-base", isSelected ? "text-cyan-300" : "text-white")}>
                            {s.title}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {s.tag}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">{s.subtitle}</p>
                        <p className="text-[11px] text-white/70 pt-1 leading-relaxed">{s.desc}</p>
                      </div>

                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold" : "border-white/20"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 3: CURRENT STAGE ── */}
          {wizardStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  3. Where are you currently in your preparation?
                </h3>
                <p className="text-xs text-white/50">
                  Configures your baseline phase and question difficulty weighting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {STAGES.map((st) => {
                  const isSelected = wizardAnswers.currentStage === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setWizardAnswers(prev => ({ ...prev, currentStage: st.id }))}
                      className={cn(
                        "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left group min-h-[140px]",
                        isSelected
                          ? "bg-indigo-500/20 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-2">
                        <div className="text-2xl">{st.icon}</div>
                        <h4 className={cn("font-bold text-sm sm:text-base", isSelected ? "text-indigo-300" : "text-white")}>
                          {st.title}
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed">{st.desc}</p>
                      </div>

                      <div className="flex justify-end pt-2">
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                          isSelected ? "border-indigo-400 bg-indigo-400 text-slate-950 font-bold" : "border-white/20"
                        )}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4: SUBJECT BALANCE & HURDLES ── */}
          {wizardStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  4. Identify your Strongest and Weakest Subjects
                </h3>
                <p className="text-xs text-white/50">
                  Used to balance daily hours and pinpoint topics requiring high-yield focus.
                </p>
              </div>

              {/* Strongest Subject */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-emerald-400" />
                  Your Strongest / Highest Confidence Subject:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = wizardAnswers.strongSubject === sub;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setWizardAnswers(prev => ({ ...prev, strongSubject: sub }))}
                        className={cn(
                          "py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-white/[0.03] border-white/10 hover:border-emerald-500/40 text-white/70 hover:text-white"
                        )}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weakest Subject */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  Your Weakest / Highest Growth Subject:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = wizardAnswers.weakSubject === sub;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setWizardAnswers(prev => ({
                          ...prev,
                          weakSubject: sub,
                          weakTopicHurdle: WEAKNESS_HURDLES[sub]?.[0] || 'Fundamentals'
                        }))}
                        className={cn(
                          "py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                          isSelected
                            ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                            : "bg-white/[0.03] border-white/10 hover:border-rose-500/40 text-white/70 hover:text-white"
                        )}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Hurdle within Weak Subject */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Specific Topic / Focus Area in {wizardAnswers.weakSubject}:
                </label>
                <div className="space-y-2">
                  {(WEAKNESS_HURDLES[wizardAnswers.weakSubject] || []).map((hurdle) => {
                    const isSelected = wizardAnswers.weakTopicHurdle === hurdle;
                    return (
                      <div
                        key={hurdle}
                        onClick={() => setWizardAnswers(prev => ({ ...prev, weakTopicHurdle: hurdle }))}
                        className={cn(
                          "p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-medium group",
                          isSelected
                            ? "bg-amber-500/15 border-amber-400 text-amber-200"
                            : "bg-white/[0.02] border-white/10 hover:border-amber-500/30 text-white/70 hover:text-white"
                        )}
                      >
                        <span>{hurdle}</span>
                        <div className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                          isSelected ? "border-amber-400 bg-amber-400 text-slate-950 font-bold" : "border-white/20"
                        )}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: DAILY STUDY HOURS ── */}
          {wizardStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  5. How many hours can you dedicate to self-study each day?
                </h3>
                <p className="text-xs text-white/50">
                  Consistency is paramount. We will distribute these hours to ensure balanced progress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {STUDY_HOURS.map((h) => {
                  const isSelected = wizardAnswers.dailyHours === h.hours;
                  return (
                    <div
                      key={h.hours}
                      onClick={() => setWizardAnswers(prev => ({ ...prev, dailyHours: h.hours }))}
                      className={cn(
                        "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left group min-h-[120px]",
                        isSelected
                          ? "bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-display font-black text-white">
                            {h.hours} Hours
                          </span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                            isSelected ? "border-purple-400 bg-purple-400 text-slate-950 font-bold" : "border-white/20"
                          )}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className={cn("text-xs font-bold", isSelected ? "text-purple-300" : "text-white/70")}>
                          {h.label}
                        </p>
                        <p className="text-[11px] text-white/50 leading-relaxed pt-1">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 6: TARGET AIR ── */}
          {wizardStep === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  6. What is your Target AIR and Score Ambition?
                </h3>
                <p className="text-xs text-white/50">
                  Sets sectional cutoffs and score requirements for your roadmap.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {TARGET_AIRS.map((a) => {
                  const isSelected = wizardAnswers.targetAir === a.id;
                  return (
                    <div
                      key={a.id}
                      onClick={() => setWizardAnswers(prev => ({ ...prev, targetAir: a.id }))}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left group",
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Trophy className={cn("w-4 h-4", isSelected ? "text-amber-400" : "text-white/40")} />
                          <span className={cn("font-bold text-sm sm:text-base", isSelected ? "text-amber-200" : "text-white")}>
                            {a.id}
                          </span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                            {a.score}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">
                          {a.aim}
                        </p>
                      </div>

                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "border-amber-400 bg-amber-400 text-slate-950 font-bold" : "border-white/20"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation Controls */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
            <button
              type="button"
              disabled={wizardStep === 1}
              onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
                wizardStep === 1
                  ? "opacity-30 cursor-not-allowed border-transparent text-white/30"
                  : "bg-white/[0.04] border-white/10 hover:border-white/20 text-white/80 hover:text-white"
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {wizardStep < 6 ? (
              <button
                type="button"
                onClick={() => setWizardStep(prev => Math.min(6, prev + 1))}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2 cursor-pointer hover:translate-x-0.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Generate My Updated Roadmap</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 3. MAIN REDESIGNED ROADMAP VIEW (12-SECTION HIERARCHY, UNIFIED SCHEDULE)
  // ══════════════════════════════════════════════════════════════════════════

  // Real or Diagnostic Accuracy for Current Focus
  const focusSubject = aiPlan.answers.weakSubject || 'Mathematics';
  const focusTopic = aiPlan.answers.weakTopicHurdle || 'Matrices & Determinants';
  const focusTarget = resolveLessonTarget(focusTopic, focusSubject);

  // Check SLS real attempts for the focus topic
  const matchingSlsChapter = weaknessAnalysis?.weakChapters?.find(
    wc => (wc.chapterTitle || '').toLowerCase().includes('matri') ||
          (wc.chapterTitle || '').toLowerCase().includes(focusTopic.toLowerCase().slice(0, 6))
  );
  const realAttempts = matchingSlsChapter ? (matchingSlsChapter.questionsAttempted || matchingSlsChapter.attempts || 0) : 0;
  const realAccuracy = matchingSlsChapter && realAttempts > 0 
    ? Math.max(0, Math.min(100, Math.round((matchingSlsChapter.accuracy || 0) * 100))) 
    : null;

  // Active Phase Data
  const activePhase = aiPlan.phases.find(p => p.id === activePhaseTab) || aiPlan.phases[0];

  // Checklist Calculations
  const checklistTotal = aiPlan.weeklyChecklist.length;
  const checklistCompletedCount = aiPlan.weeklyChecklist.filter(c => checklist[c.id]).length;
  const checklistPercent = checklistTotal > 0 ? Math.round((checklistCompletedCount / checklistTotal) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto w-full space-y-7 flex-1 mt-2 lg:mt-4 pb-28 lg:pb-12 animate-in fade-in duration-300">

      {/* ── 1. PAGE HEADER (Breadcrumbs, Title, Subtitle, Edit Path) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-xs font-mono text-white/50">
            <button 
              type="button" 
              onClick={() => onNavigate?.('dashboard')} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-cyan-300 font-semibold">My Path</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight">
            My Path to IISER
          </h1>
          <p className={cn("text-xs sm:text-sm", isLight ? "text-slate-600" : "text-white/60")}>
            Your personalized preparation roadmap for IISER IAT 2027.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setWizardStep(1);
            setIsCalibrating(true);
          }}
          className={cn(
            "self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border shadow-sm",
            isLight 
              ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-cyan-700" 
              : "bg-white/[0.04] border-white/10 hover:border-cyan-500/40 text-white/80 hover:text-white hover:bg-white/[0.08]"
          )}
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Edit Path</span>
        </button>
      </div>

      {/* ── 2. YOUR GOAL (PERSONALIZED USER SUMMARY CARD) ── */}
      <div className={cn(
        "relative overflow-hidden rounded-3xl border p-6 sm:p-7 shadow-2xl backdrop-blur-xl",
        isLight
          ? "bg-white/95 border-slate-200 shadow-slate-200/50"
          : "bg-[#0b0e24]/95 border-indigo-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(99,102,241,0.08)]"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Your Personalized Target</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10.5px] font-mono font-bold">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>SmartPrep AI Active</span>
                </div>
              </div>
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-extrabold tracking-tight",
                isLight ? "text-slate-900" : "text-white"
              )}>
                Target College: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300">{aiPlan.answers.targetInstitute}</span>
              </h2>
              <p className={cn("text-xs mt-0.5", isLight ? "text-slate-500" : "text-white/50")}>
                Based on your selected goal and study preferences during onboarding, continuously tuned by SmartPrep AI.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem('smartprep_pending_prompt', `Based on my target college ${aiPlan.answers.targetInstitute} and stream ${aiPlan.answers.stream}, analyze my roadmap and tell me the highest-leverage actions to focus on.`);
                  onNavigate?.('ai_doubt_solver');
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                  isLight 
                    ? "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 shadow-sm"
                    : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30 hover:border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                )}
                title="Ask SmartPrep AI about this target path"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask AI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setWizardStep(1);
                  setIsCalibrating(true);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer px-2 py-1.5"
              >
                <span>Edit Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 6 Data Badges: College, Exam, Goal, Commitment, Stream, AI Strategy */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Target College */}
            <div className={cn("p-3.5 rounded-2xl border space-y-1", isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.03] border-white/8")}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">Target College</span>
              <p className={cn("font-bold text-sm truncate", isLight ? "text-slate-900" : "text-white")}>{aiPlan.answers.targetInstitute}</p>
              <span className={cn("text-[11px] block font-mono", isLight ? "text-slate-500" : "text-white/50")}>Elite Choice</span>
            </div>

            {/* Exam & Days Left */}
            <div className={cn("p-3.5 rounded-2xl border space-y-1", isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.03] border-white/8")}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">Exam Target</span>
              <p className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-white")}>IISER IAT 2027</p>
              <span className="text-[11px] text-cyan-400 font-mono font-bold block">{daysUntilExam} Days Left</span>
            </div>

            {/* Goal & Score */}
            <div className={cn("p-3.5 rounded-2xl border space-y-1", isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.03] border-white/8")}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Target Aim</span>
              <p className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-white")}>{aiPlan.answers.targetAir}</p>
              <span className="text-[11px] text-emerald-400 font-bold block">180+/240 Marks</span>
            </div>

            {/* Study Commitment */}
            <div className={cn("p-3.5 rounded-2xl border space-y-1", isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.03] border-white/8")}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">Commitment</span>
              <p className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-white")}>{aiPlan.answers.dailyHours} Hours / day</p>
              <span className={cn("text-[11px] block font-mono", isLight ? "text-slate-500" : "text-white/50")}>{aiPlan.answers.dailyHours * 6} hrs/week</span>
            </div>

            {/* Stream */}
            <div className={cn("p-3.5 rounded-2xl border space-y-1", isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.03] border-white/8")}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Stream</span>
              <p className={cn("font-bold text-sm", isLight ? "text-slate-900" : "text-white")}>{aiPlan.answers.stream}</p>
              <span className="text-[11px] text-amber-300/80 block">Math Strategy Active</span>
            </div>

            {/* 6. AI Strategic Path Card */}
            <div 
              onClick={() => {
                sessionStorage.setItem('smartprep_pending_prompt', `Based on my target (${aiPlan.answers.targetInstitute}, aiming for ${aiPlan.answers.targetAir}) and stream (${aiPlan.answers.stream}), what is the most high-yield strategy for my ${aiPlan.answers.dailyHours} hours/day study routine?`);
                onNavigate?.('ai_doubt_solver');
              }}
              className={cn(
                "p-3.5 rounded-2xl border space-y-1 transition-all duration-200 cursor-pointer group/aistat relative overflow-hidden",
                isLight 
                  ? "bg-gradient-to-br from-cyan-50 via-purple-50/50 to-indigo-50 border-cyan-300/80 hover:border-cyan-500 shadow-sm"
                  : "bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-indigo-500/10 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                  AI Strategy
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className={cn(
                "font-bold text-sm flex items-center gap-1 group-hover/aistat:text-cyan-300 transition-colors",
                isLight ? "text-slate-900" : "text-white"
              )}>
                <span className="truncate">NVIDIA NIM Active</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover/aistat:translate-x-0.5 group-hover/aistat:-translate-y-0.5 transition-transform" />
              </p>
              <span className={cn(
                "text-[11px] block font-mono truncate",
                isLight ? "text-slate-500" : "text-cyan-300/80"
              )}>
                Adaptive Sync • Ask AI →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. CURRENT STAGE (VISUAL STAGE INDICATOR) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-5 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200 shadow-sm"
          : "bg-[#0b0e24]/85 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Preparation Journey</span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">Stage 1 Active (18% Progress)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
              Current Preparation Stage
            </h3>
          </div>
          <span className="text-xs text-white/50">4-Stage Adaptive Roadmap</span>
        </div>

        {/* 4 Stage Visual Cards / Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Stage 1: Active */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/35 relative overflow-hidden space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE • CURRENT
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">18%</span>
            </div>
            <h4 className="text-sm font-bold text-white">Stage 1: Foundation & Baseline</h4>
            <p className="text-xs text-white/60">Weeks 1–6 • Core concepts, syllabus coverage & daily habit.</p>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-2">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '18%' }} />
            </div>
          </div>

          {/* Stage 2: Upcoming */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                UPCOMING
              </span>
              <span className="text-[11px] font-mono text-white/40">Stage 2</span>
            </div>
            <h4 className="text-sm font-bold text-white/90">Stage 2: Concept Mastery</h4>
            <p className="text-xs text-white/50">Weeks 7–16 • Numerical derivations & 500+ practice questions.</p>
          </div>

          {/* Stage 3: Locked */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 opacity-60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/50 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>LOCKED</span>
              </span>
              <span className="text-[11px] font-mono text-white/30">Stage 3</span>
            </div>
            <h4 className="text-sm font-bold text-white/70">Stage 3: Mock Test Sprint</h4>
            <p className="text-xs text-white/40">Weeks 17–24 • 10 CBT mocks & negative-marking control.</p>
          </div>

          {/* Stage 4: Locked */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 opacity-60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/50 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>LOCKED</span>
              </span>
              <span className="text-[11px] font-mono text-white/30">Stage 4</span>
            </div>
            <h4 className="text-sm font-bold text-white/70">Stage 4: Final Peak Revision</h4>
            <p className="text-xs text-white/40">Last 30 Days • Daily simulations & formula consolidation.</p>
          </div>
        </div>
      </div>

      {/* ── 4. CURRENT FOCUS (WHAT TO FOCUS ON RIGHT NOW) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border relative overflow-hidden backdrop-blur-xl shadow-2xl space-y-5",
        isLight
          ? "bg-white/90 border-slate-200 shadow-slate-200/50"
          : "bg-[#0b0e24]/90 border-amber-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.06)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Priority: High • Immediate Focus</span>
              </span>
              <span className="text-xs font-mono text-white/50">Status: In Progress</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              Current Focus: {focusSubject} — {focusTopic}
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-2xl leading-relaxed">
              PCB students typically lose the most ground in Mathematics. Securing high-yield algebra and determinant topics creates the strongest rank advantage without requiring advanced calculus.
            </p>
          </div>

          {/* Accuracy Display: Strict Clamping & Honesty */}
          <div className="p-3 rounded-2xl bg-black/30 border border-white/10 shrink-0 min-w-[200px] space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white/60">Topic Accuracy</span>
              {realAccuracy !== null ? (
                <span className="font-bold text-amber-400">{realAccuracy}%</span>
              ) : (
                <span className="text-[11px] text-cyan-300 font-sans font-semibold">Diagnostic Pending</span>
              )}
            </div>
            {realAccuracy !== null ? (
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${realAccuracy}%` }} />
              </div>
            ) : (
              <p className="text-[10.5px] text-white/40 leading-tight">
                Awaiting diagnostic assessment. Take a practice quiz to establish baseline.
              </p>
            )}
            {realAttempts > 0 && (
              <span className="text-[10px] text-white/40 block font-mono">
                {realAttempts} question{realAttempts > 1 ? 's' : ''} evaluated
              </span>
            )}
          </div>
        </div>

        {/* Dual CTA Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.(focusTarget.route)}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Practice Topic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowPriorityModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why is this a priority?</span>
          </button>
        </div>
      </div>

      {/* ── 5. TODAY'S MISSION & 7-DAY SCHEDULE (UNIFIED SEAMLESS ROADMAP) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border relative overflow-hidden backdrop-blur-xl shadow-2xl space-y-6",
        isLight
          ? "bg-white/90 border-slate-200 shadow-slate-200/50"
          : "bg-[#0b0e24]/95 border-indigo-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_35px_rgba(99,102,241,0.08)]"
      )}>
        {/* Header & Routine Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Today's Mission & 7-Day Plan • {aiPlan.answers.dailyHours} Hours/Day</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              Daily Mission & Weekly Schedule
            </h2>
            <p className={cn("text-xs sm:text-sm", isLight ? "text-slate-600" : "text-white/60")}>
              Execute today's priority surgery and follow your customized 5-hour daily study routine across the week.
            </p>
          </div>

          {/* Routine Mode Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleToggleSchedulePref('MORNING')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                schedulePref === 'MORNING'
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Sunrise className="w-3.5 h-3.5 text-amber-400" />
              <span>Morning Routine</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleSchedulePref('EVENING')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                schedulePref === 'EVENING'
                  ? "bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Sunset className="w-3.5 h-3.5 text-indigo-400" />
              <span>Evening Routine</span>
            </button>
          </div>
        </div>

        {/* 7-Day Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {sevenDaySchedule.map((d) => {
            const isSelected = selectedScheduleDay === d.dayNumber;
            const isToday = d.dayNumber === 1;
            return (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => setSelectedScheduleDay(d.dayNumber)}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[74px] group relative",
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    : "bg-white/[0.03] border-white/8 hover:border-white/20 text-white/70 hover:bg-white/[0.06]"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={cn("text-[11px] font-bold", isSelected ? "text-cyan-300" : "text-white")}>
                    {d.dayLabel}
                  </span>
                  {isToday ? (
                    <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950">TODAY</span>
                  ) : (
                    <span className="text-[9px] font-mono opacity-50">#{d.dayNumber}</span>
                  )}
                </div>
                <span className="text-[10px] truncate block opacity-70 mt-1">
                  {d.focusSubject}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content: Day 1 (Today's Mission) vs Other Days */}
        {selectedScheduleDay === 1 ? (
          <div className="space-y-6 pt-1">
            {/* Embedded Today's Mission Container */}
            <div className={cn(
              "p-5 sm:p-6 rounded-2xl border transition-all duration-300 space-y-5",
              dailyCompleted 
                ? "bg-emerald-950/25 border-emerald-500/35 shadow-[0_0_25px_rgba(16,185,129,0.12)]"
                : "bg-gradient-to-br from-[#090c24] via-[#0b0e24] to-[#0d1230] border-cyan-500/30"
            )}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
                      <Flag className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Today's Priority Mission • Session 1</span>
                    </span>
                    <span className="text-xs text-white/50 font-mono">Estimated ~75 Mins</span>
                    <span className="text-white/30">•</span>
                    {dailyCompleted ? (
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed Today! (3/3 Done)</span>
                      </span>
                    ) : (
                      <span className="text-xs text-cyan-300 font-mono font-bold">
                        {completedSubStepsCount} / {subSteps.length} Sub-Steps Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
                    Today's Focus: {aiPlan.dailyAction.targetChapter}
                  </h3>
                  <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
                    Execute your primary growth surgery in Mathematics without advanced calculus. Complete all 3 sub-steps to solidify formulas and eliminate conceptual fear.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onNavigate?.(aiPlan.dailyAction.route)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-950 shadow-[0_0_18px_rgba(255,255,255,0.25)] transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <BookOpen className="w-4 h-4 text-slate-950" />
                    <span>Start Mission</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleDailyMission}
                    className={cn(
                      "px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-1.5 cursor-pointer",
                      dailyCompleted
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        : "bg-white/[0.04] border-white/10 hover:border-white/20 text-white/80 hover:text-white"
                    )}
                  >
                    <CheckCircle2 className={cn("w-4 h-4", dailyCompleted ? "text-emerald-400" : "text-white/40")} />
                    <span>{dailyCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
                  </button>
                </div>
              </div>

              {/* 3 Sub-Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {subSteps.map((step, idx) => {
                  const isStepDone = !!missionStepsState[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => handleToggleMissionStep(step.id)}
                      className={cn(
                        "p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 select-none group",
                        isStepDone
                          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                          : "bg-white/[0.03] border-white/8 hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                            {step.durationMinutes} Mins
                          </span>
                          <div className={cn(
                            "w-5 h-5 rounded-lg border flex items-center justify-center transition-all",
                            isStepDone
                              ? "border-emerald-400 bg-emerald-400 text-slate-950 font-bold"
                              : "border-white/20 group-hover:border-cyan-400"
                          )}>
                            {isStepDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <h4 className={cn("text-xs sm:text-sm font-bold", isStepDone ? "line-through text-white/50" : "text-white")}>
                          {step.title}
                        </h4>

                        <p className="text-xs text-white/60 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <span className={cn("font-semibold", isStepDone ? "text-emerald-400" : "text-cyan-400")}>
                          {isStepDone ? 'Completed ✓' : step.actionLabel}
                        </span>
                        <span className="text-white/40 font-mono">Step {idx + 1} of 3</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const promptText = `I am executing today's mission on ${aiPlan.dailyAction.targetChapter}. Provide 3 essential formula insights, high-frequency traps in IAT, and 1 quick practice problem.`;
                    try {
                      sessionStorage.setItem('smartprep_pending_prompt', promptText);
                    } catch {}
                    onNavigate?.('ai_doubt_solver');
                  }}
                  className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask SmartPrep about this mission →</span>
                </button>
              </div>
            </div>

            {/* Remaining Sessions for Day 1 */}
            {activeSlots.length > 1 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white/60 uppercase tracking-wider">
                    Remaining Study Sessions for Today ({aiPlan.answers.dailyHours} Hours Routine):
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {activeSlots.slice(1).length} More Sessions
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeSlots.slice(1).map((slot, sIdx) => {
                    const isSlotDone = !!slotStates[slot.id];
                    return (
                      <div
                        key={slot.id}
                        className={cn(
                          "p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group",
                          isSlotDone
                            ? "bg-emerald-950/15 border-emerald-500/30 opacity-75"
                            : "bg-white/[0.02] border-white/8 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleToggleSlot(slot.id)}
                            className={cn(
                              "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer",
                              isSlotDone
                                ? "border-emerald-400 bg-emerald-400 text-slate-950 font-bold"
                                : "border-white/20 hover:border-cyan-400"
                            )}
                          >
                            {isSlotDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                                Session {sIdx + 2} • {slot.timeSlot}
                              </span>
                              <span className="text-[10px] font-mono text-cyan-400 font-bold">
                                {slot.durationMinutes}m
                              </span>
                              <span className="text-[10px] font-bold text-white/50 uppercase">
                                {slot.subject}
                              </span>
                            </div>
                            <h5 className={cn("text-xs sm:text-sm font-bold", isSlotDone ? "line-through text-white/50" : "text-white")}>
                              {slot.title}
                            </h5>
                            <p className="text-xs text-white/60 leading-relaxed line-clamp-1">{slot.description}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (slot.route === 'ai_doubt_solver') {
                              try {
                                sessionStorage.setItem('smartprep_pending_prompt', `I am working on ${slot.subject}: ${slot.title}. ${slot.description}. Please provide step-by-step guidance, formulas, and IAT traps.`);
                              } catch {}
                            }
                            onNavigate?.(slot.route);
                          }}
                          className="self-end sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <span>{slot.routeLabel}</span>
                          <ArrowRight className="w-3 h-3 text-cyan-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Day 2, 3, 4, 5, 6, 7 Content */
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {activeDayPlan?.dayName}
                  </span>
                  <h4 className="text-sm font-bold text-white">{activeDayPlan?.theme}</h4>
                </div>
                <p className="text-xs text-white/60">{activeDayPlan?.targetObjective}</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold shrink-0">
                {activeSlots.length} Sessions Planned
              </span>
            </div>

            {/* All sessions for this day */}
            <div className="space-y-2.5">
              {activeSlots.map((slot, sIdx) => {
                const isSlotDone = !!slotStates[slot.id];
                return (
                  <div
                    key={slot.id}
                    className={cn(
                      "p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group",
                      isSlotDone
                        ? "bg-emerald-950/15 border-emerald-500/30 opacity-75"
                        : "bg-white/[0.02] border-white/8 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleToggleSlot(slot.id)}
                        className={cn(
                          "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer",
                          isSlotDone
                            ? "border-emerald-400 bg-emerald-400 text-slate-950 font-bold"
                            : "border-white/20 hover:border-cyan-400"
                        )}
                      >
                        {isSlotDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                            Session {sIdx + 1} • {slot.timeSlot}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">
                            {slot.durationMinutes}m
                          </span>
                          <span className="text-[10px] font-bold text-white/50 uppercase">
                            {slot.subject}
                          </span>
                        </div>
                        <h5 className={cn("text-xs sm:text-sm font-bold", isSlotDone ? "line-through text-white/50" : "text-white")}>
                          {slot.title}
                        </h5>
                        <p className="text-xs text-white/60 leading-relaxed line-clamp-1">{slot.description}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (slot.route === 'ai_doubt_solver') {
                          try {
                            sessionStorage.setItem('smartprep_pending_prompt', `I am working on ${slot.subject}: ${slot.title}. ${slot.description}. Please provide step-by-step guidance, formulas, and IAT traps.`);
                          } catch {}
                        }
                        onNavigate?.(slot.route);
                      }}
                      className="self-end sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>{slot.routeLabel}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 6. WEEKLY STUDY ALLOCATION (HORIZONTAL PROGRESS BARS) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-4 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200 shadow-sm"
          : "bg-[#0b0e24]/85 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
              Weekly Study Allocation
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Allocation is weighted toward Mathematics to address your primary growth area while maintaining your Biology strength.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">
            {aiPlan.answers.dailyHours * 6} Hours / Week
          </span>
        </div>

        <div className="space-y-3.5 pt-1">
          {aiPlan.weeklyHourlyAllocation.map((item) => (
            <div key={item.subject} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", item.color)} />
                  <span className="font-bold text-white">{item.subject}</span>
                </div>
                <span className="font-mono text-white/80 font-bold">
                  {item.hours} hrs ({item.percentage}%)
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", item.color)}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <p className="text-[10.5px] text-white/50">
                {item.focusNote}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. YOUR SUBJECT STRATEGY (STREAM SPECIFIC) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-5 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200 shadow-sm"
          : "bg-[#0b0e24]/85 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="border-b border-white/10 pb-3.5 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PCB High-Yield Hack</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
            {aiPlan.specialBlueprint.title}
          </h3>
          <p className="text-xs text-cyan-300 font-semibold">
            {aiPlan.specialBlueprint.subtitle}
          </p>
          <p className="text-xs text-white/60 leading-relaxed max-w-2xl pt-1">
            {aiPlan.specialBlueprint.description}
          </p>
        </div>

        {/* 4 Topic Strategy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {aiPlan.specialBlueprint.recommendedChapters.map((ch, idx) => {
            const chapTarget = resolveLessonTarget(ch.name, 'Mathematics');
            const isFirst = idx === 0;
            return (
              <div
                key={ch.name}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                      isFirst 
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                        : "bg-white/10 text-white/70"
                    )}>
                      {isFirst ? 'In Progress' : 'Ready to Start'}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">High Yield</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ch.name}
                  </h4>

                  <p className="text-xs text-white/60 leading-relaxed">
                    {ch.why}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate?.(chapTarget.route)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/[0.08] hover:bg-white/15 text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 8. PREPARATION ROADMAP (MILESTONE TRACKER) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-5 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200 shadow-sm"
          : "bg-[#0b0e24]/85 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
              Preparation Roadmap (Milestones)
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              4 clear phases with measurable completion requirements toward IISc Bangalore qualification.
            </p>
          </div>
          <span className="text-xs font-mono text-white/40">Inspect phase details below</span>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {aiPlan.phases.map((phase) => {
            const isSelected = activePhaseTab === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhaseTab(phase.id)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[84px]",
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "bg-white/[0.03] border-white/8 hover:border-white/20 text-white/70 hover:bg-white/[0.05]"
                )}
              >
                <span className={cn(
                  "text-[9px] font-bold px-2 py-0.5 rounded-md uppercase self-start mb-1",
                  phase.status === 'ACTIVE' 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-white/10 text-white/50"
                )}>
                  {phase.status}
                </span>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white truncate">{phase.title}</h5>
                  <span className="text-[10px] text-white/40 block">{phase.timeline}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Details */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm sm:text-base font-bold text-white">{activePhase.title} ({activePhase.timeline})</h4>
            <span className="text-xs font-mono text-cyan-400 font-bold">Target Progress: {activePhase.targetProgress}%</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">{activePhase.description}</p>

          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">Key Milestones:</span>
            <div className="space-y-1.5">
              {activePhase.keyMilestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 9. THIS WEEK'S ACTION CHECKLIST ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-4 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200 shadow-sm"
          : "bg-[#0b0e24]/85 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
              This Week's Action Checklist
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {checklistCompletedCount} / {checklistTotal} Completed ({checklistPercent}%)
            </span>
            <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${checklistPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {aiPlan.weeklyChecklist.map((item) => {
            const isDone = !!checklist[item.id];
            const itemTarget = item.route 
              ? { route: item.route, label: item.targetLabel || 'Open Task' }
              : resolveLessonTarget(item.task, aiPlan.answers.weakSubject);

            return (
              <div
                key={item.id}
                onClick={() => handleToggleChecklistItem(item.id)}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 select-none group",
                  isDone
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-white/[0.02] border-white/8 hover:border-white/20 text-white/80 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <div className={cn(
                    "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all",
                    isDone
                      ? "border-emerald-400 bg-emerald-400 text-slate-950 font-bold"
                      : "border-white/20 group-hover:border-cyan-400"
                  )}>
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <span className={cn(
                      "text-xs font-semibold leading-relaxed block",
                      isDone ? "line-through text-white/50" : "text-white"
                    )}>
                      {item.task}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/40 uppercase">
                        {item.category}
                      </span>
                      {itemTarget.route && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.(itemTarget.route);
                          }}
                          className="text-[10.5px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{itemTarget.label || 'Go to Task'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {isDone && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    Done ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 10. SMARTPREP GUIDANCE (AI STUDY INSIGHTS) ── */}
      <div className={cn(
        "p-6 sm:p-7 rounded-3xl border space-y-4 backdrop-blur-xl",
        isLight
          ? "bg-white/90 border-slate-200"
          : "bg-gradient-to-r from-indigo-950/40 via-[#0b0e24] to-cyan-950/40 border-indigo-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      )}>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-cyan-400" />
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
            SmartPrep Guidance & Evidence-Based Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Tactic 1</span>
            <h4 className="text-xs font-bold text-white">Accuracy Over Speed</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Focus on accuracy over speed in your early practice sessions. Speed develops naturally once concepts and formula triggers are rock-solid.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">Tactic 2</span>
            <h4 className="text-xs font-bold text-white">24-Hour Error Review</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Review missed questions within 24 hours while your thought process is fresh. Unreviewed mistakes repeat under exam pressure.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Tactic 3</span>
            <h4 className="text-xs font-bold text-white">Timed 10-Question Sets</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Practice with a timer on sets of 10+ questions to build exam pacing gradually. Never get trapped on a single calculation during mocks.
            </p>
          </div>
        </div>
      </div>

      {/* ── 11. PERSONALIZATION TRANSPARENCY ── */}
      <div className={cn(
        "p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl",
        isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/8"
      )}>
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Personalization Transparency
          </span>
          <h4 className="text-sm sm:text-base font-bold text-white">
            How this roadmap is calibrated for you
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            This roadmap is built specifically around your target college (<strong className="text-white font-semibold">{aiPlan.answers.targetInstitute}</strong>), academic stream (<strong className="text-white font-semibold">{aiPlan.answers.stream}</strong> with non-calculus Math focus), and daily commitment (<strong className="text-white font-semibold">{aiPlan.answers.dailyHours} hours/day</strong>).
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setWizardStep(1);
            setIsCalibrating(true);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Edit Path</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* ── PRIORITY RATIONALE MODAL ── */}
      <AnimatePresence>
        {showPriorityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0b0e24] border border-amber-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">Why is this a priority?</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPriorityModal(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-white/70 leading-relaxed">
                <p>
                  For a <strong className="text-amber-300">PCB student aiming for Top 100 AIR at IISc Bangalore</strong>, Biology and Chemistry scores among top candidates are typically very high and tightly bunched.
                </p>
                <p>
                  The primary rank differentiator is <strong className="text-white">Mathematics</strong>. Most PCB candidates leave all 15 Math questions blank, giving away 60 possible marks.
                </p>
                <p>
                  By mastering non-calculus chapters like <strong className="text-cyan-300">Matrices & Determinants</strong> and <strong className="text-cyan-300">Vectors & 3D Geometry</strong>, you can secure 24–35 marks with pure algebraic formulas and zero integration tricks, creating an insurmountable rank advantage.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowPriorityModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPriorityModal(false);
                    onNavigate?.(focusTarget.route);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Practice Matrices & Determinants</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 12. FOOTER ── */}
      <Footer />
    </div>
  );
}
