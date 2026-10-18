import {
  OverviewMetrics,
  UsersResponse,
  PaymentsResponse,
  EngagementData,
  SystemHealthData,
  AdminAlert,
  ActivityEvent
} from '../types';

const ADMIN_TOKEN_KEY = 'SMARTPREP_ADMIN_TOKEN';

function getApiBase(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isLocal) {
      // In local dev, backend could be on 8080 or 5000; check env override if present
      const envUrl = (import.meta as any).env?.VITE_API_URL;
      if (envUrl) return envUrl.replace(/\/$/, '');
      return 'http://localhost:5000';
    }
  }
  return 'https://api.iisersmartprep.space';
}

export class AdminApiService {
  private static token: string | null = null;

  public static getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
    }
    return this.token;
  }

  public static setToken(token: string, persist: boolean = true): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
      if (persist) {
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
      }
    }
  }

  public static clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  }

  public static isAuthenticated(): boolean {
    const token = this.getToken();
    return Boolean(token && token.trim().length > 0);
  }

  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${getApiBase()}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      this.clearToken();
      throw new Error('Authentication required or session expired');
    }

    if (!response.ok) {
      let errorMsg = `Server error (${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson.error) errorMsg = errorJson.error;
      } catch {
        // ignore json parse error
      }
      throw new Error(errorMsg);
    }

    return response.json() as Promise<T>;
  }

  // ── Authentication ──

  public static async login(secretKey: string): Promise<boolean> {
    const res = await this.request<{ success: boolean; token: string }>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ secretKey })
    });

    if (res.token) {
      this.setToken(res.token);
      return true;
    }
    return false;
  }

  public static async verifySession(): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    try {
      const res = await this.request<{ valid: boolean }>('/api/admin/auth/verify');
      return Boolean(res.valid);
    } catch {
      this.clearToken();
      return false;
    }
  }

  // ── Dashboard Metrics ──

  public static async getOverview(): Promise<OverviewMetrics> {
    return this.request<OverviewMetrics>('/api/admin/overview');
  }

  public static async getUsers(page: number = 1, limit: number = 25, search: string = '', plan: string = 'ALL'): Promise<UsersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      plan
    });
    return this.request<UsersResponse>(`/api/admin/users?${params.toString()}`);
  }

  public static async getPayments(page: number = 1, limit: number = 25): Promise<PaymentsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    return this.request<PaymentsResponse>(`/api/admin/payments?${params.toString()}`);
  }

  public static async getEngagement(): Promise<EngagementData> {
    return this.request<EngagementData>('/api/admin/engagement');
  }

  public static async getHealth(): Promise<SystemHealthData> {
    return this.request<SystemHealthData>('/api/admin/health');
  }

  public static async getAlerts(): Promise<{ alerts: AdminAlert[] }> {
    return this.request<{ alerts: AdminAlert[] }>('/api/admin/alerts');
  }

  public static async getRecentActivity(): Promise<{ events: ActivityEvent[] }> {
    return this.request<{ events: ActivityEvent[] }>('/api/admin/recent-activity');
  }

  public static async setPlan(email: string, plan: string, days?: number): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>('/api/admin/set-plan', {
      method: 'POST',
      body: JSON.stringify({ email, plan, days })
    });
  }
}
