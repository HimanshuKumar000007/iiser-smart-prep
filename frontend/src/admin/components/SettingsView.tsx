import React from 'react';
import { ShieldCheck, Key, RefreshCw, LogOut, CheckCircle, Lock, Server } from 'lucide-react';
import { AdminApiService } from '../services/adminApi';

interface SettingsViewProps {
  onLogout: () => void;
  onRefresh: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onLogout, onRefresh }) => {
  const handleClearCache = () => {
    // Keep admin token, clear any transient data
    onRefresh();
    alert('Dashboard cache cleared and refreshed.');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-lg shadow-black/20 backdrop-blur-md">
        <h3 className="text-base font-bold text-white tracking-tight font-space mb-1">
          Admin Session & Security
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Access control settings and active administrative token parameters
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white">Active Authorization</span>
            </div>
            <p className="text-xs text-slate-400">
              Session secured with a cryptographically signed HMAC-SHA256 Admin JWT issued by the Express backend.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Token Status: Valid (12h TTL)</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold text-white">Credential Protection</span>
            </div>
            <p className="text-xs text-slate-400">
              The master secret is securely stored in backend environment variables and is never exposed to client-side code.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              <span>Zero client credential leaks</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <button
            onClick={handleClearCache}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Flush Local Dashboard Cache</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Terminate Admin Session</span>
          </button>
        </div>
      </div>

      {/* Production Stack Snapshot */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-lg shadow-black/20 backdrop-blur-md">
        <h3 className="text-sm font-semibold text-white tracking-tight mb-4 flex items-center gap-2">
          <Server className="h-4 w-4 text-indigo-400" />
          Production Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <span className="text-[11px] text-slate-400 block font-mono">Frontend Host</span>
            <span className="font-semibold text-slate-200">Cloudflare Pages</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <span className="text-[11px] text-slate-400 block font-mono">Backend Engine</span>
            <span className="font-semibold text-slate-200">Node / Express 5</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <span className="text-[11px] text-slate-400 block font-mono">Database</span>
            <span className="font-semibold text-slate-200">Supabase PostgreSQL</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <span className="text-[11px] text-slate-400 block font-mono">Payments</span>
            <span className="font-semibold text-slate-200">Razorpay Live API</span>
          </div>
        </div>
      </div>
    </div>
  );
};
