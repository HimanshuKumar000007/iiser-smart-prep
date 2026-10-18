import React, { useState } from 'react';
import { ShieldCheck, KeyRound, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { AdminApiService } from '../services/adminApi';

interface AdminLoginModalProps {
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess }) => {
  const [passkey, setPasskey] = useState('');
  const [rememberSession, setRememberSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError('Please enter your admin passkey');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ok = await AdminApiService.login(passkey.trim());
      if (ok) {
        onSuccess();
      } else {
        setError('Authentication denied. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Access denied: Invalid admin passkey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-8 shadow-2xl shadow-indigo-950/40">
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-inner">
            <Lock className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-white font-space">
            IISER SmartPrep
          </h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Administrative Portal
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Restricted monitoring environment. Authenticate to inspect live metrics.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-slate-400" />
                Admin Secret Key
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter admin authorization key"
                autoFocus
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30"
                />
                Remember for this browser
              </label>
              <span className="text-slate-500 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" /> 12h Session
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300 animate-in fade-in duration-150">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Unlock Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-center text-[11px] text-slate-500">
            <span>Zero student-data exposure</span>
            <span>•</span>
            <span>Isolated admin layer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
