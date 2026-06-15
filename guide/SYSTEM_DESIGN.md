# SYSTEM_DESIGN.md

# SalesFlow CRM

Version: 1.0

---

# System Overview

SalesFlow is a multi-tenant SaaS CRM platform that allows multiple organizations to manage their sales processes independently.

The system supports:

- Multi-tenancy
- Role Based Access Control (RBAC)
- Permission-Based Authorization
- Lead Management
- Deal Management
- Pipeline Management
- Team Collaboration
- Reporting
- Billing

The architecture must support:

- Thousands of organizations
- Millions of records
- Horizontal scaling
- Feature extensibility

---

# High Level Architecture

```text
Next.js Frontend
        │
        ▼
Express API Server
        │
        ▼
Application Layer
├── Controllers
├── Services
├── Authorization
├── Validation
└── Domain Logic
        │
        ▼
Repository Layer
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
        │
        ├── Supabase Storage
        └── Future Redis
```

---

# Core Principles

## Single Responsibility Principle

Every class, service, and module must have one responsibility.

Example:

```text
AuthService
├── Login
├── Logout
└── Token Refresh

UserService
├── Create User
├── Update User
└── Delete User
```

Never mix responsibilities.

---

## Open Closed Principle

System should allow adding new modules without changing existing code.

Example:

```text
lead.view
deal.view
contact.view
company.view
```

Authorization system should work without modification.

---

## Liskov Substitution Principle

Repository implementations should be interchangeable.

```text
UserRepository
├── PrismaUserRepository
└── FutureUserRepository
```

Service layer should not care about implementation.

---

## Interface Segregation Principle

Keep interfaces focused.

Bad:

```ts
interface MassiveRepository {}
```

Good:

```ts
interface UserRepository {}
interface DealRepository {}
interface LeadRepository {}
```

---

## Dependency Inversion Principle

Services depend on abstractions.

```text
Controller
    ↓
Service
    ↓
Repository Interface
    ↓
Prisma Repository
```

Never:

```text
Controller
    ↓
Prisma
```

---

# Multi Tenant Architecture

Platform
├── Organization A
├── Organization B
└── Organization C

Every tenant owns:

- Users
- Roles
- Permissions
- Teams
- Leads
- Contacts
- Companies
- Deals
- Pipelines
- Activities
- Tasks
- Reports

---

# Tenant Isolation

Every business table must contain:

```text
organizationId
```

Example:

```text
users
leads
contacts
companies
deals
activities
tasks
```

All queries must filter by:

```ts
where: {
  organizationId: currentUser.organizationId;
}
```

No exceptions.

---

# Authentication Architecture

## Login Flow

```text
User
 ↓
Email + Password
 ↓
Auth Service
 ↓
Verify Password
 ↓
Generate Access Token
 ↓
Generate Refresh Token
 ↓
Return Tokens
```

---

# JWT Strategy

## Access Token

Purpose:

```text
API Authorization
```

Contains:

```text
userId
organizationId
```

Expiry:

```text
15 Minutes
```

---

## Refresh Token

Purpose:

```text
Generate New Access Token
```

Expiry:

```text
30 Days
```

Storage:

```text
Database
```

---

# Password Security

Algorithm:

```text
Argon2
```

Never Store:

```text
password
```

Always Store:

```text
passwordHash
```

---

# Authorization Architecture

## RBAC

```text
User
 ↓
User Roles
 ↓
Role Permissions
 ↓
Permission Check
```

Example:

```text
user.create
user.view
user.update
user.delete
```

---

# Permission Structure

Format:

```text
resource.action.scope
```

Examples:

```text
lead.view.own
lead.view.team
lead.view.organization

deal.update.team

report.export.organization
```

---

# Permission Flow

```text
Request
 ↓
JWT Middleware
 ↓
Permission Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
```

Example:

```text
POST /users
```

Requires:

```text
user.create.organization
```

---

# User Hierarchy

## Platform

```text
SUPER_ADMIN
```

Responsibilities:

- Create Organizations
- Suspend Organizations
- Manage Plans
- Platform Analytics

---

## Tenant

```text
ADMIN
MANAGER
SALES_REP
```

Custom Roles Supported.

---

# Backend Architecture

```text
src
├── config
├── modules
├── shared
├── infrastructure
├── prisma
├── app.ts
└── server.ts
```

---

# Module Architecture

```text
users
├── user.controller.ts
├── user.service.ts
├── user.repository.ts
├── user.routes.ts
├── user.validator.ts
├── user.types.ts
└── dto
```

Same structure for:

```text
auth
organizations
roles
permissions
teams
leads
contacts
companies
deals
pipelines
activities
tasks
reports
```

---

# Controller Layer

Responsibilities:

- Parse Request
- Validate Input
- Call Service
- Return Response

Controllers never contain business logic.

---

# Service Layer

Responsibilities:

- Business Logic
- Workflow Logic
- Authorization Rules
- Validation Rules

Services never use Prisma directly.

---

# Repository Layer

Responsibilities:

- Create
- Update
- Delete
- Query

Only repositories access Prisma.

---

# Shared Layer

```text
shared
├── auth
├── permissions
├── middleware
├── validators
├── exceptions
├── constants
├── enums
├── logger
└── responses
```

---

# Frontend Architecture

```text
src
├── app
├── modules
├── shared
├── components
├── hooks
├── services
├── store
├── providers
└── types
```

---

# Frontend Feature Structure

```text
users
├── api
├── components
├── hooks
├── pages
├── schemas
└── types
```

---

# State Management

## Zustand

Used For:

- User Session
- Theme
- Permissions
- Global UI State

---

## TanStack Query

Used For:

- API Data
- Pagination
- Filters
- Caching

---

# API Communication

```text
React Component
        ↓
API Service
        ↓
Axios Client
        ↓
Express API
        ↓
Prisma
        ↓
PostgreSQL
```

---

# File Storage

Provider:

```text
Supabase Storage
```

Structure:

```text
organizations/
users/
companies/
deals/
attachments/
```

Usage:

- Avatars
- Documents
- Images
- Attachments

---

# Reporting Architecture

Reports Generated From:

```text
Leads
Deals
Activities
Tasks
```

Filters:

```text
Date Range
User
Team
Pipeline
Status
```

Exports:

```text
CSV
Excel
PDF
```

---

# Notification Architecture

Current:

```text
Database Notifications
```

Future:

```text
Email
WhatsApp
Slack
```

Flow:

```text
Event
 ↓
Notification Service
 ↓
Database
 ↓
Frontend
```

---

# Audit Logging

Track:

```text
Authentication Events
User Changes
Role Changes
Permission Changes
Lead Changes
Deal Changes
Settings Changes
```

Audit Fields:

```text
User
Action
Entity
EntityId
Timestamp
IPAddress
```

---

# Error Handling

Success Response:

```json
{
  "success": true,
  "data": {}
}
```

Error Response:

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

# Security Architecture

Authentication:

```text
JWT
```

Authorization:

```text
Permission Based Access
```

Password Security:

```text
Argon2
```

Validation:

```text
Zod
```

Rate Limiting:

```text
Enabled
```

Tenant Isolation:

```text
Mandatory
```

Audit Logs:

```text
Enabled
```

---

# Scalability Strategy

## Phase 1

```text
Single API
Single PostgreSQL
Supabase Storage
```

---

## Phase 2

```text
Redis
BullMQ
Background Jobs
```

---

## Phase 3

```text
Read Replicas
Horizontal Scaling
CDN
```

---

# Future Architecture

```text
Workflow Engine
API Keys
Webhooks
SSO
SCIM
Custom Domains
White Label
Enterprise Features
```

---

# Development Rules

1. No business logic in controllers.
2. No direct Prisma access outside repositories.
3. Every business table must contain organizationId.
4. Every endpoint must validate permissions.
5. Use DTO validation.
6. Use repository pattern.
7. Use TypeScript strict mode.
8. Use feature-based frontend architecture.
9. Maintain module isolation.
10. Build for multi-tenancy from day one.
