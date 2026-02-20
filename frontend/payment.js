async function buyPro() {
    // 0️⃣ Check Login
    const token = localStorage.getItem("IAT_TOKEN");
    if (!token) {
        // Use the new Bottom Sheet UI
        if (window.showAuthSheet) {
            window.showAuthSheet();
        } else {
            // Fallback if sheet not found (shouldn't happen on index.html)
            alert("Please login first to upgrade.");
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `login.html?redirect=${currentUrl}`;
        }
        return;
    }

    // 1️⃣ Create order from backend
    try {
        const res = await fetch(`${API_BASE_URL}/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        const order = await res.json();

        if (order.error) {
            alert("Error creating order: " + order.error);
            return;
        }

        // 1.5️⃣ Fetch Config (Razorpay Key)
        const configRes = await fetch(`${API_BASE_URL}/config`);
        const config = await configRes.json();

        if (!config.razorpayKeyId) {
            throw new Error("Failed to load payment configuration");
        }

        // 2️⃣ Razorpay options
        const options = {
            key: config.razorpayKeyId, // 👈 Fetched from backend
            amount: order.amount,
            currency: "INR",
            name: "IISER Smart Prep",
            description: "Pro Plan",
            order_id: order.id,

            handler: async function (response) {
                // 3️⃣ Verify payment on backend
                const verifyRes = await fetch(`${API_BASE_URL}/verify-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(response)
                });

                const data = await verifyRes.json();

                if (data.success) {
                    alert("PRO activated 🎉");
                    localStorage.setItem("IAT_PLAN", "PRO");
                    window.location.reload();
                } else {
                    alert("Payment verification failed");
                }
            },

            theme: { color: "#2563eb" }
        };

        // 4️⃣ Open checkout
        const rzp = new Razorpay(options);
        rzp.open();

    } catch (err) {
        console.error("Payment Error:", err);
        alert("Something went wrong initializing payment");
    }
}
