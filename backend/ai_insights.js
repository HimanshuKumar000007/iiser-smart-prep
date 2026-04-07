/**
 * Isolated AI Insights Module
 * This file handles DeepSeek integration without cluttering server.js
 */

module.exports = function(app, authMiddleware) {
    app.post("/api/ai-insights", authMiddleware, async (req, res) => {
        try {
            const { prompt } = req.body;
            if (!prompt) return res.status(400).json({ error: "Prompt required" });

            // Check if API key is present
            if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY === "your_deepseek_api_key_here") {
                console.error("[AI ERROR] DEEPSEEK_API_KEY is missing in .env");
                return res.status(500).json({ error: "DeepSeek API key is not configured in .env" });
            }

            console.log(`[AI] Processing analysis request (Prompt Length: ${prompt.length})`);

            const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        { 
                            role: "system", 
                            content: "You are an expert IISER IAT Mentor. Provide a detailed, encouraging, and highly technical critique of the student's test performance with a clear 2-week focus plan." 
                        },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 1200
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("[AI DEEPSEEK ERROR]", errorData);
                return res.status(response.status).json({ 
                    error: "DeepSeek API returned an error. Check your API credits or key limits." 
                });
            }

            const data = await response.json();
            const aiContent = data.choices[0].message.content;

            console.log("[AI] Analysis successful");
            res.json({ content: aiContent });

        } catch (err) {
            console.error("[AI SERVER ERROR]", err);
            res.status(500).json({ error: "Backend failed to connect to DeepSeek. Check your internet connection." });
        }
    });

    // Simple health check for this module
    app.get("/api/ai-health", (req, res) => {
        res.json({ 
            status: "AI Module Active",
            keyConfigured: !!(process.env.DEEPSEEK_API_KEY && process.env.DEEPSEEK_API_KEY !== "your_deepseek_api_key_here")
        });
    });
};
