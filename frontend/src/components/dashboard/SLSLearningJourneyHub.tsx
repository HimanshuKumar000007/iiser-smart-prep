/**
 * SLSLearningJourneyHub — Onboarding hub for students with zero SLS data
 *
 * Displayed when analytics.overall.totalAttempts === 0 (or analytics API unavailable).
 * Replaces the old LockedAISuite Diagnostic Test CTA in the SLS sections.
 *
 * On subject selection, navigates to the first catalog chapter for that subject:
 *   Physics     → /smart-lessons/phy_units         (Units & Measurements)
 *   Chemistry   → /smart-lessons/chem_basic_concepts (Basic Concepts)
 *   Mathematics → /smart-lessons/math_sets          (Sets, Relations & Functions)
 *   Biology     → /smart-lessons/bio_diversity      (Diversity in the Living World)
 */

import React from 'react';
import { motion } from 'motion/react';
import { Atom, FlaskConical, Calculator, Dna, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const SUBJECT_ENTRIES = [
  {
    subject: 'Physics',
    chapterId: 'phy_units',
    chapterTitle: 'Units & Measurements',
    icon: Atom,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/50',
    glow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-400',
  },
  {
    subject: 'Chemistry',
    chapterId: 'chem_basic_concepts',
    chapterTitle: 'Basic Concepts of Chemistry',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/50',
    glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-cyan-400',
  },
  {
    subject: 'Mathematics',
    chapterId: 'math_sets',
    chapterTitle: 'Sets, Relations & Functions',
    icon: Calculator,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/50',
    glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-400',
  },
  {
    subject: 'Biology',
    chapterId: 'bio_diversity',
    chapterTitle: 'Diversity in the Living World',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/50',
    glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-400',
  },
] as const;

interface Props {
  onNavigate?: (view: string) => void;
}

export function SLSLearningJourneyHub({ onNavigate }: Props) {
  function handleSubject(chapterId: string) {
    onNavigate?.(`/smart-lessons/${chapterId}`);
  }

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative rounded-3xl p-6 lg:p-8 overflow-hidden',
        isLight
          ? 'bg-white/70 backdrop-blur-[24px] border border-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.09),0_2px_8px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.95)]'
          : 'bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-white/10'
      )}
    >
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Start Your Learning Journey</span>
          </div>

          <h3 className="text-white font-display font-black text-2xl lg:text-3xl tracking-tight mb-2 max-w-xl leading-tight">
            Choose a Subject to Begin
          </h3>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            Start your first Smart Lesson to activate the AI analytics engine. Your performance data will unlock weakness detection, personalized recommendations, and mastery tracking.
          </p>
        </div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUBJECT_ENTRIES.map((entry, idx) => {
            const Icon = entry.icon;
            return (
              <motion.button
                key={entry.subject}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                onClick={() => handleSubject(entry.chapterId)}
                className={cn(
                  'group relative p-5 rounded-2xl border text-left transition-all duration-200',
                  'bg-white/[0.03] hover:bg-white/[0.07]',
                  entry.border, entry.hoverBorder, entry.glow,
                  'hover:-translate-y-1',
                )}
              >
                {/* Icon */}
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-4 border',
                  entry.bg, entry.border,
                )}>
                  <Icon className={cn('w-5 h-5', entry.color)} />
                </div>

                {/* Subject name */}
                <p className={cn('text-sm font-black uppercase tracking-wider mb-1', entry.color)}>
                  {entry.subject}
                </p>

                {/* First chapter */}
                <p className="text-white font-semibold text-sm leading-tight mb-1">
                  {entry.chapterTitle}
                </p>

                <p className="text-white/35 text-xs flex items-center gap-1">
                  <BookOpen className="w-3 h-3 flex-shrink-0" />
                  First chapter
                </p>

                {/* Hover CTA */}
                <div className={cn(
                  'flex items-center gap-1.5 mt-3 text-[11px] font-bold opacity-0 group-hover:opacity-100',
                  'transition-all duration-200 translate-x-0 group-hover:translate-x-0.5',
                  entry.color,
                )}>
                  Start Now
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-white/25 font-medium mt-6">
          Your SLS Intelligence Suite activates automatically after your first chapter quiz.
        </p>
      </div>
    </motion.div>
  );
}
