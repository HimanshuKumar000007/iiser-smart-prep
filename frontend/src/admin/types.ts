export type AdminTab =
  | 'overview'
  | 'users'
  | 'engagement'
  | 'geography'
  | 'signups'
  | 'payments'
  | 'products'
  | 'analytics'
  | 'health'
  | 'alerts'
  | 'settings';

export type DateRangeOption = 'today' | '7d' | '30d' | '90d' | 'all';

export interface OverviewMetrics {
  totalUsers: {
    value: number;
    previousValue?: number;
    changePct?: number;
  };
  newUsersToday: {
    value: number;
  };
  newUsers7d: {
    value: number;
    previousValue?: number;
    changePct?: number;
  };
  newUsers30d: {
    value: number;
    previousValue?: number;
    changePct?: number;
  };
  activeUsers7d: {
    value: number;
  };
  activeUsers30d: {
    value: number;
  };
  proUsers: {
    value: number;
    freeUsers: number;
  };
  revenue: {
    total: number;
    last30Days: number;
    previous30Days: number;
    changePct: number;
    successfulTransactions: number;
  };
  conversionRate: {
    value: number;
    label: string;
  };
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  isPro: boolean;
  planExpiry: string | null;
  createdAt: string;
}

export interface UsersResponse {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  signupTrend: Array<{
    date: string;
    count: number;
  }>;
}

export interface AdminPayment {
  id: string;
  email: string;
  userId: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface PaymentsResponse {
  payments: AdminPayment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats: {
    totalRevenue: number;
    totalTransactions: number;
    tierBreakdown: Record<string, { count: number; revenue: number }>;
    revenueTrend: Array<{
      date: string;
      revenue: number;
    }>;
  };
}

export interface EngagementData {
  totalTestsTaken30d: number;
  averageScore: number;
  averageTimeTakenSeconds: number;
  totalTrackedStudents: number;
  chapterQuizAttempts: number;
  lessonSessions: number;
  testTrend: Array<{
    date: string;
    tests: number;
  }>;
  subjectBreakdown: Array<{
    subject: string;
    count: number;
  }>;
}

export interface SystemHealthData {
  api: {
    status: 'healthy' | 'degraded' | 'error';
    uptimeSeconds: number;
    timestamp: string;
  };
  database: {
    status: 'healthy' | 'checking' | 'error' | 'unreachable';
    latencyMs: number;
    totalUsersCount?: number;
    error?: string;
  };
  auth: {
    status: 'configured' | 'missing_secret';
  };
  payments: {
    status: 'configured' | 'missing_keys';
  };
  email: {
    status: 'configured' | 'missing_key';
  };
  lastActivity: {
    lastPayment: string | null;
    lastMockTest: string | null;
  };
}

export interface AdminAlert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  type: 'signup' | 'payment' | 'mock_test' | 'system';
  title: string;
  description: string;
  timestamp: string;
  badge?: string;
}
