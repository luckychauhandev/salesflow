# FOLDER_STRUCTURE.md

# SalesFlow CRM

Version: 1.0

Architecture Style

- Feature Based
- Modular Monolith
- SOLID Principles
- Clean Architecture
- Multi-Tenant Ready

---

# Monorepo Structure

```text
salesflow-crm/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared-types/
│   ├── shared-constants/
│   ├── shared-utils/
│   └── shared-permissions/
│
├── docs/
│
├── .github/
│
└── package.json
```

---

# Frontend Structure

Technology

```text
Next.js
TypeScript
TanStack Query
Zustand
Tailwind
Shadcn UI
```

---

# apps/web

```text
web/
│
├── public/
│
├── src/
│
├── app/
├── modules/
├── shared/
├── providers/
├── services/
├── hooks/
├── store/
├── types/
├── lib/
├── constants/
└── config/
```

---

# App Router Structure

```text
src/app
│
├── (auth)/
│   ├── login/
│   ├── forgot-password/
│   └── reset-password/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── leads/
│   ├── contacts/
│   ├── companies/
│   ├── deals/
│   ├── pipelines/
│   ├── activities/
│   ├── tasks/
│   ├── reports/
│   ├── users/
│   ├── roles/
│   ├── settings/
│   └── billing/
│
├── layout.tsx
├── page.tsx
└── not-found.tsx
```

---

# Modules Directory

Every business feature gets its own module.

```text
src/modules
│
├── auth/
├── organizations/
├── users/
├── roles/
├── permissions/
├── teams/
├── leads/
├── contacts/
├── companies/
├── deals/
├── pipelines/
├── activities/
├── tasks/
├── reports/
├── billing/
├── notifications/
├── attachments/
├── audit-logs/
├── api-keys/
└── webhooks/
```

---

# Module Structure

Example:

```text
users/
│
├── api/
│
├── components/
│
├── hooks/
│
├── schemas/
│
├── types/
│
├── utils/
│
└── pages/
```

---

# User Module Example

```text
users/
│
├── api/
│   ├── create-user.ts
│   ├── update-user.ts
│   ├── delete-user.ts
│   └── get-users.ts
│
├── components/
│   ├── user-table.tsx
│   ├── user-form.tsx
│   ├── user-filters.tsx
│   └── role-selector.tsx
│
├── hooks/
│   ├── use-users.ts
│   ├── use-user.ts
│   └── use-create-user.ts
│
├── schemas/
│   └── user.schema.ts
│
├── types/
│   └── user.types.ts
│
└── pages/
│   ├── users-page.tsx
│   └── user-details-page.tsx
```

---

# Shared Directory

Contains reusable code.

```text
src/shared
│
├── components/
├── hooks/
├── layouts/
├── providers/
├── services/
├── types/
├── utils/
├── validators/
├── permissions/
└── constants/
```

---

# Shared Components

```text
shared/components
│
├── data-table/
├── forms/
├── modals/
├── drawers/
├── cards/
├── charts/
├── kanban/
├── pagination/
├── search/
├── filters/
├── skeletons/
└── empty-state/
```

---

# Providers

```text
shared/providers
│
├── auth-provider.tsx
├── query-provider.tsx
├── permission-provider.tsx
├── theme-provider.tsx
└── websocket-provider.tsx
```

---

# Services

```text
shared/services
│
├── api-client.ts
├── auth.service.ts
├── permission.service.ts
└── storage.service.ts
```

---

# Store

```text
src/store
│
├── auth.store.ts
├── ui.store.ts
├── notification.store.ts
└── permission.store.ts
```

---

# Backend Structure

Technology

```text
Node.js
Express
TypeScript
Prisma
```

---

# apps/api

```text
api/
│
├── src/
│
├── prisma/
│
├── tests/
│
├── uploads/
│
└── package.json
```

---

# Backend Source

```text
src
│
├── config/
├── modules/
├── shared/
├── infrastructure/
├── prisma/
├── app.ts
└── server.ts
```

---

# Config

```text
config/
│
├── env.ts
├── database.ts
├── cors.ts
└── logger.ts
```

---

# Modules

```text
modules/
│
├── auth/
├── organizations/
├── users/
├── roles/
├── permissions/
├── teams/
├── leads/
├── contacts/
├── companies/
├── deals/
├── pipelines/
├── activities/
├── tasks/
├── notes/
├── attachments/
├── notifications/
├── reports/
├── billing/
├── api-keys/
├── webhooks/
└── audit-logs/
```

---

# Backend Module Structure

Example:

```text
users/
│
├── controllers/
├── services/
├── repositories/
├── routes/
├── validators/
├── dto/
├── interfaces/
├── types/
├── mappers/
└── index.ts
```

---

# Detailed Module Example

```text
users/
│
├── controllers/
│   └── user.controller.ts
│
├── services/
│   └── user.service.ts
│
├── repositories/
│   └── user.repository.ts
│
├── routes/
│   └── user.routes.ts
│
├── validators/
│   └── create-user.validator.ts
│
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
│
├── interfaces/
│   └── user-repository.interface.ts
│
├── types/
│   └── user.types.ts
│
└── index.ts
```

---

# Shared Backend Layer

```text
shared/
│
├── auth/
├── middleware/
├── exceptions/
├── validators/
├── permissions/
├── constants/
├── enums/
├── interfaces/
├── services/
├── responses/
├── logger/
└── utils/
```

---

# Auth Shared Layer

```text
shared/auth
│
├── jwt.service.ts
├── password.service.ts
├── token.service.ts
└── auth.middleware.ts
```

---

# Middleware

```text
shared/middleware
│
├── auth.middleware.ts
├── permission.middleware.ts
├── tenant.middleware.ts
├── validation.middleware.ts
├── error.middleware.ts
└── rate-limit.middleware.ts
```

---

# Infrastructure Layer

External services.

```text
infrastructure
│
├── storage/
├── email/
├── cache/
├── queue/
└── webhook/
```

---

# Storage

```text
storage/
│
└── supabase-storage.service.ts
```

---

# Email

```text
email/
│
├── resend.service.ts
└── email.templates.ts
```

---

# Cache

Future

```text
cache/
│
└── redis.service.ts
```

---

# Queue

Future

```text
queue/
│
└── bullmq.service.ts
```

---

# Prisma Structure

```text
prisma/
│
├── schema.prisma
│
├── migrations/
│
├── seed/
│   ├── permissions.seed.ts
│   ├── roles.seed.ts
│   └── super-admin.seed.ts
│
└── prisma-client.ts
```

---

# Tests

```text
tests/
│
├── integration/
├── unit/
├── fixtures/
└── helpers/
```

---

# API Versioning

```text
/api/v1
```

Future

```text
/api/v2
```

---

# Documentation Structure

```text
docs/
│
├── PRD.md
├── SYSTEM_DESIGN.md
├── DATABASE_DESIGN.md
├── API_SPECIFICATION.md
├── PERMISSIONS_MATRIX.md
├── DEVELOPMENT_GUIDELINES.md
├── PRISMA_SCHEMA_PLAN.md
├── DEPLOYMENT_GUIDE.md
└── CONTRIBUTING.md
```

---

# Naming Conventions

Files

```text
kebab-case
```

Examples

```text
create-user.dto.ts
user.controller.ts
auth.middleware.ts
```

---

# Class Naming

```text
PascalCase
```

Examples

```ts
UserService;
LeadRepository;
AuthController;
```

---

# Function Naming

```text
camelCase
```

Examples

```ts
createUser();
updateLead();
assignDeal();
```

---

# Development Rules

1. No direct Prisma access outside repositories.
2. No business logic inside controllers.
3. Every module must be isolated.
4. Every business table must contain organizationId.
5. Use DTO validation.
6. Use feature-based frontend architecture.
7. Use TypeScript strict mode.
8. Shared code belongs in shared/.
9. External integrations belong in infrastructure/.
10. Every module must be independently testable.
