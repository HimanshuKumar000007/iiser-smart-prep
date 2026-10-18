import React, { useState, useEffect, useCallback } from 'react';
import { AdminTab, DateRangeOption, OverviewMetrics } from './types';
import { AdminApiService } from './services/adminApi';
import { AdminLayout } from './components/AdminLayout';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { OverviewView } from './components/OverviewView';
import { UserOverview } from './components/UserOverview';
import { PaymentOverview } from './components/PaymentOverview';
import { EngagementView } from './components/EngagementView';
import { GeographyCard } from './components/GeographyCard';
import { SignupsView } from './components/SignupsView';
import { ProductsView } from './components/ProductsView';
import { SystemHealth } from './components/SystemHealth';
import { AlertPanel } from './components/AlertPanel';
import { SettingsView } from './components/SettingsView';

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return AdminApiService.isAuthenticated();
  });
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [dateRange, setDateRange] = useState<DateRangeOption>('30d');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Overview Data State
  const [overviewMetrics, setOverviewMetrics] = useState<OverviewMetrics | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [alertCount, setAlertCount] = useState<number>(0);

  // Fetch overview metrics
  const fetchOverview = useCallback(async (isRefresh = false) => {
    if (!AdminApiService.isAuthenticated()) return;

    if (isRefresh) setRefreshing(true);
    else setLoadingOverview(true);

    try {
      const data = await AdminApiService.getOverview();
      setOverviewMetrics(data);
      setLastUpdated(data.updatedAt || new Date().toISOString());

      // Also quickly check alerts count for sidebar badge
      const alertData = await AdminApiService.getAlerts();
      const activeAlerts = (alertData.alerts || []).filter(a => a.level === 'critical' || a.level === 'warning');
      setAlertCount(activeAlerts.length);
    } catch (err: any) {
      console.warn('[AdminApp] Failed to load overview metrics:', err.message);
      if (err.message.includes('Authentication required') || err.message.includes('session expired')) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoadingOverview(false);
      setRefreshing(false);
    }
  }, []);

  // Initial session verification & data loading
  useEffect(() => {
    if (isAuthenticated) {
      AdminApiService.verifySession().then((valid) => {
        if (!valid) {
          setIsAuthenticated(false);
        } else {
          fetchOverview();
        }
      });
    }
  }, [isAuthenticated, fetchOverview]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchOverview();
  };

  const handleLogout = () => {
    AdminApiService.clearToken();
    setIsAuthenticated(false);
    setOverviewMetrics(null);
  };

  if (!isAuthenticated) {
    return <AdminLoginModal onSuccess={handleLoginSuccess} />;
  }

  // Render the selected tab's content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <OverviewView
            metrics={overviewMetrics}
            loading={loadingOverview}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        );
      case 'users':
        return <UserOverview overviewStats={overviewMetrics} />;
      case 'engagement':
      case 'analytics':
        return <EngagementView overviewStats={overviewMetrics} />;
      case 'geography':
        return <GeographyCard />;
      case 'signups':
        return <SignupsView overviewStats={overviewMetrics} />;
      case 'payments':
        return <PaymentOverview overviewStats={overviewMetrics} />;
      case 'products':
        return <ProductsView overviewStats={overviewMetrics} />;
      case 'health':
        return <SystemHealth />;
      case 'alerts':
        return <AlertPanel />;
      case 'settings':
        return <SettingsView onLogout={handleLogout} onRefresh={() => fetchOverview(true)} />;
      default:
        return (
          <OverviewView
            metrics={overviewMetrics}
            loading={loadingOverview}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        );
    }
  };

  return (
    <AdminLayout
      sidebar={
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setMobileMenuOpen(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={handleLogout}
          alertCount={alertCount}
        />
      }
      lastUpdated={lastUpdated}
      refreshing={refreshing}
      onRefresh={() => fetchOverview(true)}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      currentTab={currentTab}
      mobileMenuOpen={mobileMenuOpen}
      onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {renderTabContent()}
    </AdminLayout>
  );
};
