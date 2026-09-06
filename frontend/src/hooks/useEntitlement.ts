import { useState, useEffect, useCallback } from 'react';

export interface Entitlement {
  isPro: boolean;
  status: 'FREE' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PAST_DUE';
  planId: string | null;
  startedAt: string | null;
  expiresAt: string | null;
  daysRemaining: number;
  loading: boolean;
}

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export function useEntitlement() {
  const [entitlement, setEntitlement] = useState<Entitlement>(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('IAT_TOKEN') : null;
    const cachedPlan = typeof window !== 'undefined' ? (localStorage.getItem('IAT_PLAN') || 'FREE') : 'FREE';
    const isPro = cachedPlan.toUpperCase() === 'PRO';
    return {
      isPro,
      status: isPro ? 'ACTIVE' : 'FREE',
      planId: cachedPlan,
      startedAt: null,
      expiresAt: null,
      daysRemaining: 0,
      loading: !token ? false : true
    };
  });

  const refreshEntitlement = useCallback(async () => {
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setEntitlement({
        isPro: false,
        status: 'FREE',
        planId: null,
        startedAt: null,
        expiresAt: null,
        daysRemaining: 0,
        loading: false
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/check-pro-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mappedPro = data.isPro ?? (data.plan === 'PRO' || data.is_pro);
        const mappedStatus = data.status ?? (mappedPro ? 'ACTIVE' : 'FREE');
        
        setEntitlement({
          isPro: mappedPro,
          status: mappedStatus as any,
          planId: data.planId ?? data.plan,
          startedAt: data.startedAt || null,
          expiresAt: data.expiresAt || null,
          daysRemaining: data.daysRemaining ?? 0,
          loading: false
        });
      } else {
        if (res.status === 401) {
          localStorage.removeItem('IAT_TOKEN');
        }
        setEntitlement({
          isPro: false,
          status: 'FREE',
          planId: null,
          startedAt: null,
          expiresAt: null,
          daysRemaining: 0,
          loading: false
        });
      }
    } catch (err) {
      console.warn("Failed to fetch entitlement status:", err);
      setEntitlement(prev => ({ ...prev, isPro: false, status: 'FREE', loading: false }));
    }
  }, []);

  useEffect(() => {
    refreshEntitlement();
    window.addEventListener('storage', refreshEntitlement);
    return () => window.removeEventListener('storage', refreshEntitlement);
  }, [refreshEntitlement]);

  return {
    ...entitlement,
    refresh: refreshEntitlement
  };
}
