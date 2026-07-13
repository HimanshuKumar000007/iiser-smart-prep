import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { LessonItem } from '../../data/lessons';
import { LessonCard } from './LessonCard';

interface Props {
  lessons: LessonItem[];
  statuses: Record<string, 'not_started' | 'in_progress' | 'completed'>;
  onNavigate?: (view: string) => void;
  onClearSearch?: () => void;
}

export function LessonGrid({ lessons, statuses, onNavigate, onClearSearch }: Props) {
  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[#0A0C18] border border-white/5 rounded-3xl">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <SearchX className="w-8 h-8 text-white/40" />
        </div>
        <h3 className="text-white font-display font-bold text-lg mb-1">No lessons found</h3>
        <p className="text-white/40 text-xs max-w-sm mb-6">
          We couldn't find any topics matching your keyword. Try searching for a different subject or chapter name.
        </p>
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-full text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Search</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          status={statuses[lesson.id] || 'not_started'}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
