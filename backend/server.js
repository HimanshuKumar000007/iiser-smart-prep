const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// (Moved /api/config below middleware)

// ------------------------------------------------------------------
// Imports & Configuration
// ------------------------------------------------------------------
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const Razorpay = require("razorpay");
const crypto = require("crypto");
// (mailer import removed)


// Middleware
app.use((req, res, next) => {
  console.log(`Incoming request from Origin: ${req.headers.origin} | Method: ${req.method} | Path: ${req.path}`);
  next();
});

// Middleware
app.use(cors({
  origin: true, // 👈 Reflects the request origin
  credentials: true
}));
app.use("/api/razorpay-webhook", express.raw({ type: "*/*" }));
app.use(express.json());

// Debug
console.log("SUPABASE_URL =", process.env.SUPABASE_URL ? "Set" : "Not Set");
console.log("RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID ? "Set" : "Not Set");

// ------------------------------------------------------------------
// 🔑 CONFIG ENDPOINT (Public)
// ------------------------------------------------------------------
app.get("/api/config", (req, res) => {
  // Manual CORS to ensure it works
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  res.json({
    razorpayKey: process.env.RAZORPAY_KEY_ID
  });
});

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ===============================
// 🔒 MIDDLEWARE
// ===============================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Malformed token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ===============================
// ✅ SUBMIT TEST API (PROTECTED)
// ===============================
app.post("/api/submit-test", authMiddleware, (req, res) => {
  // Logic to save score would go here
  console.log("Test submitted by:", req.user.email);
  res.json({ success: true, message: "Test submitted successfully" });
});

// =======================
// 🔐 MOCK ACCESS CHECK API
// =======================
app.post("/api/check-mock-access", authMiddleware, async (req, res) => {
  try {
    const { mockId } = req.body;

    if (!mockId) {
      return res.status(400).json({ error: "mockId required" });
    }

    // FREE MOCKS — Quick Mocks 1-10, and Physics Topic 1 & 2 (IDs 41-48)
    const FREE_MOCK_IDS = [1,2,3,4,5,6,7,8,9,10, 41,42,43,44,45,46,47,48];
    if (FREE_MOCK_IDS.includes(Number(mockId))) {
      return res.json({ access: true });
    }

    // 🔍 Get user plan from DB (SOURCE OF TRUTH)
    const { data, error } = await supabase
      .from("users")
      .select("plan")
      .eq("email", req.user.email)
      .single();

    if (error || !data) {
      return res.status(401).json({ access: false });
    }

    if (data.plan === "PRO") {
      return res.json({ access: true });
    }

    return res.status(403).json({ access: false });

  } catch (err) {
    console.error(err);
    res.status(500).json({ access: false });
  }
});

// ===============================
// ✅ SIGNUP API
// ===============================
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    // Check existing user
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password: hashedPassword,
          plan: "FREE",
          plan_expiry: null
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Create JWT
    const token = jwt.sign(
      { userId: data.id, email: data.email, plan: data.plan },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Signup successful",
      token,
      user: {
        email: data.email,
        plan: data.plan
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// =======================
// 💸 PAYMENT API
// =======================
app.post("/api/create-order", authMiddleware, async (req, res) => {
  try {
    const options = {
      amount: 24900, // ₹249 = 24900 paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        user_id: req.user.id || req.user.userId, // JWT from authMiddleware (signup uses userId, login uses id. Best to handle both or standardize)
        email: req.user.email
      }
    };

    const order = await razorpay.orders.create(options);

    // Return all fields for Razorpay SDK
    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});


app.post("/api/verify-payment", authMiddleware, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ PAYMENT VERIFIED

    // 💾 UPDATE DATABASE
    try {
      // Use req.user from authMiddleware
      const { error } = await supabase
        .from("users")
        .update({
          plan: "PRO",
          plan_expiry: null // Persistent access
        })
        .eq("email", req.user.email); // or req.user.userId depending on JWT structure

      if (error) {
        console.error("Database update failed:", error);
        // We still return success for payment, but maybe log it critically
      } else {
        console.log(`Plan upgraded to PRO for user: ${req.user.email}`);
      }

      return res.json({ success: true });

    } catch (dbErr) {
      console.error("DB Error:", dbErr);
      return res.json({ success: true }); // Payment was legit, even if DB failed (rare)
    }

  } else {
    return res.status(400).json({ success: false });
  }
});

// =======================
// 🚨 RAZORPAY WEBHOOK
// =======================
app.post("/api/razorpay-webhook", async (req, res) => {
  console.log("🔥 Webhook hit");

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    // req.body is a raw Buffer from express.raw()
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body) // Buffer — correct for HMAC
      .digest("hex");

    // ❌ Signature invalid
    if (expectedSignature !== signature) {
      console.log("Invalid webhook signature");
      return res.status(400).json({ success: false });
    }

    // Parse the raw body into JSON for event handling
    const event = JSON.parse(req.body.toString());
    console.log("Event:", event.event);

    // 🎯 Payment success event
    if (event.event === "payment.captured" || event.event === "order.paid") {

      const payment = event.payload.payment.entity;

      const paymentId = payment.id;
      const userId = payment.notes.user_id;

      if (!userId) {
        console.log("No user_id found in notes");
        return res.status(200).send("OK");
      }

      // 🔥 UPDATE USER TO PRO
      const { error } = await supabase
        .from("users")
        .update({
          plan: "PRO",
          is_pro: true,
          payment_id: paymentId,
          plan_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        })
        .eq("id", userId);

      if (error) {
        console.error("Supabase update error:", error);
      } else {
        console.log("User upgraded to PRO:", userId);
      }
    }

    res.status(200).send("OK");

  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Error");
  }
});

// =======================
// LOGIN API
// =======================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // 1️⃣ Find user
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error || users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3️⃣ Create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        plan: user.plan
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Send response
    res.json({
      message: "Login successful",
      token,
      plan: user.plan
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// =======================
// 🔐 FORGOT PASSWORD API
// =======================
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await Promise.race([
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://iisersmartprep.space/reset-password.html"
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000))
    ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    const message = err.message === "Timeout" ? "Request timed out. Try again." : "Server error";
    res.status(err.message === "Timeout" ? 408 : 500).json({ error: message });
  }
});


// =======================
// 🔁 RESET PASSWORD API
// =======================
app.post("/api/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password required" });
    }

    // 1️⃣ Find user with valid token
    const { data: users, error } = await supabase
      .from("users")
      .select("id, reset_token_expiry")
      .eq("reset_token", token)
      .limit(1);

    if (error || !users || users.length === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const user = users[0];

    // 2️⃣ Check expiry manually (IMPORTANT)
    if (new Date(user.reset_token_expiry) < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password & clear token
    const { error: updateError } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_token_expiry: null
      })
      .eq("id", user.id);

    if (updateError) throw updateError;

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Reset failed" });
  }
});

// =======================
// 👤 GET USER INFO API
// =======================
app.get("/api/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data, error } = await supabase
      .from("users")
      .select("email, plan")
      .eq("email", decoded.email)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/api/ai-explain", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    const prompt = `
You are an IISER IAT exam expert.

Explain the solution below in max 5 steps and max 120 words.
No extra theory.

Question:
${question}
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `
You are an IISER IAT exam expert.

Explain the solution to the following question in detailed steps using simple HTML formatting.
Use <b>Step 1: [Title]</b><br>[Content] format.
Use <br> for new lines.
Do not use markdown.

Question:
${question}
` })
      }
    );

    const data = await response.json();
    console.log("HF RAW RESPONSE =>", data);

    let explanation = "No response";

    // Case 1: array response
    if (Array.isArray(data) && data[0]?.generated_text) {
      explanation = data[0].generated_text;
    }

    // Case 2: direct generated_text
    else if (data.generated_text) {
      explanation = data.generated_text;
    }

    // Case 3: outputs array
    else if (data.outputs && data.outputs[0]?.text) {
      explanation = data.outputs[0].text;
    }

    // Case 4: model loading
    else if (data.error && data.estimated_time) {
      explanation = "⏳ AI is warming up. Please try again in a few seconds.";
    }

    res.json({ explanation });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

// =======================
// 🤖 AI TUTOR CHAT PROXY
// =======================
// Rate limit tracker: { "ip_YYYY-MM-DD": count }
const chatUsage = new Map();
const DAILY_LIMIT = 30;
const MAX_TOKENS = 800; // enough for complete answers (~600 words)

const IISER_SYSTEM_PROMPT = `You are an expert AI tutor specialized exclusively for the IISER IAT (Indian Institutes of Science Education and Research Aptitude Test).
Help students with Physics, Chemistry, Mathematics and Biology at Class 11-12 level.
Rules:
- Keep answers concise and under 300 words.
- Use step-by-step explanations for problems.
- Focus only on IAT-relevant topics.
- Be encouraging and supportive.
- If asked something unrelated to studies, politely redirect to IAT topics.`;

// ── Smart AI Insights (Isolated Module) ───────────────────
require("./ai_insights")(app, authMiddleware);

app.post("/api/ai-chat", async (req, res) => {
  try {
    // ── Rate limiting by IP ──────────────────────────
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    const day = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const key = `${ip}_${day}`;

    const used = chatUsage.get(key) || 0;
    if (used >= DAILY_LIMIT) {
      return res.status(429).json({
        error: `Daily limit of ${DAILY_LIMIT} questions reached. Come back tomorrow! 🌙`
      });
    }
    chatUsage.set(key, used + 1);

    // Clean up old keys every 500 requests to avoid memory leak
    if (chatUsage.size > 500) {
      for (const [k] of chatUsage) {
        if (!k.endsWith(day)) chatUsage.delete(k);
      }
    }

    // ── Build messages with enforced system prompt ───
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    // Strip any system messages from client, inject our own
    const userMessages = messages.filter(m => m.role !== "system");
    const fullMessages = [
      { role: "system", content: IISER_SYSTEM_PROMPT },
      ...userMessages
    ];

    // ── Call DeepSeek (cheapest model) ───────────────
    const deepseekRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",   // cheapest model
        messages: fullMessages,
        stream: true,
        max_tokens: MAX_TOKENS         // enforce ~300-word limit
      })
    });

    if (!deepseekRes.ok) {
      const err = await deepseekRes.json().catch(() => ({}));
      return res.status(deepseekRes.status).json({ error: err.error?.message || "DeepSeek error" });
    }

    // ── Stream response to browser ───────────────────
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Daily-Remaining", String(DAILY_LIMIT - used - 1));

    // Pump Web ReadableStream chunks to the Express response
    const reader = deepseekRes.body.getReader();
    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) { res.end(); break; }
        res.write(value);
      }
    };
    pump().catch(err => {
      console.error("Stream pump error:", err);
      res.end();
    });

  } catch (err) {
    console.error("AI Chat proxy error:", err);
    res.status(500).json({ error: "AI service unavailable. Please try again." });
  }
});


app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
