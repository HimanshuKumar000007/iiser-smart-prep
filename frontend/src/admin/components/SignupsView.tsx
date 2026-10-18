import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Calendar, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { KpiCard } from './KpiCard';
import { MetricChart } from './MetricChart';

interface SignupsViewProps {
  overviewStats?: any;
}

export const SignupsView: React.FC<SignupsViewProps> = ({ overviewStats }) => {
  const [trendData, setTrendData] = useState<Array<{ date: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await AdminApiService.getUsers(1, 10);
        if (mounted && data.signupTrend) {
          setTrendData(data.signupTrend);
        }
      } catch (err) {
        console.warn('Failed to load signup trend:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Lifetime Signups"
          value={overviewStats?.totalUsers?.value ?? null}
          icon={Users}
          variant="indigo"
          tooltip="Total registered user accounts"
        />
        <KpiCard
          title="Today's Signups"
          value={overviewStats?.newUsersToday?.value ?? null}
          icon={UserPlus}
          variant="success"
          comparisonLabel="Registered today"
        />
        <KpiCard
          title="Signups This Week (7D)"
          value={overviewStats?.newUsers7d?.value ?? null}
          changePct={overviewStats?.newUsers7d?.changePct}
          icon={Calendar}
          comparisonLabel="vs prior 7 days"
        />
        <KpiCard
          title="Signups This Month (30D)"
          value={overviewStats?.newUsers30d?.value ?? null}
          changePct={overviewStats?.newUsers30d?.changePct}
          icon={TrendingUp}
          comparisonLabel="vs prior 30 days"
        />
      </div>

      {/* Signup Trend Chart */}
      <MetricChart
        title="30-Day Registration Velocity"
        subtitle="Daily new candidate signups on IISER SmartPrep"
        data={trendData}
        dataKey="count"
        xAxisKey="date"
        chartType="area"
        color="#06b6d4" // Cyan
        loading={loading}
        height={280}
      />

      {/* Acquisition Insights Callout */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
        <h3 className="text-sm font-semibold text-white tracking-tight mb-2">
          Registration & Acquisition Integrity
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Student accounts are securely stored in the Supabase PostgreSQL database. Passwords are salted and hashed using bcrypt before insertion. Signup conversion to Pro is tracked across candidate cohorts without modifying user onboarding flows.
        </p>
      </div>
    </div>
  );
};
