# DEVELOPMENT_GUIDELINES.md

# SalesFlow CRM Development Guidelines

Version: 1.0

---

# Purpose

This document defines development standards, coding conventions, architecture rules, and implementation practices for SalesFlow CRM.

Every contributor must follow these guidelines.

---

# Core Engineering Principles

## Rule 1

Build for multi-tenancy from day one.

Never assume:

```ts
const user = await prisma.user.findUnique(...)
```

Always consider:

```ts
organizationId;
```

---

## Rule 2

Permissions drive access.

Never use:

```ts
if (user.role === "ADMIN")
```

Always use:

```ts
hasPermission("lead.create.organization");
```

---

## Rule 3

Feature-first architecture.

Bad:

```text
controllers/
services/
repositories/
```

Good:

```text
users/
roles/
leads/
deals/
```

---

## Rule 4

Business logic never belongs in controllers.

Bad:

```ts
router.post("/", async (req, res) => {
  const user = await prisma.user.create(...)
})
```

Good:

```ts
Controller
 ↓
Service
 ↓
Repository
```

---

## Rule 5

Repository is the only layer allowed to access Prisma.

Forbidden:

```ts
Controller → Prisma
Service → Prisma
```

Allowed:

```ts
Controller
 ↓
Service
 ↓
Repository
 ↓
Prisma
```

---

# Backend Standards

Technology

```text
Node.js
Express
TypeScript
Prisma
PostgreSQL
```

---

# Module Structure

Every module must follow:

```text
module/
│
├── controllers
├── services
├── repositories
├── routes
├── validators
├── dto
├── interfaces
├── types
└── index.ts
```

Example:

```text
users/
roles/
leads/
deals/
activities/
```

---

# Controllers

Responsibilities

- Receive Request
- Validate Request
- Call Service
- Return Response

Controllers must not:

- Access database
- Contain business logic
- Call Prisma

---

# Services

Responsibilities

- Business Logic
- Workflow Logic
- Permission Rules
- Validation Rules

Services must not:

- Access Prisma directly

---

# Repositories

Responsibilities

- Database queries
- CRUD operations

Repositories must not:

- Contain business rules

---

# DTO Rules

Every write operation requires DTO.

Examples:

```text
CreateUserDto
UpdateUserDto

CreateLeadDto
UpdateLeadDto
```

Never use raw request body directly.

---

# Validation Rules

Use:

```text
Zod
```

Every DTO requires validation.

Example:

```ts
const createUserSchema = z.object({
  email: z.string().email(),
});
```

---

# Error Handling

Never:

```ts
throw new Error("Something wrong");
```

Always:

```ts
throw new BadRequestException(...)
throw new UnauthorizedException(...)
throw new NotFoundException(...)
```

Use centralized error middleware.

---

# Logging

Log:

- Login
- Logout
- Permission failures
- Critical actions

Never log:

- Passwords
- Tokens
- Secrets

---

# API Design Rules

Base URL

```text
/api/v1
```

---

# Resource Naming

Use plural nouns.

Correct:

```text
/users
/leads
/deals
```

Wrong:

```text
/getUsers
/createLead
```

---

# HTTP Methods

Create

```http
POST
```

Read

```http
GET
```

Update

```http
PATCH
```

Delete

```http
DELETE
```

---

# Response Format

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

# Authentication Guidelines

Use:

```text
JWT Access Token
Refresh Token
Argon2
```

---

# JWT Payload

Allowed:

```json
{
  "sub": "userId",
  "orgId": "organizationId"
}
```

Do not include:

```text
permissions
emails
personal data
```

---

# Authorization Guidelines

Every endpoint must validate:

```text
Authentication
Permission
Scope
```

Flow

```text
JWT
 ↓
Permission Check
 ↓
Scope Check
 ↓
Business Logic
```

---

# Permission Rules

Format

```text
resource.action.scope
```

Examples

```text
lead.view.own
lead.view.team
lead.view.organization

deal.update.team
```

---

# Multi-Tenant Rules

Every business table contains:

```text
organizationId
```

Every query contains:

```ts
where: {
  organizationId;
}
```

Mandatory.

---

# Database Rules

Use:

```text
UUID Primary Keys
```

---

# Soft Delete

Use:

```text
deletedAt
```

Never hard delete business records.

---

# Audit Fields

All tables require:

```text
createdAt
updatedAt
createdBy
updatedBy
```

---

# Prisma Guidelines

One repository per entity.

Example:

```text
UserRepository
LeadRepository
DealRepository
```

---

# Prisma Query Rules

Always select needed fields.

Bad:

```ts
findMany();
```

Good:

```ts
findMany({
  select: {
    id: true,
    name: true,
  },
});
```

---

# Indexing Rules

Index:

```text
organizationId
status
ownerId
createdAt
```

on large tables.

---

# Frontend Standards

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

# Frontend Architecture

Feature Based.

Bad:

```text
components/
pages/
services/
```

Good:

```text
modules/
 ├── users
 ├── leads
 ├── deals
```

---

# Component Guidelines

Component Types

```text
UI Components
Feature Components
Layout Components
```

---

# UI Components

Reusable.

Examples:

```text
Button
Input
Table
Modal
Drawer
```

Location

```text
shared/components
```

---

# Feature Components

Feature specific.

Examples:

```text
LeadTable
DealCard
UserForm
```

Location

```text
modules/*
```

---

# State Management

Global State

```text
Zustand
```

Server State

```text
TanStack Query
```

Never store API data in Zustand.

---

# Data Fetching

Use:

```text
TanStack Query
```

Never:

```ts
useEffect(() => {
 fetch(...)
})
```

for server state.

---

# Forms

Use:

```text
React Hook Form
Zod
```

Every form requires validation.

---

# Styling Rules

Use:

```text
Tailwind CSS
```

Avoid:

```css
inline styles
```

unless required.

---

# File Upload Guidelines

Storage:

```text
Supabase Storage
```

Allowed:

```text
PDF
DOCX
XLSX
PNG
JPG
```

Validate:

- File Type
- File Size

---

# Testing Guidelines

Unit Tests

```text
Services
Utilities
Validators
```

Integration Tests

```text
Repositories
API Endpoints
```

---

# Git Workflow

Branch Naming

```text
feature/user-management
feature/lead-module

fix/auth-bug
fix/pipeline-sort
```

---

# Commit Convention

Feature

```text
feat(users): create user module
```

Fix

```text
fix(auth): refresh token issue
```

Refactor

```text
refactor(leads): optimize queries
```

---

# Security Guidelines

Never expose:

```text
passwordHash
refreshToken
secretKey
```

---

# Environment Variables

Never commit:

```text
.env
```

Use:

```text
.env.example
```

---

# Performance Guidelines

Avoid:

```ts
N+1 Queries
```

Use:

```ts
include;
select;
pagination;
```

---

# Pagination Standard

Default

```text
page=1
limit=20
```

Maximum

```text
limit=100
```

---

# Development Checklist

Before merge:

- TypeScript passes
- Lint passes
- Tests pass
- Permissions checked
- organizationId enforced
- DTO validation added
- API documented
- Audit logs added where required

---

# Non-Negotiable Rules

1. Multi-tenant first.
2. Permission-based authorization only.
3. No Prisma outside repositories.
4. No business logic in controllers.
5. Every module isolated.
6. TypeScript strict mode enabled.
7. Soft delete for business records.
8. Audit sensitive actions.
9. Every query tenant-scoped.
10. Build for scalability, not shortcuts.
