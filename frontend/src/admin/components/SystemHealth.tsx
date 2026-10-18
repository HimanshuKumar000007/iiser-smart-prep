import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Database,
  Server,
  Key,
  CreditCard,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { SystemHealthData } from '../types';

export const SystemHealth: React.FC = () => {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await AdminApiService.getHealth();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'System health check failed');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'configured':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 font-mono">
            <CheckCircle2 className="h-3 w-3" /> OPERATIONAL
          </span>
        );
      case 'checking':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-400 font-mono">
            <Loader2 className="h-3 w-3 animate-spin" /> CHECKING
          </span>
        );
      case 'degraded':
      case 'missing_key':
      case 'missing_keys':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-400 font-mono">
            <AlertTriangle className="h-3 w-3" /> DEGRADED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[11px] font-semibold text-rose-400 font-mono">
            <XCircle className="h-3 w-3" /> DOWN
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight font-space">
            Infrastructure & Diagnostics
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time ping checks for Supabase, Express, Razorpay, and Resend
          </p>
        </div>
        <button
          onClick={() => checkHealth(true)}
          disabled={refreshing || loading}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
          <span>{refreshing ? 'Testing...' : 'Ping Services'}</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* API Server */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Server className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Express Backend</span>
            </div>
            {getStatusBadge(health?.api.status || 'checking')}
          </div>
          <p className="text-xs text-slate-400">
            Node.js application runtime hosting all SmartPrep APIs
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Uptime:</span>
            <span className="text-slate-200">
              {health ? `${Math.round(health.api.uptimeSeconds / 60)} minutes` : '—'}
            </span>
          </div>
        </div>

        {/* Database */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Database className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Supabase PostgreSQL</span>
            </div>
            {getStatusBadge(health?.database.status || 'checking')}
          </div>
          <p className="text-xs text-slate-400">
            Primary relational database and persistent storage engine
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Query Latency:</span>
            <span className={health && health.database.latencyMs < 500 ? 'text-emerald-400' : 'text-amber-400'}>
              {health ? `${health.database.latencyMs}ms` : '—'}
            </span>
          </div>
        </div>

        {/* Payments Gateway */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <CreditCard className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Razorpay Payments</span>
            </div>
            {getStatusBadge(health?.payments.status || 'checking')}
          </div>
          <p className="text-xs text-slate-400">
            Payment gateway processing PRO subscription orders
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Mode:</span>
            <span className="text-emerald-400">Live Production</span>
          </div>
        </div>

        {/* Auth JWT */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Key className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Auth & JWT Engine</span>
            </div>
            {getStatusBadge(health?.auth.status || 'checking')}
          </div>
          <p className="text-xs text-slate-400">
            Cryptographic token verification for student & admin sessions
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Security:</span>
            <span className="text-slate-200">HS256 Verified</span>
          </div>
        </div>

        {/* Email Client */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Resend Email API</span>
            </div>
            {getStatusBadge(health?.email.status || 'checking')}
          </div>
          <p className="text-xs text-slate-400">
            Transactional email transport for payment confirmations
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Provider:</span>
            <span className="text-slate-200">Resend HTTPS</span>
          </div>
        </div>

        {/* Activity Sync Card */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <span className="font-semibold text-sm text-white">Activity Pulse</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              SYNCHRONIZED
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Last Payment:</span>
              <span className="font-mono text-slate-300">
                {health?.lastActivity.lastPayment
                  ? new Date(health.lastActivity.lastPayment).toLocaleDateString()
                  : 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Mock Submission:</span>
              <span className="font-mono text-slate-300">
                {health?.lastActivity.lastMockTest
                  ? new Date(health.lastActivity.lastMockTest).toLocaleDateString()
                  : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
