/**
 * MockTestPerformance — Real Mock History Component
 *
 * Replaces fake chart with user's actual mock score progression.
 *
 * Features:
 *   - Top Cards: Average Score, Best Score, Mocks Taken, Trend Badge
 *   - Line/Area Chart showing last 10 mock scores (M1, M2...)
 *   - Improvement % footer banner (▲ +60% since first mock)
 *   - Bottom stats: Last Mock, Best Mock, Current Trend
 *   - Empty state CTA for new users (0 mocks)
 *   - Strict color logic: Green (Improving), Blue (Stable), Amber (Needs Attention)
 */

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Minus, ArrowUpRight, FlaskConical, CheckCircle2 } from 'lucide-react';
import { DashboardData } from '../../hooks/useDashboardData';
import { cn } from '../../lib/utils';

interface Props {
  dashboardData?: DashboardData | null;
  loading?:       boolean;
  onNavigate?:    (view: string) => void;
}

export function MockTestPerformance({ dashboardData, loading, onNavigate }: Props) {
  const trendData = dashboardData?.performanceTrend;
  const mocks     = trendData?.recentMocks ?? [];
  const hasMocks  = mocks.length > 0;

  // Color logic
  const isImproving = trendData?.trend === 'Improving';
  const isAttention = trendData?.trend === 'Needs Attention';
  const trendColor  = isImproving
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : isAttention
    ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';

  const strokeColor = isImproving ? '#10b981' : isAttention ? '#f59e0b' : '#06b6d4';

  // Chart data format
  const chartData = mocks.map((m, idx) => ({
    name:  `M${idx + 1}`,
    date:  m.date,
    score: m.score,
  }));

  return (
    <div className="bg-[#05060F] border border-white/10 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-xl group">
      {/* Background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-80" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10">

        {/* ── Header Row ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-lg leading-tight">Performance Trend</h3>
              <p className="text-[11px] text-white/40">Real attempt history & score progression</p>
            </div>
          </div>

          {/* Trend pill */}
          {hasMocks && trendData && (
            <div className={cn('flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold', trendColor)}>
              {isImproving ? <TrendingUp className="w-3.5 h-3.5" /> : isAttention ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              <span>{trendData.trend}</span>
              <span>{isImproving ? '📈' : isAttention ? '⚠️' : '📊'}</span>
            </div>
          )}
        </div>

        {/* ── Loading Skeletons ───────────────────────────────────────────── */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl" />)}
            </div>
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        )}

        {/* ── Empty State (0 mocks) ───────────────────────────────────────── */}
        {!loading && !hasMocks && (
          <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-white/5 rounded-2xl bg-white/[0.015]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
              <FlaskConical className="w-7 h-7 text-cyan-400" />
            </div>
            <h4 className="text-white font-display font-bold text-base mb-1">No performance data yet</h4>
            <p className="text-white/40 text-xs max-w-sm mb-5 leading-relaxed">
              Take your first mock test to unlock your live score progression and AI trend diagnostics.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-white/50 mb-6">
              {['Progress graph', 'Improvement trend', 'Performance insights'].map(feat => (
                <div key={feat} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate?.('mock_tests')}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all"
            >
              <span>Take First Mock</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Real Content (has mocks) ────────────────────────────────────── */}
        {!loading && hasMocks && trendData && (
          <div>
            {/* Top Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Average Score', value: `${trendData.averageScore}%`, color: 'text-white' },
                { label: 'Best Score',    value: `${trendData.bestScore}%`,    color: 'text-cyan-400' },
                { label: 'Mocks Taken',   value: trendData.totalMocks,         color: 'text-white' },
                { label: 'Latest Attempt',value: `${trendData.lastScore}%`,    color: isImproving ? 'text-emerald-400' : 'text-white' },
              ].map(stat => (
                <div key={stat.label} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm">
                  <p className="text-[10px] uppercase font-bold text-white/35 tracking-wider mb-1">{stat.label}</p>
                  <p className={cn('text-xl font-display font-black leading-none', stat.color)}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="h-[240px] w-full pt-2 pr-2">
              <ResponsiveContainer width="100%" height="100%" minHeight={240}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={strokeColor} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0A0C18] border border-white/15 p-3 rounded-xl shadow-2xl text-xs">
                          <p className="font-bold text-white mb-0.5">{d.name} <span className="text-white/40 font-normal">({d.date || 'Attempt'})</span></p>
                          <p className="text-cyan-400 font-black text-sm">Score: {d.score}%</p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={strokeColor}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#trendGrad)"
                    dot={{ stroke: strokeColor, strokeWidth: 2, r: 4, fill: '#05060F' }}
                    activeDot={{ r: 6, fill: strokeColor, stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Footer Banner & Summary Row */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Improvement % */}
              <div className="flex items-center gap-2">
                <div className={cn('p-2 rounded-xl flex items-center justify-center', isImproving ? 'bg-emerald-500/15 text-emerald-400' : isAttention ? 'bg-amber-500/15 text-amber-400' : 'bg-cyan-500/15 text-cyan-400')}>
                  {isImproving ? <TrendingUp className="w-4 h-4" /> : isAttention ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {trendData.improvementPct >= 0 ? `▲ +${trendData.improvementPct}%` : `▼ ${trendData.improvementPct}%`} improvement
                  </p>
                  <p className="text-[10px] text-white/40">Since your first mock test attempt</p>
                </div>
              </div>

              {/* Bottom Mini Cards */}
              <div className="flex items-center gap-6 self-stretch sm:self-auto bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl">
                <div>
                  <span className="text-[9px] uppercase font-bold text-white/30 block">First Mock</span>
                  <span className="text-xs font-black text-white">{trendData.firstScore}%</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-white/30 block">Best Mock</span>
                  <span className="text-xs font-black text-cyan-400">{trendData.bestScore}%</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div>
                  <span className="text-[9px] uppercase font-bold text-white/30 block">Trend</span>
                  <span className={cn('text-xs font-black', isImproving ? 'text-emerald-400' : isAttention ? 'text-amber-400' : 'text-cyan-400')}>
                    {trendData.trend}
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
