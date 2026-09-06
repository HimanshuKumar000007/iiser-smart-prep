/**
 * SLSNextActionCard — Top SLS recommendation component
 *
 * Renders the highest-priority recommendation from /api/sls/recommendations.
 * Explanation text is generated client-side from reasonCodes/actionType
 * because the backend returns reason codes, not pre-rendered strings.
 *
 * Navigation:
 *  - REVISE_CHAPTER / RETRY_CHAPTER_QUIZ → /smart-lessons/<chapterId>
 *  - PRACTICE_TOPIC                       → /smart-lessons/<chapterId>
 *  - PRACTICE_DIFFICULTY / CONTINUE_LEARNING → smart_lessons
 */

import { motion } from 'motion/react';
import {
  BrainCircuit, ArrowRight, AlertTriangle, Zap,
  FlaskConical, Calculator, Dna, BookOpen,
  RotateCcw, Target, TrendingUp,
} from 'lucide-react';
import type { SlsRecommendation } from '../../types/sls';
import { buildRecommendationExplanation } from '../../hooks/useSlsDashboard';
import { cn } from '../../lib/utils';

// ── Subject palette ────────────────────────────────────────────────────
const SUBJECT_PALETTE: Record<string, { color: string; bg: string; border: string }> = {
  Physics:     { color: 'text-indigo-400', bg: 'bg-indigo-500/15', border: 'border-indigo-500/20' },
  Chemistry:   { color: 'text-cyan-400',   bg: 'bg-cyan-500/15',   border: 'border-cyan-500/20'   },
  Mathematics: { color: 'text-amber-400',  bg: 'bg-amber-500/15',  border: 'border-amber-500/20'  },
  Biology:     { color: 'text-emerald-400',bg: 'bg-emerald-500/15',border: 'border-emerald-500/20'},
};
function sp(subject: string | null) {
  return subject && SUBJECT_PALETTE[subject]
    ? SUBJECT_PALETTE[subject]
    : { color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/20' };
}

// ── Subject icon ──────────────────────────────────────────────────────
function SubjectIcon({ subject, className }: { subject: string | null; className?: string }) {
  switch (subject) {
    case 'Physics':     return <Zap className={className} />;
    case 'Chemistry':   return <FlaskConical className={className} />;
    case 'Mathematics': return <Calculator className={className} />;
    case 'Biology':     return <Dna className={className} />;
    default:            return <BrainCircuit className={className} />;
  }
}

// ── Urgency config ─────────────────────────────────────────────────────
const URGENCY_CONFIG = {
  immediate: { label: 'Immediate',  color: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'border-rose-500/25',   accentBorder: 'border-l-rose-500/60'   },
  high:      { label: 'High',       color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25', accentBorder: 'border-l-orange-500/60' },
  moderate:  { label: 'Moderate',   color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  accentBorder: 'border-l-amber-500/50'  },
  low:       { label: 'Scheduled',  color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   accentBorder: 'border-l-blue-500/40'   },
};

// ── Action icon ────────────────────────────────────────────────────────
function actionIcon(actionType: string) {
  switch (actionType) {
    case 'REVISE_CHAPTER':      return <BookOpen className="w-4 h-4" />;
    case 'RETRY_CHAPTER_QUIZ':  return <RotateCcw className="w-4 h-4" />;
    case 'PRACTICE_TOPIC':      return <Target className="w-4 h-4" />;
    case 'PRACTICE_DIFFICULTY': return <TrendingUp className="w-4 h-4" />;
    default:                    return <ArrowRight className="w-4 h-4" />;
  }
}

// ── Action label ───────────────────────────────────────────────────────
function actionLabel(actionType: string) {
  switch (actionType) {
    case 'REVISE_CHAPTER':      return 'Revise Chapter';
    case 'RETRY_CHAPTER_QUIZ':  return 'Retry Quiz';
    case 'PRACTICE_TOPIC':      return 'Practice Topic';
    case 'PRACTICE_DIFFICULTY': return 'Practice Questions';
    case 'CONTINUE_LEARNING':   return 'Continue Learning';
    default:                    return 'Start Now';
  }
}

// ── Navigation resolver ────────────────────────────────────────────────
//
// Action routing contract (Step 10):
//   REVISE_CHAPTER      → /smart-lessons/<id>          (open lesson for revision)
//   RETRY_CHAPTER_QUIZ  → /smart-lessons/<id>::quiz     (open lesson AT the quiz, scroll-gate bypassed)
//   PRACTICE_TOPIC      → /smart-lessons/<id>          (open chapter containing the topic)
//   PRACTICE_DIFFICULTY → /smart-lessons/<id>          (open chapter quiz if chapterId present)
//                         or 'smart_lessons'           (hub, if no specific chapter)
//   CONTINUE_LEARNING   → 'smart_lessons'              (hub, let student pick next chapter)
function resolveNavigation(rec: SlsRecommendation): string {
  switch (rec.actionType) {
    case 'RETRY_CHAPTER_QUIZ':
      // Opens the lesson reader scrolled to and unlocked at the quiz section
      return rec.chapterId ? `/smart-lessons/${rec.chapterId}::quiz` : 'smart_lessons';
    case 'REVISE_CHAPTER':
    case 'PRACTICE_TOPIC':
    case 'PRACTICE_DIFFICULTY':
      return rec.chapterId ? `/smart-lessons/${rec.chapterId}` : 'smart_lessons';
    case 'CONTINUE_LEARNING':
    default:
      return rec.chapterId ? `/smart-lessons/${rec.chapterId}` : 'smart_lessons';
  }
}

interface Props {
  recommendation: SlsRecommendation;
  onNavigate?: (view: string) => void;
  className?: string;
}

export function SLSNextActionCard({ recommendation: rec, onNavigate, className }: Props) {
  const scfg  = sp(rec.subject);
  const ucfg  = URGENCY_CONFIG[rec.urgency] ?? URGENCY_CONFIG.low;
  const explanation = buildRecommendationExplanation(
    rec.actionType,
    rec.chapterTitle,
    rec.topicId,
    rec.difficulty,
    rec.evidence?.accuracy,
  );

  function handleStart() {
    onNavigate?.(resolveNavigation(rec));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onClick={handleStart}
      className={cn(
        'group relative p-3.5 sm:p-4 rounded-2xl border-l-[3px] border cursor-pointer',
        'transition-all duration-200 hover:bg-white/[0.05] hover:-translate-y-0.5',
        'bg-white/[0.04]',
        ucfg.accentBorder,
        'border-white/10',
        className,
      )}
    >
      {/* Top row: Subject Icon + Subject/Chapter + Urgency Badge */}
      <div className="flex items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className={cn(
            'w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform group-hover:scale-105',
            scfg.bg, scfg.border,
          )}>
            <SubjectIcon subject={rec.subject} className={cn('w-4 h-4', scfg.color)} />
          </div>
          <div className="flex items-center gap-1.5 min-w-0 flex-1 flex-wrap">
            {rec.subject && (
              <span className={cn('text-[10px] sm:text-[11px] font-black uppercase tracking-wider shrink-0', scfg.color)}>
                {rec.subject}
              </span>
            )}
            {rec.chapterTitle && (
              <>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="text-xs text-white/60 font-medium truncate max-w-[180px] sm:max-w-md">
                  {rec.chapterTitle}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Urgency badge */}
        <div className={cn(
          'flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider whitespace-nowrap shrink-0',
          ucfg.color, ucfg.bg, ucfg.border,
        )}>
          <AlertTriangle className="w-2.5 h-2.5" />
          {ucfg.label}
        </div>
      </div>

      {/* Explanation — Full Width, never squished into 1-word column! */}
      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed mb-3">
        {explanation}
      </p>

      {/* Bottom row: Evidence Stats & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-white/5">
        {/* Evidence stats */}
        {rec.evidence ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[11px] text-white/40 font-medium">
              Accuracy: <span className="text-rose-400 font-bold">
                {Math.round(rec.evidence.accuracy)}%
              </span>
            </span>
            {rec.evidence.attemptCount > 0 && (
              <span className="text-[11px] text-white/40 font-medium">
                {rec.evidence.attemptCount} attempt{rec.evidence.attemptCount !== 1 ? 's' : ''}
              </span>
            )}
            {rec.evidence.trend && rec.evidence.trend !== 'insufficient_data' && (
              <span className={cn(
                'text-[11px] font-semibold',
                rec.evidence.trend === 'declining' ? 'text-rose-400' :
                rec.evidence.trend === 'improving' ? 'text-emerald-400' : 'text-white/40',
              )}>
                {rec.evidence.trend === 'declining' ? '↘ Declining' :
                 rec.evidence.trend === 'improving' ? '↗ Improving' : 'Stable'}
              </span>
            )}
          </div>
        ) : (
          <div />
        )}

        {/* CTA button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleStart(); }}
          className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white/80 hover:text-white transition-all self-stretch sm:self-auto"
        >
          {actionIcon(rec.actionType)}
          <span>{actionLabel(rec.actionType)}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-cyan-400" />
        </button>
      </div>
    </motion.div>
  );
}
