import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Ensure environment variables from server/.env are loaded before PrismaClient initializes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Global singleton to prevent multiple Prisma Client instances in dev/reloads
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Executes a database query with a timeout for fast fallback in dev/test
 */
export async function safeDbQuery(queryFn, timeoutMs = 800) {
  try {
    return await Promise.race([
      queryFn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('DB_TIMEOUT')), timeoutMs)
      )
    ]);
  } catch {
    return null;
  }
}

export default prisma;


