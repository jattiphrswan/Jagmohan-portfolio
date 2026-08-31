import nodemailer from 'nodemailer';

/**
 * HTML escape helper to prevent HTML injection in emails
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitize header strings (name, subject) to prevent header injection
 */
function sanitizeHeader(str = '') {
  return String(str).replace(/[\r\n]/g, ' ').trim();
}

/**
 * Check if Gmail SMTP credentials are configured
 */
export function isMailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

/**
 * Create reusable Nodemailer transport
 */
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465
    auth: {
      user,
      pass
    }
  });
}

/**
 * Send Contact Enquiry Email to Portfolio Owner
 */
export async function sendContactEmail({
  name,
  email,
  phone = '',
  company = '',
  projectType = '',
  budget = '',
  message
}) {
  const user = process.env.GMAIL_USER;
  const toEmail = process.env.CONTACT_TO_EMAIL || user || 'jattiphrswan49@gmail.com';
  const fromName = sanitizeHeader(process.env.CONTACT_FROM_NAME || 'Jagmohan Portfolio');
  const safeName = sanitizeHeader(name);
  const safeEmail = sanitizeHeader(email);
  const safeSubject = sanitizeHeader(
    projectType ? `New Portfolio Enquiry — ${projectType} — ${safeName}` : `New Portfolio Enquiry — ${safeName}`
  );

  const transporter = createTransporter();

  if (!transporter) {
    const err = new Error('GMAIL_NOT_CONFIGURED');
    err.code = 'GMAIL_NOT_CONFIGURED';
    throw err;
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Plain Text Version
  const textContent = `
New Portfolio Enquiry Received

From: ${safeName} (${safeEmail})
Phone: ${phone ? phone : 'Not provided'}
Company: ${company ? company : 'Not provided'}
Project Type: ${projectType ? projectType : 'General Inquiry'}
Budget: ${budget ? budget : 'Not specified'}
Submitted At: ${timestamp} IST

--------------------------------------------------
Message:
${message}
--------------------------------------------------

* Reply directly to this email to respond to ${safeName} (${safeEmail}).
`.trim();

  // Clean, Responsive Email HTML
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 20px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0a66c2; padding: 24px; color: #ffffff; }
    .header h2 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .field-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #0f172a; font-weight: 500; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; color: #334155; white-space: pre-wrap; word-break: break-word; }
    .footer { padding: 16px 24px; background: #f1f5f9; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Portfolio Enquiry</h2>
      <p>Submitted via Jagmohan Portfolio Contact Form</p>
    </div>
    <div class="content">
      <div class="field-group">
        <div class="field-label">Sender Name</div>
        <div class="field-value">${escapeHtml(safeName)}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Email Address (Reply-To)</div>
        <div class="field-value"><a href="mailto:${escapeHtml(safeEmail)}" style="color: #0a66c2;">${escapeHtml(safeEmail)}</a></div>
      </div>
      ${phone ? `
      <div class="field-group">
        <div class="field-label">Phone Number</div>
        <div class="field-value">${escapeHtml(phone)}</div>
      </div>` : ''}
      ${company ? `
      <div class="field-group">
        <div class="field-label">Company / Organization</div>
        <div class="field-value">${escapeHtml(company)}</div>
      </div>` : ''}
      ${projectType ? `
      <div class="field-group">
        <div class="field-label">Project Type</div>
        <div class="field-value">${escapeHtml(projectType)}</div>
      </div>` : ''}
      ${budget ? `
      <div class="field-group">
        <div class="field-label">Estimated Budget</div>
        <div class="field-value">${escapeHtml(budget)}</div>
      </div>` : ''}
      <div style="margin-top: 20px;">
        <div class="field-label">Message Content</div>
        <div class="message-box">${escapeHtml(message)}</div>
      </div>
    </div>
    <div class="footer">
      Hit <strong>Reply</strong> to respond directly to ${escapeHtml(safeName)} (${escapeHtml(safeEmail)}).<br>
      Received on ${escapeHtml(timestamp)} IST.
    </div>
  </div>
</body>
</html>
`.trim();

  const mailOptions = {
    from: `"${fromName}" <${user}>`,
    to: toEmail,
    replyTo: `"${safeName}" <${safeEmail}>`,
    subject: safeSubject,
    text: textContent,
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  return {
    success: true,
    messageId: info.messageId
  };
}
