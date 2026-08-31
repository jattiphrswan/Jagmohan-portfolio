import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-jwt-key-jagmohan-portfolio-n7';

/**
 * Authentication middleware to verify JWT token from HttpOnly cookie or Authorization header
 */
export function requireAuth(req, res, next) {
  try {
    let token = req.cookies?.auth_token;

    // Optional header fallback for testing / API clients
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.'
    });
  }
}
