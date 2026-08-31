# Jagmohan Portfolio V2

A modern, full-stack personal portfolio website inspired by LinkedIn's UI/UX design system, backed by a Node/Express API, PostgreSQL with Prisma ORM, Cloudinary persistent media storage, and a Gmail SMTP enquiry system.

The application showcases authentic web development work with a public responsive frontend and a private, authenticated admin dashboard for managing projects, profile biography, career experience, technical skills, and verified certifications.

---

## Overview

- **Public Portfolio**: LinkedIn-inspired, clean card layout, sticky top navigation, profile banner, bio, services, tools catalogue, work experience timeline, skills breakdown, project showcase, verified certificate lightbox, and direct contact form.
- **Private Admin Dashboard**: Private email/password authentication (JWT in HTTP-only cookie), full CRUD for Projects, Profile, Experience, Skills, Certifications, and unified media management.
- **Zero Mock Data in Production**: All dynamic content is backed by PostgreSQL via Prisma ORM with resilient fallback stores during initial development/offline testing.
- **Direct Gmail Contact Workflow**: Enquiries submitted via the public contact form are validated server-side, rate-limited, protected with honeypot fields, and routed directly to the owner's Gmail inbox via Nodemailer SMTP with `Reply-To` set to the visitor's email. No contact messages or leads are persisted in the database.

---

## Technology Stack

### Frontend
- **Framework**: React 19 (`^19.2.0`) + React DOM 19
- **Build Tool**: Vite / Rolldown-Vite (`^7.2.5`)
- **Routing**: React Router DOM v7 (`^7.18.2`)
- **Styling**: Tailwind CSS v3 (`^3.4.19`), PostCSS, Autoprefixer
- **Icons**: React Icons (`^5.5.0`) (Feather Icons `fi`, FontAwesome `fa`)

### Backend
- **Runtime**: Node.js (ES Modules, Node 18+)
- **Server Framework**: Express v4 (`^4.21.2`)
- **Database & ORM**: PostgreSQL + Prisma ORM v6 (`^6.4.1`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + HTTP-Only Cookie (`cookie-parser`) + `bcryptjs`
- **Security & Middleware**: Helmet v8, CORS, Express JSON (10MB limit), `express-rate-limit` v8
- **Media Storage**: Cloudinary integration API (via server-side credentials) + data URI resilience fallback
- **Email Delivery**: Nodemailer v9 via Gmail SMTP (`smtp.gmail.com`)

---

## Architecture

```
                    GitHub Repository
                           │
              ┌────────────┴────────────┐
              │                         │
           Vercel                     Render
       React 19 / Vite             Node / Express
      (Static Frontend)            (Backend API)
              │                         │
              └─────── REST API ────────┤
                                        │
                         ┌──────────────┼──────────────┐
                         │              │              │
                    PostgreSQL      Cloudinary       Gmail
                   (Neon / DB)        Media          SMTP
```

- **Public Reads**: Public visitors load static UI from Vercel; pages consume live backend endpoints (`/api/profile`, `/api/projects`, `/api/certifications`).
- **Admin Writes**: Authenticated admin updates profile, projects, experience, skills, and certifications via protected `/api/admin/*` endpoints.
- **Persistent Media**: Images uploaded in the admin portal pass through the authenticated backend to Cloudinary and return persistent public URLs stored in PostgreSQL.
- **Contact Enquiries**: Public contact submissions to `POST /api/contact` are validated and dispatched directly to the portfolio owner's Gmail without database persistence.

---

## Public Routes

| Route | Description |
| :--- | :--- |
| `/` | Main profile overview (headline, about, services, tools, highlights) |
| `/about` | Detailed about biography, philosophy, and background |
| `/experience` | Chronological career history, roles, and accomplishments |
| `/skills` | Categorized technical competencies and tools catalogue |
| `/projects` | Portfolio projects showcase with category filters |
| `/projects/:slug` | In-depth case study and architectural overview for a project |
| `/certifications` | Verified licenses, credentials, and interactive image lightbox |
| `/contact` | Direct contact cards and Gmail enquiry submission form |

---

## Admin Routes (Protected)

| Route | Description |
| :--- | :--- |
| `/admin/login` | Private admin login (email + password) |
| `/admin` | Admin Dashboard hub with navigation to all management modules |
| `/admin/profile` | Profile editor (headline, bio, contact details, services, avatar/banner) |
| `/admin/projects` | Projects catalogue table with featured/ordering toggles and delete modal |
| `/admin/projects/new` | Create new portfolio project with image upload |
| `/admin/projects/:id/edit` | Edit existing project details, slug, technologies, and showcase image |
| `/admin/experience` | Work history list with display ordering and delete actions |
| `/admin/experience/new` | Add work experience record |
| `/admin/experience/:id/edit` | Edit existing work experience |
| `/admin/skills` | Technical skills management table and modal/inline editor |
| `/admin/certifications` | Certifications table with image preview, credential links, and delete modal |
| `/admin/certifications/new` | Add verified certificate with media upload |
| `/admin/certifications/:id/edit` | Edit certificate name, issuer, image, date, and verification URL |

*All `/admin/*` routes except `/admin/login` require active session authentication verified via HTTP-only JWT cookie.*

---

## Environment Variables

### Frontend (`.env` / Vercel Environment)
```bash
VITE_API_URL=http://localhost:5000   # Backend API base URL in development / production Render URL
```

### Backend (`server/.env` / Render Environment)
```bash
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Connection (PostgreSQL + Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

# Admin Authentication
JWT_SECRET="your-secure-jwt-secret"
ADMIN_EMAIL="admin@portfolio.local"
ADMIN_PASSWORD="Admin@2026!"

# Optional Persistent Cloud Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Gmail Contact Form Configuration (N11)
GMAIL_USER=
GMAIL_APP_PASSWORD=
CONTACT_TO_EMAIL=
CONTACT_FROM_NAME="Jagmohan Portfolio"
```

---

## Local Development Setup

### 1. Clone and Checkout
```bash
git clone https://github.com/jattiphrswan/Jagmohan-portfolio.git
cd "Jagmohan-portfolio"
git checkout portfolio-v2
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Configure Backend Environment
Create `server/.env` based on `server/.env.example` and configure your PostgreSQL database URL and admin credentials.

### 4. Prisma Setup
```bash
cd server
npx prisma validate
npx prisma generate
cd ..
```

### 5. Run Development Servers
```bash
# Run backend server (Port 5000)
npm run server

# In a separate terminal, run frontend development server (Port 5173)
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/health`
- Admin Login: `http://localhost:5173/admin/login`

---

## Production Deployment Plan (Node N14)

- **Frontend**: Deployed to **Vercel** with continuous deployment from the `main` branch. Environment variable: `VITE_API_URL` pointing to Render backend.
- **Backend**: Deployed to **Render** web service from the `main` branch with root directory set to `server`. Build command: `npm install && npx prisma generate`, Start command: `node src/app.js`.
- **Database**: Managed PostgreSQL on **Neon** connected via Prisma connection pooling URL.
- **Media**: **Cloudinary** for persistent assets (free tier).
- **Email**: **Gmail SMTP** using Google App Passwords.

*Note: Production deployment is scheduled for Node N14 and has not yet been triggered.*

---

## Continuing Development With Another AI Assistant

To continue development seamlessly in a new session or with a new agent, supply the following prompt:

> "Read `README.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `STATUS.md`, `ARCHITECTURE.md`, and `SETUP.md`. Inspect the repository before editing. Confirm the current branch is `portfolio-v2` and the current node is `N13`. Follow the Graph Loop workflow, verify builds and tests, and never commit or push until verified."

---

## Current Status

- **Completed**: Nodes N0 through N11 (**PASS**)
- **Skipped by Design**: Node N12 (Admin Messages / Lead Inbox — enquiries route directly to Gmail without DB storage)
- **Current Ready Node**: **N13 — SEO + Performance + Accessibility**
