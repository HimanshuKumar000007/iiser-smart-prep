import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface DataPoint {
  date?: string;
  name?: string;
  [key: string]: any;
}

interface MetricChartProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  dataKey: string;
  xAxisKey?: string;
  chartType?: 'area' | 'bar';
  color?: string;
  valueFormatter?: (val: number) => string;
  height?: number;
  loading?: boolean;
}

export const MetricChart: React.FC<MetricChartProps> = ({
  title,
  subtitle,
  data,
  dataKey,
  xAxisKey = 'date',
  chartType = 'area',
  color = '#6366f1', // Indigo
  valueFormatter = (val) => val.toLocaleString(),
  height = 260,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
        <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />
        <div className="mt-2 h-3.5 w-48 animate-pulse rounded bg-slate-800/60" />
        <div className="mt-6 w-full animate-pulse rounded-xl bg-slate-800/40" style={{ height }} />
      </div>
    );
  }

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {!hasData ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30 text-center"
          style={{ height }}
        >
          <p className="text-xs font-medium text-slate-500">No chart data recorded for this period</p>
        </div>
      ) : (
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => {
                    if (typeof val === 'string' && val.includes('-')) {
                      const parts = val.split('-');
                      return `${parts[1]}/${parts[2]}`;
                    }
                    return val;
                  }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={valueFormatter}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#f8fafc' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}
                  formatter={(val: any) => [valueFormatter(Number(val)), title]}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${dataKey})`}
                />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={valueFormatter}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#f8fafc' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}
                  formatter={(val: any) => [valueFormatter(Number(val)), title]}
                />
                <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
