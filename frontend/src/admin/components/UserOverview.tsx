import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Loader2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { AdminUser, UsersResponse } from '../types';
import { KpiCard } from './KpiCard';
import { MetricChart } from './MetricChart';

interface UserOverviewProps {
  overviewStats?: any;
}

export const UserOverview: React.FC<UserOverviewProps> = ({ overviewStats }) => {
  const [userData, setUserData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<'ALL' | 'PRO' | 'FREE'>('ALL');

  // Plan update modal state
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AdminApiService.getUsers(page, 20, search, planFilter);
      setUserData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load user records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, planFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleUpdatePlan = async (plan: 'PRO' | 'FREE') => {
    if (!selectedUser) return;
    setUpdatingPlan(true);
    setUpdateMsg(null);
    try {
      const res = await AdminApiService.setPlan(selectedUser.email, plan, plan === 'PRO' ? 365 : 0);
      setUpdateMsg({ type: 'success', text: res.message });
      // Refresh current page
      setTimeout(() => {
        fetchUsers();
        setSelectedUser(null);
        setUpdateMsg(null);
      }, 1200);
    } catch (err: any) {
      setUpdateMsg({ type: 'error', text: err.message || 'Failed to update user plan' });
    } finally {
      setUpdatingPlan(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Users"
          value={overviewStats?.totalUsers?.value ?? (loading ? null : userData?.pagination.total)}
          icon={Users}
          variant="indigo"
          tooltip="Total registered student accounts in database"
        />
        <KpiCard
          title="New Today"
          value={overviewStats?.newUsersToday?.value ?? null}
          icon={UserPlus}
          variant="success"
          comparisonLabel="Registered today"
        />
        <KpiCard
          title="New This Week (7D)"
          value={overviewStats?.newUsers7d?.value ?? null}
          changePct={overviewStats?.newUsers7d?.changePct}
          icon={UserPlus}
          comparisonLabel="vs prev 7 days"
        />
        <KpiCard
          title="New This Month (30D)"
          value={overviewStats?.newUsers30d?.value ?? null}
          changePct={overviewStats?.newUsers30d?.changePct}
          icon={Users}
          comparisonLabel="vs prev 30 days"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Paid Pro Users"
          value={overviewStats?.proUsers?.value ?? null}
          icon={UserCheck}
          variant="amber"
          comparisonLabel="Active Pro entitlements"
        />
        <KpiCard
          title="Free Tier Users"
          value={overviewStats?.proUsers?.freeUsers ?? null}
          icon={Users}
          comparisonLabel="Standard free tier"
        />
        <KpiCard
          title="7-Day Active Users"
          value={overviewStats?.activeUsers7d?.value ?? null}
          icon={Clock}
          comparisonLabel="Test activity in last 7d"
        />
        <KpiCard
          title="30-Day Active Users"
          value={overviewStats?.activeUsers30d?.value ?? null}
          icon={Clock}
          comparisonLabel="Test activity in last 30d"
        />
      </div>

      {/* Signup Trend Chart */}
      {userData?.signupTrend && (
        <MetricChart
          title="User Registration Trend"
          subtitle="Daily new user registrations over the past 30 days"
          data={userData.signupTrend}
          dataKey="count"
          xAxisKey="date"
          chartType="area"
          color="#6366f1"
          height={240}
        />
      )}

      {/* Users Data Table with Controls */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight font-space">
              Registered Students
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse, filter and inspect user accounts in real time
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search email or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
            </form>

            {/* Plan Filter */}
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 p-1 text-xs">
              {(['ALL', 'PRO', 'FREE'] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => {
                    setPlanFilter(plan);
                    setPage(1);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer transition-all ${
                    planFilter === plan
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4">Plan Expiry</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                      <span>Loading user records...</span>
                    </div>
                  </td>
                </tr>
              ) : !userData?.users || userData.users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No users match your search criteria.
                  </td>
                </tr>
              ) : (
                userData.users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">{u.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold font-mono ${
                          u.isPro
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {u.isPro ? '★ PRO' : 'FREE'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {u.planExpiry ? new Date(u.planExpiry).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-indigo-500 hover:text-white transition-all cursor-pointer"
                      >
                        Manage Plan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {userData && userData.pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
            <div>
              Showing page <span className="font-mono text-white">{userData.pagination.page}</span> of{' '}
              <span className="font-mono text-white">{userData.pagination.totalPages}</span> ({userData.pagination.total} total)
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                disabled={page >= userData.pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-8 items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Plan Management Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white font-space">Manage Student Plan</h3>
            <p className="mt-1 text-xs text-slate-400 break-all font-mono">{selectedUser.email}</p>

            <div className="my-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Plan:</span>
                <span className="font-bold text-white">{selectedUser.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pro Status:</span>
                <span className={selectedUser.isPro ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                  {selectedUser.isPro ? 'Active Pro' : 'Free Tier'}
                </span>
              </div>
            </div>

            {updateMsg && (
              <div
                className={`mb-4 rounded-lg p-2.5 text-xs ${
                  updateMsg.type === 'success'
                    ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    : 'border border-rose-500/20 bg-rose-500/10 text-rose-300'
                }`}
              >
                {updateMsg.text}
              </div>
            )}

            <div className="space-y-2">
              <button
                disabled={updatingPlan}
                onClick={() => handleUpdatePlan('PRO')}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 cursor-pointer"
              >
                {updatingPlan ? 'Saving...' : 'Grant 1-Year PRO Plan'}
              </button>

              <button
                disabled={updatingPlan}
                onClick={() => handleUpdatePlan('FREE')}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
              >
                Set Plan to FREE
              </button>

              <button
                disabled={updatingPlan}
                onClick={() => setSelectedUser(null)}
                className="w-full rounded-xl py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
