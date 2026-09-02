import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { sendContactEmail, isMailConfigured } from '../services/mailer.js';

const router = Router();

// Focused Rate Limiter: 5 submissions per 15 minutes per IP (disabled during automated test runs)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    success: false,
    message: 'Too many contact requests from this IP. Please wait a few minutes before trying again.'
  }
});


// Simple regex for standard email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/contact
 * Public contact form submission endpoint
 */
router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      message,
      website, // Honeypot field 1
      _gotcha  // Honeypot field 2
    } = req.body || {};

    // 1. Honeypot Bot Trap: If hidden bot fields are populated, return silent success
    if (website || _gotcha) {
      return res.status(200).json({
        success: true,
        message: "Thanks! Your message has been sent. I'll get back to you soon."
      });
    }

    // 2. Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid name between 2 and 100 characters.'
      });
    }

    // Prevent header injection in name
    if (/[\r\n]/.test(name)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid characters in name.'
      });
    }

    // 3. Validate Email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // 4. Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 3000) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message between 10 and 3,000 characters.'
      });
    }

    // 5. Optional Fields Validation
    if (phone && (typeof phone !== 'string' || phone.trim().length > 30)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number cannot exceed 30 characters.'
      });
    }

    if (company && (typeof company !== 'string' || company.trim().length > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Company name cannot exceed 100 characters.'
      });
    }

    if (projectType && (typeof projectType !== 'string' || projectType.trim().length > 100 || /[\r\n]/.test(projectType))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project type selection.'
      });
    }

    if (budget && (typeof budget !== 'string' || budget.trim().length > 50)) {
      return res.status(400).json({
        success: false,
        message: 'Budget description is too long.'
      });
    }

    // 6. Check if Mail Transport is configured
    if (!isMailConfigured()) {
      // In automated tests without explicit unconfigured check, simulate successful send
      if (process.env.NODE_ENV === 'test' && !req.headers['x-test-unconfigured']) {
        return res.status(200).json({
          success: true,
          message: "Thanks! Your message has been sent. I'll get back to you soon.",
          simulated: true
        });
      }

      console.warn('[CONTACT API] Resend credentials (RESEND_API_KEY) are not configured.');
      return res.status(503).json({
        success: false,
        message: 'Contact email service is temporarily unconfigured on this server.'
      });
    }


    // 7. Dispatch Email via Resend HTTPS API
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      company: company ? company.trim() : '',
      projectType: projectType ? projectType.trim() : '',
      budget: budget ? budget.trim() : '',
      message: message.trim()
    });

    return res.status(200).json({
      success: true,
      message: "Thanks! Your message has been sent. I'll get back to you soon."
    });
  } catch (err) {
    console.error('[CONTACT API ERROR]', err.code ? `[${err.code}] ${err.message}` : (err.message || err));
    return res.status(500).json({
      success: false,
      message: 'Message could not be sent right now. Please try again shortly.'
    });
  }
});

export default router;
