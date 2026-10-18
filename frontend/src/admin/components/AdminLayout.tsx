import React from 'react';
import { RefreshCw, Shield, Menu, Sparkles, UserCheck } from 'lucide-react';
import { DateRangeOption, AdminTab } from '../types';
import { DateRangeSelector } from './DateRangeSelector';

interface AdminLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  lastUpdated: string | null;
  refreshing: boolean;
  onRefresh: () => void;
  dateRange: DateRangeOption;
  onDateRangeChange: (range: DateRangeOption) => void;
  currentTab: AdminTab;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  sidebar,
  lastUpdated,
  refreshing,
  onRefresh,
  dateRange,
  onDateRangeChange,
  currentTab,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: { title: 'Overview', subtitle: 'Global metrics, performance indicators and conversion funnel' },
    users: { title: 'User Analytics', subtitle: 'Registered student database, user growth and subscription status' },
    engagement: { title: 'Engagement Metrics', subtitle: 'Mock test participation, score analytics, and student activity' },
    geography: { title: 'Geography & Regional', subtitle: 'Geographic distribution from analytics tracking data' },
    signups: { title: 'Signup Analytics', subtitle: 'New user registrations, daily trends and acquisition rate' },
    payments: { title: 'Payments & Revenue', subtitle: 'Razorpay captured transactions, tier breakdowns and revenue logs' },
    products: { title: 'Products & Pricing Plans', subtitle: 'Tier performance, subscription pricing and plan active users' },
    analytics: { title: 'Platform Analytics', subtitle: 'Mock tests, chapter quizzes and learning sessions' },
    health: { title: 'System Health', subtitle: 'Infrastructure status, database latency and API readiness' },
    alerts: { title: 'System Alerts & Monitoring', subtitle: 'Real-time anomaly detection and service logs' },
    settings: { title: 'Admin Settings', subtitle: 'Session management, environment configuration and diagnostics' }
  };

  const { title, subtitle } = tabTitles[currentTab] || { title: 'Admin Dashboard', subtitle: 'System administration console' };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a10] text-slate-100 font-sans">
      {/* Desktop / Collapsible Sidebar */}
      <div className="hidden md:flex h-full">
        {sidebar}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-64 h-full bg-[#090d16] shadow-2xl">
            {sidebar}
          </div>
          <div className="flex-1" onClick={onToggleMobileMenu} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#090d16]/70 px-4 md:px-8 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-bold tracking-tight text-white font-space">
                  {title}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 font-mono">
                  <Shield className="h-2.5 w-2.5" /> SECURE
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-400 truncate max-w-md">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="hidden sm:block">
              <DateRangeSelector selected={dateRange} onChange={onDateRangeChange} />
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={refreshing}
              title="Refresh all metrics"
              className="flex h-9 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden lg:inline">{refreshing ? 'Syncing...' : 'Refresh'}</span>
            </button>

            {/* Last Updated Label */}
            {lastUpdated && (
              <span className="hidden xl:inline text-[11px] text-slate-400 font-mono">
                Updated {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}

            {/* Admin Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white shadow-sm shadow-indigo-600/30">
                <UserCheck className="h-4 w-4" />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-semibold text-white leading-tight">Admin</span>
                <span className="text-[10px] text-slate-400 leading-tight">SmartPrep Ops</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 custom-scrollbar">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
