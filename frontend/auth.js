// auth.js

function getToken() {
    return localStorage.getItem("IAT_TOKEN");
}

function getPlan() {
    return localStorage.getItem("IAT_PLAN");
}

function requireLogin() {
    const token = getToken();
    if (!token) {
        alert("Please login first");
        // capture current URL
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `../login.html?redirect=${currentUrl}`;
        return false;
    }
    return true;
}

function requirePro() {
    const plan = getPlan();
    // "PRO" or "Pro" check to be safe, though consistency is key
    if (plan !== "PRO" && plan !== "Pro") {
        alert("This mock test is for PRO users only");
        // Redirect to pricing section on homepage or a pricing page if it exists
        window.location.href = '/index.html#pricing';
        return false;
    }
    return true;
}
