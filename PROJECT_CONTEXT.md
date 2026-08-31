# Jagmohan Portfolio V2 — Project Context

This document serves as the primary technical context and source of truth for developers and AI assistants working on this codebase.

---

## 1. Repository Information

- **Repository**: `jattiphrswan/Jagmohan-portfolio`
- **Development Branch**: `portfolio-v2` (all development and testing occurs here)
- **Production / Stable Branch**: `main` (only verified, fully tested nodes are merged here)
- **Workflow Rule**: Never develop directly on `main`. Always work on `portfolio-v2`, verify locally, commit, push, fast-forward merge to `main`, verify `main`, push `main`, and return to `portfolio-v2`.

---

## 2. Portfolio Owner & Project Purpose

- **Owner**: Jagmohan Singh
- **Profession**: Senior Front-End Engineer & WordPress / WooCommerce Developer
- **Purpose**: Professional showcase of authentic client websites, custom React applications, theme architectures, and certified skills.
- **Rule of Authenticity**: Do **NOT** invent fake projects, fake credentials, fake companies, or fabricated statistics. Use only verified owner data.

---

## 3. Product Architecture

### Public Website
- LinkedIn-inspired professional layout
- Multi-page routing: Home (`/`), About (`/about`), Experience (`/experience`), Skills (`/skills`), Projects (`/projects`), Project Details (`/projects/:slug`), Certifications (`/certifications`), Contact (`/contact`)
- Responsive across mobile (390px/430px), tablet (768px/1024px), and desktop (1366px/1440px/1920px)

### Private Admin Portal
- Private login (`/admin/login`)
- Dashboard overview (`/admin`)
- Profile & Bio management (`/admin/profile`)
- Project CRUD (`/admin/projects`, `/admin/projects/new`, `/admin/projects/:id/edit`)
- Work Experience CRUD (`/admin/experience`, `/admin/experience/new`, `/admin/experience/:id/edit`)
- Technical Skills CRUD (`/admin/skills`)
- Certifications CRUD (`/admin/certifications`, `/admin/certifications/new`, `/admin/certifications/:id/edit`)
- Reusable Media Upload component (`MediaUpload.jsx`) for persistent cloud imagery

### Contact System
- Direct Gmail SMTP dispatch via Nodemailer to owner's inbox (`jattiphrswan49@gmail.com`)
- Visitor email set as `Reply-To`
- **CRITICAL**: No contact messages are saved to PostgreSQL or files. Zero database message persistence by design.

---

## 4. Production Deployment Architecture (N14)

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

- **Frontend Hosting**: **Vercel** (Vite SPA deployment with rewrite rules for client routing)
- **Backend Hosting**: **Render** (Node/Express web service). Render backend may cold-start after idle periods; frontend handles loading states cleanly.
- **Database**: **Neon** managed PostgreSQL instance connected through Prisma ORM.
- **Media Storage**: **Cloudinary** for persistent images (avatars, banners, project screenshots, certificates).
- **Email Delivery**: **Gmail SMTP** (`smtp.gmail.com` port 465) using Google App Passwords.

---

## 5. Security & Secret Management

- **NEVER** commit `.env` files, `DATABASE_URL`, JWT secrets, Cloudinary secrets, or Gmail App Passwords.
- `.env` must remain strictly listed in `.gitignore`.
- `.env.example` must contain **only placeholder variable names** and zero actual credentials.
- Backend APIs enforcing mutation (`/api/admin/*`) must validate authentication server-side via the `requireAuth` middleware.

---

## 6. Graph Loop Development Workflow

For every roadmap node, strictly follow the Graph Loop:

```
INSPECT (Check codebase & status)
   ↓
PLAN (Verify requirements & dependencies)
   ↓
IMPLEMENT (Write server/client code)
   ↓
VALIDATE (Run test suites & checks)
   ↓
LINT (npm run lint -> 0 errors)
   ↓
BUILD (npm run build -> PASS)
   ↓
RUNTIME TEST (Execute automated test scripts)
   ↓
GIT DIFF (Confirm no secrets or unintended changes)
   ↓
STATUS (Update STATUS.md and report to user)
```

If any check fails:
```
FAIL → ROOT CAUSE → FIX → RE-RUN LOOP
```

---

## 7. Current Project State

- **Current Branch**: `portfolio-v2`
- **Completed Nodes**: N0, N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, N11 (**PASS**)
- **Skipped Node**: N12 (**SKIPPED BY DESIGN** — Gmail-only direct enquiry workflow)
- **Active / Next Node**: **N13 — SEO + Performance + Accessibility**

---

## 8. Instructions for Future AI Assistants

When beginning work on this codebase in a new session:
1. Read `README.md`
2. Read `PROJECT_CONTEXT.md`
3. Read `ROADMAP.md`
4. Read `STATUS.md`
5. Read `ARCHITECTURE.md`
6. Read `SETUP.md`
7. Read `NODE_HISTORY.md`
8. Inspect the repository before editing.
9. Confirm the current branch (`portfolio-v2`) and current node (`N13`).
10. Work exclusively on the current READY node and follow the Graph Loop.
11. Never invent fake portfolio content, never commit secrets, and never push to `main` directly.

