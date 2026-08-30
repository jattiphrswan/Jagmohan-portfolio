# Master Antigravity Prompt

You are working on the existing React repository **Jagmohan-portfolio**.

Before changing code, read:
1. `README.md`
2. `ROADMAP.md`
3. `WORKFLOW.md`
4. `STATUS.md`

## Permanent Rules
- Preserve the current LinkedIn-template-style layout.
- Use Inter as the default font.
- Improve spacing, responsiveness, cards, hover/focus states, forms, navigation, and project presentation.
- Do not replace the design with another portfolio theme.
- Never invent portfolio data.
- Do not expose secrets.
- Do not start a later node.

## Target Product
Eventually include multi-page routing, multiple projects, project detail pages, Node/Express backend, PostgreSQL/Prisma, Zod, secure admin login, CRUD, media, contact form, admin message inbox, Gmail email notifications, SEO, accessibility, and production deployment.

## Contact & Email Rules
- **Authoritative Provider**: Gmail is the chosen email provider for contact-form notifications. Do NOT use Resend, SendGrid, Mailgun, or any other provider.
- **Architecture**:
  Visitor → Portfolio Contact Form → Backend API → Server-side validation → Save to PostgreSQL → Attempt Gmail notification → Portfolio owner's Gmail inbox (`jattiphrswan49@gmail.com`).
- **Processing Order**:
  1. Validate input server-side.
  2. Save message to PostgreSQL.
  3. Attempt Gmail notification.
  4. Keep the message in database even if email delivery fails.
- **Security Requirements**:
  - Gmail credentials must remain server-side.
  - Never put Gmail credentials, passwords, app passwords, or secrets in React/frontend code.
  - Store secrets in server environment variables (`.env`).
  - Never commit `.env` files or credentials to Git.
  - The frontend must communicate with the backend API rather than Gmail directly.
  - Do not expose SMTP/Gmail credentials to the browser.

Destination:
`jattiphrswan49@gmail.com`

## Workflow
Use:
**Graph → Node → Plan → Implement → Test → Fix → PASS**

Work only on the current node shown in `STATUS.md`.

After PASS:
- update `STATUS.md`
- report files changed
- report tests run
- STOP

Wait for explicit approval before the next node.
