# Local Development & Migration Setup Guide

Follow this step-by-step guide to clone, configure, and run the Jagmohan Portfolio V2 repository on any computer.

---

## 1. Prerequisites

Ensure you have the following installed:
- **Git** (`git --version`)
- **Node.js**: v18.x or v20.x or v22.x (`node --version`)
- **npm**: v9.x or v10.x (`npm --version`)
- **PostgreSQL Database** (optional locally; in-memory fallback stores are active during development/offline mode).

---

## 2. Clone and Branch Checkout

```bash
git clone https://github.com/jattiphrswan/Jagmohan-portfolio.git
cd "Jagmohan-portfolio"
git checkout portfolio-v2
```

---

## 3. Install Dependencies

Install root (frontend) and server (backend) dependencies:

```bash
# 1. Install frontend packages
npm install

# 2. Install backend packages
cd server
npm install
cd ..
```

---

## 4. Configure Backend Environment

Copy the example environment file in the `server/` folder:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:

```bash
# Server Port & Environment
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Connection (Neon / local PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio?schema=public"

# Admin Authentication
JWT_SECRET="dev-super-secure-jwt-secret-key-2026"
ADMIN_EMAIL="admin@portfolio.local"
ADMIN_PASSWORD="Admin@2026!"

# Optional Persistent Cloud Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Gmail Contact Form Configuration
GMAIL_USER=
GMAIL_APP_PASSWORD=
CONTACT_TO_EMAIL=
CONTACT_FROM_NAME="Jagmohan Portfolio"
```

---

## 5. Initialize Prisma

```bash
cd server
npx prisma validate
npx prisma generate
cd ..
```

---

## 6. Running the Application

### Option A: Running with npm scripts
```bash
# Terminal 1: Start Backend API (Port 5000)
npm run server

# Terminal 2: Start Frontend (Port 5173)
npm run dev
```

### Option B: Running individually
```bash
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
npm run dev
```

---

## 7. Verifying Endpoints & URLs

- **Public Portfolio**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5173/admin/login`
  - Default Local Dev Login: `admin@portfolio.local` / `Admin@2026!`
- **Backend Health Check**: `http://localhost:5000/api/health`

---

## 8. Troubleshooting

### Port 5000 in Use
If port 5000 is occupied by another process:
- On Windows: `netstat -ano | findstr :5000` then `taskkill /F /PID <PID>`
- Or change `PORT=5001` in `server/.env` and `VITE_API_URL=http://localhost:5001` in frontend `.env`.

### Prisma `EPERM` on Windows
If `npx prisma generate` throws an `EPERM` file lock error on Windows, stop any running backend Node processes first, then re-run `npx prisma generate`.

### Missing Gmail Credentials
If `GMAIL_USER` and `GMAIL_APP_PASSWORD` are not configured in `server/.env`, the contact form endpoint will return HTTP 503 (Service Unavailable) in development mode, while simulated success is returned during automated test runs.
