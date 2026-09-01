# Jagmohan Portfolio V2 — System Architecture

Comprehensive technical documentation of the system topology, data layers, authentication flow, media pipelines, and API specifications.

---

## 1. System Topology

```
                                  GitHub
                                     │
                     ┌───────────────┴───────────────┐
                     │                               │
                  Vercel                          Render
              (React 19 SPA)                 (Node / Express API)
                     │                               │
                     └────────── HTTPS / CORS ───────┤
                                                     │
                                      ┌──────────────┼──────────────┐
                                      │              │              │
                                  PostgreSQL     Cloudinary       Gmail
                                    (Neon)         Media          SMTP
```

---

## 2. Frontend Architecture (React 19 / Vite)

- **Entry Point**: `src/main.jsx` mounting `src/App.jsx`.
- **Global Context Providers**:
  - `AuthProvider` (`src/context/AuthProvider.jsx`, `useAuth.js`): Manages admin login state, active user session verification via `/api/auth/me`, and logout.
  - `ProfileProvider` (`src/context/ProfileProvider.jsx`, `useProfile.js`): Dynamically loads and caches `/api/profile` data, providing instant state synchronization across all public and admin pages.
- **Routing**: React Router DOM v7 with `Layout` wrapper (Header + Main Container + Footer) and `ProtectedRoute` guard for `/admin/*`.
- **UI Components**:
  - `SEO.jsx` (`src/components/SEO.jsx`): Reusable metadata and JSON-LD injection component.
  - `SectionCard.jsx`: LinkedIn-styled modular card container with semantic headingLevel (h1/h2) support.
  - `MediaUpload.jsx`: Reusable file selection, preview, client validation, replacement, and Cloudinary upload component.
  - `Header.jsx`: Sticky desktop/mobile navigation bar with search bar and active link highlighting.
  - `Footer.jsx`: Professional footer with copyright and LinkedIn branding.
- **SEO & Metadata Pipeline**:
  - Dynamic route metadata (`title`, `description`, `canonical`, `og:*`, `twitter:*`, `robots`).
  - Structured Data (JSON-LD): `Person`, `WebSite`, `CreativeWork`, `BreadcrumbList` via `src/utils/schema.js`.
  - Canonical base URL resolved from `VITE_SITE_URL` with client window fallback.
  - Base crawl configuration in `public/robots.txt` and `public/sitemap.xml`.
  - Route code-splitting with `React.lazy()` and `<Suspense>`.

---

## 3. Backend Architecture (Node / Express)

- **Entry Point**: `server/src/app.js` (exporting `app` for tests and binding to `PORT=5000` in dev).
- **Core Security Middleware**:
  - `helmet()`: Sets secure HTTP headers (XSS filter, clickjacking protection, DNS prefetch control).
  - `cors()`: Environment-controlled allowed origins (`FRONTEND_URL`) supporting credentials.
  - `cookieParser()`: Parses HTTP-only cookies containing session JWTs.
  - `express.json({ limit: '10mb' })`: Accommodates image uploads.
- **Middleware Guards**:
  - `requireAuth` (`server/src/middleware/auth.js`): Verifies JWT signature from `req.cookies.auth_token`.
  - `notFoundHandler` & `errorHandler`: Formats safe JSON error responses without stack traces.

---

## 4. API Endpoints Map

### Public API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server status, timestamp, and environment |
| `GET` | `/api/profile` | Unified profile payload (bio, contact, services, tools, experience, skills) |
| `GET` | `/api/profile/experience` | Work experience records ordered by display order |
| `GET` | `/api/profile/skills` | Technical skills grouped by category |
| `GET` | `/api/projects` | All published projects ordered by display order |
| `GET` | `/api/projects/:slug` | Single project details by slug |
| `GET` | `/api/certifications` | All certifications ordered by display order |
| `GET` | `/api/certifications/:id` | Single certification details |
| `POST` | `/api/contact` | Contact enquiry submission (rate-limited, honeypot protected, Gmail SMTP) |
| `POST` | `/api/auth/login` | Admin authentication (returns HTTP-only cookie) |
| `POST` | `/api/auth/logout` | Clears authentication cookie |
| `GET` | `/api/auth/me` | Returns current authenticated admin session status |

### Protected Admin API (`requireAuth` required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `PUT` | `/api/admin/profile` | Update profile bio, contact info, services, tools, avatar/banner |
| `GET` | `/api/admin/projects` | List all projects (including drafts) |
| `POST` | `/api/admin/projects` | Create new portfolio project |
| `PUT` | `/api/admin/projects/:id` | Update existing project |
| `DELETE` | `/api/admin/projects/:id` | Delete project |
| `GET` | `/api/admin/experience` | List work experience records |
| `POST` | `/api/admin/experience` | Create work experience record |
| `PUT` | `/api/admin/experience/:id` | Update work experience record |
| `DELETE` | `/api/admin/experience/:id` | Delete work experience record |
| `GET` | `/api/admin/skills` | List skills catalogue |
| `POST` | `/api/admin/skills` | Create skill entry |
| `PUT` | `/api/admin/skills/:id` | Update skill entry |
| `DELETE` | `/api/admin/skills/:id` | Delete skill entry |
| `GET` | `/api/admin/certifications` | List certifications |
| `POST` | `/api/admin/certifications` | Create certification entry |
| `PUT` | `/api/admin/certifications/:id` | Update certification entry |
| `DELETE` | `/api/admin/certifications/:id` | Delete certification entry |
| `POST` | `/api/admin/media/upload` | Upload image to persistent cloud storage (Cloudinary) |

---

## 5. Database Schema (PostgreSQL + Prisma)

- **`admins`**: Stores admin user (`id`, `email`, `passwordHash`, timestamps).
- **`profiles`**: Singleton profile (`name`, `headline`, `location`, `about`, `company`, `projectsCount`, `email`, `phone`, `linkedin`, `github`, `avatar`, `banner`, `services[]`, `tools[]`).
- **`projects`**: Projects showcase (`id`, `slug`, `title`, `description`, `overview`, `category`, `image`, `technologies[]`, `role`, `liveUrl`, `githubUrl`, `featured`, `order`, `status`).
- **`experiences`**: Career history (`id`, `role`, `company`, `type`, `start`, `end`, `isCurrent`, `location`, `bullets[]`, `displayOrder`).
- **`skills`**: Technical competencies (`id`, `name`, `category`, `displayOrder`, `featured`).
- **`certifications`**: Verified credentials (`id`, `name`, `issuer`, `issueDate`, `credentialUrl`, `imageUrl`, `imagePublicId`, `description`, `displayOrder`, `featured`).
- **`database_health`**: Connection health testing table.

*Note: There is NO contact message table. Enquiries route directly to Gmail.*

---

## 6. Email Architecture (N11)

```
Visitor submits form -> POST /api/contact -> Rate Limiter (5 req / 15 min) -> Honeypot Check
  ↓
Server Validation (Name, Email, Message)
  ↓
Nodemailer Transporter (smtp.gmail.com:465 secure)
  ↓
FROM: "Jagmohan Portfolio" <GMAIL_USER>
TO: CONTACT_TO_EMAIL (or GMAIL_USER)
REPLY-TO: Visitor's email
  ↓
Delivered to Owner's Gmail Inbox
```
