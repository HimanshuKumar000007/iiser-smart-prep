/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { useSlsDashboard } from './hooks/useSlsDashboard';
import { useStudentActionPlan } from './hooks/useStudentActionPlan';
import { Sidebar } from './components/layout/Sidebar';
import { Hero } from './components/dashboard/Hero';
import { ReadinessEngine } from './components/dashboard/ReadinessEngine';
import { WeakAreas } from './components/dashboard/WeakAreas';
import { PredictedPerformance } from './components/dashboard/PredictedPerformance';

import { SmartRevision } from './components/dashboard/SmartRevision';
import { StudyCoach } from './components/dashboard/StudyCoach';
import { LockedAISuite } from './components/dashboard/LockedAISuite';
import { ProLockedCard } from './components/dashboard/ProLockedCard';

// SLS Step 9 — Smart Dashboard
import { SLSIntelligencePanel } from './components/dashboard/SLSIntelligencePanel';
import { SLSWeakAreasPanel } from './components/dashboard/SLSWeakAreasPanel';
import { SLSLearningJourneyHub } from './components/dashboard/SLSLearningJourneyHub';

import { MockTestPerformance } from './components/dashboard/MockTestPerformance';
import { QuickAccess } from './components/dashboard/QuickAccess';
import { SupportBar } from './components/layout/SupportBar';
import { MobileNav } from './components/layout/MobileNav';
import { Menu, Bell, BrainCircuit, Sun, Moon } from 'lucide-react';
import { useEntitlement } from './hooks/useEntitlement';
import { currentUser } from './data/mockData';

// Code-split heavy secondary views to keep initial bundle lightweight and fast
const PathToIISER = lazy(() => import('./components/dashboard/PathToIISER').then(m => ({ default: m.PathToIISER })));
const MockTestCenter = lazy(() => import('./components/dashboard/MockTestCenter').then(m => ({ default: m.MockTestCenter })));
const PYQHub = lazy(() => import('./components/dashboard/PYQHub').then(m => ({ default: m.PYQHub })));
const PerformanceInsights = lazy(() => import('./components/dashboard/PerformanceInsights').then(m => ({ default: m.PerformanceInsights })));
const SmartLesson = lazy(() => import('./components/dashboard/SmartLesson').then(m => ({ default: m.SmartLesson })));
const SmartLessonsHub = lazy(() => import('./components/dashboard/SmartLessonsHub').then(m => ({ default: m.SmartLessonsHub })));
const Settings = lazy(() => import('./components/dashboard/Settings').then(m => ({ default: m.Settings })));
const Support = lazy(() => import('./components/dashboard/Support').then(m => ({ default: m.Support })));
const Feedback = lazy(() => import('./components/dashboard/Feedback').then(m => ({ default: m.Feedback })));
const Contact = lazy(() => import('./components/dashboard/Contact').then(m => ({ default: m.Contact })));
const Terms = lazy(() => import('./components/dashboard/Terms').then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import('./components/dashboard/Privacy').then(m => ({ default: m.Privacy })));
const Subscription = lazy(() => import('./components/dashboard/Subscription').then(m => ({ default: m.Subscription })));

const ViewLoadingFallback = () => (
  <div className="w-full flex-1 min-h-[350px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
      <span className="text-xs text-slate-400 font-medium">Loading section...</span>
    </div>
  </div>
);
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Analytics } from './lib/analytics';
 
function DashboardApp() {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const entitlement = useEntitlement();
  const [currentView, setCurrentView] = useState<string>(() => {
    return localStorage.getItem('dashboard_current_view') || 'dashboard';
  });

  useEffect(() => {
    Analytics.init();
    const token = localStorage.getItem('IAT_TOKEN');
    const userName = localStorage.getItem('currentUser') || currentUser.name;
    const plan = (localStorage.getItem('IAT_PLAN') || (entitlement.isPro ? 'PRO' : 'FREE')).toUpperCase();
    if (token) {
      Analytics.identify(userName || token.substring(0, 16), {
        $name: userName,
        Plan: plan,
      });
    }
    Analytics.pageView('Dashboard Home', { initial_view: currentView });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnToParam = params.get('returnTo');
    if (returnToParam && !entitlement.loading) {
      const allowedViews = ['dashboard', 'path', 'smart_lessons', 'mock_tests', 'pyqs', 'analytics', 'subscription', 'settings', 'support', 'feedback', 'contact', 'terms', 'privacy'];
      const isValid = allowedViews.some(v => returnToParam === v || returnToParam.startsWith(v + ':') || returnToParam.startsWith(v + '/'));
      
      if (isValid) {
        const url = new URL(window.location.href);
        url.searchParams.delete('returnTo');
        window.history.replaceState({}, '', url.toString());

        setCurrentView(returnToParam);
      }
    }
  }, [entitlement.isPro, entitlement.loading]);

  // Legacy dashboard data (mock tests, lesson progress, readiness engine)
  const { data: dashboardData, loading: dashboardLoading, refresh: refreshDashboard } = useDashboardData();
  const hasAttempts = (dashboardData?.total_attempts ?? 0) > 0;

  // SLS intelligence data — fetched independently with resilient Promise.allSettled
  const {
    data: slsData,
    loading: slsLoading,
    slsHasNoData,
    refresh: refreshSls,
  } = useSlsDashboard();

  // Unified Student Action Plan (Orchestrator) — fetched once globally and shared
  const {
    plan: actionPlan,
    loading: actionPlanLoading,
    error: actionPlanError,
    refresh: refreshActionPlan,
  } = useStudentActionPlan();

  // Legacy useEffect removed since ThemeProvider handles synchronization

  const handleNavigateRaw = (view: string) => {
    setCurrentView(view);
    localStorage.setItem('dashboard_current_view', view);
    Analytics.trackViewChanged(view);

    refreshDashboard?.();
    refreshSls?.();
    refreshActionPlan?.();
    
    setTimeout(() => {
      const scrollContainer = document.querySelector('main') || document.querySelector('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleNavigate = (view: string) => {
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      const loginUrl = `/login.html?redirect=${encodeURIComponent(window.location.origin + '/dashboard-react.html?returnTo=' + view)}`;
      window.location.href = loginUrl;
      return;
    }

    handleNavigateRaw(view);
  };

  return (
    <div className="flex bg-background min-h-screen text-foreground selection:bg-cyan-500/30">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col overflow-x-hidden">
        {/* Mobile Header */}
        <div className={`lg:hidden flex items-center justify-between p-4 border-b sticky top-0 z-30 transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-white/80 border-slate-200/80 shadow-[0_1px_12px_rgba(15,23,42,0.06)] backdrop-blur-md'
            : 'border-white/5 bg-background/80 backdrop-blur-md'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className={`p-2 -ml-2 transition-colors ${
                theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <button 
              onClick={() => {
                const nextTheme = theme === 'light' ? 'dark' : 'light';
                toggleTheme();
                Analytics.trackThemeToggled(nextTheme);
              }}
              className={`p-2 transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-500 hover:text-slate-800' : 'text-white/60 hover:text-white'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className={`relative p-2 transition-colors ${
              theme === 'light' ? 'text-slate-500 hover:text-slate-800' : 'text-white/60 hover:text-white'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-medium text-sm text-white hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer focus:outline-none"
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </button>
            {showUserMenu && (
              <div className={`absolute right-0 top-10 w-48 border rounded-xl p-2 shadow-2xl z-50 backdrop-blur-md ${
                theme === 'light'
                  ? 'bg-white/95 border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.12)]'
                  : 'bg-[#0b0c16]/95 border-white/10'
              }`}>
                <p className={`text-[11px] px-3 py-1.5 border-b font-medium truncate ${
                  theme === 'light' ? 'text-slate-500 border-slate-100' : 'text-white/40 border-white/5'
                }`}>Logged in as {currentUser.name}</p>
                <button
                  onClick={() => {
                    Analytics.track('User Logged Out');
                    Analytics.reset();
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('onboarding_completed');
                    localStorage.removeItem('IAT_TOKEN');
                    window.location.href = '/index.html';
                  }}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg mt-1 font-semibold transition-all cursor-pointer ${
                    theme === 'light' ? 'text-rose-600 hover:bg-slate-50' : 'text-rose-400 hover:bg-white/5'
                  }`}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lesson reader gets its own full-width wrapper with consistent px-2 on mobile */}
        {currentView === 'lesson_reader' || currentView.startsWith('/smart-lessons/') || currentView.startsWith('lesson_reader:') ? (() => {
          // Parse optional ::quiz suffix: "/smart-lessons/phy_thermo::quiz" → id=phy_thermo, startAtQuiz=true
          const rawId = currentView
            .replace('/smart-lessons/', '')
            .replace('lesson_reader:', '')
            .replace('lesson_reader', '');
          const startAtQuiz = rawId.endsWith('::quiz');
          const lessonId = startAtQuiz ? rawId.replace('::quiz', '') : rawId;
          return (
            <div className="lesson-reader-container px-2 sm:px-4 lg:px-8 pt-4 overflow-y-auto w-full flex-1 flex flex-col">
              <Suspense fallback={<ViewLoadingFallback />}>
                <SmartLesson
                  onNavigate={handleNavigate}
                  lessonId={lessonId}
                  startAtQuiz={startAtQuiz}
                />
              </Suspense>
            </div>
          );
        })() : (
        <div className="p-4 lg:p-8 overflow-y-auto w-full flex-1 flex flex-col justify-between">
          <div className="flex-1 w-full">
            <Suspense fallback={<ViewLoadingFallback />}>
            {currentView === 'path' ? (
            <PathToIISER 
              onNavigate={handleNavigate} 
              dashboardData={dashboardData}
              dashboardLoading={dashboardLoading}
              actionPlan={actionPlan}
              actionPlanLoading={actionPlanLoading}
            />
          ) : currentView.startsWith('mock_tests') ? (() => {
            const parts = currentView.split(':');
            const initialTab = parts[1] as any;
            const initialMockId = parts[2];
            const initialResultId = parts[3];
            return (
              <MockTestCenter 
                onNavigate={handleNavigate} 
                initialTab={initialTab} 
                initialMockId={initialMockId} 
                initialResultId={initialResultId} 
              />
            );
          })() : (currentView === 'pyqs' || currentView.startsWith('pyqs:')) ? (() => {
            const parts = currentView.split(':');
            const initialTab = parts[1] as any;
            const initialSessionId = parts[2];
            const initialResultId = parts[3];
            return (
              <PYQHub 
                onNavigate={handleNavigate} 
                initialTab={initialTab}
                initialSessionId={initialSessionId}
                initialResultId={initialResultId}
              />
            );
          })() : currentView === 'analytics' ? (
            <PerformanceInsights onNavigate={handleNavigate} />
          ) : currentView.startsWith('smart_lessons') ? (
            <SmartLessonsHub
              onNavigate={handleNavigate}
              initialSubject={currentView.includes(':') ? currentView.split(':').pop() : 'All'}
              dashboardData={dashboardData}
              slsData={slsData}
              slsLoading={slsLoading}
            />
          ) : currentView.startsWith('subscription') ? (() => {
            const target = currentView.split(':').slice(1).join(':');
            return (
              <Subscription 
                returnTo={target || undefined} 
                onNavigate={handleNavigate} 
              />
            );
          })() : currentView === 'settings' ? (
            <Settings onNavigate={handleNavigate} />
          ) : currentView === 'support' ? (
            <Support onNavigate={handleNavigate} />
          ) : currentView === 'feedback' ? (
            <Feedback onNavigate={handleNavigate} />
          ) : currentView === 'contact' ? (
            <Contact onNavigate={handleNavigate} />
          ) : currentView === 'terms' ? (
            <Terms onNavigate={handleNavigate} />
          ) : currentView === 'privacy' ? (
            <Privacy onNavigate={handleNavigate} />
          ) : (
            <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 pb-32 lg:pb-0">
              <Hero 
                onNavigate={handleNavigate} 
                dashboardData={dashboardData} 
                loading={dashboardLoading} 
                actionPlan={actionPlan}
                actionPlanLoading={actionPlanLoading}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="col-span-1 flex flex-col h-full">
                  <ReadinessEngine dashboardData={dashboardData} loading={dashboardLoading} onNavigate={handleNavigate} />
                </div>
                <div className="col-span-1 flex flex-col h-full">
                  {entitlement.isPro ? (
                    <StudyCoach
                      dashboardData={dashboardData}
                      loading={dashboardLoading || actionPlanLoading}
                      onNavigate={handleNavigate}
                      actionPlan={actionPlan}
                      error={actionPlanError}
                      onRetry={refreshActionPlan}
                    />
                  ) : (
                    <ProLockedCard
                      featureName="Smart Coach"
                      featureDesc="Get your personalised AI-powered morning, afternoon & evening study schedule based on your weak areas."
                      featureIcon="🧠"
                      accent="violet"
                      onNavigate={handleNavigate}
                      className="h-full min-h-[260px]"
                    />
                  )}
                </div>
                {/* SLS Weak Areas Panel (real data) — falls back to legacy WeakAreas if no SLS data */}
                <div className="col-span-1 flex flex-col h-full">
                  {!entitlement.isPro ? (
                    <ProLockedCard
                      featureName="Weak Area Engine"
                      featureDesc="AI-powered detection of your weak chapters and topics from quiz & mock performance."
                      featureIcon="🎯"
                      accent="amber"
                      onNavigate={handleNavigate}
                      className="h-full min-h-[260px]"
                    />
                  ) : slsHasNoData
                    ? <WeakAreas dashboardData={dashboardData} loading={dashboardLoading} onNavigate={handleNavigate} />
                    : <SLSWeakAreasPanel
                        weaknesses={slsData.weaknesses}
                        loading={slsLoading}
                        onNavigate={handleNavigate}
                      />
                  }
                </div>
              </div>

              {/* SLS Intelligence Suite — shown when SLS has data; LockedAISuite / Journey Hub when zero-data */}
              {!entitlement.isPro ? (
                <ProLockedCard
                  featureName="SLS Intelligence Suite"
                  featureDesc="Smart Learning System — personalized revision queue, mastery tracking, chapter recommendations & spaced repetition powered by your real quiz data."
                  featureIcon="✦"
                  accent="cyan"
                  onNavigate={handleNavigate}
                  className="w-full min-h-[200px]"
                />
              ) : slsLoading || !slsHasNoData ? (
                <>
                  {/* SLS Intelligence Panel (recommendation + mastery + revision queue) */}
                  <div className="w-full">
                    {slsHasNoData
                      ? <SmartRevision
                          dashboardData={dashboardData}
                          loading={dashboardLoading}
                          onNavigate={handleNavigate}
                        />
                      : <SLSIntelligencePanel
                          recommendations={slsData.recommendations}
                          mastery={slsData.mastery}
                          revision={slsData.revision}
                          loading={slsLoading}
                          onNavigate={handleNavigate}
                        />
                    }
                  </div>

                  {/* Predicted Performance (legacy mock test section) */}
                  {(dashboardLoading || hasAttempts) && (
                    <PredictedPerformance
                      dashboardData={dashboardData}
                      loading={dashboardLoading}
                      onNavigate={handleNavigate}
                    />
                  )}

                  {(dashboardLoading || hasAttempts) && (
                    <div className="w-full">
                      <MockTestPerformance
                        dashboardData={dashboardData}
                        loading={dashboardLoading}
                        onNavigate={handleNavigate}
                      />
                    </div>
                  )}
                </>
              ) : (
                /* Zero-data: show SLS Journey Hub (subject selector) then legacy locked suite preview */
                <>
                  <SLSLearningJourneyHub onNavigate={handleNavigate} />
                  <LockedAISuite onNavigate={handleNavigate} />
                </>
              )}



              <div className="w-full pt-4 pb-8">
                <QuickAccess onNavigate={handleNavigate} />
              </div>
            </div>
          )}
          </Suspense>
          </div>
          
          <div className="w-full max-w-6xl mx-auto mt-12 shrink-0">
            <SupportBar onNavigate={handleNavigate} />
          </div>
        </div>
        )}
        
        <MobileNav currentView={currentView} onNavigate={handleNavigate} />

      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardApp />
    </ThemeProvider>
  );
}
