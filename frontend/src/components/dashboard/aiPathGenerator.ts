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
}

export const TARGET_INSTITUTES = [
  { id: 'IISER Pune', name: 'IISER Pune', rank: '#1 Ranked', tag: 'Premier Research Campus', badge: 'Top Choice' },
  { id: 'IISER Kolkata', name: 'IISER Kolkata', rank: '#2 Ranked', tag: 'Excellence in Physical & Earth Sciences', badge: 'Premier' },
  { id: 'IISER Mohali', name: 'IISER Mohali', rank: '#3 Ranked', tag: 'High-Energy Physics & Structural Bio', badge: 'Premier' },
  { id: 'IISER Bhopal', name: 'IISER Bhopal', rank: 'Fastest Growing', tag: 'BS-MS & Engineering Sciences', badge: 'Comprehensive' },
  { id: 'IISER Thiruvananthapuram', name: 'IISER TVM', rank: 'Pristine Campus', tag: 'Chemical Ecology & Quantum Tech', badge: 'Specialized' },
  { id: 'IISER Tirupati', name: 'IISER Tirupati', rank: 'Modern Labs', tag: 'Genomics & Material Science', badge: 'Emerging' },
  { id: 'IISER Berhampur', name: 'IISER Berhampur', rank: 'Coastal Research', tag: 'Marine Bio & Fundamental Physics', badge: 'Emerging' },
  { id: 'IISc Bangalore', name: 'IISc Bangalore', rank: 'Global #1 in India', tag: 'Accepts IAT for BS Research', badge: 'Elite' },
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

export function getStoredAiStudyPlan(): AiGeneratedStudyPlan | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
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
  const dailyAction = {
    id: 'mission_day_1',
    dayNumber: 1,
    title: `Day 1 Priority: Master ${weakTopicHurdle || resolvedTarget.lessonTitle || 'Core Foundations'}`,
    subject: weakSubject,
    actionType: 'SMART_LESSON',
    description: `Complete the core concept review and solve 15 targeted IAT practice questions to tackle your primary hurdle in ${weakSubject}.`,
    estimatedMinutes: 60,
    targetChapter: weakTopicHurdle || `${weakSubject} Fundamentals`,
    targetLessonId: resolvedTarget.lessonId,
    targetLessonTitle: resolvedTarget.lessonTitle,
    route: resolvedTarget.route,
    completed: false
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
    aiMentorTips
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
