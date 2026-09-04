import mixpanel from 'mixpanel-browser';

// Read token from Vite env or global window
const ENV_TOKEN = (import.meta as any).env?.VITE_MIXPANEL_TOKEN;
const WIN_TOKEN = typeof window !== 'undefined' ? (window as any).MIXPANEL_TOKEN : undefined;
const MIXPANEL_TOKEN = ENV_TOKEN || WIN_TOKEN || '';

const ENV_REGION = (import.meta as any).env?.VITE_MIXPANEL_REGION;
const WIN_REGION = typeof window !== 'undefined' ? (window as any).MIXPANEL_REGION : undefined;
const MIXPANEL_REGION = ENV_REGION || WIN_REGION || 'US';

let isInitialized = false;

export function initAnalytics(tokenOverride?: string) {
  if (typeof window === 'undefined') return;

  const token = tokenOverride || MIXPANEL_TOKEN;
  if (!token || token === 'YOUR_MIXPANEL_PROJECT_TOKEN' || token.includes('YOUR_MIXPANEL')) {
    if ((import.meta as any).env?.DEV) {
      console.info(
        '📊 [Mixpanel] Token is unset or placeholder. Analytics is operating in safe simulation mode.'
      );
    }
    return;
  }

  try {
    mixpanel.init(token, {
      autocapture: true,
      record_sessions_percent: 100,
      persistence: 'localStorage',
      ignore_dnt: true,
      batch_requests: true,
      api_host: MIXPANEL_REGION === 'EU' ? 'https://api-eu.mixpanel.com' : undefined,
    });
    isInitialized = true;
    if ((import.meta as any).env?.DEV) {
      console.log(`📊 [Mixpanel] Initialized successfully (${token.substring(0, 6)}...)`);
    }
  } catch (err) {
    console.warn('📊 [Mixpanel] Initialization failed:', err);
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (isInitialized) {
    try {
      mixpanel.identify(userId);
      if (traits) {
        mixpanel.people.set(traits);
      }
    } catch (e) {
      console.warn('[Mixpanel] identify failed', e);
    }
  } else if ((import.meta as any).env?.DEV) {
    console.log('📊 [Mixpanel Identify Simulated]', userId, traits);
  }
}

export function setUserProperties(traits: Record<string, any>) {
  if (isInitialized) {
    try {
      mixpanel.people.set(traits);
    } catch (e) {
      console.warn('[Mixpanel] setUserProperties failed', e);
    }
  } else if ((import.meta as any).env?.DEV) {
    console.log('📊 [Mixpanel People.Set Simulated]', traits);
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  const commonProps = {
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    plan: (typeof localStorage !== 'undefined' && localStorage.getItem('IAT_PLAN')) || 'FREE',
  };

  const payload = { ...commonProps, ...properties };

  if (isInitialized) {
    try {
      mixpanel.track(eventName, payload);
    } catch (e) {
      console.warn('[Mixpanel] track failed', e);
    }
  } else if ((import.meta as any).env?.DEV) {
    console.log(`📊 [Mixpanel Track Simulated] ${eventName}`, payload);
  }
}

export function trackPageView(pageName: string, meta?: Record<string, any>) {
  trackEvent('Page Viewed', {
    page: pageName,
    ...meta,
  });
}

export function resetAnalytics() {
  if (isInitialized) {
    try {
      mixpanel.reset();
    } catch (e) {
      console.warn('[Mixpanel] reset failed', e);
    }
  }
}

// Domain-specific event helpers for IISER SmartPrep
export const Analytics = {
  init: initAnalytics,
  identify: identifyUser,
  setProperties: setUserProperties,
  track: trackEvent,
  pageView: trackPageView,
  reset: resetAnalytics,

  trackViewChanged: (viewName: string) => {
    trackEvent('Dashboard View Changed', { view: viewName });
  },

  trackMockStarted: (testId: string, testTitle?: string, type?: string) => {
    trackEvent('Mock Test Started', {
      test_id: testId,
      test_title: testTitle || testId,
      test_type: type || 'full_mock',
    });
  },

  trackMockSubmitted: (testId: string, score: number, accuracy: number, durationSeconds?: number) => {
    trackEvent('Mock Test Submitted', {
      test_id: testId,
      score,
      accuracy,
      duration_seconds: durationSeconds,
    });
  },

  trackQuickMockStarted: (subject: string, topic?: string) => {
    trackEvent('Quick Mock Started', { subject, topic });
  },

  trackPYQStarted: (year: string | number, subject?: string) => {
    trackEvent('PYQ Session Started', { year, subject: subject || 'all' });
  },

  trackSmartLessonViewed: (chapter: string, topicTitle: string) => {
    trackEvent('Smart Lesson Viewed', { chapter, topic: topicTitle });
  },

  trackUpgradeClicked: (source: string, plan: string = 'PRO') => {
    trackEvent('Upgrade Clicked', { source, plan });
  },

  trackPaymentSuccess: (plan: string, amount: number, paymentId: string) => {
    trackEvent('Payment Completed', {
      plan,
      amount,
      payment_id: paymentId,
      status: 'success',
    });
    setUserProperties({
      Plan: plan.toUpperCase(),
      ProActivatedAt: new Date().toISOString(),
    });
  },

  trackThemeToggled: (theme: string) => {
    trackEvent('Theme Changed', { theme });
  },
};

export default Analytics;
