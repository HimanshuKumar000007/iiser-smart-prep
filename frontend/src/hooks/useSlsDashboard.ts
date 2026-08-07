/**
 * useSlsDashboard
 * Fetches all 5 SLS intelligence endpoints in parallel using Promise.allSettled.
 * If one or more endpoints fail, the remaining valid sections still render.
 *
 * Zero-data state is determined exclusively from the SLS analytics response:
 *   - analyticsResponse.hasData === false, OR
 *   - analytics.overall.totalAttempts === 0
 *
 * This hook does NOT use /api/dashboard-summary attempt counts for SLS onboarding.
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  SlsAnalyticsResponse,
  SlsWeaknessResponse,
  SlsRecommendationsResponse,
  SlsMasteryResponse,
  SlsRevisionResponse,
  SlsDashboardData,
} from '../types/sls';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

async function fetchJson<T>(url: string, headers: Record<string, string>): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json() as Promise<T>;
}

export function useSlsDashboard() {
  const [data, setData] = useState<SlsDashboardData>({
    analytics: null,
    weaknesses: null,
    recommendations: null,
    mastery: null,
    revision: null,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchAll = useCallback(async () => {
    setLoading(true);

    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const [
      analyticsResult,
      weaknessesResult,
      recommendationsResult,
      masteryResult,
      revisionResult,
    ] = await Promise.allSettled([
      fetchJson<SlsAnalyticsResponse>(`${API_BASE}/api/sls/analytics`, headers),
      fetchJson<SlsWeaknessResponse>(`${API_BASE}/api/sls/weaknesses`, headers),
      fetchJson<SlsRecommendationsResponse>(`${API_BASE}/api/sls/recommendations`, headers),
      fetchJson<SlsMasteryResponse>(`${API_BASE}/api/sls/mastery`, headers),
      fetchJson<SlsRevisionResponse>(`${API_BASE}/api/sls/revision-queue`, headers),
    ]);

    const newErrors: Record<string, string> = {};

    const analytics =
      analyticsResult.status === 'fulfilled' ? analyticsResult.value : null;
    if (analyticsResult.status === 'rejected') {
      newErrors.analytics = analyticsResult.reason?.message ?? 'analytics failed';
      console.debug('[useSlsDashboard] analytics notice:', analyticsResult.reason);
    }

    const weaknesses =
      weaknessesResult.status === 'fulfilled' ? weaknessesResult.value : null;
    if (weaknessesResult.status === 'rejected') {
      newErrors.weaknesses = weaknessesResult.reason?.message ?? 'weaknesses failed';
      console.debug('[useSlsDashboard] weaknesses notice:', weaknessesResult.reason);
    }

    const recommendations =
      recommendationsResult.status === 'fulfilled' ? recommendationsResult.value : null;
    if (recommendationsResult.status === 'rejected') {
      newErrors.recommendations = recommendationsResult.reason?.message ?? 'recommendations failed';
      console.debug('[useSlsDashboard] recommendations notice:', recommendationsResult.reason);
    }

    const mastery =
      masteryResult.status === 'fulfilled' ? masteryResult.value : null;
    if (masteryResult.status === 'rejected') {
      newErrors.mastery = masteryResult.reason?.message ?? 'mastery failed';
      console.debug('[useSlsDashboard] mastery notice:', masteryResult.reason);
    }

    const revision =
      revisionResult.status === 'fulfilled' ? revisionResult.value : null;
    if (revisionResult.status === 'rejected') {
      newErrors.revision = revisionResult.reason?.message ?? 'revision-queue failed';
      console.debug('[useSlsDashboard] revision notice:', revisionResult.reason);
    }

    setData({ analytics, weaknesses, recommendations, mastery, revision });
    setErrors(newErrors);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /** True if the SLS analytics says this user has zero Smart Lesson data. */
  const slsHasNoData =
    !data.analytics ||
    !data.analytics.hasData ||
    (data.analytics.analytics?.overall?.totalAttempts ?? 0) === 0;

  return { data, loading, errors, slsHasNoData, refresh: fetchAll };
}

// ── Client-side explanation builder ────────────────────────────────────
// The backend returns reasonCodes; the frontend generates human-readable text.

export function buildRecommendationExplanation(
  actionType: string,
  chapterTitle: string | null,
  topicId: string | null,
  difficulty: string | null,
  accuracy: number | null | undefined,
): string {
  const ch = chapterTitle ?? 'this chapter';
  const accStr = accuracy != null ? ` (Accuracy: ${Math.round(accuracy)}%)` : '';

  switch (actionType) {
    case 'REVISE_CHAPTER':
      return `Critical weakness detected in ${ch}${accStr}. Revise core concepts now.`;
    case 'PRACTICE_TOPIC':
      return topicId
        ? `Practice specific question sets for topic "${topicId}" under ${ch}.`
        : `Practice focused question sets in ${ch}.`;
    case 'RETRY_CHAPTER_QUIZ':
      return `Re-attempt the chapter quiz for ${ch} to verify your understanding${accStr}.`;
    case 'PRACTICE_DIFFICULTY':
      return difficulty
        ? `Focus on ${difficulty} level questions in ${ch} to build confidence.`
        : `Targeted practice needed in ${ch}.`;
    case 'CONTINUE_LEARNING':
    default:
      return `Your learning is on track. Keep progressing through the syllabus.`;
  }
}
