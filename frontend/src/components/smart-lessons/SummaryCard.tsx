import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface Props {
  goals: string[];
}

export function SummaryCard({ goals }: Props) {
  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider">What You'll Learn</h3>
        </div>

        {/* Goals — single column on mobile, 2-col on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/8 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="text-xs sm:text-sm text-white/75 leading-relaxed">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
