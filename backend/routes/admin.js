const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Isolated Supabase Client using backend service-role credentials
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ------------------------------------------------------------------
// 🔒 ADMIN AUTHENTICATION MIDDLEWARE
// ------------------------------------------------------------------
function adminAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Admin authorization header required' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed authorization token' });
  }

  const token = parts[1];

  // Direct secret support for automated scripting / emergency access
  if (process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET) {
    req.admin = { role: 'admin', type: 'secret_key' };
    return next();
  }

  // Verify Admin JWT
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin' || payload.scope !== 'smartprep_admin') {
      return res.status(403).json({ error: 'Insufficient admin privileges' });
    }
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired admin session' });
  }
}

// ------------------------------------------------------------------
// 🔑 ADMIN AUTH: LOGIN
// ------------------------------------------------------------------
router.post('/auth/login', async (req, res) => {
  try {
    const { secretKey } = req.body;
    const expectedSecret = process.env.ADMIN_SECRET;

    if (!expectedSecret) {
      console.error('[Admin Auth] ADMIN_SECRET is not configured in backend environment.');
      return res.status(500).json({ error: 'Admin authentication is temporarily misconfigured.' });
    }

    if (!secretKey || secretKey.trim() !== expectedSecret.trim()) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // Issue short-lived admin token (12 hours)
    const adminToken = jwt.sign(
      {
        role: 'admin',
        scope: 'smartprep_admin',
        authenticatedAt: new Date().toISOString()
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      success: true,
      token: adminToken,
      expiresIn: 43200 // 12 hours in seconds
    });
  } catch (err) {
    console.error('[Admin Auth Error]:', err);
    res.status(500).json({ error: 'Admin login failed' });
  }
});

// ------------------------------------------------------------------
// 🔑 ADMIN AUTH: VERIFY SESSION
// ------------------------------------------------------------------
router.get('/auth/verify', adminAuthMiddleware, (req, res) => {
  res.json({
    valid: true,
    admin: req.admin
  });
});

// ------------------------------------------------------------------
// 📊 GET /api/admin/overview
// ------------------------------------------------------------------
router.get('/overview', adminAuthMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString();

    // Parallel fetch for overview KPIs
    const [
      totalUsersRes,
      newTodayRes,
      new7dRes,
      newPrev7dRes,
      new30dRes,
      newPrev30dRes,
      proUsersRes,
      paymentsRes,
      active7dRes,
      active30dRes
    ] = await Promise.all([
      // Total users count
      supabase.from('users').select('*', { count: 'exact', head: true }),
      // New users today
      supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      // New users in last 7 days
      supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
      // New users in previous 7-14 days
      supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', fourteenDaysAgo).lt('created_at', sevenDaysAgo),
      // New users in last 30 days
      supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo),
      // New users in previous 30-60 days
      supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', sixtyDaysAgo).lt('created_at', thirtyDaysAgo),
      // Pro users count
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_pro', true),
      // All captured payments to compute revenue and paid trends
      supabase.from('payments').select('amount, status, created_at').eq('status', 'captured'),
      // Active users (last 7 days from mock_results)
      supabase.from('mock_results').select('user_id').gte('created_at', sevenDaysAgo).limit(2000),
      // Active users (last 30 days from mock_results)
      supabase.from('mock_results').select('user_id').gte('created_at', thirtyDaysAgo).limit(2000)
    ]);

    const totalUsers = totalUsersRes.count || 0;
    const newUsersToday = newTodayRes.count || 0;
    const newUsers7d = new7dRes.count || 0;
    const newUsersPrev7d = newPrev7dRes.count || 0;
    const newUsers30d = new30dRes.count || 0;
    const newUsersPrev30d = newPrev30dRes.count || 0;
    const proUsers = proUsersRes.count || 0;

    // Revenue calculations (amounts stored in paise)
    let totalRevenuePaise = 0;
    let revenue30dPaise = 0;
    let revenuePrev30dPaise = 0;
    let paidPaymentsCount = 0;

    const payments = paymentsRes.data || [];
    payments.forEach(p => {
      const amt = Number(p.amount) || 0;
      totalRevenuePaise += amt;
      paidPaymentsCount++;
      const pDate = new Date(p.created_at);
      if (pDate >= new Date(thirtyDaysAgo)) {
        revenue30dPaise += amt;
      } else if (pDate >= new Date(sixtyDaysAgo)) {
        revenuePrev30dPaise += amt;
      }
    });

    const totalRevenue = Math.round(totalRevenuePaise / 100);
    const revenue30d = Math.round(revenue30dPaise / 100);
    const revenuePrev30d = Math.round(revenuePrev30dPaise / 100);

    // Active users deduplication
    const active7dSet = new Set((active7dRes.data || []).map(r => r.user_id));
    const active30dSet = new Set((active30dRes.data || []).map(r => r.user_id));

    // Conversion rate
    const conversionRate = totalUsers > 0 ? Number(((proUsers / totalUsers) * 100).toFixed(2)) : 0;

    // Percentage change helper
    const calcPctChange = (current, previous) => {
      if (!previous || previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    res.json({
      totalUsers: {
        value: totalUsers,
        previousValue: totalUsers - newUsers30d,
        changePct: calcPctChange(totalUsers, totalUsers - newUsers30d)
      },
      newUsersToday: {
        value: newUsersToday
      },
      newUsers7d: {
        value: newUsers7d,
        previousValue: newUsersPrev7d,
        changePct: calcPctChange(newUsers7d, newUsersPrev7d)
      },
      newUsers30d: {
        value: newUsers30d,
        previousValue: newUsersPrev30d,
        changePct: calcPctChange(newUsers30d, newUsersPrev30d)
      },
      activeUsers7d: {
        value: active7dSet.size
      },
      activeUsers30d: {
        value: active30dSet.size
      },
      proUsers: {
        value: proUsers,
        freeUsers: Math.max(0, totalUsers - proUsers)
      },
      revenue: {
        total: totalRevenue,
        last30Days: revenue30d,
        previous30Days: revenuePrev30d,
        changePct: calcPctChange(revenue30d, revenuePrev30d),
        successfulTransactions: paidPaymentsCount
      },
      conversionRate: {
        value: conversionRate,
        label: `${conversionRate}%`
      },
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[Admin Overview Error]:', err);
    res.status(500).json({ error: 'Failed to fetch overview metrics', details: err.message });
  }
});

// ------------------------------------------------------------------
// 👥 GET /api/admin/users
// ------------------------------------------------------------------
router.get('/users', adminAuthMiddleware, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(10, parseInt(req.query.limit) || 25));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const planFilter = (req.query.plan || 'ALL').toUpperCase();

    // Query builder
    let query = supabase
      .from('users')
      .select('id, name, email, plan, is_pro, plan_expiry, created_at, payment_id', { count: 'exact' });

    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
    }

    if (planFilter === 'PRO') {
      query = query.eq('is_pro', true);
    } else if (planFilter === 'FREE') {
      query = query.eq('is_pro', false);
    }

    const { data: users, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Fetch user growth trajectory (daily signups for last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentSignups, error: signupErr } = await supabase
      .from('users')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: true });

    if (signupErr) console.warn('[Admin Users Trend Warning]:', signupErr.message);

    // Group signups by YYYY-MM-DD
    const signupTrendMap = {};
    (recentSignups || []).forEach(u => {
      if (!u.created_at) return;
      const day = u.created_at.split('T')[0];
      signupTrendMap[day] = (signupTrendMap[day] || 0) + 1;
    });

    const signupTrend = Object.keys(signupTrendMap).sort().map(date => ({
      date,
      count: signupTrendMap[date]
    }));

    res.json({
      users: (users || []).map(u => ({
        id: u.id,
        name: u.name || 'Anonymous',
        email: u.email,
        plan: u.is_pro ? 'PRO' : (u.plan || 'FREE'),
        isPro: Boolean(u.is_pro),
        planExpiry: u.plan_expiry,
        createdAt: u.created_at
      })),
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      signupTrend
    });
  } catch (err) {
    console.error('[Admin Users Error]:', err);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

// ------------------------------------------------------------------
// 💳 GET /api/admin/payments
// ------------------------------------------------------------------
router.get('/payments', adminAuthMiddleware, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(10, parseInt(req.query.limit) || 25));
    const offset = (page - 1) * limit;

    const { data: payments, count, error } = await supabase
      .from('payments')
      .select('id, email, user_id, razorpay_order_id, razorpay_payment_id, amount, currency, status, source, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Tier distribution & daily revenue trend from all payments
    const { data: allPayments } = await supabase
      .from('payments')
      .select('amount, status, created_at')
      .eq('status', 'captured');

    const tierBreakdown = {
      '₹399 (1 Month)': { count: 0, revenue: 0 },
      '₹499 (Sprint)': { count: 0, revenue: 0 },
      '₹599 (6 Month)': { count: 0, revenue: 0 },
      '₹899 (Annual)': { count: 0, revenue: 0 },
      '₹1299 (Lifetime)': { count: 0, revenue: 0 },
      'Other': { count: 0, revenue: 0 }
    };

    let totalRevenue = 0;
    const dailyRevenueMap = {};

    (allPayments || []).forEach(p => {
      const amtInRupees = Math.round((Number(p.amount) || 0) / 100);
      totalRevenue += amtInRupees;

      if (amtInRupees === 399) {
        tierBreakdown['₹399 (1 Month)'].count++;
        tierBreakdown['₹399 (1 Month)'].revenue += amtInRupees;
      } else if (amtInRupees === 499) {
        tierBreakdown['₹499 (Sprint)'].count++;
        tierBreakdown['₹499 (Sprint)'].revenue += amtInRupees;
      } else if (amtInRupees === 599) {
        tierBreakdown['₹599 (6 Month)'].count++;
        tierBreakdown['₹599 (6 Month)'].revenue += amtInRupees;
      } else if (amtInRupees === 899) {
        tierBreakdown['₹899 (Annual)'].count++;
        tierBreakdown['₹899 (Annual)'].revenue += amtInRupees;
      } else if (amtInRupees === 1299) {
        tierBreakdown['₹1299 (Lifetime)'].count++;
        tierBreakdown['₹1299 (Lifetime)'].revenue += amtInRupees;
      } else {
        tierBreakdown['Other'].count++;
        tierBreakdown['Other'].revenue += amtInRupees;
      }

      if (p.created_at) {
        const day = p.created_at.split('T')[0];
        dailyRevenueMap[day] = (dailyRevenueMap[day] || 0) + amtInRupees;
      }
    });

    const revenueTrend = Object.keys(dailyRevenueMap).sort().map(date => ({
      date,
      revenue: dailyRevenueMap[date]
    }));

    res.json({
      payments: (payments || []).map(p => ({
        id: p.id,
        email: p.email,
        userId: p.user_id,
        orderId: p.razorpay_order_id,
        paymentId: p.razorpay_payment_id,
        amount: Math.round((Number(p.amount) || 0) / 100),
        currency: p.currency || 'INR',
        status: p.status,
        source: p.source,
        createdAt: p.created_at
      })),
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      stats: {
        totalRevenue,
        totalTransactions: allPayments?.length || 0,
        tierBreakdown,
        revenueTrend
      }
    });
  } catch (err) {
    console.error('[Admin Payments Error]:', err);
    res.status(500).json({ error: 'Failed to fetch payments', details: err.message });
  }
});

// ------------------------------------------------------------------
// 🎯 GET /api/admin/engagement
// ------------------------------------------------------------------
router.get('/engagement', adminAuthMiddleware, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Query mock results for test center activity
    const [mockResultsRes, userStatsRes, quizAttemptsRes, lessonSessionsRes] = await Promise.all([
      supabase
        .from('mock_results')
        .select('mock_id, mock_title, score, total_questions, correct, time_taken, subject, created_at')
        .gte('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: false })
        .limit(2000),
      supabase.from('user_stats').select('avg_score, total_mocks', { count: 'exact' }),
      supabase.from('chapter_quiz_attempts').select('subject, status, accuracy', { count: 'exact' }),
      supabase.from('student_lesson_sessions').select('subject, status', { count: 'exact' })
    ]);

    const results = mockResultsRes.data || [];
    const totalTestsTaken30d = results.length;

    // Test volume by day
    const testsByDay = {};
    const subjectDistribution = {};

    let totalScore = 0;
    let totalQuestions = 0;
    let totalTimeTaken = 0;

    results.forEach(r => {
      if (r.created_at) {
        const day = r.created_at.split('T')[0];
        testsByDay[day] = (testsByDay[day] || 0) + 1;
      }
      const subj = r.subject || 'Full Mock';
      subjectDistribution[subj] = (subjectDistribution[subj] || 0) + 1;

      totalScore += Number(r.score) || 0;
      totalQuestions += Number(r.total_questions) || 0;
      totalTimeTaken += Number(r.time_taken) || 0;
    });

    const testTrend = Object.keys(testsByDay).sort().map(date => ({
      date,
      tests: testsByDay[date]
    }));

    const subjectBreakdown = Object.keys(subjectDistribution).map(subj => ({
      subject: subj,
      count: subjectDistribution[subj]
    }));

    res.json({
      totalTestsTaken30d,
      averageScore: results.length > 0 ? Math.round(totalScore / results.length) : 0,
      averageTimeTakenSeconds: results.length > 0 ? Math.round(totalTimeTaken / results.length) : 0,
      totalTrackedStudents: userStatsRes.count || 0,
      chapterQuizAttempts: quizAttemptsRes.count || 0,
      lessonSessions: lessonSessionsRes.count || 0,
      testTrend,
      subjectBreakdown
    });
  } catch (err) {
    console.error('[Admin Engagement Error]:', err);
    res.status(500).json({ error: 'Failed to fetch engagement data', details: err.message });
  }
});

// ------------------------------------------------------------------
// 🏥 GET /api/admin/health
// ------------------------------------------------------------------
router.get('/health', adminAuthMiddleware, async (req, res) => {
  const start = Date.now();
  const healthData = {
    api: { status: 'healthy', uptimeSeconds: Math.round(process.uptime()), timestamp: new Date().toISOString() },
    database: { status: 'checking', latencyMs: 0 },
    auth: { status: process.env.JWT_SECRET ? 'configured' : 'missing_secret' },
    payments: { status: (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) ? 'configured' : 'missing_keys' },
    email: { status: process.env.RESEND_API_KEY ? 'configured' : 'missing_key' },
    lastActivity: { lastPayment: null, lastMockTest: null }
  };

  try {
    // Database latency & connectivity check
    const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });
    healthData.database.latencyMs = Date.now() - start;
    if (error) {
      healthData.database.status = 'error';
      healthData.database.error = error.message;
    } else {
      healthData.database.status = 'healthy';
      healthData.database.totalUsersCount = count;
    }

    // Latest payment activity
    const { data: lastPayment } = await supabase
      .from('payments')
      .select('created_at, amount')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastPayment) {
      healthData.lastActivity.lastPayment = lastPayment.created_at;
    }

    // Latest mock test activity
    const { data: lastMock } = await supabase
      .from('mock_results')
      .select('created_at, mock_title')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastMock) {
      healthData.lastActivity.lastMockTest = lastMock.created_at;
    }

    res.json(healthData);
  } catch (err) {
    healthData.database.status = 'unreachable';
    healthData.database.error = err.message;
    res.status(500).json(healthData);
  }
});

// ------------------------------------------------------------------
// 🔔 GET /api/admin/alerts
// ------------------------------------------------------------------
router.get('/alerts', adminAuthMiddleware, async (req, res) => {
  try {
    const alerts = [];
    const now = Date.now();

    // 1. Check DB latency
    const dbStart = Date.now();
    const { error: dbErr } = await supabase.from('users').select('id').limit(1);
    const dbLatency = Date.now() - dbStart;

    if (dbErr) {
      alerts.push({
        id: 'db_connection_err',
        level: 'critical',
        title: 'Database Connection Error',
        message: dbErr.message,
        timestamp: new Date().toISOString()
      });
    } else if (dbLatency > 1500) {
      alerts.push({
        id: 'db_latency_high',
        level: 'warning',
        title: 'High Database Latency',
        message: `Database query latency is elevated (${dbLatency}ms).`,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Check recent payments
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentPayments } = await supabase
      .from('payments')
      .select('status, created_at')
      .gte('created_at', twentyFourHoursAgo);

    const failedPayments = (recentPayments || []).filter(p => p.status === 'failed');
    if (failedPayments.length > 5) {
      alerts.push({
        id: 'payment_failure_spike',
        level: 'critical',
        title: 'Payment Failure Spike',
        message: `${failedPayments.length} failed payment attempts recorded in the past 24 hours.`,
        timestamp: new Date().toISOString()
      });
    }

    // 3. Service configuration alerts
    if (!process.env.RESEND_API_KEY) {
      alerts.push({
        id: 'resend_missing',
        level: 'warning',
        title: 'Email Service Inactive',
        message: 'RESEND_API_KEY is not configured. Transactional receipt emails are disabled.',
        timestamp: new Date().toISOString()
      });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      alerts.push({
        id: 'razorpay_missing',
        level: 'critical',
        title: 'Payment Gateway Incomplete',
        message: 'Razorpay keys are missing from backend environment variables.',
        timestamp: new Date().toISOString()
      });
    }

    // If all clear
    if (alerts.length === 0) {
      alerts.push({
        id: 'all_systems_nominal',
        level: 'info',
        title: 'All Systems Operational',
        message: 'No active anomalies detected across database, authentication, or payment infrastructure.',
        timestamp: new Date().toISOString()
      });
    }

    res.json({ alerts });
  } catch (err) {
    console.error('[Admin Alerts Error]:', err);
    res.status(500).json({ error: 'Failed to fetch alerts', details: err.message });
  }
});

// ------------------------------------------------------------------
// ⚡ GET /api/admin/recent-activity
// ------------------------------------------------------------------
router.get('/recent-activity', adminAuthMiddleware, async (req, res) => {
  try {
    const [recentUsersRes, recentPaymentsRes, recentMocksRes] = await Promise.all([
      supabase.from('users').select('id, email, name, plan, is_pro, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('payments').select('id, email, amount, status, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('mock_results').select('id, user_id, mock_title, score, total_questions, created_at').order('created_at', { ascending: false }).limit(10)
    ]);

    const events = [];

    (recentUsersRes.data || []).forEach(u => {
      events.push({
        id: `user_${u.id}`,
        type: 'signup',
        title: 'New Student Registered',
        description: u.email,
        timestamp: u.created_at,
        badge: u.is_pro ? 'PRO' : 'FREE'
      });
    });

    (recentPaymentsRes.data || []).forEach(p => {
      events.push({
        id: `payment_${p.id}`,
        type: 'payment',
        title: 'Subscription Payment',
        description: `${p.email} - ₹${Math.round((Number(p.amount) || 0) / 100)}`,
        timestamp: p.created_at,
        badge: p.status
      });
    });

    (recentMocksRes.data || []).forEach(m => {
      events.push({
        id: `mock_${m.id}`,
        type: 'mock_test',
        title: 'Mock Test Completed',
        description: `${m.mock_title || 'Mock Test'} (${m.score}/${m.total_questions * 4 || 240} pts)`,
        timestamp: m.created_at,
        badge: 'Exam'
      });
    });

    // Sort combined events descending by timestamp
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.json({ events: events.slice(0, 20) });
  } catch (err) {
    console.error('[Admin Activity Error]:', err);
    res.status(500).json({ error: 'Failed to fetch recent activity', details: err.message });
  }
});

// ------------------------------------------------------------------
// 🛠️ POST /api/admin/set-plan (Manual Pro Grant / Revoke)
// ------------------------------------------------------------------
router.post('/set-plan', adminAuthMiddleware, async (req, res) => {
  try {
    const { email, plan, days } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const targetPlan = (plan || 'FREE').toUpperCase();
    const isPro = targetPlan === 'PRO' || targetPlan === 'MONTHLY' || targetPlan === 'SIX_MONTH' || targetPlan === 'ANNUAL';

    let expiryDate = null;
    if (isPro) {
      const durationDays = parseInt(days) || 365;
      expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        plan: isPro ? 'PRO' : 'FREE',
        is_pro: isPro,
        plan_expiry: expiryDate
      })
      .eq('email', email.trim().toLowerCase())
      .select('email, plan, is_pro, plan_expiry');

    if (error) throw error;

    res.json({
      success: true,
      message: `User ${email} updated to ${isPro ? 'PRO' : 'FREE'}`,
      user: data?.[0]
    });
  } catch (err) {
    console.error('[Admin Set-Plan Error]:', err);
    res.status(500).json({ error: 'Failed to update user plan', details: err.message });
  }
});

module.exports = router;
