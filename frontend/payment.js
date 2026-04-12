// payment.js — Robust payment flow with DB re-sync

async function buyPro() {
    // 0️⃣ Check Login
    const token = localStorage.getItem("IAT_TOKEN");
    if (!token) {
        if (window.showAuthSheet) {
            window.showAuthSheet();
        } else {
            alert("Please login first to upgrade.");
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `login.html?redirect=${currentUrl}`;
        }
        return;
    }

    // 1️⃣ Create order from backend
    try {
        const res = await fetch("https://api.iisersmartprep.space/api/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            // If token is stale (user signed up before JWT fix), prompt re-login
            if (res.status === 400 && data.error && data.error.includes("token")) {
                alert("Session expired. Please log out and log back in, then try again.");
            } else {
                alert("Error creating order: " + (data.error || "Unknown error"));
            }
            return;
        }

        // 2️⃣ Razorpay options
        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            order_id: data.order_id,
            name: "IISER Smart Prep",
            description: "Pro Plan — Lifetime Access",
            image: "https://iisersmartprep.space/apple-touch-icon.png",

            // 3️⃣ Payment success handler
            handler: async function (response) {
                try {
                    // Show loading state
                    const verifyingMsg = "⏳ Verifying payment and activating PRO...";
                    console.log(verifyingMsg);

                    const verifyRes = await fetch("https://api.iisersmartprep.space/api/verify-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify(response)
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        // BUG FIX: Re-sync actual plan from DB instead of blindly trusting response
                        await refreshPlanFromServer(token);

                        const currentPlan = localStorage.getItem("IAT_PLAN");
                        if (currentPlan === "PRO") {
                            alert("🎉 PRO activated successfully! Enjoy unlimited access.");
                            window.location.reload();
                        } else {
                            // Payment verified but DB sync failed — extremely rare
                            alert("✅ Payment verified! Your account is being activated. Please refresh in 30 seconds or contact support if PRO isn't active.");
                            window.location.reload();
                        }
                    } else {
                        // BUG FIX: Now we actually receive the error (no longer swallowed)
                        const errMsg = verifyData.error || "Payment verification failed";
                        console.error("Verify payment failed:", errMsg);
                        alert("⚠️ " + errMsg);
                    }
                } catch (verifyErr) {
                    console.error("Verify payment network error:", verifyErr);
                    alert("⚠️ Payment may have succeeded but we couldn't verify it. Please contact support with your payment ID: " + response.razorpay_payment_id);
                }
            },

            // Handle payment failures
            modal: {
                ondismiss: function () {
                    console.log("Razorpay modal closed by user");
                }
            },

            theme: { color: "#2563eb" }
        };

        // 4️⃣ Open checkout
        const rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error);
            alert("❌ Payment failed: " + (response.error.description || "Unknown error") + ". Please try again.");
        });

        rzp.open();

    } catch (err) {
        console.error("Payment Error:", err);
        alert("Something went wrong initializing payment: " + err.message);
    }
}

// Sync IAT_PLAN in localStorage from the real Supabase DB
async function refreshPlanFromServer(token) {
    try {
        const t = token || localStorage.getItem("IAT_TOKEN");
        if (!t) return;

        const res = await fetch("https://api.iisersmartprep.space/api/check-pro-status", {
            headers: { "Authorization": "Bearer " + t }
        });

        if (res.ok) {
            const data = await res.json();
            if (data.plan) {
                localStorage.setItem("IAT_PLAN", data.plan);
                console.log("✅ Plan synced from DB:", data.plan);
            }
        }
    } catch (err) {
        console.warn("refreshPlanFromServer failed (non-critical):", err.message);
    }
}

// Expose globally so other scripts can call it
window.buyPro = buyPro;
window.refreshPlanFromServer = refreshPlanFromServer;
