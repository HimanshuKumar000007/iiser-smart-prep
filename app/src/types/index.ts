export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rank: number;
  xp: number;
  accuracy: number;
  questionsSolved: number;
  streak: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  glowColor?: 'indigo' | 'success' | 'danger' | 'warning';
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  rank: number;
  weeklyGoal: number;
  weeklyProgress: number;
  avatar?: string;
  isPrivate: boolean;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  accuracy: number;
  xp: number;
  isOnline?: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target?: string;
  timestamp: Date;
  type: 'achievement' | 'join' | 'complete' | 'battle';
}

export interface BattleMode {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  icon: React.ReactNode;
  color: string;
}

export interface BattleQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

export interface BattleState {
  id: string;
  mode: BattleMode;
  opponent: User;
  currentQuestion: number;
  totalQuestions: number;
  playerScore: number;
  opponentScore: number;
  playerAnswers: boolean[];
  opponentAnswers: boolean[];
  timeRemaining: number;
  status: 'waiting' | 'in-progress' | 'finished';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: 'practice' | 'review' | 'battle' | 'group';
  estimatedTime: number;
}

export interface PerformanceData {
  date: string;
  accuracy: number;
  questions: number;
  xp: number;
}

export type Page = 'dashboard' | 'mock-tests' | 'ai-doubts' | 'study-groups' | 'battles' | 'analytics';
