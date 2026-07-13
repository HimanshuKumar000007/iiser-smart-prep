import React from 'react';
import { Clock, Target, ArrowRight, RotateCcw, Zap, BookOpen } from 'lucide-react';
import { LessonItem } from '../../data/lessons';
import { cn } from '../../lib/utils';

interface Props {
  key?: React.Key;
  lesson: LessonItem;
  status: 'not_started' | 'in_progress' | 'completed';
  onNavigate?: (view: string) => void;
}

const SUBJECT_ICONS: Record<string, string> = {
  Physics:     '⚛️',
  Chemistry:   '🧪',
  Biology:     '🧬',
  Mathematics: '📐',
};

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy:   'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400  bg-amber-500/10  border-amber-500/20',
  Hard:   'text-rose-400   bg-rose-500/10   border-rose-500/20',
};

const WEIGHTAGE_STYLE: Record<string, string> = {
  'Very High': 'text-rose-400   bg-rose-500/10   border-rose-500/20',
  'High':      'text-amber-400  bg-amber-500/10  border-amber-500/20',
  'Medium':    'text-blue-400   bg-blue-500/10   border-blue-500/20',
  'Low':       'text-white/50   bg-white/5       border-white/10',
};

export function LessonCard({ lesson, status, onNavigate }: Props) {
  const icon = SUBJECT_ICONS[lesson.subject] || '📚';

  let buttonLabel = 'Start Learning';
  let statusBadge = 'Not Started';
  let statusColor = 'text-white/40 bg-white/5 border-white/10';
  if (status === 'completed') {
    buttonLabel = 'Review Lesson';
    statusBadge = 'Completed ✓';
    statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  } else if (status === 'in_progress') {
    buttonLabel = 'Continue';
    statusBadge = 'In Progress';
    statusColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
  }

  return (
    <div
      onClick={() => onNavigate?.(`/smart-lessons/${lesson.id}`)}
      className="group relative bg-[#0A0C18] border border-white/10 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(6,182,212,0.12)] flex flex-col gap-4 cursor-pointer"
    >
      {/* Subject badge + Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl p-1.5 rounded-xl bg-white/5 border border-white/5">{icon}</span>
          <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{lesson.subject}</span>
        </div>
        <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded-full border', statusColor)}>
          {statusBadge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white font-display font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors">
        {lesson.title}
      </h3>

      {/* Meta Chips Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Revision time */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 bg-white/[0.03] px-2.5 py-1 rounded-xl border border-white/5">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{lesson.revision} min revision</span>
        </div>

        {/* IAT Weightage */}
        <div className={cn('flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-xl border', WEIGHTAGE_STYLE[lesson.weightage])}>
          <Target className="w-3 h-3" />
          <span>🎯 {lesson.weightage}</span>
        </div>

        {/* Difficulty */}
        <div className={cn('flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-xl border', DIFFICULTY_STYLE[lesson.difficulty])}>
          <Zap className="w-3 h-3" />
          <span>{lesson.difficulty}</span>
        </div>
      </div>

      {/* NCERT flag for easy-to-spot self-study guidance */}
      {lesson.ncertEnough === 'Yes' && (
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/80 font-semibold">
          <BookOpen className="w-3 h-3" />
          <span>NCERT sufficient</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-cyan-400 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
          <span>{buttonLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        <span className="text-[10px] text-white/25 font-mono">#{lesson.priorityScore}</span>
      </div>
    </div>
  );
}
