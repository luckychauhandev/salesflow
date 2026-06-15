# Commit Message Convention

This project follows the Conventional Commits specification.

## Format

```text
<type>(<scope>): <description>
```

Example:

```text
feat(auth): implement user registration
fix(api): resolve database connection issue
refactor(rbac): simplify permission checks
```

## Commit Types

### feat

A new feature.

```text
feat(auth): add login endpoint
feat(user): implement profile update
```

### fix

A bug fix.

```text
fix(auth): validate refresh token
fix(api): handle database connection errors
```

### refactor

Code changes that neither fix a bug nor add a feature.

```text
refactor(auth): extract jwt service
refactor(database): simplify prisma client setup
```

### perf

Performance improvements.

```text
perf(auth): cache user permissions
perf(api): optimize database queries
```

### docs

Documentation changes.

```text
docs(readme): update setup instructions
docs(api): add authentication guide
```

### style

Formatting and style changes only.

```text
style(api): format source files
style(prisma): align schema formatting
```

### test

Adding or updating tests.

```text
test(auth): add login service tests
test(user): cover profile update flow
```

### chore

Maintenance tasks.

```text
chore(deps): update dependencies
chore(config): add prettier configuration
```

### build

Build system or dependency changes.

```text
build(api): configure tsup
build(workspace): update pnpm settings
```

### ci

CI/CD related changes.

```text
ci(github): add deployment workflow
ci(actions): configure lint pipeline
```

## Scopes

Common scopes used in this project:

```text
api
web
auth
user
organization
rbac
database
prisma
permissions
roles
config
middleware
shared
workspace
docs
```

## Examples

```text
feat(api): setup Prisma, RBAC schema, database connection and project foundation

feat(auth): implement JWT authentication

feat(rbac): add role and permission management

fix(database): handle Neon connection timeout

refactor(shared): extract reusable utility functions

docs(readme): add project setup guide

chore(workspace): configure prettier and eslint
```
