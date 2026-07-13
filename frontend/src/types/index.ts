export interface UserProfile {
  name: string;
  exam: string;
  daysUntilExam: number;
  overallReadiness: number;
  level?: string;
}

export interface SubjectReadiness {
  subject: string;
  score: number;
  target: number;
  color: string;
}

export interface RoadmapTask {
  id: string;
  topic: string;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'revision';
}

export interface WeakArea {
  id: string;
  concept: string;
  priorityScore: number; // out of 100
  potentialGain: number;
}

export interface AIMission {
  id: string;
  task: string;
  xp: number;
  completed: boolean;
}

export interface AIInsight {
  id: string;
  message: string;
  type: 'positive' | 'warning' | 'info';
}
