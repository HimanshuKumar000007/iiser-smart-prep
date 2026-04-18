const express = require("express");
const app = express();
const { Resend } = require("resend");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ── Resend email client (HTTPS-based, works on Railway) ────
const resend = new Resend(process.env.RESEND_API_KEY);

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

const leaderboardRoutes = require('./routes/leaderboard');
app.use('/', leaderboardRoutes);

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
    const FREE_MOCK_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 41, 42, 43, 44, 45, 46, 47, 48];
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

    // Create JWT — use 'id' consistently (same as login)
    const token = jwt.sign(
      { id: data.id, email: data.email, plan: data.plan },
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
    // BUG FIX: Always resolve id consistently — JWT now always emits 'id'
    const userId = req.user.id;
    const userEmail = req.user.email;

    if (!userId || !userEmail) {
      return res.status(400).json({ error: "User identity missing from token. Please log out and log back in." });
    }

    const options = {
      amount: 24900, // ₹249 = 24900 paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        user_id: userId,   // BUG FIX: always defined now
        email: userEmail   // BUG FIX: email added as fallback for webhook
      }
    };

    const order = await razorpay.orders.create(options);

    console.log(`Order created: ${order.id} for user ${userEmail} (${userId})`);

    // Return all fields for Razorpay SDK
    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (err) {
    console.error("create-order error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});


app.post("/api/verify-payment", authMiddleware, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: "Missing payment fields" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // ❌ Signature mismatch — reject immediately
  if (expectedSignature !== razorpay_signature) {
    console.warn(`⚠️ Signature mismatch for order ${razorpay_order_id} by ${req.user.email}`);
    return res.status(400).json({ success: false, error: "Payment signature invalid" });
  }

  // ✅ PAYMENT VERIFIED — now upgrade in DB
  try {
    const userEmail = req.user.email;

    // BUG FIX: DB error now causes HTTP 500 — NOT silently swallowed
    const { error: updateError } = await supabase
      .from("users")
      .update({
        plan: "PRO",
        is_pro: true,
        payment_id: razorpay_payment_id,
        plan_expiry: null // lifetime access
      })
      .eq("email", userEmail);

    if (updateError) {
      console.error(`❌ CRITICAL: DB upgrade failed for ${userEmail}:`, updateError);
      // BUG FIX: Return 500 so frontend knows upgrade failed — not a false success
      return res.status(500).json({
        success: false,
        error: "Payment received but account upgrade failed. Please contact support with your payment ID: " + razorpay_payment_id
      });
    }

    // ✅ Log payment for audit trail
    await supabase.from("payments").insert([{
      email: userEmail,
      user_id: req.user.id,
      razorpay_order_id,
      razorpay_payment_id,
      amount: 24900,
      currency: "INR",
      status: "captured",
      source: "verify-payment"
    }]).catch(logErr => console.error("Payment log insert failed (non-critical):", logErr));

    console.log(`✅ PRO upgrade successful for: ${userEmail}`);
    return res.json({ success: true, plan: "PRO" });

  } catch (dbErr) {
    console.error("❌ CRITICAL DB Error in verify-payment:", dbErr);
    return res.status(500).json({
      success: false,
      error: "Account upgrade failed. Payment was received. Contact support with payment ID: " + razorpay_payment_id
    });
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
      console.warn("⚠️ Invalid webhook signature — rejected");
      return res.status(400).json({ success: false });
    }

    // Parse the raw body into JSON for event handling
    const event = JSON.parse(req.body.toString());
    console.log("Webhook event:", event.event);

    // 🎯 Payment success event
    if (event.event === "payment.captured" || event.event === "order.paid") {

      const payment = event.payload.payment.entity;
      const paymentId = payment.id;

      // BUG FIX: Try by user_id first, fallback to email from notes
      const userId   = payment.notes?.user_id;
      const userEmail = payment.notes?.email;

      if (!userId && !userEmail) {
        console.error("❌ Webhook: No user_id or email in notes — cannot upgrade", payment.notes);
        return res.status(200).send("OK"); // Always 200 to Razorpay
      }

      // BUG FIX: Resolve by email (most reliable) or fall back to userId
      let updateQuery = supabase.from("users").update({
        plan: "PRO",
        is_pro: true,
        payment_id: paymentId,
        plan_expiry: null // lifetime
      });

      if (userEmail) {
        updateQuery = updateQuery.eq("email", userEmail);
        console.log(`Webhook upgrading by email: ${userEmail}`);
      } else {
        updateQuery = updateQuery.eq("id", userId);
        console.log(`Webhook upgrading by id: ${userId}`);
      }

      const { error } = await updateQuery;

      if (error) {
        console.error("❌ Webhook Supabase update error:", error);
      } else {
        console.log(`✅ Webhook: User upgraded to PRO — email=${userEmail}, id=${userId}`);

        // Log payment for audit trail
        await supabase.from("payments").insert([{
          email: userEmail,
          user_id: userId,
          razorpay_payment_id: paymentId,
          razorpay_order_id: payment.order_id,
          amount: payment.amount,
          currency: payment.currency,
          status: "captured",
          source: "webhook"
        }]).catch(logErr => console.error("Payment log insert failed (non-critical):", logErr));
      }
    }

    res.status(200).send("OK");

  } catch (err) {
    console.error("Webhook error:", err);
    res.status(200).send("OK"); // Always 200 — Razorpay retries on non-200
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
    if (!email) return res.status(400).json({ error: "Email required" });

    // 1️⃣ Check user exists in our custom users table
    const { data: users, error: findErr } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", email)
      .limit(1);

    if (findErr || !users || users.length === 0) {
      // Don't reveal if email exists — security best practice
      return res.json({ success: true });
    }

    const user = users[0];

    // 2️⃣ Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 3️⃣ Store token in DB
    const { error: updateErr } = await supabase
      .from("users")
      .update({
        reset_token: resetToken,
        reset_token_expiry: expiry.toISOString()
      })
      .eq("id", user.id);

    if (updateErr) {
      console.error("Failed to store reset token:", updateErr);
      return res.status(500).json({ error: "Server error. Please try again." });
    }

    // 4️⃣ Send email via Resend (HTTPS API — works on Railway)
    const resetLink = `https://iisersmartprep.space/reset-password.html?token=${resetToken}`;

    const { error: emailErr } = await resend.emails.send({
      from: "IISER Smart Prep <noreply@iisersmartprep.space>",
      to: user.email,
      subject: "Reset Your Password — IISER Smart Prep",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:24px;border-radius:12px;border:1px solid #e2e8f0;">
          <h2 style="color:#2563eb;">🔐 Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset your IISER Smart Prep password. Click the button below to set a new password:</p>
          <a href="${resetLink}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
            Reset Password
          </a>
          <p style="color:#64748b;font-size:0.85rem;">This link expires in <strong>1 hour</strong>. If you didn't request this, ignore this email — your account is safe.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
          <p style="color:#94a3b8;font-size:0.8rem;">IISER Smart Prep | iisersmartprep.space</p>
        </div>
      `
    });

    if (emailErr) {
      console.error("Resend email error:", emailErr);
      return res.status(500).json({ error: "Failed to send reset email. Please try again." });
    }

    console.log(`✅ Password reset email sent to: ${user.email}`);
    return res.json({ success: true });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to send reset email. Please try again." });
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
      .select("email, name, plan, is_pro, payment_id")
      .eq("email", decoded.email)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// =======================
// 🔄 CHECK PRO STATUS (re-sync from DB)
// =======================
app.get("/api/check-pro-status", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email, plan, is_pro")
      .eq("email", req.user.email)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ plan: data.plan, is_pro: data.is_pro === true });
  } catch (err) {
    console.error("check-pro-status error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 🔧 ADMIN: MANUALLY FIX PRO USERS
// (for users who paid but weren't upgraded)
// =======================
app.post("/api/admin/fix-pro", async (req, res) => {
  const { adminKey, email } = req.body;

  // Simple secret gate — set ADMIN_SECRET in .env
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!email) {
    return res.status(400).json({ error: "email required" });
  }

  try {
    const { error } = await supabase
      .from("users")
      .update({ plan: "PRO", is_pro: true })
      .eq("email", email);

    if (error) throw error;

    console.log(`Admin manually upgraded ${email} to PRO`);
    res.json({ success: true, message: `${email} upgraded to PRO` });
  } catch (err) {
    console.error("Admin fix-pro error:", err);
    res.status(500).json({ error: err.message });
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


// ========================================================
// 📊 PHASE 2: MOCK RESULT & PROGRESS TRACKING APIs
// ========================================================

// 1️⃣ SAVE MOCK RESULT (PROTECTED)
app.post("/api/save-result", authMiddleware, async (req, res) => {
  try {
    const {
      mock_id,
      mock_title,
      score,
      total_questions,
      correct,
      wrong,
      skipped,
      time_taken,
      subject,
      difficulty
    } = req.body;

    // user_id from JWT — never trust the frontend body
    const user_id = req.user.id || req.user.userId;

    if (!user_id || !mock_id || score === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("mock_results")
      .insert([{
        user_id,
        mock_id,
        mock_title,
        score,
        total_questions,
        correct,
        wrong,
        skipped,
        time_taken,
        subject,
        difficulty
      }])
      .select();

    if (error) throw error;

    // Update aggregated user_stats table
    await updateUserStats(user_id);

    res.json({ success: true, data: data[0] });

  } catch (error) {
    console.error("Save result error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2️⃣ GET USER PROGRESS — all attempts (PROTECTED)
app.get("/api/user-progress/:user_id", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId; // Always from JWT
    const { limit = 50 } = req.query;

    const { data, error } = await supabase
      .from("mock_results")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    res.json({ success: true, data });

  } catch (error) {
    console.error("Progress fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3️⃣ GET USER STATISTICS (PROTECTED)
app.get("/api/user-stats/:user_id", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId;

    const { data: results, error } = await supabase
      .from("mock_results")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    if (!results || results.length === 0) {
      return res.json({
        success: true,
        stats: {
          total_attempts: 0,
          best_score: 0,
          avg_score: "0.00",
          total_correct: 0,
          total_wrong: 0,
          accuracy: "0.00",
          improvement: 0,
          recent_trend: "insufficient_data"
        }
      });
    }

    const totalQuestionsAll = results.reduce((sum, r) => sum + (r.total_questions || 0), 0);
    const totalCorrectAll = results.reduce((sum, r) => sum + (r.correct || 0), 0);

    const stats = {
      total_attempts: results.length,
      best_score: Math.max(...results.map(r => r.score)),
      worst_score: Math.min(...results.map(r => r.score)),
      avg_score: (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2),
      total_correct: totalCorrectAll,
      total_wrong: results.reduce((sum, r) => sum + (r.wrong || 0), 0),
      accuracy: totalQuestionsAll > 0
        ? ((totalCorrectAll / totalQuestionsAll) * 100).toFixed(2)
        : "0.00",
      improvement: calculateImprovement(results),
      recent_trend: getRecentTrend(results)
    };

    res.json({ success: true, stats });

  } catch (error) {
    console.error("Stats fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4️⃣ GET SUBJECT-WISE PERFORMANCE (PROTECTED)
app.get("/api/subject-performance/:user_id", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId;

    const { data, error } = await supabase
      .from("mock_results")
      .select("subject, score, correct, total_questions")
      .eq("user_id", user_id);

    if (error) throw error;

    const subjectStats = {};
    data.forEach(result => {
      const subject = result.subject || "General";
      if (!subjectStats[subject]) {
        subjectStats[subject] = { attempts: 0, total_score: 0, total_correct: 0, total_questions: 0 };
      }
      subjectStats[subject].attempts++;
      subjectStats[subject].total_score += result.score || 0;
      subjectStats[subject].total_correct += result.correct || 0;
      subjectStats[subject].total_questions += result.total_questions || 0;
    });

    const performance = Object.entries(subjectStats).map(([subject, stats]) => ({
      subject,
      attempts: stats.attempts,
      avg_score: stats.attempts > 0 ? (stats.total_score / stats.attempts).toFixed(2) : "0.00",
      accuracy: stats.total_questions > 0
        ? ((stats.total_correct / stats.total_questions) * 100).toFixed(2)
        : "0.00"
    }));

    res.json({ success: true, performance });

  } catch (error) {
    console.error("Subject performance error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ── Helper: Upsert aggregated user_stats ────────────────
async function updateUserStats(user_id) {
  try {
    const { data } = await supabase
      .from("mock_results")
      .select("score, correct, total_questions")
      .eq("user_id", user_id);

    if (!data || data.length === 0) return;

    const stats = {
      user_id,
      total_mocks: data.length,
      best_score: Math.max(...data.map(r => r.score)),
      avg_score: parseFloat((data.reduce((sum, r) => sum + r.score, 0) / data.length).toFixed(2)),
      total_correct: data.reduce((sum, r) => sum + (r.correct || 0), 0),
      total_questions: data.reduce((sum, r) => sum + (r.total_questions || 0), 0)
    };

    await supabase.from("user_stats").upsert([stats], { onConflict: "user_id" });
  } catch (err) {
    console.error("updateUserStats error:", err);
  }
}

// ── Helper: Improvement % ────────────────────────────────
function calculateImprovement(results) {
  if (results.length < 2) return 0;
  const sorted = [...results].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const first = sorted[0].score;
  const last = sorted[sorted.length - 1].score;
  if (first === 0) return 0; // ✅ Fix division-by-zero
  return parseFloat(((last - first) / first * 100).toFixed(2));
}

// ── Helper: Recent trend (last 5 vs prior 5) ─────────────
function getRecentTrend(results) {
  if (results.length < 2) return "insufficient_data";
  const sorted = [...results].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const recent = sorted.slice(0, 5);
  const older = sorted.slice(5, 10);
  if (older.length === 0) return "insufficient_data";

  const avgRecent = recent.reduce((sum, r) => sum + r.score, 0) / recent.length;
  const avgOlder = older.reduce((sum, r) => sum + r.score, 0) / older.length;

  if (avgRecent > avgOlder + 5) return "improving";
  if (avgRecent < avgOlder - 5) return "declining";
  return "stable";
}

// ========================================================

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
