import { useState, useEffect, useCallback } from 'react';
import type {
  SlsAnalyticsResponse,
  SlsWeaknessResponse,
  SlsRecommendationsResponse,
  SlsMasteryResponse,
  SlsRecommendation,
  SlsMasteryChapter,
  SlsMasterySummary,
  SlsWeaknessAnalysis,
} from '../types/sls';

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

async function fetchJson<T>(url: string, headers: Record<string, string>): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json() as Promise<T>;
}

export function useSlsMyPath() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<SlsAnalyticsResponse | null>(null);
  const [weaknessAnalysis, setWeaknessAnalysis] = useState<SlsWeaknessAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<SlsRecommendation[]>([]);
  const [mastery, setMastery] = useState<SlsMasteryChapter[]>([]);
  const [masterySummary, setMasterySummary] = useState<SlsMasterySummary | null>(null);
  const [recommendationsAvailable, setRecommendationsAvailable] = useState<boolean>(true);
  const [weaknessesAvailable, setWeaknessesAvailable] = useState<boolean>(true);
  const [analyticsAvailable, setAnalyticsAvailable] = useState<boolean>(true);
  const [masteryAvailable, setMasteryAvailable] = useState<boolean>(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRecommendationsAvailable(true);
    setWeaknessesAvailable(true);
    setAnalyticsAvailable(true);
    setMasteryAvailable(true);

    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const [
      analyticsResult,
      weaknessResult,
      recommendationResult,
      masteryResult,
    ] = await Promise.allSettled([
      fetchJson<SlsAnalyticsResponse>(`${API_BASE}/api/sls/analytics`, headers),
      fetchJson<SlsWeaknessResponse>(`${API_BASE}/api/sls/weaknesses`, headers),
      fetchJson<SlsRecommendationsResponse>(`${API_BASE}/api/sls/recommendations`, headers),
      fetchJson<SlsMasteryResponse>(`${API_BASE}/api/sls/mastery`, headers),
    ]);

    let failedCount = 0;

    // Process Analytics
    if (analyticsResult.status === 'fulfilled') {
      setAnalytics(analyticsResult.value);
      setAnalyticsAvailable(true);
    } else {
      failedCount++;
      setAnalyticsAvailable(false);
      console.warn('[useSlsMyPath] Failed to fetch analytics:', analyticsResult.reason);
    }

    // Process Weaknesses
    if (weaknessResult.status === 'fulfilled') {
      setWeaknessAnalysis(weaknessResult.value?.weaknessAnalysis ?? null);
      setWeaknessesAvailable(true);
    } else {
      failedCount++;
      setWeaknessesAvailable(false);
      console.warn('[useSlsMyPath] Failed to fetch weaknesses:', weaknessResult.reason);
    }

    // Process Recommendations
    if (recommendationResult.status === 'fulfilled') {
      setRecommendations(recommendationResult.value?.recommendations ?? []);
      setRecommendationsAvailable(true);
    } else {
      failedCount++;
      setRecommendationsAvailable(false);
      console.warn('[useSlsMyPath] Failed to fetch recommendations:', recommendationResult.reason);
    }

    // Process Mastery
    if (masteryResult.status === 'fulfilled') {
      setMastery(masteryResult.value?.mastery ?? []);
      setMasterySummary(masteryResult.value?.summary ?? null);
      setMasteryAvailable(true);
    } else {
      failedCount++;
      setMasteryAvailable(false);
      console.warn('[useSlsMyPath] Failed to fetch mastery:', masteryResult.reason);
    }

    if (failedCount === 4) {
      setError('Failed to retrieve Smart Learning System data.');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const hasSlsData =
    !!analytics &&
    analytics.hasData &&
    (analytics.analytics?.overall?.totalAttempts ?? 0) > 0;

  return {
    loading,
    error,
    analytics,
    weaknessAnalysis,
    weaknessesAvailable,
    recommendations,
    recommendationsAvailable,
    mastery,
    masterySummary,
    hasSlsData,
    analyticsAvailable,
    masteryAvailable,
    refresh: fetchAll,
  };
}
