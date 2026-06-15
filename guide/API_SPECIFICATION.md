# API_SPECIFICATION.md

# SalesFlow CRM API Specification

Version: 1.0

Base URL

```text
/api/v1
```

Authentication

```text
JWT Bearer Token
```

Content Type

```text
application/json
```

---

# Standard Response Format

## Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Paginated Response

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

---

# Authentication Module

Base Path

```text
/auth
```

---

## Login

POST

```text
/auth/login
```

Permission

```text
Public
```

Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "accessToken": "",
  "refreshToken": "",
  "user": {}
}
```

---

## Refresh Token

POST

```text
/auth/refresh-token
```

Request

```json
{
  "refreshToken": ""
}
```

---

## Logout

POST

```text
/auth/logout
```

---

## Get Current User

GET

```text
/auth/me
```

Permission

```text
Authenticated User
```

---

# Organizations Module

Base Path

```text
/organizations
```

---

## Create Organization

POST

```text
/organizations
```

Permission

```text
organization.create
```

Request

```json
{
  "name": "Acme Inc",
  "slug": "acme-inc",
  "industry": "Software"
}
```

---

## Get Organizations

GET

```text
/organizations
```

Permission

```text
organization.view
```

Query Params

```text
page
limit
search
status
```

---

## Get Organization

GET

```text
/organizations/:id
```

---

## Update Organization

PATCH

```text
/organizations/:id
```

Permission

```text
organization.update
```

---

## Suspend Organization

PATCH

```text
/organizations/:id/suspend
```

---

## Activate Organization

PATCH

```text
/organizations/:id/activate
```

---

# Users Module

Base Path

```text
/users
```

---

## Create User

POST

```text
/users
```

Permission

```text
user.create
```

Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "roleIds": []
}
```

---

## Get Users

GET

```text
/users
```

Permission

```text
user.view
```

Filters

```text
page
limit
search
status
teamId
```

---

## Get User

GET

```text
/users/:id
```

---

## Update User

PATCH

```text
/users/:id
```

Permission

```text
user.update
```

---

## Delete User

DELETE

```text
/users/:id
```

Permission

```text
user.delete
```

---

## Assign Roles

POST

```text
/users/:id/roles
```

Permission

```text
user.assign_role
```

Request

```json
{
  "roleIds": []
}
```

---

# Teams Module

Base Path

```text
/teams
```

---

## Create Team

POST

```text
/teams
```

---

## Get Teams

GET

```text
/teams
```

---

## Update Team

PATCH

```text
/teams/:id
```

---

## Delete Team

DELETE

```text
/teams/:id
```

---

## Assign Members

POST

```text
/teams/:id/members
```

---

# Roles Module

Base Path

```text
/roles
```

---

## Create Role

POST

```text
/roles
```

Permission

```text
role.create
```

Request

```json
{
  "name": "Sales Manager",
  "description": ""
}
```

---

## Get Roles

GET

```text
/roles
```

---

## Get Role

GET

```text
/roles/:id
```

---

## Update Role

PATCH

```text
/roles/:id
```

---

## Delete Role

DELETE

```text
/roles/:id
```

---

## Assign Permissions

POST

```text
/roles/:id/permissions
```

Request

```json
{
  "permissionIds": []
}
```

---

# Permissions Module

Base Path

```text
/permissions
```

---

## Get Permissions

GET

```text
/permissions
```

---

## Get Permission Matrix

GET

```text
/permissions/matrix
```

---

# Leads Module

Base Path

```text
/leads
```

---

## Create Lead

POST

```text
/leads
```

Permission

```text
lead.create
```

Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

---

## Get Leads

GET

```text
/leads
```

Filters

```text
page
limit
search
status
ownerId
source
```

---

## Get Lead

GET

```text
/leads/:id
```

---

## Update Lead

PATCH

```text
/leads/:id
```

---

## Delete Lead

DELETE

```text
/leads/:id
```

---

## Assign Lead

PATCH

```text
/leads/:id/assign
```

Request

```json
{
  "ownerId": ""
}
```

---

## Convert Lead

POST

```text
/leads/:id/convert
```

Creates:

```text
Contact
Company
Deal
```

---

## Import Leads

POST

```text
/leads/import
```

Multipart Upload

---

## Export Leads

GET

```text
/leads/export
```

---

# Contacts Module

Base Path

```text
/contacts
```

---

## Create Contact

POST

```text
/contacts
```

---

## Get Contacts

GET

```text
/contacts
```

---

## Get Contact

GET

```text
/contacts/:id
```

---

## Update Contact

PATCH

```text
/contacts/:id
```

---

## Delete Contact

DELETE

```text
/contacts/:id
```

---

# Companies Module

Base Path

```text
/companies
```

---

## Create Company

POST

```text
/companies
```

---

## Get Companies

GET

```text
/companies
```

---

## Get Company

GET

```text
/companies/:id
```

---

## Update Company

PATCH

```text
/companies/:id
```

---

## Delete Company

DELETE

```text
/companies/:id
```

---

# Pipelines Module

Base Path

```text
/pipelines
```

---

## Create Pipeline

POST

```text
/pipelines
```

---

## Get Pipelines

GET

```text
/pipelines
```

---

## Update Pipeline

PATCH

```text
/pipelines/:id
```

---

## Delete Pipeline

DELETE

```text
/pipelines/:id
```

---

## Create Stage

POST

```text
/pipelines/:id/stages
```

---

## Reorder Stages

PATCH

```text
/pipelines/:id/stages/reorder
```

---

# Deals Module

Base Path

```text
/deals
```

---

## Create Deal

POST

```text
/deals
```

---

## Get Deals

GET

```text
/deals
```

Filters

```text
pipelineId
stageId
ownerId
status
```

---

## Get Deal

GET

```text
/deals/:id
```

---

## Update Deal

PATCH

```text
/deals/:id
```

---

## Delete Deal

DELETE

```text
/deals/:id
```

---

## Move Deal

PATCH

```text
/deals/:id/stage
```

Request

```json
{
  "stageId": ""
}
```

---

## Mark Won

PATCH

```text
/deals/:id/won
```

---

## Mark Lost

PATCH

```text
/deals/:id/lost
```

---

# Activities Module

Base Path

```text
/activities
```

---

## Create Activity

POST

```text
/activities
```

---

## Get Activities

GET

```text
/activities
```

Filters

```text
type
ownerId
status
dateRange
```

---

## Complete Activity

PATCH

```text
/activities/:id/complete
```

---

## Reschedule Activity

PATCH

```text
/activities/:id/reschedule
```

---

# Tasks Module

Base Path

```text
/tasks
```

---

## Create Task

POST

```text
/tasks
```

---

## Get Tasks

GET

```text
/tasks
```

---

## Update Task

PATCH

```text
/tasks/:id
```

---

## Complete Task

PATCH

```text
/tasks/:id/complete
```

---

## Delete Task

DELETE

```text
/tasks/:id
```

---

# Notes Module

Base Path

```text
/notes
```

---

## Create Note

POST

```text
/notes
```

---

## Update Note

PATCH

```text
/notes/:id
```

---

## Delete Note

DELETE

```text
/notes/:id
```

---

# Attachments Module

Base Path

```text
/attachments
```

---

## Upload File

POST

```text
/attachments/upload
```

Multipart Form Data

---

## Download File

GET

```text
/attachments/:id/download
```

---

## Delete File

DELETE

```text
/attachments/:id
```

---

# Dashboard Module

Base Path

```text
/dashboard
```

---

## Dashboard Summary

GET

```text
/dashboard/summary
```

Returns

```text
Total Leads
Total Deals
Revenue
Forecast
Activities
Tasks
```

---

# Reports Module

Base Path

```text
/reports
```

---

## Revenue Report

GET

```text
/reports/revenue
```

---

## Pipeline Report

GET

```text
/reports/pipeline
```

---

## Lead Report

GET

```text
/reports/leads
```

---

## Team Performance Report

GET

```text
/reports/team-performance
```

---

## Export Report

GET

```text
/reports/export
```

Formats

```text
csv
xlsx
pdf
```

---

# Notifications Module

Base Path

```text
/notifications
```

---

## Get Notifications

GET

```text
/notifications
```

---

## Mark As Read

PATCH

```text
/notifications/:id/read
```

---

# Audit Logs Module

Base Path

```text
/audit-logs
```

---

## Get Logs

GET

```text
/audit-logs
```

Filters

```text
entity
userId
dateRange
```

---

# API Keys Module

Base Path

```text
/api-keys
```

---

## Create API Key

POST

```text
/api-keys
```

---

## Get API Keys

GET

```text
/api-keys
```

---

## Revoke API Key

DELETE

```text
/api-keys/:id
```

---

# Webhooks Module

Base Path

```text
/webhooks
```

---

## Create Webhook

POST

```text
/webhooks
```

---

## Get Webhooks

GET

```text
/webhooks
```

---

## Update Webhook

PATCH

```text
/webhooks/:id
```

---

## Delete Webhook

DELETE

```text
/webhooks/:id
```

---

# Billing Module

Base Path

```text
/billing
```

---

## Current Subscription

GET

```text
/billing/subscription
```

---

## Invoices

GET

```text
/billing/invoices
```

---

## Usage

GET

```text
/billing/usage
```

---

# Health Check

GET

```text
/health
```

Response

```json
{
  "status": "ok"
}
```
