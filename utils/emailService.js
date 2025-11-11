const { Resend } = require('resend');

// Create Resend client using your Railway environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Send OTP email
const sendOTPEmail = async (email, otp, userName, userRole) => {
  try {
    console.log("📧 Sending email using Resend...");

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM, 
      to: email,
      subject: '🔐 Your CAMPUS DROP Login OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: Arial, sans-serif; background:#f4f7fa; padding:20px; }
            .card {
              max-width:600px; margin:auto; background:white; 
              border-radius:12px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.1);
            }
            h2 { color:#1e3a8a; }
            .otp-box {
              font-size:36px; font-weight:bold; letter-spacing:10px;
              padding:20px; border:2px solid #3b82f6; 
              border-radius:10px; background:#eff6ff; text-align:center;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🔐 CAMPUS DROP</h2>
            <p>Hello <strong>${userName}</strong> (${userRole}),</p>
            <p>Your One-Time Password (OTP) is:</p>

            <div class="otp-box">${otp}</div>

            <p>Valid for <strong>60 seconds</strong>.</p>
            <p><strong>Do not share this code with anyone.</strong></p>

            <p style="margin-top:30px; font-size:12px; color:#6b7280;">
              This is an automated email from CAMPUS DROP. Do not reply.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ OTP Email sent successfully:", result.id);
    return { success: true, messageId: result.id };

  } catch (error) {
    console.error("❌ Resend Email Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendOTPEmail };
