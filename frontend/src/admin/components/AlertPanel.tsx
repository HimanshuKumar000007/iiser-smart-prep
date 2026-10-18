import React, { useState, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { AdminAlert } from '../types';

export const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await AdminApiService.getAlerts();
      setAlerts(res.alerts || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const getAlertStyles = (level: AdminAlert['level']) => {
    switch (level) {
      case 'critical':
        return {
          container: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
          icon: <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />,
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        };
      case 'warning':
        return {
          container: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
          icon: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        };
      default:
        return {
          container: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
          icon: <Info className="h-5 w-5 text-indigo-400 shrink-0" />,
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight font-space">
            Active System Alerts
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated monitoring detecting payment failures, latency spikes and configuration anomalies
          </p>
        </div>
        <button
          onClick={() => fetchAlerts(true)}
          disabled={refreshing || loading}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
          <span>{refreshing ? 'Scanning...' : 'Scan Now'}</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mb-3" />
          <h4 className="text-sm font-semibold text-white">All Clear</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Zero active alerts or service anomalies detected across production infrastructure.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const styles = getAlertStyles(alert.level);
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-4 rounded-2xl border p-4.5 shadow-lg backdrop-blur-md transition-all ${styles.container}`}
              >
                {styles.icon}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {alert.title}
                    </h4>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${styles.badge}`}
                    >
                      {alert.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>
                  <span className="mt-2 block text-[10px] font-mono text-slate-400">
                    Detected {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
