/**
 * LockedAISuite — Master Activation Hub for New Students
 *
 * Replaces 4 stacked repetitive locked cards with ONE cohesive,
 * premium onboarding suite banner when total_attempts === 0.
 */

import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Lock, ArrowUpRight, Target, ClipboardList, Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface Props {
  onNavigate?: (view: string) => void;
}

export function LockedAISuite({ onNavigate }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const engines = [
    {
      icon: Target,
      title: 'AI Selection Predictor',
      desc: 'Projected IISER Score, AIR Rank & Selection Probability',
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    },
    {
      icon: BrainCircuit,
      title: 'AI Study Coach',
      desc: 'Actionable Morning, Afternoon & Evening Study Schedule',
      color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    },
    {
      icon: Sparkles,
      title: 'Smart Revision Engine',
      desc: 'Personalised Chapter Spaced Repetition & Priority Queue',
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
    },
    {
      icon: Activity,
      title: 'Performance Trends',
      desc: 'Real Attempt History & Split-Half Score Progression',
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative rounded-3xl p-6 lg:p-8 overflow-hidden',
        isLight
          ? 'bg-white/70 backdrop-blur-[24px] border border-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.09),0_2px_8px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.95)]'
          : 'bg-gradient-to-br from-[#0D0F1F] via-[#0A0C18] to-[#0D0F1F] border border-violet-500/25 shadow-[0_0_50px_rgba(139,92,246,0.12)]'
      )}
    >
      {/* Glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Top pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold mb-5">
          <Lock className="w-3.5 h-3.5 text-violet-400" />
          <span>AI Intelligence Suite · Inactive (0 Attempts)</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-display font-black text-2xl lg:text-3xl tracking-tight mb-2 max-w-xl leading-tight">
          Complete 1 Diagnostic Test to Activate Your AI Mentor Suite
        </h3>
        <p className="text-white/45 text-xs lg:text-sm max-w-lg mb-8 leading-relaxed">
          One 15-minute diagnostic test gives our rule engines the baseline data needed to generate your complete roadmap.
        </p>

        {/* 4 Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full mb-8">
          {engines.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div
                key={e.title}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all backdrop-blur-sm ${e.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Lock className="w-3.5 h-3.5 opacity-40" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs mb-1">{e.title}</p>
                  <p className="text-white/40 text-[11px] leading-snug">{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate?.('mock_tests')}
          className="flex items-center gap-2.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-black px-8 py-3.5 rounded-full text-sm shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
        >
          <ClipboardList className="w-4.5 h-4.5" />
          <span>Take Diagnostic Test (15 Mins)</span>
          <ArrowUpRight className="w-4.5 h-4.5" />
        </motion.button>

        <p className="text-[11px] text-white/30 mt-3 font-medium">
          Instant deterministic results · No API delays
        </p>

      </div>
    </motion.div>
  );
}
