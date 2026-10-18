import React from 'react';
import {
  LayoutDashboard,
  Users,
  Activity,
  Globe2,
  UserPlus,
  CreditCard,
  Package,
  BarChart3,
  HeartPulse,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { AdminTab } from '../types';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  alertCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onLogout,
  alertCount = 0
}) => {
  const menuItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'geography', label: 'Geography', icon: Globe2 },
    { id: 'signups', label: 'Signups', icon: UserPlus },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'products', label: 'Products/Plans', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'health', label: 'System Health', icon: HeartPulse },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount > 0 ? alertCount : undefined },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-[#090d16]/95 backdrop-blur-xl transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/20 text-white font-bold text-base font-space">
              SP
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-white tracking-tight font-space">
                IISER SmartPrep
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 font-mono">
                Admin Console
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-bold font-space text-sm">
            SP
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={collapsed ? item.label : undefined}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon
                className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                  isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              />

              {!collapsed && (
                <span className="flex-1 truncate text-left">{item.label}</span>
              )}

              {!collapsed && item.badge !== undefined && (
                <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="border-t border-slate-800/80 p-3">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-900/60 p-2 border border-slate-800/60">
            <div className="flex items-center gap-2 truncate">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-medium text-slate-200 truncate">Admin Active</span>
                <span className="text-[10px] text-emerald-400">Authenticated</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign out of admin session"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-500/15 hover:text-rose-400 cursor-pointer transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onLogout}
            title="Sign out of admin session"
            className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-rose-500/15 hover:text-rose-400 cursor-pointer transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
