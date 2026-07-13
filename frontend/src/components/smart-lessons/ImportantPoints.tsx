import React from 'react';
import { Star, Check } from 'lucide-react';

interface Props {
  points: string[];
}

export function ImportantPoints({ points }: Props) {
  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
          <Star className="w-5 h-5 text-amber-400" />
          <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider">Remember (Key Takeaways)</h3>
        </div>

        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-white/75 leading-relaxed">
              <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
