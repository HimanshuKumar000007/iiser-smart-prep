const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendResetEmail(toEmail, resetToken) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;

  const mailOptions = {
    from: `"IISER Prep AI" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your IISER Prep AI password",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset your password</title>
</head>
<body style="margin:0; padding:0; background:#f4f6fb; font-family: Inter, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        
        <!-- CARD -->
        <table width="100%" max-width="520" cellpadding="0" cellspacing="0"
          style="max-width:520px; background:#ffffff; border-radius:14px; box-shadow:0 12px 30px rgba(0,0,0,0.08); overflow:hidden;">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#6366f1); padding:24px; text-align:center;">
              <img src="https://i.ibb.co/4V4L6QZ/lock.png" width="42" style="margin-bottom:10px"/>
              <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:700;">
                IISER Prep AI
              </h1>
              <p style="margin:6px 0 0; color:#e0e7ff; font-size:14px;">
                Secure Account Recovery
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px; font-size:22px; color:#111827;">
                Reset your password
              </h2>

              <p style="margin:0 0 18px; color:#4b5563; font-size:15px; line-height:1.6;">
                We received a request to reset your IISER Prep AI password.
                Click the button below to choose a new one.
              </p>

              <!-- CTA -->
              <a href="${resetLink}"
                style="display:inline-block; padding:14px 26px; background:#4f46e5;
                color:#ffffff; text-decoration:none; font-weight:600;
                border-radius:10px; font-size:15px;">
                Reset Password
              </a>

              <p style="margin:22px 0 8px; font-size:13px; color:#6b7280;">
                ⏳ This link expires in <strong>15 minutes</strong>
              </p>

              <p style="margin:0; font-size:13px; color:#6b7280;">
                If you didn’t request this, you can safely ignore this email.
              </p>

              <!-- FALLBACK -->
              <p style="margin-top:24px; font-size:12px; color:#9ca3af;">
                Having trouble? Copy and paste this link into your browser:
                <br/>
                <span style="word-break:break-all;">${resetLink}</span>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb; padding:18px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#6b7280;">
                © 2026 IISER Prep AI • All rights reserved
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#9ca3af;">
                Need help? Contact <a href="mailto:support@iiserprep.ai" style="color:#4f46e5;">support@iiserprep.ai</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
