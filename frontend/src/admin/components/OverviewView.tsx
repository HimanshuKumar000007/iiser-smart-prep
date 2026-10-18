import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Activity,
  Clock,
  UserCheck,
  CreditCard,
  Receipt,
  Percent,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { OverviewMetrics, ActivityEvent, AdminTab } from '../types';
import { AdminApiService } from '../services/adminApi';
import { KpiCard } from './KpiCard';

interface OverviewViewProps {
  metrics: OverviewMetrics | null;
  loading: boolean;
  onNavigateTab: (tab: AdminTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  loading,
  onNavigateTab
}) => {
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await AdminApiService.getRecentActivity();
        if (mounted) setActivity(res.events || []);
      } catch (err) {
        console.warn('Failed to load recent activity:', err);
      } finally {
        if (mounted) setActivityLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* ── KPI SECTION 1: USER ACQUISITION ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Platform Scale & Audience
          </span>
          <button
            onClick={() => onNavigateTab('users')}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            <span>Inspect All Students</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Users"
            value={metrics?.totalUsers.value}
            changePct={metrics?.totalUsers.changePct}
            comparisonLabel="vs 30d baseline"
            icon={Users}
            variant="indigo"
            loading={loading}
            tooltip="Total registered accounts in users table"
          />
          <KpiCard
            title="New Today"
            value={metrics?.newUsersToday.value}
            comparisonLabel="Registered since midnight"
            icon={UserPlus}
            variant="success"
            loading={loading}
          />
          <KpiCard
            title="New Signups (7D)"
            value={metrics?.newUsers7d.value}
            changePct={metrics?.newUsers7d.changePct}
            comparisonLabel="vs prior 7 days"
            icon={UserPlus}
            loading={loading}
          />
          <KpiCard
            title="New Signups (30D)"
            value={metrics?.newUsers30d.value}
            changePct={metrics?.newUsers30d.changePct}
            comparisonLabel="vs prior 30 days"
            icon={Users}
            loading={loading}
          />
        </div>
      </div>

      {/* ── KPI SECTION 2: ACTIVITY & MONETIZATION ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Engagement & Monetization
          </span>
          <button
            onClick={() => onNavigateTab('payments')}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            <span>View Payments</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="7-Day Active Users"
            value={metrics?.activeUsers7d.value}
            icon={Activity}
            variant="indigo"
            loading={loading}
            comparisonLabel="Active test takers (7d)"
          />
          <KpiCard
            title="30-Day Active Users"
            value={metrics?.activeUsers30d.value}
            icon={Clock}
            loading={loading}
            comparisonLabel="Active test takers (30d)"
          />
          <KpiCard
            title="Paid Pro Students"
            value={metrics?.proUsers.value}
            icon={UserCheck}
            variant="amber"
            loading={loading}
            comparisonLabel="Active PRO entitlements"
          />
          <KpiCard
            title="Total Gross Revenue"
            value={metrics?.revenue ? `₹${metrics.revenue.total.toLocaleString()}` : null}
            icon={Receipt}
            variant="success"
            loading={loading}
            comparisonLabel="100% captured INR"
          />
        </div>
      </div>

      {/* ── KPI SECTION 3: REVENUE DEEP DIVE & CONVERSION ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="30-Day Revenue"
          value={metrics?.revenue ? `₹${metrics.revenue.last30Days.toLocaleString()}` : null}
          changePct={metrics?.revenue.changePct}
          comparisonLabel="vs prev 30 days"
          icon={TrendingUp}
          variant="indigo"
          loading={loading}
        />
        <KpiCard
          title="Paid Conversion Rate"
          value={metrics?.conversionRate.label}
          icon={Percent}
          variant="success"
          loading={loading}
          comparisonLabel="PRO students / Total users"
        />
        <KpiCard
          title="Transactions Count"
          value={metrics?.revenue.successfulTransactions}
          icon={CreditCard}
          loading={loading}
          comparisonLabel="Captured payments"
        />
      </div>

      {/* ── RECENT ACTIVITY FEED & SYSTEM HIGHLIGHTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight font-space">
                Live Activity Feed
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time stream of student registrations, exam attempts, and payments
              </p>
            </div>
            <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
              Live DB Events
            </span>
          </div>

          <div className="space-y-3">
            {activityLoading ? (
              <div className="py-12 text-center text-xs text-slate-500">
                Loading activity pulse...
              </div>
            ) : activity.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No recent activity recorded.
              </div>
            ) : (
              activity.slice(0, 8).map((evt) => {
                const getEventColor = (type: ActivityEvent['type']) => {
                  switch (type) {
                    case 'payment':
                      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                    case 'mock_test':
                      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
                    default:
                      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
                  }
                };

                return (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold font-mono ${getEventColor(evt.type)}`}>
                        {evt.type === 'payment' ? '₹' : evt.type === 'mock_test' ? 'M' : 'U'}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">
                          {evt.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {evt.description}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {evt.badge && (
                        <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                          {evt.badge}
                        </span>
                      )}
                      <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                        {evt.timestamp ? new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Launch & System Snapshot (1 Col) */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight font-space mb-1">
              Operations Center
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Quick navigators and production sanity tools
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('users')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/50 hover:border-slate-700 text-left cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-indigo-400" />
                  <div>
                    <span className="text-xs font-semibold text-white block">Student Directory</span>
                    <span className="text-[11px] text-slate-400 block">Search & adjust pro status</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigateTab('payments')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/50 hover:border-slate-700 text-left cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-emerald-400" />
                  <div>
                    <span className="text-xs font-semibold text-white block">Revenue & Orders</span>
                    <span className="text-[11px] text-slate-400 block">Razorpay transaction ledger</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigateTab('health')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/50 hover:border-slate-700 text-left cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  <div>
                    <span className="text-xs font-semibold text-white block">System Health</span>
                    <span className="text-[11px] text-slate-400 block">Ping Supabase & APIs</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between font-mono">
            <span>Production V2.0</span>
            <span>Cloudflare + Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
};
