/**
 * SLS TypeScript interfaces
 * These match the exact fields returned by the backend services.
 * Last verified against:
 *   - backend/services/slsAnalytics.js  (recentAttempts mapping lines 506-518)
 *   - backend/services/slsWeaknessEngine.js
 *   - backend/services/slsRecommendationEngine.js
 *   - backend/services/slsMasteryEngine.js
 *   - backend/services/slsRevisionQueue.js
 */

// ── Analytics ─────────────────────────────────────────────────────────

export interface SlsRecentAttempt {
  attemptId: string;
  chapterId: string;
  subject: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  accuracy: number;
  totalTimeSeconds: number;
  averageTimeSeconds: number;
  completedAt: string | null;
}

export interface SlsOverall {
  totalAttempts: number;
  uniqueChaptersAttempted: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  totalUnanswered: number;
  overallAccuracy: number;
  totalActiveTimeSeconds: number;
  averageTimePerQuestion: number;
}

export interface SlsSubjectAnalytics {
  subject: string;
  attempts: number;
  accuracy: number;
  averageTimeSeconds: number;
}

export interface SlsChapterAnalytics {
  chapterId: string;
  subject: string;
  attempts: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  accuracy: number;
  averageTimeSeconds: number;
  firstAttemptAccuracy: number;
  latestAttemptAccuracy: number;
  bestAttemptAccuracy: number;
  improvementPercentagePoints: number;
  lastAttemptedAt: string | null;
}

export interface SlsTopicAnalytics {
  chapterId: string;
  topicId: string;
  attempts: number;
  correct: number;
  wrong: number;
  unanswered: number;
  accuracy: number;
  totalTimeSeconds: number;
  averageTimeSeconds: number;
  averageEstimatedTimeSeconds: number;
  speedRatio: number;
}

export interface SlsDifficultyAnalytics {
  difficulty: string;
  attempts: number;
  accuracy: number;
  speedRatio: number;
}

export interface SlsSpeed {
  overallAverageActualTimeSeconds: number;
  overallAverageEstimatedTimeSeconds: number;
  overallSpeedRatio: number;
  fasterThanExpectedCount: number;
  nearExpectedCount: number;
  slowerThanExpectedCount: number;
}

export interface SlsAnalyticsPayload {
  overall: SlsOverall;
  subjects: SlsSubjectAnalytics[];
  chapters: SlsChapterAnalytics[];
  topics: SlsTopicAnalytics[];
  difficulties: SlsDifficultyAnalytics[];
  speed: SlsSpeed;
  recentAttempts: SlsRecentAttempt[];
}

export interface SlsAnalyticsResponse {
  success: boolean;
  hasData: boolean;
  analytics: SlsAnalyticsPayload;
}

// ── Weaknesses ─────────────────────────────────────────────────────────

export interface SlsWeakTopic {
  chapterId: string;
  chapterTitle?: string;
  topicId: string;
  topicTitle?: string;
  accuracy: number;
  speedRatio: number;
  weaknessScore: number;
  severity: 'mild' | 'moderate' | 'high' | 'critical';
  evidenceLevel: 'low' | 'medium' | 'high';
  reasons: string[];
  questionsAttempted?: number;
  correctCount?: number;
  incorrectCount?: number;
  skippedCount?: number;
  questionCount?: number;
}

export interface SlsWeakChapter {
  chapterId: string;
  chapterTitle?: string;
  subject: string;
  attempts: number;
  totalQuestions: number;
  accuracy: number;
  averageTimeSeconds: number;
  firstAttemptAccuracy: number;
  latestAttemptAccuracy: number;
  improvementPercentagePoints: number;
  weaknessScore: number;
  severity: 'mild' | 'moderate' | 'high' | 'critical';
  evidenceLevel: 'low' | 'medium' | 'high';
  trend: string;
  reasons: string[];
  questionsAttempted?: number;
  correctCount?: number;
  incorrectCount?: number;
  skippedCount?: number;
  assessmentSessions?: number;
}

export interface SlsWeaknessSummary {
  totalWeakTopics: number;
  totalWeakChapters: number;
  criticalWeaknessCount: number;
  highWeaknessCount: number;
  moderateWeaknessCount: number;
  mildWeaknessCount: number;
  strongestWeaknessScore: number;
}

export interface SlsWeaknessAnalysis {
  summary: SlsWeaknessSummary;
  weakTopics: SlsWeakTopic[];
  weakChapters: SlsWeakChapter[];
}

export interface SlsWeaknessResponse {
  success: boolean;
  hasData: boolean;
  weaknessAnalysis: SlsWeaknessAnalysis;
}

// ── Recommendations ─────────────────────────────────────────────────────

export interface SlsRecommendationEvidence {
  accuracy: number;
  speedRatio: number;
  weaknessScore: number;
  severity: string;
  evidenceLevel: string;
  attemptCount: number;
  questionCount: number;
  trend: string;
}

export interface SlsRecommendation {
  id: string;
  actionType: 'REVISE_CHAPTER' | 'PRACTICE_TOPIC' | 'RETRY_CHAPTER_QUIZ' | 'PRACTICE_DIFFICULTY' | 'CONTINUE_LEARNING';
  chapterId: string | null;
  chapterTitle: string | null;
  subject: string | null;
  topicId: string | null;
  difficulty: string | null;
  priorityScore: number;
  urgency: 'immediate' | 'high' | 'moderate' | 'low';
  reasonCodes: string[];
  evidence: SlsRecommendationEvidence | null;
}

export interface SlsRecommendationSummary {
  totalRecommendations: number;
  immediateCount: number;
  topActionType: string | null;
  topPriorityScore: number;
}

export interface SlsRecommendationsResponse {
  success: boolean;
  hasData: boolean;
  recommendations: SlsRecommendation[];
  summary: SlsRecommendationSummary;
}

// ── Mastery ─────────────────────────────────────────────────────────────

export type SlsMasteryState = 'NEW' | 'LEARNING' | 'WEAK' | 'IMPROVING' | 'STRONG' | 'MASTERED';

export interface SlsMasteryChapter {
  chapterId: string;
  chapterTitle: string;
  subject: string;
  state: SlsMasteryState;
  masteryScore: number;
  attemptCount: number;
  /** Weighted (recency-adjusted) accuracy across all attempts — 0–100 */
  weightedAccuracy: number;
  /** Accuracy of the most recent quiz attempt — 0–100 */
  latestAttemptAccuracy: number;
  /** Accuracy of the best quiz attempt — 0–100 */
  bestAttemptAccuracy: number;
  /** Accuracy of the first quiz attempt — 0–100 */
  firstAttemptAccuracy: number;
  trend: 'improving' | 'declining' | 'stable' | 'insufficient_history';
  evidenceLevel: 'low' | 'medium' | 'high' | 'insufficient';
  blockingWeaknesses: Array<{ topicId: string; severity: string }>;
}

export interface SlsMasterySummary {
  totalChapters: number;
  newCount: number;
  learningCount: number;
  weakCount: number;
  improvingCount: number;
  strongCount: number;
  masteredCount: number;
  averageMasteryScore: number;
}

export interface SlsMasteryResponse {
  success: boolean;
  hasData: boolean;
  mastery: SlsMasteryChapter[];
  summary: SlsMasterySummary;
}

// ── Revision Queue ───────────────────────────────────────────────────────

export interface SlsRevisionItem {
  id: string;
  chapterId: string;
  chapterTitle: string;
  subject: string;
  masteryState: SlsMasteryState;
  masteryScore: number;
  revisionType: string;
  priorityScore: number;
  urgency: string;
  lastAttemptedAt: string | null;
  nextReviewAt: string | null;
  daysUntilReview: number;
  isDue: boolean;
}

export interface SlsRevisionSummary {
  totalItems: number;
  dueNowCount: number;
  upcomingCount: number;
  weakReviewCount: number;
  masteryMaintenanceCount: number;
  topPriorityScore: number;
}

export interface SlsRevisionResponse {
  success: boolean;
  hasData: boolean;
  revisionQueue: SlsRevisionItem[];
  summary: SlsRevisionSummary;
}

// ── Combined SLS State ───────────────────────────────────────────────────

export interface SlsDashboardData {
  analytics: SlsAnalyticsResponse | null;
  weaknesses: SlsWeaknessResponse | null;
  recommendations: SlsRecommendationsResponse | null;
  mastery: SlsMasteryResponse | null;
  revision: SlsRevisionResponse | null;
}
