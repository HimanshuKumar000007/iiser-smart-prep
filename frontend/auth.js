// auth.js — Authentication & Plan helpers

const API_BASE = "https://api.iisersmartprep.space";

function getToken() {
    return localStorage.getItem("IAT_TOKEN");
}

function getPlan() {
    return localStorage.getItem("IAT_PLAN") || "FREE";
}

function requireLogin(redirectPath) {
    const token = getToken();
    if (!token) {
        alert("Please login first");
        const currentUrl = encodeURIComponent(window.location.href);
        const loginPath = redirectPath || "../login.html";
        window.location.href = `${loginPath}?redirect=${currentUrl}`;
        return false;
    }
    return true;
}

function requirePro() {
    const plan = getPlan();
    if (!isPro()) {
        alert("This feature is for PRO users only. Upgrade to unlock unlimited access.");
        window.location.href = "/#pricing";
        return false;
    }
    return true;
}

// Re-sync IAT_PLAN from Supabase DB (call on login + protected page loads)
// Smart cache: skips API call if checked within last 5 minutes (saves ~80% calls)
// Pass force=true after login/payment to always hit the DB
const PLAN_CACHE_MS = 5 * 60 * 1000; // 5 minutes

async function refreshPlanFromServer(force) {
    const token = getToken();
    if (!token) return null;

    // Skip API call if recently synced (unless forced by login/payment)
    if (!force) {
        const lastCheck = parseInt(localStorage.getItem("IAT_PLAN_CHECKED") || "0");
        if (Date.now() - lastCheck < PLAN_CACHE_MS) {
            return getPlan(); // Use cached plan — checked recently
        }
    }

    try {
        const res = await fetch(`${API_BASE}/api/check-pro-status`, {
            headers: { "Authorization": "Bearer " + token }
        });

        if (res.status === 401) {
            // Token expired — clear local storage
            console.warn("Token expired — clearing session");
            localStorage.removeItem("IAT_TOKEN");
            localStorage.removeItem("IAT_PLAN");
            localStorage.removeItem("IAT_PLAN_CHECKED");
            return null;
        }

        if (res.ok) {
            const data = await res.json();
            if (data.plan) {
                const normalizedPlan = data.plan.toUpperCase();
                localStorage.setItem("IAT_PLAN", normalizedPlan);
                localStorage.setItem("IAT_PLAN_CHECKED", String(Date.now()));
                console.log("✅ Plan synced from DB:", normalizedPlan);
                return normalizedPlan;
            }
        }
    } catch (err) {
        console.warn("refreshPlanFromServer failed:", err.message);
    }
    return getPlan(); // Fall back to cached value
}

// Check if user is PRO (from local cache — fast)
function isPro() {
    const plan = getPlan();
    return plan.toUpperCase() === "PRO";
}

// ── getUser() with 10-minute localStorage cache ─────────────────────────────
// WHY localStorage not in-memory: This is a multi-page HTML app.
// In-memory variables reset on every page — useless here.
// localStorage persists across page navigations, saving calls on every
// mock/PYQ/notes page that currently raw-fetches /api/me independently.
const USER_CACHE_MS = 10 * 60 * 1000; // 10 minutes

async function getUser(force) {
    const token = getToken();
    if (!token) return null;

    // Return cached user if fresh enough
    if (!force) {
        const lastFetch = parseInt(localStorage.getItem("IAT_USER_CHECKED") || "0");
        const cached = localStorage.getItem("IAT_USER_CACHE");
        if (cached && Date.now() - lastFetch < USER_CACHE_MS) {
            try { return JSON.parse(cached); } catch(_) {}
        }
    }

    try {
        const res = await fetch(`${API_BASE}/api/me`, {
            headers: { "Authorization": "Bearer " + token }
        });
        if (res.status === 401) {
            localStorage.removeItem("IAT_TOKEN");
            localStorage.removeItem("IAT_PLAN");
            localStorage.removeItem("IAT_PLAN_CHECKED");
            localStorage.removeItem("IAT_USER_CACHE");
            localStorage.removeItem("IAT_USER_CHECKED");
            return null;
        }
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("IAT_USER_CACHE", JSON.stringify(data));
            localStorage.setItem("IAT_USER_CHECKED", String(Date.now()));
            if (data.plan) localStorage.setItem("IAT_PLAN", data.plan.toUpperCase());
            return data;
        }
    } catch (err) {
        console.warn("getUser failed:", err.message);
    }
    // Fallback: return stale cache rather than failing completely
    try { return JSON.parse(localStorage.getItem("IAT_USER_CACHE") || "null"); } catch(_) { return null; }
}

// Expose globally
window.getToken = getToken;
window.getPlan = getPlan;
window.requireLogin = requireLogin;
window.requirePro = requirePro;
window.refreshPlanFromServer = refreshPlanFromServer;
window.isPro = isPro;
window.getUser = getUser;

// Auto-sync plan on load if logged in (non-blocking)
if (getToken()) {
    refreshPlanFromServer().catch(() => {});
}
