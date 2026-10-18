import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  TrendingUp,
  Receipt,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Loader2,
  PackageCheck
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { PaymentsResponse } from '../types';
import { KpiCard } from './KpiCard';
import { MetricChart } from './MetricChart';

interface PaymentOverviewProps {
  overviewStats?: any;
}

export const PaymentOverview: React.FC<PaymentOverviewProps> = ({ overviewStats }) => {
  const [paymentData, setPaymentData] = useState<PaymentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AdminApiService.getPayments(page, 20);
      setPaymentData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payment records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page]);

  const totalRevenue = overviewStats?.revenue?.total ?? paymentData?.stats.totalRevenue;
  const last30dRevenue = overviewStats?.revenue?.last30Days;
  const conversionRate = overviewStats?.conversionRate?.value;
  const successfulTxCount = overviewStats?.revenue?.successfulTransactions ?? paymentData?.stats.totalTransactions;

  // Transform tier breakdown for bar chart
  const tierChartData = paymentData?.stats?.tierBreakdown
    ? Object.entries(paymentData.stats.tierBreakdown).map(([tier, data]) => ({
        tier: tier.split(' ')[0], // short tier name
        count: data.count,
        revenue: data.revenue
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Gross Revenue"
          value={totalRevenue !== undefined ? `₹${totalRevenue.toLocaleString()}` : null}
          icon={Receipt}
          variant="success"
          comparisonLabel="All-time captured INR"
        />
        <KpiCard
          title="30-Day Revenue"
          value={last30dRevenue !== undefined ? `₹${last30dRevenue.toLocaleString()}` : null}
          changePct={overviewStats?.revenue?.changePct}
          icon={TrendingUp}
          variant="indigo"
          comparisonLabel="vs prev 30 days"
        />
        <KpiCard
          title="Successful Payments"
          value={successfulTxCount ?? null}
          icon={CreditCard}
          variant="amber"
          comparisonLabel="100% captured transactions"
        />
        <KpiCard
          title="Paid Conversion Rate"
          value={conversionRate !== undefined ? `${conversionRate}%` : null}
          icon={PackageCheck}
          comparisonLabel="Pro students / Total users"
        />
      </div>

      {/* Plan Tier Distribution & Revenue Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier breakdown cards */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Subscription Plan Revenue
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution across SmartPrep membership tiers
              </p>
            </div>
            <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
              Razorpay Live
            </span>
          </div>

          <div className="space-y-3">
            {paymentData?.stats?.tierBreakdown ? (
              Object.entries(paymentData.stats.tierBreakdown).map(([tierName, stat]) => {
                const pct = totalRevenue && totalRevenue > 0
                  ? Math.round((stat.revenue / totalRevenue) * 100)
                  : 0;
                return (
                  <div key={tierName} className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-200">{tierName}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-indigo-400 font-medium">₹{stat.revenue.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({stat.count} orders)</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.max(4, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                Loading tier metrics...
              </div>
            )}
          </div>
        </div>

        {/* Daily Revenue Trend Chart */}
        {paymentData?.stats?.revenueTrend && (
          <MetricChart
            title="Daily Revenue Trend"
            subtitle="Gross INR received per day"
            data={paymentData.stats.revenueTrend}
            dataKey="revenue"
            xAxisKey="date"
            chartType="area"
            color="#10b981"
            valueFormatter={(val) => `₹${val}`}
            height={260}
          />
        )}
      </div>

      {/* Read-Only Payments Data Table */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight font-space">
                Transactions Ledger
              </h3>
              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 font-mono">
                READ-ONLY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified Razorpay payment records logged in database
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">User Email</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                      <span>Loading payment records...</span>
                    </div>
                  </td>
                </tr>
              ) : !paymentData?.payments || paymentData.payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                paymentData.payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">
                      {p.email}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-sm">
                      ₹{p.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {p.paymentId || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 font-mono uppercase">
                        <CheckCircle className="h-2.5 w-2.5" /> {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {p.createdAt ? new Date(p.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paymentData && paymentData.pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
            <div>
              Page <span className="font-mono text-white">{paymentData.pagination.page}</span> of{' '}
              <span className="font-mono text-white">{paymentData.pagination.totalPages}</span> ({paymentData.pagination.total} total)
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
                disabled={page >= paymentData.pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-8 items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
