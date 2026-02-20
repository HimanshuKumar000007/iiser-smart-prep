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
        console.log("ORDER DATA:", data);

        if (data.error) {
            alert("Error creating order: " + data.error);
            return;
        }

        // 2️⃣ Razorpay options
        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            order_id: data.order_id,
            name: "IISER Smart Prep",
            description: "Pro Plan",

            handler: async function (response) {
                // 3️⃣ Verify payment on backend
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
        alert("Something went wrong initializing payment: " + err.message);
    }
}
