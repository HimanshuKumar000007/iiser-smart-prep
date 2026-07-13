import React from 'react';
import { cn } from '../../lib/utils';

interface Props {
  selected: string;
  onSelect: (subject: string) => void;
}

const SUBJECTS = [
  { label: 'All', value: 'All', icon: '📚' },
  { label: 'Physics', value: 'Physics', icon: '⚛️' },
  { label: 'Chemistry', value: 'Chemistry', icon: '🧪' },
  { label: 'Biology', value: 'Biology', icon: '🧬' },
  { label: 'Mathematics', value: 'Mathematics', icon: '📐' },
];

export function SubjectTabs({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SUBJECTS.map((sub) => {
        const isActive = selected === sub.value;
        return (
          <button
            key={sub.value}
            onClick={() => onSelect(sub.value)}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border backdrop-blur-md',
              isActive
                ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.03]'
                : 'bg-white/[0.02] text-white/50 border-white/5 hover:border-white/10 hover:text-white hover:bg-white/[0.05] hover:scale-[1.01]'
            )}

          >
            <span>{sub.icon}</span>
            <span>{sub.label}</span>
          </button>
        );
      })}
    </div>
  );
}
