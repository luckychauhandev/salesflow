# DATABASE_DESIGN.md

# SalesFlow CRM

Version: 1.0

Database: PostgreSQL (Supabase)
ORM: Prisma

---

# Database Design Principles

## Multi-Tenant First

Every business table must contain:

```text
organization_id
```

Every query must be scoped by:

```sql
organization_id = current_user.organization_id
```

---

## UUID Primary Keys

All tables use:

```sql
id UUID PRIMARY KEY
```

Reason:

- Safer for APIs
- Better distributed systems support
- Prevents ID enumeration

---

## Soft Deletes

Every business table contains:

```sql
deleted_at TIMESTAMP NULL
```

Never permanently delete records.

---

## Audit Fields

Every business table contains:

```sql
created_at TIMESTAMP
updated_at TIMESTAMP
created_by UUID
updated_by UUID
```

---

# ENUMS

## OrganizationStatus

```text
ACTIVE
SUSPENDED
TRIAL
CANCELLED
```

---

## UserStatus

```text
ACTIVE
INVITED
INACTIVE
BLOCKED
```

---

## RoleScope

```text
PLATFORM
TENANT
```

---

## LeadStatus

```text
NEW
CONTACTED
QUALIFIED
DISQUALIFIED
CONVERTED
LOST
```

---

## DealStatus

```text
OPEN
WON
LOST
ARCHIVED
```

---

## ActivityType

```text
CALL
MEETING
EMAIL
FOLLOW_UP
TASK
DEMO
```

---

## TaskPriority

```text
LOW
MEDIUM
HIGH
URGENT
```

---

## TaskStatus

```text
PENDING
IN_PROGRESS
COMPLETED
CANCELLED
```

---

# ORGANIZATIONS

## organizations

Purpose:

Stores CRM tenants.

Fields

```text
id
name
slug
status
logo_url
website
industry
timezone
currency
country
phone
address
created_at
updated_at
```

Indexes

```text
slug UNIQUE
status
```

Relationships

```text
organization
 ├── users
 ├── teams
 ├── roles
 ├── leads
 ├── contacts
 ├── companies
 ├── deals
 ├── pipelines
 └── activities
```

---

# USERS

## users

Purpose:

Stores platform and tenant users.

Fields

```text
id
organization_id
first_name
last_name
email
phone
avatar_url
job_title
password_hash
status
last_login_at
created_at
updated_at
deleted_at
```

Indexes

```text
email UNIQUE
organization_id
status
```

Relationships

```text
user
 ├── user_roles
 ├── owned_leads
 ├── owned_deals
 ├── activities
 └── tasks
```

---

# TEAMS

## teams

Fields

```text
id
organization_id
name
description
manager_id
created_at
updated_at
```

Indexes

```text
organization_id
manager_id
```

---

## team_members

Fields

```text
team_id
user_id
```

Composite Key

```text
team_id + user_id
```

---

# ROLES

## roles

Fields

```text
id
organization_id
name
description
scope
is_system
created_at
updated_at
```

Examples

```text
SUPER_ADMIN
ADMIN
MANAGER
SALES_REP
```

Indexes

```text
organization_id
scope
```

---

# PERMISSIONS

## permissions

Fields

```text
id
key
module
description
created_at
```

Examples

```text
user.create
user.view
user.update

lead.create
lead.view
lead.assign

deal.create
deal.view
deal.update
```

Indexes

```text
key UNIQUE
module
```

---

## role_permissions

Fields

```text
role_id
permission_id
```

Composite Key

```text
role_id + permission_id
```

---

## user_roles

Fields

```text
user_id
role_id
```

Composite Key

```text
user_id + role_id
```

---

# LEADS

## leads

Purpose:

Potential customers.

Fields

```text
id
organization_id
owner_id

first_name
last_name

email
phone

source
status

score

website
industry

notes

created_at
updated_at
deleted_at
```

Indexes

```text
organization_id
owner_id
status
email
```

Relationships

```text
lead
 ├── activities
 ├── notes
 ├── attachments
 └── tags
```

---

# CONTACTS

## contacts

Purpose:

Qualified individuals.

Fields

```text
id
organization_id
owner_id

first_name
last_name

email
phone

job_title
department

company_id

created_at
updated_at
deleted_at
```

Indexes

```text
organization_id
company_id
owner_id
```

---

# COMPANIES

## companies

Purpose:

Business accounts.

Fields

```text
id
organization_id
owner_id

name
website
industry

employee_count
annual_revenue

phone
email

address
city
state
country

created_at
updated_at
deleted_at
```

Indexes

```text
organization_id
owner_id
industry
```

Relationships

```text
company
 ├── contacts
 ├── deals
 └── activities
```

---

# PIPELINES

## pipelines

Fields

```text
id
organization_id

name
description

is_default

created_at
updated_at
```

Indexes

```text
organization_id
```

---

## pipeline_stages

Fields

```text
id
pipeline_id

name
color
position

is_won
is_lost

created_at
updated_at
```

Example

```text
New Lead
Contacted
Qualified
Proposal Sent
Negotiation
Won
Lost
```

Indexes

```text
pipeline_id
position
```

---

# DEALS

## deals

Fields

```text
id
organization_id

pipeline_id
stage_id

owner_id
company_id
contact_id

name

value
currency

probability

expected_close_date

status

created_at
updated_at
deleted_at
```

Indexes

```text
organization_id
pipeline_id
stage_id
owner_id
status
```

Relationships

```text
deal
 ├── activities
 ├── notes
 ├── attachments
 └── tasks
```

---

# ACTIVITIES

## activities

Fields

```text
id
organization_id

owner_id

type

title
description

due_date
completed_at

lead_id
contact_id
company_id
deal_id

created_at
updated_at
```

Indexes

```text
organization_id
owner_id
type
due_date
```

---

# TASKS

## tasks

Fields

```text
id
organization_id

assigned_to
created_by

title
description

priority
status

due_date
completed_at

lead_id
deal_id

created_at
updated_at
```

Indexes

```text
organization_id
assigned_to
status
priority
```

---

# NOTES

## notes

Fields

```text
id
organization_id

author_id

content

lead_id
contact_id
company_id
deal_id

is_pinned

created_at
updated_at
```

Indexes

```text
organization_id
author_id
```

---

# ATTACHMENTS

## attachments

Fields

```text
id
organization_id

uploaded_by

file_name
file_path
file_size
mime_type

lead_id
contact_id
company_id
deal_id

created_at
```

Indexes

```text
organization_id
uploaded_by
```

---

# NOTIFICATIONS

## notifications

Fields

```text
id
organization_id

user_id

title
message

type

is_read

created_at
```

Indexes

```text
user_id
is_read
```

---

# AUDIT LOGS

## audit_logs

Fields

```text
id
organization_id

user_id

entity
entity_id

action

old_values
new_values

ip_address

created_at
```

Indexes

```text
organization_id
user_id
entity
```

---

# API KEYS

## api_keys

Fields

```text
id
organization_id

name

key_hash

last_used_at
expires_at

created_at
```

Indexes

```text
organization_id
```

---

# WEBHOOKS

## webhooks

Fields

```text
id
organization_id

name

url

secret

is_active

created_at
updated_at
```

---

# WEBHOOK EVENTS

## webhook_events

Fields

```text
id
webhook_id

event

created_at
```

Examples

```text
lead.created
lead.updated
deal.created
deal.won
deal.lost
```

---

# BILLING

## subscriptions

Fields

```text
id
organization_id

plan

status

current_period_start
current_period_end

created_at
updated_at
```

---

# DATABASE INDEX STRATEGY

Must Index

```text
organization_id
owner_id
status
email
created_at
updated_at
```

High Traffic Tables

```text
users
leads
deals
activities
tasks
```

---

# DATA ACCESS RULES

Rule 1

Every business query must include:

```sql
organization_id
```

Rule 2

Never expose internal IDs between tenants.

Rule 3

Use soft deletes.

Rule 4

Track all sensitive actions in audit_logs.

Rule 5

All permission checks happen before repository execution.
