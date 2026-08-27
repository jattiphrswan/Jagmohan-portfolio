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
Eventually include multi-page routing, multiple projects, project detail pages, Node/Express backend, PostgreSQL/Prisma, Zod, secure admin login, CRUD, media, contact form, admin message inbox, Resend email notifications, SEO, accessibility, and production deployment.

## Contact Rule
Do not use direct Gmail SMTP as the primary production solution.

Use server-side Resend if possible.

Correct order:
1. validate
2. save to PostgreSQL
3. attempt email notification
4. keep the message even if email fails

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
