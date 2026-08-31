import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@portfolio.local').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@2026!';

  if (!email || !password) {
    console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD must be configured.');
    process.exit(1);
  }

  console.log(`Setting up admin account for: ${email} ...`);

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash }
    });

    console.log(`✅ Admin account successfully created/updated (ID: ${admin.id})`);
  } catch (err) {
    console.error('Database error during admin bootstrap:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
