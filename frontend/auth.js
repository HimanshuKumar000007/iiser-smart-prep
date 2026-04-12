// auth.js — Authentication & Plan helpers

const API_BASE = "https://api.iisersmartprep.space";

function getToken() {
    return localStorage.getItem("IAT_TOKEN");
}

function getPlan() {
    return localStorage.getItem("IAT_PLAN");
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
    if (plan !== "PRO" && plan !== "Pro") {
        alert("This feature is for PRO users only. Upgrade to unlock unlimited access.");
        window.location.href = "/#pricing";
        return false;
    }
    return true;
}

// Re-sync IAT_PLAN from Supabase DB (call on login + protected page loads)
async function refreshPlanFromServer() {
    const token = getToken();
    if (!token) return null;

    try {
        const res = await fetch(`${API_BASE}/api/check-pro-status`, {
            headers: { "Authorization": "Bearer " + token }
        });

        if (res.status === 401) {
            // Token expired — clear local storage
            console.warn("Token expired — clearing session");
            localStorage.removeItem("IAT_TOKEN");
            localStorage.removeItem("IAT_PLAN");
            return null;
        }

        if (res.ok) {
            const data = await res.json();
            if (data.plan) {
                localStorage.setItem("IAT_PLAN", data.plan);
                console.log("Plan synced from DB:", data.plan);
                return data.plan;
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
    return plan === "PRO" || plan === "Pro";
}

// Expose globally
window.getToken = getToken;
window.getPlan = getPlan;
window.requireLogin = requireLogin;
window.requirePro = requirePro;
window.refreshPlanFromServer = refreshPlanFromServer;
window.isPro = isPro;
