# PRISMA_SCHEMA_PLAN.md

# SalesFlow CRM

Version: 1.0

Database:
PostgreSQL (Supabase)

ORM:
Prisma

---

# Design Principles

## Multi-Tenant First

Every business entity contains:

```prisma
organizationId String
```

Every query must be filtered by:

```ts
organizationId;
```

---

## UUID Everywhere

All primary keys:

```prisma
id String @id @default(uuid())
```

---

## Soft Delete Strategy

All business entities:

```prisma
deletedAt DateTime?
```

Never hard delete business records.

---

## Audit Fields

All business entities contain:

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

createdBy String?
updatedBy String?
```

---

# ENUMS

## OrganizationStatus

```prisma
enum OrganizationStatus {
  ACTIVE
  SUSPENDED
  TRIAL
  CANCELLED
}
```

---

## UserStatus

```prisma
enum UserStatus {
  ACTIVE
  INVITED
  INACTIVE
  BLOCKED
}
```

---

## RoleScope

```prisma
enum RoleScope {
  PLATFORM
  TENANT
}
```

---

## LeadStatus

```prisma
enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  DISQUALIFIED
  CONVERTED
  LOST
}
```

---

## DealStatus

```prisma
enum DealStatus {
  OPEN
  WON
  LOST
  ARCHIVED
}
```

---

## TaskPriority

```prisma
enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

---

## TaskStatus

```prisma
enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

---

## ActivityType

```prisma
enum ActivityType {
  CALL
  MEETING
  EMAIL
  FOLLOW_UP
  TASK
  DEMO
}
```

---

# PHASE 1

Authentication + Organizations + RBAC

Must be completed before CRM modules.

---

# Organization Model

```prisma
model Organization {
  id   String
  name String
  slug String

  status OrganizationStatus

  logoUrl String?
  website String?

  industry String?

  timezone String?
  currency String?

  country String?

  createdAt DateTime
  updatedAt DateTime

  users User[]
  roles Role[]
}
```

---

# User Model

```prisma
model User {
  id String

  organizationId String?

  firstName String
  lastName  String

  email String

  phone String?

  avatarUrl String?

  passwordHash String

  status UserStatus

  lastLoginAt DateTime?

  createdAt DateTime
  updatedAt DateTime
  deletedAt DateTime?

  organization Organization?

  userRoles UserRole[]
}
```

Notes

```text
organizationId nullable for SUPER_ADMIN
```

---

# Role Model

```prisma
model Role {
  id String

  organizationId String?

  name        String
  description String?

  scope RoleScope

  isSystem Boolean

  createdAt DateTime
  updatedAt DateTime

  organization Organization?

  rolePermissions RolePermission[]
  userRoles       UserRole[]
}
```

---

# Permission Model

```prisma
model Permission {
  id String

  key String

  module String

  description String?

  createdAt DateTime

  rolePermissions RolePermission[]
}
```

Examples

```text
user.create.organization

lead.view.own

deal.update.team
```

---

# UserRole Model

```prisma
model UserRole {
  userId String
  roleId String

  user User @relation(...)
  role Role @relation(...)

  @@id([userId, roleId])
}
```

---

# RolePermission Model

```prisma
model RolePermission {
  roleId String

  permissionId String

  role Role @relation(...)
  permission Permission @relation(...)

  @@id([roleId, permissionId])
}
```

---

# Team Model

```prisma
model Team {
  id String

  organizationId String

  name String

  description String?

  managerId String?

  createdAt DateTime
  updatedAt DateTime
}
```

---

# TeamMember Model

```prisma
model TeamMember {
  teamId String
  userId String

  @@id([teamId, userId])
}
```

---

# PHASE 2

CRM Foundation

- Leads
- Contacts
- Companies

---

# Lead Model

```prisma
model Lead {
  id String

  organizationId String

  ownerId String

  firstName String
  lastName  String

  email String?
  phone String?

  source String?

  status LeadStatus

  score Int?

  website String?

  industry String?

  createdAt DateTime
  updatedAt DateTime
  deletedAt DateTime?
}
```

Indexes

```prisma
@@index([organizationId])
@@index([ownerId])
@@index([status])
```

---

# Contact Model

```prisma
model Contact {
  id String

  organizationId String

  ownerId String

  companyId String?

  firstName String
  lastName  String

  email String?
  phone String?

  jobTitle String?

  createdAt DateTime
  updatedAt DateTime
  deletedAt DateTime?
}
```

---

# Company Model

```prisma
model Company {
  id String

  organizationId String

  ownerId String

  name String

  website String?

  industry String?

  employeeCount Int?

  annualRevenue Decimal?

  createdAt DateTime
  updatedAt DateTime
  deletedAt DateTime?
}
```

---

# PHASE 3

Sales Pipeline

- Pipelines
- Stages
- Deals

---

# Pipeline Model

```prisma
model Pipeline {
  id String

  organizationId String

  name String

  description String?

  isDefault Boolean

  createdAt DateTime
  updatedAt DateTime

  stages PipelineStage[]
}
```

---

# PipelineStage Model

```prisma
model PipelineStage {
  id String

  pipelineId String

  name String

  color String?

  position Int

  isWon Boolean

  isLost Boolean

  pipeline Pipeline
}
```

---

# Deal Model

```prisma
model Deal {
  id String

  organizationId String

  pipelineId String

  stageId String

  ownerId String

  companyId String?

  contactId String?

  name String

  value Decimal

  probability Int

  expectedCloseDate DateTime?

  status DealStatus

  createdAt DateTime
  updatedAt DateTime
  deletedAt DateTime?
}
```

Indexes

```prisma
@@index([organizationId])
@@index([ownerId])
@@index([stageId])
@@index([status])
```

---

# PHASE 4

Activities + Tasks

---

# Activity Model

```prisma
model Activity {
  id String

  organizationId String

  ownerId String

  type ActivityType

  title String

  description String?

  dueDate DateTime?

  completedAt DateTime?

  leadId    String?
  contactId String?
  companyId String?
  dealId    String?

  createdAt DateTime
  updatedAt DateTime
}
```

---

# Task Model

```prisma
model Task {
  id String

  organizationId String

  assignedTo String

  createdBy String

  title String

  description String?

  priority TaskPriority

  status TaskStatus

  dueDate DateTime?

  completedAt DateTime?

  createdAt DateTime
  updatedAt DateTime
}
```

---

# PHASE 5

Collaboration

---

# Note Model

```prisma
model Note {
  id String

  organizationId String

  authorId String

  content String

  isPinned Boolean

  createdAt DateTime
  updatedAt DateTime
}
```

---

# Attachment Model

```prisma
model Attachment {
  id String

  organizationId String

  uploadedBy String

  fileName String

  filePath String

  fileSize Int

  mimeType String

  createdAt DateTime
}
```

---

# PHASE 6

Operations

---

# Notification Model

```prisma
model Notification {
  id String

  organizationId String

  userId String

  title String

  message String

  isRead Boolean

  createdAt DateTime
}
```

---

# AuditLog Model

```prisma
model AuditLog {
  id String

  organizationId String

  userId String

  entity String

  entityId String

  action String

  oldValues Json?

  newValues Json?

  ipAddress String?

  createdAt DateTime
}
```

---

# PHASE 7

Integrations

---

# ApiKey Model

```prisma
model ApiKey {
  id String

  organizationId String

  name String

  keyHash String

  lastUsedAt DateTime?

  expiresAt DateTime?

  createdAt DateTime
}
```

---

# Webhook Model

```prisma
model Webhook {
  id String

  organizationId String

  name String

  url String

  secret String

  isActive Boolean

  createdAt DateTime
}
```

---

# Billing

Future

```text
Subscription
Invoice
Payment
Plan
Usage
```

Do not implement in first release.

---

# Migration Strategy

Migration 001

```text
organizations
users
roles
permissions
user_roles
role_permissions
```

Migration 002

```text
teams
team_members
```

Migration 003

```text
leads
contacts
companies
```

Migration 004

```text
pipelines
pipeline_stages
deals
```

Migration 005

```text
activities
tasks
```

Migration 006

```text
notes
attachments
notifications
audit_logs
```

Migration 007

```text
api_keys
webhooks
```

---

# Seed Strategy

Seed 1

```text
Permissions
```

Seed 2

```text
SUPER_ADMIN
```

Seed 3

```text
ADMIN
MANAGER
SALES_REP
```

Seed 4

```text
Default Pipeline
```

Seed 5

```text
Default Stages
```

---

# Non-Negotiable Rules

1. Every business entity contains organizationId.
2. UUID for all primary keys.
3. Soft delete for business data.
4. Audit fields everywhere.
5. Role and permission driven authorization.
6. No schema shortcuts.
7. Design for millions of records.
8. Add indexes before production.
9. Never couple modules directly.
10. CRM modules depend on RBAC foundation.
