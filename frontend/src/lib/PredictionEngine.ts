/**
 * PredictionEngine.ts  — Rule-Based AI Selection Predictor
 *
 * Answers: "Can I get into IISER if I continue like this?"
 *
 * Pure function, zero API calls, deterministic, debuggable.
 * All inputs come from the existing /api/dashboard-summary response.
 *
 * Output fields:
 *   predictedScore        — estimated exam score out of 240
 *   predictedRank         — AIR estimate (number)
 *   rankBand              — e.g. "800–1500"
 *   selectionProbability  — 0-100 %
 *   marksNeeded           — marks to reach cutoff (0 if already above)
 *   confidence            — Low / Medium / High
 *   confidenceReason      — e.g. "Based on 3 mock attempts"
 *   trend                 — Improving / Declining / Stable
 *   trendEmoji            — 📈 / 📉 / ➡️
 *   trendLabel            — human readable
 *   insight               — ONE actionable sentence
 *   insightGain           — e.g. "+6 marks" or ""
 *   cutoff                — 136 (IISER IAT safe zone)
 */

import { DashboardData } from '../hooks/useDashboardData';

// ── Constants ─────────────────────────────────────────────────────────────────

const CUTOFF      = 136;   // IISER IAT safe zone (conservative)
const MAX_SCORE   = 240;

// ── Types ─────────────────────────────────────────────────────────────────────

export type Confidence = 'Low' | 'Medium' | 'High';
export type Trend      = 'Improving' | 'Declining' | 'Stable';

export interface Prediction {
  predictedScore:       number;   // out of 240
  predictedRank:        number;   // specific AIR number
  rankBand:             string;   // e.g. "800–1500"
  selectionProbability: number;   // 0-100
  marksNeeded:          number;   // max(0, cutoff - predictedScore)
  cutoff:               number;   // 136
  confidence:           Confidence;
  confidenceReason:     string;
  trend:                Trend;
  trendEmoji:           string;
  trendLabel:           string;
  insight:              string;
  insightGain:          string;
  isAboveCutoff:        boolean;
  evidenceState?:       'NO_DATA' | 'LIMITED_DATA' | 'SUFFICIENT_DATA';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(val: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, val));
}

/**
 * Linear interpolation between two (score, probability) breakpoints.
 * Derived from IISER IAT historical selection data.
 *
 * Breakpoints (score → selection prob %):
 *   0  → 1
 *   40 → 3
 *   80 → 15
 *   100 → 28
 *   120 → 42
 *   136 → 58
 *   150 → 72
 *   165 → 85
 *   180 → 93
 *   200 → 98
 *   240 → 99
 */
const PROB_TABLE: [number, number][] = [
  [0,   1 ],
  [40,  3 ],
  [80,  15],
  [100, 28],
  [120, 42],
  [136, 58],
  [150, 72],
  [165, 85],
  [180, 93],
  [200, 98],
  [240, 99],
];

function scoreToProb(score: number): number {
  const s = clamp(score, 0, 240);
  for (let i = 1; i < PROB_TABLE.length; i++) {
    const [s0, p0] = PROB_TABLE[i - 1];
    const [s1, p1] = PROB_TABLE[i];
    if (s <= s1) {
      const t = (s - s0) / (s1 - s0);
      return Math.round(p0 + t * (p1 - p0));
    }
  }
  return 99;
}

/**
 * Estimated AIR from predicted score.
 * IISER IAT typically has ~35,000–40,000 candidates.
 * Returns { rank: number, band: string }.
 */
function scoreToRank(score: number): { rank: number; band: string } {
  if (score > 200) return { rank: 200,  band: 'Top 300'   };
  if (score > 180) return { rank: 450,  band: '300–800'   };
  if (score > 165) return { rank: 900,  band: '800–1200'  };
  if (score > 150) return { rank: 1400, band: '1200–1800' };
  if (score > 136) return { rank: 2200, band: '1800–2800' };
  if (score > 120) return { rank: 3500, band: '2800–4500' };
  if (score > 100) return { rank: 6000, band: '4500–8000' };
  if (score > 80)  return { rank: 12000, band: '8000–15k' };
  return              { rank: 25000, band: '15k+'       };
}

/**
 * Days since a date string; returns 999 if null.
 */
function daysSince(dateStr: string | null): number {
  if (!dateStr) return 999;
  return Math.max(0, Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86_400_000
  ));
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculatePrediction(data: DashboardData): Prediction {
  const {
    accuracy,
    total_attempts,
    best_score,
    streak_days,
    subject_performance,
    last_mock_date,
  } = data;

  if (total_attempts <= 0) {
    return {
      predictedScore: 0,
      predictedRank: 0,
      rankBand: 'Not Evaluated',
      selectionProbability: 0,
      marksNeeded: CUTOFF,
      cutoff: CUTOFF,
      confidence: 'Low',
      confidenceReason: 'No mock data yet',
      trend: 'Stable',
      trendEmoji: '➡️',
      trendLabel: 'Getting Started',
      insight: 'Take your first diagnostic test to unlock your personalised prediction',
      insightGain: '',
      isAboveCutoff: false,
      evidenceState: 'NO_DATA'
    };
  }

  // ── Predicted Score ────────────────────────────────────────────────────────
  //
  // Formula:
  //   avgScore        = accuracy * 2.4          (accuracy % → score/240)
  //   bestScoreNorm   = best_score (if > 0 and looks like a score, otherwise derived)
  //   improvement     = max(0, bestScoreNorm - avgScore)
  //   predictedScore  = avgScore + improvement × 0.6
  //
  // If best_score is 0 (no data), predicted = avgScore.
  // If best_score is unrealistically large, clamp it.

  const avgScore     = accuracy * 2.4;
  const bestNorm     = clamp(best_score, 0, MAX_SCORE);
  const improvement  = Math.max(0, bestNorm - avgScore);
  const rawPredicted = avgScore + improvement * 0.6;
  const predictedScore = Math.round(clamp(rawPredicted, 0, MAX_SCORE));

  // ── Rank & Probability ────────────────────────────────────────────────────
  const selectionProbability = scoreToProb(predictedScore);
  const { rank: predictedRank, band: rankBand } = scoreToRank(predictedScore);

  // ── Gap ───────────────────────────────────────────────────────────────────
  const marksNeeded  = Math.max(0, CUTOFF - predictedScore);
  const isAboveCutoff = predictedScore >= CUTOFF;

  // ── Confidence ────────────────────────────────────────────────────────────
  let confidence: Confidence;
  let confidenceReason: string;

  if (total_attempts <= 0) {
    confidence       = 'Low';
    confidenceReason = 'No mock data yet';
  } else if (total_attempts < 5) {
    confidence       = 'Low';
    confidenceReason = `Based on ${total_attempts} mock attempt${total_attempts === 1 ? '' : 's'}`;
  } else if (total_attempts < 15) {
    confidence       = 'Medium';
    confidenceReason = `Based on ${total_attempts} mock attempts`;
  } else {
    confidence       = 'High';
    confidenceReason = `Based on ${total_attempts} mock attempts`;
  }

  // ── Trend (proxy from streak + days since last mock) ──────────────────────
  //
  // We don't have a score history array, so we use behavioral signals:
  //   - Streak ≥ 3 + recent mock (< 3 days) → Improving
  //   - No mock in > 7 days OR accuracy < 40 → Declining
  //   - Else → Stable
  //
  const daysMock = daysSince(last_mock_date);
  let trend: Trend;
  let trendEmoji: string;
  let trendLabel: string;

  if (streak_days >= 3 && daysMock < 3 && accuracy >= 50) {
    trend      = 'Improving';
    trendEmoji = '📈';
    trendLabel = 'Improving';
  } else if (daysMock > 7 || accuracy < 40) {
    trend      = 'Declining';
    trendEmoji = '📉';
    trendLabel = 'Declining';
  } else {
    trend      = 'Stable';
    trendEmoji = '➡️';
    trendLabel = 'Stable';
  }

  // ── Insight — one actionable sentence ────────────────────────────────────
  //
  // Rules evaluated in priority order.
  let insight    = '';
  let insightGain = '';

  // Find worst subject
  const sorted = [...subject_performance].sort((a, b) => a.accuracy - b.accuracy);
  const worst  = sorted[0];
  const best   = sorted[sorted.length - 1];

  if (total_attempts === 0) {
    insight     = 'Take your first diagnostic test to unlock your personalised prediction';
    insightGain = '';
  } else if (worst && worst.accuracy < 50) {
    const gain = Math.max(3, Math.round((75 - worst.accuracy) * 0.2));
    insight     = `Fix ${worst.subject} — your biggest score unlock right now`;
    insightGain = `+${gain} marks`;
  } else if (daysMock > 5) {
    insight     = 'Take a mock this week — prediction confidence increases significantly';
    insightGain = '+confidence';
  } else if (marksNeeded > 0 && marksNeeded <= 20) {
    const subj = worst?.subject ?? 'weak subjects';
    insight     = `Only ${marksNeeded} marks from safe zone — push ${subj} past 70%`;
    insightGain = `+${marksNeeded} marks`;
  } else if (isAboveCutoff && best && best.accuracy > 75) {
    insight     = `Maintain ${best.subject} above 80% to stay in the safe zone`;
    insightGain = 'Stay on track';
  } else if (trend === 'Improving') {
    insight     = 'You\'re on an improving trajectory — keep up this pace';
    insightGain = 'Keep going';
  } else {
    insight     = 'Solve 15 PYQs daily to steadily improve your predicted score';
    insightGain = '+marks';
  }

  return {
    predictedScore,
    predictedRank,
    rankBand,
    selectionProbability,
    marksNeeded,
    cutoff: CUTOFF,
    confidence,
    confidenceReason,
    trend,
    trendEmoji,
    trendLabel,
    insight,
    insightGain,
    isAboveCutoff,
    evidenceState: total_attempts < 5 ? 'LIMITED_DATA' : 'SUFFICIENT_DATA'
  };
}
