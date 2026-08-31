import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from server/.env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import healthRouter from './routes/health.js';
import profileRouter from './routes/profile.js';
import projectsRouter from './routes/projects.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ── Security & Core Middleware ──────────────────────────────
app.use(helmet());

// CORS configuration supporting single or comma-separated origins
const allowedOrigins = FRONTEND_URL.split(',').map((origin) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error('CORS request blocked by server policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Request Logger (Lightweight development log) ────────────
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} ${res.statusCode} -${duration}ms`);
    });
    next();
  });
}

// ── Mount API Routes ─────────────────────────────────────────
app.use('/api/health', healthRouter);
app.use('/api/profile', profileRouter);
app.use('/api/projects', projectsRouter);

// ── Error & 404 Handling ─────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`==============================================`);
    console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`💻 Allowed Frontend: ${allowedOrigins.join(', ')}`);
    console.log(`==============================================`);
  });
}

export default app;
