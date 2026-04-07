// Configuration for Backend API URL
// Replace the URL below with your actual deployed backend URL
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://localhost:5000/api" 
    : "https://api.iisersmartprep.space/api";
const AI_API_URL = API_BASE_URL + "/ai-insights";

// Razorpay Key (LIVE)
const RAZORPAY_KEY_ID = "rzp_live_SC3R47SGOoJHvE";

// Global PRO UI Manager
document.addEventListener("DOMContentLoaded", () => {
    const isPro = localStorage.getItem("IAT_PLAN") === "PRO";
    if (isPro) {
        // 1. Inject strictly enforced CSS to hide all .pro-hidden elements globally
        // We use double classes, IDs, and aggressive resets to win all specificity wars.
        const style = document.createElement("style");
        style.innerHTML = `
            .pro-hidden,
            div.pro-hidden,
            section.pro-hidden,
            a.pro-hidden,
            button.pro-hidden {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                z-index: -9999 !important;
            }
        `;
        document.head.appendChild(style);

        // 2. Add PRO badge to header logo
        const logoEl = document.querySelector(".logo");
        if (logoEl && !logoEl.querySelector(".pro-badge")) {
            logoEl.innerHTML += ' <span class="pro-badge" style="background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 8px; vertical-align: middle; line-height: 1;">PRO</span>';
        }
    }
});
