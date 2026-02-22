// Configuration for Backend API URL
// Replace the URL below with your actual deployed backend URL
const API_BASE_URL = "https://api.iisersmartprep.space/api";

// Razorpay Key (LIVE)
const RAZORPAY_KEY_ID = "rzp_live_SC3R47SGOoJHvE";

// Global PRO UI Manager
document.addEventListener("DOMContentLoaded", () => {
    const isPro = localStorage.getItem("IAT_PLAN") === "PRO";
    if (isPro) {
        // 1. Hide unwanted pricing/upsell elements
        const hiddenElements = document.querySelectorAll(".pro-hidden");
        hiddenElements.forEach(el => {
            el.style.display = "none !important";

            // Fallback for some inline styles that might override the above
            el.setAttribute("style", "display: none !important;");
        });

        // 2. Add PRO badge to header logo
        const logoEl = document.querySelector(".logo");
        if (logoEl && !logoEl.querySelector(".pro-badge")) {
            logoEl.innerHTML += ' <span class="pro-badge" style="background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 8px; vertical-align: middle; line-height: 1;">PRO</span>';
        }
    }
});
