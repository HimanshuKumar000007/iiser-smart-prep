import { LESSONS_DATA } from '../../data/lessons';

// AI Study Plan Data Models & Generator for "My Path to IISER"

export interface AiOnboardingAnswers {
  targetInstitute: string;
  targetYear: string;
  stream: 'PCM' | 'PCB' | 'PCMB' | 'DROPPER' | 'CLASS_11';
  currentStage: 'STARTING' | 'MIDWAY' | 'REVISION';
  strongSubject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  weakSubject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  weakTopicHurdle: string;
  dailyHours: number;
  targetAir: 'Top 100 AIR' | 'Top 500 AIR' | 'Top 2000 AIR';
}

export interface WeeklyChecklistItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  route?: string;
  targetLabel?: string;
}

export interface DailyTimeSlot {
  id: string;
  timeSlot: string; // e.g. "06:00 AM – 07:30 AM"
  period: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  title: string;
  durationMinutes: number;
  subject: string;
  focusType: 'WEAK_SURGERY' | 'NUMERICAL_DRILL' | 'NCERT_MEMORIZE' | 'ERROR_LOGBOOK' | 'MOCK_PYQ';
  description: string;
  targetChapter: string;
  route: string;
  routeLabel: string;
}

export interface DaySchedulePlan {
  dayNumber: number;
  dayLabel: string; // e.g. "Day 1 (Mon)"
  dayName: string;  // e.g. "Monday"
  theme: string;
  focusSubject: string;
  targetObjective: string;
  morningSlots: DailyTimeSlot[];
  eveningSlots: DailyTimeSlot[];
}

export interface WeakAreaDiagnosis {
  id: string;
  subject: string;
  chapter: string;
  topic?: string;
  accuracyPct?: number;
  errorCount?: number;
  totalAttempts?: number;
  urgency: 'CRITICAL' | 'HIGH' | 'MODERATE';
  reason: string;
  markImpact: string;
  route: string;
  routeLabel: string;
  isRealData: boolean;
}

export interface ResolvedLessonRoute {
  lessonId?: string;
  lessonTitle?: string;
  subject?: string;
  route: string;
  label: string;
}

export interface AiGeneratedStudyPlan {
  id: string;
  createdAt: string;
  answers: AiOnboardingAnswers;
  headlineStrategy: string;
  dailyAction: {
    id: string;
    dayNumber: number;
    title: string;
    subject: string;
    actionType: string;
    description: string;
    estimatedMinutes: number;
    targetChapter: string;
    targetLessonId?: string;
    targetLessonTitle?: string;
    route: string;
    completed: boolean;
    subSteps?: {
      id: string;
      title: string;
      durationMinutes: number;
      type: 'CONCEPT_REVIEW' | 'TARGETED_PRACTICE' | 'ERROR_REVIEW';
      description: string;
      actionLabel: string;
    }[];
  };
  specialBlueprint: {
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    tactics: string[];
    recommendedChapters: { name: string; why: string }[];
  };
  weeklyHourlyAllocation: {
    subject: string;
    hours: number;
    percentage: number;
    color: string;
    focusNote: string;
  }[];
  phases: {
    id: string;
    title: string;
    timeline: string;
    targetProgress: number;
    description: string;
    keyMilestones: string[];
    verificationCriteria: string;
    status: 'ACTIVE' | 'UPCOMING' | 'LOCKED';
  }[];
  weeklyChecklist: WeeklyChecklistItem[];
  aiMentorTips: string[];
  sevenDaySchedule?: DaySchedulePlan[];
  fallbackWeakAreas?: WeakAreaDiagnosis[];
}

export const TARGET_INSTITUTES = [
  { id: 'IISc Bangalore', name: 'IISc Bangalore', rank: 'Global #1 in India', tag: 'Accepts IAT for BS Research', badge: 'Elite Choice' },
  { id: 'IISER Pune', name: 'IISER Pune', rank: '#1 Ranked', tag: 'Premier Research Campus', badge: 'Top Choice' },
  { id: 'IISER Kolkata', name: 'IISER Kolkata', rank: '#2 Ranked', tag: 'Excellence in Physical & Earth Sciences', badge: 'Premier' },
  { id: 'IISER Mohali', name: 'IISER Mohali', rank: '#3 Ranked', tag: 'High-Energy Physics & Structural Bio', badge: 'Premier' },
  { id: 'IISER Bhopal', name: 'IISER Bhopal', rank: 'Fastest Growing', tag: 'BS-MS & Engineering Sciences', badge: 'Comprehensive' },
  { id: 'IISER Thiruvananthapuram', name: 'IISER TVM', rank: 'Pristine Campus', tag: 'Chemical Ecology & Quantum Tech', badge: 'Specialized' },
  { id: 'IISER Tirupati', name: 'IISER Tirupati', rank: 'Modern Labs', tag: 'Genomics & Material Science', badge: 'Emerging' },
  { id: 'IISER Berhampur', name: 'IISER Berhampur', rank: 'Coastal Research', tag: 'Marine Bio & Fundamental Physics', badge: 'Emerging' },
];

export const STREAMS = [
  { 
    id: 'PCB' as const, 
    title: 'Class 12 / Dropper PCB', 
    subtitle: 'Medical/Biology Background', 
    tag: 'Needs Math Strategy',
    desc: 'Target high-yield non-calculus Math chapters for 25+ bonus marks.' 
  },
  { 
    id: 'PCM' as const, 
    title: 'Class 12 / Dropper PCM', 
    subtitle: 'Engineering/Math Background', 
    tag: 'Needs Bio Strategy',
    desc: 'Capture 30+ easy marks in Biology via high-yield NCERT facts.' 
  },
  { 
    id: 'PCMB' as const, 
    title: 'Class 12 / Dropper PCMB', 
    subtitle: 'All 4 Subjects', 
    tag: 'Ultimate Advantage',
    desc: 'Maintain balanced 4-subject synergy to maximize composite rank.' 
  },
  { 
    id: 'DROPPER' as const, 
    title: 'Dropper / Gap Year', 
    subtitle: 'Full-Time Intensive Aspirant', 
    tag: 'Rapid Sprint',
    desc: 'Focus on full-length mock stamina, timing, and weak area surgery.' 
  },
  { 
    id: 'CLASS_11' as const, 
    title: 'Class 11 Foundation', 
    subtitle: 'Early Mover Pathway', 
    tag: '2-Year Vision',
    desc: 'Build rock-solid fundamentals in Mechanics & Physical Chemistry.' 
  },
];

export const STAGES = [
  {
    id: 'STARTING' as const,
    title: 'Just Starting / Baseline',
    desc: '0% – 25% syllabus covered. Need structured step-by-step foundation.',
    icon: '🌱'
  },
  {
    id: 'MIDWAY' as const,
    title: 'Concept Builder',
    desc: '25% – 60% syllabus covered. Need numerical problem practice and speed.',
    icon: '⚡'
  },
  {
    id: 'REVISION' as const,
    title: 'Advanced / Mock Ready',
    desc: '60%+ syllabus covered. Need mock simulations, PYQs, and rank polishing.',
    icon: '🏆'
  }
];

export const SUBJECT_OPTIONS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'] as const;

export const WEAKNESS_HURDLES: Record<string, string[]> = {
  Physics: [
    'Rotational Dynamics & Torque Numericals',
    'Calculus in Kinematics & Mechanics',
    'Electromagnetism & Induced EMF',
    'Wave Optics & Interference Derivations',
    'Thermodynamics & Heat Engines'
  ],
  Chemistry: [
    'Organic Reaction Mechanisms (SN1/SN2, Aldol, Cannizzaro)',
    'Ionic & Chemical Equilibrium Stoichiometry',
    'Coordination Compounds & Crystal Field Theory',
    'Electrochemistry & Nernst Equation Numericals',
    'Thermodynamics & Entropy Calculations'
  ],
  Mathematics: [
    'Calculus & Definite Integration Tricks',
    'Vectors & 3-Dimensional Geometry Planes',
    'Probability, Bayes Theorem & Distributions',
    'Matrices, Determinants & System of Equations',
    'Conic Sections (Parabola, Ellipse, Hyperbola)'
  ],
  Biology: [
    'Genetics, Mendelian Ratios & Molecular Basis',
    'Photosynthesis & Cellular Respiration Cycles',
    'Ecology, Biodiversity & Population Dynamics',
    'Human Physiology & Neural Coordination',
    'Biotechnology Principles & Applications'
  ]
};

export const STUDY_HOURS = [
  { hours: 3, label: '2–3 Hours / day', desc: 'School & coaching balance' },
  { hours: 5, label: '4–6 Hours / day', desc: 'Standard dedicated self-study' },
  { hours: 8, label: '7+ Hours / day', desc: 'Full-time intensive preparation' },
];

export const TARGET_AIRS = [
  { id: 'Top 100 AIR' as const, score: '180+ / 240 Marks', aim: 'IISc Bangalore or IISER Pune Top Rank' },
  { id: 'Top 500 AIR' as const, score: '150–180 / 240 Marks', aim: 'Top 3 IISERs (Pune, Kolkata, Mohali)' },
  { id: 'Top 2000 AIR' as const, score: '120–150 / 240 Marks', aim: 'Confirmed Seat in any Premier IISER' },
];

const LOCAL_STORAGE_KEY = 'smartprep_ai_study_plan';
const CHECKLIST_STORAGE_KEY = 'smartprep_weekly_checklist';
const DAILY_ACTION_STORAGE_KEY = 'smartprep_daily_action_done';
const DAILY_SLOT_STORAGE_KEY = 'smartprep_daily_slots_done';
const SCHEDULE_PREF_STORAGE_KEY = 'smartprep_schedule_preference';
const MISSION_STEPS_STORAGE_KEY = 'smartprep_mission_steps_done';

export function getSavedSchedulePreference(): 'MORNING' | 'EVENING' {
  try {
    const pref = localStorage.getItem(SCHEDULE_PREF_STORAGE_KEY);
    return pref === 'EVENING' ? 'EVENING' : 'MORNING';
  } catch {
    return 'MORNING';
  }
}

export function saveSchedulePreference(pref: 'MORNING' | 'EVENING'): void {
  try {
    localStorage.setItem(SCHEDULE_PREF_STORAGE_KEY, pref);
  } catch {}
}

export function getSavedSlotStates(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(DAILY_SLOT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSlotState(slotKey: string, completed: boolean): void {
  try {
    const current = getSavedSlotStates();
    current[slotKey] = completed;
    localStorage.setItem(DAILY_SLOT_STORAGE_KEY, JSON.stringify(current));
  } catch {}
}

export function getSavedMissionSteps(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(MISSION_STEPS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveMissionStep(stepId: string, completed: boolean): void {
  try {
    const current = getSavedMissionSteps();
    current[stepId] = completed;
    localStorage.setItem(MISSION_STEPS_STORAGE_KEY, JSON.stringify(current));
  } catch {}
}

export function getDefaultMissionSubSteps(chapter: string, subject: string) {
  return [
    {
      id: 'step_concept_review',
      title: 'Concept & Formula Review',
      durationMinutes: 30,
      type: 'CONCEPT_REVIEW' as const,
      description: `Deep-read key definitions, high-yield formulas, and theorem conditions in ${chapter}.`,
      actionLabel: 'Review Concepts'
    },
    {
      id: 'step_targeted_practice',
      title: 'Targeted IAT Question Drill',
      durationMinutes: 30,
      type: 'TARGETED_PRACTICE' as const,
      description: `Solve 10–12 foundational and previous-year questions with focused accuracy.`,
      actionLabel: 'Practice Questions'
    },
    {
      id: 'step_error_review',
      title: 'Mistake Analysis & Doubt Surgery',
      durationMinutes: 15,
      type: 'ERROR_REVIEW' as const,
      description: `Log incorrect questions, note the core conceptual reason, and query AI doubt solver.`,
      actionLabel: 'Error Surgery'
    }
  ];
}

export function getStoredAiStudyPlan(): AiGeneratedStudyPlan | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const plan: AiGeneratedStudyPlan = JSON.parse(raw);

    // Auto-enrich existing plan if missing the 7-day schedule or fallback weak areas
    let modified = false;
    if (!plan.sevenDaySchedule || plan.sevenDaySchedule.length === 0) {
      plan.sevenDaySchedule = generate7DaySchedule(plan.answers);
      modified = true;
    }
    if (!plan.fallbackWeakAreas || plan.fallbackWeakAreas.length === 0) {
      plan.fallbackWeakAreas = getSynthesizedWeakAreas(plan.answers);
      modified = true;
    }
    if (!plan.dailyAction.subSteps || plan.dailyAction.subSteps.length === 0) {
      plan.dailyAction.subSteps = getDefaultMissionSubSteps(plan.dailyAction.targetChapter || 'Foundations', plan.dailyAction.subject || 'Subject');
      modified = true;
    }
    if (modified) {
      saveAiStudyPlan(plan);
    }
    return plan;
  } catch {
    return null;
  }
}

export function saveAiStudyPlan(plan: AiGeneratedStudyPlan): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plan));
  } catch (err) {
    console.error('Failed to save study plan:', err);
  }
}

export function isDailyActionCompleted(planId: string): boolean {
  try {
    return localStorage.getItem(`${DAILY_ACTION_STORAGE_KEY}_${planId}`) === 'true';
  } catch {
    return false;
  }
}

export function setDailyActionCompleted(planId: string, completed: boolean): void {
  try {
    localStorage.setItem(`${DAILY_ACTION_STORAGE_KEY}_${planId}`, completed ? 'true' : 'false');
  } catch {}
}

export function getSavedChecklistState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveChecklistState(states: Record<string, boolean>): void {
  try {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(states));
  } catch {}
}

// ── Lesson Resolver Utility ───────────────────────────────────────────────
export function resolveLessonTarget(chapterQuery?: string, subjectHint?: string): ResolvedLessonRoute {
  if (!chapterQuery || chapterQuery.trim() === '') {
    if (subjectHint && ['Physics', 'Chemistry', 'Mathematics', 'Biology'].includes(subjectHint)) {
      return {
        subject: subjectHint,
        route: `smart_lessons:${subjectHint}`,
        label: `${subjectHint} Hub`
      };
    }
    return {
      route: 'smart_lessons',
      label: 'Smart Lessons'
    };
  }

  const q = chapterQuery.trim().toLowerCase();

  // 1. Direct dictionary for all diagnosed weakness hurdles & blueprint chapters
  const exactMap: Record<string, string> = {
    // Mathematics Hurdles
    'conic sections (parabola, ellipse, hyperbola)': 'math_straight_lines',
    'conic sections': 'math_straight_lines',
    'coordinate geometry': 'math_straight_lines',
    'matrices, determinants & system of equations': 'math_matrices',
    'matrices & determinants': 'math_matrices',
    'matrices': 'math_matrices',
    'determinants': 'math_matrices',
    'vectors & 3-dimensional geometry planes': 'math_vec',
    'vectors & 3d geometry': 'math_vec',
    'vectors': 'math_vec',
    '3d geometry': 'math_3d_geo',
    'probability, bayes theorem & distributions': 'math_prob',
    'probability & statistics': 'math_prob',
    'probability': 'math_prob',
    'sets, relations & functions': 'math_sets',
    'sets, relations and functions': 'math_sets',
    'calculus & definite integration tricks': 'math_integ_basics',
    'calculus applications in physics': 'math_integ_basics',
    'integration & applications': 'math_integ_basics',
    'differentiation & aod': 'math_diff',
    'limits & continuity': 'math_limits_deriv',
    'complex numbers, quadratics & inequalities': 'math_complex',
    'basic counting techniques & binomial theorem': 'math_perm_comb',
    'trigonometry & inverse trigonometry': 'math_trig',
    'sequences and series': 'math_seq_series',
    'differential equations': 'math_diff_eq',

    // Physics Hurdles
    'rotational dynamics & torque numericals': 'phy_rotation',
    'system of particles and rotational motion': 'phy_rotation',
    'calculus in kinematics & mechanics': 'phy_motion_straight',
    'motion in a straight line': 'phy_motion_straight',
    'laws of motion': 'phy_mechanics',
    'work, energy and power': 'phy_work_energy',
    'electromagnetism & induced emf': 'phy_em_induction',
    'electromagnetic induction': 'phy_em_induction',
    'wave optics & interference derivations': 'phy_wave_optics',
    'wave optics': 'phy_wave_optics',
    'ray optics and optical instruments': 'phy_ray_optics',
    'thermodynamics & heat engines': 'phy_thermo',
    'units, dimensions & errors': 'phy_units',
    'units, measurements & error analysis': 'phy_units',
    'gravitation': 'phy_gravitation',
    'fluid mechanics': 'phy_mech_fluid',
    'mechanical properties of fluids (fluid mechanics)': 'phy_mech_fluid',
    'mechanical properties of solids': 'phy_mech_solid',
    'oscillations': 'phy_oscillations',
    'waves': 'phy_waves',
    'electrostatics': 'phy_electrostatics',
    'electrostatic potential and capacitance': 'phy_potential_cap',
    'current electricity': 'phy_current_elec',
    'moving charges and magnetism': 'phy_moving_charges',
    'magnetism and matter': 'phy_mag_matter',
    'semiconductor electronics': 'phy_semiconductor',

    // Chemistry Hurdles
    'organic reaction mechanisms (sn1/sn2, aldol, cannizzaro)': 'chem_org_basics',
    'organic chemistry: some basic principles and techniques': 'chem_org_basics',
    'ionic & chemical equilibrium stoichiometry': 'chem_eq',
    'equilibrium': 'chem_eq',
    'coordination compounds & crystal field theory': 'chem_coord',
    'coordination compounds': 'chem_coord',
    'electrochemistry & nernst equation numericals': 'chem_electrochemistry',
    'electrochemistry & kinetics': 'chem_electrochemistry',
    'electrochemistry': 'chem_electrochemistry',
    'chemical kinetics': 'chem_kinetics',
    'thermodynamics & entropy calculations': 'chem_thermo',
    'chemical bonding & periodic table': 'chem_bonding',
    'chemical bonding and molecular structure': 'chem_bonding',
    'biomolecules & organic chemistry': 'chem_biomolecules',
    'biomolecules': 'chem_biomolecules',
    'hydrocarbons': 'chem_hydrocarbons',
    'haloalkanes and haloarenes': 'chem_haloalkanes',
    'alcohols, phenols and ethers': 'chem_alcohol',
    'aldehydes, ketones and carboxylic acids': 'chem_aldehyde',
    'solutions': 'chem_solutions',
    'structure of atom': 'chem_atom_struct',

    // Biology Hurdles
    'genetics, mendelian ratios & molecular basis': 'bio_genetics',
    'genetics & molecular inheritance': 'bio_genetics',
    'genetics and evolution': 'bio_genetics',
    'photosynthesis & cellular respiration cycles': 'bio_plant_physio',
    'plant physiology': 'bio_plant_physio',
    'ecology, biodiversity & population dynamics': 'bio_ecology',
    'ecology & environmental biology': 'bio_ecology',
    'ecology and environment': 'bio_ecology',
    'human physiology & neural coordination': 'bio_human_physio',
    'human physiology': 'bio_human_physio',
    'biotechnology principles & applications': 'bio_biotech',
    'biotechnology & applications': 'bio_biotech',
    'biotechnology and its applications': 'bio_biotech',
    'cell: unit of life & cell cycle': 'bio_cell',
    'cell: structure and functions': 'bio_cell',
    'diversity in the living world': 'bio_diversity',
    'reproduction': 'bio_reproduction'
  };

  const directId = exactMap[q];
  if (directId) {
    const lesson = LESSONS_DATA.find(l => l.id === directId);
    if (lesson) {
      return {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        subject: lesson.subject,
        route: `/smart-lessons/${lesson.id}`,
        label: lesson.title
      };
    }
  }

  // 2. Exact Title match in LESSONS_DATA
  const exactTitle = LESSONS_DATA.find(l => l.title.toLowerCase() === q);
  if (exactTitle) {
    return {
      lessonId: exactTitle.id,
      lessonTitle: exactTitle.title,
      subject: exactTitle.subject,
      route: `/smart-lessons/${exactTitle.id}`,
      label: exactTitle.title
    };
  }

  // 3. Substring match, prioritizing subjectHint if provided
  const scopedLessons = subjectHint 
    ? [...LESSONS_DATA.filter(l => l.subject === subjectHint), ...LESSONS_DATA.filter(l => l.subject !== subjectHint)]
    : LESSONS_DATA;

  for (const l of scopedLessons) {
    const titleLower = l.title.toLowerCase();
    if (titleLower.includes(q) || q.includes(titleLower)) {
      return {
        lessonId: l.id,
        lessonTitle: l.title,
        subject: l.subject,
        route: `/smart-lessons/${l.id}`,
        label: l.title
      };
    }
  }

  // 4. Word-level overlap match (at least 2 matching significant words)
  const qWords = q.split(/[\s,&()]+/).filter(w => w.length > 3);
  if (qWords.length > 0) {
    for (const l of scopedLessons) {
      const titleWords = l.title.toLowerCase().split(/[\s,&()]+/);
      const matchedWords = qWords.filter(qw => titleWords.some(tw => tw.includes(qw) || qw.includes(tw)));
      if (matchedWords.length >= 2 || (qWords.length === 1 && matchedWords.length === 1)) {
        return {
          lessonId: l.id,
          lessonTitle: l.title,
          subject: l.subject,
          route: `/smart-lessons/${l.id}`,
          label: l.title
        };
      }
    }
  }

  // 5. Fallback to subject filter if subject is known
  if (subjectHint && ['Physics', 'Chemistry', 'Mathematics', 'Biology'].includes(subjectHint)) {
    return {
      subject: subjectHint,
      route: `smart_lessons:${subjectHint}`,
      label: `${subjectHint} Lessons`
    };
  }

  return {
    route: 'smart_lessons',
    label: 'Smart Lessons'
  };
}

// ── 7-Day Actionable Schedule Generator ──────────────────────────────────
export function generate7DaySchedule(answers: AiOnboardingAnswers): DaySchedulePlan[] {
  const { stream, weakSubject, strongSubject, weakTopicHurdle, dailyHours } = answers;

  // Derive secondary subjects
  const allSubs = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const remainingSubs = allSubs.filter(s => s !== weakSubject && s !== strongSubject);
  const midSub1 = remainingSubs[0] || 'Chemistry';
  const midSub2 = remainingSubs[1] || 'Physics';

  // Specific target chapters based on stream & hurdle
  const hurdleTarget = resolveLessonTarget(weakTopicHurdle, weakSubject);

  // High yield blueprint target
  const blueprintChap = stream === 'PCB' 
    ? 'Matrices & Determinants' 
    : stream === 'PCM' 
    ? 'Genetics & Molecular Inheritance' 
    : 'Chemical Bonding & Molecular Structure';
  const blueprintTarget = resolveLessonTarget(blueprintChap, stream === 'PCB' ? 'Mathematics' : stream === 'PCM' ? 'Biology' : 'Chemistry');

  const daysData = [
    {
      dayNumber: 1,
      dayLabel: 'Day 1 (Mon)',
      dayName: 'Monday',
      theme: 'Hurdle Surgery & Baseline Clarity',
      focusSubject: weakSubject,
      targetObjective: `Tackle your primary roadblock: ${weakTopicHurdle}. Solidify foundational formulas and eliminate conceptual fear.`
    },
    {
      dayNumber: 2,
      dayLabel: 'Day 2 (Tue)',
      dayName: 'Tuesday',
      theme: 'Numerical Speed & Derivation Mastery',
      focusSubject: strongSubject,
      targetObjective: `Capitalize on your strength in ${strongSubject}. Solve high-difficulty multi-step numerical questions under timed pressure.`
    },
    {
      dayNumber: 3,
      dayLabel: 'Day 3 (Wed)',
      dayName: 'Wednesday',
      theme: 'Strategic Blueprint High-Yield Sprint',
      focusSubject: stream === 'PCB' ? 'Mathematics' : (stream === 'PCM' ? 'Biology' : midSub1),
      targetObjective: stream === 'PCB' 
        ? 'Non-Calculus Math shortcut: Master Matrices, Determinants, and Vector lines for 25+ bonus marks.'
        : (stream === 'PCM' ? 'NCERT Biology rapid pass: Capture 30+ marks in 15 mins via Genetics & Ecology.' : 'Master cross-disciplinary physical chemistry and thermodynamic equilibria.')
    },
    {
      dayNumber: 4,
      dayLabel: 'Day 4 (Thu)',
      dayName: 'Thursday',
      theme: 'Mechanism Clarity & Conceptual Traps',
      focusSubject: midSub1,
      targetObjective: `Identify deceptive options and Section A negative-marking traps in ${midSub1}. Focus on core mechanisms and exceptions.`
    },
    {
      dayNumber: 5,
      dayLabel: 'Day 5 (Fri)',
      dayName: 'Friday',
      theme: 'Authentic IAT PYQ Marathon',
      focusSubject: 'All PCMB',
      targetObjective: 'Solve 15 official IISER Aptitude Test past questions from 2019-2024. Understand the exact examiner testing patterns.'
    },
    {
      dayNumber: 6,
      dayLabel: 'Day 6 (Sat)',
      dayName: 'Saturday',
      theme: 'Timed Sectional Simulation & Stamina',
      focusSubject: `${weakSubject} & ${strongSubject}`,
      targetObjective: 'Strict 60-minute timed sprint with negative marking penalty simulation. Train decision speed: attempt vs skip.'
    },
    {
      dayNumber: 7,
      dayLabel: 'Day 7 (Sun)',
      dayName: 'Sunday',
      theme: 'Zero-Backlog Audit & Error Logbook',
      focusSubject: 'Revision & Error Analysis',
      targetObjective: 'Deep audit of all questions solved incorrectly this week. Review formula flashcards and consolidate mistake notebook.'
    }
  ];

  return daysData.map((d) => {
    const morningSlots: DailyTimeSlot[] = [];
    const eveningSlots: DailyTimeSlot[] = [];

    if (dailyHours <= 3) {
      // 2 balanced slots (90m + 90m = 3 hrs)
      morningSlots.push(
        {
          id: `slot_d${d.dayNumber}_m1`,
          timeSlot: '06:00 AM – 07:30 AM',
          period: 'MORNING',
          title: `Deep Focus: ${d.theme}`,
          durationMinutes: 90,
          subject: d.focusSubject,
          focusType: d.dayNumber === 1 ? 'WEAK_SURGERY' : (d.dayNumber === 5 ? 'MOCK_PYQ' : 'NUMERICAL_DRILL'),
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : (d.dayNumber === 3 ? blueprintChap : `${d.focusSubject} Core`),
          route: d.dayNumber === 1 ? hurdleTarget.route : (d.dayNumber === 3 ? blueprintTarget.route : (d.dayNumber === 5 ? 'pyqs' : `smart_lessons:${d.focusSubject}`)),
          routeLabel: d.dayNumber === 5 ? 'Open PYQ Hub' : 'Launch Drill'
        },
        {
          id: `slot_d${d.dayNumber}_m2`,
          timeSlot: '07:45 AM – 09:15 AM',
          period: 'MORNING',
          title: 'Active Solving & Quick Error Review',
          durationMinutes: 90,
          subject: d.dayNumber % 2 === 0 ? weakSubject : strongSubject,
          focusType: 'ERROR_LOGBOOK',
          description: 'Solve 15 practice questions and log doubts into your error notebook for instant retention.',
          targetChapter: `${d.focusSubject} Practice Set`,
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );

      eveningSlots.push(
        {
          id: `slot_d${d.dayNumber}_e1`,
          timeSlot: '05:30 PM – 07:00 PM',
          period: 'EVENING',
          title: `After-School Focus: ${d.theme}`,
          durationMinutes: 90,
          subject: d.focusSubject,
          focusType: d.dayNumber === 1 ? 'WEAK_SURGERY' : (d.dayNumber === 5 ? 'MOCK_PYQ' : 'NUMERICAL_DRILL'),
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : (d.dayNumber === 3 ? blueprintChap : `${d.focusSubject} Core`),
          route: d.dayNumber === 1 ? hurdleTarget.route : (d.dayNumber === 3 ? blueprintTarget.route : (d.dayNumber === 5 ? 'pyqs' : `smart_lessons:${d.focusSubject}`)),
          routeLabel: d.dayNumber === 5 ? 'Open PYQ Hub' : 'Launch Drill'
        },
        {
          id: `slot_d${d.dayNumber}_e2`,
          timeSlot: '08:00 PM – 09:30 PM',
          period: 'NIGHT',
          title: 'Timed Numerical Solving & Flashcards',
          durationMinutes: 90,
          subject: d.dayNumber % 2 === 0 ? weakSubject : strongSubject,
          focusType: 'ERROR_LOGBOOK',
          description: 'Timed questions and revision of formula sheets before wrapping up the day.',
          targetChapter: `${d.focusSubject} Practice Set`,
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );
    } else if (dailyHours <= 6) {
      // 3-4 slots (approx 5 hrs total: 90m + 90m + 75m + 45m = 300m = 5 hrs)
      morningSlots.push(
        {
          id: `slot_d${d.dayNumber}_m1`,
          timeSlot: '06:00 AM – 07:30 AM',
          period: 'MORNING',
          title: `Slot 1: High-Energy Focus on ${d.focusSubject}`,
          durationMinutes: 90,
          subject: d.focusSubject,
          focusType: d.dayNumber === 1 ? 'WEAK_SURGERY' : 'NUMERICAL_DRILL',
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : `${d.focusSubject} Core`,
          route: d.dayNumber === 1 ? hurdleTarget.route : `smart_lessons:${d.focusSubject}`,
          routeLabel: 'Open Lesson'
        },
        {
          id: `slot_d${d.dayNumber}_m2`,
          timeSlot: '07:45 AM – 09:15 AM',
          period: 'MORNING',
          title: `Slot 2: Active Problem Solving & Derivations`,
          durationMinutes: 90,
          subject: d.dayNumber % 2 === 0 ? strongSubject : midSub1,
          focusType: 'NUMERICAL_DRILL',
          description: 'Solve 18–20 multi-step problems with full scratchpad derivations.',
          targetChapter: 'Derivations & Numerical Drills',
          route: `smart_lessons:${d.dayNumber % 2 === 0 ? strongSubject : midSub1}`,
          routeLabel: 'Solve Practice Set'
        },
        {
          id: `slot_d${d.dayNumber}_m3`,
          timeSlot: '02:00 PM – 03:15 PM',
          period: 'AFTERNOON',
          title: `Slot 3: Blueprint & NCERT Precision`,
          durationMinutes: 75,
          subject: stream === 'PCB' ? 'Mathematics' : (stream === 'PCM' ? 'Biology' : midSub2),
          focusType: 'NCERT_MEMORIZE',
          description: stream === 'PCB' ? 'Formula drill on Matrices & Vector algebra.' : (stream === 'PCM' ? 'Read NCERT Biology summaries line-by-line.' : 'Physical & inorganic chemistry flashcards.'),
          targetChapter: stream === 'PCB' ? 'Matrices & Determinants' : 'High-Yield Theory',
          route: stream === 'PCB' ? blueprintTarget.route : (stream === 'PCM' ? blueprintTarget.route : `smart_lessons:${midSub2}`),
          routeLabel: 'Open Theory'
        },
        {
          id: `slot_d${d.dayNumber}_m4`,
          timeSlot: '08:30 PM – 09:15 PM',
          period: 'NIGHT',
          title: `Slot 4: Error Notebook & Spaced Repetition`,
          durationMinutes: 45,
          subject: 'All Subjects',
          focusType: 'ERROR_LOGBOOK',
          description: 'Log all missed questions into your Mistake Notebook and ask AI Tutor to clarify lingering doubts.',
          targetChapter: 'Daily Error Surgery',
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );

      eveningSlots.push(
        {
          id: `slot_d${d.dayNumber}_e1`,
          timeSlot: '04:30 PM – 06:00 PM',
          period: 'AFTERNOON',
          title: `Slot 1: Hurdle Surgery & Fresh Start`,
          durationMinutes: 90,
          subject: d.focusSubject,
          focusType: d.dayNumber === 1 ? 'WEAK_SURGERY' : 'NUMERICAL_DRILL',
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : `${d.focusSubject} Core`,
          route: d.dayNumber === 1 ? hurdleTarget.route : `smart_lessons:${d.focusSubject}`,
          routeLabel: 'Open Lesson'
        },
        {
          id: `slot_d${d.dayNumber}_e2`,
          timeSlot: '06:30 PM – 08:00 PM',
          period: 'EVENING',
          title: `Slot 2: Speed Drills & Formula Derivations`,
          durationMinutes: 90,
          subject: d.dayNumber % 2 === 0 ? strongSubject : midSub1,
          focusType: 'NUMERICAL_DRILL',
          description: 'Solve 18–20 multi-step problems with scratchpad derivations.',
          targetChapter: 'Derivations & Numerical Drills',
          route: `smart_lessons:${d.dayNumber % 2 === 0 ? strongSubject : midSub1}`,
          routeLabel: 'Solve Practice Set'
        },
        {
          id: `slot_d${d.dayNumber}_e3`,
          timeSlot: '08:45 PM – 10:00 PM',
          period: 'NIGHT',
          title: `Slot 3: Blueprint & NCERT Precision`,
          durationMinutes: 75,
          subject: stream === 'PCB' ? 'Mathematics' : (stream === 'PCM' ? 'Biology' : midSub2),
          focusType: 'NCERT_MEMORIZE',
          description: stream === 'PCB' ? 'Formula drill on Matrices & Vector algebra.' : (stream === 'PCM' ? 'Read NCERT Biology summaries line-by-line.' : 'Physical & inorganic chemistry flashcards.'),
          targetChapter: stream === 'PCB' ? 'Matrices & Determinants' : 'High-Yield Theory',
          route: stream === 'PCB' ? blueprintTarget.route : (stream === 'PCM' ? blueprintTarget.route : `smart_lessons:${midSub2}`),
          routeLabel: 'Open Theory'
        },
        {
          id: `slot_d${d.dayNumber}_e4`,
          timeSlot: '10:15 PM – 11:00 PM',
          period: 'NIGHT',
          title: `Slot 4: Error Notebook & Spaced Repetition`,
          durationMinutes: 45,
          subject: 'All Subjects',
          focusType: 'ERROR_LOGBOOK',
          description: 'Log all missed questions into your Mistake Notebook and ask AI Tutor to clarify lingering doubts.',
          targetChapter: 'Daily Error Surgery',
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );
    } else {
      // Intensive 8+ hours (120m + 120m + 90m + 90m + 60m = 480m = 8 hrs)
      morningSlots.push(
        {
          id: `slot_d${d.dayNumber}_m1`,
          timeSlot: '06:00 AM – 08:00 AM',
          period: 'MORNING',
          title: `Slot 1: Deep Hurdle Surgery & Derivations`,
          durationMinutes: 120,
          subject: d.focusSubject,
          focusType: 'WEAK_SURGERY',
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : `${d.focusSubject} Advanced`,
          route: d.dayNumber === 1 ? hurdleTarget.route : `smart_lessons:${d.focusSubject}`,
          routeLabel: 'Deep Dive'
        },
        {
          id: `slot_d${d.dayNumber}_m2`,
          timeSlot: '08:30 AM – 10:30 AM',
          period: 'MORNING',
          title: `Slot 2: Advanced Numerical Marathon`,
          durationMinutes: 120,
          subject: strongSubject,
          focusType: 'NUMERICAL_DRILL',
          description: 'Solve 25+ challenging IAT/JEE-Advanced level numericals with stopwatch timing.',
          targetChapter: `${strongSubject} Problem Set`,
          route: `smart_lessons:${strongSubject}`,
          routeLabel: 'Solve Set'
        },
        {
          id: `slot_d${d.dayNumber}_m3`,
          timeSlot: '02:00 PM – 03:30 PM',
          period: 'AFTERNOON',
          title: `Slot 3: Official PYQ & Exam Simulation`,
          durationMinutes: 90,
          subject: midSub1,
          focusType: 'MOCK_PYQ',
          description: 'Direct past paper questions analysis and elimination techniques.',
          targetChapter: 'Official IAT PYQs',
          route: 'pyqs',
          routeLabel: 'Open PYQ Hub'
        },
        {
          id: `slot_d${d.dayNumber}_m4`,
          timeSlot: '04:00 PM – 05:30 PM',
          period: 'AFTERNOON',
          title: `Slot 4: Tactical Blueprint & Memorization`,
          durationMinutes: 90,
          subject: stream === 'PCB' ? 'Mathematics' : (stream === 'PCM' ? 'Biology' : midSub2),
          focusType: 'NCERT_MEMORIZE',
          description: stream === 'PCB' ? 'Non-Calculus Math problem drills (Matrices & Vectors).' : 'NCERT line-by-line reading & keyword recall.',
          targetChapter: 'Strategic Advantage',
          route: stream === 'PCB' ? blueprintTarget.route : `smart_lessons:${midSub2}`,
          routeLabel: 'Open Blueprint'
        },
        {
          id: `slot_d${d.dayNumber}_m5`,
          timeSlot: '08:30 PM – 09:30 PM',
          period: 'NIGHT',
          title: `Slot 5: Error Notebook Audit & Daily Recap`,
          durationMinutes: 60,
          subject: 'All PCMB',
          focusType: 'ERROR_LOGBOOK',
          description: 'Audit incorrect questions, formula flashcards, and query AI doubt solver.',
          targetChapter: 'Zero Backlog Surgery',
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );

      eveningSlots.push(
        {
          id: `slot_d${d.dayNumber}_e1`,
          timeSlot: '02:30 PM – 04:30 PM',
          period: 'AFTERNOON',
          title: `Slot 1: Deep Hurdle Surgery & Derivations`,
          durationMinutes: 120,
          subject: d.focusSubject,
          focusType: 'WEAK_SURGERY',
          description: d.targetObjective,
          targetChapter: d.dayNumber === 1 ? weakTopicHurdle : `${d.focusSubject} Advanced`,
          route: d.dayNumber === 1 ? hurdleTarget.route : `smart_lessons:${d.focusSubject}`,
          routeLabel: 'Deep Dive'
        },
        {
          id: `slot_d${d.dayNumber}_e2`,
          timeSlot: '05:00 PM – 07:00 PM',
          period: 'EVENING',
          title: `Slot 2: Advanced Numerical Marathon`,
          durationMinutes: 120,
          subject: strongSubject,
          focusType: 'NUMERICAL_DRILL',
          description: 'Solve 25+ challenging IAT/JEE-Advanced level numericals with stopwatch timing.',
          targetChapter: `${strongSubject} Problem Set`,
          route: `smart_lessons:${strongSubject}`,
          routeLabel: 'Solve Set'
        },
        {
          id: `slot_d${d.dayNumber}_e3`,
          timeSlot: '07:30 PM – 09:00 PM',
          period: 'NIGHT',
          title: `Slot 3: Official PYQ & Exam Simulation`,
          durationMinutes: 90,
          subject: midSub1,
          focusType: 'MOCK_PYQ',
          description: 'Direct past paper questions analysis and elimination techniques.',
          targetChapter: 'Official IAT PYQs',
          route: 'pyqs',
          routeLabel: 'Open PYQ Hub'
        },
        {
          id: `slot_d${d.dayNumber}_e4`,
          timeSlot: '09:30 PM – 11:00 PM',
          period: 'NIGHT',
          title: `Slot 4: Tactical Blueprint & Memorization`,
          durationMinutes: 90,
          subject: stream === 'PCB' ? 'Mathematics' : (stream === 'PCM' ? 'Biology' : midSub2),
          focusType: 'NCERT_MEMORIZE',
          description: stream === 'PCB' ? 'Non-Calculus Math problem drills (Matrices & Vectors).' : 'NCERT line-by-line reading & keyword recall.',
          targetChapter: 'Strategic Advantage',
          route: stream === 'PCB' ? blueprintTarget.route : `smart_lessons:${midSub2}`,
          routeLabel: 'Open Blueprint'
        },
        {
          id: `slot_d${d.dayNumber}_e5`,
          timeSlot: '11:15 PM – 12:15 AM',
          period: 'NIGHT',
          title: `Slot 5: Error Notebook Audit & Daily Recap`,
          durationMinutes: 60,
          subject: 'All PCMB',
          focusType: 'ERROR_LOGBOOK',
          description: 'Audit incorrect questions, formula flashcards, and query AI doubt solver.',
          targetChapter: 'Zero Backlog Surgery',
          route: 'ai_doubt_solver',
          routeLabel: 'Ask AI Tutor'
        }
      );
    }

    return {
      dayNumber: d.dayNumber,
      dayLabel: d.dayLabel,
      dayName: d.dayName,
      theme: d.theme,
      focusSubject: d.focusSubject,
      targetObjective: d.targetObjective,
      morningSlots,
      eveningSlots
    };
  });
}

// ── Synthesized Weak Area Diagnostic Hub (Fallback for New Users) ───────
export function getSynthesizedWeakAreas(answers: AiOnboardingAnswers): WeakAreaDiagnosis[] {
  const { weakSubject, weakTopicHurdle, stream } = answers;
  const hurdleTarget = resolveLessonTarget(weakTopicHurdle, weakSubject);

  const card1: WeakAreaDiagnosis = {
    id: 'diag_hurdle',
    subject: weakSubject,
    chapter: weakTopicHurdle || `${weakSubject} Core Principles`,
    topic: 'Identified Primary Bottleneck',
    urgency: 'CRITICAL',
    reason: `Diagnosed as your highest-anxiety hurdle during calibration. Historically costs candidates 12–16 marks in IAT due to formula hesitation under timed pressure.`,
    markImpact: '+16 Marks at Stake',
    route: hurdleTarget.route,
    routeLabel: hurdleTarget.lessonTitle ? `Fix ${hurdleTarget.lessonTitle}` : `Master ${weakSubject}`,
    isRealData: false
  };

  let card2: WeakAreaDiagnosis;
  if (stream === 'PCB') {
    const mathTarget = resolveLessonTarget('Matrices & Determinants', 'Mathematics');
    card2 = {
      id: 'diag_stream_trap',
      subject: 'Mathematics',
      chapter: 'Matrices, Determinants & 3D Vectors',
      topic: 'Non-Calculus Scoring Trap',
      urgency: 'HIGH',
      reason: '78% of PCB candidates leave Math completely blank, surrendering 60 potential marks. Mastering algebra & determinants recovers 24+ marks easily.',
      markImpact: '+24 Marks Potential',
      route: mathTarget.route,
      routeLabel: 'Open Math Blueprint',
      isRealData: false
    };
  } else if (stream === 'PCM') {
    const bioTarget = resolveLessonTarget('Genetics & Molecular Inheritance', 'Biology');
    card2 = {
      id: 'diag_stream_trap',
      subject: 'Biology',
      chapter: 'Genetics, Evolution & Ecology',
      topic: 'Direct NCERT Factual Retrieval',
      urgency: 'HIGH',
      reason: 'PCM students often over-solve complex math and ignore easy NCERT Biology questions that take only 20 seconds each with zero calculation.',
      markImpact: '+28 Marks Potential',
      route: bioTarget.route,
      routeLabel: 'Open NCERT Bio Fast-Track',
      isRealData: false
    };
  } else {
    const chemTarget = resolveLessonTarget('Organic Chemistry: Some Basic Principles and Techniques', 'Chemistry');
    card2 = {
      id: 'diag_stream_trap',
      subject: 'Chemistry',
      chapter: 'Organic Reaction Mechanisms (SN1/SN2, Aldol)',
      topic: 'Multi-Step Synthesis Trap',
      urgency: 'HIGH',
      reason: 'IAT tests electronic effects and stereochemistry with deceptive distractors. Candidates lose marks by confusing nucleophilic attack pathways.',
      markImpact: '+16 Marks Potential',
      route: chemTarget.route,
      routeLabel: 'Master Mechanisms',
      isRealData: false
    };
  }

  const card3: WeakAreaDiagnosis = {
    id: 'diag_negative_marking',
    subject: 'All Subjects',
    chapter: 'Negative Marking Elimination in Section A',
    topic: 'Careless Error Audit',
    urgency: 'MODERATE',
    reason: 'Eliminating just 3 wild guesses per paper saves 15 marks (+3 correct equivalent), vaulting your rank by 120+ spots in IISER cutoffs.',
    markImpact: '+15 Net Marks Saved',
    route: 'ai_doubt_solver',
    routeLabel: 'Ask AI Tutor Pacing Strategy',
    isRealData: false
  };

  return [card1, card2, card3];
}

// ── Smart Fallback & Deterministic Plan Generator ─────────────────────────
export function buildDeterministicStudyPlan(answers: AiOnboardingAnswers, userName: string = 'Aspirant'): AiGeneratedStudyPlan {
  const { stream, weakSubject, strongSubject, dailyHours, targetInstitute, targetAir, weakTopicHurdle } = answers;
  const planId = `plan_${Date.now()}`;

  // 1. Headline Strategy
  let headlineStrategy = `Tailored ${dailyHours} hrs/day roadmap for ${targetInstitute}. `;
  if (stream === 'PCB') {
    headlineStrategy += `Maximizing Physics & Chemistry fundamentals while executing the Non-Calculus Math Blueprint to lock 25+ bonus marks.`;
  } else if (stream === 'PCM') {
    headlineStrategy += `Capitalizing on your quantitative Math/Physics edge while leveraging NCERT Biology for 30+ rapid, free marks.`;
  } else if (stream === 'DROPPER') {
    headlineStrategy += `High-intensity problem drills targeting weak spots, negative marking reduction, and weekly 180-min mock stamina.`;
  } else {
    headlineStrategy += `Building balanced 4-subject conceptual depth with focused surgery on ${weakSubject}.`;
  }

  // 2. Special Strategic Blueprint
  let specialBlueprint: AiGeneratedStudyPlan['specialBlueprint'];
  if (stream === 'PCB') {
    specialBlueprint = {
      title: 'Strategic Mathematics Blueprint for PCB Aspirants',
      subtitle: 'Target 25–35 Marks without complex multivariable calculus',
      badge: 'PCB High-Yield Hack',
      description: 'Most medical/PCB students leave all 15 Math questions blank in IAT, losing 60 possible marks. By mastering 5 high-yield, purely algebraic and coordinate topics, you can easily secure 25–35 marks in under 30 minutes!',
      tactics: [
        'Skip lengthy calculus derivations; focus on formula-driven matrix & determinant questions.',
        'Master Vector dot & cross products + 3D line formulas (guaranteed 2 questions in every IAT).',
        'Solve 10 years of easy IAT/JEE-M questions from Probability, Sets, and Statistics.'
      ],
      recommendedChapters: [
        { name: 'Matrices & Determinants', why: 'Direct formula applications, system of linear equations.' },
        { name: 'Vectors & 3D Geometry', why: 'Guaranteed 2-3 questions with predictable standard forms.' },
        { name: 'Probability & Statistics', why: 'High score rate, intuitive for logical thinkers.' },
        { name: 'Sets, Relations & Functions', why: 'Pure definitions and basic algebraic mappings.' }
      ]
    };
  } else if (stream === 'PCM') {
    specialBlueprint = {
      title: 'High-Yield Biology Fast-Track Blueprint for PCM Aspirants',
      subtitle: 'Capture 30–40 easy marks in 15 minutes via direct NCERT concepts',
      badge: 'PCM High-Yield Hack',
      description: 'Biology in IAT is 85% direct NCERT factual retrieval. While math questions take 3-4 minutes each, biology questions take 20 seconds. This is your easiest route to a Top 100 AIR in IAT!',
      tactics: [
        'Read NCERT Biology summaries and bold text for Ecology and Genetics.',
        'Memorize key cell organelle functions and cell cycle stages (Mitosis/Meiosis).',
        'Do not get bogged down in animal anatomy; focus on high-yield molecular genetics and biotechnology.'
      ],
      recommendedChapters: [
        { name: 'Genetics & Molecular Inheritance', why: 'Conceptual and logic-based; math students grasp this fast.' },
        { name: 'Ecology & Environmental Biology', why: 'Pure reading comprehension with zero math required.' },
        { name: 'Cell: Unit of Life & Cell Cycle', why: 'Fundamental, direct factual questions.' },
        { name: 'Biotechnology & Applications', why: 'High-yield modern biology with predictable questions.' }
      ]
    };
  } else if (stream === 'PCMB') {
    specialBlueprint = {
      title: 'Composite 4-Subject Synergy Blueprint',
      subtitle: 'Balance depth and speed across all 60 questions',
      badge: 'PCMB Master Advantage',
      description: 'You have the ultimate competitive advantage for IISER. The key is avoiding subject burnout by enforcing strict time splits during mock tests (45 mins per subject).',
      tactics: [
        'Rotate daily problem solving: 2 hours analytical (Physics/Math) + 2 hours conceptual (Chem/Bio).',
        'Keep separate formula sheets for physical formulas vs biological pathways.',
        'Target 15/15 questions in your strongest subject and 10/15 in your weakest.'
      ],
      recommendedChapters: [
        { name: 'Electrochemistry & Kinetics', why: 'Bridges physics calculations with chemical principles.' },
        { name: 'Biomolecules & Organic Chemistry', why: 'Cross-disciplinary overlap saves 50% revision time.' },
        { name: 'Calculus Applications in Physics', why: 'Kinematics and EM induction derivations become effortless.' }
      ]
    };
  } else {
    specialBlueprint = {
      title: 'Rank Booster & Negative-Marking Surgery Blueprint',
      subtitle: 'Transform weak topics into safe scoring chapters',
      badge: 'Precision Strategy',
      description: `Targeting ${targetAir} requires cutting out unforced negative marks in ${weakSubject}. A single negative mark drops your IAT rank by 40 positions.`,
      tactics: [
        `Dedicate the first 90 minutes of every morning strictly to ${weakSubject}.`,
        'Never guess in Section A; practice disciplined elimination technique on PYQs.',
        'Maintain a physical "Mistake Logbook" for every numerical error made in tests.'
      ],
      recommendedChapters: [
        { name: weakTopicHurdle || 'Core Foundation Topics', why: 'Target your diagnosed weakest area first.' },
        { name: 'Chemical Bonding & Periodic Table', why: 'The backbone of 40% of chemistry questions.' },
        { name: 'Units, Dimensions & Errors', why: 'Zero-effort marks that prevent dimensional blunders.' }
      ]
    };
  }

  // 3. Weekly Hourly Allocation
  const totalWeeklyHours = dailyHours * 6; // 6 study days, 1 review day
  let physPct = 25, chemPct = 25, mathPct = 25, bioPct = 25;

  if (weakSubject === 'Physics') { physPct = 35; chemPct = 25; mathPct = 20; bioPct = 20; }
  else if (weakSubject === 'Chemistry') { chemPct = 35; physPct = 25; mathPct = 20; bioPct = 20; }
  else if (weakSubject === 'Mathematics') { mathPct = 35; physPct = 25; chemPct = 25; bioPct = 15; }
  else if (weakSubject === 'Biology') { bioPct = 35; chemPct = 25; physPct = 25; mathPct = 15; }

  const weeklyHourlyAllocation = [
    {
      subject: 'Physics',
      hours: Math.round((totalWeeklyHours * physPct) / 100),
      percentage: physPct,
      color: 'bg-indigo-500',
      focusNote: weakSubject === 'Physics' ? `Priority Focus: ${weakTopicHurdle}` : 'Core derivations & numerical drills'
    },
    {
      subject: 'Chemistry',
      hours: Math.round((totalWeeklyHours * chemPct) / 100),
      percentage: chemPct,
      color: 'bg-cyan-500',
      focusNote: weakSubject === 'Chemistry' ? `Priority Focus: ${weakTopicHurdle}` : 'Mechanism clarity & NCERT memorization'
    },
    {
      subject: 'Mathematics',
      hours: Math.round((totalWeeklyHours * mathPct) / 100),
      percentage: mathPct,
      color: 'bg-amber-500',
      focusNote: stream === 'PCB' ? 'Non-Calculus high-yield topics (Matrices, Vectors)' : (weakSubject === 'Mathematics' ? `Priority: ${weakTopicHurdle}` : 'Calculus & coordinate geometry speed')
    },
    {
      subject: 'Biology',
      hours: Math.round((totalWeeklyHours * bioPct) / 100),
      percentage: bioPct,
      color: 'bg-emerald-500',
      focusNote: stream === 'PCM' ? 'High-yield NCERT facts (Genetics, Ecology)' : (weakSubject === 'Biology' ? `Priority: ${weakTopicHurdle}` : 'Detailed physiological pathways')
    }
  ];

  // 4. Today's Immediate Action Mission
  const resolvedTarget = resolveLessonTarget(weakTopicHurdle, weakSubject);
  const targetChapName = weakTopicHurdle || resolvedTarget.lessonTitle || `${weakSubject} Fundamentals`;
  const dailyAction = {
    id: 'mission_day_1',
    dayNumber: 1,
    title: `Day 1 Priority: Master ${targetChapName}`,
    subject: weakSubject,
    actionType: 'SMART_LESSON',
    description: `Complete the core concept review and solve 15 targeted IAT practice questions to tackle your primary hurdle in ${weakSubject}.`,
    estimatedMinutes: 75,
    targetChapter: targetChapName,
    targetLessonId: resolvedTarget.lessonId,
    targetLessonTitle: resolvedTarget.lessonTitle,
    route: resolvedTarget.route,
    completed: false,
    subSteps: getDefaultMissionSubSteps(targetChapName, weakSubject)
  };

  // 5. Four Strategic Lifecycle Phases
  const phases: AiGeneratedStudyPlan['phases'] = [
    {
      id: 'PHASE_1',
      title: 'Foundation & Baseline',
      timeline: 'Weeks 1–6 (Active)',
      targetProgress: 25,
      description: 'Solidify fundamental concepts, clear previous backlogs, and execute the specialized 4th-subject blueprint.',
      keyMilestones: [
        'Complete 15 Smart Lessons in weak and core areas',
        'Establish 4-hour daily consistency and zero-backlog habit',
        'Achieve >65% accuracy on foundational chapter quizzes'
      ],
      verificationCriteria: '15 Chapters Completed • 250 Questions Evaluated',
      status: 'ACTIVE'
    },
    {
      id: 'PHASE_2',
      title: 'Concept Mastery',
      timeline: 'Weeks 7–16 (Next)',
      targetProgress: 65,
      description: 'Intensive numerical derivations, organic mechanism synthesis, and timed question sets.',
      keyMilestones: [
        'Cover 70% of high-weightage IAT syllabus',
        'Solve 500+ multi-step numerical problems with derivations',
        'Begin sectional 45-minute timed subject tests'
      ],
      verificationCriteria: '45 Chapters Mastered • >75% Subject Accuracy',
      status: 'UPCOMING'
    },
    {
      id: 'PHASE_3',
      title: 'Mock Test Sprint',
      timeline: 'Weeks 17–24',
      targetProgress: 90,
      description: 'CBT exam simulation, negative-marking audit, and rapid revision queues.',
      keyMilestones: [
        'Attempt 10 full-length 180-minute IAT CBT mock tests',
        'Reduce unforced negative marks below 12 marks per paper',
        'Solve all official IAT PYQs from 2017 to 2024'
      ],
      verificationCriteria: '10 Full Mocks • Score Consistency > 150/240',
      status: 'LOCKED'
    },
    {
      id: 'PHASE_4',
      title: 'Final 30-Day Peak',
      timeline: 'Last 30 Days',
      targetProgress: 100,
      description: 'Formula flashcards, error notebook memorization, and mental conditioning for IISER admission.',
      keyMilestones: [
        'Daily formula sheet review and rapid NCERT passes',
        'Final 3 simulation tests in exact exam morning slot (9 AM - 12 PM)',
        'Consolidate Top 100 AIR exam-day time distribution'
      ],
      verificationCriteria: 'Final Exam Readiness Confirmed',
      status: 'LOCKED'
    }
  ];

  // 6. This Week's Checklist with Direct Deep-Links
  const chk1Target = resolveLessonTarget(weakTopicHurdle, weakSubject);
  const chk3Target = stream === 'PCB' 
    ? resolveLessonTarget('Matrices & Determinants', 'Mathematics')
    : stream === 'PCM'
    ? resolveLessonTarget('Genetics & Molecular Inheritance', 'Biology')
    : stream === 'PCMB'
    ? resolveLessonTarget('Organic Chemistry: Some Basic Principles and Techniques', 'Chemistry')
    : resolveLessonTarget(weakTopicHurdle, weakSubject);

  const weeklyChecklist: WeeklyChecklistItem[] = [
    {
      id: 'chk_1',
      task: `Complete Smart Lesson & quiz on ${weakTopicHurdle || weakSubject}`,
      category: 'Concept Mastery',
      completed: false,
      route: chk1Target.route,
      targetLabel: chk1Target.lessonTitle ? `Open ${chk1Target.lessonTitle}` : 'Open Lesson'
    },
    {
      id: 'chk_2',
      task: `Solve 25 IAT level questions in ${strongSubject} to maintain top speed`,
      category: 'Speed Drills',
      completed: false,
      route: `smart_lessons:${strongSubject}`,
      targetLabel: `Open ${strongSubject}`
    },
    {
      id: 'chk_3',
      task: stream === 'PCB' 
        ? 'Practice 15 Matrices & Determinants questions from the Math Blueprint'
        : (stream === 'PCM' ? 'Read NCERT Ecology & Genetics summary (High-yield free marks)' : 'Review 10 tricky organic chemistry reaction mechanisms'),
      category: 'Strategic Advantage',
      completed: false,
      route: chk3Target.route,
      targetLabel: chk3Target.lessonTitle ? `Open ${chk3Target.lessonTitle}` : 'Open Chapter'
    },
    {
      id: 'chk_4',
      task: 'Log all incorrect answers into your Error Mistake Notebook',
      category: 'Revision',
      completed: false,
      route: 'ai_doubt_solver',
      targetLabel: 'Ask AI Tutor'
    }
  ];

  // 7. AI Mentor Tips
  const aiMentorTips = [
    `🎯 Target Focus: Every +4 mark in ${weakSubject} can boost your overall IAT rank by over 80 positions. Don't leave questions unattempted due to fear.`,
    `⏱ Time Management: In IAT, divide your 180 minutes: Chemistry (35 mins) → Biology (30 mins) → Physics (55 mins) → Math (50 mins) → Final Review (10 mins).`,
    `🧠 Consistent Habit: Studying ${dailyHours} hours every single day beats cramming 12 hours once a week. Your active study streak is your greatest asset.`
  ];

  const sevenDaySchedule = generate7DaySchedule(answers);
  const fallbackWeakAreas = getSynthesizedWeakAreas(answers);

  return {
    id: planId,
    createdAt: new Date().toISOString(),
    answers,
    headlineStrategy,
    dailyAction,
    specialBlueprint,
    weeklyHourlyAllocation,
    phases,
    weeklyChecklist,
    aiMentorTips,
    sevenDaySchedule,
    fallbackWeakAreas
  };
}

// ── Main Asynchronous Plan Generator (with NVIDIA NIM enhancement) ────────
export async function generateAiStudyPlan(answers: AiOnboardingAnswers, userName: string = 'Aspirant'): Promise<AiGeneratedStudyPlan> {
  const basePlan = buildDeterministicStudyPlan(answers, userName);

  // Try enhancing with real AI response from /api/ai-chat if available
  try {
    const apiUrl = (import.meta as any).env?.VITE_API_URL ?? 'https://api.iisersmartprep.space';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout for instant UX

    const prompt = `Student Profile for IISER Aptitude Test 2027:
- Name: ${userName}
- Target Dream College: ${answers.targetInstitute}
- Stream: ${answers.stream}
- Current Stage: ${answers.currentStage}
- Strongest Subject: ${answers.strongSubject}
- Weakest Subject: ${answers.weakSubject} (Hurdle: ${answers.weakTopicHurdle})
- Available Study Hours: ${answers.dailyHours} hours/day
- Target Aim: ${answers.targetAir}

Please provide:
1. Two-sentence high-impact personalized strategy headline.
2. Three specific golden tips for this exact student.`;

    const res = await fetch(`${apiUrl}/api/ai-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const reader = res.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let aiText = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
              try {
                const parsed = JSON.parse(trimmed.slice(6));
                aiText += parsed.choices?.[0]?.delta?.content || '';
              } catch {}
            }
          }
        }

        if (aiText.trim().length > 40) {
          // Clean up headers like **1. High-Impact Strategy Headline:**
          const rawLines = aiText
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0);

          const meaningfulSentences: string[] = [];
          for (const line of rawLines) {
            // Skip heading lines or section dividers
            if (
              /^\*?\*?\d*[\.\:\)]?\s*(high-impact|three golden|golden tips|strategy headline|tips|exact for you)/i.test(line) ||
              /^\*\*.*\*\*$/.test(line) ||
              line.endsWith(':**') ||
              line.endsWith(':*')
            ) {
              continue;
            }

            // Clean markdown bold and bullet numbers
            const cleaned = line
              .replace(/\*\*/g, '')
              .replace(/^(\d+[\.\)]|\-|\*)\s*/, '')
              .trim();

            if (cleaned.length > 25) {
              meaningfulSentences.push(cleaned);
            }
          }

          if (meaningfulSentences.length >= 1) {
            // Check if first sentence is a headline
            if (meaningfulSentences[0].length > 35 && meaningfulSentences[0].length < 260) {
              basePlan.headlineStrategy = meaningfulSentences[0];
            }
          }

          const tips = meaningfulSentences.slice(1, 4);
          if (tips.length >= 2) {
            basePlan.aiMentorTips = tips;
          }
        }
      }
    }
  } catch (err) {
    console.log('[AI Study Plan Generator] Using instant deterministic model:', err);
  }

  // Persist to local storage
  saveAiStudyPlan(basePlan);
  return basePlan;
}
