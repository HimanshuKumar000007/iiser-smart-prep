import React, { useState, useEffect } from 'react';
import {
  Activity,
  Award,
  Clock,
  BookOpen,
  GraduationCap,
  Layers,
  TrendingUp,
  BarChart2,
  Loader2
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { EngagementData } from '../types';
import { KpiCard } from './KpiCard';
import { MetricChart } from './MetricChart';

interface EngagementViewProps {
  overviewStats?: any;
}

export const EngagementView: React.FC<EngagementViewProps> = ({ overviewStats }) => {
  const [data, setData] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const engData = await AdminApiService.getEngagement();
        if (mounted) setData(engData);
      } catch (err: any) {
        if (mounted) setError(err.message || 'Failed to load engagement statistics');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const avgMinutes = data?.averageTimeTakenSeconds
    ? Math.round(data.averageTimeTakenSeconds / 60)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="30-Day Test Sessions"
          value={data?.totalTestsTaken30d ?? null}
          icon={Activity}
          variant="indigo"
          comparisonLabel="Full & Chapter mock submissions"
        />
        <KpiCard
          title="Avg Mock Score"
          value={data?.averageScore !== undefined ? `${data.averageScore} pts` : null}
          icon={Award}
          variant="success"
          comparisonLabel="Average student score"
        />
        <KpiCard
          title="Avg Completion Time"
          value={data?.averageTimeTakenSeconds ? `${avgMinutes} mins` : null}
          icon={Clock}
          variant="amber"
          comparisonLabel="Average exam duration"
        />
        <KpiCard
          title="Quiz Attempts"
          value={data?.chapterQuizAttempts ?? null}
          icon={BookOpen}
          comparisonLabel="Chapter-level quizzes"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="7-Day Active Students"
          value={overviewStats?.activeUsers7d?.value ?? null}
          icon={GraduationCap}
          comparisonLabel="Distinct test takers (7d)"
        />
        <KpiCard
          title="30-Day Active Students"
          value={overviewStats?.activeUsers30d?.value ?? null}
          icon={GraduationCap}
          comparisonLabel="Distinct test takers (30d)"
        />
        <KpiCard
          title="Lesson Sessions"
          value={data?.lessonSessions ?? null}
          icon={Layers}
          comparisonLabel="Smart lessons viewed"
        />
        <KpiCard
          title="Tracked Student Profiles"
          value={data?.totalTrackedStudents ?? null}
          icon={Award}
          comparisonLabel="Aggregated in user_stats"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Volume Trend */}
        <MetricChart
          title="Daily Mock Submissions"
          subtitle="Tests completed by students over the last 30 days"
          data={data?.testTrend || []}
          dataKey="tests"
          xAxisKey="date"
          chartType="area"
          color="#8b5cf6"
          loading={loading}
          height={260}
        />

        {/* Subject Breakdown Chart */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Subject Practice Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tests completed categorized by academic discipline
              </p>
            </div>
            <BarChart2 className="h-4 w-4 text-indigo-400" />
          </div>

          {loading ? (
            <div className="flex h-56 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
            </div>
          ) : !data?.subjectBreakdown || data.subjectBreakdown.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-xs text-slate-500">
              No subject practice data available.
            </div>
          ) : (
            <div className="space-y-3.5 pt-2">
              {data.subjectBreakdown.map((item) => {
                const total = data.totalTestsTaken30d || 1;
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.subject}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-200">{item.subject}</span>
                      <span className="font-mono text-slate-400">
                        {item.count} tests ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
