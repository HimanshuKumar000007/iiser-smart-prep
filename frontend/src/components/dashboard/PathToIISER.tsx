import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  CheckCircle2,
  Circle,
  ArrowRight,
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
  HelpCircle,
  Lightbulb,
  CheckSquare,
  Square,
  MessageSquare,
  Atom,
  Flame,
  Layers,
  GraduationCap
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
  isDailyActionCompleted,
  setDailyActionCompleted,
  getSavedChecklistState,
  saveChecklistState,
  resolveLessonTarget
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
  const [aiPlan, setAiPlan] = useState<AiGeneratedStudyPlan | null>(() => {
    const p = getStoredAiStudyPlan();
    if (!p) return null;
    // Sanitize any raw markdown headers that may have leaked in earlier versions
    if (p.aiMentorTips && Array.isArray(p.aiMentorTips)) {
      p.aiMentorTips = p.aiMentorTips.map((tip, idx) => {
        if (tip.includes('Headline:') || tip.includes('Golden Tips') || tip.startsWith('*') || tip.endsWith('**')) {
          const defaults = [
            `Focus on ${p.answers.weakSubject}: Every +4 marks in ${p.answers.weakSubject} boosts your IAT rank by 80+ positions. Target high-probability formula questions first.`,
            `180-Min Pacing: Divide exam time: Chemistry (35m) → Biology (30m) → Physics (55m) → Math (50m) → Final Review (10m).`,
            `Zero-Error Habit: In Section A, eliminate careless negative marks to secure your Top 100 AIR at ${p.answers.targetInstitute}.`
          ];
          return defaults[idx % defaults.length];
        }
        return tip;
      });
    }
    if (p.headlineStrategy && (p.headlineStrategy.includes('Headline:') || p.headlineStrategy.startsWith('*'))) {
      p.headlineStrategy = `Tailored ${p.answers.dailyHours} hrs/day roadmap for ${p.answers.targetInstitute}. Maximizing ${p.answers.strongSubject} speed while executing targeted surgery on ${p.answers.weakSubject}.`;
    }
    return p;
  });
  const [isCalibrating, setIsCalibrating] = useState<boolean>(() => !getStoredAiStudyPlan());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStepText, setGenerationStepText] = useState<string>('Analyzing your academic stream...');

  // ── Onboarding Wizard Answers ──────────────────────────────────────────
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardAnswers, setWizardAnswers] = useState<AiOnboardingAnswers>(() => {
    const existing = getStoredAiStudyPlan()?.answers;
    return existing || {
      targetInstitute: 'IISER Pune',
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
    const p = getStoredAiStudyPlan();
    return p ? isDailyActionCompleted(p.id) : false;
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => getSavedChecklistState());
  const [activePhaseTab, setActivePhaseTab] = useState<string>('PHASE_1');

  // Days left dynamic countdown
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

  // Toggle Daily Mission Completed
  const handleToggleDailyMission = () => {
    if (!aiPlan) return;
    const nextState = !dailyCompleted;
    setDailyCompleted(nextState);
    setDailyActionCompleted(aiPlan.id, nextState);
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
  // 2. INTERACTIVE ONBOARDING QUESTIONNAIRE WIZARD
  // ══════════════════════════════════════════════════════════════════════════
  if (isCalibrating || !aiPlan) {
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
                Answer 6 quick questions so the AI can craft your exact stream-specific scoring blueprint.
              </p>
            </div>

            {aiPlan && (
              <button
                type="button"
                onClick={() => setIsCalibrating(false)}
                className="self-start sm:self-auto text-xs px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                Cancel & View Existing Plan
              </button>
            )}
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

          {/* ── STEP 1: TARGET INSTITUTE ─────────────────────────────────── */}
          {wizardStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  1. Which Premier Institute is your dream destination?
                </h3>
                <p className="text-xs text-white/50">
                  Target selection configures the composite marks and ranking threshold required in IAT 2027.
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
                          <span className={cn("font-bold text-sm sm:text-base", isSelected ? "text-cyan-200" : "text-white")}>
                            {inst.name}
                          </span>
                          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                            {inst.badge}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed">
                          {inst.tag}
                        </p>
                        <span className="text-[10px] font-mono text-cyan-400/80 block pt-0.5">
                          {inst.rank}
                        </span>
                      </div>

                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all",
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

          {/* ── STEP 2: STREAM & BACKGROUND ─────────────────────────────── */}
          {wizardStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  2. What is your Academic Stream / Background?
                </h3>
                <p className="text-xs text-white/50">
                  Crucial for designing your non-core subject tactical blueprint (e.g. PCB Math vs PCM Bio).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {STREAMS.map((s) => {
                  const isSelected = wizardAnswers.stream === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setWizardAnswers(prev => ({ 
                        ...prev, 
                        stream: s.id,
                        // Update weak subject sensible default
                        weakSubject: s.id === 'PCB' ? 'Mathematics' : (s.id === 'PCM' ? 'Biology' : prev.weakSubject)
                      }))}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 text-left group",
                        isSelected
                          ? "bg-indigo-500/20 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className={cn("font-bold text-sm sm:text-base", isSelected ? "text-indigo-200" : "text-white")}>
                            {s.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                            {s.tag}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">
                          {s.desc}
                        </p>
                      </div>

                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                        isSelected ? "border-indigo-400 bg-indigo-400 text-slate-950 font-bold" : "border-white/20"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 3: CURRENT PREPARATION STAGE ───────────────────────── */}
          {wizardStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  3. Where are you currently in your IAT syllabus?
                </h3>
                <p className="text-xs text-white/50">
                  Determines your starting phase: Foundation, Concept Mastery, or Mock Sprint.
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
                          ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                          : "bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{st.icon}</span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                            isSelected ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold" : "border-white/20"
                          )}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <h4 className={cn("font-bold text-sm", isSelected ? "text-cyan-200" : "text-white")}>
                          {st.title}
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4: SUBJECT PROFILE & SPECIFIC HURDLE ────────────────── */}
          {wizardStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  4. Your Strongest vs Weakest Subject Area
                </h3>
                <p className="text-xs text-white/50">
                  We will reinforce your strength for speed while scheduling targeted surgery for your hurdle.
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
                  Your Weakest / Highest Anxiety Subject:
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
                  Specific Topic / Hurdle in {wizardAnswers.weakSubject}:
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
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: DAILY STUDY HOURS ───────────────────────────────── */}
          {wizardStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  5. How many hours can you dedicate to self-study each day?
                </h3>
                <p className="text-xs text-white/50">
                  Consistency is paramount. We will distribute these hours to ensure you never miss revision.
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

          {/* ── STEP 6: TARGET AIR / AIM ─────────────────────────────────── */}
          {wizardStep === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  6. What is your Target AIR and Score Ambition?
                </h3>
                <p className="text-xs text-white/50">
                  Calculates minimum safe sectional cutoffs and sets question accuracy thresholds.
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
                <span>Generate My AI Study Plan</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 3. ACTION-ORIENTED AI STUDY PLAN DASHBOARD VIEW
  // ══════════════════════════════════════════════════════════════════════════
  const activePhase = aiPlan.phases.find(p => p.id === activePhaseTab) || aiPlan.phases[0];
  const checklistTotal = aiPlan.weeklyChecklist.length;
  const checklistCompletedCount = aiPlan.weeklyChecklist.filter(c => checklist[c.id]).length;
  const checklistPercent = checklistTotal > 0 ? Math.round((checklistCompletedCount / checklistTotal) * 100) : 0;
  const dailyTarget = resolveLessonTarget(aiPlan.dailyAction.targetChapter || aiPlan.dailyAction.title, aiPlan.dailyAction.subject);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-32 lg:pb-12 animate-in fade-in duration-400">

      {/* ── 1. HERO BANNER WITH TARGET INSTITUTE & RE-CALIBRATE ── */}
      <div className={cn(
        "relative overflow-hidden rounded-[2.5rem] border p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl",
        isLight 
          ? "bg-white/90 border-slate-200 shadow-slate-200/50" 
          : "bg-[#090b1c]/90 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_30px_rgba(99,102,241,0.08)]"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50 translate-x-1/3 -translate-y-1/3" />

        <div className="relative z-10 space-y-6">
          {/* Top Pill & Re-calibrate Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI CALIBRATED ROADMAP • IISER IAT 2027</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setWizardStep(1);
                setIsCalibrating(true);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border shadow-sm",
                isLight 
                  ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-cyan-700" 
                  : "bg-white/[0.05] border-white/10 hover:border-cyan-500/40 text-white/80 hover:text-white hover:bg-white/[0.08]"
              )}
              title="Retake onboarding to modify your daily study hours, target college, or weak subjects"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Re-calibrate Plan</span>
            </button>
          </div>

          {/* Title & Headline Strategy */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              My Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">{aiPlan.answers.targetInstitute}</span>
            </h1>
            <p className={cn("text-sm sm:text-base leading-relaxed font-medium", isLight ? "text-slate-600" : "text-white/70")}>
              {aiPlan.headlineStrategy}
            </p>
          </div>

          {/* 4 Metric Badges in 2x2 or 4-col Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className={cn(
              "p-4 rounded-2xl border transition-all space-y-1.5",
              isLight 
                ? "bg-indigo-50/70 border-indigo-200/80 text-slate-900" 
                : "bg-indigo-950/30 border-indigo-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isLight ? "text-indigo-600" : "text-indigo-400")}>
                  Exam Target
                </span>
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="font-bold text-sm sm:text-base text-white">IISER IAT 2027</p>
              <span className="text-xs font-mono font-bold text-cyan-400 block">{daysUntilExam} Days Left</span>
            </div>

            <div className={cn(
              "p-4 rounded-2xl border transition-all space-y-1.5",
              isLight 
                ? "bg-cyan-50/70 border-cyan-200/80 text-slate-900" 
                : "bg-cyan-950/30 border-cyan-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isLight ? "text-cyan-700" : "text-cyan-400")}>
                  Target College
                </span>
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="font-bold text-sm sm:text-base text-white">{aiPlan.answers.targetInstitute}</p>
              <span className="text-xs text-indigo-300 font-semibold block">
                {TARGET_INSTITUTES.find(i => i.id === aiPlan.answers.targetInstitute)?.rank || '#1 Campus'}
              </span>
            </div>

            <div className={cn(
              "p-4 rounded-2xl border transition-all space-y-1.5",
              isLight 
                ? "bg-amber-50/70 border-amber-200/80 text-slate-900" 
                : "bg-amber-950/30 border-amber-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isLight ? "text-amber-700" : "text-amber-400")}>
                  Stream & Habit
                </span>
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="font-bold text-sm sm:text-base text-white">{aiPlan.answers.stream}</p>
              <span className="text-xs text-amber-300 font-semibold block">{aiPlan.answers.dailyHours} Hours / day</span>
            </div>

            <div className={cn(
              "p-4 rounded-2xl border transition-all space-y-1.5",
              isLight 
                ? "bg-emerald-50/70 border-emerald-200/80 text-slate-900" 
                : "bg-emerald-950/30 border-emerald-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isLight ? "text-emerald-700" : "text-emerald-400")}>
                  Goal Aim
                </span>
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="font-bold text-sm sm:text-base text-white">{aiPlan.answers.targetAir}</p>
              <span className="text-xs text-emerald-400 font-bold block">
                {TARGET_AIRS.find(a => a.id === aiPlan.answers.targetAir)?.score || '160+ Marks'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. THE ACTION-ORIENTED CORE: TODAY'S ACTION MISSION ── */}
      <div className={cn(
        "p-6 sm:p-8 rounded-3xl border relative overflow-hidden group transition-all duration-300 shadow-2xl",
        dailyCompleted 
          ? "bg-emerald-950/20 border-emerald-500/30"
          : "bg-gradient-to-br from-indigo-950/40 via-[#0b0e24]/90 to-cyan-950/40 border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_35px_rgba(6,182,212,0.15)]"
      )}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,210,255,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            {/* Top Tag & Status */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>Today's Immediate Mission • Day {aiPlan.dailyAction.dayNumber}</span>
              </span>

              {dailyCompleted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Completed Today! Streak Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pending • Est. ~{aiPlan.dailyAction.estimatedMinutes} Mins</span>
                </span>
              )}
            </div>

            {/* Mission Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight leading-snug">
              {aiPlan.dailyAction.title}
            </h2>

            {/* Description */}
            <p className={cn("text-xs sm:text-sm leading-relaxed", isLight ? "text-slate-600" : "text-white/70")}>
              {aiPlan.dailyAction.description}
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{aiPlan.dailyAction.subject}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white/70 font-mono">
                Target: {aiPlan.dailyAction.targetChapter}
              </span>
              {dailyTarget.lessonTitle && (
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Deep-Link: {dailyTarget.lessonTitle}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate?.(dailyTarget.route)}
              className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-100 text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Start Today's Mission</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              type="button"
              onClick={handleToggleDailyMission}
              className={cn(
                "px-5 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer",
                dailyCompleted
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                  : "bg-white/[0.04] border-white/10 hover:border-white/20 text-white/80 hover:text-white"
              )}
            >
              <CheckCircle2 className={cn("w-4 h-4", dailyCompleted ? "text-emerald-400" : "text-white/40")} />
              <span>{dailyCompleted ? 'Mark as Incomplete' : 'Mark Completed ✓'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem('smartprep_active_chat', JSON.stringify([{
                  role: 'user',
                  content: `I am executing today's study mission: "${aiPlan.dailyAction.title}". Give me the 3 most crucial formulas, high-yield concept traps, and 1 practice numerical for IISER IAT.`
                }]));
                onNavigate?.('ai_doubt_solver');
              }}
              className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center justify-center gap-1.5 py-1 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI Tutor about this mission</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. TWO-COLUMN STRATEGY LAYOUT: BLUEPRINT + HOURLY ALLOCATION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Left: Stream Strategic Blueprint ── */}
        <div className={cn(
          "p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 backdrop-blur-xl relative overflow-hidden",
          isLight 
            ? "bg-white/90 border-slate-200 shadow-sm" 
            : "bg-[#0b0e24]/80 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        )}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                {aiPlan.specialBlueprint.badge}
              </span>
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
              {aiPlan.specialBlueprint.title}
            </h3>
            <p className="text-xs text-cyan-300 font-semibold">
              {aiPlan.specialBlueprint.subtitle}
            </p>
            <p className={cn("text-xs leading-relaxed", isLight ? "text-slate-600" : "text-white/60")}>
              {aiPlan.specialBlueprint.description}
            </p>

            {/* Tactical Advice Bullets */}
            <div className="space-y-2 pt-1">
              {aiPlan.specialBlueprint.tactics.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Yield Chapter Shortcuts */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-white/40 block">
              Recommended High-Yield Chapters:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {aiPlan.specialBlueprint.recommendedChapters.map((c, i) => {
                const chapTarget = resolveLessonTarget(c.name, aiPlan.answers.weakSubject);
                return (
                  <div
                    key={i}
                    onClick={() => onNavigate?.(chapTarget.route)}
                    className={cn(
                      "p-3.5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between min-h-[74px]",
                      isLight 
                        ? "bg-slate-50 hover:bg-white border-slate-200 hover:border-cyan-400 shadow-sm" 
                        : "bg-white/[0.03] hover:bg-white/[0.07] border-white/5 hover:border-cyan-500/40 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center gap-1 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all shrink-0">
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <span className={cn("text-[11px] line-clamp-2 mt-1 leading-relaxed", isLight ? "text-slate-500" : "text-white/60")}>
                      {c.why}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Weekly Hourly Allocation & Subject Balance ── */}
        <div className={cn(
          "p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 backdrop-blur-xl",
          isLight 
            ? "bg-white/90 border-slate-200 shadow-sm" 
            : "bg-[#0b0e24]/80 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        )}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-white">
                Weekly Subject Hour Allocation
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {aiPlan.answers.dailyHours * 6} hrs / week total
              </span>
            </div>
            <p className={cn("text-xs", isLight ? "text-slate-600" : "text-white/50")}>
              Weighted mathematically to prioritize your identified hurdle in <span className="text-rose-400 font-bold">{aiPlan.answers.weakSubject}</span>.
            </p>
          </div>

          <div className="space-y-4">
            {aiPlan.weeklyHourlyAllocation.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
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

                <p className="text-[10.5px] text-white/45 line-clamp-1">
                  {item.focusNote}
                </p>
              </div>
            ))}
          </div>

          {/* Active Study Rhythm Guideline */}
          <div className={cn(
            "p-3.5 rounded-2xl border text-xs flex items-start gap-2.5",
            isLight 
              ? "bg-indigo-50 border-indigo-200 text-indigo-900" 
              : "bg-indigo-500/10 border-indigo-500/20 text-indigo-200"
          )}>
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong className="text-white font-semibold">Active Study Guideline:</strong> Allocate 60% of your daily {aiPlan.answers.dailyHours} hours strictly to numerical solving & derivations, and 40% to rapid NCERT revision.
            </span>
          </div>
        </div>

      </div>

      {/* ── 4. FOUR-PHASE PREPARATION LIFECYCLE ROADMAP ── */}
      <div className={cn(
        "p-6 sm:p-8 rounded-3xl border space-y-6 backdrop-blur-xl",
        isLight 
          ? "bg-white/90 border-slate-200 shadow-sm" 
          : "bg-[#0b0e24]/80 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Strategic Timeline
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Preparation Lifecycle Roadmap
            </h3>
            <p className={cn("text-xs mt-0.5", isLight ? "text-slate-600" : "text-white/50")}>
              Your structured pathway from baseline concepts to IISER rank qualification.
            </p>
          </div>

          <span className="text-xs font-mono text-white/50 self-start sm:self-auto">
            Click phase to inspect milestones
          </span>
        </div>

        {/* 4 Phase Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {aiPlan.phases.map((phase, idx) => {
            const isSelected = activePhaseTab === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhaseTab(phase.id)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] relative overflow-hidden",
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    : "bg-white/[0.03] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.05]"
                )}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={cn(
                    "text-[9.5px] font-bold px-2 py-0.5 rounded-md uppercase",
                    phase.status === 'ACTIVE' 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/10 text-white/60"
                  )}>
                    {phase.status}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={cn("text-xs sm:text-sm font-bold truncate", isSelected ? "text-cyan-200" : "text-white")}>
                    {phase.title}
                  </h4>
                  <span className="text-[10px] text-white/45 block">{phase.timeline}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">{activePhase.title}</h4>
                <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {activePhase.timeline}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-2xl">
                {activePhase.description}
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/40 block">Target Progress</span>
              <span className="text-xl font-display font-black text-white">{activePhase.targetProgress}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Key Milestones */}
            <div className="space-y-2.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-white/40 block">
                Key Milestone Objectives:
              </span>
              <div className="space-y-2">
                {activePhase.keyMilestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Criteria & Action */}
            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  Phase Verification Criteria:
                </span>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 text-xs font-mono text-cyan-300 font-semibold">
                  {activePhase.verificationCriteria}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate?.(`smart_lessons:${aiPlan.answers.weakSubject}`)}
                className="self-start px-4 py-2.5 rounded-xl text-xs font-bold bg-white/[0.07] hover:bg-white/15 border border-white/10 text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse {aiPlan.answers.weakSubject} Smart Lessons</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. INTERACTIVE WEEKLY ACTION CHECKLIST ── */}
      <div className={cn(
        "p-6 sm:p-8 rounded-3xl border space-y-5 backdrop-blur-xl",
        isLight 
          ? "bg-white/90 border-slate-200 shadow-sm" 
          : "bg-[#0b0e24]/80 border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                This Week's Action Checklist
              </h3>
            </div>
            <p className={cn("text-xs mt-1", isLight ? "text-slate-600" : "text-white/50")}>
              Check off your tasks as you complete them. Progress is saved automatically.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {checklistCompletedCount} / {checklistTotal} Completed ({checklistPercent}%)
            </span>
            <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {aiPlan.weeklyChecklist.map((item) => {
            const isDone = !!checklist[item.id];
            const itemTarget = item.route 
              ? { route: item.route, label: item.targetLabel || 'Open Task' }
              : (item.task.toLowerCase().includes('mock')
                ? { route: 'mock_tests', label: 'Open Mock Tests' }
                : (item.task.toLowerCase().includes('pyq')
                  ? { route: 'pyqs', label: 'Open PYQ Hub' }
                  : resolveLessonTarget(item.task, aiPlan.answers.weakSubject)));

            return (
              <div
                key={item.id}
                onClick={() => handleToggleChecklistItem(item.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 select-none group",
                  isDone
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/8 hover:border-white/20 text-white/80 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={cn(
                    "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all",
                    isDone
                      ? "border-emerald-400 bg-emerald-400 text-slate-950 font-bold"
                      : "border-white/20 group-hover:border-cyan-400"
                  )}>
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <span className={cn(
                      "text-xs font-semibold leading-relaxed block transition-all",
                      isDone ? "line-through text-white/50" : "text-white"
                    )}>
                      {item.task}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-white/40 uppercase">
                        {item.category}
                      </span>
                      {itemTarget.route && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.(itemTarget.route);
                          }}
                          className="text-[10.5px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
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

      {/* ── 6. AI MENTOR COACHING DIRECTIVES ── */}
      <div className={cn(
        "p-6 sm:p-8 rounded-3xl border space-y-4 relative overflow-hidden backdrop-blur-xl",
        isLight 
          ? "bg-white/90 border-slate-200" 
          : "bg-gradient-to-r from-indigo-950/50 via-[#0b0e24]/80 to-purple-950/50 border-purple-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      )}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white">
                AI Mentor Coaching Directives
              </h3>
              <p className="text-[11px] text-purple-300/80">
                Tailored for {aiPlan.answers.targetInstitute} • {aiPlan.answers.targetAir}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 hidden sm:inline">
            NVIDIA NIM AI Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {[
            {
              title: "Scoring Strategy & Mindset",
              accent: "text-cyan-400",
              border: "hover:border-cyan-500/40",
              tag: "TACTIC #1",
              text: aiPlan.aiMentorTips[0] || `Focus on ${aiPlan.answers.weakSubject}: Every +4 marks in ${aiPlan.answers.weakSubject} boosts your IAT rank by 80+ positions. Target high-probability formula questions first.`
            },
            {
              title: "180-Minute Exam Pacing",
              accent: "text-purple-400",
              border: "hover:border-purple-500/40",
              tag: "TACTIC #2",
              text: aiPlan.aiMentorTips[1] || `Divide your 180 mins: Chemistry (35m) → Biology (30m) → Physics (55m) → Math (50m) → Final Review (10m). Never get stuck on 1 question.`
            },
            {
              title: "Error Control & Negative Marks",
              accent: "text-amber-400",
              border: "hover:border-amber-500/40",
              tag: "TACTIC #3",
              text: aiPlan.aiMentorTips[2] || `In Section A, eliminate careless negative marks. Keeping negative marks under 12 secures your Top 100 AIR at ${aiPlan.answers.targetInstitute}.`
            }
          ].map((tactic, idx) => (
            <div 
              key={idx} 
              className={cn(
                "p-4 rounded-2xl border transition-all space-y-2 flex flex-col justify-between",
                isLight 
                  ? "bg-slate-50/80 border-slate-200" 
                  : "bg-white/[0.03] border-white/8 hover:bg-white/[0.05]",
                tactic.border
              )}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={cn("text-[9.5px] font-mono font-bold tracking-wider", tactic.accent)}>
                    {tactic.tag}
                  </span>
                  <Lightbulb className={cn("w-3.5 h-3.5", tactic.accent)} />
                </div>
                <h4 className="text-xs font-bold text-white">{tactic.title}</h4>
                <p className="text-xs text-white/70 leading-relaxed pt-0.5">{tactic.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
