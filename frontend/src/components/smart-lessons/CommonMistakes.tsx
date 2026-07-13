import React from 'react';
import { AlertOctagon, Flame } from 'lucide-react';
import { ExamTrapItem } from '../../data/lessonContent';

interface Props {
  traps: ExamTrapItem[];
}

export function CommonMistakes({ traps }: Props) {
  if (!traps || traps.length === 0) return null;

  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider">Exam Traps ⚠️</h3>
        </div>

        {/* Trap cards — single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {traps.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/10 space-y-2 hover:border-rose-500/25 hover:shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
                <Flame className="w-4 h-4 shrink-0" />
                <h4 className="leading-snug">{item.trap}</h4>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                {item.warning}
              </p>
              <span className="text-rose-400/80 font-bold text-[10px] block">⚡ Many students lose marks here.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
