# Node Development History — Jagmohan Portfolio V2

Complete historical log of development nodes completed on the `portfolio-v2` branch.

---

## N0 — Current Project Audit
- **Status**: PASS ✅ | **Commit**: `b889c25`
- Audited codebase baseline, scripts, linting, build pipelines, and project architecture.

## N1 — React Router + Multi-Page Structure
- **Status**: PASS ✅ | **Commit**: `471a392`
- Implemented React Router v7 multi-page navigation (`/`, `/about`, `/experience`, `/skills`, `/projects`, `/contact`).

## N2 — LinkedIn UI System
- **Status**: PASS ✅ | **Commit**: `eb69335`
- Built LinkedIn-inspired UI design system, `SectionCard` components, top navigation, and responsive typography.

## N3 — Backend Express Foundation
- **Status**: PASS ✅ | **Commit**: `6120018`
- Established Express backend, CORS, Helmet security headers, cookie parser, and health check API (`/api/health`).

## N4 — PostgreSQL + Prisma Setup
- **Status**: PASS ✅ | **Commit**: `34f4017`
- Integrated Prisma ORM with PostgreSQL database schema and error-resilient fallback query execution.

## N5 — Public Profile Pages
- **Status**: PASS ✅ | **Commit**: `2660524`
- Built dynamic public profile sections for About bio, Career timeline, and Technical skills.

## N6 — Projects & Project Detail Pages
- **Status**: PASS ✅ | **Commit**: `5231bf8`
- Implemented public projects showcase grid and slug-based project case study detail pages (`/projects/:slug`).

## N7 — Admin Authentication
- **Status**: PASS ✅ | **Commit**: `f610aa9`
- Implemented secure admin login (`/admin/login`), JWT verification stored in HTTP-only cookies, and `requireAuth` route guards.

## N8 — Project CRUD
- **Status**: PASS ✅ | **Commit**: `34fdf43`
- Built admin project management interfaces (`/admin/projects`, `/new`, `/edit`), featured/ordering toggles, and deletion modal.

## N9 — Profile, Experience & Skills CRUD
- **Status**: PASS ✅ | **Commit**: `86ce770`
- Built admin management pages for Profile Biography (`/admin/profile`), Work Experience (`/admin/experience`), and Technical Skills (`/admin/skills`) with live database synchronization via `ProfileContext`.

## N10 — Media Management & Certifications
- **Status**: PASS ✅ | **Commit**: `08dcc59`
- Implemented persistent media upload API (`/api/admin/media/upload`), Cloudinary configuration integration, reusable `MediaUpload` component, full Certifications CRUD, and public certifications page with image lightbox modal.

## N11 — Gmail Contact Form
- **Status**: PASS ✅
- Implemented public contact enquiry endpoint (`POST /api/contact`), Nodemailer Gmail SMTP dispatch, honeypot bot trap, rate limiting (5 req / 15 min), visitor Reply-To routing, and form state UX. Contact messages are intentionally email-only with zero database persistence.

## N12 — Admin Messages / Lead Inbox
- **Status**: SKIPPED BY DESIGN ⏭️
- Enquiries route directly to the owner's Gmail inbox without database storage.

## N13 — SEO, Performance & Accessibility
- **Status**: PASS ✅
- Implemented lightweight `SEO.jsx` component and `src/utils/seo.js` / `src/utils/schema.js` for dynamic metadata, canonical URL resolution (`VITE_SITE_URL`), Open Graph cards, Twitter metadata, and valid JSON-LD structured data (`Person`, `WebSite`, `CreativeWork`, `BreadcrumbList`).
- Established strict heading hierarchy with one `<h1>` per page, audited link security (`rel="noopener noreferrer"`), ensured keyboard modal navigation (Escape key), and enhanced form accessibility (`aria-live="polite"`).
- Optimized performance via `React.lazy` route code-splitting and `<Suspense>` loading fallback, generated `robots.txt` and `sitemap.xml`, and verified 100% test passing across `test_n13_seo.mjs` (64/64 tests) and `test_n13_backend.mjs` (11/11 tests).
