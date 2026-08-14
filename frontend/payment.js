// payment.js — Razorpay checkout flow
// NOTE: refreshPlanFromServer is defined in auth.js and loaded globally.
//       Do NOT redefine it here.

async function buyPro() {
    // 0️⃣ Require login
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
                    console.log("⏳ Verifying payment and activating PRO...");

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
                        // Re-sync plan from DB using the canonical auth.js function
                        if (typeof refreshPlanFromServer === "function") {
                            await refreshPlanFromServer();
                        }

                        const currentPlan = localStorage.getItem("IAT_PLAN") || "";
                        if (currentPlan.toUpperCase() === "PRO") {
                            alert("🎉 PRO activated successfully! Enjoy unlimited access.");
                        } else {
                            alert("✅ Payment verified! Your PRO access is being activated. The page will reload now.");
                        }
                        window.location.reload();
                    } else {
                        const errMsg = verifyData.error || "Payment verification failed";
                        console.error("Verify payment failed:", errMsg);
                        alert("⚠️ " + errMsg);
                    }
                } catch (verifyErr) {
                    console.error("Verify payment network error:", verifyErr);
                    alert("⚠️ Payment may have succeeded but we couldn't verify it. Please contact support with your payment ID: " + response.razorpay_payment_id);
                }
            },

            // Handle modal close
            modal: {
                ondismiss: function () {
                    console.log("Razorpay modal closed by user.");
                }
            },

            theme: { color: "#2563eb" }
        };

        // 4️⃣ Open Razorpay checkout
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

// Expose globally
window.buyPro = buyPro;
