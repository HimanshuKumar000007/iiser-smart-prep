import React from 'react';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value?: string | number | null;
  changePct?: number | null;
  comparisonLabel?: string;
  icon?: LucideIcon;
  subValue?: string;
  loading?: boolean;
  unavailable?: boolean;
  tooltip?: string;
  variant?: 'default' | 'success' | 'indigo' | 'amber';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  changePct,
  comparisonLabel,
  icon: Icon,
  subValue,
  loading = false,
  unavailable = false,
  tooltip,
  variant = 'default',
}) => {
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-800" />
        </div>
        <div className="mt-4 h-7 w-32 animate-pulse rounded bg-slate-800" />
        <div className="mt-2 h-3.5 w-40 animate-pulse rounded bg-slate-800/60" />
      </div>
    );
  }

  const isPositive = typeof changePct === 'number' && changePct > 0;
  const isNegative = typeof changePct === 'number' && changePct < 0;
  const isZero = typeof changePct === 'number' && changePct === 0;

  const iconColors: Record<string, string> = {
    default: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div
      title={tooltip}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:border-slate-700 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
          {title}
        </span>
        {Icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconColors[variant]} shadow-sm transition-transform group-hover:scale-105`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        {unavailable || value === undefined || value === null ? (
          <span className="text-lg font-medium text-slate-500 italic">
            Data unavailable
          </span>
        ) : (
          <span className="text-2xl font-bold tracking-tight text-white font-space">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
        )}
        {subValue && (
          <span className="text-xs text-slate-400 font-medium">{subValue}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        {typeof changePct === 'number' ? (
          <span
            className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400'
                : isNegative
                ? 'bg-rose-500/10 text-rose-400'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isPositive && <TrendingUp className="h-3 w-3" />}
            {isNegative && <TrendingDown className="h-3 w-3" />}
            {isZero && <Minus className="h-3 w-3" />}
            {isPositive ? `+${changePct}%` : `${changePct}%`}
          </span>
        ) : null}

        {comparisonLabel && (
          <span className="text-slate-400 truncate text-[11px]">
            {comparisonLabel}
          </span>
        )}
      </div>
    </div>
  );
};
