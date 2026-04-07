/**
 * Isolated AI Insights Module
 * This file handles DeepSeek integration without cluttering server.js
 */

module.exports = function(app, authMiddleware) {
    app.post("/ai", authMiddleware, async (req, res) => {
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
                            content: `You are an expert IISER IAT Mentor. 
                            Analyze test data and return ONLY a valid JSON object. 
                            Do NOT include any Markdown formatting in the response.
                            Format:
                            {
                              "mistake": "Biggest performance-killing mistake in 1-2 sentences.",
                              "fix": "Specific, actionable technical fix for the next study session.",
                              "strategy": "High-level test-taking strategy based on their speed/accuracy.",
                              "boost": "One specific projection (e.g. +40 marks) and what to change to get it."
                            }`
                        },
                        { role: "user", content: prompt }
                    ],
                    response_format: { type: "json_object" }
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
            
            // Expected JSON structure from the AI
            let aiData;
            try {
                aiData = JSON.parse(data.choices[0].message.content);
            } catch (pErr) {
                console.error("[AI PARSE ERROR] AI did not return valid JSON", data.choices[0].message.content);
                return res.status(500).json({ error: "AI response was not in the correct format. Try again." });
            }

            console.log("[AI] Analysis successful (JSON)");
            res.json(aiData);

        } catch (err) {
            console.error("[AI SERVER ERROR]", err);
            res.status(500).json({ error: "Backend failed to connect to DeepSeek. Check your internet connection." });
        }
    });

    // Simple health check for this module
    app.get("/ai-health", (req, res) => {
        res.json({ 
            status: "AI Module Active",
            keyConfigured: !!(process.env.DEEPSEEK_API_KEY && process.env.DEEPSEEK_API_KEY !== "your_deepseek_api_key_here")
        });
    });
};
