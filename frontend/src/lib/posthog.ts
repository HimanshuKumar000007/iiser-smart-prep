import posthog from 'posthog-js';

let initialized = false;

export function initPostHog() {
  try {
    const key = import.meta.env.VITE_POSTHOG_KEY;
    const host =
      import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (!key) {
      console.warn('PostHog key not configured. Analytics disabled.');
      return;
    }

    posthog.init(key, {
      api_host: host,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    });

    initialized = true;
  } catch (error) {
    console.warn('PostHog initialization failed. App will continue normally.', error);
  }
}

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  try {
    if (!initialized) return;

    posthog.capture(event, properties);
  } catch (error) {
    console.warn('PostHog event failed:', error);
  }
}

export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  try {
    if (!initialized) return;

    posthog.identify(userId, properties);
  } catch (error) {
    console.warn('PostHog identification failed:', error);
  }
}

export function resetAnalytics() {
  try {
    if (!initialized) return;

    posthog.reset();
  } catch (error) {
    console.warn('PostHog reset failed:', error);
  }
}
