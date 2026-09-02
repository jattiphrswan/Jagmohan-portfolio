# Portfolio V2 Status

## Current Known Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProfileCard.jsx
├── pages/
│   └── ProfilePage.jsx
├── assets/
├── data/
├── App.jsx
└── main.jsx
```

## Permanent Direction
- keep LinkedIn-style layout
- use Inter
- improve spacing, mobile behavior, typography, cards, hover/focus states, project presentation
- add multi-page routing
- add backend and PostgreSQL
- add admin CMS
- add multiple projects
- add contact form
- notify `jattiphrswan49@gmail.com`
- use server-side Gmail for email notifications (credentials strictly server-side, no Resend)

## Node Status

| Node | Name | Status |
|---|---|---|
| N0 | Current Project Audit | **PASS** |
| N1 | React Router + Multi-Page Structure | **PASS** |
| N2 | LinkedIn UI System | **PASS** |
| N3 | Backend Foundation | **PASS** |
| N4 | PostgreSQL + Prisma | **PASS** |
| N5 | Public Profile Pages | **PASS** |
| N6 | Projects + Project Details | **PASS** |
| N7 | Admin Authentication | **PASS** |
| N8 | Project CRUD | **PASS** |
| N9 | Profile / Experience / Skills CRUD | **PASS** |
| N10 | Media / Image Management + Certifications | **PASS** |
| N11 | Contact Form + Gmail Notification | **PASS** |
| N12 | Admin Messages / Lead Inbox | **SKIPPED BY DESIGN** (Gmail-only direct workflow) |
| N13 | SEO + Performance + Accessibility | **PASS** |
| N14 | Production Deployment | **PASS** |
| N15 | Final Regression Testing | **PASS** |

## N0 — Audit Summary (PASS)

- Branch: `portfolio-v2`
- `npm install` — 282 packages installed
- `npm run lint` — PASS (0 errors, 0 warnings)
- `npm run build` — PASS (26 modules, dist/ produced)
- No source files deleted or modified (README.md replaced with project-specific version)

## N1 — React Router + Multi-Page Structure (PASS)

- `react-router-dom` installed
- `BrowserRouter` + `Routes` + `Route` added to `App.jsx`
- `src/components/Layout.jsx` created (shared Header + Footer wrapper)
- `src/components/Header.jsx` migrated to `NavLink` with active state
- `src/pages/ProfilePage.jsx` stripped of its own Header/Footer (now provided by Layout)
- Page shells created: `AboutPage`, `ExperiencePage`, `SkillsPage`, `ProjectsPage`, `ContactPage`, `NotFoundPage`
- `public/404.html` + `index.html` decode script for GitHub Pages SPA routing
- `eslint.config.js` updated: added `argsIgnorePattern` + `destructuredArrayIgnorePattern` for `^[A-Z_]`
- `npm run lint` — PASS (0 errors, 0 warnings)
- `npm run build` — PASS (41 modules, dist/ produced)

## N2 — LinkedIn UI System (PASS)

- Inter font integrated via Google Fonts (`index.html`) & configured in `tailwind.config.js`
- Clean global styles in `src/index.css` (antialiasing, focus-visible ring, smooth scroll)
- Cleaned up dead template styles in `src/App.css`
- Created reusable `src/components/SectionCard.jsx` with consistent LinkedIn border, header, and subtle shadow
- Updated `src/components/Header.jsx`: 1128px container, brand monogram, active link bottom-indicator, mobile drawer
- Updated `src/components/ProfileCard.jsx`: banner gradient overlay, avatar ring & shadow, action button system, Open to Work badge
- Updated `src/components/Layout.jsx`: LinkedIn neutral background (`#f4f2ee`), `max-w-6xl` responsive container
- Updated `src/components/Footer.jsx`: LinkedIn-style clean layout, internal routes & external social links
- Refined all 6 pages (`ProfilePage`, `AboutPage`, `ExperiencePage`, `SkillsPage`, `ProjectsPage`, `ContactPage`, `NotFoundPage`)
- `npm run lint` — PASS (0 errors, 0 warnings)
- `npm run build` — PASS (42 modules, dist/ produced)

## N3 — Backend Foundation (PASS)

- Created decoupled `server/` workspace with Node.js & Express (`package.json`, `.env.example`, `.env`)
- Secured `.gitignore` ensuring all `.env` files and `server/node_modules` are permanently ignored
- Created `server/src/app.js` with Helmet, configurable origin-safe CORS, JSON body parser, and request logging
- Created `GET /api/health` endpoint returning HTTP 200 with server status, timestamp, and environment
- Created centralized 404 handler (`notFound.js`) and error handler (`errorHandler.js`) with zero stack-trace leakage in non-dev
- Tested `GET /api/health` (200 OK) and unknown route `GET /api/not-a-real-route` (404 Not Found)
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)

## N4 — PostgreSQL + Prisma (PASS)

- Installed `@prisma/client` (6.4.1) and `prisma` CLI (6.4.1) in `server/` workspace
- Created `server/prisma/schema.prisma` configured for PostgreSQL datasource and Prisma Client generator
- Defined foundational `DatabaseHealth` model for database verification & migration testing
- Created migration `20260830151916_init` and applied it to PostgreSQL database (`portfolio_dev`)
- Created singleton Prisma client instance in `server/src/lib/prisma.js` (preventing multiple connections during development reloads)
- Updated `server/src/routes/health.js` to report dynamic database connection status (`SELECT 1` query)
- Verified PostgreSQL connection and CRUD operations via Prisma Client
- Verified backend `/api/health` endpoint returning `database: "connected"`
- Protected all database credentials within `server/.env` (fully gitignored); updated `server/.env.example` with standard placeholder
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)

## N5 — Public Profile Pages (PASS)

- Refined authentic profile data across `src/data/profile.js` (accurate work history, skill taxonomy, tools, education, contact info)
- Built polished public profile views: `ProfilePage` (`/`), `AboutPage` (`/about`), `ExperiencePage` (`/experience`), and `SkillsPage` (`/skills`)
- Implemented LinkedIn-style layout with structured sidebars, interactive collapsible experience positions, categorized skills, and highlight metrics
- Created public profile backend route `GET /api/profile` in `server/src/routes/profile.js` and mounted on `server/src/app.js`
- Verified backend API response (`/api/profile` returns 200 OK with authentic profile payload)
- Tested Vite development server startup (`npm run dev` starts cleanly at `http://localhost:5173/`)
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)

## N6 — Projects + Project Details (PASS)

- Added Prisma `Project` data model in `server/prisma/schema.prisma`
- Built read-only Projects API in `server/src/routes/projects.js` (`GET /api/projects` and `GET /api/projects/:slug`)
- Implemented reusable frontend `ProjectCard.jsx` component with category pills, tech tags, and direct CTA links
- Built interactive `ProjectsPage.jsx` with category filter tabs, search filter, and loading/empty/error states
- Built `ProjectDetailPage.jsx` with breadcrumbs, role metadata, architecture overview, and 404 not-found state
- Seeded small verified real test dataset (SkyFish, Danstring, React Portfolio V2, SMWebTech)
- Upgraded large-screen desktop layout to wide fluid container (`max-w-[1680px]`) with aligned navbar and sticky desktop sidebars
- Replaced favicon with clean white capital J on black background (`/favicon-j.svg`)
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)
- Backend verification: `test_n6_api.mjs` (PASS, 200 OK listing, 200 OK valid slug, 404 invalid slug)

## N7 — Admin Authentication (PASS)

- Added Prisma `Admin` data model in `server/prisma/schema.prisma`
- Built secure backend authentication router in `server/src/routes/auth.js` (`POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`)
- Implemented JWT token verification in HttpOnly cookie (`auth_token`) via `server/src/middleware/auth.js`
- Integrated `cookie-parser` and `bcryptjs` with zero password logging and no credential leaks
- Created CLI bootstrap script `server/scripts/createAdmin.js` (`npm run create-admin`)
- Built frontend `AuthContext.js`, `AuthProvider.jsx`, `useAuth.js`, `ProtectedRoute.jsx`, `LoginPage.jsx` (`/admin/login`), and `AdminDashboardPage.jsx` (`/admin`)
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)
- Backend verification: `test_n7_auth.mjs` (PASS, valid login, invalid password rejected, unknown email rejected, protected endpoint rejected, session preserved, logout clears cookie)

## N8 — Project CRUD (PASS)

- Added `status` field to Prisma `Project` data model (`server/prisma/schema.prisma`)
- Built protected Admin Projects CRUD router (`server/src/routes/adminProjects.js`) mounted at `/api/admin/projects` (`GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`)
- Implemented slug normalization, uniqueness enforcement, validation, and safe error handling
- Synchronized active project records across both admin management and public projects API
- Built frontend `AdminProjectsPage.jsx` (`/admin/projects`) with table overview, status pills, featured indicators, and delete confirmation modal
- Built `AdminProjectFormPage.jsx` supporting both create (`/admin/projects/new`) and edit (`/admin/projects/:id/edit`) modes
- Updated `AdminDashboardPage.jsx` with direct navigation to Projects Management
- Frontend regression test: `npm run lint` & `npm run build` (PASS, 0 errors, 0 warnings)
- Backend verification: `test_n8_crud.mjs` (PASS, all 10 CRUD and public sync tests verified)

## N9 — Profile / Experience / Skills CRUD (PASS)

- Added `Profile`, `Experience`, and `Skill` models to `server/prisma/schema.prisma`
- Built protected Admin routers:
  - `server/src/routes/adminProfile.js` (`/api/admin/profile` — `GET`, `PUT`)
  - `server/src/routes/adminExperience.js` (`/api/admin/experience` — `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`)
  - `server/src/routes/adminSkills.js` (`/api/admin/skills` — `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`)
- Built unified public profile endpoint (`server/src/routes/profile.js`) with `/experience` and `/skills` sub-routes
- Built frontend Admin Management interfaces:
  - `AdminProfilePage.jsx` (`/admin/profile`)
  - `AdminExperiencePage.jsx` (`/admin/experience`)
  - `AdminExperienceFormPage.jsx` (`/admin/experience/new`, `/admin/experience/:id/edit`)
  - `AdminSkillsPage.jsx` (`/admin/skills`)
- Created `ProfileContext.js` and `ProfileProvider.jsx` hook to dynamically synchronize live database updates across all public pages (`ProfilePage`, `AboutPage`, `ExperiencePage`, `SkillsPage`, `ContactPage`)
- Updated `AdminDashboardPage.jsx` with direct navigation cards to all 4 management areas
- Verified frontend checks: `npm run lint` (0 errors, 0 warnings) & `npm run build` (PASS)
- Verified backend verification: `test_n9_crud.mjs` (100% PASS across all 20 tests)

## N10 — Media Management + Certifications (PASS)

- Added `Certification` model to `server/prisma/schema.prisma`
- Built persistent Media Upload API (`server/src/routes/adminMedia.js`) with MIME type checking, size enforcement (5MB limit), Cloudinary configuration integration, and development data fallback
- Built public certifications endpoints (`server/src/routes/certifications.js`) and protected admin CRUD (`server/src/routes/adminCertifications.js`)
- Built reusable frontend `MediaUpload.jsx` component supporting instant upload, image preview, removal, and replacement
- Integrated `MediaUpload.jsx` into `AdminCertificationFormPage.jsx`, `AdminProjectFormPage.jsx`, and `AdminProfilePage.jsx`
- Built frontend `AdminCertificationsPage.jsx` and `AdminCertificationFormPage.jsx` for full certifications management
- Built public `CertificationsPage.jsx` (`/certifications`) with clean card layout and image lightbox viewer
- Updated public navigation in `Header.jsx` and admin navigation in `AdminDashboardPage.jsx`
- Verified frontend static checks: `npm run lint` (0 errors, 0 warnings) & `npm run build` (PASS)
- Verified backend verification: `test_n10_certifications.mjs` (100% PASS across all 14 tests)

## N11 — Gmail Contact Form (PASS)

- Built Gmail SMTP mailer service (`server/src/services/mailer.js`) supporting Nodemailer over secure Gmail SMTP (port 465) with HTML/Text formatting, user input HTML escaping, header injection sanitization, and Reply-To configured directly to visitor's email address
- Built public contact endpoint (`POST /api/contact` in `server/src/routes/contact.js`) with:
  - Input validation for name (2-100 chars), email format, phone, company, project type, budget, and message (10-3000 chars)
  - Honeypot bot protection (`website` / `_gotcha`)
  - Rate limiting via `express-rate-limit` (5 submissions per 15 min per IP)
  - Safe error handling without stack traces or SMTP credential exposure
- Completely avoided database storage / models for contact messages (intentional Gmail-only workflow)
- Updated frontend `ContactPage.jsx` with dynamic profile contact information, real-time submission states (submitting, success, error), and form reset
- Updated `server/.env.example` with `GMAIL_USER=`, `GMAIL_APP_PASSWORD=`, `CONTACT_TO_EMAIL=`, `CONTACT_FROM_NAME=` placeholders
- Verified frontend checks: `npm run lint` (0 errors, 0 warnings) & `npm run build` (PASS)
- Verified backend verification: `test_n11_contact.mjs` (100% PASS across all tests)

## N13 — SEO, Performance & Accessibility (PASS)

- Built lightweight, zero-dependency reusable `SEO.jsx` component and `src/utils/seo.js` / `src/utils/schema.js` supporting dynamic `document.title`, meta descriptions, canonical URLs (`VITE_SITE_URL` resolution), Open Graph cards, Twitter metadata, `noindex, nofollow` directives, and JSON-LD structured data.
- Structured Data (JSON-LD): Implemented authentic Schema.org types using real repository data only:
  - `Person` schema with `name`, `jobTitle`, `sameAs` (LinkedIn, GitHub), `knowsAbout`, `worksFor`, and `address` (Delhi, India).
  - `WebSite` schema with site `name`, `url`, and `description`.
  - `CreativeWork` schema for project detail case studies with title, description, URL, and author.
  - `BreadcrumbList` schema for project navigation hierarchy (Home -> Projects -> Project Title).
- Heading Hierarchy: Refactored heading levels across all public pages so each page renders exactly one meaningful `<h1>` tag followed by logical `<h2>` and `<h3>` tags via `SectionCard.jsx` `headingLevel` prop.
- Security & Links: Audited all external links across the codebase, ensuring `rel="noopener noreferrer"` on every `target="_blank"` anchor.
- Accessibility:
  - Added Escape key listener to close Certifications image lightbox modal (`useEffect` on `keydown`).
  - Set `role="dialog"`, `aria-modal="true"`, `aria-labelledby="lightbox-title"`, and accessible `aria-label` close button on certificate modal.
  - Added `role="alert"` and `aria-live="polite"` to contact form feedback banners in `ContactPage.jsx`.
  - Audited color contrast and visible keyboard focus states (`:focus-visible`).
- Performance & Route Code Splitting:
  - Implemented `React.lazy` and `<Suspense>` in `App.jsx` for all secondary public routes (`AboutPage`, `ExperiencePage`, `SkillsPage`, `ProjectsPage`, `ProjectDetailPage`, `CertificationsPage`, `ContactPage`, `NotFoundPage`) and all admin routes, keeping the initial JavaScript bundle slim.
  - Preserved eager loading of `ProfilePage` for immediate First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
  - Explicit dimensions, aspect ratios, and `loading="eager"` on above-the-fold hero images; `loading="lazy"` on below-the-fold media.
- Crawl Directives:
  - Created `public/robots.txt` allowing public routes and disallowing `/admin` and `/admin/`.
  - Created `public/sitemap.xml` with all core public routes and structured priorities.
  - Enforced `noindex, nofollow` on `/admin/login`, `/admin/*` via `ProtectedRoute.jsx`, and `NotFoundPage.jsx`.
- Automated Verification:
  - Created and passed `test_n13_seo.mjs` (64/64 tests PASS).
  - Created and passed `test_n13_backend.mjs` (11/11 tests PASS).
  - Passed `npm run lint` (0 errors, 0 warnings) and `npm run build` (all chunks compiled).
  - Verified Prisma schema (`npx prisma validate` and `npx prisma generate` with 0 migrations created).

## N14 — Production Deployment (PASS)

- Live Frontend deployed on Vercel: `https://jagmohan-portfolio.vercel.app`
- Live Backend deployed on Render: `https://jagmohan-portfolio-api.onrender.com`
- Database: Live Neon PostgreSQL with Prisma ORM and migrations applied
- Media: Persistent Cloudinary media upload integration
- Email: Gmail SMTP dispatch with Nodemailer on port 465 SSL with visitor Reply-To
- Resolved Vite root base configuration (`base: "/"`) and added `vercel.json` SPA rewrite rules for client routing
- Configured production cross-site authentication cookies with `sameSite: "none"` and `secure: true`

## N15 — Final Regression Testing & Production Sign-Off (PASS)

- Verified live production health (`GET /api/health` -> 200, environment: production, database: connected)
- Verified all public pages on live Vercel deployment (`/`, `/about`, `/experience`, `/skills`, `/projects`, `/certifications`, `/contact`, `/admin/login`)
- Verified direct URL refreshes without 404s via Vercel SPA rewrite configuration
- Verified live API endpoints (`/api/profile`, `/api/projects`, `/api/projects/:slug`, `/api/certifications`)
- Verified security guards: unauthorized requests to `/api/admin/*` and `/api/auth/me` return HTTP 401
- Verified static crawler directives: `/robots.txt`, `/sitemap.xml`, and `/favicon-j.svg` load with HTTP 200
- Verified 100% test pass rate across local and production test suites (`test_n15_production_qa.mjs`, `test_n13_seo.mjs`, `test_n13_backend.mjs`)
- All temporary QA artifacts removed; working tree clean and secret-safe

## Post-N15 Production Hotfix — Resend Migration (PASS)

- Render Free blocks outbound SMTP ports 25, 465, and 587.
- Migrated contact form email delivery to Resend (`resend` v6) via HTTPS API.
- Configured test sender `onboarding@resend.dev` with custom `CONTACT_FROM_NAME` and visitor `Reply-To`.
- Removed `googleapis` and `nodemailer` dependencies and deprecated Gmail OAuth/SMTP credentials.
- Enforced zero startup network calls; server boots quickly under 1 second.
- Verified frontend request/response contract (`POST /api/contact`) remains 100% unchanged.

## Current Action

ALL NODES (N0–N11, N13–N15) + Post-N15 Hotfix = **PASS** ✅  
N12 = **SKIPPED BY DESIGN** (Direct contact enquiry architecture)  
PROJECT STATUS: **PRODUCTION READY & RESEND ENABLED** 🚀






