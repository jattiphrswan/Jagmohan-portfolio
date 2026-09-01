import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-jwt-key-jagmohan-portfolio-n7';
const COOKIE_NAME = 'auth_token';

// In-memory fallback admin for local verification when database is in transition
const localFallbackAdmin = {
  id: 'admin-1',
  email: 'admin@portfolio.local',
  passwordHash: '$2b$10$5XD08d2OcE2z1YF6tFFhEeNqkpIgi5PoJILu.bXYFMPLvEVNZezZi'
};

/**
 * Cookie options helper supporting cross-site credentials in production HTTPS
 */
function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };
}

/**
 * POST /api/auth/login
 * Private admin login endpoint
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Look up admin in database
    let admin = null;
    try {
      if (prisma && prisma.admin) {
        admin = await prisma.admin.findUnique({
          where: { email: normalizedEmail }
        });
      }
    } catch {
      admin = null;
    }

    // Check fallback dev admin if database query returned null
    if (!admin && normalizedEmail === localFallbackAdmin.email) {
      admin = localFallbackAdmin;
    }

    if (!admin) {
      // Generic invalid credentials message to prevent email enumeration
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 2. Compare password with bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 3. Generate signed JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Set secure HttpOnly cookie with cross-site support
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/me
 * Protected endpoint to check session status
 */
router.get('/me', requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    admin: {
      id: req.admin.id,
      email: req.admin.email
    }
  });
});

/**
 * POST /api/auth/logout
 * Clear authentication cookie
 */
router.post('/logout', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
});

export default router;
