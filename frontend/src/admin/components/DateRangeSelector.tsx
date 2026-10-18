import React from 'react';
import { DateRangeOption } from '../types';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  selected: DateRangeOption;
  onChange: (option: DateRangeOption) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selected,
  onChange
}) => {
  const options: Array<{ id: DateRangeOption; label: string }> = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'all', label: 'All Time' }
  ];

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/90 p-1 shadow-inner">
      <div className="flex items-center pl-2 pr-1 text-slate-500">
        <Calendar className="h-3.5 w-3.5" />
      </div>
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
