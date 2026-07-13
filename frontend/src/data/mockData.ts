import { UserProfile, SubjectReadiness, RoadmapTask, WeakArea, AIMission, AIInsight } from '../types';

const getDynamicSubjectReadinessData = (): SubjectReadiness[] => {
  let strong: string[] = [];
  let weak: string[] = [];
  try {
    strong = JSON.parse(localStorage.getItem('onboarding_strong') || '[]');
    weak = JSON.parse(localStorage.getItem('onboarding_weak') || '[]');
  } catch (e) {}

  return [
    { subject: 'Biology', score: strong.includes('Biology') ? 85 : weak.includes('Biology') ? 48 : 68, target: 85, color: '#10b981' },
    { subject: 'Chemistry', score: strong.includes('Chemistry') ? 82 : weak.includes('Chemistry') ? 45 : 70, target: 80, color: '#3b82f6' },
    { subject: 'Physics', score: strong.includes('Physics') ? 78 : weak.includes('Physics') ? 42 : 62, target: 75, color: '#8b5cf6' },
    { subject: 'Math', score: strong.includes('Mathematics') ? 80 : weak.includes('Mathematics') ? 40 : 58, target: 70, color: '#f59e0b' },
  ];
};

export const subjectReadinessData = new Proxy([], {
  get(target, prop, receiver) {
    const data = getDynamicSubjectReadinessData();
    const val = Reflect.get(data, prop);
    if (typeof val === 'function') {
      return val.bind(data);
    }
    return val;
  }
}) as any as SubjectReadiness[];

const getDynamicCurrentUser = (): UserProfile => {
  const name = localStorage.getItem('currentUser') || 'Aditya';
  const rawExam = localStorage.getItem('onboarding_exam') || 'iiser';
  let exam = 'IISER IAT';
  if (rawExam === 'nest') exam = 'NEST';
  else if (rawExam === 'both') exam = 'IISER IAT & NEST';

  const rawLevel = localStorage.getItem('onboarding_level') || 'beginner';
  let level = 'Beginner Level 🌱';
  if (rawLevel === 'intermediate') level = 'Intermediate Level 🚀';
  else if (rawLevel === 'advanced') level = 'Advanced Level 🔥';

  const EXAM_DATE = new Date('2027-06-07T00:00:00');
  const today = new Date();
  const diffTime = EXAM_DATE.getTime() - today.getTime();
  const daysUntilExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const subjects = getDynamicSubjectReadinessData();
  const overallReadiness = Math.round(subjects.reduce((sum, item) => sum + item.score, 0) / subjects.length);

  return {
    name,
    exam,
    daysUntilExam,
    overallReadiness,
    level,
  };
};

export const currentUser = new Proxy({} as any, {
  get(target, prop, receiver) {
    const data = getDynamicCurrentUser();
    return Reflect.get(data, prop, receiver);
  }
}) as any as UserProfile;

const getDynamicWeakAreasData = (): WeakArea[] => {
  let weak: string[] = [];
  try {
    weak = JSON.parse(localStorage.getItem('onboarding_weak') || '[]');
  } catch (e) {}

  const allWeakAreas = [
    { id: '1', concept: 'Rotational Motion', priorityScore: 98, potentialGain: 12, subject: 'Physics' },
    { id: '2', concept: 'Chemical Equilibrium', priorityScore: 92, potentialGain: 8, subject: 'Chemistry' },
    { id: '3', concept: 'Calculus Applications', priorityScore: 88, potentialGain: 7, subject: 'Mathematics' },
    { id: '4', concept: 'Genetics & Pedigree', priorityScore: 94, potentialGain: 10, subject: 'Biology' },
  ];

  if (weak.length === 0) return allWeakAreas.slice(0, 3);
  
  const filtered = allWeakAreas.filter(area => {
    if (area.subject === 'Mathematics') {
      return weak.includes('Mathematics');
    }
    return weak.includes(area.subject);
  });
  
  if (filtered.length === 0) return allWeakAreas.slice(0, 3);
  return filtered.slice(0, 3);
};

export const weakAreasData = new Proxy([], {
  get(target, prop, receiver) {
    const data = getDynamicWeakAreasData();
    const val = Reflect.get(data, prop);
    if (typeof val === 'function') {
      return val.bind(data);
    }
    return val;
  }
}) as any as WeakArea[];

export const todayRoadmap: RoadmapTask[] = [
  { id: '1', topic: 'Cell Biology', completed: true, type: 'lesson' },
  { id: '2', topic: 'Units & Dimensions', completed: false, type: 'lesson' },
  { id: '3', topic: 'Kinematics Practice', completed: false, type: 'quiz' },
];

export const tomorrowRoadmap: RoadmapTask[] = [
  { id: '4', topic: 'Biological Classification', completed: false, type: 'lesson' },
  { id: '5', topic: 'Motion in One Dimension', completed: false, type: 'lesson' },
];

export const missionsData: AIMission[] = [
  { id: '1', task: 'Complete Physics Lesson', xp: 50, completed: true },
  { id: '2', task: 'Solve 20 Chemistry Questions', xp: 100, completed: false },
  { id: '3', task: 'Revision Session: Cell Bio', xp: 75, completed: false },
];

export const aiInsightsData: AIInsight[] = [
  { id: '1', message: 'Your Biology accuracy increased by 12% this week.', type: 'positive' },
  { id: '2', message: 'Calculus remains your weakest area in Mathematics.', type: 'warning' },
  { id: '3', message: 'Taking a mock test this weekend could improve readiness by 4%.', type: 'info' },
];
