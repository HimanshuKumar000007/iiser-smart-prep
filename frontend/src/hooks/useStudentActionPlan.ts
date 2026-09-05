import { useState, useEffect, useCallback, useRef } from 'react';

export type StudentActionType =
  | 'RESUME_ACTIVE_LESSON'
  | 'COMPLETE_PENDING_QUIZ'
  | 'COMPLETE_DUE_REVISION'
  | 'REVISE_CRITICAL_CHAPTER'
  | 'PRACTICE_WEAK_TOPIC'
  | 'POST_MOCK_REVISION'
  | 'BUILD_MORE_MOCK_EVIDENCE'
  | 'TAKE_RECOMMENDED_MOCK'
  | 'START_NEW_LESSON'
  | 'MAINTAIN_STRONG_TOPIC'
  | 'NO_ACTION';

export type EvidenceLevel = 'NONE' | 'LIMITED' | 'SUFFICIENT' | 'STRONG';

export interface CanonicalStudentAction {
  id: string;
  type: StudentActionType;
  source: string;
  title: string;
  description: string;
  subject?: string | null;
  chapterId?: string | null;
  chapterTitle?: string | null;
  topicId?: string | null;
  mockId?: string | null;
  route: string;
  ctaLabel: string;
  priority: number;
  priorityBand: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  evidenceLevel: EvidenceLevel;
  reasons: string[];
  generatedAt: string;
  metadata?: Record<string, any>;
}

export interface StudentActionPlan {
  success: boolean;
  hasData: boolean;
  primaryAction: CanonicalStudentAction;
  secondaryActions: CanonicalStudentAction[];
  dailyMissions: CanonicalStudentAction[];
  summary: {
    evidenceLevel: string;
    activePriorities: number;
    criticalActions: number;
  };
  sources: Record<string, 'available' | 'unavailable'>;
  generatedAt: string;
}

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export function useStudentActionPlan() {
  const [plan, setPlan] = useState<StudentActionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track request versions to discard outdated responses
  const activeRequestIdRef = useRef(0);

  const fetchPlan = useCallback(async (requestId: number) => {
    try {
      const token = localStorage.getItem('IAT_TOKEN');
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/student/action-plan`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: StudentActionPlan = await res.json();

      // Only apply state if this is still the most recent request
      if (requestId === activeRequestIdRef.current) {
        setPlan(data);
        setError(null);
      }
    } catch (err) {
      console.error('[useStudentActionPlan] Error fetching plan:', err);
      if (requestId === activeRequestIdRef.current) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const refresh = useCallback(() => {
    const nextId = ++activeRequestIdRef.current;
    setLoading(true);
    fetchPlan(nextId);
  }, [fetchPlan]);

  const markMissionCompleted = useCallback((actionId: string) => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const nextId = ++activeRequestIdRef.current;
    fetchPlan(nextId);
    return () => {
      // Incrementing on cleanup automatically invalidates the currently running fetch
      activeRequestIdRef.current++;
    };
  }, [fetchPlan]);

  return { plan, loading, error, refresh, markMissionCompleted };
}

