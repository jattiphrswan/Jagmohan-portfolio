# Roadmap — Jagmohan Portfolio V2

This document outlines the complete node-by-node roadmap from initial audit through production launch.

---

## Node Progression Table

| Node | Name | Purpose & Scope | Status |
| :--- | :--- | :--- | :--- |
| **N0** | Current Project Audit | Baseline audit of repository, dependencies, build integrity, and clean state. | **PASS** ✅ |
| **N1** | Multi-Page Routing | React Router v7 structure (`/`, `/about`, `/experience`, `/skills`, `/projects`, `/contact`). | **PASS** ✅ |
| **N2** | LinkedIn UI System | Layout, header search, profile cards, typography, and LinkedIn aesthetics. | **PASS** ✅ |
| **N3** | Backend Foundation | Express backend foundation, CORS, Helmet security, and `/api/health`. | **PASS** ✅ |
| **N4** | PostgreSQL + Prisma | Prisma ORM integration, schema foundation, and resilient database queries. | **PASS** ✅ |
| **N5** | Public Profile Pages | Dynamic About, Experience, Skills, and Contact page data presentation. | **PASS** ✅ |
| **N6** | Projects + Details | Projects catalogue grid, slug routing (`/projects/:slug`), and case study views. | **PASS** ✅ |
| **N7** | Admin Authentication | Private admin login (`/admin/login`), JWT in HTTP-only cookies, `requireAuth` middleware. | **PASS** ✅ |
| **N8** | Project CRUD | Admin project management (`/admin/projects`, `/new`, `/edit`), featured/ordering toggles. | **PASS** ✅ |
| **N9** | Profile / Exp / Skills CRUD | Admin CRUD for Profile Bio, Work History (`/admin/experience`), and Skills catalogue. | **PASS** ✅ |
| **N10** | Media + Certifications | Media upload API, Cloudinary integration, Certifications CRUD & public lightbox. | **PASS** ✅ |
| **N11** | Gmail Contact Form | Public contact form, Nodemailer Gmail SMTP, Reply-To visitor, honeypot & rate limit. | **PASS** ✅ |
| **N12** | Admin Messages / Inbox | **SKIPPED BY DESIGN** — Visitor enquiries route directly to Gmail without DB persistence. | **SKIPPED** ⏭️ |
| **N13** | SEO + Performance | Meta tags, OpenGraph, dynamic titles, sitemap, AEO, accessibility, favicon. | **READY** 🎯 |
| **N14** | Production Deployment | Vercel (frontend), Render (backend), Neon (PostgreSQL), Cloudinary, Gmail SMTP. | **BLOCKED** |
| **N15** | Final Regression Testing | End-to-end verification of all public and admin user flows in production. | **BLOCKED** |

---

## Detailed Node Deliverables

### N0 — Project Audit (PASS)
- Verified clean repository state, package scripts, and dependencies.

### N1 — React Router + Multi-Page Routing (PASS)
- Multi-page client architecture with clean URL routing for all core portfolio sections.

### N2 — LinkedIn UI System (PASS)
- Reusable `SectionCard`, responsive LinkedIn-themed layout, and sticky navigation.

### N3 — Backend Foundation (PASS)
- Express server, JSON parsing, security headers (Helmet), CORS configuration, and health check endpoint.

### N4 — PostgreSQL + Prisma Setup (PASS)
- Initialized Prisma ORM with PostgreSQL provider and connection error fallback architecture.

### N5 — Public Profile Pages (PASS)
- Public routes displaying comprehensive bio, career timeline, skills tags, and contact links.

### N6 — Projects & Project Detail Views (PASS)
- Grid showcase for projects with category filtering, technology badges, and full slug-based detail case studies.

### N7 — Admin Authentication (PASS)
- Secure email/password login, JWT tokens stored in HTTP-only cookies, `requireAuth` middleware, and `useAuth()` hook.

### N8 — Project CRUD (PASS)
- Full admin CRUD interface for portfolio projects with slug generation, order control, and deletion confirmation modal.

### N9 — Profile, Experience & Skills CRUD (PASS)
- Dynamic editing for profile bio, services, tools, career history entries, and technical skill categories via `useProfile()` synchronization.

### N10 — Media Management & Certifications (PASS)
- Production-ready media upload endpoint, Cloudinary configuration support, reusable `MediaUpload` component, full Certifications CRUD, and public certificate cards with interactive lightbox modal.

### N11 — Gmail Contact Form (PASS)
- Public contact form with server-side validation, honeypot bot trap, rate limiting, and Nodemailer Gmail SMTP routing directly to the owner's inbox with visitor Reply-To. Zero database message persistence by design.

### N12 — Admin Messages / Lead Inbox (SKIPPED BY DESIGN)
- Intentionally skipped because contact enquiries are handled directly in Gmail, keeping backend lightweight with no database message storage.

### N13 — SEO, Performance & Accessibility (READY)
- Structured metadata, OpenGraph cards, JSON-LD schema, responsive accessibility, performance audits, and favicon.

### N14 — Production Deployment (UPCOMING)
- Vercel frontend deployment, Render backend deployment, Neon database connection, and production environment secrets.

### N15 — Final Regression Testing (UPCOMING)
- Final end-to-end audit across public pages, admin features, contact delivery, and cross-browser responsiveness.
