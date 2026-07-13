import React from 'react';
import { ArrowLeft, Clock, Target, BarChart2, Flame, Zap } from 'lucide-react';

interface Props {
  title: string;
  subject: string;
  duration: number;
  weightage: string;
  averageQuestions: string;
  onBack: () => void;
}

const SUBJECT_ICONS: Record<string, string> = {
  Physics: '⚛️',
  Chemistry: '🧪',
  Biology: '🧬',
  Mathematics: '📐',
};

const SUBJECT_COLOR: Record<string, { pill: string; glow: string; accent: string }> = {
  Physics:     { pill: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',    glow: 'bg-cyan-500/5',    accent: 'from-cyan-500/10' },
  Chemistry:   { pill: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', glow: 'bg-emerald-500/5', accent: 'from-emerald-500/10' },
  Biology:     { pill: 'bg-lime-500/10 border-lime-500/20 text-lime-400',    glow: 'bg-lime-500/5',    accent: 'from-lime-500/10' },
  Mathematics: { pill: 'bg-violet-500/10 border-violet-500/20 text-violet-400', glow: 'bg-violet-500/5', accent: 'from-violet-500/10' },
};

export function LessonHeader({ title, subject, duration, weightage, averageQuestions, onBack }: Props) {
  const icon = SUBJECT_ICONS[subject] || '📚';
  const isHighScoring = weightage === 'Very High' || weightage === 'High';
  const colors = SUBJECT_COLOR[subject] || SUBJECT_COLOR['Physics'];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-all border border-white/8 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lessons</span>
        </button>
      </div>

      {/* Hero Card */}
      <div className={`rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl`}>
        {/* Ambient glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${colors.glow} blur-[100px] rounded-full pointer-events-none`} />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-7 space-y-5">

          {/* Top row: icon + badges + optional high-score flame */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Subject icon bubble */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                {icon}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${colors.pill}`}>
                  {subject}
                </span>
                {isHighScoring && (
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>High Scoring</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {isHighScoring && (
              <p className="text-[11px] text-rose-400/80 font-semibold tracking-wide flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Appears frequently in IAT exams
              </p>
            )}
          </div>

          {/* Stats Grid — 2×2 on mobile, 4-col on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {/* Revision Time */}
            <div className="lesson-stat-card">
              <span className="lesson-stat-label">Revision Time</span>
              <span className="lesson-stat-value text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {duration} min
              </span>
            </div>

            {/* IAT Priority */}
            <div className="lesson-stat-card">
              <span className="lesson-stat-label">IAT Priority</span>
              <span className="lesson-stat-value text-amber-400 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 shrink-0" />
                {weightage}
              </span>
            </div>

            {/* Average Questions — full width on mobile */}
            <div className="lesson-stat-card col-span-2">
              <span className="lesson-stat-label">Avg. IAT Questions</span>
              <span className="lesson-stat-value text-cyan-300 flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 shrink-0" />
                {averageQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
