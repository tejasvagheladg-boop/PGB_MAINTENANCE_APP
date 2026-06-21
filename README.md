# PGB_MAINTENANCE_APP

Simple Society Maintenance (MVP) — Next.js + Prisma (SQLite for dev)

## Quick start:
1. Clone repo
   ```bash
   git clone git@github.com:tejasvagheladg-boop/PGB_MAINTENANCE_APP.git
   cd PGB_MAINTENANCE_APP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` from `.env.example` and set values:
   ```bash
   cp .env.example .env
   ```

4. Prisma migrate & generate:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Run dev:
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Features (MVP):
- User Registration & Login (email/password)
- Maintenance Request CRUD (create, list, update status)
- JWT-based authentication
- SQLite database (dev), ready for PostgreSQL (prod)
- Simple Next.js pages + API routes

## File Structure:
```
.
├── lib/
│   ├── jwt.ts           # JWT utilities
│   └── prisma.ts        # Prisma client
├── pages/
│   ├── api/
│   │   └── auth/        # Register, Login, Logout
│   │   └── requests.ts  # Maintenance Requests API
│   ├── index.tsx        # Register / Login page
│   └── requests.tsx     # Requests list & create page
├── prisma/
│   └── schema.prisma    # DB schema
├── styles/
│   └── globals.css      # Basic styles
├── .env.example         # Environment template
├── .gitignore           # Git ignore
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── README.md            # This file
```

## Next Steps:
- Add RBAC (Role-based access control)
- Admin panel for managing requests
- File uploads for attachments
- Notifications (email/SMS)
- Production deployment (Vercel + PostgreSQL)
